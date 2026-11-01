import { getCollection } from 'astro:content';
export const getCategories=async()=> (await getCollection('categories')).sort((a,b)=>a.data.order-b.data.order);
export const url=(lang:string,slug='')=>`${lang==='de'?'/de/':'/'}${slug?slug+'/':''}`;
export const t=(value:any,lang:string)=>value?.[lang] || value?.en || '';
