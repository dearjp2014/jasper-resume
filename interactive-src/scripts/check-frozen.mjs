import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
const source=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const root=path.resolve(source,'..');
const hashes=JSON.parse(fs.readFileSync(path.join(source,'frozen-files.json'),'utf8'));
const sha=buffer=>crypto.createHash('sha256').update(buffer).digest('hex');
for(const [file,expected] of Object.entries(hashes)){
 if(sha(fs.readFileSync(path.join(root,file)))!==expected)throw Error('Frozen file changed: '+file);
}
const pdfHash=hashes['output/pdf/Jasper_商业化产品负责人.pdf'];
for(const file of ['public/files/Jasper-resume.pdf','../about/files/Jasper-resume.pdf']){
 if(sha(fs.readFileSync(path.resolve(source,file)))!==pdfHash)throw Error('PDF copy mismatch: '+file);
}
console.log('Passed: frozen resume/entry files and both downloadable PDF copies.');
