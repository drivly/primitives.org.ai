import React from 'react'
import { MenuConfig, MenuItem, ThemeConfig } from '../types'

interface MenuComponentProps {
  menu: MenuConfig
  theme?: ThemeConfig
  horizontal?: boolean
}

export const MenuComponent: React.FC<MenuComponentProps> = ({ menu, theme, horizontal = false }) => {
  const { title, items = [] } = menu

  const renderMenuItem = (item: MenuItem, index: number) => {
    const isActive = item.active || false

    return (
      <div
        key={`menu-item-${index}`}
        style={{
          padding: '10px 16px',
          margin: horizontal ? '0 8px' : '4px 0',
          borderRadius: theme?.borderRadius || 4,
          backgroundColor: isActive ? (theme?.colorScheme === 'dark' ? '#333333' : '#e6e6e6') : 'transparent',
          color: isActive
            ? theme?.primaryColor || (theme?.colorScheme === 'dark' ? '#ffffff' : '#000000')
            : theme?.colorScheme === 'dark'
              ? '#cccccc'
              : '#333333',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        {item.icon && (
          <div
            style={{
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Placeholder for icon */}
            <div
              style={{
                width: '16px',
                height: '16px',
                backgroundColor: isActive
                  ? theme?.primaryColor || (theme?.colorScheme === 'dark' ? '#ffffff' : '#000000')
                  : theme?.colorScheme === 'dark'
                    ? '#cccccc'
                    : '#333333',
                opacity: 0.7,
                borderRadius: '2px',
              }}
            />
          </div>
        )}
        <span>{item.title}</span>
      </div>
    )
  }

  return (
    <div
      style={{
        width: '100%',
      }}
    >
      {title && (
        <div
          style={{
            fontWeight: 'bold',
            fontSize: '16px',
            marginBottom: '16px',
            color: theme?.colorScheme === 'dark' ? '#ffffff' : '#000000',
          }}
        >
          {title}
        </div>
      )}
      <div
        style={{
          display: 'flex',
          flexDirection: horizontal ? 'row' : 'column',
          alignItems: horizontal ? 'center' : 'stretch',
        }}
      >
        {items.map(renderMenuItem)}
      </div>
    </div>
  )
}
