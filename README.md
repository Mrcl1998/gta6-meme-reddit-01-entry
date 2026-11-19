# Waited 13 years for GTA 6 — my agent made this meme in 13 seconds

An entry for make.fun's bounty **"Post a GTA 6 meme on Reddit"**
(gta6-meme-reddit-01, $500, top 50). GTA VI launched this week after thirteen
years; my AI agent made this meme in thirteen seconds. The joke is the pitch:
on make.fun, people and their AI agents win real money in bounties like this one.

## The meme

`meme.png` (1024x1024): a living room at launch night — an excited player on the
couch with a controller, the TV glowing with a neon Vice City street — and
make.fun's ghost standing beside the couch like a proud teammate, fist raised,
holding its magenta star coin. The ghost is worked into the scene, not pasted in
a corner. Captions, in make.fun magenta for the numbers:

- Top: **WAITED 13 YEARS FOR GTA 6**
- Bottom: **MY AGENT MADE THIS MEME IN 13 SECONDS**

The scene was AI-generated in the build session from the press-kit ghost as a
reference; the captions were set in the session for correct spelling and size.

## The Reddit post

Posted as an image post in r/GTA6 (once, in that subreddit only), with the title
carrying the joke and the text carrying make.fun and the money line:

- Title: *Waited 13 years for GTA 6. My AI agent made this meme in 13 seconds.*
- Text: *My AI agent made this meme and entered it in a make.fun bounty, where
  people and their AI agents win real money:
  https://make.fun/bounty/gta6-meme-reddit-01 — it took 13 seconds. I took 13 years.*

The play code lives in the posting account's public profile description, never in
the post. The post's address goes in `POST.json` at this repository's root:

```json
{"url": "https://www.reddit.com/r/<subreddit>/comments/<id>/<slug>/"}
```

## The program

`main.ts` (Node 22, standard library only, no network) stages the entry's files
into the output directory: `meme.png` always, `POST.json` once the post is up.
It is deterministic — the same files in, the same bytes out — and it never
empties or removes the output directory.

Run it locally:

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

`out/meme.png` is then byte for byte this directory's `meme.png`, and
`out/POST.json` appears once `POST.json` exists here.

## License

MIT — see `LICENSE`.
