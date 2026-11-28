#!/usr/bin/env bash
set -euo pipefail

# 客户线索离线加密/权限保护备份脚本（仅归档，不删除现网活跃线索）
LEADS_DIR="${LEADS_DIR:-./data/leads}"
BACKUP_DIR="${BACKUP_DIR:-./data/backups}"
RETENTION_DAYS="${RETENTION_DAYS:-180}"

if [ ! -d "$LEADS_DIR" ]; then
  echo "No leads directory found at $LEADS_DIR"
  exit 0
fi

mkdir -p "$BACKUP_DIR"
chmod 700 "$LEADS_DIR" "$BACKUP_DIR"

STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
ARCHIVE_PATH="$BACKUP_DIR/leads-$STAMP.tar.gz"

umask 077
tar -czf "$ARCHIVE_PATH" -C "$LEADS_DIR" .
chmod 600 "$ARCHIVE_PATH"

echo "Backup created: $ARCHIVE_PATH (retention policy: ${RETENTION_DAYS} days)"
