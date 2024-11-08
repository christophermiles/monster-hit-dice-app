import DiceIcon, { DieType } from '@/components/DiceIcon'
import { DateStringObject } from '@/lib/types'
import { Metadata } from 'next'
import getDateModifiedJsonLd from '@/lib/utils/get-date-modified-json-ld'
import DateModified from '@/components/DateModified'

const LAST_UPDATED: DateStringObject = {
  year: '2024',
  month: '11',
  day: '08',
}

export function generateMetadata(): Metadata {
  return {
    title: 'Legal',
    other: {
      ...getDateModifiedJsonLd(LAST_UPDATED),
    },
  }
}

type IconCredit = {
  icon?: DieType
  name: string
  author: {
    name: string
    url?: string
  }
  link: string
}

const diceIconsCredits: IconCredit[] = [
  {
    icon: 'd4',
    name: 'Dice 4 icon',
    author: { name: 'Skoll' },
    link: 'https://game-icons.net/1x1/skoll/d4.html',
  },
  {
    icon: 'd6',
    name: 'Perspective dice 6 icon',
    author: { name: 'Delapouite', url: 'https://delapouite.com/' },
    link: 'https://game-icons.net/1x1/delapouite/perspective-dice-six.html',
  },
  {
    icon: 'd8',
    name: 'Dice 8 faces 8 icon',
    author: { name: 'Delapouite', url: 'https://delapouite.com/' },
    link: 'https://game-icons.net/1x1/delapouite/dice-eight-faces-eight.html',
  },
  {
    icon: 'd10',
    name: 'Dice 10 icon',
    author: { name: 'Skoll' },
    link: 'https://game-icons.net/1x1/skoll/d10.html',
  },
  {
    icon: 'd12',
    name: 'Dice 12 icon',
    author: { name: 'Skoll' },
    link: 'https://game-icons.net/1x1/skoll/d12.html',
  },
  {
    icon: 'd20',
    name: 'Dice 20 faces 20 icon',
    author: { name: 'Delapouite', url: 'https://delapouite.com/' },
    link: 'https://game-icons.net/1x1/delapouite/dice-twenty-faces-twenty.html',
  },
  {
    name: 'Perspective dice 6 faces random icon',
    author: { name: 'Delapouite', url: 'https://delapouite.com/' },
    link: 'https://game-icons.net/1x1/delapouite/perspective-dice-six-faces-random.html',
  },
]

