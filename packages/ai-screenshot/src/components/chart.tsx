import React from 'react'
import { ChartConfig, ThemeConfig } from '../types'

interface ChartComponentProps {
  chart: ChartConfig
  theme?: ThemeConfig
}

export const ChartComponent: React.FC<ChartComponentProps> = ({ chart, theme }) => {
  const { title, type, data } = chart

  const chartData = data || {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: theme?.primaryColor || '#1677ff',
        borderColor: theme?.primaryColor || '#1677ff',
      },
    ],
  }

  const width = 100
  const height = 50
  const padding = 20
  const chartWidth = width - (padding * 2)
  const chartHeight = height - (padding * 2)
  
  const maxValue = Math.max(...chartData.datasets.flatMap(dataset => dataset.data))
  
  const renderChart = () => {
    switch (type) {
      case 'bar':
        return renderBarChart()
      case 'line':
        return renderLineChart()
      case 'pie':
        return renderPieChart()
      case 'area':
        return renderAreaChart()
      case 'scatter':
        return renderScatterChart()
      case 'radar':
        return renderRadarChart()
      default:
        return renderBarChart()
    }
  }
  
  const renderBarChart = () => {
    const barWidth = chartWidth / (chartData.labels.length * 2)
    
    return (
      <svg width="100%" height="200" viewBox={`0 0 ${width} ${height}`}>
        {/* Y-axis */}
        <line 
          x1={padding} 
          y1={padding} 
          x2={padding} 
          y2={height - padding} 
          stroke={theme?.colorScheme === 'dark' ? '#444444' : '#dddddd'} 
          strokeWidth="0.5" 
        />
        
        {/* X-axis */}
        <line 
          x1={padding} 
          y1={height - padding} 
          x2={width - padding} 
          y2={height - padding} 
          stroke={theme?.colorScheme === 'dark' ? '#444444' : '#dddddd'} 
          strokeWidth="0.5" 
        />
        
        {/* Bars */}
        {chartData.datasets[0].data.map((value, index) => {
          const barHeight = (value / maxValue) * chartHeight
          const x = padding + (index * (chartWidth / chartData.labels.length)) + (chartWidth / chartData.labels.length / 4)
          const y = height - padding - barHeight
          
          return (
            <rect
              key={`bar-${index}`}
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              fill={Array.isArray(chartData.datasets[0].backgroundColor) 
                ? chartData.datasets[0].backgroundColor[index] 
                : chartData.datasets[0].backgroundColor || theme?.primaryColor || '#1677ff'}
              rx="1"
              ry="1"
            />
          )
        })}
      </svg>
    )
  }
  
  const renderLineChart = () => {
    const points = chartData.datasets[0].data.map((value, index) => {
      const x = padding + (index * (chartWidth / (chartData.labels.length - 1)))
      const y = height - padding - ((value / maxValue) * chartHeight)
      return `${x},${y}`
    }).join(' ')
    
    return (
      <svg width="100%" height="200" viewBox={`0 0 ${width} ${height}`}>
        {/* Y-axis */}
        <line 
          x1={padding} 
          y1={padding} 
          x2={padding} 
          y2={height - padding} 
          stroke={theme?.colorScheme === 'dark' ? '#444444' : '#dddddd'} 
          strokeWidth="0.5" 
        />
        
        {/* X-axis */}
        <line 
          x1={padding} 
          y1={height - padding} 
          x2={width - padding} 
          y2={height - padding} 
          stroke={theme?.colorScheme === 'dark' ? '#444444' : '#dddddd'} 
          strokeWidth="0.5" 
        />
        
        {/* Line */}
        <polyline
          points={points}
          fill="none"
          stroke={typeof chartData.datasets[0].borderColor === 'string' ? chartData.datasets[0].borderColor : theme?.primaryColor || '#1677ff'}
          strokeWidth="1.5"
        />
        
        {/* Points */}
        {chartData.datasets[0].data.map((value, index) => {
          const x = padding + (index * (chartWidth / (chartData.labels.length - 1)))
          const y = height - padding - ((value / maxValue) * chartHeight)
          
          return (
            <circle
              key={`point-${index}`}
              cx={x}
              cy={y}
              r="1.5"
              fill={theme?.colorScheme === 'dark' ? '#ffffff' : '#000000'}
              stroke={typeof chartData.datasets[0].borderColor === 'string' ? chartData.datasets[0].borderColor : theme?.primaryColor || '#1677ff'}
              strokeWidth="1"
            />
          )
        })}
      </svg>
    )
  }
  
  const renderPieChart = () => {
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(chartWidth, chartHeight) / 2
    
    const total = chartData.datasets[0].data.reduce((sum, value) => sum + value, 0)
    
    let startAngle = 0
    const slices = chartData.datasets[0].data.map((value, index) => {
      const percentage = value / total
      const endAngle = startAngle + (percentage * 2 * Math.PI)
      
      const x1 = centerX + radius * Math.cos(startAngle)
      const y1 = centerY + radius * Math.sin(startAngle)
      const x2 = centerX + radius * Math.cos(endAngle)
      const y2 = centerY + radius * Math.sin(endAngle)
      
      const largeArcFlag = percentage > 0.5 ? 1 : 0
      
      const pathData = [
        `M ${centerX} ${centerY}`,
        `L ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        'Z'
      ].join(' ')
      
      const slice = {
        path: pathData,
        fill: Array.isArray(chartData.datasets[0].backgroundColor) 
          ? chartData.datasets[0].backgroundColor[index] 
          : `hsl(${(index * 137) % 360}, 70%, 60%)`,
        startAngle,
        endAngle
      }
      
      startAngle = endAngle
      return slice
    })
    
    return (
      <svg width="100%" height="200" viewBox={`0 0 ${width} ${height}`}>
        {slices.map((slice, index) => (
          <path
            key={`slice-${index}`}
            d={slice.path}
            fill={slice.fill}
            stroke={theme?.colorScheme === 'dark' ? '#222222' : '#ffffff'}
            strokeWidth="0.5"
          />
        ))}
      </svg>
    )
  }
  
  const renderAreaChart = () => {
    const points = chartData.datasets[0].data.map((value, index) => {
      const x = padding + (index * (chartWidth / (chartData.labels.length - 1)))
      const y = height - padding - ((value / maxValue) * chartHeight)
      return `${x},${y}`
    }).join(' ')
    
    const areaPoints = `${points} ${width - padding},${height - padding} ${padding},${height - padding}`
    
    return (
      <svg width="100%" height="200" viewBox={`0 0 ${width} ${height}`}>
        {/* Y-axis */}
        <line 
          x1={padding} 
          y1={padding} 
          x2={padding} 
          y2={height - padding} 
          stroke={theme?.colorScheme === 'dark' ? '#444444' : '#dddddd'} 
          strokeWidth="0.5" 
        />
        
        {/* X-axis */}
        <line 
          x1={padding} 
          y1={height - padding} 
          x2={width - padding} 
          y2={height - padding} 
          stroke={theme?.colorScheme === 'dark' ? '#444444' : '#dddddd'} 
          strokeWidth="0.5" 
        />
        
        {/* Area */}
        <polygon
          points={areaPoints}
          fill={typeof chartData.datasets[0].backgroundColor === 'string' ? chartData.datasets[0].backgroundColor : theme?.primaryColor || '#1677ff'}
          fillOpacity="0.2"
        />
        
        {/* Line */}
        <polyline
          points={points}
          fill="none"
          stroke={typeof chartData.datasets[0].borderColor === 'string' ? chartData.datasets[0].borderColor : theme?.primaryColor || '#1677ff'}
          strokeWidth="1.5"
        />
      </svg>
    )
  }
  
  const renderScatterChart = () => {
    return (
      <svg width="100%" height="200" viewBox={`0 0 ${width} ${height}`}>
        {/* Y-axis */}
        <line 
          x1={padding} 
          y1={padding} 
          x2={padding} 
          y2={height - padding} 
          stroke={theme?.colorScheme === 'dark' ? '#444444' : '#dddddd'} 
          strokeWidth="0.5" 
        />
        
        {/* X-axis */}
        <line 
          x1={padding} 
          y1={height - padding} 
          x2={width - padding} 
          y2={height - padding} 
          stroke={theme?.colorScheme === 'dark' ? '#444444' : '#dddddd'} 
          strokeWidth="0.5" 
        />
        
        {/* Points */}
        {chartData.datasets[0].data.map((value, index) => {
          const x = padding + (Math.random() * chartWidth)
          const y = height - padding - ((value / maxValue) * chartHeight)
          
          return (
            <circle
              key={`point-${index}`}
              cx={x}
              cy={y}
              r="2"
              fill={typeof chartData.datasets[0].backgroundColor === 'string' ? chartData.datasets[0].backgroundColor : theme?.primaryColor || '#1677ff'}
              stroke={theme?.colorScheme === 'dark' ? '#222222' : '#ffffff'}
              strokeWidth="0.5"
            />
          )
        })}
      </svg>
    )
  }
  
  const renderRadarChart = () => {
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(chartWidth, chartHeight) / 2
    
    const axisPoints = chartData.labels.map((_, index) => {
      const angle = (index / chartData.labels.length) * 2 * Math.PI - (Math.PI / 2)
      const x = centerX + radius * Math.cos(angle)
      const y = centerY + radius * Math.sin(angle)
      return { x, y, angle }
    })
    
    const dataPoints = chartData.datasets[0].data.map((value, index) => {
      const { angle } = axisPoints[index]
      const scaledRadius = (value / maxValue) * radius
      const x = centerX + scaledRadius * Math.cos(angle)
      const y = centerY + scaledRadius * Math.sin(angle)
      return { x, y }
    })
    
    const polygonPoints = dataPoints.map(point => `${point.x},${point.y}`).join(' ')
    
    return (
      <svg width="100%" height="200" viewBox={`0 0 ${width} ${height}`}>
        {/* Background circles */}
        {[0.2, 0.4, 0.6, 0.8, 1].map((scale, i) => (
          <circle
            key={`circle-${i}`}
            cx={centerX}
            cy={centerY}
            r={radius * scale}
            fill="none"
            stroke={theme?.colorScheme === 'dark' ? '#333333' : '#eeeeee'}
            strokeWidth="0.5"
          />
        ))}
        
        {/* Axis lines */}
        {axisPoints.map((point, index) => (
          <line
            key={`axis-${index}`}
            x1={centerX}
            y1={centerY}
            x2={point.x}
            y2={point.y}
            stroke={theme?.colorScheme === 'dark' ? '#444444' : '#dddddd'}
            strokeWidth="0.5"
          />
        ))}
        
        {/* Data polygon */}
        <polygon
          points={polygonPoints}
          fill={typeof chartData.datasets[0].backgroundColor === 'string' ? chartData.datasets[0].backgroundColor : theme?.primaryColor || '#1677ff'}
          fillOpacity="0.2"
          stroke={typeof chartData.datasets[0].borderColor === 'string' ? chartData.datasets[0].borderColor : theme?.primaryColor || '#1677ff'}
          strokeWidth="1.5"
        />
        
        {/* Data points */}
        {dataPoints.map((point, index) => (
          <circle
            key={`point-${index}`}
            cx={point.x}
            cy={point.y}
            r="1.5"
            fill={theme?.colorScheme === 'dark' ? '#ffffff' : '#000000'}
          />
        ))}
      </svg>
    )
  }

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
          height: '200px',
          width: '100%',
        }}
      >
        {renderChart()}
      </div>
      
      {/* Legend */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '16px',
          marginTop: '16px',
        }}
      >
        {chartData.datasets.map((dataset, index) => (
          <div
            key={`legend-${index}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <div
              style={{
                width: '12px',
                height: '12px',
                backgroundColor: Array.isArray(dataset.backgroundColor) 
                  ? dataset.backgroundColor[0] 
                  : dataset.backgroundColor || theme?.primaryColor || '#1677ff',
                borderRadius: '2px',
              }}
            />
            <span
              style={{
                fontSize: '14px',
                color: theme?.colorScheme === 'dark' ? '#cccccc' : '#666666',
              }}
            >
              {dataset.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
