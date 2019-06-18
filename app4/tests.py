from django.urls import path
from . import views

urlpatterns = [
path('',views.index,name='index'),
path('index1.html',views.index1,name='home'),
path('about.html',views.about,name='about'),
path('news.html',views.news,name='Events'),
path('elements.html',views.elements,name='elements'),
path('gallery.html',views.gallery,name='gallery'),
path('team.html',views.team,name='Our Team'),
path('contact.html',views.contact,name='Contact Us'),
path('titiksha18.html',views.titiksha18,name='History'),
path('mega.html',views.mega,name='mega'),
path('formal.html',views.formal,name='formal'),
path('informal.html',views.informal,name='informal'),
]