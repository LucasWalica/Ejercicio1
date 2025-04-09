import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Loan } from './models/Loan.model';
import { LoanPage } from './models/LoanPage.model';
import { Pageable } from './models/Pageable.model';
@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private http:HttpClient) { }

  private baseUrl = "http://localhost:8080/loan";


  getLoanPages(pageable:Pageable){
    return this.http.post<LoanPage>(this.baseUrl, {pageable:pageable})
  }
  getLoans(clientID?:number, gameID?:number, startDate?:Date, endDate?:Date){
    return this.http.get<Loan[]>(this.composeFindUrl(clientID, gameID, startDate, endDate))
  }
  saveLoan(loan:Loan):Observable<void>{
    const {id} = loan;
    const url = id ? `${this.baseUrl}/${id}` : this.baseUrl;

    return this.http.put<void>(url, loan);
  }


  deleteLoan(loan:Loan):Observable<void>{
    const {id} = loan;
    const url = `${this.baseUrl}/${id}`
    return this.http.delete<void>(url);
  }

  private composeFindUrl(clientID?:number, gameID?:number, startDate?:Date, endDate?:Date):string{
    const params = new URLSearchParams();
    if(gameID){
      params.set('game_id', gameID.toString())
    }
    if(clientID){
      params.set('client_id', clientID.toString())
    }
    if(startDate){
      params.set('start_data', startDate.toDateString())
    }
    if(endDate){
      params.set('end_date', endDate.toDateString())
    }

    const queryString = params.toString();
    return queryString ? `${this.baseUrl}?${queryString}` : this.baseUrl;
  }
}
