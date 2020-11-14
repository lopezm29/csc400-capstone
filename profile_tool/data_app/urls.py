from django.urls import path
from . import views

urlpatterns=[
    path('', views.beaches, name='beaches'),
    path('surveys/<int:beach_id>', views.surveys, name='surveys'),
    path('surveys/<int:beach_id>/profiles/<int:survey_id>', views.profiles, name='profiles'),
    path('surveys/<int:beach_id>/profiles/<int:survey_id>/stations/<int:profile_id>', views.stations, name='stations'),

    ###############
    #ajax requests#
    ###############
    path('populate_beach_table', views.populate_beach_table, name='populate_beach_table'),
    path('add_beach', views.add_beach, name='add_beach'),
    path('edit_beach', views.edit_beach, name='edit_beach'),
    path('delete_beach', views.delete_beach, name='delete_beach'),


    path('populate_survey_table', views.populate_survey_table, name='populate_survey_table'),
    path('add_survey', views.add_survey, name='add_survey'),
    path('edit_survey', views.edit_survey, name='edit_survey'),
    path('delete_survey', views.delete_survey, name='delete_survey'),


    path('populate_profile_table', views.populate_profile_table, name='populate_profile_table'),
    path('add_profile', views.add_profile, name='add_profile'),
    path('edit_profile', views.edit_profile, name='edit_profile'),
    path('delete_profile', views.delete_profile, name='delete_profile'),


    path('populate_station_table', views.populate_station_table, name='populate_station_table'),
    path('add_station', views.add_station, name='add_station'),
    path('edit_station', views.edit_station, name='edit_station'),
    path('delete_station', views.delete_station, name='delete_station'),
]