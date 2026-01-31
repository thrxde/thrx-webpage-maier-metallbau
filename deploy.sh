#!/usr/bin/env bash
set -euo pipefail

# Upload the static site to the remote host. Prefer rsync (keeps target clean with --delete),
# fall back to scp when rsync is missing on the remote.
SRC_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEST_HOST="thr@gateway"
DEST_PATH="/var/www/html/maier"

RSYNC_CMD=(
	rsync -avz --delete --info=progress2
	--exclude='.git*'
	--exclude='deploy.sh'
	"${SRC_DIR}/"
	"${DEST_HOST}:${DEST_PATH}/"
)

echo "Checking for rsync locally and on ${DEST_HOST}..."
if command -v rsync >/dev/null 2>&1 && ssh -o BatchMode=yes "${DEST_HOST}" "command -v rsync >/dev/null 2>&1"; then
	echo "Syncing site from ${SRC_DIR} to ${DEST_HOST}:${DEST_PATH} (rsync --delete)..."
	"${RSYNC_CMD[@]}"
else
	echo "rsync not available on remote; falling back to scp (no delete on target)."
	ssh -o BatchMode=yes "${DEST_HOST}" "mkdir -p '${DEST_PATH}'"
	scp -r \
		"${SRC_DIR}/index.html" \
		"${SRC_DIR}/assets" \
		"${SRC_DIR}/pages" \
		"${DEST_HOST}:${DEST_PATH}/"
	echo "Done (scp fallback). Stale files on remote will remain until removed manually."
	exit 0
fi

echo "Done."
