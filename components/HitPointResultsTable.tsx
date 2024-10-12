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
  dieType,
}) => {
  return (
    <table className="hit-point-results-table">
      {hitPointResults && hitDice && (
        <thead>
          <tr>
            <th colSpan={5}>
              <span className={clsx('flex flex-col items-center')}>
                {dieType && (
                  <DiceIcon dieType={dieType} className="w-20 h-20" />
                )}

                <span>
                  <strong className="font-medium">
                    {monsterName ? monsterName : 'Hit Dice'} &mdash;{' '}
                  </strong>
                  {hitDice}
                </span>
              </span>
            </th>
          </tr>
        </thead>
      )}
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
          <th>Min.</th>
          <th></th>
          <th>Avg.</th>
          <th></th>
          <th>Max.</th>
        </tr>
      </tfoot>
    </table>
  )
}

export default HitPointResultsTable
