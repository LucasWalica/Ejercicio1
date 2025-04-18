import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameService } from '../game.service';
import { Game } from '../models/Game.model';
import { AuthorService } from '../../author/services/author.service';
import { Author } from '../../author/model/Author.model';
import { CategoryService } from '../../category/category.service';
import { Category } from '../../category/model/Category';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-game-edit',
  imports: [
    FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule 
  ],
  templateUrl: './game-edit.component.html',
  styleUrl: './game-edit.component.css'
})
export class GameEditComponent implements OnInit {
  game: Game = {} as Game;
  authors: Author[] = [] as Author[];
  categories: Category[] = [] as Category[];

  constructor(
      public dialogRef: MatDialogRef<GameEditComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private gameService: GameService,
      private categoryService: CategoryService,
      private authorService: AuthorService
  ) {}

  ngOnInit(): void {
      this.game = this.data.game ? Object.assign({}, this.data.game) : 
        new Game(
            this.data.game?.id, 
            this.data.game?.title, 
            this.data.game?.age, 
            this.data.game?.category, 
            this.data.game?.author
        );

      this.categoryService.getCategories().subscribe((categories) => {
          this.categories = categories;

          if (this.game.category != null) {
              const categoryFilter: Category[] = categories.filter(
                  (category) => category.id == this.data.game.category.id
              );
              if (categoryFilter != null) {
                  this.game.category = categoryFilter[0];
              }
          }
      });

      this.authorService.getAllAuthors().subscribe((authors:Author[]) => {
          this.authors = authors;

          if (this.game.author != null) {
              const authorFilter: Author[] = authors.filter(
                  (author:Author) => author.id == this.data.game.author.id
              );
              if (authorFilter != null) {
                  this.game.author = authorFilter[0];
              }
          }
      });
  }

  onSave() {
      this.gameService.saveGame(this.game).subscribe((result) => {
          this.dialogRef.close();
      });
  }

  onClose() {
      this.dialogRef.close();
  }
}
