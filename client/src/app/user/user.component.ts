import {Component, OnInit} from '@angular/core';

class Item{
  name: string;
  price: number;

  constructor(name: string, price: number) {

    this.name = name;
    this.price = price;

  }
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  items: Item[] =
    [
    ];

  addItem(itemName: string, price: number): void {

    if(itemName==null || itemName.trim()=="" || price==null)
      return;
    this.items.push(new Item(itemName, price));
  }

}
