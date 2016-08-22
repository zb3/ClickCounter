# ClickCounter

This is a WebExtension (both chrome and firefox supported), which allows you to find out how much clicks you make on the web. Looks like this:

![Fancy screenshot](https://github.com/zb3/ClickCounter/raw/master/screenshot.png)

But what counts as "click on the web"?

* Mouse click or emulated "click" event
* Made on a website - browser UI or internal browser URL's don't count
* Made using a primary button (left button), or:
* The one that triggers "contextmenu" event (right click)

This extension was tested on Firefox 48 and Chromium 52.

## Installing 

You need to download or clone this repo first. Like this:
```
git clone https://github.com/zb3/ClickCounter.git
```

### In /chrom(e|ium)/i

I didn't pay Google $5, so this extension is not published on webstore, but we can install it anyway:

1. Go to `chrome://extensions`
2. Drag file named `cc.crx` into that page
3. ~~Uninstall~~ Enjoy!

alternatively, you could enable the "Developer mode" there and click on <kbd>Load unpacked extension...</kbd> button, then select this project's directory.

### In Firefox, until restart

1. Go to `about:debugging`
2. Click <kbd>Load Temporary Add-on</kbd>
3. Select any file in the project's directory.

### In Firefox, permanently

Oh, this is a little harder, because I didn't submit this to AMO, and I didn't sign this either. But since we're advanced users, we can do everything, including installing `ClickCounter` on Firefox.

1. Make sure you have a version of Firefox that doesn't require signing addons:
   * On Windows this is trivial - just use Beta or Developer version
   * On Linux the above is not always easy, fortunately there's a [crack](https://gist.github.com/zb3/cfbb94e45d9318adcb63051a66a586ea). After running that you'll also need to set `xpinstall.signatures.required` to `false` in `about:config`. And of course, after browser update, you'll need to reapply the crack. But this is fun!

   Or just sign the `cc.xpi` file by submitting it to Mozilla. :)

2. Drag the file named `cc.xpi` into the browser

## Notes

Some domain names are long so they don't fit, and you should then see `...` in that domain name. But if you copy that, whole domain name will be copied. Thanks to `text-overflow` magic!

## Development

To pack the extension, use:
```
./pack_ff.sh
./pack_chrome.sh #requires "chromium" installed
```

Note that `manifest.ff.json` is not a JSON file (makes sense, right?), it contains FF specific addition, namely addon ID, which is required for unsigned addons.

But we need this only for `xpi` packed addons, you can still use `about:debugging`  + <kbd>Load Temporary Add-on</kbd> with chrome-compatible `manifest.json` file.

For chrome, <kbd>Load unpacked extension</kbd> should work just fine.