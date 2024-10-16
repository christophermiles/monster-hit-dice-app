import { EndOfPageHomeLink } from '@/components/EndOfPageHomeLink'
export default function AboutApi() {
  return (
    <div className="about-page flex flex-col gap-16 leading-relaxed">
      <h1 className="heading-1">Why?</h1>

      <section className="flex flex-col gap-4">
        <p>
          Using a creature’s average Hit Points works just fine for most
          Dungeons &amp; Dragons combats.
        </p>
        <p>
          But sometimes you might want to give your{' '}
          <abbr title="Big Bad Evil Guy">BBEG 😈</abbr> (Big Bad Evil Guy)
          maximum Hit Points (so they can survive maybe at least one round
          against all those magic items you probably shouldn’t have given the
          party).
        </p>
        <p>
          Maybe you’re using multiple creatures of the same type in a battle,
          and want some of them to be weak, and some of them to be chads and/or
          absolute units.
        </p>
        <p>
          Or maybe you just want to tweak a creature’s Hit Points mid-battle (
          <a
            href="https://slyflourish.com/tweaking_monster_hit_points.html"
            className="link"
            rel="nofollow"
            target="_blank"
          >
            Mike Shea at Sly Flourish explains why we might want to do this
          </a>
          ), but you don’t feel comfortable choosing a number that’s{' '}
          <em>completely</em> arbitrary.
        </p>

        <p>
          You are, however, quite okay with using a number that some stupid web
          app gave you.
        </p>

        <p>
          If that’s you, congratulations &mdash; you’ve come to the right
          internet location.
        </p>
      </section>

      <EndOfPageHomeLink />
    </div>
  )
}
