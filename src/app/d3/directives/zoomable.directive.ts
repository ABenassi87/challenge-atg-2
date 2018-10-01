import { Directive, ElementRef, Input } from '@angular/core';
import { D3Service } from '../d3.service';

@Directive({
  selector: '[appZoomable]'
})
export class ZoomableDirective {

  @Input('appZoomable') appZoomable: ElementRef;

  constructor(private d3Service: D3Service, private _element: ElementRef) {}

  ngOnInit() {
    this.d3Service.applyZoomableBehaviour(this.appZoomable, this._element.nativeElement);
  }

}
