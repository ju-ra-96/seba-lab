import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import IconButton from '@mui/material/IconButton'
import logo from '../../assets/sap.png'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined'
import CreateDialog from '../dialogs/createDialog'
import useStore from '../../services/useStore'
import './header.css'

const Header = () => {
  const openCreateDialog = useStore((state) => state.openCreateDialog)
  const navigate = useNavigate()

  const handleHome = () => {
    navigate('/clusters')
  }
  const handleGraphs = () => {
    navigate('/graphs')
  }

  return (
    <div className='header'>
      <div className='header-buttons-and-logo'>
        <Link to='/'>
          <img className='header-logo' height={60} src={logo} alt='logo' />
        </Link>

        <div className='header-buttons'>
          <IconButton className='header-button' aria-label='Home' onClick={handleHome}>
            <HomeOutlinedIcon className='header-button-icon' />
          </IconButton>
          <IconButton className='header-button' aria-label='BarChart' onClick={handleGraphs}>
            <BarChartOutlinedIcon className='header-button-icon' />
          </IconButton>
          <IconButton className='header-button' aria-label='Add Cluster' onClick={openCreateDialog}>
            <AddCircleOutlineIcon className='header-button-icon' />
          </IconButton>
        </div>
        <CreateDialog />
      </div>
    </div>
  )
}

export default Header
