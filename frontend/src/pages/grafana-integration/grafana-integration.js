import React from 'react'

//configuration file that has the values stored for users
/* import config from './config' */

class SampleDashboard extends React.Component {
    
    clusterUrl = "http://ac7a3d8bc445d4223954b1a07fdae049-56304998.eu-central-1.elb.amazonaws.com:3000/d/B-Qbxg-nk/node-exporter-quickstart-and-dashboard?orgId=1&var-datasource=Prometheus&var-instance=" + window.location.pathname.slice(11);
    render() {
        return (
            <>
               <iframe title ="frame" width="100%" height="2160" src={this.clusterUrl} />;
            </>
        )
    }
}
export default SampleDashboard