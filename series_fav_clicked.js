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
    var url = 'http://localhost:8080/add_series_fav?name=' + name + '&code=' + code + '&desc=' + desc + '&price=' + price + '&url=' + document.URL;
    var script = document.createElement('script');
    script.setAttribute('src', url);
    document.getElementsByTagName('head')[0].appendChild(script);
  }
  else {
    hrefNode.textContent = '收藏';
    var url = 'http://localhost:8080/del_series_fav?name=' + name + '&code=' + code;
    var script = document.createElement('script');
    script.setAttribute('src', url);
    document.getElementsByTagName('head')[0].appendChild(script);
  }
}

