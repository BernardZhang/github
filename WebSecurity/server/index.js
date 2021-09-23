const http = require('http');
const { getDir } = require('./utils');

const hostname = '127.0.0.1';
const port = 3003;

const Router = () => {
    const routesMap = {
        get: {},
        post: {}
    };

    const router = (req, res, finalHandle) => {
        const { url, method } = req;
        const callback = routesMap[method.toLowerCase()][url];

        if (callback) {
            callback(req, res);
        } else {
            finalHandle(req, res);
        }
    };

    router.get = (path, callback) => {
        routesMap.get[path] = callback;
    };

    return router;
};

const router = Router();

router.get('/', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, World!\n');
});

router.get('/xss', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, XSS!\n');
});

const finalHandle = async (req, res) => {
    const { url } = req;

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(JSON.stringify(await getDir(url), null, 4));
};

const server = http.createServer((req, res) => {
    router(req, res, finalHandle);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});