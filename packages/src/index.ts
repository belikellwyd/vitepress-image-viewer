import { createApp, h, App, ref, ComponentPublicInstance, nextTick } from 'vue'
import ImageViewer from './ImageViewer.vue'
import type { ImageViewerOptions } from './types'
import { isImageAllowed } from './imageRules.ts'

interface ImageViewerExpose {
  open: (src: string, alt?: string, originEl?: HTMLImageElement) => void
}

function enhanceImages(
  viewerRef: ComponentPublicInstance<ImageViewerExpose> | null,
  options: ImageViewerOptions
) {
  const imgs = document.querySelectorAll<HTMLImageElement>('img')
  imgs.forEach(img => {
    if (img.dataset.viewerBound === 'true') return
    if (!isImageAllowed(img, options)) return

    img.style.cursor = 'zoom-in'
    img.addEventListener('click', () => {
      if (!isImageAllowed(img, options)) return
      if (
        viewerRef &&
        typeof viewerRef.open === 'function' &&
        !(viewerRef as any).visible
      ) {
        viewerRef.open(img.src, img.alt || '', img)
      }
    })

    img.dataset.viewerBound = 'true'
  })
}

export default function ImageViewerP(
  app: App,
  options: ImageViewerOptions = {}
) {
  if (typeof window === 'undefined') return
  if ((window as any).__vitepress_image_viewer_installed) return
  ;(window as any).__vitepress_image_viewer_installed = true

  const mountNode = document.createElement('div')
  document.body.appendChild(mountNode)
  const rootStyle = document.documentElement.style
  const useTransparentBg = options.transparentBg !== false
  const autoShowThumbnails = options.autoShowThumbnails !== false

rootStyle.setProperty(
  '--iv-overlay-bg',
  useTransparentBg
    ? 'rgba(0, 0, 0, 0.75)'
    : 'var(--vp-code-block-bg)'
)
  const viewerRef = ref<ComponentPublicInstance<ImageViewerExpose> | null>(null)

  const viewerApp = createApp({
    render: () =>
      h(ImageViewer, {
        ref: viewerRef,
        autoShowThumbnails,
        imageRules: options
      })
  })
  viewerApp.mount(mountNode)

  const runEnhance = () => {
    nextTick(() => {
      enhanceImages(viewerRef.value, options)
    })
  }

  runEnhance()

  const appRoot = document.querySelector('#app')
  if (appRoot) {
    const observer = new MutationObserver(runEnhance)
    observer.observe(appRoot, {
      childList: true,
      subtree: true,
    })
  }
}
