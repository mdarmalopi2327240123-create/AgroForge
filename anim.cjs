const fs = require('fs');

function animateMarketplace() {
    let c = fs.readFileSync('src/pages/MarketplacePage.tsx', 'utf8');
    if (!c.includes('framer-motion')) {
        c = c.replace("import { useState, useMemo } from 'react';", "import { useState, useMemo } from 'react';\nimport { motion } from 'framer-motion';");
        c = c.replace('<div className="flex flex-col lg:flex-row gap-8">', '<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, staggerChildren: 0.1 }} className="flex flex-col lg:flex-row gap-8">');
        c = c.replace(/<div key=\{product\.id\}/g, '<motion.div key={product.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}');
        
        // closing div for the motion.div we opened above
        c = c.replace('</div>\n    </div>\n  );', '</motion.div>\n    </div>\n  );');
        
        // replace the closing div of product card
        c = c.replace('            </button>\n          </div>\n        </div>', '            </button>\n          </div>\n        </motion.div>');
        fs.writeFileSync('src/pages/MarketplacePage.tsx', c);
    }
}

function animateLogin() {
    let c = fs.readFileSync('src/pages/LoginPage.tsx', 'utf8');
    if (!c.includes('framer-motion')) {
        c = c.replace("import { useState } from 'react';", "import { useState } from 'react';\nimport { motion } from 'framer-motion';");
        c = c.replace('<div className="w-full max-w-md p-8 bg-card rounded-2xl shadow-sm border border-border">', '<motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.4 }} className="w-full max-w-md p-8 bg-card rounded-2xl shadow-sm border border-border">');
        c = c.replace('</form>\n      </div>\n    </div>', '</form>\n      </motion.div>\n    </div>');
        fs.writeFileSync('src/pages/LoginPage.tsx', c);
    }
}

function animateRegister() {
    let c = fs.readFileSync('src/pages/RegisterPage.tsx', 'utf8');
    if (!c.includes('framer-motion')) {
        c = c.replace("import { useState } from 'react';", "import { useState } from 'react';\nimport { motion } from 'framer-motion';");
        c = c.replace('<div className="w-full max-w-md p-8 bg-card rounded-2xl shadow-sm border border-border">', '<motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.4 }} className="w-full max-w-md p-8 bg-card rounded-2xl shadow-sm border border-border">');
        c = c.replace('</form>\n      </div>\n    </div>', '</form>\n      </motion.div>\n    </div>');
        fs.writeFileSync('src/pages/RegisterPage.tsx', c);
    }
}

function fixImages() {
    let c = fs.readFileSync('src/data/products.ts', 'utf8');
    // replace any unsplash image with picsum
    // https://images.unsplash.com/... to https://picsum.photos/seed/P00X/700/480
    
    let pid = 1;
    c = c.replace(/imageUrl: 'https:\/\/images\.unsplash\.com[^']+'/g, () => {
        let replacement = `imageUrl: 'https://picsum.photos/seed/AGRO${pid}/700/480'`;
        pid++;
        return replacement;
    });
    fs.writeFileSync('src/data/products.ts', c);
}

try { animateMarketplace(); } catch(e) { console.error('marketplace error', e); }
try { animateLogin(); } catch(e) { console.error('login error', e); }
try { animateRegister(); } catch(e) { console.error('register error', e); }
try { fixImages(); } catch(e) { console.error('images error', e); }

console.log("Done");
