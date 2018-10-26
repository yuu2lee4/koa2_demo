const Koa = require('koa');
const Router = require('koa-router');
 
const app = new Koa();
const router = new Router();
 
router.get('/', (ctx) => {
    ctx.body = '/-hello router'
});

router.get('/user', (ctx) => {
    ctx.body = '/user-hello router'
});
 
app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000, function(err) {
    if (err) console.log(err);
    console.log('Server running at http://127.0.0.1:3000/');
});