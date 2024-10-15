import React from 'react'
import type { HitPointResults } from 'roll-hit-dice/dist/types'
import clsx from 'clsx'

interface HitPointResultsTableProps {
  hitDice?: string
  dieType?: string
  monsterName?: string
  hitPointResults?: HitPointResults
}

type HitPointResultsKey = keyof HitPointResults

const valueTexts: Record<HitPointResultsKey, string> = {
  minimum: 'Minimum',
  weak: 'Weak',
  average: 'Average',
  strong: 'Strong',
  maximum: 'Maximum',
}

const HitPointResultsTable: React.FC<HitPointResultsTableProps> = ({
  monsterName,
  hitDice,
  hitPointResults,
}) => {
  return (
    <div className="hit-point-results-table">
      {hitPointResults && hitDice && (
        <header>
          <h2 className="flex items-baseline justify-center gap-1 pb-[1ch] text-2xl md:text-3xl text-neutral-500">
            <span className="flex-none">{hitDice}</span>
            {monsterName && (
              <small className="flex-shrink truncate text-base md:text-lg">{`(${monsterName})`}</small>
            )}
          </h2>
        </header>
      )}

      <table className="w-full">
        <tbody className="text-2xl md:text-4xl lg:text-5xl">
          <tr>
            {Object.keys(valueTexts).map((key, index, array) => (
              <td
                key={key}
                className={clsx(
                  'min-w-[4ch] min-h-[1rem] py-[0.5ch] align-baseline text-center border-b',
                  hitPointResults
                    ? 'font-medium border-neutral-400'
                    : 'border-neutral-200 text-neutral-200 font-light',
                )}
                style={
                  hitPointResults && {
                    fontSize: `${100 - (array.length - index) * 5}%`,
                  }
                }
              >
                {hitPointResults
                  ? hitPointResults[key as HitPointResultsKey]
                  : `-`}
              </td>
            ))}
          </tr>
        </tbody>
        <tfoot className="text-xs sm:text-sm md:text-base">
          <tr
            className={
              hitPointResults ? 'text-neutral-500' : 'text-neutral-300'
            }
          >
            {Object.keys(valueTexts).map((key) => (
              <th key={key} className="pt-2 font-normal">
                {valueTexts[key as HitPointResultsKey]}
              </th>
            ))}
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export default HitPointResultsTable
