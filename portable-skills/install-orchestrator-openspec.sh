#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SKILL_NAME="orchestrator-openspec"
PACKAGE_DIR="$SCRIPT_DIR/$SKILL_NAME"

usage() {
  cat <<'EOF'
Usage:
  ./portable-skills/install-orchestrator-openspec.sh [--global]
  ./portable-skills/install-orchestrator-openspec.sh --project /path/to/repo

Options:
  --global         Install to ${CODEX_HOME:-$HOME/.codex}/skills (default)
  --project PATH   Install to PATH/.claude/skills
EOF
}

TARGET_MODE="global"
PROJECT_PATH=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --global)
      TARGET_MODE="global"
      shift
      ;;
    --project)
      TARGET_MODE="project"
      PROJECT_PATH="${2:-}"
      if [[ -z "$PROJECT_PATH" ]]; then
        echo "error: --project requires a path" >&2
        exit 1
      fi
      shift 2
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "error: unknown argument: $1" >&2
      usage >&2
      exit 1
      ;;
  esac
done

if [[ ! -d "$PACKAGE_DIR" ]]; then
  echo "error: skill package not found at $PACKAGE_DIR" >&2
  exit 1
fi

if [[ "$TARGET_MODE" == "global" ]]; then
  CODEX_HOME_DIR="${CODEX_HOME:-$HOME/.codex}"
  TARGET_DIR="$CODEX_HOME_DIR/skills/$SKILL_NAME"
else
  TARGET_DIR="$PROJECT_PATH/.claude/skills/$SKILL_NAME"
fi

mkdir -p "$(dirname "$TARGET_DIR")"
rm -rf "$TARGET_DIR"
cp -R "$PACKAGE_DIR" "$TARGET_DIR"

echo "Installed $SKILL_NAME to $TARGET_DIR"

if [[ "$TARGET_MODE" == "project" ]]; then
  if command -v openspec >/dev/null 2>&1; then
    echo "Detected openspec CLI."
    if [[ -d "$PROJECT_PATH/openspec" ]]; then
      echo "OpenSpec appears to be initialized in $PROJECT_PATH."
    else
      echo "OpenSpec is not initialized in $PROJECT_PATH."
      echo "Next run in that project:"
      echo "  cd \"$PROJECT_PATH\""
      echo "  openspec init"
      echo "  openspec artifact-experimental-setup"
      echo "  openspec update"
    fi
  else
    echo "openspec CLI not found."
    echo "Before using this skill in that project, install OpenSpec and run:"
    echo "  cd \"$PROJECT_PATH\""
    echo "  openspec init"
    echo "  openspec artifact-experimental-setup"
    echo "  openspec update"
  fi
fi
