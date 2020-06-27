<template>
  <div class="fullWrap">
    <button type="button" class="btn chartBtn" v-on:click="chartUpdate()"><img class="chartImg" src="chart2.png"/>
    </button>
    <button v-show="chartShowFlag === true" type="button" class="btn" v-on:click="removeChart()"><img src="uparrow.png"
                                                                                                      alt=""></button>
    <div class="loader" v-show="loader === true">
      <span>필터에 맞춰 차트를 생성 중입니다</span>
      <span
        v-for="(t, index) in '. . .'"
        :key="index"
        class="item"
        :style="{animationDelay: index*100+'ms'}"
        v-text="t"/>
    </div>
    <div class="normal" v-show="chartShowFlag === true">
      <div>
        <pie-chart :data="basePriceChartData" :options="basePriceOption"/>
      </div>
      <div>
        <pie-chart :data="salePriceChartData" :options="salePriceOption"/>
      </div>

    </div>

  </div>
</template>

<script lang="ts">
  import {Component, Vue, Watch} from "vue-property-decorator";
  import 'tui-chart/dist/tui-chart.css'
  //@ts-ignore
  import {pieChart} from '@toast-ui/vue-chart'


  interface ChartData {
    series: Series[];
  }

  interface Series {
    name: string;
    data: number;
  }

  interface Options {
    chart: Chart;
    series: OptionSeries;
  }

  interface Chart {
    width: number;
    height: number;
    title: string;
  }

  interface OptionSeries {
    showLegend: boolean;
    showLabel: boolean;
    labelAlign: string;
  }

  @Component({
    components: {
      'pie-chart': pieChart
    }
  })
  export default class ProductChart extends Vue {
    basePriceData: number[] = [];
    salePriceData: number[] = [];

    filteredBasePrice: number[] = [0, 0, 0, 0, 0, 0];
    filteredSalePrice: number[] = [0, 0, 0, 0, 0, 0];
    basePriceSeries: Series[] = []
    salePriceSeries: Series[] = []

    basePriceChartData: ChartData = {series: this.basePriceSeries};
    salePriceChartData: ChartData = {series: this.salePriceSeries};

    basePriceChart: Chart = {width: 700, height: 500, title: '판매 원가 기준 아이템 분포도'};
    salePriceChart: Chart = {width: 700, height: 500, title: '판매가 기준 아이템 분포도'};

    priceLegend: OptionSeries = {showLegend: false, showLabel: true, labelAlign: 'center',}

    basePriceOption: Options = {chart: this.basePriceChart, series: this.priceLegend};
    salePriceOption: Options = {chart: this.salePriceChart, series: this.priceLegend};

    chartShowFlag: boolean = false;
    loader: boolean = false;


    makeChart() {
      for (let i = 0; i < (this.basePriceData.length); ++i) {
        if (this.basePriceData[i] >= 0 && this.basePriceData[i] < 10000) {
          this.filteredBasePrice[0] = this.filteredBasePrice[0] + 1;
        } else if (this.basePriceData[i] >= 10000 && this.basePriceData[i] < 20000) {
          this.filteredBasePrice[1] = this.filteredBasePrice[1] + 1;
        } else if (this.basePriceData[i] >= 20000 && this.basePriceData[i] < 30000) {
          this.filteredBasePrice[2] = this.filteredBasePrice[2] + 1;
        } else if (this.basePriceData[i] >= 30000 && this.basePriceData[i] < 40000) {
          this.filteredBasePrice[3] = this.filteredBasePrice[3] + 1;
        } else if (this.basePriceData[i] >= 40000 && this.basePriceData[i] < 50000) {
          this.filteredBasePrice[4] = this.filteredBasePrice[4] + 1;
        } else {
          this.filteredBasePrice[5] = this.filteredBasePrice[5] + 1;
        }
      }

      for (let i = 0; i < (this.salePriceData.length); ++i) {
        if (this.salePriceData[i] >= 0 && this.salePriceData[i] < 10000) {
          this.filteredSalePrice[0] = this.filteredSalePrice[0] + 1;
        } else if (this.salePriceData[i] >= 10000 && this.salePriceData[i] < 20000) {
          this.filteredSalePrice[1] = this.filteredSalePrice[1] + 1;
        } else if (this.salePriceData[i] >= 20000 && this.salePriceData[i] < 30000) {
          this.filteredSalePrice[2] = this.filteredSalePrice[2] + 1;
        } else if (this.salePriceData[i] >= 30000 && this.salePriceData[i] < 40000) {
          this.filteredSalePrice[3] = this.filteredSalePrice[3] + 1;
        } else if (this.salePriceData[i] >= 40000 && this.salePriceData[i] < 50000) {
          this.filteredSalePrice[4] = this.filteredSalePrice[4] + 1;
        } else {
          this.filteredSalePrice[5] = this.filteredSalePrice[5] + 1;
        }
      }

      this.basePriceSeries = [
        {
          name: '10000원이하',
          data: this.filteredBasePrice[0],
        },
        {
          name: '10000원이상 20000원미만',
          data: this.filteredBasePrice[1],
        },
        {
          name: '20000원이상 30000원미만',
          data: this.filteredBasePrice[2]
        },
        {
          name: '30000원이상 40000원미만',
          data: this.filteredBasePrice[3]
        },
        {
          name: '40000원이상 50000원미만',
          data: this.filteredBasePrice[4]
        },
        {
          name: '50000원이상',
          data: this.filteredBasePrice[5]
        }]

      this.salePriceSeries = [
        {
          name: '10000원이하',
          data: this.filteredSalePrice[0],
        },
        {
          name: '10000원이상 20000원미만',
          data: this.filteredSalePrice[1],
        },
        {
          name: '20000원이상 30000원미만',
          data: this.filteredSalePrice[2]
        },
        {
          name: '30000원이상 40000원미만',
          data: this.filteredSalePrice[3]
        },
        {
          name: '40000원이상 50000원미만',
          data: this.filteredSalePrice[4]
        },
        {
          name: '100000원 이상',
          data: this.filteredSalePrice[5]
        }]


      this.basePriceChartData = {series: this.basePriceSeries}
      this.salePriceChartData = {series: this.salePriceSeries}
      this.loader = false;
      this.chartShowFlag = true;
    }

    chartUpdate() {
      this.loader = true;
      this.filteredBasePrice = [0, 0, 0, 0, 0, 0];
      this.filteredSalePrice = [0, 0, 0, 0, 0, 0];
      if (this.$store.state.tableStore.itemList.length != 0)
        this.$store.dispatch('tableStore/analysisChart', this.$store.state.tableStore.lastPage);
      else {
        this.loader = false;
        alert('아이템이 무조건 있어야합니다....');
      }
    }

    removeChart() {
      this.chartShowFlag = false;
    }

    @Watch('$store.state.tableStore.basePriceList', {immediate: true, deep: true})
    initBasePriceChart(newValue: number[]) {
      this.basePriceData = this.$store.state.tableStore.basePriceList;
      this.salePriceData = this.$store.state.tableStore.salePriceList;
      this.makeChart();
    }

    @Watch('$store.state.filterStore.filterList', {immediate: true, deep: true})
    noDisplayChart() {
      this.chartShowFlag = false;
    }
  }

</script>

<style scoped>
  .fullWrap{
    color: #F16B89;
    font-family: HY그래픽M;
  }
  .normal {
    display: flex;
    flex-direction: row;
    justify-content: center;
    text-align: center;
  }

  .chartBtn {
    width: 100px;
    margin-left: 10px;
    background-color: #F16B89;
    color: white;
  }

  .chartImg {
    width: 30px;
    height: 30px;
  }

  @media screen and (min-width: 0px) and (max-width: 640px) {
    .normal {
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
    }

    .chartBtn {
      width: 50px;
      margin-left: 10px;
      background-color: #F16B89;
      color: white;
    }

    .chartImg {
      width: 20px;
      height: 20px;
    }
  }
</style>
