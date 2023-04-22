import 'zone.js/dist/zone';
import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { BlueprintComponent } from './components/blueprint/blueprint.component';
import { SceneModel } from './models/SceneModel';
import { Vector } from '@models/geometry/Vector';

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

  public fileChanged(e: Event) {
    const element = e.currentTarget as HTMLInputElement;
    const fileList: FileList | null = element.files;
    if (fileList && fileList.length == 1) {
      this.readImage(fileList[0]);
    }
  }

  private convertImageAsInk(img: HTMLImageElement) {
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
      const mat = ctx.getImageData(0, 0, img.naturalWidth, img.naturalHeight);
      const threshold = 128;
      for (let x = 0; x < mat.width; x++) {
        for (let y = 0; y < mat.height; y++) {
          const pixelIndex = (y * mat.width + x) * 4;
          const red = mat.data[pixelIndex];
          const green = mat.data[pixelIndex + 1];
          const blue = mat.data[pixelIndex + 2];
          const alpha = mat.data[pixelIndex + 3];

          if (
            alpha >= threshold &&
            red <= threshold &&
            green <= threshold &&
            blue <= threshold
          ) {
            this.model.activeObject.addPixelAsInk(new Vector(x, y));
          }
        }
      }
    }
  }

  private readImage(imageFile: Blob) {
    const reader = new FileReader();
    const img = document.createElement('img');

    reader.onload = (e: ProgressEvent<FileReader>) => {
      const dataURL = e?.target?.result?.toString();

      img.onload = () => {
        this.model.activeObject.activePass.rasterImage = {
          width: img.naturalWidth,
          height: img.naturalHeight,
          stringUrl: img.src,
        };
        this.convertImageAsInk(img);
      };

      if (dataURL) {
        img.src = dataURL;
      }
    };
    reader.readAsDataURL(imageFile);
  }
}

bootstrapApplication(App);
