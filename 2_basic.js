const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
  
  ctx.body = 'Hello koa';
  await next();
});

app.use(async ctx => {
  ctx.body += '偷偷加点儿东西';
});

app.listen(3000, function(err) {
  if (err) console.log(err);
  console.log('Server running at http://127.0.0.1:3000/');
});