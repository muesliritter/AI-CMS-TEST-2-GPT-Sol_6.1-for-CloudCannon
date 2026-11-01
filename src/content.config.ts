import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
const bilingual=z.object({en:z.string(),de:z.string()});
const category=defineCollection({loader:glob({pattern:'*.json',base:'./src/content/categories'}),schema:z.object({
 slug:z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),title:bilingual,nav_title:bilingual,intro:bilingual,eyebrow:bilingual,status:z.enum(['active','coming-soon']),order:z.number(),
 rating_criteria:z.array(z.object({id:z.string(),label:bilingual,kind:z.enum(['text','score']),maximum:z.number().positive()})),tags:z.array(z.object({id:z.string(),label:bilingual})),
 sections:z.array(z.object({_component:z.literal('guide/place'),id:z.string(),name:z.string(),quarter:bilingual,specialty:bilingual,tags:z.array(z.string()),placeholder:z.boolean(),website:z.string(),maps:z.string(),ratings:z.array(z.object({criterion:z.string(),score:z.number().nullable(),text:bilingual})),gallery:z.array(z.object({image:z.string(),alt:bilingual,kind:z.string(),source_url:z.string(),credit:z.string(),rights_status:z.enum(['unverified','cleared','owned']),publish:z.boolean()}))}))
})});
export const collections={categories:category};
