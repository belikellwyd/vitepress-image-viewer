# vitepress-image-viewer 

VitePress image viewer with zoom, drag, fullscreen overlay, captions and download button. Ability to change the background to transparent. Automatically enhances all images on the page. Built with Vue 3. 

![npm](https://img.shields.io/npm/v/@belikellwyd/vitepress-image-viewer)  ![npm](https://img.shields.io/npm/dw/@belikellwyd/vitepress-image-viewer)  ![license](https://img.shields.io/npm/l/@belikellwyd/vitepress-image-viewer)

> [!IMPORTANT]
> 
> **Package migration**
>
> This package has moved from `@miletorix/vitepress-image-viewer` to `@belikellwyd/vitepress-image-viewer`.
>
> Please update your dependencies accordingly.

## Live Demo and more information

✨ See it in action:  
👉 [https://belikellwyd.github.io/vitepress-image-viewer/](https://belikellwyd.github.io/vitepress-image-viewer/)

📦 NPM Package:  
👉 [https://www.npmjs.com/package/@belikellwyd/vitepress-image-viewer](https://www.npmjs.com/package/@belikellwyd/vitepress-image-viewer)

## Installation

```sh [npm]
npm i @belikellwyd/vitepress-image-viewer
```

## Usage

### Configuration

```typescript
// docs/.vitepress/theme/index.ts
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import ImageViewerP from '@belikellwyd/vitepress-image-viewer' //[!code ++]
import '@belikellwyd/vitepress-image-viewer/style.css' //[!code ++]

export default {
  extends: DefaultTheme,
  enhanceApp(ctx) {
    ImageViewerP(ctx.app) //[!code ++]
  }
}
```

### Advanced configuration

```transparentBg?: boolean``` - Use transparent dark overlay instead of solid background. Default is true.

```autoShowThumbnails?: boolean``` - Automatically show thumbnails on desktop. Default is true.

```ignoreLinkedImages?: boolean``` - Ignore images wrapped in links. Default is true.

```exclude?: { classes?: string[], fileNames?: string[] }``` - Disable the viewer for images matched by a class on the image or any ancestor, or by file name.

```include?: { classes?: string[], fileNames?: string[] }``` - Re-enable matching images. Include rules take priority over custom and built-in exclusions.

Linked images, VitePress navigation logos (`.VPNavBarTitle .VPImage.logo`), home hero images (`.VPHero.VPHomeHero .image-bg`) and images with the `link-card-logo` class are excluded by default.

```typescript
// docs/.vitepress/theme/index.ts
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import ImageViewerP from '@belikellwyd/vitepress-image-viewer' //[!code ++]
import '@belikellwyd/vitepress-image-viewer/style.css' //[!code ++]

export default {
  extends: DefaultTheme,
  enhanceApp(ctx) { 
    ImageViewerP(ctx.app, { //[!code ++]
      transparentBg: false, //[!code ++] default is true
      autoShowThumbnails: false, //[!code ++] default is true
      ignoreLinkedImages: true, //[!code ++] default is true
      exclude: { //[!code ++]
        classes: ['image-viewer-disabled'], //[!code ++]
        fileNames: ['avatar.png'] //[!code ++]
      }, //[!code ++]
      // `include` overrides `exclude` and the built-in logo exclusions.
      include: { classes: ['logo'], fileNames: [] } //[!code ++]
    }) //[!code ++]
  }
}
```

## Preview

![preview](/assets/preview-2.png)
![preview](/assets/preview-1.png)
