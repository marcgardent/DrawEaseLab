import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ObjectModel } from '@models/ObjectModel';

@Component({
  standalone: true,
  selector: '[blueprint-object]',
  imports: [CommonModule],
  templateUrl: './blueprint-object.component.html',
  styleUrls: ['./blueprint-object.component.css'],
})
export class BlueprintObjectComponent implements OnInit {
  constructor() {}

  @Input()
  model: ObjectModel = new ObjectModel();

  ngOnInit() {}
}
