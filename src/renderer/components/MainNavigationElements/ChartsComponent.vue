<template>
    <div v-on:dblclick="resetZoom" class="small">
        <!--<button @click="addd">b;a</button>-->
        <apexcharts :width="1000" :height="400" type="line" :options="chartOptions" :series="series"></apexcharts>
        <!--<LineChart v-if="showChart" :chart-data="datacollection" :options="options" ref="myLine"></LineChart>-->
    </div>
</template>
<script>
    //    import LineChart from '../../assets/js/LineChart.js'
    import VueApexCharts from 'vue-apexcharts'
    import {EventBus} from '../../assets/js/EventBus.js'
    export default{
        components: {apexcharts: VueApexCharts},
        data(){
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
                        categories: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
                            36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
                            71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99]
                    }
                },
            }
        },
        methods: {
//            getRandomInt () {
//                return Math.floor(Math.random() * (50 - 5 + 1)) + 5
//            },
//            addd(){
//                this.$router.push({
//                    name: 'chartist'
//                })
//            },
//            resetZoom(){
//                this.showChart = !this.showChart
//                setTimeout(() => {
//                    this.showChart = true
//                }, 1)
//            }
        },
        created(){
            EventBus.$on('addLine', (name, data) => {
                this.series.push({name: name, data: data})
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