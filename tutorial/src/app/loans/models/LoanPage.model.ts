import { Pageable } from "./Pageable.model";
import { Loan } from "./Loan.model";

export class LoanPage {

    constructor(content:Loan[], pageable:Pageable, totalElements:number){
        this.content = content;
        this.pageable = pageable;
        this.totalElements = totalElements;
    }
    content: Loan[];
    pageable: Pageable;
    totalElements: number;
}