import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import 'virtual:group-icons.css'

import { ImageGroup } from '@miletorix/vitepress-image-group'
import '@miletorix/vitepress-image-group/style.css'

import BackToTopButton from '@miletorix/vitepress-back-to-top-button'
import '@miletorix/vitepress-back-to-top-button/style.css'

// Use the local source while developing the plugin in this repository.
import ImageViewerP from '../../../packages/src/index.ts'

import { Card, CardsGroup } from '@miletorix/vitepress-enhanced-site-links'
import '@miletorix/vitepress-enhanced-site-links/style.css'

export default {
  extends: DefaultTheme,
  // @ts-ignore
  enhanceApp(ctx) {
    BackToTopButton(ctx.app) 
    ImageViewerP(ctx.app, {
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
