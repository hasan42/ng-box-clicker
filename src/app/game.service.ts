import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Tile }  from './tile';


@Injectable({
  providedIn: 'root'
})
export class GameService {

  areaSize: number = 6;
  optionColor = ['yellow','red','blue','green','orange'];

  items: Tile[] = [];
  observableItems = new BehaviorSubject<Tile[]>(this.items);
  items$ = this.observableItems.asObservable();

  checkedColor: string = null;
  checkedTile: any;

  constructor() {
    this.createArea();
  }

  createArea(){
    let arr = [];
    for (let i = 0; i<this.areaSize; i++) {
      for (let j = 0; j<this.areaSize; j++) {
        let color = this.generateColor();
        let obj = {x:i, y:j, color:color};
        arr.push(obj);
      }
    }
    this.items = arr;
    this.observableItems.next(this.items)
  }

  generateColor(){
    let item = this.optionColor[Math.floor(Math.random() * this.optionColor.length)];
    return item;
  }

  checkColor(x,y,color){
    this.checkedColor = color;
    this.checkedTile = [
      {x:x, y:y}
    ];
    this.findColor(x,y);

    console.log(this.checkedTile);
  }

  findColor(x,y){
    // создаем массив ближайших
    let arr = [
      {x:x, y:y-1, check:null},
      {x:x, y:y+1, check:null},
      {x:x-1, y:y, check:null},
      {x:x+1, y:y, check:null},
    ];
    // перебираем
    arr.forEach(el=>{
      // если не выходит за рамки
      if((el.x >= 0) && (el.y >= 0) && ( el.x <= this.areaSize-1) && ( el.y <= this.areaSize-1)){
        // ищем в массиве элемент
        let find = this.items.find(fel=>fel.x===el.x&&fel.y===el.y);
        // проверяем указан ли цвет
        if(find.color){
          // проверяем совпадает ли цвет
          el.check = find.color === this.checkedColor;
          // если совпадает
          if(el.check){
            // ищем дубликаты
            let findDub = this.checkedTile.find(fel=>fel.x===el.x&&fel.y===el.y);
            // если не дубликат
            if(!findDub){
              // добавляем
              this.checkedTile.push({x:el.x, y:el.y});
              // ищем рядом с ним совпадения
              this.findColor(el.x, el.y)
            }
          }
        }
      }
    });
  }

  click(){
    // смотрим позицию по У
    // если не начальная
    //   проверяем сколько сверху
    //   меняем у самого верхнего не пустого на нижнее пустое
    //   пвторяем несколько раз
    // на пустые места переназначаем цвета
    if(this.checkedTile.length < 3){
      return
    }
    this.hideColor()
    
    this.reNewColor()
  }
  hideColor(){
    this.checkedTile.forEach(el=>{
      let findId = this.items.findIndex(fel=>fel.x===el.x&&fel.y===el.y);
      this.items[findId].color = null;
      this.moveColor();
    });
  }
  moveColor(){
    
  }
  reNewColor(){
    this.items.forEach(el=>{
      if(el.color == null){
        el.color = this.generateColor();
      }
    });
  }


}
