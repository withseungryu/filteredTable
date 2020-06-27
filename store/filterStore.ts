import {Module, VuexModule, Mutation} from 'vuex-module-decorators';

export interface Filter {
  numID: number;
  fWhat: string;
  fHow: string;
  fSo: any;
}

@Module({name: 'filterStore'})
export default class FilterStore extends VuexModule {

  filterList: Filter[] = [];

  @Mutation
  getLocalFilter() {
    if (process.browser) {
      if (localStorage.getItem('filterList')) {
        //@ts-ignore
        this.filterList = JSON.parse(localStorage.getItem('filterList'));
      }
    }
  }

//ADD
  @Mutation
  addFilter(filter: Filter) {
    this.filterList.push(filter);
    localStorage.setItem('filterList', JSON.stringify(this.filterList));

  }

//Remove
  @Mutation
  removeFilter(numID: number) {
    if (process.browser) {
      const idx = this.filterList.findIndex(function (item) {
        return item.numID === numID
      })
      this.filterList.splice(idx, 1);
      localStorage.setItem('filterList', JSON.stringify(this.filterList));
    }
  }

}

