import { HomeLink } from '@/components/HomeLink'
export default function AboutApi() {
  return (
    <div className="about-page  flex flex-col gap-16">
      <HomeLink />

      <div className="flex flex-col gap-6 leading-relaxed">
        <h1 className="heading-1">What is this?</h1>

        <p>
          This Monster Hit Dice App takes a Hit Dice expression (that’s a fancy
          way of saying ‘number of Hit Dice of a certain Hit Dice type plus
          modifiers’) and generates Hit Point values ranging between{' '}
          <strong>minimum</strong>, <strong>weak</strong>,{' '}
          <strong>average</strong>, <strong>strong</strong> and{' '}
          <strong>maximum</strong> &mdash; with weak being halfway between
          minimum and average, and strong being halfway between average and
          maximum.
        </p>

        <h2 className="heading-2">But why?</h2>

        <p>
          Using a creature’s average Hit Points works just fine for most
          Dungeons &amp; Dragons combats.
        </p>
        <p>
          But sometimes you might want to give your{' '}
          <abbr title="Big Bad Evil Guy">BBEG 😈</abbr> (Big Bad Evil Guy)
          maximum Hit Points (because you gave the party too many magic items or
          let them have too many feats) and you can’t be bothered doing the
          maths yourself.
        </p>
        <p>
          Maybe you’re using multiple creatures of the same type in a battle,
          but you want to mix hings up a bit and make some of them to be a bit
          weaker than average, and make some of <strong>chads</strong>.
        </p>
        <p>
          Or maybe you just want to tweak a creature’s Hit Points mid-battle. (
          <a
            href="https://slyflourish.com/tweaking_monster_hit_points.html"
            className="link"
            rel="nofollow"
            target="_blank"
          >
            Here’s Mike Shea at Sly Flourish explaining why we might want to do
            this!
          </a>
          )
        </p>
      </div>
    </div>
  )
}
