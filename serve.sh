#!/usr/bin/env bash
# Local web server for the Chameleon Ultra web lab.
# Web Serial requires a "secure context" — http://localhost counts as one,
# so no TLS is needed. Open the printed URL in Chrome / Edge.
set -euo pipefail

PORT="${1:-8000}"
cd "$(dirname "$0")"

echo "Chameleon Lab → http://localhost:${PORT}/"
echo "Press Ctrl+C to stop."
exec python3 -m http.server "${PORT}"
