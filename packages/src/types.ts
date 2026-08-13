export interface ImageRuleSet {
  /**
   * CSS class names on an image or any of its ancestors.
   * Both `logo` and `.logo` forms are accepted.
   */
  classes?: string[]

  /** File names matched against the image URL, without its path, query or hash. */
  fileNames?: string[]
}

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
   * Ignore images wrapped in links so navigation is not hijacked by the viewer.
   * @default true
   */
  ignoreLinkedImages?: boolean

  /** Images to disable by an ancestor/image class or file name. */
  exclude?: ImageRuleSet

  /**
   * Images to enable even when they match a custom or built-in exclusion.
   * Include rules take priority over exclude rules.
   */
  include?: ImageRuleSet
}
