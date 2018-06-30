[TOC]

# http 方法，每个方法分别什么情况下用

put 和 get 有什么相同点
[链接](https://www.jianshu.com/p/ce44e5f4623a)

trace 是用来干嘛的，

options 是用来干嘛的

CONNECT HTTP/1.1 协议中预留给能够将连接改为管道方式的代理服务器。

OPTIONS 允许客户端查看服务器的性能。

TRACE 回显服务器收到的请求，主要用于测试或诊断。

HEAD 类似于 get 请求，只不过返回的响应中没有具体的内容，用于获取报头

# ajax 状态值

```
0 代表未初始化。 还没有调用 open 方法
1 代表正在加载。 open 方法已被调用，但 send 方法还没有被调用
2 代表已加载完毕。send 已被调用。请求已经开始
3 代表交互中。服务器正在发送响应
4 代表完成。响应发送完毕
```

# 7 层模型

#### 7 应用层

#### 6 表示层 定义数据格式及加密

    示例：加密，ASII

#### 5 会话层

定义了如何开始、控制和结束一个会话，
包括对多个双向小时的控制和管理，
以便在只完成连续消息的一部分时可以通知应用，
从而使表示层看到的数据是连续的，

示例：RPC，SQL 等。

#### 4 传输层

    功能包括是否选择差错恢复协议还是无差错恢复协议，
    及在同一主机上对不同应用的数据流的输入进行复用，
    还包括对收到的顺序不对的数据包的重新排序功能。

    示例：TCP，UDP，SPX。

#### 3 网络层

    为建立网络连接和为上层提供服务,

    示例：IP,IPX

#### 2 数据链路层

    为网络层提供数据传送服务的。示例：ATM，FDDI等。

#### 1 物理层

    连接头、针、针的使用、电流、电流、编码及光调制等都属于各种物理层规范中的内容。

### OSI 分层的优点：

（1）人们可以很容易的讨论和学习协议的规范细节。

（2）层间的标准接口方便了工程模块化。

（3）创建了一个更好的互连环境。

（4）降低了复杂度，使程序更容易修改，产品开发的速度更快。

（5）每层利用紧邻的下层服务，更容易记住个层的功能。

# get 和 post 区别

### 最直观的区别:

1).GET 把参数包含在 URL 中，POST 通过 request body 传递参数;

2).GET 在浏览器回退时是无害的，而 POST 会再次提交请求;

3).GET 产生的 URL 地址可以被 Bookmark，而 POST 不可以;

4).GET 请求会被浏览器主动 cache，而 POST 不会，除非手动设置;

5). GET 请求只能进行 url 编码，而 POST 支持多种编码方式;

6).GET 请求参数会被完整保留在浏览器历史记录里，而 POST 中的参数不会被保留;

7).GET 请求在 URL 中传送的参数是有长度限制的，而 POST 没有限制;

8). 对参数的数据类型，GET 只接受 ASCII 字符，而 POST 没有限制;

9).GET 比 POST 更不安全，因为参数直接暴露在 URL 上，所以不能用来传递敏感信息;

### 本质区别:

首先 GET 和 POST 请求都是 HTTP 协议中的两种发送请求的方法,而 HTTP 是基于 TCP/IP 的关于数据如何在万维网中如何通信的协议,HTTP 的底层是 TCP/IP。所以 GET 和 POST 的底层也是 TCP/IP，也就是说，GET/POST 都是 TCP 链接。GET 和 POST 能做的事情是一样一样的。你要给 GET 加上 request body，给 POST 带上 url 参数，技术上是完全行的通的。

1).虽然理论上 GET 和 POST 请求在使用上可以没有区别,但是不同的浏览器(发起 http 请求)和服务器(接受 http 请求)会限制单次传送数据了来控制风险，数据量太大对浏览器和服务器都是很大负担。业界不成文的规定是，(大多数)浏览器通常都会限制 url 长度在 2K 个字节，而(大多数)服务器最多处理 64K 大小的 url。超过的部分，恕不处理。如果你用 GET 服务，在 request body 偷偷藏了数据，不同服务器的处理方式也是不同的，有些服务器会帮你卸货，读出数据，有些服务器直接忽略，所以，虽然 GET 可以带 request body，也不能保证一定能被接收到.

