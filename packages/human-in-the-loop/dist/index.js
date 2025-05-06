// src/platforms/slack/index.ts
function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
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
function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _iterable_to_array_limit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _sliced_to_array(arr, i) {
    return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
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
function createSlackMessage(taskId, input, config) {
    return _createSlackMessage.apply(this, arguments);
}
function _createSlackMessage() {
    _createSlackMessage = _async_to_generator(function(taskId, input, config) {
        return _ts_generator(this, function(_state) {
            console.log("Creating Slack message for task ".concat(taskId));
            console.log("Title: ".concat(config.title));
            console.log("Description: ".concat(config.description));
            return [
                2,
                {
                    messageId: "slack-".concat(taskId, "-").concat(Date.now())
                }
            ];
        });
    });
    return _createSlackMessage.apply(this, arguments);
}
function getSlackResponse(taskId) {
    return _getSlackResponse.apply(this, arguments);
}
function _getSlackResponse() {
    _getSlackResponse = _async_to_generator(function(taskId) {
        return _ts_generator(this, function(_state) {
            console.log("Getting response for Slack task ".concat(taskId));
            return [
                2,
                null
            ];
        });
    });
    return _getSlackResponse.apply(this, arguments);
}
var SlackHumanFunction = /*#__PURE__*/ function() {
    "use strict";
    function SlackHumanFunction(config) {
        _class_call_check(this, SlackHumanFunction);
        this.config = config;
    }
    _create_class(SlackHumanFunction, [
        {
            key: "request",
            value: function request(input) {
                var _this = this;
                return _async_to_generator(function() {
                    var taskId, messageId;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                taskId = "task-".concat(Date.now());
                                return [
                                    4,
                                    createSlackMessage(taskId, input, _this.config)
                                ];
                            case 1:
                                messageId = _state.sent().messageId;
                                return [
                                    2,
                                    {
                                        taskId: taskId,
                                        status: "pending",
                                        messageId: {
                                            slack: messageId,
                                            teams: "",
                                            react: "",
                                            email: ""
                                        }
                                    }
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "getResponse",
            value: function getResponse(taskId) {
                return _async_to_generator(function() {
                    return _ts_generator(this, function(_state) {
                        return [
                            2,
                            getSlackResponse(taskId)
                        ];
                    });
                })();
            }
        }
    ]);
    return SlackHumanFunction;
}();
function createTeamsMessage(taskId, input, config) {
    return _createTeamsMessage.apply(this, arguments);
}
function _createTeamsMessage() {
    _createTeamsMessage = // src/platforms/teams/index.ts
    _async_to_generator(function(taskId, input, config) {
        return _ts_generator(this, function(_state) {
            console.log("Creating Teams message for task ".concat(taskId));
            console.log("Title: ".concat(config.title));
            console.log("Description: ".concat(config.description));
            return [
                2,
                {
                    messageId: "teams-".concat(taskId, "-").concat(Date.now())
                }
            ];
        });
    });
    return _createTeamsMessage.apply(this, arguments);
}
function getTeamsResponse(taskId) {
    return _getTeamsResponse.apply(this, arguments);
}
function _getTeamsResponse() {
    _getTeamsResponse = _async_to_generator(function(taskId) {
        return _ts_generator(this, function(_state) {
            console.log("Getting response for Teams task ".concat(taskId));
            return [
                2,
                null
            ];
        });
    });
    return _getTeamsResponse.apply(this, arguments);
}
var TeamsHumanFunction = /*#__PURE__*/ function() {
    "use strict";
    function TeamsHumanFunction(config) {
        _class_call_check(this, TeamsHumanFunction);
        this.config = config;
    }
    _create_class(TeamsHumanFunction, [
        {
            key: "request",
            value: function request(input) {
                var _this = this;
                return _async_to_generator(function() {
                    var taskId, messageId;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                taskId = "task-".concat(Date.now());
                                return [
                                    4,
                                    createTeamsMessage(taskId, input, _this.config)
                                ];
                            case 1:
                                messageId = _state.sent().messageId;
                                return [
                                    2,
                                    {
                                        taskId: taskId,
                                        status: "pending",
                                        messageId: {
                                            slack: "",
                                            teams: messageId,
                                            react: "",
                                            email: ""
                                        }
                                    }
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "getResponse",
            value: function getResponse(taskId) {
                return _async_to_generator(function() {
                    return _ts_generator(this, function(_state) {
                        return [
                            2,
                            getTeamsResponse(taskId)
                        ];
                    });
                })();
            }
        }
    ]);
    return TeamsHumanFunction;
}();
// src/platforms/react/index.tsx
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
function HumanFeedback(param) {
    var taskId = param.taskId, title = param.title, description = param.description, input = param.input, options = param.options, freeText = param.freeText, onSubmit = param.onSubmit, config = param.config;
    var _config_styles, _config_styles1, _config_styles2, _config_styles3, _config_styles4, _config_styles5, _config_styles6;
    var _useState = _sliced_to_array(useState(""), 2), response = _useState[0], setResponse = _useState[1];
    var _useState1 = _sliced_to_array(useState(""), 2), selectedOption = _useState1[0], setSelectedOption = _useState1[1];
    var handleSubmit = function(e) {
        e.preventDefault();
        var responseObj = {};
        if (selectedOption) {
            responseObj.selectedOption = selectedOption;
        }
        if (response) {
            responseObj.freeText = response;
        }
        onSubmit(responseObj);
    };
    var styles = {
        container: _object_spread({
            maxWidth: "500px",
            margin: "0 auto",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            backgroundColor: (config === null || config === void 0 ? void 0 : config.theme) === "dark" ? "#1a1a1a" : "#fff",
            color: (config === null || config === void 0 ? void 0 : config.theme) === "dark" ? "#fff" : "#333"
        }, config === null || config === void 0 ? void 0 : (_config_styles = config.styles) === null || _config_styles === void 0 ? void 0 : _config_styles.container),
        title: _object_spread({
            fontSize: "20px",
            fontWeight: "bold",
            marginBottom: "10px"
        }, config === null || config === void 0 ? void 0 : (_config_styles1 = config.styles) === null || _config_styles1 === void 0 ? void 0 : _config_styles1.title),
        description: _object_spread({
            marginBottom: "20px"
        }, config === null || config === void 0 ? void 0 : (_config_styles2 = config.styles) === null || _config_styles2 === void 0 ? void 0 : _config_styles2.description),
        optionsContainer: _object_spread({
            marginBottom: "20px"
        }, config === null || config === void 0 ? void 0 : (_config_styles3 = config.styles) === null || _config_styles3 === void 0 ? void 0 : _config_styles3.optionsContainer),
        option: _object_spread({
            display: "block",
            margin: "8px 0"
        }, config === null || config === void 0 ? void 0 : (_config_styles4 = config.styles) === null || _config_styles4 === void 0 ? void 0 : _config_styles4.option),
        textarea: _object_spread({
            width: "100%",
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            minHeight: "100px",
            marginBottom: "20px",
            backgroundColor: (config === null || config === void 0 ? void 0 : config.theme) === "dark" ? "#333" : "#fff",
            color: (config === null || config === void 0 ? void 0 : config.theme) === "dark" ? "#fff" : "#333"
        }, config === null || config === void 0 ? void 0 : (_config_styles5 = config.styles) === null || _config_styles5 === void 0 ? void 0 : _config_styles5.textarea),
        button: _object_spread({
            padding: "10px 20px",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
        }, config === null || config === void 0 ? void 0 : (_config_styles6 = config.styles) === null || _config_styles6 === void 0 ? void 0 : _config_styles6.button)
    };
    return /* @__PURE__ */ jsxs("div", {
        style: styles.container,
        children: [
            /* @__PURE__ */ jsx("h2", {
                style: styles.title,
                children: title
            }),
            /* @__PURE__ */ jsx("p", {
                style: styles.description,
                children: description
            }),
            /* @__PURE__ */ jsxs("form", {
                onSubmit: handleSubmit,
                children: [
                    options && options.length > 0 && /* @__PURE__ */ jsx("div", {
                        style: styles.optionsContainer,
                        children: options.map(function(option, index) {
                            var value = typeof option === "string" ? option : option.value;
                            var label = typeof option === "string" ? option : option.label;
                            return /* @__PURE__ */ jsxs("label", {
                                style: styles.option,
                                children: [
                                    /* @__PURE__ */ jsx("input", {
                                        type: "radio",
                                        name: "option",
                                        value: value,
                                        checked: selectedOption === value,
                                        onChange: function() {
                                            return setSelectedOption(value);
                                        }
                                    }),
                                    " ",
                                    label
                                ]
                            }, index);
                        })
                    }),
                    freeText && /* @__PURE__ */ jsx("textarea", {
                        style: styles.textarea,
                        value: response,
                        onChange: function(e) {
                            return setResponse(e.target.value);
                        },
                        placeholder: "Enter your response..."
                    }),
                    /* @__PURE__ */ jsx("button", {
                        type: "submit",
                        style: styles.button,
                        children: "Submit"
                    })
                ]
            })
        ]
    });
}
var responses = /* @__PURE__ */ new Map();
var tasks = /* @__PURE__ */ new Map();
var ReactHumanFunction = /*#__PURE__*/ function() {
    "use strict";
    function ReactHumanFunction(config) {
        _class_call_check(this, ReactHumanFunction);
        this.config = config;
    }
    _create_class(ReactHumanFunction, [
        {
            key: "request",
            value: function request(input) {
                return _async_to_generator(function() {
                    var taskId;
                    return _ts_generator(this, function(_state) {
                        taskId = "task-".concat(Date.now());
                        tasks.set(taskId, {
                            status: "pending"
                        });
                        return [
                            2,
                            {
                                taskId: taskId,
                                status: "pending",
                                messageId: {
                                    slack: "",
                                    teams: "",
                                    react: taskId,
                                    email: ""
                                }
                            }
                        ];
                    });
                })();
            }
        },
        {
            key: "getResponse",
            value: function getResponse(taskId) {
                return _async_to_generator(function() {
                    var response;
                    return _ts_generator(this, function(_state) {
                        response = responses.get(taskId);
                        return [
                            2,
                            response || null
                        ];
                    });
                })();
            }
        },
        {
            /**
   * Handle a response submission
   */ key: "handleResponse",
            value: function handleResponse(taskId, response) {
                responses.set(taskId, response);
                tasks.set(taskId, {
                    status: "completed"
                });
            }
        },
        {
            /**
   * Get a React component for this human function
   */ key: "getComponent",
            value: function getComponent(taskId, input) {
                var _this = this;
                return /* @__PURE__ */ jsx(HumanFeedback, {
                    taskId: taskId,
                    title: this.config.title,
                    description: this.config.description,
                    input: input,
                    options: this.config.options,
                    freeText: this.config.freeText,
                    config: this.config,
                    onSubmit: function(response) {
                        return _this.handleResponse(taskId, response);
                    }
                });
            }
        }
    ]);
    return ReactHumanFunction;
}();
// src/platforms/email/index.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function EmailTemplate(param) {
    var taskId = param.taskId, title = param.title, description = param.description, options = param.options, callbackUrl = param.callbackUrl;
    return /* @__PURE__ */ jsxs2("div", {
        children: [
            /* @__PURE__ */ jsx2("h1", {
                children: title
            }),
            /* @__PURE__ */ jsx2("p", {
                children: description
            }),
            options && options.length > 0 && /* @__PURE__ */ jsxs2("div", {
                children: [
                    /* @__PURE__ */ jsx2("p", {
                        children: "Please select one of the following options:"
                    }),
                    /* @__PURE__ */ jsx2("ul", {
                        children: options.map(function(option, index) {
                            var value = typeof option === "string" ? option : option.value;
                            var label = typeof option === "string" ? option : option.label;
                            var responseUrl = callbackUrl ? "".concat(callbackUrl, "?taskId=").concat(taskId, "&option=").concat(encodeURIComponent(value)) : "#";
                            return /* @__PURE__ */ jsx2("li", {
                                children: /* @__PURE__ */ jsx2("a", {
                                    href: responseUrl,
                                    children: label
                                })
                            }, index);
                        })
                    })
                ]
            }),
            /* @__PURE__ */ jsx2("p", {
                children: "Or, you can reply to this email with your response."
            })
        ]
    });
}
function sendEmail(config) {
    return _sendEmail.apply(this, arguments);
}
function _sendEmail() {
    _sendEmail = _async_to_generator(function(config) {
        return _ts_generator(this, function(_state) {
            console.log("Sending email to ".concat(config.to));
            console.log("Title: ".concat(config.title));
            console.log("Description: ".concat(config.description));
            return [
                2,
                {
                    messageId: "email-".concat(config.taskId, "-").concat(Date.now())
                }
            ];
        });
    });
    return _sendEmail.apply(this, arguments);
}
function getEmailResponse(taskId) {
    return _getEmailResponse.apply(this, arguments);
}
function _getEmailResponse() {
    _getEmailResponse = _async_to_generator(function(taskId) {
        return _ts_generator(this, function(_state) {
            console.log("Getting response for email task ".concat(taskId));
            return [
                2,
                null
            ];
        });
    });
    return _getEmailResponse.apply(this, arguments);
}
var EmailHumanFunction = /*#__PURE__*/ function() {
    "use strict";
    function EmailHumanFunction(config) {
        _class_call_check(this, EmailHumanFunction);
        this.config = config;
    }
    _create_class(EmailHumanFunction, [
        {
            key: "request",
            value: function request(input) {
                var _this = this;
                return _async_to_generator(function() {
                    var taskId, messageId;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                taskId = "task-".concat(Date.now());
                                return [
                                    4,
                                    sendEmail(_object_spread_props(_object_spread({}, _this.config), {
                                        taskId: taskId
                                    }))
                                ];
                            case 1:
                                messageId = _state.sent().messageId;
                                return [
                                    2,
                                    {
                                        taskId: taskId,
                                        status: "pending",
                                        messageId: {
                                            slack: "",
                                            teams: "",
                                            react: "",
                                            email: messageId
                                        }
                                    }
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "getResponse",
            value: function getResponse(taskId) {
                return _async_to_generator(function() {
                    return _ts_generator(this, function(_state) {
                        return [
                            2,
                            getEmailResponse(taskId)
                        ];
                    });
                })();
            }
        },
        {
            /**
   * Get a React component for this email template
   */ key: "getEmailComponent",
            value: function getEmailComponent(taskId) {
                return /* @__PURE__ */ jsx2(EmailTemplate, {
                    taskId: taskId,
                    title: this.config.title,
                    description: this.config.description,
                    options: this.config.options,
                    callbackUrl: this.config.callbackUrl
                });
            }
        }
    ]);
    return EmailHumanFunction;
}();
// src/core/factory.ts
function createHumanFunction(options) {
    var platform = options.platform;
    switch(platform){
        case "slack":
            return new SlackHumanFunction(options);
        case "teams":
            return new TeamsHumanFunction(options);
        case "react":
            return new ReactHumanFunction(options);
        case "email":
            if (!options.to) {
                throw new Error('Email platform requires a "to" field in options');
            }
            return new EmailHumanFunction(options);
        default:
            throw new Error("Unsupported platform: ".concat(platform));
    }
}
export { EmailHumanFunction, EmailTemplate, HumanFeedback, ReactHumanFunction, SlackHumanFunction, TeamsHumanFunction, createHumanFunction, createSlackMessage, createTeamsMessage, getEmailResponse, getSlackResponse, getTeamsResponse, sendEmail };
