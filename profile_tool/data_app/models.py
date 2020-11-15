from django.db import models

# Create your models here.
class Beach(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200,blank=False)

class Survey(models.Model):
    id = models.AutoField(primary_key=True)
    start_date = models.DateField(blank=False)
    elevation_control = models.DecimalField(decimal_places=3, max_digits=5, null=True, blank=True)
    mhhw = models.DecimalField(decimal_places=3, max_digits=6, blank=True, null=True)
    mllw = models.DecimalField(decimal_places=3, max_digits=6, blank=True, null=True)


class Profile(models.Model):
    id = models.AutoField(primary_key=True)
    section = models.CharField(max_length=3,blank=False)
    width = models.DecimalField(decimal_places=3, max_digits=8, blank=True, null=True)
    volume = models.DecimalField(decimal_places=6, max_digits=9, blank=True, null=True)


class Station(models.Model):
    id = models.AutoField(primary_key=True)
    number = models.IntegerField(max_length=None)
    distance = models.DecimalField(decimal_places=3, max_digits=8)
    z = models.DecimalField(decimal_places=3, max_digits=8)
    comment = models.CharField(max_length=200, blank=True)


class Reduced(models.Model):
    id = models.AutoField(primary_key=True)
    true_distance = models.DecimalField(decimal_places=3, max_digits=8, blank=True, null=True)
    true_z = models.DecimalField(decimal_places=3, max_digits=8, blank=True, null=True)


class Beachsurveymap(models.Model):
    id = models.AutoField(primary_key=True)
    beach = models.ForeignKey(Beach, blank=False, on_delete=models.CASCADE)
    survey = models.ForeignKey(Survey, blank=False, on_delete=models.CASCADE)


class Surveyprofilemap(models.Model):
    id = models.AutoField(primary_key=True)
    survey = models.ForeignKey(Survey, blank=False, on_delete=models.CASCADE)
    profile = models.ForeignKey(Profile, blank=False, on_delete=models.CASCADE)


class Profilestationmap(models.Model):
    id = models.AutoField(primary_key=True)
    profile = models.ForeignKey(Profile, blank=False, on_delete=models.CASCADE)
    station = models.ForeignKey(Station, blank=False, on_delete=models.CASCADE)
    reduced = models.ForeignKey(Reduced, blank=False, on_delete=models.CASCADE)
