// 首先启动 `webpack-dev-server`，然后将渲染页面加载起来并进行监听，
// 然后就是启动 `electron`，加载上面 `webpack-dev-server` 监听的 `url`

const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const devConfig = require('./config/webpack.config.renderer');
const { spawn } = require('child_process');

const PORT = process.env['PORT'] || 3080;
const argv = require('minimist')(process.argv.slice(1));

const compiler = webpack(devConfig);
const server = new webpackDevServer(compiler, devConfig.devServer)
  .listen(PORT, 'localhost', function (err, result) {
    if (err) return console.error(err);

    console.log(`webpack-dev-server listening at http://localhost:${PORT}`);

    // 区别直接从 `webpack-de-server` 启动，还是从VS Code 调试启动
    if (!argv['debug']) {
      spawn(
        'yarn',
        ['dev:electron', `PORT=${PORT}`, `--enable-logging`, `--remote-debugging-port=9223`],
        { shell: true, env: process.env, stdio: 'inherit' }
      )
      .on('close', code => process.exit(code))
      .on('error', spawnError => console.error(spawnError));
    }
  });

process.on('SIGTERM', () => {
  console.log('Stopping dev server');
  server.close(() => {
    process.exit(0);
  });
});
