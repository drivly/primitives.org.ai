import React from 'react'
import { ContentConfig, ThemeConfig } from '../types'
import { MenuComponent } from '../components/menu'
import { FormComponent } from '../components/form'
import { TableComponent } from '../components/table'
import { ChartComponent } from '../components/chart'
import { DashboardComponent } from '../components/dashboard'
import { GridComponent } from '../components/grid'

interface SidebarLayoutProps {
  content: ContentConfig
  theme?: ThemeConfig
}

export const SidebarLayout: React.FC<SidebarLayoutProps> = ({ content, theme }) => {
  const { menus, forms, tables, charts, dashboards, grids } = content
  
  return (
    <div
      style={{
        display: 'flex',
        minHeight: '600px',
        width: '100%',
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: '250px',
          backgroundColor: theme?.colorScheme === 'dark' ? '#111111' : '#f5f5f5',
          borderRight: `1px solid ${theme?.colorScheme === 'dark' ? '#333333' : '#e0e0e0'}`,
          padding: theme?.spacing || '16px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {menus && menus.length > 0 && (
          <MenuComponent menu={menus[0]} theme={theme} />
        )}
      </div>

      {/* Main content */}
      <div
        style={{
          flex: 1,
          padding: theme?.spacing || '24px',
          overflowY: 'auto',
        }}
      >
        {/* Render dashboards first if available */}
        {dashboards && dashboards.map((dashboard, index) => (
          <DashboardComponent key={`dashboard-${index}`} dashboard={dashboard} theme={theme} />
        ))}

        {/* Render other content types */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {forms && forms.map((form, index) => (
            <FormComponent key={`form-${index}`} form={form} theme={theme} />
          ))}

          {tables && tables.map((table, index) => (
            <TableComponent key={`table-${index}`} table={table} theme={theme} />
          ))}

          {charts && charts.map((chart, index) => (
            <ChartComponent key={`chart-${index}`} chart={chart} theme={theme} />
          ))}

          {grids && grids.map((grid, index) => (
            <GridComponent key={`grid-${index}`} grid={grid} theme={theme} />
          ))}
        </div>
      </div>
    </div>
  )
}
