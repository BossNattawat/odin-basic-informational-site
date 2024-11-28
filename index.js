const http = require("http");
const fs = require("fs")
const url = require("url")

http.createServer((req, res) => {
    let q = url.parse(req.url, true)
    let fileName = "." + q.pathname

    if(q.pathname === "/"){
        render("index.html", res)
    }
    else if(q.pathname === "/about" || q.pathname === "/contact-me"){
        render(fileName + ".html", res)
    }
    else{
        render("404.html", res)
    }
}).listen(8080);

function render(fileName, res){
    fs.readFile(fileName, (err, data) => {
        if(err){
            const data = fs.readFileSync("./404.html")
            res.writeHead(404, {'content-Type': "text/html"})
            res.write(data)
            return res.end()
        }
        res.writeHead(200, {'content-Type': "text/html"})
        res.write(data)
        return res.end()
    })
}