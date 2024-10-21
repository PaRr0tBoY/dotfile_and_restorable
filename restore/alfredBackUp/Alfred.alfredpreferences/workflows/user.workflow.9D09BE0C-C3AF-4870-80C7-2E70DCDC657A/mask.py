#!/usr/bin/python
# coding: UTF-8

import sys, PIL

from PIL import Image, ImageOps

qr = sys.argv[1]

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