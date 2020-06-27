<template>
  <div class="product_normal">
    <!-- Default panel contents -->
    <div class="header">
      <!--    NumIdx Part-->
      <div>
        <button type="button" class="btn" v-on:click="minusNumIdx()"><</button>
        <span v-show="idxFlag === true"><input class="ip1" type="text" v-model="numIdx">
          <button type="button" class="btn" v-on:click="changeIndexFlag()"><img class="img1" src="pencil.png"></button>
        </span>
        <button v-show="idxFlag===false" type="button" class='btn' v-on:click="changeIndexFlag()">
          <span>{{numIdx}}</span></button>
        <button type="button" class="btn" v-on:click="plusNumIdx()">></button>
      </div>

      <!--    NumItem Part-->
      <div>현재 페이지 아이템 수 :
        <span v-show="numItemFlag === true">
          <input v-show="numItemFlag === true" class="ip1" type="text" v-model="numItem">
        </span>
        <span v-show="numItemFlag == false">{{numItem}}</span>
        <button type="button" class="btn" v-on:click="runNumItem()"><img class="img1" src="pencil.png"></button>
      </div>

    </div>
    <!-- Table -->

    <div class="tbWrap">
      <div class="tbBox">
        <table class="table tb">
          <thead>
          <tr>
            <th>
              <div class="tr0">
                <div>
                <span>
                  <input class="checkbox" type="checkbox">
                </span>
                </div>
              </div>
            </th>
            <th>
              <div class="th">
                <div>
                  <button type="button" class="btn pen" v-on:click="changeDirection(0)">상품명</button>
                </div>
                <div v-show="orderFlag[0][0] === 'true'">
                  <span v-if="orderDirection[0][1] === 'asc'">▲</span>
                  <span v-else-if="orderDirection[0][1] === 'desc'">▼</span>
                  <button type="button" class="btn" v-on:click="removeOrder(0)">X</button>
                </div>
              </div>
            </th>
            <th>
              <div class="th">
                <div>
                  <button type="button" class="btn pen" v-on:click="changeDirection(1)">원가</button>
                </div>
                <div v-show="orderFlag[1][0] === 'true'">
                  <span v-if="orderDirection[1][1] === 'asc'">▲</span>
                  <span v-else-if="orderDirection[1][1] === 'desc'">▼</span>
                  <button type="button" class="btn" v-on:click="removeOrder(1)">X</button>
                </div>
              </div>
            </th>
            <th>
              <div class="th">
                <div>
                  <button type="button" class="btn pen" v-on:click="changeDirection(2) ">세일가</button>
                </div>
                <div v-show="orderFlag[2][0] === 'true'">
                  <span v-if="orderDirection[2][1] === 'asc'">▲</span>
                  <span v-else-if="orderDirection[2][1] === 'desc'">▼</span>
                  <button type="button" class="btn" v-on:click="removeOrder(2)">X</button>
                </div>
              </div>
            </th>
            <th>
              <div class="th">
                <div>
                  <button type="button" class="btn pen" v-on:click="changeDirection(3) ">생성일</button>
                </div>
                <div v-show="orderFlag[3][0] === 'true'">
                  <span v-if="orderDirection[3][1] === 'asc'">▲</span>
                  <span v-else-if="orderDirection[3][1] === 'desc'">▼</span>
                  <button type="button" class="btn" v-on:click="removeOrder(3)">X</button>
                </div>
              </div>
            </th>
          </tr>
          </thead>
          <tbody v-show="loader === 'success'">
          <tr v-for="item in itemList">
            <td class="t0">
                <span>
                  <input class="checkbox" type="checkbox">
                </span>
            </td>
            <td class="t1">{{item.name}}</td>
            <td class="t2">{{item.base_price}}</td>
            <td class="t3">{{item.sale_price}}</td>
            <td class="t4">{{item.created_at}}</td>
          </tr>
          </tbody>
        </table>
        <div class="loader" v-show="loader === 'yet'">
          <span>로딩중</span>
          <span
            v-for="(t, index) in '. . .'"
            :key="index"
            class="item"
            :style="{animationDelay: index*100+'ms'}"
            v-text="t"/>
        </div>
      </div>

    </div>

  </div>

</template>

