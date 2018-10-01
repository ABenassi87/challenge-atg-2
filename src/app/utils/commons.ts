import { Link, Node } from '../d3/models';
import { GraphNode } from '../models/graph.model';

export function getD3Node(node: GraphNode): Node {
  return new Node(node.id);
}

export function getD3Link(source: Node, target: Node, label?: string, directed?: boolean, index?: number): Link {
  return new Link(source, target, label, directed, index);
}
