#!/usr/bin/env bash
set -euo pipefail

# Upload the static site to the remote host; remove stale files on target (rsync --delete)
SRC_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEST_HOST="thr@gateway"
DEST_PATH="/var/www/html/maier"

echo "Syncing site from ${SRC_DIR} to ${DEST_HOST}:${DEST_PATH} (deleting removed files)..."
rsync -avz --delete --info=progress2 \
	--exclude='.git*' \
	--exclude='deploy.sh' \
	"${SRC_DIR}/" "${DEST_HOST}:${DEST_PATH}/"

echo "Done."