2).GET 产生一个 TCP 数据包;POST 产生两个 TCP 数据包;对于 GET 方式的请求，浏览器会把 http header 和 data 一并发送出去，服务器响应 200(返回数据);而对于 POST，浏览器先发送 header，服务器响应 100 continue，浏览器再发送 data，服务器响应 200 ok(返回数据)。因为 ==POST 需要两步，时间上消耗的要多一点，看起来 GET 比 POST 更有效。== 因此 Yahoo 团队有推荐用 GET 替换 POST 来优化网站性能。

# HTTPS 和 HTTP 的区别

1.  https 协议需要到 ca 申请证书，一般免费证书较少，因而需要一定费用。
2.  http 是超文本传输协议，信息是明文传输，https 则是具有安全性的 ssl 加密传输协议。
3.  http 和 https 使用的是完全不同的连接方式，用的端口也不一样，前者是 80，后者是 443。
4.  http 的连接很简单，是无状态的；HTTPS 协议是由 SSL+HTTP 协议构建的可进行加密传输、身份认证的网络协议，比 http 协议安全。

# 浏览器缓存

## 协商缓存

Last-Modify/If-Modify-Since

ETag/If-None-Match

## 强缓存

Expires 或者 Cache-Control

因为 http1.1>http1.0，

所以 Cache-Control>Expires，ETag>Last-Modified。

依照就近原则，先找本地缓存，没有再向服务器发请求，

所以 Expires>Last-Modified,Cache-Control>ETag，

| 缓存类型 | 获取资源形式 | 状态码              | 发送请求到服务器                 |
| -------- | ------------ | ------------------- | -------------------------------- |
| 强缓存   | 从缓存取     | 200（from cache）   | 否，直接从缓存取                 |
| 协商缓存 | 从缓存取     | 304（Not Modified） | 否，通过服务器来告知缓存是否可用 |

200 from memory cache 不访问服务器，直接读缓存，==从内存中读取缓存==。此时的数据时缓存到内存中的，当 kill 进程后，也就是浏览器关闭以后，数据将不存在。但是这种方式只能缓存派生资源

200 from disk cache 不访问服务器，直接读缓存，==从磁盘中读取缓存==，当 kill 进程时，数据还是存在。这种方式也只能缓存派生资源

304 Not Modified 访问服务器，发现数据没有更新，服务器返回此状态码。然后从缓存中读取数据。

##### 三级缓存原理

先去内存看，如果有，直接加载

如果内存没有，择取硬盘获取，如果有直接加载

如果硬盘也没有，那么就进行网络请求

加载到的资源缓存到硬盘和内存

application cache 和上面缓存有点区别，是离线缓存，就是资源可以从硬盘上读取而不用联网，即使断网，用户也可以浏览。

###### 解决缓存文件没有及时更新思路：

用文件的摘要信息来对资源文件进行重命名，把摘要信息放到资源文件发布路径中，这样，内容有修改的资源就变成了一个新的文件发布到线上，不会覆盖已有的资源文件。上线过程中，先全量部署静态资源，再灰度部署页面，整个问题就比较完美的解决了。

Last-Modified 与 ETag 是可以一起使用的，服务器会优先验证 ETag，一致的情况下，才会继续比对 Last-Modified，最后才决定是否返回 304。

Cache-Control 与 Expires 可以在服务端配置同时启用，同时启用的时候 Cache-Control 优先级高

### Cache-Control

Cache-Control 是 http1.1 时出现的 header 信息，主要是利用该字段的 max-age 值来进行判断，它是一个相对时间，例如 Cache-Control:max-age=3600，代表着资源的有效期是 3600 秒。cache-control 除了该字段外，还有下面几个比较常用的设置值：

- no-cache：不使用本地缓存。需要使用缓存协商，先与服务器确认返回的响应是否被更改，如果之前的响应中存在 ETag，那么请求的时候会与服务端验证，如果资源未被更改，则可以避免重新下载。
- no-store：直接禁止游览器缓存数据，每次用户请求该资源，都会向服务器发送一个请求，每次都会下载完整的资源。
- public：可以被所有的用户缓存，包括终端用户和 CDN 等中间代理服务器。
- private：只能被终端用户的浏览器缓存，不允许 CDN 等中继缓存服务器对其缓存。
- must-revalidate: 一旦缓存过期，必须向源服务器进行校验，不得使用过期内容。如果无法连接必须返回 504。
  没有值
