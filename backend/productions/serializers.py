from rest_framework import serializers

from .models import ProductVariant , Category


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

        request = self.context.get("request")

        image = obj.images.first()

        if image and request:
            return request.build_absolute_uri(
                image.image.url
            )

        return None

class CategoryListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Category

        fields = [
            "id",
            "name",
        ]