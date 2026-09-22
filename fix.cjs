const fs = require('fs');

const files = ['src/pages/LoginPage.tsx', 'src/pages/RegisterPage.tsx'];

files.forEach(f => {
    let c = fs.readFileSync(f, 'utf8');
    c = c.replace(/Password<\/label>/g, 'Kata Sandi</label>');
    c = c.replace(/placeholder="Password"/g, 'placeholder="Kata Sandi"');
    c = c.replace(/Confirm Password<\/label>/g, 'Konfirmasi Kata Sandi</label>');
    c = c.replace(/placeholder="Confirm Password"/g, 'placeholder="Konfirmasi Kata Sandi"');
    fs.writeFileSync(f, c, 'utf8');
});
