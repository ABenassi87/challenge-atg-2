import { Component, OnInit } from '@angular/core';
import { BellmanFordService } from '../../services/bellman-ford.service';
import { Graph } from '../../models/graph.model';
import { PathStore } from '../../store/path-store';
import { Link } from '../../d3/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  nodesList: string[];
  file: any;
  fileData: Graph;
  links: Link[];
  filename: string;
  sourceNode: string;
  targetNode: string;
  fileReader: FileReader;
  submitted = false;
  total: number;

  constructor(private bellmanFord: BellmanFordService, private store: PathStore) {
    this.store.lastLink$.subscribe((lastLink: Link) => {
      if (lastLink) {
        if (!this.links) {
          this.links = [];
        }
        this.links.unshift(lastLink);
        const weight = Number(lastLink.label);
        if (!isNaN(weight)) {
          if (!this.total) {
            this.total = 0;
          }
          this.total += weight;
        }
      }
    });
  }

  ngOnInit() {
    this.initData();
    this.initFileReader();
  }

  private initData() {
    this.file = null;
    this.filename = 'Choose File...';
    this.sourceNode = '';
    this.targetNode = '';
    this.fileData = null;
    this.nodesList = [];
    this.links = [];
  }

  private initFileReader() {
    this.fileReader = new FileReader();

    this.fileReader.onloadend = e => {
      this.fileData = JSON.parse(this.fileReader.result);
      this.nodesList = this.fileData.nodes.map(node => node.id);
      if (this.nodesList.length >= 2) {
        this.sourceNode = this.nodesList[0] ? this.nodesList[0] : '';
        this.targetNode = this.nodesList[1] ? this.nodesList[1] : '';
      }
      this.fileData.edges.forEach(edge => {
        edge.source = this.fileData.nodes.find(node => node.id === edge.sourceId);
        edge.target = this.fileData.nodes.find(node => node.id === edge.targetId);
      });
    };
  }

  fileUploaded(event): void {
    this.file = event.target.files[0];
    this.fileReader.readAsText(this.file);
    this.filename = this.file.name;
  }

  changeNode(type: 'source' | 'target', event) {
    switch (type) {
      case 'source':
        this.sourceNode = event.target.value;
        break;
      case 'target':
        this.targetNode = event.target.value;
        break;
      default:
        break;
    }
  }

  submit() {
    this.bellmanFord.getShorterPath(this.fileData, this.sourceNode, this.targetNode);
    this.submitted = true;
  }

  clearLog() {
    this.submitted = false;
    this.links = [];
    this.total = 0;
    this.store.setInitState();
  }
}
