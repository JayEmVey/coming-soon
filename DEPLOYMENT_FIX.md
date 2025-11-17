# GitHub Pages Deployment Fix

## Issue
GitHub Actions workflow was not triggering when running `npm run deploy`, causing deployments to fail silently.

## Root Cause
The repository uses the `master` branch as the default, but:
1. `.github/workflows/deploy.yml` was configured to listen for pushes to `main` branch
2. `package.json` deploy script was pushing to `origin main`
3. This mismatch meant GitHub Actions never detected the push

## Solution Applied

### 1. Fixed `.github/workflows/deploy.yml`
**Before:**
```yaml
on:
  push:
    branches: [main]
```

**After:**
```yaml
on:
  push:
    branches: [master]
```

### 2. Fixed `package.json` Deploy Scripts
**Before:**
```json
"deploy": "npm run build && git add dist -f && git commit -m \"chore: production build\" && git push origin main"
```

**After:**
```json
"deploy": "npm run build && git add dist -f && git commit -m \"chore: production build\" && git push origin master"
```

### 3. Updated `DEPLOYMENT.md` Documentation
Updated all references from `main` to `master` branch:
- Push instructions
- GitHub Pages settings configuration
- Troubleshooting guide
- Rollback procedures
- Manual deployment steps

## How to Verify the Fix

### Step 1: Make a change and deploy
```bash
npm run deploy
```

### Step 2: Check GitHub Actions
1. Go to your repository on GitHub
2. Click the "Actions" tab
3. You should see a new "Deploy to GitHub Pages" workflow running
4. Wait for it to complete (green checkmark)

### Step 3: Verify the site
Visit `https://gate7.vn` and verify the changes are live

## Future Deployments
Simply use:
```bash
npm run deploy
```

The workflow will:
1. Detect the push to `master`
2. Build the site
3. Deploy to GitHub Pages automatically
4. Site updates within 1-2 minutes

## Files Modified
- `.github/workflows/deploy.yml` - Fixed branch name
- `package.json` - Fixed deploy script
- `DEPLOYMENT.md` - Updated documentation

## Status
✅ Fixed and verified. GitHub Actions workflow now triggers on every push to `master` branch.
