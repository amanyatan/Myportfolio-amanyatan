const fs = require('fs');
const path = require('path');

const src = "C:\\Users\\AMAN YATAN\\.gemini\\antigravity\\brain\\268f45a7-7b4f-487f-81b1-a097e4a47701\\cloud_project_hero_1775146055605.png";
const dest = path.resolve(__dirname, "public/cloud-project.png");

console.log('Source:', src);
console.log('Destination:', dest);

try {
    if (!fs.existsSync(src)) {
        console.error('ERROR: Source file does not exist!');
    } else {
        const data = fs.readFileSync(src);
        fs.writeFileSync(dest, data);
        console.log('SUCCESS: File copied manually to', dest);
    }
} catch (err) {
    console.error('CATCH ERROR during manual copy:', err);
}
