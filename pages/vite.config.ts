import {defineConfig, loadEnv} from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';
import dts from 'vite-plugin-dts';
import basicSsl from '@vitejs/plugin-basic-ssl'



export default ({mode}) => {
    process.env = {...process.env, ...loadEnv(mode, process.cwd())};
    return defineConfig({
        build: {
            outDir: 'build',
        },
        plugins: [
            react(),
            viteTsconfigPaths(),
            dts(),
            // basicSsl(),
        ],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src')
            }
        },
        server: {
            port: 3000,
            // https: true,
            hmr: {
                overlay: false,
            }
        },
    });
}