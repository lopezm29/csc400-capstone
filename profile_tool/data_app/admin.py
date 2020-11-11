from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(Beach)
admin.site.register(Survey)
admin.site.register(Profile)
admin.site.register(Station)
admin.site.register(Beachsurveymap)
admin.site.register(Surveyprofilemap)
admin.site.register(Profilestationmap)
admin.site.register(Reduced)