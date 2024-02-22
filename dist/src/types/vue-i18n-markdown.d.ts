import { ComponentCustomProperties } from "vue"
interface TextFunction {
    (key: string): string;
}

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $text: (key: string, options?: any) => string;
    }
}
