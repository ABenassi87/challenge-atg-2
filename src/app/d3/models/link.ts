import * as d3 from 'd3';
import { Node } from './';

// Implementing SimulationLinkDatum interface into our custom Link class
export class Link implements d3.SimulationLinkDatum<Node> {
  // Optional - defining optional implementation properties - required for relevant typing assistance
  index?: number;
  label: string;
  indexLabel: string;

  // Must - defining enforced implementation properties
  source: Node;
  target: Node;

  directed: boolean;

  constructor(source, target, label = 'test', directed = false, index: number) {
    this.source = source;
    this.target = target;
    this.label = label;
    this.directed = directed;
    if (index) {
      this.index = index;
    }
    this.indexLabel = 'link-' + index;
  }
}
