#!/usr/bin/python
# coding: UTF-8

import sys, os

qr = sys.argv[1]
argument = sys.argv[2]

COUNTRY = os.getenv('COUNTRY')
LIMIT = os.getenv('LIMIT')

if argument == '--list':

    import urllib.parse, urllib.error, urllib.request, json, re

    def lookup(query, country=COUNTRY):
        appid = re.search('(^.*/id)([0-9]*)(\?.*$)', query).group(2)
        dictionary = urllib.request.urlopen('https://itunes.apple.com/lookup?id=' + appid + '&country' + country).read()
        return json.loads(dictionary)

    def results(query, media='software', country=COUNTRY, entity='software,iPadSoftware,macSoftware', limit=LIMIT):
        query = urllib.parse.quote_plus(query)
        dictionary = urllib.request.urlopen('https://itunes.apple.com/search?term='+ query + '&country=' + country + '&entity=' + entity + '&limit=' + str(limit) + '&media=' + media).read()
        return json.loads(dictionary)

    def device(item):
        '''if item['supportedDevices'] == ['AppleTV4']:
            return 'AppleTV'''
        if item['kind'] == 'software':
            return 'iOS'
        elif item['kind'] == 'mac-software':
            return 'macOS'

    def loop(item, num):
        for i in range (0,num):
            print ('<item>')
            print ('<arg><![CDATA[' + item[i]['artworkUrl512'] + '^' + item[i]['trackName'] + '^' + device(item[i]) + ']]></arg>')
            print ('<title><![CDATA[' + item[i]['trackName'] + ']]></title>')
            print ('<subtitle><![CDATA[', device(item[i]), '|', item[i]['formattedPrice'], '| by:', item[i]['sellerName'], ']]></subtitle>')
            print ('</item>')

    if qr.startswith("http"):
        appsearch = lookup(qr)
    else:
        appsearch = results(qr)

    number = appsearch['resultCount']

    print ('<?xml version="1.0"?><items>')

    if number == 0:
        print ('<item><title>Couldn\'t find any apps</title></item>')
    else:
        item = appsearch['results']
        loop(item, number)

    print ('</items>')

elif argument =='--local':
    import json
    from subprocess import Popen, PIPE

    nameof = sys.argv[3]

    def plist_to_dictionary(filename):
        "Pipe the binary plist through plutil and parse the JSON output"
        with open(filename, "rb") as f:
            content = f.read()
        args = ["plutil", "-convert", "json", "-o", "-", "--", "-"]
        p = Popen(args, stdin=PIPE, stdout=PIPE)
        p.stdin.write(content)
        out, err = p.communicate()
        return json.loads(out)

    if nameof == '--icon':
        print(plist_to_dictionary(qr)['CFBundleIconFile'])
    elif nameof == '--name':
        print(plist_to_dictionary(qr)['CFBundleExecutable'])

elif argument == '--mask':
    try:
        from PIL import Image, ImageOps

        im = Image.open(qr)

        w, h = im.size

        if w == 512 and h == 307:
        	mask = Image.open('maskTV.png').convert('L')
        elif w == 512:
            mask = Image.open('mask512.png').convert('L')
        else:
            mask = Image.open('mask.png').convert('L')
        
        output = ImageOps.fit(im, mask.size, centering=(0.5,0.5))
        output.putalpha(mask)
        output.save(qr + '.png')
    except Exception:
        pass

    print (qr)