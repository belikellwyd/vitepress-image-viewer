import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import 'virtual:group-icons.css'

import { ImageGroup } from '@belikellwyd/vitepress-image-group'
import '@belikellwyd/vitepress-image-group/style.css'

import BackToTopButton from '@belikellwyd/vitepress-back-to-top-button'
import '@belikellwyd/vitepress-back-to-top-button/style.css'

import ImageViewerP from '@belikellwyd/vitepress-image-viewer'
import '@belikellwyd/vitepress-image-viewer/style.css'

import { Card, CardsGroup } from '@belikellwyd/vitepress-enhanced-site-links'
import '@belikellwyd/vitepress-enhanced-site-links/style.css'

export default {
  extends: DefaultTheme,
  // @ts-ignore
  enhanceApp(ctx) {
    BackToTopButton(ctx.app) 
    ImageViewerP(ctx.app, {
      ignoreLinkedImages: true,
      exclude: {
        classes: ['image-viewer-disabled'],
        fileNames: ['favicon.png']
      },
      include: {
        classes: [],
        fileNames: []
      }
    })
    ctx.app.component('ImageGroup', ImageGroup)
    ctx.app.component('Card', Card)
    ctx.app.component('CardsGroup', CardsGroup)
  }
}
