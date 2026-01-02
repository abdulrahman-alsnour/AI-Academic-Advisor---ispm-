# GitHub Pages Deployment Guide

## Step-by-Step Instructions

### Step 1: Enable GitHub Pages in Repository Settings

1. Go to your repository on GitHub: https://github.com/abdulrahman-alsnour/AI-Academic-Advisor---ispm-
2. Click on **Settings** (top navigation bar)
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select:
   - **Source**: `GitHub Actions`
5. Click **Save**

### Step 2: Push the Configuration Files

The following files have been configured:
- `vite.config.ts` - Updated with base path for GitHub Pages
- `.github/workflows/deploy.yml` - GitHub Actions workflow for automatic deployment

### Step 3: Commit and Push

```bash
git add .
git commit -m "Configure for GitHub Pages deployment"
git push origin main
```

### Step 4: Wait for Deployment

1. Go to the **Actions** tab in your GitHub repository
2. You'll see a workflow running called "Deploy to GitHub Pages"
3. Wait for it to complete (usually 2-3 minutes)
4. Once it's done, you'll see a green checkmark

### Step 5: Access Your Live Site

Your site will be available at:
**https://abdulrahman-alsnour.github.io/AI-Academic-Advisor---ispm-/**

### Troubleshooting

- If the workflow fails, check the **Actions** tab for error messages
- Make sure GitHub Pages is enabled in Settings > Pages
- The first deployment might take a few minutes
- If routes don't work, the 404.html file should handle client-side routing

### Automatic Updates

Every time you push to the `main` branch, GitHub Actions will automatically:
1. Build your project
2. Deploy it to GitHub Pages
3. Your site will update within a few minutes

