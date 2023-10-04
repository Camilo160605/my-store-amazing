import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from './../../environments/environment';
import { Auth } from './../models/auth.model';
import { User, loginUser } from './../models/user.model';
import { switchMap, tap } from "rxjs"
import { TokenService } from "./../services/token.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private apiUrl = `${environment.API_URL}/users`;
  private apiUrl = 'https://fakestoreapi.com/auth/login';

  constructor(
    private http: HttpClient,
    private tokenService : TokenService
  ) { }
  login(dto: loginUser){
    return this.http.post<Auth>(this.apiUrl,dto)
    .pipe(
      tap(response => this.tokenService.saveToken(response.access_token))
    );
  }
  profile(token : string){
    // const headers = new HttpHeaders();
    // headers.set('Authorization',`Bearer ${token}`);
    return this.http.get<User>(this.apiUrl,{
      // headers: {
      //   Authorization: `Bearer ${token}`,
        // 'Content-type' : 'aplication/json'
      // }
    });
  }
}
