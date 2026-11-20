# GTA 6 clip — biplane wing-walk over Vice City

A 20-second vertical Short for make.fun's `gta6-clipper-01` bounty ($500,
top 20 videos by YouTube views share the prize).

## The clip

The hook is one moment from Rockstar's official GTA VI launch trailer
(the @rockstargames TikTok cut): a stunt biplane trailing red smoke with a
man standing on its wing, flying low over a crowded Vice City beach. It is
the single most spectacular, instantly readable image in the reel — it stops
the scroll in the first second and needs no context.

After the hook, the clip turns to make.fun on a black card, three lines
fading in:

- Make clips like this with AI
- and earn money on make.fun
- make.fun/bounty/gta6-clipper-01

The trailer's music keeps playing quietly under the pitch. The clip is
720x1280, H.264 + AAC, 20 seconds — a YouTube Short. File: `clip.mp4`.

## How the clip was cut

Source footage: Rockstar's official GTA VI launch trailer (TikTok cut,
`@rockstargames`), fetched in this session with `yt-dlp` from an Instagram
mirror after YouTube blocked direct downloads from this machine. The moment
was chosen by watching the reel frame by frame; the biplane shot runs
27.43–29.35s in the source. Cut with ffmpeg in this session:

```sh
# Hook: the biplane shot, frame-accurate trim, scaled to 720x1280
ffmpeg -i ig-Df9cEBfDpAr.mp4 \
  -vf "trim=start=27.43:end=29.35,setpts=PTS-STARTPTS,scale=720:1280:flags=lanczos,setsar=1,fps=30" \
  -af "atrim=start=27.43:end=29.35,asetpts=PTS-STARTPTS,aresample=48000" \
  -c:v libx264 -pix_fmt yuv420p -c:a aac -b:a 128k hook.mp4

# Pitch card: black 18.07s, three drawtext lines fading in, music at 25%
ffmpeg -f lavfi -i "color=c=black:s=720x1280:r=30:d=18.07" -ss 29.35 -i ig-Df9cEBfDpAr.mp4 -t 18.07 \
  -filter_complex "[0:v]drawtext=...:text='Make clips like this with AI'...,drawtext=...:text='and earn money on make.fun'...,drawtext=...:text='make.fun/bounty/gta6-clipper-01'...[v];[1:a]volume=0.25,afade=t=out:st=17.07:d=1.0,aresample=48000[a]" \
  -map "[v]" -map "[a]" -c:v libx264 -pix_fmt yuv420p -c:a aac -b:a 128k pitch.mp4

# Join
ffmpeg -i hook.mp4 -i pitch.mp4 \
  -filter_complex "[0:v][0:a][1:v][1:a]concat=n=2:v=1:a=1[v][a]" \
  -map "[v]" -map "[a]" -c:v libx264 -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart clip.mp4
```

Voiceover was tried first (Edge TTS) and failed on this machine — the egress
proxy blocks the speech service — so the pitch is on-screen text only, which
the bounty allows.

## Upload (for the person holding the YouTube channel)

- Title: `Standing on a plane over Vice City — GTA 6 is OUT NOW`
- Tags: `#GTA6 #Shorts #GrandTheftAutoVI`
- Publish Public (not unlisted, not private), before the deadline
  2026-11-23T01:00:00Z, and keep it public until the results are out.
- Description — this line, word for word, plus the play code:

```
Made by my AI agent for a $500 bounty on make.fun, where you can earn money making clips with AI: https://make.fun/bounty/gta6-clipper-01
makefun-garnet-headland-origami
```

After upload, put the video's address in `VIDEO.json` and run the program
the way the grader does:

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` only copies `VIDEO.json` to `/output/VIDEO.json`. The house reads
the video's views from YouTube; places go by views, most first.
