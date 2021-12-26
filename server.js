const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('koa2-cors');
const Router = require('koa-router');
const faker = require('faker');
const uuid = require('uuid');

const router = new Router();
const app = new Koa();

const messages = {
    unread: [
        {
            id: uuid(),
            name: faker.name.findName(),
            from: faker.address.city(),
        }
    ]
}

app.use(koaBody({
    text: true,
    urlencoded: true,
    multipart: true,
    json: true,
}));

app.use(cors({
    origin: '*',
    credentials: true,
    'Access-Control-Allow-Origin': true,
    allowMethods: ['GET']
}));

router.get('/messages/unread', async (ctx) => {
    ctx.response.body = messages.unread;
    ctx.status = 200;
});

app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 3333;
app.listen(port, () => console.log('Server started'));