# Generated by Django 3.0 on 2019-06-14 08:48

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Formal',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=120, verbose_name='Event Name')),
                ('register1', models.URLField(verbose_name='Register_url')),
                ('dcod', models.TextField(verbose_name='Details_coordinator')),
                ('edet', models.URLField(verbose_name='more_details_url')),
                ('edesc', models.TextField(verbose_name='about_event')),
            ],
        ),
        migrations.CreateModel(
            name='Gallery',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('img', models.ImageField(upload_to='pics')),
            ],
        ),
        migrations.CreateModel(
            name='InFormal',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=120, verbose_name='Event Name')),
                ('register1', models.URLField(verbose_name='Register_url')),
                ('dcod', models.TextField(verbose_name='Details_coordinator')),
                ('edet', models.URLField(verbose_name='more_details_url')),
                ('edesc', models.TextField(verbose_name='about_event')),
            ],
        ),
        migrations.CreateModel(
            name='Mega',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=120, verbose_name='Event Name')),
                ('register1', models.URLField(verbose_name='Register_url')),
                ('dcod', models.TextField(verbose_name='Details_coordinator')),
                ('edet', models.URLField(verbose_name='more_details_url')),
                ('edesc', models.TextField(verbose_name='about_event')),
            ],
        ),
        migrations.CreateModel(
            name='Titiksha18',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('img', models.ImageField(upload_to='pics')),
            ],
        ),
    ]
