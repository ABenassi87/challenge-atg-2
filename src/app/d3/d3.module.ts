import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraggableDirective } from './directives/draggable.directive';
import { ZoomableDirective } from './directives/zoomable.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DraggableDirective, ZoomableDirective],
  exports: [DraggableDirective, ZoomableDirective]
})
export class D3Module { }
