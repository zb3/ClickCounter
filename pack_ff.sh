mv manifest.json manifest_chrome.json

cat manifest.ff.json > manifest.json
tail -n +2 manifest_chrome.json >> manifest.json

zip cc.xpi manifest.json popup.html popup.js background.js count.js icon.png

rm manifest.json
mv manifest_chrome.json manifest.json