let hnswlib;
let __tla = (async () => {
  function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
  }
  var browser = {
    exports: {}
  };
  var process = browser.exports = {};
  var cachedSetTimeout;
  var cachedClearTimeout;
  function defaultSetTimout() {
    throw new Error("setTimeout has not been defined");
  }
  function defaultClearTimeout() {
    throw new Error("clearTimeout has not been defined");
  }
  (function() {
    try {
      if (typeof setTimeout === "function") {
        cachedSetTimeout = setTimeout;
      } else {
        cachedSetTimeout = defaultSetTimout;
      }
    } catch (e) {
      cachedSetTimeout = defaultSetTimout;
    }
    try {
      if (typeof clearTimeout === "function") {
        cachedClearTimeout = clearTimeout;
      } else {
        cachedClearTimeout = defaultClearTimeout;
      }
    } catch (e) {
      cachedClearTimeout = defaultClearTimeout;
    }
  })();
  function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
      return setTimeout(fun, 0);
    }
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
      cachedSetTimeout = setTimeout;
      return setTimeout(fun, 0);
    }
    try {
      return cachedSetTimeout(fun, 0);
    } catch (e) {
      try {
        return cachedSetTimeout.call(null, fun, 0);
      } catch (e2) {
        return cachedSetTimeout.call(this, fun, 0);
      }
    }
  }
  function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
      return clearTimeout(marker);
    }
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
      cachedClearTimeout = clearTimeout;
      return clearTimeout(marker);
    }
    try {
      return cachedClearTimeout(marker);
    } catch (e) {
      try {
        return cachedClearTimeout.call(null, marker);
      } catch (e2) {
        return cachedClearTimeout.call(this, marker);
      }
    }
  }
  var queue = [];
  var draining = false;
  var currentQueue;
  var queueIndex = -1;
  function cleanUpNextTick() {
    if (!draining || !currentQueue) {
      return;
    }
    draining = false;
    if (currentQueue.length) {
      queue = currentQueue.concat(queue);
    } else {
      queueIndex = -1;
    }
    if (queue.length) {
      drainQueue();
    }
  }
  function drainQueue() {
    if (draining) {
      return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;
    var len2 = queue.length;
    while (len2) {
      currentQueue = queue;
      queue = [];
      while (++queueIndex < len2) {
        if (currentQueue) {
          currentQueue[queueIndex].run();
        }
      }
      queueIndex = -1;
      len2 = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
  }
  process.nextTick = function(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
      for (var i2 = 1; i2 < arguments.length; i2++) {
        args[i2 - 1] = arguments[i2];
      }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
      runTimeout(drainQueue);
    }
  };
  function Item(fun, array) {
    this.fun = fun;
    this.array = array;
  }
  Item.prototype.run = function() {
    this.fun.apply(null, this.array);
  };
  process.title = "browser";
  process.browser = true;
  process.env = {};
  process.argv = [];
  process.version = "";
  process.versions = {};
  function noop() {
  }
  process.on = noop;
  process.addListener = noop;
  process.once = noop;
  process.off = noop;
  process.removeListener = noop;
  process.removeAllListeners = noop;
  process.emit = noop;
  process.prependListener = noop;
  process.prependOnceListener = noop;
  process.listeners = function(name) {
    return [];
  };
  process.binding = function(name) {
    throw new Error("process.binding is not supported");
  };
  process.cwd = function() {
    return "/";
  };
  process.chdir = function(dir) {
    throw new Error("process.chdir is not supported");
  };
  process.umask = function() {
    return 0;
  };
  var browserExports = browser.exports;
  const process$1 = getDefaultExportFromCjs(browserExports);
  const global = globalThis || void 0 || self;
  var buffer = {};
  var base64Js = {};
  base64Js.byteLength = byteLength;
  base64Js.toByteArray = toByteArray;
  base64Js.fromByteArray = fromByteArray;
  var lookup = [];
  var revLookup = [];
  var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
  var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  for (var i = 0, len = code.length; i < len; ++i) {
    lookup[i] = code[i];
    revLookup[code.charCodeAt(i)] = i;
  }
  revLookup["-".charCodeAt(0)] = 62;
  revLookup["_".charCodeAt(0)] = 63;
  function getLens(b64) {
    var len2 = b64.length;
    if (len2 % 4 > 0) {
      throw new Error("Invalid string. Length must be a multiple of 4");
    }
    var validLen = b64.indexOf("=");
    if (validLen === -1)
      validLen = len2;
    var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
    return [
      validLen,
      placeHoldersLen
    ];
  }
  function byteLength(b64) {
    var lens = getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
  }
  function _byteLength(b64, validLen, placeHoldersLen) {
    return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
  }
  function toByteArray(b64) {
    var tmp;
    var lens = getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
    var curByte = 0;
    var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
    var i2;
    for (i2 = 0; i2 < len2; i2 += 4) {
      tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
      arr[curByte++] = tmp >> 16 & 255;
      arr[curByte++] = tmp >> 8 & 255;
      arr[curByte++] = tmp & 255;
    }
    if (placeHoldersLen === 2) {
      tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
      arr[curByte++] = tmp & 255;
    }
    if (placeHoldersLen === 1) {
      tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
      arr[curByte++] = tmp >> 8 & 255;
      arr[curByte++] = tmp & 255;
    }
    return arr;
  }
  function tripletToBase64(num) {
    return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
  }
  function encodeChunk(uint8, start, end) {
    var tmp;
    var output = [];
    for (var i2 = start; i2 < end; i2 += 3) {
      tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
      output.push(tripletToBase64(tmp));
    }
    return output.join("");
  }
  function fromByteArray(uint8) {
    var tmp;
    var len2 = uint8.length;
    var extraBytes = len2 % 3;
    var parts = [];
    var maxChunkLength = 16383;
    for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
      parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
    }
    if (extraBytes === 1) {
      tmp = uint8[len2 - 1];
      parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "==");
    } else if (extraBytes === 2) {
      tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
      parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "=");
    }
    return parts.join("");
  }
  var ieee754 = {};
  ieee754.read = function(buffer2, offset, isLE, mLen, nBytes) {
    var e, m;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var nBits = -7;
    var i2 = isLE ? nBytes - 1 : 0;
    var d = isLE ? -1 : 1;
    var s = buffer2[offset + i2];
    i2 += d;
    e = s & (1 << -nBits) - 1;
    s >>= -nBits;
    nBits += eLen;
    for (; nBits > 0; e = e * 256 + buffer2[offset + i2], i2 += d, nBits -= 8) {
    }
    m = e & (1 << -nBits) - 1;
    e >>= -nBits;
    nBits += mLen;
    for (; nBits > 0; m = m * 256 + buffer2[offset + i2], i2 += d, nBits -= 8) {
    }
    if (e === 0) {
      e = 1 - eBias;
    } else if (e === eMax) {
      return m ? NaN : (s ? -1 : 1) * Infinity;
    } else {
      m = m + Math.pow(2, mLen);
      e = e - eBias;
    }
    return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
  };
  ieee754.write = function(buffer2, value, offset, isLE, mLen, nBytes) {
    var e, m, c;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
    var i2 = isLE ? 0 : nBytes - 1;
    var d = isLE ? 1 : -1;
    var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
    value = Math.abs(value);
    if (isNaN(value) || value === Infinity) {
      m = isNaN(value) ? 1 : 0;
      e = eMax;
    } else {
      e = Math.floor(Math.log(value) / Math.LN2);
      if (value * (c = Math.pow(2, -e)) < 1) {
        e--;
        c *= 2;
      }
      if (e + eBias >= 1) {
        value += rt / c;
      } else {
        value += rt * Math.pow(2, 1 - eBias);
      }
      if (value * c >= 2) {
        e++;
        c /= 2;
      }
      if (e + eBias >= eMax) {
        m = 0;
        e = eMax;
      } else if (e + eBias >= 1) {
        m = (value * c - 1) * Math.pow(2, mLen);
        e = e + eBias;
      } else {
        m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
        e = 0;
      }
    }
    for (; mLen >= 8; buffer2[offset + i2] = m & 255, i2 += d, m /= 256, mLen -= 8) {
    }
    e = e << mLen | m;
    eLen += mLen;
    for (; eLen > 0; buffer2[offset + i2] = e & 255, i2 += d, e /= 256, eLen -= 8) {
    }
    buffer2[offset + i2 - d] |= s * 128;
  };
  (function(exports) {
    const base64 = base64Js;
    const ieee754$1 = ieee754;
    const customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
    exports.Buffer = Buffer2;
    exports.SlowBuffer = SlowBuffer;
    exports.INSPECT_MAX_BYTES = 50;
    const K_MAX_LENGTH = 2147483647;
    exports.kMaxLength = K_MAX_LENGTH;
    const { Uint8Array: GlobalUint8Array, ArrayBuffer: GlobalArrayBuffer, SharedArrayBuffer: GlobalSharedArrayBuffer } = globalThis;
    Buffer2.TYPED_ARRAY_SUPPORT = typedArraySupport();
    if (!Buffer2.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
      console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
    }
    function typedArraySupport() {
      try {
        const arr = new GlobalUint8Array(1);
        const proto = {
          foo: function() {
            return 42;
          }
        };
        Object.setPrototypeOf(proto, GlobalUint8Array.prototype);
        Object.setPrototypeOf(arr, proto);
        return arr.foo() === 42;
      } catch (e) {
        return false;
      }
    }
    Object.defineProperty(Buffer2.prototype, "parent", {
      enumerable: true,
      get: function() {
        if (!Buffer2.isBuffer(this))
          return void 0;
        return this.buffer;
      }
    });
    Object.defineProperty(Buffer2.prototype, "offset", {
      enumerable: true,
      get: function() {
        if (!Buffer2.isBuffer(this))
          return void 0;
        return this.byteOffset;
      }
    });
    function createBuffer(length) {
      if (length > K_MAX_LENGTH) {
        throw new RangeError('The value "' + length + '" is invalid for option "size"');
      }
      const buf = new GlobalUint8Array(length);
      Object.setPrototypeOf(buf, Buffer2.prototype);
      return buf;
    }
    function Buffer2(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        if (typeof encodingOrOffset === "string") {
          throw new TypeError('The "string" argument must be of type string. Received type number');
        }
        return allocUnsafe(arg);
      }
      return from(arg, encodingOrOffset, length);
    }
    Buffer2.poolSize = 8192;
    function from(value, encodingOrOffset, length) {
      if (typeof value === "string") {
        return fromString(value, encodingOrOffset);
      }
      if (GlobalArrayBuffer.isView(value)) {
        return fromArrayView(value);
      }
      if (value == null) {
        throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
      }
      if (isInstance(value, GlobalArrayBuffer) || value && isInstance(value.buffer, GlobalArrayBuffer)) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof GlobalSharedArrayBuffer !== "undefined" && (isInstance(value, GlobalSharedArrayBuffer) || value && isInstance(value.buffer, GlobalSharedArrayBuffer))) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof value === "number") {
        throw new TypeError('The "value" argument must not be of type number. Received type number');
      }
      const valueOf = value.valueOf && value.valueOf();
      if (valueOf != null && valueOf !== value) {
        return Buffer2.from(valueOf, encodingOrOffset, length);
      }
      const b = fromObject(value);
      if (b)
        return b;
      if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
        return Buffer2.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
      }
      throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
    }
    Buffer2.from = function(value, encodingOrOffset, length) {
      return from(value, encodingOrOffset, length);
    };
    Object.setPrototypeOf(Buffer2.prototype, GlobalUint8Array.prototype);
    Object.setPrototypeOf(Buffer2, GlobalUint8Array);
    function assertSize(size) {
      if (typeof size !== "number") {
        throw new TypeError('"size" argument must be of type number');
      } else if (size < 0) {
        throw new RangeError('The value "' + size + '" is invalid for option "size"');
      }
    }
    function alloc(size, fill, encoding) {
      assertSize(size);
      if (size <= 0) {
        return createBuffer(size);
      }
      if (fill !== void 0) {
        return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
      }
      return createBuffer(size);
    }
    Buffer2.alloc = function(size, fill, encoding) {
      return alloc(size, fill, encoding);
    };
    function allocUnsafe(size) {
      assertSize(size);
      return createBuffer(size < 0 ? 0 : checked(size) | 0);
    }
    Buffer2.allocUnsafe = function(size) {
      return allocUnsafe(size);
    };
    Buffer2.allocUnsafeSlow = function(size) {
      return allocUnsafe(size);
    };
    function fromString(string, encoding) {
      if (typeof encoding !== "string" || encoding === "") {
        encoding = "utf8";
      }
      if (!Buffer2.isEncoding(encoding)) {
        throw new TypeError("Unknown encoding: " + encoding);
      }
      const length = byteLength2(string, encoding) | 0;
      let buf = createBuffer(length);
      const actual = buf.write(string, encoding);
      if (actual !== length) {
        buf = buf.slice(0, actual);
      }
      return buf;
    }
    function fromArrayLike(array) {
      const length = array.length < 0 ? 0 : checked(array.length) | 0;
      const buf = createBuffer(length);
      for (let i2 = 0; i2 < length; i2 += 1) {
        buf[i2] = array[i2] & 255;
      }
      return buf;
    }
    function fromArrayView(arrayView) {
      if (isInstance(arrayView, GlobalUint8Array)) {
        const copy = new GlobalUint8Array(arrayView);
        return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
      }
      return fromArrayLike(arrayView);
    }
    function fromArrayBuffer(array, byteOffset, length) {
      if (byteOffset < 0 || array.byteLength < byteOffset) {
        throw new RangeError('"offset" is outside of buffer bounds');
      }
      if (array.byteLength < byteOffset + (length || 0)) {
        throw new RangeError('"length" is outside of buffer bounds');
      }
      let buf;
      if (byteOffset === void 0 && length === void 0) {
        buf = new GlobalUint8Array(array);
      } else if (length === void 0) {
        buf = new GlobalUint8Array(array, byteOffset);
      } else {
        buf = new GlobalUint8Array(array, byteOffset, length);
      }
      Object.setPrototypeOf(buf, Buffer2.prototype);
      return buf;
    }
    function fromObject(obj) {
      if (Buffer2.isBuffer(obj)) {
        const len2 = checked(obj.length) | 0;
        const buf = createBuffer(len2);
        if (buf.length === 0) {
          return buf;
        }
        obj.copy(buf, 0, 0, len2);
        return buf;
      }
      if (obj.length !== void 0) {
        if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
          return createBuffer(0);
        }
        return fromArrayLike(obj);
      }
      if (obj.type === "Buffer" && Array.isArray(obj.data)) {
        return fromArrayLike(obj.data);
      }
    }
    function checked(length) {
      if (length >= K_MAX_LENGTH) {
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
      }
      return length | 0;
    }
    function SlowBuffer(length) {
      if (+length != length) {
        length = 0;
      }
      return Buffer2.alloc(+length);
    }
    Buffer2.isBuffer = function isBuffer(b) {
      return b != null && b._isBuffer === true && b !== Buffer2.prototype;
    };
    Buffer2.compare = function compare(a, b) {
      if (isInstance(a, GlobalUint8Array))
        a = Buffer2.from(a, a.offset, a.byteLength);
      if (isInstance(b, GlobalUint8Array))
        b = Buffer2.from(b, b.offset, b.byteLength);
      if (!Buffer2.isBuffer(a) || !Buffer2.isBuffer(b)) {
        throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
      }
      if (a === b)
        return 0;
      let x = a.length;
      let y = b.length;
      for (let i2 = 0, len2 = Math.min(x, y); i2 < len2; ++i2) {
        if (a[i2] !== b[i2]) {
          x = a[i2];
          y = b[i2];
          break;
        }
      }
      if (x < y)
        return -1;
      if (y < x)
        return 1;
      return 0;
    };
    Buffer2.isEncoding = function isEncoding(encoding) {
      switch (String(encoding).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return true;
        default:
          return false;
      }
    };
    Buffer2.concat = function concat(list, length) {
      if (!Array.isArray(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }
      if (list.length === 0) {
        return Buffer2.alloc(0);
      }
      let i2;
      if (length === void 0) {
        length = 0;
        for (i2 = 0; i2 < list.length; ++i2) {
          length += list[i2].length;
        }
      }
      const buffer2 = Buffer2.allocUnsafe(length);
      let pos = 0;
      for (i2 = 0; i2 < list.length; ++i2) {
        let buf = list[i2];
        if (isInstance(buf, GlobalUint8Array)) {
          if (pos + buf.length > buffer2.length) {
            if (!Buffer2.isBuffer(buf))
              buf = Buffer2.from(buf);
            buf.copy(buffer2, pos);
          } else {
            GlobalUint8Array.prototype.set.call(buffer2, buf, pos);
          }
        } else if (!Buffer2.isBuffer(buf)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        } else {
          buf.copy(buffer2, pos);
        }
        pos += buf.length;
      }
      return buffer2;
    };
    function byteLength2(string, encoding) {
      if (Buffer2.isBuffer(string)) {
        return string.length;
      }
      if (GlobalArrayBuffer.isView(string) || isInstance(string, GlobalArrayBuffer)) {
        return string.byteLength;
      }
      if (typeof string !== "string") {
        throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string);
      }
      const len2 = string.length;
      const mustMatch = arguments.length > 2 && arguments[2] === true;
      if (!mustMatch && len2 === 0)
        return 0;
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "ascii":
          case "latin1":
          case "binary":
            return len2;
          case "utf8":
          case "utf-8":
            return utf8ToBytes(string).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return len2 * 2;
          case "hex":
            return len2 >>> 1;
          case "base64":
            return base64ToBytes(string).length;
          default:
            if (loweredCase) {
              return mustMatch ? -1 : utf8ToBytes(string).length;
            }
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer2.byteLength = byteLength2;
    function slowToString(encoding, start, end) {
      let loweredCase = false;
      if (start === void 0 || start < 0) {
        start = 0;
      }
      if (start > this.length) {
        return "";
      }
      if (end === void 0 || end > this.length) {
        end = this.length;
      }
      if (end <= 0) {
        return "";
      }
      end >>>= 0;
      start >>>= 0;
      if (end <= start) {
        return "";
      }
      if (!encoding)
        encoding = "utf8";
      while (true) {
        switch (encoding) {
          case "hex":
            return hexSlice(this, start, end);
          case "utf8":
          case "utf-8":
            return utf8Slice(this, start, end);
          case "ascii":
            return asciiSlice(this, start, end);
          case "latin1":
          case "binary":
            return latin1Slice(this, start, end);
          case "base64":
            return base64Slice(this, start, end);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return utf16leSlice(this, start, end);
          default:
            if (loweredCase)
              throw new TypeError("Unknown encoding: " + encoding);
            encoding = (encoding + "").toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer2.prototype._isBuffer = true;
    function swap(b, n, m) {
      const i2 = b[n];
      b[n] = b[m];
      b[m] = i2;
    }
    Buffer2.prototype.swap16 = function swap16() {
      const len2 = this.length;
      if (len2 % 2 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      }
      for (let i2 = 0; i2 < len2; i2 += 2) {
        swap(this, i2, i2 + 1);
      }
      return this;
    };
    Buffer2.prototype.swap32 = function swap32() {
      const len2 = this.length;
      if (len2 % 4 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      }
      for (let i2 = 0; i2 < len2; i2 += 4) {
        swap(this, i2, i2 + 3);
        swap(this, i2 + 1, i2 + 2);
      }
      return this;
    };
    Buffer2.prototype.swap64 = function swap64() {
      const len2 = this.length;
      if (len2 % 8 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      }
      for (let i2 = 0; i2 < len2; i2 += 8) {
        swap(this, i2, i2 + 7);
        swap(this, i2 + 1, i2 + 6);
        swap(this, i2 + 2, i2 + 5);
        swap(this, i2 + 3, i2 + 4);
      }
      return this;
    };
    Buffer2.prototype.toString = function toString() {
      const length = this.length;
      if (length === 0)
        return "";
      if (arguments.length === 0)
        return utf8Slice(this, 0, length);
      return slowToString.apply(this, arguments);
    };
    Buffer2.prototype.toLocaleString = Buffer2.prototype.toString;
    Buffer2.prototype.equals = function equals(b) {
      if (!Buffer2.isBuffer(b))
        throw new TypeError("Argument must be a Buffer");
      if (this === b)
        return true;
      return Buffer2.compare(this, b) === 0;
    };
    Buffer2.prototype.inspect = function inspect() {
      let str = "";
      const max = exports.INSPECT_MAX_BYTES;
      str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
      if (this.length > max)
        str += " ... ";
      return "<Buffer " + str + ">";
    };
    if (customInspectSymbol) {
      Buffer2.prototype[customInspectSymbol] = Buffer2.prototype.inspect;
    }
    Buffer2.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
      if (isInstance(target, GlobalUint8Array)) {
        target = Buffer2.from(target, target.offset, target.byteLength);
      }
      if (!Buffer2.isBuffer(target)) {
        throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target);
      }
      if (start === void 0) {
        start = 0;
      }
      if (end === void 0) {
        end = target ? target.length : 0;
      }
      if (thisStart === void 0) {
        thisStart = 0;
      }
      if (thisEnd === void 0) {
        thisEnd = this.length;
      }
      if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
        throw new RangeError("out of range index");
      }
      if (thisStart >= thisEnd && start >= end) {
        return 0;
      }
      if (thisStart >= thisEnd) {
        return -1;
      }
      if (start >= end) {
        return 1;
      }
      start >>>= 0;
      end >>>= 0;
      thisStart >>>= 0;
      thisEnd >>>= 0;
      if (this === target)
        return 0;
      let x = thisEnd - thisStart;
      let y = end - start;
      const len2 = Math.min(x, y);
      const thisCopy = this.slice(thisStart, thisEnd);
      const targetCopy = target.slice(start, end);
      for (let i2 = 0; i2 < len2; ++i2) {
        if (thisCopy[i2] !== targetCopy[i2]) {
          x = thisCopy[i2];
          y = targetCopy[i2];
          break;
        }
      }
      if (x < y)
        return -1;
      if (y < x)
        return 1;
      return 0;
    };
    function bidirectionalIndexOf(buffer2, val, byteOffset, encoding, dir) {
      if (buffer2.length === 0)
        return -1;
      if (typeof byteOffset === "string") {
        encoding = byteOffset;
        byteOffset = 0;
      } else if (byteOffset > 2147483647) {
        byteOffset = 2147483647;
      } else if (byteOffset < -2147483648) {
        byteOffset = -2147483648;
      }
      byteOffset = +byteOffset;
      if (numberIsNaN(byteOffset)) {
        byteOffset = dir ? 0 : buffer2.length - 1;
      }
      if (byteOffset < 0)
        byteOffset = buffer2.length + byteOffset;
      if (byteOffset >= buffer2.length) {
        if (dir)
          return -1;
        else
          byteOffset = buffer2.length - 1;
      } else if (byteOffset < 0) {
        if (dir)
          byteOffset = 0;
        else
          return -1;
      }
      if (typeof val === "string") {
        val = Buffer2.from(val, encoding);
      }
      if (Buffer2.isBuffer(val)) {
        if (val.length === 0) {
          return -1;
        }
        return arrayIndexOf(buffer2, val, byteOffset, encoding, dir);
      } else if (typeof val === "number") {
        val = val & 255;
        if (typeof GlobalUint8Array.prototype.indexOf === "function") {
          if (dir) {
            return GlobalUint8Array.prototype.indexOf.call(buffer2, val, byteOffset);
          } else {
            return GlobalUint8Array.prototype.lastIndexOf.call(buffer2, val, byteOffset);
          }
        }
        return arrayIndexOf(buffer2, [
          val
        ], byteOffset, encoding, dir);
      }
      throw new TypeError("val must be string, number or Buffer");
    }
    function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
      let indexSize = 1;
      let arrLength = arr.length;
      let valLength = val.length;
      if (encoding !== void 0) {
        encoding = String(encoding).toLowerCase();
        if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
          if (arr.length < 2 || val.length < 2) {
            return -1;
          }
          indexSize = 2;
          arrLength /= 2;
          valLength /= 2;
          byteOffset /= 2;
        }
      }
      function read2(buf, i3) {
        if (indexSize === 1) {
          return buf[i3];
        } else {
          return buf.readUInt16BE(i3 * indexSize);
        }
      }
      let i2;
      if (dir) {
        let foundIndex = -1;
        for (i2 = byteOffset; i2 < arrLength; i2++) {
          if (read2(arr, i2) === read2(val, foundIndex === -1 ? 0 : i2 - foundIndex)) {
            if (foundIndex === -1)
              foundIndex = i2;
            if (i2 - foundIndex + 1 === valLength)
              return foundIndex * indexSize;
          } else {
            if (foundIndex !== -1)
              i2 -= i2 - foundIndex;
            foundIndex = -1;
          }
        }
      } else {
        if (byteOffset + valLength > arrLength)
          byteOffset = arrLength - valLength;
        for (i2 = byteOffset; i2 >= 0; i2--) {
          let found = true;
          for (let j = 0; j < valLength; j++) {
            if (read2(arr, i2 + j) !== read2(val, j)) {
              found = false;
              break;
            }
          }
          if (found)
            return i2;
        }
      }
      return -1;
    }
    Buffer2.prototype.includes = function includes(val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1;
    };
    Buffer2.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
    };
    Buffer2.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
    };
    function hexWrite(buf, string, offset, length) {
      offset = Number(offset) || 0;
      const remaining = buf.length - offset;
      if (!length) {
        length = remaining;
      } else {
        length = Number(length);
        if (length > remaining) {
          length = remaining;
        }
      }
      const strLen = string.length;
      if (length > strLen / 2) {
        length = strLen / 2;
      }
      let i2;
      for (i2 = 0; i2 < length; ++i2) {
        const parsed = parseInt(string.substr(i2 * 2, 2), 16);
        if (numberIsNaN(parsed))
          return i2;
        buf[offset + i2] = parsed;
      }
      return i2;
    }
    function utf8Write(buf, string, offset, length) {
      return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
    }
    function asciiWrite(buf, string, offset, length) {
      return blitBuffer(asciiToBytes(string), buf, offset, length);
    }
    function base64Write(buf, string, offset, length) {
      return blitBuffer(base64ToBytes(string), buf, offset, length);
    }
    function ucs2Write(buf, string, offset, length) {
      return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
    }
    Buffer2.prototype.write = function write(string, offset, length, encoding) {
      if (offset === void 0) {
        encoding = "utf8";
        length = this.length;
        offset = 0;
      } else if (length === void 0 && typeof offset === "string") {
        encoding = offset;
        length = this.length;
        offset = 0;
      } else if (isFinite(offset)) {
        offset = offset >>> 0;
        if (isFinite(length)) {
          length = length >>> 0;
          if (encoding === void 0)
            encoding = "utf8";
        } else {
          encoding = length;
          length = void 0;
        }
      } else {
        throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
      }
      const remaining = this.length - offset;
      if (length === void 0 || length > remaining)
        length = remaining;
      if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
        throw new RangeError("Attempt to write outside buffer bounds");
      }
      if (!encoding)
        encoding = "utf8";
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "hex":
            return hexWrite(this, string, offset, length);
          case "utf8":
          case "utf-8":
            return utf8Write(this, string, offset, length);
          case "ascii":
          case "latin1":
          case "binary":
            return asciiWrite(this, string, offset, length);
          case "base64":
            return base64Write(this, string, offset, length);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return ucs2Write(this, string, offset, length);
          default:
            if (loweredCase)
              throw new TypeError("Unknown encoding: " + encoding);
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    };
    Buffer2.prototype.toJSON = function toJSON() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    function base64Slice(buf, start, end) {
      if (start === 0 && end === buf.length) {
        return base64.fromByteArray(buf);
      } else {
        return base64.fromByteArray(buf.slice(start, end));
      }
    }
    function utf8Slice(buf, start, end) {
      end = Math.min(buf.length, end);
      const res = [];
      let i2 = start;
      while (i2 < end) {
        const firstByte = buf[i2];
        let codePoint = null;
        let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
        if (i2 + bytesPerSequence <= end) {
          let secondByte, thirdByte, fourthByte, tempCodePoint;
          switch (bytesPerSequence) {
            case 1:
              if (firstByte < 128) {
                codePoint = firstByte;
              }
              break;
            case 2:
              secondByte = buf[i2 + 1];
              if ((secondByte & 192) === 128) {
                tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                if (tempCodePoint > 127) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 3:
              secondByte = buf[i2 + 1];
              thirdByte = buf[i2 + 2];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 4:
              secondByte = buf[i2 + 1];
              thirdByte = buf[i2 + 2];
              fourthByte = buf[i2 + 3];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                  codePoint = tempCodePoint;
                }
              }
          }
        }
        if (codePoint === null) {
          codePoint = 65533;
          bytesPerSequence = 1;
        } else if (codePoint > 65535) {
          codePoint -= 65536;
          res.push(codePoint >>> 10 & 1023 | 55296);
          codePoint = 56320 | codePoint & 1023;
        }
        res.push(codePoint);
        i2 += bytesPerSequence;
      }
      return decodeCodePointsArray(res);
    }
    const MAX_ARGUMENTS_LENGTH = 4096;
    function decodeCodePointsArray(codePoints) {
      const len2 = codePoints.length;
      if (len2 <= MAX_ARGUMENTS_LENGTH) {
        return String.fromCharCode.apply(String, codePoints);
      }
      let res = "";
      let i2 = 0;
      while (i2 < len2) {
        res += String.fromCharCode.apply(String, codePoints.slice(i2, i2 += MAX_ARGUMENTS_LENGTH));
      }
      return res;
    }
    function asciiSlice(buf, start, end) {
      let ret = "";
      end = Math.min(buf.length, end);
      for (let i2 = start; i2 < end; ++i2) {
        ret += String.fromCharCode(buf[i2] & 127);
      }
      return ret;
    }
    function latin1Slice(buf, start, end) {
      let ret = "";
      end = Math.min(buf.length, end);
      for (let i2 = start; i2 < end; ++i2) {
        ret += String.fromCharCode(buf[i2]);
      }
      return ret;
    }
    function hexSlice(buf, start, end) {
      const len2 = buf.length;
      if (!start || start < 0)
        start = 0;
      if (!end || end < 0 || end > len2)
        end = len2;
      let out = "";
      for (let i2 = start; i2 < end; ++i2) {
        out += hexSliceLookupTable[buf[i2]];
      }
      return out;
    }
    function utf16leSlice(buf, start, end) {
      const bytes = buf.slice(start, end);
      let res = "";
      for (let i2 = 0; i2 < bytes.length - 1; i2 += 2) {
        res += String.fromCharCode(bytes[i2] + bytes[i2 + 1] * 256);
      }
      return res;
    }
    Buffer2.prototype.slice = function slice(start, end) {
      const len2 = this.length;
      start = ~~start;
      end = end === void 0 ? len2 : ~~end;
      if (start < 0) {
        start += len2;
        if (start < 0)
          start = 0;
      } else if (start > len2) {
        start = len2;
      }
      if (end < 0) {
        end += len2;
        if (end < 0)
          end = 0;
      } else if (end > len2) {
        end = len2;
      }
      if (end < start)
        end = start;
      const newBuf = this.subarray(start, end);
      Object.setPrototypeOf(newBuf, Buffer2.prototype);
      return newBuf;
    };
    function checkOffset(offset, ext, length) {
      if (offset % 1 !== 0 || offset < 0)
        throw new RangeError("offset is not uint");
      if (offset + ext > length)
        throw new RangeError("Trying to access beyond buffer length");
    }
    Buffer2.prototype.readUintLE = Buffer2.prototype.readUIntLE = function readUIntLE(offset, byteLength3, noAssert) {
      offset = offset >>> 0;
      byteLength3 = byteLength3 >>> 0;
      if (!noAssert)
        checkOffset(offset, byteLength3, this.length);
      let val = this[offset];
      let mul = 1;
      let i2 = 0;
      while (++i2 < byteLength3 && (mul *= 256)) {
        val += this[offset + i2] * mul;
      }
      return val;
    };
    Buffer2.prototype.readUintBE = Buffer2.prototype.readUIntBE = function readUIntBE(offset, byteLength3, noAssert) {
      offset = offset >>> 0;
      byteLength3 = byteLength3 >>> 0;
      if (!noAssert) {
        checkOffset(offset, byteLength3, this.length);
      }
      let val = this[offset + --byteLength3];
      let mul = 1;
      while (byteLength3 > 0 && (mul *= 256)) {
        val += this[offset + --byteLength3] * mul;
      }
      return val;
    };
    Buffer2.prototype.readUint8 = Buffer2.prototype.readUInt8 = function readUInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 1, this.length);
      return this[offset];
    };
    Buffer2.prototype.readUint16LE = Buffer2.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      return this[offset] | this[offset + 1] << 8;
    };
    Buffer2.prototype.readUint16BE = Buffer2.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      return this[offset] << 8 | this[offset + 1];
    };
    Buffer2.prototype.readUint32LE = Buffer2.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
    };
    Buffer2.prototype.readUint32BE = Buffer2.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
    };
    Buffer2.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const lo = first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
      const hi = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
      return BigInt(lo) + (BigInt(hi) << BigInt(32));
    });
    Buffer2.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
      const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
      return (BigInt(hi) << BigInt(32)) + BigInt(lo);
    });
    Buffer2.prototype.readIntLE = function readIntLE(offset, byteLength3, noAssert) {
      offset = offset >>> 0;
      byteLength3 = byteLength3 >>> 0;
      if (!noAssert)
        checkOffset(offset, byteLength3, this.length);
      let val = this[offset];
      let mul = 1;
      let i2 = 0;
      while (++i2 < byteLength3 && (mul *= 256)) {
        val += this[offset + i2] * mul;
      }
      mul *= 128;
      if (val >= mul)
        val -= Math.pow(2, 8 * byteLength3);
      return val;
    };
    Buffer2.prototype.readIntBE = function readIntBE(offset, byteLength3, noAssert) {
      offset = offset >>> 0;
      byteLength3 = byteLength3 >>> 0;
      if (!noAssert)
        checkOffset(offset, byteLength3, this.length);
      let i2 = byteLength3;
      let mul = 1;
      let val = this[offset + --i2];
      while (i2 > 0 && (mul *= 256)) {
        val += this[offset + --i2] * mul;
      }
      mul *= 128;
      if (val >= mul)
        val -= Math.pow(2, 8 * byteLength3);
      return val;
    };
    Buffer2.prototype.readInt8 = function readInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 1, this.length);
      if (!(this[offset] & 128))
        return this[offset];
      return (255 - this[offset] + 1) * -1;
    };
    Buffer2.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      const val = this[offset] | this[offset + 1] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer2.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      const val = this[offset + 1] | this[offset] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer2.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
    };
    Buffer2.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
    };
    Buffer2.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const val = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24);
      return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
    });
    Buffer2.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const val = (first << 24) + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
      return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last);
    });
    Buffer2.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return ieee754$1.read(this, offset, true, 23, 4);
    };
    Buffer2.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return ieee754$1.read(this, offset, false, 23, 4);
    };
    Buffer2.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 8, this.length);
      return ieee754$1.read(this, offset, true, 52, 8);
    };
    Buffer2.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 8, this.length);
      return ieee754$1.read(this, offset, false, 52, 8);
    };
    function checkInt(buf, value, offset, ext, max, min) {
      if (!Buffer2.isBuffer(buf))
        throw new TypeError('"buffer" argument must be a Buffer instance');
      if (value > max || value < min)
        throw new RangeError('"value" argument is out of bounds');
      if (offset + ext > buf.length)
        throw new RangeError("Index out of range");
    }
    Buffer2.prototype.writeUintLE = Buffer2.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength3, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength3 = byteLength3 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength3) - 1;
        checkInt(this, value, offset, byteLength3, maxBytes, 0);
      }
      let mul = 1;
      let i2 = 0;
      this[offset] = value & 255;
      while (++i2 < byteLength3 && (mul *= 256)) {
        this[offset + i2] = value / mul & 255;
      }
      return offset + byteLength3;
    };
    Buffer2.prototype.writeUintBE = Buffer2.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength3, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength3 = byteLength3 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength3) - 1;
        checkInt(this, value, offset, byteLength3, maxBytes, 0);
      }
      let i2 = byteLength3 - 1;
      let mul = 1;
      this[offset + i2] = value & 255;
      while (--i2 >= 0 && (mul *= 256)) {
        this[offset + i2] = value / mul & 255;
      }
      return offset + byteLength3;
    };
    Buffer2.prototype.writeUint8 = Buffer2.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 1, 255, 0);
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer2.prototype.writeUint16LE = Buffer2.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };
    Buffer2.prototype.writeUint16BE = Buffer2.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    };
    Buffer2.prototype.writeUint32LE = Buffer2.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset + 3] = value >>> 24;
      this[offset + 2] = value >>> 16;
      this[offset + 1] = value >>> 8;
      this[offset] = value & 255;
      return offset + 4;
    };
    Buffer2.prototype.writeUint32BE = Buffer2.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    };
    function wrtBigUInt64LE(buf, value, offset, min, max) {
      checkIntBI(value, min, max, buf, offset, 7);
      let lo = Number(value & BigInt(4294967295));
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      let hi = Number(value >> BigInt(32) & BigInt(4294967295));
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      return offset;
    }
    function wrtBigUInt64BE(buf, value, offset, min, max) {
      checkIntBI(value, min, max, buf, offset, 7);
      let lo = Number(value & BigInt(4294967295));
      buf[offset + 7] = lo;
      lo = lo >> 8;
      buf[offset + 6] = lo;
      lo = lo >> 8;
      buf[offset + 5] = lo;
      lo = lo >> 8;
      buf[offset + 4] = lo;
      let hi = Number(value >> BigInt(32) & BigInt(4294967295));
      buf[offset + 3] = hi;
      hi = hi >> 8;
      buf[offset + 2] = hi;
      hi = hi >> 8;
      buf[offset + 1] = hi;
      hi = hi >> 8;
      buf[offset] = hi;
      return offset + 8;
    }
    Buffer2.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
      return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    Buffer2.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
      return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    Buffer2.prototype.writeIntLE = function writeIntLE(value, offset, byteLength3, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength3 - 1);
        checkInt(this, value, offset, byteLength3, limit - 1, -limit);
      }
      let i2 = 0;
      let mul = 1;
      let sub = 0;
      this[offset] = value & 255;
      while (++i2 < byteLength3 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i2 - 1] !== 0) {
          sub = 1;
        }
        this[offset + i2] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength3;
    };
    Buffer2.prototype.writeIntBE = function writeIntBE(value, offset, byteLength3, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength3 - 1);
        checkInt(this, value, offset, byteLength3, limit - 1, -limit);
      }
      let i2 = byteLength3 - 1;
      let mul = 1;
      let sub = 0;
      this[offset + i2] = value & 255;
      while (--i2 >= 0 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i2 + 1] !== 0) {
          sub = 1;
        }
        this[offset + i2] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength3;
    };
    Buffer2.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 1, 127, -128);
      if (value < 0)
        value = 255 + value + 1;
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer2.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };
    Buffer2.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    };
    Buffer2.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 2147483647, -2147483648);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      this[offset + 2] = value >>> 16;
      this[offset + 3] = value >>> 24;
      return offset + 4;
    };
    Buffer2.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 2147483647, -2147483648);
      if (value < 0)
        value = 4294967295 + value + 1;
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    };
    Buffer2.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
      return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    Buffer2.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
      return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    function checkIEEE754(buf, value, offset, ext, max, min) {
      if (offset + ext > buf.length)
        throw new RangeError("Index out of range");
      if (offset < 0)
        throw new RangeError("Index out of range");
    }
    function writeFloat(buf, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 4);
      }
      ieee754$1.write(buf, value, offset, littleEndian, 23, 4);
      return offset + 4;
    }
    Buffer2.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
      return writeFloat(this, value, offset, true, noAssert);
    };
    Buffer2.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
      return writeFloat(this, value, offset, false, noAssert);
    };
    function writeDouble(buf, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 8);
      }
      ieee754$1.write(buf, value, offset, littleEndian, 52, 8);
      return offset + 8;
    }
    Buffer2.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
      return writeDouble(this, value, offset, true, noAssert);
    };
    Buffer2.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
      return writeDouble(this, value, offset, false, noAssert);
    };
    Buffer2.prototype.copy = function copy(target, targetStart, start, end) {
      if (!Buffer2.isBuffer(target))
        throw new TypeError("argument should be a Buffer");
      if (!start)
        start = 0;
      if (!end && end !== 0)
        end = this.length;
      if (targetStart >= target.length)
        targetStart = target.length;
      if (!targetStart)
        targetStart = 0;
      if (end > 0 && end < start)
        end = start;
      if (end === start)
        return 0;
      if (target.length === 0 || this.length === 0)
        return 0;
      if (targetStart < 0) {
        throw new RangeError("targetStart out of bounds");
      }
      if (start < 0 || start >= this.length)
        throw new RangeError("Index out of range");
      if (end < 0)
        throw new RangeError("sourceEnd out of bounds");
      if (end > this.length)
        end = this.length;
      if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start;
      }
      const len2 = end - start;
      if (this === target && typeof GlobalUint8Array.prototype.copyWithin === "function") {
        this.copyWithin(targetStart, start, end);
      } else {
        GlobalUint8Array.prototype.set.call(target, this.subarray(start, end), targetStart);
      }
      return len2;
    };
    Buffer2.prototype.fill = function fill(val, start, end, encoding) {
      if (typeof val === "string") {
        if (typeof start === "string") {
          encoding = start;
          start = 0;
          end = this.length;
        } else if (typeof end === "string") {
          encoding = end;
          end = this.length;
        }
        if (encoding !== void 0 && typeof encoding !== "string") {
          throw new TypeError("encoding must be a string");
        }
        if (typeof encoding === "string" && !Buffer2.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        if (val.length === 1) {
          const code2 = val.charCodeAt(0);
          if (encoding === "utf8" && code2 < 128 || encoding === "latin1") {
            val = code2;
          }
        }
      } else if (typeof val === "number") {
        val = val & 255;
      } else if (typeof val === "boolean") {
        val = Number(val);
      }
      if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError("Out of range index");
      }
      if (end <= start) {
        return this;
      }
      start = start >>> 0;
      end = end === void 0 ? this.length : end >>> 0;
      if (!val)
        val = 0;
      let i2;
      if (typeof val === "number") {
        for (i2 = start; i2 < end; ++i2) {
          this[i2] = val;
        }
      } else {
        const bytes = Buffer2.isBuffer(val) ? val : Buffer2.from(val, encoding);
        const len2 = bytes.length;
        if (len2 === 0) {
          throw new TypeError('The value "' + val + '" is invalid for argument "value"');
        }
        for (i2 = 0; i2 < end - start; ++i2) {
          this[i2 + start] = bytes[i2 % len2];
        }
      }
      return this;
    };
    const errors = {};
    function E(sym, getMessage, Base) {
      errors[sym] = class NodeError extends Base {
        constructor() {
          super();
          Object.defineProperty(this, "message", {
            value: getMessage.apply(this, arguments),
            writable: true,
            configurable: true
          });
          this.name = `${this.name} [${sym}]`;
          this.stack;
          delete this.name;
        }
        get code() {
          return sym;
        }
        set code(value) {
          Object.defineProperty(this, "code", {
            configurable: true,
            enumerable: true,
            value,
            writable: true
          });
        }
        toString() {
          return `${this.name} [${sym}]: ${this.message}`;
        }
      };
    }
    E("ERR_BUFFER_OUT_OF_BOUNDS", function(name) {
      if (name) {
        return `${name} is outside of buffer bounds`;
      }
      return "Attempt to access memory outside buffer bounds";
    }, RangeError);
    E("ERR_INVALID_ARG_TYPE", function(name, actual) {
      return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
    }, TypeError);
    E("ERR_OUT_OF_RANGE", function(str, range, input) {
      let msg = `The value of "${str}" is out of range.`;
      let received = input;
      if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
        received = addNumericalSeparator(String(input));
      } else if (typeof input === "bigint") {
        received = String(input);
        if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
          received = addNumericalSeparator(received);
        }
        received += "n";
      }
      msg += ` It must be ${range}. Received ${received}`;
      return msg;
    }, RangeError);
    function addNumericalSeparator(val) {
      let res = "";
      let i2 = val.length;
      const start = val[0] === "-" ? 1 : 0;
      for (; i2 >= start + 4; i2 -= 3) {
        res = `_${val.slice(i2 - 3, i2)}${res}`;
      }
      return `${val.slice(0, i2)}${res}`;
    }
    function checkBounds(buf, offset, byteLength3) {
      validateNumber(offset, "offset");
      if (buf[offset] === void 0 || buf[offset + byteLength3] === void 0) {
        boundsError(offset, buf.length - (byteLength3 + 1));
      }
    }
    function checkIntBI(value, min, max, buf, offset, byteLength3) {
      if (value > max || value < min) {
        const n = typeof min === "bigint" ? "n" : "";
        let range;
        if (byteLength3 > 3) {
          if (min === 0 || min === BigInt(0)) {
            range = `>= 0${n} and < 2${n} ** ${(byteLength3 + 1) * 8}${n}`;
          } else {
            range = `>= -(2${n} ** ${(byteLength3 + 1) * 8 - 1}${n}) and < 2 ** ${(byteLength3 + 1) * 8 - 1}${n}`;
          }
        } else {
          range = `>= ${min}${n} and <= ${max}${n}`;
        }
        throw new errors.ERR_OUT_OF_RANGE("value", range, value);
      }
      checkBounds(buf, offset, byteLength3);
    }
    function validateNumber(value, name) {
      if (typeof value !== "number") {
        throw new errors.ERR_INVALID_ARG_TYPE(name, "number", value);
      }
    }
    function boundsError(value, length, type) {
      if (Math.floor(value) !== value) {
        validateNumber(value, type);
        throw new errors.ERR_OUT_OF_RANGE(type || "offset", "an integer", value);
      }
      if (length < 0) {
        throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
      }
      throw new errors.ERR_OUT_OF_RANGE(type || "offset", `>= ${type ? 1 : 0} and <= ${length}`, value);
    }
    const INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
    function base64clean(str) {
      str = str.split("=")[0];
      str = str.trim().replace(INVALID_BASE64_RE, "");
      if (str.length < 2)
        return "";
      while (str.length % 4 !== 0) {
        str = str + "=";
      }
      return str;
    }
    function utf8ToBytes(string, units) {
      units = units || Infinity;
      let codePoint;
      const length = string.length;
      let leadSurrogate = null;
      const bytes = [];
      for (let i2 = 0; i2 < length; ++i2) {
        codePoint = string.charCodeAt(i2);
        if (codePoint > 55295 && codePoint < 57344) {
          if (!leadSurrogate) {
            if (codePoint > 56319) {
              if ((units -= 3) > -1)
                bytes.push(239, 191, 189);
              continue;
            } else if (i2 + 1 === length) {
              if ((units -= 3) > -1)
                bytes.push(239, 191, 189);
              continue;
            }
            leadSurrogate = codePoint;
            continue;
          }
          if (codePoint < 56320) {
            if ((units -= 3) > -1)
              bytes.push(239, 191, 189);
            leadSurrogate = codePoint;
            continue;
          }
          codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
        } else if (leadSurrogate) {
          if ((units -= 3) > -1)
            bytes.push(239, 191, 189);
        }
        leadSurrogate = null;
        if (codePoint < 128) {
          if ((units -= 1) < 0)
            break;
          bytes.push(codePoint);
        } else if (codePoint < 2048) {
          if ((units -= 2) < 0)
            break;
          bytes.push(codePoint >> 6 | 192, codePoint & 63 | 128);
        } else if (codePoint < 65536) {
          if ((units -= 3) < 0)
            break;
          bytes.push(codePoint >> 12 | 224, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
        } else if (codePoint < 1114112) {
          if ((units -= 4) < 0)
            break;
          bytes.push(codePoint >> 18 | 240, codePoint >> 12 & 63 | 128, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
        } else {
          throw new Error("Invalid code point");
        }
      }
      return bytes;
    }
    function asciiToBytes(str) {
      const byteArray = [];
      for (let i2 = 0; i2 < str.length; ++i2) {
        byteArray.push(str.charCodeAt(i2) & 255);
      }
      return byteArray;
    }
    function utf16leToBytes(str, units) {
      let c, hi, lo;
      const byteArray = [];
      for (let i2 = 0; i2 < str.length; ++i2) {
        if ((units -= 2) < 0)
          break;
        c = str.charCodeAt(i2);
        hi = c >> 8;
        lo = c % 256;
        byteArray.push(lo);
        byteArray.push(hi);
      }
      return byteArray;
    }
    function base64ToBytes(str) {
      return base64.toByteArray(base64clean(str));
    }
    function blitBuffer(src, dst, offset, length) {
      let i2;
      for (i2 = 0; i2 < length; ++i2) {
        if (i2 + offset >= dst.length || i2 >= src.length)
          break;
        dst[i2 + offset] = src[i2];
      }
      return i2;
    }
    function isInstance(obj, type) {
      return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
    }
    function numberIsNaN(obj) {
      return obj !== obj;
    }
    const hexSliceLookupTable = function() {
      const alphabet = "0123456789abcdef";
      const table = new Array(256);
      for (let i2 = 0; i2 < 16; ++i2) {
        const i16 = i2 * 16;
        for (let j = 0; j < 16; ++j) {
          table[i16 + j] = alphabet[i2] + alphabet[j];
        }
      }
      return table;
    }();
    function defineBigIntMethod(fn) {
      return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
    }
    function BufferBigIntNotDefined() {
      throw new Error("BigInt not supported");
    }
  })(buffer);
  const Buffer = buffer.Buffer;
  hnswlib = (() => {
    var _scriptName = import.meta.url;
    return async function(moduleArg = {}) {
      var moduleRtn;
      var Module = Object.assign({}, moduleArg);
      var readyPromiseResolve, readyPromiseReject;
      var readyPromise = new Promise((resolve, reject) => {
        readyPromiseResolve = resolve;
        readyPromiseReject = reject;
      });
      [
        "getExceptionMessage",
        "$incrementExceptionRefcount",
        "$decrementExceptionRefcount",
        "_memory",
        "___indirect_function_table",
        "_syncIdb_js",
        "onRuntimeInitialized"
      ].forEach((prop) => {
        if (!Object.getOwnPropertyDescriptor(readyPromise, prop)) {
          Object.defineProperty(readyPromise, prop, {
            get: () => abort("You are getting " + prop + " on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js"),
            set: () => abort("You are setting " + prop + " on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js")
          });
        }
      });
      var ENVIRONMENT_IS_WEB = typeof window == "object";
      var ENVIRONMENT_IS_WORKER = typeof importScripts == "function";
      var ENVIRONMENT_IS_NODE = typeof process$1 == "object" && typeof process$1.versions == "object" && typeof process$1.versions.node == "string";
      var ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;
      if (Module["ENVIRONMENT"]) {
        throw new Error("Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -sENVIRONMENT=web or -sENVIRONMENT=node)");
      }
      if (ENVIRONMENT_IS_NODE) {
        const { createRequire } = await import("./empty-4ed993c7.js");
        var require2 = createRequire(import.meta.url);
      }
      var moduleOverrides = Object.assign({}, Module);
      var thisProgram = "./this.program";
      var scriptDirectory = "";
      var read_, readAsync, readBinary;
      if (ENVIRONMENT_IS_NODE) {
        if (typeof process$1 == "undefined" || !process$1.release || process$1.release.name !== "node")
          throw new Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
        var nodeVersion = process$1.versions.node;
        var numericVersion = nodeVersion.split(".").slice(0, 3);
        numericVersion = numericVersion[0] * 1e4 + numericVersion[1] * 100 + numericVersion[2].split("-")[0] * 1;
        if (numericVersion < 16e4) {
          throw new Error("This emscripten-generated code requires node v16.0.0 (detected v" + nodeVersion + ")");
        }
        var fs = require2("fs");
        var nodePath = require2("path");
        if (ENVIRONMENT_IS_WORKER) {
          scriptDirectory = nodePath.dirname(scriptDirectory) + "/";
        } else {
          scriptDirectory = require2("url").fileURLToPath(new URL("data:video/mp2t;base64,LyoqKioqKioqKioqKioqKioqIEdFTkVSQVRFRCBGSUxFICoqKioqKioqKioqKioqKioqKioqLyAKaW1wb3J0IHR5cGUgKiBhcyBtb2R1bGUgZnJvbSAnLi9obnN3bGliLXdhc20nOwppbXBvcnQgdHlwZSBmYWN0b3J5IGZyb20gJy4vaG5zd2xpYi13YXNtJzsKLy8gaW1wb3J0ICcuL2huc3dsaWIubWpzJzsKCmV4cG9ydCB0eXBlIEhpZXJhcmNoaWNhbE5TVyA9IG1vZHVsZS5IaWVyYXJjaGljYWxOU1c7CmV4cG9ydCB0eXBlIEJydXRlZm9yY2VTZWFyY2ggPSBtb2R1bGUuQnJ1dGVmb3JjZVNlYXJjaDsKZXhwb3J0IHR5cGUgRW1zY3JpcHRlbkZpbGVTeXN0ZW1NYW5hZ2VyID0gbW9kdWxlLkVtc2NyaXB0ZW5GaWxlU3lzdGVtTWFuYWdlcjsKZXhwb3J0IHR5cGUgTDJTcGFjZSA9IG1vZHVsZS5MMlNwYWNlOwpleHBvcnQgdHlwZSBJbm5lclByb2R1Y3RTcGFjZSA9IG1vZHVsZS5Jbm5lclByb2R1Y3RTcGFjZTsKCmV4cG9ydCB0eXBlIEhuc3dNb2R1bGVGYWN0b3J5ID0gdHlwZW9mIGZhY3Rvcnk7CmV4cG9ydCB0eXBlIG5vcm1hbGl6ZVBvaW50ID0gSG5zd2xpYk1vZHVsZVsnbm9ybWFsaXplUG9pbnQnXTsKZXhwb3J0IGNvbnN0IElEQkZTX1NUT1JFX05BTUUgPSAnRklMRV9EQVRBJzsKCmV4cG9ydCAqIGZyb20gJy4vY29uc3RhbnRzJzsKCmV4cG9ydCBpbnRlcmZhY2UgSG5zd2xpYk1vZHVsZSBleHRlbmRzIE9taXQ8RW1zY3JpcHRlbk1vZHVsZSwgJ19tYWxsb2MnIHwgJ19mcmVlJz4gewogIG5vcm1hbGl6ZVBvaW50KHZlYzogbnVtYmVyW10pOiBudW1iZXJbXTsKICBMMlNwYWNlOiB0eXBlb2YgbW9kdWxlLkwyU3BhY2U7CiAgSW5uZXJQcm9kdWN0U3BhY2U6IHR5cGVvZiBtb2R1bGUuSW5uZXJQcm9kdWN0U3BhY2U7CiAgQnJ1dGVmb3JjZVNlYXJjaDogdHlwZW9mIG1vZHVsZS5CcnV0ZWZvcmNlU2VhcmNoOwogIEhpZXJhcmNoaWNhbE5TVzogdHlwZW9mIG1vZHVsZS5IaWVyYXJjaGljYWxOU1c7CiAgRW1zY3JpcHRlbkZpbGVTeXN0ZW1NYW5hZ2VyOiB0eXBlb2YgbW9kdWxlLkVtc2NyaXB0ZW5GaWxlU3lzdGVtTWFuYWdlcjsKICBhc206IHsKICAgIG1hbGxvYyhzaXplOiBudW1iZXIpOiBudW1iZXI7CiAgICBmcmVlKHB0cjogbnVtYmVyKTogdm9pZDsKICB9Owp9CgpsZXQgbGlicmFyeTogQXdhaXRlZDxIbnN3bGliTW9kdWxlPjsKdHlwZSBJbnB1dEZzVHlwZSA9ICdJREJGUycgfCB1bmRlZmluZWQ7CgpleHBvcnQgY29uc3Qgc3luY0ZpbGVTeXN0ZW0gPSAoYWN0aW9uOiAncmVhZCcgfCAnd3JpdGUnKTogUHJvbWlzZTx2b2lkPiA9PiB7CiAgY29uc3QgRW1zY3JpcHRlbkZpbGVTeXN0ZW1NYW5hZ2VyOiBIbnN3bGliTW9kdWxlWydFbXNjcmlwdGVuRmlsZVN5c3RlbU1hbmFnZXInXSA9IGxpYnJhcnkuRW1zY3JpcHRlbkZpbGVTeXN0ZW1NYW5hZ2VyOwoKICBjb25zdCBzeW5jQWN0aW9uID0gYWN0aW9uID09PSAncmVhZCcgPyB0cnVlIDogYWN0aW9uID09PSAnd3JpdGUnID8gZmFsc2UgOiB1bmRlZmluZWQ7CiAgaWYgKHN5bmNBY3Rpb24gPT09IHVuZGVmaW5lZCkgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGFjdGlvbiB0eXBlJyk7CgogIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7CiAgICB0cnkgewogICAgICBFbXNjcmlwdGVuRmlsZVN5c3RlbU1hbmFnZXIuc3luY0ZTKHN5bmNBY3Rpb24sICgpID0+IHsKICAgICAgICByZXNvbHZlKCk7CiAgICAgIH0pOwogICAgfSBjYXRjaCAoZXJyb3IpIHsKICAgICAgcmVqZWN0KGVycm9yKTsKICAgIH0KICB9KTsKfTsKCmV4cG9ydCBjb25zdCB3YWl0Rm9yRmlsZVN5c3RlbUluaXRhbGl6ZWQgPSAoKTogUHJvbWlzZTx2b2lkPiA9PiB7CiAgY29uc3QgRW1zY3JpcHRlbkZpbGVTeXN0ZW1NYW5hZ2VyOiBIbnN3bGliTW9kdWxlWydFbXNjcmlwdGVuRmlsZVN5c3RlbU1hbmFnZXInXSA9IGxpYnJhcnkuRW1zY3JpcHRlbkZpbGVTeXN0ZW1NYW5hZ2VyOwogIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7CiAgICBsZXQgdG90YWxXYWl0VGltZSA9IDA7CiAgICBjb25zdCBjaGVja0ludGVydmFsID0gMTAwOyAvLyBDaGVjayBldmVyeSAxMDBtcwogICAgY29uc3QgbWF4V2FpdFRpbWUgPSA0MDAwOyAvLyBNYXhpbXVtIHdhaXQgdGltZSBvZiA0IHNlY29uZHMKCiAgICBjb25zdCBjaGVja0luaXRpYWxpemF0aW9uID0gKCkgPT4gewogICAgICBpZiAoRW1zY3JpcHRlbkZpbGVTeXN0ZW1NYW5hZ2VyLmlzSW5pdGlhbGl6ZWQoKSkgewogICAgICAgIHJlc29sdmUoKTsKICAgICAgfSBlbHNlIGlmICh0b3RhbFdhaXRUaW1lID49IG1heFdhaXRUaW1lKSB7CiAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignRmFpbGVkIHRvIGluaXRpYWxpemUgZmlsZXN5c3RlbScpKTsKICAgICAgfSBlbHNlIHsKICAgICAgICB0b3RhbFdhaXRUaW1lICs9IGNoZWNrSW50ZXJ2YWw7CiAgICAgICAgc2V0VGltZW91dChjaGVja0luaXRpYWxpemF0aW9uLCBjaGVja0ludGVydmFsKTsKICAgICAgfQogICAgfTsKCiAgICBzZXRUaW1lb3V0KGNoZWNrSW5pdGlhbGl6YXRpb24sIGNoZWNrSW50ZXJ2YWwpOwogIH0pOwp9OwoKZXhwb3J0IGNvbnN0IHdhaXRGb3JGaWxlU3lzdGVtU3luY2VkID0gKCk6IFByb21pc2U8dm9pZD4gPT4gewogIGNvbnN0IEVtc2NyaXB0ZW5GaWxlU3lzdGVtTWFuYWdlciA9IGxpYnJhcnkuRW1zY3JpcHRlbkZpbGVTeXN0ZW1NYW5hZ2VyOwogIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7CiAgICBsZXQgdG90YWxXYWl0VGltZSA9IDA7CiAgICBjb25zdCBjaGVja0ludGVydmFsID0gMTAwOyAvLyBDaGVjayBldmVyeSAxMDBtcwogICAgY29uc3QgbWF4V2FpdFRpbWUgPSA0MDAwOyAvLyBNYXhpbXVtIHdhaXQgdGltZSBvZiA0IHNlY29uZHMKCiAgICBjb25zdCBjaGVja0luaXRpYWxpemF0aW9uID0gKCkgPT4gewogICAgICBpZiAoRW1zY3JpcHRlbkZpbGVTeXN0ZW1NYW5hZ2VyLmlzU3luY2VkKCkpIHsKICAgICAgICByZXNvbHZlKCk7CiAgICAgIH0gZWxzZSBpZiAodG90YWxXYWl0VGltZSA+PSBtYXhXYWl0VGltZSkgewogICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ0ZhaWxlZCB0byBpbml0aWFsaXplIGZpbGVzeXN0ZW0nKSk7CiAgICAgIH0gZWxzZSB7CiAgICAgICAgdG90YWxXYWl0VGltZSArPSBjaGVja0ludGVydmFsOwogICAgICAgIHNldFRpbWVvdXQoY2hlY2tJbml0aWFsaXphdGlvbiwgY2hlY2tJbnRlcnZhbCk7CiAgICAgIH0KICAgIH07CgogICAgc2V0VGltZW91dChjaGVja0luaXRpYWxpemF0aW9uLCBjaGVja0ludGVydmFsKTsKICB9KTsKfTsKCi8qKgogKiBJbml0aWFsaXplcyB0aGUgZmlsZSBzeXN0ZW0gZm9yIHRoZSBITlNXIGxpYnJhcnkgdXNpbmcgdGhlIHNwZWNpZmllZCBmaWxlIHN5c3RlbSB0eXBlLgogKiBJZiBubyBmaWxlIHN5c3RlbSB0eXBlIGlzIHNwZWNpZmllZCwgSURCRlMgaXMgdXNlZCBieSBkZWZhdWx0LgogKiBAcGFyYW0gaW5wdXRGc1R5cGUgVGhlIHR5cGUgb2YgZmlsZSBzeXN0ZW0gdG8gdXNlLiBDYW4gYmUgJ0lEQkZTJyBvciB1bmRlZmluZWQuCiAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIGZpbGUgc3lzdGVtIGlzIGluaXRpYWxpemVkLCBvciByZWplY3RzIGlmIGluaXRpYWxpemF0aW9uIGZhaWxzLgogKi8KY29uc3QgaW5pdGlhbGl6ZUZpbGVTeXN0ZW1Bc3luYyA9IGFzeW5jIChpbnB1dEZzVHlwZT86IElucHV0RnNUeXBlKTogUHJvbWlzZTx2b2lkPiA9PiB7CiAgY29uc3QgZnNUeXBlID0gaW5wdXRGc1R5cGUgPT0gbnVsbCA/ICdJREJGUycgOiBpbnB1dEZzVHlwZTsKICBjb25zdCBFbXNjcmlwdGVuRmlsZVN5c3RlbU1hbmFnZXIgPSBsaWJyYXJ5LkVtc2NyaXB0ZW5GaWxlU3lzdGVtTWFuYWdlcjsKCiAgaWYgKEVtc2NyaXB0ZW5GaWxlU3lzdGVtTWFuYWdlci5pc0luaXRpYWxpemVkKCkpIHsKICAgIHJldHVybjsKICB9CiAgRW1zY3JpcHRlbkZpbGVTeXN0ZW1NYW5hZ2VyLmluaXRpYWxpemVGaWxlU3lzdGVtKGZzVHlwZSk7CiAgcmV0dXJuIGF3YWl0IHdhaXRGb3JGaWxlU3lzdGVtSW5pdGFsaXplZCgpOwp9OwoKLyoqCiAqIExvYWQgdGhlIEhOU1cgbGlicmFyeSBpbiBub2RlIG9yIGJyb3dzZXIKICovCmV4cG9ydCBjb25zdCBsb2FkSG5zd2xpYiA9IGFzeW5jIChpbnB1dEZzVHlwZT86IElucHV0RnNUeXBlKTogUHJvbWlzZTxIbnN3bGliTW9kdWxlPiA9PiB7CiAgdHJ5IHsKICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgLSBobnN3bGliIGNhbiBiZSBhIGdsb2JhbCB2YXJpYWJsZSBpbiB0aGUgYnJvd3NlcgogICAgaWYgKHR5cGVvZiBobnN3bGliICE9PSAndW5kZWZpbmVkJyAmJiBobnN3bGliICE9PSBudWxsKSB7CiAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgLSBobnN3bGliIGNhbiBiZSBhIGdsb2JhbCB2YXJpYWJsZSBpbiB0aGUgYnJvd3NlcgogICAgICBjb25zdCBsaWIgPSBobnN3bGliKCk7CiAgICAgIGlmIChsaWIgIT0gbnVsbCkgcmV0dXJuIGxpYjsKICAgIH0KCiAgICBpZiAoIWxpYnJhcnkpIHsKICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHMtY29tbWVudAogICAgICAvLyBAdHMtaWdub3JlCiAgICAgIGNvbnN0IHRlbXAgPSBhd2FpdCBpbXBvcnQoJy4vaG5zd2xpYi5tanMnKTsKICAgICAgY29uc3QgZmFjdG9yeUZ1bmMgPSB0ZW1wLmRlZmF1bHQ7CgogICAgICBsaWJyYXJ5ID0gYXdhaXQgZmFjdG9yeUZ1bmMoKTsKICAgICAgYXdhaXQgaW5pdGlhbGl6ZUZpbGVTeXN0ZW1Bc3luYyhpbnB1dEZzVHlwZSk7CiAgICAgIHJldHVybiBsaWJyYXJ5OyAvLyBBZGQgdGhpcyBsaW5lCiAgICB9CiAgICByZXR1cm4gbGlicmFyeTsKICB9IGNhdGNoIChlcnIpIHsKICAgIGNvbnNvbGUuZXJyb3IoJy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0nKTsKICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGluaXRpYWxpemluZyB0aGUgbGlicmFyeTonLCBlcnIpOwogICAgdGhyb3cgZXJyOwogIH0KfTsKCi8vIGRpc2FibGVkIGR1ZSB0byBsYWNrIG9mIHBlcmZvbWFuY2UgaW1wcm92ZW1hbnQgYW5kIGFkZGl0aW9uYWwgY29tcGxleGl0eQoKLy8gLyoqCi8vICAqIEFkZHMgaXRlbXMgYW5kIHRoZWlyIGNvcnJlc3BvbmRpbmcgbGFiZWxzIHRvIHRoZSBIaWVyYXJjaGljYWxOU1cgaW5kZXggdXNpbmcgbWVtb3J5IHBvaW50ZXJzLgovLyAgKiBUaGlzIGZ1bmN0aW9uIGhhbmRsZXMgdGhlIG1lbW9yeSBhbGxvY2F0aW9uIGZvciB0aGUgRW1zY3JpcHRlbiBNb2R1bGUsIGFuZCBwcm9wZXJseSBmcmVlcyB0aGUgbWVtb3J5IGFmdGVyIHVzZS4gIGl0cyBhIHdyYXBwZXIgYXJvdW5kIHtAbGluayBIaWVyYXJjaGljYWxOU1cjYWRkSXRlbXNXaXRoUHRyc30KLy8gICoKLy8gICog4puU77iPIFRoaXMgZnVuY3Rpb24gaXMgb25seSAxLjAyeCBmYXN0ZXIgdGhhbiB2ZWN0b3JzIGZvciAxMGsgcG9pbnRzIHZlcnNpb24gd2hpY2ggYXJlIGVhc2llciB0byB1c2UuICBUaGUgc29sZSBhZHZhbnRhZ2UgaXMgbWVtb3J5IHNhdmluZ3MKLy8gICoKLy8gICogQGFzeW5jCi8vICAqIEBwYXJhbSB7SG5zd2xpYk1vZHVsZX0gTW9kdWxlIC0gVGhlIEVtc2NyaXB0ZW4gSE5TV0xJQiBNb2R1bGUgb2JqZWN0LgovLyAgKiBAcGFyYW0ge0hpZXJhcmNoaWNhbE5TV30gaW5kZXggLSBUaGUgSGllcmFyY2hpY2FsTlNXIGluZGV4IG9iamVjdC4KLy8gICogQHBhcmFtIHtGbG9hdDMyQXJyYXlbXSB8IG51bWJlcltdW119IGl0ZW1zIC0gQW4gYXJyYXkgb2YgaXRlbSB2ZWN0b3JzIHRvIGJlIGFkZGVkIHRvIHRoZSBzZWFyY2ggaW5kZXguIEVhY2ggaXRlbSBzaG91bGQgYmUgYSBGbG9hdDMyQXJyYXkgb3IgYW4gYXJyYXkgb2YgbnVtYmVycy4KLy8gICogQHBhcmFtIHtudW1iZXJbXX0gbGFiZWxzIC0gQW4gYXJyYXkgb2YgbnVtZXJpYyBsYWJlbHMgY29ycmVzcG9uZGluZyB0byB0aGUgaXRlbXMuIFRoZSBsZW5ndGggb2YgdGhlIGxhYmVscyBhcnJheSBzaG91bGQgbWF0Y2ggdGhlIGxlbmd0aCBvZiB0aGUgaXRlbXMgYXJyYXkuCi8vICAqIEBwYXJhbSB7Ym9vbGVhbn0gcmVwbGFjZURlbGV0ZWQgLSBBIGZsYWcgdG8gZGV0ZXJtaW5lIGlmIGRlbGV0ZWQgZWxlbWVudHMgc2hvdWxkIGJlIHJlcGxhY2VkIChkZWZhdWx0OiBmYWxzZSkuCi8vICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyBvbmNlIHRoZSBpdGVtcyBhbmQgbGFiZWxzIGhhdmUgYmVlbiBhZGRlZCB0byB0aGUgaW5kZXguCi8vICAqLwovLyBleHBvcnQgY29uc3QgYWRkSXRlbXNXaXRoUHRyc0hlbHBlciA9IGFzeW5jICgKLy8gICBNb2R1bGU6IEhuc3dsaWJNb2R1bGUsCi8vICAgaW5kZXg6IEhpZXJhcmNoaWNhbE5TVywKLy8gICBpdGVtczogRmxvYXQzMkFycmF5W10gfCBudW1iZXJbXVtdLAovLyAgIGxhYmVsczogbnVtYmVyW10sCi8vICAgcmVwbGFjZURlbGV0ZWQ6IGJvb2xlYW4KLy8gKTogUHJvbWlzZTx2b2lkPiA9PiB7Ci8vICAgY29uc3QgaXRlbUNvdW50ID0gaXRlbXMubGVuZ3RoOwovLyAgIGNvbnN0IGRpbSA9IGl0ZW1zWzBdLmxlbmd0aDsKCi8vICAgLy8gRmxhdHRlbiB0aGUgaXRlbXMgYXJyYXkgaW50byBhIEZsb2F0MzJBcnJheQovLyAgIGNvbnN0IGZsYXRJdGVtcyA9IG5ldyBGbG9hdDMyQXJyYXkoaXRlbUNvdW50ICogZGltKTsKLy8gICBpdGVtcy5mb3JFYWNoKCh2ZWMsIGkpID0+IHsKLy8gICAgIGZsYXRJdGVtcy5zZXQodmVjLCBpICogZGltKTsKLy8gICB9KTsKCi8vICAgLy8gQ29udmVydCBsYWJlbHMgdG8gYSBVaW50MzJBcnJheQovLyAgIGNvbnN0IGxhYmVsc0FycmF5ID0gbmV3IFVpbnQzMkFycmF5KGxhYmVscyk7CgovLyAgIGNvbnN0IHZlY0RhdGFQdHIgPSBNb2R1bGUuYXNtLm1hbGxvYyhmbGF0SXRlbXMubGVuZ3RoICogRmxvYXQzMkFycmF5LkJZVEVTX1BFUl9FTEVNRU5UKTsKLy8gICBjb25zdCBsYWJlbFZlY0RhdGFQdHIgPSBNb2R1bGUuYXNtLm1hbGxvYyhsYWJlbHNBcnJheS5sZW5ndGggKiBVaW50MzJBcnJheS5CWVRFU19QRVJfRUxFTUVOVCk7CgovLyAgIGlmICh2ZWNEYXRhUHRyID09PSAwKSB7Ci8vICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byBhbGxvY2F0ZSBtZW1vcnkgZm9yIHZlY0RhdGFQdHIuJyk7Ci8vICAgfQoKLy8gICBpZiAobGFiZWxWZWNEYXRhUHRyID09PSAwKSB7Ci8vICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byBhbGxvY2F0ZSBtZW1vcnkgZm9yIGxhYmVsVmVjRGF0YVB0ci4nKTsKLy8gICB9CgovLyAgIE1vZHVsZS5IRUFQRjMyLnNldChmbGF0SXRlbXMsIHZlY0RhdGFQdHIgLyBGbG9hdDMyQXJyYXkuQllURVNfUEVSX0VMRU1FTlQpOwovLyAgIE1vZHVsZS5IRUFQVTMyLnNldChsYWJlbHNBcnJheSwgbGFiZWxWZWNEYXRhUHRyIC8gVWludDMyQXJyYXkuQllURVNfUEVSX0VMRU1FTlQpOwoKLy8gICBhd2FpdCBpbmRleC5hZGRJdGVtc1dpdGhQdHIoCi8vICAgICBNb2R1bGUuSEVBUEYzMi5zdWJhcnJheSgKLy8gICAgICAgTWF0aC5mbG9vcih2ZWNEYXRhUHRyIC8gRmxvYXQzMkFycmF5LkJZVEVTX1BFUl9FTEVNRU5UKSwKLy8gICAgICAgTWF0aC5mbG9vcih2ZWNEYXRhUHRyIC8gRmxvYXQzMkFycmF5LkJZVEVTX1BFUl9FTEVNRU5UKSArIGl0ZW1Db3VudCAqIGRpbQovLyAgICAgKSwKLy8gICAgIGl0ZW1Db3VudCAqIGRpbSwKLy8gICAgIE1vZHVsZS5IRUFQVTMyLnN1YmFycmF5KAovLyAgICAgICBNYXRoLmZsb29yKGxhYmVsVmVjRGF0YVB0ciAvIFVpbnQzMkFycmF5LkJZVEVTX1BFUl9FTEVNRU5UKSwKLy8gICAgICAgTWF0aC5mbG9vcihsYWJlbFZlY0RhdGFQdHIgLyBVaW50MzJBcnJheS5CWVRFU19QRVJfRUxFTUVOVCkgKyBpdGVtQ291bnQKLy8gICAgICksCi8vICAgICBpdGVtQ291bnQsCi8vICAgICByZXBsYWNlRGVsZXRlZAovLyAgICk7CgovLyAgIE1vZHVsZS5hc20uZnJlZSh2ZWNEYXRhUHRyKTsKLy8gICBNb2R1bGUuYXNtLmZyZWUobGFiZWxWZWNEYXRhUHRyKTsKLy8gfTsKIAovKioqKioqKioqKioqKioqKiogR0VORVJBVEVEIEZJTEUgKioqKioqKioqKioqKioqKioqKiovIAo=", self.location));
        }
        read_ = (filename, binary) => {
          filename = isFileURI(filename) ? new URL(filename) : nodePath.normalize(filename);
          return fs.readFileSync(filename, binary ? void 0 : "utf8");
        };
        readBinary = (filename) => {
          var ret = read_(filename, true);
          if (!ret.buffer) {
            ret = new Uint8Array(ret);
          }
          assert(ret.buffer);
          return ret;
        };
        readAsync = (filename, onload, onerror, binary = true) => {
          filename = isFileURI(filename) ? new URL(filename) : nodePath.normalize(filename);
          fs.readFile(filename, binary ? void 0 : "utf8", (err2, data) => {
            if (err2)
              onerror(err2);
            else
              onload(binary ? data.buffer : data);
          });
        };
        if (!Module["thisProgram"] && process$1.argv.length > 1) {
          thisProgram = process$1.argv[1].replace(/\\/g, "/");
        }
        process$1.argv.slice(2);
      } else if (ENVIRONMENT_IS_SHELL) {
        if (typeof process$1 == "object" && typeof require2 === "function" || typeof window == "object" || typeof importScripts == "function")
          throw new Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
        if (typeof read != "undefined") {
          read_ = read;
        }
        readBinary = (f) => {
          if (typeof readbuffer == "function") {
            return new Uint8Array(readbuffer(f));
          }
          let data = read(f, "binary");
          assert(typeof data == "object");
          return data;
        };
        readAsync = (f, onload, onerror) => {
          setTimeout(() => onload(readBinary(f)));
        };
        if (typeof clearTimeout == "undefined") {
          globalThis.clearTimeout = (id) => {
          };
        }
        if (typeof setTimeout == "undefined") {
          globalThis.setTimeout = (f) => typeof f == "function" ? f() : abort();
        }
        if (typeof scriptArgs != "undefined") {
          scriptArgs;
        }
        if (typeof print != "undefined") {
          if (typeof console == "undefined")
            console = {};
          console.log = print;
          console.warn = console.error = typeof printErr != "undefined" ? printErr : print;
        }
      } else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
        if (ENVIRONMENT_IS_WORKER) {
          scriptDirectory = self.location.href;
        } else if (typeof document != "undefined" && document.currentScript) {
          scriptDirectory = document.currentScript.src;
        }
        if (_scriptName) {
          scriptDirectory = _scriptName;
        }
        if (scriptDirectory.startsWith("blob:")) {
          scriptDirectory = "";
        } else {
          scriptDirectory = scriptDirectory.substr(0, scriptDirectory.replace(/[?#].*/, "").lastIndexOf("/") + 1);
        }
        if (!(typeof window == "object" || typeof importScripts == "function"))
          throw new Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
        {
          read_ = (url) => {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, false);
            xhr.send(null);
            return xhr.responseText;
          };
          if (ENVIRONMENT_IS_WORKER) {
            readBinary = (url) => {
              var xhr = new XMLHttpRequest();
              xhr.open("GET", url, false);
              xhr.responseType = "arraybuffer";
              xhr.send(null);
              return new Uint8Array(xhr.response);
            };
          }
          readAsync = (url, onload, onerror) => {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.responseType = "arraybuffer";
            xhr.onload = () => {
              if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
                onload(xhr.response);
                return;
              }
              onerror();
            };
            xhr.onerror = onerror;
            xhr.send(null);
          };
        }
      } else {
        throw new Error("environment detection error");
      }
      var out = Module["print"] || console.log.bind(console);
      var err = Module["printErr"] || console.error.bind(console);
      Object.assign(Module, moduleOverrides);
      moduleOverrides = null;
      checkIncomingModuleAPI();
      if (Module["arguments"])
        Module["arguments"];
      legacyModuleProp("arguments", "arguments_");
      if (Module["thisProgram"])
        thisProgram = Module["thisProgram"];
      legacyModuleProp("thisProgram", "thisProgram");
      if (Module["quit"])
        Module["quit"];
      legacyModuleProp("quit", "quit_");
      assert(typeof Module["memoryInitializerPrefixURL"] == "undefined", "Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead");
      assert(typeof Module["pthreadMainPrefixURL"] == "undefined", "Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead");
      assert(typeof Module["cdInitializerPrefixURL"] == "undefined", "Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead");
      assert(typeof Module["filePackagePrefixURL"] == "undefined", "Module.filePackagePrefixURL option was removed, use Module.locateFile instead");
      assert(typeof Module["read"] == "undefined", "Module.read option was removed (modify read_ in JS)");
      assert(typeof Module["readAsync"] == "undefined", "Module.readAsync option was removed (modify readAsync in JS)");
      assert(typeof Module["readBinary"] == "undefined", "Module.readBinary option was removed (modify readBinary in JS)");
      assert(typeof Module["setWindowTitle"] == "undefined", "Module.setWindowTitle option was removed (modify emscripten_set_window_title in JS)");
      assert(typeof Module["TOTAL_MEMORY"] == "undefined", "Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY");
      legacyModuleProp("asm", "wasmExports");
      legacyModuleProp("read", "read_");
      legacyModuleProp("readAsync", "readAsync");
      legacyModuleProp("readBinary", "readBinary");
      legacyModuleProp("setWindowTitle", "setWindowTitle");
      var wasmBinary;
      if (Module["wasmBinary"])
        wasmBinary = Module["wasmBinary"];
      legacyModuleProp("wasmBinary", "wasmBinary");
      if (typeof WebAssembly != "object") {
        err("no native wasm support detected");
      }
      if (typeof atob == "undefined") {
        if (typeof global != "undefined" && typeof globalThis == "undefined") {
          globalThis = global;
        }
        globalThis.atob = function(input) {
          var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
          var output = "";
          var chr1, chr2, chr3;
          var enc1, enc2, enc3, enc4;
          var i2 = 0;
          input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
          do {
            enc1 = keyStr.indexOf(input.charAt(i2++));
            enc2 = keyStr.indexOf(input.charAt(i2++));
            enc3 = keyStr.indexOf(input.charAt(i2++));
            enc4 = keyStr.indexOf(input.charAt(i2++));
            chr1 = enc1 << 2 | enc2 >> 4;
            chr2 = (enc2 & 15) << 4 | enc3 >> 2;
            chr3 = (enc3 & 3) << 6 | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 !== 64) {
              output = output + String.fromCharCode(chr2);
            }
            if (enc4 !== 64) {
              output = output + String.fromCharCode(chr3);
            }
          } while (i2 < input.length);
          return output;
        };
      }
      function intArrayFromBase64(s) {
        if (typeof ENVIRONMENT_IS_NODE != "undefined" && ENVIRONMENT_IS_NODE) {
          var buf = Buffer.from(s, "base64");
          return new Uint8Array(buf.buffer, buf.byteOffset, buf.length);
        }
        var decoded = atob(s);
        var bytes = new Uint8Array(decoded.length);
        for (var i2 = 0; i2 < decoded.length; ++i2) {
          bytes[i2] = decoded.charCodeAt(i2);
        }
        return bytes;
      }
      function tryParseAsDataURI(filename) {
        if (!isDataURI(filename)) {
          return;
        }
        return intArrayFromBase64(filename.slice(dataURIPrefix.length));
      }
      var wasmMemory;
      var ABORT = false;
      function assert(condition, text) {
        if (!condition) {
          abort("Assertion failed" + (text ? ": " + text : ""));
        }
      }
      var HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;
      function updateMemoryViews() {
        var b = wasmMemory.buffer;
        Module["HEAP8"] = HEAP8 = new Int8Array(b);
        Module["HEAP16"] = HEAP16 = new Int16Array(b);
        Module["HEAPU8"] = HEAPU8 = new Uint8Array(b);
        Module["HEAPU16"] = HEAPU16 = new Uint16Array(b);
        Module["HEAP32"] = HEAP32 = new Int32Array(b);
        Module["HEAPU32"] = HEAPU32 = new Uint32Array(b);
        Module["HEAPF32"] = HEAPF32 = new Float32Array(b);
        Module["HEAPF64"] = HEAPF64 = new Float64Array(b);
      }
      assert(!Module["STACK_SIZE"], "STACK_SIZE can no longer be set at runtime.  Use -sSTACK_SIZE at link time");
      assert(typeof Int32Array != "undefined" && typeof Float64Array !== "undefined" && Int32Array.prototype.subarray != void 0 && Int32Array.prototype.set != void 0, "JS engine does not provide full typed array support");
      assert(!Module["wasmMemory"], "Use of `wasmMemory` detected.  Use -sIMPORTED_MEMORY to define wasmMemory externally");
      assert(!Module["INITIAL_MEMORY"], "Detected runtime INITIAL_MEMORY setting.  Use -sIMPORTED_MEMORY to define wasmMemory dynamically");
      function writeStackCookie() {
        var max = _emscripten_stack_get_end();
        assert((max & 3) == 0);
        if (max == 0) {
          max += 4;
        }
        HEAPU32[max >> 2] = 34821223;
        HEAPU32[max + 4 >> 2] = 2310721022;
        HEAPU32[0 >> 2] = 1668509029;
      }
      function checkStackCookie() {
        if (ABORT)
          return;
        var max = _emscripten_stack_get_end();
        if (max == 0) {
          max += 4;
        }
        var cookie1 = HEAPU32[max >> 2];
        var cookie2 = HEAPU32[max + 4 >> 2];
        if (cookie1 != 34821223 || cookie2 != 2310721022) {
          abort(`Stack overflow! Stack cookie has been overwritten at ${ptrToString(max)}, expected hex dwords 0x89BACDFE and 0x2135467, but received ${ptrToString(cookie2)} ${ptrToString(cookie1)}`);
        }
        if (HEAPU32[0 >> 2] != 1668509029) {
          abort("Runtime error: The application has corrupted its heap memory area (address zero)!");
        }
      }
      (function() {
        var h16 = new Int16Array(1);
        var h8 = new Int8Array(h16.buffer);
        h16[0] = 25459;
        if (h8[0] !== 115 || h8[1] !== 99)
          throw "Runtime error: expected the system to be little-endian! (Run with -sSUPPORT_BIG_ENDIAN to bypass)";
      })();
      var __ATPRERUN__ = [];
      var __ATINIT__ = [];
      var __ATPOSTRUN__ = [];
      var runtimeInitialized = false;
      function preRun() {
        if (Module["preRun"]) {
          if (typeof Module["preRun"] == "function")
            Module["preRun"] = [
              Module["preRun"]
            ];
          while (Module["preRun"].length) {
            addOnPreRun(Module["preRun"].shift());
          }
        }
        callRuntimeCallbacks(__ATPRERUN__);
      }
      function initRuntime() {
        assert(!runtimeInitialized);
        runtimeInitialized = true;
        checkStackCookie();
        if (!Module["noFSInit"] && !FS.init.initialized)
          FS.init();
        FS.ignorePermissions = false;
        callRuntimeCallbacks(__ATINIT__);
      }
      function postRun() {
        checkStackCookie();
        if (Module["postRun"]) {
          if (typeof Module["postRun"] == "function")
            Module["postRun"] = [
              Module["postRun"]
            ];
          while (Module["postRun"].length) {
            addOnPostRun(Module["postRun"].shift());
          }
        }
        callRuntimeCallbacks(__ATPOSTRUN__);
      }
      function addOnPreRun(cb) {
        __ATPRERUN__.unshift(cb);
      }
      function addOnInit(cb) {
        __ATINIT__.unshift(cb);
      }
      function addOnPostRun(cb) {
        __ATPOSTRUN__.unshift(cb);
      }
      assert(Math.imul, "This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
      assert(Math.fround, "This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
      assert(Math.clz32, "This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
      assert(Math.trunc, "This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
      var runDependencies = 0;
      var runDependencyWatcher = null;
      var dependenciesFulfilled = null;
      var runDependencyTracking = {};
      function getUniqueRunDependency(id) {
        var orig = id;
        while (1) {
          if (!runDependencyTracking[id])
            return id;
          id = orig + Math.random();
        }
      }
      function addRunDependency(id) {
        var _a;
        runDependencies++;
        (_a = Module["monitorRunDependencies"]) == null ? void 0 : _a.call(Module, runDependencies);
        if (id) {
          assert(!runDependencyTracking[id]);
          runDependencyTracking[id] = 1;
          if (runDependencyWatcher === null && typeof setInterval != "undefined") {
            runDependencyWatcher = setInterval(() => {
              if (ABORT) {
                clearInterval(runDependencyWatcher);
                runDependencyWatcher = null;
                return;
              }
              var shown = false;
              for (var dep in runDependencyTracking) {
                if (!shown) {
                  shown = true;
                  err("still waiting on run dependencies:");
                }
                err(`dependency: ${dep}`);
              }
              if (shown) {
                err("(end of list)");
              }
            }, 1e4);
          }
        } else {
          err("warning: run dependency added without ID");
        }
      }
      function removeRunDependency(id) {
        var _a;
        runDependencies--;
        (_a = Module["monitorRunDependencies"]) == null ? void 0 : _a.call(Module, runDependencies);
        if (id) {
          assert(runDependencyTracking[id]);
          delete runDependencyTracking[id];
        } else {
          err("warning: run dependency removed without ID");
        }
        if (runDependencies == 0) {
          if (runDependencyWatcher !== null) {
            clearInterval(runDependencyWatcher);
            runDependencyWatcher = null;
          }
          if (dependenciesFulfilled) {
            var callback = dependenciesFulfilled;
            dependenciesFulfilled = null;
            callback();
          }
        }
      }
      function abort(what) {
        var _a;
        (_a = Module["onAbort"]) == null ? void 0 : _a.call(Module, what);
        what = "Aborted(" + what + ")";
        err(what);
        ABORT = true;
        if (runtimeInitialized) {
          ___trap();
        }
        var e = new WebAssembly.RuntimeError(what);
        readyPromiseReject(e);
        throw e;
      }
      var dataURIPrefix = "data:application/octet-stream;base64,";
      var isDataURI = (filename) => filename.startsWith(dataURIPrefix);
      var isFileURI = (filename) => filename.startsWith("file://");
      function createExportWrapper(name, nargs) {
        return (...args) => {
          assert(runtimeInitialized, `native function \`${name}\` called before runtime initialization`);
          var f = wasmExports[name];
          assert(f, `exported native function \`${name}\` not found`);
          assert(args.length <= nargs, `native function \`${name}\` called with ${args.length} args but expects ${nargs}`);
          return f(...args);
        };
      }
      var wasmBinaryFile;
      wasmBinaryFile = "data:application/octet-stream;base64,AGFzbQEAAAAB/AM9YAJ/fwBgAX8Bf2ACf38Bf2ABfwBgA39/fwF/YAN/f38AYAR/f39/AX9gBH9/f38AYAZ/f39/f38Bf2AFf39/f38Bf2AFf39/f38AYAN/f38BfWAAAGAGf39/f39/AGAIf39/f39/f38Bf2AAAX9gB39/f39/f38Bf2AHf39/f39/fwBgA39+fwF+YAV/fn5+fgBgBX9/fn9/AGAFf39/f34Bf2AIf39/f39/f38AYAR/fn5/AGAKf39/f39/f39/fwF/YAZ/f39/fn4Bf2AHf39/f39+fgF/YAN/f38BfGAGf3x/f39/AX9gA39+fwF/YAR/f39/AX5gDH9/f39/f39/f39/fwF/YAV/f39/fAF/YAR/f398AX9gBX9/f35+AX9gC39/f39/f39/f39/AX9gCn9/f39/f39/f38AYA9/f39/f39/f39/f39/f38AYAV/f39/fwF8YA1/f39/f39/f39/f39/AGAJf39/f39/f39/AGAEf39/fwF9YAF8AXxgAnx/AXxgAn5/AX9gAn5+AXxgAX8BfmADf35/AGACf34AYAJ/fABgBH5+fn4Bf2ADfn5+AX9gAX8BfGAEf35+fgBgAn9/AX5gAn5+AX1gA39/fgBgBH9/f34BfmAFfn9/f38Bf2AJf39/f39/f39/AX9gBH9/fn4AAo4KLQNlbnYNX2VtdmFsX2RlY3JlZgADA2VudhhfZW12YWxfZ2V0X21ldGhvZF9jYWxsZXIABANlbnYSX2VtdmFsX2NhbGxfbWV0aG9kACYDZW52Fl9lbXZhbF9ydW5fZGVzdHJ1Y3RvcnMAAwNlbnYZX2VtYmluZF9yZWdpc3Rlcl9mdW5jdGlvbgARA2VudhZfZW1iaW5kX3JlZ2lzdGVyX2NsYXNzACcDZW52Il9lbWJpbmRfcmVnaXN0ZXJfY2xhc3NfY29uc3RydWN0b3IADQNlbnYfX2VtYmluZF9yZWdpc3Rlcl9jbGFzc19mdW5jdGlvbgAoA2VudiVfZW1iaW5kX3JlZ2lzdGVyX2NsYXNzX2NsYXNzX2Z1bmN0aW9uABYDZW52EV9lbXZhbF90YWtlX3ZhbHVlAAIDZW52DV9lbXZhbF9pbmNyZWYAAwNlbnYQX2VtdmFsX25ld19hcnJheQAPA2VudhFfZW12YWxfbmV3X29iamVjdAAPA2VudhJfZW12YWxfbmV3X2NzdHJpbmcAAQNlbnYTX2VtdmFsX3NldF9wcm9wZXJ0eQAFA2VudhhlbXNjcmlwdGVuX2FzbV9jb25zdF9pbnQABANlbnYKc3luY0lkYl9qcwADA2VudiFfZW12YWxfbmV3X2FycmF5X2Zyb21fbWVtb3J5X3ZpZXcAAQNlbnYTX2VtdmFsX2dldF9wcm9wZXJ0eQACA2VudglfZW12YWxfYXMAGwNlbnYNX19hc3NlcnRfZmFpbAAHA2VudhVfZW1iaW5kX3JlZ2lzdGVyX3ZvaWQAAANlbnYVX2VtYmluZF9yZWdpc3Rlcl9ib29sAAcDZW52GF9lbWJpbmRfcmVnaXN0ZXJfaW50ZWdlcgAKA2VudhZfZW1iaW5kX3JlZ2lzdGVyX2Zsb2F0AAUDZW52G19lbWJpbmRfcmVnaXN0ZXJfc3RkX3N0cmluZwAAA2VudhxfZW1iaW5kX3JlZ2lzdGVyX3N0ZF93c3RyaW5nAAUDZW52Fl9lbWJpbmRfcmVnaXN0ZXJfZW12YWwAAwNlbnYcX2VtYmluZF9yZWdpc3Rlcl9tZW1vcnlfdmlldwAFA2VudhVfZW1zY3JpcHRlbl9tZW1jcHlfanMABRZ3YXNpX3NuYXBzaG90X3ByZXZpZXcxCGZkX3dyaXRlAAYDZW52FmVtc2NyaXB0ZW5fcmVzaXplX2hlYXAAAQNlbnYQX19zeXNjYWxsX29wZW5hdAAGA2VudhFfX3N5c2NhbGxfZmNudGw2NAAEA2Vudg9fX3N5c2NhbGxfaW9jdGwABBZ3YXNpX3NuYXBzaG90X3ByZXZpZXcxB2ZkX3JlYWQABhZ3YXNpX3NuYXBzaG90X3ByZXZpZXcxCGZkX2Nsb3NlAAEWd2FzaV9zbmFwc2hvdF9wcmV2aWV3MRFlbnZpcm9uX3NpemVzX2dldAACFndhc2lfc25hcHNob3RfcHJldmlldzELZW52aXJvbl9nZXQAAgNlbnYKc3RyZnRpbWVfbAAJA2VudhBfX3N5c2NhbGxfc3RhdDY0AAIDZW52BWFib3J0AAwDZW52Il9fdGhyb3dfZXhjZXB0aW9uX3dpdGhfc3RhY2tfdHJhY2UAAwNlbnYXX2VtYmluZF9yZWdpc3Rlcl9iaWdpbnQAERZ3YXNpX3NuYXBzaG90X3ByZXZpZXcxB2ZkX3NlZWsACQPEB8IHDAEMAwMDAwIMAwMADAwCAQMCAQspAQIBAQsBAwIBBAEDBAIABQACAAUABQcACgkBAQEDBgQKDQUHAAAFBAcKBwoHBgACAAEAAAUAAQEACgABAwEPAAMPBQADDwIBBAUDAgcAAgUFBQgDAAUAAAAMAwILAQEBAwsBAgcKAAoAAgEBAwACAQYDAgMDAQcFAAUKAAEBAwAKBQkNBwUBBwAAAwAEBQQqBAQAAQIBAQQGAwMEEgErCRAFAQcsChwAAgIBAQMCABcXLQEEDAICAhIEAR0dAQEBBC4DAQMABBQHBAUEAQECBAIBAQMDAAMCAQEABQAvAQEDAwADAAUFAgEBAAEABQAEAQEBBAMDAQwCAgQUBwEAAwEDAwEDBQcFBwQDAAACAQEFBAQBBQEDAAEDDAADMAEAExMxMjM0NQATFxMTEwc2NwY4BAQCAgECBgQCBgMABjkHCQcFBAkHBQQIEAIACAEFGAYHCB4IBggGCB4ICh8LCBsIBwgPBAQCCBAIAgUYCAgICAgKHwgICAQJAQEJBwkEEQgVCRUgIQQGERkiCQQJAQkRCBUJFSAhERkiCQQAAA4BCAgIDQgNCAoJDg4ICAgNCA0ICgkOEA0QAQAAAAEAAhAjAAUFEAUKAAIAECMAEAUKAAIaJCUECBokJQQIBA0NAQICAwADAwEFAwMBAwACAwMDAwAEBgYGAgQCBAYECQEDAgQCBAYECQ4JCQMOBA4JCQEBCQEODgkBDg4JAQMBAwEBAAAAAAAAAAABAwEDAQMBAwEDAQMBAwEDAQMBAwEDAQMBAwEDAwEAAQAFAwQBAQUBBQAAAwwBAwMBDAIMAQMABQEDBQwABQIFAwUDAQMDAwUCAAICAgMWAQUFBAIAAhYBAAAAAAICAgIAAQUBBQQFBAEDAAMFAQwMAwAMDAwDDAMEBAQCBQcHBwcEAgcKDQoKCg0NDQEBAQEDAwEBAgEBOgADDA8PDwYDAgIBAgUEAQADAwEBAgICAQEABQEDAgACAQECAQIEBAQBAAABAgICAAEBAgUBAgQIAAIAAAICAAAAAQEDBgIEAgICAgICAgIAAAEABAYBAQICAgIABgEBBAECAAAHAAAAAAAAAAAAAAAABgACAwACAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAwIAAAAEAAAAAAAAAAAAAAAAAgAAAAAABAAAAAAABgAAAAACAgICAAAAAAAAAgAAAAQAAAAAAAACAgIAAAAAAAQAAAQAAAAAAAACAAEAAAUAAQUDAQ8JERA7GDwEBQFwAOgFBQcBAYICgIACDQMBAAMGFwR/AUGwiwcLfwFBAAt/AUEAC38BQQALB8YEGgZtZW1vcnkCABFfX3dhc21fY2FsbF9jdG9ycwAtDV9fZ2V0VHlwZU5hbWUALg9fX2NwcF9leGNlcHRpb24EAAZtYWxsb2MA7QEEZnJlZQDuARlfX2luZGlyZWN0X2Z1bmN0aW9uX3RhYmxlAQAGZmZsdXNoAP8BBl9fdHJhcACnBRVlbXNjcmlwdGVuX3N0YWNrX2luaXQAhgYZZW1zY3JpcHRlbl9zdGFja19nZXRfZnJlZQCHBhllbXNjcmlwdGVuX3N0YWNrX2dldF9iYXNlAIgGGGVtc2NyaXB0ZW5fc3RhY2tfZ2V0X2VuZACJBhlfZW1zY3JpcHRlbl9zdGFja19yZXN0b3JlAOYHF19lbXNjcmlwdGVuX3N0YWNrX2FsbG9jAOcHHGVtc2NyaXB0ZW5fc3RhY2tfZ2V0X2N1cnJlbnQA6AciX19jeGFfZGVjcmVtZW50X2V4Y2VwdGlvbl9yZWZjb3VudADXBSJfX2N4YV9pbmNyZW1lbnRfZXhjZXB0aW9uX3JlZmNvdW50ANwFDl9fY3hhX2RlbWFuZ2xlAIoGJV9fdGhyb3duX29iamVjdF9mcm9tX3Vud2luZF9leGNlcHRpb24A5AcXX19nZXRfZXhjZXB0aW9uX21lc3NhZ2UA5QcMZHluQ2FsbF9qaWppAOkHDmR5bkNhbGxfdmlpamlpAOoHDmR5bkNhbGxfaWlpaWlqAOsHD2R5bkNhbGxfaWlpaWlqagDsBxBkeW5DYWxsX2lpaWlpaWpqAO0HCfAKAQBBAQvnBS/+BTs4PD0+P0BBQkNEPT5FRkFCQ0dISUpLTE1OT1BRUlNUVVZXWFlaW1xDXUJeX2BhYmNSU2RlZlVnUWhpamtsbW5vcHFyc0N0dXZ3eENCeXp7W3w3fX5/gAGBAYIBf4MBhAGFAYYBhwGIAYkB+wWjAaQBngEwMDEyNjqfAaABoQGkAaIBnwGgAaEBogGlAaYBpwGpAaoBrQGuAbgBvAG9Ab4BwAHXAd0B3gHoAekB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QAJAIAAoAgQgACwACyIFIAVBAEgiBBtBAmsOBQADAwMBAwsgACgCACAAIAQbIgQvAABB7OQARgRAQRAQnAUiACACNgIMIABB5wA2AgQgAEHs1wA2AgAgACACQQJ0NgIIDAILIAQvAABB6eABRw0CQRAQnAUiACACNgIMIABB5QA2AgQgAEGY2gA2AgAgACACQQJ0NgIIDAELIAAoAgAgACAEG0HyIEEGENMBDQFBEBCcBSIAIAI2AgwgAEHlADYCBCAAQZjaADYCACAAIAJBAnQ2AgggA0EBOgAMCyADIAA2AgggAUEQaiQAIAMMAQtBASECQY3pAi0AAEEBRgRAIAEgACgCACAAIAVBAEgbNgIAQa3LACABENQBC0EIENQFIQUGQCABQQRqIgQgABDGBQZAIAUgBBC0BSIAQeyLAjYCAEEAIQIgAEGQjAJB5AAQ2AUZIAEkACABLAAPQQBIBEAgASgCBBDuAQsJAAsZIAEkACACBEAgBRDVBQsJAAsACyEAGSAGJAAgAxDuAQkACyAAC08BAn8jACEDIAAoAgQiAgRAIAIgAigCACgCFBEDAAsGQAZAQcwAEJwFIQIYASACIAAoAgggARCKASEBGSADJAAgAhDuAQkACyAAIAE2AgQLNwEBfyABIAAoAgQiA0EBdWohASAAKAIAIQAgASACIANBAXEEfyABKAIAIABqKAIABSAACxEAAAtUAQF/IwBBEGsiAiQAIAACfyABKAIERQRAIAJBADYCCEHshgIgAkEIahAJDAELIAJBATYCCEHshgIgAkEIahAJCzYCBCAAQezpAjYCACACQRBqJAALTwECfyMAQRBrIgIkACABIAAoAgQiA0EBdWohASAAKAIAIQAgAkEIaiABIANBAXEEfyABKAIAIABqKAIABSAACxEAACACKAIMIAJBEGokAAupBwEFfyMAQdAAayICJAAgACgCBCIDBEAgAyADKAIAKAIUEQMACwZAQcwAEJwFIQMgACgCCCEEIANCADcCBCADQfzeADYCACADQgA3AgwgA0EANgIUIANCADcCHCADQgA3AiQgA0IANwIsIANCADcCNCADQgA3AjwgA0KAgICAgICAwD83AkQGQCADIAEgBBCLARkgAiQAIANBOGoQjAEgAxDuAQkACwcAIQEgAiQAQaSLA0Ho1AA2AgBBoIsDQQA2AgAg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IABCADcCACAAQQA2AggGQCACIANBIGoQtwVBACEBQZiNAkECENgFDAQZIAMkACADLAArQQBIBEAgAygCIBDuAQsJAAsAGSADJAAgAywAG0EASARAIAMoAhAQ7gELCQALABkgAyQAIAEEQCACENUFCwkACwALBkAgByAEIAJBACAHKAIAKAIAEQcABwAhASADJABBpIsDQYTVADYCAEGgiwNBADYCACABEIUGQQEhAAJAQaiLAygCAEEBRgRAIAEQ2QUhAUEIENQFIQIGQAZAIANBEGohBCABIAEoAgAoAggRAQAhARgGIAQgARA0IQEGQCADIAFB+MYAEL8FIgAoAgg2AiggAyAAKQIANwMgIABCADcCACAAQQA2AghBASEABkAgAiADQSBqELcFQQAhAEGYjQJBAhDYBQwEGSADJAAgAywAK0EASARAIAMoAiAQ7gELCQALABkgAyQAIAEsAAtBAEgEQCABKAIAEO4BCwkACwAZIAMkACAABEAgAhDVBQsGQBDaBRkgAyQAEOAFAAsJAAsACwkBCwALIANBMGokAA8LAAsgAEGYjQJBAhDYBQALzgEBAn8jAEEgayIEJAAgASAAKAIEIgVBAXVqIQEgACgCACEAIAVBAXEEQCABKAIAIABqKAIAIQALIAQgAjYCHCAEQezpAjYCGAZAIARBDGogBEEYahCaARkgBCQAIARBGGoQMwkACyAEKAIcIgJBCU8EQAZAIAIQABkgBCQAEOAFAAsLBkAgASAEQQxqIAMgABEFABkgBCQAIAQoAgwiAARAIAQgADYCECAAEO4BCwkACyAEKAIMIgAEQCAEIAA2AhAgABDuAQsgBEEgaiQAC5gCAQp/IwBBIGsiAiQAAkAgACgCBCIARQRABkAGQEEIENQFIQAYAyAAQZE2ELgFIQAMAhkgAiQAIAAQ1QUJAAsACyACIAE2AgwgAiACQQxqIgM2AhQgAkEYaiIGIABBOGoiASACQRRqIgchCiACQQhqIgQhCyADIAoQjgEgAigCGCgCDCEFIAEgAxCPASACIAAoAhQgACgCBCAAKAIQIAAoAgxBAWtsamooAgA2AgggAiAENgIUIAYgASAEIAcQjgEgAigCGCAFNgIMIAAoAgQiASAFIAAoAhAiA2xqIAEgACgCDEEBayADbGogACgCFEEEahDOARogACAAKAIMQQFr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C0EHdgRAIAAoAgAMAQsgAAsgBRAoIgBBgWBPBH9BiPMCQQAgAGs2AgBBfwUgAAtBf0YEQEGI8wIoAgAhAEH8hgMtAABFBEBB/IYDQQE6AAALIARBxOACNgIEIAQgADYCACACIAQpAwA3AwALIwBBEGsiACQAAkACQCACKAIAIgNFDQAgA0EsRyADQTZHcQ0AIAFB//8DNgIsIAFB/wE6ACgMAQsgAigCAARAIABBADYCDCAAIAY2AgggAEEANgIEIABB9g42AgAjAEEQayIDJAAgA0EANgIMBkAgACACEKgFBwAgAyQAENkFGgZAENsFGSADJAAGQBDaBRkgAyQAEOAFAAsJAAsACyADQRBqJAAgAUH//wM2AiwgAUEAOgAoDAELIAFB//8DNgIsIAFBADoAKCABIAUoAgRBgOADcUGAIGsiAkH//wJNBH8gAkEMdkGE7gFqLQAABUEIC8A6ACggASAFKAIEQf8fcTYCLAsgAEEQaiQAIARBEGokACAFQeAAaiQAGSABJAAgASwAE0EASARAIAEoAggQ7gELCQALGSABJAAgASwAI0EASARAIAEoAhgQ7gELCQALBwAgASQAENkFGhDaBUEADAELIAExACghCyABLAATQQBIBEAgASgCCBDuAQsgASwAI0EASARAIAEoAhgQ7gELIAtC/wFSIAtCAFJxCyABQTBqJAAL+wEBAn8jACEDIABCADcCICAAQYCAgPwDNgJIIAAgAjYCCCAAQfzeADYCACAAQgA3AiggAEIANwIwIABBOGoiBEIANwIAIABBQGtCADcCAAZAIAAgASABKAIAKAIAEQEANgIUIAAgASABKAIAKAIEEQEANgIYIAAgASABKAIAKAIIEQEANgIcIAAgACgCFEEEaiIBNgIQIAAgASACbBDtASIBNgIEAkAgAUUEQAZABkBBCBDUBSEAGAQgAEHsJhC4BSEADAIZIAMkAAZAIAAQ1QUYBAkACwALIABBADYCDCAADwsgAEGYjQJBAhDYBRkgAyQAIAQQjAEJAAsAC9gCAQF/IwBBwAFrIgMkAAZABkAgA0EEaiABELABIQEYASABIABBCGpBBBCdAiABIABBEGpBBBCdAiABIABBDGpBBBCdAiAAIAIgAigCACgCABEBADYCFCAAIAIgAigCACgCBBEBADYCGCAAIAIgAigCACgCCBEBADYCHCAAIAAoAhRBBGoiAjYCECAAIAAoAgggAmwiAhDtASIANgIEAkAgAEUEQAZABkBBCBDUBSEAGAQgAEG3JhC4BSEADAIZIAMkAAZAIAAQ1QUYBAkACwALIAEgACACEJ0CIAFBCGoiABC0AkUEQCABIAEoAgBBDGsoAgBqIgIgAigCEEEEchDZAgsgAUGMkwEoAgAiAjYCACABIAJBDGsoAgBqQZiTASgCADYCACAAELMCGiABQewAahCEAiADQcABaiQADwsgAEGYjQJBAhDYBRkgAyQAIAEQsQEaCQALAAs3AQJ/IAAoAggiAgRAA0AgAigCACACEO4BIgINAAsLIAAoAgAhASAAQQA2AgAgAQRAIAEQ7gELC8ABAQV/IAAoAgQgACwACyICIAJBAEgiAhsiA0EATwR/IAEoAgQgASwACyIEIARBAEgiBhsiBUUEQEEADwsCQAJAIAMgACgCACAAIAIbIgNqIgIgAyIEayIAIAVIDQAgASgCACABIAYbIgEsAAAhBgNAIAAgBWtBAWoiAEUNASAEIAYgABDSASIARQ0BIAAgASAFENMBRQ0CIAIgAEEBaiIEayIAIAVODQALCyACIQALQX8gACADayAAIAJGGwVBfwsLpwYCBn8CfSMAIQggAigCACEGIAACfwJAIAEoAgQiBEUNACABKAIAAn8gBEEBayAGcSAEaSIHQQFNDQAaIAYgBCAGSw0AGiAGIARwCyIFQQJ0aigCACICRQ0AIAIoAgAiAkUNACAHQQFNBEAgBEEBayEHA0ACQCAGIAIoAgQiCUcEQCAHIAlxIAVHDQQMAQsgAigCCCAGRw0AQQAMBAsgAigCACICDQALDAELA0ACQCAGIAIoAgQiB0cEQCAEIAdNBH8gByAEcAUgBwsgBUcNAwwBCyACKAIIIAZHDQBBAAwDCyACKAIAIgINAAsLQRAQnAUiAiAGNgIEIAJBADYCACADKAIAKAIAIQMgAkEANgIMIAIgAzYCCCABKgIQIQogASgCDEEBarMhCwJAIAQEQCAKIASzlCALXUUNAQtBAiEFBkACQAJAIAQgBEEBa3FBAEcgBEEDSXIgBEEBdHIiAwJ/IAsgCpWNIgpDAACAT10gCkMAAAAAYHEEQCAKqQwBC0EACyIHIAMgB0sbIgNBAUYNACADIANBAWtxRQRAIAMhBQwBCyADEPQBIQUgASgCBCEECyAEIAVPBEAgBCAFTQ0BIARBA0khBwJ/IAEoAgyzIAEqAhCVjSIKQwAAgE9dIApDAAAAAGBxBEAgCqkMAQtBAAshAyAFAn8CQCAHDQAgBGlBAUsNACADQQFBICADQQFrZ2t0IANBAkkbDAELIAMQ9AELIgMgAyAFSRsiBSAETw0BCyABIAUQrwELGSAIJAAgAhDuAQkACyABKAIEIgQgBEEBayIDcUUEQCADIAZxIQUMAQsgBCAGSwRAIAYhBQwBCyAGIARwIQULAkACQCABKAIAIAVBAnRqIgUoAgAiA0UEQCACIAFBCGoiAygCADYCACABIAI2AgggBSADNgIAIAIoAgAiA0UNAiADKAIEIQMCQCAEIARBAWsiBXFFBEAgAyAFcSEDDAELIAMgBEkNACADIARwIQMLIAEoAgAgA0ECdGohAwwBCyACIAMoAgA2AgALIAMgAjYCAAsgASABKAIMQQFqNgIMQQELOgAEIAAgAjYCAAvuBAEIfyMAQRBrIgYkAAJAIAAoAgQiA0UNACAAKAIAAn8gASgCACIEIANBAWtxIANpIgJBAU0NABogBCADIARLDQAaIAQgA3ALIgVBAnRqKAIAIgFFDQAgASgCACIBRQ0AAkAgAkEBTQRAIANBAWshAwNAAkAgBCABKAIEIgJHBEAgAiADcSAFRg0BDAULIAEoAgggBEYNAwsgASgCACIBDQALDAILA0ACQCAEIAEoAgQiAkcEQCACIANPBH8gAiADcAUgAgsgBUYNAQwECyABKAIIIARGDQILIAEoAgAiAQ0ACwwBCyABKAIEIQUCQCAAIgMoAgQiAmkiCEEBTQRAIAJBAWsgBXEhBQwBCyACIAVLDQAgBSACcCEFCyADKAIAIAVBAnRqIgcoAgAhAANAIAAiBCgCACIAIAFHDQALAkAgA0EIaiIJIARHBEAgBCgCBCEAAkAgCEEBTQRAIAAgAkEBa3EhAAwBCyAAIAJJDQAgACACcCEACyAAIAVGDQELIAEoAgAiAARAIAAoAgQhAAJAIAhBAU0EQCAAIAJBAWtxIQAMAQsgACACSQ0AIAAgAnAhAAsgACAFRg0BCyAHQQA2AgALIAQCf0EAIAEoAgAiB0UNABogBygCBCEAAkAgCEEBTQRAIAAgAkEBa3EhAAwBCyAAIAJJDQAgACACcCEACyAHIAAgBUYNABogAygCACAAQQJ0aiAENgIAIAEoAgALNgIAIAFBADYCACADIAMoAgxBAWs2AgwgBkEBOgAMIAYgCTYCCCAGIAE2AgQgBigCBCEAIAZBADYCBCAABEAgABDuAQsLIAZBEGokAAsUACAAIAEQtgUiAEHsiwI2AgAgAAu+AQECfyMAQSBrIgMkACAAKAIEIQQgAyABKAIANgIYIANBtIcCIANBGGoiARAJIgA2AhQgA0Hs6QI2AhAgAyACKgIAOAIYBkAgA0H8hwIgARAJIgE2AgwgA0Hs6QI2AggGQCAEIAAgARAOGSADJAAgA0EIahAzCQALGSADJAAgA0EQahAzCQALIAFBCU8EQAZAIAEQABkgAyQAEOAFAAsLIABBCU8EQAZAIAAQABkgAyQAEOAFAAsLIANBIGokAAu+AQECfyMAQSBrIgMkACAAKAIEIQQgAyABKAIANgIYIANBtIcCIANBGGoiARAJIgA2AhQgA0Hs6QI2AhAgAyACKAIANgIYBkAgA0HYhwIgARAJIgE2AgwgA0Hs6QI2AggGQCAEIAAgARAOGSADJAAgA0EIahAzCQALGSADJAAgA0EQahAzCQALIAFBCU8EQAZAIAEQABkgAyQAEOAFAAsLIABBCU8EQAZAIAAQABkgAyQAEOAFAAsLIANBIGokAAvkAwIHfwN9AkAgAkECSA0AIAJBAmtBAXYhCCAAKAIEIQcgACoCACEKIAAhAwNAIARBAXQiCUEBciEFIAMiBiAEQQN0akEIaiEDAkAgAiAJQQJqIgRMBEAgBSEEDAELAkAgAyoCACILIAMqAggiDF0NACALIAxeBEAgBSEEDAILIAMoAgQgAygCDEkNACAFIQQMAQsgA0EIaiEDCyAGIAMqAgA4AgAgBiADKAIENgIEIAQgCEwNAAsgAUEIayICIANGBEAgAyAHNgIEIAMgCjgCAA8LIAMgAioCADgCACADIAFBBGsiASgCADYCBCACIAo4AgAgASAHNgIAIAMgAGtBCGpBA3UiAUECSA0AAkAgACABQQJrIgZBAXYiBUEDdGoiBCoCACILIAMqAgAiCl0EQCAEKAIEIQEgAygCBCECDAELIAogC10NASAEKAIEIgEgAygCBCICTw0BCyADIAE2AgQgAyALOAIAAkACQCAGQQJJDQADQAJAIAogACAFQQFrIgZBAXYiBUEDdGoiAyoCACILXgRAIAMoAgQhAQwBCyAKIAtdDQIgAygCBCIBIAJPDQILIAQgATYCBCAEIAs4AgAgAyEEIAZBAUsNAAsMAQsgBCEDCyADIAI2AgQgAyAKOAIACwu3CQIGfwF8IwBBEGsiByQAIABCADcCBCAAQgA3AzAgAEG44gA2AgAgAEIANwIMIABCADcCFCAAQgA3AhwgAEIANwIkIABCADcDOCAAQUBrQgA3AwAgAEHIAGoiCkIANwMAIABBADYCUCAHQQA6AAwgByAKNgIIBkBBgIDgABCcBSEGGSAHJAAgB0EIahCzAQkACyAAIAY2AkggACAGQYCA4ABqIgk2AlAgBkEAQYCA4AAQ0AEaIAAgCTYCTCAAQQA2AnQgAEHsAGoiCUIANwIAIABCADcCZCAAQgA3AlwgAEIANwJUIAdBADoADCAHIAk2AggGQAJAIAIEQAZAIAJBq9Wq1QBPBEAQOQwDCyACQRhsIggQnAUhBhkgByQAIAdBCGoQswEJAAsgACAGNgJsIAAgBiAIajYCdCAAIAZBACAIQRhrIgYgBkEYcGtBGGoiBhDQASAGajYCcAsgAEIANwN4IABCADcDmAEgAEIANwOQASAAQgA3A4gBIABCADcDgAEGQCACBEAgACACQQJ0IgYQnAUiCDYClAEgACAGIAhqIgs2ApwBIAhBACAGENABGiAAIAs2ApgBCyAAQgA3A6gBIABBADYCoAEgAEIANwLsASAAQQE6AOgBIABBADYC5AEgAEIBNwLcASAAQoCAgPwTNwLUASAAQYCAgPwDNgKUAiAAIAI2AgQgAEEANgIUIABCADcDsAEgAEIANwO4ASAAQgA3A8ABIABCADcDyAEgAEEANgLQASAAQgA3AvQBIABCADcC/AEgAEGEAmoiBkIANwIAIABCADcCjAIgAEHEAWohCAZAIAAgASABKAIAKAIAEQEANgKgASAAIAEgASgCACgCBBEBADYCpAEgASABKAIAKAIIEQEAIQEgAEEKNgIoIAAgAzYCHCAAIAM2AhggACABNgKoASAAQQA2AoQBIAAgA0EBdDYCICAAIAQgAyADIARJGzYCJCAAIANBA3RBBHIiATYCfCAAIAE2AoABIABBASAFQf////8HcCIDIANBAU0bNgLYASAAIAAoAqABIAFqIgE2AogBIABBASAFQQFqQf////8HcCIDIANBAU0bNgLcASAAIAFBBGoiATYCDCAAIAAoAgQgAWwQ7QEiATYCjAECQCABRQRABkAGQEEIENQFIQEYByABQa4IELgFIQEMAhkgByQABkAgARDVBRgHCQALAAsgAEEANgIIQTQQnAUhAQZAIAEgAhC0ASEBGSAHJAAgARDuAQkACyAAQX82AnggACABNgJEIABBfzYCQCAAIAAoAgRBAnQQ7QEiATYCkAECQCABRQRABkAGQEEIENQFIQEYCCABQZ8QELgFIQEMAhkgByQABkAgARDVBRgICQALAAsgACAAKAIcQQJ0QQRqNgIQBkAgACgCGLgQ0QEhDBgGIABEAAAAAAAA8D8gDKMiDDkDMCAARAAAAAAAAPA/IAyjOQM4IAdBEGokACAADwsgAUGYjQJBAhDYBQwDCyABQZiNAkECENgFGSAHJAAgBhCMASAIEIwBIAAoApQBIgEEQCAAIAE2ApgBIAEQ7gELCQALGSAHJAAgCRC1AQkACwsZIAckACAKELUBCQALAAvUCgELfyMAQUBqIgIkACACQQA2AiwgAkIANwIkIAJBADYCICACQgA3AhggAkIANwMIIAJCADcDACACQYCAgPwDNgIQIABBADoAPCAAKAIEQcwBaiEJA0ACQAZAAn8gCSgCACIJRQRAIAAoAgRBjAJqIQkDQCAJKAIAIglFBEAgACgCQCIDBEAgACADNgJEIAMQ7gEgAEEANgJIIABCADcCQAsgACACKAIkNgJAIAIoAighAyAAIAs2AkggACADNgJEIAAoAkwiAwRAIAAgAzYCUCADEO4BIABBADYCVCAAQgA3AkwLIAAgAigCGDYCTCAAIAIoAhw2AlAgACACKAIgNgJUIAIoAggiAQRAA0AgASgCACABEO4BIgENAAsLIAIoAgAhACACQQA2AgAgAARAIAAQ7gELIAJBQGskAA8LIAIoAgQiBUUNACAJKAIIIQMCQCAFaUEBSyIERQRAIAVBAWsgA3EhBgwBCyADIgYgBUkNACADIAVwIQYLIAIoAgAgBkECdGooAgAiAUUNACABKAIAIgFFDQACQCAERQRAIAVBAWshBQNAAkAgAyABKAIEIgRHBEAgBCAFcSAGRw0FDAELIAEoAgggA0YNAwsgASgCACIBDQALDAILA0ACQCADIAEoAgQiBEcE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ACgChAEgACgCjAEgACgCDCICIApsampBACACENABGiAAKAKIASAAKAKMASAAKAIMIApsamogBCgCGDYCACAAKAKAASAAKAKMASAAKAIMIApsamogASAAKAKgARDOARoGQAJAIAkEQCAAKAIQIAlsQQFqIgIQ7QEhAyAKQQJ0IgYgACgCkAFqIAM2AgAgACgCkAEgBmooAgAiA0UEQAZABkBBCBDUBSEAGAsgAEG0CxC4BSEADAMZIAQkAAZAIAAQ1QUYCwkACwALIANBACACENABGgsGQAJAAkACQCAFQX9HBEACQCAHIAlMDQAGQCABIAAoAoABIAAoAowBIAAoAgwgBWxqaiAAKAKoASAAKAKkARELACETGAcgByECA0AgAiAJTA0BIAJBAWshAkEBIQYDQCAGQQFxRQ0BIAAoAmwaIAAoApABIAVBAnRqKAIAIAAoAhAgAmxqIgNBBGohCyADLwEAIQxBACEGQQAhAwNAIAMgDE8NASALIANBAnRqKAIAIgggACgCBEsEQAZABkBBCBDUBSEAGBMgAEGqFRC4BSEADAkZIAQkAAZAIAAQ1QUYEwkACwALIAggBSABIAAoAoABIAAoAowBIAAoAgwgCGxqaiAAKAKoASAAKAKkARELACIUIBNdIggbIQUgFCATIAgbIRMgA0EBaiEDIAYgCHIhBgwACwALAAsACyAJIAcgByAJShshCyAAKAKEASAAKAKMASAAKAIMIAQoAhxsamotAAJBAXEhEQNAIAtBAEgNAiAHIAtIBEAGQAZAQQgQ1AUhABgQIABBnhUQuAUhAAwFGSAEJAAGQCAAENUFGBAGQAkBGAkACwALBkAgBEEIaiAAIAUgASALEMIBGAcGQAJAIBFFDQAgBCABIAAoAoABIAAoAowBIAAoAgwgBCgCHGxqaiAAKAKoASAAKAKkARELADgCBCAEQQhqIARBBGogBEEcahDDASAEKAIMIg0gBCgCCCIGa0EDdSIOIAAoAiRNDQACQCAOQQJIDQAgDkECa0EBdiEMIAYoAgQhDyAGKgIAIRNBACECIAYhAwNAIAJBAXQiEkEBciEFIAMiCCACQQN0akEIaiEDAkAgDiASQQJqIgJMBEAgBSECDAELIAMqAgAgAyoCCF1FBEAgBSECDAELIANBCGohAwsgCCADKgIAOAIAIAggAygCBDYCBCAC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IANBBGohAwwACwAZIAQkACAOBEAgDhDuAQsJAAsACxkgBCQAIAQoAhgiAgRAA0AgAigCACACEO4BIgINAAsLIAQoAhAhACAEQQA2AhAgAARAIAAQ7gELIAQoAjAiAgRAA0AgAigCACACEO4BIgINAAsLIAQoAighACAEQQA2AiggAARAIAAQ7gELCQALIA4EQCAOEO4BCyAEKAIYIgIEQANAIAIoAgAgAhDuASICDQALCyAEKAIQIQIgBEEANgIQIAIEQCACEO4BCyAEKAIwIgIEQANAIAIoAgAgAhDuASICDQALCyAEKAIoIQIgBEEANgIoIAIEQCACEO4BCyALQQFqIQsMAAsACyAEQUBrJAALpi0CFH8EfSMAQRBrIgokACAAQQA2AgggAEIANwIABkAGQAJAAkAgASgCCEUNAAZAIAIgASgCgAEgASgCjAEgASgCeCIIIAEoAgxsamogASgCqAEgASgCpAERCwAhGRgDIAEoAkAhDANAIAxBAEoEQCAMQQFrIQxBASEHA0AgB0EBcUUNAiABKAKQASAIQQJ0aigCACABKAIQIAxsaiIFLwEAIQ0gASABKALkAUEBajYC5AEgASANIAEoAuABajYC4AEgBUEEaiEGQQAhB0EAIQUDQCAFIA1PDQEgBiAFQQJ0aigCACIPIAEoAgRLBEAGQAZAQQgQ1AUhARgKIAFBqhUQuAUhAQwHGSAKJAAGQCABENUFGAoGQAkBGAkACwALBkAgAiABKAKAASABKAKMASABKAIMIA9samogASgCqAEgASgCpAERCwAhGxgHIA8gCCAZIBteIg8bIQggGyAZIA8bIRkgBUEBaiEFIAcgD3IhBwwACwALAAsLAkAgASgCFARAQQAhDCACIQ8gASgCKCICIAMgAiADSxshEiAEIQ0jAEEgayIGJAAgBiAINgIcIAEoAkQQyAEiFC8BACETIBQoAgQhFSAKQQA2AgggCkIANwIAIAZBADYCFCAGQgA3AgwCQAJAAkAGQAJAAkAgASgCjAEiBCABKAIMIAhsIgJqIgUgASgChAFqLQACQQFxDQAgDQRAIA0gBSABKAKIAWooAAAgDSgCACgCABECAEUNASABKAKMASEEIAEoAgwgBigCHGwhAgsgBiAPIAEoAoABIAIgBGpqIAEoAqgBIAEoAqQBEQsAIhs4AgggCiAGQQhq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AWo2AhQgBigCDCICBEAgBiACNgIQIAIQ7gELIAZBIGokAAwBCwALDAELQQAhDCACIQ8gASgCKCICIAMgAiADSxshEiAEIQ0jAEEgayIJJAAgCSAIIgI2AhwgASgCRBDIASIULwEAIRMgFCgCBCEVIApBADYCCCAKQgA3AgAgCUEANgIUIAlCADcCDAJAAkACQAZAAkACQCAEBEAgBCABKAKIASABKAKMASABKAIMIAJsamooAAAgBCgCACgCABECAEUNASAJKAIcIQILIAkgDyABKAKAASABKAKMASABKAIMIAJsamogASgCqAEgASgCpAERCwAiGzgCCCAKIAlBCGogCUEcaiICEMMBIAkgCSoCCIw4AgQgCUEMaiAJQQRqIAIQwwEMAQsgCUH///97NgIIIAlBDGogCUEIaiAJQRxqEMMBQ///f38hGwsgFSAJKAIcQQF0aiATOwEAA0ACQCAJKAIMIgcgCSgCECIGRg0AIAcoAgQhCyAHKgIAIhmMIBteBEAgDUUNASAKKAIEIAooAgBrQQN1IBJGDQELAkAgBiAHa0EDdSIOQQJIDQAgDkECa0EBdiERQQAhBCAHIQIDQCAEQQF0IhBBAXIhBSACIgggBEEDdGpBCGohAgJAIA4gEEECaiIETARAIAUhBAwBCyACKgIAIAIqAghdRQRAIAUhBAwBCyACQQhqIQILIAggAioCADgCACAIIAIoAgQ2AgQgBCARTA0ACyAGQQhrIgQgAkYEQCACIAs2AgQgAiAZOAIADAELIAIgBCoCADgCACACIAZBBGsiBSgCADYCBCAEIBk4AgAgBSALNgIAIAIgB2tBCGpBA3UiBEECSA0AIAcgBEECa0EBdiIEQQN0aiIIKgIAIhkgAioCACIaXUUNACACKAIEIQUDQAJAIAIgGTgCACACIAgiAigCBDYCBCAERQ0AIAcgBEEBa0EBdiIEQQN0aiIIKgIAIhkgGl0NAQsLIAIgBTYCBCACIBo4AgALIAkgBkEIazYCECABKAKEASABKAKMASABKAIMIAtsamoiFi8BACERQQEhCCABIAEoAuQBQQFqNgLkASABIBEgASgC4AFqNgLgAQNAIAggEUsNAgJAIBUgFiAIQQJ0aigCACIHQQF0aiICLwEAIBNGDQAgAiATOwEAIA8gASgCgAEgASgCjAEgASgCDCAHbGpq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KAIkNgIkIAIgASgCKDYCKCACIAEoAiw2AiwgAiABKAIwNgIwIAIgASgCNDYCNCACIAEoAjg2AjggAiABKAI8NgI8IAFBQGshASACQUBrIgIgBU0NAAsLIAIgBE8NAQNAIAIgASgCADYCACABQQRqIQEgAkEEaiICIARJDQALDAELIANBBEkEQCAAIQIMAQsgACADQQRrIgRLBEAgACECDAELIAAhAgNAIAIgAS0AADoAACACIAEtAAE6AAEgAiABLQACOgACIAIgAS0AAzoAAyABQQRqIQEgAkEEaiICIARNDQALCyACIANJBEADQCACIAEtAAA6AAAgAUEBaiEBIAJBAWoiAiADRw0ACwsgAAvWAgECfwJAIAAgAUYNACABIAAgAmoiBGtBACACQQF0a00EQCAAIAEgAhDOARoPCyAAIAFzQQNxIQMCQAJAIAAgAUkEQCADDQIgAEEDcUUNAQNAIAJFDQQgACABLQAAOgAAIAFBAWohASACQQFrIQIgAEEBaiIAQQNxDQALDAELAkAgAw0AIARBA3EEQANAIAJFDQUgACACQQFrIgJqIgMgASACai0AADoAACADQQNxDQALCyACQQNNDQADQCAAIAJBBGsiAmogASACaigCADYCACACQQNLDQALCyACRQ0CA0AgACACQQFrIgJqIAEgAmotAAA6AAAgAg0ACwwCCyACQQNNDQADQCAAIAEoAgA2AgAgAUEEaiEBIABBBGohACACQQRrIgJBA0sNAAsLIAJFDQADQCAAIAEtAAA6AAAgAEEBaiEAIAFBAWohASACQQFrIgINAAsLC/ICAgJ/AX4CQCACRQ0AIAAgAToAACAAIAJqIgNBAWsgAToAACACQQNJDQAgACABOgACIAAgAToAASADQQNrIAE6AAAgA0ECayABOgAAIAJBB0kNACAAIAE6AAMgA0EEayABOgAAIAJBCUkNACAAQQAgAGtBA3EiBGoiAyABQf8BcUGBgoQIbCIBNgIAIAMgAiAEa0F8cSIEaiICQQRrIAE2AgAgBEEJSQ0AIAMgATYCCCADIAE2AgQgAkEIayABNgIAIAJBDGsgATYCACAEQRlJDQAgAyABNgIYIAMgATYCFCADIAE2AhAgAyABNgIMIAJBEGsgATYCACACQRRrIAE2AgAgAkEYayABNgIAIAJBHGsgATYCACAEIANB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IAJBfnE2AgQgACABQQFyNgIEIAAgAWogATYCAAwDC0EAIQMLIAZFDQACQCAFKAIcIgJBAnRBvPUCaiIEKAIAIAVGBEAgBCADNgIAIAMNAUGQ8wJBkPMCKAIAQX4gAndxNgIADAILIAZBEEEUIAYoAhAgBUYbaiADNgIAIANFDQELIAMgBjYCGCAFKAIQIgIEQCADIAI2AhAgAiADNgIYCyAFKAIUIgJFDQAgAyACNgIUIAIgAzYCGAsgACABQQFyNgIEIAAgAWogATYCACAAQaDzAigCAEcNAEGU8wIgATYCAA8LIAFB/wFNBEAgAUF4cUG08wJqIQICf0GM8wIoAgAiA0EBIAFBA3Z0IgFxRQRAQYzzAiABIANyNgIAIAIMAQsgAigCCAshASACIAA2AgggASAANgIMIAAgAjYCDCAAIAE2AggPC0EfIQMgAUH///8HTQRAIAFBJiABQQh2ZyICa3ZBAXEgAkEBdGtBPmohAwsgACADNgIcIABCADcCECADQQJ0Qbz1AmohAgJAAkBBkPMCKAIAIgRBASADdCIHcUUEQEGQ8wIgBCAHcjYCACACIAA2AgAgACACNgIYDAELIAFBGSADQQF2a0EAIANBH0cbdCEDIAIoAgAhAgNAIAIiBCgCBEF4cSABRg0CIANBHXYhAiADQQF0IQMgBCACQQRxaiIHQRBqKAIAIgINAAsgByAANgIQIAAgBDYCGAsgACAANgIMIAAgADYCCA8LIAQoAggiASAANgIMIAQgADYCCCAAQQA2AhggACAENgIMIAAgATYCCAsLUAEBfgJAIANBwABxBEAgASADQUBqrYYhAkIAIQEMAQsgA0UNACACIAOtIgSGIAFBwAAgA2utiIQhAiABIASGIQELIAAgATcDACAAIAI3AwgLUAEBfgJAIANBwABxBEAgAiADQUBqrYghAUIAIQIMAQsgA0UNACACQcAAIANrrYYgASADrSIEiIQhASACIASIIQILIAAgATcDACAAIAI3AwgL6wMCA34FfyMAQSBrIgYkACABQv///////z+DIQICfiABQjCIQv//AYMiA6ciBUGB+ABrQf0PTQRAIAJCBIYgAEI8iIQhAiAFQYD4AGutIQMCQCAAQv//////////D4MiAEKBgICAgICAgAhaBEAgAkIBfCECDAELIABCgICAgICAgIAIUg0A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aiQAC6IBAQR/IwAhBgZAIwBBEGsiBCQAIARBCGohBSMAQSBrIgMkACADQRhqIAEgASACQQJ0ahDHAiADQQxqIQIgA0EQaiADKAIYIAMoAhwgABDKAiADIAEgAygCECABa2o2AgwgAyAAIAMoAhQgAGtqNgIIIAUgAigCADYCACAFIAMoAgg2AgQgA0EgaiQAIAQoAgwaIARBEGokABkgBiQAEOAFAAsLEAAgABDRAiABENECc0EBcwsNACAAKAIAEKsCGiAACzEBAX8gACgCDCIBIAAoAhBGBEAgACAAKAIAKAIoEQEADwsgACABQQRqNgIMIAEoAgALVAECfwJAIAAoAgAiAkUNAAJ/IAIoAhgiAyACKAIcRgRAIAIgASACKAIAKAI0EQIADAELIAIgA0EEajYCGCADIAE2AgAgAQtBf0cNACAAQQA2AgALCwcAIAAoAgwLuAEBAn8jAEEQayICJAAgAC0AC0EHdgRAIAAoAggaIAAoAgAQzAILAn8gAS0AC0EHdgRAIAEoAgQMAQsgAS0ACwsaIAEtAAtBB3YhAyAAIAEoAgg2AgggACABKQIANwIAIAEgAS0AC0GAAXE6AAsgASABLQALQf8AcToACyACQQA6AA8gASACLQAPOgAAAkAgACABRiIBDQAgAw0ACyAALQALQQd2IQACQCABDQAgAA0ACyACQRBqJAALjAIBA38CQCMAQRBrIgQkACACIAFrIgVB9////wdNBEACQCAFQQtJBEAgACAALQALQYABcSAFQf8AcXI6AAsgACAALQALQf8AcToACyAAIQMMAQsgBEEIaiAFQQtPBH8gBUEIakF4cSIDIANBAWsiAyADQQtGGwVBCgtBAWoQzgIgBCgCDBogACAEKAIIIgM2AgAgACAAKAIIQYCAgIB4cSAEKAIMQf////8HcXI2AgggACAAKAIIQYCAgIB4cjYCCCAAIAU2AgQLA0AgASACRwRAIAMgAS0AADoAACADQQFqIQMgAUEBaiEBDAELCyAEQQA6AAcgAyAELQAHOgAAIARBEGokAAwBCxA1AAsL7AEBA38CQAJ/IAAtAAtBB3YEQCAAKAIEDAELIAAtAAtB/wBxCyICIAFJBEAjAEEQayIEJAAgASACayICBEAgAiAALQALQQd2BH8gACgCCEH/////B3FBAWsFQQoLIgMCfyAALQALQQd2BEAgACgCBAwBCyAALQALQf8AcQsiAWtLBEAgACADIAIgA2sgAWogASABEIkECyABAn8gAC0AC0EHdgRAIAAoAgAMAQsgAAsiA2ogAkEAELwFIAAgASACaiIAEIoEIARBADoADyAAIANqIAQtAA86AAALIARBEGokAAwBCyAAIAEQjAULC9YGAQV/AkACQCAAKAJADQACf0HdCiEDAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQCACQX1xIgRBAWsOHQEMDAwHDAwCBQwMCAsMDA0BDAwGBwwMAwUMDAkLAAsCQCAEQTBrDgUNDAwMBgALIARBOGsOBQMLCwsJCwtBsScMDAtBhRcMCwtBljkMCgtBjDkMCQtBmTkMCAtBjiYMBwtBoSYMBgtBkSYMBQtBqyYMBAtBpyYMAwtBryYMAgtBACEDCyADCyIERQ0AIAEhBUEAIQMjAEEQayIGJAACQAJAQbMmIAQiASwAABD5AUUEQEGI8wJBHDYCAAwBC0ECIQQgAUErEPkBRQRAIAEtAABB8gBHIQQLIARBgAFyIAQgAUH4ABD5ARsiBEGAgCByIAQgAUHlABD5ARsiBCAEQcAAciABLQAAIgRB8gBGGyIHQYAEciAHIARB9wBGGyIHQYAIciAHIARB4QBGGyEEIAZCtgM3AwBBnH8gBSAEQYCAAnIgBhAgIgRBgWBPBEBBiPMCQQAgBGs2AgBBfyEECyAEQQBIDQEjAEEgayIFJAACfwJAAkBBsyYgASwAABD5AUUEQEGI8wJBHDYCAAwBC0GYCRDtASIDDQELQQAMAQsgA0EAQZABENABGiABQSsQ+QFFBEAgA0EIQQQgAS0AAEHyAEYbNgIACwJAIAEtAABB4QBHBEAgAygCACEBDAELIARBA0EAECEiAUGACHFFBEAgBSABQYAIcqw3AxAgBEEEIAVBEGoQIRoLIAMgAygCAEGAAXIiATYCAAsgA0F/NgJQIANBgAg2AjAgAyAENgI8IAMgA0GYAWo2AiwCQCABQQhxDQAgBSAFQRhqrTcDACAEQZOoASAFECINACADQQo2AlALIANBiAE2AiggA0GEATYCJCADQYkBNgIgIANBigE2AgxBtekCLQAARQRAIANBfzYCTAsgA0H06gIoAgAiATYCOCABBEAgASADNgI0C0H06gIgAzYCACADCyEDIAVBIGokACADDQEgBBAkGgtBACEDCyAGQRBqJAAgACADNgJAIANFDQAgACACNgJYIAJBAnFFDQEgA0IAQQIQ/gFFDQEgACgCQBCAAhogAEEANgJAC0EADwsgAAvBAgEDfyMAQRBrIgIkACAAQYiPATYCACAAQQRqELEEIABCADcCGCAAQgA3AhAgAEIANwIIIABBADYCKCAAQgA3AiAgAEGokAE2AgAgAEE0akEAQS8Q0AEaIAJBDGoiAyAAKAIEIgE2AgAgAUG4+QJHBEAgASABKAIEQQFqNgIECyMAIQEGQCADKAIAQfj6AhCpBBCwBCEBGSABJAAQ4AUACyADELIEBkAgAQRAIAJBCGoiAyAAKAIEIgE2AgAgAUG4+QJHBEAgASABKAIEQQFqNgIECwZAIANB+PoCEI0DIQEZIAIkACACQQhqELIECQALIAAgATYCRCACQQhqELIEIAAgACgCRCIBIAEoAgAoAhwRAQA6AGILIABBAEGAICAAKAIAKAIMEQQAGhkgAiQAIAAQhQIaCQALIAJBEGokACAAC3ABAn8jACEBIABBqJABNgIABkAGQCAAELQCGgcAIAEkABDZBRoQ2gULGSABJAAQ4AUACwJAIAAtAGBBAUcNACAAKAIgIgFFDQAgARDuAQsCQCAALQBhQQFHDQAgACgCOCIBRQ0AIAEQ7gELIAAQhQILkQEBBH8jAEEQayICJAAgACgCQCIBBH8gAkGLATYCBCACQQhqIAEgAkEEahC1AiEBBkAgACAAKAIAKAIYEQEAIQQgASgCACABQQA2AgAQgAIhAyAAQQA2AkAgAEEAQQAgACgCACgCDBEEABoZIAIkACABELcCCQALIAEQtwJBACAAIAMgBHIbBUEACyACQRBqJAALNAEBfyMAQRBrIgMkACADIAE2AgwgACADKAIMNgIAIABBBGogAigCADYCACADQRBqJAAgAAsNACAAELMCGiAAEO4BCzUBAn8gACgCACEBIABBADYCACABBEAjACECBkAgASAAQQRqKAIAEQEAGhkgAiQAEOAFAAsLC+IGAQd/IwBBEGsiBCQAAkACQCAAKAJARQRAQX8hBQwBCyAAKAJcQQhxIgVFBEAgAEEANgIcIABBADYCFCAAQQA2AhgCQCAALQBiQQFGBEAgACAAKAIgIgEgACgCNGoiAjYCECAAIAI2AgwgACABNgIIDAELIAAgACgCOCIBIAAoAjxqIgI2AhAgACACNgIMIAAgATYCCAsgAEEINgJcCyAAKAIMRQRAIAAgBEEQaiIBNgIQIAAgATYCDCAAIARBD2o2AggLIAUEQCAAKAIQIQMgACgCCCEFIARBBDYCBCAEIAMgBWtBAm02AggjAEEQayIDJAAgBEEEaiIFKAIAIARBCGoiASgCAEkhAiADQRBqJAAgBSABIAIbKAIAIQMLQX8hBQJAIAAoAhAiASAAKAIMRgRAIAAoAgggASADayADEM8BIAAtAGJBAUYEQCADIAAoAghqIAAoAhAgACgCCCADamsgACgCQBCCAiIBRQ0CIAAoAgghBSADIAAoAghqIQIgACADIAAoAghqIAFqNgIQIAAgAjYCDCAAIAU2AgggACgCDC0AACEFDAILAn8gACgCKCIBIAAoAiQiAkYEQCABDAELIAAoAiAgAiABIAJrEM8BIAAoAiQhASAAKAIoCyEGIAAgACgCICICIAYgAWtqIgE2AiQgACACQQggACgCNCACIABBLGpGG2oiAjYCKCAEIAAoAjwgA2s2AgggBCACIAFrNgIEIwBBEGsiASQAIARBBGoiAigCACAEQQhqIgYoAgBJIQcgAUEQaiQAIAIgBiAHGygCACEBIAAgACkCSDcCUCAAKAIkIAEgACgCQBCCAiICRQ0BIAAoAkQiAUUNAyAAIAAoAiQgAmoiAjYCKAJAIAEgAEHIAGogACgCICACIABBJGogAyAAKAIIIgJqIAAoAjwgAmogBiABKAIAKAIQEQ4AQQNGBEAgACgCICEDIAAgACgCKDYCECAAIAM2AgwgACADNgIIDAELIAQoAggiASADIAAoAggiAmoiA0YNAiAAIAE2AhAgACADNgIMIAAgAjYCCAsgACgCDC0AACEFDAELIAAoAgwtAAAhBQsgACgCCCAEQQ9qRw0AIABBADYCECAAQQA2AgwgAEEANgIICyAEQRBqJAAgBQ8LELkCAAsoAQF/QQQQ1AUiAEG8igI2AgAgAEHgjQI2AgAgAEGQjgJBjAEQ2AUAC3gBAX8CQCAAKAJARQ0AIAAoAgwiAiAAKAIITQ0AIAFBf0YEQCAAIAJBAWs2AgwgAUEAIAFBf0cbDwsgAC0AWEEQcUUEQCAAKAIMQQFrLQAAIAFB/wFxRw0BCyAAIAAoAgxBAWs2AgwgACgCDCABwDoAACABDwtBfwvmBAEGfyMAQRBrIgMkAAJ/AkAgACgCQEUNACAALQBcQRBxRQRAIABBADYCECAAQQA2AgwgAEEANgIIAkAgACgCNCIFQQlPBEAgAC0AYkEBRgRAIAAgACgCICICIAVqQQFrNgIcIAAgAjYCFCAAIAI2AhgMAgsgACAAKAI4IgIgACgCPGpBAWs2AhwgACACNgIUIAAgAjYCGAwBCyAAQQA2AhwgAEEANgIUIABBADYCGAsgAEEQNgJcCyAAKAIUIQUgACgCHCEHIAFBf0cEQCAAKAIYRQRAIAAgA0EQajYCHCAAIANBD2oiAjYCFCAAIAI2AhgLIAAoAhggAcA6AAAgACAAKAIYQQFqNgIYCyAAKAIYIgYgACgCFCICRwRAAkAgAC0AYkEBRgRAIAJBASAGIAJrIgIgACgCQBDaASACRw0DDAELIAMgACgCIDYCCCAAQcgAaiEGA0AgACgCRCICBEAgAiAGIAAoAhQgACgCGCADQQRqIAAoAiAiBCAEIAAoAjRqIANBCGogAigCACgCDBEOACECIAAoAhQgAygCBEYNBCACQQNGBEAgACgCFEEBIAAoAhggACgCFGsiAiAAKAJAENoBIAJHDQUMAwsgAkEBSw0EIAAoAiAiBEEBIAMoAgggBGsiBCAAKAJAENoBIARHDQQgAkEBRw0CIAMoAgQhAiAAIAAoAhg2AhwgACACNgIUIAAgAjYCGCAAIAAoAhggACgCHCAAKAIUa2o2AhgMAQsLELkCAAsgACAHNgIcIAAgBTYCFCAAIAU2AhgLIAFBACABQX9HGwwBC0F/CyADQRBqJAAL/wIBBH8jAEEQayIEJAAgBCACNgIMIABBADYCECAAQQA2AgwgAEEANgIIIABBADYCHCAAQQA2AhQgAEEANgIYAkAgAC0AYEEBRw0AIAAoAiAiA0UNACADEO4BCwJAIAAtAGFBAUcNACAAKAI4IgNFDQAgAxDuAQsgACACNgI0AkACQAJAAkAgAkEJTwRAIAAtAGIhAyABRQ0BIANBAXEiBUUNASAAQQA6AGAgACABNgIgIAVFDQMMAgsgAEEAOgBgIABBCDYCNCAAIABBLGo2AiAgAC0AYkEBcQ0BDAILIAIQnAUhAiAAQQE6AGAgACACNgIgIANBAXFFDQELQQAhASAAQQA2AjxBACECDAELIARBCDYCCCMAQRBrIgIkACAEQQxqIgMoAgAgBEEIaiIFKAIASCEGIAJBEGokACAAIAUgAyAGGygCACIDNgI8IAEEQEEAIQIgA0EISw0BC0EBIQIgAxCcBSEBCyAAIAI6AGEgACABNgI4IARBEGokACAAC/sBAQF/IwBBEGsiBCQAIAEoAkQiBQRAIAUgBSgCACgCGBEBACEFAkACQAJAIAEoAkBFDQAgBUEATCACQgBScQ0AIAEgASgCACgCGBEBAEUNAQsgAEJ/NwMIIABCADcDAAwBCyADQQNPBEAgAEJ/NwMIIABCADcDAAwBCyABKAJAIAWtIAJ+QgAgBUEAShsgAxD+AQRAIABCfzcDCCAAQgA3AwAMAQsgAAJ+IAEoAkAiAygCTEEASARAIAMQgwIMAQsgAxCDAgs3AwggAEIANwMAIAQgASkCSCICNwMAIAQgAjcDCCAAIAQpAgA3AwALIARBEGokAA8LELkCAAuKAQAjAEEQayIDJAACQAJAIAEoAkAEQCABIAEoAgAoAhgRAQBFDQELIABCfzcDCCAAQgA3AwAMAQsgASgCQCACKQMIQQAQ/gEEQCAAQn83AwggAEIANwMADAELIAMgAikDADcCCCABIAMpAwg3AkggACACKQMINwMIIAAgAikDADcDAAsgA0EQaiQAC/QDAgR/AX4jAEEQayIDJAACQCAAKAJARQ0AAkAgACgCRCIEBEAgACgCXCICQRBxBEAgACgCGCAAKAIURwRAQX8hASAAQX8gACgCACgCNBECAEF/Rg0ECyAAQcgAaiEBA0AgACgCRCIEIAEgACgCICICIAIgACgCNGogA0EMaiAEKAIAKAIUEQkAIQQgACgCICICQQEgAygCDCACayICIAAoAkAQ2gEgAkcNAwJAIARBAWsOAgEEAAsLQQAhASAAKAJAEP8BRQ0DDAILIAJBCHFFDQIgAyAAKQJQNwMAAn8CQAJAIAAtAGJBAUYEQCAAKAIQIAAoAgxrrCEFDAELIAQgBCgCACgCGBEBACEBIAAoAiggACgCJGusIQUgAUEASgRAIAAoAhAgACgCDGsgAWysIAV8IQUMAQsgACgCDCAAKAIQRw0BC0EADAELIAAoAkQiASADIAAoAiAgACgCJCAAKAIMIAAoAghrIAEoAgAoAiARCQAhASAAKAIkIAEgACgCIGprrCAFfCEFQQELIAAoAkBCACAFfUEBEP4BDQEEQCAAIAMpAwA3AkgLIAAgACgCICIBNgIoIAAgATYCJEEAIQEgAEEANgIQIABBADYCDCAAQQA2AgggAEEANgJcDAILELkCAAtBfyEBCyADQRBqJAAgAQu2AgEBfyAAIAAoAgAoAhgRAQAaIAAgAUH4+gIQjQMiATYCRCAALQBiIQIgACABIAEoAgAoAhwRAQAiAToAYiABIAJHBEAgAEEANgIQIABBADYCDCAAQQA2AgggAEEANgIcIABBADYCFCAAQQA2AhggAC0AYCEBIAAtAGJBAUYEQAJAIAFBAXFFDQAgACgCICIBRQ0AIAEQ7gELIAAgAC0AYToAYCAAIAAoAjw2AjQgACgCOCEBIABCADcCOCAAIAE2AiAgAEEAOgBhDwsCQCABQQFxDQAgACgCICIBIABBLGpGDQAgAEEAOgBhIAAgATYCOCAAIAAoAjQiATYCPCABEJwFIQEgAEEBOgBgIAAgATYCIA8LIAAgACgCNCIBNgI8IAEQnAUhASAAQQE6AGEgACABNgI4CwsKACAAELEBEO4BCxMAIAAgACgCAEEMaygCAGoQsQELEwAgACAAKAIAQQxrKAIAahDBAgsKACAAEKwBEO4BCxMAIAAgACgCAEEMaygCAGoQrAELEwAgACAAKAIAQQxrKAIAahDEAgs2AQF/IwBBEGsiAyQAIAMgATYCDCADIAI2AgggACADKAIMNgIAIAAgAygCCDYCBCADQRBqJAALRwEBfyMAQRBrIgQkACAEIAI2AgwgAyABIAIgAWsiARDJAiAEIAEgA2o2AgggACAEKAIMNgIAIAAgBCgCCDYCBCAEQRBqJAALEAAgAgRAIAAgASACEM8BCwtLAQF/IwBBEGsiBCQAIAQgAjYCDCADIAEgAiABayIBQQJ1EMsCGiAEIAEgA2o2AgggACAEKAIMNgIAIAAgBCgCCDYCBCAEQRBqJAALFQAgAgRAIAAgASACQQJ0EM8BCyAACxsBAX8jACEBBkAgAEEBEM0CGSABJAAQ4AUACwslACABQQhLBEAjACEBBkAgABDuARkgASQAEOAFAAsPCyAAEO4BCxsBAX8gAUEBEM8CIQIgACABNgIEIAAgAjYCAAtZAQJ/IAFBCEsEQEEEIAEgAUEETRshAUEBIAAgAEEBTRshAgNAAkAgASACEJ4FIgANAEGQhwMoAgAiA0UNACADEQwADAELCyAARQRAEJ0FCyAADwsgABCcBQtLAQJ/IAAoAgAiAQRAAn8gASgCDCICIAEoAhBGBEAgASABKAIAKAIkEQEADAELIAItAAALQX9HBEAgACgCAEUPCyAAQQA2AgALQQELSwECfyAAKAIAIgEEQAJ/IAEoAgwiAiABKAIQRgRAIAEgASgCACgCJBEBAAwBCyACKAIAC0F/RwRAIAAoAgBFDwsgAEEANgIAC0EBCxAAIAAgATYCBCAAIAI2AgALRgECfyMAQRBrIgMkACADQQhqIgQgACABIAAoAgAoAgwRBQAgBCgCBCACKAIERgR/IAQoAgAgAigCAEYFQQALIANBEGokAAsYACABKAIEIABGBH8gAiABKAIARgVBAAsLBQBB6hoLGgAgAkEBRwRAIAAgAhDMBQ8LIABB6hQQNBoLBwAgABD+BQsNACAAEP4FGiAAEO4BCyEAIAAgACgCGEUgAXIiATYCECAAKAIUIAFxBEAQ3AIACwuDAQEDfyMAIQIgAEG8lgE2AgAGQAJAIAAoAighAQNAIAFFDQFBACAAIAFBAWsiAUECdCIDIAAoAiRqKAIAIAAoAiAgA2ooAgARBQAMAAsACxkgAiQAEOAFAAsgAEEcahCyBCAAKAIgEO4BIAAoAiQQ7gEgACgCMBDuASAAKAI8EO4BIAALDQAgABDaAhogABDuAQu1AQIEfwF+IwBBEGsiASQAQQEhAwZABkBBEBDUBSECGAEjAEEQayIAJABB/PYCLQAARQRAQfz2AkEBOgAACyAAQajgAjYCDCAAQQE2AgggASAAKQMINwIIIABBEGokACMAQRBrIgAkACAAIAEpAggiBDcDACAAIAQ3AwggAiAAQfMWENMFQaiWATYCACAAQRBqJABBACEDIAJB/JYBQbUBENgFGSABJAAgAwRAIAIQ1QULCQALAAtAACAAQQA2AhQgACABNgIYIABBADYCDCAAQoKggIDgADcCBCAAIAFFNgIQIABBIGpBAEEoENABGiAAQRxqELEECx4AIAAgACgCEEEBcjYCECAALQAUQQFxBEAQ2wUACwtHAQJ/IAAgATcDcCAAIAAoAiwgACgCBCIDa6w3A3ggACgCCCECAkAgAVANACACIANrrCABVw0AIAMgAadqIQILIAAgAjYCaAuMAgIDfwJ+AkAgACkDcCIEQgBSIAQgACkDeCAAKAIEIgEgACgCLCICa6x8IgVXcUUEQCMAQRBrIgIkAEF/IQECQCAAEIECDQAgACACQQ9qQQEgACgCIBEEAEEBRw0AIAItAA8hAQsgAkEQaiQAIAEiA0EATg0BIAAoAgQhASAAKAIsIQILIABCfzcDcCAAIAE2AmggACAFIAIgAWusfDcDeEF/DwsgBUIBfCEFIAAoAgQhASAAKAIIIQICQCAAKQNwIgRQDQAgBCAFfSIEIAIgAWusWQ0AIAEgBKdqIQILIAAgAjYCaCAAIAUgACgCLCIAIAFrrHw3A3ggACABTwRAIAFBAWsgAzoAAAsgAwt/AgJ/AX4jAEEQayIDJAAgAAJ+IAFFBEBCAAwBCyADIAEgAUEfdSICcyACayICrUIAIAJnIgJB0QBqEPEBIAMpAwhCgICAgICAwACFQZ6AASACa61CMIZ8IAFBgICAgHhxrUIghoQhBCADKQMACzcDACAAIAQ3AwggA0EQaiQAC8EKAgV/D34jAEHgAGsiBSQAIARC////////P4MhDCACIASFQoCAgICAgICAgH+DIQogAkL///////8/gyINQiCIIQ4gBEIwiKdB//8BcSEHAkACQCACQjCIp0H//wFxIglB//8Ba0GCgH5PBEAgB0H//wFrQYGAfksNAQsgAVAgAkL///////////8AgyILQoCAgICAgMD//wBUIAtCgICAgICAwP//AFEbRQRAIAJCgICAgICAIIQhCgwCCyADUCAEQv///////////wCDIgJCgICAgICAwP//AFQgAkKAgICAgIDA//8AURtFBEAgBEKAgICAgIAghCEKIAMhAQwCCyABIAtCgICAgICAwP//AIWEUARAIAIgA4RQBEBCgICAgICA4P//ACEKQgAhAQwDCyAKQoCAgICAgMD//wCEIQpCACEBDAILIAMgAkKAgICAgIDA//8AhYRQBEAgASALhEIAIQFQBEBCgICAgICA4P//ACEKDAMLIApCgICAgICAwP//AIQhCgwCCyABIAuEUARAQgAhAQwCCyACIAOEUARAQgAhAQwCCyALQv///////z9YBEAgBUHQAGogASANIAEgDSANUCIGG3kgBkEGdK18pyIGQQ9rEPEBQRAgBmshBiAFKQNYIg1CIIghDiAFKQNQIQELIAJC////////P1YNACAFQUBrIAMgDCADIAwgDFAiCBt5IAhBBnStfKciCEEPaxDxASAGIAhrQRBqIQYgBSkDSCEMIAUpA0AhAwsgA0IPhiILQoCA/v8PgyICIAFCIIgiBH4iECALQiCIIhMgAUL/////D4MiAX58Ig9CIIYiESABIAJ+fCILIBFUrSACIA1C/////w+DIg1+IhUgBCATfnwiESAMQg+GIhIgA0IxiIRC/////w+DIgMgAX58IhQgDyAQVK1CIIYgD0IgiIR8Ig8gAiAOQoCABIQiDH4iFiANIBN+fCIOIBJCIIhCgICAgAiEIgIgAX58IhAgAyAEfnwiEkIghnwiF3whASAHIAlqIAZqQf//AGshBgJAIAIgBH4iGCAMIBN+fCIEIBhUrSAEIAQgAyANfnwiBFatfCACIAx+fCAEIAQgESAVVK0gESAUVq18fCIEVq18IAMgDH4iAyACIA1+fCICIANUrUIghiACQiCIhHwgBCACQiCGfCICIARUrXwgAiACIBAgElatIA4gFlStIA4gEFatfHxCIIYgEkIgiIR8IgJWrXwgAiACIA8gFFStIA8gF1atfHwiAlatfCIEQoCAgICAgMAAg0IAUgRAIAZBAWohBgwBCyALQj+IIARCAYYgAkI/iIQhBCACQgGGIAFCP4iEIQIgC0IBhiELIAFCAYaEIQELIAZB//8BTgRAIApCgICAgICAwP//AIQhCkIAIQEMAQsCfiAGQQBMBEBBASAGayIHQf8ATQRAIAVBMGogCyABIAZB/wBqIgYQ8QEgBUEgaiACIAQgBhDxASAFQRBqIAsgASAHEPIBIAUgAiAEIAcQ8gEgBSkDMCAFKQM4hEIAUq0gBSkDICAFKQMQhIQhCyAFKQMoIAUpAxiEIQEgBSkDACECIAUpAwgMAgtCACEBDAILIARC////////P4MgBq1CMIaECyAKhCEKIAtQIAFCAFkgAUKAgICAgICAgIB/URtFBEAgCiACQgF8IgFQrXwhCgwBCyALIAFCgICAgICAgICAf4WEQgBSBEAgAiEBDAELIAogAiACQgGDfCIBIAJUrXwhCgsgACABNwMAIAAgCjcDCCAFQeAAaiQAC88JAgR/BH4jAEHwAGsiBiQAIARC////////////AIMhCQJAAkAgAVAiBSACQv///////////wCDIgpCgICAgICAwP//AH1CgICAgICAwICAf1QgClAbRQRAIANCAFIgCUKAgICAgIDA//8AfSILQoCAgICAgMCAgH9WIAtCgICAgICAwICAf1EbDQELIAUgCkKAgICAgIDA//8AVCAKQoCAgICAgMD//wBRG0UEQCACQoCAgICAgCCEIQQgASEDDAILIANQIAlCgICAgICAwP//AFQgCUKAgICAgIDA//8AURtFBEAgBEKAgICAgIAghCEEDAILIAEgCkKAgICAgIDA//8AhYRQBEBCgICAgICA4P//ACACIAEgA4UgAiAEhUKAgICAgICAgIB/hYRQIgUbIQRCACABIAUbIQMMAgsgAyAJQoCAgICAgMD//wCFhFANASABIAqEUARAIAMgCYRCAFINAiABIAODIQMgAiAEgyEEDAILIAMgCYRCAFINACABIQMgAiEEDAELIAMgASABIANUIAkgClYgCSAKURsiCBshCiAEIAIgCBsiDEL///////8/gyEJIAIgBCAIGyILQjCIp0H//wFxIQcgDEIwiKdB//8BcSIFRQRAIAZB4ABqIAogCSAKIAkgCVAiBRt5IAVBBnStfKciBUEPaxDxASAGKQNoIQkgBikDYCEKQRAgBWshBQsgASADIAgbIQMgC0L///////8/gyEBIAcEfiABBSAGQdAAaiADIAEgAyABIAFQIgcbeSAHQQZ0rXynIgdBD2sQ8QFBECAHayEHIAYpA1AhAyAGKQNYC0IDhiADQj2IhEKAgICAgICABIQhASAJQgOGIApCPYiEIAIgBIUhBAJ+IANCA4YiAiAFIAdGDQAaIAUgB2siB0H/AEsEQEIAIQFCAQwBCyAGQUBrIAIgAUGAASAHaxDxASAGQTBqIAIgASAHEPIBIAYpAzghASAGKQMwIAYpA0AgBikDSIRCAFKthAshCUKAgICAgICABIQhCyAKQgOGIQoCQCAEQgBTBEBCACEDQgAhBCAJIAqFIAEgC4WEUA0CIAogCX0hAiALIAF9IAkgClatfSIEQv////////8DVg0BIAZBIGogAiAEIAIgBCAEUCIHG3kgB0EGdK18p0EMayIHEPEBIAUgB2shBSAGKQMoIQQgBikDICECDAELIAkgCnwiAiAJVK0gASALfHwiBEKAgICAgICACINQDQAgCUIBgyAEQj+GIAJCAYiEhCECIAVBAWohBSAEQgGIIQQLIAxCgICAgICAgICAf4MhAyAFQf//AU4EQCADQoCAgICAgMD//wCEIQRCACEDDAELQQAhBwJAIAVBAEoEQCAFIQcMAQsgBkEQaiACIAQgBUH/AGoQ8QEgBiACIARBASAFaxDyASAGKQMAIAYpAxAgBikDGIRCAFKthCECIAYpAwghBAsgBEI9hiACQgOIhCEBIARCA4hC////////P4MgB61CMIaEIAOEIQQCQAJAIAKnQQdxIgVBBEcEQCAEIAEgASAFQQRLrXwiA1atfCEEDAELIAQgASABIAFCAYN8IgNWrXwhBAwBCyAFRQ0BCwsgACADNwMAIAAgBDcDCCAGQfAAaiQAC+QBAgR+An8jAEEQayIGJAAgAb0iBUL/////////B4MhAiAAAn4gBUI0iEL/D4MiA0IAUgRAIANC/w9SBEAgAkIEiCEEIANCgPgAfCEDIAJCPIYMAgsgAkIEiCEEQv//ASEDIAJCPIYMAQsgAlAEQEIAIQNCAAwBCyAGIAJCACAFp2dBIGogAkIgiKdnIAJCgICAgBBUGyIHQTFqEPEBQYz4ACAHa60hAyAGKQMIQoCAgICAgMAAhSEEIAYpAwALNwMAIAAgBUKAgICAgICAgIB/gyADQjCGhCAEhDcDCCAGQRBqJAAL2wECAX8CfkEBIQQCQCAAQgBSIAFC////////////AIMiBUKAgICAgIDA//8AViAFQoCAgICAgMD//wBRGw0AIAJCAFIgA0L///////////8AgyIGQoCAgICAgMD//wBWIAZCgICAgICAwP//AFEbDQAgACAChCAFIAaEhFAEQEEADwsgASADg0IAWQRAQX8hBCAAIAJUIAEgA1MgASADURsNASAAIAKFIAEgA4WEQgBSDwtBfyEEIAAgAlYgASADVSABIANRGw0AIAAgAoUgASADhYRCAFIhBAsgBAvAAQIBfwJ+QX8hAwJAIABCAFIgAUL///////////8AgyIEQoCAgICAgMD//wBWIARCgICAgICAwP//AFEbDQAgAkL///////////8AgyIFQoCAgICAgMD//wBWIAVCgICAgICAwP//AFJxDQAgACAEIAWEhFAEQEEADwsgASACg0IAWQRAIAEgAlIgASACU3ENASAAIAEgAoWEQgBSDwsgAEIAUiABIAJVIAEgAlEbDQAgACABIAKFhEIAUiEDCyADC6kBAQF8RAAAAAAAAPA/IQECQCAAQYAITgRARAAAAAAAAOB/IQEgAEH/D0kEQCAAQf8HayEADAILRAAAAAAAAPB/IQFB/RcgACAAQf0XTxtB/g9rIQAMAQsgAEGBeEoNAEQAAAAAAABgAyEBIABBuHBLBEAgAEHJB2ohAAwBC0QAAAAAAAAAACEBQfBoIAAgAEHwaE0bQZIPaiEACyABIABB/wdqrUI0hr+iCzwAIAAgATcDACAAIAJC////////P4MgAkKAgICAgIDA//8Ag0IwiKcgA0IwiKdBgIACcXKtQjCGhDcDCAtnAgF/AX4jAEEQayICJAAgAAJ+IAFFBEBCAAwBCyACIAGtQgBB8AAgAWciAUEfc2sQ8QEgAikDCEKAgICAgIDAAIVBnoABIAFrrUIwhnwhAyACKQMACzcDACAAIAM3AwggAkEQaiQAC0UBAX8jAEEQayIFJAAgBSABIAIgAyAEQoCAgICAgICAgH+FEOMCIAUpAwAhASAAIAUpAwg3AwggACABNwMAIAVBEGokAAvEAgEBfyMAQdAAayIEJAACQCADQYCAAU4EQCAEQSBqIAEgAkIAQoCAgICAgID//wAQ4gIgBCkDKCECIAQpAyAhASADQf//AUkEQCADQf//AGshAwwCCyAEQRBqIAEgAkIAQoCAgICAgID//wAQ4gJB/f8CIAMgA0H9/wJPG0H+/wFrIQMgBCkDGCECIAQpAxAhAQwBCyADQYGAf0oNACAEQUBrIAEgAkIAQoCAgICAgIA5EOICIAQpA0ghAiAEKQNAIQEgA0H0gH5LBEAgA0GN/wBqIQMMAQsgBEEwaiABIAJCAEKAgICAgICAORDiAkHogX0gAyADQeiBfU0bQZr+AWohAyAEKQM4IQIgBCkDMCEBCyAEIAEgAkIAIANB//8Aaq1CMIYQ4gIgACAEKQMINwMIIAAgBCkDADcDACAEQdAAaiQAC3UBAX4gACABIAR+IAIgA358IANCIIgiAiABQiCIIgR+fCADQv////8PgyIDIAFC/////w+DIgF+IgVCIIggAyAEfnwiA0IgiHwgASACfiADQv////8Pg3wiAUIgiHw3AwggACAFQv////8PgyABQiCGhDcDAAu+DwIFfw9+IwBB0AJrIgUkACAEQv///////z+DIQogAkL///////8/gyELIAIgBIVCgICAgICAgICAf4MhDCAEQjCIp0H//wFxIQgCQAJAIAJCMIinQf//AXEiCUH//wFrQYKAfk8EQCAIQf//AWtBgYB+Sw0BCyABUCACQv///////////wCDIg1CgICAgICAwP//AFQgDUKAgICAgIDA//8AURtFBEAgAkKAgICAgIAghCEMDAILIANQIARC////////////AIMiAkKAgICAgIDA//8AVCACQoCAgICAgMD//wBRG0UEQCAEQoCAgICAgCCEIQwgAyEBDAILIAEgDUKAgICAgIDA//8AhYRQBEAgAyACQoCAgICAgMD//wCFhFAEQEIAIQFCgICAgICA4P//ACEMDAMLIAxCgICAgICAwP//AIQhDEIAIQEMAgsgAyACQoCAgICAgMD//wCFhFAEQEIAIQEMAgsgASANhFAEQEKAgICAgIDg//8AIAwgAiADhFAbIQxCACEBDAILIAIgA4RQBEAgDEKAgICAgIDA//8AhCEMQgAhAQwCCyANQv///////z9YBEAgBUHAAmogASALIAEgCyALUCIGG3kgBkEGdK18pyIGQQ9rEPEBQRAgBmshBiAFKQPIAiELIAUpA8ACIQELIAJC////////P1YNACAFQbACaiADIAogAyAKIApQIgcbeSAHQQZ0rXynIgdBD2sQ8QEgBiAHakEQayEGIAUpA7gCIQogBSkDsAIhAwsgBUGgAmogCkKAgICAgIDAAIQiEkIPhiADQjGIhCICQgBCgICAgLDmvIL1ACACfSIEQgAQ7AIgBUGQAmpCACAFKQOoAn1CACAEQgAQ7AIgBUGAAmogBSkDmAJCAYYgBSkDkAJCP4iEIgRCACACQgAQ7AIgBUHwAWogBEIAQgAgBSkDiAJ9QgAQ7AIgBUHgAWogBSkD+AFCAYYgBSkD8AFCP4iEIgRCACACQgAQ7AIgBUHQAWogBEIAQgAgBSkD6AF9QgAQ7AIgBUHAAWogBSkD2AFCAYYgBSkD0AFCP4iEIgRCACACQgAQ7AIgBUGwAWogBEIAQgAgBSkDyAF9QgAQ7AIgBUGgAWogAkIAIAUpA7gBQgGGIAUpA7ABQj+IhEIBfSICQgAQ7AIgBUGQAWogA0IPhkIAIAJCABDsAiAFQfAAaiACQgBCACAFKQOoASAFKQOgASINIAUpA5gBfCIEIA1UrXwgBEIBVq18fUIAEOwCIAVBgAFqQgEgBH1CACACQgAQ7AIgBiAJIAhraiEGAn8gBSkDcCITQgGGIg4gBSkDiAEiD0IBhiAFKQOAAUI/iIR8IhBC5+wAfSIUQiCIIgIgC0KAgICAgIDAAIQiFUIBhiIWQiCIIgR+IhEgAUIBhiINQiCIIgogECAUVq0gDiAQVq0gBSkDeEIBhiATQj+IhCAPQj+IfHx8QgF9IhNCIIgiEH58Ig4gEVStIA4gDiATQv////8PgyITIAFCP4giFyALQgGGhEL/////D4MiC358Ig5WrXwgBCAQfnwgBCATfiIRIAsgEH58Ig8gEVStQiCGIA9CIIiEfCAOIA4gD0IghnwiDlatfCAOIA4gFEL/////D4MiFCALfiIRIAIgCn58Ig8gEVStIA8gDyATIA1C/v///w+DIhF+fCIPVq18fCIOVq18IA4gBCAUfiIYIBAgEX58IgQgAiALfnwiCyAKIBN+fCIQQiCIIAsgEFatIAQgGFStIAQgC1atfHxCIIaEfCIEIA5UrXwgBCAPIAIgEX4iAiAKIBR+fCIKQiCIIAIgClatQiCGhHwiAiAPVK0gAiAQQiCGfCACVK18fCICIARUrXwiBEL/////////AFgEQCAWIBeEIRUgBUHQAGogAiAEIAMgEhDsAiABQjGGIAUpA1h9IAUpA1AiAUIAUq19IQpCACABfSELIAZB/v8AagwBCyAFQeAAaiAEQj+GIAJCAYiEIgIgBEIBiCIEIAMgEhDsAiABQjCGIAUpA2h9IAUpA2AiDUIAUq19IQpCACANfSELIAEhDSAGQf//AGoLIgZB//8BTgRAIAxCgICAgICAwP//AIQhDEIAIQEMAQsCfiAGQQBKBEAgCkIBhiALQj+IhCEBIARC////////P4MgBq1CMIaEIQogC0IBhgwBCyAGQY9/TARAQgAhAQwCCyAFQUBrIAIgBEEBIAZrEPIBIAVBMGogDSAVIAZB8ABqEPEBIAVBIGogAyASIAUpA0AiAiAFKQNIIgoQ7AIgBSkDOCAFKQMoQgGGIAUpAyAiAUI/iIR9IAUpAzAiBCABQgGGIg1UrX0hASAEIA19CyEEIAVBEGogAyASQgNCABDsAiAFIAMgEkIFQgAQ7AIgCiACIAIgAyAEIAJCAYMiBHwiA1QgASADIARUrXwiASASViABIBJRG618IgJWrXwiBCACIAIgBEKAgICAgIDA//8AVCADIAUpAxBWIAEgBSkDGCIEViABIARRG3GtfCICVq18IgQgAiAEQoCAgICAgMD//wBUIAMgBSkDAFYgASAFKQMIIgNWIAEgA1Ebca18IgEgAlStfCAMhCEMCyAAIAE3AwAgACAMNwMIIAVB0AJqJAALygYCBH8DfiMAQYABayIFJAACQAJAAkAgAyAEQgBCABDlAkUNAAJ/IARC////////P4MhCgJ/IARCMIinQf//AXEiB0H//wFHBEBBBCAHDQEaQQJBAyADIAqEUBsMAgsgAyAKhFALC0UNACACQjCIpyIIQf//AXEiBkH//wFHDQELIAVBEGogASACIAMgBBDiAiAFIAUpAxAiAiAFKQMYIgEgAiABEO0CIAUpAwghAiAFKQMAIQQMAQsgASACQv///////////wCDIgogAyAEQv///////////wCDIgkQ5QJBAEwEQCABIAogAyAJEOUCBEAgASEEDAILIAVB8ABqIAEgAkIAQgAQ4gIgBSkDeCECIAUpA3AhBAwBCyAEQjCIp0H//wFxIQcgBgR+IAEFIAVB4ABqIAEgCkIAQoCAgICAgMC7wAAQ4gIgBSkDaCIKQjCIp0H4AGshBiAFKQNgCyEEIAdFBEAgBUHQAGogAyAJQgBCgICAgICAwLvAABDiAiAFKQNYIglCMIinQfgAayEHIAUpA1AhAwsgCUL///////8/g0KAgICAgIDAAIQhCyAKQv///////z+DQoCAgICAgMAAhCEKIAYgB0oEQANAAn4gCiALfSADIARWrX0iCUIAWQRAIAkgBCADfSIEhFAEQCAFQSBqIAEgAkIAQgAQ4gIgBSkDKCECIAUpAyAhBAwFCyAJQgGGIARCP4iEDAELIApCAYYgBEI/iIQLIQogBEIBhiEEIAZBAWsiBiAHSg0ACyAHIQYLAkAgCiALfSADIARWrX0iCUIAUwRAIAohCQwBCyAJIAQgA30iBIRCAFINACAFQTBqIAEgAkIAQgAQ4gIgBSkDOCECIAUpAzAhBAwBCyAJQv///////z9YBEADQCAEQj+IIAZBAWshBiAEQgGGIQQgCUIBhoQiCUKAgICAgIDAAFQNAAsLIAhBgIACcSEHIAZB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ACQAIAAgAjYCyAIgACABNgLMAiADEJADIQYgAyAAQdABahCtAyEHIABBxAFqIAMgAEHEAmoQrgMGQCMAQRBrIgIkACAAQbgBaiIBQgA3AgAgAUEANgIIIAJBEGokACABIAEtAAtBB3YEfyABKAIIQf////8HcUEBawVBCgsQsAIgAAJ/IAEtAAtBB3YEQCABKAIADAELIAELIgI2ArQBIAAgAEEQajYCDCAAQQA2AggDQAJAIABBzAJqIABByAJqEKkCDQAgACgCtAECfyABLQALQQd2BEAgASgCBAwBCyABLQALQf8AcQsgAmpGBEACfyABLQALQQd2BEAgASgCBAwBCyABLQALQf8AcQshAyABAn8gAS0AC0EHdgRAIAEoAgQMAQsgAS0AC0H/AHELQQF0ELACIAEgAS0AC0EHdgR/IAEoAghB/////wdxQQFrBUEKCxCwAiAAIAMCfyABLQALQQd2BEAgASgCAAwBCyABCyICajYCtAELAn8gAEHMAmoiCCgCACIDKAIMIgkgAygCEEYEQCADIAMoAgAoAiQRAQAMAQsgCSgCAAsgBiACIABBtAFqIABBCGogACgCxAIgAEHEAWogAEEQaiAAQQxqIAcQrwMNACAIEKoCGgwBCwsCQAJ/IAAtAM8BQQd2BEAgACgCyAEMAQsgAC0AzwFB/wBxC0UNACAAKAIMIgMgAEEQamtBnwFKDQAgACADQQRqNgIMIAMgACgCCDYCAAsgBSACIAAoArQBIAQgBhCaAzYCACAAQcQBaiAAQRBqIAAoAgwgBBCUAyAAQcwCaiAAQcgCahCpAiECGSAAJAAgARC7BRogAEHEAWoQuwUaCQALIAIEQCAEIAQoAgBBAnI2AgALIAAoAswCIAEQuwUaIABBxAFqELsFGiAAQdACaiQAC70FAQR/IwBB0AJrIgAkACAAIAI2AsgCIAAgATYCzAIgAxCQAyEGIAMgAEHQAWoQrQMhByAAQcQBaiADIABBxAJqEK4DBkAjAEEQayICJAAgAEG4AWoiAUIANwIAIAFBADYCCCACQRBqJAAgASABLQALQQd2BH8gASgCCEH/////B3FBAWsFQQoLELACIAACfyABLQALQQd2BEAgASgCAAwBCyABCyICNgK0ASAAIABBEGo2AgwgAEEANgIIA0ACQCAAQcwCaiAAQcgCahCpAg0A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IgRLBEAgACADIARrEK8EDAELIAMgBEkEQCAAKAIEGiAAIAAoAgAgA0ECdGoQlQULCxkgBSQAIAEQrAQJAAsLIAAoAgAgAkECdGooAgAiAwRAIAMgAygCBEEBayIENgIEIARBf0YEQCADIAMoAgAoAggRAwALCyABKAIAIQMgAUEANgIAIAAoAgAgAkECdGogAzYCACABEKwEIAVBEGokAAtBAQJ/IAAoAgAiASgCAARAIAEQqAQgACgCABogACgCACIBKAIAIQIgASgCCBogASgCABogACgCAEEMaiACEJYFCws7AQF/IAAoAgAhASAAQQA2AgAgAQRAIAEgASgCBEEBayIANgIEIABBf0YEQCABIAEoAgAoAggRAwALCwt7AQR/IABBuLcBNgIAIABBCGohAgNAIAMgAigCBCACKAIAIgFrQQJ1SQRAIANBAnQgAWooAgAiAQRAIAEgASgCBEEBayIENgIEIARBf0YEQCABIAEoAgAoAggRAwALCyADQQFqIQMMAQsLIABBkAFqELsFGiACEKUEIAALDQAgABCtBBogABDuAQveBwELfyMAQSBrIgwkAAJAIAEgACgCCCAAKAIEa0ECdU0EQCAAIAEQpgQMAQsgAEEMaiELBkAGQCAMQQxqIQMCfyABIAAoAgQgACgCAGtBAnVqIQIjAEEQayIIJAAgCCACNgIMIAIgABCTBSIETQRAIAAoAgggACgCAGtBAnUiAiAEQQF2SQRAIAggAkEBdDYCCCMAQRBrIgQkACAIQQhqIgYoAgAgCEEMaiIFKAIASSECIARBEGokACAFIAYgAhsoAgAhBAsgCEEQaiQAIAQMAQsQOQALIQUgACgCBCAAKAIAa0ECdSECQQAhBCMAQRBrIgYkACAGQQA2AgwgA0EANgIMIAMgCzYCECAFBH8gBkEEaiADKAIQIAUQlAUgBigCBCEEIAYoAggFQQALIQUgAyAENgIAIAMgBCACQQJ0aiICNgIIIAMgAjYCBCADIAQgBUECdGo2AgwgBkEQaiQAGAIjAEEQayIGJAAgAygCCCEFIAZBBGoiAiADQQhqNgIIIAIgBTYCACACIAUgAUECdGo2AgQgAigCACEEA0ACQAJAIAIoAgQgBEcEQCADKAIQGiACKAIAQQA2AgAMAQsgAigCCCACKAIANgIAIAZBEGokAAwBCyACIAIo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ASgCACABQQJ0aigCAAUgAQsLPgADQCABIAJHBEAgASABKAIAIgBB/wBNBH9BqJ0BKAIAIABBAnRqKAIABSAACzYCACABQQRqIQEMAQsLIAILHgAgAUH/AE0Ef0GwqQEoAgAgAUECdGooAgAFIAELCz4AA0AgASACRwRAIAEgASgCACIAQf8ATQR/QbCpASgCACAAQQJ0aigCAAUgAAs2AgAgAUEEaiEBDAELCyACCyoAA0AgASACRkUEQCADIAEsAAA2AgAgA0EEaiEDIAFBAWohAQwBCwsgAgsOACABIAIgAUGAAUkbwAs1AANAIAEgAkZFBEAgBCABKAIAIgAgAyAAQYABSRs6AAAgBEEBaiEEIAFBBGohAQwBCwsgAgsrAQF/IABBzLcBNgIAAkAgACgCCCIBRQ0AIAAtAAxBAUcNACABEO4BCyAACw0AIAAQwQQaIAAQ7gELHgAgAUEATgR/QaidASgCACABQQJ0aigCAAUgAQvACz0AA0AgASACRwRAIAEgASwAACIAQQBOBH9BqJ0BKAIAIABBAnRqKAIABSAACzoAACABQQFqIQEMAQsLIAILHgAgAUEATgR/QbCpASgCACABQQJ0aigCAAUgAQvACz0AA0AgASACRwRAIAEgASwAACIAQQBOBH9BsKkBKAIAIABBAnRqKAIABSAACzoAACABQQFqIQEMAQsLIAILKgADQCABIAJGRQRAIAMgAS0AADoAACADQQFqIQMgAUEBaiEBDAELCyACCwwAIAIgASABQQBIGws0AANAIAEgAkZFBEAgBCADIAEsAAAiACAAQQBIGzoAACAEQQFqIQQgAUEBaiEBDAELCyACCxIAIAQgAjYCACAHIAU2AgBBAwsLACAEIAI2AgBBAwtUACMAQRBrIgAkACAAIAQ2AgwgACADIAJrNgIIIwBBEGsiASQAIABBCGoiAigCACAAQQxqIgMoAgBJIQQgAUEQaiQAIAIgAyAEGygCACAAQRBqJAALDQAgABCiBBogABDuAQuLBgEMfyMAQRBrIg8kACACIQgDQAJAIAMgCEYEQCADIQgMAQsgCCgCAEUNACAIQQRqIQgMAQsLIAcgBTYCACAEIAI2AgACQANAAkACQAJAIAIgA0YNACAFIAZGDQAgDyABKQIANwMIQQEhECAIIAJrQQJ1IREgBiAFayEKIAAoAggh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AjYCACAAQaiLAjYCAAZAIABBBGogARC1BRkgAiQACQALIAALRQEBfyMAIQIgAEG8igI2AgAgAEG8iwI2AgAGQCAAQQRqAn8gAS0AC0EHdgRAIAEoAgAMAQsgAQsQtQUZIAIkAAkACyAACzABAX8jACECIABBvIoCNgIAIABBvIsCNgIABkAgAEEEaiABELUFGSACJAAJAAsgAAs2AQJ/IwAhAgZABkBBCBDUBSEBGAEgASAAELgFGhkgAiQAIAEQ1QUJAAsgAUGYjQJBAhDYBQALgAMBBX8jAEEQayIIJAAgAiABQX9zQff///8Hak0EQAJ/IAAtAAtBB3YEQCAAKAIADAELIAALIQogCEEEaiIJIAFB8////wNJBH8gCCABQQF0NgIMIAggASACajYCBCMAQRBrIgIkACAJKAIAIAhBDGoiCygCAEkhDCACQRBqJAAgCyAJIAwbKAIAIgJBC08EfyACQQhqQXhxIgIgAkEBayICIAJBC0YbBUEKC0EBagVB9////wcLEM4CIAgoAgQhAiAIKAIIGiAEBEAgAiAKIAQQjAILIAYEQCACIARqIAcgBhCMAgsgAyAEIAVqIglrIQcgAyAJRwRAIAIgBGogBmogBCAKaiAFaiAHEIwCCyABQQpHBEAgChDMAgsgACACNgIAIAAgACgCCEGAgICAeHEgCCgCCEH/////B3FyNgIIIAAgACgCCEGAgICAeHI2AgggACAEIAZqIAdqIgA2AgQgCEEAOgAMIAAgAmogCC0ADDoAACAIQRBqJAAPCxA1AAsdACAALQALQQd2BEAgACgCCBogACgCABDMAgsgAAtEAQF/IwBBEGsiAyQAIAMgAjoADyADQQ9qIQIDQCABBEAgACACLQAAOgAAIAFBAWshASAAQQFqIQAMAQsLIANBEGokAAuLAQECfyAALQALQQd2BH8gACgCCEH/////B3FBAWsFQQoLIQMCfyAALQALQQd2BEAgACgCBAwBCyAALQALQf8AcQshBCACIANNBEACfyAALQALQQd2BEAgACgCAAwBCyAACyIDIAEgAhDJAiAAIAMgAhCNBQ8LIAAgAyACIANrIARBACAEIAIgARC6BQvCAQEDfyMAQRBrIgUkAAJAIAIgAC0AC0EHdgR/IAAoAghB/////wdxQQFrBUEKCyIEAn8gAC0AC0EHdgRAIAAo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AxAgASACQRBqEL0GGgsgAiACQSBqQcogEKMEKQIANwMIIAEgAkEIahC9BiEBIAAtAA1BAUYEQCACIAJBGGpB7ScQowQpAgA3AwAgASACEL0GGgsgAUEgEIwGIQEgACgCCCIAIAEgACgCACgCEBEAACAALwAFQcABcUHAAEcEQCAAIAEgACgCACgCFBEAAAsgAkEwaiQAC08BAX8gACgCCCICIAEgAigCACgCEBEAACACLwAFQcABcUHAAEcEQCACIAEgAigCACgCFBEAAAsgAUEoEOcGIABBDGogARDvBiABQSkQ6QYLXQEBfyABQSgQ5wYgACgCCCICIAEgAigCACgCEBEAACACLwAFQcABcUHAAEcEQCACIAEgAigCACgCFBEAAAsgAUEpEOkGIAFBKBDnBiAAQQxqIAEQ7wYgAUEpEOkGC4QBAQF/IwBBIGsiAiQAIAAoAgggASAALwAFQRp0QRp1QQAQ6AYgAiACQRhqQe3CABCjBCkCADcDCCABIAJBCGoQvQYhASAAKAIMIAFBE0EAEOgGIAIgAkEQakGIxwAQowQpAgA3AwAgASACEL0GIQEgACgCECABQRFBARDoBiACQSBqJAAL6wECA38BfiMAQUBqIgIkACACIAApAggiBTcDGCACIAU3AzggAkEwaiIDIAEgAkEYahC9BiIEIgFBFGo2AgAgAyABKAIUNgIEIAFBADYCFCADIQEgAiACQShqQdUyEKMEKQIANwMQIAQgAkEQahC9BiEDBkAgACgCECIEIAMgBCgCACgCEBEAABkgAiQAIAEoAgAgASgCBDYCAAkACyACIAJBIGpBhjEQowQpAgA3AwggAyACQQhqEL0GIQMgASgCACABKAIENgIAIANBKBDnBiAAKAIUIANBE0EAEOgGIANBKRDpBiACQUBrJAALPQEBfiAAQTwgA0EBQQFBARC7BiIAQYShAjYCACABKQIAIQQgACACNgIQIAAgBDcCCCAAQRRqQgA3AgAgAAuPAQICfwF+IwBBIGsiAiQAIAIgACkCCCIENwMIIAIgBDcDGCABIAJBCGoQvQYiAUEoEOcGIAAoAhAiAyABIAMoAgAoAhARAAAgAy8ABUHAAXFBwABHBEAgAyABIAMoAgAoAhQRAAALIAFBKRDpBiACIAApAhQiBDcDACACIAQ3AxAgASACEL0GGiACQSBq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JAAgBigCACAGKAIENgIAIAUoAgAgBSgCBDYCAAkACwALjwIBA38jAEEQayIEJAACQCAALQAQQQFGBEAgAUHbABCMBiECIAAoAggiAyACIAMoAgAoAhARAAAgAy8ABUHAAXFBwABHBEAgAyACIAMoAgAoAhQRAAALIAJB3QAQjAYaDAELIAFBLhCMBiECIAAoAggiAyACIAMoAgAoAhARAAAgAy8ABUHAAXFBwABHBEAgAyACIAMoAgAoAhQRAAALCyAAKAIMIgItAARB0QBrQf8BcUECTwRAIAQgBEEIakH2wgAQowQpAgA3AwAgASAEEL0GGiAAKAIMIQILIAIgASACKAIAKAIQEQAAIAIvAAVBwAFxQcAARwRAIAIgASACKAIAKAIUEQAACyAEQRBqJAALlwIBAn8jAEEgayIDJAAgAUHbABCMBiEBIAAoAggiAiABIAIoAgAoAhARAAAgAi8ABUHAAXFBwABHBEAgAiABIAIoAgAoAhQRAAALIAMgA0EYakGXxwAQowQpAgA3AwggASADQQhqEL0GIQEgACgCDCICIAEgAigCACgCEBEAACACLwAFQcABcUHAAEcEQCACIAEgAigCACgCFBEAAAsgAUHdABCMBiECIAAoAhAiAS0ABEHRAGtB/wFxQQJPBEAgAyADQRBqQfbCABCjBCkCADcDACACIAMQvQYaIAAoAhAhAQsgASACIAEoAgAoAhARAAAgAS8ABUHAAXFBwABHBEAgASACIAEoAgAoAhQRAAALIANBIGokAAsuACAAQcYAQQBBAUEBQQEQuwYiACABNgIIIABBjLQCNgIAIAAgAikCADcCDCAAC1cBAX8gACgCCCICBEAgAiABIAIoAgAoAhARAAAgAi8ABUHAAXFBwABHBEAgAiABIAIoAgAoAhQRAAALCyAAQQxqIAFB+wAQjAYiABDvBiAAQf0AEIwGGguGAQEBfyABQSgQ5wYgACgCCCICIAEgAigCACgCEBEAACACLwAFQcABcUHAAEcEQCACIAEgAigCACgCFBEAAAsgAUEpEOkGIAFBKBDnBiAAKAIMIgAgASAAKAIAKAIQEQAAIAAvAAVBwAFxQcAARwRAIAAgASAAKAIAKAIUEQAACyABQSkQ6QYLtgIBAn8jAEEwayICJAAgAiACQShqQarHABCjBCkCADcDECABIAJBEGoQ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IAAoAggiACABIAAoAgAoAhARAAAgAC8ABUHAAXFBwABHBEAgACABIAAoAgAoAhQRAAALIAJBEGokAAsWACAAIAEoAggiACAAKAIAKAIYEQAACyMAIAAgAkEAQQFBAUEBELsGIgAgATYCCCAAQbTCAjYCACAAC0sBAX8jAEEgayICJAAgAiACQRhqQeoyEKMEKQIANwMIIAEgAkEIahD6BiACQRBqIAAQrQcgAiACKQIQNwMAIAIQ+gYaIAJBIGokAAuhAQEBfyMAQTBrIgIkACAAIAEQrgcCQCABKAIIQQFLBEAgAiAAKQIANwMoIAJBIGpBsycQowQhASACIAIpAyg3AxggAiABKQIANwMQIAJBGGogAkEQahCYBkUNASAAIAAoAgBBBmo2AgAgACAAKAIEQQZrNgIECyACQTBqJAAPCyACQffOADYCCCACQaoNNgIEIAJBoh42AgBB6BMgAhDdBQALGAAgACABKAIIQQJ0QfTeAmooAgAQowQaC8gBAQF/IwBB0ABrIgIkACACIAJByABqQeoyEKMEKQIANwMgIAEgAkEgahD6BiACQUBrIAAgACgCACgCGBEAACACIAIpAkA3AxggAkEYahD6BiEBIAAoAghBAUsEQCACIAJBOGpB3y4QowQpAgA3AxAgASACQRBqEPoGIQEgACgCCEECRgRAIAIgAkEwakH9LhCjBCkCADcDCCABIAJBCGoQ+gYaCyACIAJBKGpBhjEQowQpAgA3AwAgASACEPoGGgsgAkHQAGokAAt7AgJ/AX4jAEEwayICJAAgACgCCCIDIAEgAygCACgCEBEAACACIAJBKGpB1zIQowQpAgA3AxAgASACQRBqEL0GIAIgACkCDCIENwMIIAIgBDcDICACQQhqEL0GIAIgAkEYakGtKBCjBCkCADcDACACEL0GGiACQTBqJAALTwAgAEGYA2pBFBC5BiABKAIAIQEgAi0AACECIAMoAgAhA0ExQQBBAUEBQQEQuwYiACADNgIQIAAgAjoADCAAIAE2AgggAEG8xAI2AgAgAAscACABQdsAEOcGIABBCGogARDvBiABQd0AEOkGC2YBAX8jAEEgayICJAAgAC0ADEEBRgRAIAIgAkEYakGICBCjBCkCADcDCCABIAJBCGoQvQYaCyACQRBqIAAoAggiACAAKAIAKAIYEQAAIAIgAikC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QYYxEKMEKQIANwMAIAIQvQYaIAJBMGokAAu5AQICfwF+IwBBIGsiAiQAIAAoAggiAyABIAMoAgAoAhARAAAgAy8ABUHAAXFBwABHBEAgAyABIAMoAgAoAhQRAAALIAIgAkEYakGqxwAQowQpAgA3AwggASACQQhqEL0GIAIgACkCDCIENwMAIAIgBDcDECACEL0GIQEgACgCFCIABEAgACABIAAoAgAoAhARAAAgAC8ABUHAAXFBwABHBEAgACABIAAoAgAoAhQRAAALCyACQSBqJAALDAAgACgCDCABEM8GCzABAX8CfyAAKAIMIgAtAAZBA3EiAkECRwRAIAJFDAELIAAgASAAKAIAKAIEEQIACwszAQF/An8gACgCDCIALwAFQQp2QQNxIgJBAkcEQCACRQwBCyAAIAEgACgCACgCCBECAAsLqQEBAn8gACgCDCICIAEgAigCACgCEBEAACMAQTBrIgIkACAAKAIIIgNBAXEEQCACIAJBKGpB9AoQowQpAgA3AxAgASACQRBqEL0GGiAAKAIIIQMLIANBAnEEfyACIAJBIGpB+SAQowQpAgA3AwggASACQQhqEL0GGiAAKAIIBSADC0EEcQRAIAIgAkEYakHcDhCjBCkCADcDACABIAIQvQYaCyACQTBqJAALFgAgACgCDCIAIAEgACgCACgCFBEAAAtyAgF/AX4jAEEQayICJAAgAiAAKQIIIgM3AwAgAiADNwMIIAEgAhC9BkEoEIwGIQEgACgCECIAIAEgACgCACgCEBEAACAALwAFQcABcUHAAEcEQCAAIAEgACgCACgCFBEAAAsgAUEpEIwGGiACQRBqJAALYwEBfyMAQRBrIgIkACACIAJBCGpBhw8QowQpAgA3AwAgASACEL0GIQEgACgCCCIAIAEgACgCACgCEBEAACAALwAFQcABcUHAAEcEQCAAIAEgACgCACgCFBEAAAsgAkEQaiQAC3IBAX8jAEEgayICJAAgAC0ADEUEQCACIAJBGGpB48IAEKMEKQIANwMIIAEgAkEIahC9BhoLIAIgAkEQakH/DRCjBCkCADcDACABIAIQvQYiAUEoEOcGIAAoAgggAUETQQAQ6AYgAUEpEOkGIAJBIGokAAstACAAQQVBAEEBQQFBARC7BiIAIAE2AgggAEGU2AI2AgAgACACKQIANwIMIAALRQICfwF+IwBBEGsiAiQAIAAoAggiAyABIAMoAgAoAhARAAAgAiAAKQIMIgQ3AwAgAiAENwMIIAEgAhC9BhogAkEQaiQAC4EBAQF/IwBBIGsiAiQAIAIgAkEYakGvKBCjBCkCADcDCCABIAJBCGoQvQYhASAAKAIIIgAgASAAKAIAKAIQEQAAIAAvAAVBwAFxQcAARwRAIAAgASAAKAIAKAIUEQAACyACIAJBEGpBrSgQowQpAgA3AwAgASACEL0GGiACQSBqJAALKgAgAEEdQQBBAUEBQQEQuwYiACACNgIMIAAgATYCCCAAQfTZAjYCACAAC7kBAQJ/IwBBIGsiAiQAIAAoAggiAyABIAMoAgAoAhARAAAgAy8ABUHAAXFBwABHBEAgAyABIAMoAgAoAhQRAAALIAIgAkEYakG0KBCjBCkCADcDCCABIAJBCGoQvQYhASAAKAIMIgAEQCAAIAEgACgCACgCEBEAACAALwAFQcABcUHAAEcEQCAAIAEgACgCACgCFBEAAAsLIAIgAkEQakGtKBCjBCkCADcDACABIAIQvQYaIAJBIGokAAsWACAAKAIIIgAgASAAKAIAKAIQEQAAC4wCAQN/IwBBMGsiAiQAIwBBEGsiAyQAIAEoAgQiBEUEQCADQffOADYCCCADQa4BNgIEIANB0x02AgBB6BMgAxDdBQALIAEoAgAgBGpBAWssAAAgA0EQaiQAQd0ARwRAIAIgAkEoakGqxwAQowQpAgA3AxAgASACQRBqEL0GGgsgAiACQSBqQbsoEKMEKQIANwMIIAEgAkEIahC9BiEDIAAoAgwiAQRAIAEgAyABKAIAKAIQEQAAIAEvAAVBwAFxQcAARwRAIAEgAyABKAIAKAIUEQAACwsgAiACQRhqQa0oEKMEKQIANwMAIAMgAhC9BiEBIAAoAggiACABIAAoAgAoAhQRAAAgAkEwaiQAC44CAQN/IwBBMGsiAiQAIAAoAgwiAyABIAMoAgAoAhARAAAgAgJ/AkACfyAAKAIMIgMtAAZBA3EiBEECRwRAIARFDAELIAMgASADKAIAKAIEEQIAC0UEQAJ/IAAoAgwiAy8ABUEKdkEDcSIEQQJHBEAgBEUMAQsgAyABIAMoAgAoAggRAgALRQ0BCyACQShqQfk6EKMEDAELIAJBIGpBqscAEKMECykCADcDECABIAJBEGoQvQYhASAAKAIIIgAgASAAKAIAKAIQEQAAIAAvAAVBwAFxQcAARwRAIAAgASAAKAIAKAIUEQAACyACIAJBGGpBvTkQowQpAgA3AwggASACQQhqEL0GGiACQTBqJAALqAEBA38jAEEQayIDJAACQAJ/IAAoAgwiAi0ABkEDcSIEQQJHBEAgBEUMAQsgAiABIAIoAgAoAgQRAgALRQRAAn8gACgCDCICLwAFQQp2QQNxIgRBAkcEQCAERQwBCyACIAEgAigCACgCCBECAAtFDQELIAMgA0EIakH2OhCjBCkCADcDACABIAMQvQYaCyAAKAIMIgAgASAAKAIAKAIUEQAAIANBEGokAAtqAgF/AX4jAEEQayICJAAgAiAAKQIIIgM3AwAgAiADNwMIIAEgAhC9BkEgEIwGIQEgACgCECIAIAEgACgCACgCEBEAACAALwAFQcABcUHAAEcEQCAAIAEgACgCACgCFBEAAAsgAkEQaiQACwwAIAAoAgggARDPBguDAwIDfwF+IwBB4ABrIgIkACACAn8CQCAAKAIIIgMtAARBC0YEQCADEN8HIAAoAgghAw0BCyADIAEgAygCACgCEBEAAAJ/IAAoAggiAy0ABkEDcSIEQQJHBEAgBEUMAQsgAyABIAMoAgAoAgQRAgALBEAgAiACQdgAakGqxwAQowQpAgA3AyggASACQShqEL0GGgsCQAJ/IAAoAggiAy0ABkEDcSIEQQJHBEAgBEUMAQsgAyABIAMoAgAoAgQRAgALRQRAAn8gACgCCCIALwAFQQp2QQNxIgNBAkcEQCADRQwBCyAAIAEgACgCACgCCBECAAtFDQELIAIgAkHQAGpB+ToQowQpAgA3AyAgASACQSBqEL0GGgsgAkHIAGpByjkQowQMAQsgAiACQUBrQcIyEKMEKQIANwMYIAEgAkEYahC9BiACIAMpAgwiBTcDECACIAU3AzggAkEQahC9BhogAkEwakGGMRCjBAspAgA3AwggASACQQhqEL0GGiACQeAAaiQAC10BAn8jAEEgayIBJAAgACgCCCIALQAEQQhGBEAgASAAKQIINwIYIAFBEGpB5g4QowQhACABIAEpAhg3AwggASAAKQIANwMAIAFBCGogARCkBCECCyABQSBqJAAgAgvEAQEDfyMAQRBrIgMkAAJAAkACfyAAKAIIIgItAARBC0YE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dF9wcmltZSBvdmVyZmxvdwBvcGVyYXRvciBuZXcARHcATm92AER2AFRodQBUdQBBdWd1c3QAIGNvbnN0AE5vdCBlbm91Z2ggbWVtb3J5OiBsb2FkSW5kZXggZmFpbGVkIHRvIGFsbG9jYXRlIGxpbmtsaXN0AE5vdCBlbm91Z2ggbWVtb3J5OiBhZGRQb2ludCBmYWlsZWQgdG8gYWxsb2NhdGUgbGlua2xpc3QAVGhlIG5ld2x5IGluc2VydGVkIGVsZW1lbnQgc2hvdWxkIGhhdmUgYmxhbmsgbGluayBsaXN0AGNvbnN0X2Nhc3QAcmVpbnRlcnByZXRfY2FzdABzdGQ6OmJhZF9jYXN0AHN0YXRpY19jYXN0AGR5bmFtaWNfY2FzdAB1bnNpZ25lZCBzaG9ydAAgbm9leGNlcHQAayA8PSBjdXJfZWxlbWVudF9jb3VudABpbnRlcm5hbElkIDwgY3VyX2VsZW1lbnRfY291bnQAZ2V0Q3VycmVudENvdW50AGdldFBvaW50AG5vcm1hbGl6ZVBvaW50AHJlbW92ZVBvaW50AGFkZFBvaW50AHVuc2lnbmVkIGludABfQml0SW50AFRoZSBudW1iZXIgb2YgZWxlbWVudHMgZXhjZWVkcyB0aGUgc3BlY2lmaWVkIGxpbWl0AG9wZXJhdG9yIGNvX2F3YWl0AHVuY2F1Z2h0AHN0cnVjdAAgcmVzdHJpY3QAb2JqY19vYmplY3QAT2N0AHBvc2l4X3N0YXQAZmxvYXQAX0Zsb2F0AFNhdABzdGQ6Om51bGxwdHJfdAB3Y2hhcl90AGNoYXI4X3QAY2hhcjE2X3QAdWludDY0X3QAY2hhcjMyX3QAVXQAVHQAU3QAY2hlY2tGaWxlRXhpc3RzAE5vdCBlbm91Z2ggbWVtb3J5OiBsb2FkSW5kZXggZmFpbGVkIHRvIGFsbG9jYXRlIGxpbmtsaXN0cwBOb3QgZW5vdWdoIG1lbW9yeTogSGllcmFyY2hpY2FsTlNXIGZhaWxlZCB0byBhbGxvY2F0ZSBsaW5rbGlzdHMAYWRkUG9pbnRzAENhbm5vdCByZXNpemUsIG1heCBlbGVtZW50IGlzIGxlc3MgdGhhbiB0aGUgY3VycmVudCBudW1iZXIgb2YgZWxlbWVudHMAZ2V0TWF4RWxlbWVudHMAbmVpZ2hib3JzAE5vdCBlbm91Z2ggbWVtb3J5OiByZXNpemVJbmRleCBmYWlsZWQgdG8gYWxsb2NhdGUgb3RoZXIgbGF5ZXJzAGdldE51bURpbWVuc2lvbnMAbWFya0RlbGV0ZUl0ZW1zAGFkZEl0ZW1zAGdldERlbGV0ZWRMYWJlbHMAZ2V0VXNlZExhYmVscwB0aGlzAHNldERlYnVnTG9ncwByZXF1aXJlcwBkaXN0YW5jZXMAVHMAdGVybWluYXRpbmcgZHVlIHRvICVzIGV4Y2VwdGlvbiBvZiB0eXBlICVzAHRlcm1pbmF0aW5nIGR1ZSB0byAlcyBleGNlcHRpb24gb2YgdHlwZSAlczogJXMAZmlsZXN5c3RlbSBlcnJvcjogJXMAJXM6JWQ6ICVzAG51bGxwdHIAc3IAQXByAFJlcGxhY2VtZW50IG9mIGRlbGV0ZWQgZWxlbWVudHMgaXMgZGlzYWJsZWQgaW4gY29uc3RydWN0b3IAQ3VzdG9tRmlsdGVyRnVuY3RvcgB2ZWN0b3IAb3BlcmF0b3IAYWxsb2NhdG9yAHVuc3BlY2lmaWVkIGlvc3RyZWFtX2NhdGVnb3J5IGVycm9yAG1vbmV5X2dldCBlcnJvcgBMZXZlbCBlcnJvcgBjYW5kIGVycm9yAE5vdCBlbm91Z2ggbWVtb3J5OiByZXNpemVJbmRleCBmYWlsZWQgdG8gYWxsb2NhdGUgYmFzZSBsYXllcgByZWFkRW5jb2RlZFBvaW50ZXIAQmFkIHZhbHVlIG9mIHN6X2xpbmtfbGlzdF9vdGhlcgBFbXNjcmlwdGVuRmlsZVN5c3RlbU1hbmFnZXIAT2N0b2JlcgBOb3ZlbWJlcgBTZXB0ZW1iZXIARGVjZW1iZXIAdW5zaWduZWQgY2hhcgBpb3NfYmFzZTo6Y2xlYXIATWFyAHJxAHNwAC4uLy4uLy4uL3N5c3RlbS9saWIvbGliY3h4YWJpL3NyYy9jeGFfcGVyc29uYWxpdHkuY3BwAC4uLy4uLy4uL3N5c3RlbS9saWIvbGliY3h4YWJpL3NyYy9wcml2YXRlX3R5cGVpbmZvLmNwcAAuLi8uLi8uLi9zeXN0ZW0vbGliL2xpYmN4eGFiaS9zcmMvY3hhX2RlbWFuZ2xlLmNwcAAuLi8uLi8uLi9zeXN0ZW0vbGliL2xpYmN4eGFiaS9zcmMvZmFsbGJhY2tfbWFsbG9jLmNwcABvcABmcABTZXAAVHAAJUk6JU06JVMgJXAAIGF1dG8Ab2JqY3Byb3RvAHNvAERvAFN1bgBKdW4AUG9zc2libGUgbWVtb3J5IGNvcnJ1cHRpb24Ac3RkOjpleGNlcHRpb24AdGVybWluYXRpbmcgZHVlIHRvICVzIGZvcmVpZ24gZXhjZXB0aW9uAHRlcm1pbmF0ZV9oYW5kbGVyIHVuZXhwZWN0ZWRseSB0aHJldyBhbiBleGNlcHRpb24AdW5pb24ATW9uAHNlYXJjaEtubgBkbgBuYW4ASmFuAFRuAERuAGVudW0Ac3lzdGVtAGluaXRpYWxpemVGaWxlU3lzdGVtAGJhc2ljX2lvc3RyZWFtAGJhc2ljX29zdHJlYW0AYmFzaWNfaXN0cmVhbQBKdWwAdGwAYm9vbAB1bGwAY2FsbABBcHJpbABMZXZlbCBvZiBpdGVtIHRvIGJlIHVwZGF0ZWQgY2Fubm90IGJlIGJpZ2dlciB0aGFuIG1heCBsZXZlbABUcnlpbmcgdG8gbWFrZSBhIGxpbmsgb24gYSBub24tZXhpc3RlbnQgbGV2ZWwAc3RyaW5nIGxpdGVyYWwAdW5tYXJrRGVsZXRlZEludGVybmFsAFVsAHlwdG5rAFRrAEZyaQBwaQBsaQBiYWRfYXJyYXlfbmV3X2xlbmd0aABmYWlsZWQgdG8gZGV0ZXJtaW5lIGF0dHJpYnV0ZXMgZm9yIHRoZSBzcGVjaWZpZWQgcGF0aABjYW5fY2F0Y2gAc2V0RWZTZWFyY2gAZ2V0RWZTZWFyY2gAQnJ1dGVmb3JjZVNlYXJjaABNYXJjaAAuLi8uLi8uLi9zeXN0ZW0vbGliL2xpYmN4eGFiaS9zcmMvZGVtYW5nbGUvVXRpbGl0eS5oAC4vLi9zcmMvaG5zd2xpYi9obnN3YWxnLmgALi4vLi4vLi4vc3lzdGVtL2xpYi9saWJjeHhhYmkvc3JjL2RlbWFuZ2xlL0l0YW5pdW1EZW1hbmdsZS5oAC4vLi9zcmMvaG5zd2xpYi9icnV0ZWZvcmNlLmgAQXVnAHVuc2lnbmVkIGxvbmcgbG9uZwB1bnNpZ25lZCBsb25nAHRlcm1pbmF0aW5nAHN0ZDo6d3N0cmluZwBiYXNpY19zdHJpbmcAc3RkOjpzdHJpbmcAc3RkOjp1MTZzdHJpbmcAc3RkOjp1MzJzdHJpbmcAX191dWlkb2YAaW5mAFRyeWluZyB0byBjb25uZWN0IGFuIGVsZW1lbnQgdG8gaXRzZWxmAGhhbGYAJWFmACUuMExmACVMZgB0cnVlAFR1ZQBvcGVyYXRvciBkZWxldGUAdW5tYXJrRGVsZXRlAGZhbHNlAGRlY2x0eXBlAEp1bmUAY29zaW5lACB2b2xhdGlsZQBDYW5ub3Qgb3BlbiBmaWxlAGxvbmcgZG91YmxlAF9ibG9ja19pbnZva2UAZGlzdGFuY2UASW5uZXJQcm9kdWN0U3BhY2UATDJTcGFjZQBUZQBzdGQATGFiZWwgbm90IGZvdW5kAHZvaWQAQXV0b1NhdmUgbm90IGVuYWJsZWQgb3Igbm90IGluaXRpYWxpemVkAGlzSW5kZXhJbml0aWFsaXplZABpc0luaXRpYWxpemVkAEluZGV4IHNlZW1zIHRvIGJlIGNvcnJ1cHRlZCBvciB1bnN1cHBvcnRlZABsb2NhbGUgbm90IHN1cHBvcnRlZABUaGUgcmVxdWVzdGVkIHRvIGRlbGV0ZSBlbGVtZW50IGlzIGFscmVhZHkgZGVsZXRlZABUaGUgcmVxdWVzdGVkIHRvIHVuZGVsZXRlIGVsZW1lbnQgaXMgbm90IGRlbGV0ZWQAdW5leHBlY3RlZAB0ZXJtaW5hdGVfaGFuZGxlciB1bmV4cGVjdGVkbHkgcmV0dXJuZWQAJ3VubmFtZWQAbXV0ZXggbG9jayBmYWlsZWQAVGhlIG1heGltdW0gbnVtYmVyIG9mIGVsZW1lbnRzIGhhcyBiZWVuIHJlYWNoZWQAZS4gSURCRlMgaGFzIHN5bmNlZABjLiBJREJGUyBoYXMgc3luY2VkAGlzU3luY2VkAHNldElkYmZzU3luY2VkAFdlZABVbmtub3duIGVycm9yICVkAHN0ZDo6YmFkX2FsbG9jAG1jAFNob3VsZCBiZSBub3QgYmUgbW9yZSB0aGFuIE1fIGNhbmRpZGF0ZXMgcmV0dXJuZWQgYnkgdGhlIGhldXJpc3RpYwBnZW5lcmljAERlYwB3YgByYgBGZWIAc2Nhbl9laF90YWIAVWIAdytiAHIrYgBhK2IAcndhAE5vdCBlbm91Z2ggbWVtb3J5OiBsb2FkSW5kZXggZmFpbGVkIHRvIGFsbG9jYXRlIGRhdGEATm90IGVub3VnaCBtZW1vcnk6IEJydXRlZm9yY2VTZWFyY2ggZmFpbGVkIHRvIGFsbG9jYXRlIGRhdGEAJ2xhbWJkYQAlYQBiYXNpY18Ab3BlcmF0b3JeAG9wZXJhdG9yIG5ld1tdAG9wZXJhdG9yW10Ab3BlcmF0b3IgZGVsZXRlW10AZmlsZXN5c3RlbSBlcnJvcjogJXMgWyIlcyJdAGZpbGVzeXN0ZW0gZXJyb3I6ICVzIFsiJXMiXSBbIiVzIl0AcGl4ZWwgdmVjdG9yWwBzWgBfX19fWgAlYSAlYiAlZCAlSDolTTolUyAlWQBQT1NJWABIaWVyYXJjaGljYWxOU1cAZnBUACRUVAAkVABFbXNjcmlwdGVuRmlsZVN5c3RlbU1hbmFnZXIgbXVzdCBiZSBpbml0aWFsaXplZCBiZWZvcmUgY2FsbGluZyBzeW5jRlMAclEAc1AARE8Ac3JOAF9HTE9CQUxfX04ATkFOACROAFBNAEFNAGZMACVMYUwATENfQUxMAFVhOWVuYWJsZV9pZkkATEFORwBJTkYAYWN0aW9ucyAmIF9VQV9DTEVBTlVQX1BIQVNFAGFjdGlvbnMgJiBfVUFfU0VBUkNIX1BIQVNFAFJFAE9FAGIxRQBiMEUAcmVzdWx0cy5yZWFzb24gPT0gX1VSQ19IQU5ETEVSX0ZPVU5EAERDAG9wZXJhdG9yPwBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxzaG9ydD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8dW5zaWduZWQgc2hvcnQ+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PGludD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8dW5zaWduZWQgaW50PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxmbG9hdD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8dWludDhfdD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8aW50OF90PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzx1aW50MTZfdD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8aW50MTZfdD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8dWludDY0X3Q+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PGludDY0X3Q+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHVpbnQzMl90PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxpbnQzMl90PgBvcGVyYXRvcj4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8Y2hhcj4APGNoYXIsIHN0ZDo6Y2hhcl90cmFpdHM8Y2hhcj4ALCBzdGQ6OmFsbG9jYXRvcjxjaGFyPgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzx1bnNpZ25lZCBjaGFyPgBzdGQ6OmJhc2ljX3N0cmluZzx1bnNpZ25lZCBjaGFyPgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxzaWduZWQgY2hhcj4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8bG9uZz4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8dW5zaWduZWQgbG9uZz4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8ZG91YmxlPgBvcGVyYXRvcj4+AG9wZXJhdG9yPD0+AG9wZXJhdG9yLT4Ab3BlcmF0b3J8PQBvcGVyYXRvcj0Ab3BlcmF0b3JePQBvcGVyYXRvcj49AG9wZXJhdG9yPj49AG9wZXJhdG9yPT0Ab3BlcmF0b3I8PQBvcGVyYXRvcjw8PQBvcGVyYXRvci89AG9wZXJhdG9yLT0Ab3BlcmF0b3IrPQBvcGVyYXRvcio9AG9wZXJhdG9yJj0Ab3BlcmF0b3IlPQBvcGVyYXRvciE9AG9wZXJhdG9yPAB0ZW1wbGF0ZTwAaWQ8AG9wZXJhdG9yPDwALjwAIjwAW2FiaToAIFtlbmFibGVfaWY6AHN0ZDo6ADAxMjM0NTY3ODkAdW5zaWduZWQgX19pbnQxMjgAX19mbG9hdDEyOABkZWNpbWFsMTI4AEMuVVRGLTgAZGVjaW1hbDY0AGRlY2ltYWwzMgBfX2d4eF9wZXJzb25hbGl0eV93YXNtMABOb3QgZW5vdWdoIG1lbW9yeTogbG9hZEluZGV4IGZhaWxlZCB0byBhbGxvY2F0ZSBsZXZlbDAAb3BlcmF0b3IvAEZhaWxlZCB0byByZWFkIHRoZSBpbmRleC4ASW52YWxpZCBjYWxsYmFjayBmdW5jdGlvbiBmb3IgQ3VzdG9tRmlsdGVyRnVuY3Rvci4Ab3BlcmF0b3IuAEludmFsaWQgdGhlIGZpcnN0IGFyZ3VtZW50IHR5cGUsIG11c3QgYmUgYSBudW1iZXIuAFRoZSBudW1iZXIgb2YgdmVjdG9ycyBhbmQgaWRzIG11c3QgYmUgdGhlIHNhbWUuAENyZWF0aW5nIGFuIEV4cGxpY2l0T2JqZWN0UGFyYW1ldGVyIHdpdGhvdXQgYSB2YWxpZCBCYXNlIE5vZGUuAFNlYXJjaCBpbmRleCBoYXMgbm90IGJlZW4gaW5pdGlhbGl6ZWQsIGNhbGwgYGluaXRJbmRleGAgaW4gYWR2YW5jZS4AQ2FuJ3QgdXNlIGFkZFBvaW50IHRvIHVwZGF0ZSBkZWxldGVkIGVsZW1lbnRzIGlmIHJlcGxhY2VtZW50IG9mIGRlbGV0ZWQgZWxlbWVudHMgaXMgZW5hYmxlZC4AVGhlIG51bWJlciBvZiB2ZWN0b3JzIGFuZCBpZHMgbXVzdCBiZSBncmVhdGVyIHRoYW4gMC4AZC4gQ2FsbGluZyBzeW5jIGNhbGxiYWNrLi4uAHNpemVvZi4uLgBhLiBzdGFydCBzeW5jRlMuLi4ASW52YWxpZCB0aGUgbnVtYmVyIG9mIGstbmVhcmVzdCBuZWlnaGJvcnMgKG11c3QgYmUgYSBwb3NpdGl2ZSBudW1iZXIpLgBvcGVyYXRvci0ALWluLQBvcGVyYXRvci0tAG9wZXJhdG9yLAB3KwBvcGVyYXRvcisAYSsAb3BlcmF0b3IrKwBvcGVyYXRvcioAb3BlcmF0b3ItPioAOjoqAG9wZXJhdG9yLioAIGRlY2x0eXBlKGF1dG8pAChudWxsKQAoYW5vbnltb3VzIG5hbWVzcGFjZSkAYWN0aW9ucyAmIChfVUFfU0VBUkNIX1BIQVNFIHwgX1VBX0ZPUkNFX1VOV0lORCkAYWN0aW9ucyAmIChfVUFfU0VBUkNIX1BIQVNFIHwgX1VBX0hBTkRMRVJfRlJBTUUgfCBfVUFfRk9SQ0VfVU5XSU5EKQBvcGVyYXRvcigpACAoAG9wZXJhdG9yIG5hbWUgZG9lcyBub3Qgc3RhcnQgd2l0aCAnb3BlcmF0b3InACdibG9jay1saXRlcmFsJwBvcGVyYXRvciYAb3BlcmF0b3ImJgAgJiYAICYAb3BlcmF0b3IlAGFkanVzdGVkUHRyICYmICJjYXRjaGluZyBhIGNsYXNzIHdpdGhvdXQgYW4gb2JqZWN0PyIAPiIAKGJhc2UgIT0gMCkgJiYgIkRXX0VIX1BFX2RhdGFyZWwgaXMgaW52YWxpZCB3aXRoIGEgYmFzZSBvZiAwIgBJbnZhbGlkIGFjY2VzcyEAUG9wcGluZyBlbXB0eSB2ZWN0b3IhAG9wZXJhdG9yIQBzaHJpbmtUb1NpemUoKSBjYW4ndCBleHBhbmQhAFB1cmUgdmlydHVhbCBmdW5jdGlvbiBjYWxsZWQhAEludmFsaWQgdmVjdG9yIHNpemUgYXQgaW5kZXggAHRocm93IABub2V4Y2VwdCAALCBidXQgZ290IAAgYXQgb2Zmc2V0IABDb3VsZCBub3QgYWRkUG9pbnRzIABDb3VsZCBub3QgbWFya0RlbGV0ZUl0ZW1zIABDb3VsZCBub3QgYWRkSXRlbXMgAHRoaXMgAEludmFsaWQgdmVjdG9yIHNpemUuIE11c3QgYmUgZXF1YWwgdG8gdGhlIGRpbWVuc2lvbiBvZiB0aGUgc3BhY2UuIFRoZSBkaW1lbnNpb24gb2YgdGhlIHNwYWNlIGlzIAAgcmVxdWlyZXMgAG9wZXJhdG9yIAByZWZlcmVuY2UgdGVtcG9yYXJ5IGZvciAAdGVtcGxhdGUgcGFyYW1ldGVyIG9iamVjdCBmb3IgAHR5cGVpbmZvIGZvciAAdGhyZWFkLWxvY2FsIHdyYXBwZXIgcm91dGluZSBmb3IgAHRocmVhZC1sb2NhbCBpbml0aWFsaXphdGlvbiByb3V0aW5lIGZvciAAdHlwZWluZm8gbmFtZSBmb3IgAGNvbnN0cnVjdGlvbiB2dGFibGUgZm9yIABndWFyZCB2YXJpYWJsZSBmb3IgAFZUVCBmb3IgAGNvdmFyaWFudCByZXR1cm4gdGh1bmsgdG8gAG5vbi12aXJ0dWFsIHRodW5rIHRvIABpbnZvY2F0aW9uIGZ1bmN0aW9uIGZvciBibG9jayBpbiAAYWxpZ25vZiAAc2l6ZW9mIAA+IHR5cGVuYW1lIABpbml0aWFsaXplciBmb3IgbW9kdWxlIAA6OmZyaWVuZCAAdHlwZWlkIABJbnZhbGlkIHRoZSBnaXZlbiBhcnJheSBsZW5ndGggKGV4cGVjdGVkIAB1bnNpZ25lZCAAID8gACAtPiAAID0gAEZhaWxlZCB0byByZWFkIHRoZSBpbmRleDogAEZhaWxlZCB0byBub3JtYWxpemUgdGhlIHBvaW50LCBjaGVjayB2ZWN0b3IgZGltZW5zaW9uczogAEZhaWxlZCB0byBjYWxsIHRoZSBjYWxsYmFjayBmdW5jdGlvbjogAGxpYmMrK2FiaTogAFRoZSBtYXhpbXVtIG51bWJlciBvZiBlbGVtZW50cyBoYXMgYmVlbiByZWFjaGVkIGluIGluZGV4LCBwbGVhc2UgaW5jcmVhc2VkIHRoZSBpbmRleCBtYXhfc2l6ZS4gIG1heF9zaXplOiAAVGhlIG1heGltdW0gbnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoZSBpbmRleCBoYXMgYmVlbiByZWFjaGVkLiAsIHBsZWFzZSBpbmNyZWFzZWQgdGhlIGluZGV4IG1heF9zaXplLiAgbWF4X3NpemU6IABpbnZhbGlkIHNwYWNlIHNob3VsZCBiZSBleHBlY3RlZCBsMiwgaXAsIG9yIGNvc2luZSwgbmFtZTogAEludmFsaWQgdGhlIG51bWJlciBvZiBrLW5lYXJlc3QgbmVpZ2hib3JzIChjYW5ub3QgYmUgZ2l2ZW4gYSB2YWx1ZSBncmVhdGVyIHRoYW4gYG1heEVsZW1lbnRzYDogAEhOU1dMSUIgRVJST1I6IAAgOiAAc2l6ZW9mLi4uIAAgLi4uIAAsIABvcGVyYXRvciIiIABUaGUgbWF4aW11bSBudW1iZXIgb2YgZWxlbWVudHMgaGFzIGJlZW4gcmVhY2hlZCBpbiBpbmRleCwgcGxlYXNlIGluY3JlYXNlZCB0aGUgaW5kZXggbWF4X3NpemUuICBtYXhfc2l6ZTogJXp1CgBUaGUgbWF4aW11bSBudW1iZXIgb2YgZWxlbWVudHMgaW4gdGhlIGluZGV4IGhhcyBiZWVuIHJlYWNoZWQuICwgcGxlYXNlIGluY3JlYXNlZCB0aGUgaW5kZXggbWF4X3NpemUuICBtYXhfc2l6ZTogJXp1CgBUaGUgbnVtYmVyIG9mIGVsZW1lbnRzIGV4Y2VlZHMgdGhlIHNwZWNpZmllZCBsaW1pdAoAQ291bGQgbm90IG1hcmtEZWxldGVJdGVtcyAlcwoAQ291bGQgbm90IGFkZEl0ZW1zICVzCgBGYWlsZWQgdG8gcmVhZCB0aGUgaW5kZXg6ICVzCgBGYWlsZWQgdG8gbm9ybWFsaXplIHRoZSBwb2ludCwgY2hlY2sgdmVjdG9yIGRpbWVuc2lvbnM6ICVzCgBGYWlsZWQgdG8gY2FsbCB0aGUgY2FsbGJhY2sgZnVuY3Rpb246ICVzCgBXcml0ZUluZGV4IGZpbGVuYW1lOiAlcwoAQXV0b1NhdmUgZmlsZW5hbWU6ICVzCgBpbnZhbGlkIHNwYWNlIHNob3VsZCBiZSBleHBlY3RlZCBsMiwgaXAsIG9yIGNvc2luZSwgbmFtZTogJXMKAEhOU1dMSUIgRVJST1I6ICVzCgBJbnZhbGlkIHZlY3RvciBzaXplIGF0IGluZGV4ICV6dS4gTXVzdCBiZSBlcXVhbCB0byB0aGUgZGltZW5zaW9uIG9mIHRoZSBzcGFjZS4gVGhlIGRpbWVuc2lvbiBvZiB0aGUgc3BhY2UgaXMgJWQuCgBJbnZhbGlkIHZlY3RvciBzaXplLiBNdXN0IGJlIGVxdWFsIHRvIHRoZSBkaW1lbnNpb24gb2YgdGhlIHNwYWNlLiBUaGUgZGltZW5zaW9uIG9mIHRoZSBzcGFjZSBpcyAlZC4KAEludmFsaWQgdGhlIGdpdmVuIGFycmF5IGxlbmd0aCAoZXhwZWN0ZWQgJWx1LCBidXQgZ290ICV6dSkuCgBJbnZhbGlkIHRoZSBudW1iZXIgb2Ygay1uZWFyZXN0IG5laWdoYm9ycyAoY2Fubm90IGJlIGdpdmVuIGEgdmFsdWUgZ3JlYXRlciB0aGFuIGBtYXhFbGVtZW50c2A6ICV6dSkuCgBOU3QzX18yMTJiYXNpY19zdHJpbmdJaE5TXzExY2hhcl90cmFpdHNJaEVFTlNfOWFsbG9jYXRvckloRUVFRQAAGIQAAHgnAABOU3QzX18yMTJiYXNpY19zdHJpbmdJd05TXzExY2hhcl90cmFpdHNJd0VFTlNfOWFsbG9jYXRvckl3RUVFRQAAGIQAAMAnAABOU3QzX18yMTJiYXNpY19zdHJpbmdJRHNOU18xMWNoYXJfdHJhaXRzSURzRUVOU185YWxsb2NhdG9ySURzRUVFRQAAABiEAAAIKAAATlN0M19fMjEyYmFzaWNfc3RyaW5nSURpTlNfMTFjaGFyX3RyYWl0c0lEaUVFTlNfOWFsbG9jYXRvcklEaUVFRUUAAAAYhAAAVCgAAE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SWNFRQAAGIQAAKAoAABOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0lhRUUAABiEAADIKAAATjEwZW1zY3JpcHRlbjExbWVtb3J5X3ZpZXdJaEVFAAAYhAAA8CgAAE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SXNFRQAAGIQAABgpAABOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0l0RUUAABiEAABAKQAATjEwZW1zY3JpcHRlbjExbWVtb3J5X3ZpZXdJaUVFAAAYhAAAaCkAAE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SWxFRQAAGIQAAJApAABOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0ltRUUAABiEAAC4KQAATjEwZW1zY3JpcHRlbjExbWVtb3J5X3ZpZXdJeEVFAAAYhAAA4CkAAE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SXlFRQAAGIQAAAgqAABOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0lkRUUAABiEAAAwKgAA/wANAQIAAQEAAAAAWIUAAP8AGQECAAUBAAJ9A30AAACYhgAAWIUAAAAAAAD/AA0BAgABAQAAAABYhQAA/wANAQIAAQEAAAAAmIYAAP8ADQECAAEBAAAAAJiGAAD/AA0BAgABAQAAAABYhQAA/wANAQIAAQEAAAAAWIUAAP8ADQECAAEBAAAAAFiFAAD/AA0BAgABAQAAAABYhQAA/wANAQIAAQEAAAAAWIUAAFSDAAAgKwAATjEwZW1zY3JpcHRlbjN2YWxFAAAYhAAADCsAAE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SWZFRQAAGIQAACgrAAAgKwAAICsAAHBwcABOMTBlbXNjcmlwdGVuN0wyU3BhY2VFAAAYhAAAXCsAAFBOMTBlbXNjcmlwdGVuN0wyU3BhY2VFAPiEAAB8KwAAAAAAAHQrAABQS04xMGVtc2NyaXB0ZW43TDJTcGFjZUUAAAAA+IQAAKQrAAABAAAAdCsAAHBwAHYAdnAAlCsAAMCDAABwcGkAAAAAADwsAABuAAAAbwAAAHAAAABxAAAAcgAAAE43aG5zd2xpYjdMMlNwYWNlRQBON2huc3dsaWIxNFNwYWNlSW50ZXJmYWNlSWZFRQAAAAAYhAAAEywAAECEAAAALAAANCwAQdDYAAuGAvyDAACUKwAAICsAACArAABmcHBwcAAAAMCDAACUKwAAaXBwAE4xMGVtc2NyaXB0ZW4xN0lubmVyUHJvZHVjdFNwYWNlRQAAABiEAAB0LAAAUE4xMGVtc2NyaXB0ZW4xN0lubmVyUHJvZHVjdFNwYWNlRQAA+IQAAKAsAAAAAAAAmCwAAFBLTjEwZW1zY3JpcHRlbjE3SW5uZXJQcm9kdWN0U3BhY2VFAPiEAADULAAAAQAAAJgsAADELAAAwIMAAAAAAABMLQAAcwAAAHQAAAB1AAAAcQAAAHYAAABON2huc3dsaWIxN0lubmVyUHJvZHVjdFNwYWNlRQAAAECEAAAsLQAANCwAQeDaAAvFBfyDAADELAAAICsAACArAADAgwAAxCwAAAAAAADQLQAAdwAAAE4xMGVtc2NyaXB0ZW4xOUN1c3RvbUZpbHRlckZ1bmN0b3JFAE43aG5zd2xpYjE3QmFzZUZpbHRlckZ1bmN0b3JFAAAAGIQAAKgtAABAhAAAhC0AAMgtAABsgwAAICsAANiDAABQTjEwZW1zY3JpcHRlbjE5Q3VzdG9tRmlsdGVyRnVuY3RvckUAAAAA+IQAAOgtAAAAAAAA0C0AAFBLTjEwZW1zY3JpcHRlbjE5Q3VzdG9tRmlsdGVyRnVuY3RvckUAAAD4hAAAIC4AAAEAAADQLQAAEC4AACArAABsgwAAEC4AANiDAABpcHBwAE4xMGVtc2NyaXB0ZW4xNkJydXRlZm9yY2VTZWFyY2hFAAAAGIQAAHEuAABQTjEwZW1zY3JpcHRlbjE2QnJ1dGVmb3JjZVNlYXJjaEUAAAD4hAAAnC4AAAAAAACULgAAUEtOMTBlbXNjcmlwdGVuMTZCcnV0ZWZvcmNlU2VhcmNoRQAA+IQAANAuAAABAAAAlC4AAMAuAABQLwAAwIMAAE5TdDNfXzIxMmJhc2ljX3N0cmluZ0ljTlNfMTFjaGFyX3RyYWl0c0ljRUVOU185YWxsb2NhdG9ySWNFRUVFAAAYhAAAEC8AAHBwcGkAAAAAVIMAAMAuAADAgwAAdnBwaQAA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SWNFRUVFAAAAABiEAACYSAAATlN0M19fMjEzYmFzaWNfaXN0cmVhbUljTlNfMTFjaGFyX3RyYWl0c0ljRUVFRQAAnIQAANRIAAAAAAAAAQAAAIxIAAAD9P//TlN0M19fMjEzYmFzaWNfb3N0cmVhbUljTlNfMTFjaGFyX3RyYWl0c0ljRUVFRQAAnIQAABxJAAAAAAAAAQAAAIxIAAAD9P//bAAAAAAAAAD0SQAArQAAAK4AAACU////lP////RJAACvAAAAsAAAAHBJAACoSQAAvEkAAIRJAABsAAAAAAAAAARJAACbAAAAnAAAAJT///+U////BEkAAJ0AAACeAAAATlN0M19fMjE0YmFzaWNfaWZzdHJlYW1JY05TXzExY2hhcl90cmFpdHNJY0VFRUUAQIQAAMRJAAAESQAAaAAAAAAAAACQSgAAsQAAALIAAACY////mP///5BKAACzAAAAtAAAAAxKAABESgAAWEoAACBKAABoAAAAAAAAAExJAACfAAAAoAAAAJj///+Y////TEkAAKEAAACiAAAATlN0M19fMjE0YmFzaWNfb2ZzdHJlYW1JY05TXzExY2hhcl90cmFpdHNJY0VFRUUAQIQAAGBKAABMSQAATlN0M19fMjEzYmFzaWNfZmlsZWJ1ZkljTlNfMTFjaGFyX3RyYWl0c0ljRUVFRQAAQIQAAJxKAADMSAAATlN0M19fMjE0ZXJyb3JfY2F0ZWdvcnlFAAAAABiEAADYSgAAAAAAAKhLAAC2AAAAtwAAALgAAAC5AAAAugAAALsAAAC8AAAAAAAAAHxLAAC1AAAAvQAAAL4AAAAAAAAAWEsAAL8AAADAAAAATlN0M19fMjhpb3NfYmFzZUUAAAAYhAAAREsAAE5TdDNfXzI4aW9zX2Jhc2U3ZmFpbHVyZUUAAABAhAAAYEsAADyBAABOU3QzX18yMTlfX2lvc3RyZWFtX2NhdGVnb3J5RQAAAECEAACISwAAYIEAQcCXAQvTBNF0ngBXnb0qgHBSD///PicKAAAAZAAAAOgDAAAQJwAAoIYBAEBCDwCAlpgAAOH1BRgAAAA1AAAAcQAAAGv////O+///kr///wAAAAAAAAAA/////////////////////////////////////////////////////////////////wABAgMEBQYHCAn/////////CgsMDQ4PEBESExQVFhcYGRobHB0eHyAhIiP///////8KCwwNDg8QERITFBUWFxgZGhscHR4fICEiI/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAQIEBwMGBQAAAAAAAAACAADAAwAAwAQAAMAFAADABgAAwAcAAMAIAADACQAAwAoAAMALAADADAAAwA0AAMAOAADADwAAwBAAAMARAADAEgAAwBMAAMAUAADAFQAAwBYAAMAXAADAGAAAwBkAAMAaAADAGwAAwBwAAMAdAADAHgAAwB8AAMAAAACzAQAAwwIAAMMDAADDBAAAwwUAAMMGAADDBwAAwwgAAMMJAADDCgAAwwsAAMMMAADDDQAA0w4AAMMPAADDAAAMuwEADMMCAAzDAwAMwwQADNsAAAAA3hIElQAAAAD////////////////wTQAAFAAAAEMuVVRGLTgAQcCcAQsCBE4AQeCcAQtKTENfQ1RZUEUAAAAATENfTlVNRVJJQwAATENfVElNRQAAAAAATENfQ09MTEFURQAATENfTU9ORVRBUlkATENfTUVTU0FHRVMAsFAAQbShAQv5AwEAAAACAAAAAwAAAAQAAAAFAAAABgAAAAcAAAAIAAAACQAAAAoAAAALAAAADAAAAA0AAAAOAAAADwAAABAAAAARAAAAEgAAABMAAAAUAAAAFQAAABYAAAAXAAAAGAAAABkAAAAaAAAAGwAAABwAAAAdAAAAHgAAAB8AAAAgAAAAIQAAACIAAAAjAAAAJAAAACUAAAAmAAAAJwAAACgAAAApAAAAKgAAACsAAAAsAAAALQAAAC4AAAAvAAAAMAAAADEAAAAyAAAAMwAAADQAAAA1AAAANgAAADcAAAA4AAAAOQAAADoAAAA7AAAAPAAAAD0AAAA+AAAAPwAAAEAAAABBAAAAQgAAAEMAAABEAAAARQAAAEYAAABHAAAASAAAAEkAAABKAAAASwAAAEwAAABNAAAATgAAAE8AAABQAAAAUQAAAFIAAABTAAAAVAAAAFUAAABWAAAAVwAA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ZmlsZXN5c3RlbV9lcnJvckUAQIQAAEB2AAA8gQAAAAAAAPh2AADQAQAA0QEAANIBAADMAQAA0wEAAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9lbXBsYWNlSU5TXzRfX2ZzMTBmaWxlc3lzdGVtMTZmaWxlc3lzdGVtX2Vycm9yOF9TdG9yYWdlRU5TXzlhbGxvY2F0b3JJUzRfRUVFRQBAhAAAlHYAABR2AAAGBQgCCAQIAQgDCAdObyBlcnJvciBpbmZvcm1hdGlvbgBJbGxlZ2FsIGJ5dGUgc2VxdWVuY2UARG9tYWluIGVycm9yAFJlc3VsdCBub3QgcmVwcmVzZW50YWJsZQBOb3QgYSB0dHkAUGVybWlzc2lvbiBkZW5pZWQAT3BlcmF0aW9uIG5vdCBwZXJtaXR0ZWQATm8gc3VjaCBmaWxlIG9yIGRpcmVjdG9yeQBObyBzdWNoIHByb2Nlc3MARmlsZSBleGlzdHMAVmFsdWUgdG9vIGxhcmdlIGZvciBkYXRhIHR5cGUATm8gc3BhY2UgbGVmdCBvbiBkZXZpY2UAT3V0IG9mIG1lbW9yeQBSZXNvdXJjZSBidXN5AEludGVycnVwdGVkIHN5c3RlbSBjYWxsAFJlc291cmNlIHRlbXBvcmFyaWx5IHVuYXZhaWxhYmxlAEludmFsaWQgc2VlawBDcm9zcy1kZXZpY2UgbGluawBSZWFkLW9ubHkgZmlsZSBzeXN0ZW0ARGlyZWN0b3J5IG5vdCBlbXB0eQBDb25uZWN0aW9uIHJlc2V0IGJ5IHBlZXIAT3BlcmF0aW9uIHRpbWVkIG91dABDb25uZWN0aW9uIHJlZnVzZWQASG9zdCBpcyBkb3duAEhvc3QgaXMgdW5yZWFjaGFibGUAQWRkcmVzcyBpbiB1c2UAQnJva2VuIHBpcGUASS9PIGVycm9yAE5vIHN1Y2ggZGV2aWNlIG9yIGFkZHJlc3MAQmxvY2sgZGV2aWNlIHJlcXVpcmVkAE5vIHN1Y2ggZGV2aWNlAE5vdCBhIGRpcmVjdG9yeQBJcyBhIGRpcmVjdG9yeQBUZXh0IGZpbGUgYnVzeQBFeGVjIGZvcm1hdCBlcnJvcgBJbnZhbGlkIGFyZ3VtZW50AEFyZ3VtZW50IGxpc3QgdG9vIGxvbmcAU3ltYm9saWMgbGluayBsb29wAEZpbGVuYW1lIHRvbyBsb25nAFRvbyBtYW55IG9wZW4gZmlsZXMgaW4gc3lzdGVtAE5vIGZpbGUgZGVzY3JpcHRvcnMgYXZhaWxhYmxlAEJhZCBmaWxlIGRlc2NyaXB0b3IATm8gY2hpbGQgcHJvY2VzcwBCYWQgYWRkcmVzcwBGaWxlIHRvbyBsYXJnZQBUb28gbWFueSBsaW5rcwBObyBsb2NrcyBhdmFpbGFibGUAUmVzb3VyY2UgZGVhZGxvY2sgd291bGQgb2NjdXIAU3RhdGUgbm90IHJlY292ZXJhYmxlAFByZXZpb3VzIG93bmVyIGRpZWQAT3BlcmF0aW9uIGNhbmNlbGVkAEZ1bmN0aW9uIG5vdCBpbXBsZW1lbnRlZABObyBtZXNzYWdlIG9mIGRlc2lyZWQgdHlwZQBJZGVudGlmaWVyIHJlbW92ZWQARGV2aWNlIG5vdCBhIHN0cmVhbQBObyBkYXRhIGF2YWlsYWJsZQBEZXZpY2UgdGltZW91dABPdXQgb2Ygc3RyZWFtcyByZXNvdXJjZXMATGluayBoYXMgYmVlbiBzZXZlcmVkAFByb3RvY29sIGVycm9yAEJhZCBtZXNzYWdlAEZpbGUgZGVzY3JpcHRvciBpbiBiYWQgc3RhdGUATm90IGEgc29ja2V0AERlc3RpbmF0aW9uIGFkZHJlc3MgcmVxdWlyZWQATWVzc2FnZSB0b28gbGFyZ2UAUHJvdG9jb2wgd3JvbmcgdHlwZSBmb3Igc29ja2V0AFByb3RvY29sIG5vdCBhdmFpbGFibGUAUHJvdG9jb2wgbm90IHN1cHBvcnRlZABTb2NrZXQgdHlwZSBub3Qgc3VwcG9ydGVkAE5vdCBzdXBwb3J0ZWQAUHJvdG9jb2wgZmFtaWx5IG5vdCBzdXBwb3J0ZWQAQWRkcmVzcyBmYW1pbHkgbm90IHN1cHBvcnRlZCBieSBwcm90b2NvbABBZGRyZXNzIG5vdCBhdmFpbGFibGUATmV0d29yayBpcyBkb3duAE5ldHdvcmsgdW5yZWFjaGFibGUAQ29ubmVjdGlvbiByZXNldCBieSBuZXR3b3JrAENvbm5lY3Rpb24gYWJvcnRlZABObyBidWZmZXIgc3BhY2UgYXZhaWxhYmxlAFNvY2tldCBpcyBjb25uZWN0ZWQAU29ja2V0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MTBfX2N4eGFiaXYxMjFfX3ZtaV9jbGFzc190eXBlX2luZm9FAAAAQIQAALyEAAAkggAAAAAAAISCAADhAQAA8wEAAOMBAADkAQAA9AEAAAAAAACIhQAAZgAAAPUBAAD2AQAAAAAAAJSFAABmAAAA9wEAAPgBAAAAAAAAWIUAAGYAAAD5AQAA+gEAAFN0OWV4Y2VwdGlvbgAAAAAYhAAASIUAAFN0MjBiYWRfYXJyYXlfbmV3X2xlbmd0aABTdDliYWRfYWxsb2MAAABAhAAAeYUAAFiFAABAhAAAYIUAAIiFAAAAAAAA2IUAAGQAAAD7AQAA/AEAAAAAAACYhgAAAgAAAP0BAAC+AAAAU3QxMWxvZ2ljX2Vycm9yAECEAADIhQAAWIUAAAAAAAAQhgAAZAAAAP4BAAD8AQAAU3QxNmludmFsaWRfYXJndW1lbnQAAAAAQIQAAPiFAADYhQAAAAAAAESGAABkAAAA/wEAAPwBAABTdDEybGVuZ3RoX2Vycm9yAAAAAECEAAAwhgAA2IUAAAAAAAB4hgAAZAAAAAACAAD8AQAAU3QxMm91dF9vZl9yYW5nZQAAAABAhAAAZIYAANiFAABTdDEzcnVudGltZV9lcnJvcgAAAECEAACEhgAAWIUAAAAAAADMhgAAAgAAAAECAAC+AAAAU3QxNG92ZXJmbG93X2Vycm9yAABAhAAAuIYAAJiGAAAAAAAAEIcAAIwAAAACAgAAAwIAAFN0OXR5cGVfaW5mbwAAAAAYhAAA7IYAAFN0OGJhZF9jYXN0AECEAAAEhwAAWIUAAAAAAAD8//////////z//////////v/////////8//////////j//////////P/////////8//////////z//////////P/////////8//////////7//////////P/////////4/////////wAAAAAUiAAABAIAAAUCAAAGAgAABwIAAAgCAAAJAgAACgIAAAsCAAAMAgAATjEyX0dMT0JBTF9fTl8xMTZpdGFuaXVtX2RlbWFuZ2xlMTFTcGVjaWFsTmFtZUUATjEyX0dMT0JBTF9fTl8xMTZpdGFuaXVtX2RlbWFuZ2xlNE5vZGVFABiEAADkhwAAQIQAALSHAAAMiAAAAAAAAAyIAAAEAgAABQIAAAYCAAAHAgAAygEAAAkCAAAKAgAACwIAAA0CAAAAAAAAtIgAAAQCAAAFAgAABgIAAAcCAAAOAgAACQIAAAoCAAALAgAADwIAAE4xMl9HTE9CQUxfX05fMTE2aXRhbml1bV9kZW1hbmdsZTIxQ3RvclZ0YWJsZVNwZWNpYWxOYW1lRQAAAECEAAB4iAAADIgAAAAAAAAYiQAABAIAAAUCAAAGAgAABwIAABACAAAJAgAAEQIAAAsCAAASAgAATjEyX0dMT0JBTF9fTl8xMTZpdGFuaXVtX2RlbWFuZ2xlOE5hbWVUeXBlRQBAhAAA7IgAAAyIAAAAAAAAgIkAAAQCAAAFAgAABgIAAAcCAAATAgAACQIAAAoCAAALAgAAFAIAAE4xMl9HTE9CQUxfX05fMTE2aXRhbml1bV9kZW1hbmdsZTEwTW9kdWxlTmFtZUUAAECEAABQiQAADIgAAAAAAAD4iQAAFQIAABYCAAAXAgAAGAIAABkCAAAaAgAACgIAAAsCAAAbAgAATjEyX0dMT0JBTF9fTl8xMTZpdGFuaXVtX2RlbWFuZ2xlMjRGb3J3YXJkVGVtcGxhdGVSZWZlcmVuY2VFAAAAAECEAAC4iQAADIgAQZCUAgv6SmFOAiINGQAAYVMCIpMYAABhYQIcwh0AAGFkAAS4HQAAYW4CFrgdAABhdAwF8iAAAGF3CgA6BwAAYXoMBPIgAABjYwsCIwYAAGNsBwJtHQAAY20CJIIcAABjbwAEAAQAAGN2CAZXCgAAZFYCIuEYAABkYQYF3hMAAGRjCwJZBgAAZGUABKccAABkbAYEQRAAAGRzBAjBHAAAZHQEAmUaAABkdgIiDhoAAGVPAiKdGAAAZW8CGLoTAABlcQIUvxgAAGdlAhKoGAAAZ3QCEjcXAABpeAMC0xMAAGxTAiLVGAAAbGUCEsoYAABscwIORhkAAGx0AhIuGQAAbUkCIuwYAABtTAIiAhkAAG1pAgxoHAAAbWwCCqccAABtbQECdxwAAG5hBQXEEwAAbmUCFCMZAABuZwAEaBwAAG50AAR6HgAAbncFBE8FAABvUgIiiBgAAG9vAh4QBAAAb3ICGhsEAABwTAIi9xgAAHBsAgyPHAAAcG0ECLEcAABwcAECnBwAAHBzAASPHAAAcHQEA30YAABxdQkgehUAAHJNAiIYGQAAclMCIrMYAAByYwsCLgYAAHJtAgrUHQAAcnMCDmYYAABzYwsCTQYAAHNzAhBxGAAAc3QMBfsgAABzegwE+yAAAHRlDAIxIQAAdGkMAzEhAAAAAAAAXIwAAAQCAAAFAgAABgIAAAcCAAAcAgAACQIAAAoCAAALAgAAHQIAAE4xMl9HTE9CQUxfX05fMTE2aXRhbml1bV9kZW1hbmdsZTEwQmluYXJ5RXhwckUAAECEAAAsjAAADIgAAAAAAADEjAAABAIAAAUCAAAGAgAABwIAAB4CAAAJAgAACgIAAAsCAAAfAgAATjEyX0dMT0JBTF9fTl8xMTZpdGFuaXVtX2RlbWFuZ2xlMTBQcmVmaXhFeHByRQAAQIQAAJSMAAAMiAAAAAAAACyNAAAEAgAABQIAAAYCAAAHAgAAIAIAAAkCAAAKAgAACwIAACECAABOMTJfR0xPQkFMX19OXzExNml0YW5pdW1fZGVtYW5nbGUxMVBvc3RmaXhFeHByRQBAhAAA/IwAAAyIAAAAAAAAnI0AAAQCAAAFAgAABgIAAAcCAAAiAgAACQIAAAoCAAALAgAAIwIAAE4xMl9HTE9CQUxfX05fMTE2aXRhbml1bV9kZW1hbmdsZTE4QXJyYXlTdWJzY3JpcHRFeHByRQAAQIQAAGSNAAAMiAAAAAAAAASOAAAEAgAABQIAAAYCAAAHAgAAJAIAAAkCAAAKAgAACwIAACUCAABOMTJfR0xPQkFMX19OXzExNml0YW5pdW1fZGVtYW5nbGUxME1lbWJlckV4cHJFAABAhAAA1I0AAAyIAAAAAAAAaI4AAAQCAAAFAgAABgIAAAcCAAAmAgAACQIAAAoCAAALAgAAJwIAAE4xMl9HTE9CQUxfX05fMTE2aXRhbml1bV9kZW1hbmdsZTdOZXdFeHByRQAAQIQAADyOAAAMiAAAAAAAANCOAAAEAgAABQIAAAYCAAAHAgAAKAIAAAkCAAAKAgAACwIAACkCAABOMTJfR0xPQkFMX19OXzExNml0YW5pdW1fZGVtYW5nbGUxMERlbGV0ZUV4cHJFAABAhAAAoI4AAAyIAAAAAAAANI8AAAQCAAAFAgAABgIAAAcCAAAqAgAACQIAAAoCAAALAgAAKwIAAE4xMl9HTE9CQUxfX05fMTE2aXRhbml1bV9kZW1hbmdsZThDYWxsRXhwckUAQIQAAAiPAAAMiAAAAAAAAKCPAAAEAgAABQIAAAYCAAAHAgAALAIAAAkCAAAKAgAACwIAAC0CAABOMTJfR0xPQkFMX19OXzExNml0YW5pdW1fZGVtYW5nbGUxNENvbnZlcnNpb25FeHByRQAAQIQAAGyPAAAMiAAAAAAAAAyQAAAEAgAABQIAAAYCAAAHAgAALgIAAAkCAAAKAgAACwIAAC8CAABOMTJfR0xPQkFMX19OXzExNml0YW5pdW1fZGVtYW5nbGUxNUNvbmRpdGlvbmFsRXhwckUAQIQAANiPAAAMiAAAAAAAAHCQAAAEAgAABQIAAAYCAAAHAgAAMAIAAAkCAAAKAgAACwIAADECAABOMTJfR0xPQkFMX19OXzExNml0YW5pdW1fZGVtYW5nbGU4Q2FzdEV4cHJFAECEAABEkAAADIgAAAAAAADckAAABAIAAAUCAAAGAgAABwIAADICAAAJAgAACgIAAAsCAAAzAgAATjEyX0dMT0JBTF9fTl8xMTZpdGFuaXVtX2RlbWFuZ2xlMTNFbmNsb3NpbmdFeHByRQAAAECEAACokAAADIgAAAAAAABIkQAABAIAAAUCAAAGAgAABwIAADQCAAAJAgAACgIAAAsCAAA1AgAATjEyX0dMT0JBTF9fTl8xMTZpdGFuaXVtX2RlbWFuZ2xlMTRJbnRlZ2VyTGl0ZXJhbEUAAECEAAAUkQAADIgAAAAAAACskQAABAIAAAUCAAAGAgAABwIAADYCAAAJAgAACgIAAAsCAAA3AgAATjEyX0dMT0JBTF9fTl8xMTZpdGFuaXVtX2RlbWFuZ2xlOEJvb2xFeHByRQBAhAAAgJEAAAyIAAAAAAAAHJIAAAQCAAAFAgAABgIAAAcCAAA4AgAACQIAAAoCAAALAgAAOQIAAE4xMl9HTE9CQUxfX05fMTE2aXRhbml1bV9kZW1hbmdsZTE2RmxvYXRMaXRlcmFsSW1wbElmRUUAQIQAAOSRAAAMiAAAAAAAAIySAAAEAgAABQIAAAYCAAAHAgAAOgIAAAkCAAAKAgAACwIAADsCAABOMTJfR0xPQkFMX19OXzExNml0YW5pdW1fZGVtYW5nbGUxNkZsb2F0TGl0ZXJhbEltcGxJZEVFAECEAABUkgAADIgAAAAAAAD8kgAABAIAAAUCAAAGAgAABwIAADwCAAAJAgAACgIAAAsCAAA9AgAATjEyX0dMT0JBTF9fTl8xMTZpdGFuaXVtX2RlbWFuZ2xlMTZGbG9hdExpdGVyYWxJbXBsSWVFRQBAhAAAxJIAAAyIAAAAAAAAaJMAAAQCAAAFAgAABgIAAAcCAAA+AgAACQIAAAoCAAALAgAAPwIAAE4xMl9HTE9CQUxfX05fMTE2aXRhbml1bV9kZW1hbmdsZTEzU3RyaW5nTGl0ZXJhbEUAAABAhAAANJMAAAyIAAAAAAAA1JMAAAQCAAAFAgAABgIAAAcCAABAAgAACQIAAAoCAAALAgAAQQIAAE4xMl9HTE9CQUxfX05fMTE2aXRhbml1bV9kZW1hbmdsZTE1VW5uYW1lZFR5cGVOYW1lRQBAhAAAoJMAAAyIAAAAAAAATJQAAAQCAAAFAgAABgIAAAcCAABCAgAACQIAAAoCAAALAgAAQwIAAE4xMl9HTE9CQUxfX05fMTE2aXRhbml1bV9kZW1hbmdsZTI2U3ludGhldGljVGVtcGxhdGVQYXJhbU5hbWVFAABAhAAADJQAAAyIAAAAAAAAwJQAAAQCAAAFAgAABgIAAAcCAABEAgAARQIAAAoCAAALAgAARgIAAE4xMl9HTE9CQUxfX05fMTE2aXRhbml1bV9kZW1hbmdsZTIxVHlwZVRlbXBsYXRlUGFyYW1EZWNsRQAAAECEAACElAAADIgAAAAAAABAlQAABAIAAAUCAAAGAgAABwIAAEcCAABIAgAACgIAAAsCAABJAgAATjEyX0dMT0JBTF9fTl8xMTZpdGFuaXVtX2RlbWFuZ2xlMzJDb25zdHJhaW5lZFR5cGVUZW1wbGF0ZVBhcmFtRGVjbEUAAAAAQIQAAPiUAAAMiAAAAAAAALiVAAAEAgAABQIAAAYCAAAHAgAASgIAAEsCAAAKAgAACwIAAEwCAABOMTJfR0xPQkFMX19OXzExNml0YW5pdW1fZGVtYW5nbGUyNE5vblR5cGVUZW1wbGF0ZVBhcmFtRGVjbEUAAAAAQIQAAHiVAAAMiAAAAAAAADCWAAAEAgAABQIAAAYCAAAHAgAATQIAAE4CAAAKAgAACwIAAE8CAABOMTJfR0xPQkFMX19OXzExNml0YW5pdW1fZGVtYW5nbGUyNVRlbXBsYXRlVGVtcGxhdGVQYXJhbURlY2xFAAAAQIQAAPCVAAAMiAAAAAAAAKSWAAAEAgAABQIAAAYCAAAHAgAAUAIAAFECAAAKAgAACwIAAFICAABOMTJfR0xPQkFMX19OXzExNml0YW5pdW1fZGVtYW5nbGUyMVRlbXBsYXRlUGFyYW1QYWNrRGVjbEUAAABAhAAAaJYAAAyIAAAAAAAAEJcAAAQCAAAFAgAABgIAAAcCAABTAgAACQIAAAoCAAALAgAAVAIAAE4xMl9HTE9CQUxfX05fMTE2aXRhbml1bV9kZW1hbmdsZTE1Q2xvc3VyZVR5cGVOYW1lRQBAhAAA3JYAAAyIAAAAAAAAeJcAAAQCAAAFAgAABgIAAAcCAABVAgAACQIAAAoCAAALAgAAVgIAAE4xMl9HTE9CQUxfX05fMTE2aXRhbml1bV9kZW1hbmdsZTEwTGFtYmRhRXhwckUAAECEAABIlwAADIgAAAAAAADglwAABAIAAAUCAAAGAgAABwIAAFcCAAAJAgAACgIAAAsCAABYAgAATjEyX0dMT0JBTF9fTl8xMTZpdGFuaXVtX2RlbWFuZ2xlMTFFbnVtTGl0ZXJhbEUAQIQAALCXAAAMiAAAAAAAAEyYAAAEAgAABQIAAAYCAAAHAgAAWQIAAAkCAAAKAgAACwIAAFoCAABOMTJfR0xPQkFMX19OXzExNml0YW5pdW1fZGVtYW5nbGUxM0Z1bmN0aW9uUGFyYW1FAAAAQIQAABiYAAAMiAAAAAAAALCYAAAEAgAABQIAAAYCAAAHAgAAWwIAAAkCAAAKAgAACwIAAFwCAABOMTJfR0xPQkFMX19OXzExNml0YW5pdW1fZGVtYW5nbGU4Rm9sZEV4cHJFAECEAACEmAAADIgAAAAAAAAkmQAABAIAAAUCAAAGAgAABwIAAF0CAAAJAgAACgIAAAsCAABeAgAATjEyX0dMT0JBTF9fTl8xMTZpdGFuaXVtX2RlbWFuZ2xlMjJQYXJhbWV0ZXJQYWNrRXhwYW5zaW9uRQAAQIQAAOiYAAAMiAAAAAAAAIyZAAAEAgAABQIAAAYCAAAHAgAAXwIAAAkCAAAKAgAACwIAAGACAABOMTJfR0xPQkFMX19OXzExNml0YW5pdW1fZGVtYW5nbGUxMEJyYWNlZEV4cHJFAABAhAAAXJkAAAyIAAAAAAAA+JkAAAQCAAAFAgAABgIAAAcCAABhAgAACQIAAAoCAAALAgAAYgIAAE4xMl9HTE9CQUxfX05fMTE2aXRhbml1bV9kZW1hbmdsZTE1QnJhY2VkUmFuZ2VFeHByRQBAhAAAxJkAAAyIAAAAAAAAZJoAAAQCAAAFAgAABgIAAAcCAABjAgAACQIAAAoCAAALAgAAZAIAAE4xMl9HTE9CQUxfX05fMTE2aXRhbml1bV9kZW1hbmdsZTEySW5pdExpc3RFeHByRQAAAABAhAAAMJoAAAyIAAAAAAAA4JoAAAQCAAAFAgAABgIAAAcCAABlAgAACQIAAAoCAAALAgAAZgIAAE4xMl9HTE9CQUxfX05fMTE2aXRhbml1bV9kZW1hbmdsZTI5UG9pbnRlclRvTWVtYmVyQ29udmVyc2lvbkV4cHJFAAAAQIQAAJyaAAAMiAAAAAAAAEybAAAEAgAABQIAAAYCAAAHAgAAZwIAAAkCAAAKAgAACwIAAGgCAABOMTJfR0xPQkFMX19OXzExNml0YW5pdW1fZGVtYW5nbGUxNUV4cHJSZXF1aXJlbWVudEUAQIQAABibAAAMiAAAAAAAALibAAAEAgAABQIAAAYCAAAHAgAAaQIAAAkCAAAKAgAACwIAAGoCAABOMTJfR0xPQkFMX19OXzExNml0YW5pdW1fZGVtYW5nbGUxNVR5cGVSZXF1aXJlbWVudEUAQIQAAISbAAAMiAAAAAAAACicAAAEAgAABQIAAAYCAAAHAgAAawIAAAkCAAAKAgAACwIAAGwCAABOMTJfR0xPQkFMX19OXzExNml0YW5pdW1fZGVtYW5nbGUxN05lc3RlZFJlcXVpcmVtZW50RQAAAECEAADwmwAADIgAAAAAAACUnAAABAIAAAUCAAAGAgAABwIAAG0CAAAJAgAACgIAAAsCAABuAgAATjEyX0dMT0JBTF9fTl8xMTZpdGFuaXVtX2RlbWFuZ2xlMTJSZXF1aXJlc0V4cHJFAAAAAECEAABgnAAADIgAAAAAAAAAnQAABAIAAAUCAAAGAgAABwIAAG8CAAAJAgAACgIAAAsCAABwAgAATjEyX0dMT0JBTF9fTl8xMTZpdGFuaXVtX2RlbWFuZ2xlMTNTdWJvYmplY3RFeHByRQAAAECEAADMnAAADIgAAAAAAABwnQAABAIAAAUCAAAGAgAABwIAAHECAAAJAgAACgIAAAsCAAByAgAATjEyX0dMT0JBTF9fTl8xMTZpdGFuaXVtX2RlbWFuZ2xlMTlTaXplb2ZQYXJhbVBhY2tFeHByRQBAhAAAOJ0AAAyIAAAAAAAA3J0AAAQCAAAFAgAABgIAAAcCAABzAgAACQIAAAoCAAALAgAAdAIAAE4xMl9HTE9CQUxfX05fMTE2aXRhbml1bV9kZW1hbmdsZTEzTm9kZUFycmF5Tm9kZUUAAABAhAAAqJ0AAAyIAAAAAAAARJ4AAAQCAAAFAgAABgIAAAcCAAB1AgAACQIAAAoCAAALAgAAdgIAAE4xMl9HTE9CQUxfX05fMTE2aXRhbml1bV9kZW1hbmdsZTlUaHJvd0V4cHJFAAAAAECEAAAUngAADIgAAAAAAACwngAABAIAAAUCAAAGAgAABwIAAHcCAAAJAgAAeAIAAAsCAAB5AgAATjEyX0dMT0JBTF9fTl8xMTZpdGFuaXVtX2RlbWFuZ2xlMTNRdWFsaWZpZWROYW1lRQAAAECEAAB8ngAADIgAAAAAAAAUnwAABAIAAAUCAAAGAgAABwIAAHoCAAAJAgAACgIAAAsCAAB7AgAATjEyX0dMT0JBTF9fTl8xMTZpdGFuaXVtX2RlbWFuZ2xlOER0b3JOYW1lRQBAhAAA6J4AAAyIAAAAAAAAiJ8AAAQCAAAFAgAABgIAAAcCAAB8AgAACQIAAAoCAAALAgAAfQIAAE4xMl9HTE9CQUxfX05fMTE2aXRhbml1bV9kZW1hbmdsZTIyQ29udmVyc2lvbk9wZXJhdG9yVHlwZUUAAECEAABMnwAADIgAAAAAAAD0nwAABAIAAAUCAAAGAgAABwIAAH4CAAAJAgAACgIAAAsCAAB/AgAATjEyX0dMT0JBTF9fTl8xMTZpdGFuaXVtX2RlbWFuZ2xlMTVMaXRlcmFsT3BlcmF0b3JFAECEAADAnwAADIgAAAAAAABkoAAABAIAAAUCAAAGAgAABwIAAIACAAAJAgAAgQIAAAsCAACCAgAATjEyX0dMT0JBTF9fTl8xMTZpdGFuaXVtX2RlbWFuZ2xlMTlHbG9iYWxRdWFsaWZpZWROYW1lRQBAhAAALKAAAAyIAAAAAAAAIKEAAAQCAAAFAgAABgIAAAcCAACDAgAACQIAAIQCAAALAgAAhQIAAE4xMl9HTE9CQUxfX05fMTE2aXRhbml1bV9kZW1hbmdsZTE5U3BlY2lhbFN1YnN0aXR1dGlvbkUATjEyX0dMT0JBTF9fTl8xMTZpdGFuaXVtX2RlbWFuZ2xlMjdFeHBhbmRlZFNwZWNpYWxTdWJzdGl0dXRpb25FAECEAADUoAAADIgAAECEAACcoAAAFKEAAAAAAAAUoQAABAIAAAUCAAAGAgAABwIAAIYCAAAJAgAAhwIAAAsCAACIAgAAAAAAALShAAAEAgAABQIAAAYCAAAHAgAAiQIAAAkCAACKAgAACwIAAIsCAABOMTJfR0xPQkFMX19OXzExNml0YW5pdW1fZGVtYW5nbGUxMEFiaVRhZ0F0dHJFAABAhAAAhKEAAAyIAAAAAAAAKKIAAAQCAAAFAgAABgIAAAcCAACMAgAACQIAAAoCAAALAgAAjQIAAE4xMl9HTE9CQUxfX05fMTE2aXRhbml1bV9kZW1hbmdsZTIxU3RydWN0dXJlZEJpbmRpbmdOYW1lRQAAAECEAADsoQAADIgAAAAAAACUogAABAIAAAUCAAAGAgAABwIAAI4CAAAJAgAACgIAAAsCAACPAgAATjEyX0dMT0JBTF9fTl8xMTZpdGFuaXVtX2RlbWFuZ2xlMTJDdG9yRHRvck5hbWVFAAAAAECEAABgogAADIgAAAAAAAAAowAABAIAAAUCAAAGAgAABwIAAJACAAAJAgAAkQIAAAsCAACSAgAATjEyX0dMT0JBTF9fTl8xMTZpdGFuaXVtX2RlbWFuZ2xlMTJNb2R1bGVFbnRpdHlFAAAAAECEAADMogAADIgAAAAAAAB0owAABAIAAAUCAAAGAgAABwIAAJMCAAAJAgAAlAIAAAsCAACVAgAATjEyX0dMT0JBTF9fTl8xMTZpdGFuaXVtX2RlbWFuZ2xlMjBNZW1iZXJMaWtlRnJpZW5kTmFtZUUAAAAAQIQAADijAAAMiAAAAAAAANyjAAAEAgAABQIAAAYCAAAHAgAAlgIAAAkCAACXAgAACwIAAJgCAABOMTJfR0xPQkFMX19OXzExNml0YW5pdW1fZGVtYW5nbGUxME5lc3RlZE5hbWVFAABAhAAArKMAAAyIAAAAAAAARKQAAAQCAAAFAgAABgIAAAcCAACZAgAACQIAAAoCAAALAgAAmgIAAE4xMl9HTE9CQUxfX05fMTE2aXRhbml1bV9kZW1hbmdsZTlMb2NhbE5hbWVFAAAAAECEAAAUpAAADIgAAAAAAACwpAAAmwIAAJwCAACdAgAAngIAAJ8CAACgAgAACgIAAAsCAAChAgAATjEyX0dMT0JBTF9fTl8xMTZpdGFuaXVtX2RlbWFuZ2xlMTNQYXJhbWV0ZXJQYWNrRQAAAECEAAB8pAAADIgAAAAAAAAcpQAABAIAAAUCAAAGAgAABwIAAKICAAAJAgAACgIAAAsCAACjAgAATjEyX0dMT0JBTF9fTl8xMTZpdGFuaXVtX2RlbWFuZ2xlMTJUZW1wbGF0ZUFyZ3NFAAAAAECEAADopAAADIgAAAAAAACQpQAABAIAAAUCAAAGAgAABwIAAKQCAAAJAgAApQIAAAsCAACmAgAATjEyX0dMT0JBTF9fTl8xMTZpdGFuaXVtX2RlbWFuZ2xlMjBOYW1lV2l0aFRlbXBsYXRlQXJnc0UAAAAAQIQAAFSlAAAMiAAAAAAAAASmAAAEAgAABQIAAAYCAAAHAgAApwIAAAkCAAAKAgAACwIAAKgCAABOMTJfR0xPQkFMX19OXzExNml0YW5pdW1fZGVtYW5nbGUyMFRlbXBsYXRlQXJndW1lbnRQYWNrRQAAAABAhAAAyKUAAAyIAAAAAAAAfKYAAAQCAAAFAgAABgIAAAcCAACpAgAACQIAAAoCAAALAgAAqgIAAE4xMl9HTE9CQUxfX05fMTE2aXRhbml1bV9kZW1hbmdsZTI1VGVtcGxhdGVQYXJhbVF1YWxpZmllZEFyZ0UAAABAhAAAPKYAAAyIAAAAAAAA6KYAAAQCAAAFAgAABgIAAAcCAACrAgAACQIAAAoCAAALAgAArAIAAE4xMl9HTE9CQUxfX05fMTE2aXRhbml1bV9kZW1hbmdsZTEyRW5hYmxlSWZBdHRyRQAAAABAhAAAtKYAAAyIAAAAAAAAXKcAAAQCAAAFAgAABgIAAAcCAACtAgAACQIAAAoCAAALAgAArgIAAE4xMl9HTE9CQUxfX05fMTE2aXRhbml1bV9kZW1hbmdsZTIzRXhwbGljaXRPYmplY3RQYXJhbWV0ZXJFAECEAAAgpwAADIgAAAAAAADMpwAArwIAAAUCAACwAgAABwIAALECAACyAgAACgIAAAsCAACzAgAATjEyX0dMT0JBTF9fTl8xMTZpdGFuaXVtX2RlbWFuZ2xlMTZGdW5jdGlvbkVuY29kaW5nRQAAAABAhAAAlKcAAAyIAAAAAAAANKgAAAQCAAAFAgAABgIAAAcCAAC0AgAACQIAAAoCAAALAgAAtQIAAE4xMl9HTE9CQUxfX05fMTE2aXRhbml1bV9kZW1hbmdsZTlEb3RTdWZmaXhFAAAAAECEAAAEqAAADIgAAAAAAACgqAAABAIAAAUCAAAGAgAABwIAALYCAAAJAgAACgIAAAsCAAC3AgAATjEyX0dMT0JBTF9fTl8xMTZpdGFuaXVtX2RlbWFuZ2xlMTJOb2V4Y2VwdFNwZWNFAAAAAECEAABsqAAADIgAAAAAAAAUqQAABAIAAAUCAAAGAgAABwIAALgCAAAJAgAACgIAAAsCAAC5AgAATjEyX0dMT0JBTF9fTl8xMTZpdGFuaXVtX2RlbWFuZ2xlMjBEeW5hbWljRXhjZXB0aW9uU3BlY0UAAAAAQIQAANioAAAMiAAAAAAAAICpAAC6AgAABQIAALsCAAAHAgAAvAIAAL0CAAAKAgAACwIAAL4CAABOMTJfR0xPQkFMX19OXzExNml0YW5pdW1fZGVtYW5nbGUxMkZ1bmN0aW9uVHlwZUUAAAAAQIQAAEypAAAMiAAAAAAAAOypAAAEAgAABQIAAAYCAAAHAgAAvwIAAAkCAAAKAgAACwIAAMACAABOMTJfR0xPQkFMX19OXzExNml0YW5pdW1fZGVtYW5nbGUxM09iakNQcm90b05hbWVFAAAAQIQAALipAAAMiAAAAAAAAFyqAAAEAgAABQIAAAYCAAAHAgAAwQIAAAkCAAAKAgAACwIAAMICAABOMTJfR0xPQkFMX19OXzExNml0YW5pdW1fZGVtYW5nbGUxN1ZlbmRvckV4dFF1YWxUeXBlRQAAAECEAAAkqgAADIgAAAAAAADAqgAAwwIAAMQCAADFAgAABwIAAMYCAADHAgAACgIAAAsCAADIAgAATjEyX0dMT0JBTF9fTl8xMTZpdGFuaXVtX2RlbWFuZ2xlOFF1YWxUeXBlRQBAhAAAlKoAAAyIAAAAAAAALKsAAAQCAAAFAgAABgIAAAcCAADJAgAACQIAAAoCAAALAgAAygIAAE4xMl9HTE9CQUxfX05fMTE2aXRhbml1bV9kZW1hbmdsZTE1VHJhbnNmb3JtZWRUeXBlRQBAhAAA+KoAAAyIAAAAAAAAmKsAAAQCAAAFAgAABgIAAAcCAADLAgAACQIAAAoCAAALAgAAzAIAAE4xMl9HTE9CQUxfX05fMTE2aXRhbml1bV9kZW1hbmdsZTEyQmluYXJ5RlBUeXBlRQAAAABAhAAAZKsAAAyIAAAAAAAAAKwAAAQCAAAFAgAABgIAAAcCAADNAgAACQIAAAoCAAALAgAAzgIAAE4xMl9HTE9CQUxfX05fMTE2aXRhbml1bV9kZW1hbmdsZTEwQml0SW50VHlwZUUAAECEAADQqwAADIgAAAAAAAB0rAAABAIAAAUCAAAGAgAABwIAAM8CAAAJAgAACgIAAAsCAADQAgAATjEyX0dMT0JBTF9fTl8xMTZpdGFuaXVtX2RlbWFuZ2xlMjBQb3N0Zml4UXVhbGlmaWVkVHlwZUUAAAAAQIQAADisAAAMiAAAAAAAAOCsAAAEAgAABQIAAAYCAAAHAgAA0QIAAAkCAAAKAgAACwIAANICAABOMTJfR0xPQkFMX19OXzExNml0YW5pdW1fZGVtYW5nbGUxNVBpeGVsVmVjdG9yVHlwZUUAQIQAAKysAAAMiAAAAAAAAEitAAAEAgAABQIAAAYCAAAHAgAA0wIAAAkCAAAKAgAACwIAANQCAABOMTJfR0xPQkFMX19OXzExNml0YW5pdW1fZGVtYW5nbGUxMFZlY3RvclR5cGVFAABAhAAAGK0AAAyIAAAAAAAAsK0AANUCAADWAgAABgIAAAcCAADXAgAA2AIAAAoCAAALAgAA2QIAAE4xMl9HTE9CQUxfX05fMTE2aXRhbml1bV9kZW1hbmdsZTlBcnJheVR5cGVFAAAAAECEAACArQAADIgAAAAAAAAgrgAA2gIAAAUCAAAGAgAABwIAANsCAADcAgAACgIAAAsCAADdAgAATjEyX0dMT0JBTF9fTl8xMTZpdGFuaXVtX2RlbWFuZ2xlMTlQb2ludGVyVG9NZW1iZXJUeXBlRQBAhAAA6K0AAAyIAAAAAAAAlK4AAAQCAAAFAgAABgIAAAcCAADeAgAACQIAAAoCAAALAgAA3wIAAE4xMl9HTE9CQUxfX05fMTE2aXRhbml1bV9kZW1hbmdsZTIyRWxhYm9yYXRlZFR5cGVTcGVmVHlwZUUAAECEAABYrgAADIgAAAAAAAD8rgAA4AIAAAUCAAAGAgAABwIAAOECAADiAgAACgIAAAsCAADjAgAATjEyX0dMT0JBTF9fTl8xMTZpdGFuaXVtX2RlbWFuZ2xlMTFQb2ludGVyVHlwZUUAQIQAAMyuAAAMiAAAAAAAAGivAADkAgAABQIAAAYCAAAHAgAA5QIAAOYCAAAKAgAACwIAAOcCAABOMTJfR0xPQkFMX19OXzExNml0YW5pdW1fZGVtYW5nbGUxM1JlZmVyZW5jZVR5cGVFAAAAQIQAADSvAAAMiAAAYAoAALoPAAC6DwAAgQ0AAHMNAABkDQBBkN8CCwEFAEGc3wILAYMAQbTfAgsOhAAAAIUAAACItQAAAAQAQczfAgsBAQBB3N8CCwX/////CgBBoOACCzGQrwAAsMUBAARLAAAlbS8lZC8leQAAAAglSDolTTolUwAAAAjQgAAA9IAAAAAAAAAFAEHc4AILAYoAQfTgAgsKhAAAAIgAAACQwwBBjOECCwECAEGc4QILCP//////////AEHg4QILDlCwAADfAQAA4AEAAEwHALWwCARuYW1lAA0MaG5zd2xpYi53YXNtAbKqCOwHAA1fZW12YWxfZGVjcmVmARhfZW12YWxfZ2V0X21ldGhvZF9jYWxsZXICEl9lbXZhbF9jYWxsX21ldGhvZAMWX2VtdmFsX3J1bl9kZXN0cnVjdG9ycwQZX2VtYmluZF9yZWdpc3Rlcl9mdW5jdGlvbgUWX2VtYmluZF9yZWdpc3Rlcl9jbGFzcwYiX2VtYmluZF9yZWdpc3Rlcl9jbGFzc19jb25zdHJ1Y3RvcgcfX2VtYmluZF9yZWdpc3Rlcl9jbGFzc19mdW5jdGlvbgglX2VtYmluZF9yZWdpc3Rlcl9jbGFzc19jbGFzc19mdW5jdGlvbgkRX2VtdmFsX3Rha2VfdmFsdWUKDV9lbXZhbF9pbmNyZWYLEF9lbXZhbF9uZXdfYXJyYXkMEV9lbXZhbF9uZXdfb2JqZWN0DRJfZW12YWxfbmV3X2NzdHJpbmcOE19lbXZhbF9zZXRfcHJvcGVydHkPGGVtc2NyaXB0ZW5fYXNtX2NvbnN0X2ludBAKc3luY0lkYl9qcxEhX2VtdmFsX25ld19hcnJheV9mcm9tX21lbW9yeV92aWV3EhNfZW12YWxfZ2V0X3Byb3BlcnR5EwlfZW12YWxfYXMUDV9fYXNzZXJ0X2ZhaWwVFV9lbWJpbmRfcmVnaXN0ZXJfdm9pZBYVX2VtYmluZF9yZWdpc3Rlcl9ib29sFxhfZW1iaW5kX3JlZ2lzdGVyX2ludGVnZXIYFl9lbWJpbmRfcmVnaXN0ZXJfZmxvYXQZG19lbWJpbmRfcmVnaXN0ZXJfc3RkX3N0cmluZxocX2VtYmluZF9yZWdpc3Rlcl9zdGRfd3N0cmluZxsWX2VtYmluZF9yZWdpc3Rlcl9lbXZhbBwcX2VtYmluZF9yZWdpc3Rlcl9tZW1vcnlfdmlldx0VX2Vtc2NyaXB0ZW5fbWVtY3B5X2pzHg9fX3dhc2lfZmRfd3JpdGUfFmVtc2NyaXB0ZW5fcmVzaXplX2hlYXAgEF9fc3lzY2FsbF9vcGVuYXQhEV9fc3lzY2FsbF9mY250bDY0Ig9fX3N5c2NhbGxfaW9jdGwjDl9fd2FzaV9mZF9yZWFkJA9fX3dhc2lfZmRfY2xvc2UlGF9fd2FzaV9lbnZpcm9uX3NpemVzX2dldCYSX193YXNpX2Vudmlyb25fZ2V0JwpzdHJmdGltZV9sKBBfX3N5c2NhbGxfc3RhdDY0KQVhYm9ydCoiX190aHJvd19leGNlcHRpb25fd2l0aF9zdGFja190cmFjZS0RX193YXNtX2NhbGxfY3RvcnMuDV9fZ2V0VHlwZU5hbWUvFWVtYmluZF9pbml0X2J1aWx0aW4oKTAXX19jeHhfZ2xvYmFsX2FycmF5X2R0b3IxGV9fY3h4X2dsb2JhbF9hcnJheV9kdG9yLjQyGV9fY3h4X2dsb2JhbF9hcnJheV9kdG9yLjYzF2Vtc2NyaXB0ZW46OnZhbDo6fnZhbCgpNIABc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+OjpiYXNpY19zdHJpbmdbYWJpOm5lMTgwMTAwXTwwPihjaGFyIGNvbnN0Kik1gAFzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj46Ol9fdGhyb3dfbGVuZ3RoX2Vycm9yW2FiaTpuZTE4MDEwMF0oKSBjb25zdDYZX19jeHhfZ2xvYmFsX2FycmF5X2R0b3IuODcOc2V0SWRiZnNTeW5jZWQ4W2Vtc2NyaXB0ZW46Om5vcm1hbGl6ZVBvaW50c1B1cmUoc3RkOjpfXzI6OnZlY3RvcjxmbG9hdCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxmbG9hdD4+IGNvbnN0Jik5X3N0ZDo6X18yOjp2ZWN0b3I8ZmxvYXQsIHN0ZDo6X18yOjphbGxvY2F0b3I8ZmxvYXQ+Pjo6X190aHJvd19sZW5ndGhfZXJyb3JbYWJpOm5lMTgwMTAwXSgpIGNvbnN0OiFlbXNjcmlwdGVuOjplbWJpbmRfaW5pdF9obnN3bGliKCk7oQJlbXNjcmlwdGVuOjppbnRlcm5hbDo6SW52b2tlcjxzdGQ6Ol9fMjo6dmVjdG9yPGZsb2F0LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGZsb2F0Pj4sIHN0ZDo6X18yOjp2ZWN0b3I8ZmxvYXQsIHN0ZDo6X18yOjphbGxvY2F0b3I8ZmxvYXQ+PiBjb25zdCY+OjppbnZva2Uoc3RkOjpfXzI6OnZlY3RvcjxmbG9hdCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxmbG9hdD4+ICgqKShzdGQ6Ol9fMjo6dmVjdG9yPGZsb2F0LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGZsb2F0Pj4gY29uc3QmKSwgZW1zY3JpcHRlbjo6X0VNX1ZBTCopPFp2b2lkIGNvbnN0KiBlbXNjcmlwdGVuOjppbnRlcm5hbDo6Z2V0QWN0dWFsVHlwZTxlbXNjcmlwdGVuOjpMMlNwYWNlPihlbXNjcmlwdGVuOjpMMlNwYWNlKik9VHZvaWQgZW1zY3JpcHRlbjo6aW50ZXJuYWw6OnJhd19kZXN0cnVjdG9yPGVtc2NyaXB0ZW46OkwyU3BhY2U+KGVtc2NyaXB0ZW46OkwyU3BhY2UqKT6DAWVtc2NyaXB0ZW46OmludGVybmFsOjpJbnZva2VyPGVtc2NyaXB0ZW46OkwyU3BhY2UqLCB1bnNpZ25lZCBpbnQmJj46Omludm9rZShlbXNjcmlwdGVuOjpMMlNwYWNlKiAoKikodW5zaWduZWQgaW50JiYpLCB1bnNpZ25lZCBpbnQpP2plbXNjcmlwdGVuOjpMMlNwYWNlKiBlbXNjcmlwdGVuOjppbnRlcm5hbDo6b3BlcmF0b3JfbmV3PGVtc2NyaXB0ZW46OkwyU3BhY2UsIHVuc2lnbmVkIGludD4odW5zaWduZWQgaW50JiYpQJUBZW1zY3JpcHRlbjo6TDJTcGFjZTo6ZGlzdGFuY2Uoc3RkOjpfXzI6OnZlY3RvcjxmbG9hdCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxmbG9hdD4+IGNvbnN0Jiwgc3RkOjpfXzI6OnZlY3RvcjxmbG9hdCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxmbG9hdD4+IGNvbnN0JilBuQRlbXNjcmlwdGVuOjppbnRlcm5hbDo6TWV0aG9kSW52b2tlcjxmbG9hdCAoZW1zY3JpcHRlbjo6TDJTcGFjZTo6Kikoc3RkOjpfXzI6OnZlY3RvcjxmbG9hdCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxmbG9hdD4+IGNvbnN0Jiwgc3RkOjpfXzI6OnZlY3RvcjxmbG9hdCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxmbG9hdD4+IGNvbnN0JiksIGZsb2F0LCBlbXNjcmlwdGVuOjpMMlNwYWNlKiwgc3RkOjpfXzI6OnZlY3RvcjxmbG9hdCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxmbG9hdD4+IGNvbnN0Jiwgc3RkOjpfXzI6OnZlY3RvcjxmbG9hdCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxmbG9hdD4+IGNvbnN0Jj46Omludm9rZShmbG9hdCAoZW1zY3JpcHRlbjo6TDJTcGFjZTo6KiBjb25zdCYpKHN0ZDo6X18yOjp2ZWN0b3I8ZmxvYXQsIHN0ZDo6X18yOjphbGxvY2F0b3I8ZmxvYXQ+PiBjb25zdCYsIHN0ZDo6X18yOjp2ZWN0b3I8ZmxvYXQsIHN0ZDo6X18yOjphbGxvY2F0b3I8ZmxvYXQ+PiBjb25zdCYpLCBlbXNjcmlwdGVuOjpMMlNwYWNlKiwgZW1zY3JpcHRlbjo6X0VNX1ZBTCosIGVtc2NyaXB0ZW46Ol9FTV9WQUwqKUInZW1zY3JpcHRlbjo6TDJTcGFjZTo6Z2V0TnVtRGltZW5zaW9ucygpQ74BZW1zY3JpcHRlbjo6aW50ZXJuYWw6Ok1ldGhvZEludm9rZXI8dW5zaWduZWQgaW50IChlbXNjcmlwdGVuOjpMMlNwYWNlOjoqKSgpLCB1bnNpZ25lZCBpbnQsIGVtc2NyaXB0ZW46OkwyU3BhY2UqPjo6aW52b2tlKHVuc2lnbmVkIGludCAoZW1zY3JpcHRlbjo6TDJTcGFjZTo6KiBjb25zdCYpKCksIGVtc2NyaXB0ZW46OkwyU3BhY2UqKURudm9pZCBjb25zdCogZW1zY3JpcHRlbjo6aW50ZXJuYWw6OmdldEFjdHVhbFR5cGU8ZW1zY3JpcHRlbjo6SW5uZXJQcm9kdWN0U3BhY2U+KGVtc2NyaXB0ZW46OklubmVyUHJvZHVjdFNwYWNlKilFfmVtc2NyaXB0ZW46OklubmVyUHJvZHVjdFNwYWNlKiBlbXNjcmlwdGVuOjppbnRlcm5hbDo6b3BlcmF0b3JfbmV3PGVtc2NyaXB0ZW46OklubmVyUHJvZHVjdFNwYWNlLCB1bnNpZ25lZCBpbnQ+KHVuc2lnbmVkIGludCYmKUafAWVtc2NyaXB0ZW46OklubmVyUHJvZHVjdFNwYWNlOjpkaXN0YW5jZShzdGQ6Ol9fMjo6dmVjdG9yPGZsb2F0LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGZsb2F0Pj4gY29uc3QmLCBzdGQ6Ol9fMjo6dmVjdG9yPGZsb2F0LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGZsb2F0Pj4gY29uc3QmKUdydm9pZCBjb25zdCogZW1zY3JpcHRlbjo6aW50ZXJuYWw6OmdldEFjdHVhbFR5cGU8ZW1zY3JpcHRlbjo6Q3VzdG9tRmlsdGVyRnVuY3Rvcj4oZW1zY3JpcHRlbjo6Q3VzdG9tRmlsdGVyRnVuY3RvciopSGx2b2lkIGVtc2NyaXB0ZW46OmludGVybmFsOjpyYXdfZGVzdHJ1Y3RvcjxlbXNjcmlwdGVuOjpDdXN0b21GaWx0ZXJGdW5jdG9yPihlbXNjcmlwdGVuOjpDdXN0b21GaWx0ZXJGdW5jdG9yKilJqQFlbXNjcmlwdGVuOjppbnRlcm5hbDo6SW52b2tlcjxlbXNjcmlwdGVuOjpDdXN0b21GaWx0ZXJGdW5jdG9yKiwgZW1zY3JpcHRlbjo6dmFsJiY+OjppbnZva2UoZW1zY3JpcHRlbjo6Q3VzdG9tRmlsdGVyRnVuY3RvciogKCopKGVtc2NyaXB0ZW46OnZhbCYmKSwgZW1zY3JpcHRlbjo6X0VNX1ZBTCopSogBZW1zY3JpcHRlbjo6Q3VzdG9tRmlsdGVyRnVuY3RvciogZW1zY3JpcHRlbjo6aW50ZXJuYWw6Om9wZXJhdG9yX25ldzxlbXNjcmlwdGVuOjpDdXN0b21GaWx0ZXJGdW5jdG9yLCBlbXNjcmlwdGVuOjp2YWw+KGVtc2NyaXB0ZW46OnZhbCYmKUuOAmVtc2NyaXB0ZW46OmludGVybmFsOjpNZXRob2RJbnZva2VyPGJvb2wgKGVtc2NyaXB0ZW46OkN1c3RvbUZpbHRlckZ1bmN0b3I6OiopKHVuc2lnbmVkIGxvbmcpLCBib29sLCBlbXNjcmlwdGVuOjpDdXN0b21GaWx0ZXJGdW5jdG9yKiwgdW5zaWduZWQgbG9uZz46Omludm9rZShib29sIChlbXNjcmlwdGVuOjpDdXN0b21GaWx0ZXJGdW5jdG9yOjoqIGNvbnN0JikodW5zaWduZWQgbG9uZyksIGVtc2NyaXB0ZW46OkN1c3RvbUZpbHRlckZ1bmN0b3IqLCB1bnNpZ25lZCBsb25nKUxsdm9pZCBjb25zdCogZW1zY3JpcHRlbjo6aW50ZXJuYWw6OmdldEFjdHVhbFR5cGU8ZW1zY3JpcHRlbjo6QnJ1dGVmb3JjZVNlYXJjaD4oZW1zY3JpcHRlbjo6QnJ1dGVmb3JjZVNlYXJjaCopTWZ2b2lkIGVtc2NyaXB0ZW46OmludGVybmFsOjpyYXdfZGVzdHJ1Y3RvcjxlbXNjcmlwdGVuOjpCcnV0ZWZvcmNlU2VhcmNoPihlbXNjcmlwdGVuOjpCcnV0ZWZvcmNlU2VhcmNoKilO0ANlbXNjcmlwdGVuOjppbnRlcm5hbDo6SW52b2tlcjxlbXNjcmlwdGVuOjpCcnV0ZWZvcmNlU2VhcmNoKiwgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+JiYsIHVuc2lnbmVkIGludCYmPjo6aW52b2tlKGVtc2NyaXB0ZW46OkJydXRlZm9yY2VTZWFyY2gqICgqKShzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj4mJiwgdW5zaWduZWQgaW50JiYpLCBlbXNjcmlwdGVuOjppbnRlcm5hbDo6QmluZGluZ1R5cGU8c3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+LCB2b2lkPjo6J3VubmFtZWQnKiwgdW5zaWduZWQgaW50KU+qAmVtc2NyaXB0ZW46OkJydXRlZm9yY2VTZWFyY2gqIGVtc2NyaXB0ZW46OmludGVybmFsOjpvcGVyYXRvcl9uZXc8ZW1zY3JpcHRlbjo6QnJ1dGVmb3JjZVNlYXJjaCwgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+LCB1bnNpZ25lZCBpbnQ+KHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiYmLCB1bnNpZ25lZCBpbnQmJilQNWVtc2NyaXB0ZW46OkJydXRlZm9yY2VTZWFyY2g6OmluaXRJbmRleCh1bnNpZ25lZCBpbnQpUf4BZW1zY3JpcHRlbjo6aW50ZXJuYWw6Ok1ldGhvZEludm9rZXI8dm9pZCAoZW1zY3JpcHRlbjo6QnJ1dGVmb3JjZVNlYXJjaDo6KikodW5zaWduZWQgaW50KSwgdm9pZCwgZW1zY3JpcHRlbjo6QnJ1dGVmb3JjZVNlYXJjaCosIHVuc2lnbmVkIGludD46Omludm9rZSh2b2lkIChlbXNjcmlwdGVuOjpCcnV0ZWZvcmNlU2VhcmNoOjoqIGNvbnN0JikodW5zaWduZWQgaW50KSwgZW1zY3JpcHRlbjo6QnJ1dGVmb3JjZVNlYXJjaCosIHVuc2lnbmVkIGludClSMmVtc2NyaXB0ZW46OkJydXRlZm9yY2VTZWFyY2g6OmlzSW5kZXhJbml0aWFsaXplZCgpU+sBZW1zY3JpcHRlbjo6aW50ZXJuYWw6Ok1ldGhvZEludm9rZXI8ZW1zY3JpcHRlbjo6dmFsIChlbXNjcmlwdGVuOjpCcnV0ZWZvcmNlU2VhcmNoOjoqKSgpLCBlbXNjcmlwdGVuOjp2YWwsIGVtc2NyaXB0ZW46OkJydXRlZm9yY2VTZWFyY2gqPjo6aW52b2tlKGVtc2NyaXB0ZW46OnZhbCAoZW1zY3JpcHRlbjo6QnJ1dGVmb3JjZVNlYXJjaDo6KiBjb25zdCYpKCksIGVtc2NyaXB0ZW46OkJydXRlZm9yY2VTZWFyY2gqKVSEAWVtc2NyaXB0ZW46OkJydXRlZm9yY2VTZWFyY2g6OnJlYWRJbmRleChzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj4gY29uc3QmKVXoBGVtc2NyaXB0ZW46OmludGVybmFsOjpNZXRob2RJbnZva2VyPHZvaWQgKGVtc2NyaXB0ZW46OkJydXRlZm9yY2VTZWFyY2g6OiopKHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiBjb25zdCYpLCB2b2lkLCBlbXNjcmlwdGVuOjpCcnV0ZWZvcmNlU2VhcmNoKiwgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+IGNvbnN0Jj46Omludm9rZSh2b2lkIChlbXNjcmlwdGVuOjpCcnV0ZWZvcmNlU2VhcmNoOjoqIGNvbnN0Jikoc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+IGNvbnN0JiksIGVtc2NyaXB0ZW46OkJydXRlZm9yY2VTZWFyY2gqLCBlbXNjcmlwdGVuOjppbnRlcm5hbDo6QmluZGluZ1R5cGU8c3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+LCB2b2lkPjo6J3VubmFtZWQnKilWhQFlbXNjcmlwdGVuOjpCcnV0ZWZvcmNlU2VhcmNoOjp3cml0ZUluZGV4KHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiBjb25zdCYpV3BlbXNjcmlwdGVuOjpCcnV0ZWZvcmNlU2VhcmNoOjphZGRQb2ludChzdGQ6Ol9fMjo6dmVjdG9yPGZsb2F0LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGZsb2F0Pj4gY29uc3QmLCB1bnNpZ25lZCBpbnQpWMgDZW1zY3JpcHRlbjo6aW50ZXJuYWw6Ok1ldGhvZEludm9rZXI8dm9pZCAoZW1zY3JpcHRlbjo6QnJ1dGVmb3JjZVNlYXJjaDo6Kikoc3RkOjpfXzI6OnZlY3RvcjxmbG9hdCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxmbG9hdD4+IGNvbnN0JiwgdW5zaWduZWQgaW50KSwgdm9pZCwgZW1zY3JpcHRlbjo6QnJ1dGVmb3JjZVNlYXJjaCosIHN0ZDo6X18yOjp2ZWN0b3I8ZmxvYXQsIHN0ZDo6X18yOjphbGxvY2F0b3I8ZmxvYXQ+PiBjb25zdCYsIHVuc2lnbmVkIGludD46Omludm9rZSh2b2lkIChlbXNjcmlwdGVuOjpCcnV0ZWZvcmNlU2VhcmNoOjoqIGNvbnN0Jikoc3RkOjpfXzI6OnZlY3RvcjxmbG9hdCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxmbG9hdD4+IGNvbnN0JiwgdW5zaWduZWQgaW50KSwgZW1zY3JpcHRlbjo6QnJ1dGVmb3JjZVNlYXJjaCosIGVtc2NyaXB0ZW46Ol9FTV9WQUwqLCB1bnNpZ25lZCBpbnQpWTdlbXNjcmlwdGVuOjpCcnV0ZWZvcmNlU2VhcmNoOjpyZW1vdmVQb2ludCh1bnNpZ25lZCBpbnQpWoIBZW1zY3JpcHRlbjo6QnJ1dGVmb3JjZVNlYXJjaDo6c2VhcmNoS25uKHN0ZDo6X18yOjp2ZWN0b3I8ZmxvYXQsIHN0ZDo6X18yOjphbGxvY2F0b3I8ZmxvYXQ+PiBjb25zdCYsIHVuc2lnbmVkIGludCwgZW1zY3JpcHRlbjo6dmFsKVuyBGVtc2NyaXB0ZW46OmludGVybmFsOjpNZXRob2RJbnZva2VyPGVtc2NyaXB0ZW46OnZhbCAoZW1zY3JpcHRlbjo6QnJ1dGVmb3JjZVNlYXJjaDo6Kikoc3RkOjpfXzI6OnZlY3RvcjxmbG9hdCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxmbG9hdD4+IGNvbnN0JiwgdW5zaWduZWQgaW50LCBlbXNjcmlwdGVuOjp2YWwpLCBlbXNjcmlwdGVuOjp2YWwsIGVtc2NyaXB0ZW46OkJydXRlZm9yY2VTZWFyY2gqLCBzdGQ6Ol9fMjo6dmVjdG9yPGZsb2F0LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGZsb2F0Pj4gY29uc3QmLCB1bnNpZ25lZCBpbnQsIGVtc2NyaXB0ZW46OnZhbD46Omludm9rZShlbXNjcmlwdGVuOjp2YWwgKGVtc2NyaXB0ZW46OkJydXRlZm9yY2VTZWFyY2g6OiogY29uc3QmKShzdGQ6Ol9fMjo6dmVjdG9yPGZsb2F0LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGZsb2F0Pj4gY29uc3QmLCB1bnNpZ25lZCBpbnQsIGVtc2NyaXB0ZW46OnZhbCksIGVtc2NyaXB0ZW46OkJydXRlZm9yY2VTZWFyY2gqLCBlbXNjcmlwdGVuOjpfRU1fVkFMKiwgdW5zaWduZWQgaW50LCBlbXNjcmlwdGVuOjpfRU1fVkFMKilcLmVtc2NyaXB0ZW46OkJydXRlZm9yY2VTZWFyY2g6OmdldE1heEVsZW1lbnRzKCldL2Vtc2NyaXB0ZW46OkJydXRlZm9yY2VTZWFyY2g6OmdldEN1cnJlbnRDb3VudCgpXmp2b2lkIGNvbnN0KiBlbXNjcmlwdGVuOjppbnRlcm5hbDo6Z2V0QWN0dWFsVHlwZTxlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1c+KGVtc2NyaXB0ZW46OkhpZXJhcmNoaWNhbE5TVyopX2R2b2lkIGVtc2NyaXB0ZW46OmludGVybmFsOjpyYXdfZGVzdHJ1Y3RvcjxlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1c+KGVtc2NyaXB0ZW46OkhpZXJhcmNoaWNhbE5TVyopYJ0GZW1zY3JpcHRlbjo6aW50ZXJuYWw6Okludm9rZXI8ZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXKiwgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+IGNvbnN0JiwgdW5zaWduZWQgaW50JiYsIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiBjb25zdCY+OjppbnZva2UoZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXKiAoKikoc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+IGNvbnN0JiwgdW5zaWduZWQgaW50JiYsIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiBjb25zdCYpLCBlbXNjcmlwdGVuOjppbnRlcm5hbDo6QmluZGluZ1R5cGU8c3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+LCB2b2lkPjo6J3VubmFtZWQnKiwgdW5zaWduZWQgaW50LCBlbXNjcmlwdGVuOjppbnRlcm5hbDo6QmluZGluZ1R5cGU8c3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+LCB2b2lkPjo6J3VubmFtZWQnKilh7gNlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1cqIGVtc2NyaXB0ZW46OmludGVybmFsOjpvcGVyYXRvcl9uZXc8ZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXLCBzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj4gY29uc3QmLCB1bnNpZ25lZCBpbnQsIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiBjb25zdCY+KHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiBjb25zdCYsIHVuc2lnbmVkIGludCYmLCBzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj4gY29uc3QmKWJeZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXOjppbml0SW5kZXgodW5zaWduZWQgaW50LCB1bnNpZ25lZCBpbnQsIHVuc2lnbmVkIGludCwgdW5zaWduZWQgaW50KWOiA2Vtc2NyaXB0ZW46OmludGVybmFsOjpNZXRob2RJbnZva2VyPHZvaWQgKGVtc2NyaXB0ZW46OkhpZXJhcmNoaWNhbE5TVzo6KikodW5zaWduZWQgaW50LCB1bnNpZ25lZCBpbnQsIHVuc2lnbmVkIGludCwgdW5zaWduZWQgaW50KSwgdm9pZCwgZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXKiwgdW5zaWduZWQgaW50LCB1bnNpZ25lZCBpbnQsIHVuc2lnbmVkIGludCwgdW5zaWduZWQgaW50Pjo6aW52b2tlKHZvaWQgKGVtc2NyaXB0ZW46OkhpZXJhcmNoaWNhbE5TVzo6KiBjb25zdCYpKHVuc2lnbmVkIGludCwgdW5zaWduZWQgaW50LCB1bnNpZ25lZCBpbnQsIHVuc2lnbmVkIGludCksIGVtc2NyaXB0ZW46OkhpZXJhcmNoaWNhbE5TVyosIHVuc2lnbmVkIGludCwgdW5zaWduZWQgaW50LCB1bnNpZ25lZCBpbnQsIHVuc2lnbmVkIGludClkkQFlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1c6OnJlYWRJbmRleChzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj4gY29uc3QmLCB1bnNpZ25lZCBpbnQpZZwFZW1zY3JpcHRlbjo6aW50ZXJuYWw6Ok1ldGhvZEludm9rZXI8dm9pZCAoZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXOjoqKShzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj4gY29uc3QmLCB1bnNpZ25lZCBpbnQpLCB2b2lkLCBlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1cqLCBzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj4gY29uc3QmLCB1bnNpZ25lZCBpbnQ+OjppbnZva2Uodm9pZCAoZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXOjoqIGNvbnN0Jikoc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+IGNvbnN0JiwgdW5zaWduZWQgaW50KSwgZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXKiwgZW1zY3JpcHRlbjo6aW50ZXJuYWw6OkJpbmRpbmdUeXBlPHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+Piwgdm9pZD46Oid1bm5hbWVkJyosIHVuc2lnbmVkIGludClmhAFlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1c6OndyaXRlSW5kZXgoc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+IGNvbnN0JilnNmVtc2NyaXB0ZW46OkhpZXJhcmNoaWNhbE5TVzo6cmVzaXplSW5kZXgodW5zaWduZWQgaW50KWgzZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXOjpnZXRQb2ludCh1bnNpZ25lZCBpbnQpaZsCZW1zY3JpcHRlbjo6aW50ZXJuYWw6Ok1ldGhvZEludm9rZXI8ZW1zY3JpcHRlbjo6dmFsIChlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1c6OiopKHVuc2lnbmVkIGludCksIGVtc2NyaXB0ZW46OnZhbCwgZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXKiwgdW5zaWduZWQgaW50Pjo6aW52b2tlKGVtc2NyaXB0ZW46OnZhbCAoZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXOjoqIGNvbnN0JikodW5zaWduZWQgaW50KSwgZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXKiwgdW5zaWduZWQgaW50KWp1ZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXOjphZGRQb2ludChzdGQ6Ol9fMjo6dmVjdG9yPGZsb2F0LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGZsb2F0Pj4gY29uc3QmLCB1bnNpZ25lZCBpbnQsIGJvb2wpa9wDZW1zY3JpcHRlbjo6aW50ZXJuYWw6Ok1ldGhvZEludm9rZXI8dm9pZCAoZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXOjoqKShzdGQ6Ol9fMjo6dmVjdG9yPGZsb2F0LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGZsb2F0Pj4gY29uc3QmLCB1bnNpZ25lZCBpbnQsIGJvb2wpLCB2b2lkLCBlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1cqLCBzdGQ6Ol9fMjo6dmVjdG9yPGZsb2F0LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGZsb2F0Pj4gY29uc3QmLCB1bnNpZ25lZCBpbnQsIGJvb2w+OjppbnZva2Uodm9pZCAoZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXOjoqIGNvbnN0Jikoc3RkOjpfXzI6OnZlY3RvcjxmbG9hdCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxmbG9hdD4+IGNvbnN0JiwgdW5zaWduZWQgaW50LCBib29sKSwgZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXKiwgZW1zY3JpcHRlbjo6X0VNX1ZBTCosIHVuc2lnbmVkIGludCwgYm9vbClsjgJlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1c6OmFkZFBvaW50cyhzdGQ6Ol9fMjo6dmVjdG9yPHN0ZDo6X18yOjp2ZWN0b3I8ZmxvYXQsIHN0ZDo6X18yOjphbGxvY2F0b3I8ZmxvYXQ+Piwgc3RkOjpfXzI6OmFsbG9jYXRvcjxzdGQ6Ol9fMjo6dmVjdG9yPGZsb2F0LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGZsb2F0Pj4+PiBjb25zdCYsIHN0ZDo6X18yOjp2ZWN0b3I8dW5zaWduZWQgaW50LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHVuc2lnbmVkIGludD4+IGNvbnN0JiwgYm9vbCltrAdlbXNjcmlwdGVuOjppbnRlcm5hbDo6TWV0aG9kSW52b2tlcjx2b2lkIChlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1c6OiopKHN0ZDo6X18yOjp2ZWN0b3I8c3RkOjpfXzI6OnZlY3RvcjxmbG9hdCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxmbG9hdD4+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHN0ZDo6X18yOjp2ZWN0b3I8ZmxvYXQsIHN0ZDo6X18yOjphbGxvY2F0b3I8ZmxvYXQ+Pj4+IGNvbnN0Jiwgc3RkOjpfXzI6OnZlY3Rvcjx1bnNpZ25lZCBpbnQsIHN0ZDo6X18yOjphbGxvY2F0b3I8dW5zaWduZWQgaW50Pj4gY29uc3QmLCBib29sKSwgdm9pZCwgZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXKiwgc3RkOjpfXzI6OnZlY3RvcjxzdGQ6Ol9fMjo6dmVjdG9yPGZsb2F0LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGZsb2F0Pj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8c3RkOjpfXzI6OnZlY3RvcjxmbG9hdCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxmbG9hdD4+Pj4gY29uc3QmLCBzdGQ6Ol9fMjo6dmVjdG9yPHVuc2lnbmVkIGludCwgc3RkOjpfXzI6OmFsbG9jYXRvcjx1bnNpZ25lZCBpbnQ+PiBjb25zdCYsIGJvb2w+OjppbnZva2Uodm9pZCAoZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXOjoqIGNvbnN0Jikoc3RkOjpfXzI6OnZlY3RvcjxzdGQ6Ol9fMjo6dmVjdG9yPGZsb2F0LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGZsb2F0Pj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8c3RkOjpfXzI6OnZlY3RvcjxmbG9hdCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxmbG9hdD4+Pj4gY29uc3QmLCBzdGQ6Ol9fMjo6dmVjdG9yPHVuc2lnbmVkIGludCwgc3RkOjpfXzI6OmFsbG9jYXRvcjx1bnNpZ25lZCBpbnQ+PiBjb25zdCYsIGJvb2wpLCBlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1cqLCBlbXNjcmlwdGVuOjpfRU1fVkFMKiwgZW1zY3JpcHRlbjo6X0VNX1ZBTCosIGJvb2wpbsMBZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXOjphZGRJdGVtcyhzdGQ6Ol9fMjo6dmVjdG9yPHN0ZDo6X18yOjp2ZWN0b3I8ZmxvYXQsIHN0ZDo6X18yOjphbGxvY2F0b3I8ZmxvYXQ+Piwgc3RkOjpfXzI6OmFsbG9jYXRvcjxzdGQ6Ol9fMjo6dmVjdG9yPGZsb2F0LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGZsb2F0Pj4+PiBjb25zdCYsIGJvb2wpb+8GZW1zY3JpcHRlbjo6aW50ZXJuYWw6Ok1ldGhvZEludm9rZXI8c3RkOjpfXzI6OnZlY3Rvcjx1bnNpZ25lZCBpbnQsIHN0ZDo6X18yOjphbGxvY2F0b3I8dW5zaWduZWQgaW50Pj4gKGVtc2NyaXB0ZW46OkhpZXJhcmNoaWNhbE5TVzo6Kikoc3RkOjpfXzI6OnZlY3RvcjxzdGQ6Ol9fMjo6dmVjdG9yPGZsb2F0LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGZsb2F0Pj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8c3RkOjpfXzI6OnZlY3RvcjxmbG9hdCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxmbG9hdD4+Pj4gY29uc3QmLCBib29sKSwgc3RkOjpfXzI6OnZlY3Rvcjx1bnNpZ25lZCBpbnQsIHN0ZDo6X18yOjphbGxvY2F0b3I8dW5zaWduZWQgaW50Pj4sIGVtc2NyaXB0ZW46OkhpZXJhcmNoaWNhbE5TVyosIHN0ZDo6X18yOjp2ZWN0b3I8c3RkOjpfXzI6OnZlY3RvcjxmbG9hdCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxmbG9hdD4+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHN0ZDo6X18yOjp2ZWN0b3I8ZmxvYXQsIHN0ZDo6X18yOjphbGxvY2F0b3I8ZmxvYXQ+Pj4+IGNvbnN0JiwgYm9vbD46Omludm9rZShzdGQ6Ol9fMjo6dmVjdG9yPHVuc2lnbmVkIGludCwgc3RkOjpfXzI6OmFsbG9jYXRvcjx1bnNpZ25lZCBpbnQ+PiAoZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXOjoqIGNvbnN0Jikoc3RkOjpfXzI6OnZlY3RvcjxzdGQ6Ol9fMjo6dmVjdG9yPGZsb2F0LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGZsb2F0Pj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8c3RkOjpfXzI6OnZlY3RvcjxmbG9hdCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxmbG9hdD4+Pj4gY29uc3QmLCBib29sKSwgZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXKiwgZW1zY3JpcHRlbjo6X0VNX1ZBTCosIGJvb2wpcCxlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1c6OmdldFVzZWRMYWJlbHMoKXH9AmVtc2NyaXB0ZW46OmludGVybmFsOjpNZXRob2RJbnZva2VyPHN0ZDo6X18yOjp2ZWN0b3I8dW5zaWduZWQgaW50LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHVuc2lnbmVkIGludD4+IChlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1c6OiopKCksIHN0ZDo6X18yOjp2ZWN0b3I8dW5zaWduZWQgaW50LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHVuc2lnbmVkIGludD4+LCBlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1cqPjo6aW52b2tlKHN0ZDo6X18yOjp2ZWN0b3I8dW5zaWduZWQgaW50LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHVuc2lnbmVkIGludD4+IChlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1c6OiogY29uc3QmKSgpLCBlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1cqKXIvZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXOjpnZXREZWxldGVkTGFiZWxzKClzLWVtc2NyaXB0ZW46OkhpZXJhcmNoaWNhbE5TVzo6Z2V0TWF4RWxlbWVudHMoKXQ1ZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXOjptYXJrRGVsZXRlKHVuc2lnbmVkIGludCl1dmVtc2NyaXB0ZW46OkhpZXJhcmNoaWNhbE5TVzo6bWFya0RlbGV0ZUl0ZW1zKHN0ZDo6X18yOjp2ZWN0b3I8dW5zaWduZWQgaW50LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHVuc2lnbmVkIGludD4+IGNvbnN0Jil2tgNlbXNjcmlwdGVuOjppbnRlcm5hbDo6TWV0aG9kSW52b2tlcjx2b2lkIChlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1c6OiopKHN0ZDo6X18yOjp2ZWN0b3I8dW5zaWduZWQgaW50LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHVuc2lnbmVkIGludD4+IGNvbnN0JiksIHZvaWQsIGVtc2NyaXB0ZW46OkhpZXJhcmNoaWNhbE5TVyosIHN0ZDo6X18yOjp2ZWN0b3I8dW5zaWduZWQgaW50LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHVuc2lnbmVkIGludD4+IGNvbnN0Jj46Omludm9rZSh2b2lkIChlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1c6OiogY29uc3QmKShzdGQ6Ol9fMjo6dmVjdG9yPHVuc2lnbmVkIGludCwgc3RkOjpfXzI6OmFsbG9jYXRvcjx1bnNpZ25lZCBpbnQ+PiBjb25zdCYpLCBlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1cqLCBlbXNjcmlwdGVuOjpfRU1fVkFMKil3N2Vtc2NyaXB0ZW46OkhpZXJhcmNoaWNhbE5TVzo6dW5tYXJrRGVsZXRlKHVuc2lnbmVkIGludCl4NGVtc2NyaXB0ZW46OkhpZXJhcmNoaWNhbE5TVzo6Z2V0Q3VycmVudENvdW50KCkgY29uc3R5MGVtc2NyaXB0ZW46OkhpZXJhcmNoaWNhbE5TVzo6Z2V0RWZTZWFyY2goKSBjb25zdHo2ZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXOjpzZXRFZlNlYXJjaCh1bnNpZ25lZCBpbnQpe4EBZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXOjpzZWFyY2hLbm4oc3RkOjpfXzI6OnZlY3RvcjxmbG9hdCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxmbG9hdD4+IGNvbnN0JiwgdW5zaWduZWQgaW50LCBlbXNjcmlwdGVuOjp2YWwpfEdlbXNjcmlwdGVuOjppbnRlcm5hbDo6SW52b2tlcjx2b2lkLCBib29sPjo6aW52b2tlKHZvaWQgKCopKGJvb2wpLCBib29sKX2CAXZvaWQgY29uc3QqIGVtc2NyaXB0ZW46OmludGVybmFsOjpnZXRBY3R1YWxUeXBlPGVtc2NyaXB0ZW46OkVtc2NyaXB0ZW5GaWxlU3lzdGVtTWFuYWdlcj4oZW1zY3JpcHRlbjo6RW1zY3JpcHRlbkZpbGVTeXN0ZW1NYW5hZ2VyKil+fHZvaWQgZW1zY3JpcHRlbjo6aW50ZXJuYWw6OnJhd19kZXN0cnVjdG9yPGVtc2NyaXB0ZW46OkVtc2NyaXB0ZW5GaWxlU3lzdGVtTWFuYWdlcj4oZW1zY3JpcHRlbjo6RW1zY3JpcHRlbkZpbGVTeXN0ZW1NYW5hZ2VyKil/f2Vtc2NyaXB0ZW46OmludGVybmFsOjpJbnZva2VyPGVtc2NyaXB0ZW46OkVtc2NyaXB0ZW5GaWxlU3lzdGVtTWFuYWdlcio+OjppbnZva2UoZW1zY3JpcHRlbjo6RW1zY3JpcHRlbkZpbGVTeXN0ZW1NYW5hZ2VyKiAoKikoKSmAAXZlbXNjcmlwdGVuOjpFbXNjcmlwdGVuRmlsZVN5c3RlbU1hbmFnZXIqIGVtc2NyaXB0ZW46OmludGVybmFsOjpvcGVyYXRvcl9uZXc8ZW1zY3JpcHRlbjo6RW1zY3JpcHRlbkZpbGVTeXN0ZW1NYW5hZ2VyPigpgQH6AmVtc2NyaXB0ZW46OmludGVybmFsOjpJbnZva2VyPHZvaWQsIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiBjb25zdCY+OjppbnZva2Uodm9pZCAoKikoc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+IGNvbnN0JiksIGVtc2NyaXB0ZW46OmludGVybmFsOjpCaW5kaW5nVHlwZTxzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj4sIHZvaWQ+OjondW5uYW1lZCcqKYIBmgFlbXNjcmlwdGVuOjpFbXNjcmlwdGVuRmlsZVN5c3RlbU1hbmFnZXI6OmluaXRpYWxpemVGaWxlU3lzdGVtKHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiBjb25zdCYpgwE4ZW1zY3JpcHRlbjo6RW1zY3JpcHRlbkZpbGVTeXN0ZW1NYW5hZ2VyOjppc0luaXRpYWxpemVkKCmEAX9lbXNjcmlwdGVuOjppbnRlcm5hbDo6SW52b2tlcjx2b2lkLCBib29sLCBlbXNjcmlwdGVuOjp2YWw+OjppbnZva2Uodm9pZCAoKikoYm9vbCwgZW1zY3JpcHRlbjo6dmFsKSwgYm9vbCwgZW1zY3JpcHRlbjo6X0VNX1ZBTCophQFGZW1zY3JpcHRlbjo6RW1zY3JpcHRlbkZpbGVTeXN0ZW1NYW5hZ2VyOjpzeW5jRlMoYm9vbCwgZW1zY3JpcHRlbjo6dmFsKYYBO2Vtc2NyaXB0ZW46OkVtc2NyaXB0ZW5GaWxlU3lzdGVtTWFuYWdlcjo6c2V0RGVidWdMb2dzKGJvb2wphwEzZW1zY3JpcHRlbjo6RW1zY3JpcHRlbkZpbGVTeXN0ZW1NYW5hZ2VyOjppc1N5bmNlZCgpiAH6AmVtc2NyaXB0ZW46OmludGVybmFsOjpJbnZva2VyPGJvb2wsIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiBjb25zdCY+OjppbnZva2UoYm9vbCAoKikoc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+IGNvbnN0JiksIGVtc2NyaXB0ZW46OmludGVybmFsOjpCaW5kaW5nVHlwZTxzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj4sIHZvaWQ+OjondW5uYW1lZCcqKYkBlQFlbXNjcmlwdGVuOjpFbXNjcmlwdGVuRmlsZVN5c3RlbU1hbmFnZXI6OmNoZWNrRmlsZUV4aXN0cyhzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj4gY29uc3QmKYoBYmhuc3dsaWI6OkJydXRlZm9yY2VTZWFyY2g8ZmxvYXQ+OjpCcnV0ZWZvcmNlU2VhcmNoKGhuc3dsaWI6OlNwYWNlSW50ZXJmYWNlPGZsb2F0PiosIHVuc2lnbmVkIGxvbmcpiwGpAWhuc3dsaWI6OkJydXRlZm9yY2VTZWFyY2g8ZmxvYXQ+Ojpsb2FkSW5kZXgoc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+IGNvbnN0JiwgaG5zd2xpYjo6U3BhY2VJbnRlcmZhY2U8ZmxvYXQ+KimMAeABc3RkOjpfXzI6OnVub3JkZXJlZF9tYXA8dW5zaWduZWQgbG9uZywgdW5zaWduZWQgbG9uZywgc3RkOjpfXzI6Omhhc2g8dW5zaWduZWQgbG9uZz4sIHN0ZDo6X18yOjplcXVhbF90bzx1bnNpZ25lZCBsb25nPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxzdGQ6Ol9fMjo6cGFpcjx1bnNpZ25lZCBsb25nIGNvbnN0LCB1bnNpZ25lZCBsb25nPj4+Ojp+dW5vcmRlcmVkX21hcFthYmk6bmUxODAxMDBdKCmNAdoBc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+OjpmaW5kW2FiaTpuZTE4MDEwMF0oc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+IGNvbnN0JiwgdW5zaWduZWQgbG9uZykgY29uc3SOAZoHc3RkOjpfXzI6OnBhaXI8c3RkOjpfXzI6Ol9faGFzaF9pdGVyYXRvcjxzdGQ6Ol9fMjo6X19oYXNoX25vZGU8c3RkOjpfXzI6Ol9faGFzaF92YWx1ZV90eXBlPHVuc2lnbmVkIGxvbmcsIHVuc2lnbmVkIGxvbmc+LCB2b2lkKj4qPiwgYm9vbD4gc3RkOjpfXzI6Ol9faGFzaF90YWJsZTxzdGQ6Ol9fMjo6X19oYXNoX3ZhbHVlX3R5cGU8dW5zaWduZWQgbG9uZywgdW5zaWduZWQgbG9uZz4sIHN0ZDo6X18yOjpfX3Vub3JkZXJlZF9tYXBfaGFzaGVyPHVuc2lnbmVkIGxvbmcsIHN0ZDo6X18yOjpfX2hhc2hfdmFsdWVfdHlwZTx1bnNpZ25lZCBsb25nLCB1bnNpZ25lZCBsb25nPiwgc3RkOjpfXzI6Omhhc2g8dW5zaWduZWQgbG9uZz4sIHN0ZDo6X18yOjplcXVhbF90bzx1bnNpZ25lZCBsb25nPiwgdHJ1ZT4sIHN0ZDo6X18yOjpfX3Vub3JkZXJlZF9tYXBfZXF1YWw8dW5zaWduZWQgbG9uZywgc3RkOjpfXzI6Ol9faGFzaF92YWx1ZV90eXBlPHVuc2lnbmVkIGxvbmcsIHVuc2lnbmVkIGxvbmc+LCBzdGQ6Ol9fMjo6ZXF1YWxfdG88dW5zaWduZWQgbG9uZz4sIHN0ZDo6X18yOjpoYXNoPHVuc2lnbmVkIGxvbmc+LCB0cnVlPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxzdGQ6Ol9fMjo6X19oYXNoX3ZhbHVlX3R5cGU8dW5zaWduZWQgbG9uZywgdW5zaWduZWQgbG9uZz4+Pjo6X19lbXBsYWNlX3VuaXF1ZV9rZXlfYXJnczx1bnNpZ25lZCBsb25nLCBzdGQ6Ol9fMjo6cGllY2V3aXNlX2NvbnN0cnVjdF90IGNvbnN0Jiwgc3RkOjpfXzI6OnR1cGxlPHVuc2lnbmVkIGxvbmcgY29uc3QmPiwgc3RkOjpfXzI6OnR1cGxlPD4+KHVuc2lnbmVkIGxvbmcgY29uc3QmLCBzdGQ6Ol9fMjo6cGllY2V3aXNlX2NvbnN0cnVjdF90IGNvbnN0Jiwgc3RkOjpfXzI6OnR1cGxlPHVuc2lnbmVkIGxvbmcgY29uc3QmPiYmLCBzdGQ6Ol9fMjo6dHVwbGU8PiYmKY8BywR1bnNpZ25lZCBsb25nIHN0ZDo6X18yOjpfX2hhc2hfdGFibGU8c3RkOjpfXzI6Ol9faGFzaF92YWx1ZV90eXBlPHVuc2lnbmVkIGxvbmcsIHVuc2lnbmVkIGxvbmc+LCBzdGQ6Ol9fMjo6X191bm9yZGVyZWRfbWFwX2hhc2hlcjx1bnNpZ25lZCBsb25nLCBzdGQ6Ol9fMjo6X19oYXNoX3ZhbHVlX3R5cGU8dW5zaWduZWQgbG9uZywgdW5zaWduZWQgbG9uZz4sIHN0ZDo6X18yOjpoYXNoPHVuc2lnbmVkIGxvbmc+LCBzdGQ6Ol9fMjo6ZXF1YWxfdG88dW5zaWduZWQgbG9uZz4sIHRydWU+LCBzdGQ6Ol9fMjo6X191bm9yZGVyZWRfbWFwX2VxdWFsPHVuc2lnbmVkIGxvbmcsIHN0ZDo6X18yOjpfX2hhc2hfdmFsdWVfdHlwZTx1bnNpZ25lZCBsb25nLCB1bnNpZ25lZCBsb25nPiwgc3RkOjpfXzI6OmVxdWFsX3RvPHVuc2lnbmVkIGxvbmc+LCBzdGQ6Ol9fMjo6aGFzaDx1bnNpZ25lZCBsb25nPiwgdHJ1ZT4sIHN0ZDo6X18yOjphbGxvY2F0b3I8c3RkOjpfXzI6Ol9faGFzaF92YWx1ZV90eXBlPHVuc2lnbmVkIGxvbmcsIHVuc2lnbmVkIGxvbmc+Pj46Ol9fZXJhc2VfdW5pcXVlPHVuc2lnbmVkIGxvbmc+KHVuc2lnbmVkIGxvbmcgY29uc3QmKZABQnN0ZDo6aW52YWxpZF9hcmd1bWVudDo6aW52YWxpZF9hcmd1bWVudFthYmk6bmUxODAxMDBdKGNoYXIgY29uc3QqKZEBP3ZvaWQgZW1zY3JpcHRlbjo6dmFsOjpzZXQ8aW50LCBmbG9hdD4oaW50IGNvbnN0JiwgZmxvYXQgY29uc3QmKZIBT3ZvaWQgZW1zY3JpcHRlbjo6dmFsOjpzZXQ8aW50LCB1bnNpZ25lZCBsb25nPihpbnQgY29uc3QmLCB1bnNpZ25lZCBsb25nIGNvbnN0JimTAdUDdm9pZCBzdGQ6Ol9fMjo6X19wb3BfaGVhcFthYmk6bmUxODAxMDBdPHN0ZDo6X18yOjpfQ2xhc3NpY0FsZ1BvbGljeSwgc3RkOjpfXzI6Omxlc3M8c3RkOjpfXzI6OnBhaXI8ZmxvYXQsIHVuc2lnbmVkIGxvbmc+Piwgc3RkOjpfXzI6Ol9fd3JhcF9pdGVyPHN0ZDo6X18yOjpwYWlyPGZsb2F0LCB1bnNpZ25lZCBsb25nPio+PihzdGQ6Ol9fMjo6X193cmFwX2l0ZXI8c3RkOjpfXzI6OnBhaXI8ZmxvYXQsIHVuc2lnbmVkIGxvbmc+Kj4sIHN0ZDo6X18yOjpfX3dyYXBfaXRlcjxzdGQ6Ol9fMjo6cGFpcjxmbG9hdCwgdW5zaWduZWQgbG9uZz4qPiwgc3RkOjpfXzI6Omxlc3M8c3RkOjpfXzI6OnBhaXI8ZmxvYXQsIHVuc2lnbmVkIGxvbmc+PiYsIHN0ZDo6X18yOjppdGVyYXRvcl90cmFpdHM8c3RkOjpfXzI6Ol9fd3JhcF9pdGVyPHN0ZDo6X18yOjpwYWlyPGZsb2F0LCB1bnNpZ25lZCBsb25nPio+Pjo6ZGlmZmVyZW5jZV90eXBlKZQBkwFobnN3bGliOjpIaWVyYXJjaGljYWxOU1c8ZmxvYXQ+OjpIaWVyYXJjaGljYWxOU1coaG5zd2xpYjo6U3BhY2VJbnRlcmZhY2U8ZmxvYXQ+KiwgdW5zaWduZWQgbG9uZywgdW5zaWduZWQgbG9uZywgdW5zaWduZWQgbG9uZywgdW5zaWduZWQgbG9uZywgYm9vbCmVATBlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1c6OnVwZGF0ZUxhYmVsQ2FjaGVzKCmWATtobnN3bGliOjpIaWVyYXJjaGljYWxOU1c8ZmxvYXQ+OjpyZXNpemVJbmRleCh1bnNpZ25lZCBsb25nKZcBf3N0ZDo6X18yOjp2ZWN0b3I8ZmxvYXQsIHN0ZDo6X18yOjphbGxvY2F0b3I8ZmxvYXQ+PiBobnN3bGliOjpIaWVyYXJjaGljYWxOU1c8ZmxvYXQ+OjpnZXREYXRhQnlMYWJlbDxmbG9hdD4odW5zaWduZWQgbG9uZykgY29uc3SYATpobnN3bGliOjpIaWVyYXJjaGljYWxOU1c8ZmxvYXQ+OjptYXJrRGVsZXRlKHVuc2lnbmVkIGxvbmcpmQE8aG5zd2xpYjo6SGllcmFyY2hpY2FsTlNXPGZsb2F0Pjo6dW5tYXJrRGVsZXRlKHVuc2lnbmVkIGxvbmcpmgFtc3RkOjpfXzI6OnZlY3RvcjxmbG9hdCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxmbG9hdD4+IGVtc2NyaXB0ZW46OnZlY0Zyb21KU0FycmF5PGZsb2F0PihlbXNjcmlwdGVuOjp2YWwgY29uc3QmKZsBMXN0ZDo6X190aHJvd19iYWRfYXJyYXlfbmV3X2xlbmd0aFthYmk6bmUxODAxMDBdKCmcATlzdGQ6Ol9fMjo6X190aHJvd19sZW5ndGhfZXJyb3JbYWJpOm5lMTgwMTAwXShjaGFyIGNvbnN0KimdASplbXNjcmlwdGVuOjpMMlNwYWNlOjpMMlNwYWNlKHVuc2lnbmVkIGludCmeATVobnN3bGliOjpMMlNxcih2b2lkIGNvbnN0Kiwgdm9pZCBjb25zdCosIHZvaWQgY29uc3QqKZ8BIWhuc3dsaWI6OkwyU3BhY2U6OmdldF9kYXRhX3NpemUoKaABIWhuc3dsaWI6OkwyU3BhY2U6OmdldF9kaXN0X2Z1bmMoKaEBJ2huc3dsaWI6OkwyU3BhY2U6OmdldF9kaXN0X2Z1bmNfcGFyYW0oKaIBHGhuc3dsaWI6OkwyU3BhY2U6On5MMlNwYWNlKCmjAURobnN3bGliOjpJbm5lclByb2R1Y3REaXN0YW5jZSh2b2lkIGNvbnN0Kiwgdm9pZCBjb25zdCosIHZvaWQgY29uc3QqKaQBMWhuc3dsaWI6OlNwYWNlSW50ZXJmYWNlPGZsb2F0Pjo6flNwYWNlSW50ZXJmYWNlKCmlATplbXNjcmlwdGVuOjpDdXN0b21GaWx0ZXJGdW5jdG9yOjpvcGVyYXRvcigpKHVuc2lnbmVkIGxvbmcppgFMaG5zd2xpYjo6QnJ1dGVmb3JjZVNlYXJjaDxmbG9hdD46OmFkZFBvaW50KHZvaWQgY29uc3QqLCB1bnNpZ25lZCBsb25nLCBib29sKacBamhuc3dsaWI6OkJydXRlZm9yY2VTZWFyY2g8ZmxvYXQ+OjpzZWFyY2hLbm4odm9pZCBjb25zdCosIHVuc2lnbmVkIGxvbmcsIGhuc3dsaWI6OkJhc2VGaWx0ZXJGdW5jdG9yKikgY29uc3SoAZUCc3RkOjpfXzI6OnByaW9yaXR5X3F1ZXVlPHN0ZDo6X18yOjpwYWlyPGZsb2F0LCB1bnNpZ25lZCBsb25nPiwgc3RkOjpfXzI6OnZlY3RvcjxzdGQ6Ol9fMjo6cGFpcjxmbG9hdCwgdW5zaWduZWQgbG9uZz4sIHN0ZDo6X18yOjphbGxvY2F0b3I8c3RkOjpfXzI6OnBhaXI8ZmxvYXQsIHVuc2lnbmVkIGxvbmc+Pj4sIHN0ZDo6X18yOjpsZXNzPHN0ZDo6X18yOjpwYWlyPGZsb2F0LCB1bnNpZ25lZCBsb25nPj4+OjpwdXNoKHN0ZDo6X18yOjpwYWlyPGZsb2F0LCB1bnNpZ25lZCBsb25nPiYmKakBd2huc3dsaWI6OkFsZ29yaXRobUludGVyZmFjZTxmbG9hdD46OnNlYXJjaEtubkNsb3NlckZpcnN0KHZvaWQgY29uc3QqLCB1bnNpZ25lZCBsb25nLCBobnN3bGliOjpCYXNlRmlsdGVyRnVuY3RvciopIGNvbnN0qgGIAWhuc3dsaWI6OkJydXRlZm9yY2VTZWFyY2g8ZmxvYXQ+OjpzYXZlSW5kZXgoc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+IGNvbnN0JimrAbYBc3RkOjpfXzI6OmJhc2ljX29mc3RyZWFtPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj46OmJhc2ljX29mc3RyZWFtKHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiBjb25zdCYsIHVuc2lnbmVkIGludCmsAU5zdGQ6Ol9fMjo6YmFzaWNfb2ZzdHJlYW08Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pjo6fmJhc2ljX29mc3RyZWFtKCmtATVobnN3bGliOjpCcnV0ZWZvcmNlU2VhcmNoPGZsb2F0Pjo6fkJydXRlZm9yY2VTZWFyY2goKa4BN2huc3dsaWI6OkJydXRlZm9yY2VTZWFyY2g8ZmxvYXQ+Ojp+QnJ1dGVmb3JjZVNlYXJjaCgpLjGvAa8Edm9pZCBzdGQ6Ol9fMjo6X19oYXNoX3RhYmxlPHN0ZDo6X18yOjpfX2hhc2hfdmFsdWVfdHlwZTx1bnNpZ25lZCBsb25nLCB1bnNpZ25lZCBsb25nPiwgc3RkOjpfXzI6Ol9fdW5vcmRlcmVkX21hcF9oYXNoZXI8dW5zaWduZWQgbG9uZywgc3RkOjpfXzI6Ol9faGFzaF92YWx1ZV90eXBlPHVuc2lnbmVkIGxvbmcsIHVuc2lnbmVkIGxvbmc+LCBzdGQ6Ol9fMjo6aGFzaDx1bnNpZ25lZCBsb25nPiwgc3RkOjpfXzI6OmVxdWFsX3RvPHVuc2lnbmVkIGxvbmc+LCB0cnVlPiwgc3RkOjpfXzI6Ol9fdW5vcmRlcmVkX21hcF9lcXVhbDx1bnNpZ25lZCBsb25nLCBzdGQ6Ol9fMjo6X19oYXNoX3ZhbHVlX3R5cGU8dW5zaWduZWQgbG9uZywgdW5zaWduZWQgbG9uZz4sIHN0ZDo6X18yOjplcXVhbF90bzx1bnNpZ25lZCBsb25nPiwgc3RkOjpfXzI6Omhhc2g8dW5zaWduZWQgbG9uZz4sIHRydWU+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHN0ZDo6X18yOjpfX2hhc2hfdmFsdWVfdHlwZTx1bnNpZ25lZCBsb25nLCB1bnNpZ25lZCBsb25nPj4+OjpfX2RvX3JlaGFzaDx0cnVlPih1bnNpZ25lZCBsb25nKbABtgFzdGQ6Ol9fMjo6YmFzaWNfaWZzdHJlYW08Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pjo6YmFzaWNfaWZzdHJlYW0oc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+IGNvbnN0JiwgdW5zaWduZWQgaW50KbEBTnN0ZDo6X18yOjpiYXNpY19pZnN0cmVhbTxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Ojp+YmFzaWNfaWZzdHJlYW0oKbIB9AFlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1c6OkhpZXJhcmNoaWNhbE5TVyhzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj4gY29uc3QmLCB1bnNpZ25lZCBpbnQsIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiBjb25zdCYpswGwAXN0ZDo6X18yOjpfX2V4Y2VwdGlvbl9ndWFyZF9leGNlcHRpb25zPHN0ZDo6X18yOjp2ZWN0b3I8c3RkOjpfXzI6Om11dGV4LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHN0ZDo6X18yOjptdXRleD4+OjpfX2Rlc3Ryb3lfdmVjdG9yPjo6fl9fZXhjZXB0aW9uX2d1YXJkX2V4Y2VwdGlvbnNbYWJpOm5lMTgwMTAwXSgptAEzaG5zd2xpYjo6VmlzaXRlZExpc3RQb29sOjpWaXNpdGVkTGlzdFBvb2woaW50LCBpbnQptQFgc3RkOjpfXzI6OnZlY3RvcjxzdGQ6Ol9fMjo6bXV0ZXgsIHN0ZDo6X18yOjphbGxvY2F0b3I8c3RkOjpfXzI6Om11dGV4Pj46On52ZWN0b3JbYWJpOm5lMTgwMTAwXSgptgFqc3RkOjpfXzI6OmRlcXVlPGhuc3dsaWI6OlZpc2l0ZWRMaXN0Kiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxobnN3bGliOjpWaXNpdGVkTGlzdCo+Pjo6X19hZGRfZnJvbnRfY2FwYWNpdHkoKbcBanN0ZDo6X18yOjpkZXF1ZTxobnN3bGliOjpWaXNpdGVkTGlzdCosIHN0ZDo6X18yOjphbGxvY2F0b3I8aG5zd2xpYjo6VmlzaXRlZExpc3QqPj46On5kZXF1ZVthYmk6bmUxODAxMDBdKCm4AUtobnN3bGliOjpIaWVyYXJjaGljYWxOU1c8ZmxvYXQ+OjphZGRQb2ludCh2b2lkIGNvbnN0KiwgdW5zaWduZWQgbG9uZywgYm9vbCm5AUpobnN3bGliOjpIaWVyYXJjaGljYWxOU1c8ZmxvYXQ+OjphZGRQb2ludCh2b2lkIGNvbnN0KiwgdW5zaWduZWQgbG9uZywgaW50KboBRGhuc3dsaWI6OkhpZXJhcmNoaWNhbE5TVzxmbG9hdD46OnVubWFya0RlbGV0ZWRJbnRlcm5hbCh1bnNpZ25lZCBpbnQpuwFOaG5zd2xpYjo6SGllcmFyY2hpY2FsTlNXPGZsb2F0Pjo6dXBkYXRlUG9pbnQodm9pZCBjb25zdCosIHVuc2lnbmVkIGludCwgZmxvYXQpvAFpaG5zd2xpYjo6SGllcmFyY2hpY2FsTlNXPGZsb2F0Pjo6c2VhcmNoS25uKHZvaWQgY29uc3QqLCB1bnNpZ25lZCBsb25nLCBobnN3bGliOjpCYXNlRmlsdGVyRnVuY3RvciopIGNvbnN0vQGHAWhuc3dsaWI6OkhpZXJhcmNoaWNhbE5TVzxmbG9hdD46OnNhdmVJbmRleChzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj4gY29uc3QmKb4BM2huc3dsaWI6OkhpZXJhcmNoaWNhbE5TVzxmbG9hdD46On5IaWVyYXJjaGljYWxOU1coKb8BLGhuc3dsaWI6OlZpc2l0ZWRMaXN0UG9vbDo6flZpc2l0ZWRMaXN0UG9vbCgpwAE1aG5zd2xpYjo6SGllcmFyY2hpY2FsTlNXPGZsb2F0Pjo6fkhpZXJhcmNoaWNhbE5TVygpLjHBAYgBc3RkOjpfXzI6Ol9fc3BsaXRfYnVmZmVyPGhuc3dsaWI6OlZpc2l0ZWRMaXN0KiosIHN0ZDo6X18yOjphbGxvY2F0b3I8aG5zd2xpYjo6VmlzaXRlZExpc3QqKj4+OjpwdXNoX2Zyb250KGhuc3dsaWI6OlZpc2l0ZWRMaXN0KiogY29uc3QmKcIBUGhuc3dsaWI6OkhpZXJhcmNoaWNhbE5TVzxmbG9hdD46OnNlYXJjaEJhc2VMYXllcih1bnNpZ25lZCBpbnQsIHZvaWQgY29uc3QqLCBpbnQpwwGbAnZvaWQgc3RkOjpfXzI6OnByaW9yaXR5X3F1ZXVlPHN0ZDo6X18yOjpwYWlyPGZsb2F0LCB1bnNpZ25lZCBpbnQ+LCBzdGQ6Ol9fMjo6dmVjdG9yPHN0ZDo6X18yOjpwYWlyPGZsb2F0LCB1bnNpZ25lZCBpbnQ+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHN0ZDo6X18yOjpwYWlyPGZsb2F0LCB1bnNpZ25lZCBpbnQ+Pj4sIGhuc3dsaWI6OkhpZXJhcmNoaWNhbE5TVzxmbG9hdD46OkNvbXBhcmVCeUZpcnN0Pjo6ZW1wbGFjZTxmbG9hdCwgdW5zaWduZWQgaW50Jj4oZmxvYXQmJiwgdW5zaWduZWQgaW50JinEAcICaG5zd2xpYjo6SGllcmFyY2hpY2FsTlNXPGZsb2F0Pjo6bXV0dWFsbHlDb25uZWN0TmV3RWxlbWVudCh2b2lkIGNvbnN0KiwgdW5zaWduZWQgaW50LCBzdGQ6Ol9fMjo6cHJpb3JpdHlfcXVldWU8c3RkOjpfXzI6OnBhaXI8ZmxvYXQsIHVuc2lnbmVkIGludD4sIHN0ZDo6X18yOjp2ZWN0b3I8c3RkOjpfXzI6OnBhaXI8ZmxvYXQsIHVuc2lnbmVkIGludD4sIHN0ZDo6X18yOjphbGxvY2F0b3I8c3RkOjpfXzI6OnBhaXI8ZmxvYXQsIHVuc2lnbmVkIGludD4+PiwgaG5zd2xpYjo6SGllcmFyY2hpY2FsTlNXPGZsb2F0Pjo6Q29tcGFyZUJ5Rmlyc3Q+JiwgaW50LCBib29sKcUBbmhuc3dsaWI6OkhpZXJhcmNoaWNhbE5TVzxmbG9hdD46OnJlcGFpckNvbm5lY3Rpb25zRm9yVXBkYXRlKHZvaWQgY29uc3QqLCB1bnNpZ25lZCBpbnQsIHVuc2lnbmVkIGludCwgaW50LCBpbnQpxgHMAnN0ZDo6X18yOjpwYWlyPHN0ZDo6X18yOjpfX2hhc2hfaXRlcmF0b3I8c3RkOjpfXzI6Ol9faGFzaF9ub2RlPHVuc2lnbmVkIGludCwgdm9pZCo+Kj4sIGJvb2w+IHN0ZDo6X18yOjpfX2hhc2hfdGFibGU8dW5zaWduZWQgaW50LCBzdGQ6Ol9fMjo6aGFzaDx1bnNpZ25lZCBpbnQ+LCBzdGQ6Ol9fMjo6ZXF1YWxfdG88dW5zaWduZWQgaW50Piwgc3RkOjpfXzI6OmFsbG9jYXRvcjx1bnNpZ25lZCBpbnQ+Pjo6X19lbXBsYWNlX3VuaXF1ZV9rZXlfYXJnczx1bnNpZ25lZCBpbnQsIHVuc2lnbmVkIGludCBjb25zdCY+KHVuc2lnbmVkIGludCBjb25zdCYsIHVuc2lnbmVkIGludCBjb25zdCYpxwGqAmhuc3dsaWI6OkhpZXJhcmNoaWNhbE5TVzxmbG9hdD46OmdldE5laWdoYm9yc0J5SGV1cmlzdGljMihzdGQ6Ol9fMjo6cHJpb3JpdHlfcXVldWU8c3RkOjpfXzI6OnBhaXI8ZmxvYXQsIHVuc2lnbmVkIGludD4sIHN0ZDo6X18yOjp2ZWN0b3I8c3RkOjpfXzI6OnBhaXI8ZmxvYXQsIHVuc2lnbmVkIGludD4sIHN0ZDo6X18yOjphbGxvY2F0b3I8c3RkOjpfXzI6OnBhaXI8ZmxvYXQsIHVuc2lnbmVkIGludD4+PiwgaG5zd2xpYjo6SGllcmFyY2hpY2FsTlNXPGZsb2F0Pjo6Q29tcGFyZUJ5Rmlyc3Q+JiwgdW5zaWduZWQgbG9uZynIAS5obnN3bGliOjpWaXNpdGVkTGlzdFBvb2w6OmdldEZyZWVWaXNpdGVkTGlzdCgpyQG3AWhuc3dsaWI6OkhpZXJhcmNoaWNhbE5TVzxmbG9hdD46OmxvYWRJbmRleChzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj4gY29uc3QmLCBobnN3bGliOjpTcGFjZUludGVyZmFjZTxmbG9hdD4qLCB1bnNpZ25lZCBsb25nKcoB9wFzdGQ6Ol9fMjo6dmVjdG9yPHN0ZDo6X18yOjp2ZWN0b3I8ZmxvYXQsIHN0ZDo6X18yOjphbGxvY2F0b3I8ZmxvYXQ+Piwgc3RkOjpfXzI6OmFsbG9jYXRvcjxzdGQ6Ol9fMjo6dmVjdG9yPGZsb2F0LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGZsb2F0Pj4+PiBlbXNjcmlwdGVuOjp2ZWNGcm9tSlNBcnJheTxzdGQ6Ol9fMjo6dmVjdG9yPGZsb2F0LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGZsb2F0Pj4+KGVtc2NyaXB0ZW46OnZhbCBjb25zdCYpywGCAXN0ZDo6X18yOjp2ZWN0b3I8dW5zaWduZWQgaW50LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHVuc2lnbmVkIGludD4+IGVtc2NyaXB0ZW46OnZlY0Zyb21KU0FycmF5PHVuc2lnbmVkIGludD4oZW1zY3JpcHRlbjo6dmFsIGNvbnN0JinMAagBc3RkOjpfXzI6OnZlY3RvcjxzdGQ6Ol9fMjo6dmVjdG9yPGZsb2F0LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGZsb2F0Pj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8c3RkOjpfXzI6OnZlY3RvcjxmbG9hdCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxmbG9hdD4+Pj46On52ZWN0b3JbYWJpOm5lMTgwMTAwXSgpzQFCaG5zd2xpYjo6SGllcmFyY2hpY2FsTlNXPGZsb2F0Pjo6bWFya0RlbGV0ZWRJbnRlcm5hbCh1bnNpZ25lZCBpbnQpzgEIX19tZW1jcHnPAQdtZW1tb3Zl0AEIX19tZW1zZXTRAQNsb2fSAQZtZW1jaHLTAQZtZW1jbXDUAQdpcHJpbnRm1QEKX19sb2NrZmlsZdYBFWVtc2NyaXB0ZW5fZnV0ZXhfd2FrZdcBFF9fcHRocmVhZF9tdXRleF9sb2Nr2AEJX190b3dyaXRl2QEJX19md3JpdGV42gEGZndyaXRl2wEKX19vdmVyZmxvd9wBBHB1dHPdAQ1fX3N0ZGlvX3dyaXRl3gEYX19lbXNjcmlwdGVuX3N0ZG91dF9zZWVr3wEGc3RybGVu4AEFZnJleHDhARNfX3ZmcHJpbnRmX2ludGVybmFs4gELcHJpbnRmX2NvcmXjAQNvdXTkAQZnZXRpbnTlAQdwb3BfYXJn5gEFZm10X3XnAQNwYWToAQZmbXRfZnDpARNwb3BfYXJnX2xvbmdfZG91Ymxl6gEHd2NydG9tYusBBndjdG9tYuwBBHNicmvtAQhkbG1hbGxvY+4BBmRsZnJlZe8BCWRscmVhbGxvY/ABDWRpc3Bvc2VfY2h1bmvxAQlfX2FzaGx0aTPyAQlfX2xzaHJ0aTPzAQxfX3RydW5jdGZkZjL0ASVzdGQ6Ol9fMjo6X19uZXh0X3ByaW1lKHVuc2lnbmVkIGxvbmcp9QHXAXVuc2lnbmVkIGludCBjb25zdCogc3RkOjpfXzI6Omxvd2VyX2JvdW5kW2FiaTpuZTE4MDEwMF08dW5zaWduZWQgaW50IGNvbnN0KiwgdW5zaWduZWQgbG9uZywgc3RkOjpfXzI6Ol9fbGVzczx2b2lkLCB2b2lkPj4odW5zaWduZWQgaW50IGNvbnN0KiwgdW5zaWduZWQgaW50IGNvbnN0KiwgdW5zaWduZWQgbG9uZyBjb25zdCYsIHN0ZDo6X18yOjpfX2xlc3M8dm9pZCwgdm9pZD4p9gE7c3RkOjpfXzI6Ol9fdGhyb3dfb3ZlcmZsb3dfZXJyb3JbYWJpOm5lMTgwMTAwXShjaGFyIGNvbnN0Kin3AXJ1bnNpZ25lZCBpbnQgY29uc3QmIHN0ZDo6X18yOjpfX2lkZW50aXR5OjpvcGVyYXRvcigpW2FiaTpuZTE4MDEwMF08dW5zaWduZWQgaW50IGNvbnN0Jj4odW5zaWduZWQgaW50IGNvbnN0JikgY29uc3T4AQtfX3N0cmNocm51bPkBBnN0cmNocvoBDF9fc3RkaW9fc2Vla/sBDF9fc3RkaW9fcmVhZPwBDV9fc3RkaW9fY2xvc2X9ARFfX2ZzZWVrb191bmxvY2tlZP4BCF9fZnNlZWtv/wEGZmZsdXNogAIGZmNsb3NlgQIIX190b3JlYWSCAgVmcmVhZIMCEV9fZnRlbGxvX3VubG9ja2VkhAJEc3RkOjpfXzI6OmJhc2ljX2lvczxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Ojp+YmFzaWNfaW9zKCmFAlBzdGQ6Ol9fMjo6YmFzaWNfc3RyZWFtYnVmPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj46On5iYXNpY19zdHJlYW1idWYoKYYCUnN0ZDo6X18yOjpiYXNpY19zdHJlYW1idWY8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pjo6fmJhc2ljX3N0cmVhbWJ1ZigpLjGHAlxzdGQ6Ol9fMjo6YmFzaWNfc3RyZWFtYnVmPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj46OmltYnVlKHN0ZDo6X18yOjpsb2NhbGUgY29uc3QmKYgCUXN0ZDo6X18yOjpiYXNpY19zdHJlYW1idWY8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pjo6c2V0YnVmKGNoYXIqLCBsb25nKYkCe3N0ZDo6X18yOjpiYXNpY19zdHJlYW1idWY8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pjo6c2Vla29mZihsb25nIGxvbmcsIHN0ZDo6X18yOjppb3NfYmFzZTo6c2Vla2RpciwgdW5zaWduZWQgaW50KYoCcHN0ZDo6X18yOjpiYXNpY19zdHJlYW1idWY8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pjo6c2Vla3BvcyhzdGQ6Ol9fMjo6ZnBvczxfX21ic3RhdGVfdD4sIHVuc2lnbmVkIGludCmLAlFzdGQ6Ol9fMjo6YmFzaWNfc3RyZWFtYnVmPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj46OnhzZ2V0bihjaGFyKiwgbG9uZymMAlJzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj46OmNvcHlbYWJpOm5lMTgwMTAwXShjaGFyKiwgY2hhciBjb25zdCosIHVuc2lnbmVkIGxvbmcpjQJtY2hhciogc3RkOjpfXzI6OmNvcHlfblthYmk6bmUxODAxMDBdPGNoYXIgY29uc3QqLCB1bnNpZ25lZCBsb25nLCBjaGFyKiwgMD4oY2hhciBjb25zdCosIHVuc2lnbmVkIGxvbmcsIGNoYXIqKY4CSXN0ZDo6X18yOjpiYXNpY19zdHJlYW1idWY8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pjo6dW5kZXJmbG93KCmPAkVzdGQ6Ol9fMjo6YmFzaWNfc3RyZWFtYnVmPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj46OnVmbG93KCmQAkxzdGQ6Ol9fMjo6YmFzaWNfc3RyZWFtYnVmPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj46OnBiYWNrZmFpbChpbnQpkQJXc3RkOjpfXzI6OmJhc2ljX3N0cmVhbWJ1ZjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Ojp4c3B1dG4oY2hhciBjb25zdCosIGxvbmcpkgJMc3RkOjpfXzI6OmJhc2ljX2lzdHJlYW08Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pjo6fmJhc2ljX2lzdHJlYW0oKZMCTnN0ZDo6X18yOjpiYXNpY19pc3RyZWFtPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj46On5iYXNpY19pc3RyZWFtKCkuMZQCXXZpcnR1YWwgdGh1bmsgdG8gc3RkOjpfXzI6OmJhc2ljX2lzdHJlYW08Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pjo6fmJhc2ljX2lzdHJlYW0oKZUCTnN0ZDo6X18yOjpiYXNpY19pc3RyZWFtPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj46On5iYXNpY19pc3RyZWFtKCkuMpYCX3ZpcnR1YWwgdGh1bmsgdG8gc3RkOjpfXzI6OmJhc2ljX2lzdHJlYW08Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pjo6fmJhc2ljX2lzdHJlYW0oKS4xlwKNAXN0ZDo6X18yOjpiYXNpY19pc3RyZWFtPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj46OnNlbnRyeTo6c2VudHJ5KHN0ZDo6X18yOjpiYXNpY19pc3RyZWFtPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4mLCBib29sKZgCQ3N0ZDo6X18yOjpiYXNpY19vc3RyZWFtPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj46OmZsdXNoKCmZAtwBYm9vbCBzdGQ6Ol9fMjo6b3BlcmF0b3I9PVthYmk6bmUxODAxMDBdPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4oc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+PiBjb25zdCYsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4gY29uc3QmKZoCXHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj46Om9wZXJhdG9yKytbYWJpOm5lMTgwMTAwXSgpmwJUc3RkOjpfXzI6OmJhc2ljX3N0cmVhbWJ1ZjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+OjpzYnVtcGNbYWJpOm5lMTgwMTAwXSgpnAI4c3RkOjpfXzI6Omlvc19iYXNlOjpzZXRzdGF0ZVthYmk6bmUxODAxMDBdKHVuc2lnbmVkIGludCmdAk1zdGQ6Ol9fMjo6YmFzaWNfaXN0cmVhbTxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+OjpyZWFkKGNoYXIqLCBsb25nKZ4CQ3N0ZDo6X18yOjpiYXNpY19pc3RyZWFtPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj46OnRlbGxnKCmfAmlzdGQ6Ol9fMjo6YmFzaWNfaXN0cmVhbTxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+OjpzZWVrZyhsb25nIGxvbmcsIHN0ZDo6X18yOjppb3NfYmFzZTo6c2Vla2RpcimgAk5zdGQ6Ol9fMjo6YmFzaWNfb3N0cmVhbTxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Ojp+YmFzaWNfb3N0cmVhbSgpLjGhAl12aXJ0dWFsIHRodW5rIHRvIHN0ZDo6X18yOjpiYXNpY19vc3RyZWFtPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj46On5iYXNpY19vc3RyZWFtKCmiAk5zdGQ6Ol9fMjo6YmFzaWNfb3N0cmVhbTxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Ojp+YmFzaWNfb3N0cmVhbSgpLjKjAl92aXJ0dWFsIHRodW5rIHRvIHN0ZDo6X18yOjpiYXNpY19vc3RyZWFtPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj46On5iYXNpY19vc3RyZWFtKCkuMaQChwFzdGQ6Ol9fMjo6YmFzaWNfb3N0cmVhbTxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+OjpzZW50cnk6OnNlbnRyeShzdGQ6Ol9fMjo6YmFzaWNfb3N0cmVhbTxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+JimlAk1zdGQ6Ol9fMjo6YmFzaWNfb3N0cmVhbTxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+OjpzZW50cnk6On5zZW50cnkoKaYCX3N0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj46Om9wZXJhdG9yPVthYmk6bmUxODAxMDBdKGNoYXIppwJUc3RkOjpfXzI6OmJhc2ljX29zdHJlYW08Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pjo6d3JpdGUoY2hhciBjb25zdCosIGxvbmcpqAJbc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Ojpjb3B5W2FiaTpuZTE4MDEwMF0od2NoYXJfdCosIHdjaGFyX3QgY29uc3QqLCB1bnNpZ25lZCBsb25nKakC7gFib29sIHN0ZDo6X18yOjpvcGVyYXRvcj09W2FiaTpuZTE4MDEwMF08d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+PihzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+IGNvbnN0Jiwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+PiBjb25zdCYpqgJic3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Pjo6b3BlcmF0b3IrK1thYmk6bmUxODAxMDBdKCmrAlpzdGQ6Ol9fMjo6YmFzaWNfc3RyZWFtYnVmPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj46OnNidW1wY1thYmk6bmUxODAxMDBdKCmsAmhzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+OjpvcGVyYXRvcj1bYWJpOm5lMTgwMTAwXSh3Y2hhcl90Ka0CWHN0ZDo6X18yOjpiYXNpY19zdHJlYW1idWY8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pjo6Z3B0clthYmk6bmUxODAxMDBdKCkgY29uc3SuAsUBc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+OjpvcGVyYXRvcj1bYWJpOm5lMTgwMTAwXShzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj4mJimvAnl2b2lkIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+Pjo6X19pbml0PGNoYXIqLCAwPihjaGFyKiwgY2hhciopsAJ5c3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+OjpyZXNpemVbYWJpOm5lMTgwMTAwXSh1bnNpZ25lZCBsb25nKbECW3N0ZDo6X18yOjpiYXNpY19maWxlYnVmPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj46Om9wZW4oY2hhciBjb25zdCosIHVuc2lnbmVkIGludCmyAktzdGQ6Ol9fMjo6YmFzaWNfZmlsZWJ1ZjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+OjpiYXNpY19maWxlYnVmKCmzAkxzdGQ6Ol9fMjo6YmFzaWNfZmlsZWJ1ZjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Ojp+YmFzaWNfZmlsZWJ1ZigptAJDc3RkOjpfXzI6OmJhc2ljX2ZpbGVidWY8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pjo6Y2xvc2UoKbUC1gFzdGQ6Ol9fMjo6dW5pcXVlX3B0cjxfSU9fRklMRSwgaW50ICgqKShfSU9fRklMRSopPjo6dW5pcXVlX3B0clthYmk6bmUxODAxMDBdPHRydWUsIHZvaWQ+KF9JT19GSUxFKiwgc3RkOjpfXzI6Ol9fZGVwZW5kZW50X3R5cGU8c3RkOjpfXzI6Ol9fdW5pcXVlX3B0cl9kZWxldGVyX3NmaW5hZTxpbnQgKCopKF9JT19GSUxFKik+LCB0cnVlPjo6X19nb29kX3J2YWxfcmVmX3R5cGUptgJOc3RkOjpfXzI6OmJhc2ljX2ZpbGVidWY8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pjo6fmJhc2ljX2ZpbGVidWYoKS4xtwJSc3RkOjpfXzI6OnVuaXF1ZV9wdHI8X0lPX0ZJTEUsIGludCAoKikoX0lPX0ZJTEUqKT46OnJlc2V0W2FiaTpuZTE4MDEwMF0oX0lPX0ZJTEUqKbgCR3N0ZDo6X18yOjpiYXNpY19maWxlYnVmPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj46OnVuZGVyZmxvdygpuQIqc3RkOjpfXzI6Ol9fdGhyb3dfYmFkX2Nhc3RbYWJpOm5lMTgwMTAwXSgpugJKc3RkOjpfXzI6OmJhc2ljX2ZpbGVidWY8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pjo6cGJhY2tmYWlsKGludCm7AklzdGQ6Ol9fMjo6YmFzaWNfZmlsZWJ1ZjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+OjpvdmVyZmxvdyhpbnQpvAJPc3RkOjpfXzI6OmJhc2ljX2ZpbGVidWY8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pjo6c2V0YnVmKGNoYXIqLCBsb25nKb0CeXN0ZDo6X18yOjpiYXNpY19maWxlYnVmPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj46OnNlZWtvZmYobG9uZyBsb25nLCBzdGQ6Ol9fMjo6aW9zX2Jhc2U6OnNlZWtkaXIsIHVuc2lnbmVkIGludCm+Am5zdGQ6Ol9fMjo6YmFzaWNfZmlsZWJ1ZjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+OjpzZWVrcG9zKHN0ZDo6X18yOjpmcG9zPF9fbWJzdGF0ZV90PiwgdW5zaWduZWQgaW50Kb8CQnN0ZDo6X18yOjpiYXNpY19maWxlYnVmPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj46OnN5bmMoKcACWnN0ZDo6X18yOjpiYXNpY19maWxlYnVmPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj46OmltYnVlKHN0ZDo6X18yOjpsb2NhbGUgY29uc3QmKcECUHN0ZDo6X18yOjpiYXNpY19pZnN0cmVhbTxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Ojp+YmFzaWNfaWZzdHJlYW0oKS4xwgJfdmlydHVhbCB0aHVuayB0byBzdGQ6Ol9fMjo6YmFzaWNfaWZzdHJlYW08Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pjo6fmJhc2ljX2lmc3RyZWFtKCnDAmF2aXJ0dWFsIHRodW5rIHRvIHN0ZDo6X18yOjpiYXNpY19pZnN0cmVhbTxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Ojp+YmFzaWNfaWZzdHJlYW0oKS4xxAJQc3RkOjpfXzI6OmJhc2ljX29mc3RyZWFtPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj46On5iYXNpY19vZnN0cmVhbSgpLjHFAl92aXJ0dWFsIHRodW5rIHRvIHN0ZDo6X18yOjpiYXNpY19vZnN0cmVhbTxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Ojp+YmFzaWNfb2ZzdHJlYW0oKcYCYXZpcnR1YWwgdGh1bmsgdG8gc3RkOjpfXzI6OmJhc2ljX29mc3RyZWFtPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj46On5iYXNpY19vZnN0cmVhbSgpLjHHAmlzdGQ6Ol9fMjo6X191bndyYXBfcmFuZ2VfaW1wbDxjaGFyIGNvbnN0KiwgY2hhciBjb25zdCo+OjpfX3Vud3JhcFthYmk6bmUxODAxMDBdKGNoYXIgY29uc3QqLCBjaGFyIGNvbnN0KinIAoEBc3RkOjpfXzI6OnBhaXI8Y2hhciBjb25zdCosIGNoYXIqPiBzdGQ6Ol9fMjo6X19jb3B5X3RyaXZpYWxfaW1wbFthYmk6bmUxODAxMDBdPGNoYXIgY29uc3QsIGNoYXI+KGNoYXIgY29uc3QqLCBjaGFyIGNvbnN0KiwgY2hhciopyQJ1Y2hhciogc3RkOjpfXzI6Ol9fY29uc3RleHByX21lbW1vdmVbYWJpOm5lMTgwMTAwXTxjaGFyLCBjaGFyIGNvbnN0LCAwPihjaGFyKiwgY2hhciBjb25zdCosIHN0ZDo6X18yOjpfX2VsZW1lbnRfY291bnQpygKmAXN0ZDo6X18yOjpwYWlyPHdjaGFyX3QgY29uc3QqLCB3Y2hhcl90Kj4gc3RkOjpfXzI6Ol9fY29weV90cml2aWFsOjpvcGVyYXRvcigpW2FiaTpuZTE4MDEwMF08d2NoYXJfdCBjb25zdCwgd2NoYXJfdCwgMD4od2NoYXJfdCBjb25zdCosIHdjaGFyX3QgY29uc3QqLCB3Y2hhcl90KikgY29uc3TLAoQBd2NoYXJfdCogc3RkOjpfXzI6Ol9fY29uc3RleHByX21lbW1vdmVbYWJpOm5lMTgwMTAwXTx3Y2hhcl90LCB3Y2hhcl90IGNvbnN0LCAwPih3Y2hhcl90Kiwgd2NoYXJfdCBjb25zdCosIHN0ZDo6X18yOjpfX2VsZW1lbnRfY291bnQpzAKBAXN0ZDo6X18yOjphbGxvY2F0b3JfdHJhaXRzPHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+OjpkZWFsbG9jYXRlW2FiaTpuZTE4MDEwMF0oc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPiYsIGNoYXIqLCB1bnNpZ25lZCBsb25nKc0CUHN0ZDo6X18yOjpfX2xpYmNwcF9kZWFsbG9jYXRlW2FiaTpuZTE4MDEwMF0odm9pZCosIHVuc2lnbmVkIGxvbmcsIHVuc2lnbmVkIGxvbmcpzgLPAXN0ZDo6X18yOjpfX2FsbG9jYXRpb25fcmVzdWx0PHN0ZDo6X18yOjphbGxvY2F0b3JfdHJhaXRzPHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+Ojpwb2ludGVyPiBzdGQ6Ol9fMjo6X19hbGxvY2F0ZV9hdF9sZWFzdFthYmk6bmUxODAxMDBdPHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+KHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4mLCB1bnNpZ25lZCBsb25nKc8CR3N0ZDo6X18yOjpfX2xpYmNwcF9hbGxvY2F0ZVthYmk6bmUxODAxMDBdKHVuc2lnbmVkIGxvbmcsIHVuc2lnbmVkIGxvbmcp0AJmc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pjo6X190ZXN0X2Zvcl9lb2ZbYWJpOm5lMTgwMTAwXSgpIGNvbnN00QJsc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Pjo6X190ZXN0X2Zvcl9lb2ZbYWJpOm5lMTgwMTAwXSgpIGNvbnN00gI8c3RkOjpfXzI6OmVycm9yX2NhdGVnb3J5OjpkZWZhdWx0X2Vycm9yX2NvbmRpdGlvbihpbnQpIGNvbnN00wJRc3RkOjpfXzI6OmVycm9yX2NhdGVnb3J5OjplcXVpdmFsZW50KGludCwgc3RkOjpfXzI6OmVycm9yX2NvbmRpdGlvbiBjb25zdCYpIGNvbnN01AJMc3RkOjpfXzI6OmVycm9yX2NhdGVnb3J5OjplcXVpdmFsZW50KHN0ZDo6X18yOjplcnJvcl9jb2RlIGNvbnN0JiwgaW50KSBjb25zdNUCK3N0ZDo6X18yOjpfX2lvc3RyZWFtX2NhdGVnb3J5OjpuYW1lKCkgY29uc3TWAjFzdGQ6Ol9fMjo6X19pb3N0cmVhbV9jYXRlZ29yeTo6bWVzc2FnZShpbnQpIGNvbnN01wInc3RkOjpfXzI6Omlvc19iYXNlOjpmYWlsdXJlOjp+ZmFpbHVyZSgp2AIpc3RkOjpfXzI6Omlvc19iYXNlOjpmYWlsdXJlOjp+ZmFpbHVyZSgpLjHZAidzdGQ6Ol9fMjo6aW9zX2Jhc2U6OmNsZWFyKHVuc2lnbmVkIGludCnaAh9zdGQ6Ol9fMjo6aW9zX2Jhc2U6On5pb3NfYmFzZSgp2wIhc3RkOjpfXzI6Omlvc19iYXNlOjp+aW9zX2Jhc2UoKS4x3AI0c3RkOjpfXzI6Ol9fdGhyb3dfZmFpbHVyZVthYmk6bmUxODAxMDBdKGNoYXIgY29uc3QqKd0CH3N0ZDo6X18yOjppb3NfYmFzZTo6aW5pdCh2b2lkKineAjdzdGQ6Ol9fMjo6aW9zX2Jhc2U6Ol9fc2V0X2JhZGJpdF9hbmRfY29uc2lkZXJfcmV0aHJvdygp3wIHX19zaGxpbeACCF9fc2hnZXRj4QILX19mbG9hdHNpdGbiAghfX211bHRmM+MCCF9fYWRkdGYz5AINX19leHRlbmRkZnRmMuUCB19fbGV0ZjLmAgdfX2dldGYy5wIGc2NhbGJu6AIJY29weXNpZ25s6QINX19mbG9hdHVuc2l0ZuoCCF9fc3VidGYz6wIHc2NhbGJubOwCCF9fbXVsdGkz7QIIX19kaXZ0ZjPuAgVmbW9kbO8CC19fZmxvYXRzY2Fu8AIHc2NhbmV4cPECDF9fdHJ1bmN0ZnNmMvICB21icnRvd2PzAglzdG9yZV9pbnT0Agd2c3NjYW5m9QILc3RyaW5nX3JlYWT2AgZzdHJjbXD3AgVzd2FwY/gCBmdldGVudvkCDF9fZ2V0X2xvY2FsZfoCCXZzbnByaW50ZvsCCHNuX3dyaXRl/AIGc3NjYW5m/QIIc25wcmludGb+AgpmcmVlbG9jYWxl/wIGc3RyY3B5gAMJbWJzcnRvd2NzgQMGc3RydG94ggMIc3RydG94LjGDA11zdGQ6Ol9fMjo6Y29sbGF0ZTxjaGFyPjo6ZG9fY29tcGFyZShjaGFyIGNvbnN0KiwgY2hhciBjb25zdCosIGNoYXIgY29uc3QqLCBjaGFyIGNvbnN0KikgY29uc3SEA0VzdGQ6Ol9fMjo6Y29sbGF0ZTxjaGFyPjo6ZG9fdHJhbnNmb3JtKGNoYXIgY29uc3QqLCBjaGFyIGNvbnN0KikgY29uc3SFA5oBc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+OjpiYXNpY19zdHJpbmdbYWJpOm5lMTgwMTAwXTxjaGFyIGNvbnN0KiwgMD4oY2hhciBjb25zdCosIGNoYXIgY29uc3QqKYYDQHN0ZDo6X18yOjpjb2xsYXRlPGNoYXI+Ojpkb19oYXNoKGNoYXIgY29uc3QqLCBjaGFyIGNvbnN0KikgY29uc3SHA2xzdGQ6Ol9fMjo6Y29sbGF0ZTx3Y2hhcl90Pjo6ZG9fY29tcGFyZSh3Y2hhcl90IGNvbnN0Kiwgd2NoYXJfdCBjb25zdCosIHdjaGFyX3QgY29uc3QqLCB3Y2hhcl90IGNvbnN0KikgY29uc3SIA05zdGQ6Ol9fMjo6Y29sbGF0ZTx3Y2hhcl90Pjo6ZG9fdHJhbnNmb3JtKHdjaGFyX3QgY29uc3QqLCB3Y2hhcl90IGNvbnN0KikgY29uc3SJA50Bdm9pZCBzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Piwgc3RkOjpfXzI6OmFsbG9jYXRvcjx3Y2hhcl90Pj46Ol9faW5pdDx3Y2hhcl90IGNvbnN0KiwgMD4od2NoYXJfdCBjb25zdCosIHdjaGFyX3QgY29uc3QqKYoDSXN0ZDo6X18yOjpjb2xsYXRlPHdjaGFyX3Q+Ojpkb19oYXNoKHdjaGFyX3QgY29uc3QqLCB3Y2hhcl90IGNvbnN0KikgY29uc3SLA5YCc3RkOjpfXzI6Om51bV9nZXQ8Y2hhciwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pj46OmRvX2dldChzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCBib29sJikgY29uc3SMA6oFc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+IGNvbnN0KiBzdGQ6Ol9fMjo6X19zY2FuX2tleXdvcmRbYWJpOm5lMTgwMTAwXTxzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+LCBzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj4gY29uc3QqLCBzdGQ6Ol9fMjo6Y3R5cGU8Y2hhcj4+KHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4mLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+LCBzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj4gY29uc3QqLCBzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj4gY29uc3QqLCBzdGQ6Ol9fMjo6Y3R5cGU8Y2hhcj4gY29uc3QmLCB1bnNpZ25lZCBpbnQmLCBib29sKY0DOHN0ZDo6X18yOjpsb2NhbGU6OnVzZV9mYWNldChzdGQ6Ol9fMjo6bG9jYWxlOjppZCYpIGNvbnN0jgNZc3RkOjpfXzI6OnVuaXF1ZV9wdHI8dW5zaWduZWQgY2hhciwgdm9pZCAoKikodm9pZCopPjo6cmVzZXRbYWJpOm5lMTgwMTAwXSh1bnNpZ25lZCBjaGFyKimPA5YCc3RkOjpfXzI6Om51bV9nZXQ8Y2hhciwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pj46OmRvX2dldChzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCBsb25nJikgY29uc3SQAzlzdGQ6Ol9fMjo6X19udW1fZ2V0X2Jhc2U6Ol9fZ2V0X2Jhc2Uoc3RkOjpfXzI6Omlvc19iYXNlJimRA0hzdGQ6Ol9fMjo6X19udW1fZ2V0PGNoYXI+OjpfX3N0YWdlMl9pbnRfcHJlcChzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCBjaGFyJimSA+QBc3RkOjpfXzI6Ol9fbnVtX2dldDxjaGFyPjo6X19zdGFnZTJfaW50X2xvb3AoY2hhciwgaW50LCBjaGFyKiwgY2hhciomLCB1bnNpZ25lZCBpbnQmLCBjaGFyLCBzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj4gY29uc3QmLCB1bnNpZ25lZCBpbnQqLCB1bnNpZ25lZCBpbnQqJiwgY2hhciBjb25zdCopkwNqbG9uZyBzdGQ6Ol9fMjo6X19udW1fZ2V0X3NpZ25lZF9pbnRlZ3JhbFthYmk6bmUxODAxMDBdPGxvbmc+KGNoYXIgY29uc3QqLCBjaGFyIGNvbnN0KiwgdW5zaWduZWQgaW50JiwgaW50KZQDpAFzdGQ6Ol9fMjo6X19jaGVja19ncm91cGluZyhzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj4gY29uc3QmLCB1bnNpZ25lZCBpbnQqLCB1bnNpZ25lZCBpbnQqLCB1bnNpZ25lZCBpbnQmKZUDmwJzdGQ6Ol9fMjo6bnVtX2dldDxjaGFyLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Pjo6ZG9fZ2V0KHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIHVuc2lnbmVkIGludCYsIGxvbmcgbG9uZyYpIGNvbnN0lgN0bG9uZyBsb25nIHN0ZDo6X18yOjpfX251bV9nZXRfc2lnbmVkX2ludGVncmFsW2FiaTpuZTE4MDEwMF08bG9uZyBsb25nPihjaGFyIGNvbnN0KiwgY2hhciBjb25zdCosIHVuc2lnbmVkIGludCYsIGludCmXA6ACc3RkOjpfXzI6Om51bV9nZXQ8Y2hhciwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pj46OmRvX2dldChzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCB1bnNpZ25lZCBzaG9ydCYpIGNvbnN0mAOAAXVuc2lnbmVkIHNob3J0IHN0ZDo6X18yOjpfX251bV9nZXRfdW5zaWduZWRfaW50ZWdyYWxbYWJpOm5lMTgwMTAwXTx1bnNpZ25lZCBzaG9ydD4oY2hhciBjb25zdCosIGNoYXIgY29uc3QqLCB1bnNpZ25lZCBpbnQmLCBpbnQpmQOeAnN0ZDo6X18yOjpudW1fZ2V0PGNoYXIsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4+Ojpkb19nZXQoc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Piwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Piwgc3RkOjpfXzI6Omlvc19iYXNlJiwgdW5zaWduZWQgaW50JiwgdW5zaWduZWQgaW50JikgY29uc3SaA3x1bnNpZ25lZCBpbnQgc3RkOjpfXzI6Ol9fbnVtX2dldF91bnNpZ25lZF9pbnRlZ3JhbFthYmk6bmUxODAxMDBdPHVuc2lnbmVkIGludD4oY2hhciBjb25zdCosIGNoYXIgY29uc3QqLCB1bnNpZ25lZCBpbnQmLCBpbnQpmwOkAnN0ZDo6X18yOjpudW1fZ2V0PGNoYXIsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4+Ojpkb19nZXQoc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Piwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Piwgc3RkOjpfXzI6Omlvc19iYXNlJiwgdW5zaWduZWQgaW50JiwgdW5zaWduZWQgbG9uZyBsb25nJikgY29uc3ScA4gBdW5zaWduZWQgbG9uZyBsb25nIHN0ZDo6X18yOjpfX251bV9nZXRfdW5zaWduZWRfaW50ZWdyYWxbYWJpOm5lMTgwMTAwXTx1bnNpZ25lZCBsb25nIGxvbmc+KGNoYXIgY29uc3QqLCBjaGFyIGNvbnN0KiwgdW5zaWduZWQgaW50JiwgaW50KZ0DlwJzdGQ6Ol9fMjo6bnVtX2dldDxjaGFyLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Pjo6ZG9fZ2V0KHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIHVuc2lnbmVkIGludCYsIGZsb2F0JikgY29uc3SeA1hzdGQ6Ol9fMjo6X19udW1fZ2V0PGNoYXI+OjpfX3N0YWdlMl9mbG9hdF9wcmVwKHN0ZDo6X18yOjppb3NfYmFzZSYsIGNoYXIqLCBjaGFyJiwgY2hhciYpnwPvAXN0ZDo6X18yOjpfX251bV9nZXQ8Y2hhcj46Ol9fc3RhZ2UyX2Zsb2F0X2xvb3AoY2hhciwgYm9vbCYsIGNoYXImLCBjaGFyKiwgY2hhciomLCBjaGFyLCBjaGFyLCBzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj4gY29uc3QmLCB1bnNpZ25lZCBpbnQqLCB1bnNpZ25lZCBpbnQqJiwgdW5zaWduZWQgaW50JiwgY2hhciopoANdZmxvYXQgc3RkOjpfXzI6Ol9fbnVtX2dldF9mbG9hdFthYmk6bmUxODAxMDBdPGZsb2F0PihjaGFyIGNvbnN0KiwgY2hhciBjb25zdCosIHVuc2lnbmVkIGludCYpoQOYAnN0ZDo6X18yOjpudW1fZ2V0PGNoYXIsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4+Ojpkb19nZXQoc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Piwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Piwgc3RkOjpfXzI6Omlvc19iYXNlJiwgdW5zaWduZWQgaW50JiwgZG91YmxlJikgY29uc3SiA19kb3VibGUgc3RkOjpfXzI6Ol9fbnVtX2dldF9mbG9hdFthYmk6bmUxODAxMDBdPGRvdWJsZT4oY2hhciBjb25zdCosIGNoYXIgY29uc3QqLCB1bnNpZ25lZCBpbnQmKaMDnQJzdGQ6Ol9fMjo6bnVtX2dldDxjaGFyLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Pjo6ZG9fZ2V0KHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIHVuc2lnbmVkIGludCYsIGxvbmcgZG91YmxlJikgY29uc3SkA2lsb25nIGRvdWJsZSBzdGQ6Ol9fMjo6X19udW1fZ2V0X2Zsb2F0W2FiaTpuZTE4MDEwMF08bG9uZyBkb3VibGU+KGNoYXIgY29uc3QqLCBjaGFyIGNvbnN0KiwgdW5zaWduZWQgaW50JimlA5cCc3RkOjpfXzI6Om51bV9nZXQ8Y2hhciwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pj46OmRvX2dldChzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCB2b2lkKiYpIGNvbnN0pgMSc3RkOjpfXzI6Ol9fY2xvYygppwNMc3RkOjpfXzI6Ol9fbGliY3BwX3NzY2FuZl9sKGNoYXIgY29uc3QqLCBfX2xvY2FsZV9zdHJ1Y3QqLCBjaGFyIGNvbnN0KiwgLi4uKagDYmNoYXIgY29uc3QqIHN0ZDo6X18yOjpmaW5kW2FiaTpuZTE4MDEwMF08Y2hhciBjb25zdCosIGNoYXI+KGNoYXIgY29uc3QqLCBjaGFyIGNvbnN0KiwgY2hhciBjb25zdCYpqQNXc3RkOjpfXzI6Ol9fbGliY3BwX2xvY2FsZV9ndWFyZDo6X19saWJjcHBfbG9jYWxlX2d1YXJkW2FiaTpuZTE4MDEwMF0oX19sb2NhbGVfc3RydWN0KiYpqgOrAnN0ZDo6X18yOjpudW1fZ2V0PHdjaGFyX3QsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4+Ojpkb19nZXQoc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Piwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Piwgc3RkOjpfXzI6Omlvc19iYXNlJiwgdW5zaWduZWQgaW50JiwgYm9vbCYpIGNvbnN0qwPmBXN0ZDo6X18yOjpiYXNpY19zdHJpbmc8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHdjaGFyX3Q+PiBjb25zdCogc3RkOjpfXzI6Ol9fc2Nhbl9rZXl3b3JkW2FiaTpuZTE4MDEwMF08c3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Piwgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4sIHN0ZDo6X18yOjphbGxvY2F0b3I8d2NoYXJfdD4+IGNvbnN0Kiwgc3RkOjpfXzI6OmN0eXBlPHdjaGFyX3Q+PihzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+Jiwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Piwgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4sIHN0ZDo6X18yOjphbGxvY2F0b3I8d2NoYXJfdD4+IGNvbnN0Kiwgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4sIHN0ZDo6X18yOjphbGxvY2F0b3I8d2NoYXJfdD4+IGNvbnN0Kiwgc3RkOjpfXzI6OmN0eXBlPHdjaGFyX3Q+IGNvbnN0JiwgdW5zaWduZWQgaW50JiwgYm9vbCmsA6sCc3RkOjpfXzI6Om51bV9nZXQ8d2NoYXJfdCwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Pj46OmRvX2dldChzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCBsb25nJikgY29uc3StA01zdGQ6Ol9fMjo6X19udW1fZ2V0PHdjaGFyX3Q+OjpfX2RvX3dpZGVuKHN0ZDo6X18yOjppb3NfYmFzZSYsIHdjaGFyX3QqKSBjb25zdK4DTnN0ZDo6X18yOjpfX251bV9nZXQ8d2NoYXJfdD46Ol9fc3RhZ2UyX2ludF9wcmVwKHN0ZDo6X18yOjppb3NfYmFzZSYsIHdjaGFyX3QmKa8D8AFzdGQ6Ol9fMjo6X19udW1fZ2V0PHdjaGFyX3Q+OjpfX3N0YWdlMl9pbnRfbG9vcCh3Y2hhcl90LCBpbnQsIGNoYXIqLCBjaGFyKiYsIHVuc2lnbmVkIGludCYsIHdjaGFyX3QsIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiBjb25zdCYsIHVuc2lnbmVkIGludCosIHVuc2lnbmVkIGludComLCB3Y2hhcl90IGNvbnN0KimwA7ACc3RkOjpfXzI6Om51bV9nZXQ8d2NoYXJfdCwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Pj46OmRvX2dldChzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCBsb25nIGxvbmcmKSBjb25zdLEDtQJzdGQ6Ol9fMjo6bnVtX2dldDx3Y2hhcl90LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+Pjo6ZG9fZ2V0KHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4sIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIHVuc2lnbmVkIGludCYsIHVuc2lnbmVkIHNob3J0JikgY29uc3SyA7MCc3RkOjpfXzI6Om51bV9nZXQ8d2NoYXJfdCwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Pj46OmRvX2dldChzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCB1bnNpZ25lZCBpbnQmKSBjb25zdLMDuQJzdGQ6Ol9fMjo6bnVtX2dldDx3Y2hhcl90LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+Pjo6ZG9fZ2V0KHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4sIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIHVuc2lnbmVkIGludCYsIHVuc2lnbmVkIGxvbmcgbG9uZyYpIGNvbnN0tAOsAnN0ZDo6X18yOjpudW1fZ2V0PHdjaGFyX3QsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4+Ojpkb19nZXQoc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Piwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Piwgc3RkOjpfXzI6Omlvc19iYXNlJiwgdW5zaWduZWQgaW50JiwgZmxvYXQmKSBjb25zdLUDZHN0ZDo6X18yOjpfX251bV9nZXQ8d2NoYXJfdD46Ol9fc3RhZ2UyX2Zsb2F0X3ByZXAoc3RkOjpfXzI6Omlvc19iYXNlJiwgd2NoYXJfdCosIHdjaGFyX3QmLCB3Y2hhcl90Jim2A/4Bc3RkOjpfXzI6Ol9fbnVtX2dldDx3Y2hhcl90Pjo6X19zdGFnZTJfZmxvYXRfbG9vcCh3Y2hhcl90LCBib29sJiwgY2hhciYsIGNoYXIqLCBjaGFyKiYsIHdjaGFyX3QsIHdjaGFyX3QsIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiBjb25zdCYsIHVuc2lnbmVkIGludCosIHVuc2lnbmVkIGludComLCB1bnNpZ25lZCBpbnQmLCB3Y2hhcl90Kim3A60Cc3RkOjpfXzI6Om51bV9nZXQ8d2NoYXJfdCwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Pj46OmRvX2dldChzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCBkb3VibGUmKSBjb25zdLgDsgJzdGQ6Ol9fMjo6bnVtX2dldDx3Y2hhcl90LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+Pjo6ZG9fZ2V0KHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4sIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIHVuc2lnbmVkIGludCYsIGxvbmcgZG91YmxlJikgY29uc3S5A6wCc3RkOjpfXzI6Om51bV9nZXQ8d2NoYXJfdCwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Pj46OmRvX2dldChzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCB2b2lkKiYpIGNvbnN0ugN0d2NoYXJfdCBjb25zdCogc3RkOjpfXzI6OmZpbmRbYWJpOm5lMTgwMTAwXTx3Y2hhcl90IGNvbnN0Kiwgd2NoYXJfdD4od2NoYXJfdCBjb25zdCosIHdjaGFyX3QgY29uc3QqLCB3Y2hhcl90IGNvbnN0Jim7A8oBc3RkOjpfXzI6Om51bV9wdXQ8Y2hhciwgc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pj46OmRvX3B1dChzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCBjaGFyLCBib29sKSBjb25zdLwDa3N0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+Pjo6YmVnaW5bYWJpOm5lMTgwMTAwXSgpvQNpc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+OjplbmRbYWJpOm5lMTgwMTAwXSgpvgPKAXN0ZDo6X18yOjpudW1fcHV0PGNoYXIsIHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4+Ojpkb19wdXQoc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Piwgc3RkOjpfXzI6Omlvc19iYXNlJiwgY2hhciwgbG9uZykgY29uc3S/A05zdGQ6Ol9fMjo6X19udW1fcHV0X2Jhc2U6Ol9fZm9ybWF0X2ludChjaGFyKiwgY2hhciBjb25zdCosIGJvb2wsIHVuc2lnbmVkIGludCnAA1dzdGQ6Ol9fMjo6X19saWJjcHBfc25wcmludGZfbChjaGFyKiwgdW5zaWduZWQgbG9uZywgX19sb2NhbGVfc3RydWN0KiwgY2hhciBjb25zdCosIC4uLinBA1VzdGQ6Ol9fMjo6X19udW1fcHV0X2Jhc2U6Ol9faWRlbnRpZnlfcGFkZGluZyhjaGFyKiwgY2hhciosIHN0ZDo6X18yOjppb3NfYmFzZSBjb25zdCYpwgN1c3RkOjpfXzI6Ol9fbnVtX3B1dDxjaGFyPjo6X193aWRlbl9hbmRfZ3JvdXBfaW50KGNoYXIqLCBjaGFyKiwgY2hhciosIGNoYXIqLCBjaGFyKiYsIGNoYXIqJiwgc3RkOjpfXzI6OmxvY2FsZSBjb25zdCYpwwOQAnN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4gc3RkOjpfXzI6Ol9fcGFkX2FuZF9vdXRwdXRbYWJpOm5lMTgwMTAwXTxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+KHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIGNoYXIgY29uc3QqLCBjaGFyIGNvbnN0KiwgY2hhciBjb25zdCosIHN0ZDo6X18yOjppb3NfYmFzZSYsIGNoYXIpxAPPAXN0ZDo6X18yOjpudW1fcHV0PGNoYXIsIHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4+Ojpkb19wdXQoc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Piwgc3RkOjpfXzI6Omlvc19iYXNlJiwgY2hhciwgbG9uZyBsb25nKSBjb25zdMUD0wFzdGQ6Ol9fMjo6bnVtX3B1dDxjaGFyLCBzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Pjo6ZG9fcHV0KHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIGNoYXIsIHVuc2lnbmVkIGxvbmcpIGNvbnN0xgPYAXN0ZDo6X18yOjpudW1fcHV0PGNoYXIsIHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4+Ojpkb19wdXQoc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Piwgc3RkOjpfXzI6Omlvc19iYXNlJiwgY2hhciwgdW5zaWduZWQgbG9uZyBsb25nKSBjb25zdMcDzAFzdGQ6Ol9fMjo6bnVtX3B1dDxjaGFyLCBzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Pjo6ZG9fcHV0KHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIGNoYXIsIGRvdWJsZSkgY29uc3TIA8ECc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+PiBzdGQ6Ol9fMjo6bnVtX3B1dDxjaGFyLCBzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Pjo6X19kb19wdXRfZmxvYXRpbmdfcG9pbnRbYWJpOm5lMTgwMTAwXTxkb3VibGU+KHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIGNoYXIsIGRvdWJsZSwgY2hhciBjb25zdCopIGNvbnN0yQNKc3RkOjpfXzI6Ol9fbnVtX3B1dF9iYXNlOjpfX2Zvcm1hdF9mbG9hdChjaGFyKiwgY2hhciBjb25zdCosIHVuc2lnbmVkIGludCnKA0lzdGQ6Ol9fMjo6X19saWJjcHBfYXNwcmludGZfbChjaGFyKiosIF9fbG9jYWxlX3N0cnVjdCosIGNoYXIgY29uc3QqLCAuLi4pywN3c3RkOjpfXzI6Ol9fbnVtX3B1dDxjaGFyPjo6X193aWRlbl9hbmRfZ3JvdXBfZmxvYXQoY2hhciosIGNoYXIqLCBjaGFyKiwgY2hhciosIGNoYXIqJiwgY2hhciomLCBzdGQ6Ol9fMjo6bG9jYWxlIGNvbnN0JinMA9EBc3RkOjpfXzI6Om51bV9wdXQ8Y2hhciwgc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pj46OmRvX3B1dChzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCBjaGFyLCBsb25nIGRvdWJsZSkgY29uc3TNA8sCc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+PiBzdGQ6Ol9fMjo6bnVtX3B1dDxjaGFyLCBzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Pjo6X19kb19wdXRfZmxvYXRpbmdfcG9pbnRbYWJpOm5lMTgwMTAwXTxsb25nIGRvdWJsZT4oc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Piwgc3RkOjpfXzI6Omlvc19iYXNlJiwgY2hhciwgbG9uZyBkb3VibGUsIGNoYXIgY29uc3QqKSBjb25zdM4D0QFzdGQ6Ol9fMjo6bnVtX3B1dDxjaGFyLCBzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Pjo6ZG9fcHV0KHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIGNoYXIsIHZvaWQgY29uc3QqKSBjb25zdM8DhQFzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj46OmJhc2ljX3N0cmluZ1thYmk6bmUxODAxMDBdKHVuc2lnbmVkIGxvbmcsIGNoYXIp0APcAXN0ZDo6X18yOjpudW1fcHV0PHdjaGFyX3QsIHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4+Ojpkb19wdXQoc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Piwgc3RkOjpfXzI6Omlvc19iYXNlJiwgd2NoYXJfdCwgYm9vbCkgY29uc3TRA3JzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Piwgc3RkOjpfXzI6OmFsbG9jYXRvcjx3Y2hhcl90Pj46OmVuZFthYmk6bmUxODAxMDBdKCnSA9wBc3RkOjpfXzI6Om51bV9wdXQ8d2NoYXJfdCwgc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Pj46OmRvX3B1dChzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB3Y2hhcl90LCBsb25nKSBjb25zdNMDgQFzdGQ6Ol9fMjo6X19udW1fcHV0PHdjaGFyX3Q+OjpfX3dpZGVuX2FuZF9ncm91cF9pbnQoY2hhciosIGNoYXIqLCBjaGFyKiwgd2NoYXJfdCosIHdjaGFyX3QqJiwgd2NoYXJfdComLCBzdGQ6Ol9fMjo6bG9jYWxlIGNvbnN0JinUA64Cc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+PiBzdGQ6Ol9fMjo6X19wYWRfYW5kX291dHB1dFthYmk6bmUxODAxMDBdPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4oc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Piwgd2NoYXJfdCBjb25zdCosIHdjaGFyX3QgY29uc3QqLCB3Y2hhcl90IGNvbnN0Kiwgc3RkOjpfXzI6Omlvc19iYXNlJiwgd2NoYXJfdCnVA+EBc3RkOjpfXzI6Om51bV9wdXQ8d2NoYXJfdCwgc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Pj46OmRvX3B1dChzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB3Y2hhcl90LCBsb25nIGxvbmcpIGNvbnN01gPlAXN0ZDo6X18yOjpudW1fcHV0PHdjaGFyX3QsIHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4+Ojpkb19wdXQoc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Piwgc3RkOjpfXzI6Omlvc19iYXNlJiwgd2NoYXJfdCwgdW5zaWduZWQgbG9uZykgY29uc3TXA+oBc3RkOjpfXzI6Om51bV9wdXQ8d2NoYXJfdCwgc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Pj46OmRvX3B1dChzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB3Y2hhcl90LCB1bnNpZ25lZCBsb25nIGxvbmcpIGNvbnN02APeAXN0ZDo6X18yOjpudW1fcHV0PHdjaGFyX3QsIHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4+Ojpkb19wdXQoc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Piwgc3RkOjpfXzI6Omlvc19iYXNlJiwgd2NoYXJfdCwgZG91YmxlKSBjb25zdNkD2QJzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+IHN0ZDo6X18yOjpudW1fcHV0PHdjaGFyX3QsIHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4+OjpfX2RvX3B1dF9mbG9hdGluZ19wb2ludFthYmk6bmUxODAxMDBdPGRvdWJsZT4oc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Piwgc3RkOjpfXzI6Omlvc19iYXNlJiwgd2NoYXJfdCwgZG91YmxlLCBjaGFyIGNvbnN0KikgY29uc3TaA4MBc3RkOjpfXzI6Ol9fbnVtX3B1dDx3Y2hhcl90Pjo6X193aWRlbl9hbmRfZ3JvdXBfZmxvYXQoY2hhciosIGNoYXIqLCBjaGFyKiwgd2NoYXJfdCosIHdjaGFyX3QqJiwgd2NoYXJfdComLCBzdGQ6Ol9fMjo6bG9jYWxlIGNvbnN0JinbA+MBc3RkOjpfXzI6Om51bV9wdXQ8d2NoYXJfdCwgc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Pj46OmRvX3B1dChzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB3Y2hhcl90LCBsb25nIGRvdWJsZSkgY29uc3TcA+MCc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+PiBzdGQ6Ol9fMjo6bnVtX3B1dDx3Y2hhcl90LCBzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+Pjo6X19kb19wdXRfZmxvYXRpbmdfcG9pbnRbYWJpOm5lMTgwMTAwXTxsb25nIGRvdWJsZT4oc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Piwgc3RkOjpfXzI6Omlvc19iYXNlJiwgd2NoYXJfdCwgbG9uZyBkb3VibGUsIGNoYXIgY29uc3QqKSBjb25zdN0D4wFzdGQ6Ol9fMjo6bnVtX3B1dDx3Y2hhcl90LCBzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+Pjo6ZG9fcHV0KHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIHdjaGFyX3QsIHZvaWQgY29uc3QqKSBjb25zdN4DkQFzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Piwgc3RkOjpfXzI6OmFsbG9jYXRvcjx3Y2hhcl90Pj46OmJhc2ljX3N0cmluZ1thYmk6bmUxODAxMDBdKHVuc2lnbmVkIGxvbmcsIHdjaGFyX3Qp3wNfdm9pZCBzdGQ6Ol9fMjo6X19yZXZlcnNlW2FiaTpuZTE4MDEwMF08c3RkOjpfXzI6Ol9DbGFzc2ljQWxnUG9saWN5LCBjaGFyKiwgY2hhcio+KGNoYXIqLCBjaGFyKingA2t2b2lkIHN0ZDo6X18yOjpfX3JldmVyc2VbYWJpOm5lMTgwMTAwXTxzdGQ6Ol9fMjo6X0NsYXNzaWNBbGdQb2xpY3ksIHdjaGFyX3QqLCB3Y2hhcl90Kj4od2NoYXJfdCosIHdjaGFyX3QqKeEDrAJzdGQ6Ol9fMjo6dGltZV9nZXQ8Y2hhciwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pj46OmdldChzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCB0bSosIGNoYXIgY29uc3QqLCBjaGFyIGNvbnN0KikgY29uc3TiA3FzdGQ6Ol9fMjo6dGltZV9nZXQ8Y2hhciwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pj46OmRvX2RhdGVfb3JkZXIoKSBjb25zdOMDmgJzdGQ6Ol9fMjo6dGltZV9nZXQ8Y2hhciwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pj46OmRvX2dldF90aW1lKHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIHVuc2lnbmVkIGludCYsIHRtKikgY29uc3TkA5oCc3RkOjpfXzI6OnRpbWVfZ2V0PGNoYXIsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4+Ojpkb19nZXRfZGF0ZShzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCB0bSopIGNvbnN05QOdAnN0ZDo6X18yOjp0aW1lX2dldDxjaGFyLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Pjo6ZG9fZ2V0X3dlZWtkYXkoc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Piwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Piwgc3RkOjpfXzI6Omlvc19iYXNlJiwgdW5zaWduZWQgaW50JiwgdG0qKSBjb25zdOYDqwJzdGQ6Ol9fMjo6dGltZV9nZXQ8Y2hhciwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pj46Ol9fZ2V0X3dlZWtkYXluYW1lKGludCYsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4mLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+LCB1bnNpZ25lZCBpbnQmLCBzdGQ6Ol9fMjo6Y3R5cGU8Y2hhcj4gY29uc3QmKSBjb25zdOcDnwJzdGQ6Ol9fMjo6dGltZV9nZXQ8Y2hhciwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pj46OmRvX2dldF9tb250aG5hbWUoc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Piwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Piwgc3RkOjpfXzI6Omlvc19iYXNlJiwgdW5zaWduZWQgaW50JiwgdG0qKSBjb25zdOgDqQJzdGQ6Ol9fMjo6dGltZV9nZXQ8Y2hhciwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pj46Ol9fZ2V0X21vbnRobmFtZShpbnQmLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Jiwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+PiwgdW5zaWduZWQgaW50Jiwgc3RkOjpfXzI6OmN0eXBlPGNoYXI+IGNvbnN0JikgY29uc3TpA5oCc3RkOjpfXzI6OnRpbWVfZ2V0PGNoYXIsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4+Ojpkb19nZXRfeWVhcihzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCB0bSopIGNvbnN06gOkAnN0ZDo6X18yOjp0aW1lX2dldDxjaGFyLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Pjo6X19nZXRfeWVhcihpbnQmLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Jiwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+PiwgdW5zaWduZWQgaW50Jiwgc3RkOjpfXzI6OmN0eXBlPGNoYXI+IGNvbnN0JikgY29uc3TrA68CaW50IHN0ZDo6X18yOjpfX2dldF91cF90b19uX2RpZ2l0c1thYmk6bmUxODAxMDBdPGNoYXIsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4+KHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4mLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+LCB1bnNpZ25lZCBpbnQmLCBzdGQ6Ol9fMjo6Y3R5cGU8Y2hhcj4gY29uc3QmLCBpbnQp7AOhAnN0ZDo6X18yOjp0aW1lX2dldDxjaGFyLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Pjo6ZG9fZ2V0KHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIHVuc2lnbmVkIGludCYsIHRtKiwgY2hhciwgY2hhcikgY29uc3TtA8cCc3RkOjpfXzI6OnRpbWVfZ2V0PHdjaGFyX3QsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4+OjpnZXQoc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Piwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Piwgc3RkOjpfXzI6Omlvc19iYXNlJiwgdW5zaWduZWQgaW50JiwgdG0qLCB3Y2hhcl90IGNvbnN0Kiwgd2NoYXJfdCBjb25zdCopIGNvbnN07gOvAnN0ZDo6X18yOjp0aW1lX2dldDx3Y2hhcl90LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+Pjo6ZG9fZ2V0X3RpbWUoc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Piwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Piwgc3RkOjpfXzI6Omlvc19iYXNlJiwgdW5zaWduZWQgaW50JiwgdG0qKSBjb25zdO8DrwJzdGQ6Ol9fMjo6dGltZV9nZXQ8d2NoYXJfdCwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Pj46OmRvX2dldF9kYXRlKHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4sIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIHVuc2lnbmVkIGludCYsIHRtKikgY29uc3TwA7ICc3RkOjpfXzI6OnRpbWVfZ2V0PHdjaGFyX3QsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4+Ojpkb19nZXRfd2Vla2RheShzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCB0bSopIGNvbnN08QPDAnN0ZDo6X18yOjp0aW1lX2dldDx3Y2hhcl90LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+Pjo6X19nZXRfd2Vla2RheW5hbWUoaW50Jiwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+PiYsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4sIHVuc2lnbmVkIGludCYsIHN0ZDo6X18yOjpjdHlwZTx3Y2hhcl90PiBjb25zdCYpIGNvbnN08gO0AnN0ZDo6X18yOjp0aW1lX2dldDx3Y2hhcl90LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+Pjo6ZG9fZ2V0X21vbnRobmFtZShzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCB0bSopIGNvbnN08wPBAnN0ZDo6X18yOjp0aW1lX2dldDx3Y2hhcl90LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+Pjo6X19nZXRfbW9udGhuYW1lKGludCYsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4mLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+LCB1bnNpZ25lZCBpbnQmLCBzdGQ6Ol9fMjo6Y3R5cGU8d2NoYXJfdD4gY29uc3QmKSBjb25zdPQDrwJzdGQ6Ol9fMjo6dGltZV9nZXQ8d2NoYXJfdCwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Pj46OmRvX2dldF95ZWFyKHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4sIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIHVuc2lnbmVkIGludCYsIHRtKikgY29uc3T1A7wCc3RkOjpfXzI6OnRpbWVfZ2V0PHdjaGFyX3QsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4+OjpfX2dldF95ZWFyKGludCYsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4mLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+LCB1bnNpZ25lZCBpbnQmLCBzdGQ6Ol9fMjo6Y3R5cGU8d2NoYXJfdD4gY29uc3QmKSBjb25zdPYDxwJpbnQgc3RkOjpfXzI6Ol9fZ2V0X3VwX3RvX25fZGlnaXRzW2FiaTpuZTE4MDEwMF08d2NoYXJfdCwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Pj4oc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+PiYsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4sIHVuc2lnbmVkIGludCYsIHN0ZDo6X18yOjpjdHlwZTx3Y2hhcl90PiBjb25zdCYsIGludCn3A7YCc3RkOjpfXzI6OnRpbWVfZ2V0PHdjaGFyX3QsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4+Ojpkb19nZXQoc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Piwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Piwgc3RkOjpfXzI6Omlvc19iYXNlJiwgdW5zaWduZWQgaW50JiwgdG0qLCBjaGFyLCBjaGFyKSBjb25zdPgD3AFzdGQ6Ol9fMjo6dGltZV9wdXQ8Y2hhciwgc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pj46OmRvX3B1dChzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCBjaGFyLCB0bSBjb25zdCosIGNoYXIsIGNoYXIpIGNvbnN0+QNKc3RkOjpfXzI6Ol9fdGltZV9wdXQ6Ol9fZG9fcHV0KGNoYXIqLCBjaGFyKiYsIHRtIGNvbnN0KiwgY2hhciwgY2hhcikgY29uc3T6A+4Bc3RkOjpfXzI6OnRpbWVfcHV0PHdjaGFyX3QsIHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4+Ojpkb19wdXQoc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Piwgc3RkOjpfXzI6Omlvc19iYXNlJiwgd2NoYXJfdCwgdG0gY29uc3QqLCBjaGFyLCBjaGFyKSBjb25zdPsDO3N0ZDo6X18yOjptb25leXB1bmN0PGNoYXIsIGZhbHNlPjo6ZG9fZGVjaW1hbF9wb2ludCgpIGNvbnN0/AM2c3RkOjpfXzI6Om1vbmV5cHVuY3Q8Y2hhciwgZmFsc2U+Ojpkb19ncm91cGluZygpIGNvbnN0/QM7c3RkOjpfXzI6Om1vbmV5cHVuY3Q8Y2hhciwgZmFsc2U+Ojpkb19uZWdhdGl2ZV9zaWduKCkgY29uc3T+AzhzdGQ6Ol9fMjo6bW9uZXlwdW5jdDxjaGFyLCBmYWxzZT46OmRvX3Bvc19mb3JtYXQoKSBjb25zdP8DPnN0ZDo6X18yOjptb25leXB1bmN0PHdjaGFyX3QsIGZhbHNlPjo6ZG9fZGVjaW1hbF9wb2ludCgpIGNvbnN0gAQ+c3RkOjpfXzI6Om1vbmV5cHVuY3Q8d2NoYXJfdCwgZmFsc2U+Ojpkb19uZWdhdGl2ZV9zaWduKCkgY29uc3SBBL8Bc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+OjpiYXNpY19zdHJpbmcoc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+IGNvbnN0JimCBKUCc3RkOjpfXzI6Om1vbmV5X2dldDxjaGFyLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Pjo6ZG9fZ2V0KHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIGJvb2wsIHN0ZDo6X18yOjppb3NfYmFzZSYsIHVuc2lnbmVkIGludCYsIGxvbmcgZG91YmxlJikgY29uc3SDBIgDc3RkOjpfXzI6Om1vbmV5X2dldDxjaGFyLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Pjo6X19kb19nZXQoc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+PiYsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIGJvb2wsIHN0ZDo6X18yOjpsb2NhbGUgY29uc3QmLCB1bnNpZ25lZCBpbnQsIHVuc2lnbmVkIGludCYsIGJvb2wmLCBzdGQ6Ol9fMjo6Y3R5cGU8Y2hhcj4gY29uc3QmLCBzdGQ6Ol9fMjo6dW5pcXVlX3B0cjxjaGFyLCB2b2lkICgqKSh2b2lkKik+JiwgY2hhciomLCBjaGFyKimEBF9zdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+OjpvcGVyYXRvcisrW2FiaTpuZTE4MDEwMF0oaW50KYUEdHZvaWQgc3RkOjpfXzI6Ol9fZG91YmxlX29yX25vdGhpbmdbYWJpOm5lMTgwMTAwXTxjaGFyPihzdGQ6Ol9fMjo6dW5pcXVlX3B0cjxjaGFyLCB2b2lkICgqKSh2b2lkKik+JiwgY2hhciomLCBjaGFyKiYphgSUAXZvaWQgc3RkOjpfXzI6Ol9fZG91YmxlX29yX25vdGhpbmdbYWJpOm5lMTgwMTAwXTx1bnNpZ25lZCBpbnQ+KHN0ZDo6X18yOjp1bmlxdWVfcHRyPHVuc2lnbmVkIGludCwgdm9pZCAoKikodm9pZCopPiYsIHVuc2lnbmVkIGludComLCB1bnNpZ25lZCBpbnQqJimHBO4Cc3RkOjpfXzI6Om1vbmV5X2dldDxjaGFyLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Pjo6ZG9fZ2V0KHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIGJvb2wsIHN0ZDo6X18yOjppb3NfYmFzZSYsIHVuc2lnbmVkIGludCYsIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiYpIGNvbnN0iATYAXN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiYgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+OjphcHBlbmRbYWJpOm5lMTgwMTAwXTxjaGFyKiwgMD4oY2hhciosIGNoYXIqKYkE1wFzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj46Ol9fZ3Jvd19ieV93aXRob3V0X3JlcGxhY2VbYWJpOm5lMTgwMTAwXSh1bnNpZ25lZCBsb25nLCB1bnNpZ25lZCBsb25nLCB1bnNpZ25lZCBsb25nLCB1bnNpZ25lZCBsb25nLCB1bnNpZ25lZCBsb25nLCB1bnNpZ25lZCBsb25nKYoEfXN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+Pjo6X19zZXRfc2l6ZVthYmk6bmUxODAxMDBdKHVuc2lnbmVkIGxvbmcpiwRBc3RkOjpfXzI6Ol9fd3JhcF9pdGVyPGNoYXIqPjo6b3BlcmF0b3IrW2FiaTpuZTE4MDEwMF0obG9uZykgY29uc3SMBHNzdGQ6Ol9fMjo6dW5pcXVlX3B0cjxjaGFyLCB2b2lkICgqKSh2b2lkKik+OjpvcGVyYXRvcj1bYWJpOm5lMTgwMTAwXShzdGQ6Ol9fMjo6dW5pcXVlX3B0cjxjaGFyLCB2b2lkICgqKSh2b2lkKik+JiYpjQS6AnN0ZDo6X18yOjptb25leV9nZXQ8d2NoYXJfdCwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Pj46OmRvX2dldChzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+LCBib29sLCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCBsb25nIGRvdWJsZSYpIGNvbnN0jgSpA3N0ZDo6X18yOjptb25leV9nZXQ8d2NoYXJfdCwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Pj46Ol9fZG9fZ2V0KHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4mLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+LCBib29sLCBzdGQ6Ol9fMjo6bG9jYWxlIGNvbnN0JiwgdW5zaWduZWQgaW50LCB1bnNpZ25lZCBpbnQmLCBib29sJiwgc3RkOjpfXzI6OmN0eXBlPHdjaGFyX3Q+IGNvbnN0Jiwgc3RkOjpfXzI6OnVuaXF1ZV9wdHI8d2NoYXJfdCwgdm9pZCAoKikodm9pZCopPiYsIHdjaGFyX3QqJiwgd2NoYXJfdCopjwRlc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Pjo6b3BlcmF0b3IrK1thYmk6bmUxODAxMDBdKGludCmQBIwDc3RkOjpfXzI6Om1vbmV5X2dldDx3Y2hhcl90LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+Pjo6ZG9fZ2V0KHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4sIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4sIGJvb2wsIHN0ZDo6X18yOjppb3NfYmFzZSYsIHVuc2lnbmVkIGludCYsIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHdjaGFyX3Q+PiYpIGNvbnN0kQTzAXN0ZDo6X18yOjpiYXNpY19zdHJpbmc8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHdjaGFyX3Q+PiYgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4sIHN0ZDo6X18yOjphbGxvY2F0b3I8d2NoYXJfdD4+OjphcHBlbmRbYWJpOm5lMTgwMTAwXTx3Y2hhcl90KiwgMD4od2NoYXJfdCosIHdjaGFyX3QqKZIE4AFzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Piwgc3RkOjpfXzI6OmFsbG9jYXRvcjx3Y2hhcl90Pj46Ol9fZ3Jvd19ieV93aXRob3V0X3JlcGxhY2VbYWJpOm5lMTgwMTAwXSh1bnNpZ25lZCBsb25nLCB1bnNpZ25lZCBsb25nLCB1bnNpZ25lZCBsb25nLCB1bnNpZ25lZCBsb25nLCB1bnNpZ25lZCBsb25nLCB1bnNpZ25lZCBsb25nKZME1wFzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Piwgc3RkOjpfXzI6OmFsbG9jYXRvcjx3Y2hhcl90Pj46Om9wZXJhdG9yPVthYmk6bmUxODAxMDBdKHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHdjaGFyX3Q+PiYmKZQERHN0ZDo6X18yOjpfX3dyYXBfaXRlcjx3Y2hhcl90Kj46Om9wZXJhdG9yK1thYmk6bmUxODAxMDBdKGxvbmcpIGNvbnN0lQTZAXN0ZDo6X18yOjptb25leV9wdXQ8Y2hhciwgc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pj46OmRvX3B1dChzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+LCBib29sLCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCBjaGFyLCBsb25nIGRvdWJsZSkgY29uc3SWBIgDc3RkOjpfXzI6Ol9fbW9uZXlfcHV0PGNoYXI+OjpfX2dhdGhlcl9pbmZvKGJvb2wsIGJvb2wsIHN0ZDo6X18yOjpsb2NhbGUgY29uc3QmLCBzdGQ6Ol9fMjo6bW9uZXlfYmFzZTo6cGF0dGVybiYsIGNoYXImLCBjaGFyJiwgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+Jiwgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+Jiwgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+JiwgaW50JimXBNYDc3RkOjpfXzI6Ol9fbW9uZXlfcHV0PGNoYXI+OjpfX2Zvcm1hdChjaGFyKiwgY2hhciomLCBjaGFyKiYsIHVuc2lnbmVkIGludCwgY2hhciBjb25zdCosIGNoYXIgY29uc3QqLCBzdGQ6Ol9fMjo6Y3R5cGU8Y2hhcj4gY29uc3QmLCBib29sLCBzdGQ6Ol9fMjo6bW9uZXlfYmFzZTo6cGF0dGVybiBjb25zdCYsIGNoYXIsIGNoYXIsIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiBjb25zdCYsIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiBjb25zdCYsIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiBjb25zdCYsIGludCmYBJwBY2hhciogc3RkOjpfXzI6OmNvcHlbYWJpOm5lMTgwMTAwXTxzdGQ6Ol9fMjo6X193cmFwX2l0ZXI8Y2hhciBjb25zdCo+LCBjaGFyKj4oc3RkOjpfXzI6Ol9fd3JhcF9pdGVyPGNoYXIgY29uc3QqPiwgc3RkOjpfXzI6Ol9fd3JhcF9pdGVyPGNoYXIgY29uc3QqPiwgY2hhciopmQSpAnN0ZDo6X18yOjptb25leV9wdXQ8Y2hhciwgc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pj46OmRvX3B1dChzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+LCBib29sLCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCBjaGFyLCBzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj4gY29uc3QmKSBjb25zdJoE6wFzdGQ6Ol9fMjo6bW9uZXlfcHV0PHdjaGFyX3QsIHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4+Ojpkb19wdXQoc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+PiwgYm9vbCwgc3RkOjpfXzI6Omlvc19iYXNlJiwgd2NoYXJfdCwgbG9uZyBkb3VibGUpIGNvbnN0mwSjA3N0ZDo6X18yOjpfX21vbmV5X3B1dDx3Y2hhcl90Pjo6X19nYXRoZXJfaW5mbyhib29sLCBib29sLCBzdGQ6Ol9fMjo6bG9jYWxlIGNvbnN0Jiwgc3RkOjpfXzI6Om1vbmV5X2Jhc2U6OnBhdHRlcm4mLCB3Y2hhcl90Jiwgd2NoYXJfdCYsIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiYsIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHdjaGFyX3Q+PiYsIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHdjaGFyX3Q+PiYsIGludCYpnASDBHN0ZDo6X18yOjpfX21vbmV5X3B1dDx3Y2hhcl90Pjo6X19mb3JtYXQod2NoYXJfdCosIHdjaGFyX3QqJiwgd2NoYXJfdComLCB1bnNpZ25lZCBpbnQsIHdjaGFyX3QgY29uc3QqLCB3Y2hhcl90IGNvbnN0Kiwgc3RkOjpfXzI6OmN0eXBlPHdjaGFyX3Q+IGNvbnN0JiwgYm9vbCwgc3RkOjpfXzI6Om1vbmV5X2Jhc2U6OnBhdHRlcm4gY29uc3QmLCB3Y2hhcl90LCB3Y2hhcl90LCBzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj4gY29uc3QmLCBzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Piwgc3RkOjpfXzI6OmFsbG9jYXRvcjx3Y2hhcl90Pj4gY29uc3QmLCBzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Piwgc3RkOjpfXzI6OmFsbG9jYXRvcjx3Y2hhcl90Pj4gY29uc3QmLCBpbnQpnQSuAXdjaGFyX3QqIHN0ZDo6X18yOjpjb3B5W2FiaTpuZTE4MDEwMF08c3RkOjpfXzI6Ol9fd3JhcF9pdGVyPHdjaGFyX3QgY29uc3QqPiwgd2NoYXJfdCo+KHN0ZDo6X18yOjpfX3dyYXBfaXRlcjx3Y2hhcl90IGNvbnN0Kj4sIHN0ZDo6X18yOjpfX3dyYXBfaXRlcjx3Y2hhcl90IGNvbnN0Kj4sIHdjaGFyX3QqKZ4ExAJzdGQ6Ol9fMjo6bW9uZXlfcHV0PHdjaGFyX3QsIHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4+Ojpkb19wdXQoc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+PiwgYm9vbCwgc3RkOjpfXzI6Omlvc19iYXNlJiwgd2NoYXJfdCwgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4sIHN0ZDo6X18yOjphbGxvY2F0b3I8d2NoYXJfdD4+IGNvbnN0JikgY29uc3SfBJ0Bc3RkOjpfXzI6Om1lc3NhZ2VzPGNoYXI+Ojpkb19vcGVuKHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiBjb25zdCYsIHN0ZDo6X18yOjpsb2NhbGUgY29uc3QmKSBjb25zdKAEkwFzdGQ6Ol9fMjo6bWVzc2FnZXM8Y2hhcj46OmRvX2dldChsb25nLCBpbnQsIGludCwgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+IGNvbnN0JikgY29uc3ShBJ8Bc3RkOjpfXzI6Om1lc3NhZ2VzPHdjaGFyX3Q+Ojpkb19nZXQobG9uZywgaW50LCBpbnQsIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHdjaGFyX3Q+PiBjb25zdCYpIGNvbnN0ogQ5c3RkOjpfXzI6OmNvZGVjdnQ8d2NoYXJfdCwgY2hhciwgX19tYnN0YXRlX3Q+Ojp+Y29kZWN2dCgpowRsc3RkOjpfXzI6OmJhc2ljX3N0cmluZ192aWV3PGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj46OmJhc2ljX3N0cmluZ192aWV3W2FiaTpuZTE4MDEwMF0oY2hhciBjb25zdCoppATpAWJvb2wgc3RkOjpfXzI6Om9wZXJhdG9yPT1bYWJpOm5lMTgwMTAwXTxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+KHN0ZDo6X18yOjpiYXNpY19zdHJpbmdfdmlldzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+LCBzdGQ6Ol9fMjo6dHlwZV9pZGVudGl0eTxzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nX3ZpZXc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pj46OnR5cGUppQR+c3RkOjpfXzI6OnZlY3RvcjxzdGQ6Ol9fMjo6bG9jYWxlOjpmYWNldCosIHN0ZDo6X18yOjpfX3Nzb19hbGxvY2F0b3I8c3RkOjpfXzI6OmxvY2FsZTo6ZmFjZXQqLCAzMHVsPj46On52ZWN0b3JbYWJpOm5lMTgwMTAwXSgppgSIAXN0ZDo6X18yOjp2ZWN0b3I8c3RkOjpfXzI6OmxvY2FsZTo6ZmFjZXQqLCBzdGQ6Ol9fMjo6X19zc29fYWxsb2NhdG9yPHN0ZDo6X18yOjpsb2NhbGU6OmZhY2V0KiwgMzB1bD4+OjpfX2NvbnN0cnVjdF9hdF9lbmQodW5zaWduZWQgbG9uZymnBM4Bc3RkOjpfXzI6Ol9fZXhjZXB0aW9uX2d1YXJkX2V4Y2VwdGlvbnM8c3RkOjpfXzI6OnZlY3RvcjxzdGQ6Ol9fMjo6bG9jYWxlOjpmYWNldCosIHN0ZDo6X18yOjpfX3Nzb19hbGxvY2F0b3I8c3RkOjpfXzI6OmxvY2FsZTo6ZmFjZXQqLCAzMHVsPj46Ol9fZGVzdHJveV92ZWN0b3I+Ojp+X19leGNlcHRpb25fZ3VhcmRfZXhjZXB0aW9uc1thYmk6bmUxODAxMDBdKCmoBH5zdGQ6Ol9fMjo6dmVjdG9yPHN0ZDo6X18yOjpsb2NhbGU6OmZhY2V0Kiwgc3RkOjpfXzI6Ol9fc3NvX2FsbG9jYXRvcjxzdGQ6Ol9fMjo6bG9jYWxlOjpmYWNldCosIDMwdWw+Pjo6X19jbGVhclthYmk6bmUxODAxMDBdKCmpBB1zdGQ6Ol9fMjo6bG9jYWxlOjppZDo6X19nZXQoKaoEQHN0ZDo6X18yOjpsb2NhbGU6Ol9faW1wOjppbnN0YWxsKHN0ZDo6X18yOjpsb2NhbGU6OmZhY2V0KiwgbG9uZymrBJMBc3RkOjpfXzI6OnZlY3RvcjxzdGQ6Ol9fMjo6bG9jYWxlOjpmYWNldCosIHN0ZDo6X18yOjpfX3Nzb19hbGxvY2F0b3I8c3RkOjpfXzI6OmxvY2FsZTo6ZmFjZXQqLCAzMHVsPj46Ol9fZGVzdHJveV92ZWN0b3I6Om9wZXJhdG9yKClbYWJpOm5lMTgwMTAwXSgprASHAXN0ZDo6X18yOjp1bmlxdWVfcHRyPHN0ZDo6X18yOjpsb2NhbGU6OmZhY2V0LCBzdGQ6Ol9fMjo6KGFub255bW91cyBuYW1lc3BhY2UpOjpyZWxlYXNlcj46OnJlc2V0W2FiaTpuZTE4MDEwMF0oc3RkOjpfXzI6OmxvY2FsZTo6ZmFjZXQqKa0EIXN0ZDo6X18yOjpsb2NhbGU6Ol9faW1wOjp+X19pbXAoKa4EI3N0ZDo6X18yOjpsb2NhbGU6Ol9faW1wOjp+X19pbXAoKS4xrwR+c3RkOjpfXzI6OnZlY3RvcjxzdGQ6Ol9fMjo6bG9jYWxlOjpmYWNldCosIHN0ZDo6X18yOjpfX3Nzb19hbGxvY2F0b3I8c3RkOjpfXzI6OmxvY2FsZTo6ZmFjZXQqLCAzMHVsPj46Ol9fYXBwZW5kKHVuc2lnbmVkIGxvbmcpsAQuc3RkOjpfXzI6OmxvY2FsZTo6X19pbXA6Omhhc19mYWNldChsb25nKSBjb25zdLEEGnN0ZDo6X18yOjpsb2NhbGU6OmxvY2FsZSgpsgQbc3RkOjpfXzI6OmxvY2FsZTo6fmxvY2FsZSgpswQrc3RkOjpfXzI6OmxvY2FsZTo6ZmFjZXQ6Ol9fb25femVyb19zaGFyZWQoKbQEbHZvaWQgc3RkOjpfXzI6Ol9fY2FsbF9vbmNlX3Byb3h5W2FiaTpuZTE4MDEwMF08c3RkOjpfXzI6OnR1cGxlPHN0ZDo6X18yOjpsb2NhbGU6OmlkOjpfX2dldCgpOjokXzAmJj4+KHZvaWQqKbUEyAFzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj46OmJhc2ljX3N0cmluZ1thYmk6bmUxODAxMDBdKHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiYmKbYEPXN0ZDo6X18yOjpjdHlwZTx3Y2hhcl90Pjo6ZG9faXModW5zaWduZWQgbG9uZywgd2NoYXJfdCkgY29uc3S3BFVzdGQ6Ol9fMjo6Y3R5cGU8d2NoYXJfdD46OmRvX2lzKHdjaGFyX3QgY29uc3QqLCB3Y2hhcl90IGNvbnN0KiwgdW5zaWduZWQgbG9uZyopIGNvbnN0uARZc3RkOjpfXzI6OmN0eXBlPHdjaGFyX3Q+Ojpkb19zY2FuX2lzKHVuc2lnbmVkIGxvbmcsIHdjaGFyX3QgY29uc3QqLCB3Y2hhcl90IGNvbnN0KikgY29uc3S5BFpzdGQ6Ol9fMjo6Y3R5cGU8d2NoYXJfdD46OmRvX3NjYW5fbm90KHVuc2lnbmVkIGxvbmcsIHdjaGFyX3QgY29uc3QqLCB3Y2hhcl90IGNvbnN0KikgY29uc3S6BDNzdGQ6Ol9fMjo6Y3R5cGU8d2NoYXJfdD46OmRvX3RvdXBwZXIod2NoYXJfdCkgY29uc3S7BERzdGQ6Ol9fMjo6Y3R5cGU8d2NoYXJfdD46OmRvX3RvdXBwZXIod2NoYXJfdCosIHdjaGFyX3QgY29uc3QqKSBjb25zdLwEM3N0ZDo6X18yOjpjdHlwZTx3Y2hhcl90Pjo6ZG9fdG9sb3dlcih3Y2hhcl90KSBjb25zdL0ERHN0ZDo6X18yOjpjdHlwZTx3Y2hhcl90Pjo6ZG9fdG9sb3dlcih3Y2hhcl90Kiwgd2NoYXJfdCBjb25zdCopIGNvbnN0vgRMc3RkOjpfXzI6OmN0eXBlPHdjaGFyX3Q+Ojpkb193aWRlbihjaGFyIGNvbnN0KiwgY2hhciBjb25zdCosIHdjaGFyX3QqKSBjb25zdL8EOHN0ZDo6X18yOjpjdHlwZTx3Y2hhcl90Pjo6ZG9fbmFycm93KHdjaGFyX3QsIGNoYXIpIGNvbnN0wARWc3RkOjpfXzI6OmN0eXBlPHdjaGFyX3Q+Ojpkb19uYXJyb3cod2NoYXJfdCBjb25zdCosIHdjaGFyX3QgY29uc3QqLCBjaGFyLCBjaGFyKikgY29uc3TBBB9zdGQ6Ol9fMjo6Y3R5cGU8Y2hhcj46On5jdHlwZSgpwgQhc3RkOjpfXzI6OmN0eXBlPGNoYXI+Ojp+Y3R5cGUoKS4xwwQtc3RkOjpfXzI6OmN0eXBlPGNoYXI+Ojpkb190b3VwcGVyKGNoYXIpIGNvbnN0xAQ7c3RkOjpfXzI6OmN0eXBlPGNoYXI+Ojpkb190b3VwcGVyKGNoYXIqLCBjaGFyIGNvbnN0KikgY29uc3TFBC1zdGQ6Ol9fMjo6Y3R5cGU8Y2hhcj46OmRvX3RvbG93ZXIoY2hhcikgY29uc3TGBDtzdGQ6Ol9fMjo6Y3R5cGU8Y2hhcj46OmRvX3RvbG93ZXIoY2hhciosIGNoYXIgY29uc3QqKSBjb25zdMcERnN0ZDo6X18yOjpjdHlwZTxjaGFyPjo6ZG9fd2lkZW4oY2hhciBjb25zdCosIGNoYXIgY29uc3QqLCBjaGFyKikgY29uc3TIBDJzdGQ6Ol9fMjo6Y3R5cGU8Y2hhcj46OmRvX25hcnJvdyhjaGFyLCBjaGFyKSBjb25zdMkETXN0ZDo6X18yOjpjdHlwZTxjaGFyPjo6ZG9fbmFycm93KGNoYXIgY29uc3QqLCBjaGFyIGNvbnN0KiwgY2hhciwgY2hhciopIGNvbnN0ygSEAXN0ZDo6X18yOjpjb2RlY3Z0PGNoYXIsIGNoYXIsIF9fbWJzdGF0ZV90Pjo6ZG9fb3V0KF9fbWJzdGF0ZV90JiwgY2hhciBjb25zdCosIGNoYXIgY29uc3QqLCBjaGFyIGNvbnN0KiYsIGNoYXIqLCBjaGFyKiwgY2hhciomKSBjb25zdMsEYHN0ZDo6X18yOjpjb2RlY3Z0PGNoYXIsIGNoYXIsIF9fbWJzdGF0ZV90Pjo6ZG9fdW5zaGlmdChfX21ic3RhdGVfdCYsIGNoYXIqLCBjaGFyKiwgY2hhciomKSBjb25zdMwEcnN0ZDo6X18yOjpjb2RlY3Z0PGNoYXIsIGNoYXIsIF9fbWJzdGF0ZV90Pjo6ZG9fbGVuZ3RoKF9fbWJzdGF0ZV90JiwgY2hhciBjb25zdCosIGNoYXIgY29uc3QqLCB1bnNpZ25lZCBsb25nKSBjb25zdM0EO3N0ZDo6X18yOjpjb2RlY3Z0PHdjaGFyX3QsIGNoYXIsIF9fbWJzdGF0ZV90Pjo6fmNvZGVjdnQoKS4xzgSQAXN0ZDo6X18yOjpjb2RlY3Z0PHdjaGFyX3QsIGNoYXIsIF9fbWJzdGF0ZV90Pjo6ZG9fb3V0KF9fbWJzdGF0ZV90Jiwgd2NoYXJfdCBjb25zdCosIHdjaGFyX3QgY29uc3QqLCB3Y2hhcl90IGNvbnN0KiYsIGNoYXIqLCBjaGFyKiwgY2hhciomKSBjb25zdM8EWnN0ZDo6X18yOjpfX2xpYmNwcF93Y3J0b21iX2xbYWJpOm5lMTgwMTAwXShjaGFyKiwgd2NoYXJfdCwgX19tYnN0YXRlX3QqLCBfX2xvY2FsZV9zdHJ1Y3QqKdAEjwFzdGQ6Ol9fMjo6Y29kZWN2dDx3Y2hhcl90LCBjaGFyLCBfX21ic3RhdGVfdD46OmRvX2luKF9fbWJzdGF0ZV90JiwgY2hhciBjb25zdCosIGNoYXIgY29uc3QqLCBjaGFyIGNvbnN0KiYsIHdjaGFyX3QqLCB3Y2hhcl90Kiwgd2NoYXJfdComKSBjb25zdNEEcHN0ZDo6X18yOjpfX2xpYmNwcF9tYnJ0b3djX2xbYWJpOm5lMTgwMTAwXSh3Y2hhcl90KiwgY2hhciBjb25zdCosIHVuc2lnbmVkIGxvbmcsIF9fbWJzdGF0ZV90KiwgX19sb2NhbGVfc3RydWN0KinSBGNzdGQ6Ol9fMjo6Y29kZWN2dDx3Y2hhcl90LCBjaGFyLCBfX21ic3RhdGVfdD46OmRvX3Vuc2hpZnQoX19tYnN0YXRlX3QmLCBjaGFyKiwgY2hhciosIGNoYXIqJikgY29uc3TTBEJzdGQ6Ol9fMjo6Y29kZWN2dDx3Y2hhcl90LCBjaGFyLCBfX21ic3RhdGVfdD46OmRvX2VuY29kaW5nKCkgY29uc3TUBD9zdGQ6Ol9fMjo6X19saWJjcHBfbWJfY3VyX21heF9sW2FiaTpuZTE4MDEwMF0oX19sb2NhbGVfc3RydWN0KinVBHVzdGQ6Ol9fMjo6Y29kZWN2dDx3Y2hhcl90LCBjaGFyLCBfX21ic3RhdGVfdD46OmRvX2xlbmd0aChfX21ic3RhdGVfdCYsIGNoYXIgY29uc3QqLCBjaGFyIGNvbnN0KiwgdW5zaWduZWQgbG9uZykgY29uc3TWBERzdGQ6Ol9fMjo6Y29kZWN2dDx3Y2hhcl90LCBjaGFyLCBfX21ic3RhdGVfdD46OmRvX21heF9sZW5ndGgoKSBjb25zdNcElAFzdGQ6Ol9fMjo6Y29kZWN2dDxjaGFyMTZfdCwgY2hhciwgX19tYnN0YXRlX3Q+Ojpkb19vdXQoX19tYnN0YXRlX3QmLCBjaGFyMTZfdCBjb25zdCosIGNoYXIxNl90IGNvbnN0KiwgY2hhcjE2X3QgY29uc3QqJiwgY2hhciosIGNoYXIqLCBjaGFyKiYpIGNvbnN02ASTAXN0ZDo6X18yOjpjb2RlY3Z0PGNoYXIxNl90LCBjaGFyLCBfX21ic3RhdGVfdD46OmRvX2luKF9fbWJzdGF0ZV90JiwgY2hhciBjb25zdCosIGNoYXIgY29uc3QqLCBjaGFyIGNvbnN0KiYsIGNoYXIxNl90KiwgY2hhcjE2X3QqLCBjaGFyMTZfdComKSBjb25zdNkEdnN0ZDo6X18yOjpjb2RlY3Z0PGNoYXIxNl90LCBjaGFyLCBfX21ic3RhdGVfdD46OmRvX2xlbmd0aChfX21ic3RhdGVfdCYsIGNoYXIgY29uc3QqLCBjaGFyIGNvbnN0KiwgdW5zaWduZWQgbG9uZykgY29uc3TaBEVzdGQ6Ol9fMjo6Y29kZWN2dDxjaGFyMTZfdCwgY2hhciwgX19tYnN0YXRlX3Q+Ojpkb19tYXhfbGVuZ3RoKCkgY29uc3TbBJQBc3RkOjpfXzI6OmNvZGVjdnQ8Y2hhcjMyX3QsIGNoYXIsIF9fbWJzdGF0ZV90Pjo6ZG9fb3V0KF9fbWJzdGF0ZV90JiwgY2hhcjMyX3QgY29uc3QqLCBjaGFyMzJfdCBjb25zdCosIGNoYXIzMl90IGNvbnN0KiYsIGNoYXIqLCBjaGFyKiwgY2hhciomKSBjb25zdNwEkwFzdGQ6Ol9fMjo6Y29kZWN2dDxjaGFyMzJfdCwgY2hhciwgX19tYnN0YXRlX3Q+Ojpkb19pbihfX21ic3RhdGVfdCYsIGNoYXIgY29uc3QqLCBjaGFyIGNvbnN0KiwgY2hhciBjb25zdComLCBjaGFyMzJfdCosIGNoYXIzMl90KiwgY2hhcjMyX3QqJikgY29uc3TdBHZzdGQ6Ol9fMjo6Y29kZWN2dDxjaGFyMzJfdCwgY2hhciwgX19tYnN0YXRlX3Q+Ojpkb19sZW5ndGgoX19tYnN0YXRlX3QmLCBjaGFyIGNvbnN0KiwgY2hhciBjb25zdCosIHVuc2lnbmVkIGxvbmcpIGNvbnN03gQlc3RkOjpfXzI6Om51bXB1bmN0PGNoYXI+Ojp+bnVtcHVuY3QoKd8EJ3N0ZDo6X18yOjpudW1wdW5jdDxjaGFyPjo6fm51bXB1bmN0KCkuMeAEKHN0ZDo6X18yOjpudW1wdW5jdDx3Y2hhcl90Pjo6fm51bXB1bmN0KCnhBCpzdGQ6Ol9fMjo6bnVtcHVuY3Q8d2NoYXJfdD46On5udW1wdW5jdCgpLjHiBDJzdGQ6Ol9fMjo6bnVtcHVuY3Q8Y2hhcj46OmRvX2RlY2ltYWxfcG9pbnQoKSBjb25zdOMEMnN0ZDo6X18yOjpudW1wdW5jdDxjaGFyPjo6ZG9fdGhvdXNhbmRzX3NlcCgpIGNvbnN05AQtc3RkOjpfXzI6Om51bXB1bmN0PGNoYXI+Ojpkb19ncm91cGluZygpIGNvbnN05QQwc3RkOjpfXzI6Om51bXB1bmN0PHdjaGFyX3Q+Ojpkb19ncm91cGluZygpIGNvbnN05gQtc3RkOjpfXzI6Om51bXB1bmN0PGNoYXI+Ojpkb190cnVlbmFtZSgpIGNvbnN05wQwc3RkOjpfXzI6Om51bXB1bmN0PHdjaGFyX3Q+Ojpkb190cnVlbmFtZSgpIGNvbnN06ASMAXN0ZDo6X18yOjpiYXNpY19zdHJpbmc8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHdjaGFyX3Q+Pjo6YmFzaWNfc3RyaW5nW2FiaTpuZTE4MDEwMF08MD4od2NoYXJfdCBjb25zdCop6QQuc3RkOjpfXzI6Om51bXB1bmN0PGNoYXI+Ojpkb19mYWxzZW5hbWUoKSBjb25zdOoEMXN0ZDo6X18yOjpudW1wdW5jdDx3Y2hhcl90Pjo6ZG9fZmFsc2VuYW1lKCkgY29uc3TrBHpzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj46Om9wZXJhdG9yPVthYmk6bmUxODAxMDBdKGNoYXIgY29uc3QqKewENXN0ZDo6X18yOjpfX3RpbWVfZ2V0X2Nfc3RvcmFnZTxjaGFyPjo6X193ZWVrcygpIGNvbnN07QQaX19jeHhfZ2xvYmFsX2FycmF5X2R0b3IuNTjuBDhzdGQ6Ol9fMjo6X190aW1lX2dldF9jX3N0b3JhZ2U8d2NoYXJfdD46Ol9fd2Vla3MoKSBjb25zdO8EGl9fY3h4X2dsb2JhbF9hcnJheV9kdG9yLjcz8AQ2c3RkOjpfXzI6Ol9fdGltZV9nZXRfY19zdG9yYWdlPGNoYXI+OjpfX21vbnRocygpIGNvbnN08QQaX19jeHhfZ2xvYmFsX2FycmF5X2R0b3IuODjyBDlzdGQ6Ol9fMjo6X190aW1lX2dldF9jX3N0b3JhZ2U8d2NoYXJfdD46Ol9fbW9udGhzKCkgY29uc3TzBBtfX2N4eF9nbG9iYWxfYXJyYXlfZHRvci4xMTL0BDVzdGQ6Ol9fMjo6X190aW1lX2dldF9jX3N0b3JhZ2U8Y2hhcj46Ol9fYW1fcG0oKSBjb25zdPUEG19fY3h4X2dsb2JhbF9hcnJheV9kdG9yLjEzNvYEOHN0ZDo6X18yOjpfX3RpbWVfZ2V0X2Nfc3RvcmFnZTx3Y2hhcl90Pjo6X19hbV9wbSgpIGNvbnN09wQbX19jeHhfZ2xvYmFsX2FycmF5X2R0b3IuMTM5+AQxc3RkOjpfXzI6Ol9fdGltZV9nZXRfY19zdG9yYWdlPGNoYXI+OjpfX3goKSBjb25zdPkEGl9fY3h4X2dsb2JhbF9hcnJheV9kdG9yLjMy+gQ0c3RkOjpfXzI6Ol9fdGltZV9nZXRfY19zdG9yYWdlPHdjaGFyX3Q+OjpfX3goKSBjb25zdPsEGl9fY3h4X2dsb2JhbF9hcnJheV9kdG9yLjM0/AQxc3RkOjpfXzI6Ol9fdGltZV9nZXRfY19zdG9yYWdlPGNoYXI+OjpfX1goKSBjb25zdP0EGl9fY3h4X2dsb2JhbF9hcnJheV9kdG9yLjM1/gQ0c3RkOjpfXzI6Ol9fdGltZV9nZXRfY19zdG9yYWdlPHdjaGFyX3Q+OjpfX1goKSBjb25zdP8EGl9fY3h4X2dsb2JhbF9hcnJheV9kdG9yLjM3gAUxc3RkOjpfXzI6Ol9fdGltZV9nZXRfY19zdG9yYWdlPGNoYXI+OjpfX2MoKSBjb25zdIEFGl9fY3h4X2dsb2JhbF9hcnJheV9kdG9yLjM5ggU0c3RkOjpfXzI6Ol9fdGltZV9nZXRfY19zdG9yYWdlPHdjaGFyX3Q+OjpfX2MoKSBjb25zdIMFGl9fY3h4X2dsb2JhbF9hcnJheV9kdG9yLjQxhAUxc3RkOjpfXzI6Ol9fdGltZV9nZXRfY19zdG9yYWdlPGNoYXI+OjpfX3IoKSBjb25zdIUFGl9fY3h4X2dsb2JhbF9hcnJheV9kdG9yLjQzhgU0c3RkOjpfXzI6Ol9fdGltZV9nZXRfY19zdG9yYWdlPHdjaGFyX3Q+OjpfX3IoKSBjb25zdIcFGl9fY3h4X2dsb2JhbF9hcnJheV9kdG9yLjQ1iAVnc3RkOjpfXzI6OnRpbWVfcHV0PGNoYXIsIHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4+Ojp+dGltZV9wdXQoKYkFaXN0ZDo6X18yOjp0aW1lX3B1dDxjaGFyLCBzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Pjo6fnRpbWVfcHV0KCkuMYoF2AFzdGQ6Ol9fMjo6X19hbGxvY2F0aW9uX3Jlc3VsdDxzdGQ6Ol9fMjo6YWxsb2NhdG9yX3RyYWl0czxzdGQ6Ol9fMjo6YWxsb2NhdG9yPHdjaGFyX3Q+Pjo6cG9pbnRlcj4gc3RkOjpfXzI6Ol9fYWxsb2NhdGVfYXRfbGVhc3RbYWJpOm5lMTgwMTAwXTxzdGQ6Ol9fMjo6YWxsb2NhdG9yPHdjaGFyX3Q+PihzdGQ6Ol9fMjo6YWxsb2NhdG9yPHdjaGFyX3Q+JiwgdW5zaWduZWQgbG9uZymLBUNzdGQ6Ol9fMjo6YWxsb2NhdG9yPHdjaGFyX3Q+OjphbGxvY2F0ZVthYmk6bmUxODAxMDBdKHVuc2lnbmVkIGxvbmcpjAWBAXN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+Pjo6X19lcmFzZV90b19lbmRbYWJpOm5lMTgwMTAwXSh1bnNpZ25lZCBsb25nKY0FjQFzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj46Ol9fbnVsbF90ZXJtaW5hdGVfYXRbYWJpOm5lMTgwMTAwXShjaGFyKiwgdW5zaWduZWQgbG9uZymOBU9zdGQ6Ol9fMjo6YWxsb2NhdG9yPHdjaGFyX3Q+OjpkZWFsbG9jYXRlW2FiaTpuZTE4MDEwMF0od2NoYXJfdCosIHVuc2lnbmVkIGxvbmcpjwVoYm9vbCBzdGQ6Ol9fMjo6X19pc19wb2ludGVyX2luX3JhbmdlW2FiaTpuZTE4MDEwMF08Y2hhciwgY2hhciwgMD4oY2hhciBjb25zdCosIGNoYXIgY29uc3QqLCBjaGFyIGNvbnN0KimQBakCZGVjbHR5cGUoc3RkOjpfXzI6Ol9fdW53cmFwX2l0ZXJfaW1wbDxzdGQ6Ol9fMjo6X193cmFwX2l0ZXI8Y2hhcio+LCB0cnVlPjo6X191bndyYXAoc3RkOjpkZWNsdmFsPHN0ZDo6X18yOjpfX3dyYXBfaXRlcjxjaGFyKj4+KCkpKSBzdGQ6Ol9fMjo6X191bndyYXBfaXRlclthYmk6bmUxODAxMDBdPHN0ZDo6X18yOjpfX3dyYXBfaXRlcjxjaGFyKj4sIHN0ZDo6X18yOjpfX3Vud3JhcF9pdGVyX2ltcGw8c3RkOjpfXzI6Ol9fd3JhcF9pdGVyPGNoYXIqPiwgdHJ1ZT4sIDA+KHN0ZDo6X18yOjpfX3dyYXBfaXRlcjxjaGFyKj4pkQV2c3RkOjpfXzI6Ol9fdW53cmFwX2l0ZXJfaW1wbDxzdGQ6Ol9fMjo6X193cmFwX2l0ZXI8Y2hhcio+LCB0cnVlPjo6X191bndyYXBbYWJpOm5lMTgwMTAwXShzdGQ6Ol9fMjo6X193cmFwX2l0ZXI8Y2hhcio+KZIFuwFhdXRvIHN0ZDo6X18yOjpfX3Vud3JhcF9yYW5nZVthYmk6bmUxODAxMDBdPHN0ZDo6X18yOjpfX3dyYXBfaXRlcjxjaGFyIGNvbnN0Kj4sIHN0ZDo6X18yOjpfX3dyYXBfaXRlcjxjaGFyIGNvbnN0Kj4+KHN0ZDo6X18yOjpfX3dyYXBfaXRlcjxjaGFyIGNvbnN0Kj4sIHN0ZDo6X18yOjpfX3dyYXBfaXRlcjxjaGFyIGNvbnN0Kj4pkwV3c3RkOjpfXzI6OnZlY3RvcjxzdGQ6Ol9fMjo6bG9jYWxlOjpmYWNldCosIHN0ZDo6X18yOjpfX3Nzb19hbGxvY2F0b3I8c3RkOjpfXzI6OmxvY2FsZTo6ZmFjZXQqLCAzMHVsPj46Om1heF9zaXplKCkgY29uc3SUBa8Cc3RkOjpfXzI6Ol9fYWxsb2NhdGlvbl9yZXN1bHQ8c3RkOjpfXzI6OmFsbG9jYXRvcl90cmFpdHM8c3RkOjpfXzI6Ol9fc3NvX2FsbG9jYXRvcjxzdGQ6Ol9fMjo6bG9jYWxlOjpmYWNldCosIDMwdWw+Pjo6cG9pbnRlcj4gc3RkOjpfXzI6Ol9fYWxsb2NhdGVfYXRfbGVhc3RbYWJpOm5lMTgwMTAwXTxzdGQ6Ol9fMjo6X19zc29fYWxsb2NhdG9yPHN0ZDo6X18yOjpsb2NhbGU6OmZhY2V0KiwgMzB1bD4+KHN0ZDo6X18yOjpfX3Nzb19hbGxvY2F0b3I8c3RkOjpfXzI6OmxvY2FsZTo6ZmFjZXQqLCAzMHVsPiYsIHVuc2lnbmVkIGxvbmcplQWmAXN0ZDo6X18yOjp2ZWN0b3I8c3RkOjpfXzI6OmxvY2FsZTo6ZmFjZXQqLCBzdGQ6Ol9fMjo6X19zc29fYWxsb2NhdG9yPHN0ZDo6X18yOjpsb2NhbGU6OmZhY2V0KiwgMzB1bD4+OjpfX2Jhc2VfZGVzdHJ1Y3RfYXRfZW5kW2FiaTpuZTE4MDEwMF0oc3RkOjpfXzI6OmxvY2FsZTo6ZmFjZXQqKimWBX1zdGQ6Ol9fMjo6X19zc29fYWxsb2NhdG9yPHN0ZDo6X18yOjpsb2NhbGU6OmZhY2V0KiwgMzB1bD46OmRlYWxsb2NhdGVbYWJpOm5lMTgwMTAwXShzdGQ6Ol9fMjo6bG9jYWxlOjpmYWNldCoqLCB1bnNpZ25lZCBsb25nKZcFgQFzdGQ6Ol9fMjo6X19zcGxpdF9idWZmZXI8c3RkOjpfXzI6OmxvY2FsZTo6ZmFjZXQqLCBzdGQ6Ol9fMjo6X19zc29fYWxsb2NhdG9yPHN0ZDo6X18yOjpsb2NhbGU6OmZhY2V0KiwgMzB1bD4mPjo6fl9fc3BsaXRfYnVmZmVyKCmYBTlzdGQ6Ol9fMjo6X190aHJvd19vdXRfb2ZfcmFuZ2VbYWJpOm5lMTgwMTAwXShjaGFyIGNvbnN0KimZBTpzdGQ6Ol9fMjo6X19jb25zdGV4cHJfd2NzbGVuW2FiaTpuZTE4MDEwMF0od2NoYXJfdCBjb25zdCopmgUwc3RkOjpfXzI6Ol9fdGltZV9wdXQ6Ol9fdGltZV9wdXRbYWJpOm5lMTgwMTAwXSgpmwUtc3RkOjpfXzI6Ol9fc2hhcmVkX2NvdW50Ojp+X19zaGFyZWRfY291bnQoKS4xnAUbb3BlcmF0b3IgbmV3KHVuc2lnbmVkIGxvbmcpnQUYX190aHJvd19iYWRfYWxsb2Nfc2hpbSgpngVMc3RkOjpfXzI6Ol9fbGliY3BwX2FsaWduZWRfYWxsb2NbYWJpOm5lMTgwMTAwXSh1bnNpZ25lZCBsb25nLCB1bnNpZ25lZCBsb25nKZ8FGHN0ZDo6X190aHJvd19iYWRfYWxsb2MoKaAFQXN0ZDo6X18yOjpfX2ZzOjpmaWxlc3lzdGVtOjpmaWxlc3lzdGVtX2Vycm9yOjp+ZmlsZXN5c3RlbV9lcnJvcigpoQVDc3RkOjpfXzI6Ol9fZnM6OmZpbGVzeXN0ZW06OmZpbGVzeXN0ZW1fZXJyb3I6On5maWxlc3lzdGVtX2Vycm9yKCkuMaIFQHN0ZDo6X18yOjpfX2ZzOjpmaWxlc3lzdGVtOjpmaWxlc3lzdGVtX2Vycm9yOjpfX2NyZWF0ZV93aGF0KGludCmjBUNzdGQ6Ol9fMjo6X19mczo6ZmlsZXN5c3RlbTo6ZGV0YWlsOjpmb3JtYXRfc3RyaW5nKGNoYXIgY29uc3QqLCAuLi4ppAU6c3RkOjpfXzI6Ol9fZnM6OmZpbGVzeXN0ZW06OmZpbGVzeXN0ZW1fZXJyb3I6OndoYXQoKSBjb25zdKUFN3N0ZDo6X18yOjpfX2ZzOjpmaWxlc3lzdGVtOjpwYXRoOjp+cGF0aFthYmk6bmUxODAxMDBdKCmmBZkCc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+IHN0ZDo6X18yOjpvcGVyYXRvcitbYWJpOm5lMTgwMTAwXTxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+KHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiYmLCBjaGFyIGNvbnN0KimnBS5zdGQ6Ol9fMjo6X19saWJjcHBfdW5yZWFjaGFibGVbYWJpOm5lMTgwMTAwXSgpqAV6c3RkOjpfXzI6Ol9fZnM6OmZpbGVzeXN0ZW06OmRldGFpbDo6RXJyb3JIYW5kbGVyPHZvaWQ+OjpyZXBvcnRfaW1wbChzdGQ6Ol9fMjo6ZXJyb3JfY29kZSBjb25zdCYsIGNoYXIgY29uc3QqLCB2b2lkKikgY29uc3SpBUZzdGQ6Ol9fMjo6X19mczo6ZmlsZXN5c3RlbTo6ZGV0YWlsOjp2Zm9ybWF0X3N0cmluZyhjaGFyIGNvbnN0Kiwgdm9pZCopqgXHAXN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+Pjo6YXBwZW5kW2FiaTpuZTE4MDEwMF0oc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+IGNvbnN0JimrBboCc3RkOjpfXzI6OnNoYXJlZF9wdHI8c3RkOjpfXzI6Ol9fZnM6OmZpbGVzeXN0ZW06OmZpbGVzeXN0ZW1fZXJyb3I6Ol9TdG9yYWdlPiBzdGQ6Ol9fMjo6bWFrZV9zaGFyZWRbYWJpOm5lMTgwMTAwXTxzdGQ6Ol9fMjo6X19mczo6ZmlsZXN5c3RlbTo6ZmlsZXN5c3RlbV9lcnJvcjo6X1N0b3JhZ2UsIHN0ZDo6X18yOjpfX2ZzOjpmaWxlc3lzdGVtOjpwYXRoLCBzdGQ6Ol9fMjo6X19mczo6ZmlsZXN5c3RlbTo6cGF0aCwgdm9pZD4oc3RkOjpfXzI6Ol9fZnM6OmZpbGVzeXN0ZW06OnBhdGgmJiwgc3RkOjpfXzI6Ol9fZnM6OmZpbGVzeXN0ZW06OnBhdGgmJimsBWlzdGQ6Ol9fMjo6c2hhcmVkX3B0cjxzdGQ6Ol9fMjo6X19mczo6ZmlsZXN5c3RlbTo6ZmlsZXN5c3RlbV9lcnJvcjo6X1N0b3JhZ2U+Ojp+c2hhcmVkX3B0clthYmk6bmUxODAxMDBdKCmtBd8Dc3RkOjpfXzI6OnNoYXJlZF9wdHI8c3RkOjpfXzI6Ol9fZnM6OmZpbGVzeXN0ZW06OmZpbGVzeXN0ZW1fZXJyb3I6Ol9TdG9yYWdlPiBzdGQ6Ol9fMjo6YWxsb2NhdGVfc2hhcmVkW2FiaTpuZTE4MDEwMF08c3RkOjpfXzI6Ol9fZnM6OmZpbGVzeXN0ZW06OmZpbGVzeXN0ZW1fZXJyb3I6Ol9TdG9yYWdlLCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHN0ZDo6X18yOjpfX2ZzOjpmaWxlc3lzdGVtOjpmaWxlc3lzdGVtX2Vycm9yOjpfU3RvcmFnZT4sIHN0ZDo6X18yOjpfX2ZzOjpmaWxlc3lzdGVtOjpwYXRoLCBzdGQ6Ol9fMjo6X19mczo6ZmlsZXN5c3RlbTo6cGF0aCwgdm9pZD4oc3RkOjpfXzI6OmFsbG9jYXRvcjxzdGQ6Ol9fMjo6X19mczo6ZmlsZXN5c3RlbTo6ZmlsZXN5c3RlbV9lcnJvcjo6X1N0b3JhZ2U+IGNvbnN0Jiwgc3RkOjpfXzI6Ol9fZnM6OmZpbGVzeXN0ZW06OnBhdGgmJiwgc3RkOjpfXzI6Ol9fZnM6OmZpbGVzeXN0ZW06OnBhdGgmJimuBfEBc3RkOjpfXzI6Ol9fYWxsb2NhdGlvbl9ndWFyZDxzdGQ6Ol9fMjo6YWxsb2NhdG9yPHN0ZDo6X18yOjpfX3NoYXJlZF9wdHJfZW1wbGFjZTxzdGQ6Ol9fMjo6X19mczo6ZmlsZXN5c3RlbTo6ZmlsZXN5c3RlbV9lcnJvcjo6X1N0b3JhZ2UsIHN0ZDo6X18yOjphbGxvY2F0b3I8c3RkOjpfXzI6Ol9fZnM6OmZpbGVzeXN0ZW06OmZpbGVzeXN0ZW1fZXJyb3I6Ol9TdG9yYWdlPj4+Pjo6X19kZXN0cm95W2FiaTpuZTE4MDEwMF0oKa8FvAFzdGQ6Ol9fMjo6X19zaGFyZWRfcHRyX2VtcGxhY2U8c3RkOjpfXzI6Ol9fZnM6OmZpbGVzeXN0ZW06OmZpbGVzeXN0ZW1fZXJyb3I6Ol9TdG9yYWdlLCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHN0ZDo6X18yOjpfX2ZzOjpmaWxlc3lzdGVtOjpmaWxlc3lzdGVtX2Vycm9yOjpfU3RvcmFnZT4+Ojp+X19zaGFyZWRfcHRyX2VtcGxhY2UoKbAFvgFzdGQ6Ol9fMjo6X19zaGFyZWRfcHRyX2VtcGxhY2U8c3RkOjpfXzI6Ol9fZnM6OmZpbGVzeXN0ZW06OmZpbGVzeXN0ZW1fZXJyb3I6Ol9TdG9yYWdlLCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHN0ZDo6X18yOjpfX2ZzOjpmaWxlc3lzdGVtOjpmaWxlc3lzdGVtX2Vycm9yOjpfU3RvcmFnZT4+Ojp+X19zaGFyZWRfcHRyX2VtcGxhY2UoKS4xsQW3AXN0ZDo6X18yOjpfX3NoYXJlZF9wdHJfZW1wbGFjZTxzdGQ6Ol9fMjo6X19mczo6ZmlsZXN5c3RlbTo6ZmlsZXN5c3RlbV9lcnJvcjo6X1N0b3JhZ2UsIHN0ZDo6X18yOjphbGxvY2F0b3I8c3RkOjpfXzI6Ol9fZnM6OmZpbGVzeXN0ZW06OmZpbGVzeXN0ZW1fZXJyb3I6Ol9TdG9yYWdlPj46Ol9fb25femVyb19zaGFyZWQoKbIFvAFzdGQ6Ol9fMjo6X19zaGFyZWRfcHRyX2VtcGxhY2U8c3RkOjpfXzI6Ol9fZnM6OmZpbGVzeXN0ZW06OmZpbGVzeXN0ZW1fZXJyb3I6Ol9TdG9yYWdlLCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHN0ZDo6X18yOjpfX2ZzOjpmaWxlc3lzdGVtOjpmaWxlc3lzdGVtX2Vycm9yOjpfU3RvcmFnZT4+OjpfX29uX3plcm9fc2hhcmVkX3dlYWsoKbMFoAFzdGQ6Ol9fMjo6X19mczo6ZmlsZXN5c3RlbTo6ZmlsZXN5c3RlbV9lcnJvcjo6X1N0b3JhZ2U6Ol9TdG9yYWdlW2FiaTpuZTE4MDEwMF0oc3RkOjpfXzI6Ol9fZnM6OmZpbGVzeXN0ZW06OnBhdGggY29uc3QmLCBzdGQ6Ol9fMjo6X19mczo6ZmlsZXN5c3RlbTo6cGF0aCBjb25zdCYptAV6c3RkOjpsb2dpY19lcnJvcjo6bG9naWNfZXJyb3Ioc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+IGNvbnN0Jim1BT1zdGQ6Ol9fMjo6X19saWJjcHBfcmVmc3RyaW5nOjpfX2xpYmNwcF9yZWZzdHJpbmcoY2hhciBjb25zdCoptgUqc3RkOjpsb2dpY19lcnJvcjo6bG9naWNfZXJyb3IoY2hhciBjb25zdCoptwV+c3RkOjpydW50aW1lX2Vycm9yOjpydW50aW1lX2Vycm9yKHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiBjb25zdCYpuAUuc3RkOjpydW50aW1lX2Vycm9yOjpydW50aW1lX2Vycm9yKGNoYXIgY29uc3QqKbkFLHN0ZDo6X18yOjpfX3Rocm93X3J1bnRpbWVfZXJyb3IoY2hhciBjb25zdCopugXSAXN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+Pjo6X19ncm93X2J5X2FuZF9yZXBsYWNlKHVuc2lnbmVkIGxvbmcsIHVuc2lnbmVkIGxvbmcsIHVuc2lnbmVkIGxvbmcsIHVuc2lnbmVkIGxvbmcsIHVuc2lnbmVkIGxvbmcsIHVuc2lnbmVkIGxvbmcsIGNoYXIgY29uc3QqKbsFZXN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+Pjo6fmJhc2ljX3N0cmluZygpvAVNc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Ojphc3NpZ25bYWJpOm5lMTgwMTAwXShjaGFyKiwgdW5zaWduZWQgbG9uZywgY2hhcim9BYMBc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+OjpfX2Fzc2lnbl9leHRlcm5hbChjaGFyIGNvbnN0KiwgdW5zaWduZWQgbG9uZym+BXhzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj46OmFwcGVuZChjaGFyIGNvbnN0KiwgdW5zaWduZWQgbG9uZym/BXhzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj46Omluc2VydCh1bnNpZ25lZCBsb25nLCBjaGFyIGNvbnN0KinABWVzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj46OnB1c2hfYmFjayhjaGFyKcEFaXN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+Pjo6YXBwZW5kKGNoYXIgY29uc3QqKcIF3gFzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Piwgc3RkOjpfXzI6OmFsbG9jYXRvcjx3Y2hhcl90Pj46Ol9fZ3Jvd19ieV9hbmRfcmVwbGFjZSh1bnNpZ25lZCBsb25nLCB1bnNpZ25lZCBsb25nLCB1bnNpZ25lZCBsb25nLCB1bnNpZ25lZCBsb25nLCB1bnNpZ25lZCBsb25nLCB1bnNpZ25lZCBsb25nLCB3Y2hhcl90IGNvbnN0KinDBW5zdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Piwgc3RkOjpfXzI6OmFsbG9jYXRvcjx3Y2hhcl90Pj46On5iYXNpY19zdHJpbmcoKcQFgAFzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Piwgc3RkOjpfXzI6OmFsbG9jYXRvcjx3Y2hhcl90Pj46Ol9fYXNzaWduX2V4dGVybmFsKHdjaGFyX3QgY29uc3QqKcUFcXN0ZDo6X18yOjpiYXNpY19zdHJpbmc8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHdjaGFyX3Q+Pjo6cHVzaF9iYWNrKHdjaGFyX3QpxgWQAnN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiBzdGQ6Ol9fMjo6b3BlcmF0b3IrPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj4oY2hhciBjb25zdCosIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiBjb25zdCYpxwXzAXN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiBzdGQ6Ol9fMjo6KGFub255bW91cyBuYW1lc3BhY2UpOjppX3RvX3N0cmluZzxzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj4sIHVuc2lnbmVkIGludD4odW5zaWduZWQgaW50KcgFPnN0ZDo6X18yOjpfX2l0b2E6Ol9fYXBwZW5kMlthYmk6bmUxODAxMDBdKGNoYXIqLCB1bnNpZ25lZCBpbnQpyQU+c3RkOjpfXzI6Ol9faXRvYTo6X19hcHBlbmQ0W2FiaTpuZTE4MDEwMF0oY2hhciosIHVuc2lnbmVkIGludCnKBT5zdGQ6Ol9fMjo6X19pdG9hOjpfX2FwcGVuZDZbYWJpOm5lMTgwMTAwXShjaGFyKiwgdW5zaWduZWQgaW50KcsFPnN0ZDo6X18yOjpfX2l0b2E6Ol9fYXBwZW5kOFthYmk6bmUxODAxMDBdKGNoYXIqLCB1bnNpZ25lZCBpbnQpzAUzc3RkOjpfXzI6Oihhbm9ueW1vdXMgbmFtZXNwYWNlKTo6ZG9fc3RyZXJyb3JfcihpbnQpzQUwc3RkOjpfXzI6Ol9fZ2VuZXJpY19lcnJvcl9jYXRlZ29yeTo6bmFtZSgpIGNvbnN0zgU2c3RkOjpfXzI6Ol9fZ2VuZXJpY19lcnJvcl9jYXRlZ29yeTo6bWVzc2FnZShpbnQpIGNvbnN0zwUvc3RkOjpfXzI6Ol9fc3lzdGVtX2Vycm9yX2NhdGVnb3J5OjpuYW1lKCkgY29uc3TQBUVzdGQ6Ol9fMjo6X19zeXN0ZW1fZXJyb3JfY2F0ZWdvcnk6OmRlZmF1bHRfZXJyb3JfY29uZGl0aW9uKGludCkgY29uc3TRBZcBc3RkOjpfXzI6OnN5c3RlbV9lcnJvcjo6c3lzdGVtX2Vycm9yKHN0ZDo6X18yOjplcnJvcl9jb2RlLCBzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj4gY29uc3QmKdIFogFzdGQ6Ol9fMjo6KGFub255bW91cyBuYW1lc3BhY2UpOjptYWtlX2Vycm9yX3N0cihzdGQ6Ol9fMjo6ZXJyb3JfY29kZSBjb25zdCYsIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PinTBUdzdGQ6Ol9fMjo6c3lzdGVtX2Vycm9yOjpzeXN0ZW1fZXJyb3Ioc3RkOjpfXzI6OmVycm9yX2NvZGUsIGNoYXIgY29uc3QqKdQFGF9fY3hhX2FsbG9jYXRlX2V4Y2VwdGlvbtUFFF9fY3hhX2ZyZWVfZXhjZXB0aW9u1gVLX19jeHhhYml2MTo6ZXhjZXB0aW9uX2NsZWFudXBfZnVuYyhfVW53aW5kX1JlYXNvbl9Db2RlLCBfVW53aW5kX0V4Y2VwdGlvbiop1wUiX19jeGFfZGVjcmVtZW50X2V4Y2VwdGlvbl9yZWZjb3VudNgFC19fY3hhX3Rocm932QURX19jeGFfYmVnaW5fY2F0Y2jaBQ9fX2N4YV9lbmRfY2F0Y2jbBQ1fX2N4YV9yZXRocm933AUiX19jeGFfaW5jcmVtZW50X2V4Y2VwdGlvbl9yZWZjb3VudN0FDWFib3J0X21lc3NhZ2XeBR5kZW1hbmdsaW5nX3Rlcm1pbmF0ZV9oYW5kbGVyKCnfBR9kZW1hbmdsaW5nX3VuZXhwZWN0ZWRfaGFuZGxlcigp4AUQc3RkOjp0ZXJtaW5hdGUoKeEFHHN0ZDo6X190ZXJtaW5hdGUodm9pZCAoKikoKSniBRJfX2N4YV9wdXJlX3ZpcnR1YWzjBS9fX2N4eGFiaXYxOjpfX2FsaWduZWRfZnJlZV93aXRoX2ZhbGxiYWNrKHZvaWQqKeQFYV9fY3h4YWJpdjE6Ol9fZnVuZGFtZW50YWxfdHlwZV9pbmZvOjpjYW5fY2F0Y2goX19jeHhhYml2MTo6X19zaGltX3R5cGVfaW5mbyBjb25zdCosIHZvaWQqJikgY29uc3TlBTxpc19lcXVhbChzdGQ6OnR5cGVfaW5mbyBjb25zdCosIHN0ZDo6dHlwZV9pbmZvIGNvbnN0KiwgYm9vbCnmBVtfX2N4eGFiaXYxOjpfX2NsYXNzX3R5cGVfaW5mbzo6Y2FuX2NhdGNoKF9fY3h4YWJpdjE6Ol9fc2hpbV90eXBlX2luZm8gY29uc3QqLCB2b2lkKiYpIGNvbnN05wUOX19keW5hbWljX2Nhc3ToBWtfX2N4eGFiaXYxOjpfX2NsYXNzX3R5cGVfaW5mbzo6cHJvY2Vzc19mb3VuZF9iYXNlX2NsYXNzKF9fY3h4YWJpdjE6Ol9fZHluYW1pY19jYXN0X2luZm8qLCB2b2lkKiwgaW50KSBjb25zdOkFbl9fY3h4YWJpdjE6Ol9fY2xhc3NfdHlwZV9pbmZvOjpoYXNfdW5hbWJpZ3VvdXNfcHVibGljX2Jhc2UoX19jeHhhYml2MTo6X19keW5hbWljX2Nhc3RfaW5mbyosIHZvaWQqLCBpbnQpIGNvbnN06gVxX19jeHhhYml2MTo6X19zaV9jbGFzc190eXBlX2luZm86Omhhc191bmFtYmlndW91c19wdWJsaWNfYmFzZShfX2N4eGFiaXYxOjpfX2R5bmFtaWNfY2FzdF9pbmZvKiwgdm9pZCosIGludCkgY29uc3TrBXNfX2N4eGFiaXYxOjpfX2Jhc2VfY2xhc3NfdHlwZV9pbmZvOjpoYXNfdW5hbWJpZ3VvdXNfcHVibGljX2Jhc2UoX19jeHhhYml2MTo6X19keW5hbWljX2Nhc3RfaW5mbyosIHZvaWQqLCBpbnQpIGNvbnN07AVyX19jeHhhYml2MTo6X192bWlfY2xhc3NfdHlwZV9pbmZvOjpoYXNfdW5hbWJpZ3VvdXNfcHVibGljX2Jhc2UoX19jeHhhYml2MTo6X19keW5hbWljX2Nhc3RfaW5mbyosIHZvaWQqLCBpbnQpIGNvbnN07QVdX19jeHhhYml2MTo6X19wb2ludGVyX3R5cGVfaW5mbzo6Y2FuX2NhdGNoKF9fY3h4YWJpdjE6Ol9fc2hpbV90eXBlX2luZm8gY29uc3QqLCB2b2lkKiYpIGNvbnN07gVmX19jeHhhYml2MTo6X19wb2ludGVyX3RvX21lbWJlcl90eXBlX2luZm86OmNhbl9jYXRjaF9uZXN0ZWQoX19jeHhhYml2MTo6X19zaGltX3R5cGVfaW5mbyBjb25zdCopIGNvbnN07wWDAV9fY3h4YWJpdjE6Ol9fY2xhc3NfdHlwZV9pbmZvOjpwcm9jZXNzX3N0YXRpY190eXBlX2Fib3ZlX2RzdChfX2N4eGFiaXYxOjpfX2R5bmFtaWNfY2FzdF9pbmZvKiwgdm9pZCBjb25zdCosIHZvaWQgY29uc3QqLCBpbnQpIGNvbnN08AVzX19jeHhhYml2MTo6X192bWlfY2xhc3NfdHlwZV9pbmZvOjpzZWFyY2hfYmVsb3dfZHN0KF9fY3h4YWJpdjE6Ol9fZHluYW1pY19jYXN0X2luZm8qLCB2b2lkIGNvbnN0KiwgaW50LCBib29sKSBjb25zdPEFgQFfX2N4eGFiaXYxOjpfX2Jhc2VfY2xhc3NfdHlwZV9pbmZvOjpzZWFyY2hfYWJvdmVfZHN0KF9fY3h4YWJpdjE6Ol9fZHluYW1pY19jYXN0X2luZm8qLCB2b2lkIGNvbnN0Kiwgdm9pZCBjb25zdCosIGludCwgYm9vbCkgY29uc3TyBXRfX2N4eGFiaXYxOjpfX2Jhc2VfY2xhc3NfdHlwZV9pbmZvOjpzZWFyY2hfYmVsb3dfZHN0KF9fY3h4YWJpdjE6Ol9fZHluYW1pY19jYXN0X2luZm8qLCB2b2lkIGNvbnN0KiwgaW50LCBib29sKSBjb25zdPMFcl9fY3h4YWJpdjE6Ol9fc2lfY2xhc3NfdHlwZV9pbmZvOjpzZWFyY2hfYmVsb3dfZHN0KF9fY3h4YWJpdjE6Ol9fZHluYW1pY19jYXN0X2luZm8qLCB2b2lkIGNvbnN0KiwgaW50LCBib29sKSBjb25zdPQFb19fY3h4YWJpdjE6Ol9fY2xhc3NfdHlwZV9pbmZvOjpzZWFyY2hfYmVsb3dfZHN0KF9fY3h4YWJpdjE6Ol9fZHluYW1pY19jYXN0X2luZm8qLCB2b2lkIGNvbnN0KiwgaW50LCBib29sKSBjb25zdPUFgAFfX2N4eGFiaXYxOjpfX3ZtaV9jbGFzc190eXBlX2luZm86OnNlYXJjaF9hYm92ZV9kc3QoX19jeHhhYml2MTo6X19keW5hbWljX2Nhc3RfaW5mbyosIHZvaWQgY29uc3QqLCB2b2lkIGNvbnN0KiwgaW50LCBib29sKSBjb25zdPYFf19fY3h4YWJpdjE6Ol9fc2lfY2xhc3NfdHlwZV9pbmZvOjpzZWFyY2hfYWJvdmVfZHN0KF9fY3h4YWJpdjE6Ol9fZHluYW1pY19jYXN0X2luZm8qLCB2b2lkIGNvbnN0Kiwgdm9pZCBjb25zdCosIGludCwgYm9vbCkgY29uc3T3BXxfX2N4eGFiaXYxOjpfX2NsYXNzX3R5cGVfaW5mbzo6c2VhcmNoX2Fib3ZlX2RzdChfX2N4eGFiaXYxOjpfX2R5bmFtaWNfY2FzdF9pbmZvKiwgdm9pZCBjb25zdCosIHZvaWQgY29uc3QqLCBpbnQsIGJvb2wpIGNvbnN0+AUcc3RkOjpleGNlcHRpb246OndoYXQoKSBjb25zdPkFHHN0ZDo6YmFkX2FsbG9jOjp3aGF0KCkgY29uc3T6BSdzdGQ6OmJhZF9hcnJheV9uZXdfbGVuZ3RoOjp3aGF0KCkgY29uc3T7BSBzdGQ6OmxvZ2ljX2Vycm9yOjp+bG9naWNfZXJyb3IoKfwFM3N0ZDo6X18yOjpfX2xpYmNwcF9yZWZzdHJpbmc6On5fX2xpYmNwcF9yZWZzdHJpbmcoKf0FInN0ZDo6bG9naWNfZXJyb3I6On5sb2dpY19lcnJvcigpLjH+BSRzdGQ6OnJ1bnRpbWVfZXJyb3I6On5ydW50aW1lX2Vycm9yKCn/BRtzdGQ6OmJhZF9jYXN0Ojp3aGF0KCkgY29uc3SABlNfX2N4eGFiaXYxOjpyZWFkRW5jb2RlZFBvaW50ZXIodW5zaWduZWQgY2hhciBjb25zdCoqLCB1bnNpZ25lZCBjaGFyLCB1bnNpZ25lZCBsb25nKYEGLl9fY3h4YWJpdjE6OnJlYWRVTEVCMTI4KHVuc2lnbmVkIGNoYXIgY29uc3QqKimCBi5fX2N4eGFiaXYxOjpyZWFkU0xFQjEyOCh1bnNpZ25lZCBjaGFyIGNvbnN0KiopgwaAAV9fY3h4YWJpdjE6OmdldF9zaGltX3R5cGVfaW5mbyh1bnNpZ25lZCBsb25nIGxvbmcsIHVuc2lnbmVkIGNoYXIgY29uc3QqLCB1bnNpZ25lZCBjaGFyLCBib29sLCBfVW53aW5kX0V4Y2VwdGlvbiosIHVuc2lnbmVkIGxvbmcphAY0X19jeHhhYml2MTo6Y2FsbF90ZXJtaW5hdGUoYm9vbCwgX1Vud2luZF9FeGNlcHRpb24qKYUGF19VbndpbmRfQ2FsbFBlcnNvbmFsaXR5hgYVZW1zY3JpcHRlbl9zdGFja19pbml0hwYZZW1zY3JpcHRlbl9zdGFja19nZXRfZnJlZYgGGWVtc2NyaXB0ZW5fc3RhY2tfZ2V0X2Jhc2WJBhhlbXNjcmlwdGVuX3N0YWNrX2dldF9lbmSKBg5fX2N4YV9kZW1hbmdsZYsG5QEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+Ojp+QWJzdHJhY3RNYW5nbGluZ1BhcnNlcigpjAZHKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXI6Om9wZXJhdG9yKz0oY2hhcimNBpUCKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6Y29uc3VtZUlmKHN0ZDo6X18yOjpiYXNpY19zdHJpbmdfdmlldzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+KY4G3wEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjpwYXJzZUVuY29kaW5nKGJvb2wpjwbbAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj46OmNvbnN1bWVJZihjaGFyKZAG3QEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjpwYXJzZU51bWJlcihib29sKZEGwQMoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj46Om1ha2U8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpTcGVjaWFsTmFtZSwgY2hhciBjb25zdCAoJikgWzM0XSwgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiY+KGNoYXIgY29uc3QgKCYpIFszNF0sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSomKZIG1wEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjpwYXJzZVR5cGUoKZMGSihhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyOjpncm93KHVuc2lnbmVkIGxvbmcplAaTAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6UE9EU21hbGxWZWN0b3I8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpGb3J3YXJkVGVtcGxhdGVSZWZlcmVuY2UqLCA0dWw+Ojp+UE9EU21hbGxWZWN0b3IoKZUGfyhhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6UE9EU21hbGxWZWN0b3I8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiwgMzJ1bD46OlBPRFNtYWxsVmVjdG9yKCmWBn4oYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlBPRFNtYWxsVmVjdG9yPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSosIDh1bD46OlBPRFNtYWxsVmVjdG9yKCmXBr0BKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpQT0RTbWFsbFZlY3RvcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlBPRFNtYWxsVmVjdG9yPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSosIDh1bD4qLCA0dWw+OjpQT0RTbWFsbFZlY3RvcigpmAa0AShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6c3RhcnRzX3dpdGgoc3RkOjpfXzI6OmJhc2ljX3N0cmluZ192aWV3PGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIHN0ZDo6X18yOjpiYXNpY19zdHJpbmdfdmlldzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+KZkGvwMoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjpTYXZlVGVtcGxhdGVQYXJhbXM6OlNhdmVUZW1wbGF0ZVBhcmFtcygoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+KimaBq0DKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6cGFyc2VOYW1lKChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj46Ok5hbWVTdGF0ZSopmwb/AShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj46OnBhcnNlRW5jb2RpbmcoYm9vbCk6OidsYW1iZGEnKCk6Om9wZXJhdG9yKCkoKSBjb25zdJwG3gEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjpwYXJzZVRlbXBsYXRlQXJnKCmdBq8BKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpQT0RTbWFsbFZlY3RvcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqLCAzMnVsPjo6cHVzaF9iYWNrKChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSogY29uc3QmKZ4G7wEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+Ojpwb3BUcmFpbGluZ05vZGVBcnJheSh1bnNpZ25lZCBsb25nKZ8G4QEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjpwYXJzZUNvbnN0cmFpbnRFeHByKCmgBvUBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6U2F2ZVRlbXBsYXRlUGFyYW1zOjp+U2F2ZVRlbXBsYXRlUGFyYW1zKCmhBtoCKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjptYWtlPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TmFtZVR5cGUsIGNoYXIgY29uc3QgKCYpIFs1XT4oY2hhciBjb25zdCAoJikgWzVdKaIG4QEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjpwYXJzZUJhcmVTb3VyY2VOYW1lKCmjBrQDKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjptYWtlPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TmFtZVR5cGUsIHN0ZDo6X18yOjpiYXNpY19zdHJpbmdfdmlldzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Jj4oc3RkOjpfXzI6OmJhc2ljX3N0cmluZ192aWV3PGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4mKaQG1wEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjpwYXJzZUV4cHIoKaUG2wEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjpwYXJzZURlY2x0eXBlKCmmBqIDKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjptYWtlPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6UGFyYW1ldGVyUGFja0V4cGFuc2lvbiwgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiY+KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSomKacG4AEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjpwYXJzZVRlbXBsYXRlUGFyYW0oKagG4wEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjpwYXJzZVRlbXBsYXRlQXJncyhib29sKakGggQoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj46Om1ha2U8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOYW1lV2l0aFRlbXBsYXRlQXJncywgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiYsIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSomPigoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqJiwgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiYpqgaLBChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSogKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6bWFrZTwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlJlZmVyZW5jZVR5cGUsIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSomLCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlJlZmVyZW5jZUtpbmQ+KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSomLCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlJlZmVyZW5jZUtpbmQmJimrBrwDKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6cGFyc2VVbnNjb3BlZE5hbWUoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6TmFtZVN0YXRlKiwgYm9vbCoprAbgAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj46OnBhcnNlUXVhbGlmaWVkVHlwZSgprQblAihhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6UE9EU21hbGxWZWN0b3I8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpQT0RTbWFsbFZlY3RvcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqLCA4dWw+KiwgNHVsPjo6b3BlcmF0b3I9KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6UE9EU21hbGxWZWN0b3I8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpQT0RTbWFsbFZlY3RvcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqLCA4dWw+KiwgNHVsPiYmKa4G5wEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlBPRFNtYWxsVmVjdG9yPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSosIDh1bD46Om9wZXJhdG9yPSgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlBPRFNtYWxsVmVjdG9yPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSosIDh1bD4mJimvBt0BKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6cGFyc2VDYWxsT2Zmc2V0KCmwBuYBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6cGFyc2VTZXFJZCh1bnNpZ25lZCBsb25nKimxBpUCKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6cGFyc2VNb2R1bGVOYW1lT3B0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TW9kdWxlTmFtZSomKbIGmwEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlBPRFNtYWxsVmVjdG9yPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Rm9yd2FyZFRlbXBsYXRlUmVmZXJlbmNlKiwgNHVsPjo6b3BlcmF0b3JbXSh1bnNpZ25lZCBsb25nKbMGnQEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlBPRFNtYWxsVmVjdG9yPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Rm9yd2FyZFRlbXBsYXRlUmVmZXJlbmNlKiwgNHVsPjo6c2hyaW5rVG9TaXplKHVuc2lnbmVkIGxvbmcptAbeAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj46OnBhcnNlRXhwclByaW1hcnkoKbUG4QEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+Ojppc1RlbXBsYXRlUGFyYW1EZWNsKCm2BtECKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6cGFyc2VUZW1wbGF0ZVBhcmFtRGVjbCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlBPRFNtYWxsVmVjdG9yPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSosIDh1bD4qKbcGuwUoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlBPRFNtYWxsVmVjdG9yPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSosIDh1bD4qKiBzdGQ6Ol9fMjo6Y29weVthYmk6bmUxODAxMDBdPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6UE9EU21hbGxWZWN0b3I8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiwgOHVsPioqLCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlBPRFNtYWxsVmVjdG9yPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSosIDh1bD4qKj4oKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpQT0RTbWFsbFZlY3RvcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqLCA4dWw+KiosIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6UE9EU21hbGxWZWN0b3I8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiwgOHVsPioqLCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlBPRFNtYWxsVmVjdG9yPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSosIDh1bD4qKim4BrMDKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6cGFyc2VTb3VyY2VOYW1lKChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj46Ok5hbWVTdGF0ZSopuQZEKGFub255bW91cyBuYW1lc3BhY2UpOjpCdW1wUG9pbnRlckFsbG9jYXRvcjo6YWxsb2NhdGUodW5zaWduZWQgbG9uZym6BrcBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpTcGVjaWFsTmFtZTo6U3BlY2lhbE5hbWUoc3RkOjpfXzI6OmJhc2ljX3N0cmluZ192aWV3PGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSBjb25zdCopuwa/Aihhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZTo6Tm9kZSgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGU6OktpbmQsIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZTo6UHJlYywgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlOjpDYWNoZSwgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlOjpDYWNoZSwgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlOjpDYWNoZSm8Bn0oYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlNwZWNpYWxOYW1lOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdL0GgQEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlcjo6b3BlcmF0b3IrPShzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nX3ZpZXc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pim+BkIoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGU6OmdldEJhc2VOYW1lKCkgY29uc3S/BocBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpDdG9yVnRhYmxlU3BlY2lhbE5hbWU6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0wAbwAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj46OnBhcnNlUG9zaXRpdmVJbnRlZ2VyKHVuc2lnbmVkIGxvbmcqKcEGeyhhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TmFtZVR5cGU6Ok5hbWVUeXBlKHN0ZDo6X18yOjpiYXNpY19zdHJpbmdfdmlldzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+KcIGeihhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TmFtZVR5cGU6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0wwZGKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOYW1lVHlwZTo6Z2V0QmFzZU5hbWUoKSBjb25zdMQGfChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TW9kdWxlTmFtZTo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3TFBt8BKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6cGFyc2VDVlF1YWxpZmllcnMoKcYG3wEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjpwYXJzZVN1YnN0aXR1dGlvbigpxwZ5KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpQT0RTbWFsbFZlY3RvcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqLCAzMnVsPjo6cG9wX2JhY2soKcgGngQoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjpwYXJzZVVucXVhbGlmaWVkTmFtZSgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjpOYW1lU3RhdGUqLCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqLCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1vZHVsZU5hbWUqKckGVihhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6cGFyc2VfZGlzY3JpbWluYXRvcihjaGFyIGNvbnN0KiwgY2hhciBjb25zdCopygb3Ayhhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSogKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6bWFrZTwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkxvY2FsTmFtZSwgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiYsIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSomPigoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqJiwgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiYpywaIAihhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj46OnBhcnNlQWJpVGFncygoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqKcwGuAMoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjpwYXJzZVVubmFtZWRUeXBlTmFtZSgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjpOYW1lU3RhdGUqKc0GtQMoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjpwYXJzZU9wZXJhdG9yTmFtZSgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjpOYW1lU3RhdGUqKc4GlAEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkZvcndhcmRUZW1wbGF0ZVJlZmVyZW5jZTo6aGFzUkhTQ29tcG9uZW50U2xvdygoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0zwZ8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlOjpoYXNSSFNDb21wb25lbnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdNAGjQEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkZvcndhcmRUZW1wbGF0ZVJlZmVyZW5jZTo6aGFzQXJyYXlTbG93KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3TRBpABKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpGb3J3YXJkVGVtcGxhdGVSZWZlcmVuY2U6Omhhc0Z1bmN0aW9uU2xvdygoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN00gaOAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Rm9yd2FyZFRlbXBsYXRlUmVmZXJlbmNlOjpnZXRTeW50YXhOb2RlKChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3TTBooBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpGb3J3YXJkVGVtcGxhdGVSZWZlcmVuY2U6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN01AaLAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Rm9yd2FyZFRlbXBsYXRlUmVmZXJlbmNlOjpwcmludFJpZ2h0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3TVBuMBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6cGFyc2VPcGVyYXRvckVuY29kaW5nKCnWBusBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6T3BlcmF0b3JJbmZvOjpnZXRTeW1ib2woKSBjb25zdNcG0AIoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjpwYXJzZVByZWZpeEV4cHIoc3RkOjpfXzI6OmJhc2ljX3N0cmluZ192aWV3PGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZTo6UHJlYynYBuoEKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjptYWtlPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Q2FsbEV4cHIsIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSomLCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGVBcnJheSwgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlOjpQcmVjPigoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqJiwgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlQXJyYXkmJiwgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlOjpQcmVjJiYp2QbgAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj46OnBhcnNlRnVuY3Rpb25QYXJhbSgp2gbdAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj46OnBhcnNlQnJhY2VkRXhwcigp2wbDAyhhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSogKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6bWFrZTwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkVuY2xvc2luZ0V4cHIsIGNoYXIgY29uc3QgKCYpIFsxMV0sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSomPihjaGFyIGNvbnN0ICgmKSBbMTFdLCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqJincBp8CKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6cGFyc2VJbnRlZ2VyTGl0ZXJhbChzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nX3ZpZXc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+PindBr4CKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjptYWtlPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Qm9vbEV4cHIsIGludD4oaW50JiYp3ga5Ayhhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSogKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6bWFrZTwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkZ1bmN0aW9uUGFyYW0sIHN0ZDo6X18yOjpiYXNpY19zdHJpbmdfdmlldzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Jj4oc3RkOjpfXzI6OmJhc2ljX3N0cmluZ192aWV3PGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4mKd8G6QEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjpPcGVyYXRvckluZm86OmdldE5hbWUoKSBjb25zdOAGhgQoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj46Om1ha2U8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpCcmFjZWRFeHByLCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqJiwgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiYsIGJvb2w+KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSomLCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqJiwgYm9vbCYmKeEG4QEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjpwYXJzZVVucmVzb2x2ZWRUeXBlKCniBtsBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6cGFyc2VTaW1wbGVJZCgp4wb7Ayhhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSogKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6bWFrZTwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlF1YWxpZmllZE5hbWUsIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSomLCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqJj4oKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiYsIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSomKeQG5QEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjpwYXJzZUJhc2VVbnJlc29sdmVkTmFtZSgp5QafAyhhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSogKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6bWFrZTwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Okdsb2JhbFF1YWxpZmllZE5hbWUsIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSomPigoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqJinmBnwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkJpbmFyeUV4cHI6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN05wZGKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXI6OnByaW50T3BlbihjaGFyKegGtgEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGU6OnByaW50QXNPcGVyYW5kKChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJiwgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlOjpQcmVjLCBib29sKSBjb25zdOkGRyhhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyOjpwcmludENsb3NlKGNoYXIp6gZ8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpQcmVmaXhFeHByOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdOsGfShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6UG9zdGZpeEV4cHI6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN07AaEAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QXJyYXlTdWJzY3JpcHRFeHByOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdO0GfChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWVtYmVyRXhwcjo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3TuBnkoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5ld0V4cHI6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN07waAAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZUFycmF5OjpwcmludFdpdGhDb21tYSgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN08AZ8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpEZWxldGVFeHByOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdPEGeihhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Q2FsbEV4cHI6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN08gaAAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Q29udmVyc2lvbkV4cHI6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN08waBAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Q29uZGl0aW9uYWxFeHByOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdPQGeihhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Q2FzdEV4cHI6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN09QbwAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6RW5jbG9zaW5nRXhwcjo6RW5jbG9zaW5nRXhwcihzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nX3ZpZXc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+PiwgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlIGNvbnN0KiwgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlOjpQcmVjKfYGfyhhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6RW5jbG9zaW5nRXhwcjo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3T3BskDKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6U2NvcGVkVGVtcGxhdGVQYXJhbUxpc3Q6OlNjb3BlZFRlbXBsYXRlUGFyYW1MaXN0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4qKfgG/wEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjpTY29wZWRUZW1wbGF0ZVBhcmFtTGlzdDo6flNjb3BlZFRlbXBsYXRlUGFyYW1MaXN0KCn5BoABKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpJbnRlZ2VyTGl0ZXJhbDo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3T6BoEBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXI6Om9wZXJhdG9yPDwoc3RkOjpfXzI6OmJhc2ljX3N0cmluZ192aWV3PGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4p+wZ6KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpCb29sRXhwcjo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3T8BokBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpGbG9hdExpdGVyYWxJbXBsPGZsb2F0Pjo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3T9BooBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpGbG9hdExpdGVyYWxJbXBsPGRvdWJsZT46OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0/gaPAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6RmxvYXRMaXRlcmFsSW1wbDxsb25nIGRvdWJsZT46OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0/wZ/KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpTdHJpbmdMaXRlcmFsOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdIAH5QMoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjpwYXJzZVRlbXBsYXRlUGFyYW1EZWNsKChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6UE9EU21hbGxWZWN0b3I8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiwgOHVsPiopOjonbGFtYmRhJygoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlRlbXBsYXRlUGFyYW1LaW5kKTo6b3BlcmF0b3IoKSgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlRlbXBsYXRlUGFyYW1LaW5kKSBjb25zdIEHgQEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlVubmFtZWRUeXBlTmFtZTo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3SCB4wBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpTeW50aGV0aWNUZW1wbGF0ZVBhcmFtTmFtZTo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3SDB4cBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpUeXBlVGVtcGxhdGVQYXJhbURlY2w6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0hAeIAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6VHlwZVRlbXBsYXRlUGFyYW1EZWNsOjpwcmludFJpZ2h0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3SFB5IBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpDb25zdHJhaW5lZFR5cGVUZW1wbGF0ZVBhcmFtRGVjbDo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3SGB5MBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpDb25zdHJhaW5lZFR5cGVUZW1wbGF0ZVBhcmFtRGVjbDo6cHJpbnRSaWdodCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0hweKAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9uVHlwZVRlbXBsYXRlUGFyYW1EZWNsOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdIgHiwEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vblR5cGVUZW1wbGF0ZVBhcmFtRGVjbDo6cHJpbnRSaWdodCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0iQeLAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6VGVtcGxhdGVUZW1wbGF0ZVBhcmFtRGVjbDo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3SKB4wBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpUZW1wbGF0ZVRlbXBsYXRlUGFyYW1EZWNsOjpwcmludFJpZ2h0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3SLB4cBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpUZW1wbGF0ZVBhcmFtUGFja0RlY2w6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0jAeIAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6VGVtcGxhdGVQYXJhbVBhY2tEZWNsOjpwcmludFJpZ2h0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3SNB4EBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpDbG9zdXJlVHlwZU5hbWU6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0jgeHAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Q2xvc3VyZVR5cGVOYW1lOjpwcmludERlY2xhcmF0b3IoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdI8HfChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TGFtYmRhRXhwcjo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3SQB30oYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkVudW1MaXRlcmFsOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdJEHfyhhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6RnVuY3Rpb25QYXJhbTo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3SSB3ooYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkZvbGRFeHByOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdJMHmgEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkZvbGRFeHByOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdDo6J2xhbWJkYScoKTo6b3BlcmF0b3IoKSgpIGNvbnN0lAeNAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6UGFyYW1ldGVyUGFja0V4cGFuc2lvbjo6UGFyYW1ldGVyUGFja0V4cGFuc2lvbigoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUgY29uc3QqKZUHiAEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlBhcmFtZXRlclBhY2tFeHBhbnNpb246OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0lgd8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpCcmFjZWRFeHByOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdJcHgQEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkJyYWNlZFJhbmdlRXhwcjo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3SYB60BKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpJbml0TGlzdEV4cHI6OkluaXRMaXN0RXhwcigoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUgY29uc3QqLCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGVBcnJheSmZB34oYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkluaXRMaXN0RXhwcjo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3SaB48BKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpQb2ludGVyVG9NZW1iZXJDb252ZXJzaW9uRXhwcjo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3SbB4EBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpFeHByUmVxdWlyZW1lbnQ6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0nAeBAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6VHlwZVJlcXVpcmVtZW50OjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdJ0HgwEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5lc3RlZFJlcXVpcmVtZW50OjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdJ4Hfihhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6UmVxdWlyZXNFeHByOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdJ8Hfyhhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6U3Vib2JqZWN0RXhwcjo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3SgB4UBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpTaXplb2ZQYXJhbVBhY2tFeHByOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdKEHfyhhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZUFycmF5Tm9kZTo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3SiB3soYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlRocm93RXhwcjo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3SjB38oYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlF1YWxpZmllZE5hbWU6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0pAdLKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpRdWFsaWZpZWROYW1lOjpnZXRCYXNlTmFtZSgpIGNvbnN0pQeiAyhhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSogKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6bWFrZTwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkNvbnZlcnNpb25PcGVyYXRvclR5cGUsIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSomPigoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqJimmB3ooYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkR0b3JOYW1lOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdKcHiAEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkNvbnZlcnNpb25PcGVyYXRvclR5cGU6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0qAeBAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TGl0ZXJhbE9wZXJhdG9yOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdKkHhQEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Okdsb2JhbFF1YWxpZmllZE5hbWU6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0qgdRKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpHbG9iYWxRdWFsaWZpZWROYW1lOjpnZXRCYXNlTmFtZSgpIGNvbnN0qwfPAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6RXhwYW5kZWRTcGVjaWFsU3Vic3RpdHV0aW9uOjpFeHBhbmRlZFNwZWNpYWxTdWJzdGl0dXRpb24oKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpTcGVjaWFsU3ViS2luZCwgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlOjpLaW5kKawHhQEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlNwZWNpYWxTdWJzdGl0dXRpb246OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0rQdRKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpTcGVjaWFsU3Vic3RpdHV0aW9uOjpnZXRCYXNlTmFtZSgpIGNvbnN0rgdZKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpFeHBhbmRlZFNwZWNpYWxTdWJzdGl0dXRpb246OmdldEJhc2VOYW1lKCkgY29uc3SvB40BKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpFeHBhbmRlZFNwZWNpYWxTdWJzdGl0dXRpb246OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0sAd8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYmlUYWdBdHRyOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdLEHsgMoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj46Om1ha2U8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpDdG9yRHRvck5hbWUsIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSomLCBib29sLCBpbnQmPigoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqJiwgYm9vbCYmLCBpbnQmKbIHhwEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlN0cnVjdHVyZWRCaW5kaW5nTmFtZTo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3SzB34oYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkN0b3JEdG9yTmFtZTo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3S0B34oYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1vZHVsZUVudGl0eTo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3S1B4YBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNZW1iZXJMaWtlRnJpZW5kTmFtZTo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3S2B4kBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpQYXJhbWV0ZXJQYWNrOjpoYXNSSFNDb21wb25lbnRTbG93KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3S3B4IBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpQYXJhbWV0ZXJQYWNrOjpoYXNBcnJheVNsb3coKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdLgHhQEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlBhcmFtZXRlclBhY2s6Omhhc0Z1bmN0aW9uU2xvdygoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0uQeDAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6UGFyYW1ldGVyUGFjazo6Z2V0U3ludGF4Tm9kZSgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0ugd/KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpQYXJhbWV0ZXJQYWNrOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdLsHgAEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlBhcmFtZXRlclBhY2s6OnByaW50UmlnaHQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdLwHfihhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6VGVtcGxhdGVBcmdzOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdL0HhgEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5hbWVXaXRoVGVtcGxhdGVBcmdzOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdL4Hfihhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6RW5hYmxlSWZBdHRyOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdL8HiQEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkV4cGxpY2l0T2JqZWN0UGFyYW1ldGVyOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdMAHjAEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkZ1bmN0aW9uRW5jb2Rpbmc6Omhhc1JIU0NvbXBvbmVudFNsb3coKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdMEHggEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkZ1bmN0aW9uRW5jb2Rpbmc6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0wgeDAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6RnVuY3Rpb25FbmNvZGluZzo6cHJpbnRSaWdodCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0wwd7KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpEb3RTdWZmaXg6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0xAf4Ayhhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSogKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6bWFrZTwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlZlY3RvclR5cGUsIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSomLCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqJj4oKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiYsIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSomKcUHfihhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9leGNlcHRTcGVjOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdMYHhgEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkR5bmFtaWNFeGNlcHRpb25TcGVjOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdMcHfihhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6RnVuY3Rpb25UeXBlOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdMgHfyhhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6RnVuY3Rpb25UeXBlOjpwcmludFJpZ2h0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3TJB38oYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok9iakNQcm90b05hbWU6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0ygeDAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6VmVuZG9yRXh0UXVhbFR5cGU6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0yweEAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6UXVhbFR5cGU6Omhhc1JIU0NvbXBvbmVudFNsb3coKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdMwHfShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6UXVhbFR5cGU6Omhhc0FycmF5U2xvdygoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0zQeAAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6UXVhbFR5cGU6Omhhc0Z1bmN0aW9uU2xvdygoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0zgd6KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpRdWFsVHlwZTo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3TPB3soYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlF1YWxUeXBlOjpwcmludFJpZ2h0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3TQB4EBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpUcmFuc2Zvcm1lZFR5cGU6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN00Qd+KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpCaW5hcnlGUFR5cGU6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN00gd8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpCaXRJbnRUeXBlOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdNMHyQEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlBvc3RmaXhRdWFsaWZpZWRUeXBlOjpQb3N0Zml4UXVhbGlmaWVkVHlwZSgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUgY29uc3QqLCBzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nX3ZpZXc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+PinUB4YBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpQb3N0Zml4UXVhbGlmaWVkVHlwZTo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3TVB4EBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpQaXhlbFZlY3RvclR5cGU6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN01gerAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6VmVjdG9yVHlwZTo6VmVjdG9yVHlwZSgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUgY29uc3QqLCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUgY29uc3QqKdcHfChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6VmVjdG9yVHlwZTo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3TYB3soYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFycmF5VHlwZTo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3TZB3woYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFycmF5VHlwZTo6cHJpbnRSaWdodCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN02geFAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6UG9pbnRlclRvTWVtYmVyVHlwZTo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3TbB4YBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpQb2ludGVyVG9NZW1iZXJUeXBlOjpwcmludFJpZ2h0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3TcB4gBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpFbGFib3JhdGVkVHlwZVNwZWZUeXBlOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdN0HhwEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlBvaW50ZXJUeXBlOjpoYXNSSFNDb21wb25lbnRTbG93KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3TeB30oYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlBvaW50ZXJUeXBlOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdN8HTChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T2JqQ1Byb3RvTmFtZTo6aXNPYmpDT2JqZWN0KCkgY29uc3TgB34oYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlBvaW50ZXJUeXBlOjpwcmludFJpZ2h0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3ThB38oYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlJlZmVyZW5jZVR5cGU6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN04gd+KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpSZWZlcmVuY2VUeXBlOjpjb2xsYXBzZSgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN04weAAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6UmVmZXJlbmNlVHlwZTo6cHJpbnRSaWdodCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN05AclX190aHJvd25fb2JqZWN0X2Zyb21fdW53aW5kX2V4Y2VwdGlvbuUHF19fZ2V0X2V4Y2VwdGlvbl9tZXNzYWdl5gcZX2Vtc2NyaXB0ZW5fc3RhY2tfcmVzdG9yZecHF19lbXNjcmlwdGVuX3N0YWNrX2FsbG9j6AccZW1zY3JpcHRlbl9zdGFja19nZXRfY3VycmVudOkHFmxlZ2Fsc3R1YiRkeW5DYWxsX2ppamnqBxhsZWdhbHN0dWIkZHluQ2FsbF92aWlqaWnrBxhsZWdhbHN0dWIkZHluQ2FsbF9paWlpaWrsBxlsZWdhbHN0dWIkZHluQ2FsbF9paWlpaWpq7QcabGVnYWxzdHViJGR5bkNhbGxfaWlpaWlpamoHNwQAD19fc3RhY2tfcG9pbnRlcgEIdGVtcFJldDACC19fc3RhY2tfZW5kAwxfX3N0YWNrX2Jhc2UJrwU9AAcucm9kYXRhAQkucm9kYXRhLjECCS5yb2RhdGEuMgMJLnJvZGF0YS4zBAkucm9kYXRhLjQFCS5yb2RhdGEuNQYJLnJvZGF0YS42Bwkucm9kYXRhLjcICS5yb2RhdGEuOAkJLnJvZGF0YS45Cgoucm9kYXRhLjEwCwoucm9kYXRhLjExDAoucm9kYXRhLjEyDQoucm9kYXRhLjEzDgoucm9kYXRhLjE0Dwoucm9kYXRhLjE1EAoucm9kYXRhLjE2EQoucm9kYXRhLjE3Egoucm9kYXRhLjE4Ewoucm9kYXRhLjE5FAoucm9kYXRhLjIwFQoucm9kYXRhLjIxFgoucm9kYXRhLjIyFwoucm9kYXRhLjIzGAoucm9kYXRhLjI0GQoucm9kYXRhLjI1Ggoucm9kYXRhLjI2Gwoucm9kYXRhLjI3HAoucm9kYXRhLjI4HQoucm9kYXRhLjI5Hgoucm9kYXRhLjMwHwoucm9kYXRhLjMxIAoucm9kYXRhLjMyIQoucm9kYXRhLjMzIgoucm9kYXRhLjM0Iwoucm9kYXRhLjM1JAoucm9kYXRhLjM2JQoucm9kYXRhLjM3Jgoucm9kYXRhLjM4Jwoucm9kYXRhLjM5KAoucm9kYXRhLjQwKQoucm9kYXRhLjQxKgoucm9kYXRhLjQyKwoucm9kYXRhLjQzLAoucm9kYXRhLjQ0LQoucm9kYXRhLjQ1Lgoucm9kYXRhLjQ2Lwoucm9kYXRhLjQ3MAoucm9kYXRhLjQ4MQoucm9kYXRhLjQ5MgUuZGF0YTMHLmRhdGEuMTQHLmRhdGEuMjUHLmRhdGEuMzYHLmRhdGEuNDcHLmRhdGEuNTgHLmRhdGEuNjkHLmRhdGEuNzoHLmRhdGEuODsHLmRhdGEuOTwILmRhdGEuMTA=";
      function getBinarySync(file) {
        if (file == wasmBinaryFile && wasmBinary) {
          return new Uint8Array(wasmBinary);
        }
        var binary = tryParseAsDataURI(file);
        if (binary) {
          return binary;
        }
        if (readBinary) {
          return readBinary(file);
        }
        throw "both async and sync fetching of the wasm failed";
      }
      function getBinaryPromise(binaryFile) {
        return Promise.resolve().then(() => getBinarySync(binaryFile));
      }
      function instantiateArrayBuffer(binaryFile, imports, receiver) {
        return getBinaryPromise(binaryFile).then((binary) => {
          return WebAssembly.instantiate(binary, imports);
        }).then(receiver, (reason) => {
          err(`failed to asynchronously prepare wasm: ${reason}`);
          if (isFileURI(wasmBinaryFile)) {
            err(`warning: Loading from a file URI (${wasmBinaryFile}) is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing`);
          }
          abort(reason);
        });
      }
      function instantiateAsync(binary, binaryFile, imports, callback) {
        return instantiateArrayBuffer(binaryFile, imports, callback);
      }
      function getWasmImports() {
        return {
          "env": wasmImports,
          "wasi_snapshot_preview1": wasmImports
        };
      }
      function createWasm() {
        var info = getWasmImports();
        function receiveInstance(instance, module) {
          wasmExports = instance.exports;
          wasmMemory = wasmExports["memory"];
          assert(wasmMemory, "memory not found in wasm exports");
          updateMemoryViews();
          wasmTable = wasmExports["__indirect_function_table"];
          assert(wasmTable, "table not found in wasm exports");
          addOnInit(wasmExports["__wasm_call_ctors"]);
          removeRunDependency("wasm-instantiate");
          return wasmExports;
        }
        addRunDependency("wasm-instantiate");
        var trueModule = Module;
        function receiveInstantiationResult(result) {
          assert(Module === trueModule, "the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?");
          trueModule = null;
          receiveInstance(result["instance"]);
        }
        if (Module["instantiateWasm"]) {
          try {
            return Module["instantiateWasm"](info, receiveInstance);
          } catch (e) {
            err(`Module.instantiateWasm callback failed with error: ${e}`);
            readyPromiseReject(e);
          }
        }
        instantiateAsync(wasmBinary, wasmBinaryFile, info, receiveInstantiationResult).catch(readyPromiseReject);
        return {};
      }
      var tempDouble;
      var tempI64;
      function legacyModuleProp(prop, newName, incoming = true) {
        if (!Object.getOwnPropertyDescriptor(Module, prop)) {
          Object.defineProperty(Module, prop, {
            configurable: true,
            get() {
              let extra = incoming ? " (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)" : "";
              abort(`\`Module.${prop}\` has been replaced by \`${newName}\`` + extra);
            }
          });
        }
      }
      function ignoredModuleProp(prop) {
        if (Object.getOwnPropertyDescriptor(Module, prop)) {
          abort(`\`Module.${prop}\` was supplied but \`${prop}\` not included in INCOMING_MODULE_JS_API`);
        }
      }
      function isExportedByForceFilesystem(name) {
        return name === "FS_createPath" || name === "FS_createDataFile" || name === "FS_createPreloadedFile" || name === "FS_unlink" || name === "addRunDependency" || name === "FS_createLazyFile" || name === "FS_createDevice" || name === "removeRunDependency";
      }
      function missingGlobal(sym, msg) {
        if (typeof globalThis != "undefined") {
          Object.defineProperty(globalThis, sym, {
            configurable: true,
            get() {
              warnOnce(`\`${sym}\` is not longer defined by emscripten. ${msg}`);
              return void 0;
            }
          });
        }
      }
      missingGlobal("buffer", "Please use HEAP8.buffer or wasmMemory.buffer");
      missingGlobal("asm", "Please use wasmExports instead");
      function missingLibrarySymbol(sym) {
        if (typeof globalThis != "undefined" && !Object.getOwnPropertyDescriptor(globalThis, sym)) {
          Object.defineProperty(globalThis, sym, {
            configurable: true,
            get() {
              var msg = `\`${sym}\` is a library symbol and not included by default; add it to your library.js __deps or to DEFAULT_LIBRARY_FUNCS_TO_INCLUDE on the command line`;
              var librarySymbol = sym;
              if (!librarySymbol.startsWith("_")) {
                librarySymbol = "$" + sym;
              }
              msg += ` (e.g. -sDEFAULT_LIBRARY_FUNCS_TO_INCLUDE='${librarySymbol}')`;
              if (isExportedByForceFilesystem(sym)) {
                msg += ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you";
              }
              warnOnce(msg);
              return void 0;
            }
          });
        }
        unexportedRuntimeSymbol(sym);
      }
      function unexportedRuntimeSymbol(sym) {
        if (!Object.getOwnPropertyDescriptor(Module, sym)) {
          Object.defineProperty(Module, sym, {
            configurable: true,
            get() {
              var msg = `'${sym}' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the Emscripten FAQ)`;
              if (isExportedByForceFilesystem(sym)) {
                msg += ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you";
              }
              abort(msg);
            }
          });
        }
      }
      var ASM_CONSTS = {
        45631: ($0, $1) => {
          let type = UTF8ToString($0);
          let directory = UTF8ToString($1);
          let allocatedDir = _malloc(directory.length + 1);
          stringToUTF8(directory, allocatedDir, directory.length + 1);
          let jsAllocatedDir = UTF8ToString(allocatedDir);
          if (type == "IDBFS") {
            FS.mkdir(jsAllocatedDir);
            FS.mount(IDBFS, {}, jsAllocatedDir);
            console.log("EmscriptenFileSystemManager: Mounting IDBFS filesystem...\n");
          } else {
            throw new Error("Unsupported filesystem type, IDBFS is supported: " + type);
          }
          _free(allocatedDir);
        }
      };
      function syncIdb_js(populateFromFS) {
        try {
          FS.syncfs(populateFromFS, function(err2) {
            setTimeout(function() {
              if (err2) {
                console.error("b. jsFS Error: syncing FS:", err2);
                Module.setIdbfsSynced(false);
              } else {
                console.log("b. jsFS synced successfully");
                Module.setIdbfsSynced(true);
              }
            }, 1);
          });
        } catch (err2) {
          Module.setIdbfsSynced(false);
        }
      }
      var callRuntimeCallbacks = (callbacks) => {
        while (callbacks.length > 0) {
          callbacks.shift()(Module);
        }
      };
      var getCppExceptionTag = () => wasmExports["__cpp_exception"];
      var getCppExceptionThrownObjectFromWebAssemblyException = (ex) => {
        var unwind_header = ex.getArg(getCppExceptionTag(), 0);
        return ___thrown_object_from_unwind_exception(unwind_header);
      };
      var stackSave = () => _emscripten_stack_get_current();
      var stackRestore = (val) => __emscripten_stack_restore(val);
      var lengthBytesUTF8 = (str) => {
        var len2 = 0;
        for (var i2 = 0; i2 < str.length; ++i2) {
          var c = str.charCodeAt(i2);
          if (c <= 127) {
            len2++;
          } else if (c <= 2047) {
            len2 += 2;
          } else if (c >= 55296 && c <= 57343) {
            len2 += 4;
            ++i2;
          } else {
            len2 += 3;
          }
        }
        return len2;
      };
      var stringToUTF8Array = (str, heap, outIdx, maxBytesToWrite) => {
        assert(typeof str === "string", `stringToUTF8Array expects a string (got ${typeof str})`);
        if (!(maxBytesToWrite > 0))
          return 0;
        var startIdx = outIdx;
        var endIdx = outIdx + maxBytesToWrite - 1;
        for (var i2 = 0; i2 < str.length; ++i2) {
          var u = str.charCodeAt(i2);
          if (u >= 55296 && u <= 57343) {
            var u1 = str.charCodeAt(++i2);
            u = 65536 + ((u & 1023) << 10) | u1 & 1023;
          }
          if (u <= 127) {
            if (outIdx >= endIdx)
              break;
            heap[outIdx++] = u;
          } else if (u <= 2047) {
            if (outIdx + 1 >= endIdx)
              break;
            heap[outIdx++] = 192 | u >> 6;
            heap[outIdx++] = 128 | u & 63;
          } else if (u <= 65535) {
            if (outIdx + 2 >= endIdx)
              break;
            heap[outIdx++] = 224 | u >> 12;
            heap[outIdx++] = 128 | u >> 6 & 63;
            heap[outIdx++] = 128 | u & 63;
          } else {
            if (outIdx + 3 >= endIdx)
              break;
            if (u > 1114111)
              warnOnce("Invalid Unicode code point " + ptrToString(u) + " encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF).");
            heap[outIdx++] = 240 | u >> 18;
            heap[outIdx++] = 128 | u >> 12 & 63;
            heap[outIdx++] = 128 | u >> 6 & 63;
            heap[outIdx++] = 128 | u & 63;
          }
        }
        heap[outIdx] = 0;
        return outIdx - startIdx;
      };
      var stringToUTF8 = (str, outPtr, maxBytesToWrite) => {
        assert(typeof maxBytesToWrite == "number", "stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
        return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
      };
      var stackAlloc = (sz) => __emscripten_stack_alloc(sz);
      var UTF8Decoder = typeof TextDecoder != "undefined" ? new TextDecoder("utf8") : void 0;
      var UTF8ArrayToString = (heapOrArray, idx, maxBytesToRead) => {
        var endIdx = idx + maxBytesToRead;
        var endPtr = idx;
        while (heapOrArray[endPtr] && !(endPtr >= endIdx))
          ++endPtr;
        if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
          return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
        }
        var str = "";
        while (idx < endPtr) {
          var u0 = heapOrArray[idx++];
          if (!(u0 & 128)) {
            str += String.fromCharCode(u0);
            continue;
          }
          var u1 = heapOrArray[idx++] & 63;
          if ((u0 & 224) == 192) {
            str += String.fromCharCode((u0 & 31) << 6 | u1);
            continue;
          }
          var u2 = heapOrArray[idx++] & 63;
          if ((u0 & 240) == 224) {
            u0 = (u0 & 15) << 12 | u1 << 6 | u2;
          } else {
            if ((u0 & 248) != 240)
              warnOnce("Invalid UTF-8 leading byte " + ptrToString(u0) + " encountered when deserializing a UTF-8 string in wasm memory to a JS string!");
            u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | heapOrArray[idx++] & 63;
          }
          if (u0 < 65536) {
            str += String.fromCharCode(u0);
          } else {
            var ch = u0 - 65536;
            str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
          }
        }
        return str;
      };
      var UTF8ToString = (ptr, maxBytesToRead) => {
        assert(typeof ptr == "number", `UTF8ToString expects a number (got ${typeof ptr})`);
        return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : "";
      };
      var getExceptionMessageCommon = (ptr) => {
        var sp = stackSave();
        var type_addr_addr = stackAlloc(4);
        var message_addr_addr = stackAlloc(4);
        ___get_exception_message(ptr, type_addr_addr, message_addr_addr);
        var type_addr = HEAPU32[type_addr_addr >> 2];
        var message_addr = HEAPU32[message_addr_addr >> 2];
        var type = UTF8ToString(type_addr);
        _free(type_addr);
        var message;
        if (message_addr) {
          message = UTF8ToString(message_addr);
          _free(message_addr);
        }
        stackRestore(sp);
        return [
          type,
          message
        ];
      };
      var getExceptionMessage = (ex) => {
        var ptr = getCppExceptionThrownObjectFromWebAssemblyException(ex);
        return getExceptionMessageCommon(ptr);
      };
      Module["getExceptionMessage"] = getExceptionMessage;
      Module["noExitRuntime"] || true;
      var ptrToString = (ptr) => {
        assert(typeof ptr === "number");
        ptr >>>= 0;
        return "0x" + ptr.toString(16).padStart(8, "0");
      };
      var warnOnce = (text) => {
        warnOnce.shown || (warnOnce.shown = {});
        if (!warnOnce.shown[text]) {
          warnOnce.shown[text] = 1;
          if (ENVIRONMENT_IS_NODE)
            text = "warning: " + text;
          err(text);
        }
      };
      var ___assert_fail = (condition, filename, line, func) => {
        abort(`Assertion failed: ${UTF8ToString(condition)}, at: ` + [
          filename ? UTF8ToString(filename) : "unknown filename",
          line,
          func ? UTF8ToString(func) : "unknown function"
        ]);
      };
      function syscallGetVarargI() {
        assert(SYSCALLS.varargs != void 0);
        var ret = HEAP32[+SYSCALLS.varargs >> 2];
        SYSCALLS.varargs += 4;
        return ret;
      }
      var syscallGetVarargP = syscallGetVarargI;
      var PATH = {
        isAbs: (path) => path.charAt(0) === "/",
        splitPath: (filename) => {
          var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
          return splitPathRe.exec(filename).slice(1);
        },
        normalizeArray: (parts, allowAboveRoot) => {
          var up = 0;
          for (var i2 = parts.length - 1; i2 >= 0; i2--) {
            var last = parts[i2];
            if (last === ".") {
              parts.splice(i2, 1);
            } else if (last === "..") {
              parts.splice(i2, 1);
              up++;
            } else if (up) {
              parts.splice(i2, 1);
              up--;
            }
          }
          if (allowAboveRoot) {
            for (; up; up--) {
              parts.unshift("..");
            }
          }
          return parts;
        },
        normalize: (path) => {
          var isAbsolute = PATH.isAbs(path), trailingSlash = path.substr(-1) === "/";
          path = PATH.normalizeArray(path.split("/").filter((p) => !!p), !isAbsolute).join("/");
          if (!path && !isAbsolute) {
            path = ".";
          }
          if (path && trailingSlash) {
            path += "/";
          }
          return (isAbsolute ? "/" : "") + path;
        },
        dirname: (path) => {
          var result = PATH.splitPath(path), root = result[0], dir = result[1];
          if (!root && !dir) {
            return ".";
          }
          if (dir) {
            dir = dir.substr(0, dir.length - 1);
          }
          return root + dir;
        },
        basename: (path) => {
          if (path === "/")
            return "/";
          path = PATH.normalize(path);
          path = path.replace(/\/$/, "");
          var lastSlash = path.lastIndexOf("/");
          if (lastSlash === -1)
            return path;
          return path.substr(lastSlash + 1);
        },
        join: (...paths) => PATH.normalize(paths.join("/")),
        join2: (l, r) => PATH.normalize(l + "/" + r)
      };
      var initRandomFill = () => {
        if (typeof crypto == "object" && typeof crypto["getRandomValues"] == "function") {
          return (view) => crypto.getRandomValues(view);
        } else if (ENVIRONMENT_IS_NODE) {
          try {
            var crypto_module = require2("crypto");
            var randomFillSync = crypto_module["randomFillSync"];
            if (randomFillSync) {
              return (view) => crypto_module["randomFillSync"](view);
            }
            var randomBytes = crypto_module["randomBytes"];
            return (view) => (view.set(randomBytes(view.byteLength)), view);
          } catch (e) {
          }
        }
        abort("no cryptographic support found for randomDevice. consider polyfilling it if you want to use something insecure like Math.random(), e.g. put this in a --pre-js: var crypto = { getRandomValues: (array) => { for (var i = 0; i < array.length; i++) array[i] = (Math.random()*256)|0 } };");
      };
      var randomFill = (view) => {
        return (randomFill = initRandomFill())(view);
      };
      var PATH_FS = {
        resolve: (...args) => {
          var resolvedPath = "", resolvedAbsolute = false;
          for (var i2 = args.length - 1; i2 >= -1 && !resolvedAbsolute; i2--) {
            var path = i2 >= 0 ? args[i2] : FS.cwd();
            if (typeof path != "string") {
              throw new TypeError("Arguments to path.resolve must be strings");
            } else if (!path) {
              return "";
            }
            resolvedPath = path + "/" + resolvedPath;
            resolvedAbsolute = PATH.isAbs(path);
          }
          resolvedPath = PATH.normalizeArray(resolvedPath.split("/").filter((p) => !!p), !resolvedAbsolute).join("/");
          return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
        },
        relative: (from, to) => {
          from = PATH_FS.resolve(from).substr(1);
          to = PATH_FS.resolve(to).substr(1);
          function trim(arr) {
            var start = 0;
            for (; start < arr.length; start++) {
              if (arr[start] !== "")
                break;
            }
            var end = arr.length - 1;
            for (; end >= 0; end--) {
              if (arr[end] !== "")
                break;
            }
            if (start > end)
              return [];
            return arr.slice(start, end - start + 1);
          }
          var fromParts = trim(from.split("/"));
          var toParts = trim(to.split("/"));
          var length = Math.min(fromParts.length, toParts.length);
          var samePartsLength = length;
          for (var i2 = 0; i2 < length; i2++) {
            if (fromParts[i2] !== toParts[i2]) {
              samePartsLength = i2;
              break;
            }
          }
          var outputParts = [];
          for (var i2 = samePartsLength; i2 < fromParts.length; i2++) {
            outputParts.push("..");
          }
          outputParts = outputParts.concat(toParts.slice(samePartsLength));
          return outputParts.join("/");
        }
      };
      var FS_stdin_getChar_buffer = [];
      function intArrayFromString(stringy, dontAddNull, length) {
        var len2 = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
        var u8array = new Array(len2);
        var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
        if (dontAddNull)
          u8array.length = numBytesWritten;
        return u8array;
      }
      var FS_stdin_getChar = () => {
        if (!FS_stdin_getChar_buffer.length) {
          var result = null;
          if (ENVIRONMENT_IS_NODE) {
            var BUFSIZE = 256;
            var buf = Buffer.alloc(BUFSIZE);
            var bytesRead = 0;
            var fd = process$1.stdin.fd;
            try {
              bytesRead = fs.readSync(fd, buf);
            } catch (e) {
              if (e.toString().includes("EOF"))
                bytesRead = 0;
              else
                throw e;
            }
            if (bytesRead > 0) {
              result = buf.slice(0, bytesRead).toString("utf-8");
            } else {
              result = null;
            }
          } else if (typeof window != "undefined" && typeof window.prompt == "function") {
            result = window.prompt("Input: ");
            if (result !== null) {
              result += "\n";
            }
          } else if (typeof readline == "function") {
            result = readline();
            if (result !== null) {
              result += "\n";
            }
          }
          if (!result) {
            return null;
          }
          FS_stdin_getChar_buffer = intArrayFromString(result, true);
        }
        return FS_stdin_getChar_buffer.shift();
      };
      var TTY = {
        ttys: [],
        init() {
        },
        shutdown() {
        },
        register(dev, ops) {
          TTY.ttys[dev] = {
            input: [],
            output: [],
            ops
          };
          FS.registerDevice(dev, TTY.stream_ops);
        },
        stream_ops: {
          open(stream) {
            var tty = TTY.ttys[stream.node.rdev];
            if (!tty) {
              throw new FS.ErrnoError(43);
            }
            stream.tty = tty;
            stream.seekable = false;
          },
          close(stream) {
            stream.tty.ops.fsync(stream.tty);
          },
          fsync(stream) {
            stream.tty.ops.fsync(stream.tty);
          },
          read(stream, buffer2, offset, length, pos) {
            if (!stream.tty || !stream.tty.ops.get_char) {
              throw new FS.ErrnoError(60);
            }
            var bytesRead = 0;
            for (var i2 = 0; i2 < length; i2++) {
              var result;
              try {
                result = stream.tty.ops.get_char(stream.tty);
              } catch (e) {
                throw new FS.ErrnoError(29);
              }
              if (result === void 0 && bytesRead === 0) {
                throw new FS.ErrnoError(6);
              }
              if (result === null || result === void 0)
                break;
              bytesRead++;
              buffer2[offset + i2] = result;
            }
            if (bytesRead) {
              stream.node.timestamp = Date.now();
            }
            return bytesRead;
          },
          write(stream, buffer2, offset, length, pos) {
            if (!stream.tty || !stream.tty.ops.put_char) {
              throw new FS.ErrnoError(60);
            }
            try {
              for (var i2 = 0; i2 < length; i2++) {
                stream.tty.ops.put_char(stream.tty, buffer2[offset + i2]);
              }
            } catch (e) {
              throw new FS.ErrnoError(29);
            }
            if (length) {
              stream.node.timestamp = Date.now();
            }
            return i2;
          }
        },
        default_tty_ops: {
          get_char(tty) {
            return FS_stdin_getChar();
          },
          put_char(tty, val) {
            if (val === null || val === 10) {
              out(UTF8ArrayToString(tty.output, 0));
              tty.output = [];
            } else {
              if (val != 0)
                tty.output.push(val);
            }
          },
          fsync(tty) {
            if (tty.output && tty.output.length > 0) {
              out(UTF8ArrayToString(tty.output, 0));
              tty.output = [];
            }
          },
          ioctl_tcgets(tty) {
            return {
              c_iflag: 25856,
              c_oflag: 5,
              c_cflag: 191,
              c_lflag: 35387,
              c_cc: [
                3,
                28,
                127,
                21,
                4,
                0,
                1,
                0,
                17,
                19,
                26,
                0,
                18,
                15,
                23,
                22,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
              ]
            };
          },
          ioctl_tcsets(tty, optional_actions, data) {
            return 0;
          },
          ioctl_tiocgwinsz(tty) {
            return [
              24,
              80
            ];
          }
        },
        default_tty1_ops: {
          put_char(tty, val) {
            if (val === null || val === 10) {
              err(UTF8ArrayToString(tty.output, 0));
              tty.output = [];
            } else {
              if (val != 0)
                tty.output.push(val);
            }
          },
          fsync(tty) {
            if (tty.output && tty.output.length > 0) {
              err(UTF8ArrayToString(tty.output, 0));
              tty.output = [];
            }
          }
        }
      };
      var mmapAlloc = (size) => {
        abort("internal error: mmapAlloc called but `emscripten_builtin_memalign` native symbol not exported");
      };
      var MEMFS = {
        ops_table: null,
        mount(mount) {
          return MEMFS.createNode(null, "/", 16384 | 511, 0);
        },
        createNode(parent, name, mode, dev) {
          if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
            throw new FS.ErrnoError(63);
          }
          MEMFS.ops_table || (MEMFS.ops_table = {
            dir: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                lookup: MEMFS.node_ops.lookup,
                mknod: MEMFS.node_ops.mknod,
                rename: MEMFS.node_ops.rename,
                unlink: MEMFS.node_ops.unlink,
                rmdir: MEMFS.node_ops.rmdir,
                readdir: MEMFS.node_ops.readdir,
                symlink: MEMFS.node_ops.symlink
              },
              stream: {
                llseek: MEMFS.stream_ops.llseek
              }
            },
            file: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr
              },
              stream: {
                llseek: MEMFS.stream_ops.llseek,
                read: MEMFS.stream_ops.read,
                write: MEMFS.stream_ops.write,
                allocate: MEMFS.stream_ops.allocate,
                mmap: MEMFS.stream_ops.mmap,
                msync: MEMFS.stream_ops.msync
              }
            },
            link: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                readlink: MEMFS.node_ops.readlink
              },
              stream: {}
            },
            chrdev: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr
              },
              stream: FS.chrdev_stream_ops
            }
          });
          var node = FS.createNode(parent, name, mode, dev);
          if (FS.isDir(node.mode)) {
            node.node_ops = MEMFS.ops_table.dir.node;
            node.stream_ops = MEMFS.ops_table.dir.stream;
            node.contents = {};
          } else if (FS.isFile(node.mode)) {
            node.node_ops = MEMFS.ops_table.file.node;
            node.stream_ops = MEMFS.ops_table.file.stream;
            node.usedBytes = 0;
            node.contents = null;
          } else if (FS.isLink(node.mode)) {
            node.node_ops = MEMFS.ops_table.link.node;
            node.stream_ops = MEMFS.ops_table.link.stream;
          } else if (FS.isChrdev(node.mode)) {
            node.node_ops = MEMFS.ops_table.chrdev.node;
            node.stream_ops = MEMFS.ops_table.chrdev.stream;
          }
          node.timestamp = Date.now();
          if (parent) {
            parent.contents[name] = node;
            parent.timestamp = node.timestamp;
          }
          return node;
        },
        getFileDataAsTypedArray(node) {
          if (!node.contents)
            return new Uint8Array(0);
          if (node.contents.subarray)
            return node.contents.subarray(0, node.usedBytes);
          return new Uint8Array(node.contents);
        },
        expandFileStorage(node, newCapacity) {
          var prevCapacity = node.contents ? node.contents.length : 0;
          if (prevCapacity >= newCapacity)
            return;
          var CAPACITY_DOUBLING_MAX = 1024 * 1024;
          newCapacity = Math.max(newCapacity, prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125) >>> 0);
          if (prevCapacity != 0)
            newCapacity = Math.max(newCapacity, 256);
          var oldContents = node.contents;
          node.contents = new Uint8Array(newCapacity);
          if (node.usedBytes > 0)
            node.contents.set(oldContents.subarray(0, node.usedBytes), 0);
        },
        resizeFileStorage(node, newSize) {
          if (node.usedBytes == newSize)
            return;
          if (newSize == 0) {
            node.contents = null;
            node.usedBytes = 0;
          } else {
            var oldContents = node.contents;
            node.contents = new Uint8Array(newSize);
            if (oldContents) {
              node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes)));
            }
            node.usedBytes = newSize;
          }
        },
        node_ops: {
          getattr(node) {
            var attr = {};
            attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
            attr.ino = node.id;
            attr.mode = node.mode;
            attr.nlink = 1;
            attr.uid = 0;
            attr.gid = 0;
            attr.rdev = node.rdev;
            if (FS.isDir(node.mode)) {
              attr.size = 4096;
            } else if (FS.isFile(node.mode)) {
              attr.size = node.usedBytes;
            } else if (FS.isLink(node.mode)) {
              attr.size = node.link.length;
            } else {
              attr.size = 0;
            }
            attr.atime = new Date(node.timestamp);
            attr.mtime = new Date(node.timestamp);
            attr.ctime = new Date(node.timestamp);
            attr.blksize = 4096;
            attr.blocks = Math.ceil(attr.size / attr.blksize);
            return attr;
          },
          setattr(node, attr) {
            if (attr.mode !== void 0) {
              node.mode = attr.mode;
            }
            if (attr.timestamp !== void 0) {
              node.timestamp = attr.timestamp;
            }
            if (attr.size !== void 0) {
              MEMFS.resizeFileStorage(node, attr.size);
            }
          },
          lookup(parent, name) {
            throw FS.genericErrors[44];
          },
          mknod(parent, name, mode, dev) {
            return MEMFS.createNode(parent, name, mode, dev);
          },
          rename(old_node, new_dir, new_name) {
            if (FS.isDir(old_node.mode)) {
              var new_node;
              try {
                new_node = FS.lookupNode(new_dir, new_name);
              } catch (e) {
              }
              if (new_node) {
                for (var i2 in new_node.contents) {
                  throw new FS.ErrnoError(55);
                }
              }
            }
            delete old_node.parent.contents[old_node.name];
            old_node.parent.timestamp = Date.now();
            old_node.name = new_name;
            new_dir.contents[new_name] = old_node;
            new_dir.timestamp = old_node.parent.timestamp;
            old_node.parent = new_dir;
          },
          unlink(parent, name) {
            delete parent.contents[name];
            parent.timestamp = Date.now();
          },
          rmdir(parent, name) {
            var node = FS.lookupNode(parent, name);
            for (var i2 in node.contents) {
              throw new FS.ErrnoError(55);
            }
            delete parent.contents[name];
            parent.timestamp = Date.now();
          },
          readdir(node) {
            var entries = [
              ".",
              ".."
            ];
            for (var key of Object.keys(node.contents)) {
              entries.push(key);
            }
            return entries;
          },
          symlink(parent, newname, oldpath) {
            var node = MEMFS.createNode(parent, newname, 511 | 40960, 0);
            node.link = oldpath;
            return node;
          },
          readlink(node) {
            if (!FS.isLink(node.mode)) {
              throw new FS.ErrnoError(28);
            }
            return node.link;
          }
        },
        stream_ops: {
          read(stream, buffer2, offset, length, position) {
            var contents = stream.node.contents;
            if (position >= stream.node.usedBytes)
              return 0;
            var size = Math.min(stream.node.usedBytes - position, length);
            assert(size >= 0);
            if (size > 8 && contents.subarray) {
              buffer2.set(contents.subarray(position, position + size), offset);
            } else {
              for (var i2 = 0; i2 < size; i2++)
                buffer2[offset + i2] = contents[position + i2];
            }
            return size;
          },
          write(stream, buffer2, offset, length, position, canOwn) {
            assert(!(buffer2 instanceof ArrayBuffer));
            if (buffer2.buffer === HEAP8.buffer) {
              canOwn = false;
            }
            if (!length)
              return 0;
            var node = stream.node;
            node.timestamp = Date.now();
            if (buffer2.subarray && (!node.contents || node.contents.subarray)) {
              if (canOwn) {
                assert(position === 0, "canOwn must imply no weird position inside the file");
                node.contents = buffer2.subarray(offset, offset + length);
                node.usedBytes = length;
                return length;
              } else if (node.usedBytes === 0 && position === 0) {
                node.contents = buffer2.slice(offset, offset + length);
                node.usedBytes = length;
                return length;
              } else if (position + length <= node.usedBytes) {
                node.contents.set(buffer2.subarray(offset, offset + length), position);
                return length;
              }
            }
            MEMFS.expandFileStorage(node, position + length);
            if (node.contents.subarray && buffer2.subarray) {
              node.contents.set(buffer2.subarray(offset, offset + length), position);
            } else {
              for (var i2 = 0; i2 < length; i2++) {
                node.contents[position + i2] = buffer2[offset + i2];
              }
            }
            node.usedBytes = Math.max(node.usedBytes, position + length);
            return length;
          },
          llseek(stream, offset, whence) {
            var position = offset;
            if (whence === 1) {
              position += stream.position;
            } else if (whence === 2) {
              if (FS.isFile(stream.node.mode)) {
                position += stream.node.usedBytes;
              }
            }
            if (position < 0) {
              throw new FS.ErrnoError(28);
            }
            return position;
          },
          allocate(stream, offset, length) {
            MEMFS.expandFileStorage(stream.node, offset + length);
            stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length);
          },
          mmap(stream, length, position, prot, flags) {
            if (!FS.isFile(stream.node.mode)) {
              throw new FS.ErrnoError(43);
            }
            var ptr;
            var allocated;
            var contents = stream.node.contents;
            if (!(flags & 2) && contents.buffer === HEAP8.buffer) {
              allocated = false;
              ptr = contents.byteOffset;
            } else {
              if (position > 0 || position + length < contents.length) {
                if (contents.subarray) {
                  contents = contents.subarray(position, position + length);
                } else {
                  contents = Array.prototype.slice.call(contents, position, position + length);
                }
              }
              allocated = true;
              ptr = mmapAlloc();
              if (!ptr) {
                throw new FS.ErrnoError(48);
              }
              HEAP8.set(contents, ptr);
            }
            return {
              ptr,
              allocated
            };
          },
          msync(stream, buffer2, offset, length, mmapFlags) {
            MEMFS.stream_ops.write(stream, buffer2, 0, length, offset, false);
            return 0;
          }
        }
      };
      var asyncLoad = (url, onload, onerror, noRunDep) => {
        var dep = !noRunDep ? getUniqueRunDependency(`al ${url}`) : "";
        readAsync(url, (arrayBuffer) => {
          assert(arrayBuffer, `Loading data file "${url}" failed (no arrayBuffer).`);
          onload(new Uint8Array(arrayBuffer));
          if (dep)
            removeRunDependency(dep);
        }, (event) => {
          if (onerror) {
            onerror();
          } else {
            throw `Loading data file "${url}" failed.`;
          }
        });
        if (dep)
          addRunDependency(dep);
      };
      var FS_createDataFile = (parent, name, fileData, canRead, canWrite, canOwn) => {
        FS.createDataFile(parent, name, fileData, canRead, canWrite, canOwn);
      };
      var preloadPlugins = Module["preloadPlugins"] || [];
      var FS_handledByPreloadPlugin = (byteArray, fullname, finish, onerror) => {
        if (typeof Browser != "undefined")
          Browser.init();
        var handled = false;
        preloadPlugins.forEach((plugin) => {
          if (handled)
            return;
          if (plugin["canHandle"](fullname)) {
            plugin["handle"](byteArray, fullname, finish, onerror);
            handled = true;
          }
        });
        return handled;
      };
      var FS_createPreloadedFile = (parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) => {
        var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
        var dep = getUniqueRunDependency(`cp ${fullname}`);
        function processData(byteArray) {
          function finish(byteArray2) {
            preFinish == null ? void 0 : preFinish();
            if (!dontCreateFile) {
              FS_createDataFile(parent, name, byteArray2, canRead, canWrite, canOwn);
            }
            onload == null ? void 0 : onload();
            removeRunDependency(dep);
          }
          if (FS_handledByPreloadPlugin(byteArray, fullname, finish, () => {
            onerror == null ? void 0 : onerror();
            removeRunDependency(dep);
          })) {
            return;
          }
          finish(byteArray);
        }
        addRunDependency(dep);
        if (typeof url == "string") {
          asyncLoad(url, processData, onerror);
        } else {
          processData(url);
        }
      };
      var FS_modeStringToFlags = (str) => {
        var flagModes = {
          "r": 0,
          "r+": 2,
          "w": 512 | 64 | 1,
          "w+": 512 | 64 | 2,
          "a": 1024 | 64 | 1,
          "a+": 1024 | 64 | 2
        };
        var flags = flagModes[str];
        if (typeof flags == "undefined") {
          throw new Error(`Unknown file open mode: ${str}`);
        }
        return flags;
      };
      var FS_getMode = (canRead, canWrite) => {
        var mode = 0;
        if (canRead)
          mode |= 292 | 73;
        if (canWrite)
          mode |= 146;
        return mode;
      };
      var IDBFS = {
        dbs: {},
        indexedDB: () => {
          if (typeof indexedDB != "undefined")
            return indexedDB;
          var ret = null;
          if (typeof window == "object")
            ret = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
          assert(ret, "IDBFS used, but indexedDB not supported");
          return ret;
        },
        DB_VERSION: 21,
        DB_STORE_NAME: "FILE_DATA",
        mount: (...args) => MEMFS.mount(...args),
        syncfs: (mount, populate, callback) => {
          IDBFS.getLocalSet(mount, (err2, local) => {
            if (err2)
              return callback(err2);
            IDBFS.getRemoteSet(mount, (err3, remote) => {
              if (err3)
                return callback(err3);
              var src = populate ? remote : local;
              var dst = populate ? local : remote;
              IDBFS.reconcile(src, dst, callback);
            });
          });
        },
        quit: () => {
          Object.values(IDBFS.dbs).forEach((value) => value.close());
          IDBFS.dbs = {};
        },
        getDB: (name, callback) => {
          var db = IDBFS.dbs[name];
          if (db) {
            return callback(null, db);
          }
          var req;
          try {
            req = IDBFS.indexedDB().open(name, IDBFS.DB_VERSION);
          } catch (e) {
            return callback(e);
          }
          if (!req) {
            return callback("Unable to connect to IndexedDB");
          }
          req.onupgradeneeded = (e) => {
            var db2 = e.target.result;
            var transaction = e.target.transaction;
            var fileStore;
            if (db2.objectStoreNames.contains(IDBFS.DB_STORE_NAME)) {
              fileStore = transaction.objectStore(IDBFS.DB_STORE_NAME);
            } else {
              fileStore = db2.createObjectStore(IDBFS.DB_STORE_NAME);
            }
            if (!fileStore.indexNames.contains("timestamp")) {
              fileStore.createIndex("timestamp", "timestamp", {
                unique: false
              });
            }
          };
          req.onsuccess = () => {
            db = req.result;
            IDBFS.dbs[name] = db;
            callback(null, db);
          };
          req.onerror = (e) => {
            callback(e.target.error);
            e.preventDefault();
          };
        },
        getLocalSet: (mount, callback) => {
          var entries = {};
          function isRealDir(p) {
            return p !== "." && p !== "..";
          }
          function toAbsolute(root) {
            return (p) => PATH.join2(root, p);
          }
          var check = FS.readdir(mount.mountpoint).filter(isRealDir).map(toAbsolute(mount.mountpoint));
          while (check.length) {
            var path = check.pop();
            var stat;
            try {
              stat = FS.stat(path);
            } catch (e) {
              return callback(e);
            }
            if (FS.isDir(stat.mode)) {
              check.push(...FS.readdir(path).filter(isRealDir).map(toAbsolute(path)));
            }
            entries[path] = {
              "timestamp": stat.mtime
            };
          }
          return callback(null, {
            type: "local",
            entries
          });
        },
        getRemoteSet: (mount, callback) => {
          var entries = {};
          IDBFS.getDB(mount.mountpoint, (err2, db) => {
            if (err2)
              return callback(err2);
            try {
              var transaction = db.transaction([
                IDBFS.DB_STORE_NAME
              ], "readonly");
              transaction.onerror = (e) => {
                callback(e.target.error);
                e.preventDefault();
              };
              var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
              var index = store.index("timestamp");
              index.openKeyCursor().onsuccess = (event) => {
                var cursor = event.target.result;
                if (!cursor) {
                  return callback(null, {
                    type: "remote",
                    db,
                    entries
                  });
                }
                entries[cursor.primaryKey] = {
                  "timestamp": cursor.key
                };
                cursor.continue();
              };
            } catch (e) {
              return callback(e);
            }
          });
        },
        loadLocalEntry: (path, callback) => {
          var stat, node;
          try {
            var lookup2 = FS.lookupPath(path);
            node = lookup2.node;
            stat = FS.stat(path);
          } catch (e) {
            return callback(e);
          }
          if (FS.isDir(stat.mode)) {
            return callback(null, {
              "timestamp": stat.mtime,
              "mode": stat.mode
            });
          } else if (FS.isFile(stat.mode)) {
            node.contents = MEMFS.getFileDataAsTypedArray(node);
            return callback(null, {
              "timestamp": stat.mtime,
              "mode": stat.mode,
              "contents": node.contents
            });
          } else {
            return callback(new Error("node type not supported"));
          }
        },
        storeLocalEntry: (path, entry, callback) => {
          try {
            if (FS.isDir(entry["mode"])) {
              FS.mkdirTree(path, entry["mode"]);
            } else if (FS.isFile(entry["mode"])) {
              FS.writeFile(path, entry["contents"], {
                canOwn: true
              });
            } else {
              return callback(new Error("node type not supported"));
            }
            FS.chmod(path, entry["mode"]);
            FS.utime(path, entry["timestamp"], entry["timestamp"]);
          } catch (e) {
            return callback(e);
          }
          callback(null);
        },
        removeLocalEntry: (path, callback) => {
          try {
            var stat = FS.stat(path);
            if (FS.isDir(stat.mode)) {
              FS.rmdir(path);
            } else if (FS.isFile(stat.mode)) {
              FS.unlink(path);
            }
          } catch (e) {
            return callback(e);
          }
          callback(null);
        },
        loadRemoteEntry: (store, path, callback) => {
          var req = store.get(path);
          req.onsuccess = (event) => callback(null, event.target.result);
          req.onerror = (e) => {
            callback(e.target.error);
            e.preventDefault();
          };
        },
        storeRemoteEntry: (store, path, entry, callback) => {
          try {
            var req = store.put(entry, path);
          } catch (e) {
            callback(e);
            return;
          }
          req.onsuccess = (event) => callback();
          req.onerror = (e) => {
            callback(e.target.error);
            e.preventDefault();
          };
        },
        removeRemoteEntry: (store, path, callback) => {
          var req = store.delete(path);
          req.onsuccess = (event) => callback();
          req.onerror = (e) => {
            callback(e.target.error);
            e.preventDefault();
          };
        },
        reconcile: (src, dst, callback) => {
          var total = 0;
          var create = [];
          Object.keys(src.entries).forEach(function(key) {
            var e = src.entries[key];
            var e2 = dst.entries[key];
            if (!e2 || e["timestamp"].getTime() != e2["timestamp"].getTime()) {
              create.push(key);
              total++;
            }
          });
          var remove = [];
          Object.keys(dst.entries).forEach(function(key) {
            if (!src.entries[key]) {
              remove.push(key);
              total++;
            }
          });
          if (!total) {
            return callback(null);
          }
          var errored = false;
          var db = src.type === "remote" ? src.db : dst.db;
          var transaction = db.transaction([
            IDBFS.DB_STORE_NAME
          ], "readwrite");
          var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
          function done(err2) {
            if (err2 && !errored) {
              errored = true;
              return callback(err2);
            }
          }
          transaction.onerror = transaction.onabort = (e) => {
            done(e.target.error);
            e.preventDefault();
          };
          transaction.oncomplete = (e) => {
            if (!errored) {
              callback(null);
            }
          };
          create.sort().forEach((path) => {
            if (dst.type === "local") {
              IDBFS.loadRemoteEntry(store, path, (err2, entry) => {
                if (err2)
                  return done(err2);
                IDBFS.storeLocalEntry(path, entry, done);
              });
            } else {
              IDBFS.loadLocalEntry(path, (err2, entry) => {
                if (err2)
                  return done(err2);
                IDBFS.storeRemoteEntry(store, path, entry, done);
              });
            }
          });
          remove.sort().reverse().forEach((path) => {
            if (dst.type === "local") {
              IDBFS.removeLocalEntry(path, done);
            } else {
              IDBFS.removeRemoteEntry(store, path, done);
            }
          });
        }
      };
      var ERRNO_MESSAGES = {
        0: "Success",
        1: "Arg list too long",
        2: "Permission denied",
        3: "Address already in use",
        4: "Address not available",
        5: "Address family not supported by protocol family",
        6: "No more processes",
        7: "Socket already connected",
        8: "Bad file number",
        9: "Trying to read unreadable message",
        10: "Mount device busy",
        11: "Operation canceled",
        12: "No children",
        13: "Connection aborted",
        14: "Connection refused",
        15: "Connection reset by peer",
        16: "File locking deadlock error",
        17: "Destination address required",
        18: "Math arg out of domain of func",
        19: "Quota exceeded",
        20: "File exists",
        21: "Bad address",
        22: "File too large",
        23: "Host is unreachable",
        24: "Identifier removed",
        25: "Illegal byte sequence",
        26: "Connection already in progress",
        27: "Interrupted system call",
        28: "Invalid argument",
        29: "I/O error",
        30: "Socket is already connected",
        31: "Is a directory",
        32: "Too many symbolic links",
        33: "Too many open files",
        34: "Too many links",
        35: "Message too long",
        36: "Multihop attempted",
        37: "File or path name too long",
        38: "Network interface is not configured",
        39: "Connection reset by network",
        40: "Network is unreachable",
        41: "Too many open files in system",
        42: "No buffer space available",
        43: "No such device",
        44: "No such file or directory",
        45: "Exec format error",
        46: "No record locks available",
        47: "The link has been severed",
        48: "Not enough core",
        49: "No message of desired type",
        50: "Protocol not available",
        51: "No space left on device",
        52: "Function not implemented",
        53: "Socket is not connected",
        54: "Not a directory",
        55: "Directory not empty",
        56: "State not recoverable",
        57: "Socket operation on non-socket",
        59: "Not a typewriter",
        60: "No such device or address",
        61: "Value too large for defined data type",
        62: "Previous owner died",
        63: "Not super-user",
        64: "Broken pipe",
        65: "Protocol error",
        66: "Unknown protocol",
        67: "Protocol wrong type for socket",
        68: "Math result not representable",
        69: "Read only file system",
        70: "Illegal seek",
        71: "No such process",
        72: "Stale file handle",
        73: "Connection timed out",
        74: "Text file busy",
        75: "Cross-device link",
        100: "Device not a stream",
        101: "Bad font file fmt",
        102: "Invalid slot",
        103: "Invalid request code",
        104: "No anode",
        105: "Block device required",
        106: "Channel number out of range",
        107: "Level 3 halted",
        108: "Level 3 reset",
        109: "Link number out of range",
        110: "Protocol driver not attached",
        111: "No CSI structure available",
        112: "Level 2 halted",
        113: "Invalid exchange",
        114: "Invalid request descriptor",
        115: "Exchange full",
        116: "No data (for no delay io)",
        117: "Timer expired",
        118: "Out of streams resources",
        119: "Machine is not on the network",
        120: "Package not installed",
        121: "The object is remote",
        122: "Advertise error",
        123: "Srmount error",
        124: "Communication error on send",
        125: "Cross mount point (not really error)",
        126: "Given log. name not unique",
        127: "f.d. invalid for this operation",
        128: "Remote address changed",
        129: "Can   access a needed shared lib",
        130: "Accessing a corrupted shared lib",
        131: ".lib section in a.out corrupted",
        132: "Attempting to link in too many libs",
        133: "Attempting to exec a shared library",
        135: "Streams pipe error",
        136: "Too many users",
        137: "Socket type not supported",
        138: "Not supported",
        139: "Protocol family not supported",
        140: "Can't send after socket shutdown",
        141: "Too many references",
        142: "Host is down",
        148: "No medium (in tape drive)",
        156: "Level 2 not synchronized"
      };
      var ERRNO_CODES = {
        "EPERM": 63,
        "ENOENT": 44,
        "ESRCH": 71,
        "EINTR": 27,
        "EIO": 29,
        "ENXIO": 60,
        "E2BIG": 1,
        "ENOEXEC": 45,
        "EBADF": 8,
        "ECHILD": 12,
        "EAGAIN": 6,
        "EWOULDBLOCK": 6,
        "ENOMEM": 48,
        "EACCES": 2,
        "EFAULT": 21,
        "ENOTBLK": 105,
        "EBUSY": 10,
        "EEXIST": 20,
        "EXDEV": 75,
        "ENODEV": 43,
        "ENOTDIR": 54,
        "EISDIR": 31,
        "EINVAL": 28,
        "ENFILE": 41,
        "EMFILE": 33,
        "ENOTTY": 59,
        "ETXTBSY": 74,
        "EFBIG": 22,
        "ENOSPC": 51,
        "ESPIPE": 70,
        "EROFS": 69,
        "EMLINK": 34,
        "EPIPE": 64,
        "EDOM": 18,
        "ERANGE": 68,
        "ENOMSG": 49,
        "EIDRM": 24,
        "ECHRNG": 106,
        "EL2NSYNC": 156,
        "EL3HLT": 107,
        "EL3RST": 108,
        "ELNRNG": 109,
        "EUNATCH": 110,
        "ENOCSI": 111,
        "EL2HLT": 112,
        "EDEADLK": 16,
        "ENOLCK": 46,
        "EBADE": 113,
        "EBADR": 114,
        "EXFULL": 115,
        "ENOANO": 104,
        "EBADRQC": 103,
        "EBADSLT": 102,
        "EDEADLOCK": 16,
        "EBFONT": 101,
        "ENOSTR": 100,
        "ENODATA": 116,
        "ETIME": 117,
        "ENOSR": 118,
        "ENONET": 119,
        "ENOPKG": 120,
        "EREMOTE": 121,
        "ENOLINK": 47,
        "EADV": 122,
        "ESRMNT": 123,
        "ECOMM": 124,
        "EPROTO": 65,
        "EMULTIHOP": 36,
        "EDOTDOT": 125,
        "EBADMSG": 9,
        "ENOTUNIQ": 126,
        "EBADFD": 127,
        "EREMCHG": 128,
        "ELIBACC": 129,
        "ELIBBAD": 130,
        "ELIBSCN": 131,
        "ELIBMAX": 132,
        "ELIBEXEC": 133,
        "ENOSYS": 52,
        "ENOTEMPTY": 55,
        "ENAMETOOLONG": 37,
        "ELOOP": 32,
        "EOPNOTSUPP": 138,
        "EPFNOSUPPORT": 139,
        "ECONNRESET": 15,
        "ENOBUFS": 42,
        "EAFNOSUPPORT": 5,
        "EPROTOTYPE": 67,
        "ENOTSOCK": 57,
        "ENOPROTOOPT": 50,
        "ESHUTDOWN": 140,
        "ECONNREFUSED": 14,
        "EADDRINUSE": 3,
        "ECONNABORTED": 13,
        "ENETUNREACH": 40,
        "ENETDOWN": 38,
        "ETIMEDOUT": 73,
        "EHOSTDOWN": 142,
        "EHOSTUNREACH": 23,
        "EINPROGRESS": 26,
        "EALREADY": 7,
        "EDESTADDRREQ": 17,
        "EMSGSIZE": 35,
        "EPROTONOSUPPORT": 66,
        "ESOCKTNOSUPPORT": 137,
        "EADDRNOTAVAIL": 4,
        "ENETRESET": 39,
        "EISCONN": 30,
        "ENOTCONN": 53,
        "ETOOMANYREFS": 141,
        "EUSERS": 136,
        "EDQUOT": 19,
        "ESTALE": 72,
        "ENOTSUP": 138,
        "ENOMEDIUM": 148,
        "EILSEQ": 25,
        "EOVERFLOW": 61,
        "ECANCELED": 11,
        "ENOTRECOVERABLE": 56,
        "EOWNERDEAD": 62,
        "ESTRPIPE": 135
      };
      var FS = {
        root: null,
        mounts: [],
        devices: {},
        streams: [],
        nextInode: 1,
        nameTable: null,
        currentPath: "/",
        initialized: false,
        ignorePermissions: true,
        ErrnoError: class extends Error {
          constructor(errno) {
            super(ERRNO_MESSAGES[errno]);
            this.name = "ErrnoError";
            this.errno = errno;
            for (var key in ERRNO_CODES) {
              if (ERRNO_CODES[key] === errno) {
                this.code = key;
                break;
              }
            }
          }
        },
        genericErrors: {},
        filesystems: null,
        syncFSRequests: 0,
        FSStream: class {
          constructor() {
            this.shared = {};
          }
          get object() {
            return this.node;
          }
          set object(val) {
            this.node = val;
          }
          get isRead() {
            return (this.flags & 2097155) !== 1;
          }
          get isWrite() {
            return (this.flags & 2097155) !== 0;
          }
          get isAppend() {
            return this.flags & 1024;
          }
          get flags() {
            return this.shared.flags;
          }
          set flags(val) {
            this.shared.flags = val;
          }
          get position() {
            return this.shared.position;
          }
          set position(val) {
            this.shared.position = val;
          }
        },
        FSNode: class {
          constructor(parent, name, mode, rdev) {
            if (!parent) {
              parent = this;
            }
            this.parent = parent;
            this.mount = parent.mount;
            this.mounted = null;
            this.id = FS.nextInode++;
            this.name = name;
            this.mode = mode;
            this.node_ops = {};
            this.stream_ops = {};
            this.rdev = rdev;
            this.readMode = 292 | 73;
            this.writeMode = 146;
          }
          get read() {
            return (this.mode & this.readMode) === this.readMode;
          }
          set read(val) {
            val ? this.mode |= this.readMode : this.mode &= ~this.readMode;
          }
          get write() {
            return (this.mode & this.writeMode) === this.writeMode;
          }
          set write(val) {
            val ? this.mode |= this.writeMode : this.mode &= ~this.writeMode;
          }
          get isFolder() {
            return FS.isDir(this.mode);
          }
          get isDevice() {
            return FS.isChrdev(this.mode);
          }
        },
        lookupPath(path, opts = {}) {
          path = PATH_FS.resolve(path);
          if (!path)
            return {
              path: "",
              node: null
            };
          var defaults = {
            follow_mount: true,
            recurse_count: 0
          };
          opts = Object.assign(defaults, opts);
          if (opts.recurse_count > 8) {
            throw new FS.ErrnoError(32);
          }
          var parts = path.split("/").filter((p) => !!p);
          var current = FS.root;
          var current_path = "/";
          for (var i2 = 0; i2 < parts.length; i2++) {
            var islast = i2 === parts.length - 1;
            if (islast && opts.parent) {
              break;
            }
            current = FS.lookupNode(current, parts[i2]);
            current_path = PATH.join2(current_path, parts[i2]);
            if (FS.isMountpoint(current)) {
              if (!islast || islast && opts.follow_mount) {
                current = current.mounted.root;
              }
            }
            if (!islast || opts.follow) {
              var count = 0;
              while (FS.isLink(current.mode)) {
                var link = FS.readlink(current_path);
                current_path = PATH_FS.resolve(PATH.dirname(current_path), link);
                var lookup2 = FS.lookupPath(current_path, {
                  recurse_count: opts.recurse_count + 1
                });
                current = lookup2.node;
                if (count++ > 40) {
                  throw new FS.ErrnoError(32);
                }
              }
            }
          }
          return {
            path: current_path,
            node: current
          };
        },
        getPath(node) {
          var path;
          while (true) {
            if (FS.isRoot(node)) {
              var mount = node.mount.mountpoint;
              if (!path)
                return mount;
              return mount[mount.length - 1] !== "/" ? `${mount}/${path}` : mount + path;
            }
            path = path ? `${node.name}/${path}` : node.name;
            node = node.parent;
          }
        },
        hashName(parentid, name) {
          var hash = 0;
          for (var i2 = 0; i2 < name.length; i2++) {
            hash = (hash << 5) - hash + name.charCodeAt(i2) | 0;
          }
          return (parentid + hash >>> 0) % FS.nameTable.length;
        },
        hashAddNode(node) {
          var hash = FS.hashName(node.parent.id, node.name);
          node.name_next = FS.nameTable[hash];
          FS.nameTable[hash] = node;
        },
        hashRemoveNode(node) {
          var hash = FS.hashName(node.parent.id, node.name);
          if (FS.nameTable[hash] === node) {
            FS.nameTable[hash] = node.name_next;
          } else {
            var current = FS.nameTable[hash];
            while (current) {
              if (current.name_next === node) {
                current.name_next = node.name_next;
                break;
              }
              current = current.name_next;
            }
          }
        },
        lookupNode(parent, name) {
          var errCode = FS.mayLookup(parent);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          var hash = FS.hashName(parent.id, name);
          for (var node = FS.nameTable[hash]; node; node = node.name_next) {
            var nodeName = node.name;
            if (node.parent.id === parent.id && nodeName === name) {
              return node;
            }
          }
          return FS.lookup(parent, name);
        },
        createNode(parent, name, mode, rdev) {
          assert(typeof parent == "object");
          var node = new FS.FSNode(parent, name, mode, rdev);
          FS.hashAddNode(node);
          return node;
        },
        destroyNode(node) {
          FS.hashRemoveNode(node);
        },
        isRoot(node) {
          return node === node.parent;
        },
        isMountpoint(node) {
          return !!node.mounted;
        },
        isFile(mode) {
          return (mode & 61440) === 32768;
        },
        isDir(mode) {
          return (mode & 61440) === 16384;
        },
        isLink(mode) {
          return (mode & 61440) === 40960;
        },
        isChrdev(mode) {
          return (mode & 61440) === 8192;
        },
        isBlkdev(mode) {
          return (mode & 61440) === 24576;
        },
        isFIFO(mode) {
          return (mode & 61440) === 4096;
        },
        isSocket(mode) {
          return (mode & 49152) === 49152;
        },
        flagsToPermissionString(flag) {
          var perms = [
            "r",
            "w",
            "rw"
          ][flag & 3];
          if (flag & 512) {
            perms += "w";
          }
          return perms;
        },
        nodePermissions(node, perms) {
          if (FS.ignorePermissions) {
            return 0;
          }
          if (perms.includes("r") && !(node.mode & 292)) {
            return 2;
          } else if (perms.includes("w") && !(node.mode & 146)) {
            return 2;
          } else if (perms.includes("x") && !(node.mode & 73)) {
            return 2;
          }
          return 0;
        },
        mayLookup(dir) {
          if (!FS.isDir(dir.mode))
            return 54;
          var errCode = FS.nodePermissions(dir, "x");
          if (errCode)
            return errCode;
          if (!dir.node_ops.lookup)
            return 2;
          return 0;
        },
        mayCreate(dir, name) {
          try {
            var node = FS.lookupNode(dir, name);
            return 20;
          } catch (e) {
          }
          return FS.nodePermissions(dir, "wx");
        },
        mayDelete(dir, name, isdir) {
          var node;
          try {
            node = FS.lookupNode(dir, name);
          } catch (e) {
            return e.errno;
          }
          var errCode = FS.nodePermissions(dir, "wx");
          if (errCode) {
            return errCode;
          }
          if (isdir) {
            if (!FS.isDir(node.mode)) {
              return 54;
            }
            if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
              return 10;
            }
          } else {
            if (FS.isDir(node.mode)) {
              return 31;
            }
          }
          return 0;
        },
        mayOpen(node, flags) {
          if (!node) {
            return 44;
          }
          if (FS.isLink(node.mode)) {
            return 32;
          } else if (FS.isDir(node.mode)) {
            if (FS.flagsToPermissionString(flags) !== "r" || flags & 512) {
              return 31;
            }
          }
          return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
        },
        MAX_OPEN_FDS: 4096,
        nextfd() {
          for (var fd = 0; fd <= FS.MAX_OPEN_FDS; fd++) {
            if (!FS.streams[fd]) {
              return fd;
            }
          }
          throw new FS.ErrnoError(33);
        },
        getStreamChecked(fd) {
          var stream = FS.getStream(fd);
          if (!stream) {
            throw new FS.ErrnoError(8);
          }
          return stream;
        },
        getStream: (fd) => FS.streams[fd],
        createStream(stream, fd = -1) {
          stream = Object.assign(new FS.FSStream(), stream);
          if (fd == -1) {
            fd = FS.nextfd();
          }
          stream.fd = fd;
          FS.streams[fd] = stream;
          return stream;
        },
        closeStream(fd) {
          FS.streams[fd] = null;
        },
        dupStream(origStream, fd = -1) {
          var _a, _b;
          var stream = FS.createStream(origStream, fd);
          (_b = (_a = stream.stream_ops) == null ? void 0 : _a.dup) == null ? void 0 : _b.call(_a, stream);
          return stream;
        },
        chrdev_stream_ops: {
          open(stream) {
            var _a, _b;
            var device = FS.getDevice(stream.node.rdev);
            stream.stream_ops = device.stream_ops;
            (_b = (_a = stream.stream_ops).open) == null ? void 0 : _b.call(_a, stream);
          },
          llseek() {
            throw new FS.ErrnoError(70);
          }
        },
        major: (dev) => dev >> 8,
        minor: (dev) => dev & 255,
        makedev: (ma, mi) => ma << 8 | mi,
        registerDevice(dev, ops) {
          FS.devices[dev] = {
            stream_ops: ops
          };
        },
        getDevice: (dev) => FS.devices[dev],
        getMounts(mount) {
          var mounts = [];
          var check = [
            mount
          ];
          while (check.length) {
            var m = check.pop();
            mounts.push(m);
            check.push(...m.mounts);
          }
          return mounts;
        },
        syncfs(populate, callback) {
          if (typeof populate == "function") {
            callback = populate;
            populate = false;
          }
          FS.syncFSRequests++;
          if (FS.syncFSRequests > 1) {
            err(`warning: ${FS.syncFSRequests} FS.syncfs operations in flight at once, probably just doing extra work`);
          }
          var mounts = FS.getMounts(FS.root.mount);
          var completed = 0;
          function doCallback(errCode) {
            assert(FS.syncFSRequests > 0);
            FS.syncFSRequests--;
            return callback(errCode);
          }
          function done(errCode) {
            if (errCode) {
              if (!done.errored) {
                done.errored = true;
                return doCallback(errCode);
              }
              return;
            }
            if (++completed >= mounts.length) {
              doCallback(null);
            }
          }
          mounts.forEach((mount) => {
            if (!mount.type.syncfs) {
              return done(null);
            }
            mount.type.syncfs(mount, populate, done);
          });
        },
        mount(type, opts, mountpoint) {
          if (typeof type == "string") {
            throw type;
          }
          var root = mountpoint === "/";
          var pseudo = !mountpoint;
          var node;
          if (root && FS.root) {
            throw new FS.ErrnoError(10);
          } else if (!root && !pseudo) {
            var lookup2 = FS.lookupPath(mountpoint, {
              follow_mount: false
            });
            mountpoint = lookup2.path;
            node = lookup2.node;
            if (FS.isMountpoint(node)) {
              throw new FS.ErrnoError(10);
            }
            if (!FS.isDir(node.mode)) {
              throw new FS.ErrnoError(54);
            }
          }
          var mount = {
            type,
            opts,
            mountpoint,
            mounts: []
          };
          var mountRoot = type.mount(mount);
          mountRoot.mount = mount;
          mount.root = mountRoot;
          if (root) {
            FS.root = mountRoot;
          } else if (node) {
            node.mounted = mount;
            if (node.mount) {
              node.mount.mounts.push(mount);
            }
          }
          return mountRoot;
        },
        unmount(mountpoint) {
          var lookup2 = FS.lookupPath(mountpoint, {
            follow_mount: false
          });
          if (!FS.isMountpoint(lookup2.node)) {
            throw new FS.ErrnoError(28);
          }
          var node = lookup2.node;
          var mount = node.mounted;
          var mounts = FS.getMounts(mount);
          Object.keys(FS.nameTable).forEach((hash) => {
            var current = FS.nameTable[hash];
            while (current) {
              var next = current.name_next;
              if (mounts.includes(current.mount)) {
                FS.destroyNode(current);
              }
              current = next;
            }
          });
          node.mounted = null;
          var idx = node.mount.mounts.indexOf(mount);
          assert(idx !== -1);
          node.mount.mounts.splice(idx, 1);
        },
        lookup(parent, name) {
          return parent.node_ops.lookup(parent, name);
        },
        mknod(path, mode, dev) {
          var lookup2 = FS.lookupPath(path, {
            parent: true
          });
          var parent = lookup2.node;
          var name = PATH.basename(path);
          if (!name || name === "." || name === "..") {
            throw new FS.ErrnoError(28);
          }
          var errCode = FS.mayCreate(parent, name);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          if (!parent.node_ops.mknod) {
            throw new FS.ErrnoError(63);
          }
          return parent.node_ops.mknod(parent, name, mode, dev);
        },
        create(path, mode) {
          mode = mode !== void 0 ? mode : 438;
          mode &= 4095;
          mode |= 32768;
          return FS.mknod(path, mode, 0);
        },
        mkdir(path, mode) {
          mode = mode !== void 0 ? mode : 511;
          mode &= 511 | 512;
          mode |= 16384;
          return FS.mknod(path, mode, 0);
        },
        mkdirTree(path, mode) {
          var dirs = path.split("/");
          var d = "";
          for (var i2 = 0; i2 < dirs.length; ++i2) {
            if (!dirs[i2])
              continue;
            d += "/" + dirs[i2];
            try {
              FS.mkdir(d, mode);
            } catch (e) {
              if (e.errno != 20)
                throw e;
            }
          }
        },
        mkdev(path, mode, dev) {
          if (typeof dev == "undefined") {
            dev = mode;
            mode = 438;
          }
          mode |= 8192;
          return FS.mknod(path, mode, dev);
        },
        symlink(oldpath, newpath) {
          if (!PATH_FS.resolve(oldpath)) {
            throw new FS.ErrnoError(44);
          }
          var lookup2 = FS.lookupPath(newpath, {
            parent: true
          });
          var parent = lookup2.node;
          if (!parent) {
            throw new FS.ErrnoError(44);
          }
          var newname = PATH.basename(newpath);
          var errCode = FS.mayCreate(parent, newname);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          if (!parent.node_ops.symlink) {
            throw new FS.ErrnoError(63);
          }
          return parent.node_ops.symlink(parent, newname, oldpath);
        },
        rename(old_path, new_path) {
          var old_dirname = PATH.dirname(old_path);
          var new_dirname = PATH.dirname(new_path);
          var old_name = PATH.basename(old_path);
          var new_name = PATH.basename(new_path);
          var lookup2, old_dir, new_dir;
          lookup2 = FS.lookupPath(old_path, {
            parent: true
          });
          old_dir = lookup2.node;
          lookup2 = FS.lookupPath(new_path, {
            parent: true
          });
          new_dir = lookup2.node;
          if (!old_dir || !new_dir)
            throw new FS.ErrnoError(44);
          if (old_dir.mount !== new_dir.mount) {
            throw new FS.ErrnoError(75);
          }
          var old_node = FS.lookupNode(old_dir, old_name);
          var relative = PATH_FS.relative(old_path, new_dirname);
          if (relative.charAt(0) !== ".") {
            throw new FS.ErrnoError(28);
          }
          relative = PATH_FS.relative(new_path, old_dirname);
          if (relative.charAt(0) !== ".") {
            throw new FS.ErrnoError(55);
          }
          var new_node;
          try {
            new_node = FS.lookupNode(new_dir, new_name);
          } catch (e) {
          }
          if (old_node === new_node) {
            return;
          }
          var isdir = FS.isDir(old_node.mode);
          var errCode = FS.mayDelete(old_dir, old_name, isdir);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          errCode = new_node ? FS.mayDelete(new_dir, new_name, isdir) : FS.mayCreate(new_dir, new_name);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          if (!old_dir.node_ops.rename) {
            throw new FS.ErrnoError(63);
          }
          if (FS.isMountpoint(old_node) || new_node && FS.isMountpoint(new_node)) {
            throw new FS.ErrnoError(10);
          }
          if (new_dir !== old_dir) {
            errCode = FS.nodePermissions(old_dir, "w");
            if (errCode) {
              throw new FS.ErrnoError(errCode);
            }
          }
          FS.hashRemoveNode(old_node);
          try {
            old_dir.node_ops.rename(old_node, new_dir, new_name);
          } catch (e) {
            throw e;
          } finally {
            FS.hashAddNode(old_node);
          }
        },
        rmdir(path) {
          var lookup2 = FS.lookupPath(path, {
            parent: true
          });
          var parent = lookup2.node;
          var name = PATH.basename(path);
          var node = FS.lookupNode(parent, name);
          var errCode = FS.mayDelete(parent, name, true);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          if (!parent.node_ops.rmdir) {
            throw new FS.ErrnoError(63);
          }
          if (FS.isMountpoint(node)) {
            throw new FS.ErrnoError(10);
          }
          parent.node_ops.rmdir(parent, name);
          FS.destroyNode(node);
        },
        readdir(path) {
          var lookup2 = FS.lookupPath(path, {
            follow: true
          });
          var node = lookup2.node;
          if (!node.node_ops.readdir) {
            throw new FS.ErrnoError(54);
          }
          return node.node_ops.readdir(node);
        },
        unlink(path) {
          var lookup2 = FS.lookupPath(path, {
            parent: true
          });
          var parent = lookup2.node;
          if (!parent) {
            throw new FS.ErrnoError(44);
          }
          var name = PATH.basename(path);
          var node = FS.lookupNode(parent, name);
          var errCode = FS.mayDelete(parent, name, false);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          if (!parent.node_ops.unlink) {
            throw new FS.ErrnoError(63);
          }
          if (FS.isMountpoint(node)) {
            throw new FS.ErrnoError(10);
          }
          parent.node_ops.unlink(parent, name);
          FS.destroyNode(node);
        },
        readlink(path) {
          var lookup2 = FS.lookupPath(path);
          var link = lookup2.node;
          if (!link) {
            throw new FS.ErrnoError(44);
          }
          if (!link.node_ops.readlink) {
            throw new FS.ErrnoError(28);
          }
          return PATH_FS.resolve(FS.getPath(link.parent), link.node_ops.readlink(link));
        },
        stat(path, dontFollow) {
          var lookup2 = FS.lookupPath(path, {
            follow: !dontFollow
          });
          var node = lookup2.node;
          if (!node) {
            throw new FS.ErrnoError(44);
          }
          if (!node.node_ops.getattr) {
            throw new FS.ErrnoError(63);
          }
          return node.node_ops.getattr(node);
        },
        lstat(path) {
          return FS.stat(path, true);
        },
        chmod(path, mode, dontFollow) {
          var node;
          if (typeof path == "string") {
            var lookup2 = FS.lookupPath(path, {
              follow: !dontFollow
            });
            node = lookup2.node;
          } else {
            node = path;
          }
          if (!node.node_ops.setattr) {
            throw new FS.ErrnoError(63);
          }
          node.node_ops.setattr(node, {
            mode: mode & 4095 | node.mode & ~4095,
            timestamp: Date.now()
          });
        },
        lchmod(path, mode) {
          FS.chmod(path, mode, true);
        },
        fchmod(fd, mode) {
          var stream = FS.getStreamChecked(fd);
          FS.chmod(stream.node, mode);
        },
        chown(path, uid, gid, dontFollow) {
          var node;
          if (typeof path == "string") {
            var lookup2 = FS.lookupPath(path, {
              follow: !dontFollow
            });
            node = lookup2.node;
          } else {
            node = path;
          }
          if (!node.node_ops.setattr) {
            throw new FS.ErrnoError(63);
          }
          node.node_ops.setattr(node, {
            timestamp: Date.now()
          });
        },
        lchown(path, uid, gid) {
          FS.chown(path, uid, gid, true);
        },
        fchown(fd, uid, gid) {
          var stream = FS.getStreamChecked(fd);
          FS.chown(stream.node, uid, gid);
        },
        truncate(path, len2) {
          if (len2 < 0) {
            throw new FS.ErrnoError(28);
          }
          var node;
          if (typeof path == "string") {
            var lookup2 = FS.lookupPath(path, {
              follow: true
            });
            node = lookup2.node;
          } else {
            node = path;
          }
          if (!node.node_ops.setattr) {
            throw new FS.ErrnoError(63);
          }
          if (FS.isDir(node.mode)) {
            throw new FS.ErrnoError(31);
          }
          if (!FS.isFile(node.mode)) {
            throw new FS.ErrnoError(28);
          }
          var errCode = FS.nodePermissions(node, "w");
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          node.node_ops.setattr(node, {
            size: len2,
            timestamp: Date.now()
          });
        },
        ftruncate(fd, len2) {
          var stream = FS.getStreamChecked(fd);
          if ((stream.flags & 2097155) === 0) {
            throw new FS.ErrnoError(28);
          }
          FS.truncate(stream.node, len2);
        },
        utime(path, atime, mtime) {
          var lookup2 = FS.lookupPath(path, {
            follow: true
          });
          var node = lookup2.node;
          node.node_ops.setattr(node, {
            timestamp: Math.max(atime, mtime)
          });
        },
        open(path, flags, mode) {
          if (path === "") {
            throw new FS.ErrnoError(44);
          }
          flags = typeof flags == "string" ? FS_modeStringToFlags(flags) : flags;
          mode = typeof mode == "undefined" ? 438 : mode;
          if (flags & 64) {
            mode = mode & 4095 | 32768;
          } else {
            mode = 0;
          }
          var node;
          if (typeof path == "object") {
            node = path;
          } else {
            path = PATH.normalize(path);
            try {
              var lookup2 = FS.lookupPath(path, {
                follow: !(flags & 131072)
              });
              node = lookup2.node;
            } catch (e) {
            }
          }
          var created = false;
          if (flags & 64) {
            if (node) {
              if (flags & 128) {
                throw new FS.ErrnoError(20);
              }
            } else {
              node = FS.mknod(path, mode, 0);
              created = true;
            }
          }
          if (!node) {
            throw new FS.ErrnoError(44);
          }
          if (FS.isChrdev(node.mode)) {
            flags &= ~512;
          }
          if (flags & 65536 && !FS.isDir(node.mode)) {
            throw new FS.ErrnoError(54);
          }
          if (!created) {
            var errCode = FS.mayOpen(node, flags);
            if (errCode) {
              throw new FS.ErrnoError(errCode);
            }
          }
          if (flags & 512 && !created) {
            FS.truncate(node, 0);
          }
          flags &= ~(128 | 512 | 131072);
          var stream = FS.createStream({
            node,
            path: FS.getPath(node),
            flags,
            seekable: true,
            position: 0,
            stream_ops: node.stream_ops,
            ungotten: [],
            error: false
          });
          if (stream.stream_ops.open) {
            stream.stream_ops.open(stream);
          }
          if (Module["logReadFiles"] && !(flags & 1)) {
            if (!FS.readFiles)
              FS.readFiles = {};
            if (!(path in FS.readFiles)) {
              FS.readFiles[path] = 1;
            }
          }
          return stream;
        },
        close(stream) {
          if (FS.isClosed(stream)) {
            throw new FS.ErrnoError(8);
          }
          if (stream.getdents)
            stream.getdents = null;
          try {
            if (stream.stream_ops.close) {
              stream.stream_ops.close(stream);
            }
          } catch (e) {
            throw e;
          } finally {
            FS.closeStream(stream.fd);
          }
          stream.fd = null;
        },
        isClosed(stream) {
          return stream.fd === null;
        },
        llseek(stream, offset, whence) {
          if (FS.isClosed(stream)) {
            throw new FS.ErrnoError(8);
          }
          if (!stream.seekable || !stream.stream_ops.llseek) {
            throw new FS.ErrnoError(70);
          }
          if (whence != 0 && whence != 1 && whence != 2) {
            throw new FS.ErrnoError(28);
          }
          stream.position = stream.stream_ops.llseek(stream, offset, whence);
          stream.ungotten = [];
          return stream.position;
        },
        read(stream, buffer2, offset, length, position) {
          assert(offset >= 0);
          if (length < 0 || position < 0) {
            throw new FS.ErrnoError(28);
          }
          if (FS.isClosed(stream)) {
            throw new FS.ErrnoError(8);
          }
          if ((stream.flags & 2097155) === 1) {
            throw new FS.ErrnoError(8);
          }
          if (FS.isDir(stream.node.mode)) {
            throw new FS.ErrnoError(31);
          }
          if (!stream.stream_ops.read) {
            throw new FS.ErrnoError(28);
          }
          var seeking = typeof position != "undefined";
          if (!seeking) {
            position = stream.position;
          } else if (!stream.seekable) {
            throw new FS.ErrnoError(70);
          }
          var bytesRead = stream.stream_ops.read(stream, buffer2, offset, length, position);
          if (!seeking)
            stream.position += bytesRead;
          return bytesRead;
        },
        write(stream, buffer2, offset, length, position, canOwn) {
          assert(offset >= 0);
          if (length < 0 || position < 0) {
            throw new FS.ErrnoError(28);
          }
          if (FS.isClosed(stream)) {
            throw new FS.ErrnoError(8);
          }
          if ((stream.flags & 2097155) === 0) {
            throw new FS.ErrnoError(8);
          }
          if (FS.isDir(stream.node.mode)) {
            throw new FS.ErrnoError(31);
          }
          if (!stream.stream_ops.write) {
            throw new FS.ErrnoError(28);
          }
          if (stream.seekable && stream.flags & 1024) {
            FS.llseek(stream, 0, 2);
          }
          var seeking = typeof position != "undefined";
          if (!seeking) {
            position = stream.position;
          } else if (!stream.seekable) {
            throw new FS.ErrnoError(70);
          }
          var bytesWritten = stream.stream_ops.write(stream, buffer2, offset, length, position, canOwn);
          if (!seeking)
            stream.position += bytesWritten;
          return bytesWritten;
        },
        allocate(stream, offset, length) {
          if (FS.isClosed(stream)) {
            throw new FS.ErrnoError(8);
          }
          if (offset < 0 || length <= 0) {
            throw new FS.ErrnoError(28);
          }
          if ((stream.flags & 2097155) === 0) {
            throw new FS.ErrnoError(8);
          }
          if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
            throw new FS.ErrnoError(43);
          }
          if (!stream.stream_ops.allocate) {
            throw new FS.ErrnoError(138);
          }
          stream.stream_ops.allocate(stream, offset, length);
        },
        mmap(stream, length, position, prot, flags) {
          if ((prot & 2) !== 0 && (flags & 2) === 0 && (stream.flags & 2097155) !== 2) {
            throw new FS.ErrnoError(2);
          }
          if ((stream.flags & 2097155) === 1) {
            throw new FS.ErrnoError(2);
          }
          if (!stream.stream_ops.mmap) {
            throw new FS.ErrnoError(43);
          }
          return stream.stream_ops.mmap(stream, length, position, prot, flags);
        },
        msync(stream, buffer2, offset, length, mmapFlags) {
          assert(offset >= 0);
          if (!stream.stream_ops.msync) {
            return 0;
          }
          return stream.stream_ops.msync(stream, buffer2, offset, length, mmapFlags);
        },
        ioctl(stream, cmd, arg) {
          if (!stream.stream_ops.ioctl) {
            throw new FS.ErrnoError(59);
          }
          return stream.stream_ops.ioctl(stream, cmd, arg);
        },
        readFile(path, opts = {}) {
          opts.flags = opts.flags || 0;
          opts.encoding = opts.encoding || "binary";
          if (opts.encoding !== "utf8" && opts.encoding !== "binary") {
            throw new Error(`Invalid encoding type "${opts.encoding}"`);
          }
          var ret;
          var stream = FS.open(path, opts.flags);
          var stat = FS.stat(path);
          var length = stat.size;
          var buf = new Uint8Array(length);
          FS.read(stream, buf, 0, length, 0);
          if (opts.encoding === "utf8") {
            ret = UTF8ArrayToString(buf, 0);
          } else if (opts.encoding === "binary") {
            ret = buf;
          }
          FS.close(stream);
          return ret;
        },
        writeFile(path, data, opts = {}) {
          opts.flags = opts.flags || 577;
          var stream = FS.open(path, opts.flags, opts.mode);
          if (typeof data == "string") {
            var buf = new Uint8Array(lengthBytesUTF8(data) + 1);
            var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
            FS.write(stream, buf, 0, actualNumBytes, void 0, opts.canOwn);
          } else if (ArrayBuffer.isView(data)) {
            FS.write(stream, data, 0, data.byteLength, void 0, opts.canOwn);
          } else {
            throw new Error("Unsupported data type");
          }
          FS.close(stream);
        },
        cwd: () => FS.currentPath,
        chdir(path) {
          var lookup2 = FS.lookupPath(path, {
            follow: true
          });
          if (lookup2.node === null) {
            throw new FS.ErrnoError(44);
          }
          if (!FS.isDir(lookup2.node.mode)) {
            throw new FS.ErrnoError(54);
          }
          var errCode = FS.nodePermissions(lookup2.node, "x");
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          FS.currentPath = lookup2.path;
        },
        createDefaultDirectories() {
          FS.mkdir("/tmp");
          FS.mkdir("/home");
          FS.mkdir("/home/web_user");
        },
        createDefaultDevices() {
          FS.mkdir("/dev");
          FS.registerDevice(FS.makedev(1, 3), {
            read: () => 0,
            write: (stream, buffer2, offset, length, pos) => length
          });
          FS.mkdev("/dev/null", FS.makedev(1, 3));
          TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
          TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
          FS.mkdev("/dev/tty", FS.makedev(5, 0));
          FS.mkdev("/dev/tty1", FS.makedev(6, 0));
          var randomBuffer = new Uint8Array(1024), randomLeft = 0;
          var randomByte = () => {
            if (randomLeft === 0) {
              randomLeft = randomFill(randomBuffer).byteLength;
            }
            return randomBuffer[--randomLeft];
          };
          FS.createDevice("/dev", "random", randomByte);
          FS.createDevice("/dev", "urandom", randomByte);
          FS.mkdir("/dev/shm");
          FS.mkdir("/dev/shm/tmp");
        },
        createSpecialDirectories() {
          FS.mkdir("/proc");
          var proc_self = FS.mkdir("/proc/self");
          FS.mkdir("/proc/self/fd");
          FS.mount({
            mount() {
              var node = FS.createNode(proc_self, "fd", 16384 | 511, 73);
              node.node_ops = {
                lookup(parent, name) {
                  var fd = +name;
                  var stream = FS.getStreamChecked(fd);
                  var ret = {
                    parent: null,
                    mount: {
                      mountpoint: "fake"
                    },
                    node_ops: {
                      readlink: () => stream.path
                    }
                  };
                  ret.parent = ret;
                  return ret;
                }
              };
              return node;
            }
          }, {}, "/proc/self/fd");
        },
        createStandardStreams() {
          if (Module["stdin"]) {
            FS.createDevice("/dev", "stdin", Module["stdin"]);
          } else {
            FS.symlink("/dev/tty", "/dev/stdin");
          }
          if (Module["stdout"]) {
            FS.createDevice("/dev", "stdout", null, Module["stdout"]);
          } else {
            FS.symlink("/dev/tty", "/dev/stdout");
          }
          if (Module["stderr"]) {
            FS.createDevice("/dev", "stderr", null, Module["stderr"]);
          } else {
            FS.symlink("/dev/tty1", "/dev/stderr");
          }
          var stdin = FS.open("/dev/stdin", 0);
          var stdout = FS.open("/dev/stdout", 1);
          var stderr = FS.open("/dev/stderr", 1);
          assert(stdin.fd === 0, `invalid handle for stdin (${stdin.fd})`);
          assert(stdout.fd === 1, `invalid handle for stdout (${stdout.fd})`);
          assert(stderr.fd === 2, `invalid handle for stderr (${stderr.fd})`);
        },
        staticInit() {
          [
            44
          ].forEach((code2) => {
            FS.genericErrors[code2] = new FS.ErrnoError(code2);
            FS.genericErrors[code2].stack = "<generic error, no stack>";
          });
          FS.nameTable = new Array(4096);
          FS.mount(MEMFS, {}, "/");
          FS.createDefaultDirectories();
          FS.createDefaultDevices();
          FS.createSpecialDirectories();
          FS.filesystems = {
            "MEMFS": MEMFS,
            "IDBFS": IDBFS
          };
        },
        init(input, output, error) {
          assert(!FS.init.initialized, "FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)");
          FS.init.initialized = true;
          Module["stdin"] = input || Module["stdin"];
          Module["stdout"] = output || Module["stdout"];
          Module["stderr"] = error || Module["stderr"];
          FS.createStandardStreams();
        },
        quit() {
          FS.init.initialized = false;
          _fflush(0);
          for (var i2 = 0; i2 < FS.streams.length; i2++) {
            var stream = FS.streams[i2];
            if (!stream) {
              continue;
            }
            FS.close(stream);
          }
        },
        findObject(path, dontResolveLastLink) {
          var ret = FS.analyzePath(path, dontResolveLastLink);
          if (!ret.exists) {
            return null;
          }
          return ret.object;
        },
        analyzePath(path, dontResolveLastLink) {
          try {
            var lookup2 = FS.lookupPath(path, {
              follow: !dontResolveLastLink
            });
            path = lookup2.path;
          } catch (e) {
          }
          var ret = {
            isRoot: false,
            exists: false,
            error: 0,
            name: null,
            path: null,
            object: null,
            parentExists: false,
            parentPath: null,
            parentObject: null
          };
          try {
            var lookup2 = FS.lookupPath(path, {
              parent: true
            });
            ret.parentExists = true;
            ret.parentPath = lookup2.path;
            ret.parentObject = lookup2.node;
            ret.name = PATH.basename(path);
            lookup2 = FS.lookupPath(path, {
              follow: !dontResolveLastLink
            });
            ret.exists = true;
            ret.path = lookup2.path;
            ret.object = lookup2.node;
            ret.name = lookup2.node.name;
            ret.isRoot = lookup2.path === "/";
          } catch (e) {
            ret.error = e.errno;
          }
          return ret;
        },
        createPath(parent, path, canRead, canWrite) {
          parent = typeof parent == "string" ? parent : FS.getPath(parent);
          var parts = path.split("/").reverse();
          while (parts.length) {
            var part = parts.pop();
            if (!part)
              continue;
            var current = PATH.join2(parent, part);
            try {
              FS.mkdir(current);
            } catch (e) {
            }
            parent = current;
          }
          return current;
        },
        createFile(parent, name, properties, canRead, canWrite) {
          var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name);
          var mode = FS_getMode(canRead, canWrite);
          return FS.create(path, mode);
        },
        createDataFile(parent, name, data, canRead, canWrite, canOwn) {
          var path = name;
          if (parent) {
            parent = typeof parent == "string" ? parent : FS.getPath(parent);
            path = name ? PATH.join2(parent, name) : parent;
          }
          var mode = FS_getMode(canRead, canWrite);
          var node = FS.create(path, mode);
          if (data) {
            if (typeof data == "string") {
              var arr = new Array(data.length);
              for (var i2 = 0, len2 = data.length; i2 < len2; ++i2)
                arr[i2] = data.charCodeAt(i2);
              data = arr;
            }
            FS.chmod(node, mode | 146);
            var stream = FS.open(node, 577);
            FS.write(stream, data, 0, data.length, 0, canOwn);
            FS.close(stream);
            FS.chmod(node, mode);
          }
        },
        createDevice(parent, name, input, output) {
          var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name);
          var mode = FS_getMode(!!input, !!output);
          if (!FS.createDevice.major)
            FS.createDevice.major = 64;
          var dev = FS.makedev(FS.createDevice.major++, 0);
          FS.registerDevice(dev, {
            open(stream) {
              stream.seekable = false;
            },
            close(stream) {
              var _a;
              if ((_a = output == null ? void 0 : output.buffer) == null ? void 0 : _a.length) {
                output(10);
              }
            },
            read(stream, buffer2, offset, length, pos) {
              var bytesRead = 0;
              for (var i2 = 0; i2 < length; i2++) {
                var result;
                try {
                  result = input();
                } catch (e) {
                  throw new FS.ErrnoError(29);
                }
                if (result === void 0 && bytesRead === 0) {
                  throw new FS.ErrnoError(6);
                }
                if (result === null || result === void 0)
                  break;
                bytesRead++;
                buffer2[offset + i2] = result;
              }
              if (bytesRead) {
                stream.node.timestamp = Date.now();
              }
              return bytesRead;
            },
            write(stream, buffer2, offset, length, pos) {
              for (var i2 = 0; i2 < length; i2++) {
                try {
                  output(buffer2[offset + i2]);
                } catch (e) {
                  throw new FS.ErrnoError(29);
                }
              }
              if (length) {
                stream.node.timestamp = Date.now();
              }
              return i2;
            }
          });
          return FS.mkdev(path, mode, dev);
        },
        forceLoadFile(obj) {
          if (obj.isDevice || obj.isFolder || obj.link || obj.contents)
            return true;
          if (typeof XMLHttpRequest != "undefined") {
            throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
          } else if (read_) {
            try {
              obj.contents = intArrayFromString(read_(obj.url), true);
              obj.usedBytes = obj.contents.length;
            } catch (e) {
              throw new FS.ErrnoError(29);
            }
          } else {
            throw new Error("Cannot load without read() or XMLHttpRequest.");
          }
        },
        createLazyFile(parent, name, url, canRead, canWrite) {
          class LazyUint8Array {
            constructor() {
              this.lengthKnown = false;
              this.chunks = [];
            }
            get(idx) {
              if (idx > this.length - 1 || idx < 0) {
                return void 0;
              }
              var chunkOffset = idx % this.chunkSize;
              var chunkNum = idx / this.chunkSize | 0;
              return this.getter(chunkNum)[chunkOffset];
            }
            setDataGetter(getter) {
              this.getter = getter;
            }
            cacheLength() {
              var xhr = new XMLHttpRequest();
              xhr.open("HEAD", url, false);
              xhr.send(null);
              if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304))
                throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
              var datalength = Number(xhr.getResponseHeader("Content-length"));
              var header;
              var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
              var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
              var chunkSize = 1024 * 1024;
              if (!hasByteServing)
                chunkSize = datalength;
              var doXHR = (from, to) => {
                if (from > to)
                  throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
                if (to > datalength - 1)
                  throw new Error("only " + datalength + " bytes available! programmer error!");
                var xhr2 = new XMLHttpRequest();
                xhr2.open("GET", url, false);
                if (datalength !== chunkSize)
                  xhr2.setRequestHeader("Range", "bytes=" + from + "-" + to);
                xhr2.responseType = "arraybuffer";
                if (xhr2.overrideMimeType) {
                  xhr2.overrideMimeType("text/plain; charset=x-user-defined");
                }
                xhr2.send(null);
                if (!(xhr2.status >= 200 && xhr2.status < 300 || xhr2.status === 304))
                  throw new Error("Couldn't load " + url + ". Status: " + xhr2.status);
                if (xhr2.response !== void 0) {
                  return new Uint8Array(xhr2.response || []);
                }
                return intArrayFromString(xhr2.responseText || "", true);
              };
              var lazyArray2 = this;
              lazyArray2.setDataGetter((chunkNum) => {
                var start = chunkNum * chunkSize;
                var end = (chunkNum + 1) * chunkSize - 1;
                end = Math.min(end, datalength - 1);
                if (typeof lazyArray2.chunks[chunkNum] == "undefined") {
                  lazyArray2.chunks[chunkNum] = doXHR(start, end);
                }
                if (typeof lazyArray2.chunks[chunkNum] == "undefined")
                  throw new Error("doXHR failed!");
                return lazyArray2.chunks[chunkNum];
              });
              if (usesGzip || !datalength) {
                chunkSize = datalength = 1;
                datalength = this.getter(0).length;
                chunkSize = datalength;
                out("LazyFiles on gzip forces download of the whole file when length is accessed");
              }
              this._length = datalength;
              this._chunkSize = chunkSize;
              this.lengthKnown = true;
            }
            get length() {
              if (!this.lengthKnown) {
                this.cacheLength();
              }
              return this._length;
            }
            get chunkSize() {
              if (!this.lengthKnown) {
                this.cacheLength();
              }
              return this._chunkSize;
            }
          }
          if (typeof XMLHttpRequest != "undefined") {
            if (!ENVIRONMENT_IS_WORKER)
              throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
            var lazyArray = new LazyUint8Array();
            var properties = {
              isDevice: false,
              contents: lazyArray
            };
          } else {
            var properties = {
              isDevice: false,
              url
            };
          }
          var node = FS.createFile(parent, name, properties, canRead, canWrite);
          if (properties.contents) {
            node.contents = properties.contents;
          } else if (properties.url) {
            node.contents = null;
            node.url = properties.url;
          }
          Object.defineProperties(node, {
            usedBytes: {
              get: function() {
                return this.contents.length;
              }
            }
          });
          var stream_ops = {};
          var keys = Object.keys(node.stream_ops);
          keys.forEach((key) => {
            var fn = node.stream_ops[key];
            stream_ops[key] = (...args) => {
              FS.forceLoadFile(node);
              return fn(...args);
            };
          });
          function writeChunks(stream, buffer2, offset, length, position) {
            var contents = stream.node.contents;
            if (position >= contents.length)
              return 0;
            var size = Math.min(contents.length - position, length);
            assert(size >= 0);
            if (contents.slice) {
              for (var i2 = 0; i2 < size; i2++) {
                buffer2[offset + i2] = contents[position + i2];
              }
            } else {
              for (var i2 = 0; i2 < size; i2++) {
                buffer2[offset + i2] = contents.get(position + i2);
              }
            }
            return size;
          }
          stream_ops.read = (stream, buffer2, offset, length, position) => {
            FS.forceLoadFile(node);
            return writeChunks(stream, buffer2, offset, length, position);
          };
          stream_ops.mmap = (stream, length, position, prot, flags) => {
            FS.forceLoadFile(node);
            var ptr = mmapAlloc();
            if (!ptr) {
              throw new FS.ErrnoError(48);
            }
            writeChunks(stream, HEAP8, ptr, length, position);
            return {
              ptr,
              allocated: true
            };
          };
          node.stream_ops = stream_ops;
          return node;
        },
        absolutePath() {
          abort("FS.absolutePath has been removed; use PATH_FS.resolve instead");
        },
        createFolder() {
          abort("FS.createFolder has been removed; use FS.mkdir instead");
        },
        createLink() {
          abort("FS.createLink has been removed; use FS.symlink instead");
        },
        joinPath() {
          abort("FS.joinPath has been removed; use PATH.join instead");
        },
        mmapAlloc() {
          abort("FS.mmapAlloc has been replaced by the top level function mmapAlloc");
        },
        standardizePath() {
          abort("FS.standardizePath has been removed; use PATH.normalize instead");
        }
      };
      var SYSCALLS = {
        DEFAULT_POLLMASK: 5,
        calculateAt(dirfd, path, allowEmpty) {
          if (PATH.isAbs(path)) {
            return path;
          }
          var dir;
          if (dirfd === -100) {
            dir = FS.cwd();
          } else {
            var dirstream = SYSCALLS.getStreamFromFD(dirfd);
            dir = dirstream.path;
          }
          if (path.length == 0) {
            if (!allowEmpty) {
              throw new FS.ErrnoError(44);
            }
            return dir;
          }
          return PATH.join2(dir, path);
        },
        doStat(func, path, buf) {
          var stat = func(path);
          HEAP32[buf >> 2] = stat.dev;
          HEAP32[buf + 4 >> 2] = stat.mode;
          HEAPU32[buf + 8 >> 2] = stat.nlink;
          HEAP32[buf + 12 >> 2] = stat.uid;
          HEAP32[buf + 16 >> 2] = stat.gid;
          HEAP32[buf + 20 >> 2] = stat.rdev;
          tempI64 = [
            stat.size >>> 0,
            (tempDouble = stat.size, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)
          ], HEAP32[buf + 24 >> 2] = tempI64[0], HEAP32[buf + 28 >> 2] = tempI64[1];
          HEAP32[buf + 32 >> 2] = 4096;
          HEAP32[buf + 36 >> 2] = stat.blocks;
          var atime = stat.atime.getTime();
          var mtime = stat.mtime.getTime();
          var ctime = stat.ctime.getTime();
          tempI64 = [
            Math.floor(atime / 1e3) >>> 0,
            (tempDouble = Math.floor(atime / 1e3), +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)
          ], HEAP32[buf + 40 >> 2] = tempI64[0], HEAP32[buf + 44 >> 2] = tempI64[1];
          HEAPU32[buf + 48 >> 2] = atime % 1e3 * 1e3;
          tempI64 = [
            Math.floor(mtime / 1e3) >>> 0,
            (tempDouble = Math.floor(mtime / 1e3), +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)
          ], HEAP32[buf + 56 >> 2] = tempI64[0], HEAP32[buf + 60 >> 2] = tempI64[1];
          HEAPU32[buf + 64 >> 2] = mtime % 1e3 * 1e3;
          tempI64 = [
            Math.floor(ctime / 1e3) >>> 0,
            (tempDouble = Math.floor(ctime / 1e3), +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)
          ], HEAP32[buf + 72 >> 2] = tempI64[0], HEAP32[buf + 76 >> 2] = tempI64[1];
          HEAPU32[buf + 80 >> 2] = ctime % 1e3 * 1e3;
          tempI64 = [
            stat.ino >>> 0,
            (tempDouble = stat.ino, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)
          ], HEAP32[buf + 88 >> 2] = tempI64[0], HEAP32[buf + 92 >> 2] = tempI64[1];
          return 0;
        },
        doMsync(addr, stream, len2, flags, offset) {
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(43);
          }
          if (flags & 2) {
            return 0;
          }
          var buffer2 = HEAPU8.slice(addr, addr + len2);
          FS.msync(stream, buffer2, offset, len2, flags);
        },
        getStreamFromFD(fd) {
          var stream = FS.getStreamChecked(fd);
          return stream;
        },
        varargs: void 0,
        getStr(ptr) {
          var ret = UTF8ToString(ptr);
          return ret;
        }
      };
      function ___syscall_fcntl64(fd, cmd, varargs) {
        SYSCALLS.varargs = varargs;
        try {
          var stream = SYSCALLS.getStreamFromFD(fd);
          switch (cmd) {
            case 0: {
              var arg = syscallGetVarargI();
              if (arg < 0) {
                return -28;
              }
              while (FS.streams[arg]) {
                arg++;
              }
              var newStream;
              newStream = FS.dupStream(stream, arg);
              return newStream.fd;
            }
            case 1:
            case 2:
              return 0;
            case 3:
              return stream.flags;
            case 4: {
              var arg = syscallGetVarargI();
              stream.flags |= arg;
              return 0;
            }
            case 12: {
              var arg = syscallGetVarargP();
              var offset = 0;
              HEAP16[arg + offset >> 1] = 2;
              return 0;
            }
            case 13:
            case 14:
              return 0;
          }
          return -28;
        } catch (e) {
          if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
            throw e;
          return -e.errno;
        }
      }
      function ___syscall_fstat64(fd, buf) {
        try {
          var stream = SYSCALLS.getStreamFromFD(fd);
          return SYSCALLS.doStat(FS.stat, stream.path, buf);
        } catch (e) {
          if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
            throw e;
          return -e.errno;
        }
      }
      function ___syscall_ioctl(fd, op, varargs) {
        SYSCALLS.varargs = varargs;
        try {
          var stream = SYSCALLS.getStreamFromFD(fd);
          switch (op) {
            case 21509: {
              if (!stream.tty)
                return -59;
              return 0;
            }
            case 21505: {
              if (!stream.tty)
                return -59;
              if (stream.tty.ops.ioctl_tcgets) {
                var termios = stream.tty.ops.ioctl_tcgets(stream);
                var argp = syscallGetVarargP();
                HEAP32[argp >> 2] = termios.c_iflag || 0;
                HEAP32[argp + 4 >> 2] = termios.c_oflag || 0;
                HEAP32[argp + 8 >> 2] = termios.c_cflag || 0;
                HEAP32[argp + 12 >> 2] = termios.c_lflag || 0;
                for (var i2 = 0; i2 < 32; i2++) {
                  HEAP8[argp + i2 + 17] = termios.c_cc[i2] || 0;
                }
                return 0;
              }
              return 0;
            }
            case 21510:
            case 21511:
            case 21512: {
              if (!stream.tty)
                return -59;
              return 0;
            }
            case 21506:
            case 21507:
            case 21508: {
              if (!stream.tty)
                return -59;
              if (stream.tty.ops.ioctl_tcsets) {
                var argp = syscallGetVarargP();
                var c_iflag = HEAP32[argp >> 2];
                var c_oflag = HEAP32[argp + 4 >> 2];
                var c_cflag = HEAP32[argp + 8 >> 2];
                var c_lflag = HEAP32[argp + 12 >> 2];
                var c_cc = [];
                for (var i2 = 0; i2 < 32; i2++) {
                  c_cc.push(HEAP8[argp + i2 + 17]);
                }
                return stream.tty.ops.ioctl_tcsets(stream.tty, op, {
                  c_iflag,
                  c_oflag,
                  c_cflag,
                  c_lflag,
                  c_cc
                });
              }
              return 0;
            }
            case 21519: {
              if (!stream.tty)
                return -59;
              var argp = syscallGetVarargP();
              HEAP32[argp >> 2] = 0;
              return 0;
            }
            case 21520: {
              if (!stream.tty)
                return -59;
              return -28;
            }
            case 21531: {
              var argp = syscallGetVarargP();
              return FS.ioctl(stream, op, argp);
            }
            case 21523: {
              if (!stream.tty)
                return -59;
              if (stream.tty.ops.ioctl_tiocgwinsz) {
                var winsize = stream.tty.ops.ioctl_tiocgwinsz(stream.tty);
                var argp = syscallGetVarargP();
                HEAP16[argp >> 1] = winsize[0];
                HEAP16[argp + 2 >> 1] = winsize[1];
              }
              return 0;
            }
            case 21524: {
              if (!stream.tty)
                return -59;
              return 0;
            }
            case 21515: {
              if (!stream.tty)
                return -59;
              return 0;
            }
            default:
              return -28;
          }
        } catch (e) {
          if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
            throw e;
          return -e.errno;
        }
      }
      function ___syscall_lstat64(path, buf) {
        try {
          path = SYSCALLS.getStr(path);
          return SYSCALLS.doStat(FS.lstat, path, buf);
        } catch (e) {
          if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
            throw e;
          return -e.errno;
        }
      }
      function ___syscall_newfstatat(dirfd, path, buf, flags) {
        try {
          path = SYSCALLS.getStr(path);
          var nofollow = flags & 256;
          var allowEmpty = flags & 4096;
          flags = flags & ~6400;
          assert(!flags, `unknown flags in __syscall_newfstatat: ${flags}`);
          path = SYSCALLS.calculateAt(dirfd, path, allowEmpty);
          return SYSCALLS.doStat(nofollow ? FS.lstat : FS.stat, path, buf);
        } catch (e) {
          if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
            throw e;
          return -e.errno;
        }
      }
      function ___syscall_openat(dirfd, path, flags, varargs) {
        SYSCALLS.varargs = varargs;
        try {
          path = SYSCALLS.getStr(path);
          path = SYSCALLS.calculateAt(dirfd, path);
          var mode = varargs ? syscallGetVarargI() : 0;
          return FS.open(path, flags, mode).fd;
        } catch (e) {
          if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
            throw e;
          return -e.errno;
        }
      }
      function ___syscall_stat64(path, buf) {
        try {
          path = SYSCALLS.getStr(path);
          return SYSCALLS.doStat(FS.stat, path, buf);
        } catch (e) {
          if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
            throw e;
          return -e.errno;
        }
      }
      var ___throw_exception_with_stack_trace = (ex) => {
        var e = new WebAssembly.Exception(getCppExceptionTag(), [
          ex
        ], {
          traceStack: true
        });
        e.message = getExceptionMessage(e);
        throw e;
      };
      var __embind_register_bigint = (primitiveType, name, size, minRange, maxRange) => {
      };
      var embind_init_charCodes = () => {
        var codes = new Array(256);
        for (var i2 = 0; i2 < 256; ++i2) {
          codes[i2] = String.fromCharCode(i2);
        }
        embind_charCodes = codes;
      };
      var embind_charCodes;
      var readLatin1String = (ptr) => {
        var ret = "";
        var c = ptr;
        while (HEAPU8[c]) {
          ret += embind_charCodes[HEAPU8[c++]];
        }
        return ret;
      };
      var awaitingDependencies = {};
      var registeredTypes = {};
      var typeDependencies = {};
      var BindingError;
      var throwBindingError = (message) => {
        throw new BindingError(message);
      };
      var InternalError;
      var throwInternalError = (message) => {
        throw new InternalError(message);
      };
      var whenDependentTypesAreResolved = (myTypes, dependentTypes, getTypeConverters) => {
        myTypes.forEach(function(type) {
          typeDependencies[type] = dependentTypes;
        });
        function onComplete(typeConverters2) {
          var myTypeConverters = getTypeConverters(typeConverters2);
          if (myTypeConverters.length !== myTypes.length) {
            throwInternalError("Mismatched type converter count");
          }
          for (var i2 = 0; i2 < myTypes.length; ++i2) {
            registerType(myTypes[i2], myTypeConverters[i2]);
          }
        }
        var typeConverters = new Array(dependentTypes.length);
        var unregisteredTypes = [];
        var registered = 0;
        dependentTypes.forEach((dt, i2) => {
          if (registeredTypes.hasOwnProperty(dt)) {
            typeConverters[i2] = registeredTypes[dt];
          } else {
            unregisteredTypes.push(dt);
            if (!awaitingDependencies.hasOwnProperty(dt)) {
              awaitingDependencies[dt] = [];
            }
            awaitingDependencies[dt].push(() => {
              typeConverters[i2] = registeredTypes[dt];
              ++registered;
              if (registered === unregisteredTypes.length) {
                onComplete(typeConverters);
              }
            });
          }
        });
        if (0 === unregisteredTypes.length) {
          onComplete(typeConverters);
        }
      };
      function sharedRegisterType(rawType, registeredInstance, options = {}) {
        var name = registeredInstance.name;
        if (!rawType) {
          throwBindingError(`type "${name}" must have a positive integer typeid pointer`);
        }
        if (registeredTypes.hasOwnProperty(rawType)) {
          if (options.ignoreDuplicateRegistrations) {
            return;
          } else {
            throwBindingError(`Cannot register type '${name}' twice`);
          }
        }
        registeredTypes[rawType] = registeredInstance;
        delete typeDependencies[rawType];
        if (awaitingDependencies.hasOwnProperty(rawType)) {
          var callbacks = awaitingDependencies[rawType];
          delete awaitingDependencies[rawType];
          callbacks.forEach((cb) => cb());
        }
      }
      function registerType(rawType, registeredInstance, options = {}) {
        if (!("argPackAdvance" in registeredInstance)) {
          throw new TypeError("registerType registeredInstance requires argPackAdvance");
        }
        return sharedRegisterType(rawType, registeredInstance, options);
      }
      var GenericWireTypeSize = 8;
      var __embind_register_bool = (rawType, name, trueValue, falseValue) => {
        name = readLatin1String(name);
        registerType(rawType, {
          name,
          "fromWireType": function(wt) {
            return !!wt;
          },
          "toWireType": function(destructors, o) {
            return o ? trueValue : falseValue;
          },
          "argPackAdvance": GenericWireTypeSize,
          "readValueFromPointer": function(pointer) {
            return this["fromWireType"](HEAPU8[pointer]);
          },
          destructorFunction: null
        });
      };
      var shallowCopyInternalPointer = (o) => {
        return {
          count: o.count,
          deleteScheduled: o.deleteScheduled,
          preservePointerOnDelete: o.preservePointerOnDelete,
          ptr: o.ptr,
          ptrType: o.ptrType,
          smartPtr: o.smartPtr,
          smartPtrType: o.smartPtrType
        };
      };
      var throwInstanceAlreadyDeleted = (obj) => {
        function getInstanceTypeName(handle) {
          return handle.$$.ptrType.registeredClass.name;
        }
        throwBindingError(getInstanceTypeName(obj) + " instance already deleted");
      };
      var finalizationRegistry = false;
      var detachFinalizer = (handle) => {
      };
      var runDestructor = ($$) => {
        if ($$.smartPtr) {
          $$.smartPtrType.rawDestructor($$.smartPtr);
        } else {
          $$.ptrType.registeredClass.rawDestructor($$.ptr);
        }
      };
      var releaseClassHandle = ($$) => {
        $$.count.value -= 1;
        var toDelete = 0 === $$.count.value;
        if (toDelete) {
          runDestructor($$);
        }
      };
      var downcastPointer = (ptr, ptrClass, desiredClass) => {
        if (ptrClass === desiredClass) {
          return ptr;
        }
        if (void 0 === desiredClass.baseClass) {
          return null;
        }
        var rv = downcastPointer(ptr, ptrClass, desiredClass.baseClass);
        if (rv === null) {
          return null;
        }
        return desiredClass.downcast(rv);
      };
      var registeredPointers = {};
      var getInheritedInstanceCount = () => Object.keys(registeredInstances).length;
      var getLiveInheritedInstances = () => {
        var rv = [];
        for (var k in registeredInstances) {
          if (registeredInstances.hasOwnProperty(k)) {
            rv.push(registeredInstances[k]);
          }
        }
        return rv;
      };
      var deletionQueue = [];
      var flushPendingDeletes = () => {
        while (deletionQueue.length) {
          var obj = deletionQueue.pop();
          obj.$$.deleteScheduled = false;
          obj["delete"]();
        }
      };
      var delayFunction;
      var setDelayFunction = (fn) => {
        delayFunction = fn;
        if (deletionQueue.length && delayFunction) {
          delayFunction(flushPendingDeletes);
        }
      };
      var init_embind = () => {
        Module["getInheritedInstanceCount"] = getInheritedInstanceCount;
        Module["getLiveInheritedInstances"] = getLiveInheritedInstances;
        Module["flushPendingDeletes"] = flushPendingDeletes;
        Module["setDelayFunction"] = setDelayFunction;
      };
      var registeredInstances = {};
      var getBasestPointer = (class_, ptr) => {
        if (ptr === void 0) {
          throwBindingError("ptr should not be undefined");
        }
        while (class_.baseClass) {
          ptr = class_.upcast(ptr);
          class_ = class_.baseClass;
        }
        return ptr;
      };
      var getInheritedInstance = (class_, ptr) => {
        ptr = getBasestPointer(class_, ptr);
        return registeredInstances[ptr];
      };
      var makeClassHandle = (prototype, record) => {
        if (!record.ptrType || !record.ptr) {
          throwInternalError("makeClassHandle requires ptr and ptrType");
        }
        var hasSmartPtrType = !!record.smartPtrType;
        var hasSmartPtr = !!record.smartPtr;
        if (hasSmartPtrType !== hasSmartPtr) {
          throwInternalError("Both smartPtrType and smartPtr must be specified");
        }
        record.count = {
          value: 1
        };
        return attachFinalizer(Object.create(prototype, {
          $$: {
            value: record,
            writable: true
          }
        }));
      };
      function RegisteredPointer_fromWireType(ptr) {
        var rawPointer = this.getPointee(ptr);
        if (!rawPointer) {
          this.destructor(ptr);
          return null;
        }
        var registeredInstance = getInheritedInstance(this.registeredClass, rawPointer);
        if (void 0 !== registeredInstance) {
          if (0 === registeredInstance.$$.count.value) {
            registeredInstance.$$.ptr = rawPointer;
            registeredInstance.$$.smartPtr = ptr;
            return registeredInstance["clone"]();
          } else {
            var rv = registeredInstance["clone"]();
            this.destructor(ptr);
            return rv;
          }
        }
        function makeDefaultHandle() {
          if (this.isSmartPointer) {
            return makeClassHandle(this.registeredClass.instancePrototype, {
              ptrType: this.pointeeType,
              ptr: rawPointer,
              smartPtrType: this,
              smartPtr: ptr
            });
          } else {
            return makeClassHandle(this.registeredClass.instancePrototype, {
              ptrType: this,
              ptr
            });
          }
        }
        var actualType = this.registeredClass.getActualType(rawPointer);
        var registeredPointerRecord = registeredPointers[actualType];
        if (!registeredPointerRecord) {
          return makeDefaultHandle.call(this);
        }
        var toType;
        if (this.isConst) {
          toType = registeredPointerRecord.constPointerType;
        } else {
          toType = registeredPointerRecord.pointerType;
        }
        var dp = downcastPointer(rawPointer, this.registeredClass, toType.registeredClass);
        if (dp === null) {
          return makeDefaultHandle.call(this);
        }
        if (this.isSmartPointer) {
          return makeClassHandle(toType.registeredClass.instancePrototype, {
            ptrType: toType,
            ptr: dp,
            smartPtrType: this,
            smartPtr: ptr
          });
        } else {
          return makeClassHandle(toType.registeredClass.instancePrototype, {
            ptrType: toType,
            ptr: dp
          });
        }
      }
      var attachFinalizer = (handle) => {
        if ("undefined" === typeof FinalizationRegistry) {
          attachFinalizer = (handle2) => handle2;
          return handle;
        }
        finalizationRegistry = new FinalizationRegistry((info) => {
          console.warn(info.leakWarning.stack.replace(/^Error: /, ""));
          releaseClassHandle(info.$$);
        });
        attachFinalizer = (handle2) => {
          var $$ = handle2.$$;
          var hasSmartPtr = !!$$.smartPtr;
          if (hasSmartPtr) {
            var info = {
              $$
            };
            var cls = $$.ptrType.registeredClass;
            info.leakWarning = new Error(`Embind found a leaked C++ instance ${cls.name} <${ptrToString($$.ptr)}>.
We'll free it automatically in this case, but this functionality is not reliable across various environments.
Make sure to invoke .delete() manually once you're done with the instance instead.
Originally allocated`);
            if ("captureStackTrace" in Error) {
              Error.captureStackTrace(info.leakWarning, RegisteredPointer_fromWireType);
            }
            finalizationRegistry.register(handle2, info, handle2);
          }
          return handle2;
        };
        detachFinalizer = (handle2) => finalizationRegistry.unregister(handle2);
        return attachFinalizer(handle);
      };
      var init_ClassHandle = () => {
        Object.assign(ClassHandle.prototype, {
          "isAliasOf"(other) {
            if (!(this instanceof ClassHandle)) {
              return false;
            }
            if (!(other instanceof ClassHandle)) {
              return false;
            }
            var leftClass = this.$$.ptrType.registeredClass;
            var left = this.$$.ptr;
            other.$$ = other.$$;
            var rightClass = other.$$.ptrType.registeredClass;
            var right = other.$$.ptr;
            while (leftClass.baseClass) {
              left = leftClass.upcast(left);
              leftClass = leftClass.baseClass;
            }
            while (rightClass.baseClass) {
              right = rightClass.upcast(right);
              rightClass = rightClass.baseClass;
            }
            return leftClass === rightClass && left === right;
          },
          "clone"() {
            if (!this.$$.ptr) {
              throwInstanceAlreadyDeleted(this);
            }
            if (this.$$.preservePointerOnDelete) {
              this.$$.count.value += 1;
              return this;
            } else {
              var clone = attachFinalizer(Object.create(Object.getPrototypeOf(this), {
                $$: {
                  value: shallowCopyInternalPointer(this.$$)
                }
              }));
              clone.$$.count.value += 1;
              clone.$$.deleteScheduled = false;
              return clone;
            }
          },
          "delete"() {
            if (!this.$$.ptr) {
              throwInstanceAlreadyDeleted(this);
            }
            if (this.$$.deleteScheduled && !this.$$.preservePointerOnDelete) {
              throwBindingError("Object already scheduled for deletion");
            }
            detachFinalizer(this);
            releaseClassHandle(this.$$);
            if (!this.$$.preservePointerOnDelete) {
              this.$$.smartPtr = void 0;
              this.$$.ptr = void 0;
            }
          },
          "isDeleted"() {
            return !this.$$.ptr;
          },
          "deleteLater"() {
            if (!this.$$.ptr) {
              throwInstanceAlreadyDeleted(this);
            }
            if (this.$$.deleteScheduled && !this.$$.preservePointerOnDelete) {
              throwBindingError("Object already scheduled for deletion");
            }
            deletionQueue.push(this);
            if (deletionQueue.length === 1 && delayFunction) {
              delayFunction(flushPendingDeletes);
            }
            this.$$.deleteScheduled = true;
            return this;
          }
        });
      };
      function ClassHandle() {
      }
      var createNamedFunction = (name, body) => Object.defineProperty(body, "name", {
        value: name
      });
      var ensureOverloadTable = (proto, methodName, humanName) => {
        if (void 0 === proto[methodName].overloadTable) {
          var prevFunc = proto[methodName];
          proto[methodName] = function(...args) {
            if (!proto[methodName].overloadTable.hasOwnProperty(args.length)) {
              throwBindingError(`Function '${humanName}' called with an invalid number of arguments (${args.length}) - expects one of (${proto[methodName].overloadTable})!`);
            }
            return proto[methodName].overloadTable[args.length].apply(this, args);
          };
          proto[methodName].overloadTable = [];
          proto[methodName].overloadTable[prevFunc.argCount] = prevFunc;
        }
      };
      var exposePublicSymbol = (name, value, numArguments) => {
        if (Module.hasOwnProperty(name)) {
          if (void 0 === numArguments || void 0 !== Module[name].overloadTable && void 0 !== Module[name].overloadTable[numArguments]) {
            throwBindingError(`Cannot register public name '${name}' twice`);
          }
          ensureOverloadTable(Module, name, name);
          if (Module.hasOwnProperty(numArguments)) {
            throwBindingError(`Cannot register multiple overloads of a function with the same number of arguments (${numArguments})!`);
          }
          Module[name].overloadTable[numArguments] = value;
        } else {
          Module[name] = value;
          if (void 0 !== numArguments) {
            Module[name].numArguments = numArguments;
          }
        }
      };
      var char_0 = 48;
      var char_9 = 57;
      var makeLegalFunctionName = (name) => {
        if (void 0 === name) {
          return "_unknown";
        }
        name = name.replace(/[^a-zA-Z0-9_]/g, "$");
        var f = name.charCodeAt(0);
        if (f >= char_0 && f <= char_9) {
          return `_${name}`;
        }
        return name;
      };
      function RegisteredClass(name, constructor, instancePrototype, rawDestructor, baseClass, getActualType, upcast, downcast) {
        this.name = name;
        this.constructor = constructor;
        this.instancePrototype = instancePrototype;
        this.rawDestructor = rawDestructor;
        this.baseClass = baseClass;
        this.getActualType = getActualType;
        this.upcast = upcast;
        this.downcast = downcast;
        this.pureVirtualFunctions = [];
      }
      var upcastPointer = (ptr, ptrClass, desiredClass) => {
        while (ptrClass !== desiredClass) {
          if (!ptrClass.upcast) {
            throwBindingError(`Expected null or instance of ${desiredClass.name}, got an instance of ${ptrClass.name}`);
          }
          ptr = ptrClass.upcast(ptr);
          ptrClass = ptrClass.baseClass;
        }
        return ptr;
      };
      function constNoSmartPtrRawPointerToWireType(destructors, handle) {
        if (handle === null) {
          if (this.isReference) {
            throwBindingError(`null is not a valid ${this.name}`);
          }
          return 0;
        }
        if (!handle.$$) {
          throwBindingError(`Cannot pass "${embindRepr(handle)}" as a ${this.name}`);
        }
        if (!handle.$$.ptr) {
          throwBindingError(`Cannot pass deleted object as a pointer of type ${this.name}`);
        }
        var handleClass = handle.$$.ptrType.registeredClass;
        var ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass);
        return ptr;
      }
      function genericPointerToWireType(destructors, handle) {
        var ptr;
        if (handle === null) {
          if (this.isReference) {
            throwBindingError(`null is not a valid ${this.name}`);
          }
          if (this.isSmartPointer) {
            ptr = this.rawConstructor();
            if (destructors !== null) {
              destructors.push(this.rawDestructor, ptr);
            }
            return ptr;
          } else {
            return 0;
          }
        }
        if (!handle || !handle.$$) {
          throwBindingError(`Cannot pass "${embindRepr(handle)}" as a ${this.name}`);
        }
        if (!handle.$$.ptr) {
          throwBindingError(`Cannot pass deleted object as a pointer of type ${this.name}`);
        }
        if (!this.isConst && handle.$$.ptrType.isConst) {
          throwBindingError(`Cannot convert argument of type ${handle.$$.smartPtrType ? handle.$$.smartPtrType.name : handle.$$.ptrType.name} to parameter type ${this.name}`);
        }
        var handleClass = handle.$$.ptrType.registeredClass;
        ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass);
        if (this.isSmartPointer) {
          if (void 0 === handle.$$.smartPtr) {
            throwBindingError("Passing raw pointer to smart pointer is illegal");
          }
          switch (this.sharingPolicy) {
            case 0:
              if (handle.$$.smartPtrType === this) {
                ptr = handle.$$.smartPtr;
              } else {
                throwBindingError(`Cannot convert argument of type ${handle.$$.smartPtrType ? handle.$$.smartPtrType.name : handle.$$.ptrType.name} to parameter type ${this.name}`);
              }
              break;
            case 1:
              ptr = handle.$$.smartPtr;
              break;
            case 2:
              if (handle.$$.smartPtrType === this) {
                ptr = handle.$$.smartPtr;
              } else {
                var clonedHandle = handle["clone"]();
                ptr = this.rawShare(ptr, Emval.toHandle(() => clonedHandle["delete"]()));
                if (destructors !== null) {
                  destructors.push(this.rawDestructor, ptr);
                }
              }
              break;
            default:
              throwBindingError("Unsupporting sharing policy");
          }
        }
        return ptr;
      }
      function nonConstNoSmartPtrRawPointerToWireType(destructors, handle) {
        if (handle === null) {
          if (this.isReference) {
            throwBindingError(`null is not a valid ${this.name}`);
          }
          return 0;
        }
        if (!handle.$$) {
          throwBindingError(`Cannot pass "${embindRepr(handle)}" as a ${this.name}`);
        }
        if (!handle.$$.ptr) {
          throwBindingError(`Cannot pass deleted object as a pointer of type ${this.name}`);
        }
        if (handle.$$.ptrType.isConst) {
          throwBindingError(`Cannot convert argument of type ${handle.$$.ptrType.name} to parameter type ${this.name}`);
        }
        var handleClass = handle.$$.ptrType.registeredClass;
        var ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass);
        return ptr;
      }
      function readPointer(pointer) {
        return this["fromWireType"](HEAPU32[pointer >> 2]);
      }
      var init_RegisteredPointer = () => {
        Object.assign(RegisteredPointer.prototype, {
          getPointee(ptr) {
            if (this.rawGetPointee) {
              ptr = this.rawGetPointee(ptr);
            }
            return ptr;
          },
          destructor(ptr) {
            var _a;
            (_a = this.rawDestructor) == null ? void 0 : _a.call(this, ptr);
          },
          "argPackAdvance": GenericWireTypeSize,
          "readValueFromPointer": readPointer,
          "fromWireType": RegisteredPointer_fromWireType
        });
      };
      function RegisteredPointer(name, registeredClass, isReference, isConst, isSmartPointer, pointeeType, sharingPolicy, rawGetPointee, rawConstructor, rawShare, rawDestructor) {
        this.name = name;
        this.registeredClass = registeredClass;
        this.isReference = isReference;
        this.isConst = isConst;
        this.isSmartPointer = isSmartPointer;
        this.pointeeType = pointeeType;
        this.sharingPolicy = sharingPolicy;
        this.rawGetPointee = rawGetPointee;
        this.rawConstructor = rawConstructor;
        this.rawShare = rawShare;
        this.rawDestructor = rawDestructor;
        if (!isSmartPointer && registeredClass.baseClass === void 0) {
          if (isConst) {
            this["toWireType"] = constNoSmartPtrRawPointerToWireType;
            this.destructorFunction = null;
          } else {
            this["toWireType"] = nonConstNoSmartPtrRawPointerToWireType;
            this.destructorFunction = null;
          }
        } else {
          this["toWireType"] = genericPointerToWireType;
        }
      }
      var replacePublicSymbol = (name, value, numArguments) => {
        if (!Module.hasOwnProperty(name)) {
          throwInternalError("Replacing nonexistent public symbol");
        }
        if (void 0 !== Module[name].overloadTable && void 0 !== numArguments) {
          Module[name].overloadTable[numArguments] = value;
        } else {
          Module[name] = value;
          Module[name].argCount = numArguments;
        }
      };
      var dynCallLegacy = (sig, ptr, args) => {
        sig = sig.replace(/p/g, "i");
        assert("dynCall_" + sig in Module, `bad function pointer type - dynCall function not found for sig '${sig}'`);
        if (args == null ? void 0 : args.length) {
          assert(args.length === sig.substring(1).replace(/j/g, "--").length);
        } else {
          assert(sig.length == 1);
        }
        var f = Module["dynCall_" + sig];
        return f(ptr, ...args);
      };
      var wasmTableMirror = [];
      var wasmTable;
      var getWasmTableEntry = (funcPtr) => {
        var func = wasmTableMirror[funcPtr];
        if (!func) {
          if (funcPtr >= wasmTableMirror.length)
            wasmTableMirror.length = funcPtr + 1;
          wasmTableMirror[funcPtr] = func = wasmTable.get(funcPtr);
        }
        assert(wasmTable.get(funcPtr) == func, "JavaScript-side Wasm function table mirror is out of date!");
        return func;
      };
      var dynCall = (sig, ptr, args = []) => {
        if (sig.includes("j")) {
          return dynCallLegacy(sig, ptr, args);
        }
        assert(getWasmTableEntry(ptr), `missing table entry in dynCall: ${ptr}`);
        var rtn = getWasmTableEntry(ptr)(...args);
        return rtn;
      };
      var getDynCaller = (sig, ptr) => {
        assert(sig.includes("j") || sig.includes("p"), "getDynCaller should only be called with i64 sigs");
        return (...args) => dynCall(sig, ptr, args);
      };
      var embind__requireFunction = (signature, rawFunction) => {
        signature = readLatin1String(signature);
        function makeDynCaller() {
          if (signature.includes("j")) {
            return getDynCaller(signature, rawFunction);
          }
          return getWasmTableEntry(rawFunction);
        }
        var fp = makeDynCaller();
        if (typeof fp != "function") {
          throwBindingError(`unknown function pointer with signature ${signature}: ${rawFunction}`);
        }
        return fp;
      };
      var extendError = (baseErrorType, errorName) => {
        var errorClass = createNamedFunction(errorName, function(message) {
          this.name = errorName;
          this.message = message;
          var stack = new Error(message).stack;
          if (stack !== void 0) {
            this.stack = this.toString() + "\n" + stack.replace(/^Error(:[^\n]*)?\n/, "");
          }
        });
        errorClass.prototype = Object.create(baseErrorType.prototype);
        errorClass.prototype.constructor = errorClass;
        errorClass.prototype.toString = function() {
          if (this.message === void 0) {
            return this.name;
          } else {
            return `${this.name}: ${this.message}`;
          }
        };
        return errorClass;
      };
      var UnboundTypeError;
      var getTypeName = (type) => {
        var ptr = ___getTypeName(type);
        var rv = readLatin1String(ptr);
        _free(ptr);
        return rv;
      };
      var throwUnboundTypeError = (message, types) => {
        var unboundTypes = [];
        var seen = {};
        function visit(type) {
          if (seen[type]) {
            return;
          }
          if (registeredTypes[type]) {
            return;
          }
          if (typeDependencies[type]) {
            typeDependencies[type].forEach(visit);
            return;
          }
          unboundTypes.push(type);
          seen[type] = true;
        }
        types.forEach(visit);
        throw new UnboundTypeError(`${message}: ` + unboundTypes.map(getTypeName).join([
          ", "
        ]));
      };
      var __embind_register_class = (rawType, rawPointerType, rawConstPointerType, baseClassRawType, getActualTypeSignature, getActualType, upcastSignature, upcast, downcastSignature, downcast, name, destructorSignature, rawDestructor) => {
        name = readLatin1String(name);
        getActualType = embind__requireFunction(getActualTypeSignature, getActualType);
        upcast && (upcast = embind__requireFunction(upcastSignature, upcast));
        downcast && (downcast = embind__requireFunction(downcastSignature, downcast));
        rawDestructor = embind__requireFunction(destructorSignature, rawDestructor);
        var legalFunctionName = makeLegalFunctionName(name);
        exposePublicSymbol(legalFunctionName, function() {
          throwUnboundTypeError(`Cannot construct ${name} due to unbound types`, [
            baseClassRawType
          ]);
        });
        whenDependentTypesAreResolved([
          rawType,
          rawPointerType,
          rawConstPointerType
        ], baseClassRawType ? [
          baseClassRawType
        ] : [], (base) => {
          var _a;
          base = base[0];
          var baseClass;
          var basePrototype;
          if (baseClassRawType) {
            baseClass = base.registeredClass;
            basePrototype = baseClass.instancePrototype;
          } else {
            basePrototype = ClassHandle.prototype;
          }
          var constructor = createNamedFunction(name, function(...args) {
            if (Object.getPrototypeOf(this) !== instancePrototype) {
              throw new BindingError("Use 'new' to construct " + name);
            }
            if (void 0 === registeredClass.constructor_body) {
              throw new BindingError(name + " has no accessible constructor");
            }
            var body = registeredClass.constructor_body[args.length];
            if (void 0 === body) {
              throw new BindingError(`Tried to invoke ctor of ${name} with invalid number of parameters (${args.length}) - expected (${Object.keys(registeredClass.constructor_body).toString()}) parameters instead!`);
            }
            return body.apply(this, args);
          });
          var instancePrototype = Object.create(basePrototype, {
            constructor: {
              value: constructor
            }
          });
          constructor.prototype = instancePrototype;
          var registeredClass = new RegisteredClass(name, constructor, instancePrototype, rawDestructor, baseClass, getActualType, upcast, downcast);
          if (registeredClass.baseClass) {
            (_a = registeredClass.baseClass).__derivedClasses ?? (_a.__derivedClasses = []);
            registeredClass.baseClass.__derivedClasses.push(registeredClass);
          }
          var referenceConverter = new RegisteredPointer(name, registeredClass, true, false, false);
          var pointerConverter = new RegisteredPointer(name + "*", registeredClass, false, false, false);
          var constPointerConverter = new RegisteredPointer(name + " const*", registeredClass, false, true, false);
          registeredPointers[rawType] = {
            pointerType: pointerConverter,
            constPointerType: constPointerConverter
          };
          replacePublicSymbol(legalFunctionName, constructor);
          return [
            referenceConverter,
            pointerConverter,
            constPointerConverter
          ];
        });
      };
      var runDestructors = (destructors) => {
        while (destructors.length) {
          var ptr = destructors.pop();
          var del = destructors.pop();
          del(ptr);
        }
      };
      function usesDestructorStack(argTypes) {
        for (var i2 = 1; i2 < argTypes.length; ++i2) {
          if (argTypes[i2] !== null && argTypes[i2].destructorFunction === void 0) {
            return true;
          }
        }
        return false;
      }
      function newFunc(constructor, argumentList) {
        if (!(constructor instanceof Function)) {
          throw new TypeError(`new_ called with constructor type ${typeof constructor} which is not a function`);
        }
        var dummy = createNamedFunction(constructor.name || "unknownFunctionName", function() {
        });
        dummy.prototype = constructor.prototype;
        var obj = new dummy();
        var r = constructor.apply(obj, argumentList);
        return r instanceof Object ? r : obj;
      }
      function createJsInvoker(argTypes, isClassMethodFunc, returns, isAsync) {
        var needsDestructorStack = usesDestructorStack(argTypes);
        var argCount = argTypes.length;
        var argsList = "";
        var argsListWired = "";
        for (var i2 = 0; i2 < argCount - 2; ++i2) {
          argsList += (i2 !== 0 ? ", " : "") + "arg" + i2;
          argsListWired += (i2 !== 0 ? ", " : "") + "arg" + i2 + "Wired";
        }
        var invokerFnBody = `
        return function (${argsList}) {
        if (arguments.length !== ${argCount - 2}) {
          throwBindingError('function ' + humanName + ' called with ' + arguments.length + ' arguments, expected ${argCount - 2}');
        }`;
        if (needsDestructorStack) {
          invokerFnBody += "var destructors = [];\n";
        }
        var dtorStack = needsDestructorStack ? "destructors" : "null";
        var args1 = [
          "humanName",
          "throwBindingError",
          "invoker",
          "fn",
          "runDestructors",
          "retType",
          "classParam"
        ];
        if (isClassMethodFunc) {
          invokerFnBody += "var thisWired = classParam['toWireType'](" + dtorStack + ", this);\n";
        }
        for (var i2 = 0; i2 < argCount - 2; ++i2) {
          invokerFnBody += "var arg" + i2 + "Wired = argType" + i2 + "['toWireType'](" + dtorStack + ", arg" + i2 + ");\n";
          args1.push("argType" + i2);
        }
        if (isClassMethodFunc) {
          argsListWired = "thisWired" + (argsListWired.length > 0 ? ", " : "") + argsListWired;
        }
        invokerFnBody += (returns || isAsync ? "var rv = " : "") + "invoker(fn" + (argsListWired.length > 0 ? ", " : "") + argsListWired + ");\n";
        if (needsDestructorStack) {
          invokerFnBody += "runDestructors(destructors);\n";
        } else {
          for (var i2 = isClassMethodFunc ? 1 : 2; i2 < argTypes.length; ++i2) {
            var paramName = i2 === 1 ? "thisWired" : "arg" + (i2 - 2) + "Wired";
            if (argTypes[i2].destructorFunction !== null) {
              invokerFnBody += `${paramName}_dtor(${paramName});
`;
              args1.push(`${paramName}_dtor`);
            }
          }
        }
        if (returns) {
          invokerFnBody += "var ret = retType['fromWireType'](rv);\nreturn ret;\n";
        }
        invokerFnBody += "}\n";
        invokerFnBody = `if (arguments.length !== ${args1.length}){ throw new Error(humanName + "Expected ${args1.length} closure arguments " + arguments.length + " given."); }
${invokerFnBody}`;
        return [
          args1,
          invokerFnBody
        ];
      }
      function craftInvokerFunction(humanName, argTypes, classType, cppInvokerFunc, cppTargetFunc, isAsync) {
        var argCount = argTypes.length;
        if (argCount < 2) {
          throwBindingError("argTypes array size mismatch! Must at least get return value and 'this' types!");
        }
        assert(!isAsync, "Async bindings are only supported with JSPI.");
        var isClassMethodFunc = argTypes[1] !== null && classType !== null;
        var needsDestructorStack = usesDestructorStack(argTypes);
        var returns = argTypes[0].name !== "void";
        var closureArgs = [
          humanName,
          throwBindingError,
          cppInvokerFunc,
          cppTargetFunc,
          runDestructors,
          argTypes[0],
          argTypes[1]
        ];
        for (var i2 = 0; i2 < argCount - 2; ++i2) {
          closureArgs.push(argTypes[i2 + 2]);
        }
        if (!needsDestructorStack) {
          for (var i2 = isClassMethodFunc ? 1 : 2; i2 < argTypes.length; ++i2) {
            if (argTypes[i2].destructorFunction !== null) {
              closureArgs.push(argTypes[i2].destructorFunction);
            }
          }
        }
        let [args, invokerFnBody] = createJsInvoker(argTypes, isClassMethodFunc, returns, isAsync);
        args.push(invokerFnBody);
        var invokerFn = newFunc(Function, args)(...closureArgs);
        return createNamedFunction(humanName, invokerFn);
      }
      var heap32VectorToArray = (count, firstElement) => {
        var array = [];
        for (var i2 = 0; i2 < count; i2++) {
          array.push(HEAPU32[firstElement + i2 * 4 >> 2]);
        }
        return array;
      };
      var getFunctionName = (signature) => {
        signature = signature.trim();
        const argsIndex = signature.indexOf("(");
        if (argsIndex !== -1) {
          assert(signature[signature.length - 1] == ")", "Parentheses for argument names should match.");
          return signature.substr(0, argsIndex);
        } else {
          return signature;
        }
      };
      var __embind_register_class_class_function = (rawClassType, methodName, argCount, rawArgTypesAddr, invokerSignature, rawInvoker, fn, isAsync) => {
        var rawArgTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
        methodName = readLatin1String(methodName);
        methodName = getFunctionName(methodName);
        rawInvoker = embind__requireFunction(invokerSignature, rawInvoker);
        whenDependentTypesAreResolved([], [
          rawClassType
        ], (classType) => {
          classType = classType[0];
          var humanName = `${classType.name}.${methodName}`;
          function unboundTypesHandler() {
            throwUnboundTypeError(`Cannot call ${humanName} due to unbound types`, rawArgTypes);
          }
          if (methodName.startsWith("@@")) {
            methodName = Symbol[methodName.substring(2)];
          }
          var proto = classType.registeredClass.constructor;
          if (void 0 === proto[methodName]) {
            unboundTypesHandler.argCount = argCount - 1;
            proto[methodName] = unboundTypesHandler;
          } else {
            ensureOverloadTable(proto, methodName, humanName);
            proto[methodName].overloadTable[argCount - 1] = unboundTypesHandler;
          }
          whenDependentTypesAreResolved([], rawArgTypes, (argTypes) => {
            var invokerArgsArray = [
              argTypes[0],
              null
            ].concat(argTypes.slice(1));
            var func = craftInvokerFunction(humanName, invokerArgsArray, null, rawInvoker, fn, isAsync);
            if (void 0 === proto[methodName].overloadTable) {
              func.argCount = argCount - 1;
              proto[methodName] = func;
            } else {
              proto[methodName].overloadTable[argCount - 1] = func;
            }
            if (classType.registeredClass.__derivedClasses) {
              for (const derivedClass of classType.registeredClass.__derivedClasses) {
                if (!derivedClass.constructor.hasOwnProperty(methodName)) {
                  derivedClass.constructor[methodName] = func;
                }
              }
            }
            return [];
          });
          return [];
        });
      };
      var __embind_register_class_constructor = (rawClassType, argCount, rawArgTypesAddr, invokerSignature, invoker, rawConstructor) => {
        assert(argCount > 0);
        var rawArgTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
        invoker = embind__requireFunction(invokerSignature, invoker);
        whenDependentTypesAreResolved([], [
          rawClassType
        ], (classType) => {
          classType = classType[0];
          var humanName = `constructor ${classType.name}`;
          if (void 0 === classType.registeredClass.constructor_body) {
            classType.registeredClass.constructor_body = [];
          }
          if (void 0 !== classType.registeredClass.constructor_body[argCount - 1]) {
            throw new BindingError(`Cannot register multiple constructors with identical number of parameters (${argCount - 1}) for class '${classType.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`);
          }
          classType.registeredClass.constructor_body[argCount - 1] = () => {
            throwUnboundTypeError(`Cannot construct ${classType.name} due to unbound types`, rawArgTypes);
          };
          whenDependentTypesAreResolved([], rawArgTypes, (argTypes) => {
            argTypes.splice(1, 0, null);
            classType.registeredClass.constructor_body[argCount - 1] = craftInvokerFunction(humanName, argTypes, null, invoker, rawConstructor);
            return [];
          });
          return [];
        });
      };
      var __embind_register_class_function = (rawClassType, methodName, argCount, rawArgTypesAddr, invokerSignature, rawInvoker, context, isPureVirtual, isAsync) => {
        var rawArgTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
        methodName = readLatin1String(methodName);
        methodName = getFunctionName(methodName);
        rawInvoker = embind__requireFunction(invokerSignature, rawInvoker);
        whenDependentTypesAreResolved([], [
          rawClassType
        ], (classType) => {
          classType = classType[0];
          var humanName = `${classType.name}.${methodName}`;
          if (methodName.startsWith("@@")) {
            methodName = Symbol[methodName.substring(2)];
          }
          if (isPureVirtual) {
            classType.registeredClass.pureVirtualFunctions.push(methodName);
          }
          function unboundTypesHandler() {
            throwUnboundTypeError(`Cannot call ${humanName} due to unbound types`, rawArgTypes);
          }
          var proto = classType.registeredClass.instancePrototype;
          var method = proto[methodName];
          if (void 0 === method || void 0 === method.overloadTable && method.className !== classType.name && method.argCount === argCount - 2) {
            unboundTypesHandler.argCount = argCount - 2;
            unboundTypesHandler.className = classType.name;
            proto[methodName] = unboundTypesHandler;
          } else {
            ensureOverloadTable(proto, methodName, humanName);
            proto[methodName].overloadTable[argCount - 2] = unboundTypesHandler;
          }
          whenDependentTypesAreResolved([], rawArgTypes, (argTypes) => {
            var memberFunction = craftInvokerFunction(humanName, argTypes, classType, rawInvoker, context, isAsync);
            if (void 0 === proto[methodName].overloadTable) {
              memberFunction.argCount = argCount - 2;
              proto[methodName] = memberFunction;
            } else {
              proto[methodName].overloadTable[argCount - 2] = memberFunction;
            }
            return [];
          });
          return [];
        });
      };
      var emval_freelist = [];
      var emval_handles = [];
      var __emval_decref = (handle) => {
        if (handle > 9 && 0 === --emval_handles[handle + 1]) {
          assert(emval_handles[handle] !== void 0, `Decref for unallocated handle.`);
          emval_handles[handle] = void 0;
          emval_freelist.push(handle);
        }
      };
      var count_emval_handles = () => {
        return emval_handles.length / 2 - 5 - emval_freelist.length;
      };
      var init_emval = () => {
        emval_handles.push(0, 1, void 0, 1, null, 1, true, 1, false, 1);
        assert(emval_handles.length === 5 * 2);
        Module["count_emval_handles"] = count_emval_handles;
      };
      var Emval = {
        toValue: (handle) => {
          if (!handle) {
            throwBindingError("Cannot use deleted val. handle = " + handle);
          }
          assert(handle === 2 || emval_handles[handle] !== void 0 && handle % 2 === 0, `invalid handle: ${handle}`);
          return emval_handles[handle];
        },
        toHandle: (value) => {
          switch (value) {
            case void 0:
              return 2;
            case null:
              return 4;
            case true:
              return 6;
            case false:
              return 8;
            default: {
              const handle = emval_freelist.pop() || emval_handles.length;
              emval_handles[handle] = value;
              emval_handles[handle + 1] = 1;
              return handle;
            }
          }
        }
      };
      var EmValType = {
        name: "emscripten::val",
        "fromWireType": (handle) => {
          var rv = Emval.toValue(handle);
          __emval_decref(handle);
          return rv;
        },
        "toWireType": (destructors, value) => Emval.toHandle(value),
        "argPackAdvance": GenericWireTypeSize,
        "readValueFromPointer": readPointer,
        destructorFunction: null
      };
      var __embind_register_emval = (rawType) => registerType(rawType, EmValType);
      var embindRepr = (v) => {
        if (v === null) {
          return "null";
        }
        var t = typeof v;
        if (t === "object" || t === "array" || t === "function") {
          return v.toString();
        } else {
          return "" + v;
        }
      };
      var floatReadValueFromPointer = (name, width) => {
        switch (width) {
          case 4:
            return function(pointer) {
              return this["fromWireType"](HEAPF32[pointer >> 2]);
            };
          case 8:
            return function(pointer) {
              return this["fromWireType"](HEAPF64[pointer >> 3]);
            };
          default:
            throw new TypeError(`invalid float width (${width}): ${name}`);
        }
      };
      var __embind_register_float = (rawType, name, size) => {
        name = readLatin1String(name);
        registerType(rawType, {
          name,
          "fromWireType": (value) => value,
          "toWireType": (destructors, value) => {
            if (typeof value != "number" && typeof value != "boolean") {
              throw new TypeError(`Cannot convert ${embindRepr(value)} to ${this.name}`);
            }
            return value;
          },
          "argPackAdvance": GenericWireTypeSize,
          "readValueFromPointer": floatReadValueFromPointer(name, size),
          destructorFunction: null
        });
      };
      var __embind_register_function = (name, argCount, rawArgTypesAddr, signature, rawInvoker, fn, isAsync) => {
        var argTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
        name = readLatin1String(name);
        name = getFunctionName(name);
        rawInvoker = embind__requireFunction(signature, rawInvoker);
        exposePublicSymbol(name, function() {
          throwUnboundTypeError(`Cannot call ${name} due to unbound types`, argTypes);
        }, argCount - 1);
        whenDependentTypesAreResolved([], argTypes, (argTypes2) => {
          var invokerArgsArray = [
            argTypes2[0],
            null
          ].concat(argTypes2.slice(1));
          replacePublicSymbol(name, craftInvokerFunction(name, invokerArgsArray, null, rawInvoker, fn, isAsync), argCount - 1);
          return [];
        });
      };
      var integerReadValueFromPointer = (name, width, signed) => {
        switch (width) {
          case 1:
            return signed ? (pointer) => HEAP8[pointer] : (pointer) => HEAPU8[pointer];
          case 2:
            return signed ? (pointer) => HEAP16[pointer >> 1] : (pointer) => HEAPU16[pointer >> 1];
          case 4:
            return signed ? (pointer) => HEAP32[pointer >> 2] : (pointer) => HEAPU32[pointer >> 2];
          default:
            throw new TypeError(`invalid integer width (${width}): ${name}`);
        }
      };
      var __embind_register_integer = (primitiveType, name, size, minRange, maxRange) => {
        name = readLatin1String(name);
        if (maxRange === -1) {
          maxRange = 4294967295;
        }
        var fromWireType = (value) => value;
        if (minRange === 0) {
          var bitshift = 32 - 8 * size;
          fromWireType = (value) => value << bitshift >>> bitshift;
        }
        var isUnsignedType = name.includes("unsigned");
        var checkAssertions = (value, toTypeName) => {
          if (typeof value != "number" && typeof value != "boolean") {
            throw new TypeError(`Cannot convert "${embindRepr(value)}" to ${toTypeName}`);
          }
          if (value < minRange || value > maxRange) {
            throw new TypeError(`Passing a number "${embindRepr(value)}" from JS side to C/C++ side to an argument of type "${name}", which is outside the valid range [${minRange}, ${maxRange}]!`);
          }
        };
        var toWireType;
        if (isUnsignedType) {
          toWireType = function(destructors, value) {
            checkAssertions(value, this.name);
            return value >>> 0;
          };
        } else {
          toWireType = function(destructors, value) {
            checkAssertions(value, this.name);
            return value;
          };
        }
        registerType(primitiveType, {
          name,
          "fromWireType": fromWireType,
          "toWireType": toWireType,
          "argPackAdvance": GenericWireTypeSize,
          "readValueFromPointer": integerReadValueFromPointer(name, size, minRange !== 0),
          destructorFunction: null
        });
      };
      var __embind_register_memory_view = (rawType, dataTypeIndex, name) => {
        var typeMapping = [
          Int8Array,
          Uint8Array,
          Int16Array,
          Uint16Array,
          Int32Array,
          Uint32Array,
          Float32Array,
          Float64Array
        ];
        var TA = typeMapping[dataTypeIndex];
        function decodeMemoryView(handle) {
          var size = HEAPU32[handle >> 2];
          var data = HEAPU32[handle + 4 >> 2];
          return new TA(HEAP8.buffer, data, size);
        }
        name = readLatin1String(name);
        registerType(rawType, {
          name,
          "fromWireType": decodeMemoryView,
          "argPackAdvance": GenericWireTypeSize,
          "readValueFromPointer": decodeMemoryView
        }, {
          ignoreDuplicateRegistrations: true
        });
      };
      var __embind_register_std_string = (rawType, name) => {
        name = readLatin1String(name);
        var stdStringIsUTF8 = name === "std::string";
        registerType(rawType, {
          name,
          "fromWireType"(value) {
            var length = HEAPU32[value >> 2];
            var payload = value + 4;
            var str;
            if (stdStringIsUTF8) {
              var decodeStartPtr = payload;
              for (var i2 = 0; i2 <= length; ++i2) {
                var currentBytePtr = payload + i2;
                if (i2 == length || HEAPU8[currentBytePtr] == 0) {
                  var maxRead = currentBytePtr - decodeStartPtr;
                  var stringSegment = UTF8ToString(decodeStartPtr, maxRead);
                  if (str === void 0) {
                    str = stringSegment;
                  } else {
                    str += String.fromCharCode(0);
                    str += stringSegment;
                  }
                  decodeStartPtr = currentBytePtr + 1;
                }
              }
            } else {
              var a = new Array(length);
              for (var i2 = 0; i2 < length; ++i2) {
                a[i2] = String.fromCharCode(HEAPU8[payload + i2]);
              }
              str = a.join("");
            }
            _free(value);
            return str;
          },
          "toWireType"(destructors, value) {
            if (value instanceof ArrayBuffer) {
              value = new Uint8Array(value);
            }
            var length;
            var valueIsOfTypeString = typeof value == "string";
            if (!(valueIsOfTypeString || value instanceof Uint8Array || value instanceof Uint8ClampedArray || value instanceof Int8Array)) {
              throwBindingError("Cannot pass non-string to std::string");
            }
            if (stdStringIsUTF8 && valueIsOfTypeString) {
              length = lengthBytesUTF8(value);
            } else {
              length = value.length;
            }
            var base = _malloc(4 + length + 1);
            var ptr = base + 4;
            HEAPU32[base >> 2] = length;
            if (stdStringIsUTF8 && valueIsOfTypeString) {
              stringToUTF8(value, ptr, length + 1);
            } else {
              if (valueIsOfTypeString) {
                for (var i2 = 0; i2 < length; ++i2) {
                  var charCode = value.charCodeAt(i2);
                  if (charCode > 255) {
                    _free(ptr);
                    throwBindingError("String has UTF-16 code units that do not fit in 8 bits");
                  }
                  HEAPU8[ptr + i2] = charCode;
                }
              } else {
                for (var i2 = 0; i2 < length; ++i2) {
                  HEAPU8[ptr + i2] = value[i2];
                }
              }
            }
            if (destructors !== null) {
              destructors.push(_free, base);
            }
            return base;
          },
          "argPackAdvance": GenericWireTypeSize,
          "readValueFromPointer": readPointer,
          destructorFunction(ptr) {
            _free(ptr);
          }
        });
      };
      var UTF16Decoder = typeof TextDecoder != "undefined" ? new TextDecoder("utf-16le") : void 0;
      var UTF16ToString = (ptr, maxBytesToRead) => {
        assert(ptr % 2 == 0, "Pointer passed to UTF16ToString must be aligned to two bytes!");
        var endPtr = ptr;
        var idx = endPtr >> 1;
        var maxIdx = idx + maxBytesToRead / 2;
        while (!(idx >= maxIdx) && HEAPU16[idx])
          ++idx;
        endPtr = idx << 1;
        if (endPtr - ptr > 32 && UTF16Decoder)
          return UTF16Decoder.decode(HEAPU8.subarray(ptr, endPtr));
        var str = "";
        for (var i2 = 0; !(i2 >= maxBytesToRead / 2); ++i2) {
          var codeUnit = HEAP16[ptr + i2 * 2 >> 1];
          if (codeUnit == 0)
            break;
          str += String.fromCharCode(codeUnit);
        }
        return str;
      };
      var stringToUTF16 = (str, outPtr, maxBytesToWrite) => {
        assert(outPtr % 2 == 0, "Pointer passed to stringToUTF16 must be aligned to two bytes!");
        assert(typeof maxBytesToWrite == "number", "stringToUTF16(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
        maxBytesToWrite ?? (maxBytesToWrite = 2147483647);
        if (maxBytesToWrite < 2)
          return 0;
        maxBytesToWrite -= 2;
        var startPtr = outPtr;
        var numCharsToWrite = maxBytesToWrite < str.length * 2 ? maxBytesToWrite / 2 : str.length;
        for (var i2 = 0; i2 < numCharsToWrite; ++i2) {
          var codeUnit = str.charCodeAt(i2);
          HEAP16[outPtr >> 1] = codeUnit;
          outPtr += 2;
        }
        HEAP16[outPtr >> 1] = 0;
        return outPtr - startPtr;
      };
      var lengthBytesUTF16 = (str) => {
        return str.length * 2;
      };
      var UTF32ToString = (ptr, maxBytesToRead) => {
        assert(ptr % 4 == 0, "Pointer passed to UTF32ToString must be aligned to four bytes!");
        var i2 = 0;
        var str = "";
        while (!(i2 >= maxBytesToRead / 4)) {
          var utf32 = HEAP32[ptr + i2 * 4 >> 2];
          if (utf32 == 0)
            break;
          ++i2;
          if (utf32 >= 65536) {
            var ch = utf32 - 65536;
            str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
          } else {
            str += String.fromCharCode(utf32);
          }
        }
        return str;
      };
      var stringToUTF32 = (str, outPtr, maxBytesToWrite) => {
        assert(outPtr % 4 == 0, "Pointer passed to stringToUTF32 must be aligned to four bytes!");
        assert(typeof maxBytesToWrite == "number", "stringToUTF32(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
        maxBytesToWrite ?? (maxBytesToWrite = 2147483647);
        if (maxBytesToWrite < 4)
          return 0;
        var startPtr = outPtr;
        var endPtr = startPtr + maxBytesToWrite - 4;
        for (var i2 = 0; i2 < str.length; ++i2) {
          var codeUnit = str.charCodeAt(i2);
          if (codeUnit >= 55296 && codeUnit <= 57343) {
            var trailSurrogate = str.charCodeAt(++i2);
            codeUnit = 65536 + ((codeUnit & 1023) << 10) | trailSurrogate & 1023;
          }
          HEAP32[outPtr >> 2] = codeUnit;
          outPtr += 4;
          if (outPtr + 4 > endPtr)
            break;
        }
        HEAP32[outPtr >> 2] = 0;
        return outPtr - startPtr;
      };
      var lengthBytesUTF32 = (str) => {
        var len2 = 0;
        for (var i2 = 0; i2 < str.length; ++i2) {
          var codeUnit = str.charCodeAt(i2);
          if (codeUnit >= 55296 && codeUnit <= 57343)
            ++i2;
          len2 += 4;
        }
        return len2;
      };
      var __embind_register_std_wstring = (rawType, charSize, name) => {
        name = readLatin1String(name);
        var decodeString, encodeString, readCharAt, lengthBytesUTF;
        if (charSize === 2) {
          decodeString = UTF16ToString;
          encodeString = stringToUTF16;
          lengthBytesUTF = lengthBytesUTF16;
          readCharAt = (pointer) => HEAPU16[pointer >> 1];
        } else if (charSize === 4) {
          decodeString = UTF32ToString;
          encodeString = stringToUTF32;
          lengthBytesUTF = lengthBytesUTF32;
          readCharAt = (pointer) => HEAPU32[pointer >> 2];
        }
        registerType(rawType, {
          name,
          "fromWireType": (value) => {
            var length = HEAPU32[value >> 2];
            var str;
            var decodeStartPtr = value + 4;
            for (var i2 = 0; i2 <= length; ++i2) {
              var currentBytePtr = value + 4 + i2 * charSize;
              if (i2 == length || readCharAt(currentBytePtr) == 0) {
                var maxReadBytes = currentBytePtr - decodeStartPtr;
                var stringSegment = decodeString(decodeStartPtr, maxReadBytes);
                if (str === void 0) {
                  str = stringSegment;
                } else {
                  str += String.fromCharCode(0);
                  str += stringSegment;
                }
                decodeStartPtr = currentBytePtr + charSize;
              }
            }
            _free(value);
            return str;
          },
          "toWireType": (destructors, value) => {
            if (!(typeof value == "string")) {
              throwBindingError(`Cannot pass non-string to C++ string type ${name}`);
            }
            var length = lengthBytesUTF(value);
            var ptr = _malloc(4 + length + charSize);
            HEAPU32[ptr >> 2] = length / charSize;
            encodeString(value, ptr + 4, length + charSize);
            if (destructors !== null) {
              destructors.push(_free, ptr);
            }
            return ptr;
          },
          "argPackAdvance": GenericWireTypeSize,
          "readValueFromPointer": readPointer,
          destructorFunction(ptr) {
            _free(ptr);
          }
        });
      };
      var __embind_register_void = (rawType, name) => {
        name = readLatin1String(name);
        registerType(rawType, {
          isVoid: true,
          name,
          "argPackAdvance": 0,
          "fromWireType": () => void 0,
          "toWireType": (destructors, o) => void 0
        });
      };
      var __emscripten_memcpy_js = (dest, src, num) => HEAPU8.copyWithin(dest, src, src + num);
      var requireRegisteredType = (rawType, humanName) => {
        var impl = registeredTypes[rawType];
        if (void 0 === impl) {
          throwBindingError(`${humanName} has unknown type ${getTypeName(rawType)}`);
        }
        return impl;
      };
      var emval_returnValue = (returnType, destructorsRef, handle) => {
        var destructors = [];
        var result = returnType["toWireType"](destructors, handle);
        if (destructors.length) {
          HEAPU32[destructorsRef >> 2] = Emval.toHandle(destructors);
        }
        return result;
      };
      var __emval_as = (handle, returnType, destructorsRef) => {
        handle = Emval.toValue(handle);
        returnType = requireRegisteredType(returnType, "emval::as");
        return emval_returnValue(returnType, destructorsRef, handle);
      };
      var emval_symbols = {};
      var getStringOrSymbol = (address) => {
        var symbol = emval_symbols[address];
        if (symbol === void 0) {
          return readLatin1String(address);
        }
        return symbol;
      };
      var emval_methodCallers = [];
      var __emval_call_method = (caller, objHandle, methodName, destructorsRef, args) => {
        caller = emval_methodCallers[caller];
        objHandle = Emval.toValue(objHandle);
        methodName = getStringOrSymbol(methodName);
        return caller(objHandle, objHandle[methodName], destructorsRef, args);
      };
      var emval_addMethodCaller = (caller) => {
        var id = emval_methodCallers.length;
        emval_methodCallers.push(caller);
        return id;
      };
      var emval_lookupTypes = (argCount, argTypes) => {
        var a = new Array(argCount);
        for (var i2 = 0; i2 < argCount; ++i2) {
          a[i2] = requireRegisteredType(HEAPU32[argTypes + i2 * 4 >> 2], "parameter " + i2);
        }
        return a;
      };
      var __emval_get_method_caller = (argCount, argTypes, kind) => {
        var types = emval_lookupTypes(argCount, argTypes);
        var retType = types.shift();
        argCount--;
        var functionBody = `return function (obj, func, destructorsRef, args) {
`;
        var offset = 0;
        var argsList = [];
        if (kind === 0) {
          argsList.push("obj");
        }
        var params = [
          "retType"
        ];
        var args = [
          retType
        ];
        for (var i2 = 0; i2 < argCount; ++i2) {
          argsList.push("arg" + i2);
          params.push("argType" + i2);
          args.push(types[i2]);
          functionBody += `  var arg${i2} = argType${i2}.readValueFromPointer(args${offset ? "+" + offset : ""});
`;
          offset += types[i2]["argPackAdvance"];
        }
        var invoker = kind === 1 ? "new func" : "func.call";
        functionBody += `  var rv = ${invoker}(${argsList.join(", ")});
`;
        if (!retType.isVoid) {
          params.push("emval_returnValue");
          args.push(emval_returnValue);
          functionBody += "  return emval_returnValue(retType, destructorsRef, rv);\n";
        }
        functionBody += "};\n";
        params.push(functionBody);
        var invokerFunction = newFunc(Function, params)(...args);
        var functionName = `methodCaller<(${types.map((t) => t.name).join(", ")}) => ${retType.name}>`;
        return emval_addMethodCaller(createNamedFunction(functionName, invokerFunction));
      };
      var __emval_get_property = (handle, key) => {
        handle = Emval.toValue(handle);
        key = Emval.toValue(key);
        return Emval.toHandle(handle[key]);
      };
      var __emval_incref = (handle) => {
        if (handle > 9) {
          emval_handles[handle + 1] += 1;
        }
      };
      var __emval_new_array = () => Emval.toHandle([]);
      var __emval_new_array_from_memory_view = (view) => {
        view = Emval.toValue(view);
        var a = new Array(view.length);
        for (var i2 = 0; i2 < view.length; i2++)
          a[i2] = view[i2];
        return Emval.toHandle(a);
      };
      var __emval_new_cstring = (v) => Emval.toHandle(getStringOrSymbol(v));
      var __emval_new_object = () => Emval.toHandle({});
      var __emval_run_destructors = (handle) => {
        var destructors = Emval.toValue(handle);
        runDestructors(destructors);
        __emval_decref(handle);
      };
      var __emval_set_property = (handle, key, value) => {
        handle = Emval.toValue(handle);
        key = Emval.toValue(key);
        value = Emval.toValue(value);
        handle[key] = value;
      };
      var __emval_take_value = (type, arg) => {
        type = requireRegisteredType(type, "_emval_take_value");
        var v = type["readValueFromPointer"](arg);
        return Emval.toHandle(v);
      };
      var _abort = () => {
        abort("native code called abort()");
      };
      var readEmAsmArgsArray = [];
      var readEmAsmArgs = (sigPtr, buf) => {
        assert(Array.isArray(readEmAsmArgsArray));
        assert(buf % 16 == 0);
        readEmAsmArgsArray.length = 0;
        var ch;
        while (ch = HEAPU8[sigPtr++]) {
          var chr = String.fromCharCode(ch);
          var validChars = [
            "d",
            "f",
            "i",
            "p"
          ];
          assert(validChars.includes(chr), `Invalid character ${ch}("${chr}") in readEmAsmArgs! Use only [${validChars}], and do not specify "v" for void return argument.`);
          var wide = ch != 105;
          wide &= ch != 112;
          buf += wide && buf % 8 ? 4 : 0;
          readEmAsmArgsArray.push(ch == 112 ? HEAPU32[buf >> 2] : ch == 105 ? HEAP32[buf >> 2] : HEAPF64[buf >> 3]);
          buf += wide ? 8 : 4;
        }
        return readEmAsmArgsArray;
      };
      var runEmAsmFunction = (code2, sigPtr, argbuf) => {
        var args = readEmAsmArgs(sigPtr, argbuf);
        assert(ASM_CONSTS.hasOwnProperty(code2), `No EM_ASM constant found at address ${code2}.  The loaded WebAssembly file is likely out of sync with the generated JavaScript.`);
        return ASM_CONSTS[code2](...args);
      };
      var _emscripten_asm_const_int = (code2, sigPtr, argbuf) => {
        return runEmAsmFunction(code2, sigPtr, argbuf);
      };
      var getHeapMax = () => 2147483648;
      var growMemory = (size) => {
        var b = wasmMemory.buffer;
        var pages = (size - b.byteLength + 65535) / 65536;
        try {
          wasmMemory.grow(pages);
          updateMemoryViews();
          return 1;
        } catch (e) {
          err(`growMemory: Attempted to grow heap from ${b.byteLength} bytes to ${size} bytes, but got error: ${e}`);
        }
      };
      var _emscripten_resize_heap = (requestedSize) => {
        var oldSize = HEAPU8.length;
        requestedSize >>>= 0;
        assert(requestedSize > oldSize);
        var maxHeapSize = getHeapMax();
        if (requestedSize > maxHeapSize) {
          err(`Cannot enlarge memory, requested ${requestedSize} bytes, but the limit is ${maxHeapSize} bytes!`);
          return false;
        }
        var alignUp = (x, multiple) => x + (multiple - x % multiple) % multiple;
        for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
          var overGrownHeapSize = oldSize * (1 + 0.2 / cutDown);
          overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
          var newSize = Math.min(maxHeapSize, alignUp(Math.max(requestedSize, overGrownHeapSize), 65536));
          var replacement = growMemory(newSize);
          if (replacement) {
            return true;
          }
        }
        err(`Failed to grow the heap from ${oldSize} bytes to ${newSize} bytes, not enough memory!`);
        return false;
      };
      var ENV = {};
      var getExecutableName = () => {
        return thisProgram || "./this.program";
      };
      var getEnvStrings = () => {
        if (!getEnvStrings.strings) {
          var lang = (typeof navigator == "object" && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8";
          var env = {
            "USER": "web_user",
            "LOGNAME": "web_user",
            "PATH": "/",
            "PWD": "/",
            "HOME": "/home/web_user",
            "LANG": lang,
            "_": getExecutableName()
          };
          for (var x in ENV) {
            if (ENV[x] === void 0)
              delete env[x];
            else
              env[x] = ENV[x];
          }
          var strings = [];
          for (var x in env) {
            strings.push(`${x}=${env[x]}`);
          }
          getEnvStrings.strings = strings;
        }
        return getEnvStrings.strings;
      };
      var stringToAscii = (str, buffer2) => {
        for (var i2 = 0; i2 < str.length; ++i2) {
          assert(str.charCodeAt(i2) === (str.charCodeAt(i2) & 255));
          HEAP8[buffer2++] = str.charCodeAt(i2);
        }
        HEAP8[buffer2] = 0;
      };
      var _environ_get = (__environ, environ_buf) => {
        var bufSize = 0;
        getEnvStrings().forEach((string, i2) => {
          var ptr = environ_buf + bufSize;
          HEAPU32[__environ + i2 * 4 >> 2] = ptr;
          stringToAscii(string, ptr);
          bufSize += string.length + 1;
        });
        return 0;
      };
      var _environ_sizes_get = (penviron_count, penviron_buf_size) => {
        var strings = getEnvStrings();
        HEAPU32[penviron_count >> 2] = strings.length;
        var bufSize = 0;
        strings.forEach((string) => bufSize += string.length + 1);
        HEAPU32[penviron_buf_size >> 2] = bufSize;
        return 0;
      };
      function _fd_close(fd) {
        try {
          var stream = SYSCALLS.getStreamFromFD(fd);
          FS.close(stream);
          return 0;
        } catch (e) {
          if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
            throw e;
          return e.errno;
        }
      }
      var doReadv = (stream, iov, iovcnt, offset) => {
        var ret = 0;
        for (var i2 = 0; i2 < iovcnt; i2++) {
          var ptr = HEAPU32[iov >> 2];
          var len2 = HEAPU32[iov + 4 >> 2];
          iov += 8;
          var curr = FS.read(stream, HEAP8, ptr, len2, offset);
          if (curr < 0)
            return -1;
          ret += curr;
          if (curr < len2)
            break;
          if (typeof offset != "undefined") {
            offset += curr;
          }
        }
        return ret;
      };
      function _fd_read(fd, iov, iovcnt, pnum) {
        try {
          var stream = SYSCALLS.getStreamFromFD(fd);
          var num = doReadv(stream, iov, iovcnt);
          HEAPU32[pnum >> 2] = num;
          return 0;
        } catch (e) {
          if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
            throw e;
          return e.errno;
        }
      }
      var convertI32PairToI53Checked = (lo, hi) => {
        assert(lo == lo >>> 0 || lo == (lo | 0));
        assert(hi === (hi | 0));
        return hi + 2097152 >>> 0 < 4194305 - !!lo ? (lo >>> 0) + hi * 4294967296 : NaN;
      };
      function _fd_seek(fd, offset_low, offset_high, whence, newOffset) {
        var offset = convertI32PairToI53Checked(offset_low, offset_high);
        try {
          if (isNaN(offset))
            return 61;
          var stream = SYSCALLS.getStreamFromFD(fd);
          FS.llseek(stream, offset, whence);
          tempI64 = [
            stream.position >>> 0,
            (tempDouble = stream.position, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)
          ], HEAP32[newOffset >> 2] = tempI64[0], HEAP32[newOffset + 4 >> 2] = tempI64[1];
          if (stream.getdents && offset === 0 && whence === 0)
            stream.getdents = null;
          return 0;
        } catch (e) {
          if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
            throw e;
          return e.errno;
        }
      }
      var doWritev = (stream, iov, iovcnt, offset) => {
        var ret = 0;
        for (var i2 = 0; i2 < iovcnt; i2++) {
          var ptr = HEAPU32[iov >> 2];
          var len2 = HEAPU32[iov + 4 >> 2];
          iov += 8;
          var curr = FS.write(stream, HEAP8, ptr, len2, offset);
          if (curr < 0)
            return -1;
          ret += curr;
          if (typeof offset != "undefined") {
            offset += curr;
          }
        }
        return ret;
      };
      function _fd_write(fd, iov, iovcnt, pnum) {
        try {
          var stream = SYSCALLS.getStreamFromFD(fd);
          var num = doWritev(stream, iov, iovcnt);
          HEAPU32[pnum >> 2] = num;
          return 0;
        } catch (e) {
          if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
            throw e;
          return e.errno;
        }
      }
      var isLeapYear = (year) => year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
      var arraySum = (array, index) => {
        var sum = 0;
        for (var i2 = 0; i2 <= index; sum += array[i2++]) {
        }
        return sum;
      };
      var MONTH_DAYS_LEAP = [
        31,
        29,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31
      ];
      var MONTH_DAYS_REGULAR = [
        31,
        28,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31
      ];
      var addDays = (date, days) => {
        var newDate = new Date(date.getTime());
        while (days > 0) {
          var leap = isLeapYear(newDate.getFullYear());
          var currentMonth = newDate.getMonth();
          var daysInCurrentMonth = (leap ? MONTH_DAYS_LEAP : MONTH_DAYS_REGULAR)[currentMonth];
          if (days > daysInCurrentMonth - newDate.getDate()) {
            days -= daysInCurrentMonth - newDate.getDate() + 1;
            newDate.setDate(1);
            if (currentMonth < 11) {
              newDate.setMonth(currentMonth + 1);
            } else {
              newDate.setMonth(0);
              newDate.setFullYear(newDate.getFullYear() + 1);
            }
          } else {
            newDate.setDate(newDate.getDate() + days);
            return newDate;
          }
        }
        return newDate;
      };
      var writeArrayToMemory = (array, buffer2) => {
        assert(array.length >= 0, "writeArrayToMemory array must have a length (should be an array or typed array)");
        HEAP8.set(array, buffer2);
      };
      var _strftime = (s, maxsize, format, tm) => {
        var tm_zone = HEAPU32[tm + 40 >> 2];
        var date = {
          tm_sec: HEAP32[tm >> 2],
          tm_min: HEAP32[tm + 4 >> 2],
          tm_hour: HEAP32[tm + 8 >> 2],
          tm_mday: HEAP32[tm + 12 >> 2],
          tm_mon: HEAP32[tm + 16 >> 2],
          tm_year: HEAP32[tm + 20 >> 2],
          tm_wday: HEAP32[tm + 24 >> 2],
          tm_yday: HEAP32[tm + 28 >> 2],
          tm_isdst: HEAP32[tm + 32 >> 2],
          tm_gmtoff: HEAP32[tm + 36 >> 2],
          tm_zone: tm_zone ? UTF8ToString(tm_zone) : ""
        };
        var pattern = UTF8ToString(format);
        var EXPANSION_RULES_1 = {
          "%c": "%a %b %d %H:%M:%S %Y",
          "%D": "%m/%d/%y",
          "%F": "%Y-%m-%d",
          "%h": "%b",
          "%r": "%I:%M:%S %p",
          "%R": "%H:%M",
          "%T": "%H:%M:%S",
          "%x": "%m/%d/%y",
          "%X": "%H:%M:%S",
          "%Ec": "%c",
          "%EC": "%C",
          "%Ex": "%m/%d/%y",
          "%EX": "%H:%M:%S",
          "%Ey": "%y",
          "%EY": "%Y",
          "%Od": "%d",
          "%Oe": "%e",
          "%OH": "%H",
          "%OI": "%I",
          "%Om": "%m",
          "%OM": "%M",
          "%OS": "%S",
          "%Ou": "%u",
          "%OU": "%U",
          "%OV": "%V",
          "%Ow": "%w",
          "%OW": "%W",
          "%Oy": "%y"
        };
        for (var rule in EXPANSION_RULES_1) {
          pattern = pattern.replace(new RegExp(rule, "g"), EXPANSION_RULES_1[rule]);
        }
        var WEEKDAYS = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ];
        var MONTHS = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ];
        function leadingSomething(value, digits, character) {
          var str = typeof value == "number" ? value.toString() : value || "";
          while (str.length < digits) {
            str = character[0] + str;
          }
          return str;
        }
        function leadingNulls(value, digits) {
          return leadingSomething(value, digits, "0");
        }
        function compareByDay(date1, date2) {
          function sgn(value) {
            return value < 0 ? -1 : value > 0 ? 1 : 0;
          }
          var compare;
          if ((compare = sgn(date1.getFullYear() - date2.getFullYear())) === 0) {
            if ((compare = sgn(date1.getMonth() - date2.getMonth())) === 0) {
              compare = sgn(date1.getDate() - date2.getDate());
            }
          }
          return compare;
        }
        function getFirstWeekStartDate(janFourth) {
          switch (janFourth.getDay()) {
            case 0:
              return new Date(janFourth.getFullYear() - 1, 11, 29);
            case 1:
              return janFourth;
            case 2:
              return new Date(janFourth.getFullYear(), 0, 3);
            case 3:
              return new Date(janFourth.getFullYear(), 0, 2);
            case 4:
              return new Date(janFourth.getFullYear(), 0, 1);
            case 5:
              return new Date(janFourth.getFullYear() - 1, 11, 31);
            case 6:
              return new Date(janFourth.getFullYear() - 1, 11, 30);
          }
        }
        function getWeekBasedYear(date2) {
          var thisDate = addDays(new Date(date2.tm_year + 1900, 0, 1), date2.tm_yday);
          var janFourthThisYear = new Date(thisDate.getFullYear(), 0, 4);
          var janFourthNextYear = new Date(thisDate.getFullYear() + 1, 0, 4);
          var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear);
          var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear);
          if (compareByDay(firstWeekStartThisYear, thisDate) <= 0) {
            if (compareByDay(firstWeekStartNextYear, thisDate) <= 0) {
              return thisDate.getFullYear() + 1;
            }
            return thisDate.getFullYear();
          }
          return thisDate.getFullYear() - 1;
        }
        var EXPANSION_RULES_2 = {
          "%a": (date2) => WEEKDAYS[date2.tm_wday].substring(0, 3),
          "%A": (date2) => WEEKDAYS[date2.tm_wday],
          "%b": (date2) => MONTHS[date2.tm_mon].substring(0, 3),
          "%B": (date2) => MONTHS[date2.tm_mon],
          "%C": (date2) => {
            var year = date2.tm_year + 1900;
            return leadingNulls(year / 100 | 0, 2);
          },
          "%d": (date2) => leadingNulls(date2.tm_mday, 2),
          "%e": (date2) => leadingSomething(date2.tm_mday, 2, " "),
          "%g": (date2) => {
            return getWeekBasedYear(date2).toString().substring(2);
          },
          "%G": getWeekBasedYear,
          "%H": (date2) => leadingNulls(date2.tm_hour, 2),
          "%I": (date2) => {
            var twelveHour = date2.tm_hour;
            if (twelveHour == 0)
              twelveHour = 12;
            else if (twelveHour > 12)
              twelveHour -= 12;
            return leadingNulls(twelveHour, 2);
          },
          "%j": (date2) => {
            return leadingNulls(date2.tm_mday + arraySum(isLeapYear(date2.tm_year + 1900) ? MONTH_DAYS_LEAP : MONTH_DAYS_REGULAR, date2.tm_mon - 1), 3);
          },
          "%m": (date2) => leadingNulls(date2.tm_mon + 1, 2),
          "%M": (date2) => leadingNulls(date2.tm_min, 2),
          "%n": () => "\n",
          "%p": (date2) => {
            if (date2.tm_hour >= 0 && date2.tm_hour < 12) {
              return "AM";
            }
            return "PM";
          },
          "%S": (date2) => leadingNulls(date2.tm_sec, 2),
          "%t": () => "	",
          "%u": (date2) => date2.tm_wday || 7,
          "%U": (date2) => {
            var days = date2.tm_yday + 7 - date2.tm_wday;
            return leadingNulls(Math.floor(days / 7), 2);
          },
          "%V": (date2) => {
            var val = Math.floor((date2.tm_yday + 7 - (date2.tm_wday + 6) % 7) / 7);
            if ((date2.tm_wday + 371 - date2.tm_yday - 2) % 7 <= 2) {
              val++;
            }
            if (!val) {
              val = 52;
              var dec31 = (date2.tm_wday + 7 - date2.tm_yday - 1) % 7;
              if (dec31 == 4 || dec31 == 5 && isLeapYear(date2.tm_year % 400 - 1)) {
                val++;
              }
            } else if (val == 53) {
              var jan1 = (date2.tm_wday + 371 - date2.tm_yday) % 7;
              if (jan1 != 4 && (jan1 != 3 || !isLeapYear(date2.tm_year)))
                val = 1;
            }
            return leadingNulls(val, 2);
          },
          "%w": (date2) => date2.tm_wday,
          "%W": (date2) => {
            var days = date2.tm_yday + 7 - (date2.tm_wday + 6) % 7;
            return leadingNulls(Math.floor(days / 7), 2);
          },
          "%y": (date2) => {
            return (date2.tm_year + 1900).toString().substring(2);
          },
          "%Y": (date2) => date2.tm_year + 1900,
          "%z": (date2) => {
            var off = date2.tm_gmtoff;
            var ahead = off >= 0;
            off = Math.abs(off) / 60;
            off = off / 60 * 100 + off % 60;
            return (ahead ? "+" : "-") + String("0000" + off).slice(-4);
          },
          "%Z": (date2) => date2.tm_zone,
          "%%": () => "%"
        };
        pattern = pattern.replace(/%%/g, "\0\0");
        for (var rule in EXPANSION_RULES_2) {
          if (pattern.includes(rule)) {
            pattern = pattern.replace(new RegExp(rule, "g"), EXPANSION_RULES_2[rule](date));
          }
        }
        pattern = pattern.replace(/\0\0/g, "%");
        var bytes = intArrayFromString(pattern, false);
        if (bytes.length > maxsize) {
          return 0;
        }
        writeArrayToMemory(bytes, s);
        return bytes.length - 1;
      };
      var _strftime_l = (s, maxsize, format, tm, loc) => {
        return _strftime(s, maxsize, format, tm);
      };
      FS.createPreloadedFile = FS_createPreloadedFile;
      FS.staticInit();
      embind_init_charCodes();
      BindingError = Module["BindingError"] = class BindingError extends Error {
        constructor(message) {
          super(message);
          this.name = "BindingError";
        }
      };
      InternalError = Module["InternalError"] = class InternalError extends Error {
        constructor(message) {
          super(message);
          this.name = "InternalError";
        }
      };
      init_ClassHandle();
      init_embind();
      init_RegisteredPointer();
      UnboundTypeError = Module["UnboundTypeError"] = extendError(Error, "UnboundTypeError");
      init_emval();
      function checkIncomingModuleAPI() {
        ignoredModuleProp("fetchSettings");
      }
      var wasmImports = {
        __assert_fail: ___assert_fail,
        __syscall_fcntl64: ___syscall_fcntl64,
        __syscall_fstat64: ___syscall_fstat64,
        __syscall_ioctl: ___syscall_ioctl,
        __syscall_lstat64: ___syscall_lstat64,
        __syscall_newfstatat: ___syscall_newfstatat,
        __syscall_openat: ___syscall_openat,
        __syscall_stat64: ___syscall_stat64,
        __throw_exception_with_stack_trace: ___throw_exception_with_stack_trace,
        _embind_register_bigint: __embind_register_bigint,
        _embind_register_bool: __embind_register_bool,
        _embind_register_class: __embind_register_class,
        _embind_register_class_class_function: __embind_register_class_class_function,
        _embind_register_class_constructor: __embind_register_class_constructor,
        _embind_register_class_function: __embind_register_class_function,
        _embind_register_emval: __embind_register_emval,
        _embind_register_float: __embind_register_float,
        _embind_register_function: __embind_register_function,
        _embind_register_integer: __embind_register_integer,
        _embind_register_memory_view: __embind_register_memory_view,
        _embind_register_std_string: __embind_register_std_string,
        _embind_register_std_wstring: __embind_register_std_wstring,
        _embind_register_void: __embind_register_void,
        _emscripten_memcpy_js: __emscripten_memcpy_js,
        _emval_as: __emval_as,
        _emval_call_method: __emval_call_method,
        _emval_decref: __emval_decref,
        _emval_get_method_caller: __emval_get_method_caller,
        _emval_get_property: __emval_get_property,
        _emval_incref: __emval_incref,
        _emval_new_array: __emval_new_array,
        _emval_new_array_from_memory_view: __emval_new_array_from_memory_view,
        _emval_new_cstring: __emval_new_cstring,
        _emval_new_object: __emval_new_object,
        _emval_run_destructors: __emval_run_destructors,
        _emval_set_property: __emval_set_property,
        _emval_take_value: __emval_take_value,
        abort: _abort,
        emscripten_asm_const_int: _emscripten_asm_const_int,
        emscripten_resize_heap: _emscripten_resize_heap,
        environ_get: _environ_get,
        environ_sizes_get: _environ_sizes_get,
        fd_close: _fd_close,
        fd_read: _fd_read,
        fd_seek: _fd_seek,
        fd_write: _fd_write,
        strftime_l: _strftime_l,
        syncIdb_js
      };
      var wasmExports = createWasm();
      var ___getTypeName = createExportWrapper("__getTypeName", 1);
      var _malloc = createExportWrapper("malloc", 1);
      var _free = createExportWrapper("free", 1);
      var _fflush = createExportWrapper("fflush", 1);
      var ___trap = () => (___trap = wasmExports["__trap"])();
      var _emscripten_stack_init = () => (_emscripten_stack_init = wasmExports["emscripten_stack_init"])();
      var _emscripten_stack_get_end = () => (_emscripten_stack_get_end = wasmExports["emscripten_stack_get_end"])();
      var __emscripten_stack_restore = (a0) => (__emscripten_stack_restore = wasmExports["_emscripten_stack_restore"])(a0);
      var __emscripten_stack_alloc = (a0) => (__emscripten_stack_alloc = wasmExports["_emscripten_stack_alloc"])(a0);
      var _emscripten_stack_get_current = () => (_emscripten_stack_get_current = wasmExports["emscripten_stack_get_current"])();
      var ___thrown_object_from_unwind_exception = createExportWrapper("__thrown_object_from_unwind_exception", 1);
      var ___get_exception_message = createExportWrapper("__get_exception_message", 3);
      Module["dynCall_jiji"] = createExportWrapper("dynCall_jiji", 5);
      Module["dynCall_viijii"] = createExportWrapper("dynCall_viijii", 7);
      Module["dynCall_iiiiij"] = createExportWrapper("dynCall_iiiiij", 7);
      Module["dynCall_iiiiijj"] = createExportWrapper("dynCall_iiiiijj", 9);
      Module["dynCall_iiiiiijj"] = createExportWrapper("dynCall_iiiiiijj", 10);
      Module["___start_em_js"] = 45296;
      Module["___stop_em_js"] = 45631;
      var missingLibrarySymbols = [
        "writeI53ToI64",
        "writeI53ToI64Clamped",
        "writeI53ToI64Signaling",
        "writeI53ToU64Clamped",
        "writeI53ToU64Signaling",
        "readI53FromI64",
        "readI53FromU64",
        "convertI32PairToI53",
        "convertU32PairToI53",
        "getTempRet0",
        "setTempRet0",
        "exitJS",
        "ydayFromDate",
        "inetPton4",
        "inetNtop4",
        "inetPton6",
        "inetNtop6",
        "readSockaddr",
        "writeSockaddr",
        "emscriptenLog",
        "runMainThreadEmAsm",
        "jstoi_q",
        "listenOnce",
        "autoResumeAudioContext",
        "handleException",
        "keepRuntimeAlive",
        "runtimeKeepalivePush",
        "runtimeKeepalivePop",
        "callUserCallback",
        "maybeExit",
        "asmjsMangle",
        "HandleAllocator",
        "getNativeTypeSize",
        "STACK_SIZE",
        "STACK_ALIGN",
        "POINTER_SIZE",
        "ASSERTIONS",
        "getCFunc",
        "ccall",
        "cwrap",
        "uleb128Encode",
        "sigToWasmTypes",
        "generateFuncType",
        "convertJsFunctionToWasm",
        "getEmptyTableSlot",
        "updateTableMap",
        "getFunctionAddress",
        "addFunction",
        "removeFunction",
        "reallyNegative",
        "unSign",
        "strLen",
        "reSign",
        "formatString",
        "intArrayToString",
        "AsciiToString",
        "stringToNewUTF8",
        "registerKeyEventCallback",
        "maybeCStringToJsString",
        "findEventTarget",
        "getBoundingClientRect",
        "fillMouseEventData",
        "registerMouseEventCallback",
        "registerWheelEventCallback",
        "registerUiEventCallback",
        "registerFocusEventCallback",
        "fillDeviceOrientationEventData",
        "registerDeviceOrientationEventCallback",
        "fillDeviceMotionEventData",
        "registerDeviceMotionEventCallback",
        "screenOrientation",
        "fillOrientationChangeEventData",
        "registerOrientationChangeEventCallback",
        "fillFullscreenChangeEventData",
        "registerFullscreenChangeEventCallback",
        "JSEvents_requestFullscreen",
        "JSEvents_resizeCanvasForFullscreen",
        "registerRestoreOldStyle",
        "hideEverythingExceptGivenElement",
        "restoreHiddenElements",
        "setLetterbox",
        "softFullscreenResizeWebGLRenderTarget",
        "doRequestFullscreen",
        "fillPointerlockChangeEventData",
        "registerPointerlockChangeEventCallback",
        "registerPointerlockErrorEventCallback",
        "requestPointerLock",
        "fillVisibilityChangeEventData",
        "registerVisibilityChangeEventCallback",
        "registerTouchEventCallback",
        "fillGamepadEventData",
        "registerGamepadEventCallback",
        "registerBeforeUnloadEventCallback",
        "fillBatteryEventData",
        "battery",
        "registerBatteryEventCallback",
        "setCanvasElementSize",
        "getCanvasElementSize",
        "getCallstack",
        "convertPCtoSourceLocation",
        "checkWasiClock",
        "wasiRightsToMuslOFlags",
        "wasiOFlagsToMuslOFlags",
        "createDyncallWrapper",
        "safeSetTimeout",
        "setImmediateWrapped",
        "clearImmediateWrapped",
        "polyfillSetImmediate",
        "getPromise",
        "makePromise",
        "idsToPromises",
        "makePromiseCallback",
        "Browser_asyncPrepareDataCounter",
        "setMainLoop",
        "getSocketFromFD",
        "getSocketAddress",
        "FS_unlink",
        "FS_mkdirTree",
        "_setNetworkCallback",
        "heapObjectForWebGLType",
        "toTypedArrayIndex",
        "webgl_enable_ANGLE_instanced_arrays",
        "webgl_enable_OES_vertex_array_object",
        "webgl_enable_WEBGL_draw_buffers",
        "webgl_enable_WEBGL_multi_draw",
        "emscriptenWebGLGet",
        "computeUnpackAlignedImageSize",
        "colorChannelsInGlTextureFormat",
        "emscriptenWebGLGetTexPixelData",
        "emscriptenWebGLGetUniform",
        "webglGetUniformLocation",
        "webglPrepareUniformLocationsBeforeFirstUse",
        "webglGetLeftBracePos",
        "emscriptenWebGLGetVertexAttrib",
        "__glGetActiveAttribOrUniform",
        "writeGLArray",
        "registerWebGlEventCallback",
        "runAndAbortIfError",
        "ALLOC_NORMAL",
        "ALLOC_STACK",
        "allocate",
        "writeStringToMemory",
        "writeAsciiToMemory",
        "setErrNo",
        "getFunctionArgsName",
        "createJsInvokerSignature",
        "registerInheritedInstance",
        "unregisterInheritedInstance",
        "enumReadValueFromPointer",
        "validateThis",
        "emval_get_global"
      ];
      missingLibrarySymbols.forEach(missingLibrarySymbol);
      var unexportedSymbols = [
        "run",
        "addOnPreRun",
        "addOnInit",
        "addOnPreMain",
        "addOnExit",
        "addOnPostRun",
        "addRunDependency",
        "removeRunDependency",
        "FS_createFolder",
        "FS_createPath",
        "FS_createLazyFile",
        "FS_createLink",
        "FS_createDevice",
        "FS_readFile",
        "out",
        "err",
        "callMain",
        "abort",
        "wasmMemory",
        "wasmExports",
        "writeStackCookie",
        "checkStackCookie",
        "intArrayFromBase64",
        "tryParseAsDataURI",
        "convertI32PairToI53Checked",
        "stackSave",
        "stackRestore",
        "stackAlloc",
        "ptrToString",
        "zeroMemory",
        "getHeapMax",
        "growMemory",
        "ENV",
        "MONTH_DAYS_REGULAR",
        "MONTH_DAYS_LEAP",
        "MONTH_DAYS_REGULAR_CUMULATIVE",
        "MONTH_DAYS_LEAP_CUMULATIVE",
        "isLeapYear",
        "arraySum",
        "addDays",
        "ERRNO_CODES",
        "ERRNO_MESSAGES",
        "DNS",
        "Protocols",
        "Sockets",
        "initRandomFill",
        "randomFill",
        "timers",
        "warnOnce",
        "readEmAsmArgsArray",
        "readEmAsmArgs",
        "runEmAsmFunction",
        "jstoi_s",
        "getExecutableName",
        "dynCallLegacy",
        "getDynCaller",
        "dynCall",
        "asyncLoad",
        "alignMemory",
        "mmapAlloc",
        "wasmTable",
        "noExitRuntime",
        "freeTableIndexes",
        "functionsInTableMap",
        "setValue",
        "getValue",
        "PATH",
        "PATH_FS",
        "UTF8Decoder",
        "UTF8ArrayToString",
        "UTF8ToString",
        "stringToUTF8Array",
        "stringToUTF8",
        "lengthBytesUTF8",
        "intArrayFromString",
        "stringToAscii",
        "UTF16Decoder",
        "UTF16ToString",
        "stringToUTF16",
        "lengthBytesUTF16",
        "UTF32ToString",
        "stringToUTF32",
        "lengthBytesUTF32",
        "stringToUTF8OnStack",
        "writeArrayToMemory",
        "JSEvents",
        "specialHTMLTargets",
        "findCanvasEventTarget",
        "currentFullscreenStrategy",
        "restoreOldWindowedStyle",
        "jsStackTrace",
        "UNWIND_CACHE",
        "ExitStatus",
        "getEnvStrings",
        "doReadv",
        "doWritev",
        "promiseMap",
        "getExceptionMessageCommon",
        "getCppExceptionTag",
        "getCppExceptionThrownObjectFromWebAssemblyException",
        "incrementExceptionRefcount",
        "decrementExceptionRefcount",
        "getExceptionMessage",
        "Browser",
        "getPreloadedImageData__data",
        "wget",
        "SYSCALLS",
        "preloadPlugins",
        "FS_createPreloadedFile",
        "FS_modeStringToFlags",
        "FS_getMode",
        "FS_stdin_getChar_buffer",
        "FS_stdin_getChar",
        "FS",
        "FS_createDataFile",
        "MEMFS",
        "TTY",
        "PIPEFS",
        "SOCKFS",
        "tempFixedLengthArray",
        "miniTempWebGLFloatBuffers",
        "miniTempWebGLIntBuffers",
        "GL",
        "AL",
        "GLUT",
        "EGL",
        "GLEW",
        "IDBStore",
        "SDL",
        "SDL_gfx",
        "allocateUTF8",
        "allocateUTF8OnStack",
        "demangle",
        "stackTrace",
        "InternalError",
        "BindingError",
        "throwInternalError",
        "throwBindingError",
        "registeredTypes",
        "awaitingDependencies",
        "typeDependencies",
        "tupleRegistrations",
        "structRegistrations",
        "sharedRegisterType",
        "whenDependentTypesAreResolved",
        "embind_charCodes",
        "embind_init_charCodes",
        "readLatin1String",
        "getTypeName",
        "getFunctionName",
        "heap32VectorToArray",
        "requireRegisteredType",
        "usesDestructorStack",
        "createJsInvoker",
        "UnboundTypeError",
        "PureVirtualError",
        "GenericWireTypeSize",
        "EmValType",
        "init_embind",
        "throwUnboundTypeError",
        "ensureOverloadTable",
        "exposePublicSymbol",
        "replacePublicSymbol",
        "extendError",
        "createNamedFunction",
        "embindRepr",
        "registeredInstances",
        "getBasestPointer",
        "getInheritedInstance",
        "getInheritedInstanceCount",
        "getLiveInheritedInstances",
        "registeredPointers",
        "registerType",
        "integerReadValueFromPointer",
        "floatReadValueFromPointer",
        "readPointer",
        "runDestructors",
        "newFunc",
        "craftInvokerFunction",
        "embind__requireFunction",
        "genericPointerToWireType",
        "constNoSmartPtrRawPointerToWireType",
        "nonConstNoSmartPtrRawPointerToWireType",
        "init_RegisteredPointer",
        "RegisteredPointer",
        "RegisteredPointer_fromWireType",
        "runDestructor",
        "releaseClassHandle",
        "finalizationRegistry",
        "detachFinalizer_deps",
        "detachFinalizer",
        "attachFinalizer",
        "makeClassHandle",
        "init_ClassHandle",
        "ClassHandle",
        "throwInstanceAlreadyDeleted",
        "deletionQueue",
        "flushPendingDeletes",
        "delayFunction",
        "setDelayFunction",
        "RegisteredClass",
        "shallowCopyInternalPointer",
        "downcastPointer",
        "upcastPointer",
        "char_0",
        "char_9",
        "makeLegalFunctionName",
        "emval_freelist",
        "emval_handles",
        "emval_symbols",
        "init_emval",
        "count_emval_handles",
        "getStringOrSymbol",
        "Emval",
        "emval_returnValue",
        "emval_lookupTypes",
        "emval_methodCallers",
        "emval_addMethodCaller",
        "reflectConstruct",
        "IDBFS"
      ];
      unexportedSymbols.forEach(unexportedRuntimeSymbol);
      var calledRun;
      dependenciesFulfilled = function runCaller() {
        if (!calledRun)
          run();
        if (!calledRun)
          dependenciesFulfilled = runCaller;
      };
      function stackCheckInit() {
        _emscripten_stack_init();
        writeStackCookie();
      }
      function run() {
        if (runDependencies > 0) {
          return;
        }
        stackCheckInit();
        preRun();
        if (runDependencies > 0) {
          return;
        }
        function doRun() {
          if (calledRun)
            return;
          calledRun = true;
          Module["calledRun"] = true;
          if (ABORT)
            return;
          initRuntime();
          readyPromiseResolve(Module);
          if (Module["onRuntimeInitialized"])
            Module["onRuntimeInitialized"]();
          assert(!Module["_main"], 'compiled without a main, but one is present. if you added it from JS, use Module["onRuntimeInitialized"]');
          postRun();
        }
        if (Module["setStatus"]) {
          Module["setStatus"]("Running...");
          setTimeout(function() {
            setTimeout(function() {
              Module["setStatus"]("");
            }, 1);
            doRun();
          }, 1);
        } else {
          doRun();
        }
        checkStackCookie();
      }
      if (Module["preInit"]) {
        if (typeof Module["preInit"] == "function")
          Module["preInit"] = [
            Module["preInit"]
          ];
        while (Module["preInit"].length > 0) {
          Module["preInit"].pop()();
        }
      }
      run();
      moduleRtn = readyPromise;
      for (const prop of Object.keys(Module)) {
        if (!(prop in moduleArg)) {
          Object.defineProperty(moduleArg, prop, {
            configurable: true,
            get() {
              abort(`Access to module property ('${prop}') is no longer possible via the module constructor argument; Instead, use the result of the module constructor.`);
            }
          });
        }
      }
      return moduleRtn;
    };
  })();
})();
export {
  __tla,
  hnswlib as default
};
