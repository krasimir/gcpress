const chokidar = require("chokidar");

const { runServer, compileCSS, compileJS } = require('./helpers/utils');

runServer(`${__dirname}/server`, `node ${__dirname}/server/index.js`);

chokidar.watch(`${__dirname}/src/css/*.css`).on("all", compileCSS);
chokidar.watch(`${__dirname}/src/js/**/*.js`, { ignoreInitial: true }).on("all", () => {
  compileJS();
});

compileJS();