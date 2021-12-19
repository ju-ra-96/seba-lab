import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteDialog from '../dialogs/deleteDialog';
import useStore from "../../services/useStore";
import './cluster.css';

export default function Cluster(props) {

  const openDeleteDialog = useStore((state) => state.openDeleteDialog);

  const navigate = useNavigate();
  const navigateToStatus = () => {
    navigate('/overview/'+ props.id);
  };
  const navigateToGraph = () => {
    navigate('/dashboard');
  };
  return (
    <Card key={props.id} className="cluster" sx={{ width: 295, height: 295 }}>
      <CardContent>
        <img
          className="cluster_image"
          height="140"
          src="https://www.syseleven.de/wp-content/uploads/2020/11/Kubernetes_Rad.png"
          alt="Kubernetes Cluster"
        />
        <Typography gutterBottom variant="h5" component="div">
          {props.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         id: {props.id}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         status: running
        </Typography>
      </CardContent>
      <CardActions className="cluster_buttons">
        <Button onClick={navigateToGraph} size="small">Graph</Button> 
        <Button onClick={navigateToStatus} size="small">Status</Button>
        <Button onClick={openDeleteDialog} size="small">Delete</Button>
      </CardActions>
      <DeleteDialog key={props.id} name={props.name} id={props.id} />
    </Card>
  );
}