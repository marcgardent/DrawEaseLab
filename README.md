# DrawEase Lab

Please note that DrawEaseLab is a prototype or proof-of-concept software that demonstrates new ergonomic design ideas. While we have made every effort to ensure its functionality and reliability, it is still in development and may have bugs or limitations. DrawEaseLab is not intended to be a full-featured or commercial-grade software at this time. It is provided solely for demonstration purposes and to gather feedback from users. We appreciate your understanding and encourage you to provide us with your comments and suggestions to help us improve the software.

[🎨 Try it DrawEase Lab - Online!](https://marcgardent.github.io/DrawEaseLab/)

> Support for mouse, stylus, and touch devices: tested with iPad on Chrome/Safari browsers.

## Features

### RayCast Fill Tool

> fill areas without going over ink lines.

<img src="./charts/raycast-fill-tool.gif" alt="RayCast Fill Tool" width="320"/>

### Standard Rendering Engine

The app uses the SVG+CSS engines embedded in web browsers. Additionally, it is a powerful and performant 2D engine that also adheres to standards from the W3C.

## ROADMAP

### Object Composing Mode

- Transform widget: scale, move, rotate
- Clone object: 'Linked' Or 'Full Copy'
- Manage object: add/remove reorder
- Support for nested objects.

> Similar to Blender 3D

### Rendering Mode

- manage render passes : add/remove/edit reorder
  - line passes
  - fill passes
  - clipping/background passes

### Color Composing Mode

- manage Dynamic Palette : Key/value

### Export mode

- multi page export
- export to PDF printer

### Sculpt mode

- Proportionnal editing Tool
- Smooth Path Tool

> Not priority for this demonstrator : Similar to Blender Grease Pencil

### Scripting mode

- use humun-writable text format for implementing:
  - Separating the writing and illustration processes.
  - scalefolding Import: create automaticly the tree of object : pages > zone > texts.
  - Export: edit your text in an external editor and re-import your changes.
  - Support for i18n (internationalization).
  - override formating : font, size, aligment ...

## Contributors

> This is an Angular web app based on SVG elements.

[Fork and Edit on StackBlitz ⚡️](https://stackblitz.com/edit/draw-ease-lab)
