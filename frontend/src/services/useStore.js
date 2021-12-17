import create from "zustand";

const useStore = create((set) => ({

    deleteDialogState: false,
    createDialogState: false,
    file: null,
    name: "",
    clusters: [],
    pods: [],
    namespaces: [],
    services: [],
    nodes: [],
    
    setPods: (pods) =>
    set((state) => ({ pods: pods })),
    
    setNamespaces: (namespaces) =>
    set((state) => ({ namespaces: namespaces })),

    setNodes: (nodes) =>
    set((state) => ({ nodes: nodes })),

    setServices: (services) =>
    set((state) => ({ services: services })),

    openDeleteDialog: () =>
        set((state) => ({ deleteDialogState: true })),

    closeDeleteDialog: () =>
        set((state) => ({ deleteDialogState: false })),

    openCreateDialog: () =>
        set((state) => ({ createDialogState: true })),

    closeCreateDialog: () =>
        set((state) => ({ createDialogState: false })),

    setFile: (file) =>
        set((state) => ({ file: file })),

    setName: (name) =>
        set((state) => ({ name: name })),

    setClusters: (clusters) =>
    set((state) => ({ clusters: clusters })),


    addCluster: (cluster) =>
        set((state) => ({
            clusters : [
                state.clusters.push(cluster),
            ]
    })),

    removeCluster: (id) =>
        set((state) => ({
            clusters: state.clusters.filter((cluster) => cluster.id !== id),
        })),
}));
export default useStore;