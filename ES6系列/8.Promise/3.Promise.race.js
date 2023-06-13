function timeoutPromise(delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('函数执行')
            reject("timeout!")
        }, delay)
    })
}
function foo() {
    console.log('foo')
}
Promise.race([
    foo(),
    timeoutPromise(3000)
])