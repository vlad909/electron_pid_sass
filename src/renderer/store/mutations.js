export default {
    addToListOfExperiments(state, payload){
        let olds = state.allExperiments
        olds.push(payload)
        state.allExperiments = olds
    },
    toLastExperiment(state, payload){
        state.lastExperiment = payload
    }

}