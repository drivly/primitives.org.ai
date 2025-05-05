#!/usr/bin/env node
import { runAdmin } from "./chunk-P7NJN6D6.mjs";
// src/bin.ts
var args = process.argv.slice(2);
var command = args[0];
if (command === "admin") {
    runAdmin(args.slice(1));
} else {
    console.error("Unknown command: ".concat(command));
    console.log("Available commands: admin");
    process.exit(1);
}
