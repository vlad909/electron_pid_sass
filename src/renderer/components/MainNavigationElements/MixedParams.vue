<template>
    <div class="d-flex justify-content-start m-t-10 m-l-20">
        <div class="d-flex flex-column">
            <p class="m-b-0">Methods:</p>
            <div class="form-check" v-for="(f, index) in mixedMethod" :key="index" @click="toSelectMethods(f.value)">
                <input class="form-check-input" type="checkbox" :id="f.text"
                       :checked="selected.includes(f.value)">
                <label class="form-check-label" :for="f.text">
                    {{f.value}}
                </label>
            </div>
        </div>
        <div class="d-flex flex-column m-l-20">
            <p class="m-b-0">Priority:</p>
            <div class="form-check" v-for="(f, index) in mixedMethod" :key="index" @click="tripple_priority = f.value">
                <input class="form-check-input" type="radio" :id="f.text"
                       :checked="f.value === tripple_priority">
                <label class="form-check-label" :for="f.text">
                    {{f.value}}
                </label>
            </div>
        </div>
        <div class="d-flex flex-column m-l-20">
            <p class="m-b-0">Priority:</p>
            <div class="form-check" v-for="(f, index) in shortingArray('P')" :key="index" @click="tripple_priority = f.value">
                <input class="form-check-input" type="radio" :id="f.text"
                       :checked="f.value === tripple_priority">
                <label class="form-check-label" :for="f.text">
                    {{f.value}}
                </label>
            </div>
        </div>
        <div class="d-flex flex-column m-l-20">
            <p class="m-b-0">Priority:</p>
            <div class="form-check" v-for="(f, index) in shortingArray('T')" :key="index" @click="tripple_priority = f.value">
                <input class="form-check-input" type="radio" :id="f.text"
                       :checked="f.value === tripple_priority">
                <label class="form-check-label" :for="f.text">
                    {{f.value}}
                </label>
            </div>
        </div>
        <div class="d-flex flex-column m-l-20">
            <p class="m-b-0">Priority:</p>
            <div class="form-check" v-for="(f, index) in shortingArray('S')" :key="index" @click="tripple_priority = f.value">
                <input class="form-check-input" type="radio" :id="f.text"
                       :checked="f.value === tripple_priority">
                <label class="form-check-label" :for="f.text">
                    {{f.value}}
                </label>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                selected: [],
                mixedMethod: [
                    {text: 'Rectangle', value: 'P'},
                    {text: 'Trapeze', value: 'T'},
                    {text: 'Simpson', value: 'S'},
                ],
                tripple_priority: null,
                double_priority: null,
            }
        },
        methods: {
            toSelectMethods(value) {
                if (this.selected.includes(value)) {
                    this.selected.splice(this.selected.indexOf(value), 1)
                } else {
                    this.selected.push(value)
                }
            },
            shortingArray(exclude){
                return this.mixedMethod.filter(e => e.value !== exclude)
            }
        }
    }
</script>