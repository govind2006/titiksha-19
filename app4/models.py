from django.db import models

# Create your models here.    
class Gallery(models.Model):
    img = models.ImageField(upload_to='pics')

class Titiksha18(models.Model):
    img = models.ImageField(upload_to='pics')

class Mega(models.Model):
    name = models.CharField('Event Name', max_length=120)
    dcod = models.TextField('Details_coordinator')
    edet = models.URLField('more_details_url')
    edesc = models.TextField('about_event')

class Formal(models.Model):
    name = models.CharField('Event Name', max_length=120)
    dcod = models.TextField('Details_coordinator')
    edet = models.URLField('more_details_url')
    edesc = models.TextField('about_event')

class InFormal(models.Model):
    name = models.CharField('Event Name', max_length=120)
    dcod = models.TextField('Details_coordinator')
    edet = models.URLField('more_details_url')
    edesc = models.TextField('about_event')

class eventsubmit(models.Model):
    name = models.CharField('Name', max_length=120)
    email = models.CharField('Email', max_length=120)
    Event_name = models.CharField('Event Name', max_length=120)
    Phone_no = models.CharField('Phone no', max_length=120)

# Create your models here.

