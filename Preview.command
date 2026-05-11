#!/bin/bash
# Double-click this file in Finder to start a local preview server.
# It runs python3's built-in http server on port 5173 and opens the
# site in your default browser. Press Ctrl+C in the Terminal window
# to stop the server.

cd "$(dirname "$0")" || exit 1

PORT=5173
URL="http://localhost:${PORT}/index.html"

echo ""
echo "  Starting preview server at: ${URL}"
echo "  Press Ctrl+C in this window to stop."
echo ""

# Open browser shortly after the server is up
( sleep 1 ; open "${URL}" ) &

python3 -m http.server "${PORT}"
