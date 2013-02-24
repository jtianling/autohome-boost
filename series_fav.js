var seriesUrlPattern = /http:\/\/www.autohome.com.cn\/\d+\//;
console.log(document.URL);

// fliter the error pages with a program way, because the matches' way of google's manifest's content_scripts is not usable.
if ( document.URL.match(seriesUrlPattern) !== null ) {

  // get the name and code
  var name = document.getElementsByClassName("mini_right")[0].getElementsByClassName("reda")[0].textContent;
  console.log("name: " + name);

  var href = document.getElementsByClassName("carname")[0].getElementsByTagName("a")[0].getAttribute("href");
  var code = href.substring(0, href.length - 1);
  console.log("code: " + code);

  // decide if it was faved.
  var xhr = new XMLHttpRequest();
  var url = 'http://localhost:10001/is_series_fav?name=' + name + '&code=' + code;
  xhr.onreadystatechange = handler;
  xhr.open("GET", url, true);
  xhr.send(null);

  var favText = '收藏';
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

  var seriesScript = document.createElement('script');
  seriesScript.setAttribute('src', chrome.extension.getURL('series_fav_clicked.js'));
  seriesScript.setAttribute('charset', 'UTF-8');
  document.getElementsByTagName('head')[0].appendChild(seriesScript);

  // add the feature after get the infos.
  function addTheFavFeature() {
    var element = document.getElementsByClassName("carname");
    element[0].outerHTML = element[0].outerHTML + '<div class="series_fav" id="series_fav"> \
                           <a id="series_fav_href" href="javascript:void(0)" onclick="series_fav_clicked();">' + favText + '</a> </div>';
  }
}

