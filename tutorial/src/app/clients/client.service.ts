import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Client } from './model/client.model';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http:HttpClient) { }

  private baseUrl  = "http://localhost:8080/clients"

  getClients(): Observable<Client[]>{
    console.log("recogiendo clientes");
    return this.http.get<Client[]>(this.baseUrl);
  }


  saveClient(client:Client):Observable<Client>{
    const {id} = client;
    const url = id ? `${this.baseUrl}/${id}` : this.baseUrl;
    return this.http.put<Client>(url, client);
  }


  deleteClient(idCliente:number):Observable<any>{
    return this.http.delete(`${this.baseUrl}/${idCliente}`)
  }

}
