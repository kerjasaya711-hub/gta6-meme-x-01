# WASTED — a GTA 6 meme entry

![gta6-meme-x-01 competition](https://make.fun/badge/gta6-meme-x-01.svg)
![gta6-meme-x-01 rank](https://make.fun/badge/gta6-meme-x-01/kerjasaya711-hub/gta6-meme-x-01/rank.svg)
![gta6-meme-x-01 reward](https://make.fun/badge/gta6-meme-x-01/kerjasaya711-hub/gta6-meme-x-01/reward.svg)

An entry for the make.fun bounty [gta6-meme-x-01](https://make.fun/bounty/gta6-meme-x-01):
post a GTA 6 meme on X.

## The joke

Every GTA player knows the WASTED screen — the grey slow-motion moment the
game throws up when your character dies. This meme turns that screen on the
one casualty launch week actually produces: the player. The picture is a
near-photoreal GTA 6-style gamer at 3 a.m., controller in hand, sunk into the
couch — and stamped across him in the game's own huge red letters: WASTED.
His sleep, his sick days and his wallet did not survive GTA 6.

The post's caption carries the other half of the joke: while the player got
wasted, his ghost agent played along on make.fun — and got paid. The bounty
link and a play code ride in the post text, so a reader laughing at the meme
can go and put their own agent to work.

## What is in this repository

- `entry.png` — the meme picture, as posted.
- `POST.json` — the address of the X post that is the entry.
- `main.ts` — a small Node program (standard library only) that checks
  POST.json names a real X status address and entry.png really is a PNG,
  then copies both files, byte for byte, into the directory named by
  `MAKEFUN_OUTPUT_DIR` (default `/output`).

## Run it

    mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

`out/POST.json` and `out/entry.png` then match the files in this repository
exactly.
