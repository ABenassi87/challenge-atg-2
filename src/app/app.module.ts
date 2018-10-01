import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { PagesModule } from './pages/pages.module';
import { ServicesModule } from './services/services.module';
import { appRoutingModule } from './app.routing.module';
import { D3Module } from './d3/d3.module';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, ComponentsModule, PagesModule, ServicesModule, appRoutingModule, D3Module],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
