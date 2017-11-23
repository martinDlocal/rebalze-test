const http = require('http');
const host = 'astropaycard.com';
const path = '/api_curl/delayer/2';

let count = 1;

const agent = new http.Agent({
    keepAlive: true,
    maxSockets: 1,
    keepAliveMsecs: 10 * 60 * 1000
});

function doRequest() {
    console.log(`Requesting ${count++}`);
    const now = new Date();

    const options = {
        hostname: host,
        path: path,
        method: 'GET',
        agent: agent
    };

    const req =  http.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            console.log(data);
            console.log(`Request time ${(new Date().getTime() - now.getTime()) / 1000} s`);
        });

        res.on("error", (err) => {
            console.log(`Request error time ${(new Date().getTime() - now.getTime()) / 1000} s`);
            console.log("Error: " + err.message);
        });
    });

    req.on('error', function(e) {
        console.log(`Time error  ${(new Date().getTime() - now.getTime()) / 1000} s`);
        console.log(e);
    });

    req.end();

}

setInterval(doRequest, 1000);


