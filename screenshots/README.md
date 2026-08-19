# App Screenshots

The "See It In Action" carousel in `index.html` shows these images. Slide order is set by
the markup, not by filename:

| Order | File | Caption on the page |
|-------|------|---------------------|
| 1 | `05-screenshot.jpg` | Your Daily Home |
| 2 | `04-screenshot.jpg` | Pick Your Side |
| 3 | `02-screenshot.jpg` | Lock In Your Vote |
| 4 | `03-screenshot.jpg` | Vote Confirmed |
| 5 | `06-screenshot.jpg` | Explore Past Polls |
| 6 | `07-screenshot.jpg` | Full Results Breakdown |

All of them are 738 × 1599 device captures. `.phone-screen` in `styles-index2.css` uses that
same aspect ratio so the frames show the full screenshot without cropping — if you swap in
images with a different shape, update the `aspect-ratio` there to match.

Adding, removing, or reordering a slide means editing the carousel markup in `index.html`;
the navigation dots are generated from the number of slides, so they keep themselves in sync.
