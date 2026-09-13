from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):

    phone = models.CharField(
        max_length=15,
        unique=True,
    )

    landline = models.CharField(
        max_length=15,
        unique=True,
        blank=True,
        null=True,
    )

    address = models.TextField(
        blank=True,
        null=True,
    )

    email = models.EmailField(
        blank=True,
        null=True,
    )

    class Meta:
        db_table = "users"


    def __str__(self):
        return self.username