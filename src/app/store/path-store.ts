import { Link, Node } from '../d3/models';
import { Store } from './store';
import { Injectable } from '@angular/core';

export interface State {
  lastLink: Link;
  links: Link[];
  nodes: Node[];
}
@Injectable({
  providedIn: 'root'
})
export class PathStore extends Store<State> {
  constructor() {
    super({
      lastLink: null,
      links: [],
      nodes: []
    });
  }

  getInitState(): State {
    return {
      lastLink: null,
      links: [],
      nodes: []
    };
  }

  get state$() {
    return this.select(state => state);
  }
  get state() {
    return this.selectSync(state => state);
  }

  get lastLink$() {
    return this.select(state => state.lastLink);
  }
  get lastLink() {
    return this.selectSync(state => state.lastLink);
  }

  get links$() {
    return this.select(state => state.links);
  }

  get links() {
    return this.selectSync(state => state.links);
  }

  get nodes$() {
    return this.select(state => state.nodes);
  }

  get nodes() {
    return this.selectSync(state => state.nodes);
  }

  setLastLink(link: Link) {
    this.dispatch(state => ({
      ...state,
      lastLink: link,
      links: this.links.concat(link)
    }));
  }

  addNode(node: Node) {
    this.dispatch(state => ({
      ...state,
      nodes: this.nodes.concat(node)
    }));
  }

  setInitState() {
    this.dispatch(state => ({
      ...state,
      lastLink: null,
      links: [],
      nodes: []
    }));
  }
}
