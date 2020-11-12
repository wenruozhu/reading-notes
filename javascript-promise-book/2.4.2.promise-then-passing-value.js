function doubleUp(value) {
    return value * 2
}
function increment(value) {
    return value + 1
}
function outPut(value) {
    console.log(value)
}
var promise = Promise.resolve(1);
promise
    .then(increment)
    .then(doubleUp)
    .then(outPut)
    .catch(function (error) {
        console.error(error)
    })