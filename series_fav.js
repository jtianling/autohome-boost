var xhr = new XMLHttpRequest();
var url = 'http://localhost:8080/is_series_fav?name=a&code=10';
xhr.onreadystatechange = handler;
xhr.open("GET", url, true);
xhr.send(null);

var favText = '收藏';
function handler() {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      alert(xhr.responseText);
      var result = JSON.parse(xhr.responseText);
      if (result.result) {
        favText = '已收藏';
      }
      addTheFavFeature();
    }
    else {
      alert("Error with Ajax Call!");
    }
  }
}

function addTheFavFeature() {
  var element = document.getElementsByClassName("carname");
  element[0].outerHTML = element[0].outerHTML + '<div class="series_fav" id="series_fav"> \
  <a id="series_fav_href" href="javascript:void(0)" onclick="(function () {\
    console.log(\'addFav called\');\
    var hrefNode = $(\'series_fav_href\');\
    if (hrefNode.textContent === \'收藏\') {\
      hrefNode.textContent = \'已收藏\';\
    }\
    else {\
      hrefNode.textContent = \'收藏\';\
    }\
  })();\
  ">' + favText + '</a> </div>';
}

