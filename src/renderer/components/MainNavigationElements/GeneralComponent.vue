<template>
    <div>
        <modifiedHeader></modifiedHeader>
        <div class="d-flex flex-row">
            <Graphs style="width: 70%"></Graphs>
            <shortTable style="width: 30%"></shortTable>
        </div>
    </div>
</template>
<script>
    import modifiedHeader from './ModifiedHeader.vue'
    import Graphs from './ChartsComponent.vue'
    import shortTable from './ShortTable.vue'
    export default{
        components: {modifiedHeader, Graphs, shortTable}
    }
</script>