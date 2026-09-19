from django.urls import path

from .views import CartDetailView, CartItemView, CartMergeView


urlpatterns = [
    path("cart/", CartDetailView.as_view(), name="cart-detail"),
    path("cart/items/<int:variant_id>/", CartItemView.as_view(), name="cart-item"),
    path("cart/merge/", CartMergeView.as_view(), name="cart-merge"),
]
