from django.urls import path
from .views import *

urlpatterns=[
    path('', views.beaches, name='beaches')