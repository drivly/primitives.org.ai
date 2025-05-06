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
import { API } from "./chunk-6H6DOO7A.mjs";
import { runAdmin } from "./chunk-P7NJN6D6.mjs";
// src/collections/nouns.ts
var Nouns = {
    slug: "nouns",
    fields: [
        {
            name: "name",
            type: "text"
        },
        {
            name: "singular",
            type: "text",
            admin: {
                description: "Singular form like User"
            }
        },
        {
            name: "plural",
            type: "text",
            admin: {
                description: "Plural form like Users"
            }
        },
        {
            name: "possessive",
            type: "text",
            admin: {
                description: "Possessive form like User's"
            }
        },
        {
            name: "pluralPossessive",
            type: "text",
            admin: {
                description: "Plural possessive form like Users'"
            }
        },
        {
            name: "verb",
            type: "text",
            admin: {
                description: "Related verb like Use"
            }
        },
        {
            name: "act",
            type: "text",
            admin: {
                description: "Third person singular present tense like Uses"
            }
        },
        {
            name: "activity",
            type: "text",
            admin: {
                description: "Gerund like Using"
            }
        },
        {
            name: "event",
            type: "text",
            admin: {
                description: "Past tense like Used"
            }
        }
    ]
};
// src/collections/verbs.ts
var Verbs = {
    slug: "verbs",
    fields: [
        {
            name: "action",
            type: "text",
            admin: {
                description: "Active tense like Create"
            }
        },
        {
            name: "act",
            type: "text",
            admin: {
                description: "Third person singular present tense like Creates"
            }
        },
        {
            name: "activity",
            type: "text",
            admin: {
                description: "Gerund like Creating"
            }
        },
        {
            name: "event",
            type: "text",
            admin: {
                description: "Past tense like Created"
            }
        },
        {
            name: "subject",
            type: "text",
            admin: {
                description: "Subject like Creator"
            }
        },
        {
            name: "object",
            type: "text",
            admin: {
                description: "Object like Creation"
            }
        },
        {
            name: "inverse",
            type: "text",
            admin: {
                description: "Opposite like Destroy"
            }
        },
        {
            name: "inverseAct",
            type: "text",
            admin: {
                description: "Third person singular present tense like Destroys"
            }
        },
        {
            name: "inverseActivity",
            type: "text",
            admin: {
                description: "Gerund like Destroying"
            }
        },
        {
            name: "inverseEvent",
            type: "text",
            admin: {
                description: "Past tense like Destroyed"
            }
        },
        {
            name: "inverseSubject",
            type: "text",
            admin: {
                description: "Subject like Destroyer"
            }
        },
        {
            name: "inverseObject",
            type: "text",
            admin: {
                description: "Object like Destruction"
            }
        }
    ]
};
// src/collections/resources.ts
var Resources = {
    slug: "resources",
    fields: [
        {
            name: "name",
            type: "text"
        },
        {
            name: "sqid",
            type: "text",
            admin: {
                readOnly: true
            },
            index: true
        },
        {
            name: "hash",
            type: "text",
            admin: {
                readOnly: true
            },
            index: true
        },
        {
            name: "type",
            type: "relationship",
            relationTo: [
                "nouns"
            ]
        },
        {
            name: "data",
            type: "json"
        },
        {
            name: "embedding",
            type: "json",
            admin: {
                hidden: true
            },
            index: false
        },
        {
            name: "content",
            type: "richText"
        }
    ]
};
// src/collections/relationships.ts
var Relationships = {
    slug: "relationships",
    fields: [
        {
            name: "subject",
            type: "relationship",
            relationTo: "resources"
        },
        {
            name: "verb",
            type: "relationship",
            relationTo: "verbs"
        },
        {
            name: "object",
            type: "relationship",
            relationTo: "resources"
        },
        {
            name: "hash",
            type: "text"
        }
    ]
};
// src/lib/db.ts
var createPayloadDB = function(payload) {
    var db = {};
    var collections = payload.collections || {};
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        var _loop = function() {
            var collectionName = _step.value;
            db[collectionName] = {
                find: /*#__PURE__*/ _async_to_generator(function() {
                    var query;
                    var _arguments = arguments;
                    return _ts_generator(this, function(_state) {
                        query = _arguments.length > 0 && _arguments[0] !== void 0 ? _arguments[0] : {};
                        return [
                            2,
                            payload.find({
                                collection: collectionName,
                                where: query
                            })
                        ];
                    });
                }),
                findOne: /*#__PURE__*/ _async_to_generator(function() {
                    var query, _result_docs, result;
                    var _arguments = arguments;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                query = _arguments.length > 0 && _arguments[0] !== void 0 ? _arguments[0] : {};
                                return [
                                    4,
                                    payload.find({
                                        collection: collectionName,
                                        where: query,
                                        limit: 1
                                    })
                                ];
                            case 1:
                                result = _state.sent();
                                return [
                                    2,
                                    ((_result_docs = result.docs) === null || _result_docs === void 0 ? void 0 : _result_docs[0]) || null
                                ];
                        }
                    });
                }),
                get: function() {
                    var _ref = _async_to_generator(function(id) {
                        var query;
                        var _arguments = arguments;
                        return _ts_generator(this, function(_state) {
                            query = _arguments.length > 1 && _arguments[1] !== void 0 ? _arguments[1] : {};
                            return [
                                2,
                                payload.findByID(_object_spread({
                                    collection: collectionName,
                                    id: id
                                }, query))
                            ];
                        });
                    });
                    return function(id) {
                        return _ref.apply(this, arguments);
                    };
                }(),
                create: function() {
                    var _ref = _async_to_generator(function(data) {
                        var query;
                        var _arguments = arguments;
                        return _ts_generator(this, function(_state) {
                            query = _arguments.length > 1 && _arguments[1] !== void 0 ? _arguments[1] : {};
                            return [
                                2,
                                payload.create(_object_spread({
                                    collection: collectionName,
                                    data: data
                                }, query))
                            ];
                        });
                    });
                    return function(data) {
                        return _ref.apply(this, arguments);
                    };
                }(),
                update: function() {
                    var _ref = _async_to_generator(function(id, data) {
                        var query;
                        var _arguments = arguments;
                        return _ts_generator(this, function(_state) {
                            query = _arguments.length > 2 && _arguments[2] !== void 0 ? _arguments[2] : {};
                            return [
                                2,
                                payload.update(_object_spread({
                                    collection: collectionName,
                                    id: id,
                                    data: data
                                }, query))
                            ];
                        });
                    });
                    return function(id, data) {
                        return _ref.apply(this, arguments);
                    };
                }(),
                upsert: function() {
                    var _ref = _async_to_generator(function(id, data) {
                        var query, error;
                        var _arguments = arguments;
                        return _ts_generator(this, function(_state) {
                            switch(_state.label){
                                case 0:
                                    query = _arguments.length > 2 && _arguments[2] !== void 0 ? _arguments[2] : {};
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
                                        payload.findByID({
                                            collection: collectionName,
                                            id: id
                                        })
                                    ];
                                case 2:
                                    _state.sent();
                                    return [
                                        2,
                                        payload.update(_object_spread({
                                            collection: collectionName,
                                            id: id,
                                            data: data
                                        }, query))
                                    ];
                                case 3:
                                    error = _state.sent();
                                    return [
                                        2,
                                        payload.create(_object_spread({
                                            collection: collectionName,
                                            data: _object_spread({
                                                id: id
                                            }, data)
                                        }, query))
                                    ];
                                case 4:
                                    return [
                                        2
                                    ];
                            }
                        });
                    });
                    return function(id, data) {
                        return _ref.apply(this, arguments);
                    };
                }(),
                set: function() {
                    var _ref = _async_to_generator(function(id, data) {
                        var query;
                        var _arguments = arguments;
                        return _ts_generator(this, function(_state) {
                            query = _arguments.length > 2 && _arguments[2] !== void 0 ? _arguments[2] : {};
                            return [
                                2,
                                payload.update(_object_spread({
                                    collection: collectionName,
                                    id: id,
                                    data: data
                                }, query))
                            ];
                        });
                    });
                    return function(id, data) {
                        return _ref.apply(this, arguments);
                    };
                }(),
                delete: function() {
                    var _ref = _async_to_generator(function(id) {
                        var query;
                        var _arguments = arguments;
                        return _ts_generator(this, function(_state) {
                            query = _arguments.length > 1 && _arguments[1] !== void 0 ? _arguments[1] : {};
                            return [
                                2,
                                payload.delete(_object_spread({
                                    collection: collectionName,
                                    id: id
                                }, query))
                            ];
                        });
                    });
                    return function(id) {
                        return _ref.apply(this, arguments);
                    };
                }()
            };
        };
        for(var _iterator = Object.keys(collections)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true)_loop();
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
    return db;
};
var initializePayloadDB = function() {
    var _ref = _async_to_generator(function(config) {
        var getPayload, payload, error;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    _state.trys.push([
                        0,
                        3,
                        ,
                        4
                    ]);
                    return [
                        4,
                        import("payload")
                    ];
                case 1:
                    getPayload = _state.sent().getPayload;
                    return [
                        4,
                        getPayload({
                            config: config,
                            secret: process.env.PAYLOAD_SECRET || "default-secret-key",
                            local: true
                        })
                    ];
                case 2:
                    payload = _state.sent();
                    return [
                        2,
                        createPayloadDB(payload)
                    ];
                case 3:
                    error = _state.sent();
                    console.error("Error initializing payload DB:", error);
                    throw error;
                case 4:
                    return [
                        2
                    ];
            }
        });
    });
    return function initializePayloadDB(config) {
        return _ref.apply(this, arguments);
    };
}();
export { API, Nouns, Relationships, Resources, Verbs, createPayloadDB, initializePayloadDB, runAdmin };
