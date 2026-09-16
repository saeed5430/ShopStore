import uuid

from django.db import models


class Cart(models.Model):
    SHIPPING_METHOD_TIPAX = "tipax"
    SHIPPING_METHOD_FREIGHT = "freight"

    SHIPPING_METHOD_CHOICES = [
        (
            SHIPPING_METHOD_TIPAX,
            "تیپاکس",
        ),
        (
            SHIPPING_METHOD_FREIGHT,
            "باربری",
        ),
    ]

    user = models.OneToOneField(
        "accounts.User",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="cart",
    )

    guest_token = models.UUIDField(
        default=uuid.uuid4,
        unique=True,
        null=True,
        blank=True,
    )

    shipping_method = models.CharField(
        max_length=20,
        choices=SHIPPING_METHOD_CHOICES,
        null=True,
        blank=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    def __str__(self):
        if self.user:
            return f"Cart of {self.user.username}"

        return f"Guest Cart {self.guest_token}"

class CartItem(models.Model):
    cart = models.ForeignKey(
        Cart,
        on_delete=models.CASCADE,
        related_name="items"
    )

    product_variant = models.ForeignKey(
        "productions.ProductVariant",
        on_delete=models.CASCADE,
        related_name="cart_items"
    )

    quantity = models.PositiveIntegerField(
        default=1
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=[
                    "cart",
                    "product_variant"
                ],
                name="unique_cart_product_variant"
            )
        ]

    def __str__(self):
        return f"{self.product_variant} x {self.quantity}"





class Order(models.Model):
    STATUS_PENDING_DELIVERY = "pending_delivery"
    STATUS_DELIVERED = "delivered"

    STATUS_CHOICES = [
        (
            STATUS_PENDING_DELIVERY,
            "در انتظار تحویل",
        ),
        (
            STATUS_DELIVERED,
            "تحویل داده شده",
        ),
    ]

    user = models.ForeignKey(
        "accounts.User",
        on_delete=models.PROTECT,
        related_name="orders",
    )

    address = models.TextField()

    phone = models.CharField(
        max_length=15,
    )

    status = models.CharField(
        max_length=30,
        choices=STATUS_CHOICES,
        default=STATUS_PENDING_DELIVERY,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    def __str__(self):
        return f"Order #{self.id}"


class OrderItem(models.Model):
    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        related_name="items",
    )

    product_variant = models.ForeignKey(
        "productions.ProductVariant",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="order_items",
    )

    product_name = models.CharField(
        max_length=255,
    )

    variant_name = models.CharField(
        max_length=255,
        blank=True,
    )

    unit_price = models.DecimalField(
        max_digits=12,
        decimal_places=2,
    )

    quantity = models.PositiveIntegerField()

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    def __str__(self):
        return f"{self.product_name} x {self.quantity}"