import React from 'react'
import { TableConfig, ThemeConfig } from '../types'

interface TableComponentProps {
  table: TableConfig
  theme?: ThemeConfig
}

export const TableComponent: React.FC<TableComponentProps> = ({ table, theme }) => {
  const { title, columns, rows = [], pagination = true, search = true } = table

  const displayRows =
    rows.length > 0
      ? rows
      : Array(5)
          .fill(0)
          .map(() => columns.map((col, i) => (i === 0 ? `Sample ${Math.floor(Math.random() * 1000)}` : `Value ${Math.floor(Math.random() * 100)}`)))

  return (
    <div
      style={{
        backgroundColor: theme?.colorScheme === 'dark' ? '#222222' : '#ffffff',
        borderRadius: theme?.borderRadius || 8,
        padding: '24px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        marginBottom: '24px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
        }}
      >
        {title && (
          <h3
            style={{
              margin: 0,
              color: theme?.colorScheme === 'dark' ? '#ffffff' : '#000000',
              fontSize: '18px',
              fontWeight: 600,
            }}
          >
            {title}
          </h3>
        )}

        {search && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <input
              type='text'
              placeholder='Search...'
              style={{
                padding: '8px 12px',
                borderRadius: theme?.borderRadius || 4,
                border: `1px solid ${theme?.colorScheme === 'dark' ? '#444444' : '#dddddd'}`,
                backgroundColor: theme?.colorScheme === 'dark' ? '#333333' : '#ffffff',
                color: theme?.colorScheme === 'dark' ? '#ffffff' : '#000000',
              }}
            />
          </div>
        )}
      </div>

      <div
        style={{
          overflowX: 'auto',
        }}
      >
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
          }}
        >
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th
                  key={`column-${index}`}
                  style={{
                    padding: '12px 16px',
                    textAlign: 'left',
                    borderBottom: `1px solid ${theme?.colorScheme === 'dark' ? '#444444' : '#eeeeee'}`,
                    color: theme?.colorScheme === 'dark' ? '#dddddd' : '#333333',
                    fontWeight: 600,
                  }}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayRows.map((row, rowIndex) => (
              <tr
                key={`row-${rowIndex}`}
                style={{
                  backgroundColor:
                    rowIndex % 2 === 0 ? (theme?.colorScheme === 'dark' ? '#2a2a2a' : '#f9f9f9') : theme?.colorScheme === 'dark' ? '#222222' : '#ffffff',
                }}
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={`cell-${rowIndex}-${cellIndex}`}
                    style={{
                      padding: '12px 16px',
                      borderBottom: `1px solid ${theme?.colorScheme === 'dark' ? '#333333' : '#eeeeee'}`,
                      color: theme?.colorScheme === 'dark' ? '#cccccc' : '#333333',
                    }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '16px',
            padding: '8px 0',
          }}
        >
          <div
            style={{
              color: theme?.colorScheme === 'dark' ? '#aaaaaa' : '#666666',
              fontSize: '14px',
            }}
          >
            Showing 1 to {displayRows.length} of {displayRows.length} entries
          </div>
          <div
            style={{
              display: 'flex',
              gap: '8px',
            }}
          >
            {['Previous', '1', '2', '3', 'Next'].map((page, index) => (
              <button
                key={`page-${index}`}
                style={{
                  padding: '6px 12px',
                  borderRadius: theme?.borderRadius || 4,
                  border: `1px solid ${theme?.colorScheme === 'dark' ? '#444444' : '#dddddd'}`,
                  backgroundColor: index === 1 ? theme?.primaryColor || '#1677ff' : theme?.colorScheme === 'dark' ? '#333333' : '#ffffff',
                  color: index === 1 ? '#ffffff' : theme?.colorScheme === 'dark' ? '#cccccc' : '#333333',
                  cursor: 'pointer',
                }}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
