import { Component, OnInit, Input } from '@angular/core';
import { GameService } from '../game.service';
import { Subscription ,BehaviorSubject,   } from 'rxjs';
import { take, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit {

  @Input() color: string;
  @Input() x: string;
  @Input() y: string;

  constructor(private service: GameService) { }

  ngOnInit(): void {
  }

  findItems(){
  	this.service.checkColor(this.x,this.y,this.color)
  }
  onClick(){
  	this.service.click()
  }

}
