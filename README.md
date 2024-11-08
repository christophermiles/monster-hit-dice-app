# Monster Hit Dice

An app for generating a range of Hit Point values from Dungeons &amp; Dragons Hit Dice expressions.

---

## Wait, what is this?

This Monster Hit Dice web app takes a Hit Dice expression (that’s a fancy way of saying ‘number of Hit Dice of a certain Hit Dice type plus modifiers’) and generates Hit Point values ranging between **minimum**, **weak**, **average**, **strong** and **maximum** &mdash; with weak being halfway between minimum and average, and strong being halfway between average and maximum.

### But why?

Using a creature’s average Hit Points works just fine for most Dungeons & Dragons combats.

But sometimes you might want to give your <abbr title="Big Bad Evil Guy 😈">BBEG</abbr> the maximum possible Hit Points for their creature type and you don’t want to do the maths yourself.

Maybe you’re using multiple creatures of the same type in a battle, but you want to mix things up a bit. Like, maybe you want some of your kobolds to be even weaker than average &mdash; but you want *one* of them to be a **💪KOBOLD CHAD™💪**.

Or maybe you just want to tweak a creature’s Hit Points mid-battle. Sacrilege? Heresy? The most condemnable example of referee fiat one could possibly imagine? Well, [here’s Mike Shea at Sly Flourish with some perfectly valid reasons why we might want to do this](https://slyflourish.com/tweaking_monster_hit_points.html)!

---

## Code

### Monster Hit Dice API

A public API for calculating Hit Point values from Hit Dice expressions is available at [api.monsterhitdice.app](https://api.monsterhitdice.app)

For example:

```shell
  curl --request GET \<br />
  --url
  &#39;https://api.monsterhitdice.app/hp?hd=2d8-2&hd=2d8+6&hd=8d10+40&hd=33d20+330&#39;
```

Or try it from your browser: [api.monsterhitdice.app/hp?hd=2d8-2&hd=2d8+6&hd=8d10+40&hd=33d20+330](https://api.monsterhitdice.app/hp?hd=2d8-2&hd=2d8+6&hd=8d10+40&hd=33d20+330)

For full documentation, visit [api.monsterhitdice.app/docs](https://api.monsterhitdice.app/docs)

### NPM package

This Monster Hit Dice web app and the Monster Hit Dice API both use the [**roll-hit-dice** NPM package](https://www.npmjs.com/package/roll-hit-dice).

---

## Local Development

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000)