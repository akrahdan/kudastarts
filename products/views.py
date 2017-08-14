from django.core.exceptions import ImproperlyConfigured
from django.contrib import messages
from django.db.models import Q
from django.http import Http404
from django.views.generic.detail import DetailView
from django.views.generic.list import ListView
from django.shortcuts import render, get_object_or_404, redirect
from django.utils import timezone

from .models import Product, Variation, Category


class ProductListView(ListView):
    model = Product
    queryset = Product.objects.all()


class VariationListView(ListView):

    model = Variation
    queryset = Variation.objects.all()

    template_name = "products/variation_list.html"


class CategoryListView(ListView):
    model = Category
    queryset = Category.objects.all()
    template_name = "products/category_list.html"
