from .identity import get_cart_identity


class CartIdentityMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        request.cart_identity = get_cart_identity(request)
        return self.get_response(request)
