from django.contrib import admin

# Register your models here.
from .models import (
               Product,
               Category,
			   Variation,
      		   ProductImage,
			   ProductFeatured ,
			   Sizes)


class ProductImageInline(admin.TabularInline):
	model = ProductImage
	extra = 0
	max_num = 10

class VariationInline(admin.TabularInline):
	model = Variation
	extra = 0
	max_num = 10

class SizesInline(admin.TabularInline):
	model = Sizes
	extra = 0
	max_num = 10


class ProductAdmin(admin.ModelAdmin):
    list_display = ['id','__unicode__', 'price', 'get_image_url']

    inlines = [
		ProductImageInline,
		VariationInline,
	]

    class Meta:
		model = Product


class VariationAdmin(admin.ModelAdmin):
    inlines = [
		SizesInline,
	]

    class Meta:
		model = Variation


admin.site.register(Product, ProductAdmin)

admin.site.register(Variation, VariationAdmin)

admin.site.register(ProductImage)

admin.site.register(Category)

admin.site.register(ProductFeatured)
