const fs = require('fs');
const path = require('path');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.component.ts') && !fullPath.includes('app.component.ts')) {
            refactorComponent(fullPath);
        }
    }
}

function refactorComponent(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    const templateMatch = content.match(/template:\s*`([\s\S]*?)`,/);
    let htmlPath = filePath.replace('.ts', '.html');
    let hasTemplate = false;
    
    if (templateMatch) {
        fs.writeFileSync(htmlPath, templateMatch[1].trim(), 'utf8');
        const fileName = path.basename(htmlPath);
        content = content.replace(templateMatch[0], "templateUrl: './" + fileName + "',");
        hasTemplate = true;
    }

    const stylesMatch = content.match(/styles:\s*\[\s*`([\s\S]*?)`\s*\]/);
    let scssPath = filePath.replace('.ts', '.scss');
    let hasStyles = false;
    
    if (stylesMatch) {
        fs.writeFileSync(scssPath, stylesMatch[1].trim(), 'utf8');
        const fileName = path.basename(scssPath);
        content = content.replace(stylesMatch[0], "styleUrl: './" + fileName + "'");
        hasStyles = true;
    } else {
        fs.writeFileSync(scssPath, '', 'utf8');
        const fileName = path.basename(scssPath);
        content = content.replace(/changeDetection:/, "styleUrl: './" + fileName + "',\n  changeDetection:");
        hasStyles = true;
    }

    if (hasTemplate || hasStyles) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log("Refactored " + path.basename(filePath));
    }
}

processDir(path.join(__dirname, 'src', 'app'));
console.log('Finished refactoring components.');