- proxy-revalidate
  与 must-revalidate 相同，但仅对公共缓存生效。
  没有值

- max-stale
  如果有值，客户端可以接受过期时间不超过指定值的缓存
  如果没有值，客户端愿意接受过期缓存而无论过期过久。

- min-fresh
  客户端愿意接受一个新鲜度不小于当前 age 加上指定时间的响应。简单说在指定的后续一段时间内不会过期的响应。
  总是有值

1.  public 指示响应数据可以被任何客户端缓存
2.  private 指示响应数据可以被非共享缓存所缓存。这表明响应的数据可以被发送请求的浏览器缓存，而不能被中介所缓存
3.  no-cache 指示响应数据不能被任何接受响应的客户端所缓存
4.  no-store 指示所传送的响应数据除了不能被缓存，也不能存入磁盘。一般用于敏感数据，以免数据被复制。
5.  must-revalidate 指示所有的缓存都必须重新验证，在这个过程中，浏览器会发送一个 If-Modified-Since 头。如果服务器程序验证得出当前的响应数据为最新的数 据，那么服务器应当返回一个 304 Not Modified 响应给客户端，否则响应数据将再次被发送到客户端。
6.  proxy-revalidate 与 must-revalidate 相似，不同的是用来指示共享缓存。
7.  max-age 数据经过 max-age 设置的秒数后就会失效，相当于 HTTP/1.0 中的 Expires 头。如果在一次响应中同时设置了 max-age 和 Expires，那么 max-age 将具有较高的优先级。
8.  s-maxage 与 max-age 相似，不同的是用来指示共享缓存。

# 三次握手

主机 A 向主机 B 发出连接请求数据包：

**“我想给你发数据，可以吗？”**，这是第一次对话；

主机 B 向主机 A 发送同意连接和要求同步（同步就是两台主机一个在发送，一个在接收，协调工作）的数据包：
**“可以，你什么时候发？”**，这是第二次对话；
主机 A 再发出一个数据包确认主机 B 的要求同步：

**“我现在就发，你接着吧！”**，这是第三次对话。
三次“对话”的目的是使数据包的发送和接收同步，经过三次“对话”之后，主机 A 才向主机 B 正式发送数据。

首先 Client 端发送连接请求报文，Server 段接受连接后回复 ACK 报文，并为这次连接分配资源。Client 端接收到 ACK 报文后也向 Server 段发生 ACK 报文，并分配资源，这样 TCP 连接就建立了。

# 四次握手

Client 端发起中断连接请求，也就是发送 FIN 报文。

意思是说"我 Client 端没有数据要发给你了"，
但是如果你还有数据没有发送完成，则不必急着关闭 Socket，可以继续发送数据。

所以服务端先发送 ACK，告诉 Client 端: "你的请求我收到了，但是我还没准备好，请继续你等我的消息"。

这个时候 Client 端就进入 FIN_WAIT 状态，继续等待 Server 端的 FIN 报文。

当 Server 端确定数据已发送完成，则向 Client 端发送 FIN 报文，
告诉 Client 端: "好了，我这边数据发完了，准备好关闭连接了"。

Client 端收到 FIN 报文后，就知道可以关闭连接了，但是他还是不相信网络，怕 Server 端不知道要关闭，所以发送 ACK 后进入 TIME_WAIT 状态，如果 Server 端没有收到 ACK 则可以重传。

Server 端收到 ACK 后，"就知道可以断开连接了"。Client 端等待了 2MSL 后依然没有收到回复，则证明 Server 端已正常关闭，那好，我 Client 端也可以关闭连接了。Ok，TCP 连接就这样关闭了！

# 长连接，短链接，长轮询，websocket

- 长连接：在 HTTP 1.1，客户端发出请求，服务端接收请求，双方建立连接，在服务端没有返回之前保持连接，当客户端再发送请求时，它会使用同一个连接。这一直继续到客户端或服务器端认为会话已经结束，其中一方中断连接。

  优势：省去较多的 TCP 建立和关闭的操作，减少浪费，节约时间。对于频繁请求资源的客户端适合使用长连接。

  劣势：可能会影响性能，因为它在文件被请求之后还保持了不必要的连接很长时间
  随着客户端连接越来越多，server 会保持过多连接

