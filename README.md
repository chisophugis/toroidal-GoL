# Conway's Game of Life with toroidal topology

Usually GoL is done on an infinite world. I'm interested in exploring how
the usual GoL changes when done with a fixed size grid with toroidal
topology (that's just a fancy way of saying that when you go off one side
you appear on the other, like in Asteroids).

## Findings

I didn't find any qualitatively different behavior vs. the infinite world
version. The biggest difference is that you don't end up with anything
"shooting off into nowhere" (e.g. gliders), since they always wrap around.
Eventually, everything settles down into into still-life's. Often, the
end-game is that almost the entire board is still-life's, but you end up
with e.g. a single rogue glider which collides with the still lifes,
resulting in localized "festering" (possibly growing quite larger, or
shooting off other gliders).

## Another observation

My more general observation (which I suppose applies to non-toroidal GoL as
well) is that generally almost every pattern is "unstable" in GoL.
Almost any randomly generated pattern is unstable and "decays" into more
stable shapes.
These more stable shapes are almost always smaller, since the
likelihood that e.g. a 3x3 pattern is stable is *much* higher than, say, a
5x5 pattern; I haven't rigorously proven this but I suspect that the
probability that a randomly generated pattern will be stable decays at
least exponentially with the region size.
By "stable" I mean anything that has a recognizable continuity to its
existence, like a still-life, oscillator, or spaceship.

This same sort of thing seems to mostly be true in the real world (where
the "game" is governed by the laws of physics). There are relatively few
ways to arrange one million protons and electrons that is stable over time;
atoms are one way to do so. If atoms are the gliders/block's/blinker's
(common "stable" GoL patterns) of our world, I wonder what the equivalent
of the more sophisticated fine-tuned patterns are (google for gemini,
caterpillar, or check out <http://youtu.be/D6aP9S9rEQk>).

One significant difference between GoL and physics is that GoL doesn't
appear to have any conservation laws (which are an absolutely fundamental
thing in physics).

Anyway, thinking about parallels between GoL and physics is a really good
way to get inspiration about either one (or even a more general sort of
inspiration). One could probably spend a lifetime pondering this.
