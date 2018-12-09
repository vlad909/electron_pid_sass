import {EventBus} from './EventBus.js'
import {cloneDeep} from 'lodash'
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
            this.$store.commit('setError', {})
            switch (exp.selected_formula) {
                case 'P':
                    this.experiment.standard_K = {
                        K0: exp.Kp + exp.Ki * exp.T + exp.Kd / exp.T, // k0
                        K1: -(2 * exp.Kd / exp.T + exp.Kp),
                        K2: exp.Kd / exp.T
                    }
                    this.rectOrTrapCreator(exp, this.experiment.standard_K, action)
                    break
                case 'T':
                    this.experiment.standard_K = {
                        K0: exp.Kp + (exp.Ki / 2) * exp.T + exp.Kd / exp.T,
                        K1: -(exp.Kp + (2 * exp.Kd) / exp.T - (exp.Ki / 2)),
                        K2: exp.Kd / exp.T
                        // K0: exp.Kp + (exp.Ki / 2) * exp.T + exp.Kd / exp.T,
                        // K1: -(exp.Kp + (2 * exp.Kd) / exp.T - (exp.Ki / 2) * exp.T),
                        // K2: exp.Kd / exp.T
                    }
                    this.rectOrTrapCreator(exp, this.experiment.standard_K, action)
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
                    this.sympsonCreator(exp, this.experiment.standard_K, action)
                    break
            }
            // this.$store.commit('addToListOfExperiments', this.experiment)
        },
        sympsonCreator(setting, auto_params, action) {
            let x = [],
                U = [],
                dx = [],
                count = Math.floor(setting.t / setting.T),
                infinityError = false
            // EventBus.$emit('changeDisabledCountN', count)
            for (let i = 0; i <= count - 1; i++) {
                x.push(i === 0 ? 0 : setting.a * x[i - 1] + setting.b * U[i - 1])
                dx.push(setting.x0 - x[i])
                switch (i) {
                    case 0:
                        U.push(setting.Kp * setting.x0)
                        break
                    case 1:

                        U.push((setting.Ki * setting.T / 2 - setting.Kd / setting.T) * setting.x0)
                        break
                    case 2:
                        U.push(auto_params.evenK0 * dx[i] + (setting.Ki
                            * (4 * setting.T / 3) - setting.Kd * (1 / setting.T)) * dx[1] + (setting.Ki * (setting.T / 3)) * setting.x0)
                        break
                    default:
                        U.push(i % 2 === 0 ? U[i - 1] + auto_params.evenK0 * dx[i] + auto_params.evenK1 * dx[i - 1] + auto_params.evenK2 * dx[i - 2] :
                            U[i - 1] + auto_params.oddK0 * dx[i] + auto_params.oddK1 * dx[i - 1] + auto_params.oddK2 * dx[i - 2])
                        break
                }
                if (!this.NaNFinder([x[i], dx[i], U[i]])) {
                    console.log(x[i], dx[i], U[i], 'x dx U')
                    this.$store.commit('setError', {
                        type: 'alert-danger',
                        message: `The calculation was stopped at ${i} step due to overflow.`
                    })
                    U.splice(i, 1)
                    x.splice(i, 1)
                    dx.splice(i, 1)
                    EventBus.$emit('changeDisabledCountN', i)
                    infinityError = true
                    break
                }
            }
            if (!infinityError) {
                EventBus.$emit('changeDisabledCountN', count)
            }
            if (action !== 'change') {
                setting.name = Date.now()
                this.addToListAdded(setting)
            }
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
        },

        rectOrTrapCreator(setting, auto_params, action) { //пока только для константы
            let x = [],
                U = [],
                dx = [],
                count = Math.floor(setting.t / setting.T),
                infinityError = false,
                $a = null,
                $b = null,
                betta$E = 0,
                copy_setting = cloneDeep(setting)
            if (copy_setting.LRBE) {
                $a = copy_setting.R / copy_setting.L
                $b = copy_setting.Betta / copy_setting.L
                copy_setting.a = 1 / (1 + $a * copy_setting.T)
                copy_setting.b = $b * copy_setting.T / (1 + $a * copy_setting.T)
                betta$E = copy_setting.b * copy_setting.E
                EventBus.$emit('setNotAutoParams', copy_setting.a, copy_setting.b)
            }
/*TODO нужно перенести этот метод в Симпсона (или как-то унифицировать)*/
            for (let i = 0; i <= count - 1; i++) {
                x.push(i === 0 ? 0 : copy_setting.a * x[i - 1] + copy_setting.b * U[i - 1] + betta$E)
                dx.push(copy_setting.x0 - x[i])
                if (copy_setting.selected_formula === 'P') {
                    U.push(i === 0 || i === 1 ? (i === 0 ? copy_setting.Kp * copy_setting.x0 : auto_params.K0 * copy_setting.x0 - auto_params.K0 * x[i] - auto_params.K2 *
                        copy_setting.x0)
                        : U[i - 1] + auto_params.K0 * dx[i] + auto_params.K1 * dx[i - 1] + auto_params.K2 * dx[i - 2])
                } else {
                    U.push(i === 0 || i === 1 ? (i === 0 ? copy_setting.Kp * copy_setting.x0 : (copy_setting.Ki * copy_setting.T / 2 - copy_setting.Kd / copy_setting.T) * copy_setting.x0)
                        : U[i - 1] + auto_params.K0 * dx[i] + auto_params.K1 * dx[i - 1] + auto_params.K2 * dx[i - 2])
                }
                if (!this.NaNFinder([x[i], dx[i], U[i]])) {
                    // console.log(x[i], dx[i], U[i], 'x dx U')
                    this.$store.commit('setError', {
                        type: 'alert-danger',
                        message: `The calculation was stopped at ${i} step due to overflow.`
                    })
                    U.splice(i, 1)
                    x.splice(i, 1)
                    dx.splice(i, 1)
                    EventBus.$emit('changeDisabledCountN', i)
                    infinityError = true
                    break
                }
            }
            if (!infinityError) {
                EventBus.$emit('changeDisabledCountN', count)
            }
            if (action !== 'change') {
                setting.name = Date.now()
                this.addToListAdded(setting)
            }
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
        },
        NaNFinder(array) {
            return array.every(el => Number.isFinite(el))
        }

    }
}