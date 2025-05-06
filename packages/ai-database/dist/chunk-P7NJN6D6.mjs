// src/cli.ts
import { spawn } from "child_process";
import path from "path";
var runAdmin = function() {
    var args = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    var adminDir = path.resolve(__dirname, "../admin");
    var script = args[0] || "dev";
    var validScripts = [
        "dev",
        "build",
        "start"
    ];
    if (!validScripts.includes(script)) {
        console.error("Invalid script: ".concat(script, ". Use one of: ").concat(validScripts.join(", ")));
        process.exit(1);
    }
    var childProcess = spawn("npm", [
        "run",
        script
    ], {
        cwd: adminDir,
        stdio: "inherit"
    });
    childProcess.on("error", function(error) {
        console.error("Failed to start admin app: ".concat(error.message));
        process.exit(1);
    });
    process.on("SIGINT", function() {
        return childProcess.kill("SIGINT");
    });
    process.on("SIGTERM", function() {
        return childProcess.kill("SIGTERM");
    });
    return childProcess;
};
export { runAdmin };
