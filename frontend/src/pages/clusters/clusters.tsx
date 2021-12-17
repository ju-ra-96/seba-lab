import React, { useEffect } from 'react';
import Cluster from '../../components/cluster/cluster';
import axios from 'axios';
import useStore from "../../services/useStore";
import { toast } from 'react-toastify';
import './clusters.css';

const Clusters = () => {

    const clusters = useStore((state) => state.clusters);
    const setClusters = useStore((state) => state.setClusters);
    const deleteDialogState = useStore((state) => state.deleteDialogState);
    const createDialogState = useStore((state) => state.createDialogState);

    useEffect(() => {
        getClusters();
    }, [createDialogState,deleteDialogState]);

    const getClusters = async () => {
            const axiosConfig = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            await axios.get('http://localhost:5000/api/cluster/getClusters', axiosConfig)
                .then(res => {
                    setClusters(res.data.map((cluster) => <Cluster key={cluster.id} id={cluster.id} name={cluster.name} config={cluster.config} />))
                })   
                .catch((e) => {
                    toast.configure()
                    toast.error('Error getting the clusters')
                });;
    }

    return (
        <div className="clusters-page">
            {clusters}
        </div>
    );
};

export default Clusters;