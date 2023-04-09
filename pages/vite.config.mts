import {defineConfig} from 'vite'
import reactPlugin from '@vitejs/plugin-react';
import babelPlugin from "vite-plugin-babel";
import { nodePolyfills } from 'vite-plugin-node-polyfills'


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        babelPlugin({
            babelConfig: {
                babelrc: false,
                configFile: false,
                plugins: []
            }
        }),
        reactPlugin(),
        nodePolyfills({
            protocolImports: true,
        })
    ],
    define: {
        'process.env': {}
    },
})
