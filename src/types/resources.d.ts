type ImageMetadata = {
  src: string
  width: number
  height: number
  format: ImageInputFormat
  orientation?: number
}

declare module '*.avif' {
  const src: ImageMetadata
  export default src
}

declare module '*.bmp' {
  const src: ImageMetadata
  export default src
}

declare module '*.gif' {
  const src: ImageMetadata
  export default src
}

declare module '*.jpg' {
  const src: ImageMetadata
  export default src
}

declare module '*.jpeg' {
  const src: ImageMetadata
  export default src
}

declare module '*.png' {
  const src: ImageMetadata
  export default src
}

declare module '*.webp' {
  const src: ImageMetadata
  export default src
}

declare module '*.svg' {
  const src: ImageMetadata
  export default src
}
