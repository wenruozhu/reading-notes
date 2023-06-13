// Promise 控制回调
const fs = require('fs')
const path = require('path')

let readdir = function (dir) {
    return new Promise((resolve, reject) => {
        fs.readdir(dir, (err, files) => {
            if (err) reject(err)
            resolve(files)
        })
    })
}

let stat = function (path) {
    return new Promise((resolve, reject) => {
        fs.stat(path, (err, stat) => {
            if (err) reject(err)
            resolve(stat)
        })
    })
}

function findLargest(dir, cb) {
    return readdir(dir)
        .then((files) => {
            let promises = files.map(file => stat(path.join(dir, file)))
            return Promise.all(promises).then((stats) => {
                return { stats, files }
            })
        })
        .then(data => {
            // console.log(data)
            let largest = data.stats
                .filter((stat) => stat.isFile())
                .reduce((prev, next) => {
                    if (prev.size > next.size) return prev
                    return next
                })
            // console.log('largest', largest)
            return data.files[data.stats.indexOf(largest)]
            // cb(null, data.files[data.stats.indexOf(largest)])

        })
        .then(data => console.log(data))

}
// findLargest('../', function (err, filename) {
//     if (err) return console.error(err)
//     console.log('largest file was:', filename)
// })
findLargest('../')