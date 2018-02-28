module.exports = class TimeFixPlugin {
  constructor(watchOffset = 11000) {
    this.watchOffset = watchOffset
    this.watching = null
    this.offsetApplied = false
  }

  apply(compiler) {
    const watch = compiler.watch
    const _this = this

    compiler.watch = function () {
      _this.watching = watch.apply(this, arguments)
      return _this.watching
    }

    compiler.hooks.watchRun.tap('time-fix-plugin', () => {
      if (this.watching) {
        this.watching.startTime += this.watchOffset
        this.offsetApplied = true
      }
    })

    compiler.hooks.done.tap('time-fix-plugin', stats => {
      if (this.watching && this.offsetApplied) {
        stats.startTime -= this.watchOffset
      }
    })
  }
}
