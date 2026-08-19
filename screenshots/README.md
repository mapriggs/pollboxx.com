# App Screenshots

The "See It In Action" carousel in `index.html` shows every image in this folder, in
filename order:

| File | Caption on the page |
|------|---------------------|
| `01-screenshot.jpg` | Question of the Day |
| `02-screenshot.jpg` | Lock In Your Vote |
| `03-screenshot.jpg` | Vote Confirmed |
| `04-screenshot.jpg` | Pick Your Side |
| `05-screenshot.jpg` | Your Daily Home |
| `06-screenshot.jpg` | Explore Past Polls |
| `07-screenshot.jpg` | Full Results Breakdown |

All seven are 738 × 1599 device captures. `.phone-screen` in `styles-index2.css` uses that
same aspect ratio so the frames show the full screenshot without cropping — if you swap in
images with a different shape, update the `aspect-ratio` there to match.

Adding or removing a slide means editing the carousel markup in `index.html`; the
navigation dots are generated from the number of slides, so they keep themselves in sync.
