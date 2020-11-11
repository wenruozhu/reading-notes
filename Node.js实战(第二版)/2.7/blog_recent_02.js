const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    getTitles(res);
}).listen(8080);

function getTitles(res) {
    fs.readFile('./titles.json', (err, data) => {
        if (err) {
            hasError(err, res);
        } else {
            getTemplate(JSON.parse(data.toString()), res);
        }
    })
}
function getTemplate(titles, res) {
    fs.readFile('./template.html', (err, data) => {
        if(err){
            hasError(err, res);
        }else{
            formatHtml(titles, data.toString(), res)
        }
    })
}
function formatHtml(titles, template, res) {
    const html = template.replace('%', titles.join('</li><li>'));
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
}
function hasError() {
    console.error(err);
    res.end('Server Error');
}