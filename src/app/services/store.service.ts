import { Injectable } from '@angular/core';
import { Product } from '../models/product.model-';
//Libreria para realizar los obervable
import { BehaviorSubject } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class StoreService {

  myShoppingCart: Product[] = [];
  private myCart = new BehaviorSubject<Product[]>([]);

  //Declaramos el obsevable, una buena practica es dejar
  //el signo de pesos al final de la variable
  myCart$ = this.myCart.asObservable();

  constructor() { }

  addProduct(product : Product){
    this.myShoppingCart.push(product);
    //Aquí mandamos el estado del observable
    //se transmite la lista de productos
    this.myCart.next(this.myShoppingCart);
  }
  getShoppingCart(){
    return this.myShoppingCart;
  }
  getTotal(){
    return this.myShoppingCart.reduce((sum, item) => sum + item.price, 0);
  }
}
