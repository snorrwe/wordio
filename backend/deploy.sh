#!/bin/bash

sudo apt-get update
sudo apt-get install apache2 
python -m pip install --no-cache-dir -r ./requirements.txt

sudo cp ./conf/httpd.conf /etc/httpd/conf/
sudo cp -r ./app /var/www/wordio
sudo apache2ctl configtest
sudo systemctl restart apache2

