# Generated by Django 5.1.3 on 2025-04-10 03:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('FE', '0089_lotecontingencia_fecha_modificacion_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='lotecontingencia',
            old_name='lote',
            new_name='cantidad_lote',
        ),
        migrations.RemoveField(
            model_name='lotecontingencia',
            name='eventocontingencia',
        ),
        migrations.AddField(
            model_name='lotecontingencia',
            name='eventocontingencia',
            field=models.ManyToManyField(blank=True, related_name='eventos_contingencia', to='FE.eventocontingencia'),
        ),
    ]
