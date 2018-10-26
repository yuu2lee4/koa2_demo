const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors');
 
const app = new Koa();
const router = new Router();
 
router.get('/user/:id', (ctx) => {
    ctx.body = `id----${ctx.params.id}`;
});
router.get('/query', (ctx) => {
    ctx.body = `query----${JSON.stringify(ctx.query)}`;
});
router.post('/body', (ctx) => {
    console.log(ctx.request.body);
    ctx.body = ctx.request.body;
});

app
    .use(cors())
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000, function(err) {
    if (err) console.log(err);
    console.log('Server running at http://127.0.0.1:3000/');
});