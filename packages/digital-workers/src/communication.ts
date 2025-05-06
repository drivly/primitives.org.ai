import { 
  WorkerInstance, 
  WorkerCommunicationConfig, 
  SlackConfig, 
  TeamsConfig, 
  EmailConfig, 
  PhoneConfig 
} from './types'

/**
 * Sets up communication channels for a worker
 * @param worker The worker instance
 * @param config The communication configuration
 */
export function setupCommunication(
  worker: WorkerInstance, 
  config: WorkerCommunicationConfig
): void {
  worker.communicationConfig = config
  
  if (config.slack) {
    setupSlackCommunication(worker, config.slack)
  }
  
  if (config.teams) {
    setupTeamsCommunication(worker, config.teams)
  }
  
  if (config.email) {
    setupEmailCommunication(worker, config.email)
  }
  
  if (config.phone) {
    setupPhoneCommunication(worker, config.phone)
  }
  
  worker.send = async (message: any, options: { 
    channel?: string, 
    recipient?: string,
    priority?: 'low' | 'normal' | 'high' | 'urgent'
  } = {}) => {
    const channel = options.channel || worker.defaultCommunicationChannel || 'slack'
    
    return worker.sendMessage(channel, {
      ...message,
      recipient: options.recipient,
      priority: options.priority || 'normal',
      timestamp: new Date().toISOString(),
      sender: worker.id,
    })
  }
  
  worker.defaultCommunicationChannel = Object.keys(config)[0] || 'slack'
  
  console.log(`Communication channels set up for worker ${worker.id}: ${Object.keys(config).join(', ')}`)
}

/**
 * Sets up Slack communication for a worker
 * @param worker The worker instance
 * @param config The Slack configuration
 */
function setupSlackCommunication(worker: WorkerInstance, config: SlackConfig): void {
  if (!config.token) {
    console.error('Slack token is required for Slack communication')
    return
  }
  
  const secureToken = {
    value: config.token,
    created: new Date().toISOString(),
  }
  
  worker.slack = {
    sendToChannel: async (channel: string, message: string | object): Promise<any> => {
      return worker.agent.execute({
        action: 'slack.sendMessage',
        token: secureToken.value,
        channel,
        message: typeof message === 'string' ? { text: message } : message,
        botName: config.botName,
        botIcon: config.botIcon,
      })
    },
    
    sendDirectMessage: async (userId: string, message: string | object): Promise<any> => {
      return worker.agent.execute({
        action: 'slack.sendDirectMessage',
        token: secureToken.value,
        userId,
        message: typeof message === 'string' ? { text: message } : message,
        botName: config.botName,
        botIcon: config.botIcon,
      })
    },
    
    react: async (channel: string, timestamp: string, emoji: string): Promise<any> => {
      return worker.agent.execute({
        action: 'slack.react',
        token: secureToken.value,
        channel,
        timestamp,
        emoji,
      })
    },
    
    getChannels: async (): Promise<any> => {
      return worker.agent.execute({
        action: 'slack.getChannels',
        token: secureToken.value,
      })
    },
  }
  
  worker.agent.onSlackMessage = async (event: any) => {
    await worker.updateContext({
      lastSlackMessage: {
        timestamp: new Date().toISOString(),
        channel: event.channel,
        user: event.user,
        text: event.text,
      },
    })
    
    return worker.execute({
      action: 'processMessage',
      platform: 'slack',
      message: event,
    })
  }
  
  console.log(`Slack communication set up for worker ${worker.id}`)
}

/**
 * Sets up Microsoft Teams communication for a worker
 * @param worker The worker instance
 * @param config The Teams configuration
 */
function setupTeamsCommunication(worker: WorkerInstance, config: TeamsConfig): void {
  if (!config.token) {
    console.error('Teams token is required for Teams communication')
    return
  }
  
  const secureToken = {
    value: config.token,
    created: new Date().toISOString(),
  }
  
  worker.teams = {
    sendToChannel: async (channel: string, message: string | object): Promise<any> => {
      return worker.agent.execute({
        action: 'teams.sendMessage',
        token: secureToken.value,
        channel,
        message: typeof message === 'string' ? { text: message } : message,
        botName: config.botName,
      })
    },
    
    sendDirectMessage: async (userId: string, message: string | object): Promise<any> => {
      return worker.agent.execute({
        action: 'teams.sendDirectMessage',
        token: secureToken.value,
        userId,
        message: typeof message === 'string' ? { text: message } : message,
        botName: config.botName,
      })
    },
    
    getChannels: async (): Promise<any> => {
      return worker.agent.execute({
        action: 'teams.getChannels',
        token: secureToken.value,
      })
    },
  }
  
  worker.agent.onTeamsMessage = async (event: any) => {
    await worker.updateContext({
      lastTeamsMessage: {
        timestamp: new Date().toISOString(),
        channel: event.channel,
        user: event.user,
        text: event.text,
      },
    })
    
    return worker.execute({
      action: 'processMessage',
      platform: 'teams',
      message: event,
    })
  }
  
  console.log(`Microsoft Teams communication set up for worker ${worker.id}`)
}

