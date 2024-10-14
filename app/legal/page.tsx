import DiceIcon, {DieType} from "@/components/DiceIcon";

type IconCredit = {
    icon?: DieType,
    name: string
    author: string
    link: string,
}

export default function Legal() {
  const diceIconsCredits: IconCredit[] = [
      {
          icon: 'd4',
          name: 'Dice 4 icon',
          author: 'Skoll',
          link: 'https://game-icons.net/1x1/skoll/d4.html',
      },
      {
          icon: 'd6',
          name: 'Perspective dice 6 icon',
          author: 'Delapouite',
          link: 'https://game-icons.net/1x1/delapouite/perspective-dice-six.html',
      },
      {
          icon: 'd8',
          name: 'Dice 8 faces 8 icon',
          author: 'Delapouite',
          link: 'https://game-icons.net/1x1/delapouite/dice-eight-faces-eight.html',
      },
      {
          icon: 'd10',
          name: 'Dice 10 icon',
          author: 'Skoll',
          link: 'https://game-icons.net/1x1/skoll/d10.html',
      },
      {
          icon: 'd12',
          name: 'Dice 12 icon',
          author: 'Skoll',
          link: 'https://game-icons.net/1x1/skoll/d12.html',
      },
      {
          icon: 'd20',
          name: 'Dice 20 faces 20 icon',
          author: 'Delapouite',
          link: 'https://game-icons.net/1x1/delapouite/dice-twenty-faces-twenty.html',
      },
      {
          name: 'Perspective dice 6 faces random icon',
          author: 'Delapouite',
          link: 'https://game-icons.net/1x1/delapouite/perspective-dice-six-faces-random.html',
      }
  ]
    return (
    <div className="legal-page flex flex-col gap-16">
      <h1 className="heading-1">Legal</h1>

        <section className="flex flex-col gap-8">
            <h2 className="heading-2">Credits</h2>
        </section>

        <section className="flex flex-col gap-8">
            <h3 className="heading-3">Icons</h3>

            <ul className="flex flex-col justify-start gap-4 text-xs">
                {diceIconsCredits.map(credit => (
                    <li className="flex items-center gap-2">
                    <span className="flex-none">
                        <DiceIcon dieType={credit.icon} size="sm"/>
                    </span>
                        <a href={credit.link} className="flex-auto link">“{credit.name}” by {credit.author}</a>
                    </li>
                ))}
            </ul>
        </section>

    </div>
    )
}