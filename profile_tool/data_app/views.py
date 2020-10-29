from django.shortcuts import render
from django.http import JsonResponse
from .models import *

# Create your views here.
'''
@name beaches
index page
'''
def beaches(request):
    return render(request, 'beaches.html', context)


'''
@name survey
index page
'''
def survey(request):
    return render(request, 'survey.html', context)


'''
@name profile
index page
'''
def profile(request):
    return render(request, 'profile.html', context)

###############
#ajax requests#
###############
'''
@name init_beach_table
return dict of beach info
'''
def init_beaches_table(request):
    return Beach.objects.values()


'''
@name init_survey_table
return dict of survey info
'''
def init_surveys_table(request):
    surveys = Beachsurveymap.objects.filter(
        beach=request.POST['beach_id']
    ).annotate(
        'survey__id',
        'survey__name',
        'survey__mhhw',
        'survey__mllw',
    ).values()
    
    return surveys


'''
@name init_profile_table
return dict of profile info
'''
def init_profiles_table(request):
    profiles = Surveyprofilemap.objects.filter(
        survey=request.POST['survey_id']
    ).annotate(
        'profile__id',
        'profile__section',
        'profile__elevation_control',
        'profile__width',
        'profile__volume',
    ).values()

    return profiles


'''
@name init_station_table
return dict of station info
'''
def init_stations_table(request):
    station = Profilestationmap.objects.filter(
        profile=request.POST['profile_id']
    ).annotate(
        'station__id',
        'station__number',
        'station__distance',
        'station__z',
        'station__comment',
    ).values()

    return stations


'''
@name update_beach
update beach data
return updated dict of beach info
'''
def update_beach(request):
    try:
        beach = Beach.objects.get(id=request.POST['id'])
        beach.name=request.POST['name']
        beach.save()
        response = True
    except:
        response = False
    
    return JsonResponse(result:response)


'''
@name update_survey
update survey data
return updated dict of survey info
'''
def update_survey(request):
    try:
        survey = Survey.objects.get(id=request.POST['id'])
        survey.name=request.POST['name']
        survey.mhhw=request.POST['mhhw']
        survey.mllw=request.POST['mllw']
        survey.save()
        response = True
    except:
        response = False
    
    return JsonResponse(result:response)


'''
@name update_profile
update profile data
return updated dict of profile info
'''
def update_profile(request):
    try:
        profile = Profile.objects.get(id=request.POST['id'])
        profile.section=request.POST['section']
        profile.elevation_control=request.POST['elevation_control']
        profile.width=request.POST['width']
        profile.volume=request.POST['volume']
        profile.save()
        response = True
    except:
        response = False
    
    return JsonResponse(result:response)


'''
@name update_station
update station data
return updated dict of station info
'''
def update_station(request):
    try:
        station = Station.objects.get(id=request.POST['id'])
        station.distance=request.POST['distance']
        station.z=request.POST['z']
        station.comment=request.POST['comment']
        station.save()
        response = True
    except:
        response = False
    
    return JsonResponse(result:response)