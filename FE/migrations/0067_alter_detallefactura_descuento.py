# Generated by Django 5.1.3 on 2025-03-14 14:20

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('FE', '0066_alter_detallefactura_unidad_medida_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='detallefactura',
            name='descuento',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='FE.descuento'),
        ),
    ]
