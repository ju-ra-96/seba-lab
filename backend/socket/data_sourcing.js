var axios = require("axios");

let cluster_names = ['remote-cluster']

async function get_metrics(link, type, cluster_name) {
    try {
        const result = await axios.get(link);
        console.log('The result I got is ', result['data']);
        console.log('And the data inside data is ', result['data']['data']['result']) //['data']['status']
        if (result ['data']['status'] === 'success') {
            return result['data']['data'];
        } else {
            console.log('The status is ', result ['data']['status']);
            return null;
        }
    } catch (error) {
        console.log('Error getting ', type, ' metrics for cluster ', cluster_name, ':', error);
        return null;
    }
}

async function get_cpu_usage() {
    let metrics = {};
    for (let i = 0; i < cluster_names.length; i++) {
        var link = 'http://ade37cc803177462a8f012ed39b45f0a-1814643453.eu-central-1.elb.amazonaws.com:9090/api/v1/query?query=(((count(count(node_cpu_seconds_total{cluster_name="' + cluster_names[i] + '"})by(cpu)))-avg(sum%20by(mode)(rate(node_cpu_seconds_total{cluster_name="' + cluster_names[i] + '",mode="idle"}[5m]))))*100)/count(count(node_cpu_seconds_total{cluster_name="' + cluster_names[i] + '"})by(cpu))';
        metrics[cluster_names[i]] = await get_metrics(link, 'CPU', cluster_names[i]);
    }
    console.log('The metrics are', metrics);
    return metrics;
}


async function get_ram_usage() {
    let metrics = {};
    for (let i = 0; i < cluster_names.length; i++) {
        var link = 'http://ade37cc803177462a8f012ed39b45f0a-1814643453.eu-central-1.elb.amazonaws.com:9090/api/v1/query?query=100*((node_memory_MemTotal_bytes{cluster_name="' + cluster_names[i] + '"}-node_memory_MemFree_bytes{cluster_name="' + cluster_names[i] + '"})/(node_memory_MemTotal_bytes{cluster_name="' + cluster_names[i] + '"}))';
        metrics[cluster_names[i]] = await get_metrics(link, 'RAM', cluster_names[i]);
    }
    console.log('The metrics are', metrics);
    return metrics;
}


async function get_disk_usage() {
    let metrics = {};
    for (let i = 0; i < cluster_names.length; i++) {
        var link = 'http://ade37cc803177462a8f012ed39b45f0a-1814643453.eu-central-1.elb.amazonaws.com:9090/api/v1/query?query=100-((node_filesystem_avail_bytes{cluster_name="' + cluster_names[i] + '",mountpoint="/",fstype!="rootfs"}*100)/node_filesystem_size_bytes{cluster_name="' + cluster_names[i] + '",mountpoint="/",fstype!="rootfs"})';
        metrics[cluster_names[i]] = await get_metrics(link, 'Disk', cluster_names[i]);
    }
    console.log('The metrics are', metrics);
    return metrics;
}


module.exports = { get_cpu_usage, get_ram_usage, get_disk_usage };