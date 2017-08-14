# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-08-11 13:58
from __future__ import unicode_literals

from django.db import migrations, models
import products.models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0003_productimage_variation'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='productimage',
            name='variation',
        ),
        migrations.AddField(
            model_name='variation',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=products.models.image_upload_to_variation),
        ),
    ]
