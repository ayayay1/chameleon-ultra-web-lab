var __defProp = Object.defineProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);

// node_modules/lodash-es/_freeGlobal.js
var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
var freeGlobal_default = freeGlobal;

// node_modules/lodash-es/_root.js
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root = freeGlobal_default || freeSelf || Function("return this")();
var root_default = root;

// node_modules/lodash-es/_Symbol.js
var Symbol2 = root_default.Symbol;
var Symbol_default = Symbol2;

// node_modules/lodash-es/_getRawTag.js
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
var nativeObjectToString = objectProto.toString;
var symToStringTag = Symbol_default ? Symbol_default.toStringTag : void 0;
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
  try {
    value[symToStringTag] = void 0;
    var unmasked = true;
  } catch (e3) {
  }
  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}
var getRawTag_default = getRawTag;

// node_modules/lodash-es/_objectToString.js
var objectProto2 = Object.prototype;
var nativeObjectToString2 = objectProto2.toString;
function objectToString(value) {
  return nativeObjectToString2.call(value);
}
var objectToString_default = objectToString;

// node_modules/lodash-es/_baseGetTag.js
var nullTag = "[object Null]";
var undefinedTag = "[object Undefined]";
var symToStringTag2 = Symbol_default ? Symbol_default.toStringTag : void 0;
function baseGetTag(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return symToStringTag2 && symToStringTag2 in Object(value) ? getRawTag_default(value) : objectToString_default(value);
}
var baseGetTag_default = baseGetTag;

// node_modules/lodash-es/isObjectLike.js
function isObjectLike(value) {
  return value != null && typeof value == "object";
}
var isObjectLike_default = isObjectLike;

// node_modules/lodash-es/isSymbol.js
var symbolTag = "[object Symbol]";
function isSymbol(value) {
  return typeof value == "symbol" || isObjectLike_default(value) && baseGetTag_default(value) == symbolTag;
}
var isSymbol_default = isSymbol;

// node_modules/lodash-es/_arrayMap.js
function arrayMap(array, iteratee) {
  var index = -1, length = array == null ? 0 : array.length, result = Array(length);
  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}
var arrayMap_default = arrayMap;

// node_modules/lodash-es/isArray.js
var isArray = Array.isArray;
var isArray_default = isArray;

// node_modules/lodash-es/_baseToString.js
var INFINITY = 1 / 0;
var symbolProto = Symbol_default ? Symbol_default.prototype : void 0;
var symbolToString = symbolProto ? symbolProto.toString : void 0;
function baseToString(value) {
  if (typeof value == "string") {
    return value;
  }
  if (isArray_default(value)) {
    return arrayMap_default(value, baseToString) + "";
  }
  if (isSymbol_default(value)) {
    return symbolToString ? symbolToString.call(value) : "";
  }
  var result = value + "";
  return result == "0" && 1 / value == -INFINITY ? "-0" : result;
}
var baseToString_default = baseToString;

// node_modules/lodash-es/_trimmedEndIndex.js
var reWhitespace = /\s/;
function trimmedEndIndex(string) {
  var index = string.length;
  while (index-- && reWhitespace.test(string.charAt(index))) {
  }
  return index;
}
var trimmedEndIndex_default = trimmedEndIndex;

// node_modules/lodash-es/_baseTrim.js
var reTrimStart = /^\s+/;
function baseTrim(string) {
  return string ? string.slice(0, trimmedEndIndex_default(string) + 1).replace(reTrimStart, "") : string;
}
var baseTrim_default = baseTrim;

// node_modules/lodash-es/isObject.js
function isObject(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}
var isObject_default = isObject;

// node_modules/lodash-es/toNumber.js
var NAN = 0 / 0;
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
var reIsBinary = /^0b[01]+$/i;
var reIsOctal = /^0o[0-7]+$/i;
var freeParseInt = parseInt;
function toNumber(value) {
  if (typeof value == "number") {
    return value;
  }
  if (isSymbol_default(value)) {
    return NAN;
  }
  if (isObject_default(value)) {
    var other = typeof value.valueOf == "function" ? value.valueOf() : value;
    value = isObject_default(other) ? other + "" : other;
  }
  if (typeof value != "string") {
    return value === 0 ? value : +value;
  }
  value = baseTrim_default(value);
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}
var toNumber_default = toNumber;

// node_modules/lodash-es/toFinite.js
var INFINITY2 = 1 / 0;
var MAX_INTEGER = 17976931348623157e292;
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber_default(value);
  if (value === INFINITY2 || value === -INFINITY2) {
    var sign = value < 0 ? -1 : 1;
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}
var toFinite_default = toFinite;

// node_modules/lodash-es/toInteger.js
function toInteger(value) {
  var result = toFinite_default(value), remainder = result % 1;
  return result === result ? remainder ? result - remainder : result : 0;
}
var toInteger_default = toInteger;

// node_modules/lodash-es/identity.js
function identity(value) {
  return value;
}
var identity_default = identity;

// node_modules/lodash-es/isFunction.js
var asyncTag = "[object AsyncFunction]";
var funcTag = "[object Function]";
var genTag = "[object GeneratorFunction]";
var proxyTag = "[object Proxy]";
function isFunction(value) {
  if (!isObject_default(value)) {
    return false;
  }
  var tag = baseGetTag_default(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}
var isFunction_default = isFunction;

// node_modules/lodash-es/_coreJsData.js
var coreJsData = root_default["__core-js_shared__"];
var coreJsData_default = coreJsData;

// node_modules/lodash-es/_isMasked.js
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData_default && coreJsData_default.keys && coreJsData_default.keys.IE_PROTO || "");
  return uid ? "Symbol(src)_1." + uid : "";
})();
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
var isMasked_default = isMasked;

// node_modules/lodash-es/_toSource.js
var funcProto = Function.prototype;
var funcToString = funcProto.toString;
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e3) {
    }
    try {
      return func + "";
    } catch (e3) {
    }
  }
  return "";
}
var toSource_default = toSource;

// node_modules/lodash-es/_baseIsNative.js
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reIsHostCtor = /^\[object .+?Constructor\]$/;
var funcProto2 = Function.prototype;
var objectProto3 = Object.prototype;
var funcToString2 = funcProto2.toString;
var hasOwnProperty2 = objectProto3.hasOwnProperty;
var reIsNative = RegExp(
  "^" + funcToString2.call(hasOwnProperty2).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function baseIsNative(value) {
  if (!isObject_default(value) || isMasked_default(value)) {
    return false;
  }
  var pattern = isFunction_default(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource_default(value));
}
var baseIsNative_default = baseIsNative;

// node_modules/lodash-es/_getValue.js
function getValue(object, key) {
  return object == null ? void 0 : object[key];
}
var getValue_default = getValue;

// node_modules/lodash-es/_getNative.js
function getNative(object, key) {
  var value = getValue_default(object, key);
  return baseIsNative_default(value) ? value : void 0;
}
var getNative_default = getNative;

// node_modules/lodash-es/_WeakMap.js
var WeakMap2 = getNative_default(root_default, "WeakMap");
var WeakMap_default = WeakMap2;

// node_modules/lodash-es/_baseCreate.js
var objectCreate = Object.create;
var baseCreate = /* @__PURE__ */ (function() {
  function object() {
  }
  return function(proto) {
    if (!isObject_default(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object();
    object.prototype = void 0;
    return result;
  };
})();
var baseCreate_default = baseCreate;

// node_modules/lodash-es/_apply.js
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0:
      return func.call(thisArg);
    case 1:
      return func.call(thisArg, args[0]);
    case 2:
      return func.call(thisArg, args[0], args[1]);
    case 3:
      return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}
var apply_default = apply;

// node_modules/lodash-es/noop.js
function noop() {
}
var noop_default = noop;

// node_modules/lodash-es/_copyArray.js
function copyArray(source, array) {
  var index = -1, length = source.length;
  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}
var copyArray_default = copyArray;

// node_modules/lodash-es/_shortOut.js
var HOT_COUNT = 800;
var HOT_SPAN = 16;
var nativeNow = Date.now;
function shortOut(func) {
  var count = 0, lastCalled = 0;
  return function() {
    var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(void 0, arguments);
  };
}
var shortOut_default = shortOut;

// node_modules/lodash-es/constant.js
function constant(value) {
  return function() {
    return value;
  };
}
var constant_default = constant;

// node_modules/lodash-es/_defineProperty.js
var defineProperty = (function() {
  try {
    var func = getNative_default(Object, "defineProperty");
    func({}, "", {});
    return func;
  } catch (e3) {
  }
})();
var defineProperty_default = defineProperty;

// node_modules/lodash-es/_baseSetToString.js
var baseSetToString = !defineProperty_default ? identity_default : function(func, string) {
  return defineProperty_default(func, "toString", {
    "configurable": true,
    "enumerable": false,
    "value": constant_default(string),
    "writable": true
  });
};
var baseSetToString_default = baseSetToString;

// node_modules/lodash-es/_setToString.js
var setToString = shortOut_default(baseSetToString_default);
var setToString_default = setToString;

// node_modules/lodash-es/_baseFindIndex.js
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
  while (fromRight ? index-- : ++index < length) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}
var baseFindIndex_default = baseFindIndex;

// node_modules/lodash-es/_baseIsNaN.js
function baseIsNaN(value) {
  return value !== value;
}
var baseIsNaN_default = baseIsNaN;

// node_modules/lodash-es/_strictIndexOf.js
function strictIndexOf(array, value, fromIndex) {
  var index = fromIndex - 1, length = array.length;
  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}
var strictIndexOf_default = strictIndexOf;

// node_modules/lodash-es/_baseIndexOf.js
function baseIndexOf(array, value, fromIndex) {
  return value === value ? strictIndexOf_default(array, value, fromIndex) : baseFindIndex_default(array, baseIsNaN_default, fromIndex);
}
var baseIndexOf_default = baseIndexOf;

// node_modules/lodash-es/_arrayIncludes.js
function arrayIncludes(array, value) {
  var length = array == null ? 0 : array.length;
  return !!length && baseIndexOf_default(array, value, 0) > -1;
}
var arrayIncludes_default = arrayIncludes;

// node_modules/lodash-es/_isIndex.js
var MAX_SAFE_INTEGER = 9007199254740991;
var reIsUint = /^(?:0|[1-9]\d*)$/;
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
}
var isIndex_default = isIndex;

// node_modules/lodash-es/_baseAssignValue.js
function baseAssignValue(object, key, value) {
  if (key == "__proto__" && defineProperty_default) {
    defineProperty_default(object, key, {
      "configurable": true,
      "enumerable": true,
      "value": value,
      "writable": true
    });
  } else {
    object[key] = value;
  }
}
var baseAssignValue_default = baseAssignValue;

// node_modules/lodash-es/eq.js
function eq(value, other) {
  return value === other || value !== value && other !== other;
}
var eq_default = eq;

// node_modules/lodash-es/_assignValue.js
var objectProto4 = Object.prototype;
var hasOwnProperty3 = objectProto4.hasOwnProperty;
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty3.call(object, key) && eq_default(objValue, value)) || value === void 0 && !(key in object)) {
    baseAssignValue_default(object, key, value);
  }
}
var assignValue_default = assignValue;

// node_modules/lodash-es/_copyObject.js
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});
  var index = -1, length = props.length;
  while (++index < length) {
    var key = props[index];
    var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
    if (newValue === void 0) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue_default(object, key, newValue);
    } else {
      assignValue_default(object, key, newValue);
    }
  }
  return object;
}
var copyObject_default = copyObject;

// node_modules/lodash-es/_overRest.js
var nativeMax = Math.max;
function overRest(func, start, transform) {
  start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
  return function() {
    var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length);
    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply_default(func, this, otherArgs);
  };
}
var overRest_default = overRest;

// node_modules/lodash-es/_baseRest.js
function baseRest(func, start) {
  return setToString_default(overRest_default(func, start, identity_default), func + "");
}
var baseRest_default = baseRest;

// node_modules/lodash-es/isLength.js
var MAX_SAFE_INTEGER2 = 9007199254740991;
function isLength(value) {
  return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER2;
}
var isLength_default = isLength;

// node_modules/lodash-es/isArrayLike.js
function isArrayLike(value) {
  return value != null && isLength_default(value.length) && !isFunction_default(value);
}
var isArrayLike_default = isArrayLike;

// node_modules/lodash-es/_isIterateeCall.js
function isIterateeCall(value, index, object) {
  if (!isObject_default(object)) {
    return false;
  }
  var type = typeof index;
  if (type == "number" ? isArrayLike_default(object) && isIndex_default(index, object.length) : type == "string" && index in object) {
    return eq_default(object[index], value);
  }
  return false;
}
var isIterateeCall_default = isIterateeCall;

// node_modules/lodash-es/_createAssigner.js
function createAssigner(assigner) {
  return baseRest_default(function(object, sources) {
    var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : void 0, guard = length > 2 ? sources[2] : void 0;
    customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : void 0;
    if (guard && isIterateeCall_default(sources[0], sources[1], guard)) {
      customizer = length < 3 ? void 0 : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}
var createAssigner_default = createAssigner;

// node_modules/lodash-es/_isPrototype.js
var objectProto5 = Object.prototype;
function isPrototype(value) {
  var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto5;
  return value === proto;
}
var isPrototype_default = isPrototype;

// node_modules/lodash-es/_baseTimes.js
function baseTimes(n3, iteratee) {
  var index = -1, result = Array(n3);
  while (++index < n3) {
    result[index] = iteratee(index);
  }
  return result;
}
var baseTimes_default = baseTimes;

// node_modules/lodash-es/_baseIsArguments.js
var argsTag = "[object Arguments]";
function baseIsArguments(value) {
  return isObjectLike_default(value) && baseGetTag_default(value) == argsTag;
}
var baseIsArguments_default = baseIsArguments;

// node_modules/lodash-es/isArguments.js
var objectProto6 = Object.prototype;
var hasOwnProperty4 = objectProto6.hasOwnProperty;
var propertyIsEnumerable = objectProto6.propertyIsEnumerable;
var isArguments = baseIsArguments_default(/* @__PURE__ */ (function() {
  return arguments;
})()) ? baseIsArguments_default : function(value) {
  return isObjectLike_default(value) && hasOwnProperty4.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
};
var isArguments_default = isArguments;

// node_modules/lodash-es/stubFalse.js
function stubFalse() {
  return false;
}
var stubFalse_default = stubFalse;

// node_modules/lodash-es/isBuffer.js
var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
var moduleExports = freeModule && freeModule.exports === freeExports;
var Buffer2 = moduleExports ? root_default.Buffer : void 0;
var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
var isBuffer = nativeIsBuffer || stubFalse_default;
var isBuffer_default = isBuffer;

// node_modules/lodash-es/_baseIsTypedArray.js
var argsTag2 = "[object Arguments]";
var arrayTag = "[object Array]";
var boolTag = "[object Boolean]";
var dateTag = "[object Date]";
var errorTag = "[object Error]";
var funcTag2 = "[object Function]";
var mapTag = "[object Map]";
var numberTag = "[object Number]";
var objectTag = "[object Object]";
var regexpTag = "[object RegExp]";
var setTag = "[object Set]";
var stringTag = "[object String]";
var weakMapTag = "[object WeakMap]";
var arrayBufferTag = "[object ArrayBuffer]";
var dataViewTag = "[object DataView]";
var float32Tag = "[object Float32Array]";
var float64Tag = "[object Float64Array]";
var int8Tag = "[object Int8Array]";
var int16Tag = "[object Int16Array]";
var int32Tag = "[object Int32Array]";
var uint8Tag = "[object Uint8Array]";
var uint8ClampedTag = "[object Uint8ClampedArray]";
var uint16Tag = "[object Uint16Array]";
var uint32Tag = "[object Uint32Array]";
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag2] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag2] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
function baseIsTypedArray(value) {
  return isObjectLike_default(value) && isLength_default(value.length) && !!typedArrayTags[baseGetTag_default(value)];
}
var baseIsTypedArray_default = baseIsTypedArray;

// node_modules/lodash-es/_baseUnary.js
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}
var baseUnary_default = baseUnary;

// node_modules/lodash-es/_nodeUtil.js
var freeExports2 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule2 = freeExports2 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports2 = freeModule2 && freeModule2.exports === freeExports2;
var freeProcess = moduleExports2 && freeGlobal_default.process;
var nodeUtil = (function() {
  try {
    var types = freeModule2 && freeModule2.require && freeModule2.require("util").types;
    if (types) {
      return types;
    }
    return freeProcess && freeProcess.binding && freeProcess.binding("util");
  } catch (e3) {
  }
})();
var nodeUtil_default = nodeUtil;

// node_modules/lodash-es/isTypedArray.js
var nodeIsTypedArray = nodeUtil_default && nodeUtil_default.isTypedArray;
var isTypedArray = nodeIsTypedArray ? baseUnary_default(nodeIsTypedArray) : baseIsTypedArray_default;
var isTypedArray_default = isTypedArray;

// node_modules/lodash-es/_arrayLikeKeys.js
var objectProto7 = Object.prototype;
var hasOwnProperty5 = objectProto7.hasOwnProperty;
function arrayLikeKeys(value, inherited) {
  var isArr = isArray_default(value), isArg = !isArr && isArguments_default(value), isBuff = !isArr && !isArg && isBuffer_default(value), isType = !isArr && !isArg && !isBuff && isTypedArray_default(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes_default(value.length, String) : [], length = result.length;
  for (var key in value) {
    if ((inherited || hasOwnProperty5.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
    (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
    isIndex_default(key, length)))) {
      result.push(key);
    }
  }
  return result;
}
var arrayLikeKeys_default = arrayLikeKeys;

// node_modules/lodash-es/_overArg.js
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}
var overArg_default = overArg;

// node_modules/lodash-es/_nativeKeys.js
var nativeKeys = overArg_default(Object.keys, Object);
var nativeKeys_default = nativeKeys;

// node_modules/lodash-es/_baseKeys.js
var objectProto8 = Object.prototype;
var hasOwnProperty6 = objectProto8.hasOwnProperty;
function baseKeys(object) {
  if (!isPrototype_default(object)) {
    return nativeKeys_default(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty6.call(object, key) && key != "constructor") {
      result.push(key);
    }
  }
  return result;
}
var baseKeys_default = baseKeys;

// node_modules/lodash-es/keys.js
function keys(object) {
  return isArrayLike_default(object) ? arrayLikeKeys_default(object) : baseKeys_default(object);
}
var keys_default = keys;

// node_modules/lodash-es/_nativeKeysIn.js
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}
var nativeKeysIn_default = nativeKeysIn;

// node_modules/lodash-es/_baseKeysIn.js
var objectProto9 = Object.prototype;
var hasOwnProperty7 = objectProto9.hasOwnProperty;
function baseKeysIn(object) {
  if (!isObject_default(object)) {
    return nativeKeysIn_default(object);
  }
  var isProto = isPrototype_default(object), result = [];
  for (var key in object) {
    if (!(key == "constructor" && (isProto || !hasOwnProperty7.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}
var baseKeysIn_default = baseKeysIn;

// node_modules/lodash-es/keysIn.js
function keysIn(object) {
  return isArrayLike_default(object) ? arrayLikeKeys_default(object, true) : baseKeysIn_default(object);
}
var keysIn_default = keysIn;

// node_modules/lodash-es/_isKey.js
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
var reIsPlainProp = /^\w*$/;
function isKey(value, object) {
  if (isArray_default(value)) {
    return false;
  }
  var type = typeof value;
  if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol_default(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
}
var isKey_default = isKey;

// node_modules/lodash-es/_nativeCreate.js
var nativeCreate = getNative_default(Object, "create");
var nativeCreate_default = nativeCreate;

// node_modules/lodash-es/_hashClear.js
function hashClear() {
  this.__data__ = nativeCreate_default ? nativeCreate_default(null) : {};
  this.size = 0;
}
var hashClear_default = hashClear;

// node_modules/lodash-es/_hashDelete.js
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}
var hashDelete_default = hashDelete;

// node_modules/lodash-es/_hashGet.js
var HASH_UNDEFINED = "__lodash_hash_undefined__";
var objectProto10 = Object.prototype;
var hasOwnProperty8 = objectProto10.hasOwnProperty;
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate_default) {
    var result = data[key];
    return result === HASH_UNDEFINED ? void 0 : result;
  }
  return hasOwnProperty8.call(data, key) ? data[key] : void 0;
}
var hashGet_default = hashGet;

// node_modules/lodash-es/_hashHas.js
var objectProto11 = Object.prototype;
var hasOwnProperty9 = objectProto11.hasOwnProperty;
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate_default ? data[key] !== void 0 : hasOwnProperty9.call(data, key);
}
var hashHas_default = hashHas;

// node_modules/lodash-es/_hashSet.js
var HASH_UNDEFINED2 = "__lodash_hash_undefined__";
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate_default && value === void 0 ? HASH_UNDEFINED2 : value;
  return this;
}
var hashSet_default = hashSet;

// node_modules/lodash-es/_Hash.js
function Hash(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
Hash.prototype.clear = hashClear_default;
Hash.prototype["delete"] = hashDelete_default;
Hash.prototype.get = hashGet_default;
Hash.prototype.has = hashHas_default;
Hash.prototype.set = hashSet_default;
var Hash_default = Hash;

// node_modules/lodash-es/_listCacheClear.js
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}
var listCacheClear_default = listCacheClear;

// node_modules/lodash-es/_assocIndexOf.js
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq_default(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}
var assocIndexOf_default = assocIndexOf;

// node_modules/lodash-es/_listCacheDelete.js
var arrayProto = Array.prototype;
var splice = arrayProto.splice;
function listCacheDelete(key) {
  var data = this.__data__, index = assocIndexOf_default(data, key);
  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}
var listCacheDelete_default = listCacheDelete;

// node_modules/lodash-es/_listCacheGet.js
function listCacheGet(key) {
  var data = this.__data__, index = assocIndexOf_default(data, key);
  return index < 0 ? void 0 : data[index][1];
}
var listCacheGet_default = listCacheGet;

// node_modules/lodash-es/_listCacheHas.js
function listCacheHas(key) {
  return assocIndexOf_default(this.__data__, key) > -1;
}
var listCacheHas_default = listCacheHas;

// node_modules/lodash-es/_listCacheSet.js
function listCacheSet(key, value) {
  var data = this.__data__, index = assocIndexOf_default(data, key);
  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}
var listCacheSet_default = listCacheSet;

// node_modules/lodash-es/_ListCache.js
function ListCache(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
ListCache.prototype.clear = listCacheClear_default;
ListCache.prototype["delete"] = listCacheDelete_default;
ListCache.prototype.get = listCacheGet_default;
ListCache.prototype.has = listCacheHas_default;
ListCache.prototype.set = listCacheSet_default;
var ListCache_default = ListCache;

// node_modules/lodash-es/_Map.js
var Map2 = getNative_default(root_default, "Map");
var Map_default = Map2;

// node_modules/lodash-es/_mapCacheClear.js
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    "hash": new Hash_default(),
    "map": new (Map_default || ListCache_default)(),
    "string": new Hash_default()
  };
}
var mapCacheClear_default = mapCacheClear;

// node_modules/lodash-es/_isKeyable.js
function isKeyable(value) {
  var type = typeof value;
  return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
var isKeyable_default = isKeyable;

// node_modules/lodash-es/_getMapData.js
function getMapData(map2, key) {
  var data = map2.__data__;
  return isKeyable_default(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
var getMapData_default = getMapData;

// node_modules/lodash-es/_mapCacheDelete.js
function mapCacheDelete(key) {
  var result = getMapData_default(this, key)["delete"](key);
  this.size -= result ? 1 : 0;
  return result;
}
var mapCacheDelete_default = mapCacheDelete;

// node_modules/lodash-es/_mapCacheGet.js
function mapCacheGet(key) {
  return getMapData_default(this, key).get(key);
}
var mapCacheGet_default = mapCacheGet;

// node_modules/lodash-es/_mapCacheHas.js
function mapCacheHas(key) {
  return getMapData_default(this, key).has(key);
}
var mapCacheHas_default = mapCacheHas;

// node_modules/lodash-es/_mapCacheSet.js
function mapCacheSet(key, value) {
  var data = getMapData_default(this, key), size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}
var mapCacheSet_default = mapCacheSet;

// node_modules/lodash-es/_MapCache.js
function MapCache(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
MapCache.prototype.clear = mapCacheClear_default;
MapCache.prototype["delete"] = mapCacheDelete_default;
MapCache.prototype.get = mapCacheGet_default;
MapCache.prototype.has = mapCacheHas_default;
MapCache.prototype.set = mapCacheSet_default;
var MapCache_default = MapCache;

// node_modules/lodash-es/memoize.js
var FUNC_ERROR_TEXT = "Expected a function";
function memoize(func, resolver) {
  if (typeof func != "function" || resolver != null && typeof resolver != "function") {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache_default)();
  return memoized;
}
memoize.Cache = MapCache_default;
var memoize_default = memoize;

// node_modules/lodash-es/_memoizeCapped.js
var MAX_MEMOIZE_SIZE = 500;
function memoizeCapped(func) {
  var result = memoize_default(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });
  var cache = result.cache;
  return result;
}
var memoizeCapped_default = memoizeCapped;

// node_modules/lodash-es/_stringToPath.js
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
var reEscapeChar = /\\(\\)?/g;
var stringToPath = memoizeCapped_default(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46) {
    result.push("");
  }
  string.replace(rePropName, function(match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
  });
  return result;
});
var stringToPath_default = stringToPath;

// node_modules/lodash-es/toString.js
function toString(value) {
  return value == null ? "" : baseToString_default(value);
}
var toString_default = toString;

// node_modules/lodash-es/_castPath.js
function castPath(value, object) {
  if (isArray_default(value)) {
    return value;
  }
  return isKey_default(value, object) ? [value] : stringToPath_default(toString_default(value));
}
var castPath_default = castPath;

// node_modules/lodash-es/_toKey.js
var INFINITY3 = 1 / 0;
function toKey(value) {
  if (typeof value == "string" || isSymbol_default(value)) {
    return value;
  }
  var result = value + "";
  return result == "0" && 1 / value == -INFINITY3 ? "-0" : result;
}
var toKey_default = toKey;

// node_modules/lodash-es/_baseGet.js
function baseGet(object, path) {
  path = castPath_default(path, object);
  var index = 0, length = path.length;
  while (object != null && index < length) {
    object = object[toKey_default(path[index++])];
  }
  return index && index == length ? object : void 0;
}
var baseGet_default = baseGet;

// node_modules/lodash-es/get.js
function get(object, path, defaultValue) {
  var result = object == null ? void 0 : baseGet_default(object, path);
  return result === void 0 ? defaultValue : result;
}
var get_default = get;

// node_modules/lodash-es/_arrayPush.js
function arrayPush(array, values2) {
  var index = -1, length = values2.length, offset = array.length;
  while (++index < length) {
    array[offset + index] = values2[index];
  }
  return array;
}
var arrayPush_default = arrayPush;

// node_modules/lodash-es/_isFlattenable.js
var spreadableSymbol = Symbol_default ? Symbol_default.isConcatSpreadable : void 0;
function isFlattenable(value) {
  return isArray_default(value) || isArguments_default(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
}
var isFlattenable_default = isFlattenable;

// node_modules/lodash-es/_baseFlatten.js
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1, length = array.length;
  predicate || (predicate = isFlattenable_default);
  result || (result = []);
  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush_default(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}
var baseFlatten_default = baseFlatten;

// node_modules/lodash-es/_getPrototype.js
var getPrototype = overArg_default(Object.getPrototypeOf, Object);
var getPrototype_default = getPrototype;

// node_modules/lodash-es/isPlainObject.js
var objectTag2 = "[object Object]";
var funcProto3 = Function.prototype;
var objectProto12 = Object.prototype;
var funcToString3 = funcProto3.toString;
var hasOwnProperty10 = objectProto12.hasOwnProperty;
var objectCtorString = funcToString3.call(Object);
function isPlainObject(value) {
  if (!isObjectLike_default(value) || baseGetTag_default(value) != objectTag2) {
    return false;
  }
  var proto = getPrototype_default(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty10.call(proto, "constructor") && proto.constructor;
  return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString3.call(Ctor) == objectCtorString;
}
var isPlainObject_default = isPlainObject;

// node_modules/lodash-es/_baseSlice.js
function baseSlice(array, start, end) {
  var index = -1, length = array.length;
  if (start < 0) {
    start = -start > length ? 0 : length + start;
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : end - start >>> 0;
  start >>>= 0;
  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}
var baseSlice_default = baseSlice;

// node_modules/lodash-es/_castSlice.js
function castSlice(array, start, end) {
  var length = array.length;
  end = end === void 0 ? length : end;
  return !start && end >= length ? array : baseSlice_default(array, start, end);
}
var castSlice_default = castSlice;

// node_modules/lodash-es/_hasUnicode.js
var rsAstralRange = "\\ud800-\\udfff";
var rsComboMarksRange = "\\u0300-\\u036f";
var reComboHalfMarksRange = "\\ufe20-\\ufe2f";
var rsComboSymbolsRange = "\\u20d0-\\u20ff";
var rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;
var rsVarRange = "\\ufe0e\\ufe0f";
var rsZWJ = "\\u200d";
var reHasUnicode = RegExp("[" + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + "]");
function hasUnicode(string) {
  return reHasUnicode.test(string);
}
var hasUnicode_default = hasUnicode;

// node_modules/lodash-es/_asciiToArray.js
function asciiToArray(string) {
  return string.split("");
}
var asciiToArray_default = asciiToArray;

// node_modules/lodash-es/_unicodeToArray.js
var rsAstralRange2 = "\\ud800-\\udfff";
var rsComboMarksRange2 = "\\u0300-\\u036f";
var reComboHalfMarksRange2 = "\\ufe20-\\ufe2f";
var rsComboSymbolsRange2 = "\\u20d0-\\u20ff";
var rsComboRange2 = rsComboMarksRange2 + reComboHalfMarksRange2 + rsComboSymbolsRange2;
var rsVarRange2 = "\\ufe0e\\ufe0f";
var rsAstral = "[" + rsAstralRange2 + "]";
var rsCombo = "[" + rsComboRange2 + "]";
var rsFitz = "\\ud83c[\\udffb-\\udfff]";
var rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")";
var rsNonAstral = "[^" + rsAstralRange2 + "]";
var rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}";
var rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]";
var rsZWJ2 = "\\u200d";
var reOptMod = rsModifier + "?";
var rsOptVar = "[" + rsVarRange2 + "]?";
var rsOptJoin = "(?:" + rsZWJ2 + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*";
var rsSeq = rsOptVar + reOptMod + rsOptJoin;
var rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")";
var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
function unicodeToArray(string) {
  return string.match(reUnicode) || [];
}
var unicodeToArray_default = unicodeToArray;

// node_modules/lodash-es/_stringToArray.js
function stringToArray(string) {
  return hasUnicode_default(string) ? unicodeToArray_default(string) : asciiToArray_default(string);
}
var stringToArray_default = stringToArray;

// node_modules/lodash-es/chunk.js
var nativeCeil = Math.ceil;
var nativeMax2 = Math.max;
function chunk(array, size, guard) {
  if (guard ? isIterateeCall_default(array, size, guard) : size === void 0) {
    size = 1;
  } else {
    size = nativeMax2(toInteger_default(size), 0);
  }
  var length = array == null ? 0 : array.length;
  if (!length || size < 1) {
    return [];
  }
  var index = 0, resIndex = 0, result = Array(nativeCeil(length / size));
  while (index < length) {
    result[resIndex++] = baseSlice_default(array, index, index += size);
  }
  return result;
}
var chunk_default = chunk;

// node_modules/lodash-es/_baseClamp.js
function baseClamp(number, lower, upper) {
  if (number === number) {
    if (upper !== void 0) {
      number = number <= upper ? number : upper;
    }
    if (lower !== void 0) {
      number = number >= lower ? number : lower;
    }
  }
  return number;
}
var baseClamp_default = baseClamp;

// node_modules/lodash-es/_stackClear.js
function stackClear() {
  this.__data__ = new ListCache_default();
  this.size = 0;
}
var stackClear_default = stackClear;

// node_modules/lodash-es/_stackDelete.js
function stackDelete(key) {
  var data = this.__data__, result = data["delete"](key);
  this.size = data.size;
  return result;
}
var stackDelete_default = stackDelete;

// node_modules/lodash-es/_stackGet.js
function stackGet(key) {
  return this.__data__.get(key);
}
var stackGet_default = stackGet;

// node_modules/lodash-es/_stackHas.js
function stackHas(key) {
  return this.__data__.has(key);
}
var stackHas_default = stackHas;

// node_modules/lodash-es/_stackSet.js
var LARGE_ARRAY_SIZE = 200;
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache_default) {
    var pairs = data.__data__;
    if (!Map_default || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache_default(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}
var stackSet_default = stackSet;

// node_modules/lodash-es/_Stack.js
function Stack(entries) {
  var data = this.__data__ = new ListCache_default(entries);
  this.size = data.size;
}
Stack.prototype.clear = stackClear_default;
Stack.prototype["delete"] = stackDelete_default;
Stack.prototype.get = stackGet_default;
Stack.prototype.has = stackHas_default;
Stack.prototype.set = stackSet_default;
var Stack_default = Stack;

// node_modules/lodash-es/_cloneBuffer.js
var freeExports3 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule3 = freeExports3 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports3 = freeModule3 && freeModule3.exports === freeExports3;
var Buffer3 = moduleExports3 ? root_default.Buffer : void 0;
var allocUnsafe = Buffer3 ? Buffer3.allocUnsafe : void 0;
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
  buffer.copy(result);
  return result;
}
var cloneBuffer_default = cloneBuffer;

// node_modules/lodash-es/_arrayFilter.js
function arrayFilter(array, predicate) {
  var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}
var arrayFilter_default = arrayFilter;

// node_modules/lodash-es/stubArray.js
function stubArray() {
  return [];
}
var stubArray_default = stubArray;

// node_modules/lodash-es/_getSymbols.js
var objectProto13 = Object.prototype;
var propertyIsEnumerable2 = objectProto13.propertyIsEnumerable;
var nativeGetSymbols = Object.getOwnPropertySymbols;
var getSymbols = !nativeGetSymbols ? stubArray_default : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter_default(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable2.call(object, symbol);
  });
};
var getSymbols_default = getSymbols;

// node_modules/lodash-es/_getSymbolsIn.js
var nativeGetSymbols2 = Object.getOwnPropertySymbols;
var getSymbolsIn = !nativeGetSymbols2 ? stubArray_default : function(object) {
  var result = [];
  while (object) {
    arrayPush_default(result, getSymbols_default(object));
    object = getPrototype_default(object);
  }
  return result;
};
var getSymbolsIn_default = getSymbolsIn;

// node_modules/lodash-es/_baseGetAllKeys.js
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray_default(object) ? result : arrayPush_default(result, symbolsFunc(object));
}
var baseGetAllKeys_default = baseGetAllKeys;

// node_modules/lodash-es/_getAllKeys.js
function getAllKeys(object) {
  return baseGetAllKeys_default(object, keys_default, getSymbols_default);
}
var getAllKeys_default = getAllKeys;

// node_modules/lodash-es/_getAllKeysIn.js
function getAllKeysIn(object) {
  return baseGetAllKeys_default(object, keysIn_default, getSymbolsIn_default);
}
var getAllKeysIn_default = getAllKeysIn;

// node_modules/lodash-es/_DataView.js
var DataView2 = getNative_default(root_default, "DataView");
var DataView_default = DataView2;

// node_modules/lodash-es/_Promise.js
var Promise2 = getNative_default(root_default, "Promise");
var Promise_default = Promise2;

// node_modules/lodash-es/_Set.js
var Set2 = getNative_default(root_default, "Set");
var Set_default = Set2;

// node_modules/lodash-es/_getTag.js
var mapTag2 = "[object Map]";
var objectTag3 = "[object Object]";
var promiseTag = "[object Promise]";
var setTag2 = "[object Set]";
var weakMapTag2 = "[object WeakMap]";
var dataViewTag2 = "[object DataView]";
var dataViewCtorString = toSource_default(DataView_default);
var mapCtorString = toSource_default(Map_default);
var promiseCtorString = toSource_default(Promise_default);
var setCtorString = toSource_default(Set_default);
var weakMapCtorString = toSource_default(WeakMap_default);
var getTag = baseGetTag_default;
if (DataView_default && getTag(new DataView_default(new ArrayBuffer(1))) != dataViewTag2 || Map_default && getTag(new Map_default()) != mapTag2 || Promise_default && getTag(Promise_default.resolve()) != promiseTag || Set_default && getTag(new Set_default()) != setTag2 || WeakMap_default && getTag(new WeakMap_default()) != weakMapTag2) {
  getTag = function(value) {
    var result = baseGetTag_default(value), Ctor = result == objectTag3 ? value.constructor : void 0, ctorString = Ctor ? toSource_default(Ctor) : "";
    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag2;
        case mapCtorString:
          return mapTag2;
        case promiseCtorString:
          return promiseTag;
        case setCtorString:
          return setTag2;
        case weakMapCtorString:
          return weakMapTag2;
      }
    }
    return result;
  };
}
var getTag_default = getTag;

// node_modules/lodash-es/_Uint8Array.js
var Uint8Array2 = root_default.Uint8Array;
var Uint8Array_default = Uint8Array2;

// node_modules/lodash-es/_cloneArrayBuffer.js
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array_default(result).set(new Uint8Array_default(arrayBuffer));
  return result;
}
var cloneArrayBuffer_default = cloneArrayBuffer;

// node_modules/lodash-es/_cloneTypedArray.js
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer_default(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}
var cloneTypedArray_default = cloneTypedArray;

// node_modules/lodash-es/_initCloneObject.js
function initCloneObject(object) {
  return typeof object.constructor == "function" && !isPrototype_default(object) ? baseCreate_default(getPrototype_default(object)) : {};
}
var initCloneObject_default = initCloneObject;

// node_modules/lodash-es/_setCacheAdd.js
var HASH_UNDEFINED3 = "__lodash_hash_undefined__";
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED3);
  return this;
}
var setCacheAdd_default = setCacheAdd;

// node_modules/lodash-es/_setCacheHas.js
function setCacheHas(value) {
  return this.__data__.has(value);
}
var setCacheHas_default = setCacheHas;

// node_modules/lodash-es/_SetCache.js
function SetCache(values2) {
  var index = -1, length = values2 == null ? 0 : values2.length;
  this.__data__ = new MapCache_default();
  while (++index < length) {
    this.add(values2[index]);
  }
}
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd_default;
SetCache.prototype.has = setCacheHas_default;
var SetCache_default = SetCache;

// node_modules/lodash-es/_arraySome.js
function arraySome(array, predicate) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}
var arraySome_default = arraySome;

// node_modules/lodash-es/_cacheHas.js
function cacheHas(cache, key) {
  return cache.has(key);
}
var cacheHas_default = cacheHas;

// node_modules/lodash-es/_equalArrays.js
var COMPARE_PARTIAL_FLAG = 1;
var COMPARE_UNORDERED_FLAG = 2;
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  var arrStacked = stack.get(array);
  var othStacked = stack.get(other);
  if (arrStacked && othStacked) {
    return arrStacked == other && othStacked == array;
  }
  var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache_default() : void 0;
  stack.set(array, other);
  stack.set(other, array);
  while (++index < arrLength) {
    var arrValue = array[index], othValue = other[index];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== void 0) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    if (seen) {
      if (!arraySome_default(other, function(othValue2, othIndex) {
        if (!cacheHas_default(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
          return seen.push(othIndex);
        }
      })) {
        result = false;
        break;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
      result = false;
      break;
    }
  }
  stack["delete"](array);
  stack["delete"](other);
  return result;
}
var equalArrays_default = equalArrays;

// node_modules/lodash-es/_mapToArray.js
function mapToArray(map2) {
  var index = -1, result = Array(map2.size);
  map2.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}
var mapToArray_default = mapToArray;

// node_modules/lodash-es/_setToArray.js
function setToArray(set2) {
  var index = -1, result = Array(set2.size);
  set2.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}
var setToArray_default = setToArray;

// node_modules/lodash-es/_equalByTag.js
var COMPARE_PARTIAL_FLAG2 = 1;
var COMPARE_UNORDERED_FLAG2 = 2;
var boolTag2 = "[object Boolean]";
var dateTag2 = "[object Date]";
var errorTag2 = "[object Error]";
var mapTag3 = "[object Map]";
var numberTag2 = "[object Number]";
var regexpTag2 = "[object RegExp]";
var setTag3 = "[object Set]";
var stringTag2 = "[object String]";
var symbolTag2 = "[object Symbol]";
var arrayBufferTag2 = "[object ArrayBuffer]";
var dataViewTag3 = "[object DataView]";
var symbolProto2 = Symbol_default ? Symbol_default.prototype : void 0;
var symbolValueOf = symbolProto2 ? symbolProto2.valueOf : void 0;
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag3:
      if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;
    case arrayBufferTag2:
      if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array_default(object), new Uint8Array_default(other))) {
        return false;
      }
      return true;
    case boolTag2:
    case dateTag2:
    case numberTag2:
      return eq_default(+object, +other);
    case errorTag2:
      return object.name == other.name && object.message == other.message;
    case regexpTag2:
    case stringTag2:
      return object == other + "";
    case mapTag3:
      var convert = mapToArray_default;
    case setTag3:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG2;
      convert || (convert = setToArray_default);
      if (object.size != other.size && !isPartial) {
        return false;
      }
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG2;
      stack.set(object, other);
      var result = equalArrays_default(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack["delete"](object);
      return result;
    case symbolTag2:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}
var equalByTag_default = equalByTag;

// node_modules/lodash-es/_equalObjects.js
var COMPARE_PARTIAL_FLAG3 = 1;
var objectProto14 = Object.prototype;
var hasOwnProperty11 = objectProto14.hasOwnProperty;
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG3, objProps = getAllKeys_default(object), objLength = objProps.length, othProps = getAllKeys_default(other), othLength = othProps.length;
  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty11.call(other, key))) {
      return false;
    }
  }
  var objStacked = stack.get(object);
  var othStacked = stack.get(other);
  if (objStacked && othStacked) {
    return objStacked == other && othStacked == object;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);
  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key], othValue = other[key];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
    }
    if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == "constructor");
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor, othCtor = other.constructor;
    if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack["delete"](object);
  stack["delete"](other);
  return result;
}
var equalObjects_default = equalObjects;

// node_modules/lodash-es/_baseIsEqualDeep.js
var COMPARE_PARTIAL_FLAG4 = 1;
var argsTag3 = "[object Arguments]";
var arrayTag2 = "[object Array]";
var objectTag4 = "[object Object]";
var objectProto15 = Object.prototype;
var hasOwnProperty12 = objectProto15.hasOwnProperty;
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray_default(object), othIsArr = isArray_default(other), objTag = objIsArr ? arrayTag2 : getTag_default(object), othTag = othIsArr ? arrayTag2 : getTag_default(other);
  objTag = objTag == argsTag3 ? objectTag4 : objTag;
  othTag = othTag == argsTag3 ? objectTag4 : othTag;
  var objIsObj = objTag == objectTag4, othIsObj = othTag == objectTag4, isSameTag = objTag == othTag;
  if (isSameTag && isBuffer_default(object)) {
    if (!isBuffer_default(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack_default());
    return objIsArr || isTypedArray_default(object) ? equalArrays_default(object, other, bitmask, customizer, equalFunc, stack) : equalByTag_default(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG4)) {
    var objIsWrapped = objIsObj && hasOwnProperty12.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty12.call(other, "__wrapped__");
    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
      stack || (stack = new Stack_default());
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack_default());
  return equalObjects_default(object, other, bitmask, customizer, equalFunc, stack);
}
var baseIsEqualDeep_default = baseIsEqualDeep;

// node_modules/lodash-es/_baseIsEqual.js
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || !isObjectLike_default(value) && !isObjectLike_default(other)) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep_default(value, other, bitmask, customizer, baseIsEqual, stack);
}
var baseIsEqual_default = baseIsEqual;

// node_modules/lodash-es/_baseIsMatch.js
var COMPARE_PARTIAL_FLAG5 = 1;
var COMPARE_UNORDERED_FLAG3 = 2;
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length, length = index, noCustomizer = !customizer;
  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0], objValue = object[key], srcValue = data[1];
    if (noCustomizer && data[2]) {
      if (objValue === void 0 && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack_default();
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === void 0 ? baseIsEqual_default(srcValue, objValue, COMPARE_PARTIAL_FLAG5 | COMPARE_UNORDERED_FLAG3, customizer, stack) : result)) {
        return false;
      }
    }
  }
  return true;
}
var baseIsMatch_default = baseIsMatch;

// node_modules/lodash-es/_isStrictComparable.js
function isStrictComparable(value) {
  return value === value && !isObject_default(value);
}
var isStrictComparable_default = isStrictComparable;

// node_modules/lodash-es/_getMatchData.js
function getMatchData(object) {
  var result = keys_default(object), length = result.length;
  while (length--) {
    var key = result[length], value = object[key];
    result[length] = [key, value, isStrictComparable_default(value)];
  }
  return result;
}
var getMatchData_default = getMatchData;

// node_modules/lodash-es/_matchesStrictComparable.js
function matchesStrictComparable(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue && (srcValue !== void 0 || key in Object(object));
  };
}
var matchesStrictComparable_default = matchesStrictComparable;

// node_modules/lodash-es/_baseMatches.js
function baseMatches(source) {
  var matchData = getMatchData_default(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable_default(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || baseIsMatch_default(object, source, matchData);
  };
}
var baseMatches_default = baseMatches;

// node_modules/lodash-es/_baseHasIn.js
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}
var baseHasIn_default = baseHasIn;

// node_modules/lodash-es/_hasPath.js
function hasPath(object, path, hasFunc) {
  path = castPath_default(path, object);
  var index = -1, length = path.length, result = false;
  while (++index < length) {
    var key = toKey_default(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength_default(length) && isIndex_default(key, length) && (isArray_default(object) || isArguments_default(object));
}
var hasPath_default = hasPath;

// node_modules/lodash-es/hasIn.js
function hasIn(object, path) {
  return object != null && hasPath_default(object, path, baseHasIn_default);
}
var hasIn_default = hasIn;

// node_modules/lodash-es/_baseMatchesProperty.js
var COMPARE_PARTIAL_FLAG6 = 1;
var COMPARE_UNORDERED_FLAG4 = 2;
function baseMatchesProperty(path, srcValue) {
  if (isKey_default(path) && isStrictComparable_default(srcValue)) {
    return matchesStrictComparable_default(toKey_default(path), srcValue);
  }
  return function(object) {
    var objValue = get_default(object, path);
    return objValue === void 0 && objValue === srcValue ? hasIn_default(object, path) : baseIsEqual_default(srcValue, objValue, COMPARE_PARTIAL_FLAG6 | COMPARE_UNORDERED_FLAG4);
  };
}
var baseMatchesProperty_default = baseMatchesProperty;

// node_modules/lodash-es/_baseProperty.js
function baseProperty(key) {
  return function(object) {
    return object == null ? void 0 : object[key];
  };
}
var baseProperty_default = baseProperty;

// node_modules/lodash-es/_basePropertyDeep.js
function basePropertyDeep(path) {
  return function(object) {
    return baseGet_default(object, path);
  };
}
var basePropertyDeep_default = basePropertyDeep;

// node_modules/lodash-es/property.js
function property(path) {
  return isKey_default(path) ? baseProperty_default(toKey_default(path)) : basePropertyDeep_default(path);
}
var property_default = property;

// node_modules/lodash-es/_baseIteratee.js
function baseIteratee(value) {
  if (typeof value == "function") {
    return value;
  }
  if (value == null) {
    return identity_default;
  }
  if (typeof value == "object") {
    return isArray_default(value) ? baseMatchesProperty_default(value[0], value[1]) : baseMatches_default(value);
  }
  return property_default(value);
}
var baseIteratee_default = baseIteratee;

// node_modules/lodash-es/_createBaseFor.js
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}
var createBaseFor_default = createBaseFor;

// node_modules/lodash-es/_baseFor.js
var baseFor = createBaseFor_default();
var baseFor_default = baseFor;

// node_modules/lodash-es/_baseForOwn.js
function baseForOwn(object, iteratee) {
  return object && baseFor_default(object, iteratee, keys_default);
}
var baseForOwn_default = baseForOwn;

// node_modules/lodash-es/_createBaseEach.js
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee) {
    if (collection == null) {
      return collection;
    }
    if (!isArrayLike_default(collection)) {
      return eachFunc(collection, iteratee);
    }
    var length = collection.length, index = fromRight ? length : -1, iterable = Object(collection);
    while (fromRight ? index-- : ++index < length) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}
var createBaseEach_default = createBaseEach;

// node_modules/lodash-es/_baseEach.js
var baseEach = createBaseEach_default(baseForOwn_default);
var baseEach_default = baseEach;

// node_modules/lodash-es/_assignMergeValue.js
function assignMergeValue(object, key, value) {
  if (value !== void 0 && !eq_default(object[key], value) || value === void 0 && !(key in object)) {
    baseAssignValue_default(object, key, value);
  }
}
var assignMergeValue_default = assignMergeValue;

// node_modules/lodash-es/isArrayLikeObject.js
function isArrayLikeObject(value) {
  return isObjectLike_default(value) && isArrayLike_default(value);
}
var isArrayLikeObject_default = isArrayLikeObject;

// node_modules/lodash-es/_safeGet.js
function safeGet(object, key) {
  if (key === "constructor" && typeof object[key] === "function") {
    return;
  }
  if (key == "__proto__") {
    return;
  }
  return object[key];
}
var safeGet_default = safeGet;

// node_modules/lodash-es/toPlainObject.js
function toPlainObject(value) {
  return copyObject_default(value, keysIn_default(value));
}
var toPlainObject_default = toPlainObject;

// node_modules/lodash-es/_baseMergeDeep.js
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = safeGet_default(object, key), srcValue = safeGet_default(source, key), stacked = stack.get(srcValue);
  if (stacked) {
    assignMergeValue_default(object, key, stacked);
    return;
  }
  var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : void 0;
  var isCommon = newValue === void 0;
  if (isCommon) {
    var isArr = isArray_default(srcValue), isBuff = !isArr && isBuffer_default(srcValue), isTyped = !isArr && !isBuff && isTypedArray_default(srcValue);
    newValue = srcValue;
    if (isArr || isBuff || isTyped) {
      if (isArray_default(objValue)) {
        newValue = objValue;
      } else if (isArrayLikeObject_default(objValue)) {
        newValue = copyArray_default(objValue);
      } else if (isBuff) {
        isCommon = false;
        newValue = cloneBuffer_default(srcValue, true);
      } else if (isTyped) {
        isCommon = false;
        newValue = cloneTypedArray_default(srcValue, true);
      } else {
        newValue = [];
      }
    } else if (isPlainObject_default(srcValue) || isArguments_default(srcValue)) {
      newValue = objValue;
      if (isArguments_default(objValue)) {
        newValue = toPlainObject_default(objValue);
      } else if (!isObject_default(objValue) || isFunction_default(objValue)) {
        newValue = initCloneObject_default(srcValue);
      }
    } else {
      isCommon = false;
    }
  }
  if (isCommon) {
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack["delete"](srcValue);
  }
  assignMergeValue_default(object, key, newValue);
}
var baseMergeDeep_default = baseMergeDeep;

// node_modules/lodash-es/_baseMerge.js
function baseMerge(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }
  baseFor_default(source, function(srcValue, key) {
    stack || (stack = new Stack_default());
    if (isObject_default(srcValue)) {
      baseMergeDeep_default(object, source, key, srcIndex, baseMerge, customizer, stack);
    } else {
      var newValue = customizer ? customizer(safeGet_default(object, key), srcValue, key + "", object, source, stack) : void 0;
      if (newValue === void 0) {
        newValue = srcValue;
      }
      assignMergeValue_default(object, key, newValue);
    }
  }, keysIn_default);
}
var baseMerge_default = baseMerge;

// node_modules/lodash-es/_arrayIncludesWith.js
function arrayIncludesWith(array, value, comparator) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    if (comparator(value, array[index])) {
      return true;
    }
  }
  return false;
}
var arrayIncludesWith_default = arrayIncludesWith;

// node_modules/lodash-es/_castFunction.js
function castFunction(value) {
  return typeof value == "function" ? value : identity_default;
}
var castFunction_default = castFunction;

// node_modules/lodash-es/_baseToPairs.js
function baseToPairs(object, props) {
  return arrayMap_default(props, function(key) {
    return [key, object[key]];
  });
}
var baseToPairs_default = baseToPairs;

// node_modules/lodash-es/_setToPairs.js
function setToPairs(set2) {
  var index = -1, result = Array(set2.size);
  set2.forEach(function(value) {
    result[++index] = [value, value];
  });
  return result;
}
var setToPairs_default = setToPairs;

// node_modules/lodash-es/_createToPairs.js
var mapTag4 = "[object Map]";
var setTag4 = "[object Set]";
function createToPairs(keysFunc) {
  return function(object) {
    var tag = getTag_default(object);
    if (tag == mapTag4) {
      return mapToArray_default(object);
    }
    if (tag == setTag4) {
      return setToPairs_default(object);
    }
    return baseToPairs_default(object, keysFunc(object));
  };
}
var createToPairs_default = createToPairs;

// node_modules/lodash-es/toPairs.js
var toPairs = createToPairs_default(keys_default);
var toPairs_default = toPairs;

// node_modules/lodash-es/_arrayEvery.js
function arrayEvery(array, predicate) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    if (!predicate(array[index], index, array)) {
      return false;
    }
  }
  return true;
}
var arrayEvery_default = arrayEvery;

// node_modules/lodash-es/_baseEvery.js
function baseEvery(collection, predicate) {
  var result = true;
  baseEach_default(collection, function(value, index, collection2) {
    result = !!predicate(value, index, collection2);
    return result;
  });
  return result;
}
var baseEvery_default = baseEvery;

// node_modules/lodash-es/every.js
function every(collection, predicate, guard) {
  var func = isArray_default(collection) ? arrayEvery_default : baseEvery_default;
  if (guard && isIterateeCall_default(collection, predicate, guard)) {
    predicate = void 0;
  }
  return func(collection, baseIteratee_default(predicate, 3));
}
var every_default = every;

// node_modules/lodash-es/_baseFilter.js
function baseFilter(collection, predicate) {
  var result = [];
  baseEach_default(collection, function(value, index, collection2) {
    if (predicate(value, index, collection2)) {
      result.push(value);
    }
  });
  return result;
}
var baseFilter_default = baseFilter;

// node_modules/lodash-es/filter.js
function filter(collection, predicate) {
  var func = isArray_default(collection) ? arrayFilter_default : baseFilter_default;
  return func(collection, baseIteratee_default(predicate, 3));
}
var filter_default = filter;

// node_modules/lodash-es/_baseMap.js
function baseMap(collection, iteratee) {
  var index = -1, result = isArrayLike_default(collection) ? Array(collection.length) : [];
  baseEach_default(collection, function(value, key, collection2) {
    result[++index] = iteratee(value, key, collection2);
  });
  return result;
}
var baseMap_default = baseMap;

// node_modules/lodash-es/map.js
function map(collection, iteratee) {
  var func = isArray_default(collection) ? arrayMap_default : baseMap_default;
  return func(collection, baseIteratee_default(iteratee, 3));
}
var map_default = map;

// node_modules/lodash-es/flatMap.js
function flatMap(collection, iteratee) {
  return baseFlatten_default(map_default(collection, iteratee), 1);
}
var flatMap_default = flatMap;

// node_modules/lodash-es/fromPairs.js
function fromPairs(pairs) {
  var index = -1, length = pairs == null ? 0 : pairs.length, result = {};
  while (++index < length) {
    var pair = pairs[index];
    baseAssignValue_default(result, pair[0], pair[1]);
  }
  return result;
}
var fromPairs_default = fromPairs;

// node_modules/lodash-es/_baseGt.js
function baseGt(value, other) {
  return value > other;
}
var baseGt_default = baseGt;

// node_modules/lodash-es/_baseInRange.js
var nativeMax3 = Math.max;
var nativeMin = Math.min;
function baseInRange(number, start, end) {
  return number >= nativeMin(start, end) && number < nativeMax3(start, end);
}
var baseInRange_default = baseInRange;

// node_modules/lodash-es/inRange.js
function inRange(number, start, end) {
  start = toFinite_default(start);
  if (end === void 0) {
    end = start;
    start = 0;
  } else {
    end = toFinite_default(end);
  }
  number = toNumber_default(number);
  return baseInRange_default(number, start, end);
}
var inRange_default = inRange;

// node_modules/lodash-es/isString.js
var stringTag3 = "[object String]";
function isString(value) {
  return typeof value == "string" || !isArray_default(value) && isObjectLike_default(value) && baseGetTag_default(value) == stringTag3;
}
var isString_default = isString;

// node_modules/lodash-es/_baseValues.js
function baseValues(object, props) {
  return arrayMap_default(props, function(key) {
    return object[key];
  });
}
var baseValues_default = baseValues;

// node_modules/lodash-es/values.js
function values(object) {
  return object == null ? [] : baseValues_default(object, keys_default(object));
}
var values_default = values;

// node_modules/lodash-es/includes.js
var nativeMax4 = Math.max;
function includes(collection, value, fromIndex, guard) {
  collection = isArrayLike_default(collection) ? collection : values_default(collection);
  fromIndex = fromIndex && !guard ? toInteger_default(fromIndex) : 0;
  var length = collection.length;
  if (fromIndex < 0) {
    fromIndex = nativeMax4(length + fromIndex, 0);
  }
  return isString_default(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && baseIndexOf_default(collection, value, fromIndex) > -1;
}
var includes_default = includes;

// node_modules/lodash-es/isEmpty.js
var mapTag5 = "[object Map]";
var setTag5 = "[object Set]";
var objectProto16 = Object.prototype;
var hasOwnProperty13 = objectProto16.hasOwnProperty;
function isEmpty(value) {
  if (value == null) {
    return true;
  }
  if (isArrayLike_default(value) && (isArray_default(value) || typeof value == "string" || typeof value.splice == "function" || isBuffer_default(value) || isTypedArray_default(value) || isArguments_default(value))) {
    return !value.length;
  }
  var tag = getTag_default(value);
  if (tag == mapTag5 || tag == setTag5) {
    return !value.size;
  }
  if (isPrototype_default(value)) {
    return !baseKeys_default(value).length;
  }
  for (var key in value) {
    if (hasOwnProperty13.call(value, key)) {
      return false;
    }
  }
  return true;
}
var isEmpty_default = isEmpty;

// node_modules/lodash-es/isEqual.js
function isEqual(value, other) {
  return baseIsEqual_default(value, other);
}
var isEqual_default = isEqual;

// node_modules/lodash-es/isInteger.js
function isInteger(value) {
  return typeof value == "number" && value == toInteger_default(value);
}
var isInteger_default = isInteger;

// node_modules/lodash-es/isMatch.js
function isMatch(object, source) {
  return object === source || baseIsMatch_default(object, source, getMatchData_default(source));
}
var isMatch_default = isMatch;

// node_modules/lodash-es/isNumber.js
var numberTag3 = "[object Number]";
function isNumber(value) {
  return typeof value == "number" || isObjectLike_default(value) && baseGetTag_default(value) == numberTag3;
}
var isNumber_default = isNumber;

// node_modules/lodash-es/isNaN.js
function isNaN(value) {
  return isNumber_default(value) && value != +value;
}
var isNaN_default = isNaN;

// node_modules/lodash-es/isNil.js
function isNil(value) {
  return value == null;
}
var isNil_default = isNil;

// node_modules/lodash-es/isSafeInteger.js
var MAX_SAFE_INTEGER3 = 9007199254740991;
function isSafeInteger(value) {
  return isInteger_default(value) && value >= -MAX_SAFE_INTEGER3 && value <= MAX_SAFE_INTEGER3;
}
var isSafeInteger_default = isSafeInteger;

// node_modules/lodash-es/join.js
var arrayProto2 = Array.prototype;
var nativeJoin = arrayProto2.join;
function join(array, separator) {
  return array == null ? "" : nativeJoin.call(array, separator);
}
var join_default = join;

// node_modules/lodash-es/_baseExtremum.js
function baseExtremum(array, iteratee, comparator) {
  var index = -1, length = array.length;
  while (++index < length) {
    var value = array[index], current = iteratee(value);
    if (current != null && (computed === void 0 ? current === current && !isSymbol_default(current) : comparator(current, computed))) {
      var computed = current, result = value;
    }
  }
  return result;
}
var baseExtremum_default = baseExtremum;

// node_modules/lodash-es/max.js
function max(array) {
  return array && array.length ? baseExtremum_default(array, identity_default, baseGt_default) : void 0;
}
var max_default = max;

// node_modules/lodash-es/_baseSum.js
function baseSum(array, iteratee) {
  var result, index = -1, length = array.length;
  while (++index < length) {
    var current = iteratee(array[index]);
    if (current !== void 0) {
      result = result === void 0 ? current : result + current;
    }
  }
  return result;
}
var baseSum_default = baseSum;

// node_modules/lodash-es/merge.js
var merge = createAssigner_default(function(object, source, srcIndex) {
  baseMerge_default(object, source, srcIndex);
});
var merge_default = merge;

// node_modules/lodash-es/negate.js
var FUNC_ERROR_TEXT2 = "Expected a function";
function negate(predicate) {
  if (typeof predicate != "function") {
    throw new TypeError(FUNC_ERROR_TEXT2);
  }
  return function() {
    var args = arguments;
    switch (args.length) {
      case 0:
        return !predicate.call(this);
      case 1:
        return !predicate.call(this, args[0]);
      case 2:
        return !predicate.call(this, args[0], args[1]);
      case 3:
        return !predicate.call(this, args[0], args[1], args[2]);
    }
    return !predicate.apply(this, args);
  };
}
var negate_default = negate;

// node_modules/lodash-es/_baseSet.js
function baseSet(object, path, value, customizer) {
  if (!isObject_default(object)) {
    return object;
  }
  path = castPath_default(path, object);
  var index = -1, length = path.length, lastIndex = length - 1, nested = object;
  while (nested != null && ++index < length) {
    var key = toKey_default(path[index]), newValue = value;
    if (key === "__proto__" || key === "constructor" || key === "prototype") {
      return object;
    }
    if (index != lastIndex) {
      var objValue = nested[key];
      newValue = customizer ? customizer(objValue, key, nested) : void 0;
      if (newValue === void 0) {
        newValue = isObject_default(objValue) ? objValue : isIndex_default(path[index + 1]) ? [] : {};
      }
    }
    assignValue_default(nested, key, newValue);
    nested = nested[key];
  }
  return object;
}
var baseSet_default = baseSet;

// node_modules/lodash-es/_basePickBy.js
function basePickBy(object, paths, predicate) {
  var index = -1, length = paths.length, result = {};
  while (++index < length) {
    var path = paths[index], value = baseGet_default(object, path);
    if (predicate(value, path)) {
      baseSet_default(result, castPath_default(path, object), value);
    }
  }
  return result;
}
var basePickBy_default = basePickBy;

// node_modules/lodash-es/pickBy.js
function pickBy(object, predicate) {
  if (object == null) {
    return {};
  }
  var props = arrayMap_default(getAllKeysIn_default(object), function(prop) {
    return [prop];
  });
  predicate = baseIteratee_default(predicate);
  return basePickBy_default(object, props, function(value, path) {
    return predicate(value, path[0]);
  });
}
var pickBy_default = pickBy;

// node_modules/lodash-es/omitBy.js
function omitBy(object, predicate) {
  return pickBy_default(object, negate_default(baseIteratee_default(predicate)));
}
var omitBy_default = omitBy;

// node_modules/lodash-es/parseInt.js
var reTrimStart2 = /^\s+/;
var nativeParseInt = root_default.parseInt;
function parseInt2(string, radix, guard) {
  if (guard || radix == null) {
    radix = 0;
  } else if (radix) {
    radix = +radix;
  }
  return nativeParseInt(toString_default(string).replace(reTrimStart2, ""), radix || 0);
}
var parseInt_default = parseInt2;

// node_modules/lodash-es/set.js
function set(object, path, value) {
  return object == null ? object : baseSet_default(object, path, value);
}
var set_default = set;

// node_modules/lodash-es/_baseSome.js
function baseSome(collection, predicate) {
  var result;
  baseEach_default(collection, function(value, index, collection2) {
    result = predicate(value, index, collection2);
    return !result;
  });
  return !!result;
}
var baseSome_default = baseSome;

// node_modules/lodash-es/some.js
function some(collection, predicate, guard) {
  var func = isArray_default(collection) ? arraySome_default : baseSome_default;
  if (guard && isIterateeCall_default(collection, predicate, guard)) {
    predicate = void 0;
  }
  return func(collection, baseIteratee_default(predicate, 3));
}
var some_default = some;

// node_modules/lodash-es/sumBy.js
function sumBy(array, iteratee) {
  return array && array.length ? baseSum_default(array, baseIteratee_default(iteratee, 2)) : 0;
}
var sumBy_default = sumBy;

// node_modules/lodash-es/times.js
var MAX_SAFE_INTEGER4 = 9007199254740991;
var MAX_ARRAY_LENGTH = 4294967295;
var nativeMin2 = Math.min;
function times(n3, iteratee) {
  n3 = toInteger_default(n3);
  if (n3 < 1 || n3 > MAX_SAFE_INTEGER4) {
    return [];
  }
  var index = MAX_ARRAY_LENGTH, length = nativeMin2(n3, MAX_ARRAY_LENGTH);
  iteratee = castFunction_default(iteratee);
  n3 -= MAX_ARRAY_LENGTH;
  var result = baseTimes_default(length, iteratee);
  while (++index < n3) {
    iteratee(index);
  }
  return result;
}
var times_default = times;

// node_modules/lodash-es/toLower.js
function toLower(value) {
  return toString_default(value).toLowerCase();
}
var toLower_default = toLower;

// node_modules/lodash-es/toSafeInteger.js
var MAX_SAFE_INTEGER5 = 9007199254740991;
function toSafeInteger(value) {
  return value ? baseClamp_default(toInteger_default(value), -MAX_SAFE_INTEGER5, MAX_SAFE_INTEGER5) : value === 0 ? value : 0;
}
var toSafeInteger_default = toSafeInteger;

// node_modules/lodash-es/toUpper.js
function toUpper(value) {
  return toString_default(value).toUpperCase();
}
var toUpper_default = toUpper;

// node_modules/lodash-es/_charsEndIndex.js
function charsEndIndex(strSymbols, chrSymbols) {
  var index = strSymbols.length;
  while (index-- && baseIndexOf_default(chrSymbols, strSymbols[index], 0) > -1) {
  }
  return index;
}
var charsEndIndex_default = charsEndIndex;

// node_modules/lodash-es/_charsStartIndex.js
function charsStartIndex(strSymbols, chrSymbols) {
  var index = -1, length = strSymbols.length;
  while (++index < length && baseIndexOf_default(chrSymbols, strSymbols[index], 0) > -1) {
  }
  return index;
}
var charsStartIndex_default = charsStartIndex;

// node_modules/lodash-es/trim.js
function trim(string, chars, guard) {
  string = toString_default(string);
  if (string && (guard || chars === void 0)) {
    return baseTrim_default(string);
  }
  if (!string || !(chars = baseToString_default(chars))) {
    return string;
  }
  var strSymbols = stringToArray_default(string), chrSymbols = stringToArray_default(chars), start = charsStartIndex_default(strSymbols, chrSymbols), end = charsEndIndex_default(strSymbols, chrSymbols) + 1;
  return castSlice_default(strSymbols, start, end).join("");
}
var trim_default = trim;

// node_modules/lodash-es/_createSet.js
var INFINITY4 = 1 / 0;
var createSet = !(Set_default && 1 / setToArray_default(new Set_default([, -0]))[1] == INFINITY4) ? noop_default : function(values2) {
  return new Set_default(values2);
};
var createSet_default = createSet;

// node_modules/lodash-es/_baseUniq.js
var LARGE_ARRAY_SIZE2 = 200;
function baseUniq(array, iteratee, comparator) {
  var index = -1, includes2 = arrayIncludes_default, length = array.length, isCommon = true, result = [], seen = result;
  if (comparator) {
    isCommon = false;
    includes2 = arrayIncludesWith_default;
  } else if (length >= LARGE_ARRAY_SIZE2) {
    var set2 = iteratee ? null : createSet_default(array);
    if (set2) {
      return setToArray_default(set2);
    }
    isCommon = false;
    includes2 = cacheHas_default;
    seen = new SetCache_default();
  } else {
    seen = iteratee ? [] : result;
  }
  outer:
    while (++index < length) {
      var value = array[index], computed = iteratee ? iteratee(value) : value;
      value = comparator || value !== 0 ? value : 0;
      if (isCommon && computed === computed) {
        var seenIndex = seen.length;
        while (seenIndex--) {
          if (seen[seenIndex] === computed) {
            continue outer;
          }
        }
        if (iteratee) {
          seen.push(computed);
        }
        result.push(value);
      } else if (!includes2(seen, computed, comparator)) {
        if (seen !== result) {
          seen.push(computed);
        }
        result.push(value);
      }
    }
  return result;
}
var baseUniq_default = baseUniq;

// node_modules/lodash-es/uniqWith.js
function uniqWith(array, comparator) {
  comparator = typeof comparator == "function" ? comparator : void 0;
  return array && array.length ? baseUniq_default(array, void 0, comparator) : [];
}
var uniqWith_default = uniqWith;

// node_modules/@taichunmin/buffer/dist/buffer.mjs
var _ = Object.defineProperty;
var u = (n3, t2) => _(n3, "name", { value: t2, configurable: true });
var B = {};
var I = {};
var S = /* @__PURE__ */ Symbol.for("taichunmin.buffer");
var j = /* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom");
var m = new DataView(new ArrayBuffer(4));
var F = 50;
var O = new Uint8Array(new Uint16Array([4660]).buffer)[0] === 18;
var K = 2147483647;
var x = [0, 127, 32767, 8388607, 2147483647, 549755813887, 140737488355327];
var y = [0, 256, 65536, 16777216, 4294967296, 1099511627776, 281474976710656];
var q = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
var c = /* @__PURE__ */ new Map();
w(c, "-_", 62);
w(c, `${q}+/`);
var d = /* @__PURE__ */ new Map();
w(d, "+/", 62);
w(d, `${q}-_`);
var E = /* @__PURE__ */ new Map();
w(E, "ABCDEF", 10);
w(E, "0123456789abcdef");
var z = { "ucs-2": "fromUcs2String", "utf-16le": "fromUcs2String", "utf-8": "fromUtf8String", ascii: "fromLatin1String", base64: "fromBase64String", base64url: "fromBase64urlString", binary: "fromLatin1String", hex: "fromHexString", latin1: "fromLatin1String", ucs2: "fromUcs2String", utf16le: "fromUcs2String", utf8: "fromUtf8String" };
var G = { "ucs-2": "toUcs2String", "utf-16le": "toUcs2String", "utf-8": "toUtf8String", ascii: "toLatin1String", base64: "toBase64String", base64url: "toBase64urlString", binary: "toLatin1String", hex: "toHexString", latin1: "toLatin1String", ucs2: "toUcs2String", utf16le: "toUcs2String", utf8: "toUtf8String" };
var Q = /* @__PURE__ */ new Map([["x", X], ["c", Y], ["b", A], ["B", A], ["?", J], ["h", N], ["H", N], ["i", p], ["I", p], ["l", p], ["L", p], ["q", R], ["Q", R], ["e", et], ["f", nt], ["d", st], ["s", ot], ["p", ft]]);
var T = /* @__PURE__ */ new Map([["x", W], ["c", Z], ["b", C], ["B", C], ["?", tt], ["h", v], ["H", v], ["i", U], ["I", U], ["l", U], ["L", U], ["q", P], ["Q", P], ["e", rt], ["f", it], ["d", at], ["s", ut], ["p", ht]]);
var _a, _t, _b;
var b = (_b = class extends Uint8Array {
  constructor(...t2) {
    super(...t2);
    __privateAdd(this, _t);
    __publicField(this, _a, "Buffer");
    __privateSet(this, _t, new DataView(this.buffer, this.byteOffset, this.byteLength));
  }
  static alloc(t2, e3, r2 = "utf8") {
    if (!isSafeInteger_default(t2) || t2 >= K) throw new RangeError(`Invalid size: ${t2}`);
    let i = new _b(t2);
    return isNil_default(e3) ? i : isNil_default(r2) ? i.fill(e3) : i.fill(e3, r2);
  }
  static allocUnsafe(t2) {
    if (!isSafeInteger_default(t2) || t2 < 0) throw new TypeError(`Invalid size: ${t2}`);
    return new _b(t2);
  }
  static allocUnsafeSlow(t2) {
    if (!isSafeInteger_default(t2) || t2 < 0) throw new TypeError(`Invalid size: ${t2}`);
    return new _b(t2);
  }
  static byteLength(t2, e3 = "utf8") {
    if (_b.isBuffer(t2) || g(t2, ArrayBuffer) || V(t2) || ArrayBuffer.isView(t2)) return t2.byteLength;
    if (!isString_default(t2)) throw new TypeError(`Invalid type of string: ${typeof t2}`);
    return e3 = L(e3), includes_default(["ascii", "latin1", "binary"], e3) ? t2.length : includes_default(["ucs2", "ucs-2", "utf16le", "utf-16le"], e3) ? t2.length * 2 : e3 === "hex" ? t2.length >>> 1 : includes_default(["base64", "base64url"], e3) ? t2.replace(/[^A-Za-z0-9/_+-]/g, "").length * 3 >>> 2 : (I.utf8 ?? (I.utf8 = new TextEncoder()), I.utf8.encode(t2).length);
  }
  static compare(t2, e3) {
    if (!_b.isBuffer(t2)) {
      if (!ArrayBuffer.isView(t2)) throw new TypeError("Invalid type");
      t2 = _b.fromView(t2);
    }
    return t2.compare(e3);
  }
  static concat(t2, e3) {
    if (!isArray_default(t2) || !every_default(t2, this.isBuffer)) throw new TypeError('"list" argument must be an array of Buffers');
    e3 ?? (e3 = sumBy_default(t2, "length")), e3 < 0 && (e3 = 0);
    let r2 = new _b(e3), i = 0;
    for (let s of t2) i + s.length > e3 && (s = s.subarray(0, e3 - i)), r2.set(s, i), i += s.length;
    return r2;
  }
  static copyBytesFrom(t2, e3 = 0, r2) {
    return _b.fromView(t2, e3, r2).slice();
  }
  static equals(t2, e3) {
    return _b.isBuffer(t2) && t2.equals(e3);
  }
  static from(t2, e3, r2) {
    let i = t2?.[Symbol.toPrimitive]?.("string") ?? t2?.valueOf?.();
    if (!isNil_default(i) && i !== t2 && (t2 = i), isString_default(t2)) return _b.fromString(t2, e3);
    if (ArrayBuffer.isView(t2) || isArray_default(t2) || lt(t2)) return new _b(t2);
    if (t2?.type === "Buffer" && isArray_default(t2.data)) return new _b(t2.data);
    if (g(t2, ArrayBuffer) || V(t2)) return new _b(t2, e3, r2);
    throw new TypeError(`Invalid type of value: ${typeof t2}`);
  }
  static fromLatin1String(t2) {
    let e3 = new _b(t2.length);
    for (let r2 = 0; r2 < t2.length; r2++) e3[r2] = t2.charCodeAt(r2) & 255;
    return e3;
  }
  static fromBase64String(t2) {
    t2 = t2.replace(/[^A-Za-z0-9/_+-]/g, "");
    let e3 = t2.length, r2 = t2.length + 3;
    t2 = `${t2}AAA`.slice(0, r2 - r2 % 4);
    let i = new _b(t2.length * 3 >>> 2), s = 0;
    for (let a = 0; a < t2.length; a += 4) {
      let f = (c.get(t2[a]) << 18) + (c.get(t2[a + 1]) << 12) + (c.get(t2[a + 2]) << 6) + c.get(t2[a + 3]);
      i[s++] = f >>> 16 & 255, i[s++] = f >>> 8 & 255, i[s++] = f >>> 0 & 255;
    }
    return e3 < t2.length ? i.subarray(0, e3 - t2.length) : i;
  }
  static fromBase64urlString(t2) {
    return _b.fromBase64String(t2);
  }
  static fromHexString(t2) {
    t2 = t2.replace(/[^0-9A-Fa-f]/g, "");
    let e3 = new _b(t2.length >>> 1);
    for (let r2 = 0; r2 < e3.length; r2++) e3[r2] = E.get(t2[r2 * 2]) << 4 | E.get(t2[r2 * 2 + 1]);
    return e3;
  }
  static fromString(t2, e3 = "utf8") {
    return e3 = L(e3), _b[z[e3]](t2);
  }
  static fromUcs2String(t2) {
    let e3 = new _b(t2.length * 2);
    for (let r2 = 0; r2 < t2.length; r2++) e3.writeUInt16LE(t2.charCodeAt(r2), r2 * 2);
    return e3;
  }
  static fromUtf8String(t2) {
    return I.utf8 ?? (I.utf8 = new TextEncoder()), _b.fromView(I.utf8.encode(t2));
  }
  static fromView(t2, e3 = 0, r2) {
    if (!ArrayBuffer.isView(t2)) throw new TypeError("invalid view");
    let i = t2?.BYTES_PER_ELEMENT ?? 1, s = t2.byteLength / i;
    return e3 < 0 && (e3 = e3 % s + s), r2 ?? (r2 = s - e3), new _b(t2.buffer, t2.byteOffset + e3 * i, r2 * i);
  }
  [(_a = Symbol.toStringTag, S)]() {
    return true;
  }
  static isBuffer(t2) {
    return t2?.[S]?.() ?? false;
  }
  static isEncoding(t2) {
    return H.includes(t2?.toLowerCase?.());
  }
  static packParseFormat(t2) {
    if (!isString_default(t2)) throw new TypeError("Invalid type of format");
    let e3 = /^([@=<>!]?)((?:\d*[xcbB?hHiIlLqQefdsp])+)$/.exec(t2);
    if (isNil_default(e3)) throw new TypeError(`Invalid format: ${t2}`);
    return { littleEndian: includes_default(["", "@", "="], e3[1]) ? O : e3[1] === "<", items: map_default([...e3[2].matchAll(/\d*[xcbB?hHiIlLqQefdsp]/g)], ([i]) => {
      let s = i[i.length - 1], a = i.length > 1 ? parseInt_default(i.slice(0, -1)) : 1;
      return [s === "p" && a > 255 ? 255 : a, s];
    }) };
  }
  static packCalcSize(t2) {
    return isString_default(t2) && (t2 = _b.packParseFormat(t2)?.items), sumBy_default(t2, (e3) => {
      let [r2, i] = e3;
      return "hHe".includes(i) ? r2 * 2 : "iIlLf".includes(i) ? r2 * 4 : "qQd".includes(i) ? r2 * 8 : r2;
    });
  }
  static pack(t2, e3, ...r2) {
    isString_default(t2) && (r2.unshift(e3), [t2, e3] = [void 0, t2]);
    let { littleEndian: i, items: s } = _b.packParseFormat(e3), a = _b.packCalcSize(s);
    if (t2 ?? (t2 = new _b(a)), !_b.isBuffer(t2)) throw new TypeError("Invalid type of buf");
    if (t2.length < a) throw new RangeError(`buf.length = ${t2.length}, lenRequired = ${a}`);
    let f = { buf: t2, littleEndian: i, offset: 0, vals: r2 };
    for (let [h, l] of s) {
      let k = Q.get(l);
      if (isNil_default(k)) throw new Error(`Unknown format: ${h}${l}`);
      k(merge_default(f, { repeat: h, type: l }));
    }
    return t2;
  }
  static unpack(t2, e3) {
    let { littleEndian: r2, items: i } = _b.packParseFormat(e3), s = _b.packCalcSize(i);
    if (!_b.isBuffer(t2)) throw new TypeError("Invalid type of buf");
    if (t2.length < s) throw new RangeError(`buf.length = ${t2.length}, lenRequired = ${s}`);
    let a = { buf: t2, littleEndian: r2, offset: 0, vals: [] };
    for (let [f, h] of i) {
      let l = T.get(h);
      if (isNil_default(l)) throw new Error(`Unknown format: ${f}${h}`);
      l(merge_default(a, { repeat: f, type: h }));
    }
    return a.vals;
  }
  static *iterUnpack(t2, e3) {
    let { littleEndian: r2, items: i } = _b.packParseFormat(e3), s = _b.packCalcSize(i);
    if (!_b.isBuffer(t2)) throw new TypeError("Invalid type of buf");
    if (t2.length < s) throw new RangeError(`buf.length = ${t2.length}, lenRequired = ${s}`);
    for (; s <= t2.length; ) {
      let a = { buf: t2, littleEndian: r2, offset: 0, vals: [] };
      for (let [f, h] of i) {
        let l = T.get(h);
        if (isNil_default(l)) throw new Error(`Unknown format: ${f}${h}`);
        l(merge_default(a, { repeat: f, type: h }));
      }
      yield a.vals, t2 = t2.subarray(s);
    }
  }
  compare(t2, e3 = 0, r2 = t2.length, i = 0, s = this.length) {
    if (!_b.isBuffer(t2)) {
      if (!ArrayBuffer.isView(t2)) throw new TypeError("Invalid type");
      t2 = _b.fromView(t2);
    }
    let a = this.subarray(i, s);
    t2 = t2.subarray(e3, r2);
    let f = Math.min(a.length, t2.length);
    for (let h = 0; h < f; h++) {
      let l = a[h] - t2[h];
      if (l !== 0) return Math.sign(l);
    }
    return Math.sign(a.length - t2.length);
  }
  copy(t2, e3 = 0, r2 = 0, i = this.length) {
    let s = (_b.isBuffer(t2) ? t2 : _b.fromView(t2)).subarray(e3), a = this.subarray(r2, i);
    return a.length > s.length && (a = a.subarray(0, s.length)), s.set(a), a.length;
  }
  equals(t2) {
    if (!_b.isBuffer(t2)) {
      if (!ArrayBuffer.isView(t2)) return false;
      t2 = _b.fromView(t2);
    }
    if (this.length !== t2.length) return false;
    for (let e3 = 0; e3 < this.length; e3++) if (this[e3] !== t2[e3]) return false;
    return true;
  }
  fill(t2, e3 = 0, r2 = this.length, i = "utf8") {
    if (_b.isEncoding(e3) && ([e3, i] = [0, e3]), _b.isEncoding(r2) && ([r2, i] = [this.length, r2]), !isSafeInteger_default(e3) || !isSafeInteger_default(r2)) throw new RangeError("Invalid type of offset or end");
    if (isString_default(t2)) {
      let a = _b.fromString(t2, i);
      if (a.length === 0 && t2.length > 0) throw new ReferenceError("Failed to encode string");
      t2 = a;
    } else g(t2, Uint8Array) && (t2 = _b.fromView(t2));
    if (_b.isBuffer(t2) && t2.length < 2 && (t2 = t2.length > 0 ? t2[0] : 0), isNumber_default(t2)) {
      t2 = toSafeInteger_default(t2) & 255;
      for (let a = e3; a < r2; a++) this[a] = t2;
      return this;
    }
    let s = 0;
    for (let a = e3; a < r2; a++) this[a] = t2[s++], s >= t2.length && (s = 0);
    return this;
  }
  includes(t2, e3 = 0, r2 = "utf8") {
    return this.indexOf(t2, e3, r2) !== -1;
  }
  indexOf(t2, e3 = 0, r2 = "utf8") {
    if (_b.isEncoding(e3) && ([e3, r2] = [0, e3]), e3 = toNumber_default(e3), e3 = isNaN_default(e3) ? 0 : toSafeInteger_default(e3), e3 < 0 && (e3 = this.length + e3), isString_default(t2) ? t2 = _b.fromString(t2, r2) : g(t2, Uint8Array) && (t2 = _b.fromView(t2)), _b.isBuffer(t2)) {
      if (t2.length === 0) return -1;
      t2.length === 1 && (t2 = t2[0]);
    }
    if (isNumber_default(t2)) {
      t2 = toSafeInteger_default(t2) & 255;
      for (let s = e3; s < this.length; s++) if (this[s] === t2) return s;
      return -1;
    }
    let i = D(this.subarray(e3), t2);
    return i === -1 ? -1 : i + e3;
  }
  lastIndexOf(t2, e3 = this.length - 1, r2 = "utf8") {
    if (_b.isEncoding(e3) && ([e3, r2] = [this.length - 1, e3]), e3 = toNumber_default(e3), e3 = isNaN_default(e3) ? this.length - 1 : toSafeInteger_default(e3), e3 < 0 && (e3 = this.length + e3), isString_default(t2) ? t2 = _b.fromString(t2, r2) : g(t2, Uint8Array) && (t2 = _b.fromView(t2)), _b.isBuffer(t2)) {
      if (t2.length === 0) return -1;
      t2.length === 1 && (t2 = t2[0]);
    }
    if (isNumber_default(t2)) {
      t2 = toSafeInteger_default(t2) & 255;
      for (let a = Math.min(e3, this.length - 1); a >= 0; a--) if (this[a] === t2) return a;
      return -1;
    }
    let i = this.subarray(0, e3 + t2.length).toReversed(), s = D(i, t2.toReversed());
    return s === -1 ? -1 : i.length - t2.length - s;
  }
  readBigInt64BE(t2 = 0) {
    return __privateGet(this, _t).getBigInt64(t2);
  }
  readBigInt64LE(t2 = 0) {
    return __privateGet(this, _t).getBigInt64(t2, true);
  }
  readBigUInt64BE(t2 = 0) {
    return __privateGet(this, _t).getBigUint64(t2);
  }
  get readBigUint64BE() {
    return this.readBigUInt64BE;
  }
  readBigUInt64LE(t2 = 0) {
    return __privateGet(this, _t).getBigUint64(t2, true);
  }
  get readBigUint64LE() {
    return this.readBigUInt64LE;
  }
  readDoubleBE(t2 = 0) {
    return __privateGet(this, _t).getFloat64(t2);
  }
  readDoubleLE(t2 = 0) {
    return __privateGet(this, _t).getFloat64(t2, true);
  }
  readFloatBE(t2 = 0) {
    return __privateGet(this, _t).getFloat32(t2);
  }
  readFloatLE(t2 = 0) {
    return __privateGet(this, _t).getFloat32(t2, true);
  }
  readInt8(t2 = 0) {
    return __privateGet(this, _t).getInt8(t2);
  }
  readInt16BE(t2 = 0) {
    return __privateGet(this, _t).getInt16(t2);
  }
  readInt16LE(t2 = 0) {
    return __privateGet(this, _t).getInt16(t2, true);
  }
  readInt32BE(t2 = 0) {
    return __privateGet(this, _t).getInt32(t2);
  }
  readInt32LE(t2 = 0) {
    return __privateGet(this, _t).getInt32(t2, true);
  }
  readIntBE(t2 = 0, e3 = 6) {
    let r2 = this.readUIntBE(t2, e3);
    return r2 > x[e3] ? r2 - y[e3] : r2;
  }
  readIntLE(t2 = 0, e3 = 6) {
    let r2 = this.readUIntLE(t2, e3);
    return r2 > x[e3] ? r2 - y[e3] : r2;
  }
  readUInt8(t2 = 0) {
    return __privateGet(this, _t).getUint8(t2);
  }
  get readUint8() {
    return this.readUInt8;
  }
  readUInt16BE(t2 = 0) {
    return __privateGet(this, _t).getUint16(t2);
  }
  get readUint16BE() {
    return this.readUInt16BE;
  }
  readUInt16LE(t2 = 0) {
    return __privateGet(this, _t).getUint16(t2, true);
  }
  get readUint16LE() {
    return this.readUInt16LE;
  }
  readUInt32BE(t2 = 0) {
    return __privateGet(this, _t).getUint32(t2);
  }
  get readUint32BE() {
    return this.readUInt32BE;
  }
  readUInt32LE(t2 = 0) {
    return __privateGet(this, _t).getUint32(t2, true);
  }
  get readUint32LE() {
    return this.readUInt32LE;
  }
  readUIntBE(t2 = 0, e3 = 6) {
    if (t2 + e3 > this.length) throw new RangeError(`Invalid offset: ${t2}`);
    switch (e3) {
      case 1:
        return this[t2];
      case 2:
        return this.readUInt16BE(t2);
      case 3:
        return this.readUInt16BE(t2) * 256 + this[t2 + 2];
      case 4:
        return this.readUInt32BE(t2);
      case 5:
        return this.readUInt32BE(t2) * 256 + this[t2 + 4];
      case 6:
        return this.readUInt32BE(t2) * 65536 + this.readUInt16BE(t2 + 4);
      default:
        throw new Error(`Invalid byteLength: ${e3}`);
    }
  }
  get readUintBE() {
    return this.readUIntBE;
  }
  readUIntLE(t2 = 0, e3 = 6) {
    if (t2 + e3 > this.length) throw new RangeError(`Invalid offset: ${t2}`);
    switch (e3) {
      case 1:
        return this[t2];
      case 2:
        return this.readUInt16LE(t2);
      case 3:
        return this[t2] + this.readUInt16LE(t2 + 1) * 256;
      case 4:
        return this.readUInt32LE(t2);
      case 5:
        return this[t2] + this.readUInt32LE(t2 + 1) * 256;
      case 6:
        return this.readUInt16LE(t2) + this.readUInt32LE(t2 + 2) * 65536;
      default:
        throw new Error(`Invalid byteLength: ${e3}`);
    }
  }
  get readUintLE() {
    return this.readUIntLE;
  }
  readFloat16BE(t2 = 0) {
    let e3 = M(this.readUInt16BE(t2));
    return m.setUint32(0, e3), m.getFloat32(0);
  }
  readFloat16LE(t2 = 0) {
    let e3 = M(this.readUInt16LE(t2));
    return m.setUint32(0, e3), m.getFloat32(0);
  }
  readBitMSB(t2) {
    let e3 = [t2 >>> 3, t2 & 7 ^ 7];
    return this[e3[0]] >>> e3[1] & 1;
  }
  readBitLSB(t2) {
    let e3 = [this.length - (t2 >>> 3) - 1, t2 & 7];
    return this[e3[0]] >>> e3[1] & 1;
  }
  swap16() {
    if ((this.length & 1) > 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (let t2 = 0; t2 < this.length; t2 += 2) this.writeUInt16LE(this.readUInt16BE(t2), t2);
    return this;
  }
  swap32() {
    if ((this.length & 3) > 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (let t2 = 0; t2 < this.length; t2 += 4) this.writeUInt32LE(this.readUInt32BE(t2), t2);
    return this;
  }
  swap64() {
    if ((this.length & 7) > 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (let t2 = 0; t2 < this.length; t2 += 8) this.writeBigUInt64LE(this.readBigUInt64BE(t2), t2);
    return this;
  }
  toJSON() {
    return { type: "Buffer", data: [...this] };
  }
  toString(t2 = "utf8", e3 = 0, r2 = this.length) {
    return t2 = L(t2), _b[G[t2]](this.subarray(e3, r2));
  }
  [j]() {
    let t2 = this.subarray(0, F).toString("hex").match(/.{2}/g) ?? [], e3 = this.length > F ? ` ... ${this.length - F} more bytes` : "";
    return `<Buffer ${t2.join(" ")}${e3}>`;
  }
  toReversed() {
    return this.slice().reverse();
  }
  static toUcs2String(t2) {
    return B["utf-16le"] ?? (B["utf-16le"] = new TextDecoder("utf-16le")), B["utf-16le"].decode(t2);
  }
  static toUtf8String(t2) {
    return B.utf8 ?? (B.utf8 = new TextDecoder()), B.utf8.decode(t2);
  }
  static toLatin1String(t2) {
    let e3 = [];
    for (let r2 = 0; r2 < t2.length; r2++) e3.push(String.fromCharCode(t2[r2]));
    return e3.join("");
  }
  static toBase64String(t2) {
    let e3 = [];
    for (let i = 0; i < t2.length; i += 3) {
      let s = (t2[i] << 16) + ((i + 1 < t2.length ? t2[i + 1] : 0) << 8) + (i + 2 < t2.length ? t2[i + 2] : 0);
      e3.push(c.get(s >>> 18 & 63), c.get(s >>> 12 & 63), c.get(s >>> 6 & 63), c.get(s >>> 0 & 63));
    }
    let r2 = e3.length + (t2.length + 2) % 3 - 2;
    for (let i = r2; i < e3.length; i++) e3[i] = "=";
    return e3.join("");
  }
  static toBase64urlString(t2) {
    let e3 = [];
    for (let i = 0; i < t2.length; i += 3) {
      let s = (t2[i] << 16) + ((t2[i + 1] ?? 0) << 8) + (t2[i + 2] ?? 0);
      e3.push(d.get(s >>> 18 & 63), d.get(s >>> 12 & 63), d.get(s >>> 6 & 63), d.get(s >>> 0 & 63));
    }
    let r2 = (t2.length + 2) % 3 - 2;
    return (r2 !== 0 ? e3.slice(0, r2) : e3).join("");
  }
  static toHexString(t2) {
    let e3 = [];
    for (let r2 = 0; r2 < t2.length; r2++) e3.push(E.get(t2[r2] >>> 4), E.get(t2[r2] & 15));
    return e3.join("");
  }
  write(t2, e3 = 0, r2 = this.length - e3, i = "utf8") {
    if (isString_default(e3) ? [e3, r2, i] = [0, this.length, e3] : isString_default(r2) && ([r2, i] = [this.length - e3, r2]), !isString_default(t2)) throw new TypeError("Invalid type of val");
    if (!isSafeInteger_default(e3)) throw new TypeError("Invalid type of offset");
    if (!isSafeInteger_default(r2)) throw new TypeError("Invalid type of length");
    let s = _b.fromString(t2, i);
    return r2 = Math.min(s.length, r2, this.length - e3), this.set(s.subarray(0, r2), e3), r2;
  }
  writeBigInt64BE(t2, e3 = 0) {
    return __privateGet(this, _t).setBigInt64(e3, t2), this;
  }
  writeBigInt64LE(t2, e3 = 0) {
    return __privateGet(this, _t).setBigInt64(e3, t2, true), this;
  }
  writeBigUInt64BE(t2, e3 = 0) {
    return __privateGet(this, _t).setBigUint64(e3, t2), this;
  }
  get writeBigUint64BE() {
    return this.writeBigUInt64BE;
  }
  writeBigUInt64LE(t2, e3 = 0) {
    return __privateGet(this, _t).setBigUint64(e3, t2, true), this;
  }
  get writeBigUint64LE() {
    return this.writeBigUInt64LE;
  }
  writeDoubleBE(t2, e3 = 0) {
    return __privateGet(this, _t).setFloat64(e3, t2), this;
  }
  writeDoubleLE(t2, e3 = 0) {
    return __privateGet(this, _t).setFloat64(e3, t2, true), this;
  }
  writeFloatBE(t2, e3 = 0) {
    return __privateGet(this, _t).setFloat32(e3, t2), this;
  }
  writeFloatLE(t2, e3 = 0) {
    return __privateGet(this, _t).setFloat32(e3, t2, true), this;
  }
  writeFloat16BE(t2, e3 = 0) {
    m.setFloat32(0, t2);
    let r2 = m.getUint32(0);
    return this.writeUInt16BE($(r2), e3);
  }
  writeFloat16LE(t2, e3 = 0) {
    m.setFloat32(0, t2);
    let r2 = m.getUint32(0);
    return this.writeUInt16LE($(r2), e3);
  }
  writeInt8(t2, e3 = 0) {
    return __privateGet(this, _t).setInt8(e3, t2), this;
  }
  writeInt16BE(t2, e3 = 0) {
    return __privateGet(this, _t).setInt16(e3, t2), this;
  }
  writeInt16LE(t2, e3 = 0) {
    return __privateGet(this, _t).setInt16(e3, t2, true), this;
  }
  writeInt32BE(t2, e3 = 0) {
    return __privateGet(this, _t).setInt32(e3, t2), this;
  }
  writeInt32LE(t2, e3 = 0) {
    return __privateGet(this, _t).setInt32(e3, t2, true), this;
  }
  writeIntBE(t2, e3 = 0, r2 = 6) {
    if (r2 < 1 || r2 > 6) throw new RangeError(`Invalid byteLength: ${r2}`);
    return t2 < 0 && (t2 += y[r2]), this.writeUIntBE(t2, e3, r2), this;
  }
  writeIntLE(t2, e3 = 0, r2 = 6) {
    if (r2 < 1 || r2 > 6) throw new RangeError(`Invalid byteLength: ${r2}`);
    return t2 < 0 && (t2 += y[r2]), this.writeUIntLE(t2, e3, r2), this;
  }
  writeUInt8(t2, e3 = 0) {
    return __privateGet(this, _t).setUint8(e3, t2), this;
  }
  get writeUint8() {
    return this.writeUInt8;
  }
  writeUInt16BE(t2, e3 = 0) {
    return __privateGet(this, _t).setUint16(e3, t2), this;
  }
  get writeUint16BE() {
    return this.writeUInt16BE;
  }
  writeUInt16LE(t2, e3 = 0) {
    return __privateGet(this, _t).setUint16(e3, t2, true), this;
  }
  get writeUint16LE() {
    return this.writeUInt16LE;
  }
  writeUInt32BE(t2, e3 = 0) {
    return __privateGet(this, _t).setUint32(e3, t2), this;
  }
  get writeUint32BE() {
    return this.writeUInt32BE;
  }
  writeUInt32LE(t2, e3 = 0) {
    return __privateGet(this, _t).setUint32(e3, t2, true), this;
  }
  get writeUint32LE() {
    return this.writeUInt32LE;
  }
  writeUIntBE(t2, e3 = 0, r2 = 6) {
    if (e3 + r2 > this.length) throw new RangeError(`Invalid offset: ${e3}`);
    switch (r2) {
      case 1:
        this[e3] = t2;
        break;
      case 2:
        this.writeUInt16BE(t2, e3);
        break;
      case 3:
        this.writeUInt16BE(t2 / 256, e3), this[e3 + 2] = t2;
        break;
      case 4:
        this.writeUInt32BE(t2, e3);
        break;
      case 5:
        this.writeUInt32BE(t2 / 256, e3), this[e3 + 4] = t2;
        break;
      case 6:
        this.writeUInt32BE(t2 / 65536, e3), this.writeUInt16BE(t2, e3 + 4);
        break;
      default:
        throw new RangeError(`Invalid byteLength: ${r2}`);
    }
    return this;
  }
  get writeUintBE() {
    return this.writeUIntBE;
  }
  writeUIntLE(t2, e3 = 0, r2 = 6) {
    if (e3 + r2 > this.length) throw new RangeError(`Invalid offset: ${e3}`);
    switch (r2) {
      case 1:
        this[e3] = t2;
        break;
      case 2:
        this.writeUInt16LE(t2, e3);
        break;
      case 3:
        this[e3] = t2, this.writeUInt16LE(t2 / 256, e3 + 1);
        break;
      case 4:
        this.writeUInt32LE(t2, e3);
        break;
      case 5:
        this[e3] = t2, this.writeUInt32LE(t2 / 256, e3 + 1);
        break;
      case 6:
        this.writeUInt16LE(t2, e3), this.writeUInt32LE(t2 / 65536, e3 + 2);
        break;
      default:
        throw new RangeError(`Invalid byteLength: ${r2}`);
    }
    return this;
  }
  get writeUintLE() {
    return this.writeUIntLE;
  }
  writeBitMSB(t2, e3) {
    let r2 = [e3 >>> 3, e3 & 7 ^ 7];
    return t2 ? this[r2[0]] |= 1 << r2[1] : this[r2[0]] &= ~(1 << r2[1]), this;
  }
  writeBitLSB(t2, e3) {
    let r2 = [this.length - (e3 >>> 3) - 1, e3 & 7];
    return t2 ? this[r2[0]] |= 1 << r2[1] : this[r2[0]] &= ~(1 << r2[1]), this;
  }
  chunk(t2) {
    if (t2 < 1) throw new TypeError("invalid bytesPerChunk");
    let e3 = [];
    for (let r2 = 0; r2 < this.length; r2 += t2) e3.push(this.subarray(r2, r2 + t2));
    return e3;
  }
  not() {
    for (let t2 = 0; t2 < this.length; t2++) this[t2] = ~this[t2];
    return this;
  }
  toNoted() {
    return this.slice().not();
  }
  or(t2) {
    if (_b.isBuffer(t2)) {
      let e3 = Math.min(this.length, t2.length);
      for (let r2 = 0; r2 < e3; r2++) this[r2] |= t2[r2];
      return this;
    } else {
      let e3 = 0;
      for (let r2 of this) e3 |= r2;
      return e3;
    }
  }
  toOred(t2) {
    return this.slice().or(t2);
  }
  and(t2) {
    if (_b.isBuffer(t2)) {
      let e3 = Math.min(this.length, t2.length);
      for (let r2 = 0; r2 < e3; r2++) this[r2] &= t2[r2];
      return this;
    } else {
      let e3 = 255;
      for (let r2 of this) e3 &= r2;
      return e3;
    }
  }
  toAnded(t2) {
    return this.slice().and(t2);
  }
  xor(t2) {
    if (_b.isBuffer(t2)) {
      let e3 = Math.min(this.length, t2.length);
      for (let r2 = 0; r2 < e3; r2++) this[r2] ^= t2[r2];
      return this;
    } else {
      let e3 = 0;
      for (let r2 of this) e3 ^= r2;
      return e3;
    }
  }
  toXored(t2) {
    return this.slice().xor(t2);
  }
  pack(t2, ...e3) {
    return _b.pack(this, t2, ...e3), this;
  }
  unpack(t2) {
    return _b.unpack(this, t2);
  }
  *iterUnpack(t2) {
    yield* _b.iterUnpack(this, t2);
  }
  toSorted(t2) {
    return this.slice().sort(t2);
  }
  with(t2, e3) {
    let r2 = this.slice();
    return r2[t2] = e3, r2;
  }
  getBigInt64(t2, e3) {
    return __privateGet(this, _t).getBigInt64(t2, e3);
  }
  getBigUint64(t2, e3) {
    return __privateGet(this, _t).getBigUint64(t2, e3);
  }
  getFloat16(t2, e3 = false) {
    return e3 ? this.readFloat16LE(t2) : this.readFloat16BE(t2);
  }
  getFloat32(t2, e3) {
    return __privateGet(this, _t).getFloat32(t2, e3);
  }
  getFloat64(t2, e3) {
    return __privateGet(this, _t).getFloat64(t2, e3);
  }
  getInt16(t2, e3) {
    return __privateGet(this, _t).getInt16(t2, e3);
  }
  getInt32(t2, e3) {
    return __privateGet(this, _t).getInt32(t2, e3);
  }
  getInt8(t2) {
    return __privateGet(this, _t).getInt8(t2);
  }
  getUint16(t2, e3) {
    return __privateGet(this, _t).getUint16(t2, e3);
  }
  getUint32(t2, e3) {
    return __privateGet(this, _t).getUint32(t2, e3);
  }
  getUint8(t2) {
    return __privateGet(this, _t).getUint8(t2);
  }
  setBigInt64(t2, e3, r2) {
    return __privateGet(this, _t).setBigInt64(t2, e3, r2), this;
  }
  setBigUint64(t2, e3, r2) {
    return __privateGet(this, _t).setBigUint64(t2, e3, r2), this;
  }
  setFloat16(t2, e3, r2 = false) {
    return r2 ? this.writeFloat16LE(e3, t2) : this.writeFloat16BE(e3, t2), this;
  }
  setFloat32(t2, e3, r2) {
    return __privateGet(this, _t).setFloat32(t2, e3, r2), this;
  }
  setFloat64(t2, e3, r2) {
    return __privateGet(this, _t).setFloat64(t2, e3, r2), this;
  }
  setInt16(t2, e3, r2) {
    return __privateGet(this, _t).setInt16(t2, e3, r2), this;
  }
  setInt32(t2, e3, r2) {
    return __privateGet(this, _t).setInt32(t2, e3, r2), this;
  }
  setInt8(t2, e3) {
    return __privateGet(this, _t).setInt8(t2, e3), this;
  }
  setUint16(t2, e3, r2) {
    return __privateGet(this, _t).setUint16(t2, e3, r2), this;
  }
  setUint32(t2, e3, r2) {
    return __privateGet(this, _t).setUint32(t2, e3, r2), this;
  }
  setUint8(t2, e3) {
    return __privateGet(this, _t).setUint8(t2, e3), this;
  }
}, _t = new WeakMap(), u(_b, "Buffer"), _b);
function X(n3) {
  let { buf: t2, repeat: e3 } = n3;
  for (let r2 = 0; r2 < e3; r2++) t2[n3.offset] = 0;
  n3.offset += e3;
}
u(X, "packFromPad");
function W(n3) {
  let { repeat: t2 } = n3;
  n3.offset += t2;
}
u(W, "unpackToPad");
function Y(n3) {
  let { buf: t2, repeat: e3, vals: r2 } = n3;
  for (let i = 0; i < e3; i++) {
    if (r2.length === 0) throw new TypeError("Not enough vals");
    t2[n3.offset] = b.from(r2.shift())?.[0] ?? 0, n3.offset += 1;
  }
}
u(Y, "packFromChar");
function Z(n3) {
  let { buf: t2, repeat: e3, vals: r2 } = n3;
  for (let i = 0; i < e3; i++) r2.push(t2.subarray(n3.offset, n3.offset + 1)), n3.offset += 1;
}
u(Z, "unpackToChar");
function A(n3) {
  let { buf: t2, repeat: e3, type: r2, vals: i } = n3, s = r2 === "b" ? "writeInt8" : "writeUInt8";
  for (let a = 0; a < e3; a++) {
    if (i.length === 0) throw new TypeError("Not enough vals");
    t2[s](toSafeInteger_default(i.shift()), n3.offset), n3.offset += 1;
  }
}
u(A, "packFromInt8");
function C(n3) {
  let { buf: t2, repeat: e3, type: r2, vals: i } = n3, s = r2 === "b" ? "readInt8" : "readUInt8";
  for (let a = 0; a < e3; a++) i.push(t2[s](n3.offset)), n3.offset += 1;
}
u(C, "unpackToInt8");
function J(n3) {
  let { buf: t2, repeat: e3, vals: r2 } = n3;
  for (let i = 0; i < e3; i++) {
    if (r2.length === 0) throw new TypeError("Not enough vals");
    t2.writeUInt8(r2.shift() ? 1 : 0, n3.offset), n3.offset += 1;
  }
}
u(J, "packFromBool");
function tt(n3) {
  let { buf: t2, repeat: e3, vals: r2 } = n3;
  for (let i = 0; i < e3; i++) r2.push(t2.readUInt8(n3.offset) !== 0), n3.offset += 1;
}
u(tt, "unpackToBool");
function N(n3) {
  let { buf: t2, littleEndian: e3, repeat: r2, type: i, vals: s } = n3, a = ["writeUInt16BE", "writeUInt16LE", "writeInt16BE", "writeInt16LE"][(i === "h" ? 2 : 0) + (e3 ? 1 : 0)];
  for (let f = 0; f < r2; f++) {
    if (s.length === 0) throw new TypeError("Not enough vals");
    t2[a](toSafeInteger_default(s.shift()), n3.offset), n3.offset += 2;
  }
}
u(N, "packFromInt16");
function v(n3) {
  let { buf: t2, littleEndian: e3, repeat: r2, type: i, vals: s } = n3, a = ["readUInt16BE", "readUInt16LE", "readInt16BE", "readInt16LE"][(i === "h" ? 2 : 0) + (e3 ? 1 : 0)];
  for (let f = 0; f < r2; f++) s.push(t2[a](n3.offset)), n3.offset += 2;
}
u(v, "unpackToInt16");
function p(n3) {
  let { buf: t2, littleEndian: e3, repeat: r2, type: i, vals: s } = n3, a = ["writeUInt32BE", "writeUInt32LE", "writeInt32BE", "writeInt32LE"][("il".includes(i) ? 2 : 0) + (e3 ? 1 : 0)];
  for (let f = 0; f < r2; f++) {
    if (s.length === 0) throw new TypeError("Not enough vals");
    t2[a](toSafeInteger_default(s.shift()), n3.offset), n3.offset += 4;
  }
}
u(p, "packFromInt32");
function U(n3) {
  let { buf: t2, littleEndian: e3, repeat: r2, type: i, vals: s } = n3, a = ["readUInt32BE", "readUInt32LE", "readInt32BE", "readInt32LE"][("il".includes(i) ? 2 : 0) + (e3 ? 1 : 0)];
  for (let f = 0; f < r2; f++) s.push(t2[a](n3.offset)), n3.offset += 4;
}
u(U, "unpackToInt32");
function R(n3) {
  let { buf: t2, littleEndian: e3, repeat: r2, type: i, vals: s } = n3, a = ["writeBigUInt64BE", "writeBigUInt64LE", "writeBigInt64BE", "writeBigInt64LE"][(i === "q" ? 2 : 0) + (e3 ? 1 : 0)];
  for (let f = 0; f < r2; f++) {
    if (s.length === 0) throw new TypeError("Not enough vals");
    t2[a](BigInt(s.shift()), n3.offset), n3.offset += 8;
  }
}
u(R, "packFromBigInt64");
function P(n3) {
  let { buf: t2, littleEndian: e3, repeat: r2, type: i, vals: s } = n3, a = ["readBigUInt64BE", "readBigUInt64LE", "readBigInt64BE", "readBigInt64LE"][(i === "q" ? 2 : 0) + (e3 ? 1 : 0)];
  for (let f = 0; f < r2; f++) s.push(t2[a](n3.offset)), n3.offset += 8;
}
u(P, "unpackToBigInt64");
function et(n3) {
  let { buf: t2, littleEndian: e3, repeat: r2, vals: i } = n3, s = e3 ? "writeFloat16LE" : "writeFloat16BE";
  for (let a = 0; a < r2; a++) {
    if (i.length === 0) throw new TypeError("Not enough vals");
    t2[s](i.shift(), n3.offset), n3.offset += 2;
  }
}
u(et, "packFromFloat16");
function rt(n3) {
  let { buf: t2, littleEndian: e3, repeat: r2, vals: i } = n3, s = e3 ? "readFloat16LE" : "readFloat16BE";
  for (let a = 0; a < r2; a++) i.push(t2[s](n3.offset)), n3.offset += 2;
}
u(rt, "unpackToFloat16");
function nt(n3) {
  let { buf: t2, littleEndian: e3, repeat: r2, vals: i } = n3, s = e3 ? "writeFloatLE" : "writeFloatBE";
  for (let a = 0; a < r2; a++) {
    if (i.length === 0) throw new TypeError("Not enough vals");
    t2[s](i.shift(), n3.offset), n3.offset += 4;
  }
}
u(nt, "packFromFloat");
function it(n3) {
  let { buf: t2, littleEndian: e3, repeat: r2, vals: i } = n3, s = e3 ? "readFloatLE" : "readFloatBE";
  for (let a = 0; a < r2; a++) i.push(t2[s](n3.offset)), n3.offset += 4;
}
u(it, "unpackToFloat");
function st(n3) {
  let { buf: t2, littleEndian: e3, repeat: r2, vals: i } = n3, s = e3 ? "writeDoubleLE" : "writeDoubleBE";
  for (let a = 0; a < r2; a++) {
    if (i.length === 0) throw new TypeError("Not enough vals");
    t2[s](i.shift(), n3.offset), n3.offset += 8;
  }
}
u(st, "packFromDouble");
function at(n3) {
  let { buf: t2, littleEndian: e3, repeat: r2, vals: i } = n3, s = e3 ? "readDoubleLE" : "readDoubleBE";
  for (let a = 0; a < r2; a++) i.push(t2[s](n3.offset)), n3.offset += 8;
}
u(at, "unpackToDouble");
function ot(n3) {
  let { buf: t2, repeat: e3, vals: r2 } = n3;
  if (r2.length === 0) throw new TypeError("Not enough vals");
  let i = r2.shift(), s = new b(e3);
  b.from(i).copy(s, 0, 0, e3), s.copy(t2, n3.offset), n3.offset += s.length;
}
u(ot, "packFromString");
function ut(n3) {
  let { buf: t2, repeat: e3, vals: r2 } = n3;
  r2.push(t2.subarray(n3.offset, n3.offset + e3)), n3.offset += e3;
}
u(ut, "unpackToString");
function ft(n3) {
  let { buf: t2, repeat: e3, vals: r2 } = n3;
  if (r2.length === 0) throw new TypeError("Not enough vals");
  let i = r2.shift(), s = new b(e3);
  s[0] = b.from(i).copy(s, 1, 0, e3 - 1), s.copy(t2, n3.offset), n3.offset += s.length;
}
u(ft, "packFromPascal");
function ht(n3) {
  let { buf: t2, repeat: e3, vals: r2 } = n3, i = Math.min(t2[n3.offset], e3 - 1);
  r2.push(t2.subarray(n3.offset + 1, n3.offset + 1 + i)), n3.offset += e3;
}
u(ht, "unpackToPascal");
function L(n3) {
  let t2 = n3?.toLowerCase?.();
  if (!H.includes(t2)) throw new TypeError(`Unknown encoding: ${n3}`);
  return t2;
}
u(L, "toEncodingOrFail");
function w(n3, t2, e3 = 0) {
  for (let r2 = 0; r2 < t2.length; r2++) n3.set(r2 + e3, t2[r2]).set(t2[r2], r2 + e3);
}
u(w, "initCharCodeMap");
function g(n3, t2) {
  return n3 instanceof t2 || n3?.constructor?.name === t2?.name;
}
u(g, "isInstance");
function V(n3) {
  return typeof SharedArrayBuffer < "u" && (g(n3, SharedArrayBuffer) || g(n3?.buffer, SharedArrayBuffer));
}
u(V, "isSharedArrayBuffer");
function lt(n3) {
  return typeof n3?.[Symbol.iterator] == "function";
}
u(lt, "isIterable");
function $(n3) {
  let t2 = n3 >>> 23 & 255;
  return t2 === 255 ? (n3 >>> 16 & 32768) + 31744 + ((n3 & 8388607) !== 0 ? 512 : 0) : t2 === 0 ? (n3 >>> 16 & 32768) + (n3 >>> 13 & 1023) : (n3 >>> 16 & 32768) + (t2 - 112 << 10 & 31744) + (n3 >>> 13 & 1023);
}
u($, "floatU32ToU16");
function M(n3) {
  let t2 = n3 >>> 10 & 31;
  return t2 === 31 ? (n3 << 16 & 2147483648) + 2139095040 + ((n3 & 1023) !== 0 ? 4194304 : 0) : t2 === 0 ? (n3 << 16 & 2147483648) + (n3 << 13 & 8380416) : (n3 << 16 & 2147483648) + (t2 + 112 << 23 & 2139095040) + (n3 << 13 & 8380416);
}
u(M, "floatU16ToU32");
function D(n3, t2) {
  let [e3, r2] = [t2.length - 1, n3.length - t2.length], i = /* @__PURE__ */ new Map();
  for (let a = 0; a < e3; a++) i.set(t2[a], e3 - a);
  let s = 0;
  for (; s <= r2; ) {
    let a = e3;
    for (; a >= 0 && n3[s + a] === t2[a]; ) a--;
    if (a < 0) return s;
    let f = n3[s + e3];
    s += i.get(f) ?? t2.length;
  }
  return -1;
}
u(D, "bufIndexOfBoyerMoore");
var H = ["ucs-2", "utf-16le", "utf-8", "ascii", "base64", "base64url", "binary", "hex", "latin1", "ucs2", "utf16le", "utf8"];

// node_modules/@taichunmin/crc/dist/crc16a.mjs
var e = new Uint8Array(1);
var F2 = new Uint16Array(1);
var o = new Uint32Array(1);
var n = new Uint16Array([0, 4489, 8978, 12955, 17956, 22445, 25910, 29887, 35912, 40385, 44890, 48851, 51820, 56293, 59774, 63735, 4225, 264, 13203, 8730, 22181, 18220, 30135, 25662, 40137, 36160, 49115, 44626, 56045, 52068, 63999, 59510, 8450, 12427, 528, 5017, 26406, 30383, 17460, 21949, 44362, 48323, 36440, 40913, 60270, 64231, 51324, 55797, 12675, 8202, 4753, 792, 30631, 26158, 21685, 17724, 48587, 44098, 40665, 36688, 64495, 60006, 55549, 51572, 16900, 21389, 24854, 28831, 1056, 5545, 10034, 14011, 52812, 57285, 60766, 64727, 34920, 39393, 43898, 47859, 21125, 17164, 29079, 24606, 5281, 1320, 14259, 9786, 57037, 53060, 64991, 60502, 39145, 35168, 48123, 43634, 25350, 29327, 16404, 20893, 9506, 13483, 1584, 6073, 61262, 65223, 52316, 56789, 43370, 47331, 35448, 39921, 29575, 25102, 20629, 16668, 13731, 9258, 5809, 1848, 65487, 60998, 56541, 52564, 47595, 43106, 39673, 35696, 33800, 38273, 42778, 46739, 49708, 54181, 57662, 61623, 2112, 6601, 11090, 15067, 20068, 24557, 28022, 31999, 38025, 34048, 47003, 42514, 53933, 49956, 61887, 57398, 6337, 2376, 15315, 10842, 24293, 20332, 32247, 27774, 42250, 46211, 34328, 38801, 58158, 62119, 49212, 53685, 10562, 14539, 2640, 7129, 28518, 32495, 19572, 24061, 46475, 41986, 38553, 34576, 62383, 57894, 53437, 49460, 14787, 10314, 6865, 2904, 32743, 28270, 23797, 19836, 50700, 55173, 58654, 62615, 32808, 37281, 41786, 45747, 19012, 23501, 26966, 30943, 3168, 7657, 12146, 16123, 54925, 50948, 62879, 58390, 37033, 33056, 46011, 41522, 23237, 19276, 31191, 26718, 7393, 3432, 16371, 11898, 59150, 63111, 50204, 54677, 41258, 45219, 33336, 37809, 27462, 31439, 18516, 23005, 11618, 15595, 3696, 8185, 63375, 58886, 54429, 50452, 45483, 40994, 37561, 33584, 31687, 27214, 22741, 18780, 15843, 11370, 7921, 3960]);
function t(x2 = new Uint8Array(), A2 = 25443) {
  F2[0] = A2;
  for (let E2 of x2) F2[0] = n[(F2[0] ^ E2) & 255] ^ F2[0] >>> 8;
  return F2[0];
}

// node_modules/@taichunmin/crc/dist/crc32.mjs
var o2 = new Uint8Array(1);
var c2 = new Uint16Array(1);
var D2 = new Uint32Array(1);
var e2 = new Uint32Array([0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685, 2657392035, 249268274, 2044508324, 3772115230, 2547177864, 162941995, 2125561021, 3887607047, 2428444049, 498536548, 1789927666, 4089016648, 2227061214, 450548861, 1843258603, 4107580753, 2211677639, 325883990, 1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755, 2366115317, 997073096, 1281953886, 3579855332, 2724688242, 1006888145, 1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206, 2898065728, 853044451, 1172266101, 3705015759, 2882616665, 651767980, 1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705, 3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527, 1483230225, 3244367275, 3060149565, 1994146192, 31158534, 2563907772, 4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290, 251722036, 2517215374, 3775830040, 2137656763, 141376813, 2439277719, 3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925, 453092731, 2181625025, 4111451223, 1706088902, 314042704, 2344532202, 4240017532, 1658658271, 366619977, 2362670323, 4224994405, 1303535960, 984961486, 2747007092, 3569037538, 1256170817, 1037604311, 2765210733, 3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467, 855842277, 2852801631, 3708648649, 1342533948, 654459306, 3188396048, 3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054, 702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443, 3233442989, 3988292384, 2596254646, 62317068, 1957810842, 3939845945, 2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430, 2053790376, 3826175755, 2466906013, 167816743, 2097651377, 4027552580, 2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225, 1852507879, 4275313526, 2312317920, 282753626, 1742555852, 4189708143, 2394877945, 397917763, 1622183637, 3604390888, 2714866558, 953729732, 1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850, 2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135, 1181335161, 3412177804, 3160834842, 628085408, 1382605366, 3423369109, 3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954, 1555261956, 3268935591, 3050360625, 752459403, 1541320221, 2607071920, 3965973030, 1969922972, 40735498, 2617837225, 3943577151, 1913087877, 83908371, 2512341634, 3803740692, 2075208622, 213261112, 2463272603, 3855990285, 2094854071, 198958881, 2262029012, 4057260610, 1759359992, 534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934, 4279200368, 1711684554, 285281116, 2405801727, 4167216745, 1634467795, 376229701, 2685067896, 3608007406, 1308918612, 956543938, 2808555105, 3495958263, 1231636301, 1047427035, 2932959818, 3654703836, 1088359270, 936918e3, 2847714899, 3736837829, 1202900863, 817233897, 3183342108, 3401237130, 1404277552, 615818150, 3134207493, 3453421203, 1423857449, 601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471, 3272380065, 1510334235, 755167117]);
var r = 4294967295;
function n2(x2 = new Uint8Array(), B2 = 0) {
  D2[0] = B2 ^ r;
  for (let A2 of x2) D2[0] = e2[(D2[0] ^ A2) & 255] ^ D2[0] >>> 8;
  return (D2[0] ^ r) >>> 0;
}

// src/CustomEventTarget.ts
var _listeners, _CustomEventTarget_instances, wrapListener_fn;
var CustomEventTarget = class extends EventTarget {
  constructor() {
    super(...arguments);
    __privateAdd(this, _CustomEventTarget_instances);
    __privateAdd(this, _listeners, /* @__PURE__ */ new Map());
  }
  on(type, listener) {
    const typeListeners = __privateGet(this, _listeners).get(type) ?? /* @__PURE__ */ new Map();
    if (typeListeners.has(listener)) return this;
    if (!__privateGet(this, _listeners).has(type)) __privateGet(this, _listeners).set(type, typeListeners);
    const wrapped = __privateMethod(this, _CustomEventTarget_instances, wrapListener_fn).call(this, listener);
    typeListeners.set(listener, wrapped);
    this.addEventListener(type, wrapped);
    return this;
  }
  once(type, listener) {
    const typeListeners = __privateGet(this, _listeners).get(type) ?? /* @__PURE__ */ new Map();
    if (typeListeners.has(listener)) return this;
    if (!__privateGet(this, _listeners).has(type)) __privateGet(this, _listeners).set(type, typeListeners);
    const wrapped = __privateMethod(this, _CustomEventTarget_instances, wrapListener_fn).call(this, listener, true);
    typeListeners.set(listener, wrapped);
    this.addEventListener(type, wrapped, { once: true });
    return this;
  }
  emit(type, ...detail) {
    this.dispatchEvent(new CustomEvent(type, { detail }));
  }
  removeListener(type, listener) {
    const typeListeners = __privateGet(this, _listeners).get(type);
    const wrapped = typeListeners?.get(listener);
    if (!wrapped) return this;
    typeListeners?.delete(listener);
    if (typeListeners?.size === 0) __privateGet(this, _listeners).delete(type);
    this.removeEventListener(type, wrapped);
    return this;
  }
};
_listeners = new WeakMap();
_CustomEventTarget_instances = new WeakSet();
wrapListener_fn = function(listener, once = false) {
  const wrapped = (event) => {
    const detail = event.detail;
    if (Array.isArray(detail)) listener(...detail);
    if (once) this.removeListener(event.type, listener);
  };
  return wrapped;
};

// src/enums.ts
var BYTES_PER_MF1_KEY = 6;
var AnimationMode = /* @__PURE__ */ ((AnimationMode2) => {
  AnimationMode2[AnimationMode2["FULL"] = 0] = "FULL";
  AnimationMode2[AnimationMode2["SHORT"] = 1] = "SHORT";
  AnimationMode2[AnimationMode2["NONE"] = 2] = "NONE";
  AnimationMode2[AnimationMode2["SYMMETRIC"] = 3] = "SYMMETRIC";
  return AnimationMode2;
})(AnimationMode || {});
var ButtonAction = /* @__PURE__ */ ((ButtonAction2) => {
  ButtonAction2[ButtonAction2["DISABLE"] = 0] = "DISABLE";
  ButtonAction2[ButtonAction2["CYCLE_SLOT_INC"] = 1] = "CYCLE_SLOT_INC";
  ButtonAction2[ButtonAction2["CYCLE_SLOT_DEC"] = 2] = "CYCLE_SLOT_DEC";
  ButtonAction2[ButtonAction2["CLONE_IC_UID"] = 3] = "CLONE_IC_UID";
  ButtonAction2[ButtonAction2["BATTERY"] = 4] = "BATTERY";
  return ButtonAction2;
})(ButtonAction || {});
var ButtonType = /* @__PURE__ */ ((ButtonType2) => {
  ButtonType2[ButtonType2["BUTTON_A"] = 65] = "BUTTON_A";
  ButtonType2[ButtonType2["BUTTON_B"] = 66] = "BUTTON_B";
  return ButtonType2;
})(ButtonType || {});
var Cmd = /* @__PURE__ */ ((Cmd2) => {
  Cmd2[Cmd2["GET_APP_VERSION"] = 1e3] = "GET_APP_VERSION";
  Cmd2[Cmd2["CHANGE_DEVICE_MODE"] = 1001] = "CHANGE_DEVICE_MODE";
  Cmd2[Cmd2["GET_DEVICE_MODE"] = 1002] = "GET_DEVICE_MODE";
  Cmd2[Cmd2["SET_ACTIVE_SLOT"] = 1003] = "SET_ACTIVE_SLOT";
  Cmd2[Cmd2["SET_SLOT_TAG_TYPE"] = 1004] = "SET_SLOT_TAG_TYPE";
  Cmd2[Cmd2["SET_SLOT_DATA_DEFAULT"] = 1005] = "SET_SLOT_DATA_DEFAULT";
  Cmd2[Cmd2["SET_SLOT_ENABLE"] = 1006] = "SET_SLOT_ENABLE";
  Cmd2[Cmd2["SET_SLOT_TAG_NICK"] = 1007] = "SET_SLOT_TAG_NICK";
  Cmd2[Cmd2["GET_SLOT_TAG_NICK"] = 1008] = "GET_SLOT_TAG_NICK";
  Cmd2[Cmd2["SLOT_DATA_CONFIG_SAVE"] = 1009] = "SLOT_DATA_CONFIG_SAVE";
  Cmd2[Cmd2["ENTER_BOOTLOADER"] = 1010] = "ENTER_BOOTLOADER";
  Cmd2[Cmd2["GET_DEVICE_CHIP_ID"] = 1011] = "GET_DEVICE_CHIP_ID";
  Cmd2[Cmd2["GET_DEVICE_ADDRESS"] = 1012] = "GET_DEVICE_ADDRESS";
  Cmd2[Cmd2["SAVE_SETTINGS"] = 1013] = "SAVE_SETTINGS";
  Cmd2[Cmd2["RESET_SETTINGS"] = 1014] = "RESET_SETTINGS";
  Cmd2[Cmd2["SET_ANIMATION_MODE"] = 1015] = "SET_ANIMATION_MODE";
  Cmd2[Cmd2["GET_ANIMATION_MODE"] = 1016] = "GET_ANIMATION_MODE";
  Cmd2[Cmd2["GET_GIT_VERSION"] = 1017] = "GET_GIT_VERSION";
  Cmd2[Cmd2["GET_ACTIVE_SLOT"] = 1018] = "GET_ACTIVE_SLOT";
  Cmd2[Cmd2["GET_SLOT_INFO"] = 1019] = "GET_SLOT_INFO";
  Cmd2[Cmd2["WIPE_FDS"] = 1020] = "WIPE_FDS";
  Cmd2[Cmd2["DELETE_SLOT_TAG_NICK"] = 1021] = "DELETE_SLOT_TAG_NICK";
  Cmd2[Cmd2["GET_ENABLED_SLOTS"] = 1023] = "GET_ENABLED_SLOTS";
  Cmd2[Cmd2["DELETE_SLOT_SENSE_TYPE"] = 1024] = "DELETE_SLOT_SENSE_TYPE";
  Cmd2[Cmd2["GET_BATTERY_INFO"] = 1025] = "GET_BATTERY_INFO";
  Cmd2[Cmd2["GET_BUTTON_PRESS_CONFIG"] = 1026] = "GET_BUTTON_PRESS_CONFIG";
  Cmd2[Cmd2["SET_BUTTON_PRESS_CONFIG"] = 1027] = "SET_BUTTON_PRESS_CONFIG";
  Cmd2[Cmd2["GET_LONG_BUTTON_PRESS_CONFIG"] = 1028] = "GET_LONG_BUTTON_PRESS_CONFIG";
  Cmd2[Cmd2["SET_LONG_BUTTON_PRESS_CONFIG"] = 1029] = "SET_LONG_BUTTON_PRESS_CONFIG";
  Cmd2[Cmd2["SET_BLE_PAIRING_KEY"] = 1030] = "SET_BLE_PAIRING_KEY";
  Cmd2[Cmd2["GET_BLE_PAIRING_KEY"] = 1031] = "GET_BLE_PAIRING_KEY";
  Cmd2[Cmd2["DELETE_ALL_BLE_BONDS"] = 1032] = "DELETE_ALL_BLE_BONDS";
  Cmd2[Cmd2["GET_DEVICE_MODEL"] = 1033] = "GET_DEVICE_MODEL";
  Cmd2[Cmd2["GET_DEVICE_SETTINGS"] = 1034] = "GET_DEVICE_SETTINGS";
  Cmd2[Cmd2["GET_DEVICE_CAPABILITIES"] = 1035] = "GET_DEVICE_CAPABILITIES";
  Cmd2[Cmd2["GET_BLE_PAIRING_ENABLE"] = 1036] = "GET_BLE_PAIRING_ENABLE";
  Cmd2[Cmd2["SET_BLE_PAIRING_ENABLE"] = 1037] = "SET_BLE_PAIRING_ENABLE";
  Cmd2[Cmd2["GET_ALL_SLOT_NICKS"] = 1038] = "GET_ALL_SLOT_NICKS";
  Cmd2[Cmd2["HF14A_SCAN"] = 2e3] = "HF14A_SCAN";
  Cmd2[Cmd2["MF1_DETECT_SUPPORT"] = 2001] = "MF1_DETECT_SUPPORT";
  Cmd2[Cmd2["MF1_DETECT_PRNG"] = 2002] = "MF1_DETECT_PRNG";
  Cmd2[Cmd2["MF1_STATIC_NESTED_ACQUIRE"] = 2003] = "MF1_STATIC_NESTED_ACQUIRE";
  Cmd2[Cmd2["MF1_DARKSIDE_ACQUIRE"] = 2004] = "MF1_DARKSIDE_ACQUIRE";
  Cmd2[Cmd2["MF1_DETECT_NT_DIST"] = 2005] = "MF1_DETECT_NT_DIST";
  Cmd2[Cmd2["MF1_NESTED_ACQUIRE"] = 2006] = "MF1_NESTED_ACQUIRE";
  Cmd2[Cmd2["MF1_AUTH_ONE_KEY_BLOCK"] = 2007] = "MF1_AUTH_ONE_KEY_BLOCK";
  Cmd2[Cmd2["MF1_READ_ONE_BLOCK"] = 2008] = "MF1_READ_ONE_BLOCK";
  Cmd2[Cmd2["MF1_WRITE_ONE_BLOCK"] = 2009] = "MF1_WRITE_ONE_BLOCK";
  Cmd2[Cmd2["HF14A_RAW"] = 2010] = "HF14A_RAW";
  Cmd2[Cmd2["MF1_MANIPULATE_VALUE_BLOCK"] = 2011] = "MF1_MANIPULATE_VALUE_BLOCK";
  Cmd2[Cmd2["MF1_CHECK_KEYS_OF_SECTORS"] = 2012] = "MF1_CHECK_KEYS_OF_SECTORS";
  Cmd2[Cmd2["MF1_HARDNESTED_ACQUIRE"] = 2013] = "MF1_HARDNESTED_ACQUIRE";
  Cmd2[Cmd2["MF1_ENC_NESTED_ACQUIRE"] = 2014] = "MF1_ENC_NESTED_ACQUIRE";
  Cmd2[Cmd2["MF1_CHECK_KEYS_ON_BLOCK"] = 2015] = "MF1_CHECK_KEYS_ON_BLOCK";
  Cmd2[Cmd2["HF14A_GET_CONFIG"] = 2200] = "HF14A_GET_CONFIG";
  Cmd2[Cmd2["HF14A_SET_CONFIG"] = 2201] = "HF14A_SET_CONFIG";
  Cmd2[Cmd2["EM410X_SCAN"] = 3e3] = "EM410X_SCAN";
  Cmd2[Cmd2["EM410X_WRITE_TO_T55XX"] = 3001] = "EM410X_WRITE_TO_T55XX";
  Cmd2[Cmd2["EM410X_ELECTRA_WRITE_TO_T55XX"] = 3006] = "EM410X_ELECTRA_WRITE_TO_T55XX";
  Cmd2[Cmd2["HIDPROX_SCAN"] = 3002] = "HIDPROX_SCAN";
  Cmd2[Cmd2["HIDPROX_WRITE_TO_T55XX"] = 3003] = "HIDPROX_WRITE_TO_T55XX";
  Cmd2[Cmd2["VIKING_SCAN"] = 3004] = "VIKING_SCAN";
  Cmd2[Cmd2["VIKING_WRITE_TO_T55XX"] = 3005] = "VIKING_WRITE_TO_T55XX";
  Cmd2[Cmd2["ADC_GENERIC_READ"] = 3009] = "ADC_GENERIC_READ";
  Cmd2[Cmd2["MF1_WRITE_EMU_BLOCK_DATA"] = 4e3] = "MF1_WRITE_EMU_BLOCK_DATA";
  Cmd2[Cmd2["HF14A_SET_ANTI_COLL_DATA"] = 4001] = "HF14A_SET_ANTI_COLL_DATA";
  Cmd2[Cmd2["MF1_SET_DETECTION_ENABLE"] = 4004] = "MF1_SET_DETECTION_ENABLE";
  Cmd2[Cmd2["MF1_GET_DETECTION_COUNT"] = 4005] = "MF1_GET_DETECTION_COUNT";
  Cmd2[Cmd2["MF1_GET_DETECTION_LOG"] = 4006] = "MF1_GET_DETECTION_LOG";
  Cmd2[Cmd2["MF1_GET_DETECTION_ENABLE"] = 4007] = "MF1_GET_DETECTION_ENABLE";
  Cmd2[Cmd2["MF1_READ_EMU_BLOCK_DATA"] = 4008] = "MF1_READ_EMU_BLOCK_DATA";
  Cmd2[Cmd2["GET_AUTO_POLL_CONFIG"] = 1041] = "GET_AUTO_POLL_CONFIG";
  Cmd2[Cmd2["SET_AUTO_POLL_CONFIG"] = 1042] = "SET_AUTO_POLL_CONFIG";
  Cmd2[Cmd2["MF1_GET_EMULATOR_CONFIG"] = 4009] = "MF1_GET_EMULATOR_CONFIG";
  Cmd2[Cmd2["MF1_GET_GEN1A_MODE"] = 4010] = "MF1_GET_GEN1A_MODE";
  Cmd2[Cmd2["MF1_SET_GEN1A_MODE"] = 4011] = "MF1_SET_GEN1A_MODE";
  Cmd2[Cmd2["MF1_GET_GEN2_MODE"] = 4012] = "MF1_GET_GEN2_MODE";
  Cmd2[Cmd2["MF1_SET_GEN2_MODE"] = 4013] = "MF1_SET_GEN2_MODE";
  Cmd2[Cmd2["MF1_GET_BLOCK_ANTI_COLL_MODE"] = 4014] = "MF1_GET_BLOCK_ANTI_COLL_MODE";
  Cmd2[Cmd2["MF1_SET_BLOCK_ANTI_COLL_MODE"] = 4015] = "MF1_SET_BLOCK_ANTI_COLL_MODE";
  Cmd2[Cmd2["MF1_GET_WRITE_MODE"] = 4016] = "MF1_GET_WRITE_MODE";
  Cmd2[Cmd2["MF1_SET_WRITE_MODE"] = 4017] = "MF1_SET_WRITE_MODE";
  Cmd2[Cmd2["HF14A_GET_ANTI_COLL_DATA"] = 4018] = "HF14A_GET_ANTI_COLL_DATA";
  Cmd2[Cmd2["MF0_NTAG_GET_UID_MAGIC_MODE"] = 4019] = "MF0_NTAG_GET_UID_MAGIC_MODE";
  Cmd2[Cmd2["MF0_NTAG_SET_UID_MAGIC_MODE"] = 4020] = "MF0_NTAG_SET_UID_MAGIC_MODE";
  Cmd2[Cmd2["MF0_NTAG_READ_EMU_PAGE_DATA"] = 4021] = "MF0_NTAG_READ_EMU_PAGE_DATA";
  Cmd2[Cmd2["MF0_NTAG_WRITE_EMU_PAGE_DATA"] = 4022] = "MF0_NTAG_WRITE_EMU_PAGE_DATA";
  Cmd2[Cmd2["MF0_NTAG_GET_VERSION_DATA"] = 4023] = "MF0_NTAG_GET_VERSION_DATA";
  Cmd2[Cmd2["MF0_NTAG_SET_VERSION_DATA"] = 4024] = "MF0_NTAG_SET_VERSION_DATA";
  Cmd2[Cmd2["MF0_NTAG_GET_SIGNATURE_DATA"] = 4025] = "MF0_NTAG_GET_SIGNATURE_DATA";
  Cmd2[Cmd2["MF0_NTAG_SET_SIGNATURE_DATA"] = 4026] = "MF0_NTAG_SET_SIGNATURE_DATA";
  Cmd2[Cmd2["MF0_NTAG_GET_COUNTER_DATA"] = 4027] = "MF0_NTAG_GET_COUNTER_DATA";
  Cmd2[Cmd2["MF0_NTAG_SET_COUNTER_DATA"] = 4028] = "MF0_NTAG_SET_COUNTER_DATA";
  Cmd2[Cmd2["MF0_NTAG_RESET_AUTH_CNT"] = 4029] = "MF0_NTAG_RESET_AUTH_CNT";
  Cmd2[Cmd2["MF0_NTAG_GET_PAGE_COUNT"] = 4030] = "MF0_NTAG_GET_PAGE_COUNT";
  Cmd2[Cmd2["MF0_NTAG_GET_WRITE_MODE"] = 4031] = "MF0_NTAG_GET_WRITE_MODE";
  Cmd2[Cmd2["MF0_NTAG_SET_WRITE_MODE"] = 4032] = "MF0_NTAG_SET_WRITE_MODE";
  Cmd2[Cmd2["MF0_NTAG_SET_DETECTION_ENABLE"] = 4033] = "MF0_NTAG_SET_DETECTION_ENABLE";
  Cmd2[Cmd2["MF0_NTAG_GET_DETECTION_COUNT"] = 4034] = "MF0_NTAG_GET_DETECTION_COUNT";
  Cmd2[Cmd2["MF0_NTAG_GET_DETECTION_LOG"] = 4035] = "MF0_NTAG_GET_DETECTION_LOG";
  Cmd2[Cmd2["MF0_NTAG_GET_DETECTION_ENABLE"] = 4036] = "MF0_NTAG_GET_DETECTION_ENABLE";
  Cmd2[Cmd2["MF0_NTAG_GET_EMULATOR_CONFIG"] = 4037] = "MF0_NTAG_GET_EMULATOR_CONFIG";
  Cmd2[Cmd2["MF1_SET_FIELD_OFF_DO_RESET"] = 4038] = "MF1_SET_FIELD_OFF_DO_RESET";
  Cmd2[Cmd2["MF1_GET_FIELD_OFF_DO_RESET"] = 4039] = "MF1_GET_FIELD_OFF_DO_RESET";
  Cmd2[Cmd2["EM410X_SET_EMU_ID"] = 5e3] = "EM410X_SET_EMU_ID";
  Cmd2[Cmd2["EM410X_GET_EMU_ID"] = 5001] = "EM410X_GET_EMU_ID";
  Cmd2[Cmd2["HIDPROX_SET_EMU_ID"] = 5002] = "HIDPROX_SET_EMU_ID";
  Cmd2[Cmd2["HIDPROX_GET_EMU_ID"] = 5003] = "HIDPROX_GET_EMU_ID";
  Cmd2[Cmd2["VIKING_SET_EMU_ID"] = 5004] = "VIKING_SET_EMU_ID";
  Cmd2[Cmd2["VIKING_GET_EMU_ID"] = 5005] = "VIKING_GET_EMU_ID";
  return Cmd2;
})(Cmd || {});
var DarksideStatus = /* @__PURE__ */ ((DarksideStatus2) => {
  DarksideStatus2[DarksideStatus2["OK"] = 0] = "OK";
  DarksideStatus2[DarksideStatus2["CANT_FIX_NT"] = 1] = "CANT_FIX_NT";
  DarksideStatus2[DarksideStatus2["LUCKY_AUTH_OK"] = 2] = "LUCKY_AUTH_OK";
  DarksideStatus2[DarksideStatus2["NO_NAK_SENT"] = 3] = "NO_NAK_SENT";
  DarksideStatus2[DarksideStatus2["TAG_CHANGED"] = 4] = "TAG_CHANGED";
  return DarksideStatus2;
})(DarksideStatus || {});
var DeviceMode = /* @__PURE__ */ ((DeviceMode2) => {
  DeviceMode2[DeviceMode2["TAG"] = 0] = "TAG";
  DeviceMode2[DeviceMode2["READER"] = 1] = "READER";
  return DeviceMode2;
})(DeviceMode || {});
var DeviceModel = /* @__PURE__ */ ((DeviceModel2) => {
  DeviceModel2[DeviceModel2["ULTRA"] = 0] = "ULTRA";
  DeviceModel2[DeviceModel2["LITE"] = 1] = "LITE";
  return DeviceModel2;
})(DeviceModel || {});
var DfuFwId = /* @__PURE__ */ ((DfuFwId2) => {
  DfuFwId2[DfuFwId2["BOOTLOADER"] = 0] = "BOOTLOADER";
  DfuFwId2[DfuFwId2["APPLICATION"] = 1] = "APPLICATION";
  DfuFwId2[DfuFwId2["SOFTDEVICE"] = 2] = "SOFTDEVICE";
  return DfuFwId2;
})(DfuFwId || {});
var DfuFwType = /* @__PURE__ */ ((DfuFwType2) => {
  DfuFwType2[DfuFwType2["SOFTDEVICE"] = 0] = "SOFTDEVICE";
  DfuFwType2[DfuFwType2["APPLICATION"] = 1] = "APPLICATION";
  DfuFwType2[DfuFwType2["BOOTLOADER"] = 2] = "BOOTLOADER";
  DfuFwType2[DfuFwType2["UNKNOWN"] = 255] = "UNKNOWN";
  return DfuFwType2;
})(DfuFwType || {});
var DfuObjType = /* @__PURE__ */ ((DfuObjType2) => {
  DfuObjType2[DfuObjType2["INVALID"] = 0] = "INVALID";
  DfuObjType2[DfuObjType2["COMMAND"] = 1] = "COMMAND";
  DfuObjType2[DfuObjType2["DATA"] = 2] = "DATA";
  return DfuObjType2;
})(DfuObjType || {});
var DfuOp = /* @__PURE__ */ ((DfuOp2) => {
  DfuOp2[DfuOp2["PROTOCOL_VERSION"] = 0] = "PROTOCOL_VERSION";
  DfuOp2[DfuOp2["OBJECT_CREATE"] = 1] = "OBJECT_CREATE";
  DfuOp2[DfuOp2["RECEIPT_NOTIF_SET"] = 2] = "RECEIPT_NOTIF_SET";
  DfuOp2[DfuOp2["CRC_GET"] = 3] = "CRC_GET";
  DfuOp2[DfuOp2["OBJECT_EXECUTE"] = 4] = "OBJECT_EXECUTE";
  DfuOp2[DfuOp2["OBJECT_SELECT"] = 6] = "OBJECT_SELECT";
  DfuOp2[DfuOp2["MTU_GET"] = 7] = "MTU_GET";
  DfuOp2[DfuOp2["OBJECT_WRITE"] = 8] = "OBJECT_WRITE";
  DfuOp2[DfuOp2["PING"] = 9] = "PING";
  DfuOp2[DfuOp2["HARDWARE_VERSION"] = 10] = "HARDWARE_VERSION";
  DfuOp2[DfuOp2["FIRMWARE_VERSION"] = 11] = "FIRMWARE_VERSION";
  DfuOp2[DfuOp2["ABORT"] = 12] = "ABORT";
  DfuOp2[DfuOp2["RESPONSE"] = 96] = "RESPONSE";
  DfuOp2[DfuOp2["INVALID"] = 255] = "INVALID";
  return DfuOp2;
})(DfuOp || {});
var DfuResCode = /* @__PURE__ */ ((DfuResCode2) => {
  DfuResCode2[DfuResCode2["INVALID"] = 0] = "INVALID";
  DfuResCode2[DfuResCode2["SUCCESS"] = 1] = "SUCCESS";
  DfuResCode2[DfuResCode2["OP_CODE_NOT_SUPPORTED"] = 2] = "OP_CODE_NOT_SUPPORTED";
  DfuResCode2[DfuResCode2["INVALID_PARAMETER"] = 3] = "INVALID_PARAMETER";
  DfuResCode2[DfuResCode2["INSUFFICIENT_RESOURCES"] = 4] = "INSUFFICIENT_RESOURCES";
  DfuResCode2[DfuResCode2["INVALID_OBJECT"] = 5] = "INVALID_OBJECT";
  DfuResCode2[DfuResCode2["UNSUPPORTED_TYPE"] = 7] = "UNSUPPORTED_TYPE";
  DfuResCode2[DfuResCode2["OPERATION_NOT_PERMITTED"] = 8] = "OPERATION_NOT_PERMITTED";
  DfuResCode2[DfuResCode2["OPERATION_FAILED"] = 10] = "OPERATION_FAILED";
  DfuResCode2[DfuResCode2["EXT_ERROR"] = 11] = "EXT_ERROR";
  DfuResCode2[DfuResCode2["NO_ERROR"] = 2816] = "NO_ERROR";
  DfuResCode2[DfuResCode2["INVALID_ERROR_CODE"] = 2817] = "INVALID_ERROR_CODE";
  DfuResCode2[DfuResCode2["WRONG_COMMAND_FORMAT"] = 2818] = "WRONG_COMMAND_FORMAT";
  DfuResCode2[DfuResCode2["UNKNOWN_COMMAND"] = 2819] = "UNKNOWN_COMMAND";
  DfuResCode2[DfuResCode2["INIT_COMMAND_INVALID"] = 2820] = "INIT_COMMAND_INVALID";
  DfuResCode2[DfuResCode2["FW_VERSION_FAILURE"] = 2821] = "FW_VERSION_FAILURE";
  DfuResCode2[DfuResCode2["HW_VERSION_FAILURE"] = 2822] = "HW_VERSION_FAILURE";
  DfuResCode2[DfuResCode2["SD_VERSION_FAILURE"] = 2823] = "SD_VERSION_FAILURE";
  DfuResCode2[DfuResCode2["SIGNATURE_MISSING"] = 2824] = "SIGNATURE_MISSING";
  DfuResCode2[DfuResCode2["WRONG_HASH_TYPE"] = 2825] = "WRONG_HASH_TYPE";
  DfuResCode2[DfuResCode2["HASH_FAILED"] = 2826] = "HASH_FAILED";
  DfuResCode2[DfuResCode2["WRONG_SIGNATURE_TYPE"] = 2827] = "WRONG_SIGNATURE_TYPE";
  DfuResCode2[DfuResCode2["VERIFICATION_FAILED"] = 2828] = "VERIFICATION_FAILED";
  DfuResCode2[DfuResCode2["INSUFFICIENT_SPACE"] = 2829] = "INSUFFICIENT_SPACE";
  return DfuResCode2;
})(DfuResCode || {});
var FreqType = /* @__PURE__ */ ((FreqType2) => {
  FreqType2[FreqType2["NONE"] = 0] = "NONE";
  FreqType2[FreqType2["LF"] = 1] = "LF";
  FreqType2[FreqType2["HF"] = 2] = "HF";
  return FreqType2;
})(FreqType || {});
var Hf14aBccMode = /* @__PURE__ */ ((Hf14aBccMode2) => {
  Hf14aBccMode2[Hf14aBccMode2["STANDARD"] = 0] = "STANDARD";
  Hf14aBccMode2[Hf14aBccMode2["UID_CALC"] = 1] = "UID_CALC";
  Hf14aBccMode2[Hf14aBccMode2["BLOCK0"] = 2] = "BLOCK0";
  return Hf14aBccMode2;
})(Hf14aBccMode || {});
var Hf14aCascadeLevelMode = /* @__PURE__ */ ((Hf14aCascadeLevelMode2) => {
  Hf14aCascadeLevelMode2[Hf14aCascadeLevelMode2["STANDARD"] = 0] = "STANDARD";
  Hf14aCascadeLevelMode2[Hf14aCascadeLevelMode2["FORCE"] = 1] = "FORCE";
  Hf14aCascadeLevelMode2[Hf14aCascadeLevelMode2["SKIP"] = 2] = "SKIP";
  return Hf14aCascadeLevelMode2;
})(Hf14aCascadeLevelMode || {});
var Hf14aRatsMode = /* @__PURE__ */ ((Hf14aRatsMode2) => {
  Hf14aRatsMode2[Hf14aRatsMode2["STANDARD"] = 0] = "STANDARD";
  Hf14aRatsMode2[Hf14aRatsMode2["FORCE"] = 1] = "FORCE";
  Hf14aRatsMode2[Hf14aRatsMode2["SKIP"] = 2] = "SKIP";
  return Hf14aRatsMode2;
})(Hf14aRatsMode || {});
var HidProxFormat = /* @__PURE__ */ ((HidProxFormat2) => {
  HidProxFormat2[HidProxFormat2["H10301"] = 1] = "H10301";
  HidProxFormat2[HidProxFormat2["IND26"] = 2] = "IND26";
  HidProxFormat2[HidProxFormat2["IND27"] = 3] = "IND27";
  HidProxFormat2[HidProxFormat2["INDASC27"] = 4] = "INDASC27";
  HidProxFormat2[HidProxFormat2["TECOM27"] = 5] = "TECOM27";
  HidProxFormat2[HidProxFormat2["W2804"] = 6] = "W2804";
  HidProxFormat2[HidProxFormat2["IND29"] = 7] = "IND29";
  HidProxFormat2[HidProxFormat2["ATSW30"] = 8] = "ATSW30";
  HidProxFormat2[HidProxFormat2["ADT31"] = 9] = "ADT31";
  HidProxFormat2[HidProxFormat2["HCP32"] = 10] = "HCP32";
  HidProxFormat2[HidProxFormat2["HPP32"] = 11] = "HPP32";
  HidProxFormat2[HidProxFormat2["KASTLE"] = 12] = "KASTLE";
  HidProxFormat2[HidProxFormat2["KANTECH"] = 13] = "KANTECH";
  HidProxFormat2[HidProxFormat2["WIE32"] = 14] = "WIE32";
  HidProxFormat2[HidProxFormat2["D10202"] = 15] = "D10202";
  HidProxFormat2[HidProxFormat2["H10306"] = 16] = "H10306";
  HidProxFormat2[HidProxFormat2["N10002"] = 17] = "N10002";
  HidProxFormat2[HidProxFormat2["OPTUS34"] = 18] = "OPTUS34";
  HidProxFormat2[HidProxFormat2["SMP34"] = 19] = "SMP34";
  HidProxFormat2[HidProxFormat2["BQT34"] = 20] = "BQT34";
  HidProxFormat2[HidProxFormat2["C1K35S"] = 21] = "C1K35S";
  HidProxFormat2[HidProxFormat2["C15001"] = 22] = "C15001";
  HidProxFormat2[HidProxFormat2["S12906"] = 23] = "S12906";
  HidProxFormat2[HidProxFormat2["SIE36"] = 24] = "SIE36";
  HidProxFormat2[HidProxFormat2["H10320"] = 25] = "H10320";
  HidProxFormat2[HidProxFormat2["H10302"] = 26] = "H10302";
  HidProxFormat2[HidProxFormat2["H10304"] = 27] = "H10304";
  HidProxFormat2[HidProxFormat2["P10004"] = 28] = "P10004";
  HidProxFormat2[HidProxFormat2["HGEN37"] = 29] = "HGEN37";
  HidProxFormat2[HidProxFormat2["MDI37"] = 30] = "MDI37";
  HidProxFormat2[HidProxFormat2["ACTPHID"] = 42] = "ACTPHID";
  return HidProxFormat2;
})(HidProxFormat || {});
var Mf1EmuWriteMode = /* @__PURE__ */ ((Mf1EmuWriteMode2) => {
  Mf1EmuWriteMode2[Mf1EmuWriteMode2["NORMAL"] = 0] = "NORMAL";
  Mf1EmuWriteMode2[Mf1EmuWriteMode2["DENIED"] = 1] = "DENIED";
  Mf1EmuWriteMode2[Mf1EmuWriteMode2["DECEIVE"] = 2] = "DECEIVE";
  Mf1EmuWriteMode2[Mf1EmuWriteMode2["SHADOW"] = 3] = "SHADOW";
  Mf1EmuWriteMode2[Mf1EmuWriteMode2["SHADOW_REQ"] = 4] = "SHADOW_REQ";
  return Mf1EmuWriteMode2;
})(Mf1EmuWriteMode || {});
var Mf1KeyType = /* @__PURE__ */ ((Mf1KeyType2) => {
  Mf1KeyType2[Mf1KeyType2["KEY_A"] = 96] = "KEY_A";
  Mf1KeyType2[Mf1KeyType2["KEY_B"] = 97] = "KEY_B";
  return Mf1KeyType2;
})(Mf1KeyType || {});
var Mf1PrngType = /* @__PURE__ */ ((Mf1PrngType2) => {
  Mf1PrngType2[Mf1PrngType2["STATIC"] = 0] = "STATIC";
  Mf1PrngType2[Mf1PrngType2["WEAK"] = 1] = "WEAK";
  Mf1PrngType2[Mf1PrngType2["HARD"] = 2] = "HARD";
  return Mf1PrngType2;
})(Mf1PrngType || {});
var Mf1VblockOperator = /* @__PURE__ */ ((Mf1VblockOperator2) => {
  Mf1VblockOperator2[Mf1VblockOperator2["DECREMENT"] = 192] = "DECREMENT";
  Mf1VblockOperator2[Mf1VblockOperator2["INCREMENT"] = 193] = "INCREMENT";
  Mf1VblockOperator2[Mf1VblockOperator2["RESTORE"] = 194] = "RESTORE";
  return Mf1VblockOperator2;
})(Mf1VblockOperator || {});
var MfuEmuWriteMode = /* @__PURE__ */ ((MfuEmuWriteMode2) => {
  MfuEmuWriteMode2[MfuEmuWriteMode2["NORMAL"] = 0] = "NORMAL";
  MfuEmuWriteMode2[MfuEmuWriteMode2["DENIED"] = 1] = "DENIED";
  MfuEmuWriteMode2[MfuEmuWriteMode2["DECEIVE"] = 2] = "DECEIVE";
  MfuEmuWriteMode2[MfuEmuWriteMode2["SHADOW"] = 3] = "SHADOW";
  MfuEmuWriteMode2[MfuEmuWriteMode2["SHADOW_REQ"] = 4] = "SHADOW_REQ";
  return MfuEmuWriteMode2;
})(MfuEmuWriteMode || {});
var NxpMfuType = /* @__PURE__ */ ((NxpMfuType2) => {
  NxpMfuType2[NxpMfuType2["UNKNOWN"] = 0] = "UNKNOWN";
  NxpMfuType2[NxpMfuType2["UL"] = 1] = "UL";
  NxpMfuType2[NxpMfuType2["UL_C"] = 2] = "UL_C";
  NxpMfuType2[NxpMfuType2["UL_EV1_48"] = 3] = "UL_EV1_48";
  NxpMfuType2[NxpMfuType2["UL_EV1_128"] = 4] = "UL_EV1_128";
  NxpMfuType2[NxpMfuType2["NTAG"] = 5] = "NTAG";
  NxpMfuType2[NxpMfuType2["NTAG_203"] = 6] = "NTAG_203";
  NxpMfuType2[NxpMfuType2["NTAG_210"] = 7] = "NTAG_210";
  NxpMfuType2[NxpMfuType2["NTAG_212"] = 8] = "NTAG_212";
  NxpMfuType2[NxpMfuType2["NTAG_213"] = 9] = "NTAG_213";
  NxpMfuType2[NxpMfuType2["NTAG_215"] = 10] = "NTAG_215";
  NxpMfuType2[NxpMfuType2["NTAG_216"] = 11] = "NTAG_216";
  NxpMfuType2[NxpMfuType2["MY_D"] = 12] = "MY_D";
  NxpMfuType2[NxpMfuType2["MY_D_NFC"] = 13] = "MY_D_NFC";
  NxpMfuType2[NxpMfuType2["MY_D_MOVE"] = 14] = "MY_D_MOVE";
  NxpMfuType2[NxpMfuType2["MY_D_MOVE_LEAN"] = 15] = "MY_D_MOVE_LEAN";
  NxpMfuType2[NxpMfuType2["NTAG_I2C_1K"] = 16] = "NTAG_I2C_1K";
  NxpMfuType2[NxpMfuType2["NTAG_I2C_2K"] = 17] = "NTAG_I2C_2K";
  NxpMfuType2[NxpMfuType2["NTAG_I2C_1K_PLUS"] = 18] = "NTAG_I2C_1K_PLUS";
  NxpMfuType2[NxpMfuType2["NTAG_I2C_2K_PLUS"] = 19] = "NTAG_I2C_2K_PLUS";
  NxpMfuType2[NxpMfuType2["FUDAN_UL"] = 20] = "FUDAN_UL";
  NxpMfuType2[NxpMfuType2["NTAG_213_F"] = 21] = "NTAG_213_F";
  NxpMfuType2[NxpMfuType2["NTAG_216_F"] = 22] = "NTAG_216_F";
  NxpMfuType2[NxpMfuType2["UL_EV1"] = 23] = "UL_EV1";
  NxpMfuType2[NxpMfuType2["UL_NANO_40"] = 24] = "UL_NANO_40";
  NxpMfuType2[NxpMfuType2["NTAG_213_TT"] = 25] = "NTAG_213_TT";
  NxpMfuType2[NxpMfuType2["NTAG_213_C"] = 26] = "NTAG_213_C";
  NxpMfuType2[NxpMfuType2["NTAG_210u"] = 27] = "NTAG_210u";
  NxpMfuType2[NxpMfuType2["UL_AES"] = 28] = "UL_AES";
  return NxpMfuType2;
})(NxpMfuType || {});
var TagType = /* @__PURE__ */ ((TagType2) => {
  TagType2[TagType2["UNDEFINED"] = 0] = "UNDEFINED";
  TagType2[TagType2["EM410X"] = 100] = "EM410X";
  TagType2[TagType2["EM410X_16"] = 101] = "EM410X_16";
  TagType2[TagType2["EM410X_32"] = 102] = "EM410X_32";
  TagType2[TagType2["EM410X_64"] = 103] = "EM410X_64";
  TagType2[TagType2["EM410X_ELECTRA"] = 104] = "EM410X_ELECTRA";
  TagType2[TagType2["Viking"] = 170] = "Viking";
  TagType2[TagType2["HIDProx"] = 200] = "HIDProx";
  TagType2[TagType2["LF_END"] = 999] = "LF_END";
  TagType2[TagType2["MIFARE_Mini"] = 1e3] = "MIFARE_Mini";
  TagType2[TagType2["MIFARE_1024"] = 1001] = "MIFARE_1024";
  TagType2[TagType2["MIFARE_2048"] = 1002] = "MIFARE_2048";
  TagType2[TagType2["MIFARE_4096"] = 1003] = "MIFARE_4096";
  TagType2[TagType2["NTAG_213"] = 1100] = "NTAG_213";
  TagType2[TagType2["NTAG_215"] = 1101] = "NTAG_215";
  TagType2[TagType2["NTAG_216"] = 1102] = "NTAG_216";
  TagType2[TagType2["MF0_ICU1"] = 1103] = "MF0_ICU1";
  TagType2[TagType2["MF0_ICU2"] = 1104] = "MF0_ICU2";
  TagType2[TagType2["MF0_UL11"] = 1105] = "MF0_UL11";
  TagType2[TagType2["MF0_UL21"] = 1106] = "MF0_UL21";
  TagType2[TagType2["NTAG_210"] = 1107] = "NTAG_210";
  TagType2[TagType2["NTAG_212"] = 1108] = "NTAG_212";
  return TagType2;
})(TagType || {});
var Slot = /* @__PURE__ */ ((Slot2) => {
  Slot2[Slot2["SLOT_1"] = 0] = "SLOT_1";
  Slot2[Slot2["SLOT_2"] = 1] = "SLOT_2";
  Slot2[Slot2["SLOT_3"] = 2] = "SLOT_3";
  Slot2[Slot2["SLOT_4"] = 3] = "SLOT_4";
  Slot2[Slot2["SLOT_5"] = 4] = "SLOT_5";
  Slot2[Slot2["SLOT_6"] = 5] = "SLOT_6";
  Slot2[Slot2["SLOT_7"] = 6] = "SLOT_7";
  Slot2[Slot2["SLOT_8"] = 7] = "SLOT_8";
  return Slot2;
})(Slot || {});
var UltraResCode = /* @__PURE__ */ ((UltraResCode2) => {
  UltraResCode2[UltraResCode2["HF_TAG_OK"] = 0] = "HF_TAG_OK";
  UltraResCode2[UltraResCode2["HF_TAG_NOT_FOUND"] = 1] = "HF_TAG_NOT_FOUND";
  UltraResCode2[UltraResCode2["HF_ERR_STAT"] = 2] = "HF_ERR_STAT";
  UltraResCode2[UltraResCode2["HF_ERR_CRC"] = 3] = "HF_ERR_CRC";
  UltraResCode2[UltraResCode2["HF_COLLISION"] = 4] = "HF_COLLISION";
  UltraResCode2[UltraResCode2["HF_ERR_BCC"] = 5] = "HF_ERR_BCC";
  UltraResCode2[UltraResCode2["MF_ERR_AUTH"] = 6] = "MF_ERR_AUTH";
  UltraResCode2[UltraResCode2["HF_ERR_PARITY"] = 7] = "HF_ERR_PARITY";
  UltraResCode2[UltraResCode2["HF_ERR_ATS"] = 8] = "HF_ERR_ATS";
  UltraResCode2[UltraResCode2["LF_TAG_OK"] = 64] = "LF_TAG_OK";
  UltraResCode2[UltraResCode2["EM410X_TAG_NOT_FOUND"] = 65] = "EM410X_TAG_NOT_FOUND";
  UltraResCode2[UltraResCode2["LF_TAG_NO_FOUND"] = 66] = "LF_TAG_NO_FOUND";
  UltraResCode2[UltraResCode2["HIDPROX_TAG_NO_FOUND"] = 67] = "HIDPROX_TAG_NO_FOUND";
  UltraResCode2[UltraResCode2["PAR_ERR"] = 96] = "PAR_ERR";
  UltraResCode2[UltraResCode2["DEVICE_MODE_ERROR"] = 102] = "DEVICE_MODE_ERROR";
  UltraResCode2[UltraResCode2["INVALID_CMD"] = 103] = "INVALID_CMD";
  UltraResCode2[UltraResCode2["DEVICE_SUCCESS"] = 104] = "DEVICE_SUCCESS";
  UltraResCode2[UltraResCode2["NOT_IMPLEMENTED"] = 105] = "NOT_IMPLEMENTED";
  UltraResCode2[UltraResCode2["FLASH_WRITE_FAIL"] = 112] = "FLASH_WRITE_FAIL";
  UltraResCode2[UltraResCode2["FLASH_READ_FAIL"] = 113] = "FLASH_READ_FAIL";
  UltraResCode2[UltraResCode2["INVALID_SLOT_TYPE"] = 114] = "INVALID_SLOT_TYPE";
  return UltraResCode2;
})(UltraResCode || {});
function createIsEnum(e3) {
  const ev = new Set(values_default(pickBy_default(e3, (v2, k) => !isNumber_default(e3[v2]))));
  return (val) => ev.has(val);
}
function createIsValueOfArr(arr) {
  const set2 = new Set(arr);
  return (val) => set2.has(val);
}
var isAnimationMode = createIsEnum(AnimationMode);
var isButtonAction = createIsEnum(ButtonAction);
var isButtonType = createIsEnum(ButtonType);
var isCmd = createIsEnum(Cmd);
var isDarksideStatus = createIsEnum(DarksideStatus);
var isDeviceMode = createIsEnum(DeviceMode);
var isDeviceModel = createIsEnum(DeviceModel);
var isDfuFwId = createIsEnum(DfuFwId);
var isFreqType = createIsEnum(FreqType);
var isHf14aBccMode = createIsEnum(Hf14aBccMode);
var isHf14aCascadeLevelMode = createIsEnum(Hf14aCascadeLevelMode);
var isHf14aRatsMode = createIsEnum(Hf14aRatsMode);
var isMf1EmuWriteMode = createIsEnum(Mf1EmuWriteMode);
var isMf1KeyType = createIsEnum(Mf1KeyType);
var isMf1PrngType = createIsEnum(Mf1PrngType);
var isMf1VblockOperator = createIsEnum(Mf1VblockOperator);
var isMfuEmuWriteMode = createIsEnum(MfuEmuWriteMode);
var isSlot = createIsEnum(Slot);
var isTagType = createIsEnum(TagType);
var isUltraResCode = createIsEnum(UltraResCode);
var isFailedUltraResCode = createIsValueOfArr([
  1 /* HF_TAG_NOT_FOUND */,
  2 /* HF_ERR_STAT */,
  3 /* HF_ERR_CRC */,
  4 /* HF_COLLISION */,
  5 /* HF_ERR_BCC */,
  6 /* MF_ERR_AUTH */,
  7 /* HF_ERR_PARITY */,
  8 /* HF_ERR_ATS */,
  65 /* EM410X_TAG_NOT_FOUND */,
  66 /* LF_TAG_NO_FOUND */,
  67 /* HIDPROX_TAG_NO_FOUND */,
  96 /* PAR_ERR */,
  102 /* DEVICE_MODE_ERROR */,
  103 /* INVALID_CMD */,
  105 /* NOT_IMPLEMENTED */,
  112 /* FLASH_WRITE_FAIL */,
  113 /* FLASH_READ_FAIL */,
  114 /* INVALID_SLOT_TYPE */
]);
var isMfuEmuTagType = createIsValueOfArr([
  1103 /* MF0_ICU1 */,
  1104 /* MF0_ICU2 */,
  1105 /* MF0_UL11 */,
  1106 /* MF0_UL21 */,
  1107 /* NTAG_210 */,
  1108 /* NTAG_212 */,
  1100 /* NTAG_213 */,
  1101 /* NTAG_215 */,
  1102 /* NTAG_216 */
]);
var isValidDfuObjType = createIsValueOfArr([
  1 /* COMMAND */,
  2 /* DATA */
]);
var isValidFreqType = createIsValueOfArr([
  2 /* HF */,
  1 /* LF */
]);
var TagTypeLfIdLen = /* @__PURE__ */ new Map([
  [100 /* EM410X */, 5],
  [101 /* EM410X_16 */, 5],
  [102 /* EM410X_32 */, 5],
  [103 /* EM410X_64 */, 5],
  [104 /* EM410X_ELECTRA */, 13]
]);
var HidProxFormatLimit = /* @__PURE__ */ new Map([
  [1 /* H10301 */, [255, 65535, 0, 0]],
  [2 /* IND26 */, [4095, 4095, 0, 0]],
  [3 /* IND27 */, [8191, 16383, 0, 0]],
  [4 /* INDASC27 */, [8191, 16383, 0, 0]],
  [5 /* TECOM27 */, [2047, 65535, 0, 0]],
  [6 /* W2804 */, [255, 32767, 0, 0]],
  [7 /* IND29 */, [8191, 65535, 0, 0]],
  [8 /* ATSW30 */, [4095, 65535, 0, 0]],
  [9 /* ADT31 */, [15, 8388607, 0, 0]],
  [10 /* HCP32 */, [0, 16383, 0, 0]],
  [11 /* HPP32 */, [4095, 524287, 0, 0]],
  [12 /* KASTLE */, [255, 65535, 31, 0]],
  [13 /* KANTECH */, [255, 65535, 0, 0]],
  [14 /* WIE32 */, [4095, 65535, 0, 0]],
  [15 /* D10202 */, [127, 16777215, 0, 0]],
  [16 /* H10306 */, [65535, 65535, 0, 0]],
  [17 /* N10002 */, [65535, 65535, 0, 0]],
  [18 /* OPTUS34 */, [1023, 65535, 0, 0]],
  [19 /* SMP34 */, [1023, 65535, 7, 0]],
  [20 /* BQT34 */, [255, 16777215, 0, 0]],
  [21 /* C1K35S */, [4095, 1048575, 0, 0]],
  [22 /* C15001 */, [255, 65535, 0, 1023]],
  [23 /* S12906 */, [255, 16777215, 3, 0]],
  [24 /* SIE36 */, [262143, 65535, 0, 0]],
  [25 /* H10320 */, [0, 99999999, 0, 0]],
  [26 /* H10302 */, [0, 34359738367, 0, 0]],
  [27 /* H10304 */, [65535, 524287, 0, 0]],
  [28 /* P10004 */, [8191, 262143, 0, 0]],
  [29 /* HGEN37 */, [0, 4294967295, 0, 0]],
  [30 /* MDI37 */, [15, 536870911, 0, 0]]
]);
var HidProxFormatName = /* @__PURE__ */ new Map([
  [1 /* H10301 */, "HID H10301 26-bit"],
  [2 /* IND26 */, "Indala 26-bit"],
  [3 /* IND27 */, "Indala 27-bit"],
  [4 /* INDASC27 */, "Indala ASC 27-bit"],
  [5 /* TECOM27 */, "Tecom 27-bit"],
  [6 /* W2804 */, "2804 Wiegand 28-bit"],
  [7 /* IND29 */, "Indala 29-bit"],
  [8 /* ATSW30 */, "ATS Wiegand 30-bit"],
  [9 /* ADT31 */, "HID ADT 31-bit"],
  [10 /* HCP32 */, "HID Check Point 32-bit"],
  [11 /* HPP32 */, "HID Hewlett-Packard 32-bit"],
  [12 /* KASTLE */, "Kastle 32-bit"],
  [13 /* KANTECH */, "Indala/Kantech KFS 32-bit"],
  [14 /* WIE32 */, "Wiegand 32-bit"],
  [15 /* D10202 */, "HID D10202 33-bit"],
  [16 /* H10306 */, "HID H10306 34-bit"],
  [17 /* N10002 */, "Honeywell/Northern N10002 34-bit"],
  [18 /* OPTUS34 */, "Indala Optus 34-bit"],
  [19 /* SMP34 */, "Cardkey Smartpass 34-bit"],
  [20 /* BQT34 */, "BQT 34-bit"],
  [21 /* C1K35S */, "HID Corporate 1000 35-bit Std"],
  [22 /* C15001 */, "HID KeyScan 36-bit"],
  [23 /* S12906 */, "HID Simplex 36-bit"],
  [24 /* SIE36 */, "HID 36-bit Siemens"],
  [25 /* H10320 */, "HID H10320 37-bit BCD"],
  [26 /* H10302 */, "HID H10302 37-bit huge ID"],
  [27 /* H10304 */, "HID H10304 37-bit"],
  [28 /* P10004 */, "HID P10004 37-bit PCSC"],
  [29 /* HGEN37 */, "HID Generic 37-bit"],
  [30 /* MDI37 */, "PointGuard MDI 37-bit"]
]);
var Mf1AtqaSakDefaultMap = {
  4: {
    [1e3 /* MIFARE_Mini */]: [[4, 0], [9]],
    [1001 /* MIFARE_1024 */]: [[4, 0], [8]],
    // example: ABCDEF00 89 08 0400 6263646566676869
    [1002 /* MIFARE_2048 */]: [[4, 0], [8]],
    [1003 /* MIFARE_4096 */]: [[2, 0], [24]]
  },
  7: {
    [1e3 /* MIFARE_Mini */]: [[68, 0], [9]],
    [1001 /* MIFARE_1024 */]: [[68, 0], [8]],
    // example: 04FE5572AA4880 88 4400 C82000000000
    [1002 /* MIFARE_2048 */]: [[68, 0], [8]],
    [1003 /* MIFARE_4096 */]: [[66, 0], [24]]
  }
};
var MfuVerToNxpMfuType = /* @__PURE__ */ new Map([
  ["0004030101000B", 3 /* UL_EV1_48 */],
  ["0004030101000E", 4 /* UL_EV1_128 */],
  ["0004030102000B", 24 /* UL_NANO_40 */],
  ["0004030104000F03", 28 /* UL_AES */],
  ["0004030201000B", 3 /* UL_EV1_48 */],
  ["0004030201000E", 4 /* UL_EV1_128 */],
  ["0004040101000B", 7 /* NTAG_210 */],
  ["0004040101000E", 8 /* NTAG_212 */],
  ["0004040102000B", 27 /* NTAG_210u */],
  ["0004040201000F", 9 /* NTAG_213 */],
  ["00040402010011", 10 /* NTAG_215 */],
  ["00040402010013", 11 /* NTAG_216 */],
  ["0004040201010F", 26 /* NTAG_213_C */],
  ["0004040202000B", 27 /* NTAG_210u */],
  ["0004040203000F", 25 /* NTAG_213_TT */],
  ["0004040401000F", 21 /* NTAG_213_F */],
  ["00040404010013", 22 /* NTAG_216_F */],
  ["00040405020113", 16 /* NTAG_I2C_1K */],
  ["00040405020115", 17 /* NTAG_I2C_2K */],
  ["00040405020213", 18 /* NTAG_I2C_1K_PLUS */],
  ["00040405020215", 19 /* NTAG_I2C_2K_PLUS */],
  ["0034210101000E", 4 /* UL_EV1_128 */],
  // Mikron JSC Russia EV1 41 pages tag
  ["0053040201000F", 9 /* NTAG_213 */]
  // Shanghai Feiju Microelectronics Co. Ltd. China (Xiaomi Air Purifier filter)
]);
var MfuMaxPage = /* @__PURE__ */ new Map([
  [20 /* FUDAN_UL */, 16],
  [15 /* MY_D_MOVE_LEAN */, 16],
  [14 /* MY_D_MOVE */, 38],
  [13 /* MY_D_NFC */, 256],
  [12 /* MY_D */, 16],
  [6 /* NTAG_203 */, 42],
  [7 /* NTAG_210 */, 20],
  [27 /* NTAG_210u */, 20],
  [8 /* NTAG_212 */, 41],
  [26 /* NTAG_213_C */, 45],
  [21 /* NTAG_213_F */, 45],
  [25 /* NTAG_213_TT */, 45],
  [9 /* NTAG_213 */, 45],
  [10 /* NTAG_215 */, 135],
  [22 /* NTAG_216_F */, 231],
  [11 /* NTAG_216 */, 231],
  [18 /* NTAG_I2C_1K_PLUS */, 234],
  [16 /* NTAG_I2C_1K */, 234],
  [19 /* NTAG_I2C_2K_PLUS */, 234],
  [17 /* NTAG_I2C_2K */, 234],
  [28 /* UL_AES */, 56],
  [2 /* UL_C */, 48],
  [4 /* UL_EV1_128 */, 41],
  [3 /* UL_EV1_48 */, 20],
  [23 /* UL_EV1 */, 20],
  [24 /* UL_NANO_40 */, 11],
  [1 /* UL */, 16],
  [1103 /* MF0_ICU1 */, 16],
  [1104 /* MF0_ICU2 */, 48],
  [1105 /* MF0_UL11 */, 20],
  [1106 /* MF0_UL21 */, 41],
  [1107 /* NTAG_210 */, 20],
  [1108 /* NTAG_212 */, 41],
  [1100 /* NTAG_213 */, 45],
  [1101 /* NTAG_215 */, 135],
  [1102 /* NTAG_216 */, 231]
]);
var NxpMfuTypeName = /* @__PURE__ */ new Map([
  [20 /* FUDAN_UL */, "FUDAN Ultralight Compatible (or other compatible)"],
  [15 /* MY_D_MOVE_LEAN */, "INFINEON my-d\u2122 move lean (SLE 66R01L)"],
  [14 /* MY_D_MOVE */, "INFINEON my-d\u2122 move (SLE 66R01P) / INFINEON my-d\u2122 move NFC (SLE 66R01P)"],
  [13 /* MY_D_NFC */, "INFINEON my-d\u2122 NFC (SLE 66RxxP)"],
  [12 /* MY_D */, "INFINEON my-d\u2122 (SLE 66RxxS)"],
  [6 /* NTAG_203 */, "NTAG 203 144bytes (NT2H0301F0DT)"],
  [7 /* NTAG_210 */, "NTAG 210 48bytes (NT2L1011G0DU)"],
  [27 /* NTAG_210u */, "NTAG 210u (micro) 48bytes (NT2L1001G0DU)"],
  [8 /* NTAG_212 */, "NTAG 212 128bytes (NT2L1211G0DU)"],
  [26 /* NTAG_213_C */, "NTAG 213C 144bytes (NT2H1311C1DTL)"],
  [21 /* NTAG_213_F */, "NTAG 213F 144bytes (NT2H1311F0DTL)"],
  [25 /* NTAG_213_TT */, "NTAG 213TT 144bytes (NT2H1311TTDU)"],
  [9 /* NTAG_213 */, "NTAG 213 144bytes (NT2H1311G0DU)"],
  [10 /* NTAG_215 */, "NTAG 215 504bytes (NT2H1511G0DU)"],
  [22 /* NTAG_216_F */, "NTAG 216F 888bytes (NT2H1611F0DTL)"],
  [11 /* NTAG_216 */, "NTAG 216 888bytes (NT2H1611G0DU)"],
  [18 /* NTAG_I2C_1K_PLUS */, "NTAG I2C plus 888bytes (NT3H2111FHK)"],
  [16 /* NTAG_I2C_1K */, "NTAG I2C 888bytes (NT3H1101FHK)"],
  [19 /* NTAG_I2C_2K_PLUS */, "NTAG I2C plus 1912bytes (NT3H2211FHK)"],
  [17 /* NTAG_I2C_2K */, "NTAG I2C 1904bytes (NT3H1201FHK)"],
  [5 /* NTAG */, "NTAG UNKNOWN"],
  [28 /* UL_AES */, "MIFARE Ultralight AES"],
  [2 /* UL_C */, "MIFARE Ultralight C (MF0ULC)"],
  [4 /* UL_EV1_128 */, "MIFARE Ultralight EV1 128bytes (MF0UL2101)"],
  [3 /* UL_EV1_48 */, "MIFARE Ultralight EV1 48bytes (MF0UL1101)"],
  [23 /* UL_EV1 */, "MIFARE Ultralight EV1 UNKNOWN"],
  [24 /* UL_NANO_40 */, "MIFARE Ultralight Nano 40bytes (MF0UNH00)"],
  [1 /* UL */, "MIFARE Ultralight (MF0ICU1)"],
  [1103 /* MF0_ICU1 */, "MIFARE Ultralight (MF0ICU1)"],
  [1104 /* MF0_ICU2 */, "MIFARE Ultralight C (MF0ULC)"],
  [1105 /* MF0_UL11 */, "MIFARE Ultralight EV1 48bytes (MF0UL1101)"],
  [1106 /* MF0_UL21 */, "MIFARE Ultralight EV1 128bytes (MF0UL2101)"],
  [1107 /* NTAG_210 */, "NTAG 210 48bytes (NT2L1011G0DU)"],
  [1108 /* NTAG_212 */, "NTAG 212 128bytes (NT2L1211G0DU)"],
  [1100 /* NTAG_213 */, "NTAG 213 144bytes (NT2H1311G0DU)"],
  [1101 /* NTAG_215 */, "NTAG 215 504bytes (NT2H1511G0DU)"],
  [1102 /* NTAG_216 */, "NTAG 216 888bytes (NT2H1611G0DU)"]
]);
var NxpTypeBySak = /* @__PURE__ */ new Map([
  [0, "MIFARE Ultralight Classic/C/EV1/Nano | NTAG 2xx"],
  [8, "MIFARE Classic 1K | Plus SE 1K | Plug S 2K | Plus X 2K"],
  [9, "MIFARE Mini 0.3k"],
  [16, "MIFARE Plus 2K"],
  [17, "MIFARE Plus 4K"],
  [24, "MIFARE Classic 4K | Plus S 4K | Plus X 4K"],
  [25, "MIFARE Classic 2K"],
  [32, "MIFARE Plus EV1/EV2 | DESFire EV1/EV2/EV3 | DESFire Light | NTAG 4xx | MIFARE Plus S 2/4K | MIFARE Plus X 2/4K | MIFARE Plus SE 1K"],
  [40, "SmartMX with MIFARE Classic 1K"],
  [56, "SmartMX with MIFARE Classic 4K"]
]);
var UltraErrMsg = /* @__PURE__ */ new Map([
  [0 /* HF_TAG_OK */, "HF tag operation succeeded"],
  [1 /* HF_TAG_NOT_FOUND */, "HF tag not found"],
  [2 /* HF_ERR_STAT */, "HF tag status error"],
  [3 /* HF_ERR_CRC */, "HF tag data crc error"],
  [4 /* HF_COLLISION */, "HF tag collision"],
  [5 /* HF_ERR_BCC */, "HF tag uid bcc error"],
  [6 /* MF_ERR_AUTH */, "HF tag auth failed"],
  [7 /* HF_ERR_PARITY */, "HF tag data parity error"],
  [8 /* HF_ERR_ATS */, "HF tag was supposed to send ATS but didn't"],
  [64 /* LF_TAG_OK */, "LF tag operation succeeded"],
  [65 /* EM410X_TAG_NOT_FOUND */, "EM410x tag not found"],
  [66 /* LF_TAG_NO_FOUND */, "LF tag not found"],
  [67 /* HIDPROX_TAG_NO_FOUND */, "HIDProx tag not found"],
  [96 /* PAR_ERR */, "invalid param"],
  [102 /* DEVICE_MODE_ERROR */, "wrong device mode"],
  [103 /* INVALID_CMD */, "invalid cmd"],
  [104 /* DEVICE_SUCCESS */, "Device operation succeeded"],
  [105 /* NOT_IMPLEMENTED */, "Not implemented"],
  [112 /* FLASH_WRITE_FAIL */, "Flash write failed"],
  [113 /* FLASH_READ_FAIL */, "Flash read failed"],
  [114 /* INVALID_SLOT_TYPE */, "Invalid slot tagType"]
]);
var DfuErrMsg = /* @__PURE__ */ new Map([
  // DFU operation result code.
  [0 /* INVALID */, "Invalid opcode"],
  [1 /* SUCCESS */, "Operation successful"],
  [2 /* OP_CODE_NOT_SUPPORTED */, "Opcode not supported"],
  [3 /* INVALID_PARAMETER */, "Missing or invalid parameter value"],
  [4 /* INSUFFICIENT_RESOURCES */, "Not enough memory for the data object"],
  [5 /* INVALID_OBJECT */, "Data object does not match the firmware and hardware requirements, the signature is wrong, or parsing the command failed"],
  [7 /* UNSUPPORTED_TYPE */, "Not a valid object type for a Create request"],
  [8 /* OPERATION_NOT_PERMITTED */, "The state of the DFU process does not allow this operation"],
  [10 /* OPERATION_FAILED */, "Operation failed"],
  [11 /* EXT_ERROR */, "Extended error"],
  // DFU extended error code.
  [2816 /* NO_ERROR */, "No extended error code has been set. This error indicates an implementation problem"],
  [2817 /* INVALID_ERROR_CODE */, "Invalid error code. This error code should never be used outside of development"],
  [2818 /* WRONG_COMMAND_FORMAT */, "The format of the command was incorrect. This error code is not used in the current implementation, because NRF_DFU_RES_CODE_OP_CODE_NOT_SUPPORTED and NRF_DFU_RES_CODE_INVALID_PARAMETER cover all possible format errors"],
  [2819 /* UNKNOWN_COMMAND */, "The command was successfully parsed, but it is not supported or unknown"],
  [2820 /* INIT_COMMAND_INVALID */, "The init command is invalid. The init packet either has an invalid update type or it is missing required fields for the update type (for example, the init packet for a SoftDevice update is missing the SoftDevice size field)"],
  [2821 /* FW_VERSION_FAILURE */, "The firmware version is too low. For an application or SoftDevice, the version must be greater than or equal to the current version. For a bootloader, it must be greater than the current version. to the current version. This requirement prevents downgrade attacks"],
  [2822 /* HW_VERSION_FAILURE */, "The hardware version of the device does not match the required hardware version for the update"],
  [2823 /* SD_VERSION_FAILURE */, 'The array of supported SoftDevices for the update does not contain the FWID of the current SoftDevice or the first FWID is "0" on a bootloader which requires the SoftDevice to be present'],
  [2824 /* SIGNATURE_MISSING */, "The init packet does not contain a signature. This error code is not used in the current implementation, because init packets without a signature are regarded as invalid"],
  [2825 /* WRONG_HASH_TYPE */, "The hash type that is specified by the init packet is not supported by the DFU bootloader"],
  [2826 /* HASH_FAILED */, "The hash of the firmware image cannot be calculated"],
  [2827 /* WRONG_SIGNATURE_TYPE */, "The type of the signature is unknown or not supported by the DFU bootloader"],
  [2828 /* VERIFICATION_FAILED */, "The hash of the received firmware image does not match the hash in the init packet"],
  [2829 /* INSUFFICIENT_SPACE */, "The available space on the device is insufficient to hold the firmware"]
]);

// src/decoder.ts
function bufUnpackToClass(buf, format, Type) {
  return new Type(...buf.unpack(format));
}
function bufIsLenOrFail(buf, len, name) {
  if (!isArray_default(len)) {
    if (b.isBuffer(buf) && buf.length === len) return;
    throw new TypeError(`${name} must be a Buffer with length of ${len}.`);
  } else {
    if (b.isBuffer(buf) && includes_default(len, buf.length)) return;
    throw new TypeError(`${name} must be a Buffer with length of ${join_default(len, " or ")}.`);
  }
}
var SlotInfo = class _SlotInfo {
  constructor(hf, lf) {
    __publicField(this, "hfTagType");
    __publicField(this, "lfTagType");
    this.hfTagType = hf;
    this.lfTagType = lf;
  }
  static fromCmd1019(buf) {
    bufIsLenOrFail(buf, 32, "buf");
    return map_default(buf.chunk(4), (chunk2) => bufUnpackToClass(chunk2, "!HH", _SlotInfo));
  }
};
var SlotFreqIsEnable = class _SlotFreqIsEnable {
  constructor(hf, lf) {
    __publicField(this, "hf");
    __publicField(this, "lf");
    ;
    [this.hf, this.lf] = map_default([hf, lf], Boolean);
  }
  static fromCmd1023(buf) {
    bufIsLenOrFail(buf, 16, "buf");
    return map_default(buf.chunk(2), (chunk2) => bufUnpackToClass(chunk2, "!??", _SlotFreqIsEnable));
  }
};
var BatteryInfo = class _BatteryInfo {
  constructor(voltage, level) {
    __publicField(this, "voltage");
    __publicField(this, "level");
    ;
    [this.voltage, this.level] = [voltage, level];
  }
  static fromCmd1025(buf) {
    bufIsLenOrFail(buf, 3, "buf");
    return bufUnpackToClass(buf, "!HB", _BatteryInfo);
  }
};
var DeviceSettings = class _DeviceSettings {
  constructor(version2, animation, btnPressA, btnPressB, btnLongPressA, btnLongPressB, blePairingMode, blePairingKey) {
    __publicField(this, "version");
    // version of setting
    __publicField(this, "animation");
    __publicField(this, "buttonPressAction");
    __publicField(this, "buttonLongPressAction");
    __publicField(this, "blePairingMode");
    __publicField(this, "blePairingKey");
    this.version = version2;
    this.animation = animation;
    this.buttonPressAction = [btnPressA, btnPressB];
    this.buttonLongPressAction = [btnLongPressA, btnLongPressB];
    this.blePairingMode = Boolean(blePairingMode);
    this.blePairingKey = blePairingKey;
  }
  static fromCmd1034(buf) {
    bufIsLenOrFail(buf, 13, "buf");
    return bufUnpackToClass(buf, "!6B?6s", _DeviceSettings);
  }
};
var Hf14aAntiColl = class _Hf14aAntiColl {
  constructor(uid, atqa, sak, ats) {
    __publicField(this, "uid");
    __publicField(this, "atqa");
    __publicField(this, "sak");
    __publicField(this, "ats");
    ;
    [this.uid, this.atqa, this.sak, this.ats] = [uid, atqa, sak, ats];
  }
  static fromBuffer(buf) {
    const uidLen = buf[0];
    if (buf.length < uidLen + 4) throw new Error("invalid length of uid");
    const atsLen = buf[uidLen + 4];
    if (buf.length < uidLen + atsLen + 5) throw new Error("invalid length of ats");
    return bufUnpackToClass(buf, `!${uidLen + 1}p2ss${atsLen + 1}p`, _Hf14aAntiColl);
  }
  static fromCmd2000(buf) {
    if (!b.isBuffer(buf)) throw new TypeError("buf must be a Buffer");
    const tags = [];
    while (buf.length > 0) {
      const tag = _Hf14aAntiColl.fromBuffer(buf);
      buf = buf.subarray(tag.uid.length + tag.ats.length + 5);
      tags.push(tag);
    }
    return tags;
  }
};
var Hf14aSettings = class _Hf14aSettings {
  constructor(bcc, cl2, cl3, rats) {
    __publicField(this, "bcc");
    __publicField(this, "cl2");
    __publicField(this, "cl3");
    __publicField(this, "rats");
    ;
    [this.bcc, this.cl2, this.cl3, this.rats] = [bcc, cl2, cl3, rats];
  }
  static fromCmd2200(buf) {
    bufIsLenOrFail(buf, 4, "buf");
    return bufUnpackToClass(buf, "!BBBB", _Hf14aSettings);
  }
};
var Mf1AcquireStaticNestedRes = class _Mf1AcquireStaticNestedRes {
  constructor(uid, atks) {
    __publicField(this, "uid");
    __publicField(this, "atks");
    ;
    [this.uid, this.atks] = [uid, atks];
  }
  static fromCmd2003(buf) {
    if (!b.isBuffer(buf)) throw new TypeError("buf must be a Buffer");
    return new _Mf1AcquireStaticNestedRes(
      buf.subarray(0, 4),
      // uid
      map_default(buf.subarray(4).chunk(8), (chunk2) => ({
        nt1: chunk2.subarray(0, 4),
        nt2: chunk2.subarray(4, 8)
      }))
      // atks
    );
  }
};
var Mf1DarksideRes = class _Mf1DarksideRes {
  constructor(status, uid, nt2, par, ks, nr, ar) {
    __publicField(this, "status");
    __publicField(this, "uid");
    __publicField(this, "nt");
    __publicField(this, "par");
    __publicField(this, "ks");
    __publicField(this, "nr");
    __publicField(this, "ar");
    this.status = status;
    this.uid = uid;
    this.nt = nt2;
    this.par = par;
    this.ks = ks;
    this.nr = nr;
    this.ar = ar;
  }
  static fromCmd2004(buf) {
    if (!b.isBuffer(buf) || !includes_default([1, 33], buf.length)) throw new TypeError("buf must be a 1 or 33 bytes Buffer.");
    return bufUnpackToClass(buf, buf.length === 1 ? "!B" : "!B4s4s8s8s4s4s", _Mf1DarksideRes);
  }
};
var Mf1NtDistanceRes = class _Mf1NtDistanceRes {
  constructor(uid, dist) {
    __publicField(this, "uid");
    __publicField(this, "dist");
    ;
    [this.uid, this.dist] = [uid, dist];
  }
  static fromCmd2005(buf) {
    bufIsLenOrFail(buf, 8, "buf");
    return bufUnpackToClass(buf, "!4s4s", _Mf1NtDistanceRes);
  }
};
var Mf1NestedRes = class _Mf1NestedRes {
  // The 3 parity bit of nested verification encryption
  constructor(nt1, nt2, par) {
    __publicField(this, "nt1");
    // Unblocked explicitly random number
    __publicField(this, "nt2");
    // Random number of nested verification encryption
    __publicField(this, "par");
    ;
    [this.nt1, this.nt2, this.par] = [nt1, nt2, par];
  }
  static fromCmd2006(buf) {
    if (!b.isBuffer(buf)) throw new TypeError("buf must be a Buffer.");
    return map_default(buf.chunk(9), (chunk2) => bufUnpackToClass(chunk2, "!IIB", _Mf1NestedRes));
  }
};
var Mf1CheckKeysOfSectorsRes = class _Mf1CheckKeysOfSectorsRes {
  constructor(found, sectorKeys) {
    __publicField(this, "found");
    __publicField(this, "sectorKeys");
    this.found = found;
    this.sectorKeys = times_default(80, (i) => found.readBitMSB(i) === 1 ? sectorKeys[i] : null);
  }
  static fromCmd2012(buf) {
    bufIsLenOrFail(buf, 490, "buf");
    return new _Mf1CheckKeysOfSectorsRes(
      buf.subarray(0, 10),
      // found
      buf.subarray(10).chunk(6)
      // sectorKeys
    );
  }
};
var Mf1DetectionLog = class _Mf1DetectionLog {
  constructor(block, flags, uid, nt2, nr, ar) {
    __publicField(this, "block");
    __publicField(this, "isKeyB");
    __publicField(this, "isNested");
    __publicField(this, "uid");
    __publicField(this, "nt");
    __publicField(this, "nr");
    __publicField(this, "ar");
    this.block = block;
    this.isKeyB = flags.readBitLSB(0) === 1;
    this.isNested = flags.readBitLSB(1) === 1;
    this.uid = uid;
    this.nt = nt2;
    this.nr = nr;
    this.ar = ar;
  }
  static fromBuffer(buf) {
    bufIsLenOrFail(buf, 18, "buf");
    return bufUnpackToClass(buf, "!Bs4s4s4s4s", _Mf1DetectionLog);
  }
  static fromCmd4006(buf) {
    if (!b.isBuffer(buf)) throw new TypeError("buf must be a Buffer.");
    return map_default(buf.chunk(18), _Mf1DetectionLog.fromBuffer);
  }
};
var Mf1EmuSettings = class _Mf1EmuSettings {
  constructor(detection, gen1a, gen2, antiColl, write) {
    __publicField(this, "detection");
    __publicField(this, "gen1a");
    __publicField(this, "gen2");
    __publicField(this, "antiColl");
    __publicField(this, "write");
    this.detection = detection;
    this.gen1a = gen1a;
    this.gen2 = gen2;
    this.antiColl = antiColl;
    this.write = write;
  }
  static fromCmd4009(buf) {
    bufIsLenOrFail(buf, 5, "buf");
    return bufUnpackToClass(buf, "!4?B", _Mf1EmuSettings);
  }
};
var Mf1AcquireHardNestedRes = class _Mf1AcquireHardNestedRes {
  // The 8 parity bit of nested authentication
  constructor(nt2, ntEnc, par) {
    __publicField(this, "nt");
    // tag nonce of nested authentication
    __publicField(this, "ntEnc");
    // encrypted tag nonce of nested authentication
    __publicField(this, "par");
    ;
    [this.nt, this.ntEnc, this.par] = [nt2, ntEnc, par];
  }
  static fromCmd2013(buf) {
    if (!b.isBuffer(buf)) throw new TypeError("buf must be a Buffer.");
    return map_default(buf.chunk(9), (chunk2) => bufUnpackToClass(chunk2, "!IIB", _Mf1AcquireHardNestedRes));
  }
};
var HidProxScanRes = class _HidProxScanRes {
  constructor(format, fc, cn1, cn2, il, oem) {
    __publicField(this, "format");
    __publicField(this, "fc");
    __publicField(this, "cn");
    __publicField(this, "il");
    __publicField(this, "oem");
    ;
    [this.format, this.fc, this.cn, this.il, this.oem] = [format, fc, cn1 * 4294967296 + cn2, il, oem];
  }
  static fromCmd3002(buf) {
    bufIsLenOrFail(buf, 13, "buf");
    return bufUnpackToClass(buf, "!BIBIBH", _HidProxScanRes);
  }
};
var Mf1AcquireStaticEncryptedNestedDecoder = class _Mf1AcquireStaticEncryptedNestedDecoder {
  constructor(uid, atks) {
    __publicField(this, "uid");
    __publicField(this, "atks");
    ;
    [this.uid, this.atks] = [uid, atks];
  }
  static fromCmd2014(startSector, buf) {
    if (!b.isBuffer(buf)) throw new TypeError("buf must be a Buffer");
    return new _Mf1AcquireStaticEncryptedNestedDecoder(
      buf.readUint32BE(0),
      // uid
      flatMap_default(buf.subarray(4).chunk(18), (chunk2, i) => [
        {
          // key A
          sector: startSector + i,
          keyType: 96 /* KEY_A */,
          nt: chunk2.readUint32BE(0),
          ntEnc: chunk2.readUint32BE(4),
          par: chunk2[8]
        },
        {
          // key B
          sector: startSector + i,
          keyType: 97 /* KEY_B */,
          nt: chunk2.readUint32BE(9),
          ntEnc: chunk2.readUint32BE(13),
          par: chunk2[17]
        }
      ])
    );
  }
};
var MfuEmuSettings = class _MfuEmuSettings {
  constructor(detection, uid, write) {
    __publicField(this, "detection");
    __publicField(this, "uid");
    __publicField(this, "write");
    this.detection = detection;
    this.uid = uid;
    this.write = write;
  }
  static fromCmd4037(buf) {
    bufIsLenOrFail(buf, 3, "buf");
    return bufUnpackToClass(buf, "!2?B", _MfuEmuSettings);
  }
};

// src/EventAsyncGenerator.ts
var symbolClose = /* @__PURE__ */ Symbol.for("EventAsyncGenerator.close");
var _isFinally, _pullPromise, _it, _queue;
var EventAsyncGenerator = class {
  constructor(init) {
    __privateAdd(this, _isFinally, false);
    __privateAdd(this, _pullPromise, null);
    __privateAdd(this, _it);
    __privateAdd(this, _queue, []);
    __publicField(this, "onClose");
    __publicField(this, "onData");
    __publicField(this, "onError");
    __publicField(this, "removeCallback");
    const me = this;
    this.onData = (value) => {
      if (__privateGet(this, _pullPromise) !== null) __privateGet(this, _pullPromise).resolve?.(value);
      else __privateGet(this, _queue).push(value);
    };
    this.onClose = () => {
      if (__privateGet(this, _pullPromise) !== null) __privateGet(this, _pullPromise).resolve?.(symbolClose);
      else __privateGet(this, _queue).push(symbolClose);
      void this.finally();
    };
    this.onError = (err) => {
      if (__privateGet(this, _pullPromise) !== null) __privateGet(this, _pullPromise).reject?.(err);
      else __privateGet(this, _queue).push(err);
      void this.finally();
    };
    __privateSet(this, _it, (async function* () {
      try {
        await init?.(me);
        while (true) {
          let valueOrErr;
          if (__privateGet(me, _queue).length > 0) valueOrErr = __privateGet(me, _queue).shift();
          else {
            __privateSet(me, _pullPromise, createResolvable());
            valueOrErr = await __privateGet(me, _pullPromise).catch((err) => err);
            __privateSet(me, _pullPromise, null);
          }
          if (valueOrErr === symbolClose) return;
          if (valueOrErr instanceof Error) throw valueOrErr;
          yield valueOrErr;
        }
      } finally {
        await me.finally();
      }
    })());
  }
  async next(...args) {
    return await __privateGet(this, _it).next(...args);
  }
  async return(value) {
    const result = await __privateGet(this, _it).return(value);
    await this.finally();
    return result;
  }
  async throw(err) {
    const result = await __privateGet(this, _it).throw(err);
    await this.finally();
    return result;
  }
  async finally() {
    if (__privateGet(this, _isFinally)) return;
    __privateSet(this, _isFinally, true);
    await this.removeCallback?.();
  }
  [Symbol.asyncIterator]() {
    return this;
  }
  async [Symbol.asyncDispose]() {
    await this.finally();
  }
};
_isFinally = new WeakMap();
_pullPromise = new WeakMap();
_it = new WeakMap();
_queue = new WeakMap();
function createResolvable() {
  let resolve, reject;
  const resolvable = new Promise((...args) => {
    ;
    [resolve, reject] = args;
  });
  Object.assign(resolvable, { resolve, reject });
  return resolvable;
}

// src/helper.ts
function middlewareCompose(middlewares) {
  if (!isArray_default(middlewares)) throw new TypeError("Middleware stack must be an array!");
  if (some_default(middlewares, (fn) => !isFunction_default(fn))) throw new TypeError("Middleware must be composed of functions!");
  return async (context = {}, next) => {
    const cloned = [...middlewares, ...isFunction_default(next) ? [next] : []];
    if (cloned.length === 0) return;
    const executed = times_default(cloned.length + 1, () => 0 /* PENDING */);
    const dispatch = async (cur) => {
      if (executed[cur] !== 0 /* PENDING */) throw new Error(`middleware[${cur}] called multiple times`);
      if (cur >= cloned.length) {
        executed[cur] = 2 /* FINISHED */;
        return;
      }
      try {
        executed[cur] = 1 /* STARTED */;
        const result = await cloned[cur](context, async () => await dispatch(cur + 1));
        if (executed[cur + 1] === 1 /* STARTED */) throw new Error(`next() in middleware[${cur}] should be awaited`);
        executed[cur] = 2 /* FINISHED */;
        return result;
      } catch (err) {
        executed[cur] = 3 /* ERROR */;
        if (isString_default(err.stack)) err.stack = err.stack.replace(/at async dispatch[^\n]+\n[^\n]+\n\s*/g, "");
        throw err;
      }
    };
    return await dispatch(0);
  };
}
async function sleep(ms) {
  let timer;
  await new Promise((resolve) => {
    timer = setTimeout(resolve, ms);
  });
  if (timer !== void 0) {
    clearTimeout(timer);
    timer = void 0;
  }
}
function versionCompare(str1, str2) {
  const tmp = map_default([str1, str2], (str, idx) => {
    const matched = trim_default(str).match(/^(?:(\d+)[.]?)(?:(\d+)[.]?)?(?:(\d+)[.]?)?/);
    if (isNil_default(matched)) throw new Error(`invalid version: str${idx + 1} = ${str}`);
    return map_default(matched.slice(1), (v2) => isNil_default(v2) ? 0 : toSafeInteger_default(v2));
  });
  for (let i = 0; i < 3; i++) {
    if (tmp[0][i] > tmp[1][i]) return 1;
    if (tmp[0][i] < tmp[1][i]) return -1;
  }
  return 0;
}

// src/ChameleonUltra.ts
var READ_DEFAULT_TIMEOUT = 5e3;
var START_OF_FRAME = new b(2).writeUInt16BE(4591);
var VERSION_SUPPORTED = { gte: "2.0", lt: "3.0" };
function isMf1BlockNo(block) {
  return isInteger_default(block) && block >= 0 && block <= 255;
}
function validateMf1BlockKey(block, keyType, key, prefix = "") {
  if (!isMf1BlockNo(block)) throw new TypeError(`${prefix}block should be a integer`);
  if (!isMf1KeyType(keyType)) throw new TypeError(`${prefix}keyType should be a Mf1KeyType`);
  bufIsLenOrFail(key, BYTES_PER_MF1_KEY, `${prefix}key`);
}
function toUpperHex(buf) {
  return toUpper_default(buf.toString("hex"));
}
function wrapErr(cause) {
  throw new Error(cause.message, { cause });
}
var _deviceMode, _isDisconnecting, _rxReader, _supportedCmds, _writeChain, _emitErr, _hooks, _middlewares, _ChameleonUltra_instances, debug_fn, ultraStartReading_fn, dfuStartReading_fn, sendBuffer_fn, sendCmd_fn, createReadRespFn_fn;
var _ChameleonUltra = class _ChameleonUltra {
  constructor() {
    __privateAdd(this, _ChameleonUltra_instances);
    __privateAdd(this, _deviceMode, null);
    __privateAdd(this, _isDisconnecting, false);
    __privateAdd(this, _rxReader, null);
    __privateAdd(this, _supportedCmds, /* @__PURE__ */ new Set());
    // Serializes all writes so getWriter() is never called while another writer
    // still holds the WritableStream lock (avoids "Cannot create writer when
    // WritableStream is locked" when multiple commands are issued concurrently).
    __privateAdd(this, _writeChain, Promise.resolve());
    __privateAdd(this, _emitErr);
    __privateAdd(this, _hooks, /* @__PURE__ */ new Map());
    __privateAdd(this, _middlewares, /* @__PURE__ */ new Map());
    /** @hidden */
    __publicField(this, "$adapter");
    /**
     * @hidden
     */
    __publicField(this, "readDefaultTimeout", READ_DEFAULT_TIMEOUT);
    /**
     * The event emitter of `ChameleonUltra`.
     * - `disconnected`: Emitted when device is disconnected.
     * - `connected`: Emitted when device is connected.
     * - `debug`: Emitted when debug message is generated. `(logName: string, formatter: any, ...args: [] | any[]) => void`
     * @hidden
     */
    __publicField(this, "emitter", new CustomEventTarget());
    /**
     * @hidden
     */
    __publicField(this, "port", null);
    __privateSet(this, _emitErr, (cause) => {
      this.emitter.emit("error", new Error(cause.message, { cause }));
    });
  }
  /**
   * Register a plugin.
   * @param plugin - The plugin to register.
   * @param option - The option to pass to plugin.install().
   * @internal
   * @group Internal
   */
  async use(plugin, option) {
    const pluginId = `$${plugin.name}`;
    const installResp = await plugin.install({ Buffer: b, ultra: this }, option);
    if (!isNil_default(installResp)) this[pluginId] = installResp;
    return this;
  }
  /**
   * Register a hook.
   * @param hookName - The hook name.
   * @param fn - The function to register.
   * @internal
   * @group Internal
   */
  addHook(hookName, fn) {
    const middlewares = __privateGet(this, _middlewares).get(hookName) ?? [];
    if (!__privateGet(this, _middlewares).has(hookName)) __privateGet(this, _middlewares).set(hookName, middlewares);
    middlewares.push(fn);
    __privateGet(this, _hooks).set(hookName, middlewareCompose(middlewares));
    return this;
  }
  /**
   * Invoke a hook with context.
   * @param hookName - The hook name.
   * @param ctx - The context will be passed to every middleware.
   * @param next - The next middleware function.
   * @returns The return value depent on the middlewares
   * @internal
   * @group Internal
   */
  async invokeHook(hookName, ctx = {}, next) {
    const hook = __privateGet(this, _hooks).get(hookName) ?? middlewareCompose([]);
    if (!__privateGet(this, _hooks).has(hookName)) __privateGet(this, _hooks).set(hookName, hook);
    return await hook({ ...ctx, ultra: this }, next);
  }
  /**
   * Connect to ChameleonUltra. This method will be called automatically when you call any command.
   * @group Connection Related
   */
  async connect() {
    try {
      await this.invokeHook("connect", {}, async (ctx, next) => {
        if (isNil_default(this.port)) throw new Error("this.port is undefined. Did you remember to use adapter plugin?");
        const promiseConnected = new Promise((resolve) => this.emitter.once("connected", resolve));
        if (isNil_default(this.port.readable)) throw new Error("this.port.readable is nil");
        __privateSet(this, _rxReader, this.port.readable.getReader());
        if (this.isDfu()) void __privateMethod(this, _ChameleonUltra_instances, dfuStartReading_fn).call(this);
        else void __privateMethod(this, _ChameleonUltra_instances, ultraStartReading_fn).call(this);
        const connectedAt = await promiseConnected;
        __privateMethod(this, _ChameleonUltra_instances, debug_fn).call(this, "core", `connected at ${connectedAt.toISOString()}`);
      });
    } catch (err) {
      const err1 = new Error(`Failed to connect: ${err.message}`, { cause: err });
      __privateGet(this, _emitErr).call(this, err1);
      await this.disconnect(err1);
      throw err1;
    }
  }
  /**
   * Disconnect ChameleonUltra.
   * @group Connection Related
   */
  async disconnect(err = new Error("disconnect()")) {
    try {
      if (__privateGet(this, _isDisconnecting)) return;
      __privateSet(this, _isDisconnecting, true);
      this.emitter.emit("error", err);
      __privateMethod(this, _ChameleonUltra_instances, debug_fn).call(this, "core", "disconnecting...");
      await this.invokeHook("disconnect", { err }, async (ctx, next) => {
        try {
          __privateSet(this, _deviceMode, null);
          __privateGet(this, _supportedCmds).clear();
          const promiseDisconnected = this.isConnected() ? new Promise((resolve) => {
            this.emitter.once("disconnected", (disconnected, reason2) => {
              resolve([disconnected, reason2]);
            });
          }) : Promise.resolve([/* @__PURE__ */ new Date(), err.message]);
          await __privateGet(this, _rxReader)?.cancel(err).catch(__privateGet(this, _emitErr));
          if (this.port?.readable?.locked) __privateGet(this, _rxReader)?.releaseLock();
          await this.port?.writable?.close().catch(__privateGet(this, _emitErr));
          __privateMethod(this, _ChameleonUltra_instances, debug_fn).call(this, "core", `locked: readable = ${this.port?.readable?.locked ?? "?"}, writable = ${this.port?.writable?.locked ?? "?"}`);
          this.port = null;
          const [disconnectedAt, reason] = await promiseDisconnected;
          __privateMethod(this, _ChameleonUltra_instances, debug_fn).call(this, "core", `disconnected at ${disconnectedAt.toISOString()}, reason = ${reason ?? err.message}`);
        } catch (err2) {
          throw new Error(err2.message ?? "Failed to disconnect", { cause: err2 });
        }
      });
    } finally {
      __privateSet(this, _isDisconnecting, false);
    }
  }
  /**
   * Return true if ChameleonUltra is connected.
   * @group Connection Related
   */
  isConnected() {
    return this?.port?.isOpen?.() ?? false;
  }
  /**
   * Return true if ChameleonUltra is in DFU mode.
   * @group DFU Related
   */
  isDfu() {
    return this?.port?.isDfu?.() ?? false;
  }
  /**
   * Get current firmware version of device.
   * @returns Current firmware version of device.
   * @group Device Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   console.log(await ultra.cmdGetAppVersion()) // '1.0'
   * })(vm.ultra)
   * ```
   */
  async cmdGetAppVersion() {
    const cmd = 1e3 /* GET_APP_VERSION */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd });
    const { status, data } = await readResp();
    if (status === 0 /* HF_TAG_OK */ && data.readUInt16BE(0) === 1) throw new Error("Unsupported protocol. Firmware update is required.");
    return `${data[0]}.${data[1]}`;
  }
  /**
   * Change device mode to tag reader or tag emulator.
   * @param mode - The mode to be changed.
   * @group Device Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { DeviceMode } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   await ultra.cmdChangeDeviceMode(DeviceMode.TAG)
   * })(vm.ultra)
   * ```
   */
  async cmdChangeDeviceMode(mode) {
    if (!isDeviceMode(mode)) throw new TypeError("Invalid device mode");
    const cmd = 1001 /* CHANGE_DEVICE_MODE */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd, data: b.pack("!B", mode) });
    await readResp();
    __privateSet(this, _deviceMode, mode);
  }
  /**
   * Get current mode of device.
   * @returns Current mode of device.
   * @group Device Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { DeviceMode } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   const deviceMode = await ultra.cmdGetDeviceMode()
   *   console.log(DeviceMode[deviceMode]) // 'TAG'
   * })(vm.ultra)
   * ```
   */
  async cmdGetDeviceMode() {
    const cmd = 1002 /* GET_DEVICE_MODE */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd });
    const data = (await readResp()).data;
    __privateSet(this, _deviceMode, data[0]);
    return __privateGet(this, _deviceMode);
  }
  /**
   * Automatically change the device mode to `mode` if the current device mode is not equal to `mode`.
   * @group Device Related
   */
  async assureDeviceMode(mode) {
    if (__privateGet(this, _deviceMode) === mode) return;
    await this.cmdChangeDeviceMode(mode);
  }
  /**
   * Change the active emulation tag slot of device.
   * @param slot - The slot to be active.
   * @group Slot Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { Slot } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   await ultra.cmdSlotSetActive(Slot.SLOT_1)
   * })(vm.ultra)
   * ```
   */
  async cmdSlotSetActive(slot) {
    if (!isSlot(slot)) throw new TypeError("Invalid slot");
    const cmd = 1003 /* SET_ACTIVE_SLOT */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd, data: b.pack("!B", slot) });
    await readResp();
  }
  /**
   * Change the emulation tag type of specified slot.
   * @param slot - The slot to be set.
   * @param tagType - The tag type to be set.
   * @group Slot Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { Slot, TagType } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   await ultra.cmdSlotChangeTagType(Slot.SLOT_1, TagType.MIFARE_1024)
   * })(vm.ultra)
   * ```
   */
  async cmdSlotChangeTagType(slot, tagType) {
    if (!isSlot(slot)) throw new TypeError("Invalid slot");
    if (!isTagType(tagType)) throw new TypeError("Invalid tagType");
    const cmd = 1004 /* SET_SLOT_TAG_TYPE */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd, data: b.pack("!BH", slot, tagType) });
    await readResp();
  }
  /**
   * Reset the emulation tag data of specified tag type in specified slot to default values.
   * @param slot - The slot to be reset.
   * @param tagType - The tag type to be reset.
   * @group Slot Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { Slot, TagType } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   await ultra.cmdSlotResetTagType(Slot.SLOT_1, TagType.MIFARE_1024)
   * })(vm.ultra)
   * ```
   */
  async cmdSlotResetTagType(slot, tagType) {
    if (!isSlot(slot)) throw new TypeError("Invalid slot");
    if (!isTagType(tagType)) throw new TypeError("Invalid tagType");
    const cmd = 1005 /* SET_SLOT_DATA_DEFAULT */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd, data: b.pack("!BH", slot, tagType) });
    await readResp();
  }
  /**
   * Enable or disable the specified slot.
   * @param slot - The slot to be enable/disable.
   * @param enable - `true` to enable the slot, `false` to disable the slot.
   * @group Slot Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { FreqType, Slot } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   await ultra.cmdSlotSetEnable(Slot.SLOT_1, FreqType.HF, true)
   * })(vm.ultra)
   * ```
   */
  async cmdSlotSetEnable(slot, freq, enable) {
    if (!isSlot(slot)) throw new TypeError("Invalid slot");
    if (!isValidFreqType(freq)) throw new TypeError("Invalid freq");
    if (isNil_default(enable)) throw new TypeError("enable is required");
    const cmd = 1006 /* SET_SLOT_ENABLE */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd, data: b.pack("!BB?", slot, freq, enable) });
    await readResp();
  }
  /**
   * Helper function to change slot to tagType, reset to default tagType data, enable slot, save settings and set active slot.
   * @param slot - The target slot.
   * @param hfTagType - The hf tagType to be change. If `null`, the hf of slot will be skip.
   * @param lfTagType - The lf tagType to be change. If `null`, the lf of slot will be skip.
   * @group Slot Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { Slot, TagType } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   await ultra.slotChangeTagTypeAndActive(Slot.SLOT_1, TagType.MIFARE_1024, TagType.EM410X)
   * })(vm.ultra)
   * ```
   */
  async slotChangeTagTypeAndActive(slot, hfTagType, lfTagType) {
    if (!isSlot(slot)) throw new TypeError("Invalid slot");
    if (!isNil_default(hfTagType)) {
      if (!isTagType(hfTagType) || hfTagType <= 999 /* LF_END */) throw new TypeError(`Invalid hfTagType = ${hfTagType}`);
      await this.cmdSlotChangeTagType(slot, hfTagType);
      await this.cmdSlotResetTagType(slot, hfTagType);
      await this.cmdSlotSetEnable(slot, 2 /* HF */, true);
    }
    if (!isNil_default(lfTagType)) {
      if (!isTagType(lfTagType) || lfTagType > 999 /* LF_END */) throw new TypeError(`Invalid lfTagType = ${lfTagType}`);
      await this.cmdSlotChangeTagType(slot, lfTagType);
      await this.cmdSlotResetTagType(slot, lfTagType);
      await this.cmdSlotSetEnable(slot, 1 /* LF */, true);
    }
    await this.cmdSlotSaveSettings();
    await this.cmdSlotSetActive(slot);
  }
  /**
   * Set the nickname of specified freq type in specified slot.
   * @param slot - The slot to be set.
   * @param freq - The freq type to be set.
   * @param name - The name to be set. The `byteLength` of name should between `1` and `32`.
   * @group Slot Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { Slot, FreqType } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   await ultra.cmdSlotSetFreqName(Slot.SLOT_1, FreqType.HF, 'My Tag')
   * })(vm.ultra)
   * ```
   */
  async cmdSlotSetFreqName(slot, freq, name) {
    if (!isSlot(slot)) throw new TypeError("Invalid slot");
    if (!isValidFreqType(freq)) throw new TypeError("Invalid freq");
    if (!isString_default(name)) throw new TypeError("name should be a string");
    const buf1 = b.from(name);
    if (!inRange_default(buf1.length, 1, 33)) throw new TypeError("byteLength of name should between 1 and 32");
    const cmd = 1007 /* SET_SLOT_TAG_NICK */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd, data: b.pack(`!BB${buf1.length}s`, slot, freq, buf1) });
    await readResp();
  }
  /**
   * Get the nickname of specified freq type in specified slot.
   * @param slot - The slot to be get.
   * @param freq - The freq type to be get.
   * @returns The nickname of specified freq type in specified slot.
   * @group Slot Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { Slot, FreqType } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   const name = await ultra.cmdSlotGetFreqName(Slot.SLOT_1, FreqType.HF)
   *   console.log(name) // 'My Tag'
   * })(vm.ultra)
   * ```
   */
  async cmdSlotGetFreqName(slot, freq) {
    try {
      if (!isSlot(slot)) throw new TypeError("Invalid slot");
      if (!isValidFreqType(freq)) throw new TypeError("Invalid freq");
      const cmd = 1008 /* GET_SLOT_TAG_NICK */;
      const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
      await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd, data: b.pack("!BB", slot, freq) });
      return (await readResp()).data.toString("utf8");
    } catch (err) {
      if (err.status === 113 /* FLASH_READ_FAIL */) return;
      throw err;
    }
  }
  /**
   * The SlotSettings, hf tag data and lf tag data will be written to persistent storage. But the slot nickname is not affected by this command.
   * @group Slot Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { Buffer } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   await ultra.cmdMf1EmuWriteBlock(1, Buffer.alloc(16))
   *   await ultra.cmdSlotSaveSettings()
   * })(vm.ultra)
   * ```
   */
  async cmdSlotSaveSettings() {
    const cmd = 1009 /* SLOT_DATA_CONFIG_SAVE */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd });
    await readResp();
  }
  /**
   * Enter bootloader mode.
   * @group DFU Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   await ultra.cmdDfuEnter()
   * })(vm.ultra)
   * ```
   */
  async cmdDfuEnter() {
    const cmd = 1010 /* ENTER_BOOTLOADER */;
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd });
    for (let i = 500; i >= 0; i--) {
      if (!this.isConnected()) break;
      await sleep(10);
    }
    if (this.isConnected()) {
      await this.disconnect(new Error("Enter bootloader mode"));
      await sleep(500);
    }
    __privateMethod(this, _ChameleonUltra_instances, debug_fn).call(this, "core", "cmdDfuEnter: device disconnected");
  }
  /**
   * Get chipset id of device in hex format.
   * @returns Chipset id of device in hex format.
   * @group Device Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   console.log(await ultra.cmdGetDeviceChipId()) // 'db1c624228d9634c'
   * })(vm.ultra)
   * ```
   */
  async cmdGetDeviceChipId() {
    const cmd = 1011 /* GET_DEVICE_CHIP_ID */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd });
    const data = (await readResp()).data;
    return data.toString("hex");
  }
  /**
   * Get the ble address of device.
   * @returns The ble address of device.
   * @group Device Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   console.log(await ultra.cmdBleGetAddress()) // 'E8:B6:3D:04:B6:FE'
   * })(vm.ultra)
   * ```
   */
  async cmdBleGetAddress() {
    const cmd = 1012 /* GET_DEVICE_ADDRESS */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd });
    const data = (await readResp()).data;
    return (toUpperHex(data).match(/.{2}/g) ?? []).join(":");
  }
  /**
   * Save the settings of device to persistent storage.
   * @group Device Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   await ultra.cmdSaveSettings()
   * })(vm.ultra)
   * ```
   */
  async cmdSaveSettings() {
    const cmd = 1013 /* SAVE_SETTINGS */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd });
    await readResp();
  }
  /**
   * Reset the settings of device to default values.
   * @group Device Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   await ultra.cmdResetSettings()
   * })(vm.ultra)
   * ```
   */
  async cmdResetSettings() {
    const cmd = 1014 /* RESET_SETTINGS */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd });
    await readResp();
  }
  /**
   * Set the animation mode of device while wake-up and sleep.
   * @param mode - The animation mode to be set.
   * @group Device Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { AnimationMode } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   await ultra.cmdSetAnimationMode(AnimationMode.SHORT)
   * })(vm.ultra)
   * ```
   */
  async cmdSetAnimationMode(mode) {
    if (!isAnimationMode(mode)) throw new TypeError("Invalid mode");
    const cmd = 1015 /* SET_ANIMATION_MODE */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd, data: b.pack("!B", mode) });
    await readResp();
  }
  /**
   * Get the animation mode of device while wake-up and sleep.
   * @returns The animation mode of device.
   * @group Device Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { AnimationMode } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   const mode = await ultra.cmdGetAnimationMode()
   *   console.log(AnimationMode[mode]) // 'FULL'
   * })(vm.ultra)
   * ```
   */
  async cmdGetAnimationMode() {
    const cmd = 1016 /* GET_ANIMATION_MODE */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd });
    return (await readResp()).data[0];
  }
  /**
   * Get the git version of firmware. The returned string is the output of `git describe --abbrev=7 --dirty --always --tags --match "v*.*"`. Depending on the status of repo, the string can be:
   * - a short tag, e.g. `v2.0.0` if the firmware is built from the tagged commit
   * - a longer tag indicating how many commits far from the latest tag and 7 nibbles of its commit hash, prepended with g, e.g. 5 commits away from v2.0.0: `v2.0.0-5-g617d6d0`
   * - a long tag finishing with `-dirty` if the local repo contains changes not yet committed, e.g. `v2.0.0-5-g617d6d0-dirty`
   * @returns The git version of firmware.
   * @group Device Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   console.log(await ultra.cmdGetGitVersion()) // 'v2.0.0-209-gc68ea99'
   * })(vm.ultra)
   * ```
   */
  async cmdGetGitVersion() {
    const cmd = 1017 /* GET_GIT_VERSION */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd });
    return (await readResp()).data.toString("utf8");
  }
  /**
   * Get the active emulation tag slot of device.
   * @returns The active slot of device.
   * @group Slot Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { Slot } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   const slot = await ultra.cmdSlotGetActive()
   *   console.log(Slot[slot]) // 'SLOT_1'
   * })(vm.ultra)
   * ```
   */
  async cmdSlotGetActive() {
    const cmd = 1018 /* GET_ACTIVE_SLOT */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd });
    return (await readResp()).data[0];
  }
  /**
   * Get the slot info of all slots.
   * @returns The slot info of all slots.
   * @group Slot Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const slots = await ultra.cmdSlotGetInfo()
   *   console.log(JSON.stringify(slots))
   *   /**
   *    * [
   *    *   { "hfTagType": 1001, "lfTagType": 100 },
   *    *   { "hfTagType": 1001, "lfTagType": 0 },
   *    *   { "hfTagType": 0, "lfTagType": 100 },
   *    *   { "hfTagType": 0, "lfTagType": 0 },
   *    *   { "hfTagType": 0, "lfTagType": 0 },
   *    *   { "hfTagType": 0, "lfTagType": 0 },
   *    *   { "hfTagType": 0, "lfTagType": 0 },
   *    *   { "hfTagType": 0, "lfTagType": 0 }
   *    * ]
   *    *\/
   * })(vm.ultra)
   * ```
   */
  async cmdSlotGetInfo() {
    const cmd = 1019 /* GET_SLOT_INFO */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd });
    return SlotInfo.fromCmd1019((await readResp()).data);
  }
  /**
   * Permanently wipes Chameleon to factory settings. This will delete all your slot data and custom settings. There's no going back.
   * @group Device Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   await ultra.cmdWipeFds()
   * })(vm.ultra)
   * ```
   */
  async cmdWipeFds() {
    const cmd = 1020 /* WIPE_FDS */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd });
    await readResp();
  }
  /**
   * Delete the nick name of the slot
   * @param slot - Slot number
   * @param freq - Frequency type
   * @returns `true` if success, `false` if slot name is empty.
   * @group Slot Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { Slot, FreqType } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   console.log(await ultra.cmdSlotDeleteFreqName(Slot.SLOT_1, FreqType.HF)) // true
   * })(vm.ultra)
   * ```
   */
  async cmdSlotDeleteFreqName(slot, freq) {
    try {
      if (!isSlot(slot)) throw new TypeError("Invalid slot");
      if (!isValidFreqType(freq)) throw new TypeError("Invalid freq");
      const cmd = 1021 /* DELETE_SLOT_TAG_NICK */;
      const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
      await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd, data: b.pack("!BB", slot, freq) });
      await readResp();
      return true;
    } catch (err) {
      if (err.status === 112 /* FLASH_WRITE_FAIL */) return false;
      throw err;
    }
  }
  /**
   * Get enabled slots.
   * @returns Enabled slots.
   * @group Slot Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const enabledSlots = await ultra.cmdSlotGetIsEnable()
   *   console.log(JSON.stringify(enabledSlots))
   *   // [
   *   //   { "hf": true, "lf": true },
   *   //   { "hf": true, "lf": false },
   *   //   { "hf": false, "lf": true },
   *   //   { "hf": false, "lf": false },
   *   //   { "hf": false, "lf": false },
   *   //   { "hf": false, "lf": false },
   *   //   { "hf": false, "lf": false },
   *   //   { "hf": true, "lf": false }
   *   // ]
   * })(vm.ultra)
   * ```
   */
  async cmdSlotGetIsEnable() {
    const cmd = 1023 /* GET_ENABLED_SLOTS */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd });
    return SlotFreqIsEnable.fromCmd1023((await readResp()).data);
  }
  /**
   * Delete the emulation tag data of specified freq type in specified slot.
   * @param slot - The slot to be deleted.
   * @param freq - The freq type of slot.
   * @group Slot Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { Slot, FreqType } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   await ultra.cmdSlotDeleteFreqType(Slot.SLOT_1, FreqType.HF)
   * })(vm.ultra)
   * ```
   */
  async cmdSlotDeleteFreqType(slot, freq) {
    if (!isSlot(slot)) throw new TypeError("Invalid slot");
    if (!isValidFreqType(freq)) throw new TypeError("Invalid freq");
    const cmd = 1024 /* DELETE_SLOT_SENSE_TYPE */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd, data: b.pack("!BB", slot, freq) });
    await readResp();
  }
  /**
   * Get the battery info of device.
   * @returns The battery info of device.
   * @group Device Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const battery = await ultra.cmdGetBatteryInfo()
   *   console.log(JSON.stringify(battery)) // { "voltage": 4192, "level": 99 }
   * })(vm.ultra)
   * ```
   */
  async cmdGetBatteryInfo() {
    const cmd = 1025 /* GET_BATTERY_INFO */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd });
    return BatteryInfo.fromCmd1025((await readResp()).data);
  }
  /**
   * Get the button press action of specified button.
   * @param btn - The button to be get.
   * @returns The button press action of specified button.
   * @group Device Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { ButtonAction, ButtonType } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   const btnAction = await ultra.cmdGetButtonPressAction(ButtonType.BUTTON_A)
   *   console.log(ButtonAction[btnAction]) // 'CYCLE_SLOT_INC'
   * })(vm.ultra)
   * ```
   */
  async cmdGetButtonPressAction(btn) {
    if (!isButtonType(btn)) throw new TypeError("Invalid btn");
    const cmd = 1026 /* GET_BUTTON_PRESS_CONFIG */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd, data: b.pack("!B", btn) });
    return (await readResp()).data[0];
  }
  /**
   * Set the button press action of specified button.
   * @param btn - The button to be set.
   * @param action - The button press action to be set.
   * @group Device Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { ButtonAction, ButtonType } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   await ultra.cmdSetButtonPressAction(ButtonType.BUTTON_A, ButtonAction.CYCLE_SLOT_INC)
   * })(vm.ultra)
   * ```
   */
  async cmdSetButtonPressAction(btn, action) {
    if (!isButtonType(btn)) throw new TypeError("Invalid btn");
    if (!isButtonAction(action)) throw new TypeError("Invalid action");
    const cmd = 1027 /* SET_BUTTON_PRESS_CONFIG */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd, data: b.pack("!BB", btn, action) });
    await readResp();
  }
  /**
   * Get the button long press action of specified button.
   * @param btn - The button to be get.
   * @returns The button long press action of specified button.
   * @group Device Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { ButtonAction, ButtonType } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   const btnAction = await ultra.cmdGetButtonLongPressAction(ButtonType.BUTTON_A)
   *   console.log(ButtonAction[btnAction]) // 'CLONE_IC_UID'
   * })(vm.ultra)
   * ```
   */
  async cmdGetButtonLongPressAction(btn) {
    if (!isButtonType(btn)) throw new TypeError("Invalid btn");
    const cmd = 1028 /* GET_LONG_BUTTON_PRESS_CONFIG */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd, data: b.pack("!B", btn) });
    return (await readResp()).data[0];
  }
  /**
   * Set the button long press action of specified button.
   * @param btn - The button to be set.
   * @param action - The button long press action to be set.
   * @group Device Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { ButtonAction, ButtonType } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   await ultra.cmdSetButtonLongPressAction(ButtonType.BUTTON_A, ButtonAction.CYCLE_SLOT_INC)
   * })(vm.ultra)
   * ```
   */
  async cmdSetButtonLongPressAction(btn, action) {
    if (!isButtonType(btn)) throw new TypeError("Invalid btn");
    if (!isButtonAction(action)) throw new TypeError("Invalid action");
    const cmd = 1029 /* SET_LONG_BUTTON_PRESS_CONFIG */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd, data: b.pack("!BB", btn, action) });
    await readResp();
  }
  /**
   * Set the ble pairing key of device.
   * @param key - The new ble pairing key.
   * @group Device Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   await ultra.cmdBleSetPairingKey('123456')
   * })(vm.ultra)
   * ```
   */
  async cmdBleSetPairingKey(key) {
    if (!isString_default(key) || !/^\d{6}$/.test(key)) throw new TypeError("Invalid key, must be 6 digits");
    const cmd = 1030 /* SET_BLE_PAIRING_KEY */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd, data: b.from(key) });
    await readResp();
  }
  /**
   * Get current ble pairing key of device.
   * @returns The ble pairing key.
   * @group Device Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   console.log(await ultra.cmdBleGetPairingKey()) // '123456'
   * })(vm.ultra)
   * ```
   */
  async cmdBleGetPairingKey() {
    const cmd = 1031 /* GET_BLE_PAIRING_KEY */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd });
    return (await readResp()).data.toString("utf8");
  }
  /**
   * Delete all ble bindings.
   * @group Device Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   await ultra.cmdBleDeleteAllBonds()
   * })(vm.ultra)
   * ```
   */
  async cmdBleDeleteAllBonds() {
    const cmd = 1032 /* DELETE_ALL_BLE_BONDS */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd });
    await readResp();
  }
  /**
   * Get the device is ChameleonUltra or ChameleonLite.
   * @group Device Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { DeviceModel } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   const model = await ultra.cmdGetDeviceModel()
   *   console.log(DeviceModel[model]) // 'ULTRA'
   * })(vm.ultra)
   * ```
   */
  async cmdGetDeviceModel() {
    const cmd = 1033 /* GET_DEVICE_MODEL */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd });
    return (await readResp()).data[0];
  }
  /**
   * Get the settings of device.
   * @returns The settings of device.
   * @group Device Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const settings = await ultra.cmdGetDeviceSettings()
   *   console.log(JSON.stringify(settings))
   *   /**
   *    * {
   *    *   "version": 5,
   *    *   "animation": 0,
   *    *   "buttonPressAction": [1, 2],
   *    *   "buttonLongPressAction": [3, 3],
   *    *   "blePairingMode": false,
   *    *   "blePairingKey": "123456"
   *    * }
   *    *\/
   * })(vm.ultra)
   * ```
   */
  async cmdGetDeviceSettings() {
    const cmd = 1034 /* GET_DEVICE_SETTINGS */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd });
    return DeviceSettings.fromCmd1034((await readResp()).data);
  }
  /**
   * Get the cmds supported by device.
   * @returns The cmds supported by device.
   * @group Device Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const cmds = await ultra.cmdGetSupportedCmds()
   *   console.log(cmds.size) // 67
   * })(vm.ultra)
   * ```
   */
  async cmdGetSupportedCmds() {
    const cmd = 1035 /* GET_DEVICE_CAPABILITIES */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd });
    const data = (await readResp()).data;
    const cmds = /* @__PURE__ */ new Set();
    for (let i = 0; i < data.length; i += 2) cmds.add(data.readUInt16BE(i));
    return cmds;
  }
  /**
   * To check if the specified cmd is supported by device.
   * @returns `true` if the specified cmd is supported by device, otherwise return `false`.
   * @group Device Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { Cmd } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   console.log(await ultra.isCmdSupported(Cmd.GET_APP_VERSION)) // true
   * })(vm.ultra)
   * ```
   */
  async isCmdSupported(cmd) {
    if (__privateGet(this, _supportedCmds).size === 0) __privateSet(this, _supportedCmds, await this.cmdGetSupportedCmds());
    return __privateGet(this, _supportedCmds).has(cmd);
  }
  /**
   * Get the ble pairing mode of device.
   * @returns `true` if pairing is required to connect to device, otherwise return `false`.
   * @group Device Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   console.log(await ultra.cmdBleGetPairingMode()) // false
   * })(vm.ultra)
   * ```
   */
  async cmdBleGetPairingMode() {
    const cmd = 1036 /* GET_BLE_PAIRING_ENABLE */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd });
    return (await readResp()).data[0] === 1;
  }
  /**
   * Set if the ble pairing is required when connecting to device.
   * @param enable - `true` to enable pairing mode, `false` to disable pairing mode.
   * @group Device Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   await ultra.cmdBleSetPairingMode(false)
   * })(vm.ultra)
   * ```
   */
  async cmdBleSetPairingMode(enable) {
    if (isNil_default(enable)) throw new TypeError("enable is required");
    const cmd = 1037 /* SET_BLE_PAIRING_ENABLE */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd, data: b.pack("!?", enable) });
    await readResp();
  }
  /**
   * Retrieves the nicknames for all frequency types (HF and LF) across all slots.
   * @group Slot Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { Slot, FreqType } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   const resp = await ultra.cmdSlotGetFreqNames()
   *   console.log(resp[Slot.SLOT_1][FreqType.HF]) // 'My Tag'
   * })(vm.ultra)
   * ```
   */
  async cmdSlotGetFreqNames() {
    const cmd = 1038 /* GET_ALL_SLOT_NICKS */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd });
    let data = (await readResp())?.data;
    const resp = [];
    for (let slot = 0; slot < 8; slot++) {
      const freqNames = {};
      for (const freq of [2 /* HF */, 1 /* LF */]) {
        let name;
        if (data.length >= 1) {
          if (data[0] > 0) name = data.subarray(1, 1 + data[0]).toString("utf8");
          data = data.subarray(1 + data[0]);
        }
        freqNames[freq] = name;
      }
      resp.push(freqNames);
    }
    return resp;
  }
  /**
   * Scan 14a tag, and return basic information. The device mode must be set to READER before using this command.
   * @returns The basic infomation of scanned tag.
   * @throws This command will throw an error if tag not scanned or any error occured.
   * @group Reader/Writer Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const antiColl = _.first(await ultra.cmdHf14aScan())
   *   console.log(_.mapValues(antiColl, val => val.toString('hex')))
   *   // { uid: '040dc4420d2981', atqa: '4400', sak: '00', ats: ''}
   * })(vm.ultra)
   * ```
   */
  async cmdHf14aScan() {
    await this.assureDeviceMode(1 /* READER */);
    const cmd = 2e3 /* HF14A_SCAN */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd });
    return Hf14aAntiColl.fromCmd2000((await readResp()).data);
  }
  /**
   * Test whether it is mifare classic tag.
   * @returns `true` if tag is mifare classic tag, otherwise return `false`.
   * @group Mifare Classic Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   console.log(await ultra.cmdMf1IsSupport()) // true
   * })(vm.ultra)
   * ```
   */
  async cmdMf1IsSupport() {
    try {
      await this.assureDeviceMode(1 /* READER */);
      const cmd = 2001 /* MF1_DETECT_SUPPORT */;
      const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
      await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd });
      await readResp();
      return true;
    } catch (err) {
      if (err.status === 2 /* HF_ERR_STAT */) return false;
      throw err;
    }
  }
  /**
   * Check the nt level of mifare protocol.
   * @returns The nt level of mifare protocol.
   * @group Mifare Classic Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { Mf1PrngType } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   console.log(Mf1PrngType[await ultra.cmdMf1TestPrngType()]) // 'WEAK'
   * })(vm.ultra)
   * ```
   */
  async cmdMf1TestPrngType() {
    await this.assureDeviceMode(1 /* READER */);
    const cmd = 2002 /* MF1_DETECT_PRNG */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd });
    return (await readResp()).data[0];
  }
  /**
   * Use a known key to do the mifare static nested attack.
   * @param known - The known `block`, `keyType` and `key`.
   * @param target - The info of target key to be attack.
   * @param target.block - The block of target key.
   * @param target.keyType - The key type of target key.
   * @returns The result of mifare static nested attack.
   * @group Mifare Classic Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { Buffer, Mf1KeyType } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   const key = Buffer.from('FFFFFFFFFFFF', 'hex')
   *   const res1 = await ultra.cmdMf1AcquireStaticNested({
   *     block: 0,
   *     keyType: Mf1KeyType.KEY_A,
   *     key
   *   }, {
   *     block: 4,
   *     keyType: Mf1KeyType.KEY_A
   *   })
   *   const res = {
   *     uid: res1.uid.toString('hex'),
   *     atks: _.map(res1.atks, item => ({ nt1: item.nt1.toString('hex'), nt2: item.nt2.toString('hex') })),
   *   }
   *   console.log(res)
   *   // {
   *   //   uid: 'b908a16d',
   *   //   atks: [
   *   //     { nt1: '01200145', nt2: '81901975' },
   *   //     { nt1: '01200145', nt2: 'cdd400f3' },
   *   //   ],
   *   // }
   * })(vm.ultra)
   * ```
   */
  async cmdMf1AcquireStaticNested(known, target) {
    validateMf1BlockKey(known.block, known.keyType, known.key, "known.");
    if (!isMf1BlockNo(target.block)) throw new TypeError("Invalid target.block");
    if (!isMf1KeyType(target.keyType)) throw new TypeError("Invalid target.keyType");
    await this.assureDeviceMode(1 /* READER */);
    const cmd = 2003 /* MF1_STATIC_NESTED_ACQUIRE */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd, data: b.pack("!BB6sBB", known.keyType, known.block, known.key, target.keyType, target.block) });
    return Mf1AcquireStaticNestedRes.fromCmd2003((await readResp()).data);
  }
  /**
   * Acquire the data from mifare darkside attack.
   * @param block - The target block.
   * @param keyType - The target key type.
   * @param isFirst - `true` if this is the first attack.
   * @param syncMax - The max sync count of darkside attack.
   * @returns The data from mifare darkside attack.
   * @group Mifare Classic Related
   * @see [THE DARK SIDE OF SECURITY BY OBSCURITY and Cloning MiFare Classic Rail and Building Passes, Anywhere, Anytime](https://eprint.iacr.org/2009/137)
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { Mf1KeyType, DarksideStatus } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   const res1 = await ultra.cmdMf1AcquireDarkside(0, Mf1KeyType.KEY_A, true)
   *   console.log(res1)
   *   const res2 = {
   *     status: `${DarksideStatus[res1.status]} (${res1.status})`,
   *     ...(res1.status !== DarksideStatus.OK ? {} : {
   *       ar: res1.ar.toString('hex'),
   *       ks: res1.ks.toString('hex'),
   *       nr: res1.nr.toString('hex'),
   *       nt: res1.nt.toString('hex'),
   *       par: res1.par.toString('hex'),
   *       uid: res1.uid.toString('hex'),
   *     }),
   *   }
   *   console.log(res2)
   *   // {
   *   //   "ar": "00000000",
   *   //   "ks": "0c0508080f04050a",
   *   //   "nr": "00000000",
   *   //   "nt": "b346fc3d",
   *   //   "par": "0000000000000000",
   *   //   "status": "OK (0)",
   *   //   "uid": "d3efed0c"
   *   // }
   * })(vm.ultra)
   * ```
   *
   * If you want to use darkside attack to recover the key, you can use the following example code:
   *
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { Buffer, DarksideStatus, Mf1KeyType } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   const block = 0
   *   const keyType = Mf1KeyType.KEY_A
   *   const key = await Crypto1.darkside(
   *     async attempt => {
   *       const acquired = await ultra.cmdMf1AcquireDarkside(block, keyType, attempt === 0)
   *       console.log(_.mapValues(acquired, buf => Buffer.isBuffer(buf) ? buf.toString('hex') : buf))
   *       if (acquired.status === DarksideStatus.LUCKY_AUTH_OK) throw new Error('LUCKY_AUTH_OK')
   *       if (acquired.status !== DarksideStatus.OK) throw new Error('card is not vulnerable to Darkside attack')
   *       return acquired
   *     },
   *     async key => {
   *       return await ultra.cmdMf1CheckBlockKey({ block, keyType, key })
   *     },
   *   )
   *   console.log(`key founded: ${key.toString('hex')}`)
   * })(vm.ultra)
   * ```
   */
  async cmdMf1AcquireDarkside(block, keyType, isFirst, syncMax = 30) {
    if (!isSafeInteger_default(block)) throw new TypeError("Invalid block");
    if (!isMf1KeyType(keyType)) throw new TypeError("Invalid keyType");
    if (isNil_default(isFirst)) throw new TypeError("Invalid isFirst");
    if (!isSafeInteger_default(syncMax)) throw new TypeError("Invalid syncMax");
    await this.assureDeviceMode(1 /* READER */);
    const cmd = 2004 /* MF1_DARKSIDE_ACQUIRE */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd, timeout: syncMax * 1e4 });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd, data: b.pack("!BB?B", keyType, block, isFirst, syncMax) });
    return Mf1DarksideRes.fromCmd2004((await readResp()).data);
  }
  /**
   * Dectect the nt distance of mifare protocol.
   * @param known - The info of known key.
   * @param known.block - The block of known key.
   * @param known.key - The known key.
   * @param known.keyType - The key type of known key.
   * @returns The nt distance of mifare protocol.
   * @group Mifare Classic Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { Buffer, Mf1KeyType } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   const key = Buffer.from('FFFFFFFFFFFF', 'hex')
   *   const res1 = await ultra.cmdMf1TestNtDistance({ block: 0, keyType: Mf1KeyType.KEY_A, key })
   *   const res2 = await ultra.cmdMf1AcquireNested(
   *     { block: 0, keyType: Mf1KeyType.KEY_A, key },
   *     { block: 4, keyType: Mf1KeyType.KEY_A },
   *   )
   *   const res = {
   *     uid: res1.uid.toString('hex'),
   *     dist: res1.dist.toString('hex'),
   *     atks: _.map(res2, item => ({
   *       nt1: item.nt1.toString('hex'),
   *       nt2: item.nt2.toString('hex'),
   *       par: item.par,
   *     }))
   *   }
   *   console.log(res)
   *   // {
   *   //   uid: '877209e1',
   *   //   dist: '00000080',
   *   //   atks: [
   *   //     { nt1: '35141fcb', nt2: '40430522', par: 7 },
   *   //     { nt1: 'cff2b3ef', nt2: '825ba8ea', par: 5 },
   *   //   ]
   *   // }
   * })(vm.ultra)
   * ```
   */
  async cmdMf1TestNtDistance(known) {
    validateMf1BlockKey(known.block, known.keyType, known.key, "known.");
    await this.assureDeviceMode(1 /* READER */);
    const cmd = 2005 /* MF1_DETECT_NT_DIST */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd, data: b.pack("!BB6s", known.keyType, known.block, known.key) });
    return Mf1NtDistanceRes.fromCmd2005((await readResp()).data);
  }
  /**
   * Use a known key to do the mifare nested attack.
   * @param known - The known `block`, `keyType` and `key`.
   * @param target - The info of target key to be attack.
   * @param target.block - The block of target key.
   * @param target.keyType - The key type of target key.
   * @returns The result of mifare nested attack.
   * - nt1: Unblocked explicitly random number
   * - nt2: Random number of nested verification encryption
   * - par: The 3 parity bit of nested verification encryption
   * @group Mifare Classic Related
   * @see [Wirelessly Pickpocketing a Mifare Classic Card](http://proxmark.org/files/Documents/13.56%20MHz%20-%20MIFARE%20Classic/Wirelessly.Pickpocketing.a.Mifare.Classic.Card-IEEE.2009.pdf)
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { Buffer, Mf1KeyType } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   const key = Buffer.from('FFFFFFFFFFFF', 'hex')
   *   const res1 = await ultra.cmdMf1TestNtDistance({ block: 0, keyType: Mf1KeyType.KEY_A, key })
   *   const res2 = await ultra.cmdMf1AcquireNested(
   *     { block: 0, keyType: Mf1KeyType.KEY_A, key },
   *     { block: 4, keyType: Mf1KeyType.KEY_A },
   *   )
   *   const res = {
   *     uid: res1.uid.toString('hex'),
   *     dist: res1.dist.toString('hex'),
   *     atks: res2,
   *   }
   *   console.log(res)
   *   // {
   *   //   uid: '877209e1',
   *   //   dist: '00000080',
   *   //   atks: [
   *   //     { nt1: 0x35141FCB, nt2: 0x40430522, par: 7 },
   *   //     { nt1: 0xCFF2B3EF, nt2: 0x825BA8EA, par: 5 },
   *   //   ]
   *   // }
   * })(vm.ultra)
   * ```
   */
  async cmdMf1AcquireNested(known, target) {
    validateMf1BlockKey(known.block, known.keyType, known.key, "known.");
    if (!isSafeInteger_default(target.block)) throw new TypeError("Invalid target.block");
    if (!isMf1KeyType(target.keyType)) throw new TypeError("Invalid target.keyType");
    await this.assureDeviceMode(1 /* READER */);
    const cmd = 2006 /* MF1_NESTED_ACQUIRE */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd, data: b.pack("!BB6sBB", known.keyType, known.block, known.key, target.keyType, target.block) });
    return Mf1NestedRes.fromCmd2006((await readResp()).data);
  }
  /**
   * Check if the key is valid for specified block and key type.
   * @param known - The known `block`, `keyType` and `key`.
   * @returns `true` if the key is valid for specified block and key type.
   * @group Mifare Classic Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { Buffer, Mf1KeyType } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   const key = Buffer.from('FFFFFFFFFFFF', 'hex')
   *   console.log(await ultra.cmdMf1CheckBlockKey({
   *     block: 0,
   *     keyType: Mf1KeyType.KEY_A,
   *     key,
   *   })) // true
   * })(vm.ultra)
   * ```
   */
  async cmdMf1CheckBlockKey(known) {
    const { block, keyType, key } = known;
    try {
      validateMf1BlockKey(block, keyType, key);
      await this.assureDeviceMode(1 /* READER */);
      const cmd = 2007 /* MF1_AUTH_ONE_KEY_BLOCK */;
      const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
      await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd, data: b.pack("!BB6s", keyType, block, key) });
      await readResp();
      return true;
    } catch (err) {
      if (err.status === 6 /* MF_ERR_AUTH */) return false;
      throw err;
    }
  }
  /**
   * Read block data from a mifare tag.
   * @param known - The known `block`, `keyType` and `key`.
   * @returns The block data read from a mifare tag.
   * @group Mifare Classic Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { Buffer, Mf1KeyType } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   const key = Buffer.from('FFFFFFFFFFFF', 'hex')
   *   const block1 = await ultra.cmdMf1ReadBlock({
   *     block: 1,
   *     keyType: Mf1KeyType.KEY_A,
   *     key,
   *   })
   *   console.log(block1.toString('hex')) // '00000000000000000000000000000000'
   * })(vm.ultra)
   * ```
   */
  async cmdMf1ReadBlock(known) {
    const { block, keyType, key } = known;
    validateMf1BlockKey(block, keyType, key);
    await this.assureDeviceMode(1 /* READER */);
    const cmd = 2008 /* MF1_READ_ONE_BLOCK */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd, data: b.pack("!BB6s", keyType, block, key) });
    return (await readResp()).data;
  }
  /**
   * Write data to a mifare tag.
   * @param opts - The block to be written and the key info of the block.
   * @param opts.block - The block to be written.
   * @param opts.keyType - The key type of the block.
   * @param opts.key - The key of the block.
   * @param opts.data - The block data to be written.
   * @group Mifare Classic Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { Buffer, Mf1KeyType } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   const key = Buffer.from('FFFFFFFFFFFF', 'hex')
   *   const block1 = Buffer.from('00000000000000000000000000000000', 'hex')
   *   await ultra.cmdMf1WriteBlock({
   *     block: 1,
   *     keyType: Mf1KeyType.KEY_A,
   *     key,
   *     data: block1,
   *   })
   * })(vm.ultra)
   * ```
   */
  async cmdMf1WriteBlock(opts) {
    const { block, keyType, key, data } = opts;
    validateMf1BlockKey(block, keyType, key);
    bufIsLenOrFail(data, 16, "data");
    await this.assureDeviceMode(1 /* READER */);
    const cmd = 2009 /* MF1_WRITE_ONE_BLOCK */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd, data: b.pack("!BB6s16s", keyType, block, key, data) });
    await readResp();
  }
  /**
   * Get the info composed of `cmdHf14aScan()` and `cmdMf1TestNtLevel()`.
   * @returns The info about 14a tag and mifare protocol.
   * @group Reader/Writer Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { Mf1PrngType } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   const tag = _.first(await ultra.hf14aInfo())
   *   console.log(tag.nxpTypeBySak) // 'MIFARE Classic 1K | Plus SE 1K | Plug S 2K | Plus X 2K'
   *   console.log(Mf1PrngType[tag.prngType]) // 'WEAK'
   *   console.log(_.mapValues(tag.antiColl, val => val.toString('hex')))
   *   // { uid: 'dbe3d63d', atqa: '0400', sak: '08', ats: '' }
   * })(vm.ultra)
   * ```
   */
  async hf14aInfo() {
    const items = [];
    const antiColls = await this.cmdHf14aScan();
    for (const antiColl of antiColls) {
      const item = { antiColl, nxpTypeBySak: NxpTypeBySak.get(antiColl.sak[0]) };
      items.push(item);
    }
    if (antiColls.length === 1 && await this.cmdMf1IsSupport()) {
      items[0].prngType = await this.cmdMf1TestPrngType();
    }
    return items;
  }
  /**
   * Send raw NfcA data to a tag and receive the response.
   * @param opts.activateRfField - Set `true` to activate RF field. If `data` is not empty or `autoSelect` is true, `activateRfField` will be set to `true`.
   * @param opts.appendCrc - Set `true` to add CRC before sending data.
   * @param opts.autoSelect - Set `true` to automatically select card before sending data.
   * @param opts.checkResponseCrc - Set `true` to verify CRC of response and remove. If CRC of response is valid, CRC will be removed from response, otherwise will throw HF_ERR_CRC error.
   * @param opts.data - The data to be send. If `appendCrc` is `true`, the maximum length of data is `62`, otherwise is `64`.
   * @param opts.dataBitLength - Number of bits to send. Useful for send partial byte. `dataBitLength` is incompatible with `appendCrc`.
   * @param opts.keepRfField - Set `true` to keep the RF field active after sending.
   * @param opts.waitResponse - Default value is `true`. Set `false` to skip reading tag response.
   * @param opts.timeout - Default value is `1000 ms`. Maximum timeout for reading tag response in ms while `waitResponse` is `true`.
   * @returns The response from tag.
   * @group Reader/Writer Related
   */
  async cmdHf14aRaw(opts) {
    let {
      activateRfField = false,
      waitResponse = true,
      appendCrc = false,
      autoSelect = false,
      keepRfField = false,
      checkResponseCrc = false,
      dataBitLength = 0,
      timeout = 1e3,
      data = new b()
    } = opts;
    if (!b.isBuffer(data)) throw new TypeError("data must be a Buffer");
    if (!isSafeInteger_default(timeout)) throw new TypeError("Invalid timeout");
    if (!isSafeInteger_default(dataBitLength)) throw new TypeError("Invalid dataBitLength");
    dataBitLength = (data.length - 1) * 8 + (dataBitLength + 7) % 8 + 1;
    const buf1 = b.pack(`!xHH${data.length}s`, timeout, dataBitLength, data);
    for (const [bitOffset, val] of [
      [0, activateRfField],
      [1, waitResponse],
      [2, appendCrc],
      [3, autoSelect],
      [4, keepRfField],
      [5, checkResponseCrc]
    ]) buf1.writeBitMSB(val, bitOffset);
    await this.assureDeviceMode(1 /* READER */);
    const cmd = 2010 /* HF14A_RAW */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd, timeout: READ_DEFAULT_TIMEOUT + timeout });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd, data: buf1 });
    return (await readResp()).data;
  }
  /**
   * MIFARE Classic manipulate value block
   *
   * - Decrement: decrement value by `X` (`0` ~ `2147483647`) from src to dst
   * - Increment: increment value by `X` (`0` ~ `2147483647`) from src to dst
   * - Restore: copy value from src to dst (Restore and Transfer)
   *
   * @param src - The source `block`, `keyType` and `key`.
   * @param operator - The operator of value block.
   * @param operand - The operand of value block.
   * @param dst - The destination `block`, `keyType` and `key`.
   * @group Mifare Classic Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { Buffer, Mf1KeyType, Mf1VblockOperator } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   const key = Buffer.from('FFFFFFFFFFFF', 'hex')
   *   const src = { block: 4, keyType: Mf1KeyType.KEY_A, key }
   *   await ultra.mf1VblockSetValue(src, { value: 2 })
   *   console.log(await ultra.mf1VblockGetValue(src))
   *   await ultra.cmdMf1VblockManipulate(
   *     { block: 4, keyType: Mf1KeyType.KEY_A, key },
   *     Mf1VblockOperator.DECREMENT, 1,
   *     { block: 4, keyType: Mf1KeyType.KEY_A, key },
   *   )
   *   console.log(await ultra.mf1VblockGetValue(src))
   * })(vm.ultra)
   * ```
   */
  async cmdMf1VblockManipulate(src, operator, operand, dst) {
    validateMf1BlockKey(src.block, src.keyType, src.key, "src.");
    validateMf1BlockKey(dst.block, dst.keyType, dst.key, "dst.");
    if (!isMf1VblockOperator(operator)) throw new TypeError("Invalid operator");
    if (!isSafeInteger_default(operand)) throw new TypeError("Invalid operand");
    await this.assureDeviceMode(1 /* READER */);
    const cmd = 2011 /* MF1_MANIPULATE_VALUE_BLOCK */;
    const data = b.pack("!BB6sBiBB6s", src.keyType, src.block, src.key, operator, operand, dst.keyType, dst.block, dst.key);
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd, data });
    await readResp();
  }
  /**
   * Get value from `opts` block (MIFARE Classic value block)
   * @returns The value and address of `opts` block.
   * @group Mifare Classic Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { Buffer, Mf1KeyType, Mf1VblockOperator } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   const key = Buffer.from('FFFFFFFFFFFF', 'hex')
   *   const src = { block: 4, keyType: Mf1KeyType.KEY_A, key }
   *   await ultra.mf1VblockSetValue(src, { value: 2 })
   *   console.log(await ultra.mf1VblockGetValue(src))
   * })(vm.ultra)
   * ```
   */
  async mf1VblockGetValue(known) {
    const blkDt = await this.cmdMf1ReadBlock(known);
    const [val1, val2, val3] = times_default(3, (i) => blkDt.readInt32LE(i * 4));
    if (val1 !== val3 || val1 + val2 !== -1) throw new Error(`Invalid value of value block: ${blkDt.toString("hex")}`);
    const [adr1, adr2, adr3, adr4] = blkDt.subarray(12, 16);
    if (adr1 !== adr3 || adr2 !== adr4 || adr1 + adr2 !== 255) throw new Error(`Invalid address of value block: ${blkDt.toString("hex")}`);
    return { adr: adr1, value: val1 };
  }
  /**
   * Set value X (-2147483647 ~ 2147483647) to `dst` block (MIFARE Classic value block)
   * @param dst - The destination `block`, `keyType` and `key`.
   * @param val - The value and address to be set.
   * @param val.value - The value to be set. Default is `0`.
   * @param val.adr - The address to be set. Default is `dst.block`.
   * @group Mifare Classic Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { Buffer, Mf1KeyType, Mf1VblockOperator } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   const key = Buffer.from('FFFFFFFFFFFF', 'hex')
   *   const src = { block: 4, keyType: Mf1KeyType.KEY_A, key }
   *   await ultra.mf1VblockSetValue(src, { value: 2 })
   *   console.log(await ultra.mf1VblockGetValue(src))
   * })(vm.ultra)
   * ```
   */
  async mf1VblockSetValue(dst, val) {
    const blkDt = new b(16);
    const { value: val1 = 0, adr: adr1 = dst.block } = val;
    if (!isSafeInteger_default(val1)) throw new TypeError("Invalid val.value");
    const [val2, adr2] = [-val1 - 1, 255 - adr1];
    blkDt.writeInt32LE(val1, 0).writeInt32LE(val2, 4).writeInt32LE(val1, 8);
    blkDt[12] = blkDt[14] = adr1;
    blkDt[13] = blkDt[15] = adr2;
    await this.cmdMf1WriteBlock({ ...dst, data: blkDt });
  }
  /**
   * Given a list of keys, check which is the correct key A and key B of the sectors. If you want to check more than 83 keys, you can use `mf1CheckKeysOfSectors()`.
   * @param opts.keys - The keys to be checked. Maximum length is `83`.
   * @param opts.mask - The mask of sectors. 80 bits, 2 bits/sector, the first bit is key A, the second bit is key B, `0b1` represent to skip checking the key.
   * @returns
   * - `found`: 80 bits, 2 bits/sector, the first bit is key A, the second bit is key B, `0b1` represent key is found.
   * - `sectorKeys`: 80 keys, 2 keys/sector, the first key is key A, the second key is key B. `null` represent key is not found.
   * @group Mifare Classic Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { Buffer } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   const mask = Buffer.from('00000000FFFFFFFFFFFF', 'hex')
   *   const keys = Buffer.from('FFFFFFFFFFFF\n000000000000\nA0A1A2A3A4A5\nD3F7D3F7D3F7', 'hex').chunk(6)
   *   const tsStart = Date.now()
   *   const result = await ultra.cmdMf1CheckKeysOfSectors({ keys, mask })
   *   console.log(`Time: ${Date.now() - tsStart}ms`)
   *   const replacer = function (k, v) { return Buffer.isBuffer(this[k]) ? this[k].toString('hex') : v }
   *   console.log(JSON.stringify(result, replacer, 2))
   * })(vm.ultra)
   * // {
   * //   "found": "ffffffff000000000000",
   * //   "sectorKeys": [
   * //     "ffffffffffff", "ffffffffffff", "ffffffffffff", "ffffffffffff",
   * //     "ffffffffffff", "ffffffffffff", "ffffffffffff", "ffffffffffff",
   * //     "ffffffffffff", "ffffffffffff", "ffffffffffff", "ffffffffffff",
   * //     "ffffffffffff", "ffffffffffff", "ffffffffffff", "ffffffffffff",
   * //     "ffffffffffff", "ffffffffffff", "ffffffffffff", "ffffffffffff",
   * //     "ffffffffffff", "ffffffffffff", "ffffffffffff", "ffffffffffff",
   * //     "ffffffffffff", "ffffffffffff", "ffffffffffff", "ffffffffffff",
   * //     "ffffffffffff", "ffffffffffff", "ffffffffffff", "ffffffffffff",
   * //     null, null, null, null,
   * //     null, null, null, null,
   * //     null, null, null, null,
   * //     null, null, null, null,
   * //     null, null, null, null,
   * //     null, null, null, null,
   * //     null, null, null, null,
   * //     null, null, null, null,
   * //     null, null, null, null,
   * //     null, null, null, null,
   * //     null, null, null, null,
   * //     null, null, null, null,
   * //   ]
   * // }
   * ```
   */
  async cmdMf1CheckKeysOfSectors(opts) {
    opts.keys = _ChameleonUltra.mf1UniqueKeys(opts.keys);
    const { keys: keys2, mask } = opts;
    bufIsLenOrFail(mask, 10, "mask");
    if (keys2.length < 1 || keys2.length > calcUltraMaxItemSize(BYTES_PER_MF1_KEY, 10)) throw new TypeError(`Invalid keys.length = ${keys2.length}`);
    let bitsCnt = 80;
    for (let b2 of mask) while (b2 > 0) [bitsCnt, b2] = [bitsCnt - (b2 & 1), b2 >>> 1];
    if (bitsCnt < 1) return null;
    await this.assureDeviceMode(1 /* READER */);
    const cmd = 2012 /* MF1_CHECK_KEYS_OF_SECTORS */;
    const data = b.concat([mask, ...keys2]);
    const timeout = READ_DEFAULT_TIMEOUT + bitsCnt * (keys2.length + 1) * 100;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd, timeout });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd, data });
    return Mf1CheckKeysOfSectorsRes.fromCmd2012((await readResp()).data);
  }
  /**
   * Use a known key to do the mifare hardnested attack.
   * @param known - The known `block`, `keyType` and `key`.
   * @param target - The info of target key to be attack.
   * @param target.block - The block of target key.
   * @param target.keyType - The key type of target key.
   * @param target.slow - Is it a low-speed acquisition mode? Low-speed acquisition is suitable for some non-standard cards.
   * @returns The result of mifare hardnested attack.
   * - nt: tag nonce of nested authentication
   * - ntEnc: encrypted tag nonce of nested authentication
   * - par: The 8 parity bit of nested authentication
   * @group Mifare Classic Related
   * @see [Ciphertext-only Cryptanalysis on Hardened Mifare Classic Cards](http://proxmark.org/files/Documents/13.56%20MHz%20-%20MIFARE%20Classic/Ciphertext_only_cryptanalysis_on_hardened_mfc_cards_Carlos_Meijer.pdf)
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { Buffer, Mf1KeyType } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   const antiColl = _.first(await ultra.cmdHf14aScan())
   *   const key = Buffer.from('FFFFFFFFFFFF', 'hex')
   *   const res = await ultra.cmdMf1AcquireHardNested(
   *     { block: 0, keyType: Mf1KeyType.KEY_A, key },
   *     { block: 4, keyType: Mf1KeyType.KEY_A },
   *   )
   *   console.log(res)
   *   // [
   *   //   { nt: 0xCE178123, ntEnc: 0x37ADDC14, par: 0xB8 },
   *   //   { nt: 0xD9380BBF, ntEnc: 0x0080795A, par: 0xF3 },
   *   //   // ...
   *   // ]
   * })(vm.ultra)
   * ```
   */
  async cmdMf1AcquireHardNested(known, target) {
    validateMf1BlockKey(known.block, known.keyType, known.key, "known.");
    if (!isSafeInteger_default(target.block)) throw new TypeError("Invalid target.block");
    if (!isMf1KeyType(target.keyType)) throw new TypeError("Invalid target.keyType");
    target.slow = Boolean(target.slow ?? false);
    await this.assureDeviceMode(1 /* READER */);
    const cmd = 2013 /* MF1_HARDNESTED_ACQUIRE */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd, data: b.pack("!BBB6sBB", target.slow, known.keyType, known.block, known.key, target.keyType, target.block) });
    return Mf1AcquireHardNestedRes.fromCmd2013((await readResp()).data);
  }
  /**
   * Execute nested attack against FUDAN static encrypted nonce cards (FM11RF08/FM11RF08S).
   * @param opts.key - FUDAN backdoor key, currently known: `A396EFA4E24F` (default), `A31667A8CEC1`, `518B3354E760`.
   * @group Mifare Classic Related
   * @see [MIFARE Classic: exposing the static encrypted nonce variant](https://eprint.iacr.org/2024/1275)
   */
  async cmdMf1AcquireStaticEncryptedNested(opts) {
    const { key = b.from("A396EFA4E24F", "hex"), startSector = 0, maxSectors = 16 } = opts;
    bufIsLenOrFail(key, BYTES_PER_MF1_KEY, "key");
    const data = b.pack("!6sBB", key, maxSectors, startSector);
    await this.assureDeviceMode(1 /* READER */);
    const cmd = 2014 /* MF1_ENC_NESTED_ACQUIRE */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd, data });
    return Mf1AcquireStaticEncryptedNestedDecoder.fromCmd2014(startSector, (await readResp()).data);
  }
  /**
   * Check keys for specified block and key type.
   * @param opts.block - The block number to check.
   * @param opts.keyType - The key type to check.
   * @param opts.keys - The keys to check.
   * @returns The found key.
   * @group Mifare Classic Related
   * @example
   * ```
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { Buffer, Mf1KeyType } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   const keys = Buffer.from('A0A1A2A3A4A5\nD3F7D3F7D3F7\nFFFFFFFFFFFF', 'hex').chunk(6)
   *   const tsStart = Date.now()
   *   const key = await ultra.cmdMf1CheckKeysOfBlock({ block: 3, keyType: Mf1KeyType.KEY_A, keys })
   *   console.log(`elapsed time: ${Date.now() - tsStart}ms, found key: ${key.toString('hex')}`)
   * })(vm.ultra)
   * ```
   */
  async cmdMf1CheckKeysOfBlock(opts) {
    opts.keys = _ChameleonUltra.mf1UniqueKeys(opts.keys);
    const { block, keyType, keys: keys2 } = opts;
    if (!isMf1BlockNo(block)) throw new TypeError("opts.block should be a integer");
    if (!isMf1KeyType(keyType)) throw new TypeError("opts.keyType should be a Mf1KeyType");
    if (keys2.length < 1 || keys2.length > calcUltraMaxItemSize(BYTES_PER_MF1_KEY, 3)) throw new TypeError("Invalid opts.keys.length");
    await this.assureDeviceMode(1 /* READER */);
    const cmd = 2015 /* MF1_CHECK_KEYS_ON_BLOCK */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    const data = b.concat([b.pack("!BBB", block, keyType, keys2.length), ...keys2]);
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd, data });
    return (await readResp())?.data.subarray(1);
  }
  /**
   * Get hf14a settings for scanning tags.
   * @returns
   * - `bcc`: The BCC mode.
   * - `cl2`: The cascade level 2 mode.
   * - `cl3`: The cascade level 3 mode.
   * - `rats`: The RATS mode.
   * @group Emulator Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const settings = await ultra.cmdHf14aGetSettings()
   *   console.log(JSON.stringify(settings))
   *   /* Example output:
   *   {"bcc":0,"cl2":0,"cl3":0,"rats":0}
   *   *\/
   * })(vm.ultra)
   * ```
  */
  async cmdHf14aGetSettings() {
    const cmd = 2200 /* HF14A_GET_CONFIG */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd });
    return Hf14aSettings.fromCmd2200((await readResp()).data);
  }
  /**
   * Set hf14a settings for scanning tags.
   * @param opts - The settings to be set.
   * @param opts.bcc - The BCC mode.
   * @param opts.cl2 - The cascade level 2 mode.
   * @param opts.cl3 - The cascade level 3 mode.
   * @param opts.rats - The RATS mode.
   * @group Emulator Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { Hf14aBccMode, Hf14aCascadeLevelMode, Hf14aRatsMode } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   const settings = {
   *     bcc: Hf14aBccMode.STANDARD,
   *     cl2: Hf14aCascadeLevelMode.STANDARD,
   *     cl3: Hf14aCascadeLevelMode.STANDARD,
   *     rats: Hf14aRatsMode.STANDARD,
   *   }
   *   await ultra.cmdHf14aSetSettings(settings)
   * })(vm.ultra)
   * ```
  */
  async cmdHf14aSetSettings(opts) {
    if (!isHf14aBccMode(opts.bcc)) throw new TypeError("Invalid opts.bcc");
    if (!isHf14aCascadeLevelMode(opts.cl2)) throw new TypeError("Invalid opts.cl2");
    if (!isHf14aCascadeLevelMode(opts.cl3)) throw new TypeError("Invalid opts.cl3");
    if (!isHf14aRatsMode(opts.rats)) throw new TypeError("Invalid opts.rats");
    const cmd = 2201 /* HF14A_SET_CONFIG */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    const data = b.concat([b.pack("!BBBB", opts.bcc, opts.cl2, opts.cl3, opts.rats)]);
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd, data });
    await readResp();
  }
  /**
   * Set/Get hf14a settings for scanning tags.
   * @param opts - The settings to be set.
   * @param opts.bcc - The BCC mode.
   * @param opts.cl2 - The cascade level 2 mode.
   * @param opts.cl3 - The cascade level 3 mode.
   * @param opts.rats - The RATS mode.
   * @returns
   * - `bcc`: The BCC mode.
   * - `cl2`: The cascade level 2 mode.
   * - `cl3`: The cascade level 3 mode.
   * - `rats`: The RATS mode.
   * @group Reader/Writer Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { Hf14aBccMode, Hf14aCascadeLevelMode, Hf14aRatsMode } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   const settings = await ultra.hf14aSettings({ bcc: Hf14aBccMode.STANDARD })
   *   console.log(JSON.stringify(settings))
   * })(vm.ultra)
   * ```
  */
  async hf14aSettings(opts) {
    if (!isEmpty_default(opts)) {
      const old = await this.cmdHf14aGetSettings();
      const new1 = { ...old, ...opts };
      if (!isEqual_default(old, new1)) await this.cmdHf14aSetSettings(new1);
    }
    return await this.cmdHf14aGetSettings();
  }
  /**
   * Scan em410x tag and read tag id
   * @returns The id of em410x tag.
   * @group Reader/Writer Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { TagType } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   const tag = await ultra.cmdEm410xScan()
   *   console.log({ tagType: TagType[tag.tagType], id: tag.id.toString('hex') }) // 'deadbeef88'
   * })(vm.ultra)
   * ```
   */
  async cmdEm410xScan() {
    await this.assureDeviceMode(1 /* READER */);
    const cmd = 3e3 /* EM410X_SCAN */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd });
    const data = (await readResp()).data;
    if (data.length === 5) return { tagType: 103 /* EM410X_64 */, id: data };
    const tagType = data.readUint16BE(0);
    const lfIdLen = TagTypeLfIdLen.get(tagType);
    if (isNil_default(lfIdLen)) throw new Error(`lfIdLen not defined, tagType = ${TagType[tagType]}`);
    return {
      tagType,
      id: data.subarray(2).subarray(0, lfIdLen)
    };
  }
  /**
   * Write id of em410x tag to t55xx tag.
   * @param id - The 5 bytes id of em410x tag.
   * @param newKey - The new key of t55xx tag.
   * @param oldKeys - The keys to be checked.
   * @group Reader/Writer Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { Buffer } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   const id = Buffer.from('deadbeef88', 'hex')
   *   // https://github.com/RfidResearchGroup/proxmark3/blob/master/client/dictionaries/t55xx_default_pwds.dic
   *   const newKey = Buffer.from('20206666', 'hex')
   *   const oldKeys = Buffer.from('5124364819920427', 'hex').chunk(4)
   *   await ultra.cmdEm410xWriteToT55xx(id, newKey, oldKeys)
   * })(vm.ultra)
   * ```
   */
  async cmdEm410xWriteToT55xx(id, newKey, oldKeys) {
    bufIsLenOrFail(id, 5, "id");
    bufIsLenOrFail(newKey, 4, "newKey");
    if (oldKeys.length < 1 || oldKeys.length > calcUltraMaxItemSize(4, 9)) throw new TypeError(`Invalid oldKeys.length = ${oldKeys.length}`);
    for (let i = 0; i < oldKeys.length; i++) bufIsLenOrFail(oldKeys[i], 4, `oldKeys[${i}]`);
    await this.assureDeviceMode(1 /* READER */);
    const cmd = 3001 /* EM410X_WRITE_TO_T55XX */;
    const data = b.concat([id, newKey, ...oldKeys]);
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd, data });
    await readResp();
  }
  /**
   * Scan HID Prox tag and read tag information.
   * @returns
   * - `format`: The format of HID Prox tag.
   * - `fc`: The facility code of HID Prox tag.
   * - `cn`: The card number of HID Prox tag.
   * - `il`: The issue level of HID Prox tag.
   * - `oem`: The OEM code of HID Prox tag.
   * @group Reader/Writer Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { HidProxFormat } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   const tag = await ultra.cmdHidProxScan()
   *   console.log(JSON.stringify({ ...tag, format: HidProxFormat[tag.format] }))
   * })(vm.ultra)
   * ```
   */
  async cmdHidProxScan() {
    await this.assureDeviceMode(1 /* READER */);
    const cmd = 3002 /* HIDPROX_SCAN */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd });
    return HidProxScanRes.fromCmd3002((await readResp()).data);
  }
  /**
   * Write HID Prox tag to t55xx tag.
   * @param newKey - The new key of t55xx tag.
   * @param oldKeys - The keys to be checked.
   * @group Reader/Writer Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { Buffer, HidProxFormat } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   // https://github.com/RfidResearchGroup/proxmark3/blob/master/client/dictionaries/t55xx_default_pwds.dic
   *   const newKey = Buffer.from('20206666', 'hex')
   *   const oldKeys = Buffer.from('5124364819920427', 'hex').chunk(4)
   *   await ultra.cmdHidProxWriteToT55xx({ format: HidProxFormat.H10301, fc: 118, cn: 1603 }, newKey, oldKeys)
   * })(vm.ultra)
   * ```
   */
  async cmdHidProxWriteToT55xx(tag, newKey, oldKeys) {
    const bufTag = hidProxTagToBuf(tag);
    bufIsLenOrFail(newKey, 4, "newKey");
    if (oldKeys.length < 1 || oldKeys.length > calcUltraMaxItemSize(4, 17)) throw new TypeError(`Invalid oldKeys.length = ${oldKeys.length}`);
    for (let i = 0; i < oldKeys.length; i++) bufIsLenOrFail(oldKeys[i], 4, `oldKeys[${i}]`);
    await this.assureDeviceMode(1 /* READER */);
    const cmd = 3003 /* HIDPROX_WRITE_TO_T55XX */;
    const data = b.concat([bufTag, newKey, ...oldKeys]);
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd, data });
    await readResp();
  }
  /**
   * Scan ID of Viking tags.
   * @returns The Viking tag ID be scanned.
   * @group Reader/Writer Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { TagType } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   const tagId = await ultra.cmdVikingScan()
   *   console.log(tagId.toString('hex')) // 'deadbeef'
   * })(vm.ultra)
   * ```
   */
  async cmdVikingScan() {
    await this.assureDeviceMode(1 /* READER */);
    const cmd = 3004 /* VIKING_SCAN */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd });
    return (await readResp()).data;
  }
  /**
   * Write id of viking tag to t55xx tag.
   * @param id - The id of viking tag.
   * @param newKey - The new key of t55xx tag.
   * @param oldKeys - The keys to be checked.
   * @group Reader/Writer Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { Buffer } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   const id = Buffer.from('deadbeef', 'hex')
   *   // https://github.com/RfidResearchGroup/proxmark3/blob/master/client/dictionaries/t55xx_default_pwds.dic
   *   const newKey = Buffer.from('20206666', 'hex')
   *   const oldKeys = Buffer.from('5124364819920427', 'hex').chunk(4)
   *   await ultra.cmdVikingWriteToT55xx(id, newKey, oldKeys)
   * })(vm.ultra)
   * ```
   */
  async cmdVikingWriteToT55xx(id, newKey, oldKeys) {
    bufIsLenOrFail(id, 4, "id");
    bufIsLenOrFail(newKey, 4, "newKey");
    if (oldKeys.length < 1 || oldKeys.length > calcUltraMaxItemSize(4, 8)) throw new TypeError(`Invalid oldKeys.length = ${oldKeys.length}`);
    for (let i = 0; i < oldKeys.length; i++) bufIsLenOrFail(oldKeys[i], 4, `oldKeys[${i}]`);
    await this.assureDeviceMode(1 /* READER */);
    const cmd = 3005 /* VIKING_WRITE_TO_T55XX */;
    const data = b.concat([id, newKey, ...oldKeys]);
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd, data });
    await readResp();
  }
  /**
   * Write id of em410x electra tag to t55xx tag.
   * @param id - The 13 bytes id of em410x electra tag.
   * @param newKey - The new key of t55xx tag.
   * @param oldKeys - The keys to be checked.
   * @group Reader/Writer Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { Buffer } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   const id = Buffer.from('000102030405060708090a0b0c', 'hex')
   *   // https://github.com/RfidResearchGroup/proxmark3/blob/master/client/dictionaries/t55xx_default_pwds.dic
   *   const newKey = Buffer.from('20206666', 'hex')
   *   const oldKeys = Buffer.from('5124364819920427', 'hex').chunk(4)
   *   await ultra.cmdEm410xElectraWriteToT55xx(id, newKey, oldKeys)
   * })(vm.ultra)
   * ```
   */
  async cmdEm410xElectraWriteToT55xx(id, newKey, oldKeys) {
    bufIsLenOrFail(id, 13, "id");
    bufIsLenOrFail(newKey, 4, "newKey");
    if (oldKeys.length < 1 || oldKeys.length > calcUltraMaxItemSize(4, 17)) throw new TypeError(`Invalid oldKeys.length = ${oldKeys.length}`);
    for (let i = 0; i < oldKeys.length; i++) bufIsLenOrFail(oldKeys[i], 4, `oldKeys[${i}]`);
    await this.assureDeviceMode(1 /* READER */);
    const cmd = 3006 /* EM410X_ELECTRA_WRITE_TO_T55XX */;
    const data = b.concat([id, newKey, ...oldKeys]);
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd, data });
    await readResp();
  }
  /**
   * Read the raw ADC value of LF antenna. The raw ADC value is the direct value read from ADC without any processing, which may be helpful to debug some non working readers.
   * @returns The raw ADC value of LF antenna.
   * @group Reader/Writer Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const rawAdc = await ultra.cmdLfReadRawAdc()
   *   console.log(rawAdc.toString('hex'))
   * })(vm.ultra)
   * ```
   */
  async cmdLfReadRawAdc() {
    await this.assureDeviceMode(1 /* READER */);
    const cmd = 3009 /* ADC_GENERIC_READ */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd });
    return (await readResp()).data;
  }
  /**
   * Set the mifare block data of actived slot.
   * @param offset - The start block of actived slot.
   * @param data - The data to be set. the length of data should be multiples of 16.
   * @group Mifare Classic Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { Buffer } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   await ultra.cmdMf1EmuWriteBlock(1, Buffer.alloc(16))
   * })(vm.ultra)
   * ```
   */
  async cmdMf1EmuWriteBlock(offset, data) {
    if (!isSafeInteger_default(offset)) throw new TypeError("Invalid offset");
    if (!b.isBuffer(data) || data.length % 16 !== 0) throw new TypeError("data must be a Buffer with length be multiples of 16");
    const cmd = 4e3 /* MF1_WRITE_EMU_BLOCK_DATA */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd, data: b.pack(`!B${data.length}s`, offset, data) });
    await readResp();
  }
  /**
   * [自定义固件 v2.2.0-DAHAOREN] 读取当前激活卡槽内模拟的 MIFARE 1K 块数据（TAG 模式，非读卡）。
   * 固件命令 MF1_READ_EMU_BLOCK_DATA = 4008。blockCount 范围 1..32。
   */
  async cmdMf1ReadEmuBlockData({ blockIndex, blockCount }) {
    if (!isSafeInteger_default(blockIndex)) throw new TypeError("Invalid blockIndex");
    if (!isSafeInteger_default(blockCount) || blockCount < 1 || blockCount > 32) throw new TypeError("blockCount must be 1..32");
    const cmd = 4008 /* MF1_READ_EMU_BLOCK_DATA */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd, data: b.pack("!BB", blockIndex, blockCount) });
    return (await readResp()).data;
  }
  /**
   * [自定义固件 v2.2.0-DAHAOREN] 写入当前激活卡槽内模拟的 MIFARE 1K 块数据（TAG 模式）。
   * 固件命令 MF1_WRITE_EMU_BLOCK_DATA = 4000。data 长度须为 16 的整数倍。
   */
  async cmdMf1WriteEmuBlockData({ blockIndex, data }) {
    if (!isSafeInteger_default(blockIndex)) throw new TypeError("Invalid blockIndex");
    if (!b.isBuffer(data) || data.length % 16 !== 0) throw new TypeError("data must be a Buffer with length multiples of 16");
    const cmd = 4e3 /* MF1_WRITE_EMU_BLOCK_DATA */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd, data: b.concat([b.from([blockIndex]), data]) });
    await readResp();
  }
  /**
   * [自定义固件 v2.2.0-DAHAOREN] 读取 Auto-Poll 配置。
   * 固件命令 GET_AUTO_POLL_CONFIG = 1041。返回 enable / intervalMs / lastAuthSlot。
   */
  async cmdGetAutoPollConfig() {
    const cmd = 1041 /* GET_AUTO_POLL_CONFIG */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd });
    const data = (await readResp()).data;
    return {
      enable: data[0],
      intervalMs: data.readUInt16BE(1),
      lastAuthSlot: data[3]
    };
  }
  /**
   * [自定义固件 v2.2.0-DAHAOREN] 设置 Auto-Poll 配置。
   * 固件命令 SET_AUTO_POLL_CONFIG = 1042。enable 低 2 位：bit0=智能选槽，bit1=定时轮询。
   */
  async cmdSetAutoPollConfig({ enable, intervalMs }) {
    if (!isSafeInteger_default(enable)) throw new TypeError("Invalid enable");
    if (!isSafeInteger_default(intervalMs)) throw new TypeError("Invalid intervalMs");
    const cmd = 1042 /* SET_AUTO_POLL_CONFIG */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd, data: b.pack("!BH", enable & 3, intervalMs & 65535) });
    await readResp();
  }
  /**
   * Set the mifare anti-collision data of actived slot.
   * @param opts.uid - The new uid to be set.
   * @param opts.atqa - `2 bytes`, the new atqa to be set.
   * @param opts.sak - `1 byte`, the new sak to be set.
   * @param opts.ats - The new ats to be set.
   * @group Emulator Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { Buffer } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   await ultra.cmdHf14aSetAntiCollData({
   *     atqa: Buffer.from('0400', 'hex'),
   *     sak: Buffer.of(0x08),
   *     uid: Buffer.from('01020304', 'hex')
   *   })
   * })(vm.ultra)
   * ```
   */
  async cmdHf14aSetAntiCollData(opts) {
    const { uid, atqa, sak, ats = new b() } = opts;
    bufIsLenOrFail(uid, [4, 7, 10], "uid");
    bufIsLenOrFail(atqa, 2, "atqa");
    bufIsLenOrFail(sak, 1, "sak");
    if (!b.isBuffer(ats)) throw new TypeError("ats must be a Buffer");
    const cmd = 4001 /* HF14A_SET_ANTI_COLL_DATA */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd, data: b.pack(`!${uid.length + 1}p2ss${ats.length + 1}p`, uid, atqa, sak, ats) });
    await readResp();
  }
  /**
   * Enable or disable the mifare MFKey32 detection and clear the data of detections.
   * @param enable - `true` to enable the detection, `false` to disable the detection.
   * @group Mifare Classic Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   await ultra.cmdMf1SetDetectionEnable(true)
   * })(vm.ultra)
   * ```
   */
  async cmdMf1SetDetectionEnable(enable) {
    if (isNil_default(enable)) throw new TypeError("enable is required");
    const cmd = 4004 /* MF1_SET_DETECTION_ENABLE */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd, data: b.pack("!?", enable) });
    await readResp();
  }
  /**
   * Get the count of mifare MFKey32 detections.
   * @returns The count of mifare MFKey32 detections.
   * @group Mifare Classic Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   console.log(await ultra.cmdMf1GetDetectionCount()) // 0
   * })(vm.ultra)
   * ```
   */
  async cmdMf1GetDetectionCount() {
    const cmd = 4005 /* MF1_GET_DETECTION_COUNT */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd });
    return (await readResp()).data.readUInt32BE();
  }
  /**
   * Get the data of mifare MFKey32 detections.
   * @param offset - The start log of detections to be get.
   * @returns The mifare MFKey32 detections.
   * @group Mifare Classic Related
   * @see
   * 1. [Dismantling MIFARE Classic](http://proxmark.org/files/Documents/13.56%20MHz%20-%20MIFARE%20Classic/Dismantling.MIFARE.Classic-ESORICS.2008.pdf)
   * 2. [Recovering MIFARE Classic keys](https://docs.flipper.net/nfc/mfkey32)
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const logs = await ultra.cmdMf1GetDetectionLogs(0)
   *   console.log(logs)
   *   /**
   *    * {
   *    *   "block": 2,
   *    *   "isKeyB": 1,
   *    *   "isNested": 0,
   *    *   "uid": Buffer.from('65535d33', 'hex'),
   *    *   "nt": Buffer.from('cb7b9ed9', 'hex'),
   *    *   "nr": Buffer.from('5a8ffec6', 'hex'),
   *    *   "ar": Buffer.from('5c7c6f89', 'hex'),
   *    * }
   *    *\/
   * })(vm.ultra)
   * ```
   */
  async cmdMf1GetDetectionLogs(offset = 0) {
    if (!isSafeInteger_default(offset)) throw new TypeError("Invalid offset");
    const cmd = 4006 /* MF1_GET_DETECTION_LOG */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd, data: b.pack("!I", offset) });
    return Mf1DetectionLog.fromCmd4006((await readResp()).data);
  }
  /**
   * Get the feature of mifare MFKey32 detections is enabled or not.
   * @returns `true` if the feature of mifare MFKey32 detections is enabled, otherwise return `false`.
   * @group Mifare Classic Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   console.log(await ultra.cmdMf1GetDetectionEnable()) // false
   * })(vm.ultra)
   * ```
   */
  async cmdMf1GetDetectionEnable() {
    const cmd = 4007 /* MF1_GET_DETECTION_ENABLE */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd });
    return (await readResp()).data[0] === 1;
  }
  /**
   * Get the mifare block data of actived slot.
   * @param offset - The start block of actived slot.
   * @param length - The count of blocks to be get.
   * @returns The mifare block data of actived slot.
   * @group Mifare Classic Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const data = await ultra.cmdMf1EmuReadBlock(1)
   *   console.log(data.toString('hex')) // '00000000000000000000000000000000'
   * })(vm.ultra)
   * ```
   */
  async cmdMf1EmuReadBlock(offset = 0, length = 1) {
    const cmd = 4008 /* MF1_READ_EMU_BLOCK_DATA */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd, data: b.pack("!BB", offset, length) });
    return (await readResp()).data;
  }
  /**
   * Get the mifare settings of actived slot.
   * @returns The mifare settings of actived slot.
   * @group Mifare Classic Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const mf1Settings = await ultra.cmdMf1GetEmuSettings()
   *   console.log(JSON.stringify(mf1Settings))
   *   /*
   *   {
   *     "detection": false,
   *     "gen1a": false,
   *     "gen2": false,
   *     "antiColl": false,
   *     "write": 0
   *   }
   *   *\/
   * })(vm.ultra)
   * ```
   */
  async cmdMf1GetEmuSettings() {
    const cmd = 4009 /* MF1_GET_EMULATOR_CONFIG */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd });
    return Mf1EmuSettings.fromCmd4009((await readResp()).data);
  }
  /**
   * Set the mifare gen1a mode of actived slot.
   * @returns The mifare gen1a mode of actived slot.
   * @group Mifare Classic Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   console.log(await ultra.cmdMf1GetGen1aMode()) // false
   * })(vm.ultra)
   * ```
   */
  async cmdMf1GetGen1aMode() {
    const cmd = 4010 /* MF1_GET_GEN1A_MODE */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd });
    return (await readResp()).data[0] === 1;
  }
  /**
   * Set the mifare gen1a mode of actived slot.
   * @param enable - `true` to enable the gen1a mode, `false` to disable the gen1a mode.
   * @group Mifare Classic Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   await ultra.cmdMf1SetGen1aMode(false)
   * })(vm.ultra)
   * ```
   */
  async cmdMf1SetGen1aMode(enable) {
    if (isNil_default(enable)) throw new TypeError("enable is required");
    const cmd = 4011 /* MF1_SET_GEN1A_MODE */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd, data: b.pack("!?", enable) });
    await readResp();
  }
  /**
   * Get the mifare gen2 mode of actived slot.
   * @returns The mifare gen2 mode of actived slot.
   * @group Mifare Classic Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   console.log(await ultra.cmdMf1GetGen2Mode()) // false
   * })(vm.ultra)
   * ```
   */
  async cmdMf1GetGen2Mode() {
    const cmd = 4012 /* MF1_GET_GEN2_MODE */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd });
    return (await readResp()).data[0] === 1;
  }
  /**
   * Set the mifare gen2 mode of actived slot.
   * @param enable - `true` to enable the gen2 mode, `false` to disable the gen2 mode.
   * @group Mifare Classic Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   await ultra.cmdMf1SetGen2Mode(false)
   * })(vm.ultra)
   * ```
   */
  async cmdMf1SetGen2Mode(enable) {
    if (isNil_default(enable)) throw new TypeError("enable is required");
    const cmd = 4013 /* MF1_SET_GEN2_MODE */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd, data: b.pack("!?", enable) });
    await readResp();
  }
  /**
   * Get the mode of actived slot that using anti-collision data from block 0 for 4 byte UID tags or not.
   * @returns The mode of actived slot that using anti-collision data from block 0 for 4 byte UID tags or not.
   * @group Mifare Classic Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   console.log(await ultra.cmdMf1GetAntiCollMode()) // false
   * })(vm.ultra)
   * ```
   */
  async cmdMf1GetAntiCollMode() {
    const cmd = 4014 /* MF1_GET_BLOCK_ANTI_COLL_MODE */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd });
    return (await readResp()).data[0] === 1;
  }
  /**
   * Set the mode of actived slot that using anti-collision data from block 0 for 4 byte UID tags or not.
   * @param enable - `true` to enable the mode, `false` to disable the mode.
   * @group Mifare Classic Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   await ultra.cmdMf1SetAntiCollMode(false)
   * })(vm.ultra)
   * ```
   */
  async cmdMf1SetAntiCollMode(enable) {
    if (isNil_default(enable)) throw new TypeError("enable is required");
    const cmd = 4015 /* MF1_SET_BLOCK_ANTI_COLL_MODE */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd, data: b.pack("!?", enable) });
    await readResp();
  }
  /**
   * Get the mifare write mode of actived slot.
   * @returns The mifare write mode of actived slot.
   * @group Mifare Classic Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { Mf1EmuWriteMode } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   console.log(Mf1EmuWriteMode[await ultra.cmdMf1GetWriteMode()]) // NORMAL
   * })(vm.ultra)
   * ```
   */
  async cmdMf1GetWriteMode() {
    const cmd = 4016 /* MF1_GET_WRITE_MODE */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd });
    return (await readResp()).data[0];
  }
  /**
   * Set the mifare write mode of actived slot.
   * @param mode - The mifare write mode of actived slot.
   * @group Mifare Classic Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { Mf1EmuWriteMode } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   await ultra.cmdMf1SetWriteMode(Mf1EmuWriteMode.NORMAL)
   * })(vm.ultra)
   * ```
   */
  async cmdMf1SetWriteMode(mode) {
    if (!isMf1EmuWriteMode(mode)) throw new TypeError("Invalid mode");
    const cmd = 4017 /* MF1_SET_WRITE_MODE */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd, data: b.pack("!B", mode) });
    await readResp();
  }
  /**
   * Get anti-collision data from actived slot.
   * @returns The anti-collision data from actived slot.
   * @group Emulator Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const res = await ultra.cmdHf14aGetAntiCollData()
   *   console.log(JSON.stringify(res))
   *   // {
   *   //   "uid": { "type": "Buffer", "data": [222, 173, 190, 239] },
   *   //   "atqa": { "type": "Buffer", "data": [4, 0] },
   *   //   "sak": { "type": "Buffer", "data": [8] },
   *   //   "ats": { "type": "Buffer", "data": [] }
   *   // }
   * })(vm.ultra)
   * ```
   */
  async cmdHf14aGetAntiCollData() {
    const cmd = 4018 /* HF14A_GET_ANTI_COLL_DATA */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd });
    const data = (await readResp()).data;
    return data.length > 0 ? Hf14aAntiColl.fromBuffer(data) : null;
  }
  /**
   * Get the magic mode of actived slot.
   *
   * If the actived slot is in magic mode, all read and write protection is bypassed.
   *
   * - The UID (page 0-1) can be write.
   * - Static Lock Bytes (page 2) and Dynamic Lock Bytes can be write with any value.
   * - The Capability Container CC of NTAG (page 3) can be write with any value.
   * - PWD and PACK can be read.
   * - All other pages can be read/write without authentication.
   * - The counter of NTAG can be read without authentication.
   * @group Mifare Ultralight Related
   * @returns The magic mode of actived slot.
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   console.log(await ultra.cmdMfuGetMagicMode()) // false
   * })(vm.ultra)
   * ```
   */
  async cmdMfuGetMagicMode() {
    const cmd = 4019 /* MF0_NTAG_GET_UID_MAGIC_MODE */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd });
    return (await readResp()).data[0] === 1;
  }
  /**
   * Set the magic mode of actived slot.
   *
   * If the actived slot is in magic mode, all read and write protection is bypassed.
   *
   * - The UID (page 0-1) can be write.
   * - Static Lock Bytes (page 2) and Dynamic Lock Bytes can be write with any value.
   * - The Capability Container CC of NTAG (page 3) can be write with any value.
   * - PWD and PACK can be read.
   * - All other pages can be read/write without authentication.
   * - The counter of NTAG can be read without authentication.
   * @param enable - The magic mode of actived slot.
   * @group Mifare Ultralight Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   await ultra.cmdMfuSetMagicMode(false)
   * })(vm.ultra)
   * ```
   */
  async cmdMfuSetMagicMode(enable) {
    if (isNil_default(enable)) throw new TypeError("enable is required");
    const cmd = 4020 /* MF0_NTAG_SET_UID_MAGIC_MODE */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd, data: b.pack("!?", enable) });
    await readResp();
  }
  /**
   * Get the page data of actived slot.
   * @param offset - The start page of actived slot.
   * @param length - The count of pages to be get. Must satisfy: `1 <= length <= 128`.
   * @group Mifare Ultralight Related
   * @returns The page data of actived slot.
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const data = await ultra.cmdMfuReadEmuPage(1)
   *   console.log(data.toString('hex')) // 'fa5c6480'
   * })(vm.ultra)
   * ```
   */
  async cmdMfuReadEmuPage(offset = 0, length = 1) {
    if (!inRange_default(length, 1, 129)) throw new TypeError("length must be in range [1, 128]");
    const cmd = 4021 /* MF0_NTAG_READ_EMU_PAGE_DATA */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd, data: b.pack("!BB", offset, length) });
    return (await readResp()).data;
  }
  /**
   * Set the page data of actived slot.
   * @param offset - The start page of actived slot.
   * @param data - The data to be write. Length of data must be multiples of 4 and satisfy: `4 <= data.length <= 508`.
   * @group Mifare Ultralight Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { Buffer } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   await ultra.cmdMfuWriteEmuPage(1, Buffer.from('fa5c6480', 'hex'))
   * })(vm.ultra)
   * ```
   */
  async cmdMfuWriteEmuPage(offset, data) {
    if (!isSafeInteger_default(offset)) throw new TypeError("Invalid offset");
    if (!b.isBuffer(data)) throw new TypeError("data must be a Buffer");
    if (!inRange_default(data.length, 4, 509)) throw new TypeError("data.length must be in range [4, 508]");
    const pageSize = Math.trunc(data.length / 4);
    if (data.length !== pageSize * 4) throw new TypeError("data.length must be multiples of 4");
    const cmd = 4022 /* MF0_NTAG_WRITE_EMU_PAGE_DATA */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd, data: b.pack(`!BB${data.length}s`, offset, pageSize, data) });
    await readResp();
  }
  /**
   * Get the version of actived slot. The version is used to retrieve information on the NTAG family, the product version, storage size and other product data required to identify the specific NTAG21x.
   * @group Mifare Ultralight Related
   * @returns The version of actived slot.
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const data = await ultra.cmdMfuGetEmuVersion()
   *   console.log(data.toString('hex')) // '0004040201001103'
   * })(vm.ultra)
   * ```
   */
  async cmdMfuGetEmuVersion() {
    const cmd = 4023 /* MF0_NTAG_GET_VERSION_DATA */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd });
    const { data } = await readResp();
    return data.length > 0 ? data : void 0;
  }
  /**
   * Set the version of actived slot. The version is used to retrieve information on the NTAG family, the product version, storage size and other product data required to identify the specific NTAG21x.
   * @param version - The version of actived slot.
   * @group Mifare Ultralight Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { Buffer } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   await ultra.cmdMfuSetEmuVersion(Buffer.from('0004040201001103', 'hex'))
   * })(vm.ultra)
   * ```
   */
  async cmdMfuSetEmuVersion(version2) {
    bufIsLenOrFail(version2, 8, "version");
    const cmd = 4024 /* MF0_NTAG_SET_VERSION_DATA */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd, data: version2 });
    await readResp();
  }
  /**
   * Get the signature of actived slot. NTAG21x features a cryptographically supported originality check. The signature is used to verify with a certain confidence that the tag is using an IC manufactured by NXP Semiconductors. The signature digital is based on standard Elliptic Curve Cryptography (curve name secp128r1), according to the ECDSA algorithm.
   * @group Mifare Ultralight Related
   * @returns The signature of actived slot.
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const data = await ultra.cmdMfuGetEmuSignature()
   *   console.log(data.toString('hex')) // '0000000000000000000000000000000000000000000000000000000000000000'
   * })(vm.ultra)
   * ```
   */
  async cmdMfuGetEmuSignature() {
    const cmd = 4025 /* MF0_NTAG_GET_SIGNATURE_DATA */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd });
    const { data } = await readResp();
    return data.length > 0 ? data : void 0;
  }
  /**
   * Set the signature of actived slot. NTAG21x features a cryptographically supported originality check. The signature is used to verify with a certain confidence that the tag is using an IC manufactured by NXP Semiconductors. The signature digital is based on standard Elliptic Curve Cryptography (curve name secp128r1), according to the ECDSA algorithm.
   * @param signature - The signature. The signature must be a 32 bytes Buffer.
   * @group Mifare Ultralight Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { Buffer } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   const signature = Buffer.from('0000000000000000000000000000000000000000000000000000000000000000', 'hex')
   *   await ultra.cmdMfuSetEmuSignature(signature)
   * })(vm.ultra)
   * ```
   */
  async cmdMfuSetEmuSignature(signature) {
    bufIsLenOrFail(signature, 32, "signature");
    const cmd = 4026 /* MF0_NTAG_SET_SIGNATURE_DATA */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd, data: signature });
    await readResp();
  }
  /**
   * Read the counter and tearing of actived slot.
   *
   * NTAG21x features a NFC counter function. The NFC counter is enabled or disabled with the NFC_CNT_EN bit. This function enables NTAG21x to automatically increase the 24 bit counter value, triggered by the first valid READ or FAST_READ command after the NTAG21x tag is powered by an RF field.
   * @param addr - The address of the counter.
   * @group Mifare Ultralight Related
   * @returns
   * - counter: The counter of the specified address.
   * - tearing: The slot is in tearing mode or not.
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   console.log(await ultra.cmdMfuGetEmuCounter(0))
   *   // { "counter": 0, "tearing": false }
   * })(vm.ultra)
   * ```
   */
  async cmdMfuGetEmuCounter(addr) {
    if (!includes_default([0, 1, 2], addr)) throw new TypeError("Invalid addr");
    const cmd = 4027 /* MF0_NTAG_GET_COUNTER_DATA */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd, data: b.pack("!B", addr) });
    const { data } = await readResp();
    if (data.length !== 4) return { counter: void 0, tearing: void 0 };
    const [counter, tearing] = [data.readUIntBE(0, 3), data[3] === 0];
    return { counter, tearing };
  }
  /**
   * Set the counter and reset tearing of actived slot.
   *
   * NTAG21x features a NFC counter function. The NFC counter is enabled or disabled with the NFC_CNT_EN bit. This function enables NTAG21x to automatically increase the 24 bit counter value, triggered by the first valid READ or FAST_READ command after the NTAG21x tag is powered by an RF field.
   * @param opts.addr - The address of the counter.
   * @param opts.counter - The counter to be write. The counter must be a 24-bit unsigned integer.
   * @param opts.resetTearing - `true` to reset tearing.
   * @group Mifare Ultralight Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   await ultra.cmdMfuSetEmuCounter({ addr: 0, counter: 1 })
   *   console.log(await ultra.cmdMfuGetEmuCounter(0))
   *   // { "counter": 1, "tearing": false }
   * })(vm.ultra)
   * ```
   */
  async cmdMfuSetEmuCounter(opts) {
    const { addr = 2, counter = 0, resetTearing = false } = opts;
    if (!includes_default([0, 1, 2], addr)) throw new TypeError("Invalid addr");
    if (!isSafeInteger_default(counter) || !inRange_default(counter, 16777216)) throw new TypeError("Invalid counter");
    const data = new b(4);
    data[0] = (resetTearing ? 128 : 0) + addr;
    data.writeUIntBE(counter, 1, 3);
    const cmd = 4028 /* MF0_NTAG_SET_COUNTER_DATA */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd, data });
    await readResp();
  }
  /**
   * Reset the authentication failed counter of actived slot.
   * @group Mifare Ultralight Related
   * @returns The original value of the unsuccessful auth counter before reset.
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   console.log(await ultra.cmdMfuResetEmuAuthFailedCounter()) // 0
   * })(vm.ultra)
   * ```
   */
  async cmdMfuResetEmuAuthFailedCounter() {
    const cmd = 4029 /* MF0_NTAG_RESET_AUTH_CNT */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd });
    return (await readResp()).data[0];
  }
  /**
   * Get the number of pages available in the actived slot.
   * @group Mifare Ultralight Related
   * @returns The number of pages available in the actived slot.
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   console.log(await ultra.cmdMfuGetEmuPageSize()) // 135
   * })(vm.ultra)
   * ```
   */
  async cmdMfuGetEmuPageSize() {
    const cmd = 4030 /* MF0_NTAG_GET_PAGE_COUNT */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd });
    return (await readResp()).data[0];
  }
  /**
   * Get the emulator write mode in the actived slot.
   * @group Mifare Ultralight Related
   * @returns The emulator write mode in the actived slot.
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { MfuEmuWriteMode } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   console.log(MfuEmuWriteMode[await ultra.cmdMfuGetEmuWriteMode()]) // 135
   * })(vm.ultra)
   * ```
   */
  async cmdMfuGetEmuWriteMode() {
    const cmd = 4031 /* MF0_NTAG_GET_WRITE_MODE */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd });
    return (await readResp()).data[0];
  }
  /**
   * Set the emulator write mode of actived slot.
   * @param mode - The emulator write mode of actived slot.
   * @group Mifare Ultralight Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { MfuEmuWriteMode } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   await ultra.cmdMfuSetWriteMode(MfuEmuWriteMode.NORMAL)
   * })(vm.ultra)
   * ```
   */
  async cmdMfuSetWriteMode(mode) {
    if (!isMfuEmuWriteMode(mode)) throw new TypeError("Invalid mode");
    const cmd = 4032 /* MF0_NTAG_SET_WRITE_MODE */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd, data: b.pack("!B", mode) });
    await readResp();
  }
  /**
   * Enable/disable the AUTH logger of NTAG emulator.
   * @param enable - `true` to enable the detection, `false` to disable the detection.
   * @group Mifare Ultralight Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   await ultra.cmdMfuSetDetectionEnable(true)
   * })(vm.ultra)
   * ```
   */
  async cmdMfuSetDetectionEnable(enable) {
    if (isNil_default(enable)) throw new TypeError("enable is required");
    const cmd = 4033 /* MF0_NTAG_SET_DETECTION_ENABLE */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd, data: b.pack("!?", enable) });
    await readResp();
  }
  /**
   * Get the AUTH log count of NTAG emulator.
   * @returns The count of AUTH logs.
   * @group Mifare Ultralight Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   console.log(await ultra.cmdMfuGetDetectionCount()) // 0
   * })(vm.ultra)
   * ```
   */
  async cmdMfuGetDetectionCount() {
    const cmd = 4034 /* MF0_NTAG_GET_DETECTION_COUNT */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd });
    return (await readResp()).data.readUInt32BE();
  }
  /**
   * Get the AUTH log of NTAG emulator.
   * @param offset - The start log of detections to be get.
   * @returns The AUTH logs.
   * @group Mifare Ultralight Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const pwds = await ultra.cmdMfuGetDetectionLogs(0)
   *   console.log(pwds[0]?.toString('hex')) // 'AA55AA55'
   * })(vm.ultra)
   * ```
   */
  async cmdMfuGetDetectionLogs(offset = 0) {
    if (!isSafeInteger_default(offset)) throw new TypeError("Invalid offset");
    const cmd = 4035 /* MF0_NTAG_GET_DETECTION_LOG */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd, data: b.pack("!I", offset) });
    return (await readResp()).data.chunk(4);
  }
  /**
   * Get the AUTH logger of NTAG emulator is enabled or not.
   * @returns `true` if the feature of mifare MFKey32 detections is enabled, otherwise return `false`.
   * @group Mifare Ultralight Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   console.log(await ultra.cmdMfuGetDetectionEnable()) // false
   * })(vm.ultra)
   * ```
   */
  async cmdMfuGetDetectionEnable() {
    const cmd = 4036 /* MF0_NTAG_GET_DETECTION_ENABLE */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd });
    return (await readResp()).data[0] === 1;
  }
  /**
   * Get configuration of NTAG emulator.
   * @returns The configuration of NTAG emulator.
   * @group Mifare Ultralight Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   console.log(await ultra.cmdMfuGetEmuSettings())
   *   /*
   *   {
   *     "detection": false,
   *     "uid": true,
   *     "write": 0
   *   }
   *   *\/
   * })(vm.ultra)
   * ```
   */
  async cmdMfuGetEmuSettings() {
    const cmd = 4037 /* MF0_NTAG_GET_EMULATOR_CONFIG */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd });
    return MfuEmuSettings.fromCmd4037((await readResp()).data);
  }
  /**
   * A protected memory area can be accessed only after a successful password verification using the PWD_AUTH command. The AUTH0 configuration byte defines the protected area. It specifies the first page that the password mechanism protects. The level of protection can be configured using the PROT bit either for write protection or read/write protection. The PWD_AUTH command takes the password as parameter and, if successful, returns the password authentication acknowledge, PACK. By setting the AUTHLIM configuration bits to a value larger than 000b, the number of unsuccessful password verifications can be limited. Each unsuccessful authentication is then counted in a counter featuring anti-tearing support. After reaching the limit of unsuccessful attempts, the memory access specified in PROT, is no longer possible.
   * @param opts.autoSelect - `true` to enable auto-select, `false` to disable auto-select.
   * @param opts.keepRfField - `true` to keep RF field after auth, `false` to disable RF field.
   * @param opts.key - The password to be verified. The password must be a 4 bytes Buffer.
   * @group Mifare Ultralight Related
   * @returns The password authentication acknowledge, PACK
   */
  async mfuAuth(opts) {
    try {
      const { autoSelect = true, keepRfField = true, key, timeout } = opts;
      if (!b.isBuffer(key)) throw new TypeError("key must be a Buffer");
      if (key.length === 16) throw new Error("auth Ultralight-C is not implemented");
      if (key.length !== 4) throw new Error("key must be a 4 bytes Buffer.");
      const resp = await this.cmdHf14aRaw({
        appendCrc: true,
        autoSelect,
        data: b.pack(`!B${key.length}s`, 27 /* PWD_AUTH */, key),
        keepRfField,
        waitResponse: true,
        timeout
      });
      try {
        return mfuCheckRespNakCrc16a(resp);
      } catch (err) {
        const resp2 = err?.data?.resp;
        if (resp2.length === 1 && resp2[0] === 4) err.status = 6 /* MF_ERR_AUTH */;
        throw err;
      }
    } catch (err) {
      throw new Error(`Auth failed: ${err.message}`, { cause: err });
    }
  }
  /**
   * Read 4 pages (16 bytes) from Mifare Ultralight
   * @param opts.start - start page address
   * @param opts.key - The password to be verified. The password must be a 4 bytes Buffer.
   * @returns 4 pages (16 bytes)
   * @group Mifare Ultralight Related
   * @see [MF0ICU1 MIFARE Ultralight contactless single-ticket IC](https://www.nxp.com/docs/en/data-sheet/MF0ICU1.pdf#page=16)
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const data = await ultra.mfuReadPages({ start: 0 })
   *   console.log(data.toString('hex')) // '040dc445420d2981e7480000e1100600'
   * })(vm.ultra)
   * ```
   */
  async mfuReadPages(opts) {
    const { key, start, timeout } = opts;
    if (!isSafeInteger_default(start)) throw new TypeError("Invalid start");
    if (!isNil_default(key)) await this.mfuAuth({ keepRfField: true, key });
    return await this.cmdHf14aRaw({
      appendCrc: true,
      autoSelect: isNil_default(key),
      checkResponseCrc: true,
      data: b.pack("!BB", 48 /* READ */, start),
      timeout
    });
  }
  /**
   * Read multiple pages from start to end. For example if the start address is 0x03 and the end address is 0x07 then pages 0x03, 0x04, 0x05, 0x06 and 0x07 are returned. If the addressed page is outside of accessible area, NTAG21x replies a NAK.
   * @param opts.start - start page address
   * @param opts.end - end page address
   * @param opts.key - The password to be verified. The password must be a 4 bytes Buffer.
   * @returns 4 pages (16 bytes)
   * @group Mifare Ultralight Related
   * @see [MF0ICU1 MIFARE Ultralight contactless single-ticket IC](https://www.nxp.com/docs/en/data-sheet/MF0ICU1.pdf#page=16)
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const data = await ultra.mfuFastReadPages({ start: 0, end: 3 })
   *   console.log(data.toString('hex')) // '047c79896cb62a8171480000e1103e00'
   * })(vm.ultra)
   * ```
   */
  async mfuFastReadPages(opts) {
    const { end, key, start, timeout } = opts;
    if (!isSafeInteger_default(start) || start < 0 || start > end) throw new TypeError("Invalid start");
    if (!isSafeInteger_default(end) || end < start || end > 255) throw new TypeError("Invalid end");
    if (!isNil_default(key)) await this.mfuAuth({ keepRfField: true, key });
    return await this.cmdHf14aRaw({
      appendCrc: true,
      autoSelect: isNil_default(key),
      checkResponseCrc: true,
      data: b.pack("!BBB", 58 /* FAST_READ */, start, end),
      timeout
    });
  }
  /**
   * Detect Mifare Ultralight tag and return the tag infomation.
   * @returns The tag infomation of detected tag.
   * @group Mifare Ultralight Related
   * @see [Proxmark3 `hf mfu info`](https://github.com/RfidResearchGroup/proxmark3/blob/4e0d4d3ad454285e62fc1a22c2ef3adda508ed01/client/src/cmdhfmfu.c#L2089)
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { NxpMfuTypeName } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   const NxpMfuType = await ultra.mfuDetectTagType()
   *   console.log(`tagType = ${NxpMfuTypeName.get(NxpMfuType)}`)
   * })(vm.ultra)
   * ```
   */
  async mfuDetectTagType() {
    const timeout = 500;
    const tags = await this.cmdHf14aScan();
    if (tags.length > 1) throw new Error("More than one tag detected.");
    else if (tags.length === 0) throw new Error("Tag not found.");
    const tag = tags[0];
    if (!(tag.atqa.readUint16LE(0) === 68 && tag.sak[0] === 0)) throw new Error(`Unknown tag: atqa = ${toUpperHex(tag.atqa.toReversed())}, sak = ${toUpperHex(tag.sak)}`);
    if (tag.uid[0] === 5) {
      const nib = tag.uid[1] >>> 4;
      if (nib === 1) return 12 /* MY_D */;
      else if (nib === 2) return 13 /* MY_D_NFC */;
      else if (nib === 3) return 14 /* MY_D_MOVE */;
      else if (nib === 7) return 15 /* MY_D_MOVE_LEAN */;
      else return 0 /* UNKNOWN */;
    }
    const ver1 = await this.cmdHf14aRaw({
      appendCrc: true,
      autoSelect: true,
      data: b.pack("!B", 96 /* GET_VERSION */),
      timeout
    }).catch((err) => {
      __privateGet(this, _emitErr).call(this, err);
    });
    if (b.isBuffer(ver1)) {
      if (ver1.length === 10) {
        let tagType;
        tagType = MfuVerToNxpMfuType.get(toUpperHex(ver1.subarray(0, 8)));
        if (!isNil_default(tagType)) return tagType;
        tagType = MfuVerToNxpMfuType.get(toUpperHex(ver1.subarray(0, 7)));
        if (!isNil_default(tagType)) return tagType;
        if (ver1[2] === 4) return 5 /* NTAG */;
        if (ver1[2] === 3) return 23 /* UL_EV1 */;
      } else if (ver1.length === 1) return 2 /* UL_C */;
      else if (ver1.length === 0) return 1 /* UL */;
      else return 0 /* UNKNOWN */;
    }
    const auth1 = await this.cmdHf14aRaw({
      appendCrc: true,
      autoSelect: true,
      data: b.pack("!B", 26 /* TDES_AUTH */),
      timeout
    }).catch((err) => {
      __privateGet(this, _emitErr).call(this, err);
    });
    if (b.isBuffer(auth1)) return 2 /* UL_C */;
    const read1 = await this.mfuReadPages({ start: 38, timeout }).catch((err) => {
      __privateGet(this, _emitErr).call(this, err);
    });
    if ((read1?.length ?? 0) === 0) return 1 /* UL */;
    const read2 = await this.mfuReadPages({ start: 48, timeout }).catch((err) => {
      __privateGet(this, _emitErr).call(this, err);
    });
    if ((read2?.length ?? 0) === 0) return 6 /* NTAG_203 */;
    return 0 /* UNKNOWN */;
  }
  /**
   * Read the dump of Mifare Ultralight tag.
   * @param opts.key - The key to read pages if tag is read protected.
   * @param opts.start - start page address
   * @param opts.end - end page address
   * @returns The dump of Mifare Ultralight tag.
   * @group Mifare Ultralight Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const dump = await ultra.mfuReadDump()
   *   console.log(`Read ${dump.length} bytes.`) // Read 160 bytes.
   *   return dump
   * })(vm.ultra)
   * ```
   */
  async mfuReadDump(opts = {}) {
    const { key, end = 256, start = 0 } = opts;
    const dump = new b(4 * (end - start));
    let dumpOffset = 0;
    try {
      while (dumpOffset < dump.length) {
        let buf1 = await this.mfuReadPages({ key, start: start + dumpOffset / 4 });
        if (buf1.length === 0) break;
        if (buf1.length > dump.length - dumpOffset) buf1 = buf1.subarray(0, dump.length - dumpOffset);
        dump.set(buf1, dumpOffset);
        dumpOffset += buf1.length;
      }
    } catch (err) {
      __privateGet(this, _emitErr).call(this, err);
    }
    return dump.subarray(0, dumpOffset);
  }
  /**
   * Assert the tag type of actived slot is Mifare Ultralight like. Throw an error if the tag type is not Mifare Ultralight like.
   * @returns The tag type of actived slot.
   * @group Mifare Ultralight Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { TagType } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   const tagType = await ultra.mfuAssertEmuTagType()
   *   console.log(TagType[tagType]) // '040dc445420d2981e7480000e1100600'
   * })(vm.ultra)
   * ```
   */
  async mfuAssertEmuTagType() {
    const slot = await this.cmdSlotGetActive();
    const slotInfo = await this.cmdSlotGetInfo();
    const { hfTagType } = slotInfo[slot];
    if (!isMfuEmuTagType(hfTagType)) throw new Error(`Invalid tagType: ${TagType[hfTagType]}`);
    return hfTagType;
  }
  /**
   * Get the mifare ultralight settings of actived emulator slot.
   * @group Mifare Ultralight Related
   * @returns
   * - counters: The value of the NFC one-way counter.
   * - magic: The magic mode.
   * - pageSize: The page size.
   * - signature: The IC specific, 32-byte ECC signature.
   * - tearing: The slot is in tearing mode or not.
   * - version: The version information for the specific NTAG21x type.
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const data = await ultra.mfuGetEmuSettings()
   *   console.log(data)
   * })(vm.ultra)
   * ```
   */
  async mfuGetEmuSettings() {
    await this.mfuAssertEmuTagType();
    const catchErr = (err) => {
      __privateGet(this, _emitErr).call(this, err);
    };
    const magic = await this.cmdMfuGetMagicMode().catch(catchErr);
    const pageSize = await this.cmdMfuGetEmuPageSize().catch(catchErr);
    const signature = await this.cmdMfuGetEmuSignature().catch(catchErr);
    const version2 = await this.cmdMfuGetEmuVersion().catch(catchErr);
    let tearing;
    const counters = [];
    for (let i = 0; i < 3; i++) {
      const counter = await this.cmdMfuGetEmuCounter(i).catch(catchErr);
      counters.push(counter?.counter);
      tearing ?? (tearing = counter?.tearing);
    }
    return { counters, magic, pageSize, signature, tearing, version: version2 };
  }
  /**
   * The READ_CNT command is used to read out the current value of the NFC one-way counter of the Mifare Ultralight. The command has a single argument specifying the counter number and returns the 24-bit counter value of the corresponding counter. If the NFC_CNT_PWD_PROT bit is set to 1b the counter is password protected and can only be read with the READ_CNT command after a previous valid password authentication.
   * @param opts.addr - The counter addr to read. Must be `0`, `1` or `2`. Default is `2`.
   * @param opts.key - The password to be verified. The password must be a 4 bytes Buffer.
   * @group Mifare Ultralight Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const cnt = await ultra.mfuReadCounter({ addr: 2 })
   *   console.log(cnt) // 0
   * })(vm.ultra)
   * ```
   */
  async mfuReadCounter(opts) {
    const { addr = 2, key } = opts;
    if (!includes_default([0, 1, 2], addr)) throw new TypeError("Invalid addr of counter");
    if (!isNil_default(key)) await this.mfuAuth({ keepRfField: true, key });
    const resp = await this.cmdHf14aRaw({
      appendCrc: true,
      autoSelect: isNil_default(key),
      waitResponse: true,
      data: b.pack("!BB", 57 /* READ_CNT */, addr)
    });
    return mfuCheckRespNakCrc16a(resp).readUintLE(0, 3);
  }
  /**
   * The READ_SIG command returns an IC specific, 32-byte ECC signature, to verify NXP Semiconductors as the silicon vendor. The signature is programmed at chip production and cannot be changed afterwards.
   * @group Mifare Ultralight Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const data = await ultra.mfuReadSignature()
   *   console.log(data.toString('base64url')) // 'w9dq8MPprf1Ro-C1si32rg3y7cO8UChrtXlNyjLScS4'
   * })(vm.ultra)
   * ```
   */
  async mfuReadSignature() {
    const resp = await this.cmdHf14aRaw({
      appendCrc: true,
      autoSelect: true,
      data: b.pack("!BB", 60 /* READ_SIG */, 0)
    });
    return mfuCheckRespNakCrc16a(resp);
  }
  /**
   * The GET_VERSION command is used to retrieve information on the NTAG family, the product version, storage size and other product data required to identify the specific NTAG21x. This command is also available on other NTAG products to have a common way of identifying products across platforms and evolution steps. The GET_VERSION command has no arguments and replies the version information for the specific NTAG21x type.
   * @group Mifare Ultralight Related
   * @returns
   * -  response for NTAG213, NTAG215 and NTAG216
   *
   * | Byte no. | Description | NTAG213 | NTAG215 | NTAG216 | Interpretation |
   * | --- | --- | --- | --- | --- | --- |
   * | 0 | fixed Header | 0x00 | 0x00 | 0x00 |  |
   * | 1 | vendor ID | 0x04 | 0x04 | 0x04 | NXP Semiconductors |
   * | 2 | product type | 0x04 | 0x04 | 0x04 | NTAG |
   * | 3 | product subtype | 0x02 | 0x02 | 0x02 | 50 pF |
   * | 4 | major product version | 0x01 | 0x01 | 0x01 | 1 |
   * | 5 | minor product version | 0x00 | 0x00 | 0x00 | V0 |
   * | 6 | storage size | 0x0F | 0x11 | 0x13 | [reference](https://www.nxp.com/docs/en/data-sheet/NTAG213_215_216.pdf#page=36) |
   * | 7 | protocol | 0x03 | 0x03 | 0x03 | ISO/IEC 14443-3 compliant |
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const data = await ultra.mfuGetVersion()
   *   console.log(data.toString('hex')) // '0004040201001103'
   * })(vm.ultra)
   * ```
   */
  async mfuGetVersion(opts = {}) {
    const resp = await this.cmdHf14aRaw({
      appendCrc: true,
      autoSelect: true,
      data: b.pack("!B", 96 /* GET_VERSION */),
      timeout: opts.timeout
    });
    return mfuCheckRespNakCrc16a(resp);
  }
  /**
   * Write 1 page (4 bytes) to Mifare Ultralight
   * @param opts.start - start page address
   * @param opts.data - `4 bytes`, the page data to be written.
   * @param opts.key - The password to be verified. The password must be a 4 bytes Buffer.
   * @group Mifare Ultralight Related
   * @see [MF0ICU1 MIFARE Ultralight contactless single-ticket IC](https://www.nxp.com/docs/en/data-sheet/MF0ICU1.pdf#page=17)
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { Buffer } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   const data = await ultra.mfuWritePage({ start: 9, data: Buffer.from('00000000', 'hex') })
   * })(vm.ultra)
   * ```
   */
  async mfuWritePage(opts) {
    const { data, key, start } = opts;
    if (!isSafeInteger_default(start)) throw new TypeError("Invalid start");
    bufIsLenOrFail(data, 4, "data");
    if (!isNil_default(key)) await this.mfuAuth({ keepRfField: true, key });
    await this.cmdHf14aRaw({
      appendCrc: true,
      autoSelect: isNil_default(key),
      checkResponseCrc: true,
      data: b.pack("!BB4s", 162 /* WRITE */, start, data)
    });
  }
  /**
   * Get the mifare ultralight emulator data of actived slot.
   * @returns The mifare ultralight emulator data of actived slot.
   * @group Mifare Ultralight Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const dump = await ultra.mfuReadEmuDump()
   *   console.log(`Read ${dump.length} bytes.`)
   * })(vm.ultra)
   * ```
   */
  async mfuReadEmuDump() {
    const pageSize = await this.cmdMfuGetEmuPageSize();
    const dump = new b(pageSize * 4);
    for (let i = 0; i < pageSize; i += 128) {
      const buf1 = dump.subarray(i * 4);
      buf1.set(await this.cmdMfuReadEmuPage(i, Math.min(128, pageSize - i)));
    }
    return dump;
  }
  /**
   * Write new dump to the actived slot.
   * @param dump - New dump to be write to actived slot.
   * @group Mifare Ultralight Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const dump = new Buffer(540) // Dump size of NTAG_213 is 540 bytes.
   *   dump.set(Buffer.from('04689571fa5c648042480fe0', 'hex'))
   *   dump.set(Buffer.from('040000ff00000000ffffffff', 'hex'), 524)
   *   await ultra.mfuWriteEmuDump(dump)
   * })(vm.ultra)
   * ```
   */
  async mfuWriteEmuDump(dump) {
    const pageSize = await this.cmdMfuGetEmuPageSize();
    dump = dump.subarray(0, pageSize * 4);
    bufIsLenOrFail(dump, pageSize * 4, "dump");
    for (let i = 0; i < pageSize; i += 127) {
      const buf1 = dump.subarray(i * 4).subarray(0, 508);
      await this.cmdMfuWriteEmuPage(i, buf1);
    }
  }
  /**
   * Set the em410x id of actived slot. The size of id depends on the em410x tag type.
   * - 5 bytes for EM410x
   * - 13 bytes for EM410X ELECTRA
   * @param id - The em410x id of actived slot.
   * @group Emulator Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { Buffer, Slot, TagType } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   await ultra.slotChangeTagTypeAndActive(Slot.SLOT_1, null, TagType.EM410X)
   *   await ultra.cmdEm410xSetEmuId(Buffer.from('deadbeef88', 'hex'))
   * })(vm.ultra)
   * ```
   */
  async cmdEm410xSetEmuId(id) {
    bufIsLenOrFail(id, [5, 13], "id");
    const cmd = 5e3 /* EM410X_SET_EMU_ID */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd, data: id });
    await readResp();
  }
  /**
   * Get the em410x id of actived slot.
   * @returns The em410x id of actived slot.
   * @group Emulator Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { Slot, TagType } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   await ultra.slotChangeTagTypeAndActive(Slot.SLOT_1, null, TagType.EM410X)
   *   const id = await ultra.cmdEm410xGetEmuId()
   *   console.log(id.toString('hex')) // 'deadbeef88'
   * })(vm.ultra)
   * ```
   */
  async cmdEm410xGetEmuId() {
    const cmd = 5001 /* EM410X_GET_EMU_ID */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd });
    const data = (await readResp()).data;
    let isFormat2 = true;
    isFormat2 && (isFormat2 = data.length >= 2);
    const tagType = data.readUint16BE(0);
    isFormat2 && (isFormat2 = includes_default([
      100 /* EM410X */,
      104 /* EM410X_ELECTRA */
    ], tagType));
    const idLen = TagTypeLfIdLen.get(tagType) ?? 0;
    isFormat2 && (isFormat2 = data.length === idLen + 2);
    return isFormat2 ? data.subarray(2) : data;
  }
  /**
   * Set the HID Prox emulated tag of active slot.
   * @group Emulator Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { HidProxFormat, Slot, TagType } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   await ultra.slotChangeTagTypeAndActive(Slot.SLOT_1, null, TagType.HIDProx)
   *   await ultra.cmdHidProxSetEmu({ format: HidProxFormat.H10301, fc: 118, cn: 1603 })
   * })(vm.ultra)
   * ```
   */
  async cmdHidProxSetEmu(tag) {
    const bufTag = hidProxTagToBuf(tag);
    const cmd = 5002 /* HIDPROX_SET_EMU_ID */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd, data: bufTag });
    await readResp();
  }
  /**
   * Get the HID Prox emulated tag of active slot.
   * @returns
   * - `format`: The format of HID Prox tag.
   * - `fc`: The facility code of HID Prox tag.
   * - `cn`: The card number of HID Prox tag.
   * - `il`: The issue level of HID Prox tag.
   * - `oem`: The OEM code of HID Prox tag.
   * @group Emulator Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { HidProxFormat, Slot, TagType } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   await ultra.slotChangeTagTypeAndActive(Slot.SLOT_1, null, TagType.HIDProx)
   *   const tag = await ultra.cmdHidProxGetEmu()
   *   console.log(JSON.stringify({ ...tag, format: HidProxFormat[tag.format] }))
   *   // {
   *   //   "format": "H10301",
   *   //   "fc": 118,
   *   //   "cn": 1603,
   *   //   "il": 0,
   *   //   "oem": 0
   *   // }
   * })(vm.ultra)
   * ```
   */
  async cmdHidProxGetEmu() {
    const cmd = 5003 /* HIDPROX_GET_EMU_ID */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd });
    return HidProxScanRes.fromCmd3002((await readResp()).data);
  }
  /**
   * Set the viking id of actived slot.
   * @param id - The viking id of actived slot.
   * @group Emulator Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { Buffer, Slot, TagType } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   await ultra.slotChangeTagTypeAndActive(Slot.SLOT_1, null, TagType.Viking)
   *   await ultra.cmdVikingSetEmuId(Buffer.from('deadbeef', 'hex'))
   * })(vm.ultra)
   * ```
   */
  async cmdVikingSetEmuId(id) {
    bufIsLenOrFail(id, 4, "id");
    const cmd = 5004 /* VIKING_SET_EMU_ID */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd, data: id });
    await readResp();
  }
  /**
   * Get the viking id of actived slot.
   * @returns The viking id of actived slot.
   * @group Emulator Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { Slot, TagType } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   await ultra.slotChangeTagTypeAndActive(Slot.SLOT_1, null, TagType.Viking)
   *   const id = await ultra.cmdVikingGetEmuId()
   *   console.log(id.toString('hex')) // 'deadbeef'
   * })(vm.ultra)
   * ```
   */
  async cmdVikingGetEmuId() {
    const cmd = 5005 /* VIKING_GET_EMU_ID */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { cmd });
    await __privateMethod(this, _ChameleonUltra_instances, sendCmd_fn).call(this, { cmd });
    return (await readResp()).data;
  }
  /**
   * Check if the firmware version is supported by SDK.
   * @returns `true` if the firmware version is supported, `false` otherwise.
   * @group Device Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   if (await ultra.isSupportedAppVersion()) throw new Error('Firmware version is not supported. Please update the firmware.')
   * })(vm.ultra)
   * ```
   */
  async isSupportedAppVersion() {
    const { gte, lt: lt2 } = VERSION_SUPPORTED;
    const version2 = await this.cmdGetAppVersion();
    return versionCompare(version2, gte) >= 0 && versionCompare(version2, lt2) < 0;
  }
  /**
   * Send Mifare Classic HALT command and close RF field.
   * @group Mifare Classic Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   await ultra.mf1Halt()
   * })(vm.ultra)
   * ```
   */
  async mf1Halt() {
    await this.cmdHf14aRaw({ appendCrc: true, data: b.pack("!H", 20480), waitResponse: false });
  }
  /**
   * Magic auth helper function for mifare gen1a tag.
   * @param cb - The callback function to be executed after auth.
   * @returns The result of callback function.
   * @group Mifare Classic Related
   */
  async _mf1Gen1aAuth(cb) {
    try {
      if (isNil_default(cb)) throw new TypeError("cb is required");
      await this.mf1Halt();
      const resp1 = await this.cmdHf14aRaw({ data: b.pack("!B", 64), dataBitLength: 7, keepRfField: true }).catch((err) => {
        throw new Error(`Gen1a auth failed 1: ${err.message}`, { cause: err });
      });
      if (resp1[0] !== 10) throw new Error("Gen1a auth failed 1");
      const resp2 = await this.cmdHf14aRaw({ data: b.pack("!B", 67), keepRfField: true }).catch((err) => {
        throw new Error(`Gen1a auth failed 2: ${err.message}`, { cause: err });
      });
      if (resp2[0] !== 10) throw new Error("Gen1a auth failed 2");
      return await cb();
    } finally {
      if (this.isConnected()) await this.mf1Halt();
    }
  }
  /**
   * Read blocks from Mifare Classic Gen1a.
   * @param offset - The start block of Mifare Classic Gen1a.
   * @param length - The amount of blocks to read.
   * @returns The blocks data.
   * @group Mifare Classic Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const card = await ultra.mf1Gen1aReadBlocks(0, 64)
   *   console.log(_.map(card.chunk(16), chunk => chunk.toString('hex')).join('\n'))
   * })(vm.ultra)
   * ```
   */
  async mf1Gen1aReadBlocks(offset, length = 1) {
    if (!isSafeInteger_default(offset)) throw new TypeError("Invalid offset");
    if (!isSafeInteger_default(length)) throw new TypeError("Invalid length");
    return await this._mf1Gen1aAuth(async () => {
      const buf = new b(length * 16);
      for (let i = 0; i < length; i++) {
        buf.set(await this.cmdHf14aRaw({
          appendCrc: true,
          checkResponseCrc: true,
          data: b.pack("!BB", 48, offset + i),
          keepRfField: true
        }), i * 16);
      }
      return buf;
    });
  }
  /**
   * Write blocks to Mifare Classic Gen1a.
   * @param offset - The start block of Mifare Classic Gen1a.
   * @param data - The blocks data to write.
   * @group Mifare Classic Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { Buffer } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   await ultra.mf1Gen1aWriteBlocks(1, new Buffer(16))
   * })(vm.ultra)
   * ```
   */
  async mf1Gen1aWriteBlocks(offset, data) {
    if (!isSafeInteger_default(offset)) throw new TypeError("Invalid offset");
    if (!b.isBuffer(data) || data.length % 16 !== 0) throw new TypeError("data must be a Buffer with length be multiples of 16");
    await this._mf1Gen1aAuth(async () => {
      const blocks = data.chunk(16);
      for (let i = 0; i < blocks.length; i++) {
        const resp1 = await this.cmdHf14aRaw({ appendCrc: true, data: b.pack("!BB", 160, offset + i), keepRfField: true });
        if (resp1[0] !== 10) throw new Error("Gen1a write failed 1");
        const resp2 = await this.cmdHf14aRaw({ appendCrc: true, data: blocks[i], keepRfField: true });
        if (resp2[0] !== 10) throw new Error("Gen1a write failed 2");
      }
    });
  }
  /**
   * Get the blockNo of sector trailer.
   * @param sector - The sector number.
   * @returns The blockNo of sector trailer.
   * @group Mifare Classic Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async () => {
   *   const { ChameleonUltra } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   console.log(ChameleonUltra.mf1TrailerBlockNoOfSector(0)) // 3
   * })()
   * ```
   */
  static mf1TrailerBlockNoOfSector(sector) {
    return sector < 32 ? sector * 4 + 3 : sector * 16 - 369;
  }
  /**
   * Given a list of keys, check which is the correct key A and key B of the sector.
   * @param sector - The sector number to be checked.
   * @param keys - The keys dictionary.
   * @returns The Key A and Key B of the sector.
   * @group Mifare Classic Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { Buffer } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   const keys = Buffer.from('FFFFFFFFFFFF\n000000000000\nA0A1A2A3A4A5\nD3F7D3F7D3F7', 'hex').chunk(6)
   *   const sectorKey = await ultra.mf1CheckSectorKeys(0, keys)
   *   console.log(_.mapValues(sectorKey, key => key.toString('hex')))
   *   // { "96": "ffffffffffff", "97": "ffffffffffff" }
   * })(vm.ultra)
   * ```
   */
  async mf1CheckSectorKeys(sector, keys2) {
    if (!isSafeInteger_default(sector)) throw new TypeError("Invalid sector");
    const mask = b.alloc(10, 255);
    mask[sector >>> 2] ^= 3 << 6 - sector % 4 * 2;
    const [ka, kb] = (await this.mf1CheckKeysOfSectors({ keys: keys2, mask })).slice(sector * 2).slice(0, 2);
    return omitBy_default({
      [96 /* KEY_A */]: ka,
      [97 /* KEY_B */]: kb
    }, isNil_default);
  }
  /**
   * Mifare Classic check keys of sectors.
   * @param opts.chunkSize - `keys` will be chunked by this size.
   * @param opts.keys - The keys to be checked.
   * @param opts.mask - The mask of sectors. 80 bits, 2 bits/sector, the first bit is key A, the second bit is key B, 0b1 represent to skip checking the key.
   * @param opts.maxSectors - The max sectors to be check.
   * @param opts.onChunkKeys - The callback function to be invoked before checking every chunk of keys.
   * @group Mifare Classic Related
   * @returns
   */
  async mf1CheckKeysOfSectors(opts) {
    let { chunkSize = 20, keys: keys2, mask = new b(10), maxSectors = 40, onChunkKeys } = opts;
    keys2 = _ChameleonUltra.mf1UniqueKeys(keys2);
    if (keys2.length === 0) throw new TypeError("Invalid keys");
    if (!b.isBuffer(mask)) mask = new b(10);
    else if (mask.length !== 10) {
      const buf = new b(10);
      buf.copy(mask, 0, 0, 10);
      mask = buf;
    }
    for (let i = maxSectors ?? 40; i < 40; i++) mask[i >>> 2] |= 3 << 6 - i % 4 * 2;
    const foundKeys = new Array(maxSectors * 2).fill(null);
    for (const chunkKeys of chunk_default(keys2, chunkSize)) {
      await onChunkKeys?.({ keys: chunkKeys, mask });
      const tmp = await this.cmdMf1CheckKeysOfSectors({ keys: chunkKeys, mask });
      if (isNil_default(tmp)) break;
      mask.or(tmp.found);
      for (let i = 0; i < maxSectors * 2; i++) {
        if (isNil_default(tmp.sectorKeys[i])) continue;
        foundKeys[i] = tmp.sectorKeys[i];
      }
    }
    return foundKeys;
  }
  /**
   * Read a block data of Mifare Classic by given keys.
   * @param block - The block number to be read.
   * @param keys - The keys dictionary.
   * @returns The block data read from a mifare tag. An error is thrown if the block cannot be read.
   * @group Mifare Classic Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { Buffer } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   const keys = Buffer.from('FFFFFFFFFFFF\n000000000000\nA0A1A2A3A4A5\nD3F7D3F7D3F7', 'hex').chunk(6)
   *   const data = await ultra.mf1ReadBlockByKeys(0, keys)
   *   console.log(data.toString('hex'))
   * })(vm.ultra)
   * ```
   */
  async mf1ReadBlockByKeys(block, keys2) {
    const sector = Math.trunc(block / 4);
    const sectorKey = await this.mf1CheckSectorKeys(sector, keys2);
    if (isEmpty_default(sectorKey)) throw new Error("No valid key");
    for (const keyType of [97 /* KEY_B */, 96 /* KEY_A */]) {
      const key = sectorKey[keyType];
      if (isNil_default(key)) continue;
      try {
        return await this.cmdMf1ReadBlock({ block, keyType, key });
      } catch (err) {
        if (!this.isConnected()) throw err;
        __privateMethod(this, _ChameleonUltra_instances, debug_fn).call(this, "mf1", `Failed to read block ${block} with ${Mf1KeyType[keyType]} = ${toUpperHex(key)}`);
      }
    }
    throw new Error(`Failed to read block ${block}`);
  }
  /**
   * Read a sector data of Mifare Classic by given keys.
   * @param sector - The sector number to be read.
   * @param keys - The keys dictionary.
   * @returns The sector data and the read status of each block.
   * @group Mifare Classic Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { Buffer, Mf1KeyType } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   const keys = Buffer.from('FFFFFFFFFFFF\n000000000000\nA0A1A2A3A4A5\nD3F7D3F7D3F7', 'hex').chunk(6)
   *   const { data, success } = await ultra.mf1ReadSectorByKeys(0, keys)
   *   console.log({ data: data.toString('hex'), success })
   *   // { "data": "...", "success": [true, true, true, true] }
   * })(vm.ultra)
   * ```
   */
  async mf1ReadSectorByKeys(sector, keys2) {
    const sectorKey = await this.mf1CheckSectorKeys(sector, keys2);
    if (isEmpty_default(sectorKey)) throw new Error("No valid key");
    const [secBlks, secBlkStart, secBytes] = sector < 32 ? [4, sector * 4, 64] : [16, sector * 16 - 384, 256];
    const data = new b(secBytes);
    const success = times_default(secBlks, () => false);
    for (let i = 0; i < secBlks; i++) {
      for (const keyType of [97 /* KEY_B */, 96 /* KEY_A */]) {
        const key = sectorKey[keyType];
        if (isNil_default(key)) continue;
        try {
          data.set(await this.cmdMf1ReadBlock({ block: secBlkStart + i, keyType, key }), i * 16);
          success[i] = true;
          break;
        } catch (err) {
          if (!this.isConnected()) throw err;
          __privateMethod(this, _ChameleonUltra_instances, debug_fn).call(this, "mf1", `Failed to read block ${sector * 4 + i} with ${Mf1KeyType[keyType]} = ${toUpperHex(key)}`);
        }
      }
    }
    if (!isNil_default(sectorKey[96 /* KEY_A */])) data.subarray(-16).set(sectorKey[96 /* KEY_A */]);
    if (!isNil_default(sectorKey[97 /* KEY_B */])) data.subarray(-6).set(sectorKey[97 /* KEY_B */]);
    return { data, success };
  }
  /**
   * Write a block data to Mifare Classic by given keys.
   * @param block - The block number to be written.
   * @param keys - The keys dictionary.
   * @param data - Block data
   * @returns An error is thrown if the block cannot be write.
   * @group Mifare Classic Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { Buffer } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   const keys = Buffer.from('FFFFFFFFFFFF\n000000000000\nA0A1A2A3A4A5\nD3F7D3F7D3F7', 'hex').chunk(6)
   *   const data = Buffer.from('00000000000000000000000000000000', 'hex')
   *   await ultra.mf1WriteBlockByKeys(1, keys, data)
   * })(vm.ultra)
   * ```
   */
  async mf1WriteBlockByKeys(block, keys2, data) {
    bufIsLenOrFail(data, 16, "data");
    if (block % 4 === 3 && !_ChameleonUltra.mf1IsValidAcl(data)) throw new TypeError("Invalid ACL bytes of data");
    const sector = Math.trunc(block / 4);
    const sectorKey = await this.mf1CheckSectorKeys(sector, keys2);
    if (isEmpty_default(sectorKey)) throw new Error("No valid key");
    for (const keyType of [97 /* KEY_B */, 96 /* KEY_A */]) {
      const key = sectorKey[keyType];
      if (isNil_default(key)) continue;
      try {
        await this.cmdMf1WriteBlock({ block, keyType, key, data });
        return;
      } catch (err) {
        if (!this.isConnected()) throw err;
        __privateMethod(this, _ChameleonUltra_instances, debug_fn).call(this, "mf1", `Failed to write block ${block} with ${Mf1KeyType[keyType]} = ${toUpperHex(key)}`);
      }
    }
    throw new Error(`Failed to write block ${block}`);
  }
  /**
   * Write a sector data to Mifare Classic by given keys.
   * @param sector - The sector number to be written.
   * @param keys - The key dictionary.
   * @param data - Sector data
   * @returns the write status of each block.
   * @group Mifare Classic Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { Buffer } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   const keys = Buffer.from('FFFFFFFFFFFF\n000000000000\nA0A1A2A3A4A5\nD3F7D3F7D3F7', 'hex').chunk(6)
   *   const data = Buffer.concat([
   *     Buffer.from('00000000000000000000000000000000', 'hex'),
   *     Buffer.from('00000000000000000000000000000000', 'hex'),
   *     Buffer.from('00000000000000000000000000000000', 'hex'),
   *     Buffer.from('ffffffffffffff078069ffffffffffff', 'hex'),
   *   ])
   *   const { success } = await ultra.mf1WriteSectorByKeys(1, keys, data)
   *   console.log(success)
   *   // [true, true, true, true]
   * })(vm.ultra)
   * ```
   */
  async mf1WriteSectorByKeys(sector, keys2, data) {
    bufIsLenOrFail(data, 64, "data");
    if (!_ChameleonUltra.mf1IsValidAcl(data)) throw new TypeError("Invalid ACL bytes of data");
    const sectorKey = await this.mf1CheckSectorKeys(sector, keys2);
    if (isEmpty_default(sectorKey)) throw new Error("No valid key");
    const success = times_default(4, () => false);
    for (let i = 0; i < 4; i++) {
      for (const keyType of [97 /* KEY_B */, 96 /* KEY_A */]) {
        const key = sectorKey[keyType];
        if (isNil_default(key)) continue;
        try {
          await this.cmdMf1WriteBlock({ block: sector * 4 + i, keyType, key, data: data.subarray(i * 16).subarray(0, 16) });
          success[i] = true;
          break;
        } catch (err) {
          if (!this.isConnected()) throw err;
          __privateMethod(this, _ChameleonUltra_instances, debug_fn).call(this, "mf1", `Failed to write block ${sector * 4 + i} with ${Mf1KeyType[keyType]} = ${toUpperHex(key)}`);
        }
      }
    }
    return { success };
  }
  /**
   * Check acl bytes of ACL, block or sector.
   * @param data - Data of ACL, block or sector.
   * @returns `true` if the acl bytes is valid, `false` otherwise.
   * @group Mifare Classic Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async () => {
   *   const { Buffer, ChameleonUltra } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   console.log(ChameleonUltra.mf1IsValidAcl(Buffer.from('ff078069', 'hex'))) // true
   * })()
   * ```
   */
  static mf1IsValidAcl(data) {
    bufIsLenOrFail(data, [3, 4, 16, 64], "data");
    if (data.length === 16) data = data.subarray(6);
    else if (data.length === 64) data = data.subarray(54);
    const acl = [];
    for (let i = 0; i < 3; i++) acl.push((data[i] & 240) >>> 4, data[i] & 15);
    return every_default([[1, 2], [0, 5], [3, 4]], ([a, b2]) => (acl[a] ^ acl[b2]) === 15);
  }
  /**
   * Remove duplicated and invalid Mifare Classic keys.
   * @group Mifare Classic Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async () => {
   *   const { Buffer, ChameleonUltra } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   let keys = Buffer.from('FFFFFFFFFFFF\nFFFFFFFFFFFF\nA0A1A2A3A4A5\nD3F7D3F7D3F7', 'hex').chunk(6)
   *   console.log(`keys.length = ${keys.length}`)
   *   keys = ChameleonUltra.mf1UniqueKeys(keys)
   *   console.log(`keys.length = ${keys.length}`)
   * })()
   * ```
   */
  static mf1UniqueKeys(keys2) {
    return uniqWith_default(filter_default(keys2, (key) => b.isBuffer(key) && key.length === BYTES_PER_MF1_KEY), b.equals);
  }
  /**
   * Generate block 0 (manufacturer block) for magic mifare classic tag.
   * @param opts.tagType - The tag type of the mifare classic tag. Default to `MIFARE_1024`.
   * @param opts.atqa - The ATQA of the tag.
   * @param opts.buf - If provided, the data will be written to this buffer.
   * @param opts.sak - The SAK of the tag.
   * @param opts.uid - The UID of the tag.
   * @group Mifare Classic Related
   * @example
   * 4 bytes UID example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async () => {
   *   const { Buffer, ChameleonUltra } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   const block0 = ChameleonUltra.mf1GenMagicBlock0({
   *     uid: Buffer.from('deadbeef', 'hex'),
   *     atqa: Buffer.from('0004', 'hex').reverse(),
   *     sak: Buffer.of(0x08),
   *   })
   *   console.log(block0.toString('hex')) // deadbeef220804000000000000000000
   * })()
   * ```
   * @example
   * 7 bytes UID example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async () => {
   *   const { Buffer, ChameleonUltra } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   const block0 = ChameleonUltra.mf1GenMagicBlock0({
   *     uid: Buffer.from('04FE5572AA4880', 'hex'),
   *   })
   *   console.log(block0.toString('hex')) // 04FE5572AA4880884400C82000000000
   * })()
   * ```
   */
  static mf1GenMagicBlock0(opts) {
    opts.tagType ?? (opts.tagType = 1001 /* MIFARE_1024 */);
    if (!isTagType(opts.tagType)) throw new TypeError("Invalid tagType");
    const buf = opts.buf ?? new b(16);
    if (!b.isBuffer(buf) || buf.length < 16) throw new TypeError("Invalid buf");
    bufIsLenOrFail(opts.uid, [4, 7, 10], "uid");
    if (!isNil_default(opts.sak)) bufIsLenOrFail(opts.sak, 1, "sak");
    if (!isNil_default(opts.atqa)) bufIsLenOrFail(opts.atqa, 2, "atqa");
    const atqaSak = get_default(Mf1AtqaSakDefaultMap, [opts.uid.length, opts.tagType]);
    if (isNil_default(atqaSak)) throw new Error("Unable to generate magic block 0 for the given opts");
    opts.atqa ?? (opts.atqa = b.from(atqaSak[0]));
    opts.sak ?? (opts.sak = b.from(atqaSak[1]));
    if (opts.uid.length === 4) {
      buf.pack("!4sBB2s", opts.uid, opts.uid.xor(), opts.sak[0], opts.atqa);
    } else if (opts.uid.length === 7) {
      opts.sak[0] |= 128;
      buf.pack("!7sB2s6s", opts.uid, opts.sak[0], opts.atqa, b.from("C82000000000", "hex"));
    }
    return buf;
  }
  /**
   * Generate empty dump for magic mifare classic tag.
   * @param opts.atqa - The ATQA of the tag.
   * @param opts.buf - If provided, the data will be written to this buffer.
   * @param opts.sak - The SAK of the tag.
   * @param opts.tagType - The tag type of the mifare classic tag.
   * @param opts.uid - The UID of the tag.
   * @group Mifare Classic Related
   * @returns The empty dump for magic mifare classic tag.
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async () => {
   *   const { Buffer, ChameleonUltra, TagType } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   const dump = ChameleonUltra.mf1GenEmptyDump({
   *     uid: Buffer.from('deadbeef', 'hex'),
   *     atqa: Buffer.from('0004', 'hex').reverse(),
   *     sak: Buffer.of(0x08),
   *     tagType: TagType.MIFARE_1024,
   *   })
   *   console.log(dump.chunk(16).map(blk => blk.toString('hex')).join('\n'))
   * })()
   * ```
   */
  static mf1GenEmptyDump(opts = {}) {
    opts.tagType ?? (opts.tagType = 1001 /* MIFARE_1024 */);
    opts.uid ?? (opts.uid = b.of(222, 173, 190, 239));
    const blkAcl = b.from("FFFFFFFFFFFFFF078069FFFFFFFFFFFF", "hex");
    switch (opts.tagType) {
      case 1001 /* MIFARE_1024 */:
        opts.buf ?? (opts.buf = new b(1024));
        bufIsLenOrFail(opts.buf, 1024, "buf");
        _ChameleonUltra.mf1GenMagicBlock0(opts);
        for (let i = 0; i < 16; i++) opts.buf.set(blkAcl, i * 64 + 48);
        return opts.buf;
      case 1002 /* MIFARE_2048 */:
        opts.buf ?? (opts.buf = new b(2048));
        bufIsLenOrFail(opts.buf, 2048, "buf");
        _ChameleonUltra.mf1GenMagicBlock0(opts);
        for (let i = 0; i < 32; i++) opts.buf.set(blkAcl, i * 64 + 48);
        return opts.buf;
      case 1003 /* MIFARE_4096 */:
        opts.buf ?? (opts.buf = new b(4096));
        bufIsLenOrFail(opts.buf, 4096, "buf");
        _ChameleonUltra.mf1GenMagicBlock0(opts);
        for (let i = 0; i < 32; i++) opts.buf.set(blkAcl, i * 64 + 48);
        for (let i = 32; i < 40; i++) opts.buf.set(blkAcl, i * 256 - 5904);
        return opts.buf;
      default:
        throw new Error(`opts.tagType is not supported: ${TagType[opts.tagType] ?? opts.tagType}`);
    }
  }
  /**
   * Convert dump to [Proxmark3](https://github.com/RfidResearchGroup/proxmark3) compatible JSON Object for exporting Mifare Classic.
   * @param opts.atqa - The ATQA of the tag.
   * @param opts.ats - The ATS of the tag.
   * @param opts.body - The body of the tag.
   * @param opts.sak - The SAK of the tag.
   * @param opts.uid - The UID of the tag.
   * @returns The JSON Object for exporting Mifare Classic.
   * @group Mifare Classic Related
   * @see [loadFileJSONex | RfidResearchGroup/proxmark3](https://github.com/RfidResearchGroup/proxmark3/blob/c3a7a11ae78558f1cc187570f40e023dd24f8fb6/client/src/fileutils.c#L1444)
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async () => {
   *   const { Buffer, ChameleonUltra, TagType } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   const dump = ChameleonUltra.mf1GenEmptyDump({ tagType: TagType.MIFARE_1024 })
   *   const json = ChameleonUltra.mf1DumpToPm3Json({
   *     atqa: Buffer.from('0004', 'hex').reverse(),
   *     body: dump,
   *     sak: Buffer.of(0x08),
   *     uid: Buffer.from('deadbeef', 'hex'),
   *   })
   *   console.log(json)
   * })()
   * ```
   */
  static mf1DumpToPm3Json(opts) {
    const { body } = opts;
    if (!b.isBuffer(body)) throw new TypeError("body must be a Buffer");
    if (body.length % 16 !== 0) throw new Error("Invalid body length");
    bufIsLenOrFail(opts.atqa, 2, "atqa");
    bufIsLenOrFail(opts.sak, 1, "sak");
    const blocks = fromPairs_default(map_default(body.chunk(16), (block, blockNo) => [blockNo, toUpperHex(block)]));
    return {
      Created: "chameleon-ultra.js",
      FileType: "mfc v3",
      blocks,
      Card: {
        UID: toUpperHex(opts.uid),
        ATQA: toUpperHex(opts.atqa),
        SAK: toUpperHex(opts.sak),
        ATS: toUpperHex(opts.ats ?? new b()),
        SIGNATURE: toUpperHex(opts.sig ?? new b())
      }
    };
  }
  /**
   * Convert [Proxmark3](https://github.com/RfidResearchGroup/proxmark3) compatible JSON Object to dump for importing Mifare Classic.
   * @param pm3Json - [Proxmark3](https://github.com/RfidResearchGroup/proxmark3) compatible JSON Object. If a string, `Uint8Array`, `Buffer` is provided, it will be parsed using `JSON.parse`.
   * @returns The tag data imported from Proxmark3 JSON Object.
   * @group Mifare Classic Related
   * @see [loadFileJSONex | RfidResearchGroup/proxmark3](https://github.com/RfidResearchGroup/proxmark3/blob/c3a7a11ae78558f1cc187570f40e023dd24f8fb6/client/src/fileutils.c#L1444)
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async () => {
   *   const { Buffer, ChameleonUltra, TagType } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   const dump = ChameleonUltra.mf1GenEmptyDump({ tagType: TagType.MIFARE_1024 })
   *   const json = ChameleonUltra.mf1DumpToPm3Json({
   *     atqa: Buffer.from('0004', 'hex').reverse(),
   *     body: dump,
   *     sak: Buffer.of(0x08),
   *     uid: Buffer.from('deadbeef', 'hex'),
   *   })
   *   const resp = ChameleonUltra.mf1DumpFromPm3Json(json)
   *   console.log(resp)
   * })()
   * ```
   */
  static mf1DumpFromPm3Json(pm3Json) {
    if (ArrayBuffer.isView(pm3Json)) pm3Json = b.fromView(pm3Json);
    if (b.isBuffer(pm3Json)) pm3Json = pm3Json.toString("utf8");
    if (isString_default(pm3Json)) pm3Json = JSON.parse(pm3Json);
    if (!isObject_default(pm3Json)) throw new TypeError("invalid type of pm3Json");
    const json = pm3Json;
    if (!includes_default(["mfcard", "mfc v2", "mfc v3"], json.FileType)) throw new Error(`Unsupported FileType: ${json.FileType}`);
    json.blocks ?? (json.blocks = {});
    const maxBlkNo = max_default(map_default(json.blocks, (v2, k) => toInteger_default(k))) ?? 0;
    const tagType = maxBlkNo < 64 ? 1001 /* MIFARE_1024 */ : maxBlkNo < 128 ? 1002 /* MIFARE_2048 */ : 1003 /* MIFARE_4096 */;
    const body = new b(tagType === 1001 /* MIFARE_1024 */ ? 1024 : tagType === 1002 /* MIFARE_2048 */ ? 2048 : 4096);
    for (const [blkNo, blkHex] of toPairs_default(json.blocks)) {
      const blk = b.from(blkHex.replaceAll("-", "0"), "hex");
      if (blk.length !== 16) continue;
      body.set(blk, toInteger_default(blkNo) * 16);
    }
    return {
      atqa: b.from(json.Card?.ATQA ?? "", "hex"),
      uid: b.from(json.Card?.UID ?? "", "hex"),
      sak: b.from(json.Card?.SAK ?? "", "hex"),
      ats: b.from(json.Card?.ATS ?? "", "hex"),
      sig: b.from(json.Card?.SIGNATURE ?? "", "hex"),
      tagType,
      body
    };
  }
  /**
   * Convert dump to [Proxmark3](https://github.com/RfidResearchGroup/proxmark3) compatible EML string for exporting Mifare Classic.
   * @param opts.body - The body of the tag.
   * @returns The EML string for exporting Mifare Classic.
   * @group Mifare Classic Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async () => {
   *   const { Buffer, ChameleonUltra, TagType } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   const dump = ChameleonUltra.mf1GenEmptyDump({ tagType: TagType.MIFARE_1024 })
   *   const eml = ChameleonUltra.mf1DumpToEml({ body: dump })
   *   console.log(eml)
   * })()
   * ```
   */
  static mf1DumpToEml(opts) {
    const { body } = opts;
    if (!b.isBuffer(body)) throw new TypeError("body must be a Buffer");
    if (body.length % 16 !== 0) throw new Error("Invalid body length");
    return body.chunk(16).map(toUpperHex).join("\n");
  }
  /**
   * Convert [Proxmark3](https://github.com/RfidResearchGroup/proxmark3) compatible EML string to dump for importing Mifare Classic.
   * @param eml - The EML string of the Mifare Classic.
   * @returns The dump data imported from EML.
   * @group Mifare Classic Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async () => {
   *   const { Buffer, ChameleonUltra, TagType } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   const dump = ChameleonUltra.mf1GenEmptyDump({ tagType: TagType.MIFARE_1024 })
   *   const eml = ChameleonUltra.mf1DumpToEml({ body: dump })
   *   const buf = ChameleonUltra.mf1DumpFromEml(eml)
   *   console.log(buf)
   * })()
   * ```
   */
  static mf1DumpFromEml(eml) {
    if (ArrayBuffer.isView(eml)) eml = b.fromView(eml);
    if (b.isBuffer(eml)) eml = eml.toString("utf8");
    if (!isString_default(eml)) throw new TypeError("invalid type of eml");
    const buf1 = b.from(eml.replaceAll("-", "0"), "hex").subarray(0, 4096);
    const buf2 = new b(buf1.length <= 1024 ? 1024 : buf1.length <= 2048 ? 2048 : 4096);
    buf2.set(buf1);
    return buf1;
  }
  /**
   * Convert dump to [MifareClassicTool](https://play.google.com/store/apps/details?id=de.syss.MifareClassicTool) compatible MCT string for exporting Mifare Classic.
   * @param opts.body - The body of the tag.
   * @returns The MCT string for exporting Mifare Classic.
   * @group Mifare Classic Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async () => {
   *   const { Buffer, ChameleonUltra, TagType } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   const dump = ChameleonUltra.mf1GenEmptyDump({ tagType: TagType.MIFARE_1024 })
   *   const mct = ChameleonUltra.mf1DumpToMct({ body: dump })
   *   console.log(mct)
   * })()
   * ```
   */
  static mf1DumpToMct(opts) {
    const { body } = opts;
    if (!b.isBuffer(body)) throw new TypeError("body must be a Buffer");
    if (body.length % 16 !== 0) throw new Error("Invalid body length");
    const blks = body.chunk(16);
    const rows = [];
    for (let i = 0; i < blks.length; i++) {
      if ((i < 128 ? i % 4 : i % 16) === 0) rows.push(`+Sector: ${i < 128 ? i / 4 : i / 16 + 24}`);
      rows.push(toUpperHex(blks[i]));
    }
    return rows.join("\n");
  }
  /**
   * Convert [MifareClassicTool](https://play.google.com/store/apps/details?id=de.syss.MifareClassicTool) compatible MCT string to dump for importing Mifare Classic.
   * @param mct - The MCT string of the Mifare Classic.
   * @returns The dump data imported from MCT.
   * @group Mifare Classic Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async () => {
   *   const { Buffer, ChameleonUltra, TagType } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   const dump = ChameleonUltra.mf1GenEmptyDump({ tagType: TagType.MIFARE_1024 })
   *   const mct = ChameleonUltra.mf1DumpToMct({ body: dump })
   *   const buf = ChameleonUltra.mf1DumpFromMct(mct)
   *   console.log(buf)
   * })()
   * ```
   */
  static mf1DumpFromMct(mct) {
    if (ArrayBuffer.isView(mct)) mct = b.fromView(mct);
    if (b.isBuffer(mct)) mct = mct.toString("utf8");
    if (!isString_default(mct)) throw new TypeError("invalid type of mct");
    const buf = new b(4096);
    let [maxBlkNo, blkNo] = [0, 0];
    for (const row of mct.split(/(\r?\n)+/)) {
      if (/^[+]Sector: \d+$/.test(row)) {
        const secNo = parseInt_default(row.slice(9));
        blkNo = secNo < 32 ? secNo * 4 : (secNo - 24) * 16;
      } else if (/^[0-9a-fA-F-]{32}$/.test(row)) {
        if (blkNo >= 256) throw new Error(`Invalid block number: ${blkNo}`);
        const blockbuf = b.from(row.replaceAll("-", "0"), "hex");
        if (blockbuf.length !== 16) throw new Error(`Invalid block size: ${blockbuf.length} bytes`);
        buf.set(blockbuf, blkNo * 16);
        if (blkNo > maxBlkNo) maxBlkNo = blkNo;
        blkNo++;
      }
    }
    return buf.subarray(0, maxBlkNo < 64 ? 1024 : maxBlkNo < 128 ? 2048 : 4096);
  }
  /**
   * Convert Mifare Keys `.dic` string to keys.
   * @param dict - Mifare Keys `.dic` string
   * @returns The keys imported from Mifare Keys `.dic` string.
   * @group Mifare Classic Related
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async () => {
   *   const { ChameleonUltra } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   const dict = '#test\r\nFFFFFFFFFFFF\r\n\r\n'
   *   const keys = ChameleonUltra.mf1KeysFromDict(dict)
   *   console.log(keys.map(key => key.toString('hex').toUpperCase()))
   *   // ['FFFFFFFFFFFF']
   * })()
   * ```
   */
  static mf1KeysFromDict(dict) {
    if (!isString_default(dict)) throw new TypeError("dict must be a string");
    dict = dict.replaceAll(/(\r?\n)+/g, "\n").replaceAll(/#[^\n]*\n?/msg, "");
    return _ChameleonUltra.mf1UniqueKeys(b.from(dict, "hex").chunk(BYTES_PER_MF1_KEY));
  }
  /**
   * Retrieve DFU protocol version.
   *
   * Syntax and ID of this command is permanent. If protocol version changes other opcode may not be valid any more.
   * @returns Protocol version.
   * @group DFU Related
   * @see Please refer to {@link https://docs.nordicsemi.com/bundle/sdk_nrf5_v17.1.0/page/lib_dfu_transport.html | nRF5 SDK: DFU Protocol} for more infomation.
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   await ultra.cmdDfuEnter()
   *   console.log(await ultra.cmdDfuGetProtocol()) // Print: 1
   *   await ultra.cmdDfuAbort()
   * })(vm.ultra)
   * ```
   */
  async cmdDfuGetProtocol() {
    if (!this.isConnected()) await this.connect();
    if (!this.isDfu()) throw new Error("Please enter DFU mode first.");
    const op = 0 /* PROTOCOL_VERSION */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { op });
    await __privateMethod(this, _ChameleonUltra_instances, sendBuffer_fn).call(this, b.pack("<B", op));
    return (await readResp()).data[0];
  }
  /**
   * Create selected object.
   * @param type - Object type.
   * @param size - Object size in bytes.
   * @returns
   * - `crc32`: Current CRC.
   * - `offset`: Current offset.
   * @group DFU Related
   * @see Please refer to {@link https://docs.nordicsemi.com/bundle/sdk_nrf5_v17.1.0/page/lib_dfu_transport.html | nRF5 SDK: DFU Protocol} for more infomation.
   */
  async cmdDfuCreateObject(type, size) {
    if (!this.isConnected()) await this.connect();
    if (!this.isDfu()) throw new Error("Please enter DFU mode first.");
    if (!isValidDfuObjType(type)) throw new TypeError("Invalid type");
    const op = 1 /* OBJECT_CREATE */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { op });
    await __privateMethod(this, _ChameleonUltra_instances, sendBuffer_fn).call(this, b.pack("<BBI", op, type, size));
    await readResp();
  }
  /**
   * Set receipt notification
   *
   * This request configures the frequency of sending CRC responses after Write request commands.
   * @param prn - If set to `0`, then the CRC response is never sent after Write request. Otherwise, it is sent every `prn`'th Write request.
   * @group DFU Related
   * @see Please refer to {@link https://docs.nordicsemi.com/bundle/sdk_nrf5_v17.1.0/page/lib_dfu_transport.html | nRF5 SDK: DFU Protocol} for more infomation.
   */
  async cmdDfuSetPrn(prn) {
    if (!this.isConnected()) await this.connect();
    if (!this.isDfu()) throw new Error("Please enter DFU mode first.");
    const op = 2 /* RECEIPT_NOTIF_SET */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { op });
    await __privateMethod(this, _ChameleonUltra_instances, sendBuffer_fn).call(this, b.pack("<BI", op, prn));
    await readResp();
  }
  /**
   * Request CRC of selected object.
   * @returns
   * - `crc32`: Current CRC.
   * - `offset`: Current offset.
   * @group DFU Related
   * @see Please refer to {@link https://docs.nordicsemi.com/bundle/sdk_nrf5_v17.1.0/page/lib_dfu_transport.html | nRF5 SDK: DFU Protocol} for more infomation.
   */
  async cmdDfuGetObjectCrc() {
    if (!this.isConnected()) await this.connect();
    if (!this.isDfu()) throw new Error("Please enter DFU mode first.");
    const op = 3 /* CRC_GET */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { op });
    await __privateMethod(this, _ChameleonUltra_instances, sendBuffer_fn).call(this, b.pack("<B", op));
    const [offset, crc32] = (await readResp()).data.unpack("<II");
    return { offset, crc32 };
  }
  /**
   * Execute selected object.
   * @group DFU Related
   * @see Please refer to {@link https://docs.nordicsemi.com/bundle/sdk_nrf5_v17.1.0/page/lib_dfu_transport.html | nRF5 SDK: DFU Protocol} for more infomation.
   */
  async cmdDfuExecuteObject() {
    if (!this.isConnected()) await this.connect();
    if (!this.isDfu()) throw new Error("Please enter DFU mode first.");
    const op = 4 /* OBJECT_EXECUTE */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { op });
    await __privateMethod(this, _ChameleonUltra_instances, sendBuffer_fn).call(this, b.pack("<B", op));
    await readResp();
  }
  /**
   * Select object.
   * @param type - Object type.
   * @returns
   * - `crc32`: Current CRC.
   * - `maxSize`: Maximum size of selected object.
   * - `offset`: Current offset.
   * @group DFU Related
   * @see Please refer to {@link https://docs.nordicsemi.com/bundle/sdk_nrf5_v17.1.0/page/lib_dfu_transport.html | nRF5 SDK: DFU Protocol} for more infomation.
   */
  async cmdDfuSelectObject(type) {
    if (!this.isConnected()) await this.connect();
    if (!this.isDfu()) throw new Error("Please enter DFU mode first.");
    if (!isValidDfuObjType(type)) throw new TypeError("Invalid type");
    const op = 6 /* OBJECT_SELECT */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { op });
    await __privateMethod(this, _ChameleonUltra_instances, sendBuffer_fn).call(this, b.pack("<BB", op, type));
    const [maxSize, offset, crc32] = (await readResp()).data.unpack("<III");
    return { crc32, maxSize, offset };
  }
  /**
   * Retrieve MTU size.
   * @returns The preferred MTU size on this request.
   * @group DFU Related
   * @see Please refer to {@link https://docs.nordicsemi.com/bundle/sdk_nrf5_v17.1.0/page/lib_dfu_transport.html | nRF5 SDK: DFU Protocol} for more infomation.
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   await ultra.cmdDfuEnter()
   *   console.log(await ultra.cmdDfuGetMtu()) // Print: 1025
   *   await ultra.cmdDfuAbort()
   * })(vm.ultra)
   * ```
   */
  async cmdDfuGetMtu() {
    if (!this.isConnected()) await this.connect();
    if (!this.isDfu()) throw new Error("Please enter DFU mode first.");
    const op = 7 /* MTU_GET */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { op });
    await __privateMethod(this, _ChameleonUltra_instances, sendBuffer_fn).call(this, b.pack("<B", op));
    const respData = (await readResp()).data;
    return respData.length < 2 ? void 0 : respData.readUInt16LE(0);
  }
  /**
   * Ping.
   * @param id - Ping ID that will be returned in response.
   * @returns The received ID which is echoed back.
   * @group DFU Related
   * @see Please refer to {@link https://docs.nordicsemi.com/bundle/sdk_nrf5_v17.1.0/page/lib_dfu_transport.html | nRF5 SDK: DFU Protocol} for more infomation.
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   await ultra.cmdDfuEnter()
   *   console.log(await ultra.cmdDfuPing(1)) // Print: 1
   *   await ultra.cmdDfuAbort()
   * })(vm.ultra)
   * ```
   */
  async cmdDfuPing(id) {
    if (!this.isConnected()) await this.connect();
    if (!this.isDfu()) throw new Error("Please enter DFU mode first.");
    const op = 9 /* PING */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { op });
    await __privateMethod(this, _ChameleonUltra_instances, sendBuffer_fn).call(this, b.pack("<BB", op, id));
    return (await readResp()).data[0];
  }
  /**
   * Retrieve hardware version.
   * @returns
   * - `part`: Hardware part, from FICR register.
   * - `ramSize`: RAM size, in bytes.
   * - `romPageSize`: ROM flash page size, in bytes.
   * - `romSize`: ROM size, in bytes.
   * - `variant`: Hardware variant, from FICR register.
   * @group DFU Related
   * @see Please refer to {@link https://docs.nordicsemi.com/bundle/sdk_nrf5_v17.1.0/page/lib_dfu_transport.html | nRF5 SDK: DFU Protocol} for more infomation.
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   await ultra.cmdDfuEnter()
   *   console.log(await ultra.cmdDfuGetHardwareVersion())
   *   await ultra.cmdDfuAbort()
   *   // {
   *   //   "part": "nRF52840",
   *   //   "variant": "AAD0",
   *   //   "romSize": 1048576,
   *   //   "ramSize": 262144,
   *   //   "romPageSize": 4096
   *   // }
   * })(vm.ultra)
   * ```
   */
  async cmdDfuGetHardwareVersion() {
    if (!this.isConnected()) await this.connect();
    if (!this.isDfu()) throw new Error("Please enter DFU mode first.");
    const op = 10 /* HARDWARE_VERSION */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { op });
    await __privateMethod(this, _ChameleonUltra_instances, sendBuffer_fn).call(this, b.pack("<B", op));
    const [part, variant, romSize, ramSize, romPageSize] = (await readResp()).data.unpack("<I4sIII");
    return { part: `nRF${part.toString(16)}`, variant: variant.toReversed().toString(), romSize, ramSize, romPageSize };
  }
  /**
   * Retrieve firmware version.
   * @returns
   * - `addr`: Firmware address in flash.
   * - `len`: Firmware length in bytes.
   * - `type`: Firmware type.
   * - `version`: Firmware version.
   * @group DFU Related
   * @see Please refer to {@link https://docs.nordicsemi.com/bundle/sdk_nrf5_v17.1.0/page/lib_dfu_transport.html | nRF5 SDK: DFU Protocol} for more infomation.
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { DfuFwId, DfuFwType } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   await ultra.cmdDfuEnter()
   *   for (const fwId of [DfuFwId.BOOTLOADER, DfuFwId.APPLICATION, DfuFwId.SOFTDEVICE]) {
   *     const { type, version, addr, len } = await ultra.cmdDfuGetFirmwareVersion(fwId)
   *     console.log(`type = ${DfuFwType[type]}, version = ${version}, addr = 0x${addr.toString(16)}, len = ${len}`)
   *   }
   *   await ultra.cmdDfuAbort()
   *   // type = BOOTLOADER, version = 1, addr = 0xf3000, len = 45056
   *   // type = SOFTDEVICE, version = 7002000, addr = 0x1000, len = 159744
   *   // type = APPLICATION, version = 1, addr = 0x27000, len = 222844
   * })(vm.ultra)
   * ```
   */
  async cmdDfuGetFirmwareVersion(id) {
    if (!this.isConnected()) await this.connect();
    if (!this.isDfu()) throw new Error("Please enter DFU mode first.");
    if (!isDfuFwId(id)) throw new TypeError("Invalid id");
    const op = 11 /* FIRMWARE_VERSION */;
    const readResp = await __privateMethod(this, _ChameleonUltra_instances, createReadRespFn_fn).call(this, { op });
    await __privateMethod(this, _ChameleonUltra_instances, sendBuffer_fn).call(this, b.pack("<BB", op, id));
    const [type, version2, addr, len] = (await readResp()).data.unpack("<BIII");
    return { type, version: version2, addr, len };
  }
  /**
   * Abort the DFU procedure.
   * @group DFU Related
   * @see Please refer to {@link https://docs.nordicsemi.com/bundle/sdk_nrf5_v17.1.0/page/lib_dfu_transport.html | nRF5 SDK: DFU Protocol} for more infomation.
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   await ultra.cmdDfuEnter()
   *   await ultra.cmdDfuAbort()
   * })(vm.ultra)
   * ```
   */
  async cmdDfuAbort() {
    if (!this.isConnected()) await this.connect();
    if (!this.isDfu()) throw new Error("Please enter DFU mode first.");
    const op = 12 /* ABORT */;
    await __privateMethod(this, _ChameleonUltra_instances, sendBuffer_fn).call(this, b.pack("<B", op));
  }
  /**
   * DFU: Upload object of image.
   * @param type - Object type.
   * @param buf - Data.
   * @group DFU Related
   * @see Please refer to {@link https://docs.nordicsemi.com/bundle/sdk_nrf5_v17.1.0/page/lib_dfu_transport.html | nRF5 SDK: DFU Protocol} for more infomation.
   */
  async dfuUpdateObject(type, buf) {
    if (!isValidDfuObjType(type)) throw new TypeError("Invalid type");
    if (isNil_default(this.port?.dfuWriteObject)) throw new Error("this.port.dfuWriteObject is not implemented");
    const emitProgress = (offset) => {
      this.emitter.emit("progress", {
        func: "dfuUpdateObject",
        offset,
        size: buf.length,
        type
      });
    };
    const uploaded = await this.cmdDfuSelectObject(type);
    __privateMethod(this, _ChameleonUltra_instances, debug_fn).call(this, "core", `uploaded = ${JSON.stringify(uploaded)}`);
    let buf1 = buf.subarray(0, uploaded.offset);
    let crc1 = { offset: buf1.length, crc32: n2(buf1) };
    let crcFailCnt = 0;
    if (!isMatch_default(uploaded, crc1)) {
      __privateMethod(this, _ChameleonUltra_instances, debug_fn).call(this, "core", "aborted");
      await this.cmdDfuAbort();
      Object.assign(uploaded, await this.cmdDfuSelectObject(type));
    }
    emitProgress(uploaded.offset);
    const mtu = await this.cmdDfuGetMtu();
    while (uploaded.offset < buf.length) {
      buf1 = buf.subarray(uploaded.offset).subarray(0, uploaded.maxSize);
      await this.cmdDfuCreateObject(type, buf1.length);
      await this.port.dfuWriteObject(buf1, mtu);
      const crc2 = { offset: uploaded.offset + buf1.length, crc32: n2(buf1, uploaded.crc32) };
      crc1 = await this.cmdDfuGetObjectCrc();
      if (!isMatch_default(crc1, crc2)) {
        crcFailCnt++;
        if (crcFailCnt > 10) throw new Error("crc32 check failed 10 times");
        continue;
      }
      await this.cmdDfuExecuteObject();
      Object.assign(uploaded, crc1);
      crcFailCnt = 0;
      emitProgress(uploaded.offset);
    }
  }
  /**
   * Upload DFU image.
   * @param image - The DFU image.
   * @group DFU Related
   * @see Please refer to {@link https://docs.nordicsemi.com/bundle/sdk_nrf5_v17.1.0/page/lib_dfu_transport.html | nRF5 SDK: DFU Protocol} for more infomation.
   * @example
   * ```js
   * // you can run in DevTools of https://taichunmin.idv.tw/chameleon-ultra.js/test.html
   * await (async ultra => {
   *   const { DeviceModel } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/+esm')
   *   const { default: DfuZip } = await import('https://cdn.jsdelivr.net/npm/chameleon-ultra.js@0/plugin/DfuZip/+esm')
   *   const model = (await ultra.cmdGetDeviceModel()) === DeviceModel.ULTRA ? 'ultra' : 'lite'
   *   const dfuZipUrl = `https://taichunmin.idv.tw/ChameleonUltra-releases/dev/${model}-dfu-app.zip`
   *   const dfuZip = new DfuZip(new Buffer((await axios.get(dfuZipUrl, { responseType: 'arraybuffer' }))?.data))
   *   const image = await dfuZip.getAppImage()
   *   const imageGitVersion = await dfuZip.getGitVersion()
   *   console.log({ type: image.type, headerSize: image.header.length, bodySize: image.body.length, gitVersion: imageGitVersion })
   *   // {
   *   //   "type": "application",
   *   //   "headerSize": 141,
   *   //   "bodySize": 222844,
   *   //   "gitVersion": "v2.0.0-135-g3cadd47"
   *   // }
   *   const gitVersion = await ultra.cmdGetGitVersion()
   *   console.log(`gitVersion = ${gitVersion}`) // Print: gitVersion = v2.0.0-135-g3cadd47
   *   await ultra.cmdDfuEnter()
   *   ultra.emitter.on('progress', console.log)
   *   // {
   *   //   "func": "dfuUpdateObject",
   *   //   "offset": 0,
   *   //   "size": 222844,
   *   //   "type": 2
   *   // }
   *   await ultra.dfuUpdateImage(image)
   *   ultra.emitter.removeListener('progress', console.log)
   * })(vm.ultra)
   * ```
   */
  async dfuUpdateImage(image) {
    await this.dfuUpdateObject(1 /* COMMAND */, image.header);
    await this.dfuUpdateObject(2 /* DATA */, image.body);
    for (let i = 500; i >= 0; i--) {
      if (!this.isConnected()) break;
      await sleep(10);
    }
    if (this.isConnected()) {
      await this.disconnect(new Error("Reboot after DFU"));
      await sleep(500);
    }
    __privateMethod(this, _ChameleonUltra_instances, debug_fn).call(this, "core", "rebooted");
  }
};
_deviceMode = new WeakMap();
_isDisconnecting = new WeakMap();
_rxReader = new WeakMap();
_supportedCmds = new WeakMap();
_writeChain = new WeakMap();
_emitErr = new WeakMap();
_hooks = new WeakMap();
_middlewares = new WeakMap();
_ChameleonUltra_instances = new WeakSet();
debug_fn = function(namespace, formatter, ...args) {
  this.emitter.emit("debug", namespace, formatter, ...args);
};
ultraStartReading_fn = async function() {
  const reader = __privateGet(this, _rxReader);
  if (isNil_default(reader)) throw new Error("this.#rxReader is nil");
  try {
    const bufs = [];
    this.emitter.emit("connected", /* @__PURE__ */ new Date());
    while (true) {
      const { done, value: chunk2 } = await reader.read().catch(wrapErr);
      if (isNil_default(chunk2)) break;
      bufs.push(b.isBuffer(chunk2) ? chunk2 : b.fromView(chunk2));
      let concated = b.concat(bufs.splice(0, bufs.length));
      try {
        while (concated.length > 0) {
          const sofIdx = concated.indexOf(START_OF_FRAME);
          if (sofIdx < 0) break;
          else if (sofIdx > 0) concated = concated.subarray(sofIdx);
          if (concated.length < 10) break;
          if (bufLrc(concated.subarray(2, 8)) !== concated[8]) {
            concated = concated.subarray(1);
            continue;
          }
          const lenFrame = concated.readUInt16BE(6) + 10;
          if (concated.length < lenFrame) break;
          if (bufLrc(concated.subarray(9, lenFrame - 1)) !== concated[lenFrame - 1]) {
            concated = concated.subarray(1);
            continue;
          }
          this.emitter.emit("resp", new UltraFrame(concated.slice(0, lenFrame)));
          concated = concated.subarray(lenFrame);
        }
      } finally {
        if (concated.length > 0) bufs.push(concated);
      }
      if (done) break;
    }
    this.emitter.emit("disconnected", /* @__PURE__ */ new Date());
  } catch (err) {
    __privateGet(this, _emitErr).call(this, err);
    this.emitter.emit("disconnected", /* @__PURE__ */ new Date(), err.message);
  }
};
dfuStartReading_fn = async function() {
  const reader = __privateGet(this, _rxReader);
  if (isNil_default(reader)) throw new Error("this.#rxReader is nil");
  try {
    this.emitter.emit("connected", /* @__PURE__ */ new Date());
    while (true) {
      const { done, value: chunk2 } = await reader.read().catch(wrapErr);
      if (isNil_default(chunk2)) break;
      this.emitter.emit("resp", new DfuFrame(b.isBuffer(chunk2) ? chunk2 : b.fromView(chunk2)));
      if (done) break;
    }
    this.emitter.emit("disconnected", /* @__PURE__ */ new Date());
  } catch (err) {
    __privateGet(this, _emitErr).call(this, err);
    this.emitter.emit("disconnected", /* @__PURE__ */ new Date(), err.message);
  }
};
sendBuffer_fn = async function(buf) {
  if (!b.isBuffer(buf)) throw new TypeError("buf must be a Buffer");
  if (!this.isConnected()) await this.connect();
  const frame = this.isDfu() ? new DfuFrame(buf) : new UltraFrame(buf);
  if (!(frame instanceof DfuFrame) || frame.op !== 8 /* OBJECT_WRITE */) __privateMethod(this, _ChameleonUltra_instances, debug_fn).call(this, "send", frame.inspect);
  const runWrite = async () => {
    const writer = this.port?.writable?.getWriter();
    if (isNil_default(writer)) throw new Error("Failed to getWriter(). Did you remember to use adapter plugin?");
    try {
      await writer.write(buf);
    } finally {
      writer.releaseLock();
    }
  };
  const chain = __privateGet(this, _writeChain).then(runWrite, runWrite);
  __privateSet(this, _writeChain, chain.catch(() => {
  }));
  return chain;
};
sendCmd_fn = async function(opts) {
  const { cmd, status = 0, data = b.allocUnsafe(0) } = opts;
  const buf = b.pack(`!2sHHHx${data.length}sx`, START_OF_FRAME, cmd, status, data.length, data);
  buf[8] = bufLrc(buf.subarray(2, 8));
  buf[buf.length - 1] = bufLrc(buf.subarray(9, -1));
  await __privateMethod(this, _ChameleonUltra_instances, sendBuffer_fn).call(this, buf);
};
createReadRespFn_fn = async function(args) {
  try {
    if (!this.isConnected()) await this.connect();
    if (isNil_default(__privateGet(this, _rxReader))) throw new Error("#rxReader is undefined");
    if (isNil_default(args.timeout)) args.timeout = this.readDefaultTimeout;
    const respGenerator = new EventAsyncGenerator();
    this.emitter.on("resp", respGenerator.onData);
    this.emitter.once("disconnected", respGenerator.onClose);
    let timeout;
    respGenerator.removeCallback = () => {
      this.emitter.removeListener("resp", respGenerator.onData);
      this.emitter.removeListener("disconnected", respGenerator.onClose);
      if (!isNil_default(timeout)) {
        clearTimeout(timeout);
        timeout = void 0;
      }
    };
    return async () => {
      timeout = setTimeout(() => {
        respGenerator.onError(new Error(`read resp timeout (${args.timeout}ms)`));
      }, args.timeout);
      let resp = null;
      for await (const resp1 of respGenerator) {
        if (!isNil_default(args.cmd) && resp1.cmd !== args.cmd) continue;
        if (!isNil_default(args.op) && resp1.op !== args.op) continue;
        if (!(args.filter?.(resp1) ?? true)) continue;
        if (resp1.errMsg) {
          __privateMethod(this, _ChameleonUltra_instances, debug_fn).call(this, "respError", resp1.inspect);
          throw merge_default(new Error(resp1.errMsg), {
            data: { resp1 },
            ...resp1 instanceof UltraFrame ? { status: resp1.status } : { status: resp1.result }
          });
        }
        __privateMethod(this, _ChameleonUltra_instances, debug_fn).call(this, "resp", resp1.inspect);
        resp = resp1;
        break;
      }
      if (isNil_default(resp)) throw new Error("device disconnected");
      return resp;
    };
  } catch (err) {
    this.emitter.emit("error", err);
    throw err;
  }
};
/**
 * The supported version of SDK.
 * @group Device Related
 */
__publicField(_ChameleonUltra, "VERSION_SUPPORTED", VERSION_SUPPORTED);
var ChameleonUltra = _ChameleonUltra;
var _UltraFrame = class _UltraFrame {
  constructor(buf) {
    __publicField(this, "buf");
    this.buf = b.isBuffer(buf) ? buf : b.fromView(buf);
  }
  static inspect(resp) {
    const { buf } = resp;
    return [
      toUpperHex(buf.subarray(0, 2)),
      // sof + sof lrc
      toUpperHex(buf.subarray(2, 4)),
      // cmd
      toUpperHex(buf.subarray(4, 6)),
      // status
      toUpperHex(buf.subarray(6, 8)),
      // data len
      toUpperHex(buf.subarray(8, 9)),
      // head lrc
      buf.readUInt16BE(6) > 0 ? toUpperHex(buf.subarray(9, -1)) : "(no data)",
      // data
      toUpperHex(buf.subarray(-1))
      // data lrc
    ].join(" ");
  }
  get cmd() {
    return this.buf.readUInt16BE(2);
  }
  get data() {
    return this.buf.subarray(9, -1);
  }
  get inspect() {
    return _UltraFrame.inspect(this);
  }
  get status() {
    return this.buf.readUInt16BE(4);
  }
  get errMsg() {
    const status = this.status;
    if (!isFailedUltraResCode(status)) return;
    return UltraErrMsg.get(status) ?? `Unknown status code: ${status}`;
  }
};
__publicField(_UltraFrame, "MAX_DATA_LEN", 512);
var UltraFrame = _UltraFrame;
var DfuFrame = class _DfuFrame {
  constructor(buf) {
    __publicField(this, "buf");
    this.buf = buf;
  }
  static inspect(frame) {
    if (frame.isResp === 1) return `op = ${DfuOp[frame.op]}, resCode = ${DfuResCode[frame.result]}, data = ${toUpperHex(frame.data)}`;
    if (frame.op === 8 /* OBJECT_WRITE */) return `op = ${DfuOp[frame.op]}, data.length = ${frame.data.length}`;
    return `op = ${DfuOp[frame.op]}, data = ${toUpperHex(frame.data)}`;
  }
  get isResp() {
    return +(this.buf[0] === 96 /* RESPONSE */);
  }
  get data() {
    return this.buf.subarray(this.isResp === 1 ? 3 : 1);
  }
  get inspect() {
    return _DfuFrame.inspect(this);
  }
  get op() {
    return this.buf[this.isResp];
  }
  get result() {
    if (this.isResp === 0) return 1 /* SUCCESS */;
    return this.buf[2] === 11 /* EXT_ERROR */ ? this.buf.readUInt16BE(2) : this.buf[2];
  }
  get errMsg() {
    const result = this.result;
    if (result === 1 /* SUCCESS */) return;
    return DfuErrMsg.get(result) ?? `Unknown DfuResCode: ${result}`;
  }
};
function bufLrc(buf) {
  let sum = 0;
  for (const u8 of buf) sum += u8;
  return 256 - sum & 255;
}
function mfuCheckRespNakCrc16a(resp) {
  const createErr = (status, msg) => merge_default(new Error(msg), { status, data: { resp } });
  if (resp.length === 1 && resp[0] !== 10) throw createErr(2 /* HF_ERR_STAT */, `received NAK 0x${toUpperHex(resp)}`);
  if (resp.length < 3) throw createErr(3 /* HF_ERR_CRC */, "unexpected resp");
  const data = resp.subarray(0, -2);
  if (t(data) !== resp.readUInt16LE(data.length)) throw createErr(3 /* HF_ERR_CRC */, "invalid crc16a of resp");
  return data;
}
function calcUltraMaxItemSize(bytesPerItem = 1, bytesUsed = 0) {
  const remain = Math.trunc((UltraFrame.MAX_DATA_LEN - bytesUsed) / bytesPerItem);
  return Math.max(0, remain);
}
function isValidHidProxOrFail(tag) {
  const tag1 = { format: 1 /* H10301 */, fc: 0, il: 0, oem: 0, ...tag };
  const fmtlimit = HidProxFormatLimit.get(tag1.format);
  if (isNil_default(fmtlimit)) return tag1;
  if (tag1.fc < 0 || tag1.fc > fmtlimit[0]) throw new RangeError(`Facility must between 0 and ${fmtlimit[0]}`);
  if (tag1.cn < 0 || tag1.cn > fmtlimit[1]) throw new RangeError(`Card Number must between 0 and ${fmtlimit[1]}`);
  if (tag1.il < 0 || tag1.il > fmtlimit[2]) throw new RangeError(`Issue Level must between 0 and ${fmtlimit[2]}`);
  if (tag1.oem < 0 || tag1.oem > fmtlimit[3]) throw new RangeError(`OEM must between 0 and ${fmtlimit[3]}`);
  return tag1;
}
function hidProxTagToBuf(tag) {
  const { format, fc, cn, il, oem } = isValidHidProxOrFail(tag);
  return b.pack("!BIBIBH", format, fc, Math.trunc(cn / 4294967296), cn & 4294967295, il, oem);
}

// src/index.ts
var version = "2.2.0-DAHAOREN";

// src/_streamweb_stub.ts
var TransformStream = void 0;
var WritableStream2 = void 0;

// node_modules/web-serial-polyfill/dist/serial.js
var SerialPolyfillProtocol;
(function(SerialPolyfillProtocol2) {
  SerialPolyfillProtocol2[SerialPolyfillProtocol2["UsbCdcAcm"] = 0] = "UsbCdcAcm";
})(SerialPolyfillProtocol || (SerialPolyfillProtocol = {}));
var kSetLineCoding = 32;
var kSetControlLineState = 34;
var kSendBreak = 35;
var kDefaultBufferSize = 255;
var kDefaultDataBits = 8;
var kDefaultParity = "none";
var kDefaultStopBits = 1;
var kAcceptableDataBits = [16, 8, 7, 6, 5];
var kAcceptableStopBits = [1, 2];
var kAcceptableParity = ["none", "even", "odd"];
var kParityIndexMapping = ["none", "odd", "even"];
var kStopBitsIndexMapping = [1, 1.5, 2];
var kDefaultPolyfillOptions = {
  protocol: SerialPolyfillProtocol.UsbCdcAcm,
  usbControlInterfaceClass: 2,
  usbTransferInterfaceClass: 10
};
function findInterface(device, classCode) {
  const configuration = device.configurations[0];
  for (const iface of configuration.interfaces) {
    const alternate = iface.alternates[0];
    if (alternate.interfaceClass === classCode) {
      return iface;
    }
  }
  throw new TypeError(`Unable to find interface with class ${classCode}.`);
}
function findEndpoint(iface, direction) {
  const alternate = iface.alternates[0];
  for (const endpoint of alternate.endpoints) {
    if (endpoint.direction == direction) {
      return endpoint;
    }
  }
  throw new TypeError(`Interface ${iface.interfaceNumber} does not have an ${direction} endpoint.`);
}
var UsbEndpointUnderlyingSource = class {
  /**
   * Constructs a new UnderlyingSource that will pull data from the specified
   * endpoint on the given USB device.
   *
   * @param {USBDevice} device
   * @param {USBEndpoint} endpoint
   * @param {function} onError function to be called on error
   */
  constructor(device, endpoint, onError) {
    this.type = "bytes";
    this.device_ = device;
    this.endpoint_ = endpoint;
    this.onError_ = onError;
  }
  /**
   * Reads a chunk of data from the device.
   *
   * @param {ReadableByteStreamController} controller
   */
  pull(controller) {
    (async () => {
      var _a2;
      let chunkSize;
      if (controller.desiredSize) {
        const d2 = controller.desiredSize / this.endpoint_.packetSize;
        chunkSize = Math.ceil(d2) * this.endpoint_.packetSize;
      } else {
        chunkSize = this.endpoint_.packetSize;
      }
      try {
        const result = await this.device_.transferIn(this.endpoint_.endpointNumber, chunkSize);
        if (result.status != "ok") {
          controller.error(`USB error: ${result.status}`);
          this.onError_();
        }
        if ((_a2 = result.data) === null || _a2 === void 0 ? void 0 : _a2.buffer) {
          const chunk2 = new Uint8Array(result.data.buffer, result.data.byteOffset, result.data.byteLength);
          controller.enqueue(chunk2);
        }
      } catch (error) {
        controller.error(error.toString());
        this.onError_();
      }
    })();
  }
};
var UsbEndpointUnderlyingSink = class {
  /**
   * Constructs a new UnderlyingSink that will write data to the specified
   * endpoint on the given USB device.
   *
   * @param {USBDevice} device
   * @param {USBEndpoint} endpoint
   * @param {function} onError function to be called on error
   */
  constructor(device, endpoint, onError) {
    this.device_ = device;
    this.endpoint_ = endpoint;
    this.onError_ = onError;
  }
  /**
   * Writes a chunk to the device.
   *
   * @param {Uint8Array} chunk
   * @param {WritableStreamDefaultController} controller
   */
  async write(chunk2, controller) {
    try {
      const result = await this.device_.transferOut(this.endpoint_.endpointNumber, chunk2);
      if (result.status != "ok") {
        controller.error(result.status);
        this.onError_();
      }
    } catch (error) {
      controller.error(error.toString());
      this.onError_();
    }
  }
};
var SerialPort = class {
  /**
   * constructor taking a WebUSB device that creates a SerialPort instance.
   * @param {USBDevice} device A device acquired from the WebUSB API
   * @param {SerialPolyfillOptions} polyfillOptions Optional options to
   * configure the polyfill.
   */
  constructor(device, polyfillOptions) {
    this.polyfillOptions_ = Object.assign(Object.assign({}, kDefaultPolyfillOptions), polyfillOptions);
    this.outputSignals_ = {
      dataTerminalReady: false,
      requestToSend: false,
      break: false
    };
    this.device_ = device;
    this.controlInterface_ = findInterface(this.device_, this.polyfillOptions_.usbControlInterfaceClass);
    this.transferInterface_ = findInterface(this.device_, this.polyfillOptions_.usbTransferInterfaceClass);
    this.inEndpoint_ = findEndpoint(this.transferInterface_, "in");
    this.outEndpoint_ = findEndpoint(this.transferInterface_, "out");
  }
  /**
   * Getter for the readable attribute. Constructs a new ReadableStream as
   * necessary.
   * @return {ReadableStream} the current readable stream
   */
  get readable() {
    var _a2;
    if (!this.readable_ && this.device_.opened) {
      this.readable_ = new ReadableStream(new UsbEndpointUnderlyingSource(this.device_, this.inEndpoint_, () => {
        this.readable_ = null;
      }), {
        highWaterMark: (_a2 = this.serialOptions_.bufferSize) !== null && _a2 !== void 0 ? _a2 : kDefaultBufferSize
      });
    }
    return this.readable_;
  }
  /**
   * Getter for the writable attribute. Constructs a new WritableStream as
   * necessary.
   * @return {WritableStream} the current writable stream
   */
  get writable() {
    var _a2;
    if (!this.writable_ && this.device_.opened) {
      this.writable_ = new WritableStream(new UsbEndpointUnderlyingSink(this.device_, this.outEndpoint_, () => {
        this.writable_ = null;
      }), new ByteLengthQueuingStrategy({
        highWaterMark: (_a2 = this.serialOptions_.bufferSize) !== null && _a2 !== void 0 ? _a2 : kDefaultBufferSize
      }));
    }
    return this.writable_;
  }
  /**
   * a function that opens the device and claims all interfaces needed to
   * control and communicate to and from the serial device
   * @param {SerialOptions} options Object containing serial options
   * @return {Promise<void>} A promise that will resolve when device is ready
   * for communication
   */
  async open(options) {
    this.serialOptions_ = options;
    this.validateOptions();
    try {
      await this.device_.open();
      if (this.device_.configuration === null) {
        await this.device_.selectConfiguration(1);
      }
      await this.device_.claimInterface(this.controlInterface_.interfaceNumber);
      if (this.controlInterface_ !== this.transferInterface_) {
        await this.device_.claimInterface(this.transferInterface_.interfaceNumber);
      }
      await this.setLineCoding();
      await this.setSignals({ dataTerminalReady: true });
    } catch (error) {
      if (this.device_.opened) {
        await this.device_.close();
      }
      throw new Error("Error setting up device: " + error.toString());
    }
  }
  /**
   * Closes the port.
   *
   * @return {Promise<void>} A promise that will resolve when the port is
   * closed.
   */
  async close() {
    const promises = [];
    if (this.readable_) {
      promises.push(this.readable_.cancel());
    }
    if (this.writable_) {
      promises.push(this.writable_.abort());
    }
    await Promise.all(promises);
    this.readable_ = null;
    this.writable_ = null;
    if (this.device_.opened) {
      await this.setSignals({ dataTerminalReady: false, requestToSend: false });
      await this.device_.close();
    }
  }
  /**
   * Forgets the port.
   *
   * @return {Promise<void>} A promise that will resolve when the port is
   * forgotten.
   */
  async forget() {
    return this.device_.forget();
  }
  /**
   * A function that returns properties of the device.
   * @return {SerialPortInfo} Device properties.
   */
  getInfo() {
    return {
      usbVendorId: this.device_.vendorId,
      usbProductId: this.device_.productId
    };
  }
  /**
   * A function used to change the serial settings of the device
   * @param {object} options the object which carries serial settings data
   * @return {Promise<void>} A promise that will resolve when the options are
   * set
   */
  reconfigure(options) {
    this.serialOptions_ = Object.assign(Object.assign({}, this.serialOptions_), options);
    this.validateOptions();
    return this.setLineCoding();
  }
  /**
   * Sets control signal state for the port.
   * @param {SerialOutputSignals} signals The signals to enable or disable.
   * @return {Promise<void>} a promise that is resolved when the signal state
   * has been changed.
   */
  async setSignals(signals) {
    this.outputSignals_ = Object.assign(Object.assign({}, this.outputSignals_), signals);
    if (signals.dataTerminalReady !== void 0 || signals.requestToSend !== void 0) {
      const value = (this.outputSignals_.dataTerminalReady ? 1 << 0 : 0) | (this.outputSignals_.requestToSend ? 1 << 1 : 0);
      await this.device_.controlTransferOut({
        "requestType": "class",
        "recipient": "interface",
        "request": kSetControlLineState,
        "value": value,
        "index": this.controlInterface_.interfaceNumber
      });
    }
    if (signals.break !== void 0) {
      const value = this.outputSignals_.break ? 65535 : 0;
      await this.device_.controlTransferOut({
        "requestType": "class",
        "recipient": "interface",
        "request": kSendBreak,
        "value": value,
        "index": this.controlInterface_.interfaceNumber
      });
    }
  }
  /**
   * Checks the serial options for validity and throws an error if it is
   * not valid
   */
  validateOptions() {
    if (!this.isValidBaudRate(this.serialOptions_.baudRate)) {
      throw new RangeError("invalid Baud Rate " + this.serialOptions_.baudRate);
    }
    if (!this.isValidDataBits(this.serialOptions_.dataBits)) {
      throw new RangeError("invalid dataBits " + this.serialOptions_.dataBits);
    }
    if (!this.isValidStopBits(this.serialOptions_.stopBits)) {
      throw new RangeError("invalid stopBits " + this.serialOptions_.stopBits);
    }
    if (!this.isValidParity(this.serialOptions_.parity)) {
      throw new RangeError("invalid parity " + this.serialOptions_.parity);
    }
  }
  /**
   * Checks the baud rate for validity
   * @param {number} baudRate the baud rate to check
   * @return {boolean} A boolean that reflects whether the baud rate is valid
   */
  isValidBaudRate(baudRate) {
    return baudRate % 1 === 0;
  }
  /**
   * Checks the data bits for validity
   * @param {number} dataBits the data bits to check
   * @return {boolean} A boolean that reflects whether the data bits setting is
   * valid
   */
  isValidDataBits(dataBits) {
    if (typeof dataBits === "undefined") {
      return true;
    }
    return kAcceptableDataBits.includes(dataBits);
  }
  /**
   * Checks the stop bits for validity
   * @param {number} stopBits the stop bits to check
   * @return {boolean} A boolean that reflects whether the stop bits setting is
   * valid
   */
  isValidStopBits(stopBits) {
    if (typeof stopBits === "undefined") {
      return true;
    }
    return kAcceptableStopBits.includes(stopBits);
  }
  /**
   * Checks the parity for validity
   * @param {string} parity the parity to check
   * @return {boolean} A boolean that reflects whether the parity is valid
   */
  isValidParity(parity) {
    if (typeof parity === "undefined") {
      return true;
    }
    return kAcceptableParity.includes(parity);
  }
  /**
   * sends the options alog the control interface to set them on the device
   * @return {Promise} a promise that will resolve when the options are set
   */
  async setLineCoding() {
    var _a2, _b2, _c;
    const buffer = new ArrayBuffer(7);
    const view = new DataView(buffer);
    view.setUint32(0, this.serialOptions_.baudRate, true);
    view.setUint8(4, kStopBitsIndexMapping.indexOf((_a2 = this.serialOptions_.stopBits) !== null && _a2 !== void 0 ? _a2 : kDefaultStopBits));
    view.setUint8(5, kParityIndexMapping.indexOf((_b2 = this.serialOptions_.parity) !== null && _b2 !== void 0 ? _b2 : kDefaultParity));
    view.setUint8(6, (_c = this.serialOptions_.dataBits) !== null && _c !== void 0 ? _c : kDefaultDataBits);
    const result = await this.device_.controlTransferOut({
      "requestType": "class",
      "recipient": "interface",
      "request": kSetLineCoding,
      "value": 0,
      "index": this.controlInterface_.interfaceNumber
    }, buffer);
    if (result.status != "ok") {
      throw new DOMException("NetworkError", "Failed to set line coding.");
    }
  }
};
var Serial = class {
  /**
   * Requests permission to access a new port.
   *
   * @param {SerialPortRequestOptions} options
   * @param {SerialPolyfillOptions} polyfillOptions
   * @return {Promise<SerialPort>}
   */
  async requestPort(options, polyfillOptions) {
    polyfillOptions = Object.assign(Object.assign({}, kDefaultPolyfillOptions), polyfillOptions);
    const usbFilters = [];
    if (options && options.filters) {
      for (const filter2 of options.filters) {
        const usbFilter = {
          classCode: polyfillOptions.usbControlInterfaceClass
        };
        if (filter2.usbVendorId !== void 0) {
          usbFilter.vendorId = filter2.usbVendorId;
        }
        if (filter2.usbProductId !== void 0) {
          usbFilter.productId = filter2.usbProductId;
        }
        usbFilters.push(usbFilter);
      }
    }
    if (usbFilters.length === 0) {
      usbFilters.push({
        classCode: polyfillOptions.usbControlInterfaceClass
      });
    }
    const device = await navigator.usb.requestDevice({ "filters": usbFilters });
    const port = new SerialPort(device, polyfillOptions);
    return port;
  }
  /**
   * Get the set of currently available ports.
   *
   * @param {SerialPolyfillOptions} polyfillOptions Polyfill configuration that
   * should be applied to these ports.
   * @return {Promise<SerialPort[]>} a promise that is resolved with a list of
   * ports.
   */
  async getPorts(polyfillOptions) {
    polyfillOptions = Object.assign(Object.assign({}, kDefaultPolyfillOptions), polyfillOptions);
    const devices = await navigator.usb.getDevices();
    const ports = [];
    devices.forEach((device) => {
      try {
        const port = new SerialPort(device, polyfillOptions);
        ports.push(port);
      } catch (e3) {
      }
    });
    return ports;
  }
};
var serial = new Serial();

// src/iifeExportHelper.ts
function isObject2(value) {
  const type = typeof value;
  return value != null && (type === "object" || type === "function");
}
function setObject(parent, path, value) {
  if (!isObject2(parent) || !Array.isArray(path) || path.length < 1) return parent;
  let cur = parent;
  for (const key of path.slice(0, -1)) {
    if (!isObject2(cur[key])) cur[key] = {};
    cur = cur[key];
  }
  cur[path.at(-1)] = value;
  return parent;
}

// src/plugin/SlipEncoder.ts
var _bufs, _Buffer;
var SlipDecodeTransformer = class {
  constructor(_Buffer2) {
    __privateAdd(this, _bufs, []);
    __privateAdd(this, _Buffer);
    __privateSet(this, _Buffer, _Buffer2);
  }
  transform(chunk2, controller) {
    if (!__privateGet(this, _Buffer).isBuffer(chunk2)) chunk2 = __privateGet(this, _Buffer).fromView(chunk2);
    __privateGet(this, _bufs).push(chunk2);
    let buf = __privateGet(this, _Buffer).concat(__privateGet(this, _bufs).splice(0, __privateGet(this, _bufs).length));
    try {
      while (buf.length > 0) {
        const endIdx = buf.indexOf(192 /* END */);
        if (endIdx < 0) break;
        const decoded = slipDecode(buf.subarray(0, endIdx + 1));
        if (decoded.length > 0) controller.enqueue(decoded);
        buf = buf.subarray(endIdx + 1);
      }
    } finally {
      if (buf.length > 0) __privateGet(this, _bufs).push(buf);
    }
  }
};
_bufs = new WeakMap();
_Buffer = new WeakMap();
function slipEncode(buf, Buffer1) {
  let len1 = buf.length;
  for (const b2 of buf) if (b2 === 192 /* END */ || b2 === 219 /* ESC */) len1++;
  const encoded = Buffer1.alloc(len1 + 1);
  let i = 0;
  for (const byte of buf) {
    if (byte === 192 /* END */) {
      encoded[i++] = 219 /* ESC */;
      encoded[i++] = 220 /* ESC_END */;
    } else if (byte === 219 /* ESC */) {
      encoded[i++] = 219 /* ESC */;
      encoded[i++] = 221 /* ESC_ESC */;
    } else {
      encoded[i++] = byte;
    }
  }
  encoded[i] = 192 /* END */;
  return encoded;
}
function slipDecode(buf) {
  let len1 = 0;
  for (let i = 0; i < buf.length; i++) {
    if (buf[i] === 219 /* ESC */) {
      if (++i >= buf.length) break;
      if (buf[i] === 220 /* ESC_END */) buf[len1++] = 192 /* END */;
      else if (buf[i] === 221 /* ESC_ESC */) buf[len1++] = 219 /* ESC */;
    } else if (buf[i] === 192 /* END */) break;
    else buf[len1++] = buf[i];
  }
  return buf.slice(0, len1);
}

// src/plugin/WebserialAdapter.ts
var WEBSERIAL_FILTERS = [
  { usbVendorId: 26728, usbProductId: 34438 },
  // Chameleon Ultra
  { usbVendorId: 6421, usbProductId: 21023 }
  // Chameleon Ultra DFU
];
function u16ToHex(num) {
  return toUpper_default(`000${num.toString(16)}`.slice(-4));
}
var _isDfu, _isOpen, _emitErr2, _serial, _TransformStream, _WritableStream, _WebserialAdapter_instances, debug_fn2;
var WebserialAdapter = class {
  constructor() {
    __privateAdd(this, _WebserialAdapter_instances);
    __privateAdd(this, _isDfu, false);
    __privateAdd(this, _isOpen, false);
    __publicField(this, "name", "adapter");
    __publicField(this, "port", null);
    __privateAdd(this, _emitErr2);
    __privateAdd(this, _serial);
    __privateAdd(this, _TransformStream);
    __privateAdd(this, _WritableStream);
    __publicField(this, "ultra");
    const navigator2 = globalThis?.navigator ?? {};
    __privateSet(this, _TransformStream, globalThis?.TransformStream ?? TransformStream);
    __privateSet(this, _WritableStream, globalThis?.WritableStream ?? WritableStream2);
    __privateSet(this, _serial, navigator2.serial ?? ("usb" in navigator2 ? serial : null));
    __privateSet(this, _emitErr2, (err) => {
      this.ultra?.emitter.emit("error", set_default(new Error(err.message), "cause", err));
    });
  }
  async install(context, pluginOption) {
    const ultra = this.ultra = context.ultra;
    const Buffer1 = context.Buffer;
    if (!isNil_default(ultra.$adapter)) await ultra.disconnect(new Error("adapter replaced"));
    const adapter = {
      isSupported: () => !isNil_default(__privateGet(this, _serial))
    };
    ultra.addHook("connect", async (ctx, next) => {
      if (ultra.$adapter !== adapter) return await next();
      try {
        if (!adapter.isSupported()) throw new Error("WebSerial not supported");
        this.port = await __privateGet(this, _serial).requestPort({ filters: WEBSERIAL_FILTERS });
        if (isNil_default(this.port)) throw new Error("user canceled");
        const info = await this.port.getInfo();
        __privateMethod(this, _WebserialAdapter_instances, debug_fn2).call(this, `port selected, usbVendorId = 0x${u16ToHex(info.usbVendorId)}, usbProductId = 0x${u16ToHex(info.usbProductId)}`);
        __privateSet(this, _isDfu, isMatch_default(info, WEBSERIAL_FILTERS[1]));
        await this.port.open({ baudRate: 115200 });
        while (isNil_default(this.port.readable) || isNil_default(this.port.writable)) await sleep(10);
        __privateSet(this, _isOpen, true);
        this.port.addEventListener("disconnect", () => {
          void ultra.disconnect(new Error("Webserial disconnect")).catch(() => {
          });
        });
        if (__privateGet(this, _isDfu)) {
          ultra.port = {
            isOpen: () => __privateGet(this, _isOpen),
            isDfu: () => __privateGet(this, _isDfu),
            readable: this.port.readable.pipeThrough(new (__privateGet(this, _TransformStream))(new SlipDecodeTransformer(Buffer1))),
            writable: new (__privateGet(this, _WritableStream))({
              write: async (chunk2) => {
                const writer = this.port?.writable?.getWriter();
                if (isNil_default(writer)) throw new Error("Failed to getWriter(). Did you remember to use adapter plugin?");
                await writer.write(slipEncode(chunk2, Buffer1));
                writer.releaseLock();
              }
            }),
            dfuWriteObject: async (buf, mtu) => {
              if (isNil_default(mtu)) throw new Error("mtu is required");
              const mtu1 = Math.trunc((mtu - 1) / 2) - 1;
              let chunk2;
              const writer = this.port?.writable?.getWriter();
              if (isNil_default(writer)) throw new Error("Failed to getWriter(). Did you remember to use adapter plugin?");
              for (const buf1 of buf.chunk(mtu1)) {
                if (chunk2?.length !== buf1.length) {
                  chunk2 = Buffer1.alloc(buf1.length + 1);
                  chunk2[0] = 8 /* OBJECT_WRITE */;
                }
                chunk2.set(buf1, 1);
                await writer.write(slipEncode(chunk2, Buffer1));
              }
              writer.releaseLock();
            }
          };
        } else {
          ultra.port = merge_default(this.port, {
            isOpen: () => __privateGet(this, _isOpen),
            isDfu: () => __privateGet(this, _isDfu)
          });
        }
        return await next();
      } catch (err) {
        __privateGet(this, _emitErr2).call(this, err);
        throw err;
      }
    });
    ultra.addHook("disconnect", async (ctx, next) => {
      if (ultra.$adapter !== adapter || isNil_default(this.port)) return await next();
      await next().catch(__privateGet(this, _emitErr2));
      await this.port.close().catch(__privateGet(this, _emitErr2));
      __privateSet(this, _isOpen, false);
      __privateSet(this, _isDfu, false);
      this.port = null;
    });
    return adapter;
  }
};
_isDfu = new WeakMap();
_isOpen = new WeakMap();
_emitErr2 = new WeakMap();
_serial = new WeakMap();
_TransformStream = new WeakMap();
_WritableStream = new WeakMap();
_WebserialAdapter_instances = new WeakSet();
debug_fn2 = function(formatter, ...args) {
  this.ultra?.emitter.emit("debug", "webserial", formatter, ...args);
};
setObject(globalThis, ["ChameleonUltraJS", "WebserialAdapter"], WebserialAdapter);

// src/plugin/WebbleAdapter.ts
var DFU_CTRL_CHAR_UUID = "8ec90001-f315-4f60-9fb8-838830daea50";
var DFU_PACKT_CHAR_UUID = "8ec90002-f315-4f60-9fb8-838830daea50";
var DFU_SERV_UUID = "0000fe59-0000-1000-8000-00805f9b34fb";
var ULTRA_RX_CHAR_UUID = "6e400002-b5a3-f393-e0a9-e50e24dcca9e";
var ULTRA_SERV_UUID = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
var ULTRA_TX_CHAR_UUID = "6e400003-b5a3-f393-e0a9-e50e24dcca9e";
var BLE_SCAN_FILTERS = [
  { name: "ChameleonUltra" },
  // Chameleon Ultra
  { namePrefix: "CU-" },
  // Chameleon Ultra DFU
  { services: [DFU_SERV_UUID] },
  // Chameleon Ultra DFU
  { services: [ULTRA_SERV_UUID] }
  // Chameleon Ultra, bluefy not support name filter
];
var _isOpen2, _WebbleAdapter_instances, debug_fn3;
var WebbleAdapter = class {
  constructor() {
    __privateAdd(this, _WebbleAdapter_instances);
    __privateAdd(this, _isOpen2, false);
    __publicField(this, "bluetooth");
    __publicField(this, "Buffer");
    __publicField(this, "ctrlChar", null);
    __publicField(this, "device", null);
    __publicField(this, "emitErr");
    __publicField(this, "name", "adapter");
    __publicField(this, "packtChar", null);
    __publicField(this, "port", null);
    __publicField(this, "rxChar", null);
    __publicField(this, "TransformStream");
    __publicField(this, "ultra");
    __publicField(this, "WritableStream");
    const navigator2 = globalThis?.navigator ?? {};
    this.bluetooth = navigator2?.bluetooth;
    this.WritableStream = globalThis?.WritableStream ?? WritableStream2;
    this.TransformStream = globalThis?.TransformStream ?? TransformStream;
    this.emitErr = (err) => {
      this.ultra?.emitter.emit("error", set_default(new Error(err.message), "cause", err));
    };
  }
  async install(context, pluginOption) {
    const { ultra, Buffer: Buffer4 } = context;
    [this.ultra, this.Buffer] = [ultra, Buffer4];
    if (!isNil_default(ultra.$adapter)) await ultra.disconnect(new Error("adapter replaced"));
    const _isSupported = await this.bluetooth?.getAvailability() ?? false;
    const adapter = {
      isSupported: () => _isSupported
    };
    const gattIsConnected = () => {
      return this.device?.gatt?.connected ?? false;
    };
    ultra.addHook("connect", async (ctx, next) => {
      if (ultra.$adapter !== adapter) return await next();
      try {
        if (!adapter.isSupported()) throw new Error("WebBLE not supported");
        this.device = await this.bluetooth?.requestDevice({
          filters: BLE_SCAN_FILTERS,
          optionalServices: [DFU_SERV_UUID, ULTRA_SERV_UUID]
        }).catch((err) => {
          throw set_default(new Error(err.message), "cause", err);
        }) ?? null;
        if (isNil_default(this.device)) throw new Error("no device");
        this.device.addEventListener("gattserverdisconnected", () => {
          void ultra.disconnect(new Error("WebBLE gattserverdisconnected")).catch(() => {
          });
        });
        __privateMethod(this, _WebbleAdapter_instances, debug_fn3).call(this, `device selected, name = ${this.device.name ?? "null"}, id = ${this.device.id}`);
        for (let i = 0; i < 100; i++) {
          if (gattIsConnected()) break;
          await this.device.gatt?.connect().catch(this.emitErr);
          await sleep(100);
        }
        if (!gattIsConnected()) throw new Error("Failed to connect gatt");
        const servs = new Map(map_default(await this.device?.gatt?.getPrimaryServices() ?? [], (serv) => [toCanonicalUUID(serv.uuid), serv]));
        __privateMethod(this, _WebbleAdapter_instances, debug_fn3).call(this, `gattServUuids = ${JSON.stringify([...servs.keys()])}`);
        const txStream = new this.TransformStream();
        const txStreamOnNotify = async (event) => {
          const dv = event?.target?.value;
          if (!ArrayBuffer.isView(dv)) return;
          const writer = txStream.writable.getWriter();
          if (isNil_default(writer)) throw new Error("Failed to get txStream writer");
          await writer.write(this.Buffer?.fromView(dv));
          writer.releaseLock();
        };
        if (servs.has(ULTRA_SERV_UUID)) {
          this.port = {
            isOpen: () => __privateGet(this, _isOpen2),
            readable: txStream.readable,
            writable: new this.WritableStream(new UltraRxSink(this))
          };
          const serv = servs.get(ULTRA_SERV_UUID);
          if (isNil_default(serv)) throw new Error(`Failed to find gatt serv, uuid = ${ULTRA_SERV_UUID}`);
          const chars = new Map(map_default(await serv.getCharacteristics() ?? [], (char) => [toCanonicalUUID(char.uuid), char]));
          __privateMethod(this, _WebbleAdapter_instances, debug_fn3).call(this, `gattCharUuids = ${JSON.stringify([...chars.keys()])}`);
          this.rxChar = chars.get(ULTRA_RX_CHAR_UUID) ?? null;
          if (isNil_default(this.rxChar)) throw new Error(`Failed to find rxChar, uuid = ${ULTRA_TX_CHAR_UUID}`);
          const txChar = chars.get(ULTRA_TX_CHAR_UUID);
          if (isNil_default(txChar)) throw new Error(`Failed to find txChar, uuid = ${ULTRA_RX_CHAR_UUID}`);
          txChar.addEventListener("characteristicvaluechanged", txStreamOnNotify);
          await txChar.startNotifications();
          __privateSet(this, _isOpen2, true);
        } else if (servs.has(DFU_SERV_UUID)) {
          this.port = {
            isOpen: () => __privateGet(this, _isOpen2),
            isDfu: () => true,
            readable: txStream.readable,
            writable: new this.WritableStream(new DfuRxSink(this)),
            dfuWriteObject: async (buf, mtu) => {
              if (isNil_default(this.packtChar) || isNil_default(this.Buffer)) throw new Error("this.#adapter.packtChar can not be null");
              let chunk2;
              for (const buf1 of buf.chunk(20)) {
                if (chunk2?.length !== buf1.length) chunk2 = new this.Buffer(buf1.length);
                chunk2.set(buf1);
                await this.packtChar.writeValueWithoutResponse(chunk2.buffer);
                await sleep(5);
              }
            }
          };
          const serv = servs.get(DFU_SERV_UUID);
          if (isNil_default(serv)) throw new Error(`Failed to find gatt serv, uuid = ${DFU_SERV_UUID}`);
          const chars = new Map(map_default(await serv.getCharacteristics() ?? [], (char) => [toCanonicalUUID(char.uuid), char]));
          __privateMethod(this, _WebbleAdapter_instances, debug_fn3).call(this, `gattCharUuids = ${JSON.stringify([...chars.keys()])}`);
          this.packtChar = chars.get(DFU_PACKT_CHAR_UUID) ?? null;
          if (isNil_default(this.packtChar)) throw new Error(`Failed to find packtChar, uuid = ${DFU_PACKT_CHAR_UUID}`);
          const ctrlChar = this.ctrlChar = chars.get(DFU_CTRL_CHAR_UUID) ?? null;
          if (isNil_default(ctrlChar)) throw new Error(`Failed to find ctrlChar, uuid = ${DFU_CTRL_CHAR_UUID}`);
          ctrlChar.addEventListener("characteristicvaluechanged", txStreamOnNotify);
          await ctrlChar.startNotifications();
          __privateSet(this, _isOpen2, true);
        }
        if (!__privateGet(this, _isOpen2)) throw new Error("Failed to find supported service");
        ultra.port = this.port;
        return await next();
      } catch (err) {
        this.emitErr(err);
        throw err;
      }
    });
    ultra.addHook("disconnect", async (ctx, next) => {
      try {
        if (ultra.$adapter !== adapter || isNil_default(this.device)) return await next();
        await next().catch(this.emitErr);
        __privateSet(this, _isOpen2, false);
        if (gattIsConnected()) this.device.gatt?.disconnect();
        for (const k of ["port", "rxChar", "ctrlChar", "packtChar", "device"]) this[k] = null;
      } catch (err) {
        this.emitErr(err);
        throw err;
      }
    });
    return adapter;
  }
};
_isOpen2 = new WeakMap();
_WebbleAdapter_instances = new WeakSet();
debug_fn3 = function(formatter, ...args) {
  this.ultra?.emitter.emit("debug", "webble", formatter, ...args);
};
setObject(globalThis, ["ChameleonUltraJS", "WebbleAdapter"], WebbleAdapter);
var _adapter, _UltraRxSink_instances, debug_fn4;
var UltraRxSink = class {
  constructor(adapter) {
    __privateAdd(this, _UltraRxSink_instances);
    __privateAdd(this, _adapter);
    __publicField(this, "Buffer");
    __privateSet(this, _adapter, adapter);
    if (isNil_default(__privateGet(this, _adapter).Buffer)) throw new Error("this.#adapter.Buffer can not be null");
    this.Buffer = __privateGet(this, _adapter).Buffer;
  }
  async write(chunk2) {
    try {
      if (isNil_default(__privateGet(this, _adapter).rxChar)) throw new Error("this.#adapter.rxChar can not be null");
      let buf2 = null;
      for (const buf1 of chunk2.chunk(20)) {
        if (!this.Buffer.isBuffer(buf2) || buf1.length !== buf2.length) buf2 = new this.Buffer(buf1.length);
        buf2.set(buf1);
        __privateMethod(this, _UltraRxSink_instances, debug_fn4).call(this, `bleWrite = ${buf2.toString("hex")}`);
        await __privateGet(this, _adapter).rxChar.writeValueWithoutResponse(buf2.buffer);
      }
    } catch (err) {
      __privateGet(this, _adapter).emitErr(err);
      throw err;
    }
  }
};
_adapter = new WeakMap();
_UltraRxSink_instances = new WeakSet();
debug_fn4 = function(formatter, ...args) {
  __privateGet(this, _adapter).ultra?.emitter.emit("debug", "webble", formatter, ...args);
};
var _adapter2, _DfuRxSink_instances, debug_fn5;
var DfuRxSink = class {
  constructor(adapter) {
    __privateAdd(this, _DfuRxSink_instances);
    __privateAdd(this, _adapter2);
    __publicField(this, "Buffer");
    __privateSet(this, _adapter2, adapter);
    if (isNil_default(__privateGet(this, _adapter2).Buffer)) throw new Error("this.#adapter.Buffer can not be null");
    this.Buffer = __privateGet(this, _adapter2).Buffer;
  }
  async write(chunk2) {
    try {
      if (chunk2.length !== chunk2.buffer.byteLength) chunk2 = chunk2.slice();
      if (isNil_default(__privateGet(this, _adapter2).ctrlChar)) throw new Error("this.#adapter.ctrlChar can not be null");
      if (chunk2.length > 20) throw new Error("chunk.length > 20 (BLE MTU)");
      __privateMethod(this, _DfuRxSink_instances, debug_fn5).call(this, `bleWrite = ${chunk2.toString("hex")}`);
      await __privateGet(this, _adapter2).ctrlChar.writeValueWithResponse(chunk2.buffer);
    } catch (err) {
      __privateGet(this, _adapter2).emitErr(err);
      throw err;
    }
  }
};
_adapter2 = new WeakMap();
_DfuRxSink_instances = new WeakSet();
debug_fn5 = function(formatter, ...args) {
  __privateGet(this, _adapter2).ultra?.emitter.emit("debug", "webble", formatter, ...args);
};
function toCanonicalUUID(uuid) {
  if (isString_default(uuid) && /^[0-9a-fA-F]{1,8}$/.test(uuid)) uuid = parseInt_default(uuid, 16);
  if (isSafeInteger_default(uuid)) uuid = BluetoothUUID.canonicalUUID(uuid);
  return toLower_default(uuid);
}
export {
  AnimationMode,
  b as Buffer,
  ButtonAction,
  ButtonType,
  ChameleonUltra,
  Cmd,
  DarksideStatus,
  DeviceMode,
  DeviceModel,
  DfuFwId,
  DfuFwType,
  DfuObjType,
  FreqType,
  Hf14aBccMode,
  Hf14aCascadeLevelMode,
  Hf14aRatsMode,
  HidProxFormat,
  HidProxFormatName,
  Mf1EmuWriteMode,
  Mf1KeyType,
  Mf1PrngType,
  Mf1VblockOperator,
  MfuEmuWriteMode,
  MfuMaxPage,
  NxpMfuType,
  NxpMfuTypeName,
  Slot,
  TagType,
  TagTypeLfIdLen,
  WebbleAdapter,
  WebserialAdapter,
  version
};
/*! Bundled license information:

lodash-es/lodash.js:
  (**
   * @license
   * Lodash (Custom Build) <https://lodash.com/>
   * Build: `lodash modularize exports="es" --repo lodash/lodash#4.18.1 -o ./`
   * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   *)
*/
