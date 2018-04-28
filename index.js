module.exports = class TimeFixPlugin {
  constructor(watchOffset = 11000) {
    this.watchOffset = watchOffset
    this.offsetApplied = false
  }

  apply(compiler) {
    const watch = compiler.watch
    const ctx = this

    compiler.watch = function () {
      const watching = watch.apply(this, arguments)
      watching.startTime += ctx.watchOffset
      ctx.offsetApplied = true
      return watching
    }

    compiler.hooks.done.tap('time-fix-plugin', stats => {
      if (this.offsetApplied) {
        stats.startTime -= this.watchOffset
      }
    })
  }
}
