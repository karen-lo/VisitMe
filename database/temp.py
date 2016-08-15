# $env:Path="C:\Program Files\MongoDB\Server\3.2\bin"

# mongoimport -h ds053972.mlab.com:53972 -d vis
# itme -c visitors -u karenlo -p afy --file .\NationalNames.csv --type
#  csv --headerline

import os
import sys
import random

from sys import argv
script, filename, filename2 = argv

# lastnames = []

# with open(lastname, 'r') as f:
# 	for line in f:
# 		line = line.strip()
# 		lastnames.append(line)


f = open(filename, 'r')
lines = f.readlines()
f.close()

first = True
f = open(filename2, 'w')
for line in lines:
	if(first == True):
		f.write(line)
		first = False
		continue

	#print line.split('\t')[0]
	#f.write(line.split('\t')[0] + '\n')
	
	# i = random.randint(0,1)
	# if(i == 0):
	# 	f.write(line)

	sections = line.split(',', 3)

	# sections[2] = 2016 - int(sections[2])

	# if(sections[2] > 12 and sections[2] < 90):
	# 	line = ""
	# 	for x in range(len(sections)):
	# 		line = line + str(sections[x])
	# 		if(x != len(sections)-1):
	# 			line = line + ","
	# 	f.write(line)

	# count = int(sections[4])
	# for x in range(len(sections)-1):
	# 	count = count/2

	# sections[4] = str(count)
	# line = ""
	# for x in range(len(sections)):
	# 	line = line + str(sections[x])
	# 	if(x != len(sections)-1):
	# 		line = line + ","
	# f.write(line + "\n")

	# if(int(sections[4]) > 50):
	# 	f.write(line)

	# count = int(sections[4])
	# line = ""
	# for x in range(len(sections)-1):
	# 	line = line + str(sections[x])
	# 	if(x != len(sections)-2):
	# 		line = line + ","

	# for x in range(count):
	# 	f.write(line + "\n")

	# lname = lastnames[random.randint(0, len(lastnames)-1)]
	# lname = lname.title()

	# sections[0] = lname
	# line = ""
	# for x in range(len(sections)):
	# 	line = line + str(sections[x])
	# 	if(x != len(sections)-1):
	# 		line = line + ","
	# f.write(line)

	# temp = sections[0]
	# sections[0] = sections[1]
	# sections[1] = temp
	# line = ""
	# for x in range(len(sections)):
	# 	line = line + str(sections[x])
	# 	if(x != len(sections)-1):
	# 		line = line + ","
	# f.write(line)

	i = random.randint(0,9)
	if(i == 9):
		sections[3] = "Other"
	else:
		sections[3] = sections[3].strip()
		if(sections[3] == "F"):
			sections[3] = "Female"
		else:
			sections[3] = "Male"
	line = ""
	for x in range(len(sections)):
		line = line + str(sections[x])
		if(x != len(sections)-1):
			line = line + ","
	f.write(line + "\n")
	# print line
	# break
	

f.close()