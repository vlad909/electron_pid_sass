<template>
    <div class="custom-bg-header">
        <div class="d-flex justify-content-start">
            <div class="d-flex justify-content-start m-t-10 flex-column m-r-10">
                <div class="form-group d-inline-flex text-left">
                    <label class="m-l-r-10 label-standart-15" for="L">L</label>
                    <input type="text" class="form-control limiter-input" id="L" v-model.number="L"
                           :readonly="!LRBE">
                </div>
                <div class="form-group d-inline-flex">
                    <label class="m-l-r-10 label-standart-15" for="L">R</label>
                    <input type="text" class="form-control limiter-input" id="R" v-model.number="R"
                           :readonly="!LRBE">
                </div>
                <div class="form-group d-inline-flex">
                    <label class="m-l-r-10 label-standart-15" for="betta">β</label>
                    <input type="text" class="form-control limiter-input" id="betta" v-model.number="Betta"
                           :readonly="!LRBE">
                </div>
                <div class="form-group d-inline-flex">
                    <label class="m-l-r-10 label-standart-15" for="e">E</label>
                    <input type="text" class="form-control limiter-input" id="e" v-model.number="E"
                           :readonly="!LRBE">
                </div>
                <div class="form-group d-inline-flex">
                    <label class="m-l-r-10 label-standart-15" for="a">a</label>
                    <input type="text" class="form-control limiter-input" id="a" v-model.number="a"
                           :readonly="LRBE">
                </div>
                <div class="form-group d-inline-flex">
                    <label class="m-l-r-10 label-standart-15" for="b">b</label>
                    <input type="text" class="form-control limiter-input" id="b" v-model.number="b"
                           :readonly="LRBE">
                </div>
                <div class="form-group d-inline-flex">
                    <label class="m-l-r-10 label-standart-15" for="n">n</label>
                    <input type="text" class="form-control limiter-input" id="n" v-model.number="n">
                </div>
            </div>
            <div class="d-flex justify-content-start m-t-10 flex-column">
                <div class="form-group d-inline-flex">
                    <label class="m-l-r-10 label-standart-20" for="Kp">Kp</label>
                    <input type="text" class="form-control limiter-input" id="Kp" v-model.number="Kp">
                </div>
                <div class="form-group d-inline-flex">
                    <label class="m-l-r-10 label-standart-20" for="Ki">Ki</label>
                    <input type="text" class="form-control limiter-input" id="Ki" v-model.number="Ki">
                </div>
                <div class="form-group d-inline-flex">
                    <label class="m-l-r-10 label-standart-20" for="Kd">Kd</label>
                    <input type="text" class="form-control limiter-input" id="Kd" v-model.number="Kd">
                </div>
                <div class="form-group d-inline-flex" :class="{'has-danger' : T <=0}">
                    <label class="m-l-r-10 label-standart-20" for="bigT">T</label>
                    <input type="text" class="form-control limiter-input" id="bigT" v-model.number="T">
                </div>
                <div class="form-group d-inline-flex">
                    <label class="m-l-10" for="ap">a(p)</label>
                    <input type="text" class="form-control limiter-input m-l-5" id="ap" v-model.number="ap"
                           :readonly="!LRBE">
                </div>
                <div class="form-group d-inline-flex">
                    <label class="m-l-10" for="bp">b(p)</label>
                    <input type="text" class="form-control limiter-input m-l-5" id="bp" v-model.number="bp"
                           :readonly="!LRBE">
                </div>
                <div class="form-group d-inline-flex" style="margin-top: -7px;">
                    <label class="m-l-r-10 label-standart-20" for="smallt">t</label>
                    <input type="text" class="form-control limiter-input" id="smallt" v-model.number="t">
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
                <div class="d-inline-flex w-100">
                    <div class="w-75 bg-white">
                        <ul class="exp-table">
                            <!--<li class="active">Experiment 1</li>-->
                            <li :class="{active: e.name === LastExperiment.name}"
                                v-for="(e, index) in listExperiments"
                                :key="index"
                                @click="setNewLast(index)">
                                {{e.name}}
                            </li>
                        </ul>
                    </div>
                    <div class="d-flex flex-column align-items-start justify-content-center m-l-20">
                        <button type="button" class="btn btn-success m-b-10" @click="addExp">+</button>
                        <button type="button" class="btn btn-danger" @click="deleteExp"
                                :disabled="listExperiments.length === 1">−
                        </button>
                    </div>
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
            <input type="text" class="form-control limiter-input-extended" id="x0" v-model="x0"
                   placeholder="Enter value or formula">
        </div>
        <div class="d-flex m-l-10 m-b-10">
            <div class="form-group form-check m-t-20">
                <input type="checkbox" class="form-check-input" id="LRBE" v-model="LRBE">
                <label class="form-check-label" for="LRBE">Model LRβE</label>
            </div>
            <button type="button" class="btn btn-success m-l-20" title="Copy data to old method">Swap params</button>
        </div>
        <div class="alert alert-setting text-center" :class="errorMessage.type" role="alert" v-if="errorMessage.message">
            {{errorMessage.message}}
        </div>
    </div>
</template>

<script>
    import mixedComponent from './MixedParams.vue'
    import {mapFields} from 'vuex-map-fields';
    import {EventBus} from "../../assets/js/EventBus";
    import {actions} from "../../assets/js/globalMixin";
    import {cloneDeep} from 'lodash'
    import {mapGetters} from 'vuex'

    export default {
        mixins: [actions],
        components: {mixedComponent},
        data() {
            return {
                formulas: [
                    {text: 'Rectangle', value: 'P'},
                    {text: 'Trapeze', value: 'T'},
                    {text: 'Simpson', value: 'S'},
                    {text: 'Mixed', value: 'M'},
                    {text: 'Optimize', value: 'O'}
                ],
                localLastIndex: 0
            }
        },
        computed: {
            ...mapFields([
                'lastExperiment.LRBE',
                'lastExperiment.L',
                'lastExperiment.R',
                'lastExperiment.Betta',
                'lastExperiment.E',
                'lastExperiment.a',
                'lastExperiment.b',
                'lastExperiment.ap',
                'lastExperiment.bp',
                'lastExperiment.n',
                'lastExperiment.x0',
                'lastExperiment.Kp',
                'lastExperiment.Ki',
                'lastExperiment.Kd',
                'lastExperiment.T',
                'lastExperiment.t',
                'lastExperiment.selected_formula'
            ]),
            listExperiments() {
                return this.$store.state.listAddedExperiments || []
            },
            LastExperiment() {
                return this.$store.state.lastExperiment
            },
            ...mapGetters({
                errorMessage: 'triggerError'
            })
        },
        methods: {
            addExp() {
                this.orderBySoloFormula(cloneDeep(this.LastExperiment, true), 'add')
                this.setNewLast(this.listExperiments.length - 1)

            },
            setNewLast(i) {
                // if (this.localLastIndex !== i) {
                this.localLastIndex = i
                this.$store.commit('customMutateLast', this.listExperiments[i])
                // }
            },
            deleteExp() {
                EventBus.$emit('deleteLine', this.LastExperiment.name)
                this.$store.commit('removeFromAdded', this.localLastIndex)
                this.setNewLast(0)
            }
        },
        mounted() {
            EventBus.$on('changeDisabledCountN', (n) => {
                this.n = n
            })
        }
    }
</script>
<style lang="scss" scoped>
    select.form-control[multiple] {
        height: auto;
        min-height: 100px;
    }

    .exp-table {
        .active {
            background: #dadada;
        }
    }

    .alert-setting {
        width: 500px;
        margin: 0 auto;
    }
</style>