cd fe
npm run build
rm -rf ../server/static/dist
rm -rf ../server/static/css
rm -rf ../server/static/fonts
rm -rf ../server/static/js
rm -rf ../server/static/favicon.ico
rm -rf ../server/static/index.html
mv dist/* ../server/static/
npm run server:restart
