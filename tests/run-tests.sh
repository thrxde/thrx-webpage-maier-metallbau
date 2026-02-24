#!/bin/bash
# Maier Metallbau - Automated Test Suite
# Run: ./tests/run-tests.sh

cd "$(dirname "$0")/.."

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

PASS=0
FAIL=0

pass() { echo -e "${GREEN}✓${NC} $1"; PASS=$((PASS+1)); }
fail() { echo -e "${RED}✗${NC} $1"; FAIL=$((FAIL+1)); }
warn() { echo -e "${YELLOW}!${NC} $1"; }

echo "================================"
echo "Maier Metallbau Test Suite"
echo "================================"
echo ""

# --- File Structure Tests ---
echo "## File Structure"

[ -f "index.html" ] && pass "index.html exists" || fail "index.html missing"
[ -f "includes/header.html" ] && pass "includes/header.html exists" || fail "includes/header.html missing"
[ -f "includes/footer.html" ] && pass "includes/footer.html exists" || fail "includes/footer.html missing"
[ -f "data/messages.json" ] && pass "data/messages.json exists" || fail "data/messages.json missing"
[ -d "assets/fonts" ] && pass "assets/fonts/ exists" || fail "assets/fonts/ missing"
[ -f "assets/js/main.js" ] && pass "assets/js/main.js exists" || fail "assets/js/main.js missing"

echo ""

# --- DSGVO Compliance Tests ---
echo "## DSGVO Compliance"

# Check for Google Fonts in HTML files
if grep -rq "fonts.googleapis.com\|fonts.gstatic.com" --include="*.html" .; then
  fail "Google Fonts links found in HTML (DSGVO violation)"
else
  pass "No Google Fonts links in HTML"
fi

# Check for tracking scripts
if grep -rqE "google-analytics|gtag|fbq|hotjar|analytics" --include="*.html" --include="*.js" .; then
  fail "Tracking scripts detected"
else
  pass "No tracking scripts found"
fi

# Check for cookies in JS
if grep -rqE "document\.cookie\s*=" --include="*.js" .; then
  fail "Cookie setting detected in JS"
else
  pass "No cookie setting in JS"
fi

# Check Impressum exists with required content
if [ -f "pages/impressum.html" ]; then
  if grep -q "§ 5 TMG\|Angaben gemäß" pages/impressum.html; then
    pass "Impressum has legal notice"
  else
    fail "Impressum missing § 5 TMG reference"
  fi
else
  fail "Impressum page missing"
fi

# Check Datenschutz exists
if [ -f "pages/datenschutz.html" ]; then
  if grep -q "DSGVO\|Datenschutz" pages/datenschutz.html; then
    pass "Datenschutz page has DSGVO reference"
  else
    fail "Datenschutz missing DSGVO reference"
  fi
else
  fail "Datenschutz page missing"
fi

echo ""

# --- Includes System Tests ---
echo "## Includes System"

# Check main.js has includes loader
if grep -q "includes/header.html\|includes/footer.html" assets/js/main.js 2>/dev/null; then
  pass "main.js loads includes"
else
  fail "main.js missing includes loader"
fi

# Check pages have include placeholders
for page in index.html pages/*.html; do
  if [ -f "$page" ]; then
    if grep -q 'id="header"\|id="site-header"' "$page"; then
      pass "$page has header placeholder"
    else
      warn "$page might have inline header (check manually)"
    fi
  fi
done

echo ""

# --- Messages System Tests ---
echo "## Messages System"

if [ -f "data/messages.json" ]; then
  # Validate JSON
  if python3 -c "import json; json.load(open('data/messages.json'))" 2>/dev/null; then
    pass "messages.json is valid JSON"
  else
    fail "messages.json is invalid JSON"
  fi
  
  # Check structure
  if python3 -c "import json; d=json.load(open('data/messages.json')); assert 'announcement' in d and 'opening_hours' in d" 2>/dev/null; then
    pass "messages.json has required fields"
  else
    fail "messages.json missing announcement or opening_hours"
  fi
else
  fail "messages.json not found"
fi

echo ""

# --- Font Tests ---
echo "## Self-hosted Fonts"

if [ -d "assets/fonts" ] && ls assets/fonts/*.woff2 1>/dev/null 2>&1; then
  pass "Manrope font files present"
else
  fail "No .woff2 font files in assets/fonts/"
fi

if grep -q "@font-face" assets/css/style.css 2>/dev/null; then
  pass "@font-face declaration in CSS"
else
  fail "No @font-face in style.css"
fi

echo ""

# --- Summary ---
echo "================================"
echo "Results: ${GREEN}$PASS passed${NC}, ${RED}$FAIL failed${NC}"
echo "================================"

[ $FAIL -eq 0 ] && exit 0 || exit 1
