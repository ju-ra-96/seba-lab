import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useStore from "../../services/useStore";

export function CreateDialog() {

    const createDialogState = useStore((state) => state.createDialogState);
    const id = useStore((state) => state.id);
    const name = useStore((state) => state.name);
    const file = useStore((state) => state.file);
    const closeCreateDialog = useStore((state) => state.closeCreateDialog);
    const addCluster = useStore((state) => state.addCluster);
    const setId = useStore((state) => state.setId);
    const setName = useStore((state) => state.setName);
    const setFile = useStore((state) => state.setFile);

    const onInputChangeId = (e) => {
        setId(e.target.value)
    };

    const onInputChangeName = (e) => {
        setName(e.target.value)
    };

    const onInputChangeFile = (e) => {
        setFile(e.target.files[0])
    };

    const onSubmit = async (e) => {
        if ((name.length > 4) && (id.length > 4) && (file != null) && (file.name.includes(".yaml"))) {
            const selectedFile = new FormData()
            selectedFile.append('file', file)
            let axiosConfig = {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                }
            };
            let data = {
                'index': Math.floor(Math.random() * 100000),
                'id': id,
                'name': name,
                'config': "public/" + file.name,
            };
            setId("")
            setName("")
            setFile(null)
            axios.post('http://localhost:8000/api/cluster/createCluster', data, axiosConfig)
                .then((response) => {
                    axios.post('http://localhost:8000/upload', selectedFile, axiosConfig)
                        .then((response) => {
                        }).catch((e) => {
                            toast.configure()
                            toast.error(e)
                        });
                    addCluster(data)
                    toast.configure()
                    toast.success('Cluster created successfully')
                })
                .catch((e) => {
                    toast.configure()
                    toast.error(e.response.data)
                });
            closeCreateDialog();
        } else {
            toast.configure()
            if (id.length < 5) {
                toast.error('the id of the cluster should contain at least 5 characters')
            }
            if (name.length < 5) {
                toast.error('the name of the cluster should contain at least 5 characters')
            }
            if (file == null) {
                toast.error('Please upload a config file for the cluster')
            } else if (!file.name.includes(".yaml")) {
                toast.error('Please upload a config file with the .yaml extention')
            }
        }
    }

    return <Dialog open={createDialogState} onClose={closeCreateDialog}>
        <DialogTitle>Add a cluster</DialogTitle>
        <DialogContent>
            <DialogContentText className="dialog_text">
                Please enter the id, the name and the config file of the Kubernetes cluster you want to monitor.
            </DialogContentText>
            <form method="post" action="#" id="#">
                <TextField
                    style={{ marginBottom:'10px' }}
                    autoFocus
                    onChange={onInputChangeId}
                    id="id"
                    label="Id"
                    className="cluster_id"
                    type="text"
                    fullWidth
                    required
                />
                <TextField
                    autoFocus
                    onChange={onInputChangeName}
                    id="name"
                    label="Name"
                    className="cluster_name"
                    type="text"
                    fullWidth
                    required
                />
                <input type="file" name="file" onChange={onInputChangeFile} />

                <DialogActions>
                    <Button onClick={closeCreateDialog}>Cancel</Button>
                    <Button onClick={onSubmit}>Add</Button>
                </DialogActions>
            </form>
        </DialogContent>

    </Dialog>
};

export default CreateDialog;