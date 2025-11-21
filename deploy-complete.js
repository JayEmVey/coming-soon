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
        // Step 1: Verify git status
        log('info', '====== STEP 1: Verifying Git Status ======');
        
        // Check git status
        try {
            execSync('git status --porcelain', { stdio: 'pipe' });
        } catch (e) {
            throw new Error('Not a git repository or git is not installed');
        }
        
        // Step 2: Get current branch
        log('info', '====== STEP 2: Pushing to GitHub ======');
        const branch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();
        log('success', `Current branch: ${branch}`);
        
        // Check for uncommitted changes
        const status = execSync('git status --porcelain', { encoding: 'utf8' });
        if (status.trim().length > 0) {
            log('error', 'Uncommitted changes detected. Please commit all changes first.');
            log('info', 'Uncommitted files:');
            console.log(status);
            throw new Error('Cannot deploy with uncommitted changes');
        }
        
        // Push to repository
        log('info', `Pushing source to origin/${branch}...`);
        execSync(`git push origin ${branch}`, { stdio: 'inherit' });
        
        // Success!
        console.log(`\n${colors.bright}${colors.green}✅ Push Complete!${colors.reset}`);
        console.log(`${colors.green}🚀 GitHub Actions workflow triggered automatically${colors.reset}`);
        console.log(`${colors.green}🎉 Check: https://github.com/JayEmVey/gate7/actions${colors.reset}\n`);
        
        // Summary
        console.log(`${colors.bright}Deployment Summary:${colors.reset}`);
        console.log(`  ✓ Source pushed to origin/${branch}`);
        console.log(`  ✓ GitHub Actions workflow triggered`);
        console.log(`  ✓ Build and SEO validation running on GitHub`);
        console.log(`  ✓ Deployment to gh-pages in progress`);
        console.log(`  ✓ Site will be live at: https://gate7.vn\n`);
        
    } catch (error) {
        console.error(`\n${colors.red}${colors.bright}❌ Deployment Failed!${colors.reset}`);
        console.error(`${colors.red}${error.message}${colors.reset}\n`);
        process.exit(1);
    }
}

// Run deployment
deploy();
