const pool = require("../config/db");
const shell = require('shelljs');
const { exec } = require("child_process");

exports.createCluster = async (req, res, next) => {
    try {
        const { id, name, config } = req.body;
        //shell.exec("helm install prometheus prometheus-community/kube-prometheus-stack --kubeconfig="+config);
        const cluster = await pool.query('INSERT INTO clusters (id, name, config) VALUES ($1, $2, $3);',
            [id, name, config]);
        res.status(200).send(cluster);
    } catch (err) {
        res.json(err);
        console.log(err);
    }

};

exports.getCluster = async (req, res) => {
    try {
        const { id } = req.params;
        const cluster = await pool.query('SELECT * FROM clusters WHERE id=$1;', [id]);
        let x;
        getNamespaces(cluster.rows[0].config, function(err, callback){
        x = callback;
        res.json({namespaces:x})
        });
    } catch (err) {
        res.json(err)
    }
};

exports.getClusters = async (req, res) => {
    try {
        const clusters = await pool.query('SELECT * FROM clusters;');
        res.json(clusters.rows)
    } catch (err) {
        res.json(err)
    }
};

exports.deleteCluster = async (req, res) => {
    try {
        const { id } = req.params;
        const clusterConfig = await pool.query('SELECT config FROM clusters WHERE id=$1;', [id]);
        //shell.exec("helm uninstall monitor --kubeconfig C:/Users/ahmed/projects/SAP/backend/controllers/kubeconfigf"+clusterConfig);
        const clusters = await pool.query('DELETE FROM clusters WHERE id=$1;', [id]);
        res.json(clusters.rows)
    } catch (err) {
        res.json(err)
    }
};

function execute(cmd, callback) {
    exec(cmd, function (error, stdout) {
        return callback(null, stdout);
    });
}

exports.getNamespaces = async (req, res) => {
    try {
        const { id } = req.params;
        const cluster = await pool.query('SELECT * FROM clusters WHERE id=$1;', [id]);
        execute('kubectl get namespaces --kubeconfig=' + cluster.rows[0].config, function(err, callback){
            console.log(callback);
            res.json({namespaces:callback})
        });
    } catch (err) {
        res.json(err)
    }
};

exports.getServices = async (req, res) => {
    try {
        const { id } = req.params;
        const cluster = await pool.query('SELECT * FROM clusters WHERE id=$1;', [id]);
        execute('kubectl get services --kubeconfig=' + cluster.rows[0].config, function(err, callback){
            console.log(callback);
            res.json({services:callback})
        });
    } catch (err) {
        res.json(err)
    }
};

exports.getNodes = async (req, res) => {
    try {
        const { id } = req.params;
        const cluster = await pool.query('SELECT * FROM clusters WHERE id=$1;', [id]);
        execute('kubectl get nodes --kubeconfig=' + cluster.rows[0].config, function(err, callback){
            console.log(callback);
            res.json({nodes:callback})
        });
    } catch (err) {
        res.json(err)
    }
};

exports.getPods = async (req, res) => {
    try {
        const { id } = req.params;
        const cluster = await pool.query('SELECT * FROM clusters WHERE id=$1;', [id]);
        execute('kubectl get pods --kubeconfig=' + cluster.rows[0].config, function(err, callback){
            console.log(callback);
            res.json({pods:callback})
        });
    } catch (err) {
        res.json(err)
    }
};
