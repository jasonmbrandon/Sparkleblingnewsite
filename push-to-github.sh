#!/bin/bash
cd /home/team/shared/website
git init
git remote add origin https://github.com/jasonmbrandon/Sparkleblingnewsite.git 2>/dev/null
git add -A
git commit -m "Initial commit - Sparkle & Bling website with Hero, Services, Gallery, Ceramic Coating pages"
git branch -M main
git push -u origin main --force 2>&1
echo "PUSH_EXIT_CODE: $?"
