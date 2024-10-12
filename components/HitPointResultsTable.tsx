import React from 'react'
import type { HitPointResults } from 'roll-hit-dice/dist/types'
import './HitPointResultsTable.css'
import DiceIcon, { DieType } from '@/components/DiceIcon'
import clsx from 'clsx'

interface HitPointResultsTableProps {
  hitDice?: string
  monsterName?: string
  hitPointResults?: HitPointResults
  dieType?: DieType
}

const HitPointResultsTable: React.FC<HitPointResultsTableProps> = ({
  monsterName,
  hitDice,
  hitPointResults,
}) => {
  return (
    <div className="group">
      {hitPointResults && hitDice && (
        <div
          className={clsx(
            'hit-point-results-table-header',
            'grid grid-cols-3 grid-rows-1 items-center gap-8',
          )}
        >
          <span />

          <h2 className="hit-point-results-table-heading">
            <strong className="font-medium">
              {monsterName ? monsterName : 'Hit Dice'} &mdash;{' '}
            </strong>
            {hitDice}
          </h2>

          <span
            className={clsx(
              'flex justify-end gap-2',
              'text-sm',
              'opacity-0 group-hover:opacity-100 transition-opacity',
            )}
          >
            <button>Delete</button>

            <button>Copy</button>
          </span>
        </div>
      )}

      <table className="hit-point-results-table">
        <tbody>
          <tr>
            <td>{hitPointResults?.minimum}</td>
            <td>{hitPointResults?.weak}</td>
            <td>{hitPointResults?.average}</td>
            <td>{hitPointResults?.strong}</td>
            <td>{hitPointResults?.maximum}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th>Minimum</th>
            <th>Weak</th>
            <th>Average</th>
            <th>Strong</th>
            <th>Maximum</th>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export default HitPointResultsTable
