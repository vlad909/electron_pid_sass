<template>
  <p>fds</p>
</template>
<script>

    export default{
        data() {
            return {
                chartData: {
                    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                    series: [
                        [12, 9, 7, 8, 5],
                        [2, 1, 3.5, 7, 3],
                        [1, 3, 4, 5, 6]
                    ]
                },
                chartOptions: {
                    chartPadding: {
                        right: 40
                    },
                    fullWidth: true,
                    showLabel: true,
                    width: 800,
                    height: 350,
                }
            }
        }
    }
</script>
<style>
    .chart-card {
        background-color: rgb(55, 71, 79);
        width: 1000px;
        height: 350px;
        font-family: Lato, Helvetica-Neue, monospace;
    }
    .ct-series-a .ct-line{
        stroke: #00a79d;
    }
    .ct-series-b .ct-line{
        stroke: #1c75bc;
    }
    .ct-series-c .ct-line{
        stroke: #92278f;
    }
    .ct-series-a .ct-point {
        stroke: #00a79d;
    }
    .ct-series-b .ct-point {
        stroke: #1c75bc;
    }
    .ct-series-c .ct-point {
        stroke: #92278f;
    }
    .ct-label{
        color: white;
    }

</style>