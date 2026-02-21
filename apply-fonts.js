const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src', 'components');

function replaceHeaders(dir) {
    fs.readdir(dir, (err, files) => {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        files.forEach((file) => {
            const filePath = path.join(dir, file);
            if (fs.statSync(filePath).isDirectory()) {
                replaceHeaders(filePath);
            } else if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
                let content = fs.readFileSync(filePath, 'utf8');
                let changed = false;

                // Regex to find className attributes in h1, h2, h3, h4 tags
                const regex = /<(h[1-4])\s+([^>]*?)className=["']([^"']*)["']/g;
                content = content.replace(regex, (match, tag, beforeClass, currentClasses) => {
                    if (!currentClasses.includes('font-heading')) {
                        changed = true;
                        // Replace 'font-bold' or 'font-extrabold' or 'font-black' with 'font-heading' 
                        // Or just add font-heading if not replacing those precisely
                        let newClasses = currentClasses
                            .replace(/\bfont-(bold|extrabold|black)\b/g, '')
                            .replace(/\s+/g, ' ')
                            .trim() + ' font-heading';
                        return `<${tag} ${beforeClass}className="${newClasses}"`;
                    }
                    return match;
                });

                if (changed) {
                    fs.writeFileSync(filePath, content, 'utf8');
                    console.log(`Updated classes in ${file}`);
                }
            }
        });
    });
}

replaceHeaders(directoryPath);
