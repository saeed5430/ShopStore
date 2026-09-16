from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny

from .models import ProductVariant , Category
from .serializers import ProductListSerializer, CategoryListSerializer
from .pagination import ProductPagination


class ProductListView(ListAPIView):

    serializer_class = ProductListSerializer
    permission_classes = [AllowAny]
    pagination_class = ProductPagination


    def get_queryset(self):

        queryset = (
            ProductVariant.objects
            .filter(
                is_active=True,
                product__is_active=True
            )
            .select_related(
                "product",
                "product__category",
                "color",
                "size",
            )
            .prefetch_related(
                "images"
            )
            .order_by("-created_at")
        )


        category = self.request.query_params.get(
            "category"
        )

        if category:
            queryset = queryset.filter(
                product__category_id=category
            )

        price = self.request.query_params.get(
            "price"
        )

        if price == "cheap":
            queryset = queryset.order_by(
                "price", "id"
            )

        elif price == "expensive":
            queryset = queryset.order_by(
                "-price", "id"
            )

        return queryset

class CategoryListView(ListAPIView):

    serializer_class = CategoryListSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):

        queryset = (
            Category.objects
            .filter(
                is_active=True
            )
            .order_by("name")
        )

        return queryset