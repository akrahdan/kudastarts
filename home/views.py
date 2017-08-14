# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

from django.views.generic.list import ListView

from products.models import Product, ProductFeatured

# Create your views here.


class HomeView(ListView):

    model = Product
    queryset = Product.objects.all().order_by("?")[:6]

    template_name = "home/index.html"

    def get_context_data(self, *args, **kwargs):
		context = super(HomeView, self).get_context_data(*args, **kwargs)
		context["featured"] = ProductFeatured.objects.all()
		return context
