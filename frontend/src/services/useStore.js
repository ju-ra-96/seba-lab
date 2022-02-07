import create from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create((set) => ({
  deleteDialogState: false,
  createDialogState: false,
  file: null,
  name: '',
  id: '',
  clusters: [],
  podNames: [],
  podReady: [],
  podStatus: [],
  podRestart: [],
  podAge: [],

  setPodName: (podNames) => set((state) => ({ podNames: podNames })),
  setPodReady: (podReady) => set((state) => ({ podReady: podReady })),
  setPodStatus: (podStatus) => set((state) => ({ podStatus: podStatus })),
  setPodRestart: (podRestart) => set((state) => ({ podRestart: podRestart })),
  setPodAge: (podAge) => set((state) => ({ podAge: podAge })),

  openDeleteDialog: () => set((state) => ({ deleteDialogState: true })),

  closeDeleteDialog: () => set((state) => ({ deleteDialogState: false })),

  openCreateDialog: () => set((state) => ({ createDialogState: true })),

  closeCreateDialog: () => set((state) => ({ createDialogState: false })),

  setFile: (file) => set((state) => ({ file: file })),

  setId: (id) => set((state) => ({ id: id })),

  setName: (name) => set((state) => ({ name: name })),

  setClusters: (clusters) => set((state) => ({ clusters: clusters })),

  addCluster: (cluster) =>
    set((state) => ({
      clusters: [state.clusters.push(cluster)],
    })),

  removeCluster: (id) =>
    set((state) => ({
      clusters: state.clusters.filter((cluster) => cluster.id !== id),
    })),
}))
export default useStore
