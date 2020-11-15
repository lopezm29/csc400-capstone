from django.shortcuts import render
from django.http import JsonResponse
from django.core import serializers
from .services import *

# Create your views here.
'''
@name beaches
index page
'''
def beaches(request):
    return render(request, 'data_app/beaches.html')


'''
@name surveys
index page
'''
def surveys(request, beach_id):
    context = {
        'beach' : Beach.objects.filter(id=beach_id).get()
    }
    return render(request, 'data_app/surveys.html', context)


'''
@name profiles
index page
'''
def profiles(request, beach_id, survey_id):
    context = {
        'beach' : Beach.objects.filter(id=beach_id).get(),
        'survey': Survey.objects.filter(id=survey_id).get()
    }
    return render(request, 'data_app/profiles.html', context)


'''
@name stations
index page
'''
def stations(request, beach_id, survey_id, profile_id):
    context = {
        'beach' : Beach.objects.filter(id=beach_id).get(),
        'survey': Survey.objects.filter(id=survey_id).get(),
        'profile': Profile.objects.filter(id=profile_id).get()
    }
    return render(request, 'data_app/stations.html', context)


###############
#ajax requests#
###############
'''
@name populate_beach_table
return dict of beach info
'''
def populate_beach_table(request):
    beaches = {}
    try:
        beaches = package_queryset_json(get_beaches_table())
        result = True
    except:
        result = False

    return JsonResponse({'result':result, 'beaches':beaches})


'''
@name add_beach
add beach data
return updated dict of beach info
'''
def add_beach(request):
    try:
        beach = Beach()
        beach.name=request.POST['name']
        beach.save()
        result = True
    except:
        result = False

    beaches = package_queryset_json(get_beaches_table())

    return JsonResponse({'result':result, 'beaches':beaches})


'''
@name edit_beach
edit beach data
return updated dict of beach info
'''
def edit_beach(request):
    try:
        beach = Beach.objects.get(id=int(request.POST['id']))
        beach.name=request.POST['name']
        beach.save()
        result = True
    except:
        result = False

    beaches = package_queryset_json(get_beaches_table())

    return JsonResponse({'result':result, 'beaches':beaches})


'''
@name delete_beach
delete beach data
return updated dict of beach info
'''
def delete_beach(request):
    try:
        beach = Beach.objects.get(id=int(request.POST['id']))
        beach.delete()
        result = True
    except:
        result = False

    beaches = package_queryset_json(get_beaches_table())

    return JsonResponse({'result':result, 'beaches':beaches})


'''
@name populate_survey_table
return dict of beach info
'''
def populate_survey_table(request):
    surveys = {}
    try:
        surveys = package_queryset_json(get_surveys_table(int(request.POST['beach_id'])))
        result = True
    except:
        result = False

    return JsonResponse({'result':result, 'surveys':surveys})


'''
@name add_survey
add survey data
return updated dict of survey info
'''
def add_survey(request):
    try:
        beach = Beach.objects.get(id=int(request.POST['beach_id']))
        survey = Survey()
        survey.start_date=request.POST['start_date']
        if '' != request.POST['elevation_control']:
            survey.elevation_control = request.POST['elevation_control']
        if '' != request.POST['mhhw']:
            survey.mhhw = request.POST['mhhw']
        if '' != request.POST['mllw']:
            survey.mllw = request.POST['mllw']
        survey.save()

        mapper = Beachsurveymap()
        mapper.beach = beach
        mapper.survey = survey
        mapper.save()

        result = True
    except:
        result = False

    surveys = package_queryset_json(get_surveys_table(int(request.POST['beach_id'])))
    
    return JsonResponse({'result':result, 'surveys':surveys})


'''
@name edit_survey
edit survey data
return updated dict of survey info
'''
def edit_survey(request):
    try:
        survey = Survey.objects.get(id=int(request.POST['survey_id']))
        survey.start_date=request.POST['start_date']
        survey.elevation_control = request.POST['elevation_control']
        survey.mhhw = request.POST['mhhw']
        survey.mllw = request.POST['mllw']
        survey.save()

        result = True
    except:
        result = False

    surveys = package_queryset_json(get_surveys_table(int(request.POST['beach_id'])))
    
    return JsonResponse({'result':result, 'surveys':surveys})


