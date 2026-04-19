import 'zone.js/testing';
import 'node';

// 👇 ESTA PARTE ES CLAVE
const context = (require as any).context('./', true, /\.spec\.ts$/);
context.keys().forEach(context);