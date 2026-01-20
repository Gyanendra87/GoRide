const http = require("http");
const alpha = require("./app");

const port = process.env.PORT || 3000;

const server = http.createServer(alpha);

server.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
