#!/usr/bin/env node

const fs = require('fs');
const readline = require('readline');
const { exec } = require('child_process');
const blacklist = [
    'node_modules',
    'package-lock.json',
    'dist',
    '.env',
]

let inputDir, globalDir;
if (process.env.npm_execpath) {
    if (process.env.npm_execpath.includes('yarn')) {
        globalDir = require('child_process').execSync('yarn global dir').toString().trim();
        inputDir = `${globalDir}/node_modules/create-jeff-frontend/dist`;
    } else if (process.env.npm_execpath.includes('npm')) {
        globalDir = require('child_process').execSync('npm root -g').toString().trim();
        inputDir = `${globalDir}/create-jeff-frontend/dist`;
    }
} else {
    inputDir = './dist';
}

// Recursively copy all files and directories from dist to output
function copyRecursive(src, dest) {
    const files = fs.readdirSync(src);

    for (const file of files) {
        if (blacklist.includes(file)) {
            continue;
        }
        
        const srcPath = `${src}/${file}`;
        const destPath = `${dest}/${file}`;
        const fileStat = fs.statSync(srcPath);

        if (fileStat.isDirectory()) {
            fs.mkdirSync(destPath, { recursive: true });
            copyRecursive(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}

async function main() {
    // Replace {{this_name_will_be_replaced}} with provided app name in package.json
    let appName = await askQuestion('Enter app name: ') || 'app-name';
    appName = appName.replace(/\s+/g, '-').toLowerCase();
    const outputDir = appName;

    // Check if output directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }
    copyRecursive(inputDir, outputDir);

    // rename .env.example to .env
    fs.renameSync(`${outputDir}/.env.example`, `${outputDir}/.env`);

    // Rewrite package name
    let packageJson = fs.readFileSync(`${outputDir}/package.json`, 'utf8');
    packageJson = packageJson.replace('this_name_will_be_replaced', appName);
    fs.writeFileSync(`${outputDir}/package.json`, packageJson);
    
    // Replace {{VITE_STRAPI_REST_ENDPOINT}} in .env file
    let VITE_STRAPI_REST_ENDPOINT = await askQuestion('Strapi backend location (default:http://localhost:1337): ')
    VITE_STRAPI_REST_ENDPOINT = VITE_STRAPI_REST_ENDPOINT || 'http://localhost:1337';
    envFile = fs.readFileSync(`${outputDir}/.env`, 'utf8');
    envFile = envFile.replace('{{VITE_STRAPI_REST_ENDPOINT}}', VITE_STRAPI_REST_ENDPOINT);

    fs.writeFileSync(`${outputDir}/.env`, envFile);

    // rewrite _.gitignore to .gitignore
    fs.renameSync(`${outputDir}/_.gitignore`, `${outputDir}/.gitignore`);
    
    if (process.env.npm_execpath) {
        if (process.env.npm_execpath.includes('yarn')) {
            console.log('Installing dependencies, might take a few minutes')
            exec(`cd ${outputDir} && yarn install`)
        } else if (process.env.npm_execpath.includes('npm')) {
            console.log('Installing dependencies, might take a few minutes')
            exec(`cd ${outputDir} && npm install`)
        }
    } 

    rl.close()
}

main()