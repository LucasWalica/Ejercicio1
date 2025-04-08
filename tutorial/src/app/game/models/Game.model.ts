import { Author } from "../../author/model/Author.model";
import { Category } from "../../category/model/Category";

export class Game {
    constructor(id:number, title:string, age:number, category:Category, author:Author){
        this.id = id;
        this.title = title; 
        this.age = age; 
        this.category = category; 
        this.author = author;
    }
    id: number;
    title: string;
    age: number;
    category: Category;
    author: Author;
}