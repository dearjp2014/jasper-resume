import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({plugins:[react()],base:'/jasper-resume/about/',build:{outDir:'../about',emptyOutDir:true}});
