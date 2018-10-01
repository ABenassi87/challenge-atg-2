import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Link } from '../../d3/models';
import { Subscription } from 'rxjs';
import { PathStore } from '../../store/path-store';
import * as d3 from 'd3';

@Component({
  selector: '[app-link-viewer]',
  templateUrl: './link-viewer.component.html',
  styleUrls: ['./link-viewer.component.css']
})
export class LinkViewerComponent implements OnInit {
  @Input('app-link-viewer') link: Link;
  color: string;
  lineWidth: string;
  labelSize: number;
  isSelected = false;
  subscriptions: Subscription[] = [];
  constructor(private store: PathStore) {
    this.subscriptions.push(
      this.store.lastLink$.subscribe((link: Link) => {
        const colorTemp = this.color;
        if (this.link && link && !this.isSelected) {
          this.isSelected = this.isEqual(link);
          this.color = this.isEqual(link) ? 'red' : 'blue';
        } else if (!link) {
          this.isSelected = false;
          this.color = 'blue';
        }

        if (this.color !== colorTemp) {
          this.update();
        }
      })
    );
  }

  ngOnInit() {
    this.color = 'blue';
    this.lineWidth = '2';
    this.labelSize = (this.link.label.length / 2) * 5;
  }

  isEqual(link: Link) {
    const linkSource = link.source.id;
    const linkTarget = link.target.id;
    const linkSource2 = this.link.source.id;
    const linkTarget2 = this.link.target.id;
    if (this.link.directed) {
      return linkSource === linkSource2 && linkTarget === linkTarget2;
    } else {
      return (linkSource === linkSource2 || linkSource === linkTarget2) && (linkTarget === linkSource2 || linkTarget === linkTarget2);
    }
  }

  update() {
    if (this.link) {
      let line = d3.select(`#${this.link.indexLabel}`).attr('stroke', this.color);
    }
  }

  getId() {
    if (!this.link) {
      return '';
    }
    return `link-${this.link.index}`;
  }
}
