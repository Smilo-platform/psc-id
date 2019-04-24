const serveStatic = require('serve-static');
const path = require('path');
const timeout = require('connect-timeout');

var app = new (require('express'))()
const PORT = parseInt(process.env.PORT || "3000");

//disable powered by
app.disable('x-powered-by');

app.use(serveStatic(path.join(__dirname, 'public')))

//set timeout for all requests 20s
app.use(timeout(20000));

app.use(function (req, res) {
    res.sendFile(__dirname + '/src/index.html')
})


app.listen(PORT, function (error) {
    if (error) {
        console.error(error)
    } else {
        console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", PORT, PORT)
    }
})
