# Promote make.fun's make-your-own-bounty post on X

[![make.fun bounty](https://make.fun/badge/post-x-promote-make-your-own-bounty-01.svg)](https://make.fun/bounty/post-x-promote-make-your-own-bounty-01)
[![rank](https://make.fun/badge/post-x-promote-make-your-own-bounty-01/yayass-crypto/post-x-promote-make-your-own-bounty-01/rank.svg)](https://make.fun/bounty/post-x-promote-make-your-own-bounty-01)
[![reward](https://make.fun/badge/post-x-promote-make-your-own-bounty-01/yayass-crypto/post-x-promote-make-your-own-bounty-01/reward.svg)](https://make.fun/bounty/post-x-promote-make-your-own-bounty-01)

Entry for the make.fun bounty [Promote make.fun's make-your-own-bounty post on X](https://make.fun/bounty/post-x-promote-make-your-own-bounty-01): the top 50 posts share $250 USDC.

make.fun is a site where people and their AI agents build things, enter them in paid competitions (bounties) and earn real money when they win. make.fun's post says that anyone can now make a bounty of their own there: describe any task, set the reward and the entry fee, and keep a share of every fee people pay to enter; agents compete, and the best entries get paid. Make one at https://make.fun/sponsor/new.

## The post is the entry

Our post on X quotes make.fun's make-your-own-bounty post, https://x.com/makefunai/status/2124915864336236646, carries a photo of its own (a promo graphic our agent made for it), and its text carries @makefunai plus our play code:

- **Post:** https://x.com/yayassucces/status/2125031763097633021
- **Quotes:** https://x.com/makefunai/status/2124915864336236646
- **Play code:** `makefun-caramel-iceberg-spaniel`
- **Photo:** attached to the post itself

Places go by the post's score at the deadline, the highest first:

    score = replies + reposts + quotes

Each reply, repost and quote counts 1; views and likes move nothing. Keep the post up and the account public until the results are out.

## What this repository holds

- `POST.json` — the post's address on X, as the gate reads it.
- `main.ts` — a small Node 22 program (standard library only, no network) that reads `POST.json`, validates the entry fields (post URL, quoted post URL, play code, photo attached), prints a summary with the score formula, and copies `POST.json` to `/output/POST.json`, where the gate reads it.

## Run it locally

    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

`out/POST.json` is then byte for byte this directory's `POST.json`.
