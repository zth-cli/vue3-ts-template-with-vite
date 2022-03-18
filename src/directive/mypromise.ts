class MyPromise {
  status = 'pending' // 等待状态
  value = null // 成功或失败的参数
  fulfilledCallbacks = [] // 成功的函数队列
  rejectedCallbacks = [] // 失败的函数队列
  constructor(executor: {
    (resolve: any, reject: any): void
    (
      arg0: (value: any) => void, // 成功或失败的参数
      arg1: (value: any) => void
    ): void
  }) {
    // executor执行器
    function resolve(value: any) {
      // 成功的方法
      if (this.status === 'pending') {
        this.status = 'resolved'
        this.value = value
        this.fulfilledCallbacks.forEach((myFn) => myFn(this.value)) //执行回调方法
      }
    }
    function reject(value: any) {
      //失败的方法
      if (this.status === 'pending') {
        this.status = 'rejected'
        this.value = value
        this.rejectedCallbacks.forEach((myFn) => myFn(this.value)) //执行回调方法
      }
    }
    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }
  then(onFulfilled, onRejected) {
    if (this.status === 'pending') {
      // 等待状态，添加回调函数到成功的函数队列
      this.fulfilledCallbacks.push(() => {
        onFulfilled(this.value)
      })
      // 等待状态，添加回调函数到失败的函数队列
      this.rejectedCallbacks.push(() => {
        onRejected(this.value)
      })
    }
    if (this.status === 'resolved') {
      // 支持同步调用
      console.log('this', this)
      onFulfilled(this.value)
    }
    if (this.status === 'rejected') {
      // 支持同步调用
      onRejected(this.value)
    }
  }
}

// 测试
function fn() {
  return new MyPromise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.6) {
        resolve(1)
      } else {
        reject(2)
      }
    }, 1000)
  })
}
fn().then(
  (res) => {
    console.log('res', res) // res 1
  },
  (err) => {
    console.log('err', err) // err 2
  }
)
