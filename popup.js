function $(id) { //jQuery micro v0.0 (C) zb3 2016
  return document.getElementById(id);
}

var topDomains = null,
  domainData = null,
  topDomainsOffset = 0,
  domainsPerPage = 8;

document.addEventListener('DOMContentLoaded', function() {
  $('clear-stats').onclick = function() {
    clear();
  };
  $('clear-domain-stats').onclick = function() {
    clear(true);
  };
  $('domains-next-page').onclick = function(e) {
    e.preventDefault();
    topDomainsOffset += domainsPerPage;
    displayDomains();
  };
  $('domains-prev-page').onclick = function(e) {
    e.preventDefault();
    topDomainsOffset -= domainsPerPage;
    displayDomains();
  };
});

function displayDomains() {
  var drows = [],
    nrow, ncell;

  topDomainsOffset = Math.min(topDomainsOffset, topDomains.length);

  $('top-domains').innerHTML = '';

  for (var t = topDomainsOffset; t < topDomains.length && t < topDomainsOffset + domainsPerPage; t++) {
    nrow = document.createElement('tr');

    ncell = document.createElement('td');
    ncell.textContent = t + 1;
    nrow.appendChild(ncell);

    ncell = document.createElement('td');
    ncell.textContent = topDomains[t];
    ncell.setAttribute('title', topDomains[t]);
    nrow.appendChild(ncell);

    ncell = document.createElement('td');
    ncell.textContent = domainData[topDomains[t]];
    nrow.appendChild(ncell);

    $('top-domains').appendChild(nrow);
  }

  $('domains-next-page').className = topDomains.length > topDomainsOffset + domainsPerPage ? 'on' : '';
  $('domains-prev-page').className = topDomainsOffset ? 'on' : '';
}



function refresh(o) {
  var stats = o.stats;

  $('today').textContent = stats.clicksToday;
  $('results-yesterday').style.display = stats.clicksYesterday ? '' : 'none';

  if (stats.clicksYesterday)
    $('yesterday').textContent = stats.clicksYesterday;

  $('total').textContent = stats.totalClicks;

  domainData = o.domains;
  topDomains = Object.keys(o.domains);
  topDomains.sort(function(a, b) {
    return o.domains[b] - o.domains[a];
  });

  $('domain-stats').style.display = topDomains.length ? '' : 'none';
  displayDomains();

  $('loading').style.display = 'none';
  $('results').style.display = '';

}

chrome.runtime.sendMessage({
  type: 'retrieve'
}, refresh);

function clear(domains) {
  var really = confirm('Clear this stuff?');

  if (really)
    chrome.runtime.sendMessage({
      type: 'clear',
      domains: domains
    }, refresh);
}