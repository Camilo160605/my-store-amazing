import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, AfterViewInit, OnDestroy, SimpleChange} from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy{

  img : string = '';

  @Input('img')
  set changeImg (newImg : string){
    this.img= newImg;

  }
  @Input() alt : string = '';
  @Output () loaded = new EventEmitter<string>();
  imgDefault='https://www.w3schools.com/howto/img_avatar.png';
  // counter = 0;
  // counterFn : number | undefined;

  constructor() {
    //before render
    //No async -- once time
  }
  ngOnChanges(changes: SimpleChanges): void {
      //before - during render
      //changes inputs - times
  }

  ngOnInit(): void {
    //before render
    // async - fetch -- once time
  }
  ngAfterViewInit(){
    //after render
    //handler child
  }
  ngOnDestroy(){
    //delete
  }

  imgError(){
    this.img = this.imgDefault;
  }
  imgLoaded(){
    // console.log('log Hijo');
    this.loaded.emit(this.img);
  }
}
