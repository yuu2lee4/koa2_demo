const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors');
const pool = require('./pool');
const { promisify } = require('util')

const getConnection = promisify(pool.getConnection.bind(pool));
 
const app = new Koa();
const router = new Router();
 
router.post('/user/add', (ctx) => {
    console.log(ctx.request.body);
    const { name, password } = ctx.request.body;
    pool.getConnection(function(err, connection) {
        if (err) console.log(err);
        connection.query(`INSERT INTO user (name, password) VALUES ('${name}', '${password}')`,  (error, results, fields) => {
            connection.release();
            // 如果有错误就抛出
            if (error) return console.log('error-----', error);
            ctx.body = results;
            console.log('results-----', results);
            console.log('fields-----', fields);
        })
    })
    // ctx.body = '成功！';
});

router.post('/user/add1', async (ctx) => {
    console.log(ctx.request.body);
    const { name, password } = ctx.request.body;

    const connection = await getConnection();
    const query = promisify(connection.query.bind(connection));
    const res = await query(`INSERT INTO user (name, password) VALUES ('${name}', '${password}')`);
    console.log(res);
    ctx.body = res;
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