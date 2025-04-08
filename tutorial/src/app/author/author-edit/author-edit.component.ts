import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthorService } from '../services/author.service';
import { Author } from '../model/Author.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-author-edit',
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule ],
  templateUrl: './author-edit.component.html',
  styleUrl: './author-edit.component.css'
})
export class AuthorEditComponent implements OnInit {
  author: Author = {} as Author;

  constructor(
      public dialogRef: MatDialogRef<AuthorEditComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private authorService: AuthorService
  ) {}

  ngOnInit(): void {
      this.author = this.data.author ? Object.assign({}, this.data.author) : new Author(this.data.author.id, this.data.author.name, this.data.author.nationality);
  }

  onSave() {
      this.authorService.saveAuthor(this.author).subscribe(() => {
          this.dialogRef.close();
      });
  }

  onClose() {
      this.dialogRef.close();
  }
}