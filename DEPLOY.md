# 🚀 Quick Deployment to Vercel

## Option 1: One-Click Deploy (Easiest)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/jkfirm)

---

## Option 2: Deploy via CLI (5 minutes)

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Login
```bash
vercel login
```

### 3. Deploy
```bash
# Windows
.\deploy.ps1

# Linux/Mac
./deploy.sh
```

Or manually:
```bash
vercel --prod
```

### 4. Set Environment Variables
```bash
vercel env add MONGODB_URI production
# Paste your MongoDB connection string

vercel env add NODE_ENV production
# Enter: production
```

---

## Option 3: Deploy via GitHub (Automated)

### 1. Push to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Import to Vercel
1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Git Repository"
3. Select your repo
4. Add environment variables:
   - `MONGODB_URI`: Your MongoDB connection
   - `NODE_ENV`: production
5. Click "Deploy"

---

## ⚙️ Environment Variables Required

| Variable | Value | Where to Get |
|----------|-------|--------------|
| `MONGODB_URI` | `mongodb+srv://...` | Copy from `.env` file |
| `NODE_ENV` | `production` | Just type "production" |

---

## ✅ Verify Deployment

After deployment, test:
- [ ] Frontend loads: `https://your-app.vercel.app`
- [ ] Login works
- [ ] Can create invoices
- [ ] PDF generation works
- [ ] Data saves to MongoDB

---

## 📖 Full Documentation

See [VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md) for detailed instructions.

---

## 🐛 Troubleshooting

**Build fails?**
```bash
npm run build  # Test locally first
```

**API not working?**
- Check environment variables in Vercel dashboard
- Verify MongoDB connection string
- Add `0.0.0.0/0` to MongoDB Atlas IP whitelist

**Need help?**
- Read [VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md)
- Visit [Vercel Documentation](https://vercel.com/docs)

---

**Your app will be live in under 5 minutes!** ⚡
