#! /bin/sh
yarn run build &&
zip -r app.zip dist &&
scp app.zip user@example.com:app.zip &&
ssh user@example.com 'unzip app.zip -d tmp/; cp -r ~/tmp/dist/* /var/www/example.com; rm -r ~/tmp app.zip; exit' &&
rm app.zip
