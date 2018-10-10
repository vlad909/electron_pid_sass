<template>
    <div class="custom-bg-header">
        <div class="d-flex justify-content-start">
            <div class="d-flex justify-content-start m-t-10 flex-column m-r-10">
                <div class="form-group d-inline-flex text-left">
                    <label class="m-l-r-10 label-standart-15" for="L">L</label>
                    <input type="text" class="form-control limiter-input" id="L" v-model.number="experiment.L"
                           :readonly="!experiment.LRBE">
                </div>
                <div class="form-group d-inline-flex">
                    <label class="m-l-r-10 label-standart-15" for="L">R</label>
                    <input type="text" class="form-control limiter-input" id="R" v-model.number="experiment.R"
                           :readonly="!experiment.LRBE">
                </div>
                <div class="form-group d-inline-flex">
                    <label class="m-l-r-10 label-standart-15" for="betta">β</label>
                    <input type="text" class="form-control limiter-input" id="betta" v-model.number="experiment.Betta"
                           :readonly="!experiment.LRBE">
                </div>
                <div class="form-group d-inline-flex">
                    <label class="m-l-r-10 label-standart-15" for="e">E</label>
                    <input type="text" class="form-control limiter-input" id="e" v-model.number="experiment.E"
                           :readonly="!experiment.LRBE">
                </div>
                <div class="form-group d-inline-flex">
                    <label class="m-l-r-10 label-standart-15" for="a">a</label>
                    <input type="text" class="form-control limiter-input" id="a" v-model.number="experiment.a"
                           :readonly="experiment.LRBE">
                </div>
                <div class="form-group d-inline-flex">
                    <label class="m-l-r-10 label-standart-15" for="b">b</label>
                    <input type="text" class="form-control limiter-input" id="b" v-model.number="experiment.b"
                           :readonly="experiment.LRBE">
                </div>
                <div class="form-group d-inline-flex">
                    <label class="m-l-r-10 label-standart-15" for="n">n</label>
                    <input type="text" class="form-control limiter-input" id="n" v-model.number="experiment.n">
                </div>
            </div>
            <div class="d-flex justify-content-start m-t-10 flex-column">
                <div class="form-group d-inline-flex">
                    <label class="m-l-r-10 label-standart-20" for="Kp">Kp</label>
                    <input type="text" class="form-control limiter-input" id="Kp" v-model.number="experiment.Kp">
                </div>
                <div class="form-group d-inline-flex">
                    <label class="m-l-r-10 label-standart-20" for="Ki">Ki</label>
                    <input type="text" class="form-control limiter-input" id="Ki" v-model.number="experiment.Ki">
                </div>
                <div class="form-group d-inline-flex">
                    <label class="m-l-r-10 label-standart-20" for="Kd">Kd</label>
                    <input type="text" class="form-control limiter-input" id="Kd" v-model.number="experiment.Kd">
                </div>
                <div class="form-group d-inline-flex">
                    <label class="m-l-r-10 label-standart-20" for="bigT">T</label>
                    <input type="text" class="form-control limiter-input" id="bigT" v-model.number="experiment.T">
                </div>
                <div class="form-group d-inline-flex">
                    <label class="m-l-10" for="ap">a(p)</label>
                    <input type="text" class="form-control limiter-input m-l-5" id="ap" v-model.number="experiment.ap"
                           :readonly="!experiment.LRBE">
                </div>
                <div class="form-group d-inline-flex">
                    <label class="m-l-10" for="bp">b(p)</label>
                    <input type="text" class="form-control limiter-input m-l-5" id="bp" v-model.number="experiment.bp"
                           :readonly="!experiment.LRBE">
                </div>
                <div class="form-group d-inline-flex" style="margin-top: -7px;">
                    <label class="m-l-r-10 label-standart-20" for="smallt">t</label>
                    <input type="text" class="form-control limiter-input" id="smallt" v-model.number="experiment.t">
                </div>
            </div>
            <div class="m-t-10 m-l-20 d-flex justify-content-start flex-column align-items-center">
                <div class="form-group form-check">
                    <input type="checkbox" class="form-check-input" id="bit-grid">
                    <label class="form-check-label" for="bit-grid">Use bit grid</label>
                </div>
                <div class="form-group form-check">
                    <input type="checkbox" class="form-check-input" id="sign" checked>
                    <label class="form-check-label" for="sign">With sign</label>
                </div>
                <div class="d-flex">
                    <div class="form-group d-flex flex-column justify-content-start m-r-10">
                        <label for="int" class="text-left">Integer part</label>
                        <input type="text" class="form-control limiter-input" id="int" value="4">
                    </div>
                    <div class="form-group d-flex flex-column justify-content-start">
                        <label for="frac" class="text-left">Frac</label>
                        <input type="text" class="form-control limiter-input" id="frac" value="3">
                    </div>
                </div>
                <div class="form-group">
                    <label for="experiments">List of experiments</label>
                    <select multiple class="form-control" id="experiments">
                        <option>Experiment 1</option>
                        <option>Experiment 2</option>
                        <option>Experiment 3</option>
                        <option>Experiment 4</option>
                        <option>Experiment 5</option>
                        <option>Experiment 5</option>
                    </select>
                </div>

            </div>
            <div class="d-flex flex-column m-t-10 m-l-20">
                <div class="form-check" v-for="(f, index) in formulas" :key="index" @click="selected_formula = f.value">
                    <input class="form-check-input" type="radio" :id="f.text"
                           :checked="f.value === selected_formula">
                    <label class="form-check-label" :for="f.text">
                        {{f.text}}
                    </label>
                </div>
            </div>
            <mixedComponent></mixedComponent>
        </div>
        <div class="form-group d-inline-flex">
            <label class="m-l-r-10 label-standart-15" for="x0">x0</label>
            <input type="text" class="form-control limiter-input-extended" id="x0" v-model="experiment.x0"
                   placeholder="Enter value or formula">
        </div>
        <div class="d-flex m-l-10 m-b-10">
            <div class="form-group form-check m-t-20">
                <input type="checkbox" class="form-check-input" id="LRBE" v-model="experiment.LRBE">
                <label class="form-check-label" for="LRBE">Model LRβE</label>
            </div>
            <button type="button" class="btn btn-success m-l-20" title="Copy data to old method">Swap params</button>
        </div>
    </div>
