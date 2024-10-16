import { EndOfPageHomeLink } from '@/components/EndOfPageHomeLink'

export default function AboutApi() {
  return (
    <div className="about-api-page flex flex-col gap-16 leading-relaxed">
      <h1 className="heading-1">Code</h1>

      <h2 className="heading-2">Hit Dice API</h2>

      <section className="flex flex-col gap-4">
        <p>
          A public API for calculating Hit Point values from Hit Dice
          expressions is available at{' '}
          <a
            href="https://api.monsterhitdice.app"
            rel="nofollow"
            target="_blank"
            className="link"
          >
            api.monsterhitdice.app
          </a>
          .
        </p>

        <p>For example:</p>

        <code>
          curl --request GET \<br />
          --url
          &#39;https://api.monsterhitdice.app/hp?hd=2d8-2&hd=2d8+6&hd=8d10+40&hd=33d20+330&#39;
        </code>

        <p>
          Or try it from your browser:{' '}
          <a
            href="https://api.monsterhitdice.app/hp?hd=2d8-2&hd=2d8+6&hd=8d10+40&hd=33d20+330"
            rel="nofollow"
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
            rel="nofollow"
            target="_blank"
            className="link"
          >
            api.hitdice.app/docs
          </a>
          .
        </p>
      </section>

      <h2 className="heading-2">roll-hit-dice</h2>

      <section className="flex flex-col gap-4">
        <p>
          This Hit Dice web app and the Hit Dice API both use the{' '}
          <a
            href="https://www.npmjs.com/package/roll-hit-dice"
            rel="nofollow"
            target="_blank"
            className="link"
          >
            roll-hit-dice
          </a>{' '}
          NPM package.
        </p>{' '}
        <p>
          Visit the source code repository at{' '}
          <a
            href="https://github.com/christophermiles/roll-hit-dice"
            rel="nofollow"
            target="_blank"
            className="link"
          >
            github.com/christophermiles
          </a>{' '}
          for more information.
        </p>
      </section>

      <EndOfPageHomeLink />
    </div>
  )
}
