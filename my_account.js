console.log(document.URL);

var args = document.URL.split('?');
console.log(args[1]);

var xhr = new XMLHttpRequest();
var url = 'http://localhost:10001/get_series_favs?name=' + args[1];
xhr.onreadystatechange = handler;
xhr.open("GET", url, true);
xhr.send(null);

function pushFav(favObj) {
  var favs = document.getElementById('series_fav');
  var liNode = document.createElement('li');
  liNode.innerHTML = '<a target="_blank" href="' + favObj.url + '">' + decodeURIComponent(favObj.desc) + '</a>\t' + decodeURIComponent(favObj.price);
  favs.appendChild(liNode);
}

function handler() {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      console.log(xhr.responseText);
      var favResult = JSON.parse(xhr.responseText);
      console.log(favResult);

      for(var i = 0; i < favResult.length; ++i) {
        console.log(favResult[i]);
        pushFav(favResult[i]);
      }
    }
    else {
      console.log("Error with Ajax Call!");
    }
  }
}
