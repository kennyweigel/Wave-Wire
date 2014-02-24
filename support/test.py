''' #V1
buoy_array = []
with open('5day.txt') as my_file:
    for line in my_file:
        if line[11:20] == '_5day.txt':            
            buoy_array.append(line[6:11])

unique_buoys = list(set(buoy_array) - set(['HCEF1','JKYF1','TIBC1','LMRF1','WIWF1',
                                           'BDVF1','WPLF1','GBTF1','48212','42023',
                                           'CANF1','LRKF1','PKYF1','TCVF1','WWEF1',
                                           'DKKF1','LMDF1','CWAF1','LMSS1','WRBF1',
                                           'BNKF1','45025']))
'''

#V2
buoy_array = []
with open('allbuoys.txt') as my_file:
    for line in my_file:
        buoy_array.append(line[7:12])
'''
unique_buoys = list(set(buoy_array) - set(['46072','TIBC1','51202','46094','31005',
                                           '31004','31007','31006','31003','31002',
                                           'SGOF1','31052','ERTF1','42023','15006',
                                           '15002','15001','JOXP4','45004','LONF1',
                                           'ESPP4','31001','46146','46208','46562',
                                           '22101','22103','22104','22105','22106',
                                           '22107','22108','62148','13001','13009',
                                           '13008','OCSM2','SVNM4','HRVC1','41026',
                                           '44098','MDRM1','CHLV2','LPWA2']))
'''
unique_buoys = buoy_array
#unique_buoys = unique_buoys[unique_buoys.index('TCMW1'):]

#print unique_buoys
#print len(unique_buoys)

import urllib2

measurement_format = '#YY  MM DD hh mm WDIR WSPD GST  WVHT   DPD   APD MWD   PRES '+\
               ' ATMP  WTMP  DEWP  VIS PTDY  TIDE'
unit_format = '#yr  mo dy hr mn degT m/s  m/s     m   sec   sec degT   hPa '+\
               ' degC  degC  degC  nmi  hPa    ft'    

for buoy in unique_buoys:
    print buoy
    dataa = []
    target_url = 'http://www.ndbc.noaa.gov/data/5day2/'+buoy+'_5day.txt'
    data = urllib2.urlopen(target_url).read(1000) # read only 1000 chars
    data = data.split("\n") # then split it into lines
    for line in data:
        dataa.append(line)
    #print measurement_format
    #print dataa[0]
    if measurement_format != dataa[0]:
        print '0 no match '+buoy
    #print unit_format
    #print dataa[1]
    if unit_format != dataa[1]:
        print '1 no match '+buoy
