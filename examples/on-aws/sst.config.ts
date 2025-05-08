export default {
  config(input: { stage?: string }) {
    return {
      name: 'aws-example',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      protect: input?.stage ? ['production'].includes(input.stage) : false,
    }
  },
  stacks(app: any) {
    app.stack(function Site({ stack }: { stack: any }) {
      const site = new stack.NextjsSite({
        path: '.',
      })

      stack.addOutputs({
        SiteUrl: site.url,
      })
    })
  },
}
