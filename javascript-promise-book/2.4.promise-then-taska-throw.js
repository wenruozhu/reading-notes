function taskA() {
    console.log("Task A");
    throw new Error("throw Error @ taskA");
}
function taskB() {
    console.log("Task B");
}
function onRejected(error) {
    console.log(error);
}
function finalTask() {
    console.log("Final Task");
}
var promise = Promise.resolve();
promise
    .then(taskA)
    .then(taskB)
    .catch(onRejected)
    .then(finalTask)