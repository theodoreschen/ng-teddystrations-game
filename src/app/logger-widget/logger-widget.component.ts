import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-logger-widget',
  templateUrl: './logger-widget.component.html',
  styleUrls: ['./logger-widget.component.css']
})
export class LoggerWidgetComponent implements OnInit {
  develMode: boolean;
  levels = [];
  selectedLevel: number;
  
  @Output() develModeEmitter = new EventEmitter<boolean>(); 

  constructor(private logService: LoggerService) { }

  ngOnInit(): void {
    this.develMode = false;
    this.selectedLevel = 3;
    this.levels = this.logService.levels;
  }

  setGlobalLogLevel (event: string): void {
    this.logService.setLevel(+event);
  }

  toggleDevelMode(enable: boolean): void {
    if (enable) this.develMode = true;
    else this.develMode = false;
    this.develMode = !enable;
    this.develModeEmitter.emit(this.develMode);
  }

}
