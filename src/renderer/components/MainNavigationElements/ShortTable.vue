<template>
    <div class="d-inline-flex align-items-start general-ul-container">
        <ul class="like-table-n m-0">
            <li>n</li>
            <li v-for="(i, index) in x_array">{{index}}</li>
        </ul>
        <ul class="like-table m-0">
            <li>x(nT)</li>
            <li v-for="x in x_array">{{x.toFixed(5)}}</li>
        </ul>
        <ul class="like-table m-0">
            <li>U(nT)</li>
            <li v-for="u in u_array">{{u.toFixed(5)}}</li>
        </ul>
        <ul class="like-table m-0">
            <li>dx(nT)</li>
            <li v-for="dx in dx_array">{{dx.toFixed(5)}}</li>
        </ul>

    </div>
</template>
<script>
    import {actions} from '../../assets/js/globalMixin'
    import {mapGetters} from 'vuex';

    export default {
        mixins: [actions],
        computed: {
            currentExperiment() {
                return this.$store.state.lastExperiment || {}
            },
            ...mapGetters({
                x_array: 'getX',
                u_array: 'getU',
                dx_array: 'getDX',
            })
        },
        watch: {
            currentExperiment: {
                handler(n) {
                    console.log(n, 'new w')
                    if (!this.somethingIsVoid(n)) { //если один из аргументов пуст, то не вызывать
                        this.orderBySoloFormula(n) //action = change by default
                    }
                },
                deep: true
            }
        },
        created() {
            /*TODO  контроль xaxis
             */
            this.orderBySoloFormula(this.currentExperiment, 'add')
        }
    }
</script>