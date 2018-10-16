module.exports = class TimeFixPlugin {
  constructor(watchOffset = 11000) {
    this.watchOffset = watchOffset
  }

  apply(compiler) {
    const context = this
    const watch = compiler.watch
    let watching

    compiler.watch = function () {
      watching = watch.apply(this, arguments)
      watching.startTime += context.watchOffset
      return watching
    }

    compiler.hooks.done.tap('time-fix-plugin', stats => {
      if (watching) {
        stats.startTime -= this.watchOffset
      }
    })
  }
}
