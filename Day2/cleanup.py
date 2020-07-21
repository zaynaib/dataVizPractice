'''
read csv file
delete $ signs and , from csv file
create a clean data csv file
https://www.dataquest.io/blog/regular-expressions-data-scientists/
'''
import csv
import re

#create an empty array in order to hold the edited row data
readlines = []

with open('./sarah_car_value.csv','r+') as file:
    reader = csv.reader(file)
    #skip header
    next(reader)
    for row in reader:
        #grab the value column and replace the commas with blanks
        row[1] =re.sub(",","",row[1])
        
        #grab the value column and replace the $ with blanks
        row[1] = re.sub("\$","",row[1])
        readlines.append(row)


with open('./clean_car_value.csv','w') as csv_file:
    csv_file.write(f'Year,Value \n')

    for line in readlines:
        csv_file.write(f'{line[0]},{line[1]}\n')
        print(line)

