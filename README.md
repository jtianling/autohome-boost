# Autohome网站增强插件(Autohome boost)
## 简介
目前仅有的功能是实现autohome对车系的收藏.  但是服务器方面已经实现了对收藏的通用实现, 并且客户端的代码已经开源.  
欢迎大家添加更多的新功能, 比如对具体车型, 新闻, 文章等的收藏.  

## 客户端代码说明
主要通过chrome插件的[content_scripts](http://developer.chrome.com/extensions/content_scripts.html)功能实现功能添加.  
用了web_accessible_resources功能加载了series_fav_clicked.js文件, 主要是方便直接在网站的环境中添加代码, 省的一堆转义.  假如不嫌累的话, 直接在series_fav.js的addTheFavFeature函数中也可以完成所有功能.  
代码本身比较简单, 需要说明的不多, 主要的功能都是使用JSONP实现在autohome的环境中运行了我服务器上的脚本而已.  

## 服务端接口说明
### 增加车系收藏
http://42.121.57.45:10001/add_fav  
参数: type(收藏的类型), name(用户名), code(收藏编号) 以及任意想保存的属性.  比如在series的收藏中, 我添加了三个属性: desc(描述), price(价格), url(网址)  
返回结果: 无  
  
### 删除车系收藏  
http://42.121.57.45:10001/del_fav  
参数: type(收藏的类型), name(用户名), code(收藏编号)  
返回结果: 无  
  
### 查询车系收藏情况  
http://42.121.57.45:10001/is_fav  
参数: type(收藏的类型), name(用户名), code(收藏编号)  
返回结果: Json对象, 唯一的属性为bool类型的result, true表示已收藏, false表示还未收藏.  
  
### 获取所有我的收藏  
http://42.121.57.45:10001/get_favs  
参数: type(收藏的类型), name(用户名)  
返回结果: Json类型, 为add_fav时添加的所有属性的数组, 典型的形式如下:  

```json
[{"name":"九天雁翎","type":"series","code":"364","desc":"长安福特-福克斯",
  "price":"9.98～16.99万","url":"http://www.autohome.com.cn/364/"}, 
{"name":"九天雁翎","type":"series","code":"577","desc":"长安福特-蒙迪欧-致胜",
  "price":"16.98～25.68万","url":"http://www.autohome.com.cn/577/"},
{"name":"九天雁翎","type":"series","code":"2863","desc":"长安福特-翼虎",
  "price":"19.38～27.58万","url":"http://www.autohome.com.cn/2863/"}] 
```
  
目前的type类型是series(车系).  
推荐将来的收藏类型为 spec(具体车型), new(新闻), article(文章), advice(导购)等, 以参考autohome本身网站链接的英文为最佳选择.  
服务端添加新的类型不需要进行任何修改.  想要增加新的收藏类型的童鞋请按需随意添加^^  
对看到ip地址不爽的童鞋表示抱歉, 因为这是阿里云的服务器, 而我没有备案, 所以虽然有域名, 但是没办法绑定.  
更为诡异的是, 从国外访问阿里云的这个服务器也会出问题(所以在国外就没法使用这个插件), 天知道这是为什么.  

## 问题
编写Chrome Extension本身并不复杂, 主要就是理解manifes.json, 但是我一直有些很烦人的问题没有解决.  
在Google Chrome Extensions中的javascript运行环境分为Extension本身和网页两种.  一种主要用来调用Google开放的Extension API, 一种主要用来操作DOM.  但是我一直没有找到在两种环境中共享代码的方法, 因此连一个简单的全局配置文件都没法写(更不用说想共享一些通用的函数了), 更让人恼火的是, 我也没有找到在Extension环境中共享代码的机制, 连Extension环境中的配置文件也没法写.  希望有人能够解答这个问题.  

## License
Copyright (C) 2013 九天雁翎(jtianling)  

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.
  
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
  
You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
  
参考LICENSE文件
