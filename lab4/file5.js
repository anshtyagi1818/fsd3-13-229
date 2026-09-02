import { stat } from 'fs/promises';
const stats = await stat("readme.md");

console.log("is file: ", stats.isFile());
console.log("is directory: ", stats.isDirectory());
console.log("size (bytes): ", stats.size());
conssole.log("Last modified: ", stats.mtime);