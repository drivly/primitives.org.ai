import { NextApiRequest, NextApiResponse } from 'next'
import { parseProjectContext } from '../../utils/content-parser'
import { buildAIContext } from '../../utils/context-builder'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const projectContext = {
      projectName: 'AI Waitlist',
      projectDescription: 'A powerful waitlist system with AI-generated landing pages',
      features: [
        'AI-powered landing page generation',
        'Authentication via oauth.do',
        'Multi-step onboarding flow',
        'Product-solution fit assessment'
      ],
      benefits: [
        'Save time creating landing pages',
        'Collect valuable user feedback',
        'Identify ideal customers',
        'Streamline your waitlist process'
      ],
      callToAction: {
        text: 'Join Waitlist',
        link: '/auth'
      },
      rawReadme: '# AI Waitlist\n\nA powerful waitlist system with AI-generated landing pages.',
      rawAiContent: {}
    }

    return res.status(200).json({
      projectContext,
      aiContext: buildAIContext(projectContext)
    })
  } catch (error) {
    console.error('Error generating project context:', error)
    return res.status(500).json({ error: 'Failed to generate project context' })
  }
}
