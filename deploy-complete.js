#!/usr/bin/env node

/**
 * Gate 7 Coffee Roastery - Complete Deployment Script
 * Handles:
 * 1. SEO validation
 * 2. Production build
 * 3. Git deployment
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const DIST_DIR = path.join(__dirname, 'dist');

// Color codes for console output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    cyan: '\x1b[36m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    red: '\x1b[31m'
};

function log(level, message) {
    const timestamp = new Date().toLocaleTimeString();
    const prefix = {
        info: `${colors.cyan}ℹ${colors.reset}`,
        success: `${colors.green}✓${colors.reset}`,
        warning: `${colors.yellow}⚠${colors.reset}`,
        error: `${colors.red}✗${colors.reset}`
    }[level] || '';
    
    console.log(`${prefix} [${timestamp}] ${message}`);
}

async function executeCommand(command, description) {
    try {
        log('info', description);
        execSync(command, { stdio: 'inherit' });
        log('success', `Completed: ${description}`);
        return true;
    } catch (error) {
        log('error', `Failed: ${description}`);
        throw error;
    }
}

async function deploy() {
    console.log(`\n${colors.bright}${colors.cyan}🚀 Gate 7 Coffee Roastery - Complete Deployment${colors.reset}\n`);
    
    try {
        // Step 1: SEO Validation & Build
        log('info', '====== STEP 1: Building with SEO Validation ======');
        await executeCommand(
            'npm run build:seo',
            'Building production bundle with SEO validation'
        );
        
        // Step 2: Copy static assets
        log('info', '====== STEP 2: Copying Static Assets ======');
        const staticFiles = ['CNAME', 'robots.txt', 'sitemap.xml', '.htaccess'];
        for (const file of staticFiles) {
            const src = path.join(__dirname, file);
            const dest = path.join(DIST_DIR, file);
            if (fs.existsSync(src)) {
                fs.copyFileSync(src, dest);
                log('success', `Copied: ${file}`);
            }
        }
        
        // Step 3: Verify build output
        log('info', '====== STEP 3: Verifying Build Output ======');
        const distFiles = fs.readdirSync(DIST_DIR);
        if (distFiles.length === 0) {
            throw new Error('Build failed: dist directory is empty');
        }
        log('success', `Verified ${distFiles.length} files in dist directory`);
        
        // Step 4: Git deployment
        log('info', '====== STEP 4: Committing & Pushing to GitHub ======');
        
        // Check git status
        try {
            execSync('git status --porcelain', { stdio: 'pipe' });
        } catch (e) {
            throw new Error('Not a git repository or git is not installed');
        }
        
        // Stage dist directory
        log('info', 'Staging dist directory...');
        execSync('git add dist -f', { stdio: 'inherit' });
        
        // Check if there are changes to commit
        const hasChanges = execSync('git diff --cached --quiet', { stdio: 'pipe' })
            .toString() === '';
        
        if (!hasChanges) {
            const commitMsg = `chore: production build with SEO validation & responsive images (${new Date().toISOString()})`;
            log('info', `Creating git commit: "${commitMsg}"`);
            execSync(`git commit -m "${commitMsg}"`, { stdio: 'inherit' });
        } else {
            log('warning', 'No changes to commit');
        }
        
        // Push to repository
        const branch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();
        log('info', `Pushing to origin/${branch}...`);
        execSync(`git push origin ${branch}`, { stdio: 'inherit' });
        
        // Success!
        console.log(`\n${colors.bright}${colors.green}✅ Deployment Complete!${colors.reset}`);
        console.log(`${colors.green}🎉 Site is live at: https://gate7.vn${colors.reset}\n`);
        
        // Summary
        console.log(`${colors.bright}Deployment Summary:${colors.reset}`);
        console.log(`  ✓ SEO validation passed`);
        console.log(`  ✓ Production build completed`);
        console.log(`  ✓ Static assets copied`);
        console.log(`  ✓ Committed to Git`);
        console.log(`  ✓ Pushed to GitHub (${branch})\n`);
        
    } catch (error) {
        console.error(`\n${colors.red}${colors.bright}❌ Deployment Failed!${colors.reset}`);
        console.error(`${colors.red}${error.message}${colors.reset}\n`);
        process.exit(1);
    }
}

// Run deployment
deploy();
