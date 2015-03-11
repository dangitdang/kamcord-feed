import urllib2
import os
URL = 'https://www.kamcord.com/app/v1/videos/feeds/1/1?page='
for i in xrange(2, 100):
	response = urllib2.urlopen(URL+str(i))
	json = response.read()
	file = open("feed"+str(i)+".json", "wb")
	file.write(json)
	file.close()
	print "Finished feed", i

