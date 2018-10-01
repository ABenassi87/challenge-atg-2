import { Directive, ElementRef, Input } from '@angular/core';
import { D3Service } from '../d3.service';
import { ForceDirectedGraph, Node } from '../models';

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective {

  @Input('appDraggable') draggableNode: Node;
  @Input('draggableInGraph') draggableInGraph: ForceDirectedGraph;

  constructor(private d3Service: D3Service, private _element: ElementRef) { }

  ngOnInit() {
    this.d3Service.applyDraggableBehaviour(this._element.nativeElement, this.draggableNode, this.draggableInGraph);
  }

}
