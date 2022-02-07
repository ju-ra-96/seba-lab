import React, { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './pods.css';
import useStore from "../../services/useStore";

export function Pods(props) {

    useEffect(() => {
        getInfo();
        // const t = setInterval(() => getInfo(), 30000);
        // return () => clearInterval(t); 
    }, []);

    const podNames = useStore((state) => state.podNames);
    const podReady = useStore((state) => state.podReady);
    const podStatus = useStore((state) => state.podStatus);
    const podRestart = useStore((state) => state.podRestart);
    const podAge = useStore((state) => state.podAge);
    const setPodName = useStore((state) => state.setPodName);
    const setPodReady = useStore((state) => state.setPodReady);
    const setPodStatus = useStore((state) => state.setPodStatus);
    const setPodRestart = useStore((state) => state.setPodRestart);
    const setPodAge = useStore((state) => state.setPodAge);

    const getInfo = async (e) => {
        const axiosConfig = {
            Headers: {
                "Content-Type": "application/json",
            },
        };
        await axios.get('http://localhost:8000/api/cluster/getPods/' + window.location.pathname.slice(6), axiosConfig)
            .then(res => {
                trimPods(res.data.pods);
            })
            .catch((e) => {
                toast.configure()
                toast.error('Error getting the pods')
            });
    }
    
    const trimPods = (input) => {
        console.log(input);
        let podsString = input.replace(/ *\([^)]*\) */g, "             ");
        podsString = podsString.replaceAll(`\n`, " ")
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

        setPodName(NamesArray)
        setPodReady(ReadyArray)
        setPodStatus(StatusArray)
        setPodRestart(RestartArray)
        setPodAge(AgeArray)
    }

    return (
        <div className="clusters-page">
            <h1 className="clusters-status-title">Pods</h1>
            <div className="clusters-status-table">
            <ul>
                <h3 className="clusters-status-table-header">Name</h3>
                {podNames.map((item) =><li key={Math.floor(Math.random() * 100000)}>{ item }</li>)}
            </ul>
            <ul>
                <h3 className="clusters-status-table-header">Ready</h3>
                {podReady.map((item) =><li key={Math.floor(Math.random() * 100000)}>{ item }</li>)}
            </ul>
            <ul>
                <h3 className="clusters-status-table-header">Status</h3>
                {podStatus.map((item) =><li key={Math.floor(Math.random() * 100000)}>{ item }</li>)}
            </ul>
            <ul>
                <h3 className="clusters-status-table-header">Restart</h3>
                {podRestart.map((item) =><li key={Math.floor(Math.random() * 100000)}>{ item }</li>)}
            </ul>
            <ul>
                <h3 className="clusters-status-table-header">Age</h3>
                {podAge.map((item) =><li key={Math.floor(Math.random() * 100000)}>{ item }</li>)}
            </ul>
        </div>
        </div>
    );
};

export default Pods;