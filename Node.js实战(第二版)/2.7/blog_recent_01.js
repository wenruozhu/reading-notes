const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    if (req.url == '/') {
        fs.readFile('./titles.json', (err, data) => {
            if (err) {
                console.log(err);
                res.end('Server Error')
            } else {
                const titles = JSON.parse(data.toString());
                console.log(titles);
                fs.readFile('./template.html', (err, data) => {
                    if (err) {
                        console.log(err);
                        res.end('Server Error');
                    } else { 
                        const tmpl = data.toString();
                        console.log(tmpl);
                        const html = tmpl.replace('%', titles.join('</li><li>'))
                        res.writeHead(200, {'Content-Type': 'text/html'});
                        res.end(html);
                    }
                })
            }
        })
    }
}).listen(8080)