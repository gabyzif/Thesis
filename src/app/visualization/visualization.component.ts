import { Component, OnInit } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { toTypeScript } from '@angular/compiler';



export interface Photo    {
  "url": string,
  "tipo_de_cuerpo": string,
  "piel": string|string[],
  "color_de_piel": string
};

@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.scss']
})
export class VisualizationComponent implements OnInit {



  tipoDeCuerpo: string[] = [];
  pielV: string[] = [];
  colorDePiel:string[]=[];

  onClickTipoCuerpo(tipoDeCuerpo: string){
    const index = this.tipoDeCuerpo.indexOf(tipoDeCuerpo);
    if(index != -1){
      this.tipoDeCuerpo.splice(index,1);
    }else{
      this.tipoDeCuerpo.push(tipoDeCuerpo);
    }
  }


  onClickColorDePiel(colorDePiel: string){
    const index = this.colorDePiel.indexOf(colorDePiel);
    if(index != -1){
      this.colorDePiel.splice(index,1);
    }else{
      this.colorDePiel.push(colorDePiel);
    }
  }

  onClickPiel(pielV: string){
   
    const index = this.pielV.indexOf(pielV);
    if(index != -1){
      this.pielV.splice(index,1);
    }else{
      this.pielV.push(pielV);
    }
  }

  constructor(private httpClient: HttpClient) { }

  data: Photo[] = [];
  get photos(): Photo[]{

    let photos = this.data;
    if (this.tipoDeCuerpo.length>0) {
      photos = photos.filter(photo=> this.tipoDeCuerpo.indexOf(photo.tipo_de_cuerpo)!=-1);
    }

    if (this.colorDePiel.length>0) {
      photos = photos.filter(photo=> this.colorDePiel.indexOf(photo.color_de_piel)!=-1);
    }

    if (this.pielV.length) {
      photos = photos.filter(photo=>{
        const photoPiel = [].concat(photo.piel);
        return photoPiel.indexOf(photo.piel) != -1;
      });
    }

    return photos;
  }


  async ngOnInit() {
    this.data = await this.httpClient.get<Photo[]>("./assets/json.json").toPromise();
  }


}
