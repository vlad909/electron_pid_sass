export default {
    addToListOfExperiments(state, payload) {
        state.allExperiments.push(payload)
    },
    toLastExperiment(state, payload) {
        state.lastExperiment = payload
    },
    setDataInLastExperiment(state, payload) {
        state.lastExperimentData = payload
    },
    addToAdded(state, payload) {
        state.listAddedExperiments.push(payload)
    },
    removeFromAdded(state, index) {
        state.listAddedExperiments.splice(index, 1)
    },
    customMutateLast(state, payload) {
        state.lastExperiment = payload
    },
    setError(state, payload){
        state.errorCaller = payload
    }
}