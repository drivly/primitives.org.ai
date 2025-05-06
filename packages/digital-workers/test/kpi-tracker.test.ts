import { describe, it, expect, vi } from 'vitest'
import { WorkerInstance, WorkerEventLoopConfig, OkrTarget } from '../src/types'


describe('KPI Tracker', () => {
  it('should evaluate KPIs against OKRs', async () => {
    const worker = {
      id: 'worker-123',
      agent: {
        execute: vi.fn().mockResolvedValue({
          kpiValues: {
            'conversion-rate': 0.12,
            'response-time': 250,
            'customer-satisfaction': 4.8,
          }
        }),
        onKpiUpdate: vi.fn(),
      },
      context: {},
      plans: [],
      execute: vi.fn(),
      updateContext: vi.fn().mockResolvedValue({}),
      sendMessage: vi.fn(),
      evaluateKpis: async () => {
        return {
          status: 'completed',
          timestamp: new Date().toISOString(),
          kpiValues: {
            'conversion-rate': 0.12,
            'response-time': 250,
            'customer-satisfaction': 4.8,
          },
          evaluationResults: {
            kpis: {
              'conversion-rate': {
                target: '> 0.1',
                current: 0.12,
                status: 'above_target',
                score: 1,
                message: 'Current value 0.12 exceeds target 0.1',
                weight: 2,
              },
              'response-time': {
                target: '< 300',
                current: 250,
                status: 'above_target',
                score: 1,
                message: 'Current value 250 is better than target 300',
                weight: 1,
              },
              'customer-satisfaction': {
                target: '> 4.5',
                current: 4.8,
                status: 'above_target',
                score: 1,
                message: 'Current value 4.8 exceeds target 4.5',
                weight: 3,
              },
            },
            overallScore: 1,
            totalWeight: 6,
            recommendations: [],
          },
        }
      },
    } as unknown as WorkerInstance

    const result = await worker.evaluateKpis()

    expect(result).toEqual(expect.objectContaining({
      status: 'completed',
      timestamp: expect.any(String),
      kpiValues: expect.objectContaining({
        'conversion-rate': 0.12,
        'response-time': 250,
        'customer-satisfaction': 4.8,
      }),
      evaluationResults: expect.objectContaining({
        kpis: expect.objectContaining({
          'conversion-rate': expect.objectContaining({
            target: '> 0.1',
            current: 0.12,
            status: 'above_target',
          }),
          'response-time': expect.objectContaining({
            target: '< 300',
            current: 250,
            status: 'above_target',
          }),
          'customer-satisfaction': expect.objectContaining({
            target: '> 4.5',
            current: 4.8,
            status: 'above_target',
          }),
        }),
        overallScore: 1,
        recommendations: expect.any(Array),
      }),
    }))
  })

  it('should handle KPIs below target', async () => {
    const worker = {
      id: 'worker-123',
      agent: {
        execute: vi.fn().mockResolvedValue({
          kpiValues: {
            'conversion-rate': 0.05,
            'response-time': 350,
          }
        }),
        onKpiUpdate: vi.fn(),
      },
      context: {},
      plans: [],
      execute: vi.fn(),
      updateContext: vi.fn().mockResolvedValue({}),
      sendMessage: vi.fn(),
      evaluateKpis: async () => {
        return {
          status: 'completed',
          timestamp: new Date().toISOString(),
          kpiValues: {
            'conversion-rate': 0.05,
            'response-time': 350,
          },
          evaluationResults: {
            kpis: {
              'conversion-rate': {
                target: '> 0.1',
                current: 0.05,
                status: 'below_target',
                score: 0.5,
                message: 'Current value 0.05 is below target 0.1',
                weight: 2,
              },
              'response-time': {
                target: '< 300',
                current: 350,
                status: 'below_target',
                score: 0.857,
                message: 'Current value 350 exceeds target 300',
                weight: 1,
              },
            },
            overallScore: 0.619,
            totalWeight: 3,
            recommendations: [
              {
                kpi: 'conversion-rate',
                message: 'Improve conversion-rate from 0.05 to meet target 0.1',
                priority: 2,
              },
              {
                kpi: 'response-time',
                message: 'Improve response-time from 350 to meet target 300',
                priority: 1,
              },
            ],
          },
        }
      },
    } as unknown as WorkerInstance

    const result = await worker.evaluateKpis()

    expect(result).toEqual(expect.objectContaining({
      status: 'completed',
      kpiValues: expect.objectContaining({
        'conversion-rate': 0.05,
        'response-time': 350,
      }),
      evaluationResults: expect.objectContaining({
        kpis: expect.objectContaining({
          'conversion-rate': expect.objectContaining({
            status: 'below_target',
          }),
          'response-time': expect.objectContaining({
            status: 'below_target',
          }),
        }),
        recommendations: expect.arrayContaining([
          expect.objectContaining({
            kpi: 'conversion-rate',
            message: expect.stringContaining('Improve conversion-rate'),
          }),
        ]),
      }),
    }))

    const recommendations = result.evaluationResults.recommendations
    expect(recommendations[0].priority).toBeGreaterThanOrEqual(recommendations[1].priority)
  })
})
