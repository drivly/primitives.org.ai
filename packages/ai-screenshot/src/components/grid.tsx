import React from 'react'
import { GridConfig, ThemeConfig } from '../types'

interface GridComponentProps {
  grid: GridConfig
  theme?: ThemeConfig
}

export const GridComponent: React.FC<GridComponentProps> = ({ grid, theme }) => {
  const { title, columns, items } = grid

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
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: '16px',
        }}
      >
        {items.map((item, index) => (
          <div
            key={`grid-item-${index}`}
            style={{
              backgroundColor: theme?.colorScheme === 'dark' ? '#333333' : '#f5f5f5',
              borderRadius: theme?.borderRadius || 4,
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              cursor: item.link ? 'pointer' : 'default',
            }}
          >
            {item.image && (
              <div
                style={{
                  width: '100%',
                  height: '120px',
                  backgroundColor: theme?.colorScheme === 'dark' ? '#444444' : '#e0e0e0',
                  borderRadius: theme?.borderRadius || 4,
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Placeholder for image */}
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: theme?.colorScheme === 'dark' ? '#555555' : '#cccccc',
                    borderRadius: '4px',
                  }}
                />
              </div>
            )}
            
            <h4
              style={{
                margin: '0 0 8px 0',
                color: theme?.colorScheme === 'dark' ? '#ffffff' : '#000000',
                fontSize: '16px',
                fontWeight: 500,
              }}
            >
              {item.title}
            </h4>
            
            {item.description && (
              <p
                style={{
                  margin: '0 0 12px 0',
                  color: theme?.colorScheme === 'dark' ? '#aaaaaa' : '#666666',
                  fontSize: '14px',
                  lineHeight: 1.5,
                  flex: 1,
                }}
              >
                {item.description}
              </p>
            )}
            
            {item.link && (
              <div
                style={{
                  marginTop: 'auto',
                  paddingTop: '12px',
                }}
              >
                <a
                  href={item.link}
                  style={{
                    color: theme?.primaryColor || '#1677ff',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  Learn more
                  <span
                    style={{
                      marginLeft: '4px',
                    }}
                  >
                    →
                  </span>
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
