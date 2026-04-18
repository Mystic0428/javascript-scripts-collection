# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository purpose

Collection of standalone browser / Node.js scripts. Each script lives under `scripts/<script-name>/` with its own `README.md` and source file. Top-level `README.md` is the index.

Current scripts:

- `scripts/bahamut-anime-gif-capture/bahamut-anime-gif-capture.js` — Tampermonkey userscript that adds a GIF-clip + screenshot tool to the Bahamut Anime (動畫瘋) video player. Distributed via [Greasy Fork script 525239](https://greasyfork.org/zh-TW/scripts/525239).

There is **no build, no bundler, no tests, no package manager**. Each `.js` file is the shipping artifact — users install it directly through Tampermonkey (for userscripts) or run it directly (for Node.js scripts).

## Adding a new script

1. Create `scripts/<script-name>/` with the source file and a `README.md` describing usage.
2. Add a row to the appropriate category table in the top-level `README.md`.

## Shipping a change to the Bahamut userscript

1. Edit `scripts/bahamut-anime-gif-capture/bahamut-anime-gif-capture.js`.
2. Bump the `// @version` line in the UserScript metadata block (top of file). Greasy Fork's auto-update for end users will not trigger without a version bump, even if the source changes.
3. Commit. Commit messages in this repo are Traditional Chinese with a conventional-commits-ish prefix (`feat:` / `fix:` / `chore:`), often using the fullwidth colon `：`. Match the existing style.
4. Upload/update on Greasy Fork manually — there is no CI or automated publish step. The `@downloadURL` / `@updateURL` in the header point to Greasy Fork, not this GitHub repo.

To test locally: load the file into Tampermonkey (Create new script → paste) and open any episode at `https://ani.gamer.com.tw/animeVideo.php?sn=*`.

## Architecture of the Bahamut userscript

The whole script is one IIFE in `scripts/bahamut-anime-gif-capture/bahamut-anime-gif-capture.js`. Understanding these integration points matters more than the file layout:

**Host-page contracts (will break if Bahamut changes their DOM):**
- `#ani_video_html5_api` — the HTML5 `<video>` element. Every capture path looks it up by this id.
- `.control-bar-rightbtn` — player toolbar. The "GIF" button is injected here on `window.onload`. If it's missing, the popup can still be opened via Shift+G, but the toolbar button won't exist.
- `.video-adHandler-background-blocker` — when present, `showPopup()` no-ops so the tool doesn't fight the ad overlay.

**Runtime dependency:**
- `gif.js@0.2.0` is `fetch`-loaded from jsDelivr at init time, plus its worker script is downloaded as a Blob and used via `URL.createObjectURL`. No offline fallback. If the CDN call fails, GIF generation never initializes but screenshot still works.

**GIF encoder pool:**
- On load, four `GIF` instances are pre-created and stored in `window.gifList` (a `Map` keyed by **width in pixels**: 1920 / 1280 / 960 / 640, corresponding to 1080p / 720p / 540p / 360p). Frame capture picks the encoder matching `metadata.width` of the actual video frame. If the video reports an unsupported width, capture aborts with a toast — add a new entry to `videoResolutions` if supporting a new size.
- After each render, the used encoder is `abort()`-ed and its `frames` array is emptied so it can be reused.

**Frame capture loop (`captureFrames`):**
- Uses `video.requestVideoFrameCallback` rather than `requestAnimationFrame` so every decoded frame is captured.
- Slows playback to `playbackRate = 0.3` and mutes audio during capture to reduce dropped frames. These are restored in `generateGif()` — if you add an early-return path in capture, make sure it also restores `playbackRate = 1` and `muted = false`, otherwise the player stays slowed/muted.
- Per-frame `metadata.mediaTime` deltas are collected in `frameDisplayDurations`, then averaged and written back as each frame's `delay` before `gif.render()` — this is what makes the output GIF play at the correct speed despite the 0.3x capture rate.

**Concurrency guards:** `gifRenderingInProgress` and `isParsing` block overlapping runs and prevent the popup from closing mid-capture. Any new entry point that kicks off capture or rendering should check both.

**Keyboard shortcuts** (handled by a single global `keydown` listener, suppressed while typing in inputs):
- `Shift+G` — open popup
- `Ctrl+Shift+S` — instant screenshot (independent of popup)
- `Esc` — close popup (ignored while parsing)

**UI text and comments are Traditional Chinese.** Keep new user-facing strings in Traditional Chinese to match. `showToast(msg, type, duration)` is the standard notification helper — types are `success` / `error` / `warning`.
