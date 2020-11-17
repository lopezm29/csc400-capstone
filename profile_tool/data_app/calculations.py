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
delete station data
return penultimate_station_index, mhhw
'''
def find_intercept(stations, intercept_z):
    # stations_found = False
    # i = 0

    for i in range(len(stations)-1):
        if stations[i]['z'] <= intercept_z and intercept_z >= stations[i+1]['z']:
            m = (stations[i+1]['z']-stations[i]['z']) / (stations[i+1]['distance']-stations[i]['distance'])
            b = stations[i]['z'] - (m * stations[i]['distance'])
            intercept_distance = (intercept_z-b)/m
            return intercept_distance, i
        

    # while not stations_found and i < len(stations)-1:
    #     if i == len(stations)-1 :
    #         i += 1
    #     else:
    #         if waterline <= stations[i]['z'] and waterline > stations[i + 1]['z']:
    #             pult_index = i
    #             station_pult = stations[i]
    #             station_ult = stations[i+1]
    #             stations_found = True
    #         else:
    #             i += 1
    
    # if stations_found:
    #     m = (station_ult['z'] - station_pult['z']) / (station_ult['distance'] - station_pult['distance'])
    #     b = station_pult['z'] / (m * station_pult['distance'])
    #     mhhw = (waterline - b) / m
    #     print("m: " + str(m))
    #     print("b: " + str(b))
    #     print("mhhw: " + str(mhhw))        
    #     return pult_index, mhhw
        
    # return False


'''
@name calc_beach_width
find mhhw and calculate beach width (euclidian distance from first station to the horizontal at mhhw)
return beach_width
'''
def calc_beach_width(stations, mhhw):
    intercept_distance, intercept_index = find_intercept(stations=stations, intercept_z=mhhw)
    beach_width = intercept_distance - stations[0]['distance']
    return beach_width


'''
@name calc_beach_volume
calculates area under a profile's stations using riemann sums (called beach volume)
return beach_volume
'''
def calc_beach_volume(stations, mllw):
    intercept_distance, intercept_index = find_intercept(stations=stations, intercept_z=mllw)
    beach_volume = 0
    for i in range(len(stations)-1):
        if i == intercept_index:
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