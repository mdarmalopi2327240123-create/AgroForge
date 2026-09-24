const fs = require('fs');

// 1. Fix LandingPage horizontal overflow on mobile
let landing = fs.readFileSync('src/pages/LandingPage.tsx', 'utf8');
landing = landing.replace('absolute -bottom-6 -left-6 bg-card', 'absolute -bottom-4 left-4 sm:-bottom-6 sm:-left-6 bg-card');
fs.writeFileSync('src/pages/LandingPage.tsx', landing);

// 2. Fix Footer padding so it's not hidden behind BottomNav on mobile
let footer = fs.readFileSync('src/components/Footer.tsx', 'utf8');
footer = footer.replace('py-12 mt-16 border-t border-border/10', 'pt-12 pb-24 lg:pb-12 mt-16 border-t border-border/10');
fs.writeFileSync('src/components/Footer.tsx', footer);

console.log('Mobile UI fixed');
