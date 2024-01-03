/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_STRAPI_REST_ENDPOINT: string
    // more env variables...
}
  
interface ImportMeta {
    readonly env: ImportMetaEnv
}