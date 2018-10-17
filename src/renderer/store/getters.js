export default {
    getX(state) {
        return state.lastExperimentData.data ? state.lastExperimentData.data.x : []
    },
    getU(state) {
        return state.lastExperimentData.data ? state.lastExperimentData.data.U : []
    },
    getDX(state) {
        return state.lastExperimentData.data ? state.lastExperimentData.data.dx : []
    },
    getAll(state) {
        return state.lastExperimentData.data
    }
}