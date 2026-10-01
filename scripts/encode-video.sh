#!/usr/bin/env bash
# Encode every master listed in src/data/work.js into public/video/work/,
# plus the home page background.
#
# Why this exists: the masters are a mix of 4K HEVC, 4K H.264 and QuickTime
# .mov — none of which is safe to put straight on a page. Firefox cannot play
# HEVC at all, no browser reliably plays .mov, and 4K at full bitrate is many
# times heavier than a muted loop needs.
#
# Produces per clip: H.264 MP4 (universal) + VP9 WebM (smaller), 1080p, silent.
#
# Usage: ./scripts/encode-video.sh [--home-only|--work-only]

set -uo pipefail

OUT="public/video/work"
mkdir -p "$OUT"

command -v ffmpeg >/dev/null || { echo "ffmpeg not installed — run: brew install ffmpeg" >&2; exit 1; }

encode() {
  local src="$1" slug="$2" dest="$3"
  if [ ! -f "$src" ]; then
    echo "  !! missing master: $src"
    return 1
  fi
  echo "==> $slug"
  ffmpeg -nostdin -y -loglevel error -i "$src" \
    -an -c:v libx264 -preset slow -crf 30 -pix_fmt yuv420p \
    -g 60 -vf "scale='min(1440,iw)':-2" -movflags +faststart "$dest/$slug.mp4" || return 1
  ffmpeg -nostdin -y -loglevel error -i "$src" \
    -an -c:v libvpx-vp9 -crf 40 -b:v 0 -row-mt 1 -pix_fmt yuv420p \
    -g 60 -vf "scale='min(1440,iw)':-2" "$dest/$slug.webm" || return 1

  # VP9 does not always win. On some material it came out larger than H.264,
  # in which case serving it costs bandwidth instead of saving it.
  if [ "$(stat -f%z "$dest/$slug.webm")" -ge "$(stat -f%z "$dest/$slug.mp4")" ]; then
    echo "    (webm larger than mp4 — dropped)"
    rm -f "$dest/$slug.webm"
  fi
  printf "    %s  mp4 %s / webm %s\n" "$slug" \
    "$(du -h "$dest/$slug.mp4" | cut -f1)" "$(du -h "$dest/$slug.webm" | cut -f1)"
}

MODE="${1:-all}"

# --- home background ---
if [ "$MODE" != "--work-only" ]; then
  HOME_SRC="$HOME/Desktop/Farah/HIGHGRADESITE/farahwebsitehomepage.mp4"
  mkdir -p public/video
  encode "$HOME_SRC" "home" "public/video"
  ffmpeg -nostdin -y -loglevel error -i "$HOME_SRC" -ss 00:00:02 -frames:v 1 \
    -vf "scale='min(1920,iw)':-2" -q:v 4 "public/video/home-poster.jpg"
fi

# --- work clips: slug + source path read straight out of the data file ---
if [ "$MODE" != "--home-only" ]; then
  node -e "
    import('./src/data/work.js').then(m => {
      m.artDirection.forEach(i => console.log(i.slug + '\t' + i.src));
    });
  " | while IFS=$'\t' read -r slug src; do
      [ -n "$slug" ] && encode "$src" "$slug" "$OUT"
    done
fi

echo
echo "==> Totals"
du -sh public/video 2>/dev/null
