const io = require('socket.io-client');
const ioClient = io.connect("http://localhost:8000");

ioClient.on("CPU", (metrics) => {
    console.log('Got CPU metrics: ', metrics);
});

ioClient.on("RAM", (metrics) => {
    console.log('Got RAM metrics: ', metrics);
});

ioClient.on("Disk", (metrics) => {
    console.log('Got Disk usage metrics: ', metrics);
});