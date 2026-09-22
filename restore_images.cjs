const fs = require('fs');

const origUrls = [
  'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=700&h=480&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1530267981375-f0de937f5f13?w=700&h=480&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=700&h=480&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=700&h=480&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1594771804886-a933bb2d609b?w=700&h=480&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=700&h=480&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&h=480&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=700&h=480&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1553413077-190dd305871c?w=700&h=480&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=700&h=480&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=700&h=480&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=700&h=480&fit=crop&auto=format'
];

let c = fs.readFileSync('src/data/products.ts', 'utf8');

let index = 0;
c = c.replace(/imageUrl: 'https:\/\/picsum\.photos[^']+'/g, () => {
    let rep = `imageUrl: '${origUrls[index]}'`;
    index++;
    return rep;
});

fs.writeFileSync('src/data/products.ts', c);
console.log('Restored original images.');
