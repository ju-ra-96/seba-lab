import React from 'react'
import { useNavigate } from 'react-router-dom'
import IconButton from '@mui/material/IconButton'
import InsightsIcon from '@mui/icons-material/Insights'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined'
import CreateDialog from '../dialogs/createDialog'
import useStore from '../../services/useStore'
import './header.css'

const Header = () => {
  const openCreateDialog = useStore((state) => state.openCreateDialog)
  const navigate = useNavigate()

  const handleLogo = () => {
    navigate('/clusters')
  }
  const handleCharts = () => {
    navigate('/graphs')
  }

  return (
    <div className='header'>
      <div className='header-buttons-and-logo'>
        <IconButton className='header-button' color='primary' aria-label='home' onClick={handleLogo}>
          <InsightsIcon className='header-logo-icon' />
        </IconButton>
        <div className='header-buttons'>
          <IconButton className='header-button' color='primary' aria-label='Add Cluster' onClick={openCreateDialog}>
            <AddCircleOutlineIcon className='header-button-icon' />
          </IconButton>
          <IconButton className='header-button' color='primary' aria-label='Notifications'>
            <NotificationsOutlinedIcon className='header-button-icon' />
          </IconButton>
          <IconButton className='header-button' color='primary' aria-label='BarChart' onClick={handleCharts}>
            <BarChartOutlinedIcon className='header-button-icon' />
          </IconButton>
        </div>
        <CreateDialog />
      </div>
    </div>
  )
}

export default Header
