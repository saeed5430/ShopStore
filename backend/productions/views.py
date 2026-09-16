from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny

from django.db.models import Min, Max
from rest_framework.response import Response

from .models import ProductVariant , Category , Color
from .serializers import ProductListSerializer, CategoryListSerializer, ColorListSerializer
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

        color = self.request.query_params.get(
            "color"
        )

        if color:
            queryset = queryset.filter(
                color__hex_code__in=color.split(",")
            )

        min_price = self.request.query_params.get(
            "min_price"
        )

        if min_price:
            queryset = queryset.filter(
                price__gte=min_price
            )

        max_price = self.request.query_params.get(
            "max_price"
        )

        if max_price:
            queryset = queryset.filter(
                price__lte=max_price
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

class ColorListView(ListAPIView):

    serializer_class = ColorListSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):

        queryset = (
            Color.objects
            .filter(
                variants__is_active=True,
                variants__product__is_active=True
            )
            .distinct()
            .order_by("name_fa")
        )

        return queryset

class PriceRangeView(ListAPIView):

    permission_classes = [AllowAny]

    def list(self, request, *args, **kwargs):

        bounds = (
            ProductVariant.objects
            .filter(
                is_active=True,
                product__is_active=True
            )
            .aggregate(
                min_price=Min("price"),
                max_price=Max("price"),
            )
        )

        return Response({
            "min_price": bounds["min_price"] or 0,
            "max_price": bounds["max_price"] or 0,
        })