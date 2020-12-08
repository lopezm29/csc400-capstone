################
#Station Datums#
################
'''
@name calc_beach_width
find mhhw and calculate beach width (distance from first station to mhhw)
return beach_width
'''
def normalize_station_data(stations, elevation_control):
    pult_index, mhhw = find_intercept(stations=stations, waterline=waterline)
    beach_width = mhhw - stations[0]
    return beach_width


################
#Profile Datums#
################
'''
@name find_intercept
@param list of station dictionaries (stations), elevation level to find intercept at (intercept z)
delete station data
return penultimate_station_index, mhhw
'''
def find_intercept(stations, intercept_z):

    for i in range(len(stations)-1):
        if stations[i]['z'] <= intercept_z and intercept_z >= stations[i+1]['z']:
            m = (stations[i+1]['z']-stations[i]['z']) / (stations[i+1]['distance']-stations[i]['distance'])
            b = stations[i]['z'] - (m * stations[i]['distance'])
            intercept_distance = (intercept_z-b)/m
            return intercept_distance, i


'''
@name calc_beach_width
@param list of station dictionaries (stations), mean higher high water elevation (mhhw)
find mhhw and calculate beach width (euclidian distance from first station to the horizontal at mhhw)
return beach_width
'''
def calc_beach_width(stations, mhhw):
    intercept_distance, penult_index = find_intercept(stations=stations, intercept_z=mhhw)
    beach_width = intercept_distance - stations[0]['distance']
    return beach_width


'''
@name calc_beach_volume
@param list of station dictionaries (stations), mean lower low water elevation (mllw)
calculates area under a profile's curve down to mllw point using riemann sums (called beach volume)
return beach_volume
'''
def calc_beach_volume(stations, mllw):
    intercept_distance, penult_index = find_intercept(stations=stations, intercept_z=mllw)
    beach_volume = 0
    for i in range(len(stations)-1):
        if i == penult_index:
            left_height = stations[i]['z'] - mllw
            distance = intercept_distance - stations[i]['distance']
            triangle = (left_height * distance / 2)
            beach_volume += triangle

            return beach_volume
        else:
            left_height = stations[i]['z'] - mllw
            right_height = stations[i+1]['z'] - mllw
            distance = stations[i+1]['distance'] - stations[i]['distance']
            trapezoid_area = (left_height + right_height) * distance / 2 
            beach_volume += trapezoid_area
        
    return beach_volume