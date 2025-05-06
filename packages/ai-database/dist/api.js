'use strict'
function _array_like_to_array(arr, len) {
  if (len == null || len > arr.length) len = arr.length
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]
  return arr2
}
function _array_with_holes(arr) {
  if (Array.isArray(arr)) return arr
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg)
    var value = info.value
  } catch (error) {
    reject(error)
    return
  }
  if (info.done) {
    resolve(value)
  } else {
    Promise.resolve(value).then(_next, _throw)
  }
}
function _async_to_generator(fn) {
  return function () {
    var self = this,
      args = arguments
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args)
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value)
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err)
      }
      _next(undefined)
    })
  }
}
function _instanceof(left, right) {
  if (right != null && typeof Symbol !== 'undefined' && right[Symbol.hasInstance]) {
    return !!right[Symbol.hasInstance](left)
  } else {
    return left instanceof right
  }
}
function _iterable_to_array_limit(arr, i) {
  var _i = arr == null ? null : (typeof Symbol !== 'undefined' && arr[Symbol.iterator]) || arr['@@iterator']
  if (_i == null) return
  var _arr = []
  var _n = true
  var _d = false
  var _s, _e
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value)
      if (i && _arr.length === i) break
    }
  } catch (err) {
    _d = true
    _e = err
  } finally {
    try {
      if (!_n && _i['return'] != null) _i['return']()
    } finally {
      if (_d) throw _e
    }
  }
  return _arr
}
function _non_iterable_rest() {
  throw new TypeError(
    'Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
  )
}
function _sliced_to_array(arr, i) {
  return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest()
}
function _type_of(obj) {
  '@swc/helpers - typeof'
  return obj && typeof Symbol !== 'undefined' && obj.constructor === Symbol ? 'symbol' : typeof obj
}
function _unsupported_iterable_to_array(o, minLen) {
  if (!o) return
  if (typeof o === 'string') return _array_like_to_array(o, minLen)
  var n = Object.prototype.toString.call(o).slice(8, -1)
  if (n === 'Object' && o.constructor) n = o.constructor.name
  if (n === 'Map' || n === 'Set') return Array.from(n)
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen)
}
function _ts_generator(thisArg, body) {
  var f,
    y,
    t,
    g,
    _ = {
      label: 0,
      sent: function () {
        if (t[0] & 1) throw t[1]
        return t[1]
      },
      trys: [],
      ops: [],
    }
  return (
    (g = {
      next: verb(0),
      throw: verb(1),
      return: verb(2),
    }),
    typeof Symbol === 'function' &&
      (g[Symbol.iterator] = function () {
        return this
      }),
    g
  )
  function verb(n) {
    return function (v) {
      return step([n, v])
    }
  }
  function step(op) {
    if (f) throw new TypeError('Generator is already executing.')
    while (_)
      try {
        if (((f = 1), y && (t = op[0] & 2 ? y['return'] : op[0] ? y['throw'] || ((t = y['return']) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done))
          return t
        if (((y = 0), t)) op = [op[0] & 2, t.value]
        switch (op[0]) {
          case 0:
          case 1:
            t = op
            break
          case 4:
            _.label++
            return {
              value: op[1],
              done: false,
            }
          case 5:
            _.label++
            y = op[1]
            op = [0]
            continue
          case 7:
            op = _.ops.pop()
            _.trys.pop()
            continue
          default:
            if (!((t = _.trys), (t = t.length > 0 && t[t.length - 1])) && (op[0] === 6 || op[0] === 2)) {
              _ = 0
              continue
            }
            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
              _.label = op[1]
              break
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1]
              t = op
              break
            }
            if (t && _.label < t[2]) {
              _.label = t[2]
              _.ops.push(op)
              break
            }
            if (t[2]) _.ops.pop()
            _.trys.pop()
            continue
        }
        op = body.call(thisArg, _)
      } catch (e) {
        op = [6, e]
        y = 0
      } finally {
        f = t = 0
      }
    if (op[0] & 5) throw op[1]
    return {
      value: op[0] ? op[1] : void 0,
      done: true,
    }
  }
}
var __defProp = Object.defineProperty
var __getOwnPropDesc = Object.getOwnPropertyDescriptor
var __getOwnPropNames = Object.getOwnPropertyNames
var __hasOwnProp = Object.prototype.hasOwnProperty
var __export = function (target, all) {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
    })
}
var __copyProps = function (to, from, except, desc) {
  if ((from && (typeof from === 'undefined' ? 'undefined' : _type_of(from)) === 'object') || typeof from === 'function') {
    var _iteratorNormalCompletion = true,
      _didIteratorError = false,
      _iteratorError = undefined
    try {
      var _loop = function () {
        var key = _step.value
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, {
            get: function () {
              return from[key]
            },
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
          })
      }
      for (
        var _iterator = __getOwnPropNames(from)[Symbol.iterator](), _step;
        !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
        _iteratorNormalCompletion = true
      )
        _loop()
    } catch (err) {
      _didIteratorError = true
      _iteratorError = err
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return()
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError
        }
      }
    }
  }
  return to
}
var __toCommonJS = function (mod) {
  return __copyProps(
    __defProp({}, '__esModule', {
      value: true,
    }),
    mod
  )
}
// api/index.ts
var api_exports = {}
__export(api_exports, {
  DELETE: function () {
    return DELETE
  },
  GET: function () {
    return GET
  },
  PATCH: function () {
    return PATCH
  },
  POST: function () {
    return POST
  },
})
module.exports = __toCommonJS(api_exports)
// src/lib/api.ts
var import_server = require('next/server')
var API = function (handler) {
  return (function () {
    var _ref = _async_to_generator(function (req, context) {
      var url, path, domain, origin, db, ctx, result, error, status, errorMessage, errorResponseBody
      return _ts_generator(this, function (_state) {
        switch (_state.label) {
          case 0:
            _state.trys.push([0, 2, , 3])
            url = new URL(req.url)
            path = url.pathname
            domain = url.hostname
            origin = url.origin
            db = {}
            ctx = {
              params: context.params,
              url: url,
              path: path,
              domain: domain,
              origin: origin,
              db: db,
              req: req,
            }
            return [4, handler(req, ctx)]
          case 1:
            result = _state.sent()
            if (_instanceof(result, import_server.NextResponse)) {
              return [2, result]
            }
            return [2, import_server.NextResponse.json(result)]
          case 2:
            error = _state.sent()
            console.error('API Error:', error)
            status = _instanceof(error, Error) && 'statusCode' in error ? error.statusCode : 500
            errorMessage = _instanceof(error, Error) ? error.message : 'Internal Server Error'
            errorResponseBody = {
              error: {
                message: errorMessage,
                status: status,
              },
            }
            return [
              2,
              import_server.NextResponse.json(errorResponseBody, {
                status: status,
              }),
            ]
          case 3:
            return [2]
        }
      })
    })
    return function (req, context) {
      return _ref.apply(this, arguments)
    }
  })()
}
// src/api/[[...path]]/route.ts
var GET = API(
  (function () {
    var _ref = _async_to_generator(function (request, param) {
      var db, params, path, _path, _, type, id, url, limit, page, query, results
      return _ts_generator(this, function (_state) {
        switch (_state.label) {
          case 0:
            ;(db = param.db), (params = param.params)
            path = request.url.split('/').filter(Boolean)
            ;(_path = _sliced_to_array(path, 3)), (_ = _path[0]), (type = _path[1]), (id = _path[2])
            if (id) {
              if (!db[type]) {
                return [
                  2,
                  {
                    errors: [
                      {
                        message: "Collection '".concat(type, "' not found"),
                      },
                    ],
                  },
                ]
              }
              return [2, db[type].get(id)]
            }
            if (!db[type]) {
              return [
                2,
                {
                  errors: [
                    {
                      message: "Collection '".concat(type, "' not found"),
                    },
                  ],
                },
              ]
            }
            url = new URL(request.url)
            limit = parseInt(url.searchParams.get('limit') || '10', 10)
            page = parseInt(url.searchParams.get('page') || '1', 10)
            query = {}
            url.searchParams.forEach(function (value, key) {
              if (!['limit', 'page'].includes(key)) {
                query[key] = value
              }
            })
            return [
              4,
              db[type].find({
                where: query,
                limit: limit,
                page: page,
              }),
            ]
          case 1:
            results = _state.sent()
            return [2, results]
        }
      })
    })
    return function (request, _) {
      return _ref.apply(this, arguments)
    }
  })()
)
var POST = API(
  (function () {
    var _ref = _async_to_generator(function (request, param) {
      var db, path, _path, _, type, body
      return _ts_generator(this, function (_state) {
        switch (_state.label) {
          case 0:
            db = param.db
            path = request.url.split('/').filter(Boolean)
            ;(_path = _sliced_to_array(path, 2)), (_ = _path[0]), (type = _path[1])
            if (!db[type]) {
              return [
                2,
                {
                  errors: [
                    {
                      message: "Collection '".concat(type, "' not found"),
                    },
                  ],
                },
              ]
            }
            return [4, request.json()]
          case 1:
            body = _state.sent()
            return [2, db[type].create(body)]
        }
      })
    })
    return function (request, _) {
      return _ref.apply(this, arguments)
    }
  })()
)
var PATCH = API(
  (function () {
    var _ref = _async_to_generator(function (request, param) {
      var db, path, _path, _, type, id, body
      return _ts_generator(this, function (_state) {
        switch (_state.label) {
          case 0:
            db = param.db
            path = request.url.split('/').filter(Boolean)
            ;(_path = _sliced_to_array(path, 3)), (_ = _path[0]), (type = _path[1]), (id = _path[2])
            if (!id) {
              return [
                2,
                {
                  errors: [
                    {
                      message: 'ID is required for update operations',
                    },
                  ],
                },
              ]
            }
            if (!db[type]) {
              return [
                2,
                {
                  errors: [
                    {
                      message: "Collection '".concat(type, "' not found"),
                    },
                  ],
                },
              ]
            }
            return [4, request.json()]
          case 1:
            body = _state.sent()
            return [2, db[type].update(id, body)]
        }
      })
    })
    return function (request, _) {
      return _ref.apply(this, arguments)
    }
  })()
)
var DELETE = API(
  (function () {
    var _ref = _async_to_generator(function (request, param) {
      var db, path, _path, _, type, id
      return _ts_generator(this, function (_state) {
        db = param.db
        path = request.url.split('/').filter(Boolean)
        ;(_path = _sliced_to_array(path, 3)), (_ = _path[0]), (type = _path[1]), (id = _path[2])
        if (!id) {
          return [
            2,
            {
              errors: [
                {
                  message: 'ID is required for delete operations',
                },
              ],
            },
          ]
        }
        if (!db[type]) {
          return [
            2,
            {
              errors: [
                {
                  message: "Collection '".concat(type, "' not found"),
                },
              ],
            },
          ]
        }
        return [2, db[type].delete(id)]
      })
    })
    return function (request, _) {
      return _ref.apply(this, arguments)
    }
  })()
)
// Annotate the CommonJS export names for ESM import in node:
0 &&
  (module.exports = {
    DELETE: DELETE,
    GET: GET,
    PATCH: PATCH,
    POST: POST,
  })
