from django.contrib import admin
from django.utils.html import format_html

from .models import (
    Category,
    Product,
    ProductImage,
    Color,
    Size,
    ProductVariant,
)



@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):

    list_display = [
        "name",
        "is_active",
    ]

    list_filter = [
        "is_active",
    ]

    search_fields = [
        "name",
    ]



@admin.register(Color)
class ColorAdmin(admin.ModelAdmin):

    list_display = [
        "name_fa",
        "name_en",
        "color_preview",
        "hex_code",
    ]

    search_fields = [
        "name_fa",
        "name_en",
    ]


    @admin.display(description="نمایش رنگ")
    def color_preview(self, obj):

        return format_html(
            """
            <div style="
                width="40px";
                height="25px";
                border-radius="6px";
                background:{};">
            </div>
            """,
            obj.hex_code
        )



@admin.register(Size)
class SizeAdmin(admin.ModelAdmin):

    list_display = [
        "name",
        "value",
    ]

    search_fields = [
        "name",
        "value",
    ]



@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):

    list_display = [
        "image",
        "description",
        "created_at",
    ]

    search_fields = [
        "description",
    ]



class ProductVariantInline(admin.TabularInline):

    model = ProductVariant

    extra = 0

    fields = [
        "color",
        "size",
        "price",
        "stock",
        "is_active",
    ]



@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):

    list_display = [
        "name",
        "category",
        "is_active",
        "created_at",
    ]

    list_filter = [
        "category",
        "is_active",
    ]

    search_fields = [
        "name",
    ]

    prepopulated_fields = {
        "slug": [
            "name",
        ]
    }

    inlines = [
        ProductVariantInline,
    ]



@admin.register(ProductVariant)
class ProductVariantAdmin(admin.ModelAdmin):

    list_display = [
        "product",
        "color",
        "size",
        "price",
        "stock",
        "is_active",
        "created_at",
    ]

    list_filter = [
        "stock",
        "is_active",
        "color",
        "size",
    ]

    search_fields = [
        "product__name",
    ]

    autocomplete_fields = [
        "images",
    ]