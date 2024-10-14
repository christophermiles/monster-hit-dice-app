import React from 'react'
import type { HitPointResults } from 'roll-hit-dice/dist/types'
import ClipboardIcon from '@/components/ClipboardIcon'
import DeleteIcon from '@/components/DeleteIcon'
import clsx from "clsx";

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
          <h2 className="flex items-baseline justify-center gap-1 pb-[1ch] text-2xl md:text-3xl text-gray-500">
            <span>{hitDice}</span>
            {monsterName && (
                <small className="overflow-ellipsis text-base md:text-lg">{`(${monsterName})`}</small>
            )}
          </h2>
        </header>
      )}

      <table className="w-full">
        <tbody className="text-2xl md:text-4xl lg:text-5xl">
        <tr>
          {Object.keys(valueTexts).map((key, index, array) => (
            <td className={
              clsx(
                  'min-w-[4ch] min-h-[1rem] py-[0.5ch] align-baseline text-center font-medium border-b border-gray-400',
                  !hitPointResults && 'border-gray-200 text-gray-300 font-light',

              )
            } style={hitPointResults && { 'fontSize': `${(100 - (array.length - index) * 5)}%` }}
            >
              {hitPointResults ? hitPointResults[key as HitPointResultsKey] : `-`}
            </td>
          ))}
        </tr>
        </tbody>
        <tfoot className="text-sm md:text-base">
          <tr>
            {Object.keys(valueTexts).map(key => (
                <th className="font-normal text-gray-500">{valueTexts[key as HitPointResultsKey]}</th>
            ))}
          </tr>
        </tfoot>
      </table>

      <footer className="mt-4 flex justify-between items-baseline">
        <button className="text-button text-xs flex items-center gap-1">
          <ClipboardIcon className="w-4 h-4"/>
          <span>Copy</span>
        </button>

        <button className="text-button text-xs flex items-center gap-1">
          <DeleteIcon className="w-4 h-4"/>
          <span>Delete</span>
        </button>
      </footer>
    </div>
  )
}

export default HitPointResultsTable