(function() {
  console.log('my_favs passed the manifest test');

  // if login
  var nameNode = document.getElementsByClassName("mini_right")[0].getElementsByClassName("reda")[0];
  if (nameNode === undefined) {
    // not login
    console.log('not login');
    return;
  }

  var name = nameNode.textContent;
  console.log("name: " + name);

  var myAccountUrl = chrome.extension.getURL('my_account.html');
  myAccountUrl = '"' + myAccountUrl + '?' + encodeURIComponent(name) + '"';
  var myAccountNode = document.createElement('li');
  myAccountNode.innerHTML = '<a href=' + myAccountUrl + ' target="_blank"> 收藏列表 </a>';
  document.getElementById('login').appendChild(myAccountNode); 
})();
