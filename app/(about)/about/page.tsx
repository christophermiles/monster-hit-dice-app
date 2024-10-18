export default function About() {
  return (
    <>
      <h1 className="heading-1">What is this?</h1>

      <p>
        This Monster Hit Dice App takes a Hit Dice expression (that’s a fancy
        way of saying ‘number of Hit Dice of a certain Hit Dice type plus
        modifiers’) and generates Hit Point values ranging between{' '}
        <strong>minimum</strong>, <strong>weak</strong>,{' '}
        <strong>average</strong>, <strong>strong</strong> and{' '}
        <strong>maximum</strong> &mdash; with weak being halfway between minimum
        and average, and strong being halfway between average and maximum.
      </p>

      <h2>But why?</h2>

      <p>
        Using a creature’s average Hit Points works just fine for most Dungeons
        &amp; Dragons combats.
      </p>
      <p>
        But sometimes you might want to give your{' '}
        <abbr title="Big Bad Evil Guy">BBEG 😈</abbr> the maximum possible Hit
        Points for their creature type (because you gave the party too many
        magic items or let them have too many feats) and you don’t want to do
        the maths yourself.
      </p>
      <p>
        Maybe you’re using multiple creatures of the same type in a battle, but
        you want to mix things up a bit. Maybe you want some of your kobolds to
        be even weaker than average &mdash; but you want <em>some</em> of them
        to be <strong>💪KOBOLD CHAD™💪s</strong>.
      </p>
      <p>
        Or maybe you just want to tweak a creature’s Hit Points mid-battle.
        Sacrilege? Heresy? The most condemnable example of referee fiat
        imaginable? Well,{' '}
        <a
          href="https://slyflourish.com/tweaking_monster_hit_points.html"
          className="link"
          rel="nofollow"
          target="_blank"
        >
          here’s Mike Shea at Sly Flourish with some perfectly valid reasons why
          we might want to do this
        </a>
        !
      </p>
    </>
  )
}
