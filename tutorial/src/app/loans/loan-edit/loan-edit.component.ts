import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoanService } from '../loan.service';
import { Loan } from '../models/Loan.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Client } from '../../clients/model/client.model';
import { Game } from '../../game/models/Game.model';
import { ClientService } from '../../clients/client.service';
import { GameService } from '../../game/game.service';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-loan-edit',
  providers: [provideNativeDateAdapter()],
  imports: [
    FormsModule,
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatSelectModule, 
    MatDatepickerModule, 
  ],
  templateUrl: './loan-edit.component.html',
  styleUrl: './loan-edit.component.css'
})
export class LoanEditComponent implements OnInit{
  
  loan:Loan = {} as Loan;
  clients:Client[] = [] as Client[];
  games:Game[] = [] as Game[];
  maxDays = 14;
  diffDays = 0
  
  constructor(
    public dialogRef: MatDialogRef<LoanEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private loanService:LoanService,
    private clientService:ClientService,
    private gameService:GameService
  ) { }
  
  ngOnInit(): void {
    this.loan = this.data.loan 
      ? Object.assign({}, this.data.loan) 
      : new Loan(
        this.data.loan?.id, 
        this.data.loan?.client, 
        this.data.loan?.game, 
        this.data.loan?.startDate, 
        this.data.loan?.endDate
      )

      // fetching clients
      this.clientService.getClients().subscribe((clients) => {
        this.clients = clients;
      
        if(this.loan.client != null){
            const clientFilter: Client[] = clients.filter(
              (client) => client.id == this.data.loan.client.id
            );
            if(clientFilter != null){
              this.loan.client = clientFilter[0];
            }
          }
      });

      // fetching games 
      this.gameService.getGames().subscribe((games) => {
         this.games = games;

         if(this.loan.game != null){
            const gameFilter: Game[] = games.filter(
              (game) => game.id == this.data.loan.game.id
            );
            if(gameFilter != null){
              this.loan.game = gameFilter[0];
            }
         }
      })
  }

  onSave(){
      const startDate = new Date(this.loan.startDate);
      const endDate = new Date(this.loan.endDate);
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      this.diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (this.diffDays > this.maxDays) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Los prestamos tienen un máximo de 14 días!",
        });
        return;
      }

    this.loanService.saveLoan(this.loan).subscribe((result) => {
      this.dialogRef.close();
    })
  }


  onClose(){
    this.dialogRef.close();
  }
}
