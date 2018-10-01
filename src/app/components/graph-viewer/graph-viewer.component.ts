import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { D3Service } from '../../d3/d3.service';
import { ForceDirectedGraph, Link, Node } from '../../d3/models';
import { Graph } from '../../models/graph.model';
import { getD3Link, getD3Node } from '../../utils/commons';
import * as d3 from 'd3';
import { PathStore } from '../../store/path-store';

@Component({
  selector: 'app-graph-viewer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './graph-viewer.component.html',
  styleUrls: ['./graph-viewer.component.css']
})
export class GraphViewerComponent implements OnInit, OnChanges {
  @Input('path') graph: Graph;
  nodes: Node[];
  links: Link[];

  graphViewer: ForceDirectedGraph;

  constructor(private d3Service: D3Service, private ref: ChangeDetectorRef, private store: PathStore) {
    /*this.store.links$.subscribe((links: Link[]) => {
      if (links.length === 0) {
        this.update();
      }
    });*/
  }

  ngOnInit() {
    /** Receiving an initialized simulated graph from our custom d3 service */
    this.nodes = this.graph.nodes.map(node => getD3Node(node));
    this.links = this.graph.edges.map((edge, index) => {
      const source = this.nodes.find(node => node.id === edge.sourceId);
      const target = this.nodes.find(node => node.id === edge.targetId);

      return getD3Link(source, target, edge.weight.toString(), this.graph.directed, index);
    });
    this.graphViewer = this.d3Service.getForceDirectedGraph(this.nodes, this.links, this.options);

    this.graphViewer.ticker.subscribe(d => {
      this.ref.markForCheck();
    });
  }

  ngAfterViewInit() {
    this.graphViewer.initSimulation(this.options);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes);
    this.update();
    this.store.setInitState();
  }

  update() {
    /*d3.select('g').remove();*/
    this.nodes = this.graph.nodes.map(node => getD3Node(node));
    this.links = this.graph.edges.map((edge, index) => {
      const source = this.nodes.find(node => node.id === edge.sourceId);
      const target = this.nodes.find(node => node.id === edge.targetId);

      return getD3Link(source, target, edge.weight.toString(), this.graph.directed, index);
    });
    this.graphViewer = this.d3Service.getForceDirectedGraph(this.nodes, this.links, this.options);

    this.graphViewer.ticker.subscribe(d => {
      this.ref.markForCheck();
    });
  }

  private _options: { width; height } = { width: 800, height: 400 };

  get options() {
    return this._options;
  }
}
