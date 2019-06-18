from django.shortcuts import render
from .models import Gallery
from .models import Titiksha18
from .models import Mega
from .models import Formal
from .models import InFormal
from .models import eventsubmit



# Create your views here.
def index(request):
    return render(request,'index.html')

def index1(request):
    return render(request,'index1.html')

def about(request):
    return render(request,'about.html')
    
def gallery(request):
    dests = Gallery.objects.all()
    return render(request,'gallery.html',{'dests':dests})

def news(request):
    return render(request,'news.html')

def mega(request):
    dests = Mega.objects.all()
    return render(request,'mega.html',{'dests':dests})

def formal(request):
    dests = Formal.objects.all()
    return render(request,'formal.html',{'dests':dests})

def informal(request):
    dests = InFormal.objects.all()
    return render(request,'informal.html',{'dests':dests})



def team(request):
    return render(request,'team.html')
       
def elements(request):
    return render(request,'elements.html')

def contact(request):
    return render(request,'contact.html')

def titiksha18(request):
    dests = Titiksha18.objects.all()
    return render(request,'titiksha18.html',{'dests':dests})

def submit(request):
    name = request.POST["name"]
    email = request.POST["email"]
    Event = request.POST["Event"]
    Phone_no = request.POST["Phone_no"]

    esubmit = eventsubmit(name=name,email=email,Event_name=Event,Phone_no=Phone_no)

    esubmit.save()
    return render(request,'mega.html')




