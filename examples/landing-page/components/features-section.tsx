import { CodeBlockServer } from "@/components/code-block-server"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface FeatureCardLargeProps {
  title: string
  description: string
  code?: string
  codeLanguage?: string
  className?: string
}

export function FeatureCardLarge({
  title,
  description,
  code,
  codeLanguage = "typescript",
  className,
}: FeatureCardLargeProps) {
  return (
    <div
      className={cn(
        "flex flex-col lg:flex-row gap-6 md:gap-10 items-start sm:p-6 sm:border sm:rounded-lg h-full bg-white dark:bg-slate-900",
        className,
      )}
    >
      <div className="flex-1 space-y-4">
        <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
        <p className="text-foreground/70 text-sm leading-relaxed">{description}</p>

        <ul className="space-y-2 text-sm text-foreground/70">
          <li className="flex items-start">
            <span className="mr-2 text-foreground">•</span>
            <span>Real-time data processing</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-foreground">•</span>
            <span>Secure auth with role-based access control</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-foreground">•</span>
            <span>Comprehensive documentation and example code</span>
          </li>
        </ul>

        <div className="pt-2">
          <a href="#" className="inline-flex items-center text-sm font-medium text-foreground hover:underline">
            Learn more <ArrowRight className="ml-1 h-3.5 w-3.5" />
          </a>
        </div>
      </div>
      {code && (
        <div className="w-full lg:w-1/2 h-full">
          <CodeBlockServer code={code} language={codeLanguage} showLineNumbers={true} />
        </div>
      )}
    </div>
  )
}

interface FeatureCardSmallProps {
  title: string
  description: string
  code?: string
  codeLanguage?: string
  className?: string
}

export function FeatureCardSmall({
  title,
  description,
  code,
  codeLanguage = "typescript",
  className,
}: FeatureCardSmallProps) {
  return (
    <div
      className={cn("flex flex-col sm:p-6 sm:border sm:rounded-lg h-full group bg-white dark:bg-slate-900", className)}
    >
      <div className="mb-4">
        <h3 className="text-lg font-semibold tracking-tight flex items-center">
          {title}
          <ArrowRight className="ml-2 h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
        </h3>
        <p className="text-foreground/70 leading-relaxed mt-2 text-sm">{description}</p>
      </div>
      {code && (
        <div className="mt-auto h-full">
          <CodeBlockServer code={code} language={codeLanguage} showLineNumbers={true} />
        </div>
      )}
    </div>
  )
}

interface FeaturesSectionProps {
  title?: string
  description?: string
  mainFeature?: FeatureCardLargeProps
  smallFeatures?: FeatureCardSmallProps[]
  className?: string
}

export function FeaturesSection({
  title = "Core Features",
  description,
  mainFeature = {
    title: "Powerful API Integration",
    description:
      "Our API provides seamless integration with your existing systems, allowing you to focus on building great products.",
    code: `import drivly

# Initialize the client
client = drivly.Client(api_key="YOUR_API_KEY")

# Fetch data
response = client.query(
    "SELECT * FROM users WHERE active = true LIMIT 10"
)

# Process results
for user in response.data:
    print(f"User: {user.name}, Email: {user.email}")`,
    codeLanguage: "python",
  },
  smallFeatures = [
    {
      title: "Simple CLI Tools",
      description: "Our command-line tools make it easy to interact with the API directly from your terminal.",
      code: `# Install the CLI
npm install -g drivly-cli

# Authenticate
drivly auth login

# Run a query
drivly query "SELECT * FROM users LIMIT 5"`,
      codeLanguage: "bash",
    },
    {
      title: "JavaScript SDK",
      description:
        "Our JavaScript SDK provides a simple interface for interacting with the API from your web applications.",
      code: `import { Drivly } from '@drivly/sdk';

// Initialize the client
const client = new Drivly({
  apiKey: 'YOUR_API_KEY'
});

// Fetch data
const users = await client.query(
  'SELECT * FROM users LIMIT 5'
);

console.log(users);`,
      codeLanguage: "javascript",
    },
  ],
  className,
}: FeaturesSectionProps) {
  return (
    <section className={cn("py-12 md:py-24 lg:py-32 bg-slate-50/50 dark:bg-slate-950/20", className)}>
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <div className="space-y-2 max-w-[800px]">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
            {description && <p className="text-foreground/70 text-sm">{description}</p>}
          </div>
        </div>
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-8 md:gap-6">
            <div className="md:col-span-6">
              <FeatureCardLarge {...mainFeature} />
            </div>
            <div className="md:col-span-3">{smallFeatures[0] && <FeatureCardSmall {...smallFeatures[0]} />}</div>
            <div className="md:col-span-3">{smallFeatures[1] && <FeatureCardSmall {...smallFeatures[1]} />}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
