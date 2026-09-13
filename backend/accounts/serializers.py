from .models import User
from django.contrib.auth.models import Group
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
import re


class RegisterSerializer(serializers.ModelSerializer):

    username = serializers.CharField(
        validators=[
            UniqueValidator(
                queryset=User.objects.all(),
                message="این نام کاربری قبلاً استفاده شده است."
            )
        ],
        error_messages={
            "required": "نام کاربری الزامی است.",
            "blank": "نام کاربری نمی‌تواند خالی باشد.",
        }
    )

    phone = serializers.CharField(
        validators=[
            UniqueValidator(
                queryset=User.objects.all(),
                message="این شماره تلفن همراه قبلاً ثبت شده است."
            )
        ],
        error_messages={
            "required": "شماره تلفن همراه الزامی است.",
            "blank": "شماره تلفن همراه نمی‌تواند خالی باشد.",
        }
    )

    class Meta:
        model = User

        fields = [
            "first_name",
            "last_name",
            "username",
            "email",
            "address",
            "landline",
            "phone",
            "password",
        ]

        extra_kwargs = {

            "first_name": {
                "required": True,
                "error_messages": {
                    "required": "نام الزامی است.",
                    "blank": "نام نمی‌تواند خالی باشد.",
                },
            },

            "last_name": {
                "required": True,
                "error_messages": {
                    "required": "نام خانوادگی الزامی است.",
                    "blank": "نام خانوادگی نمی‌تواند خالی باشد.",
                },
            },

            "password": {
                "required": True,
                "write_only": True,
                "error_messages": {
                    "required": "رمز عبور الزامی است.",
                    "blank": "رمز عبور نمی‌تواند خالی باشد.",
                },
            },

            "email": {
                "required": False,
                "allow_blank": True,
                "allow_null": True,
            },

            "address": {
                "required": False,
                "allow_blank": True,
                "allow_null": True,
            },

            "landline": {
                "required": False,
                "allow_blank": True,
                "allow_null": True,
            },
        }


    def validate_phone(self, value):

        if not re.fullmatch(r"09\d{9}", value):
            raise serializers.ValidationError(
                "شماره تلفن همراه باید ۱۱ رقم و با ۰۹ شروع شود."
            )

        return value


    def validate_landline(self, value):

        if not value:
            return None

        if not re.fullmatch(r"0\d{2}-?\d{8}", value):
            raise serializers.ValidationError(
                "تلفن ثابت باید به شکل 021-66435423 یا 02166435423 باشد."
            )

        return value


    def validate_email(self, value):
        return value or None


    def validate_address(self, value):
        return value or None


    def create(self, validated_data):

        password = validated_data.pop("password")

        user = User.objects.create_user(
            password=password,
            **validated_data,
        )

        customer_group = Group.objects.get(name="customer")
        user.groups.add(customer_group)

        return user