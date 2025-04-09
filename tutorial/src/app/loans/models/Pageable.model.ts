import { SortPage } from './SortPage.model';

export class Pageable {
    constructor(pageNumber:number, pageSize:number, sort:SortPage[]){
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.sort = sort;
    }
    pageNumber: number;
    pageSize: number;
    sort: SortPage[];
}