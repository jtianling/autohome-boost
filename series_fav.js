(function() {
  console.log('passed the manifest test');

  // \d+ matches the series code and the (\?.+)? matches the arugments
  var seriesUrlPattern = /http:\/\/www.autohome.com.cn\/\d+\/(\?.+)?/;
  console.log(document.URL);

  // fliter the error pages with a program way, because the matches' way of google's manifest's content_scripts is not usable.
  if ( document.URL.match(seriesUrlPattern) === null ) {
    return;
  }

  console.log('Ok, url passed the test');

  var seriesScript = document.createElement('script');
  seriesScript.setAttribute('src', chrome.extension.getURL('series_fav_clicked.js'));
  seriesScript.setAttribute('charset', 'UTF-8');
  document.getElementsByTagName('head')[0].appendChild(seriesScript);

  var favText = '收藏';
  // get the name and code
  var nameNode = document.getElementsByClassName("mini_right")[0].getElementsByClassName("reda")[0];
  if (nameNode === undefined) {
    // not login
    console.log('not login');
    addTheFavFeature();
    return;
  }

  var name = nameNode.textContent;
  console.log("name: " + name);

  var myAccountUrl = '"chrome-extension://dnokncbknhiodkeejcakabdoicehgkcd/my_account.html?' + encodeURIComponent(name) + '"';
  var myAccountNode = document.createElement('li');
  myAccountNode.innerHTML = '<a href=' + myAccountUrl + ' target="_blank"> 收藏列表 </a>';
  document.getElementById('login').appendChild(myAccountNode); 

  var href = document.getElementsByClassName("carname")[0].getElementsByTagName("a")[0].getAttribute("href");
  var code = href.substring(0, href.length - 1);
  console.log("code: " + code);

  // decide if it was faved.
  var xhr = new XMLHttpRequest();
  var url = 'http://42.121.57.45:10001/is_fav?name=' + encodeURIComponent(name) + '&type=series&code=' + code;
  xhr.onreadystatechange = handler;
  xhr.open("GET", url, true);
  xhr.send(null);

  function handler() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        console.log(xhr.responseText);
        var result = JSON.parse(xhr.responseText);
        if (result.result) {
          favText = '已收藏';
        }
        addTheFavFeature();
      }
      else {
        console.log("Error with Ajax Call!");
      }
    }
  }


  // add the feature after get the infos.
  function addTheFavFeature() {
    var element = document.getElementsByClassName("carname");
    element[0].outerHTML = element[0].outerHTML + '<div class="series_fav" id="series_fav"> \
                           <a id="series_fav_href" href="javascript:void(0)" target="_blank" onclick="series_fav_clicked();">' + favText + '</a> </div>';
  }

})();