server 端采取策略：

1.  关闭一些长时间没有请求发生的连接，这样可以避免一些恶意连接导致 server 端服务受损
2.  如果条件允许则可以限制每个客户端的最大长连接数，避免恶意的客户端拖垮整体后端服务

- 短连接：在 HTTP1.0 中，客户端发送请求，服务器接收请求，双方建立连接，服务器响应资源，请求结束。
  劣势： 请求频繁，在 TCP 的建立和关闭操作上浪费较多时间和带宽。

- 长轮询：客户端像传统轮询一样从服务器请求数据。然而，如果服务器没有可以立即返回给客户端的数据，则不会立刻返回一个空结果，而是保持这个请求等待数据到来（或者恰当的超时），之后将数据作为结果返回给客户端。

- WebSocket：

  是 HTML5 一种新的协议。它实现了浏览器与服务器全双工通信(full-duplex)。一开始的握手需要借助 HTTP 请求完成。

  客户端发送一次 http websocket 请求，
  服务器响应请求，双方建立持久连接，并进行双向数据传输，后面不进行 HTTP 连接，而是使用 TCP 连接。

  WebSocket 是独立的、创建在 TCP 上的协议。

  Websocket 通过 HTTP/1.1 协议的 101 状态码进行握手。

  Websocket 使用 ws 或 wss 的统一资源标志符，类似于 HTTPS，其中 wss 表示在 TLS 之上的 Websocket。
  ws://example.com/wsapi

  wss://secure.example.com/

  Websocket 使用和 HTTP 相同的 TCP 端口，
  可以绕过大多数防火墙的限制。
  默认情况下，Websocket 协议使用 80 端口；运行在 TLS 之上时，默认使用 443 端口。

  Websocket 协议解决了服务器与客户端全双工通信的问题。

  注:什么是单工、半双工、全工通信？
  信息只能单向传送为单工；
  信息能双向传送但不能同时双向传送称为半双工；
  信息能够同时双向传送则称为全双工。

  websocket 协议解析
  wensocket 协议包含两部分:一部分是“握手”，一部分是“数据传输”。

优势：较少的控制开销。更强的实时性。保持连接状态。更好的二进制支持。可以支持扩展。更好的压缩效果。

-

HTTP/1.0 中默认使用短连接。 从 HTTP/1.1 起，默认使用长连接，用以保持连接特性。

使用长连接的 HTTP 协议，会在响应头加入这行代码：

==Connection:keep-alive==

Keep-Alive 不会永久保持连接，它有一个保持时间，可以在不同的服务器软件（如 Apache）中设定这个时间。实现长连接需要客户端和服务端都支持长连接。

HTTP 协议的长连接和短连接，实质上是 TCP 协议的长连接和短连接。

```
客户端请求

GET / HTTP/1.1
Upgrade: websocket
Connection: Upgrade
Host: example.com
Origin: http://example.com
Sec-WebSocket-Key: sN9cRrP/n9NdMgdcy2VJFQ==
Sec-WebSocket-Version: 13

服务器回应

HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: fFBooB7FAkLlXgRSz0BT3v4hq5s=
Sec-WebSocket-Location: ws://example.com/
```

## WebSocket 与 HTTP 的关系

### 相同点

1.  都是一样基于 TCP 的，都是可靠性传输协议。
2.  都是应用层协议。

### 不同点

1.  WebSocket 是双向通信协议，模拟 Socket 协议，可以双向发送或接受信息。HTTP 是单向的。
2.  WebSocket 是需要握手进行建立连接的。

### 联系

WebSocket 在建立握手时，数据是通过 HTTP 传输的。但是建立之后，在真正传输时候是不需要 HTTP 协议的。

## WebSocket 与 Socket 的关系

Socket 其实并不是一个协议，而是为了方便使用 TCP 或 UDP 而抽象出来的一层，是位于应用层和传输控制层之间的一组接口。

