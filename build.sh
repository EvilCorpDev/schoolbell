( cd src/main/web-client ; npm run build )
mkdir src/main/web-client/build/js
mkdir src/main/web-client/build/css
mv src/main/web-client/build/static/js/* src/main/web-client/build/js/
mv src/main/web-client/build/static/css/* src/main/web-client/build/css/
rm -r src/main/web-client/build/static/
( cd src/main/web-client/build ; sed -i '.original' -e  's/\/static\///g' index.html )
( cd src/main/web-client/build ; rm index.html.original )
mv src/main/web-client/build/* src/main/resources/public/
mvn clean package