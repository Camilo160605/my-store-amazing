import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { retry, catchError, map } from 'rxjs/operators';
import { throwError,zip } from 'rxjs';

import { environment } from './../../environments/environment';
import { checkTime } from "./../interceptors/time.interceptor";

import {
  Product,
  createProductDTO,
  updateProductDTO,
} from '../models/product.model-';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = `${environment.API_URL}/products`;
  constructor(
    private http: HttpClient) { }

  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', limit); //Pilas aquí
    }
    return this.http.get<Product[]>(this.apiUrl, { params, context : checkTime()});
  }

  getProduct(id: string) {
    return this.http.get<Product>(`https://fakestoreapi.com/products/${id}`)
  // .pipe(
  //   catchError((error: HttpErrorResponse)=>{
  //     if (error.status === HttpStatusCode.Conflict) {
  //       return throwError(()=> new Error ('Algo falla en el servidor'));
  //     }
  //     if (error.status === HttpStatusCode.NotFound) {
  //       return throwError(()=> new Error ('El producto no existe'));
  //       }
  //     if (error.status === HttpStatusCode.Unauthorized) {
  //       return throwError(()=> new Error ('No estas autorizado'));
  //     }
  //     return throwError(()=> new Error ('Ups, algo salió mal'));
  //   })
  // )
  }
  getProductsByPage(limit: number, offset: number) {
    return this.http.get<Product[]>(`${this.apiUrl}`, {
      params: { limit, offset },
    })
    .pipe(
      retry(3),
        map(products => products.map(item=>{
        return {
          ...item,
          taxes: .19 * item.price
        }
      }))
    );
  }
  fetchReadAndUpdate(id: string, dto: updateProductDTO){
    return zip(
      this.getProduct(id),
      this.update(id,dto)
    );
  }
  create(dto: createProductDTO) {
    return this.http.post<Product>(this.apiUrl, dto);
  }
  update(id: string, dto: updateProductDTO) {
    return this.http.put<Product>(
      `https://fakestoreapi.com/products/${id}`,
      dto
    );
  }
  delete(id: string) {
    return this.http.delete<boolean>(`https://fakestoreapi.com/products/${id}`);
  }
}
