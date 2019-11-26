'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function result(response, state) {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify({ state: state }));
}

function createServer(PORT) {
  let state = 10;

  const server = http.createServer((request, response) => {
    // TODO: Write your homework code here
    switch (request.url) {
      case '/state':
        result(response, state);
        break;
      case '/add':
        state++;
        result(response, state);
        break;
      case '/subtract':
        state--;
        result(response, state);

        break;
      case '/reset':
        state = 10;
        result(response, state);
        break;
      default:
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ error: 'Page not found' }));
    }
  });

  return server;
}
console.log('server started on ');
module.exports = {
  createServer
};
