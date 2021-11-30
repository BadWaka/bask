cd fe
npm run build
rm -rf ../server/static/dist
mv dist ../server/static/
