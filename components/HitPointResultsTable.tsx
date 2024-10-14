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
            <td className="hit-point-results-table-result hit-point-results-table-result-minimum">
              {hitPointResults?.minimum}
            </td>

            <td className="hit-point-results-table-result hit-point-results-table-result-weak">
              {hitPointResults?.weak}
            </td>

            <td className="hit-point-results-table-result hit-point-results-table-result-average">
              {hitPointResults?.average}
            </td>

            <td className="hit-point-results-table-result hit-point-results-table-result-strong">
              {hitPointResults?.strong}
            </td>

            <td className="hit-point-results-table-result hit-point-results-table-result-maximum">
              {hitPointResults?.maximum}
            </td>
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