import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'imgArray'})
export class ImgArrayPipe implements PipeTransform {
  transform(value: string){
   
    return value.replace(/\[/g,"").replace(/\]/g,"").replace(/\"/g,"").replace(/\s*/g,"").split(",");
  }
}