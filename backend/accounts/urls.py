from django.urls import path
from rest_framework_simplejwt.views import TokenVerifyView
from .views import RegisterView, LoginView, RefreshTokenView

urlpatterns = [
    path("token/", LoginView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", RefreshTokenView.as_view(), name="token_refresh"),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path("register/", RegisterView.as_view(), name="register"),
]