/**
 * Sets up Email communication for a worker
 * @param worker The worker instance
 * @param config The Email configuration
 */
function setupEmailCommunication(worker: WorkerInstance, config: EmailConfig): void {
  if (!config.smtp || !config.address) {
    console.error('SMTP configuration and email address are required for Email communication')
    return
  }
  
  worker.email = {
    send: async (to: string | string[], subject: string, body: string, options: any = {}): Promise<any> => {
      const recipients = Array.isArray(to) ? to : [to]
      
      return worker.agent.execute({
        action: 'email.send',
        smtp: config.smtp,
        from: {
          address: config.address,
          name: config.name || worker.agent.config.name,
        },
        to: recipients,
        subject,
        body,
        html: options.html || false,
        attachments: options.attachments || [],
        cc: options.cc || [],
        bcc: options.bcc || [],
        signature: config.signature,
      })
    },
    
    reply: async (messageId: string, body: string, options: any = {}): Promise<any> => {
      return worker.agent.execute({
        action: 'email.reply',
        smtp: config.smtp,
        from: {
          address: config.address,
          name: config.name || worker.agent.config.name,
        },
        messageId,
        body,
        html: options.html || false,
        attachments: options.attachments || [],
        signature: config.signature,
      })
    },
  }
  
  worker.agent.onEmailReceived = async (event: any) => {
    await worker.updateContext({
      lastEmail: {
        timestamp: new Date().toISOString(),
        from: event.from,
        subject: event.subject,
        messageId: event.messageId,
      },
    })
    
    return worker.execute({
      action: 'processMessage',
      platform: 'email',
      message: event,
    })
  }
  
  console.log(`Email communication set up for worker ${worker.id}`)
}

/**
 * Sets up Phone/SMS communication for a worker
 * @param worker The worker instance
 * @param config The Phone configuration
 */
function setupPhoneCommunication(worker: WorkerInstance, config: PhoneConfig): void {
  if (!config.provider || !config.accountId || !config.authToken || !config.phoneNumber) {
    console.error('Provider, account ID, auth token, and phone number are required for Phone communication')
    return
  }
  
  const secureCredentials = {
    accountId: config.accountId,
    authToken: config.authToken,
    created: new Date().toISOString(),
  }
  
  worker.phone = {
    sendSms: async (to: string, message: string): Promise<any> => {
      return worker.agent.execute({
        action: 'phone.sendSms',
        provider: config.provider,
        credentials: {
          accountId: secureCredentials.accountId,
          authToken: secureCredentials.authToken,
        },
        from: config.phoneNumber,
        to,
        message,
      })
    },
    
    call: async (to: string, options: any = {}): Promise<any> => {
      return worker.agent.execute({
        action: 'phone.call',
        provider: config.provider,
        credentials: {
          accountId: secureCredentials.accountId,
          authToken: secureCredentials.authToken,
        },
        from: config.phoneNumber,
        to,
        message: options.message || '',
        voiceScript: options.voiceScript || null,
        callbackUrl: options.callbackUrl || null,
      })
    },
  }
  
  worker.agent.onSmsReceived = async (event: any) => {
    await worker.updateContext({
      lastSms: {
        timestamp: new Date().toISOString(),
        from: event.from,
        message: event.message,
      },
    })
    
    return worker.execute({
      action: 'processMessage',
      platform: 'sms',
      message: event,
    })
  }
  
  worker.agent.onCallReceived = async (event: any) => {
    await worker.updateContext({
      lastCall: {
        timestamp: new Date().toISOString(),
        from: event.from,
        callId: event.callId,
      },
    })
    
    return worker.execute({
      action: 'processMessage',
      platform: 'call',
      message: event,
    })
  }
  
  console.log(`Phone communication set up for worker ${worker.id}`)
}
