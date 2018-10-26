var http = require('http');

http.createServer(function (request, response) {

    // 发送 HTTP 头部 
    // HTTP 状态值: 200 : OK
    // 内容类型: text/plain
    response.writeHead(200, {'Content-Type': 'text/plain'});
    // 发送响应数据 "Hello World"
    response.write('Hello node\n');
    // 结束请求
    response.end();
}).listen(8888, function(err) {
    if (err) console.log(err);
    console.log('Server running at http://127.0.0.1:8888/');
});