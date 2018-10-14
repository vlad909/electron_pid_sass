<template>
    <table class="table table-bordered m-t-20 m-l-20">
        <thead>
        <tr>
            <th scope="col">n</th>
            <th scope="col">x(nT)</th>
            <th scope="col">U(T)</th>
            <th scope="col">dx(nT)</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <th scope="row">1</th>
            <td>{{(Math.random() * 6).toFixed(3)}}</td>
            <td>{{(Math.random() * 6).toFixed(3)}}</td>
            <td>{{(Math.random() * 6).toFixed(3)}}</td>
        </tr>
        <tr>
            <th scope="row">2</th>
            <td>{{(Math.random() * 6).toFixed(3)}}</td>
            <td>{{(Math.random() * 6).toFixed(3)}}</td>
            <td>{{(Math.random() * 6).toFixed(3)}}</td>
        </tr>
        <tr>
            <th scope="row">3</th>
            <td>{{(Math.random() * 6).toFixed(3)}}</td>
            <td>{{(Math.random() * 6).toFixed(3)}}</td>
            <td>{{(Math.random() * 6).toFixed(3)}}</td>
        </tr>
        </tbody>
    </table>
</template>
<script>
    import {actions} from '../../assets/js/globalMixin'
    export default{
        mixins: [actions],
        computed: {
            currentExperiment(){
                return this.$store.state.lastExperiment || {}
            }
        },
        watch: {
            currentExperiment: {
                handler(n){
                    this.orderBySoloFormula(n)
                    console.log(n, 'exp changed')
                },
                deep: true
            }
        },
        created(){
            this.orderBySoloFormula(this.currentExperiment)
        }
    }
</script>