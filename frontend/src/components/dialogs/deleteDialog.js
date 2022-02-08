import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import useStore from '../../services/useStore'

export function DeleteDialog(props) {
  const deleteDialogState = useStore((state) => state.deleteDialogState)
  const closeDeleteDialog = useStore((state) => state.closeDeleteDialog)
  const removeCluster = useStore((state) => state.removeCluster)

  const onCancel = async (e) => {
    e.preventDefault()
    localStorage.removeItem('deleteId')
    localStorage.removeItem('deleteName')
    closeDeleteDialog()
  }

  const deleteCluster = async (e) => {
    e.preventDefault()
    let clusterToBeRemoved = localStorage.getItem('deleteId')
    const config = {
      Headers: {
        'Content-Type': 'application/json',
      },
    }
    await axios
      .delete('http://localhost:8000/api/cluster/deleteCluster/' + clusterToBeRemoved, config)
      .then(removeCluster(clusterToBeRemoved), toast.configure(), toast.success('cluster deleted successfully'))
      .catch((e) => {
        toast.configure()
        toast.error('Error deleting the cluster')
      })
    localStorage.removeItem('deleteId')
    localStorage.removeItem('deleteName')
    closeDeleteDialog()
  }

  return (
    <Dialog key={props.id} open={deleteDialogState} onClose={closeDeleteDialog}>
      <DialogTitle>Delete {localStorage.getItem('deleteName')}</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you would like to delete this cluster ?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={deleteCluster}>Delete</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteDialog
