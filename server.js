/* eslint import/no-extraneous-dependencies: ["off"] */
const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);
server.use(jsonServer.bodyParser);

let isAuthorized = false;
server.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'cecotec@mail.com' && password === 'cecotec') {
    isAuthorized = true;
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

server.use((req, res, next) => {
  if (isAuthorized) {
    next();
  } else {
    res.sendStatus(401);
  }
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});
