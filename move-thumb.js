const fs = require('fs');
const path = require('path');

const src = "C:\\Users\\AMAN YATAN\\.gemini\\antigravity\\brain\\268f45a7-7b4f-487f-81b1-a097e4a47701\\cloud_project_hero_1775146055605.png";
const dest = "public/cloud-project.png";

try {
    fs.copyFileSync(src, dest);
    console.log('File successfully copied to public/cloud-project.png');
} catch (err) {
    console.error('Error copying file:', err);
}
