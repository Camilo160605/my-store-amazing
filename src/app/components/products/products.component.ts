import { Component, OnInit } from '@angular/core';
import { Product, createProductDTO, updateProductDTO } from '../../models/product.model-';
import { StoreService } from "../../services/store.service";
import { ProductsService } from '../../services/products.service';
import { switchMap } from 'rxjs/operators';
import { zip } from 'rxjs';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  myShoppingCart: Product[] = [];
  total = 0;
  products: Product [] = [];
  showProductDetail = false;
  productChosen : Product = {
    id: '',
    price : 0,
    image: '',
    title: '',
    category: '',
    description: ''
  };
  limit = 10;
  offset = 0;
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

  constructor(
    private storeService : StoreService,
    private productsService : ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.productsService.getProductsByPage(10, 0)
    .subscribe(data => {
      console.log(data);
      this.products = data;
      this.offset += this.limit;
    });
  }
  onAddToShoppingCart(product : Product){
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }
  toggleProductDetail(){
    this.showProductDetail = !this.showProductDetail;
  }
  onShowDetail ( id: string){
    this.statusDetail = 'loading';
    this.toggleProductDetail();
    this.productsService.getProduct(id)
    .subscribe(data => {
      this.productChosen = data;
      this.statusDetail = 'success';
     },response =>{
       console.log(response.error.message);
       this.statusDetail = 'error';
     }
     );
  }

    // this.productsService.getProduct(id)
    // .subscribe({
    //   next : (v) => this.showDetailOk(v),
    //   error: (e) => this.showDetailError(e),
    //   completa: () => console.info("complete")
    // });


  // showDetailOk(data: Product){
  //   this.statusDetail = 'success';
  //   console.log('producto obtenido',data);
  //   this.toggleProductDetail();
  //   this.productChosen = data;
  // }
  // showDetailError(e:any){
  //   this.statusDetail = 'error';
  //   console.error(e);
  // }

  readAndUpdate(id: string){
    this.productsService.getProduct(id)
    .pipe(
      switchMap((product) =>
      this.productsService.update(product.id,{title: 'change'})),
    )
    .subscribe(data =>{
      console.log(data);
      });
      this.productsService.fetchReadAndUpdate(id, {title: 'change'})
      .subscribe(response => {
        const read = response[0]
        const update= response[1]
      })
  }



  createNewProduct(){
    const product : createProductDTO = {
      price :  2500,
      image: 'https://picsum.photos/200/300',
      title: 'Nuevo Producto',
      categoryId: 1,
      description: ''
    }
    this.productsService.create(product)
    .subscribe(data =>{
      this.products.unshift(data);
    });
  }
  updateProduct(){
    const changes: updateProductDTO = {
      title: 'Change title',
    }
    const id = this.productChosen.id;
    this.productsService.update(id, changes)
    .subscribe(data =>{
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products[productIndex] = data;
      this.productChosen = data;
    });
  }
  deleteProduct(){
    const id = this.productChosen.id;
    this.productsService.delete(id)
    .subscribe(() => {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products.splice(productIndex, 1)
      this.showProductDetail = false;
    });
  }
  loadMore(){
    this.productsService.getProductsByPage(this.limit, this.offset)
    .subscribe(data => {
      console.log(data);
      this.products = this.products.concat(data);
      this.offset += this.limit;
    });
  }
}
