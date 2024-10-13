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
        <div className={'hit-point-results-table-header'}>
          <h2 className="hit-point-results-table-heading">
            <strong className="font-medium">
              {monsterName ? monsterName : 'Hit Dice'} &mdash;{' '}
            </strong>
            {hitDice}
          </h2>

          <span className="hit-point-results-table-controls">
            <button>Copy</button>

            <button>Delete</button>
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
