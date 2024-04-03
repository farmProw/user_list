import { Injectable, signal, } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class TooltipService {
 private _toggle = signal({isOpen:false})
 private _content = signal('')
  openTooltip(){
   this._toggle.set({isOpen:true})
  }
  closeTooltip(){
   this._toggle.set({isOpen:false})
  }
  getTooltip(){
   return this._toggle()
  }
  setContentTooltip(content:string){
    this._content.set(content)
  }
  getContentTooltip(){
   return this._content()
  }
}