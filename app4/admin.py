from django.contrib import admin

# Register your models here.
from .models import Gallery
from .models import Titiksha18
from .models import Mega
from .models import Formal
from .models import InFormal
from .models import eventsubmit

admin.site.register(Gallery)
admin.site.register(Titiksha18)
admin.site.register(Mega)
admin.site.register(Formal)
admin.site.register(InFormal)
admin.site.register(eventsubmit)
