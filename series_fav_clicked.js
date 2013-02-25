function scriptLoad(url) {
  var script = document.createElement('script');
  script.setAttribute('src', url);
  script.setAttribute('charset', 'UTF-8');
  document.getElementsByTagName('head')[0].appendChild(script);
}

function series_fav_clicked() {
  console.log('addFav called');

  // get the infos
  var desc = document.getElementsByClassName("carname")[0].textContent;
  console.log("desc: " + desc);

  var nameNode = document.getElementsByClassName("mini_right")[0].getElementsByClassName("reda")[0];
  if (nameNode === undefined) {
    // not login
    alert('请先登录, 然后再使用收藏功能');
  }

  var name = nameNode.textContent;
  console.log("name: " + name);

  var priceNodes = document.getElementsByClassName('price');
  var price = '暂无价格信息';
  if (priceNodes.length !== 0) {
    price = priceNodes[0].textContent;
    console.log("price: " + price);
  }

  var href = document.getElementsByClassName("carname")[0].getElementsByTagName("a")[0].getAttribute("href");
  var code = href.substring(0, href.length - 1);
  console.log("code: " + code);

  var hrefNode = $('series_fav_href');
  if (hrefNode.textContent === '收藏') {
    hrefNode.textContent = '已收藏';
    var url = 'http://42.121.57.45:10001/add_fav?name=' + encodeURIComponent(name) + '&type=series&code=' + code + '&desc=' + encodeURIComponent(desc) + '&price=' + encodeURIComponent(price) + '&url=' + document.URL;
    scriptLoad(url);
  }
  else {
    hrefNode.textContent = '收藏';
    var url = 'http://42.121.57.45:10001/del_fav?name=' + encodeURIComponent(name) + '&type=series&code=' + code;
    scriptLoad(url);
  }
}

