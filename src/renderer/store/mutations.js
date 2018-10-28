export default {
    addToListOfExperiments(state, payload) {
        let olds = state.allExperiments
        olds.push(payload)
        state.allExperiments = olds
    },
    toLastExperiment(state, payload) {
        state.lastExperiment = payload
    },
    setDataInLastExperiment(state, payload) {
        state.lastExperimentData = payload
    },
    addToAdded(state, payload) {
        let prev = state.listAddedExperiments
        prev.push(payload)
        state.listAddedExperiments = prev
    },
    removeFromAdded(state, index) {
        let prev = state.listAddedExperiments
        prev.splice(index, 1)
        state.listAddedExperiments = prev
    },
    customMutateLast(state, payload) {
        state.lastExperiment = payload
    }

}