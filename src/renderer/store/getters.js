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
    getMaxCountInListOfExperiment(state) {
        let list = state.listAddedExperiments
        return Math.max(...new Set(list.map(e => e.n)))
    },
    triggerError(state){
        return state.errorCaller
    }
}