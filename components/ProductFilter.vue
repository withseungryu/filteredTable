<template>
  <div class='filterNormal breadcrumb'>
    <img src="filter.png">
    <div class="insideFilter">
      <div class="list">
        <ul v-for="filter in filterList">
          <li>
            <div class="li1">
              <div>
                <span v-show="filter.fWhat === 'sale_price'">판매가:</span>
                <span v-show="filter.fWhat === 'base_price'">판매원가:</span>
                <span v-show="filter.fWhat === 'name'">이름:</span>
                <span v-show="filter.fWhat === 'created_at'">상품 등록일:</span></div>
              <div>
                <div v-if="filter.fWhat ==='created_at'">
                  <span class="sp" v-show="filter.fHow === '>'">다음 날짜부터</span>
                  <span class="sp" v-show="filter.fHow === '<'">다음 날짜까지</span>
                </div>
                <div v-else>
                  <span class="sp" v-show="filter.fHow === '>'">다음보다 큼</span>
                  <span class="sp" v-show="filter.fHow === '>='">다음과 같거나 다음보다 큼</span>
                  <span class="sp" v-show="filter.fHow === '<'">다음보다 작음</span>
                  <span class="sp" v-show="filter.fHow === '<='">다음과 같거나 다음보다 작음</span>
                  <span class="sp" v-show="filter.fHow === '=='">다음과 같음</span>
                  <span class="sp" v-show="filter.fHow === '!='">다음과 다름</span>
                </div>
              </div>
              <div><span>{{filter.fSo}}</span></div>
              <div>
                <button type="button" class="btn btn3" v-on:click="removeFilter(filter.numID)"><span
                  class="sp1">X</span>
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="sr1" v-show="flag === true">
        <div class="sr2">
          <div>
            <select class="select" required autofocus v-model="fWhat">
              <option value="sale_price" selected>판매가</option>
              <option value="base_price">판매원가</option>
              <option value="name">이름</option>
              <option value="created_at">상품 등록일</option>
            </select>
          </div>
          <!--    판매가에 관련한 SELET-->
          <div class="mb" v-if="fWhat === 'sale_price' ">
            <div>
              <select class="select" v-model="fHow">
                <option value=">" selected>다음보다 큼</option>
                <option value=">=">다음과 같거나 다음보다 큼</option>
                <option value="<">다음보다 작음</option>
                <option value="<=">다음과 같거나 다음보다 작음</option>
                <option value="==">다음과 같음</option>
                <option value="!=">다음과 다름</option>
              </select>
            </div>
            <div><input class="input1" type="text" v-model="fSo"></div>
          </div>

          <!--    판매원가에 관련한 SELET-->
          <div class="mb" v-else-if="fWhat=== 'base_price' ">
            <div>
              <select class="select" v-model="fHow">
                <option value=">" selected>다음보다 큼</option>
                <option value=">=">다음과 같거나 다음보다 큼</option>
                <option value="<">다음보다 작음</option>
                <option value="<=">다음과 같거나 다음보다 작음</option>
                <option value="=">다음과 같음</option>
                <option value="!=">다음과 다름</option>
              </select>
            </div>
            <div><input class="input1" type="text" v-model="fSo"></div>
          </div>

          <!--    이름에 관련한 SELET-->
          <div class="mb" v-else-if="fWhat === 'name'">
            <div><input class="input1" type="text" v-model="fSo"></div>
          </div>

          <!--    상품등록일에 관련한 SELET-->
          <div class="mb" v-else-if="fWhat === 'created_at'">
            <div>
              <select class="select" v-model="fHow">
                <option value=">" selected>다음 날짜부터</option>
                <option value="<">다음 날짜까지</option>
              </select>
            </div>
            <div><input class="input2" type="date" v-model="fSo"></div>
          </div>

          <button type="button" class="btn2 btn" v-on:click="addFilter()">
            <span class="sp2">확인</span>
            <span class="sp3">√</span>
          </button>
          <button type="button" class="btn3 btn" v-on:click="cancelFilter()"><span class="sp1">X</span></button>
        </div>
      </div>
      <button type="button" class="btn1 btn" v-on:click="flag = true"><span class="sp1">┼</span></button>
    </div>
  </div>
</template>

<script lang="ts">
  import {Watch, Vue, Component} from 'vue-property-decorator';
  import {Filter} from '~/store/filterStore';

  @Component
  export default class ProductFilter extends Vue {
    filterList: Filter[] = this.$store.state.filterStore.filterList;
    fWhat: string = '';
    fHow: string = '';
    fSo: any = '';
    flag: boolean = false;

    created() {
      this.$store.commit('filterStore/getLocalFilter');
    }

    initFilterList() {
      this.filterList = this.$store.state.filterStore.filterList;
    }

///Filter 추가
    addFilter() {
      this.$store.commit('filterStore/addFilter', {
        numID: (this.$store.state.filterStore.filterList.length + 1),
        fWhat: this.fWhat,
        fHow: this.fHow,
        fSo: this.fSo,
      })
      this.flag = false;
      this.fWhat = "";
      this.fHow = "";
      this.fSo = '';
    }

// Filter 제거
    removeFilter(numID: number) {
      this.$store.commit('filterStore/removeFilter', numID)
    }

//Filter 중간에 취소
    cancelFilter() {
      this.flag = false;
      this.fWhat = "";
      this.fHow = "";
      this.fSo = '';
    }

//Watch Part
    @Watch('$store.state.filterStore.filterList', {deep: true})
    filterUpdate() {
      this.initFilterList();
    }
  }
</script>

<style scoped>
</style>
