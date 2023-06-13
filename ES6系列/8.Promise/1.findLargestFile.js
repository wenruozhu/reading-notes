// 回调函数
const fs = require('fs')
const path = require('path')

function findLargest(dir, cb) {
    // 读取目录下的所有文件
    fs.readdir(dir, function (err, files) {
        if (err) return cb(err)
        let counter = files.length
        let errored = false
        let stats = []
        files.forEach(function (file, index) {
            // console.log('------',path.join(dir, file))
            fs.stat(path.join(dir, file), function (err, stat) {
                if (errored) return
                if (err) {
                    errored = true
                    return cb(err)
                }
                // console.log('stat', stat)
                stats[index] = stat
                if (--counter == 0) {
                    let largest = stats
                        .filter(function (stat) {
                            return stat.isFile()
                            // console.log('24', stat.isFile())
                        })
                        .reduce(function (prev, next) {
                            // console.log('reduce',prev, next)
                            if (prev.size > next.size) return prev
                            return next
                        })
                    console.log(largest)
                    cb(null, files[stats.indexOf(largest)])
                }
            })
        })
    })
}
findLargest('../', function (err, filename) {
    if (err) return console.error(err)
    console.log('largest file was:', filename)
})