'''
@name delete_survey
delete survey data
return updated dict of beach info
'''
def delete_survey(request):
    try:
        survey = Survey.objects.get(id=int(request.POST['id']))
        survey.delete()
        result = True
    except:
        result = False

    surveys = package_queryset_json(get_surveys_table(int(request.POST['beach_id'])))

    return JsonResponse({'result':result, 'surveys':surveys})


'''
@name populate_profile_table
return dict of beach info
'''
def populate_profile_table(request):
    profiles = {}
    try:
        profiles = package_queryset_json(get_profiles_table(int(request.POST['survey_id'])))
        result = True
    except:
        result = False

    return JsonResponse({'result':result, 'profiles':profiles})


'''
@name add_profile
add profile data
return updated dict of profile info
'''
def add_profile(request):
    try:
        survey = Survey.objects.get(id=int(request.POST['survey_id']))

        profile = Profile()
        profile.section=request.POST['section']
        profile.save()

        mapper = Surveyprofilemap()
        mapper.survey = survey
        mapper.profile = profile
        mapper.save()

        result = True
    except:
        result = False
    
    profiles = package_queryset_json(get_profiles_table(int(request.POST['survey_id'])))

    return JsonResponse({'result':result, 'profiles':profiles})


'''
@name edit_profile
edit profile data
return updated dict of profile info
'''
def edit_profile(request):
    try:
        profile = Profile.objects.get(id=int(request.POST['profile_id']))
        profile.section=request.POST['section']
        profile.save()
        result = True
    except:
        result = False
    
    profiles = package_queryset_json(get_profiles_table(int(request.POST['survey_id'])))

    return JsonResponse({'result':result, 'profiles':profiles})


'''
@name delete_profile
delete profile data
return updated dict of profile info
'''
def delete_profile(request):
    try:
        profile = Profile.objects.get(id=int(request.POST['id']))
        profile.delete()
        result = True
    except:
        result = False

    profiles = package_queryset_json(get_profiles_table(int(request.POST['survey_id'])))

    return JsonResponse({'result':result, 'profiles':profiles})


'''
@name calculate_profile_datums
calculate beach width and volume
return updated dict of beach info
'''
def calculate_profile_datums(request):
    try:
        profile = Profile.objects.get(id=int(request.POST['profile_id']))
        stations = get_stations_table(int(request.POST['profile_id']))
        waterline = 

        profile.width = calc_beach_width(stations, waterline)
        profile.volume = calc_beach_volume(stations, waterline)

        result = True
    except:
        result = False

    profiles = package_queryset_json(get_profiles_table(int(request.POST['survey_id'])))

    return JsonResponse({'result':result, 'profiles':profiles})


'''
@name populate_station_table
return dict of beach info
'''
def populate_station_table(request):
    stations = {}
    try:
        stations = package_queryset_json(get_stations_table(request.POST['profile_id']))
        result = True
    except:
        result = False

    return JsonResponse({'result':result, 'profiles':stations})


'''
@name add_station
add station data
return updated dict of station info
'''
def add_station(request):
    try:
        profile = Profile.objects.get(id=int(request.POST['profile_id']))

        station = Station()
        station.distance=request.POST['distance']
        station.z=request.POST['z']
        station.comment=request.POST['comment']
        station.save()

        reduced = Reduced()
        reduced.save()

        mapper = Profilestationmap()
        mapper.profile = profile
        mapper.station = station
        mapper.reduced = reduced
        mapper.save()

        result = True
    except:
        result = False
    
    stations = package_queryset_json(get_stations_table(int(request.POST['profile_id'])))

    return JsonResponse({'result':result, 'stations':stations})


'''
@name edit_station
edit station data
return updated dict of station info
'''
def edit_station(request):
    try:
        station = Station.objects.get(id=int(request.POST['id']))
        station.distance=request.POST['distance']
        station.z=request.POST['z']
        station.comment=request.POST['comment']
        station.save()
        result = True
    except:
        result = False
    
    stations = package_queryset_json(get_stations_table(int(request.POST['profile_id'])))

    return JsonResponse({'result':result, 'stations':stations})


'''
@name delete_station
delete station data
return updated dict of beach info
'''
def delete_station(request):
    try:
        station = Station.objects.get(id=int(request.POST['id']))
        station.delete()
        result = True
    except:
        result = False

    stations = package_queryset_json(get_stations_table(int(request.POST['profile_id'])))

    return JsonResponse({'result':result, 'stations':stations})