import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: [
  ]
})
export class SearchComponent {
  @ViewChild('txtsearch') txtsearch!:ElementRef<HTMLInputElement>;

  constructor( private gifsService: GifsService){}
  search( ) {
    const valor = this.txtsearch.nativeElement.value;
    this.gifsService.searchGifs(valor)
    this.txtsearch.nativeElement.value= "";
  }
}
