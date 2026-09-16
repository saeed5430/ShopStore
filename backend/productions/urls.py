from django.urls import path
from .views import ProductListView , CategoryListView , ColorListView , PriceRangeView

urlpatterns = [
    path("products/", ProductListView.as_view(), name="ProductListView"),
    path("categories/", CategoryListView.as_view(), name="CategoryListView"),
    path("colors/", ColorListView.as_view(), name="ColorListView"),
    path("price-range/", PriceRangeView.as_view(), name="PriceRangeView"),
]