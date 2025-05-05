// src/cli.ts
import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
var __dirname = path.dirname(fileURLToPath(import.meta.url));
var runAdmin = (args = []) => {
  const adminDir = path.resolve(__dirname, "../admin");
  const script = args[0] || "dev";
  const validScripts = ["dev", "build", "start"];
  if (!validScripts.includes(script)) {
    console.error(`Invalid script: ${script}. Use one of: ${validScripts.join(", ")}`);
    process.exit(1);
  }
  spawn("npm", ["run", script], {
    cwd: adminDir,
    stdio: "inherit"
  });
};
var cli = (args = process.argv.slice(2)) => {
  const command = args[0];
  if (command === "admin") {
    return runAdmin(args.slice(1));
  }
  console.log(`
Usage: ai-database [command] [options]

Commands:
  admin [dev|build|start]  Run the admin application
  
Options:
  --help, -h              Show help
  --version, -v           Show version
`);
};
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  cli();
}

export {
  runAdmin,
  cli
};
