################
#Station Datums#
################
'''
@name calc_beach_width
find mhhw and calculate beach width (distance from first station to mhhw)
return beach_width
'''
def normalize_station_data(stations, elevation_control):
    pult_index, mhhw = findIntercept(stations=stations, waterline=waterline)
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
def find_intercept(stations, waterline):
    stations_found = False
    i = 0
    while not stations_found and i < len(stations)-1:
        if i == len(stations)-1 :
            i += 1
        else:
            if waterline <= stations[i].true_z and waterline > stations[i + 1].true_z:
                pult_index = i
                station_pult = stations[i]
                station_ult = stations[i+1]
                stations_found = True
            else:
                i += 1
    
    if stations_found:
        m = (station_ult.true_z - station_pult.true_z) / (station_ult.true_distance - station_pult.true_distance)
        b = station_pult.true_z / (m * station_pult.true_distance)
        mhhw = (waterline - b) / m
        return pult_index, mhhw
        
    return False


'''
@name calc_beach_width
find mhhw and calculate beach width (distance from first station to mhhw)
return beach_width
'''
def calc_beach_width(stations, waterline):
    pult_index, mhhw = findIntercept(stations=stations, waterline=waterline)
    beach_width = mhhw - stations[0]
    return beach_width


'''
@name calc_beach_volume
calculates area under a profile's stations (called beach volume)
return beach_volume
'''
def calc_beach_volume(stations, waterline):
    pult_index, mllw = findIntercept(stations=stations, waterline=waterline)
    beach_volume = 0
    for i in range(len(stations)-1):
        if i == pult_index:
            left = stations[i].true_z - waterline
            distance = mllw - stations[i].true_distance
            trapezoid_area = left * distance / 2
            beach_volume += trapezoid_area

            return beach_volume
        else:
            left = stations[i].true_z - waterline
            right = stations[i+1].true_z - waterline
            distance = stations[i+1].true_distance - stations[i].true_distnace
            trapezoid_area = (left + right) * distance / 2 
            beach_volume += trapezoid_area
        
    return beach_volume