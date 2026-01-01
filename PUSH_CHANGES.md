# Instructions to Push Changes to GitHub

## Step 1: Configure Git (if not already done)
```bash
git config --global user.name "EpicEbic"
git config --global user.email "your-email@example.com"
```

## Step 2: Check current status
```bash
git status
```

## Step 3: Stage all changes
```bash
git add .
```

## Step 4: Commit the changes
```bash
git commit -m "The Characteristics & Coils Update: Implement archetype system, update character stats, reintroduce Coils of Power, rename Equipment to Objects"
```

## Step 5: Set up remote (if not already configured)
```bash
git remote add origin https://github.com/EpicEbic/robloxthelore.git
```

Or if it already exists:
```bash
git remote set-url origin https://github.com/EpicEbic/robloxthelore.git
```

## Step 6: Push to GitHub
```bash
git push origin main
```

When prompted for credentials:
- Username: EpicEbic
- Password: Use your GitHub Personal Access Token (the token you provided)

## Alternative: Using Token in URL (one-time)
If you want to avoid entering credentials each time, you can use:
```bash
git push https://EpicEbic:YOUR_TOKEN@github.com/EpicEbic/robloxthelore.git main
```

**Note:** Replace `YOUR_TOKEN` with your actual token. This method embeds the token in the command, so be careful not to share your command history.

## Recommended: Use Git Credential Manager
For better security, use Git Credential Manager:
```bash
git config --global credential.helper manager-core
```

Then when you push, it will securely store your credentials.

