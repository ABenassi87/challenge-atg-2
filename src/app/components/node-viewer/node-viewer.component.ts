import { Component, Input, OnInit } from '@angular/core';
import { Node } from '../../d3/models';


@Component({
  selector: '[app-node-viewer]',
  templateUrl: './node-viewer.component.html',
  styleUrls: ['./node-viewer.component.css']
})
export class NodeViewerComponent implements OnInit {
  @Input('app-node-viewer') node: Node;
  constructor() {}

  ngOnInit() {

  }
}
