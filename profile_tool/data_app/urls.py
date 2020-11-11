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
    path('update_beach', views.update_beach, name='update_beach'),
    path('edit_beach', views.edit_beach, name='edit_beach'),
    path('delete_beach', views.delete_beach, name='delete_beach'),


    path('populate_survey_table', views.populate_survey_table, name='populate_survey_table'),
    path('add_survey', views.add_survey, name='add_survey'),
    path('update_survey', views.update_survey, name='update_survey'),
    # path('edit_beach', views.edit_beach, name='edit_beach'),
    # path('delete_beach', views.delete_beach, name='delete_beach'),


    path('populate_profile_table', views.populate_profile_table, name='populate_profile_table'),
    path('add_profile', views.add_profile, name='add_profile'),
    path('update_profile', views.update_profile, name='update_profile'),
    # path('edit_beach', views.edit_beach, name='edit_beach'),
    # path('delete_beach', views.delete_beach, name='delete_beach'),


    path('populate_station_table', views.populate_station_table, name='populate_station_table'),
    path('add_station', views.add_station, name='add_station'),
    path('update_station', views.update_station, name='update_station'),
    # path('edit_beach', views.edit_beach, name='edit_beach'),
    # path('delete_beach', views.delete_beach, name='delete_beach'),
]