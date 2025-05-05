"use strict";
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = function(target, all) {
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = function(to, from, except, desc) {
    if (from && (typeof from === "undefined" ? "undefined" : _type_of(from)) === "object" || typeof from === "function") {
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            var _loop = function() {
                var key = _step.value;
                if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
                    get: function() {
                        return from[key];
                    },
                    enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
                });
            };
            for(var _iterator = __getOwnPropNames(from)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true)_loop();
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }
    return to;
};
var __toESM = function(mod, isNodeMode, target) {
    return target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(// If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
        value: mod,
        enumerable: true
    }) : target, mod);
};
var __toCommonJS = function(mod) {
    return __copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
};
// src/cli.ts
var cli_exports = {};
__export(cli_exports, {
    runAdmin: function() {
        return runAdmin;
    }
});
module.exports = __toCommonJS(cli_exports);
var import_child_process = require("child_process");
var import_path = __toESM(require("path"));
var runAdmin = function() {
    var args = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    var adminDir = import_path.default.resolve(__dirname, "../admin");
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
    var childProcess = (0, import_child_process.spawn)("npm", [
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
    runAdmin: runAdmin
});
