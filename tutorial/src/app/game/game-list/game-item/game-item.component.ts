import { Component, OnInit, Input } from '@angular/core';
import { Game } from '../../models/Game.model';
import {MatCardModule} from '@angular/material/card';
@Component({
  selector: 'app-game-item',
  imports: [MatCardModule],
  templateUrl: './game-item.component.html',
  styleUrl: './game-item.component.css'
})
export class GameItemComponent {
  @Input() game: Game = {} as Game;
}
