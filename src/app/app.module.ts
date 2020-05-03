import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameMasterComponent } from './game-master/game-master.component';
import { LoggerWidgetComponent } from './logger-widget/logger-widget.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { GameReadyComponent } from './game-ready/game-ready.component';
import { GamePlayComponent } from './game-play/game-play.component';

@NgModule({
  declarations: [
    AppComponent,
    GameMasterComponent,
    LoggerWidgetComponent,
    AuthenticateComponent,
    GameReadyComponent,
    GamePlayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
