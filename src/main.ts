import 'zone.js/dist/zone';
import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { BlueprintComponent } from './components/blueprint/blueprint.component';
import { SceneModel } from './models/SceneModel';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, BlueprintComponent],
  templateUrl: './main.html',
  styleUrls: ['./main.scss'],
})
export class App {
  public model: SceneModel = new SceneModel();

  public toggleFullscreen(): void {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  public selectPass(index: number) {
    console.info('select pass', index);
    this.model.selectPass(index);
  }
}

bootstrapApplication(App);
