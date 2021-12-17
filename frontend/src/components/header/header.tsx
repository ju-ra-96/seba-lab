import React from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton'
import InsightsIcon from '@mui/icons-material/Insights';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import CreateDialog from '../dialogs/createDialog';
import useStore from "../../services/useStore";
import './header.css';

const Header = () => {

  const openCreateDialog = useStore((state) => state.openCreateDialog);
  const navigate = useNavigate();

  const handleLogo = () => {
    navigate('/clusters');
  };

  return <div className="header">
    <div className="header-buttons-and-logo">
      <IconButton color="primary" aria-label="home"  onClick={handleLogo}>
        <InsightsIcon />
      </IconButton>
      <div className="header-buttons">
        <IconButton color="primary" aria-label="Add Cluster" onClick={openCreateDialog}>
          <AddCircleOutlineIcon />
        </IconButton>
        <IconButton color="primary" aria-label="Notifications">
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton color="primary" aria-label="Settings">
          <SettingsOutlinedIcon />
        </IconButton>
      </div>
      <CreateDialog />
    </div>
  </div>;
};

export default Header;