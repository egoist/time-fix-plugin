module.exports = class TimeFixPlugin {
  constructor(watchOffset = 11000) {
    this.watchOffset = watchOffset
    this.watching = null
  }

  apply(compiler) {
    const watch = compiler.watch
    const _this = this

    compiler.watch = function() {
      _this.watching = watch.apply(this, arguments)
      return _this.watching
    }

    compiler.hooks.watchRun.tap('timefix-plugin', compiler => {
      if (this.watching) {
        this.watching.startTime += this.watchOffset
        this.watching.watchOffset = this.watchOffset
      }
    })

    compiler.hooks.done.tap('timefix-plugin', stats => {
      if (this.watching) {
        stats.startTime -= this.watching.watchOffset || 0
      }
    })
  }
}
