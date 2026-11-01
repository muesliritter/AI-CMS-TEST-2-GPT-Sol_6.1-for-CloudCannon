import fs from 'node:fs';
import assert from 'node:assert/strict';
import yaml from 'js-yaml';
const root=new URL('../',import.meta.url);
const path=(s)=>new URL(s,root);
const read=(s)=>JSON.parse(fs.readFileSync(path(s),'utf8'));
const files=fs.readdirSync(path('src/content/categories')).filter(f=>f.endsWith('.json'));
const slugs=new Set();let places=0,photos=0;
for(const file of files){
 const c=read('src/content/categories/'+file);assert(!slugs.has(c.slug),`Duplicate category slug: ${c.slug}`);slugs.add(c.slug);
 const tagIds=c.tags.map(t=>t.id),criterionIds=c.rating_criteria.map(r=>r.id);assert.equal(new Set(tagIds).size,tagIds.length,`${c.slug}: duplicate tag IDs`);assert.equal(new Set(criterionIds).size,criterionIds.length,`${c.slug}: duplicate rating IDs`);
 for(const x of [c.title,c.nav_title,c.intro,...c.tags.map(t=>t.label),...c.rating_criteria.map(r=>r.label)])assert(x.en&&x.de,`${c.slug}: missing translation`);
 const ids=new Set();
 for(const p of c.sections){
  assert(!ids.has(p.id),`${c.slug}: duplicate place ID`);ids.add(p.id);if(!p.placeholder)places++;
  for(const tag of p.tags)assert(tagIds.includes(tag),`${p.name}: unknown tag ${tag}`);
  for(const r of p.ratings){const crit=c.rating_criteria.find(x=>x.id===r.criterion);assert(crit,`${p.name}: unknown criterion ${r.criterion}`);assert(r.score===null||(r.score>=0&&r.score<=crit.maximum),`${p.name}: score out of range`);}
  if(!p.placeholder)assert(p.gallery.some(g=>g.publish),`${p.name}: missing photo`);
  for(const g of p.gallery){photos++;assert(g.image.startsWith('/images/'),`${p.name}: image must be local`);assert(fs.existsSync(path('public'+g.image)),`${p.name}: missing image ${g.image}`);assert(g.alt.en&&g.alt.de,`${p.name}: missing alt text`);assert(g.source_url.startsWith('https://'),`${p.name}: missing source`);}
 }
}
const config=yaml.load(fs.readFileSync(path('cloudcannon.config.yml'),'utf8'));assert(config.collections_config.categories);assert(config._structures.photos);assert(config._structures.places);const s=read('src/guide/settings.json');assert(fs.existsSync(path('public'+s.hero_image)),'Missing hero');
console.log(`Validated ${files.length} categories, ${places} places, ${photos} photos, bilingual text, references, scores and CMS configuration.`);
