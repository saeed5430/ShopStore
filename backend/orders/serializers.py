from django.conf import settings
from rest_framework import serializers


class AddItemSerializer(serializers.Serializer):
    quantity = serializers.IntegerField(
        min_value=1,
        max_value=settings.MAX_QUANTITY_PER_ITEM,
        error_messages={
            "required": "تعداد الزامی است.",
            "min_value": "تعداد باید حداقل ۱ باشد.",
            "max_value": f"تعداد نمی‌تواند بیشتر از {settings.MAX_QUANTITY_PER_ITEM} باشد.",
            "invalid": "تعداد معتبر نیست.",
        },
    )


class MergeCartSerializer(serializers.Serializer):
    guest_token = serializers.CharField(
        required=False,
        allow_blank=True,
    )


class CartItemOutputSerializer(serializers.Serializer):
    variant_id = serializers.IntegerField()
    quantity = serializers.IntegerField()
    price = serializers.IntegerField()
    line_total = serializers.IntegerField()
    in_stock = serializers.BooleanField()
    product_name = serializers.CharField()
    product_slug = serializers.CharField()
    color = serializers.CharField()
    size = serializers.CharField()
    image = serializers.CharField(allow_null=True)


class CartOutputSerializer(serializers.Serializer):
    items = CartItemOutputSerializer(many=True)
    total_quantity = serializers.IntegerField()
    subtotal = serializers.IntegerField()
