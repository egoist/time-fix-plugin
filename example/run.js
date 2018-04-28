const fs = require('fs')
const webpack = require('webpack')
const TimeFix = require('../')

const timefix = process.argv.includes('--timefix')

const compiler = webpack({
  entry: './example/index.js',
  mode: 'development',
  output: {
    path: __dirname + '/dist'
  },
  plugins: [
    timefix && new TimeFix()
  ].filter(Boolean)
})

fs.writeFileSync('./example/index.js', 'const a = 1', 'utf8')
compiler.watch({}, (err, stats) => {
  console.log(stats.toString({
    colors: true,
    chunks: false,
    children: false,
    modules: false
  }))
})
