declare interface ImportMetaEnv {
  readonly BASE_URL?: string
  readonly [key: string]: string | boolean | undefined
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv
}
