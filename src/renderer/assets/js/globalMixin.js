import {EventBus} from './EventBus.js'

export const actions = {
    data() {
        return {
            experiment: {}
        }
    },
    methods: {
        addToListAdded(obj) {
            // console.log('bf', this.$store.state.lastExperiment)
            this.$store.commit('addToAdded', obj)
        },
        somethingIsVoid(obj) { //если одно из полей метода отсутствует
            return Object.values(obj).some(e => e === null || e === '')
        },
        somethingIsVoidSpecialForOnlyNumberValues(obj) {
            return Object.values(obj).some(e => e === null || e === '' || isNaN(e))
        },

        limiterByWidth(count, what = 'px') {
            return {width: count + what}
        },
        orderBySoloFormula(exp, action = 'change') { //расчёт стандартных K
            switch (exp.selected_formula) {
                case 'P':
                    this.experiment.standard_K = {
                        K0: exp.Kp + exp.Ki * exp.T + exp.Kd / exp.T, // k0
                        K1: -(2 * exp.Kd / exp.T + exp.Kp),
                        K2: exp.Kd / exp.T
                    }
                    this.rectangleMethod(exp, this.experiment.standard_K, action)
                    break
                case 'T':
                    this.experiment.standard_K = {
                        K0: exp.Kp + (exp.Ki / 2) * exp.T + exp.Kd / exp.T,
                        K1: -(exp.Kp + (2 * exp.Kd) / exp.T - exp.Ki / 2 * exp.T),
                        K2: exp.Kd / exp.T
                    }
                    break
                case 'S':
                    this.experiment.standard_K = {
                        //even- чёт, odd - нечет
                        oddK0: exp.Kp + exp.Ki * exp.T / 2 + exp.Kd / exp.T,
                        oddK1: -exp.Kp + exp.Ki * exp.T / 2 - 2 * exp.Kd / exp.T,
                        oddK2: exp.Kd / exp.T,
                        evenK0: exp.Kp + exp.Ki * exp.T / 3 + exp.Kd / exp.T,
                        evenK1: -exp.Kp + 5 * exp.Ki * exp.T / 6 - 2 * exp.Kd / exp.T,
                        evenK2: -exp.Ki * exp.T / 6 + exp.Kd / exp.T
                    }
                    break
            }
            // this.$store.commit('addToListOfExperiments', this.experiment)
        },
        rectangleMethod(setting, auto_params, action) { //пока только для константы
            let x = [],
                U = [],
                dx = [],
                count = Math.floor(setting.t / setting.T)
            EventBus.$emit('changeDisabledCountN', count)
            // result.U.push(setting.Kp * setting.x0) // U by n = 0
            for (let i = 0; i <= count - 1; i++) {
                x.push(i === 0 ? 0 : setting.a * x[i - 1] + setting.b * U[i - 1])
                dx.push(setting.x0 - x[i])
                U.push(i === 0 || i === 1 ? (i === 0 ? setting.Kp * setting.x0 : auto_params.K0 * setting.x0 - auto_params.K0 * x[i] - auto_params.K2 *
                    setting.x0)
                    : U[i - 1] + auto_params.K0 * dx[i] + auto_params.K1 * dx[i - 1] + auto_params.K2 * dx[i - 2])
            }
            if (action !== 'change') {
                setting.name = Date.now()
                this.addToListAdded(setting)
            }
            console.log('act', action)
            EventBus.$emit(action === 'change' ? 'changeLineByName' : 'addLine', setting.name, x)
            this.$store.commit('setDataInLastExperiment', Object.assign({}, {
                name: setting.name,
                creates_method: action,
            }, {
                data: {
                    x: x,
                    U: U,
                    dx: dx
                }
            }))
        }

    }
}