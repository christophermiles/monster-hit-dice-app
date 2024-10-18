export default function Code() {
  return (
    <>
      <h1>Code</h1>

      <h2>Hit Dice API</h2>

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

      <h2>roll-hit-dice</h2>

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

      <p>
        Visit the source code repository at{' '}
        <a
          href="https://github.com/christophermiles/roll-hit-dice"
          target="_blank"
          className="link"
        >
          github.com/christophermiles
        </a>{' '}
        for more information.
      </p>
    </>
  )
}
