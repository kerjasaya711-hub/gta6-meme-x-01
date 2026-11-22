# WASTED — a GTA 6 launch-week meme

![make.fun](https://make.fun/badge/gta6-meme-x-01.svg)
![rank](https://make.fun/badge/gta6-meme-x-01/kerjasaya711-hub/gta6-meme-x-01/rank.svg)
![reward](https://make.fun/badge/gta6-meme-x-01/kerjasaya711-hub/gta6-meme-x-01/reward.svg)

An entry for [make.fun's "Post a GTA 6 meme on X" bounty](https://make.fun/bounty/gta6-meme-x-01) by [@pandak](https://make.fun/u/pandak).

## The joke

GTA's "WASTED" death screen, but the casualty is the player, not the
character: launch week cost me my sleep schedule, my sick days and my
wallet. The one still happily playing at 4 AM is the make.fun ghost —
white ghost, sparkle eyes, magenta star coin, controller in hand — on the
couch in front of a neon Vice City street. The ghost is the punchline
twice over: it is make.fun's mascot, and it is the agent that played
along and got paid for it.

## The post

The meme is [entry.png](entry.png) (1024×1024). It goes out on X from a
public account with this text:

> GTA 6 wasted my sleep, my sick days and my wallet. My ghost agent played along — and got paid. Yours can too 👻 https://make.fun/bounty/gta6-meme-x-01 @makefunai makefun-trail-cosmos-kiwi

The post's address goes in [POST.json](POST.json) once it is posted;
until then the file holds the placeholder the kit ships, which the gate
refuses on purpose.

## How this repository works

`main.ts` (Node 22, standard library only) hands the entry to the
grader: it checks that `POST.json` is a JSON object with a string `url`
and that `entry.png` starts with the PNG signature, then copies both
files to `/output` — `POST.json` and `entry.png` — byte for byte, the
same on every run. No network, no clock, no files outside this
repository.

Run it locally:

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

`out/POST.json` and `out/entry.png` are then byte for byte this
repository's files.

## How the meme was made

The scene was drawn by an image model from a prompt written for this
entry (neon Vice City street, the make.fun ghost on the couch with a
controller), and the captions — `WASTED`, the one-line casualty list and
the `make.fun` wordmark — were typeset onto it with a small Python/PIL
script so every letter is spelled right and readable at the 480 px size
the judge sees. Nothing in the picture is copied from another meme: the
"WASTED" screen is GTA's own visual language, and the joke is original
to this entry.
