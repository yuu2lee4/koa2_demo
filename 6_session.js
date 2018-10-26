const Koa = require('koa');
const Router = require('koa-router');
const session = require('koa-session-minimal')
const store = require('koa-mysql-session')

const mysqlConf ={
    host     : '127.0.0.1',   // 数据库地址
    user     : 'root',    // 数据库用户
    password : '12345678',   // 数据库密码
    database : 'koa'  // 选中数据库
}
 
const app = new Koa();
const router = new Router();
 
router.get('/login', (ctx) => {
    ctx.session.user = {
        name: 'fackuser'
    }
    ctx.body = '登陆成功!'
});

router.get('/getuser', (ctx) => {
    if (ctx.session.user) {
        return ctx.body = ctx.session.user;
    }
    ctx.body = '您尚未登录!';
});
router.get('/logout', (ctx) => {
    ctx.session = null;
    ctx.body = '退出成功!';
});
 
app
    .use(session({
        store: new store(mysqlConf),
    }))
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000, function(err) {
    if (err) console.log(err);
    console.log('Server running at http://127.0.0.1:3000/');
});