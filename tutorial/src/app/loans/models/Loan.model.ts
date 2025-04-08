import { Game } from "../../game/models/Game.model";
import { Client } from "../../clients/model/client.model";

export class Loan{
    
    id:number;
    client:Client;
    game:Game;
    startDate:Date;
    endDate:Date;

    constructor(id:number, client:Client, game:Game, startDate:Date, endDate:Date){
        this.id = id;
        this.client = client;
        this.game = game;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}