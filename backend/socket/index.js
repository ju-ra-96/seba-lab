const { get_cpu_usage, get_ram_usage, get_disk_usage } = require('./data_sourcing');
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
let cpu_metrics, ram_metrics, disk_metrics;

async function emit_metrics() {
    while (true) {
        cpu_metrics = await get_cpu_usage();
        io.sockets.emit("CPU", cpu_metrics);
        console.log('Emitted CPU metrics');

        ram_metrics = await get_ram_usage();
        io.sockets.emit("RAM", ram_metrics);
        console.log('Emitted RAM metrics');

        disk_metrics = await get_disk_usage();
        io.sockets.emit("Disk", disk_metrics);
        console.log('Emitted Disk metrics');

        console.log('Will wait 15 seconds');
        await delay(15000);
        console.log('Waited 15 seconds');
    }
    
}

io.on('connection', (socket) => {
    console.log('A new connection established with id ', socket.id);
})

io.on('disconnect', (socket) => {
    console.log('A user with id ', socket.id, 'disconnected');
})

server.listen(4000);
emit_metrics();