</template>

<script>
    //    import {actions} from '../../assets/js/globalMixin'
    import mixedComponent from './MixedParams.vue'
    export default{
        components: {mixedComponent},
        data(){
            return {
//                experiment: {
//                    LRBE: false,
//                    L: 1.3,
//                    R: 3.4,
//                    Betta: 1,
//                    E: 5,
//                    a: 0.9,
//                    b: 0.1,
//                    ap: 0.27,
//                    bp: 0.27,
//                    n: 100,
//                    x0: 5,
//                    Kp: 10,
//                    Ki: 1,
//                    Kd: 3,
//                    T: 1,
//                    t: 100,
//                    formula: 'P'
//                },
                selected_formula: 'P',
                formulas: [
                    {text: 'Rectangle', value: 'P'},
                    {text: 'Trapeze', value: 'T'},
                    {text: 'Simpson', value: 'S'},
                    {text: 'Mixed', value: 'M'},
                    {text: 'Optimize', value: 'O'}
                ]
            }
        },
        computed:{
            experiment:{/*TODO https://markus.oberlehner.net/blog/form-fields-two-way-data-binding-and-vuex/
            исрпваить ошибку vuex handling form
            */
                get () {
                    return this.$store.state.lastExperiment
                },
                set (value) {
                    this.$store.commit('toLastExperiment', value)
                }
            }
        },
        watch: {
            experiment(n){
                console.log(n, 'changed')
            }
        },
        mounted(){
//            this.$store.commit('toLastExperiment', this.experiment)
        }
    }
</script>
<style scoped>
    select.form-control[multiple] {
        height: auto;
        min-height: 100px;
    }

</style>