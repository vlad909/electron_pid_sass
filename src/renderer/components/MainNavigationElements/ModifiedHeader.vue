<template>
    <div class="custom-bg-header">
        <div class="d-flex justify-content-start">
            <div class="d-flex justify-content-start m-t-10 flex-column m-r-10">
                <div class="form-group d-inline-flex text-left">
                    <label class="m-l-r-10 label-standart-15" for="L">L</label>
                    <input type="text" class="form-control limiter-input" id="L" value="1">
                </div>
                <div class="form-group d-inline-flex">
                    <label class="m-l-r-10 label-standart-15" for="L">R</label>
                    <input type="text" class="form-control limiter-input" id="R" value="1">
                </div>
                <div class="form-group d-inline-flex">
                    <label class="m-l-r-10 label-standart-15" for="betta">β</label>
                    <input type="text" class="form-control limiter-input" id="betta" value="0.1">
                </div>
                <div class="form-group d-inline-flex">
                    <label class="m-l-r-10 label-standart-15" for="e">E</label>
                    <input type="text" class="form-control limiter-input" id="e" value="0.01">
                </div>
                <div class="form-group d-inline-flex">
                    <label class="m-l-r-10 label-standart-15" for="a">a</label>
                    <input type="text" class="form-control limiter-input" id="a" value="0.9">
                </div>
                <div class="form-group d-inline-flex">
                    <label class="m-l-r-10 label-standart-15" for="b">b</label>
                    <input type="text" class="form-control limiter-input" id="b" value="0.2">
                </div>
                <div class="form-group d-inline-flex">
                    <label class="m-l-r-10 label-standart-15" for="n">n</label>
                    <input type="text" class="form-control limiter-input" id="n" value="1">
                </div>
            </div>
            <div class="d-flex justify-content-start m-t-10 flex-column">
                <div class="form-group d-inline-flex">
                    <label class="m-l-r-10 label-standart-20" for="Kp">Kp</label>
                    <input type="text" class="form-control limiter-input" id="Kp" value="10">
                </div>
                <div class="form-group d-inline-flex">
                    <label class="m-l-r-10 label-standart-20" for="Ki">Ki</label>
                    <input type="text" class="form-control limiter-input" id="Ki" value="1">
                </div>
                <div class="form-group d-inline-flex">
                    <label class="m-l-r-10 label-standart-20" for="Kd">Kd</label>
                    <input type="text" class="form-control limiter-input" id="Kd" value="3">
                </div>
                <div class="form-group d-inline-flex">
                    <label class="m-l-r-10 label-standart-20" for="bigT">T</label>
                    <input type="text" class="form-control limiter-input" id="bigT" value="1">
                </div>
                <div class="form-group d-inline-flex">
                    <label class="m-l-10" for="ap">a(p)</label>
                    <input readonly type="text" class="form-control limiter-input m-l-5" id="ap" value="1">
                </div>
                <div class="form-group d-inline-flex">
                    <label class="m-l-10" for="bp">b(p)</label>
                    <input readonly type="text" class="form-control limiter-input m-l-5" id="bp" value="1">
                </div>
                <div class="form-group d-inline-flex" style="margin-top: -7px;">
                    <label class="m-l-r-10 label-standart-20" for="smallt">t</label>
                    <input type="text" class="form-control limiter-input" id="smallt" value="1">
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
            <input type="text" class="form-control limiter-input-extended" id="x0" value="0.2"
                   placeholder="Enter value or formula">
        </div>
        <div class="d-flex m-l-10 m-b-10">
            <div class="form-group form-check m-t-20">
                <input type="checkbox" class="form-check-input" id="LRBE">
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
//        mixins: [actions]
        components: {mixedComponent},
        data(){
            return {
                selected_formula: 'P',
                formulas: [
                    {text: 'Rectangle', value: 'P'},
                    {text: 'Trapeze', value: 'T'},
                    {text: 'Simpson', value: 'S'},
                    {text: 'Mixed', value: 'M'},
                    {text: 'Optimize', value: 'O'}
                ]
            }
        }
    }
</script>
<style scoped>
    select.form-control[multiple] {
        height: auto;
        min-height: 100px;
    }

</style>