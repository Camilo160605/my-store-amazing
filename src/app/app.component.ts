import { Component } from '@angular/core';
// import { Product } from './models/product.model-';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = '';
  imgParent = '';
  showImg = true;
  token= '';
  imgRta= '';

  constructor(
    private authService : AuthService,
    private usersService : UsersService,
    private filesService : FilesService
  ){ }

  onLoaded(img : string){
    console.log('log Padre', img);
  }
  toogleImg(){
    this.showImg = !this.showImg
  }
  createUser(){
    this.usersService.create({
      email:'John@gmail.com',
      username:'johnd',
      password:'m38rmF$',
      name:{
          firstname:'John',
          lastname:'Doe'
      },
      address:{
          city:'kilcoole',
          street:'7835 new road',
          number:3,
          zipcode:'12926-3874',
          geolocation:{
              lat:'-37.3159',
              long:'81.1496'
          }
      },
      phone:'1-570-236-7033'
    })
    .subscribe(rta=>{
      console.log(rta);

    })
    ;
  }
  login(){
    const viewUser= {
      username:'johnd',
      password:'m38rmF$'
    }
    this.authService.login(viewUser)
    .subscribe(data=>{
      console.log(data.access_token);
      this.token = data.access_token;
    });
  }
  getProfile(){
    this.authService.profile(this.token)
    .subscribe(profile => {
      console.log(profile);
    })
  }
  downloadPDF(){
    this.filesService.getFile('my.pdf','https://young-sands-07814.herokuapp.com/api/files/dummy.pdf','application/pdf')
    .subscribe()
  }
  onUpload(event : Event){
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if(file){
    this.filesService.uploadFile(file)
    .subscribe(rta=>{
      this.imgRta = rta.location;
    });
  }
  }
}

