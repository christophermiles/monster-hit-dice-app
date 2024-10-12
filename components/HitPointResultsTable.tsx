import React from 'react'
import type { HitPointResults } from 'roll-hit-dice/dist/types'
import './HitPointResultsTable.css'

interface HitPointResultsTableProps {
  hitDice?: string
  hitPointResults?: HitPointResults
}

const HitPointResultsTable: React.FC<HitPointResultsTableProps> = ({
  hitDice,
  hitPointResults,
}) => {
  return (
    <table className="hit-point-results-table">
      {hitPointResults && hitDice && (
        <thead>
          <tr>
            <th colSpan={5}>Hit Dice {hitDice}</th>
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
