import { defineConfig } from 'astro/config';
import editableRegions from '@cloudcannon/editable-regions/astro-integration';
export default defineConfig({ output: 'static', trailingSlash: 'always', integrations: [editableRegions()], devToolbar:{enabled:false} });
