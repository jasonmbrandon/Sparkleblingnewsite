#!/bin/bash
set -e
cd /home/team/shared/website

# Init git if not already
if [ ! -d .git ]; then
  git init
  git remote add origin https://github.com/jasonmbrandon/Sparkleblingnewsite.git
fi

# Configure git
git config user.name "Sparkle & Bling Dev"
git config user.email "dev@sparkleblingdetailing.com"

# Add and commit
git add -A
git commit --allow-empty -m "Sparkle & Bling website - complete deployment

Includes: Hero, Service Showcase, Services & Pricing, 
Gallery (with before/after sliders), Ceramic Coating page,
Blog, Quote form, Navigation, and all designer assets"

git branch -M main

# Push using token from environment
git push https://x-access-token:${GH_TOKEN}@github.com/jasonmbrandon/Sparkleblingnewsite.git main --force 2>&1

echo "PUSH_COMPLETE_EXIT:$?"