import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { GraphViewerComponent } from './graph-viewer/graph-viewer.component';
import { NodeViewerComponent } from './node-viewer/node-viewer.component';
import { LinkViewerComponent } from './link-viewer/link-viewer.component';
import { D3Module } from '../d3/d3.module';

@NgModule({
  imports: [CommonModule, D3Module],
  declarations: [HeaderComponent, FooterComponent, GraphViewerComponent, NodeViewerComponent, LinkViewerComponent],
  exports: [HeaderComponent, FooterComponent, GraphViewerComponent]
})
export class ComponentsModule {}
