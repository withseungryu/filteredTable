<template>
  <div>
    <productFilter></productFilter>
    <productChart></productChart>
    <productTable></productTable>
  </div>
</template>

<script lang='ts'>
  import {Vue, Component} from 'vue-property-decorator';
  import productTable from '~/components/ProductTable.vue';
  import productFilter from '~/components/ProductFilter.vue'
  import productChart from '~/components/ProductChart.vue';

  @Component({
    components: {
      productTable,
      productFilter,
      productChart,
    }

  })
  export default class showTable extends Vue {
  }

</script>

<style scoped>
  html, body {
    height: 100%;
    width: 100%;
  }

</style>
