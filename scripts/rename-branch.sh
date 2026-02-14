#!/usr/bin/env bash
# Rename a git branch locally and on origin in one step.
# Usage: ./scripts/rename-branch.sh <old-name> <new-name>
set -euo pipefail

# Require exactly two arguments
if [ $# -ne 2 ]; then
  echo "Usage: $(basename "$0") <old-name> <new-name>"
  exit 1
fi

old="$1"
new="$2"

# Rename the local branch (works whether or not it's checked out)
git branch -m "$old" "$new"

# Delete the old branch on origin if it exists
if git ls-remote --exit-code --heads origin "$old" >/dev/null 2>&1; then
  git push origin :"$old"
fi

# Push the new branch and set up tracking
git push -u origin "$new"

echo "Renamed '$old' → '$new' (local + origin)"
