"use strict";
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function _ts_generator(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = function(mod) {
    return __copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
};
// src/index.ts
var src_exports = {};
__export(src_exports, {
    Goals: function() {
        return Goals;
    },
    Plans: function() {
        return Plans;
    },
    leanCanvas: function() {
        return leanCanvas;
    },
    storyBrand: function() {
        return storyBrand;
    }
});
module.exports = __toCommonJS(src_exports);
// src/models/goals.ts
var Goals = {
    slug: "goals",
    admin: {
        group: "Business",
        useAsTitle: "title",
        description: "Manages objectives and key results for tracking progress"
    },
    fields: [
        {
            name: "title",
            type: "text",
            required: true
        },
        {
            name: "objective",
            type: "text",
            required: true,
            admin: {
                description: "The objective of this goal"
            }
        },
        {
            name: "keyResults",
            type: "array",
            required: true,
            fields: [
                {
                    name: "description",
                    type: "text",
                    required: true
                },
                {
                    name: "value",
                    type: "number",
                    required: true
                },
                {
                    name: "kpiRelationship",
                    type: "relationship",
                    relationTo: "kpis"
                }
            ]
        }
    ]
};
// src/models/plans.ts
var Plans = {
    slug: "plans",
    admin: {
        group: "Business",
        useAsTitle: "name",
        description: "Strategic plans with actionable steps to achieve goals"
    },
    fields: [
        {
            name: "name",
            type: "text",
            required: true
        },
        {
            name: "description",
            type: "textarea"
        },
        {
            name: "status",
            type: "select",
            options: [
                {
                    label: "Draft",
                    value: "draft"
                },
                {
                    label: "Active",
                    value: "active"
                },
                {
                    label: "Completed",
                    value: "completed"
                },
                {
                    label: "Archived",
                    value: "archived"
                }
            ]
        },
        {
            name: "startDate",
            type: "date"
        },
        {
            name: "endDate",
            type: "date"
        },
        {
            name: "owner",
            type: "relationship",
            relationTo: "users"
        },
        {
            name: "goals",
            type: "relationship",
            relationTo: "goals",
            hasMany: true
        },
        {
            name: "tags",
            type: "relationship",
            relationTo: "tags",
            hasMany: true
        },
        {
            name: "priority",
            type: "select",
            options: [
                {
                    label: "Low",
                    value: "low"
                },
                {
                    label: "Medium",
                    value: "medium"
                },
                {
                    label: "High",
                    value: "high"
                },
                {
                    label: "Critical",
                    value: "critical"
                }
            ]
        },
        {
            name: "steps",
            type: "array",
            fields: [
                {
                    name: "name",
                    type: "text",
                    required: true
                },
                {
                    name: "description",
                    type: "textarea"
                },
                {
                    name: "order",
                    type: "number"
                },
                {
                    name: "duration",
                    type: "number"
                },
                {
                    name: "assignee",
                    type: "relationship",
                    relationTo: "users"
                },
                {
                    name: "status",
                    type: "select",
                    options: [
                        {
                            label: "Not Started",
                            value: "not_started"
                        },
                        {
                            label: "In Progress",
                            value: "in_progress"
                        },
                        {
                            label: "Completed",
                            value: "completed"
                        },
                        {
                            label: "Blocked",
                            value: "blocked"
                        }
                    ]
                }
            ]
        }
    ]
};
// src/functions/storyBrand.ts
var import_ai_providers = require("ai-providers");
var import_zod = require("zod");
var storyBrand = function() {
    var _ref = _async_to_generator(function(input) {
        var config, _config_modelName, modelName, _config_system, system, _config_temperature, temperature, inputStr, schema, result, error;
        var _arguments = arguments;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    config = _arguments.length > 1 && _arguments[1] !== void 0 ? _arguments[1] : {};
                    _config_modelName = config.modelName, modelName = _config_modelName === void 0 ? "google/gemini-2.5-flash-preview" : _config_modelName, _config_system = config.system, system = _config_system === void 0 ? "You are an expert business consultant specializing in the StoryBrand framework for clarifying marketing messages" : _config_system, _config_temperature = config.temperature, temperature = _config_temperature === void 0 ? 0.7 : _config_temperature;
                    inputStr = typeof input === "string" ? input : JSON.stringify(input);
                    schema = import_zod.z.object({
                        productName: import_zod.z.string().describe("name of the product or service"),
                        hero: import_zod.z.string().describe("description of the customer and their challenges"),
                        problem: import_zod.z.object({
                            external: import_zod.z.string().describe("tangible external problem the customer faces"),
                            internal: import_zod.z.string().describe("internal frustration caused by the external problem"),
                            philosophical: import_zod.z.string().describe("why this matters on a deeper level"),
                            villain: import_zod.z.string().describe("antagonistic force causing the problem")
                        }),
                        guide: import_zod.z.string().describe("how the brand positions itself as a guide with empathy and authority"),
                        plan: import_zod.z.array(import_zod.z.string()).describe("clear steps the customer needs to take"),
                        callToAction: import_zod.z.string().describe("specific action the customer should take"),
                        success: import_zod.z.string().describe("description of what success looks like after using the product"),
                        failure: import_zod.z.string().describe("description of what failure looks like if they don't use the product"),
                        messagingExamples: import_zod.z.array(import_zod.z.string()).describe("example marketing messages based on this framework")
                    });
                    _state.label = 1;
                case 1:
                    _state.trys.push([
                        1,
                        3,
                        ,
                        4
                    ]);
                    return [
                        4,
                        (0, import_ai_providers.model)(modelName).generate({
                            prompt: "Create a StoryBrand framework for: \n\n".concat(inputStr),
                            system: system,
                            temperature: temperature,
                            schema: schema
                        })
                    ];
                case 2:
                    result = _state.sent();
                    return [
                        2,
                        JSON.parse(result.text)
                    ];
                case 3:
                    error = _state.sent();
                    console.error("Error generating StoryBrand framework:", error);
                    throw new Error("Failed to generate StoryBrand framework");
                case 4:
                    return [
                        2
                    ];
            }
        });
    });
    return function storyBrand(input) {
        return _ref.apply(this, arguments);
    };
}();
// src/functions/leanCanvas.ts
var import_ai_providers2 = require("ai-providers");
var import_zod2 = require("zod");
var leanCanvas = function() {
    var _ref = _async_to_generator(function(input) {
        var config, _config_modelName, modelName, _config_system, system, _config_temperature, temperature, inputStr, schema, result, error;
        var _arguments = arguments;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    config = _arguments.length > 1 && _arguments[1] !== void 0 ? _arguments[1] : {};
                    _config_modelName = config.modelName, modelName = _config_modelName === void 0 ? "google/gemini-2.5-flash-preview" : _config_modelName, _config_system = config.system, system = _config_system === void 0 ? "You are an expert business consultant specializing in Lean Canvas for startups and new products" : _config_system, _config_temperature = config.temperature, temperature = _config_temperature === void 0 ? 0.7 : _config_temperature;
                    inputStr = typeof input === "string" ? input : JSON.stringify(input);
                    schema = import_zod2.z.object({
                        productName: import_zod2.z.string().describe("name of the product or service"),
                        problem: import_zod2.z.array(import_zod2.z.string()).describe("top 3 problems the product solves"),
                        solution: import_zod2.z.array(import_zod2.z.string()).describe("top 3 solutions the product offers"),
                        uniqueValueProposition: import_zod2.z.string().describe("clear message that states the benefit of your product"),
                        unfairAdvantage: import_zod2.z.string().describe("something that cannot be easily copied or bought"),
                        customerSegments: import_zod2.z.array(import_zod2.z.string()).describe("list of target customer segments"),
                        keyMetrics: import_zod2.z.array(import_zod2.z.string()).describe("key numbers that tell you how your business is doing"),
                        channels: import_zod2.z.array(import_zod2.z.string()).describe("path to customers"),
                        costStructure: import_zod2.z.array(import_zod2.z.string()).describe("list of operational costs"),
                        revenueStreams: import_zod2.z.array(import_zod2.z.string()).describe("list of revenue sources")
                    });
                    _state.label = 1;
                case 1:
                    _state.trys.push([
                        1,
                        3,
                        ,
                        4
                    ]);
                    return [
                        4,
                        (0, import_ai_providers2.model)(modelName).generate({
                            prompt: "Create a Lean Canvas for: \n\n".concat(inputStr),
                            system: system,
                            temperature: temperature,
                            schema: schema
                        })
                    ];
                case 2:
                    result = _state.sent();
                    return [
                        2,
                        JSON.parse(result.text)
                    ];
                case 3:
                    error = _state.sent();
                    console.error("Error generating Lean Canvas:", error);
                    throw new Error("Failed to generate Lean Canvas");
                case 4:
                    return [
                        2
                    ];
            }
        });
    });
    return function leanCanvas(input) {
        return _ref.apply(this, arguments);
    };
}();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
    Goals: Goals,
    Plans: Plans,
    leanCanvas: leanCanvas,
    storyBrand: storyBrand
});