Socket 是应用层与 TCP/IP 协议族通信的中间软件抽象层，它是一组接口。在设计模式中，Socket 其实就是一个门面模式，它把复杂的 TCP/IP 协议族隐藏在 Socket 接口后面，对用户来说，一组简单的接口就是全部，让 Socket 去组织数据，以符合指定的协议。

当两台主机通信时，必须通过 Socket 连接，Socket 则利用 TCP/IP 协议建立 TCP 连接。TCP 连接则更依靠于底层的 IP 协议，IP 协议的连接则依赖于链路层等更低层次。

WebSocket 则是一个典型的应用层协议。

### 区别

Socket 是传输控制层协议，WebSocket 是应用层协议。

# 缓存

一、资源内容不变 + 设置长时间 max-age
// 设置缓存时间为 1 年
Cache-Control: max-age=31536000

二、对于经常修改的内容，始终需要进行服务器认证
Cache-Control: no-cache

Cache-Control 比 Expires 可以控制的多一些，
而且 Cache-Control 会重写 Expires 的规则，
Cache-Control 是关于浏览器缓存的最重要的设置，
因为它覆盖其他设置，比如 Expires 和 Last-Modified

Mainfest 可以缓存一个应用，pwa 中有 Mainfest 和 Service Worker 可以实现缓存

# HTTP request 报文结构是怎样的

```
rfc2616中进行了定义：

首行是Request-Line包括：
    请求方法，请求URI，协议版本，CRLF

首行之后是若干行请求头，包括
    general-header，
    request-header或者
    entity-header，
    每个一行以CRLF结束
请求头和消息实体之间有
一个CRLF分隔
根据实际请求需要可能包含一个消息实体


User-Agent：产生请求的浏览器类型。
Accept：客户端可识别的内容类型列表。
Host：请求的主机名，允许多个域名同处一个IP地址，即虚拟主机。

POST方法适用于需要客户填写表单的场合。
与请求数据相关的
最常使用的请求头是Content-Type和
Content-Length。

一个请求报文例子如下：
GET /Protocols/rfc2616/rfc2616-sec5.html HTTP/1.1
Host: www.w3.org
Connection: keep-alive
Cache-Control: max-age=0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36
Referer: https://www.google.com.hk/
Accept-Encoding: gzip,deflate,sdch
Accept-Language: zh-CN,zh;q=0.8,en;q=0.6
Cookie: authorstyle=yes
If-None-Match: "2cc8-3e3073913b100"
If-Modified-Since: Wed, 01 Sep 2004 13:24:52 GMT

name=qiu&age=25
```

# HTTP response 报文结构是怎样的

```
rfc2616中进行了定义：

首行是状态行包括：
    HTTP版本，状态码，
    状态描述，后面跟一个CRLF

首行之后是若干行响应头，包括：
    通用头部，响应头部，实体头部

响应头部和响应实体之间用一个CRLF空行分隔

最后是一个可能的消息实体
响应报文例子如下：

HTTP/1.1 200 OK
Date: Tue, 08 Jul 2014 05:28:43 GMT
Server: Apache/2
Last-Modified: Wed, 01 Sep 2004 13:24:52 GMT
ETag: "40d7-3e3073913b100"
Accept-Ranges: bytes
Content-Length: 16599
Cache-Control: max-age=21600
Expires: Tue, 08 Jul 2014 11:28:43 GMT
P3P: policyref="http://www.w3.org/2001/05/P3P/p3p.xml"
Content-Type: text/html; charset=iso-8859-1

{"name": "qiu", "age": 25}
```

# Promise 封装 Ajax

```
function getJSON(url){
    return new Promise((resolve, reject) =>{
        var xhr = new XMLHttpRequest()
        // get
        xhr.open('GET', url, true)

        // post
        // xhr.open('POST', url, true)
        // xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
        xhr.onreadystatechange = function(){
            if(this.readyState === 4){
                if(this.status === 200){
                    resolve(this.responseText, this)
                }else{
                    var resJson = {code: this.status, response: this.response}
                    reject(resJson, this)
                }
            }
        }

        xhr.send()

        // post
        // xhr.send(JSON.stringify(data))
    })

}
```

# URL 详解

