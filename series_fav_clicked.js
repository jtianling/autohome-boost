function scriptLoad(url) {
  var commonScript = document.createElement('script');
  commonScript.setAttribute('src', url);
  commonScript.setAttribute('charset', 'UTF-8');
  document.getElementsByTagName('head')[0].appendChild(commonScript);
}

function series_fav_clicked() {
  console.log('addFav called');

  // get the infos
  var desc = document.getElementsByClassName("carname")[0].textContent;
  console.log("desc: " + desc);

  var name = document.getElementsByClassName("mini_right")[0].getElementsByClassName("reda")[0].textContent;
  console.log("name: " + name);

  var price = document.getElementsByClassName("price")[0].textContent;
  console.log("price: " + price);

  var href = document.getElementsByClassName("carname")[0].getElementsByTagName("a")[0].getAttribute("href");
  var code = href.substring(0, href.length - 1);
  console.log("code: " + code);

  var hrefNode = $('series_fav_href');
  if (hrefNode.textContent === '收藏') {
    hrefNode.textContent = '已收藏';
    var url = 'http://localhost:10001/add_series_fav?name=' + name + '&code=' + code + '&desc=' + desc + '&price=' + price + '&url=' + document.URL;
    scriptLoad(url);
  }
  else {
    hrefNode.textContent = '收藏';
    var url = 'http://localhost:10001/del_series_fav?name=' + name + '&code=' + code;
    scriptLoad(url);
  }
}

