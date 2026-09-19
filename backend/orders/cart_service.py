from django.conf import settings
from redis.exceptions import RedisError

from config.redis_client import redis_client
from productions.models import ProductVariant


def _coerce_items(raw):
    items = {}

    for field, value in (raw or {}).items():
        try:
            variant_id = int(field)
            qty = int(value)
        except (TypeError, ValueError):
            continue

        if variant_id > 0 and qty > 0:
            items[variant_id] = qty

    return items


def _enrich_items(items):
    if not items:
        return [], 0, []

    variants = (
        ProductVariant.objects
        .filter(
            id__in=list(items.keys()),
            is_active=True,
            product__is_active=True,
        )
        .select_related(
            "product",
            "color",
            "size",
        )
        .prefetch_related("images")
    )

    variant_map = {v.id: v for v in variants}
    stale_ids = [vid for vid in items if vid not in variant_map]

    enriched = []
    subtotal = 0

    for variant_id, qty in items.items():
        variant = variant_map.get(variant_id)

        if variant is None:
            continue

        line_total = variant.price * qty
        subtotal += line_total
        image = variant.images.first()

        enriched.append({
            "variant_id": variant.id,
            "quantity": qty,
            "price": variant.price,
            "line_total": line_total,
            "in_stock": variant.stock,
            "product_name": variant.product.name,
            "product_slug": variant.product.slug,
            "color": variant.color.name_fa,
            "size": variant.size.value,
            "image": image.image.url if image else None,
        })

    return enriched, subtotal, stale_ids


def get_cart(cart_key):
    try:
        raw = redis_client.hgetall(cart_key)
    except RedisError:
        raise

    items = _coerce_items(raw)
    enriched, subtotal, stale_ids = _enrich_items(items)

    if stale_ids:
        try:
            redis_client.hdel(cart_key, *[str(i) for i in stale_ids])
        except RedisError:
            pass

    return {
        "items": enriched,
        "total_quantity": sum(i["quantity"] for i in enriched),
        "subtotal": subtotal,
    }


def add_item(cart_key, variant_id, quantity):
    try:
        exists = ProductVariant.objects.filter(
            id=variant_id,
            is_active=True,
            product__is_active=True,
        ).exists()
    except Exception:
        raise

    if not exists:
        return None

    max_qty = settings.MAX_QUANTITY_PER_ITEM
    quantity = max(1, min(int(quantity), max_qty))

    try:
        redis_client.hset(cart_key, str(variant_id), quantity)
        redis_client.expire(cart_key, settings.CART_TTL)
    except RedisError:
        raise

    return get_cart(cart_key)


def remove_item(cart_key, variant_id):
    try:
        redis_client.hdel(cart_key, str(variant_id))
    except RedisError:
        raise

    return get_cart(cart_key)


def clear_cart(cart_key):
    try:
        redis_client.delete(cart_key)
    except RedisError:
        raise


def merge_carts(guest_key, user_key):
    try:
        guest_items = _coerce_items(redis_client.hgetall(guest_key))
    except RedisError:
        raise

    if not guest_items:
        return get_cart(user_key)

    enriched, _, _ = _enrich_items(guest_items)

    try:
        pipe = redis_client.pipeline()
        pipe.delete(user_key)
        for item in enriched:
            pipe.hset(user_key, str(item["variant_id"]), item["quantity"])
        pipe.expire(user_key, settings.CART_TTL)
        pipe.delete(guest_key)
        pipe.execute()
    except RedisError:
        raise

    return get_cart(user_key)
