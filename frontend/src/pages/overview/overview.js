import React, { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './overview.css';
import useStore from "../../services/useStore";

export function Overview(props) {

    useEffect(() => {
        getInfo();
    }, []);

    const pods = useStore((state) => state.pods);
    const services = useStore((state) => state.services);
    const nodes = useStore((state) => state.nodes);
    const namespaces = useStore((state) => state.namespaces);
    const setPods = useStore((state) => state.setPods);
    const setServices = useStore((state) => state.setServices);
    const setNodes = useStore((state) => state.setNodes);
    const setNamespaces = useStore((state) => state.setNamespaces);

    const getInfo = async (e) => {
        const axiosConfig = {
            Headers: {
                "Content-Type": "application/json",
            },
        };
        await axios.get('http://localhost:8000/api/cluster/getPods/' + window.location.pathname.slice(10), axiosConfig)
            .then(res => {
                trimPods(res.data.pods);
                console.log("pods:")
                console.log(res.data.pods)
            })
            .catch((e) => {
                toast.configure()
                toast.error('Error getting the pods')
            });
        await axios.get('http://localhost:8000/api/cluster/getServices/' + window.location.pathname.slice(10), axiosConfig)
            .then(res => {
                trimServices(res.data.services)
                console.log("services:")
                console.log(res.data.services)
            })
            .catch((e) => {
                toast.configure()
                toast.error('Error getting the services')
            });

        await axios.get('http://localhost:8000/api/cluster/getNodes/' + window.location.pathname.slice(10), axiosConfig)
            .then(res => {
                trimNodes(res.data.nodes)
                console.log("nodes:")
                console.log(res.data.nodes)
            })
            .catch((e) => {
                toast.configure()
                toast.error('Error getting the nodes')
            });

        await axios.get('http://localhost:8000/api/cluster/getNamespaces/' + window.location.pathname.slice(10), axiosConfig)
            .then(res => {
                trimNamespaces(res.data.namespaces)
                console.log("namespaces:")
                console.log(res.data.namespaces)
            })
            .catch((e) => {
                toast.configure()
                toast.error('Error getting the namespaces')
            });
    }
    const trimPods = (input) => {
        let podsString = input.replaceAll(`\n`, " ")
        let podsArray = podsString.split(" ")
        podsArray = podsArray.filter(item => item);
        let filteredPodsArray = [];
        for (let i = 5; i < podsArray.length; i++) {
            filteredPodsArray.push(podsArray[i]);
        }
        let NamesArray = [];
        let ReadyArray = [];
        let StatusArray = [];
        let RestartArray = [];
        let AgeArray = [];
        for (let i = 0; i < podsArray.length - 5; i += 5) {
            NamesArray.push(filteredPodsArray[i]);
        }
        for (let i = 1; i < podsArray.length - 5; i += 5) {
            ReadyArray.push(filteredPodsArray[i]);
        }
        for (let i = 2; i < podsArray.length - 5; i += 5) {
            StatusArray.push(filteredPodsArray[i]);
        }
        for (let i = 3; i < podsArray.length - 5; i += 5) {
            RestartArray.push(filteredPodsArray[i]);
        }
        for (let i = 4; i < podsArray.length - 5; i += 5) {
            AgeArray.push(filteredPodsArray[i]);
        }
        podsArray = [];
        podsArray.push(NamesArray);
        podsArray.push(ReadyArray);
        podsArray.push(StatusArray);
        podsArray.push(RestartArray);
        podsArray.push(AgeArray);
        setPods(podsArray);
    }

    const trimServices = (input) => {
        let servicesString = input.replaceAll(`\n`, " ")
        let servicesArray = servicesString.split(" ")
        servicesArray = servicesArray.filter(item => item);
        let filteredServicesArray = [];
        for (let i = 6; i < servicesArray.length; i++) {
            filteredServicesArray.push(servicesArray[i]);
        }
        let NamesArray = [];
        let TypesArray = [];
        let ClusterIpArray = [];
        let ExternalIpArray = [];
        let PortsArray = [];
        let AgeArray = [];

        for (let i = 0; i < servicesArray.length - 6; i += 6) {
            NamesArray.push(filteredServicesArray[i]);
        }
        for (let i = 1; i < servicesArray.length - 6; i += 6) {
            TypesArray.push(filteredServicesArray[i]);
        }
        for (let i = 2; i < servicesArray.length - 6; i += 6) {
            ClusterIpArray.push(filteredServicesArray[i]);
        }
        for (let i = 3; i < servicesArray.length - 6; i += 6) {
            ExternalIpArray.push(filteredServicesArray[i]);
        }
        for (let i = 4; i < servicesArray.length - 6; i += 6) {
            PortsArray.push(filteredServicesArray[i]);
        }
        for (let i = 4; i < servicesArray.length - 6; i += 6) {
            AgeArray.push(filteredServicesArray[i]);
        }
        servicesArray = [];
        servicesArray.push(NamesArray);
        servicesArray.push(TypesArray);
        servicesArray.push(ClusterIpArray);
        servicesArray.push(ExternalIpArray);
        servicesArray.push(PortsArray);
        servicesArray.push(AgeArray);
        setServices(servicesArray);
    }

    const trimNodes = (input) => {
        let nodesString = input.replaceAll(`\n`, " ")
        let nodesArray = nodesString.split(" ")
        nodesArray = nodesArray.filter(item => item);
        let filteredNodesArray = [];
        for (let i = 5; i < nodesArray.length; i++) {
            filteredNodesArray.push(nodesArray[i]);
        }
        let namesArray = [];
        let statusArray = [];
        let rolesArray = [];
        let ageArray = [];
        let versionArray = [];

        for (let i = 0; i < nodesArray.length - 5; i += 5) {
            namesArray.push(filteredNodesArray[i]);
        }
        for (let i = 1; i < nodesArray.length - 5; i += 5) {
            statusArray.push(filteredNodesArray[i]);
        }
        for (let i = 2; i < nodesArray.length - 5; i += 5) {
            rolesArray.push(filteredNodesArray[i]);
        }
        for (let i = 3; i < nodesArray.length - 5; i += 5) {
            ageArray.push(filteredNodesArray[i]);
        }
        for (let i = 4; i < nodesArray.length - 5; i += 5) {
            versionArray.push(filteredNodesArray[i]);
        }

        nodesArray = [];
        nodesArray.push(namesArray);
        nodesArray.push(statusArray);
        nodesArray.push(rolesArray);
        nodesArray.push(ageArray);
        nodesArray.push(versionArray);
        setNodes(nodesArray);
    }

    const trimNamespaces = (input) => {
        let namespacesString = input.replaceAll(`\n`, " ")
        let namespacesArray = namespacesString.split(" ")
        namespacesArray = namespacesArray.filter(item => item);
        let filteredNamespacesArray = [];
        for (let i = 3; i < namespacesArray.length; i++) {
            filteredNamespacesArray.push(namespacesArray[i]);
        }
        let namesArray = [];
        let statusArray = [];
        let ageArray = [];

        for (let i = 0; i < namespacesArray.length - 3; i += 3) {
            namesArray.push(filteredNamespacesArray[i]);
        }
        for (let i = 1; i < namespacesArray.length - 3; i += 3) {
            statusArray.push(filteredNamespacesArray[i]);
        }
        for (let i = 2; i < namespacesArray.length - 3; i += 3) {
            ageArray.push(filteredNamespacesArray[i]);
        }

        namespacesArray = [];
        namespacesArray.push(namesArray);
        namespacesArray.push(statusArray);
        namespacesArray.push(ageArray);
        setNamespaces(namespacesArray);
    }


    return (
        <div className="clusters-page">
            <h1 className="clusters-status-title">Cluster status</h1>
        </div>
    );
};

export default Overview;