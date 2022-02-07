//const shell = require('shelljs');
const { exec } = require("child_process");
const { Pool } = require('pg');
const pool = new Pool({
    connectionString: "postgres://gosdurtygktirn:ec3fe04043d41a2fc90ed6f6ee98c8b4f7399f1a685af5724bb418e8772b3a6a@ec2-54-229-68-88.eu-west-1.compute.amazonaws.com:5432/d8v06dbndnu9f0",
    ssl: {
        rejectUnauthorized: false
    }
});
const io = require('socket.io-client');
const ioClient = io.connect('http://localhost:4000', { transports: ['websocket'] })

exports.createCluster = async (req, res, next) => {
    try {
        const { index, id, name, config } = req.body;

        const cluster = await pool.query('INSERT INTO idsClusters (index, id, name, config) VALUES ($1, $2, $3, $4);',
            [index, id, name, config]).then(res => {
                //const configName = cluster.rows[0].config.slice(7);
                //shell.exec("helm install prometheus prometheus-community/kube-prometheus-stack --kubeconfig=C:\\Users\\ahmed\\OneDrive\\Bureau\\seba-lab\\backend\\public\\"+configName);
            }).catch(e => {
                if (e.code == '23505') {
                    console.log('Duplicate');
                    res.status(500).send("duplicate");
                    return;
                }
            })
        ioClient.emit("clusterUpdate");
        res.status(200).send(cluster);
        //window.location.reload();
    } catch (err) {
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
        const clusterConfig = await pool.query('SELECT * FROM idsClusters WHERE id=$1;', [id]);
        const configName = clusterConfig.rows[0].config.slice(7);
        //exec("helm uninstall monitor --kubeconfig=C:\\Users\\ahmed\\OneDrive\\Bureau\\seba-lab\\backend\\public\\"+configName);
        exec(`DEL C:\\Users\\ahmed\\OneDrive\\Bureau\\seba-lab\\backend\\public\\` + configName);
        const clusters = await pool.query('DELETE FROM idsClusters WHERE id=$1;', [id]);
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
        const configPath = `C:\\Users\\ahmed\\OneDrive\\Bureau\\seba-lab\\backend\\public\\` + cluster.rows[0].config.slice(7);
        execute('kubectl get pods --kubeconfig=' + configPath, function (err, callback) {
            res.json({ pods: callback })
        });
    } catch (err) {
        res.json(err)
    }
};
