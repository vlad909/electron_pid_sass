<template>
    <div class="d-inline-flex align-items-start general-ul-container">
        <ul class="like-table-n m-0">
            <li>n</li>
            <li v-for="(i, index) in x_array">{{index}}</li>
        </ul>
        <ul class="like-table m-0">
            <li>x(nT)</li>
            <li :title="key_x + ': '+ x"
                v-for="(x, key_x) in x_array"
                :key="key_x">{{x.toFixed(4)}}
            </li>
        </ul>
        <ul class="like-table m-0">
            <li>U(nT)</li>
            <li :title="key_u + ': ' + u"
                v-for="(u, key_u) in u_array"
                :kex="key_u">{{u.toFixed(4)}}
            </li>
        </ul>
        <ul class="like-table m-0">
            <li>dx(nT)</li>
            <li :title="key_dx + ': ' + dx"
                v-for="(dx, key_dx) in dx_array"
                :key="key_dx">{{dx.toFixed(4)}}
            </li>
        </ul>

    </div>
</template>
<script>
    import {actions} from '../../assets/js/globalMixin'
    import {mapGetters} from 'vuex';
    import {cloneDeep} from 'lodash'

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
                    let copy = cloneDeep(n, true)
                    delete copy.selected_formula
                    if (!this.somethingIsVoidSpecialForOnlyNumberValues(copy) && copy.T > 0) { //если один из аргументов пуст, то не вызывать
                        this.orderBySoloFormula(n) //action = change by default
                    }
                },
                deep: true
            }
        },
        created() {
            this.orderBySoloFormula(this.currentExperiment, 'add')
        }
    }
</script>