export default function Legal() {
  return (
    <>
      <h1>Legal information</h1>

      <p>
        This material is being released using the Open Gaming License Version
        1.0a and you should read and understand the terms of that license before
        using this material.
      </p>

      <p>
        The text of the Open Gaming License itself is not Open Game Content.
        Instructions on using the License are provided within the License
        itself.
      </p>

      <p>
        All of the rest of monsterhitdice.app is Open Game Content as described
        in Section 1(d) of the License.
      </p>

      <p>The terms of the Open Gaming License Version 1.0a are as follows:</p>

      <h2>OPEN GAME LICENSE Version 1.0a</h2>

      <p>
        The following text is the property of Wizards of the Coast, Inc. and is
        Copyright 2000 <em>Wizards of the Coast, Inc</em> (“Wizards”). All
        Rights Reserved.
      </p>

      <p>
        1. Definitions: (a) “Contributors” means the copyright and/or trademark
        owners who have contributed Open Game Content; (b) “Derivative Material”
        means copyrighted material including derivative works and translations
        (including into other computer languages), potation, modification,
        correction, addition, extension, upgrade, improvement, compilation,
        abridgment or other form in which an existing work may be recast,
        transformed or adapted; (c) “Distribute” means to reproduce, license,
        rent, lease, sell, broadcast, publicly display, transmit or otherwise
        distribute; (d) “Open Game Content” means the game mechanic and includes
        the methods, procedures, processes and routines to the extent such
        content does not embody the Product Identity and is an enhancement over
        the prior art and any additional content clearly identified as Open Game
        Content by the Contributor, and means any work covered by this License,
        including translations and derivative works under copyright law, but
        specifically excludes Product Identity; (e) “Product Identity” means
        product and product line names, logos and identifying marks including
        trade dress; artifacts; creatures characters; stories, storylines,
        plots, thematic elements, dialogue, incidents, language, artwork,
        symbols, designs, depictions, likenesses, formats, poses, concepts,
        themes and graphic, photographic and other visual or audio
        representations; names and descriptions of characters, spells,
        enchantments, personalities, teams, personas, likenesses and special
        abilities; places, locations, environments, creatures, equipment,
        magical or supernatural abilities or effects, logos, symbols, or graphic
        designs; and any other trademark or registered trademark clearly
        identified as Product identity by the owner of the Product Identity, and
        which specifically excludes the Open Game Content; (f) “Trademark” means
        the logos, names, mark, sign, motto, designs that are used by a
        Contributor to identify itself or its products or the associated
        products contributed to the Open Game License by the Contributor; (g)
        “Use”, “Used” or “Using” means to use, Distribute, copy, edit, format,
        modify, translate and otherwise create Derivative Material of Open Game
        Content.; (h) “You” or “Your” means the licensee in terms of this
        agreement.
      </p>

      <p>
        2. The License: This License applies to any Open Game Content that
        contains a notice indicating that the Open Game Content may only be Used
        under and in terms of this License. You must affix such a notice to any
        Open Game Content that you Use. No terms may be added to or subtracted
        from this License except as described by the License itself. No other
        terms or conditions may be applied to any Open Game Content distributed
        using this License.
      </p>

      <p>
        3. Offer and Acceptance: By Using the Open Game Content You indicate
        Your acceptance of the terms of this License.
      </p>

      <p>
        4. Grant and Consideration: In consideration for agreeing to use this
        License, the Contributors grant You a perpetual, worldwide,
        royalty-free, non-exclusive license with the exact terms of this License
        to Use, the Open Game Content.
      </p>

      <p>
        5. Representation of Authority to Contribute: If You are contributing
        original material as Open Game Content, You represent that Your
        Contributions are Your original creation and/or You have sufficient
        rights to grant the rights conveyed by this License.
      </p>

      <p>
        6. Notice of License Copyright: You must update the COPYRIGHT NOTICE
        portion of this License to include the exact text of the COPYRIGHT
        NOTICE of any Open Game Content You are copying, modifying or
        distributing, and You must add the title, the copyright date, and the
        copyright holder’s name to the COPYRIGHT NOTICE of any original Open
        Game Content you Distribute.
      </p>

      <p>
        7. Use of Product Identity: You agree not to Use any Product Identity,
        including as an indication as to compatibility, except as expressly
        licensed in another, independent Agreement with the owner of each
        element of that Product Identity. You agree not to indicate
        compatibility or co-adaptability with any Trademark or Registered
        Trademark in conjunction with a work containing Open Game Content except
        as expressly licensed in another, independent Agreement with the owner
        of such Trademark or Registered Trademark. The use of any Product
        Identity in Open Game Content does not constitute a challenge to the
        ownership of that Product Identity. The owner of any Product Identity
        used in Open Game Content shall retain all rights, title and interest in
        and to that Product Identity.
      </p>

      <p>
        8. Identification: If you distribute Open Game Content You must clearly
        indicate which portions of the work that you are distributing are Open
        Game Content.
      </p>

      <p>
        9. Updating the License: Wizards or its designated Agents may publish
        updated versions of this License. You may use any authorized version of
        this License to copy, modify and distribute any Open Game Content
        originally distributed under any version of this License.
      </p>

      <p>
        10. Copy of this License: You MUST include a copy of this License with
        every copy of the Open Game Content You Distribute.
      </p>

      <p>
        11. Use of Contributor Credits: You may not market or advertise the Open
        Game Content using the name of any Contributor unless You have written
        permission from the Contributor to do so.
      </p>

      <p>
        12. Inability to Comply: If it is impossible for You to comply with any
        of the terms of this License with respect to some or all of the Open
        Game Content due to statute, judicial order, or governmental regulation
        then You may not Use any Open Game Material so affected.
      </p>

      <p>
        13. Termination: This License will terminate automatically if You fail
        to comply with all terms herein and fail to cure such breach within 30
        days of becoming aware of the breach. All sublicenses shall survive the
        termination of this License.
      </p>

      <p>
        14. Reformation: If any provision of this License is held to be
        unenforceable, such provision shall be reformed only to the extent
        necessary to make it enforceable.
      </p>

      <p>
        15. COPYRIGHT NOTICE <br />
        Open Game License v 1.0a Copyright 2000, Wizards of the Coast, LLC.
      </p>

      <p>
        System Reference Document 5.1 Copyright 2016, Wizards of the Coast,
        Inc.; Authors Mike Mearls, Jeremy Crawford, Chris Perkins, Rodney
        Thompson, Peter Lee, James Wyatt, Robert J. Schwalb, Bruce R. Cordell,
        Chris Sims, and Steve Townshend, based on original material by E. Gary
        Gygax and Dave Arneson.
      </p>

      <p>
        Creature Codex. Copyright 2018 Open Design LLC; Authors Wolfgang Baur,
        Dan Dillon, Richard Green, James Haeck, Chris Harris, Jeremy Hochhalter,
        James Introcaso, Chris Lockey, Shawn Merwin, and Jon Sawatsky.
      </p>

      <p>
        Tome of Beasts. Copyright 2016, Open Design; Authors Chris Harris, Dan
        Dillon, Rodrigo Garcia Carmona, and Wolfgang Baur.
      </p>

      <p>open5e.com v2.0, copyright 2019.</p>

      <p>monsterhitdice.app v1.0, copyright 2024.</p>

      <p>END OF LICENSE</p>

      <h2>
        Icons from{' '}
        <a href="https://game-icons.net" className="link">
          game-icons.net
        </a>
      </h2>

      <ul className="not-prose flex flex-col justify-start gap-2">
        {diceIconsCredits.map((credit) => (
          <li key={credit.icon} className="inline-flex items-center gap-2">
            <span className="flex-none">
              <DiceIcon dieType={credit.icon} size="sm" />
            </span>

            <span className="flex-shrink">
              “
              <a href={credit.link} target="_blank" className="link">
                {credit.name}
              </a>
              ” by{' '}
              {credit.author.url ? (
                <a href={credit.author.url} target="_blank" className="link">
                  {credit.author.name}
                </a>
              ) : (
                credit.author.name
              )}
            </span>
          </li>
        ))}
      </ul>

      <footer>
        <DateModified dateStringObject={LAST_UPDATED} />
      </footer>
    </>
  )
}
