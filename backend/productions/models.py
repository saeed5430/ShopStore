from django.db import models
from django.utils.text import slugify


class Category(models.Model):

    name = models.CharField(
        max_length=100,
        unique=True
    )

    is_active = models.BooleanField(
        default=True
    )


    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"
        ordering = ["name"]


    def __str__(self):
        return self.name



class Product(models.Model):

    category = models.ForeignKey(
        Category,
        on_delete=models.PROTECT,
        related_name="products"
    )

    name = models.CharField(
        max_length=255
    )

    slug = models.SlugField(
        max_length=255,
        unique=True,
        blank=True
    )

    description = models.TextField(
        blank=True,
        null=True
    )

    is_active = models.BooleanField(
        default=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )


    class Meta:
        ordering = ["-created_at"]


    def save(self, *args, **kwargs):

        if not self.slug:
            self.slug = slugify(self.name)

        super().save(*args, **kwargs)


    def __str__(self):
        return self.name



class ProductImage(models.Model):

    image = models.ImageField(
        upload_to="products/"
    )

    description = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )


    class Meta:
        ordering = ["created_at"]


    def __str__(self):
        return self.image.name



class Size(models.Model):

    name = models.CharField(
        max_length=50,
        blank=True,
        null=True
    )

    value = models.CharField(
        max_length=50
    )


    def __str__(self):
        return f"{self.name or ''} {self.value}"



class Color(models.Model):

    name_fa = models.CharField(
        max_length=50,
        unique=True
    )

    name_en = models.CharField(
        max_length=50,
        blank=True,
        null=True
    )

    hex_code = models.CharField(
        max_length=7,
        unique=True
    )


    class Meta:
        ordering = ["name_fa"]


    def __str__(self):
        return self.name_fa



class ProductVariant(models.Model):

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="variants"
    )

    color = models.ForeignKey(
        Color,
        on_delete=models.PROTECT,
        related_name="variants"
    )

    size = models.ForeignKey(
        Size,
        on_delete=models.PROTECT,
        related_name="variants"
    )

    images = models.ManyToManyField(
        ProductImage,
        related_name="variants",
        blank=True
    )

    price = models.PositiveIntegerField()

    stock = models.BooleanField(
        default=True
    )

    is_active = models.BooleanField(
        default=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )


    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=[
                    "product",
                    "color",
                    "size",
                ],
                name="unique_product_variant"
            )
        ]


    def __str__(self):
        return (
            f"{self.product.name} - "
            f"{self.color.name_fa} - "
            f"{self.size.value}"
        )