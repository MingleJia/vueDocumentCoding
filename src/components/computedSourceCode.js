/* eslint-disable */ 
// 
// 初始化计算属性
function initComputed (vm: Component, computed: Object) {
    // ...
    // 遍历 computed 计算属性
    for (const key in computed) {
        //   ...
        // 创建 Watcher 实例
        watchers[key] = new Watcher(vm, getter || noop, noop, computedWatcherOptions)

        // 创建要计算的属性(此处为vm.reversedMessage)，并将提供的函数将用作属性 vm.reversedMessage 的 getter，
        // 最终 computed 与 data 会一起混合到 vm 下，所以当 computed 与 data 存在重名属性时会抛出警告
        defineComputed(vm, key, userDef)
    //   ...
    }
}
  
  export function defineComputed (target: any, key: string, userDef: Object | Function) {
    // ...
    // 创建 get set 方法
    sharedPropertyDefinition.get = createComputedGetter(key)
    sharedPropertyDefinition.set = noop
    // ...
    // 创建属性 vm.reversedMessage，并初始化 getter setter
    Object.defineProperty(target, key, sharedPropertyDefinition)
  }
  
  function createComputedGetter (key) {
    return function computedGetter () {
      const watcher = this._computedWatchers && this._computedWatchers[key]
      if (watcher) {
        if (watcher.dirty) {
          // watcher 暴露 evaluate 方法用于取值操作
          watcher.evaluate()
        }
        // 同第1步，判断是否处于依赖收集状态
        if (Dep.target) {
          watcher.depend()
        }
        return watcher.value
      }
    }
  }