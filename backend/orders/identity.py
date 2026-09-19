import uuid

from django.conf import settings


GUEST_CART_COOKIE = "cart_id"


def create_guest_id():
    return str(uuid.uuid4())


def user_cart_key(username, user_id):
    return f"cart:user:{username}:{user_id}"


def guest_cart_key(guest_id):
    return f"cart:guest:{guest_id}"


def get_cart_identity(request):
    user = getattr(request, "user", None)

    if user is not None and user.is_authenticated:
        return {
            "type": "user",
            "key": user_cart_key(request.user.username, request.user.id),
        }

    guest_id = request.COOKIES.get(GUEST_CART_COOKIE)

    if not guest_id:
        return {
            "type": "guest",
            "key": None,
            "guest_id": None,
            "is_new": True,
        }

    return {
        "type": "guest",
        "key": guest_cart_key(guest_id),
        "guest_id": guest_id,
        "is_new": False,
    }


def ensure_cart_identity(request):
    identity = get_cart_identity(request)

    if identity["type"] == "guest" and not identity["guest_id"]:
        guest_id = create_guest_id()
        identity = {
            "type": "guest",
            "key": guest_cart_key(guest_id),
            "guest_id": guest_id,
            "is_new": True,
        }

    return identity


def set_guest_cookie(response, guest_id):
    response.set_cookie(
        key=GUEST_CART_COOKIE,
        value=guest_id,
        max_age=settings.CART_TTL,
        httponly=False,
        secure=False,
        samesite="Lax",
        path="/",
    )

    return response


def clear_guest_cookie(response):
    response.delete_cookie(
        key=GUEST_CART_COOKIE,
        path="/",
    )

    return response