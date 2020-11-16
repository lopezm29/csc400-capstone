from django.db.models import F
from .models import *


def package_queryset_json(queryset):
    packaged_dict = {}
    for row in queryset:
        packaged_dict[row['id']] = row
    return packaged_dict


#################
#Query functions#
#################
'''
@name get_beach_table
return dict of beach info
'''
def get_beaches_table():
    return Beach.objects.all().values()


'''
@name get_survey_table
return dict of survey info
'''
def get_surveys_table(beach_id):
    surveys = Beachsurveymap.objects.filter(
        beach__id=beach_id
    ).annotate(
        id_ph=F('survey__id'),
        start_date=F('survey__start_date'),
        mhhw=F('survey__mhhw'),
        mllw=F('survey__mllw')
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
        id_ph=F('profile__id'),
        section=F('profile__section'),
        elevation_control=F('profile__elevation_control'),
        width=F('profile__width'),
        volume=F('profile__volume')
    ).values()

    return profiles


'''
@name get_station_table
return dict of station info
'''
def get_stations_table(profile_id):
    stations = Profilestationmap.objects.filter(
        profile=profile_id
    ).annotate(
        id_ph=F('station__id'),
        number=F('station__number'),
        distance=F('station__distance'),
        z=F('station__z'),
        comment=F('station__comment'),
        true_distance=F('reduced__true_distance'),
        true_z=F('reduced__true_z')
    ).values()

    return stations


# '''
# @name get_station_table
# return waterline (z) value
# '''
# def get_stations_table(profile_id):
#     waterline_z = Profilestationmap.objects.filter(
#         profile=profile_id
#     ).filter(
#         comment="W.L."
#     ).annotate(
#         true_z=F('reduced__true_z'),
#     ).values().true_z

#     return waterline_z