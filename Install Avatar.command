#!/bin/bash
# Drag your photo onto this file (or double-click it then drag the photo in
# when prompted) and it'll be copied to avatar.jpg next to index.html.
# After installing, refresh the site and your photo will appear in Contact.

cd "$(dirname "$0")" || exit 1

clear
echo ""
echo "  ─────────────────────────────────────────────────"
echo "   Mahir Nagersheth · Portfolio · Avatar Installer"
echo "  ─────────────────────────────────────────────────"
echo ""

SRC=""

# Path 1: photo was dragged onto this script (passed as $1)
if [ -n "$1" ] && [ -f "$1" ]; then
  SRC="$1"
fi

# Path 2: no drop — ask the user to drag the file in
if [ -z "$SRC" ]; then
  echo "  Drag your headshot from Finder into this Terminal window"
  echo "  then press Enter."
  echo ""
  printf "  Photo: "
  read -r DROPPED
  # Strip quoted/escaped path
  DROPPED="${DROPPED//\'/}"
  DROPPED="${DROPPED//\"/}"
  DROPPED="${DROPPED//\\ / }"
  if [ -f "$DROPPED" ]; then
    SRC="$DROPPED"
  fi
fi

if [ -z "$SRC" ] || [ ! -f "$SRC" ]; then
  echo ""
  echo "  ✗ Couldn't find the file. Try again — drag the image directly into this window."
  echo ""
  read -p "  Press Enter to close." _
  exit 1
fi

# Extension detection — keep the source extension so the JS finds it
EXT="${SRC##*.}"
EXT_LOWER=$(echo "$EXT" | tr '[:upper:]' '[:lower:]')
case "$EXT_LOWER" in
  jpg|jpeg|png|webp) DEST="avatar.${EXT_LOWER}" ;;
  *) DEST="avatar.jpg" ;;
esac

cp "$SRC" "./$DEST"

if [ -f "./$DEST" ]; then
  echo ""
  echo "  ✓ Installed as ./$DEST"
  echo "  Refresh your portfolio and your photo will be in the Contact card."
  echo ""
else
  echo ""
  echo "  ✗ Copy failed."
  echo ""
fi

read -p "  Press Enter to close." _
