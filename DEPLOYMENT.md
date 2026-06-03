# Deployment Guide

This document outlines the steps required to deploy the "Second Operator" website to Vercel, which is the easiest and most optimized platform for Vite/React applications.

## Prerequisites

1. **GitHub Account**: Your code is already pushed to GitHub (`https://github.com/AKASHDHARDUBEY/SECONDOPERATOR`).
2. **Vercel Account**: You need an account on [Vercel](https://vercel.com). You can sign up using your GitHub account.

## Step-by-Step Deployment Instructions

### Method 1: Deploy via Vercel Dashboard (Recommended)

This is the easiest method and enables automatic deployments every time you push to the `main` branch.

1. **Log in to Vercel**: Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
2. **Add New Project**: Click the **"Add New..."** button and select **"Project"**.
3. **Import Repository**: 
   - You will see a list of your GitHub repositories. 
   - Find `SECONDOPERATOR` and click **"Import"**.
4. **Configure Project**:
   - **Project Name**: `secondoperator` (or any name you prefer).
   - **Framework Preset**: Vercel will automatically detect **Vite**. Leave this as is.
   - **Root Directory**: Leave it as `./` (the root).
   - **Build and Output Settings**: Vercel automatically sets the build command (`npm run build`) and output directory (`dist`). You don't need to change anything here.
5. **Deploy**: Click the **"Deploy"** button.
6. **Wait for Build**: Vercel will now clone your repo, install dependencies, build the Vite app, and assign it a live URL.
7. **Done!**: Once finished, Vercel will show a success screen with your live domains (e.g., `secondoperator.vercel.app`).

---

### Method 2: Deploy via Vercel CLI

If you prefer deploying directly from your terminal:

1. **Install Vercel CLI**:
   Open your terminal and run:
   ```bash
   npm install -g vercel
   ```
2. **Login to Vercel**:
   ```bash
   vercel login
   ```
   (Follow the prompts in your browser to authenticate)
3. **Deploy from Project Folder**:
   Navigate to your project directory (if not already there):
   ```bash
   cd /Users/akashdhardubey/Downloads/aiml/secondOperator
   ```
   Then run:
   ```bash
   vercel
   ```
4. **Answer the Prompts**:
   - Set up and deploy? `Y`
   - Which scope? (Select your account)
   - Link to existing project? `N`
   - What's your project's name? `secondoperator`
   - In which directory is your code located? `./`
   - Want to modify these settings? `N`
5. **Production Deployment**:
   To push to production (instead of a preview environment), run:
   ```bash
   vercel --prod
   ```

## Custom Domains

If you own a custom domain (like the `secondoperator.in` mentioned in the project):
1. Go to your Vercel Project Dashboard.
2. Navigate to **Settings** > **Domains**.
3. Enter your domain name and click **Add**.
4. Vercel will provide you with the DNS records (A Record or CNAME) that you need to add to your domain registrar (e.g., GoDaddy, Namecheap) to connect it.
