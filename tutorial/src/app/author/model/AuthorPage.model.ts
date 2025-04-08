import { Pageable } from "./Pageable.model";
import { Author } from "./Author.model";

export class AuthorPage {

    constructor(content:Author[], pageable:Pageable, totalElements:number){
        this.content = content;
        this.pageable = pageable;
        this.totalElements = totalElements;
    }
    content: Author[];
    pageable: Pageable;
    totalElements: number;
}