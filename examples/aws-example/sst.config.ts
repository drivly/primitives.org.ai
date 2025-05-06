
export default {
  config(input) {
    return {
      name: "aws-example",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const site = new stack.NextjsSite({
        path: ".",
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  }
};
