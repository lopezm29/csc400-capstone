from django.shortcuts import render
from django.http import JsonResponse
from .models import *

# Create your views here.
'''
@name beaches
index page
'''
def beaches(request):
    context = {
        'beaches':get_beaches_table()
    }
    return render(request, 'beaches.html', context)


'''
@name survey
index page
'''
def surveys(request):
    context = {
        'surveys':get_surveys_table(request.POST['beach_id'])
    }
    
    return render(request, 'survey.html', context)


'''
@name profile
index page
'''
def profile(request):
    context = {
        'profiles':get_profiles_table(request.POST['survey_id'])
    }
    return render(request, 'profile.html', context)


'''
@name station
index page
'''
def station(request):
    context = {
        'stations':get_stations_table(request.POST['profile_id'])
    }
    return render(request, 'station.html', context)


###############
#ajax requests#
###############
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
        result = True
    except:
        result = False

    beaches = get_beaches_table()

    return JsonResponse({'result':result, 'beaches':beaches})


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
        result = True
    except:
        result = False

    surveys = get_surveys_table(request.POST['beach_id'])
    
    return JsonResponse({'result':result, 'surveys':surveys})


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
        result = True
    except:
        result = False
    
    profiles = get_profiles_table(int(request.POST['survey_id']))

    return JsonResponse({'result':result, 'profiles':profiles})


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
        result = True
    except:
        result = False
    
    stations = get_stations_table(request.POST['profile_id'])

    return JsonResponse({'result':result, 'stations':stations})


###################
#service functions#
###################
'''
@name get_beach_table
return dict of beach info
'''
def get_beaches_table():
    return Beach.objects.values()


'''
@name get_survey_table
return dict of survey info
'''
def get_surveys_table(beach_id):
    surveys = Beachsurveymap.objects.filter(
        beach=beach_id
    ).annotate(
        'survey__id',
        'survey__name',
        'survey__mhhw',
        'survey__mllw',
    ).values()
    
    return surveys


'''
@name get_profile_table
return dict of profile info
'''
def get_profiles_table(survey_id):
    profiles = Surveyprofilemap.objects.filter(
        survey=survey_id
    ).annotate(
        'profile__id',
        'profile__section',
        'profile__elevation_control',
        'profile__width',
        'profile__volume',
    ).values()

    return profiles


'''
@name get_station_table
return dict of station info
'''
def get_stations_table(profile_id):
    station = Profilestationmap.objects.filter(
        profile=profile_id
    ).annotate(
        'station__id',
        'station__number',
        'station__distance',
        'station__z',
        'station__comment',
    ).values()

    return stations