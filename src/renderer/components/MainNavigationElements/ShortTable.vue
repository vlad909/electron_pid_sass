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
            <li>x(nT)</li>
            <li v-for="u in u_array">{{u.toFixed(5)}}</li>
        </ul>
        <ul class="like-table m-0">
            <li>x(nT)</li>
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
                    if (!this.somethingIsVoid(n)) { //если один из аргументов пуст, то не вызывать
                        this.orderBySoloFormula(n) //action = change by default
                    }
                },
                deep: true
            }
        },
        created() {
            /*TODO график не отстраивается, если количество точек больше, чем задано в x-axis - это нужно контролировать
        добавление графика и удаление, вывод списка
             */
            this.orderBySoloFormula(this.currentExperiment, 'add')
        }
    }
</script>
<style scoped>
    .like-table li, .like-table-n li {
        list-style: none !important;
        /* float:left; */
        /*padding: 5px 10px;*/
        width: auto;
        border: 1px solid #eee;
    }

    .like-table {
        width: 120px;
    }

    .like-table-n {
        width: 50px;
    }

    .like-table-n, .like-table {
        padding: 0;
    }

    .general-ul-container {
        height: 420px;
        overflow-y: scroll;
    }
</style>