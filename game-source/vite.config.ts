import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const projectRoot=fileURLToPath(new URL('.',import.meta.url));
const publicRoot=fileURLToPath(new URL(existsSync(fileURLToPath(new URL('../site/index.html',import.meta.url)))?'../site/':'../',import.meta.url));
const runtimeSource=fileURLToPath(new URL('./fracture/core/runtime.ts',import.meta.url)).replaceAll('\\','/');

export default defineConfig({
  root: publicRoot,
  base: './',
  server: { fs: { allow: [projectRoot,publicRoot] } },
  plugins: [{
    name: 'fracture-development-entry',
    apply: 'serve',
    configureServer(server){
      server.middlewares.use((request,response,next)=>{
        if(request.url?.split('?')[0]!=='/games/fracture/assets/runtime.js'){next();return;}
        response.setHeader('Content-Type','text/javascript');
        response.end(`export { launchGame } from ${JSON.stringify('/@fs/'+runtimeSource)};`);
      });
    }
  }],
  build: {
    target: 'es2022',
    outDir: resolve(publicRoot, 'games/fracture/assets'),
    emptyOutDir: false,
    sourcemap: false,
    minify: true,
    lib: {
      entry: fileURLToPath(new URL('./fracture/core/runtime.ts', import.meta.url)),
      formats: ['es'],
      fileName: () => 'runtime.js'
    },
    rolldownOptions: {
      output: {
        chunkFileNames: '[name]-[hash].js',
        codeSplitting: { groups: [
          { name:'three',test:/node_modules[\\/]three[\\/]/ },
          { name:'physics',test:/node_modules[\\/]@dimforge[\\/]rapier3d-compat[\\/]/ }
        ] }
      }
    }
  }
});
