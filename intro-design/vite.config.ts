import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({plugins:[react()],base:'/jasper-resume/design/',build:{outDir:'../design',emptyOutDir:true}});
