from rest_framework import serializers

from .models import ProductVariant


class ProductListSerializer(serializers.ModelSerializer):

    name = serializers.CharField(
        source="product.name"
    )

    slug = serializers.CharField(
        source="product.slug"
    )

    category = serializers.CharField(
        source="product.category.name"
    )

    image = serializers.SerializerMethodField()


    class Meta:

        model = ProductVariant

        fields = [
            "id",
            "name",
            "slug",
            "category",
            "image",
            "price",
            "color",
            "size",
        ]


    def get_image(self, obj):

        image = obj.images.first()

        if image:
            return image.image.url

        return None