<script lang="ts">
  import {Vue, Component, Watch} from 'vue-property-decorator';
  import {ItemList, OrderDir} from "~/store/tableStore";

  @Component
  export default class ProductTable extends Vue {

    itemList: ItemList[] = [];
    numIdx: number = 0;
    idxFlag: boolean = false;
    numItem: number = 10;
    numItemFlag: boolean = false;
    loader: string = 'yet';
    order: OrderDir[] = [];
    orderDirection: any[] = [["name", ""], ["base_price", ""], ["sale_price", ""], ["created_at", ""]];
    orderFlag: any[] = [["false"], ["false"], ["false"], ["false"]];
    orderCnt: number = 0;

    //numIdx Part
    //인덱스 1씩 증가 메소드
    plusNumIdx() {
      if (this.numIdx < this.$store.state.tableStore.lastPage) {
        this.numIdx = Number(this.numIdx) + Number(1);
      } else {
        alert('마지막 페이지입니다.');
      }
    }

    //인덱스 1씩 감소 메소드
    minusNumIdx() {
      if (this.numIdx > 1)
        this.numIdx = Number(this.numIdx) - Number(1);
      else {
        alert('첫 페이지입니다.');
      }
    }

    //인덱스 수정 input 나오게 하기 위한 메소드
    changeIndexFlag() {
      if (this.idxFlag) this.idxFlag = false;
      else this.idxFlag = true;
    }

    //itemList 초기화
    initItemList() {
      this.loader = this.$store.state.tableStore.loader;
      this.itemList = this.$store.state.tableStore.itemList;
    }

    //NumItem기능 시작
    runNumItem() {
      if (this.numItemFlag) {
        this.numIdx = 1;
        this.numItemFlag = false;
      } else this.numItemFlag = true;

      if (this.numItemFlag === false) {
        this.loader = 'yet';
        this.$store.dispatch('tableStore/initData', {
          numIdx: this.numIdx,
          numItem: this.numItem,
          order: this.order,
          filterList: this.$store.state.filterStore.filterList
        });
      }
    }

    //Order Part
    changeDirection(idx: number) {
      if (this.orderCnt < 2 || this.orderFlag[idx] == 'true') {

        if (this.orderDirection[idx][1] === '') {
          this.orderDirection[idx][1] = 'asc';
        } else if (this.orderDirection[idx][1] === 'asc') {
          this.orderDirection[idx][1] = 'desc';
        } else {
          this.orderDirection[idx][1] = 'asc';
        }
        const forFindIdx: string = this.orderDirection[idx][0];
        if (this.orderFlag[idx][0] === 'false') {
          this.orderCnt = this.orderCnt + 1;
          this.order.push({title: this.orderDirection[idx][0], direction: this.orderDirection[idx][1]});
          this.orderFlag[idx][0] = 'true';
        } else {
          this.order[this.order.findIndex(function (item) {
            return item.title === forFindIdx
          })].direction = this.orderDirection[idx][1];
        }

      }

    }

    removeOrder(idx: number) {
      const forFindIdx: string = this.orderDirection[idx][0];
      const findIdx = this.order.findIndex(function (item) {
        return item.title === forFindIdx
      });
      this.order.splice(findIdx, 1);
      this.orderCnt = this.orderCnt - 1;
      if (this.orderCnt < 0) {
        this.orderCnt = 0;
      }
      this.orderFlag[idx][0] = 'false';
      this.orderDirection[idx][1] = '';
    }

    ///Watch Part
    @Watch('numIdx', {immediate: true, deep: true})
    numIdxUpdate(newValue: number) {
      this.loader = 'yet';
      this.$store.dispatch('tableStore/initData', {
        numIdx: newValue,
        numItem: this.numItem,
        order: this.order,
      });
    }

    @Watch('order', {immediate: true, deep: true})
    orderUpdate(newValue: OrderDir[]) {
      this.numIdx = 1;
      this.loader = 'yet';
      this.$store.dispatch('tableStore/initData', {
        numIdx: this.numIdx,
        numItem: this.numItem,
        order: newValue,
      });
    }

    @Watch('$store.state.filterStore.filterList', {deep: true})
    filterUpdate() {
      this.numIdx = 1;
      this.loader = 'yet';
      this.$store.dispatch('tableStore/initData', {
        numIdx: this.numIdx,
        numItem: this.numItem,
        order: this.order,
      });
    }

    @Watch('$store.state.tableStore.itemList', {deep: true})
    itemListUpdate() {
      this.initItemList();
    }

  }

</script>

<style scoped>

</style>
