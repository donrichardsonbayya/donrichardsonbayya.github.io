# Azure Static Web Apps Deployment Guide

## Prerequisites Checklist ✅

Before deploying, ensure you have:

- [ ] **Azure Account** (free tier is sufficient)
- [ ] **GitHub Account** (you already have this)
- [ ] **Visual Studio Code** installed
- [ ] **Azure Static Web Apps extension** for VS Code installed

## Step-by-Step Deployment Process

### 1. Install Azure Static Web Apps Extension

If you haven't already:
1. Open Visual Studio Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "Azure Static Web Apps"
4. Install the extension by Microsoft

### 2. Sign In to Azure and GitHub

1. In VS Code, click the Azure logo in the Activity Bar (left sidebar)
2. Sign in to both Azure and GitHub when prompted

### 3. Create Azure Static Web App

1. In VS Code, press `F1` to open the command palette
2. Type "Azure Static Web Apps: Create Static Web App"
3. Follow the prompts:
   - **Select Azure subscription**: Choose your subscription
   - **Enter a name for the new Static Web App**: `donrichardsonbayya-portfolio`
   - **Select a resource group**: Create new or select existing
   - **Select a location**: Choose closest to your users
   - **Select the source code location**: `/` (root directory)
   - **Select the build location**: Leave empty (static site)
   - **Select the output location**: Leave empty (static site)

### 4. Update URLs After Deployment

After deployment, Azure will provide you with a URL like:
`https://donrichardsonbayya-portfolio.azurestaticapps.net`

Replace `YOUR_AZURE_STATIC_WEB_APP_URL` in these files with your actual URL:
- `index.html` (lines 29, 46, 47, 53, 62)
- `package.json` (line 24)
- `_config.yml` (line 15)

### 5. Enable GitHub Actions

When prompted by GitHub:
1. Click "Allow" to enable GitHub Actions
2. This will automatically trigger the first deployment

### 6. Verify Deployment

1. Check the Actions tab in your GitHub repository
2. Wait for the deployment to complete
3. Visit your Azure Static Web App URL
4. Test all functionality (navigation, projects, contact links)

## Benefits of Azure Static Web Apps

- **Better Performance**: Global CDN and edge caching
- **Custom Domains**: Easy to add your own domain
- **Authentication**: Built-in authentication if needed
- **API Integration**: Easy to add Azure Functions
- **Preview Environments**: Automatic staging for pull requests
- **Better Analytics**: Built-in analytics and monitoring

## Troubleshooting

### Common Issues:

1. **Deployment Fails**: Check GitHub Actions logs
2. **Assets Not Loading**: Verify `staticwebapp.config.json` configuration
3. **404 Errors**: Check routing configuration in `staticwebapp.config.json`

### Getting Help:

- Azure Static Web Apps Documentation: https://docs.microsoft.com/en-us/azure/static-web-apps/
- GitHub Actions Logs: Check the Actions tab in your repository

## Next Steps

After successful deployment:
1. Update all URLs with your actual Azure Static Web Apps URL
2. Test the site thoroughly
3. Consider adding a custom domain
4. Set up monitoring and analytics
5. Configure any additional Azure services you might need

## Cost

Azure Static Web Apps offers:
- **Free Tier**: 100GB bandwidth, 0.5GB storage per month
- **Standard Tier**: $9/month for additional bandwidth and features

For a portfolio site, the free tier should be more than sufficient.
