export const actions = {
    data(){
        return {
            experiment: {}
        }
    },
    methods: {
        limiterByWidth(count, what = 'px'){
            return {width: count + what}
        },
        orderBySoloFormula(exp){
            switch (exp.selected_formula) {
                case 'P': {
                    this.experiment.standard_K = {
                        K0: exp.Kp + exp.Ki * exp.T + exp.Kd / exp.T, // k0
                        K1: -(2 * exp.Kd / exp.T + exp.Kp),
                        K2: exp.Kd / exp.T
                    }
                    this.$store.commit('addToListOfExperiments', this.experiment)
                }

            }
        }

    }
}