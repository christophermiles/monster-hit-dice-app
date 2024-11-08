export default function Roadmap() {
  return (
    <>
      <h1>Roadmap</h1>

      <p>In no particular order:</p>

      <ul>
        <li>Add support for dark theme</li>
        <li>
          Separate inputs for Hit Die number, Hit Die type and modifier with
          input mode hints on touch devices for easier entering of Hit Dice on
          touch keyboards
        </li>
        <li>Result history synced to local storage</li>
        <li>Handle Hit Dice expression passed as query parameters in URL</li>
      </ul>

      <footer>
        <p>
          <small>
            Last updated <time dateTime="2024-11-08">8 November 2024</time>
          </small>
        </p>
      </footer>
    </>
  )
}
