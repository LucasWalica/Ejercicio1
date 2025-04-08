import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientService } from '../client.service';
import { Client } from '../model/client.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-client-edit',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './client-edit.component.html',
  styleUrl: './client-edit.component.css'
})
export class ClientEditComponent implements OnInit{
  client: Client = {} as Client;

  constructor(
    public dialogRef:MatDialogRef<ClientEditComponent>,
    @Inject (MAT_DIALOG_DATA) public data:any, 
    private clientService: ClientService
  ) { }

  ngOnInit(): void {
    this.client = this.data.client ? Object.assign({}, this.data.client) : new Client(this.data.client.id, this.data.client.name);
  }


  onSave(){
    this.clientService.saveClient(this.client).subscribe(()=>{
      this.dialogRef.close();
    })
  }

  onClose(){
    this.dialogRef.close();
  }


}
