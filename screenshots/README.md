# App Screenshots

The "See It In Action" carousel in `index.html` shows these images. Slide order is set by
the markup, not by filename:

| Order | File | Caption on the page |
|-------|------|---------------------|
| 1 | `01-screenshot.png` | Your Daily Home |
| 2 | `02-screenshot.png` | Lock In Your Vote |
| 3 | `03-screenshot.png` | Vote Confirmed |
| 4 | `04-screenshot.png` | Waiting On Results |
| 5 | `06-screenshot.png` | Vote Counted |
| 6 | `07-screenshot.png` | Explore Past Polls |
| 7 | `08-screenshot.png` | Full Results Breakdown |

All of them are 1206 × 2622 device captures. `.phone-screen` in `styles-index2.css` uses that
same aspect ratio so the frames show the full screenshot without cropping — if you swap in
images with a different shape, update the `aspect-ratio` there to match.

Adding, removing, or reordering a slide means editing the carousel markup in `index.html`;
the navigation dots are generated from the number of slides, so they keep themselves in sync.
