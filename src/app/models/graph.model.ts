export interface GraphNode {
  id: string;
  label?: string;
  metadata?: any;
}

export interface GraphEdge {
  id?: string;
  sourceId?: string;
  targetId?: string;
  source?: GraphNode;
  target?: GraphNode;
  weight?: number;
  relation?: string;
  directed?: boolean;
  label?: string;
  metadata?: any;
}

export interface Graph {
  label: string;
  directed?: boolean;
  type: string;
  metadata?: any;
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface Distance {
  [node: string]: { distance: number; previous: { node: GraphNode; weight: number } };
}

