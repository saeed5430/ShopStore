from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView , TokenRefreshView
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import LoginSerializer



from .serializers import RegisterSerializer


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]
    authentication_classes = []

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            {
                "message": "ثبت‌نام با موفقیت انجام شد."
            },
            status=status.HTTP_201_CREATED,
        )


class LoginView(TokenObtainPairView):

    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):

        response = super().post(
            request,
            *args,
            **kwargs
        )

        refresh = response.data["refresh"]
        access = response.data["access"]

        response = Response({
            "message": "با موفقیت وارد شدید",
            "access": access
        })

        response.set_cookie(
            key="refresh_token",
            value=refresh,
            httponly=True,
            secure=False,  # production: True
            samesite="Lax",
            max_age=7 * 24 * 60 * 60
        )

        return response

class RefreshTokenView(TokenRefreshView):

    def post(self, request, *args, **kwargs):

        refresh_token = request.COOKIES.get("refresh_token")

        if not refresh_token:
            return Response(
                {
                    "message": "Refresh token not found"
                },
                status=401
            )

        serializer = TokenRefreshSerializer(
            data={
                "refresh": refresh_token
            }
        )

        try:
            serializer.is_valid(raise_exception=True)

            access = serializer.validated_data["access"]

            response = Response({
                "message": "توکن با موفقیت بازسازی شد.",
                "access": access
            })

            if "refresh" in serializer.validated_data:
                response.set_cookie(
                    key="refresh_token",
                    value=serializer.validated_data["refresh"],
                    httponly=True,
                    secure=False,  # production: True
                    samesite="Lax",
                    max_age=7 * 24 * 60 * 60
                )

            return response

        except Exception:
            return Response(
                {
                    "message": "Invalid refresh token"
                },
                status=401
            )