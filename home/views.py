# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

from django.views.generic.list import ListView

from products.models import Product

# Create your views here.


class HomeView(ListView):

    model = Product
    queryset = Product.objects.all()

    template_name = "home/index.html"