[链接](http://caibaojian.com/http-protocol.html)

```
URL(Uniform Resource Locator) 地址用于描述一个网络上的资源， 基本格式如下
schema://host[:port#]/path/.../[;url-params][?query-string][#anchor]
　　scheme 指定低层使用的协议(例如：http, https, ftp)
　　host HTTP服务器的IP地址或者域名
　　port# HTTP服务器的默认端口是80，
　　       https是443
　　这种情况下端口号可以省略。如果使用了别的端口，
　　必须指明，例如 http://www.cnblogs.com:8080/
　　path 访问资源的路径
　　url-params
　　query-string 发送给http服务器的数据
　　anchor- 锚

URL 的一个例子：
http://www.mywebsite.com/sj/test;id=8079?name=sviergn&x=true#stuff
Schema: http
host: www.mywebsite.com
path: /sj/test
URL params: id=8079
Query String: name=sviergn&x=true
Anchor: stuff
```

# http 常见状态码有哪些

```
1XX：信息状态码-表示请求已接收，继续处理。
100 Continue：客户端应当继续发送请求。
这个临时响应是用来通知客户端它的部分请求
已经被服务器接收，且仍未被拒绝。
101 Switching Protocols：
服务器已经理解力客户端的请求，
并将通过Upgrade消息头通知客户端
采用不同的协议来完成这个请求。
在发送完这个响应最后的空行后，
服务器将会切换到Upgrade消息头中
定义的那些协议。

一: 2开头状态码
2xx (成功)表示成功处理了请求的状态代码
200 (成功) 服务器已成功处理了请求

200  from cache： 表示该资源已经被缓存过，
并且在有效期内，所以不再向浏览器发出请求，
直接使用本地缓存。

201 Created：
202 Accepted：
203 Non-Authoritative Information：
204 No Content：
205 Reset Content：
206 Partial Content：
二: 3开头状态码
3xx (重定向) 表示要完成请求，需要进一步操作。 通常，这些状态代码用来重定向。
304 (未修改) 自从上次请求后，请求的网页未修改过。 服务器返回此响应时，不会返回网页内容。

300 Multiple Choices：
301 Moved Permanently：永久性转移(Permanently Moved),
302 Found：重定向表示临时性转移(Temporarily Moved )，
    当一个网页URL需要短期变化时使用。
303 See Other：
304 Not Modified：
    表示浏览器虽然发现了本地有该资源的缓存，但是不确定是否是最新的，
    于是向服务器询问，若服务器认为浏览器的缓存版本还可用（即还未更新），
    那么便会返回304，继续使用本地的缓存。
305 Use Proxy：
306 （unused）：
307 Temporary Redirect：

301重定向与302重定向的区别   301重定向是永久的重定向，搜索引擎在抓取新内容的同时也将旧的网址替换为重定向之后的网址。   302重定向是临时的重定向，搜索引擎会抓取新的内容而保留旧的网址。因为服务器返回302代码，搜索引擎认为新的网址只是暂时的。


三: 4开头状态码
4xx(请求错误) 客户端错误--请求有语法错误或请求无法实现。
1:400 (错误请求) 服务器不理解请求的语法。

2:403 (禁止) 服务器拒绝请求。

3:404 (未找到) 服务器找不到请求的网页。

400 Bad Request:客户端请求有语法错误，不能被服务器所理解
401 Unauthorized:请求未经授权，
    这个状态代码必须和WWW-Authenticate报头域一起使用。
402 Payment Required:
403 Forbidden:服务器收到请求，但是拒绝提供服务。
404 Not Found:请求资源不存在
405 Method Not Allowed:
406 Not Acceptable:
407 Proxy Authentication Required:
408 Request Timeout:
409 Conflict:
410 Gone:
411 Length Required:
412 Precondition Failed:
413 Request Entity Too Large:
414 Request-URI Too Long:
415 Unsupported Media Type:
416 Requested Range Not Satisfiable:
417 Expectation Failed:
四: 5开头状态码
5xx服务器端错误--服务器未能实现合法的请求。
500 (服务器内部错误) 服务器遇到错误，无法完成请求。

501 (尚未实施) 服务器不具备完成请求的功能。 例如，服务器无法识别请求方法时可能会返回此代码。

502 (错误网关) 服务器作为网关或代理，从上游服务器收到无效响应。

503 (服务不可用) 服务器目前无法使用(由于超载或停机维护)。 通常，这只是暂时状态。

504 (网关超时) 服务器作为网关或代理，但是没有及时从上游服务器收到请求。

505 (HTTP 版本不受支持) 服务器不支持请求中所用的 HTTP 协议版本。
```

十四、http 的状态响应码

```
1**(信息类)：表示接收到请求并且继续处理
100——客户必须继续发出请求
101——客户要求服务器根据请求转换HTTP协议版本

2**(响应成功)：表示动作被成功接收、理解和接受
200——表明该请求被成功地完成，所请求的资源发送回客户端
201——提示知道新文件的URL
202——接受和处理、但处理未完成
203——返回信息不确定或不完整
204——请求收到，但返回信息为空
205——服务器完成了请求，用户代理必须复位当前已经浏览过的文件
206——服务器已经完成了部分用户的GET请求

3**(重定向类)：为了完成指定的动作，必须接受进一步处理
300——请求的资源可在多处得到
301——本网页被永久性转移到另一个URL
302——请求的网页被转移到一个新的地址，但客户访问仍继续通过原始URL地址，重定向，新的URL会在response中的Location中返回，浏览器将会使用新的URL发出新的Request。
303——建议客户访问其他URL或访问方式
304——自从上次请求后，请求的网页未修改过，服务器返回此响应时，不会返回网页内容，代表上次的文档已经被缓存了，还可以继续使用
305——请求的资源必须从服务器指定的地址得到
306——前一版本HTTP中使用的代码，现行版本中不再使用
307——申明请求的资源临时性删除

4**(客户端错误类)：请求包含错误语法或不能正确执行
400——客户端请求有语法错误，不能被服务器所理解
401——请求未经授权，这个状态代码必须和WWW-Authenticate报头域一起使用
HTTP 401.1 - 未授权：登录失败
HTTP 401.2 - 未授权：服务器配置问题导致登录失败
HTTP 401.3 - ACL 禁止访问资源
HTTP 401.4 - 未授权：授权被筛选器拒绝
HTTP 401.5 - 未授权：ISAPI 或 CGI 授权失败
402——保留有效ChargeTo头响应
403——禁止访问，服务器收到请求，但是拒绝提供服务
HTTP 403.1 禁止访问：禁止可执行访问
HTTP 403.2 - 禁止访问：禁止读访问
HTTP 403.3 - 禁止访问：禁止写访问
HTTP 403.4 - 禁止访问：要求 SSL
HTTP 403.5 - 禁止访问：要求 SSL 128
HTTP 403.6 - 禁止访问：IP 地址被拒绝
HTTP 403.7 - 禁止访问：要求客户证书
HTTP 403.8 - 禁止访问：禁止站点访问
HTTP 403.9 - 禁止访问：连接的用户过多
HTTP 403.10 - 禁止访问：配置无效
HTTP 403.11 - 禁止访问：密码更改
HTTP 403.12 - 禁止访问：映射器拒绝访问
HTTP 403.13 - 禁止访问：客户证书已被吊销
HTTP 403.15 - 禁止访问：客户访问许可过多
HTTP 403.16 - 禁止访问：客户证书不可信或者无效
HTTP 403.17 - 禁止访问：客户证书已经到期或者尚未生效
404——一个404错误表明可连接服务器，但服务器无法取得所请求的网页，请求资源不存在。eg：输入了错误的URL
405——用户在Request-Line字段定义的方法不允许
406——根据用户发送的Accept拖，请求资源不可访问
407——类似401，用户必须首先在代理服务器上得到授权
408——客户端没有在用户指定的饿时间内完成请求
409——对当前资源状态，请求不能完成
410——服务器上不再有此资源且无进一步的参考地址
411——服务器拒绝用户定义的Content-Length属性请求
412——一个或多个请求头字段在当前请求中错误
413——请求的资源大于服务器允许的大小
414——请求的资源URL长于服务器允许的长度
415——请求资源不支持请求项目格式
416——请求中包含Range请求头字段，在当前请求资源范围内没有range指示值，请求也不包含If-Range请求头字段
417——服务器不满足请求Expect头字段指定的期望值，如果是代理服务器，可能是下一级服务器不能满足请求长。

5**(服务端错误类)：服务器不能正确执行一个正确的请求HTTP
500 - 服务器遇到错误，无法完成请求
HTTP 500.100 - 内部服务器错误 - ASP 错误
HTTP 500-11 服务器关闭
HTTP 500-12 应用程序重新启动
HTTP 500-13 - 服务器太忙
HTTP 500-14 - 应用程序无效
HTTP 500-15 - 不允许请求 global.asa Error
501 - 未实现HTTP
502 - 网关错误HTTP
503：由于超载或停机维护，服务器目前无法使用，一段时间后可能恢复正常
```

# HTML5 离线缓存

典型的 manifest 文件代码结构:

基本格式为三段：

CACHE，
NETWORK，
FALLBACK，

CACHE:（必须）标识出哪些文件需要缓存，可以是相对路径也可以是绝对路径。

NETWORK:（可选）这一部分是要绕过缓存直接读取的文件，可以使用通配符＊。

FALLBACK:（可选）指定了一个后备页面，当资源无法访问时，浏览器会使用该页面。该段落的每条记录都列出两个 URI

第一个表示资源， 第二个表示后备页面。

###### 三种方式，可以更新缓存：

一、更新 manifest 文件：给 manifest 添加或删除文件，都可更新缓存，如果我们更改了 js，而没有新增或删除，前面例子中注释中的版本号、时间戳或者 md5 码等进行修改，都可以很好的用来更新 manifest 文件

二、通过 javascript 操作：html5 中引入了 js 操作离线缓存的方法，下面的 js 可以手动更新本地缓存。

window.applicationCache.update();
三、清除浏览器缓存：如果用户清除了浏览器缓存（手动或用其他一些工具）都会重新下载文件。

##### 注意事项

1、浏览器对缓存数据的容量限制可能不太一样（某些浏览器设置的限制是每个站点 5MB）。

2、如果 manifest 文件，或者内部列举的某一个文件不能正常下载，整个更新过程都将失败，浏览器继续全部使用老的缓存。

3、引用 manifest 的 html 必须与 manifest 文件同源，在同一个域下。

4、FALLBACK 中的资源必须和 manifest 文件同源。

5、当一个资源被缓存后，该浏览器直接请求这个绝对路径也会访问缓存中的资源。

6、站点中的其他页面即使没有设置 manifest 属性，请求的资源如果在缓存中也从缓存中访问。

7、当 manifest 文件发生改变时，资源请求本身也会触发更新。

```
CACHE MANIFEST
#version 1.2.2

CACHE:
#css
http://www.haorooms.com/theme/assets/style.css
#js
http://www.haorooms.com/theme/assets/js/main.js

#img
http://static.hyb.dev.ipo.com/css/wifi/pc/images/logo-fk1.png
http://static.hyb.dev.ipo.com/css/wifi/images/favicon.ico

NETWORK:  
*
FALLBACK:
 /404.html
```

# Service Worker 与缓存及离线缓存

网络请求首先到达的是 SW 脚本中，如果未命中再转发给 HTTP 缓存。

网络请求首先到达的是 SW 脚本中，如果未命中再转发给 HTTP 缓存。

一个标配版的 sw 缓存工代代码应该有以下的片段：

```
const version = '2';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(`static-${version}`)
      .then(cache => cache.addAll([
        '/styles.css',
        '/script.js'
      ]))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
```

在 SW 的 install 阶段我们将 script.js 和 styles.css 放入缓存中；而在请求发起的 fetch 阶段，通过资源的 URL 去缓存内查找匹配，成功后立刻返回，否则走正常的网络请求流程。

# PageCache 与 Ajax 可缓存

PageCache 其实是 facebook 提出的，解决 ajax 缓存的一种方案！简单的说，就是将访问过的页面缓存在客户端。

更新思路：

1、增量更新：只要页面来自于缓存，即更新所有预定义的需增量更新的模块。

2、用户复写：通过 HistoryManager 记录用户操作并在 cache 页面读取后重放所有被标记为“replayable”的操作。

3、跨页更新：通过服务端 Database API 发送信号至客户端将过期缓存标识为 invalid（不清楚如何实现。也许是 DB 端提供一个开放的 webservice，客户端通过 Ajax 持续访问此 API 来获得此信息）。获得了缓存过期信号后，通过 Ajax 更新需要更新的信息。
