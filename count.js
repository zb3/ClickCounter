/*
we use passive, does this mean that clicking on a link may fail?
in the future?
*/
document.addEventListener('click', function(e) {
  if (!e.button && e.isTrusted)
    chrome.runtime.sendMessage({
      type: 'click',
      domain: location.hostname,
      time: Date.now()
    });
}, {
  passive: true,
  capture: true
});

document.addEventListener('contextmenu', function(e) {
  if (e.buttons && e.isTrusted)
    chrome.runtime.sendMessage({
      type: 'context',
      domain: location.hostname,
      time: Date.now()
    });
}, {
  passive: true,
  capture: true
});