import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoanEditComponent } from '../loan-edit/loan-edit.component';
import { LoanService } from '../loan.service';
import { Loan } from '../models/Loan.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Client } from '../../clients/model/client.model';
import { Game } from '../../game/models/Game.model';
import { GameService } from '../../game/game.service';
import { ClientService } from '../../clients/client.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import { DialogConfirmationComponent } from '../../core/dialog-confirmation/dialog-confirmation.component';
import { Pageable } from '../models/Pageable.model';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-loan-list',
  providers: [provideNativeDateAdapter()],
  imports: [
     MatButtonModule,
        MatIconModule,
        MatTableModule,
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatPaginatorModule
  ],
  templateUrl: './loan-list.component.html',
  styleUrl: './loan-list.component.css'
})
export class LoanListComponent implements OnInit {

  readonly date = new Date();
  readonly serializedDate = new Date().toISOString();
  
  dataSource = new MatTableDataSource<Loan>();
  displayedColumns: string[] = ['id', 'client', 'game', 'startDate', 'endDate', "action"];
  loans: Loan[] = [] as Loan[];
  clients: Client[] = [] as Client[];
  games: Game[] = [] as Game[]
  filterGame: Game|null = {} as Game;
  filterClient: Client|null = {} as Client;
  filterStartDate: Date|null = {} as Date;
  filterEndDate: Date|null = {} as Date;
  pageNumber: number = 0;
  pageSize: number = 5;
  totalElements: number = 0;

  constructor(
    private loanService:LoanService,
    private gameService:GameService,
    private clientService:ClientService,
    public dialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.loanService.getLoans().subscribe((loans) => {
        this.loans = loans;
        this.dataSource.data = loans;
        console.log(this.dataSource.data)
      }
    );

    this.clientService.getClients().subscribe((clients) => (this.clients = clients));
    this.gameService.getGames().subscribe((games) => (this.games = games));
    this.loadPage();
  }


  onCleanFilter():void {
    this.filterClient = null;
    this.filterGame = null;
    this.filterStartDate = null; 
    this.filterEndDate = null;
    this.onSearch();
  }

  onSearch():void{
    const client = this.filterClient;
    const game = this.filterGame;
    const startDate = this.filterStartDate;
    const endDate = this.filterEndDate;

    this.loanService.getLoans(
      client?.id||undefined, 
      game?.id || undefined, 
      startDate||undefined,
      endDate||undefined
    ).subscribe((loans) => (this.loans = loans));
  }

  createLoan(){
    const dialogRef = this.dialog.open(LoanEditComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    })
  }

  editLoan(loan: Loan) {
    const dialogRef = this.dialog.open(LoanEditComponent, {
         data: { loan: Loan },
    });
    dialogRef.afterClosed().subscribe((result) => {
        this.onSearch();
    });
  }



  deleteLoan(loan:Loan){
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: {title: "Eliminar prestamo", description: "Atención si borra el préstamos se perderan los datos."}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log(result)
        this.loanService.deleteLoan(loan).subscribe(result => {
          this.ngOnInit();
        })
      }
    })
  }


  loadPage(event?: PageEvent) {
    const pageable: Pageable = {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        sort: [
            {
                property: 'id',
                direction: 'ASC',
            },
        ],
    };

    if (event != null) {
        pageable.pageSize = event.pageSize;
        pageable.pageNumber = event.pageIndex;
    }

    this.loanService.getLoanPages(pageable).subscribe((data) => {
        this.dataSource.data = data.content;
        this.pageNumber = data.pageable.pageNumber;
        this.pageSize = data.pageable.pageSize;
        this.totalElements = data.totalElements;
    });
}
}
