rm cc.crx cc.pem 2>/dev/null

mkdir cc
cp manifest.json cc
cp popup.html cc
cp popup.js cc
cp background.js cc
cp count.js cc
cp icon.png cc

chromium --pack-extension=cc

rm -r cc
