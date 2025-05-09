import React from 'react'
import { DashboardConfig, ThemeConfig } from '../types'
import { TableComponent } from './table'
import { ChartComponent } from './chart'
import { FormComponent } from './form'
import { GridComponent } from './grid'

interface DashboardComponentProps {
  dashboard: DashboardConfig
  theme?: ThemeConfig
}

export const DashboardComponent: React.FC<DashboardComponentProps> = ({ dashboard, theme }) => {
  const { title, widgets, layout = 'grid' } = dashboard

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
      {title && (
        <h3
          style={{
            margin: '0 0 20px 0',
            color: theme?.colorScheme === 'dark' ? '#ffffff' : '#000000',
            fontSize: '18px',
            fontWeight: 600,
          }}
        >
          {title}
        </h3>
      )}

      <div
        style={{
          display: layout === 'grid' ? 'grid' : 'flex',
          gridTemplateColumns: layout === 'grid' ? 'repeat(auto-fill, minmax(300px, 1fr))' : undefined,
          flexDirection: layout === 'flex' ? 'column' : undefined,
          gap: '16px',
        }}
      >
        {widgets.map((widget, index) => {
          if ('columns' in widget && 'rows' in widget) {
            return <TableComponent key={`widget-table-${index}`} table={widget} theme={theme} />
          } else if ('type' in widget && 'data' in widget) {
            return <ChartComponent key={`widget-chart-${index}`} chart={widget} theme={theme} />
          } else if ('fields' in widget) {
            return <FormComponent key={`widget-form-${index}`} form={widget} theme={theme} />
          } else if ('items' in widget) {
            return <GridComponent key={`widget-grid-${index}`} grid={widget} theme={theme} />
          }

          return null
        })}
      </div>
    </div>
  )
}
