import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey: string = '9KVNNRwGQq9YzsbRSPGyTUXFcTjWblJZ'
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs'
  private _history: string[] = [];

  //TODO: Cambiar any por su tipo
  public result: Gif [] = [];

  get history(){
    return [...this._history];
  }

  constructor( private http: HttpClient){
    this._history = JSON.parse(localStorage.getItem('history')!) || [];
    this.result = JSON.parse(localStorage.getItem('result')!) || [];
    // if(localStorage.getItem('history')){
    //   this._history = JSON.parse(localStorage.getItem('history')!);
    // }
  }

  searchGifs( query: string = '' ) {

    query = query.trim().toLocaleLowerCase();
    if(!this._history.includes(query)){
      this._history.unshift(query);
      this._history = this._history.splice(0,10)

    localStorage.setItem('history', JSON.stringify(this._history));
    }

    const params = new HttpParams()
          .set('api_key', this.apiKey)
          .set('limit', '10')
          .set('q', query)

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{ params })
    .subscribe((resp ) =>{
      // console.log(resp.data)
      this.result = resp.data;
      localStorage.setItem('result', JSON.stringify(this.result));
    })
  }
}

//----Metodo 1------//
// fetch('https://api.giphy.com/v1/gifs/search?api_key=9KVNNRwGQq9YzsbRSPGyTUXFcTjWblJZ&q=dragon ball z&limit=10')
// .then(res => {
//   res.json().then(data => {
//     console.log(data);
//   })})
//----Metodo 2------//
// const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=9KVNNRwGQq9YzsbRSPGyTUXFcTjWblJZ&q=dragon ball z&limit=10')
//const data = await resp.json();
//console.log(data)
