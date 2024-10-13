import React from 'react'
import type { HitPointResults } from 'roll-hit-dice/dist/types'
import './HitPointResultsTable.css'
import ClipboardIcon from '@/components/ClipboardIcon'
import DeleteIcon from '@/components/DeleteIcon'

interface HitPointResultsTableProps {
  hitDice?: string
  dieType?: string
  monsterName?: string
  hitPointResults?: HitPointResults
}

const HitPointResultsTable: React.FC<HitPointResultsTableProps> = ({
  monsterName,
  hitDice,
  hitPointResults,
}) => {
  return (
    <div className="hit-point-results-table-container">
      {hitPointResults && hitDice && (
        <div className="hit-point-results-table-header">
          <h2 className="hit-point-results-table-heading">{`${hitDice}${monsterName && ` (${monsterName})`}`}</h2>

          <button className="text-button hit-point-results-table-button hit-point-results-table-button-copy">
            <ClipboardIcon />
            <span>Copy</span>
          </button>

          <button className="text-button hit-point-results-table-button hit-point-results-table-button-delete">
            <DeleteIcon />
            <span>Delete</span>
          </button>
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
