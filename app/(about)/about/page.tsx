import { Metadata } from 'next'

export function generateMetadata(): Metadata {
  return {
    title: 'About',
  }
}

export default function About() {
  return (
    <>
      <h1>What is this?</h1>

      <p>
        This Monster Hit Dice web app takes a Hit Dice expression (that’s a
        fancy way of saying ‘number of Hit Dice of a certain Hit Dice type plus
        modifiers’) and generates Hit Point values ranging between{' '}
        <strong>minimum</strong>, <strong>weak</strong>,{' '}
        <strong>average</strong>, <strong>strong</strong> and{' '}
        <strong>maximum</strong> &mdash; with weak being halfway between minimum
        and average, and strong being halfway between average and maximum.
      </p>

      <h3>But why?</h3>

      <p>
        Using a creature’s average Hit Points works just fine for most Dungeons
        &amp; Dragons combats.
      </p>
      <p>
        But sometimes you might want to give your{' '}
        <abbr title="Big Bad Evil Guy 😈">B.B.E.G.</abbr> the maximum possible
        Hit Points for their creature type and you don’t want to do the maths
        yourself.
      </p>
      <p>
        Maybe you’re using multiple creatures of the same type in a battle, but
        you want to mix things up a bit. Like, maybe you want some of your
        kobolds to be even weaker than average &mdash; but you want <em>one</em>{' '}
        of them to be a <strong>💪KOBOLD CHAD™💪</strong>.
      </p>
      <p>
        Or maybe you just want to tweak a creature’s Hit Points mid-battle.
        Sacrilege? Heresy? The most condemnable example of referee fiat one
        could possibly imagine? Well,{' '}
        <a
          href="https://slyflourish.com/tweaking_monster_hit_points.html"
          className="link"
          target="_blank"
        >
          here’s Mike Shea at Sly Flourish with some perfectly valid reasons why
          we might want to do this
        </a>
        !
      </p>

      <h2>Other goodies</h2>

      <h3>Hit Dice API</h3>

      <p>
        A public API for calculating Hit Point values from Hit Dice expressions
        is available at{' '}
        <a
          href="https://api.monsterhitdice.app"
          target="_blank"
          className="link"
        >
          api.monsterhitdice.app
        </a>
        .
      </p>

      <p>For example:</p>

      <pre className="whitespace-pre-wrap">
        curl --request GET \<br />
        --url
        &#39;https://api.monsterhitdice.app/hp?hd=2d8-2&hd=2d8+6&hd=8d10+40&hd=33d20+330&#39;
      </pre>

      <p>
        Or try it from your browser:{' '}
        <a
          href="https://api.monsterhitdice.app/hp?hd=2d8-2&hd=2d8+6&hd=8d10+40&hd=33d20+330"
          target="_blank"
          className="link"
        >
          api.monsterhitdice.app/hp?hd=2d8-2&hd=2d8+6&hd=8d10+40&hd=33d20+330
        </a>
      </p>

      <p>
        For full documentation, visit{' '}
        <a
          href="https://api.monsterhitdice.app/docs"
          target="_blank"
          className="link"
        >
          api.monsterhitdice.app/docs
        </a>
        .
      </p>

      <h3>roll-hit-dice</h3>

      <p>
        This Monster Hit Dice web app and the Monster Hit Dice API both use the{' '}
        <a
          href="https://www.npmjs.com/package/roll-hit-dice"
          target="_blank"
          className="link"
        >
          roll-hit-dice NPM package
        </a>
        .
      </p>
    </>
  )
}
