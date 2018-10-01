import { Injectable } from '@angular/core';
import { Distance, GraphEdge, Graph, GraphNode } from '../models/graph.model';
import { PathStore } from '../store/path-store';
import { getD3Link } from '../utils/commons';

@Injectable({
  providedIn: 'root'
})
export class BellmanFordService {
  infinity = 1 / 0;

  constructor(private store: PathStore) {}

  getShorterPath(graph: Graph, sourceId: string, targetId: string): Graph {
    const path: Graph = {
      label: 'Shorter Path',
      nodes: [],
      edges: [],
      directed: true,
      type: 'Directed'
    };

    let distancesFromSource: Distance = {};

    const source = graph.nodes.find(node => node.id === sourceId);
    const target = graph.nodes.find(node => node.id === targetId);

    if (graph && source) {
      const nodes = graph.nodes;
      const edges = graph.edges;

      distancesFromSource = nodes.reduce((distancesTemp: Distance, node: GraphNode) => {
        let distance = this.infinity;
        const previous = null;
        if (node.id === source.id) {
          distance = 0;
        }
        distancesTemp[node.id] = { distance, previous };

        return distancesTemp;
      }, {});
      this.relax(distancesFromSource, nodes, edges);
      this.checkNegativeCycles(distancesFromSource, edges);

      const queue: GraphNode[] = [];

      queue.push(target);
      while (queue.length > 0) {
        const lastNode = queue.pop();
        path.nodes.unshift(lastNode);
        if (lastNode.id === source.id) {
          break;
        }
        const previousNode = distancesFromSource[lastNode.id].previous.node;
        const link = edges.find(
          edge =>
            (edge.source.id === lastNode.id && edge.target.id === previousNode.id) ||
            (edge.target.id === lastNode.id && edge.source.id === previousNode.id)
        );
        if (link) {
          const newLink = {
            sourceId: previousNode.id,
            source: previousNode,
            targetId: lastNode.id,
            target: lastNode,
            weight: link.weight
          };
          this.store.setLastLink(getD3Link(previousNode, lastNode, link.weight.toString(), true));
          path.edges.unshift(newLink);
        }
        queue.push(previousNode);
      }
    }

    return path;
  }

  private relax(distancesFromSource: Distance, nodes: GraphNode[], edges: GraphEdge[]): void {
    nodes.forEach(node => {
      if (distancesFromSource[node.id].distance !== 0) {
        edges.forEach(edge => {
          if (
            distancesFromSource[edge.source.id].distance !== this.infinity &&
            distancesFromSource[edge.source.id].distance + edge.weight < distancesFromSource[edge.target.id].distance
          ) {
            distancesFromSource[edge.target.id].distance = distancesFromSource[edge.source.id].distance + edge.weight;
            distancesFromSource[edge.target.id].previous = { node: edge.source, weight: edge.weight };
          }

          if (
            distancesFromSource[edge.target.id].distance !== this.infinity &&
            distancesFromSource[edge.target.id].distance + edge.weight < distancesFromSource[edge.source.id].distance
          ) {
            distancesFromSource[edge.source.id].distance = distancesFromSource[edge.target.id].distance + edge.weight;
            distancesFromSource[edge.source.id].previous = { node: edge.target, weight: edge.weight };
          }
        });
      }
    });
  }

  private checkNegativeCycles(distancesFromSource: Distance, edges: GraphEdge[]): void {
    edges.forEach(edge => {
      if (
        distancesFromSource[edge.source.id].distance !== this.infinity &&
        distancesFromSource[edge.source.id].distance + edge.weight < distancesFromSource[edge.target.id].distance
      ) {
        console.log('Graph contains negative weight cycle');
      }
    });
  }
}
