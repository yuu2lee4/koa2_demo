const Koa = require('koa');
const static = require('koa-static')

const app = new Koa();


app.use(static(__dirname + '/upload'));

app.listen(3000, function(err) {
  if (err) console.log(err);
  console.log('Server running at http://127.0.0.1:3000/');
});