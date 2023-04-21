import {
  Component,
  OnInit,
  HostListener,
  Input,
  ViewChild,
  ElementRef,
} from '@angular/core';

import { GameloopService } from '@services/game-loop.service';
import { Vector } from '@models/geometry/Vector';
import { BlueprintObjectComponent } from '@components/blueprint-object/blueprint-object.component';
import { SceneModel } from '@models/SceneModel';

@Component({
  selector: 'blueprint',
  templateUrl: './blueprint.component.html',
  styleUrls: ['./blueprint.component.scss'],
  standalone: true,
  providers: [GameloopService],
  imports: [BlueprintObjectComponent],
})
export class BlueprintComponent implements OnInit {
  public paddingx = 0;
  public paddingy = 0;
  public scale = 1;
  private lastPosition = new Vector(0, 0);
  private margin = new Vector(0, 0);

  @ViewChild('AreaId') AreaRef: ElementRef;

  @Input()
  public model: SceneModel = new SceneModel();

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    const { x, y } = this.AreaRef.nativeElement.getBoundingClientRect();
    this.margin = new Vector(x, y);
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart($event: TouchEvent) {}

  @HostListener('touchend', ['$event'])
  onTouchEnd($event: TouchEvent) {}

  @HostListener('touchcancel', ['$event'])
  onTouchCancel($event: TouchEvent) {}

  @HostListener('window:pointerdown', ['$event'])
  onPointerStart($event: PointerEvent) {
    if ($event.pointerType === 'touch') {
      if ($event.isPrimary) {
        this.lastPosition = new Vector($event.pageX, $event.pageY);
      }
    } else {
      this.startTrace($event.pageX, $event.pageY);
    }
  }

  @HostListener('pointermove', ['$event'])
  onPointerMove($event: PointerEvent) {
    $event.preventDefault();
    $event.stopPropagation();

    const finger = $event.pointerType === 'touch';
    const middleMouse = $event.buttons == 4;
    const traceEnable = $event.buttons == 1;

    if (middleMouse) {
      this.pad($event.movementX, $event.movementY);
    } else if (finger) {
      if ($event.isPrimary) {
        this.pad(
          $event.pageX - this.lastPosition.x,
          $event.pageY - this.lastPosition.y
        );

        this.lastPosition = new Vector($event.pageX, $event.pageY);
      }
    } else if (traceEnable) {
      this.trace($event.pageX, $event.pageY);
    }
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove($event: TouchEvent) {
    $event.preventDefault();
    $event.stopPropagation();

    // multi touch handling only
    if ($event.touches.length > 1) {
    }
  }

  @HostListener('wheel', ['$event'])
  onScroll($event: WheelEvent) {
    const newscale = this.scale + 0.1 * (-$event.deltaY / 120);
    if (newscale > 0.01) {
      this.scale = newscale;
    }
  }

  @HostListener('window:contextmenu', ['$event'])
  onContextMenu($event: MouseEvent) {
    $event.preventDefault();
    $event.stopPropagation();
  }

  private pad(deltaX: number, deltaY: number) {
    this.paddingx += deltaX;
    this.paddingy += deltaY;
  }

  private startTrace(x: number, y: number) {
    this.model.startTrace(this.CoordBlueprint(x, y));
  }
  private trace(x: number, y: number) {
    this.model.trace(this.CoordBlueprint(x, y));
  }

  private CoordBlueprint(x: number, y: number): Vector {
    return new Vector(
      (x - this.margin.x - this.paddingx) / this.scale,
      (y - this.margin.y - this.paddingy) / this.scale
    );
  }
}
