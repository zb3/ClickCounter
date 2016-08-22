/*
it's persistent because otherwise I'd need to make assumptions like user can't click before the data has been saved or the click would be lost etc... there must be something sync there...
*/
var cache = null,
  domainCache = null;

//currently, we can't reliably detect everything we need
//in order to avoid duplicate events, so let's use this hack...
var lastEventTime = 0;

chrome.storage.local.get(null, readCache);

if (chrome.runtime.onInstalled)
chrome.runtime.onInstalled.addListener(function() {
  chrome.tabs.query({}, function(tabs) {
    for (var t = 0; t < tabs.length; t++)
      chrome.tabs.executeScript(tabs[t].id, {
        file: 'count.js',
        allFrames: true,
        matchAboutBlank: true
      }, function() {
        chrome.runtime.lastError; //no longer unchecked...
      });
  });
});

function getDate() {
  var d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

function readCache(obj) {
  chrome.runtime.onMessage.addListener(function(o, s, respond) {
    if (!o.type) return;

    if ((o.type === 'click' || o.type === 'context') && (!o.time || o.time > (lastEventTime + 20))) {
      storeClick(o.domain);

      if (o.time)
        lastEventTime = o.time;
    } else {
      if (o.type === 'clear')
        clear(o.domains);
      else if (o.type === 'retrieve')
        checkDay();

      respond({
        stats: cache,
        domains: domainCache
      });
    }
  });


  cache = obj;
  domainCache = obj.domains;

  delete cache.domains;

  if (!cache.currentDay) {
    cache.currentDay = getDate();
    cache.totalClicks = cache.clicksToday = cache.clicksYesterday = 0;
  }

  if (!domainCache)
    domainCache = {};
}

function checkDay() {
  var d = getDate();

  if (cache.currentDay < d) {
    if (Math.round((d - cache.currentDay) / 86400000) < 2) //SO people would recommend using a library
      cache.clicksYesterday = cache.clicksToday;

    cache.clicksToday = 0;
    cache.currentDay = getDate();
  }
}

function storeClick(domain) {
  if (!cache) return; //shouldn't happen (TM)

  checkDay();
  cache.clicksToday++;
  cache.totalClicks++;

  if (domain)
    domainCache[domain] = (domainCache[domain] || 0) + 1;

  syncCache();
  syncDomainCache();
}

function clear(domains) {
  if (domains) {
    domainCache = {};
    syncDomainCache();
  } else {
    cache.currentDay = getDate();
    cache.clicksToday = cache.clicksYesterday = cache.totalClicks = 0;
    syncCache();
  }
}

function syncCache() {
  chrome.storage.local.set(cache);
}

function syncDomainCache() {
  chrome.storage.local.set({
    domains: domainCache
  });
}