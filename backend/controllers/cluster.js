const { exec } = require("child_process");
require('dotenv').config({path: __dirname + '/../.env'});
const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DB_TOKEN,
    ssl: {
        rejectUnauthorized: false
    }
});
const io = require('socket.io-client');
const ioClient = io.connect('http://localhost:4000', { transports: ['websocket'] })


exports.createCluster = async (req, res, next) => {
    try {
        const { index, id, name, config } = req.body;

        const cluster = await pool.query('INSERT INTO idsClusters (index, id, name, config) VALUES ($1, $2, $3, $4);', [index, id, name, config]);
        ioClient.emit("clusterUpdate");
        res.status(200).send(cluster);
    } catch (err) {
        if (e.code == '23505') {
            res.status(500).send("duplicate");
        }
        res.status(500).json(err);
    }

};


exports.getCluster = async (req, res) => {
    try {
        const { id } = req.params;
        const cluster = await pool.query('SELECT * FROM idsClusters WHERE id=$1;', [id]);
        res.json({ cluster: cluster.rows[0] });
    } catch (err) {
        res.json(err);
    }
};


exports.getClusters = async (req, res) => {
    try {
        const clusters = await pool.query('SELECT * FROM idsClusters;');
        res.json(clusters.rows);
    } catch (err) {
        res.json(err)
    }
};


exports.deleteCluster = async (req, res) => {
    try {
        const { id } = req.params;
        const cluster = await pool.query('SELECT * FROM idsClusters WHERE id=$1;', [id]);
        const clusters = await pool.query('DELETE FROM idsClusters WHERE id=$1;', [id]);
        const configPath = __dirname + '/../public/' + cluster.rows[0].config.slice(7);
        console.log(configPath);
        exec("RM " + configPath);
        ioClient.emit("clusterUpdate");
        res.json(clusters.rows);
    } catch (err) {
        res.json(err)
    }
};


function execute(cmd, callback) {
    exec(cmd, function (error, stdout) {
        return callback(null, stdout);
    });
}


exports.getPods = async (req, res) => {
    try {
        const { id } = req.params;
        const cluster = await pool.query('SELECT * FROM idsClusters WHERE id=$1;', [id]);
        const configPath = __dirname + '/../public/' + cluster.rows[0].config.slice(7);
        console.log(configPath);
        execute('kubectl get pods --kubeconfig=' + configPath, function (err, callback) {
            res.json({ pods: callback })
        });
    } catch (err) {
        res.json(err)
    }
};
