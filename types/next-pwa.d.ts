declare module 'next-pwa' {
    import { NextConfig } from 'next'
    
    function withPWA(config?: {
        dest?: string
        register?: boolean
        skipWaiting?: boolean
    }): (config: NextConfig) => NextConfig

    export default withPWA
} 