export interface ImageViewerOptions {
  /**
   * Use transparent dark overlay instead of solid background
   * @default true
   */
  transparentBg?: boolean

  /**
   * Automatically show thumbnails on desktop
   * @default true
   */
  autoShowThumbnails?: boolean

  /**
   * Ignore images wrapped in links
   * @default true
   */
  ignoreLinkedImages?: boolean
}