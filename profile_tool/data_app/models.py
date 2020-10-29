from django.db import models

# Create your models here.
class Beach(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200,blank=False)


class Beachsurveymap(models.Model):
    id = models.AutoField(primary_key=True)
    beach = models.ForeignKey(Beach, blank=False)
    survey = models.ForeignKey(Survey, blank=False)


class Survey(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200,blank=False)
    mhhw = models.DecimalField(decimal_places=3, max_digits=6)
    mllw = models.DecimalField(decimal_places=3, max_digits=6)


class Surveyprofilemap(models.Model):
    id = models.AutoField(primary_key=True)
    survey = models.ForeignKey(Survey, blank=False)
    profile = models.ForeignKey(Profile, blank=False)


class Profile(models.Model):
    id = models.AutoField(primary_key=True)
    section = models.CharField(max_length=3,blank=False)
    elevation_control = models.DecimalField(decimal_places=3, max_digits=5, blank=True)
    width = models.DecimalField(decimal_places=3, max_digits=8, blank=True)
    volume = models.DecimalField(decimal_places=6, max_digits=9, blank=True)


class Profilestationmap(models.Model):
    id = models.AutoField(primary_key=True)
    profile = models.ForeignKey(Profile, blank=False)
    station = models.ForeignKey(Station, blank=False)


class Station(models.Model):
    id = models.AutoField(primary_key=True)
    number = models.IntegerField(max_length=None)
    distance = models.DecimalField(decimal_places=3)
    z = models.DecimalField(decimal_places=3)
    comment = models.CharField(max_length=200, blank=True)


class Reduced(models.Model):
    id = models.AutoField(primary_key=True)
    true_distance = models.DecimalField(decimal_places=3)
    true_elevation = models.DecimalField(decimal_places=3)