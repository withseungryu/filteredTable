import {Module, VuexModule, Mutation, Action} from 'vuex-module-decorators';
import AxiosService from '@/service/axios.service';
import {AxiosResponse} from "axios";
import {Filter} from "~/store/filterStore";


interface Product {
  numIdx: number;
  numItem: number;
  order: OrderDir[];
}

interface forSetItemList {
  lastPage: number;
  numItem: number;
  itemList: ItemList[];
  loader: string;
}

export interface OrderDir {
  title: string;
  direction: string;
}

export interface ItemList {
  name: string;
  base_price: number;
  sale_price: number;
  created_at: string;
}

interface ChartItems {
  basePriceList: number[];
  salePriceList: number[];
}


@Module
export default class TableStore extends VuexModule {
  itemList: ItemList[] = []
  numItem?: number;
  lastPage?: number;
  loader?: string;
  basePriceList: number[] = [];
  salePriceList: number[] = [];


  @Mutation
  setItemList(forSetItemList: forSetItemList) {
    this.itemList = forSetItemList.itemList;
    this.lastPage = forSetItemList.lastPage;
    this.numItem = forSetItemList.numItem;
    this.loader = forSetItemList.loader;
  }

  @Mutation
  setChartList(chartItems: ChartItems) {
    this.basePriceList = chartItems.basePriceList;
    this.salePriceList = chartItems.salePriceList;
  }

//Axios로 API에 옵션, 쿼리 넣어 가져오는 비동기 처리 Action
  @Action({rawError: true})
  async initData(product: Product) {
    const numIdx: number = product.numIdx;
    const numItem: number = product.numItem;
    const order: OrderDir[] = product.order;
    const filterList: Filter[] = this.context.rootState.filterStore.filterList;
    let loader: string = 'yet';
    let total: string = '';

    //numIdx Part
    if (numIdx) {
      const page: string = 'page=' + numIdx;
      total = total + page;
    }

    //numItem Part
    if (numItem) {
      const per_page: string = '&per_page=' + numItem;
      total = total + per_page;
    }

    //orderColumn Part
    if (order.length > 0) {
      if (order.length == 2) {
        const orders: string = '&orders[0][column]=' + order[0].title + '&orders[0][direction]=' + order[0].direction
          + '&orders[1][column]=' + order[1].title + '&orders[1][direction]=' + order[1].direction;
        total = total + orders;
      } else {
        const orders: string = '&orders[0][column]=' + order[0].title + '&orders[0][direction]=' + order[0].direction;
        total = total + orders;
      }
    }

    //Query Part
    let query: string = '&query=';
    if (filterList.length === 0) {
    } else {
      for (let i = 0; i < filterList.length; ++i) {
        if (filterList[i].fWhat === 'name') {
          query = query + filterList[i].fWhat + ' ct "' + filterList[i].fSo + '"';
        } else if (filterList[i].fWhat === 'created_at') {
          query = query + filterList[i].fWhat + filterList[i].fHow + '"' + filterList[i].fSo + '"';
        } else {
          query = query + filterList[i].fWhat + filterList[i].fHow + filterList[i].fSo;
        }
        if (i === filterList.length - 1) {
        } else {
          query = query + ' and '
        }
      }
      total = total + query;
    }

    const response: AxiosResponse = await AxiosService.instance.get('api/products?' + total).catch()
      .finally(() => (loader = "success"));
    this.context.commit('setItemList', {
      lastPage: response.data.last_page,
      numItem: numItem,
      itemList: response.data.data,
      loader: loader,
    });


  }

  //Axios로 API에 옵션, 쿼리 넣어 차트 분석을 위한 데이터를 가져 오는 비동기 처리 Action
  @Action
  async analysisChart(lastPage: number) {

    const basePriceList: number[] = [];
    const salePriceList: number[] = [];
    const pageIdx: number = lastPage;
    const numItem: number | undefined = this.numItem;
    const filterList: Filter[] = this.context.rootState.filterStore.filterList;

    let total = '';
    if (numItem) {
      const per_page: string = '&per_page=' + numItem;
      total = total + per_page;
    }
    //Query Part
    let query: string = '&query=';
    if (filterList.length === 0) {
      query = '';
    } else {

      for (let i = 0; i < filterList.length; ++i) {
        if (filterList[i].fWhat === 'name') {
          query = query + filterList[i].fWhat + ' ct "' + filterList[i].fSo + '"';
        } else if (filterList[i].fWhat === 'created_at') {
          query = query + filterList[i].fWhat + filterList[i].fHow + '"' + filterList[i].fSo + '"';
        } else {
          query = query + filterList[i].fWhat + filterList[i].fHow + filterList[i].fSo;
        }
        if (i === filterList.length - 1) {
        } else {
          query = query + ' and '
        }
      }
      total = total + query;

    }

    for (let i = 1; i <= pageIdx; ++i) {
      const page: string = 'page=' + i;
      const response: AxiosResponse = await AxiosService.instance.get('api/products?' + page + total);

      for (let i = 0; i < response.data.data.length; ++i) {
        basePriceList.push(response.data.data[i].base_price);
        salePriceList.push(response.data.data[i].sale_price);
      }

    }
    this.context.commit('setChartList', {
      basePriceList: basePriceList,
      salePriceList: salePriceList
    });
  }
}
