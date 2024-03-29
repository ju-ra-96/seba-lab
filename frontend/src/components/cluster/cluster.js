import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import kubeLogo from "../../assets/Kubernetes.png";
import Typography from '@mui/material/Typography';
import DeleteDialog from '../dialogs/deleteDialog';
import useStore from "../../services/useStore";
import './cluster.css';

export default function Cluster(props) {

  const openDeleteDialog = useStore((state) => state.openDeleteDialog);

  const navigate = useNavigate();
  const navigateToStatus = () => {
    navigate('/pods/' + props.id);
  };
  const navigateToGraph = () => {
    navigate('/dashboard/' + props.id);
  };
  const onDelete = async (e) => {
    e.preventDefault();
    localStorage.setItem('deleteId', props.id);
    localStorage.setItem('deleteName', props.name);
    openDeleteDialog();
  }

  return (
    <Card key={props.id} className="cluster" sx={{ width: 295, height: 295 }}>
      <CardContent>
        <img
          className="cluster_image"
          height="140"
          src={kubeLogo}
          alt="Kubernetes Cluster"
        />
        <Typography gutterBottom variant="h5" component="div">
          {props.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          identifier: {props.id}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          config: {props.config.substring(7)}
        </Typography>
      </CardContent>
      <CardActions className="cluster_buttons">
        <Button onClick={navigateToGraph} size="small">Graph</Button>
        <Button onClick={navigateToStatus} size="small">Pods</Button>
        <Button onClick={onDelete} size="small">Delete</Button>
      </CardActions>
      <DeleteDialog key={props.id} name={props.name} id={props.id} />
    </Card>
  );
}