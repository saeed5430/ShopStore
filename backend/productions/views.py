from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny

from .models import ProductVariant
from .serializers import ProductListSerializer
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


        return queryset