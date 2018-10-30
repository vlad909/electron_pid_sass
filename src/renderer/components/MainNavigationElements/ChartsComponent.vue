<template>
    <div class="small">
        <!--<button @click="fakeX">b;a</button>-->
        <apexcharts :width="1000" :height="400" type="line" :options="chartOptions" :series="series"></apexcharts>
        <!--<LineChart v-if="showChart" :chart-data="datacollection" :options="options" ref="myLine"></LineChart>-->
    </div>
</template>
<script>
    //    import LineChart from '../../assets/js/LineChart.js'
    import VueApexCharts from 'vue-apexcharts'
    import {EventBus} from '../../assets/js/EventBus.js'
    import {mapGetters} from 'vuex';

    export default {
        components: {apexcharts: VueApexCharts},
        data() {
            return {
                series: [
//                    {
//                    name: 'series-1',
//                    data: [30, 40, 45, 50, 49, 60, 70, 91]
//                }
                ],
                chartOptions: {
                    markers: {
                        size: 0
                    },
                    chart: {
                        id: 'vuechart-example',
                        toolbar: {show: true},

                        zoom: {
                            enabled: true,
                            type: 'x',
                        }
                    },
                    xaxis: { //можно и не указывать
                        type: 'numeric',
                        //almost for one()
                        categories: [...Array(100).keys()]
                    }
                },
            }
        },
        computed: {
            ...mapGetters({
                xaxis_new: 'getMaxCountInListOfExperiment'
            })
        },
        watch: {
            xaxis_new(n) {
                this.$apexcharts.exec('vuechart-example', 'updateOptions', {
                    xaxis: {
                        categories: [...Array(n).keys()],
                        type: 'numeric'
                    }
                })
            }
        },
        methods: {
            // fakeX() {
            //     this.$apexcharts.exec('vuechart-example', 'updateOptions', {
            //         xaxis: {
            //             categories: [...Array(1001).keys()],
            //             type: 'numeric'
            //         }
            //     })
            // }
        },
        created() {
            EventBus.$on('addLine', (name, data) => {
                this.series.push({name: name, data: data})
            })
            EventBus.$on('deleteLine', (name) => {
                let index = this.series.findIndex(e => e.name === name)
                this.series.splice(index, 1)
            })
            EventBus.$on('changeLineByName', (name, new_data) => {
                let index = this.series.findIndex(e => e.name === name)
                if (index !== -1) {
                    this.series[index].data = new_data
                } else {
                    alert(`This experiment doesn't exist`)
                }
            })
        }
    }
</script>
<style>
    .small {
        max-width: 1200px;
        margin: 10px;
        height: 150px;
    }
</style>