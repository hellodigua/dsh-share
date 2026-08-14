window.__ModuleLoader__.load({
	id: "dsh-share",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		//#region \0rolldown/runtime.js
		var __create = Object.create;
		var __defProp = Object.defineProperty;
		var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
		var __getOwnPropNames = Object.getOwnPropertyNames;
		var __getProtoOf = Object.getPrototypeOf;
		var __hasOwnProp = Object.prototype.hasOwnProperty;
		var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
		var __copyProps = (to, from, except, desc) => {
			if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
				key = keys[i];
				if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
					get: ((k) => from[k]).bind(null, key),
					enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
				});
			}
			return to;
		};
		var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule || !__hasOwnProp.call(mod, "default") ? __defProp(target, "default", {
			value: mod,
			enumerable: true
		}) : target, mod));
		//#endregion
		let _deepseek_ai_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
		let react = require("react");
		//#region node_modules/html-to-image/lib/util.js
		var require_util = /* @__PURE__ */ __commonJSMin(((exports) => {
			var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
				function adopt(value) {
					return value instanceof P ? value : new P(function(resolve) {
						resolve(value);
					});
				}
				return new (P || (P = Promise))(function(resolve, reject) {
					function fulfilled(value) {
						try {
							step(generator.next(value));
						} catch (e) {
							reject(e);
						}
					}
					function rejected(value) {
						try {
							step(generator["throw"](value));
						} catch (e) {
							reject(e);
						}
					}
					function step(result) {
						result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
					}
					step((generator = generator.apply(thisArg, _arguments || [])).next());
				});
			};
			var __generator = exports && exports.__generator || function(thisArg, body) {
				var _ = {
					label: 0,
					sent: function() {
						if (t[0] & 1) throw t[1];
						return t[1];
					},
					trys: [],
					ops: []
				}, f, y, t, g;
				return g = {
					next: verb(0),
					"throw": verb(1),
					"return": verb(2)
				}, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
					return this;
				}), g;
				function verb(n) {
					return function(v) {
						return step([n, v]);
					};
				}
				function step(op) {
					if (f) throw new TypeError("Generator is already executing.");
					while (g && (g = 0, op[0] && (_ = 0)), _) try {
						if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
						if (y = 0, t) op = [op[0] & 2, t.value];
						switch (op[0]) {
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
								op = [0];
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
						op = [6, e];
						y = 0;
					} finally {
						f = t = 0;
					}
					if (op[0] & 5) throw op[1];
					return {
						value: op[0] ? op[1] : void 0,
						done: true
					};
				}
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.isInstanceOfElement = exports.nodeToDataURL = exports.svgToDataURL = exports.createImage = exports.canvasToBlob = exports.checkCanvasDimensions = exports.getPixelRatio = exports.getImageSize = exports.getStyleProperties = exports.toArray = exports.delay = exports.uuid = exports.resolveUrl = void 0;
			function resolveUrl(url, baseUrl) {
				if (url.match(/^[a-z]+:\/\//i)) return url;
				if (url.match(/^\/\//)) return window.location.protocol + url;
				if (url.match(/^[a-z]+:/i)) return url;
				var doc = document.implementation.createHTMLDocument();
				var base = doc.createElement("base");
				var a = doc.createElement("a");
				doc.head.appendChild(base);
				doc.body.appendChild(a);
				if (baseUrl) base.href = baseUrl;
				a.href = url;
				return a.href;
			}
			exports.resolveUrl = resolveUrl;
			exports.uuid = (function() {
				var counter = 0;
				var random = function() {
					return "0000".concat((Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4);
				};
				return function() {
					counter += 1;
					return "u".concat(random()).concat(counter);
				};
			})();
			function delay(ms) {
				return function(args) {
					return new Promise(function(resolve) {
						setTimeout(function() {
							return resolve(args);
						}, ms);
					});
				};
			}
			exports.delay = delay;
			function toArray(arrayLike) {
				var arr = [];
				for (var i = 0, l = arrayLike.length; i < l; i++) arr.push(arrayLike[i]);
				return arr;
			}
			exports.toArray = toArray;
			var styleProps = null;
			function getStyleProperties(options) {
				if (options === void 0) options = {};
				if (styleProps) return styleProps;
				if (options.includeStyleProperties) {
					styleProps = options.includeStyleProperties;
					return styleProps;
				}
				styleProps = toArray(window.getComputedStyle(document.documentElement));
				return styleProps;
			}
			exports.getStyleProperties = getStyleProperties;
			function px(node, styleProperty) {
				var val = (node.ownerDocument.defaultView || window).getComputedStyle(node).getPropertyValue(styleProperty);
				return val ? parseFloat(val.replace("px", "")) : 0;
			}
			function getNodeWidth(node) {
				var leftBorder = px(node, "border-left-width");
				var rightBorder = px(node, "border-right-width");
				return node.clientWidth + leftBorder + rightBorder;
			}
			function getNodeHeight(node) {
				var topBorder = px(node, "border-top-width");
				var bottomBorder = px(node, "border-bottom-width");
				return node.clientHeight + topBorder + bottomBorder;
			}
			function getImageSize(targetNode, options) {
				if (options === void 0) options = {};
				return {
					width: options.width || getNodeWidth(targetNode),
					height: options.height || getNodeHeight(targetNode)
				};
			}
			exports.getImageSize = getImageSize;
			function getPixelRatio() {
				var ratio;
				var FINAL_PROCESS;
				try {
					FINAL_PROCESS = process;
				} catch (e) {}
				var val = FINAL_PROCESS && FINAL_PROCESS.env ? FINAL_PROCESS.env.devicePixelRatio : null;
				if (val) {
					ratio = parseInt(val, 10);
					if (Number.isNaN(ratio)) ratio = 1;
				}
				return ratio || window.devicePixelRatio || 1;
			}
			exports.getPixelRatio = getPixelRatio;
			var canvasDimensionLimit = 16384;
			function checkCanvasDimensions(canvas) {
				if (canvas.width > canvasDimensionLimit || canvas.height > canvasDimensionLimit) {
					if (canvas.width > canvasDimensionLimit && canvas.height > canvasDimensionLimit) {
						if (canvas.width > canvas.height) {
							canvas.height *= canvasDimensionLimit / canvas.width;
							canvas.width = canvasDimensionLimit;
						} else {
							canvas.width *= canvasDimensionLimit / canvas.height;
							canvas.height = canvasDimensionLimit;
						}
					} else if (canvas.width > canvasDimensionLimit) {
						canvas.height *= canvasDimensionLimit / canvas.width;
						canvas.width = canvasDimensionLimit;
					} else {
						canvas.width *= canvasDimensionLimit / canvas.height;
						canvas.height = canvasDimensionLimit;
					}
				}
			}
			exports.checkCanvasDimensions = checkCanvasDimensions;
			function canvasToBlob(canvas, options) {
				if (options === void 0) options = {};
				if (canvas.toBlob) return new Promise(function(resolve) {
					canvas.toBlob(resolve, options.type ? options.type : "image/png", options.quality ? options.quality : 1);
				});
				return new Promise(function(resolve) {
					var binaryString = window.atob(canvas.toDataURL(options.type ? options.type : void 0, options.quality ? options.quality : void 0).split(",")[1]);
					var len = binaryString.length;
					var binaryArray = new Uint8Array(len);
					for (var i = 0; i < len; i += 1) binaryArray[i] = binaryString.charCodeAt(i);
					resolve(new Blob([binaryArray], { type: options.type ? options.type : "image/png" }));
				});
			}
			exports.canvasToBlob = canvasToBlob;
			function createImage(url) {
				return new Promise(function(resolve, reject) {
					var img = new Image();
					img.onload = function() {
						img.decode().then(function() {
							requestAnimationFrame(function() {
								return resolve(img);
							});
						});
					};
					img.onerror = reject;
					img.crossOrigin = "anonymous";
					img.decoding = "async";
					img.src = url;
				});
			}
			exports.createImage = createImage;
			function svgToDataURL(svg) {
				return __awaiter(this, void 0, void 0, function() {
					return __generator(this, function(_a) {
						return [2, Promise.resolve().then(function() {
							return new XMLSerializer().serializeToString(svg);
						}).then(encodeURIComponent).then(function(html) {
							return "data:image/svg+xml;charset=utf-8,".concat(html);
						})];
					});
				});
			}
			exports.svgToDataURL = svgToDataURL;
			function nodeToDataURL(node, width, height) {
				return __awaiter(this, void 0, void 0, function() {
					var xmlns, svg, foreignObject;
					return __generator(this, function(_a) {
						xmlns = "http://www.w3.org/2000/svg";
						svg = document.createElementNS(xmlns, "svg");
						foreignObject = document.createElementNS(xmlns, "foreignObject");
						svg.setAttribute("width", "".concat(width));
						svg.setAttribute("height", "".concat(height));
						svg.setAttribute("viewBox", "0 0 ".concat(width, " ").concat(height));
						foreignObject.setAttribute("width", "100%");
						foreignObject.setAttribute("height", "100%");
						foreignObject.setAttribute("x", "0");
						foreignObject.setAttribute("y", "0");
						foreignObject.setAttribute("externalResourcesRequired", "true");
						svg.appendChild(foreignObject);
						foreignObject.appendChild(node);
						return [2, svgToDataURL(svg)];
					});
				});
			}
			exports.nodeToDataURL = nodeToDataURL;
			var isInstanceOfElement = function(node, instance) {
				if (node instanceof instance) return true;
				var nodePrototype = Object.getPrototypeOf(node);
				if (nodePrototype === null) return false;
				return nodePrototype.constructor.name === instance.name || (0, exports.isInstanceOfElement)(nodePrototype, instance);
			};
			exports.isInstanceOfElement = isInstanceOfElement;
		}));
		//#endregion
		//#region node_modules/html-to-image/lib/clone-pseudos.js
		var require_clone_pseudos = /* @__PURE__ */ __commonJSMin(((exports) => {
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.clonePseudoElements = void 0;
			var util_1 = require_util();
			function formatCSSText(style) {
				var content = style.getPropertyValue("content");
				return "".concat(style.cssText, " content: '").concat(content.replace(/'|"/g, ""), "';");
			}
			function formatCSSProperties(style, options) {
				return (0, util_1.getStyleProperties)(options).map(function(name) {
					var value = style.getPropertyValue(name);
					var priority = style.getPropertyPriority(name);
					return "".concat(name, ": ").concat(value).concat(priority ? " !important" : "", ";");
				}).join(" ");
			}
			function getPseudoElementStyle(className, pseudo, style, options) {
				var selector = ".".concat(className, ":").concat(pseudo);
				var cssText = style.cssText ? formatCSSText(style) : formatCSSProperties(style, options);
				return document.createTextNode("".concat(selector, "{").concat(cssText, "}"));
			}
			function clonePseudoElement(nativeNode, clonedNode, pseudo, options) {
				var style = window.getComputedStyle(nativeNode, pseudo);
				var content = style.getPropertyValue("content");
				if (content === "" || content === "none") return;
				var className = (0, util_1.uuid)();
				try {
					clonedNode.className = "".concat(clonedNode.className, " ").concat(className);
				} catch (err) {
					return;
				}
				var styleElement = document.createElement("style");
				styleElement.appendChild(getPseudoElementStyle(className, pseudo, style, options));
				clonedNode.appendChild(styleElement);
			}
			function clonePseudoElements(nativeNode, clonedNode, options) {
				clonePseudoElement(nativeNode, clonedNode, ":before", options);
				clonePseudoElement(nativeNode, clonedNode, ":after", options);
			}
			exports.clonePseudoElements = clonePseudoElements;
		}));
		//#endregion
		//#region node_modules/html-to-image/lib/mimes.js
		var require_mimes = /* @__PURE__ */ __commonJSMin(((exports) => {
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.getMimeType = void 0;
			var WOFF = "application/font-woff";
			var JPEG = "image/jpeg";
			var mimes = {
				woff: WOFF,
				woff2: WOFF,
				ttf: "application/font-truetype",
				eot: "application/vnd.ms-fontobject",
				png: "image/png",
				jpg: JPEG,
				jpeg: JPEG,
				gif: "image/gif",
				tiff: "image/tiff",
				svg: "image/svg+xml",
				webp: "image/webp"
			};
			function getExtension(url) {
				var match = /\.([^./]*?)$/g.exec(url);
				return match ? match[1] : "";
			}
			function getMimeType(url) {
				return mimes[getExtension(url).toLowerCase()] || "";
			}
			exports.getMimeType = getMimeType;
		}));
		//#endregion
		//#region node_modules/html-to-image/lib/dataurl.js
		var require_dataurl = /* @__PURE__ */ __commonJSMin(((exports) => {
			var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
				function adopt(value) {
					return value instanceof P ? value : new P(function(resolve) {
						resolve(value);
					});
				}
				return new (P || (P = Promise))(function(resolve, reject) {
					function fulfilled(value) {
						try {
							step(generator.next(value));
						} catch (e) {
							reject(e);
						}
					}
					function rejected(value) {
						try {
							step(generator["throw"](value));
						} catch (e) {
							reject(e);
						}
					}
					function step(result) {
						result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
					}
					step((generator = generator.apply(thisArg, _arguments || [])).next());
				});
			};
			var __generator = exports && exports.__generator || function(thisArg, body) {
				var _ = {
					label: 0,
					sent: function() {
						if (t[0] & 1) throw t[1];
						return t[1];
					},
					trys: [],
					ops: []
				}, f, y, t, g;
				return g = {
					next: verb(0),
					"throw": verb(1),
					"return": verb(2)
				}, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
					return this;
				}), g;
				function verb(n) {
					return function(v) {
						return step([n, v]);
					};
				}
				function step(op) {
					if (f) throw new TypeError("Generator is already executing.");
					while (g && (g = 0, op[0] && (_ = 0)), _) try {
						if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
						if (y = 0, t) op = [op[0] & 2, t.value];
						switch (op[0]) {
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
								op = [0];
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
						op = [6, e];
						y = 0;
					} finally {
						f = t = 0;
					}
					if (op[0] & 5) throw op[1];
					return {
						value: op[0] ? op[1] : void 0,
						done: true
					};
				}
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.resourceToDataURL = exports.fetchAsDataURL = exports.makeDataUrl = exports.isDataUrl = void 0;
			function getContentFromDataUrl(dataURL) {
				return dataURL.split(/,/)[1];
			}
			function isDataUrl(url) {
				return url.search(/^(data:)/) !== -1;
			}
			exports.isDataUrl = isDataUrl;
			function makeDataUrl(content, mimeType) {
				return "data:".concat(mimeType, ";base64,").concat(content);
			}
			exports.makeDataUrl = makeDataUrl;
			function fetchAsDataURL(url, init, process) {
				return __awaiter(this, void 0, void 0, function() {
					var res, blob;
					return __generator(this, function(_a) {
						switch (_a.label) {
							case 0: return [4, fetch(url, init)];
							case 1:
								res = _a.sent();
								if (res.status === 404) throw new Error("Resource \"".concat(res.url, "\" not found"));
								return [4, res.blob()];
							case 2:
								blob = _a.sent();
								return [2, new Promise(function(resolve, reject) {
									var reader = new FileReader();
									reader.onerror = reject;
									reader.onloadend = function() {
										try {
											resolve(process({
												res,
												result: reader.result
											}));
										} catch (error) {
											reject(error);
										}
									};
									reader.readAsDataURL(blob);
								})];
						}
					});
				});
			}
			exports.fetchAsDataURL = fetchAsDataURL;
			var cache = {};
			function getCacheKey(url, contentType, includeQueryParams) {
				var key = url.replace(/\?.*/, "");
				if (includeQueryParams) key = url;
				if (/ttf|otf|eot|woff2?/i.test(key)) key = key.replace(/.*\//, "");
				return contentType ? "[".concat(contentType, "]").concat(key) : key;
			}
			function resourceToDataURL(resourceUrl, contentType, options) {
				return __awaiter(this, void 0, void 0, function() {
					var cacheKey, dataURL, content, error_1, msg;
					return __generator(this, function(_a) {
						switch (_a.label) {
							case 0:
								cacheKey = getCacheKey(resourceUrl, contentType, options.includeQueryParams);
								if (cache[cacheKey] != null) return [2, cache[cacheKey]];
								if (options.cacheBust) resourceUrl += (/\?/.test(resourceUrl) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime();
								_a.label = 1;
							case 1:
								_a.trys.push([
									1,
									3,
									,
									4
								]);
								return [4, fetchAsDataURL(resourceUrl, options.fetchRequestInit, function(_a) {
									var res = _a.res, result = _a.result;
									if (!contentType) contentType = res.headers.get("Content-Type") || "";
									return getContentFromDataUrl(result);
								})];
							case 2:
								content = _a.sent();
								dataURL = makeDataUrl(content, contentType);
								return [3, 4];
							case 3:
								error_1 = _a.sent();
								dataURL = options.imagePlaceholder || "";
								msg = "Failed to fetch resource: ".concat(resourceUrl);
								if (error_1) msg = typeof error_1 === "string" ? error_1 : error_1.message;
								if (msg) console.warn(msg);
								return [3, 4];
							case 4:
								cache[cacheKey] = dataURL;
								return [2, dataURL];
						}
					});
				});
			}
			exports.resourceToDataURL = resourceToDataURL;
		}));
		//#endregion
		//#region node_modules/html-to-image/lib/clone-node.js
		var require_clone_node = /* @__PURE__ */ __commonJSMin(((exports) => {
			var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
				function adopt(value) {
					return value instanceof P ? value : new P(function(resolve) {
						resolve(value);
					});
				}
				return new (P || (P = Promise))(function(resolve, reject) {
					function fulfilled(value) {
						try {
							step(generator.next(value));
						} catch (e) {
							reject(e);
						}
					}
					function rejected(value) {
						try {
							step(generator["throw"](value));
						} catch (e) {
							reject(e);
						}
					}
					function step(result) {
						result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
					}
					step((generator = generator.apply(thisArg, _arguments || [])).next());
				});
			};
			var __generator = exports && exports.__generator || function(thisArg, body) {
				var _ = {
					label: 0,
					sent: function() {
						if (t[0] & 1) throw t[1];
						return t[1];
					},
					trys: [],
					ops: []
				}, f, y, t, g;
				return g = {
					next: verb(0),
					"throw": verb(1),
					"return": verb(2)
				}, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
					return this;
				}), g;
				function verb(n) {
					return function(v) {
						return step([n, v]);
					};
				}
				function step(op) {
					if (f) throw new TypeError("Generator is already executing.");
					while (g && (g = 0, op[0] && (_ = 0)), _) try {
						if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
						if (y = 0, t) op = [op[0] & 2, t.value];
						switch (op[0]) {
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
								op = [0];
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
						op = [6, e];
						y = 0;
					} finally {
						f = t = 0;
					}
					if (op[0] & 5) throw op[1];
					return {
						value: op[0] ? op[1] : void 0,
						done: true
					};
				}
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.cloneNode = void 0;
			var clone_pseudos_1 = require_clone_pseudos();
			var util_1 = require_util();
			var mimes_1 = require_mimes();
			var dataurl_1 = require_dataurl();
			function cloneCanvasElement(canvas) {
				return __awaiter(this, void 0, void 0, function() {
					var dataURL;
					return __generator(this, function(_a) {
						dataURL = canvas.toDataURL();
						if (dataURL === "data:,") return [2, canvas.cloneNode(false)];
						return [2, (0, util_1.createImage)(dataURL)];
					});
				});
			}
			function cloneVideoElement(video, options) {
				return __awaiter(this, void 0, void 0, function() {
					var canvas, ctx, dataURL_1, poster, contentType, dataURL;
					return __generator(this, function(_a) {
						switch (_a.label) {
							case 0:
								if (video.currentSrc) {
									canvas = document.createElement("canvas");
									ctx = canvas.getContext("2d");
									canvas.width = video.clientWidth;
									canvas.height = video.clientHeight;
									ctx === null || ctx === void 0 || ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
									dataURL_1 = canvas.toDataURL();
									return [2, (0, util_1.createImage)(dataURL_1)];
								}
								poster = video.poster;
								contentType = (0, mimes_1.getMimeType)(poster);
								return [4, (0, dataurl_1.resourceToDataURL)(poster, contentType, options)];
							case 1:
								dataURL = _a.sent();
								return [2, (0, util_1.createImage)(dataURL)];
						}
					});
				});
			}
			function cloneIFrameElement(iframe, options) {
				var _a;
				return __awaiter(this, void 0, void 0, function() {
					return __generator(this, function(_c) {
						switch (_c.label) {
							case 0:
								_c.trys.push([
									0,
									3,
									,
									4
								]);
								if (!((_a = iframe === null || iframe === void 0 ? void 0 : iframe.contentDocument) === null || _a === void 0 ? void 0 : _a.body)) return [3, 2];
								return [4, cloneNode(iframe.contentDocument.body, options, true)];
							case 1: return [2, _c.sent()];
							case 2: return [3, 4];
							case 3:
								_c.sent();
								return [3, 4];
							case 4: return [2, iframe.cloneNode(false)];
						}
					});
				});
			}
			function cloneSingleNode(node, options) {
				return __awaiter(this, void 0, void 0, function() {
					return __generator(this, function(_a) {
						if ((0, util_1.isInstanceOfElement)(node, HTMLCanvasElement)) return [2, cloneCanvasElement(node)];
						if ((0, util_1.isInstanceOfElement)(node, HTMLVideoElement)) return [2, cloneVideoElement(node, options)];
						if ((0, util_1.isInstanceOfElement)(node, HTMLIFrameElement)) return [2, cloneIFrameElement(node, options)];
						return [2, node.cloneNode(isSVGElement(node))];
					});
				});
			}
			var isSlotElement = function(node) {
				return node.tagName != null && node.tagName.toUpperCase() === "SLOT";
			};
			var isSVGElement = function(node) {
				return node.tagName != null && node.tagName.toUpperCase() === "SVG";
			};
			function cloneChildren(nativeNode, clonedNode, options) {
				var _a, _b;
				return __awaiter(this, void 0, void 0, function() {
					var children;
					return __generator(this, function(_c) {
						switch (_c.label) {
							case 0:
								if (isSVGElement(clonedNode)) return [2, clonedNode];
								children = [];
								if (isSlotElement(nativeNode) && nativeNode.assignedNodes) children = (0, util_1.toArray)(nativeNode.assignedNodes());
								else if ((0, util_1.isInstanceOfElement)(nativeNode, HTMLIFrameElement) && ((_a = nativeNode.contentDocument) === null || _a === void 0 ? void 0 : _a.body)) children = (0, util_1.toArray)(nativeNode.contentDocument.body.childNodes);
								else children = (0, util_1.toArray)(((_b = nativeNode.shadowRoot) !== null && _b !== void 0 ? _b : nativeNode).childNodes);
								if (children.length === 0 || (0, util_1.isInstanceOfElement)(nativeNode, HTMLVideoElement)) return [2, clonedNode];
								return [4, children.reduce(function(deferred, child) {
									return deferred.then(function() {
										return cloneNode(child, options);
									}).then(function(clonedChild) {
										if (clonedChild) clonedNode.appendChild(clonedChild);
									});
								}, Promise.resolve())];
							case 1:
								_c.sent();
								return [2, clonedNode];
						}
					});
				});
			}
			function cloneCSSStyle(nativeNode, clonedNode, options) {
				var targetStyle = clonedNode.style;
				if (!targetStyle) return;
				var sourceStyle = window.getComputedStyle(nativeNode);
				if (sourceStyle.cssText) {
					targetStyle.cssText = sourceStyle.cssText;
					targetStyle.transformOrigin = sourceStyle.transformOrigin;
				} else (0, util_1.getStyleProperties)(options).forEach(function(name) {
					var value = sourceStyle.getPropertyValue(name);
					if (name === "font-size" && value.endsWith("px")) {
						var reducedFont = Math.floor(parseFloat(value.substring(0, value.length - 2))) - .1;
						value = "".concat(reducedFont, "px");
					}
					if ((0, util_1.isInstanceOfElement)(nativeNode, HTMLIFrameElement) && name === "display" && value === "inline") value = "block";
					if (name === "d" && clonedNode.getAttribute("d")) value = "path(".concat(clonedNode.getAttribute("d"), ")");
					targetStyle.setProperty(name, value, sourceStyle.getPropertyPriority(name));
				});
			}
			function cloneInputValue(nativeNode, clonedNode) {
				if ((0, util_1.isInstanceOfElement)(nativeNode, HTMLTextAreaElement)) clonedNode.innerHTML = nativeNode.value;
				if ((0, util_1.isInstanceOfElement)(nativeNode, HTMLInputElement)) clonedNode.setAttribute("value", nativeNode.value);
			}
			function cloneSelectValue(nativeNode, clonedNode) {
				if ((0, util_1.isInstanceOfElement)(nativeNode, HTMLSelectElement)) {
					var clonedSelect = clonedNode;
					var selectedOption = Array.from(clonedSelect.children).find(function(child) {
						return nativeNode.value === child.getAttribute("value");
					});
					if (selectedOption) selectedOption.setAttribute("selected", "");
				}
			}
			function decorate(nativeNode, clonedNode, options) {
				if ((0, util_1.isInstanceOfElement)(clonedNode, Element)) {
					cloneCSSStyle(nativeNode, clonedNode, options);
					(0, clone_pseudos_1.clonePseudoElements)(nativeNode, clonedNode, options);
					cloneInputValue(nativeNode, clonedNode);
					cloneSelectValue(nativeNode, clonedNode);
				}
				return clonedNode;
			}
			function ensureSVGSymbols(clone, options) {
				return __awaiter(this, void 0, void 0, function() {
					var uses, processedDefs, i, use, id, exist, definition, _a, _b, nodes, ns, svg, defs, i;
					return __generator(this, function(_c) {
						switch (_c.label) {
							case 0:
								uses = clone.querySelectorAll ? clone.querySelectorAll("use") : [];
								if (uses.length === 0) return [2, clone];
								processedDefs = {};
								i = 0;
								_c.label = 1;
							case 1:
								if (!(i < uses.length)) return [3, 4];
								use = uses[i];
								id = use.getAttribute("xlink:href");
								if (!id) return [3, 3];
								exist = clone.querySelector(id);
								definition = document.querySelector(id);
								if (!(!exist && definition && !processedDefs[id])) return [3, 3];
								_a = processedDefs;
								_b = id;
								return [4, cloneNode(definition, options, true)];
							case 2:
								_a[_b] = _c.sent();
								_c.label = 3;
							case 3:
								i++;
								return [3, 1];
							case 4:
								nodes = Object.values(processedDefs);
								if (nodes.length) {
									ns = "http://www.w3.org/1999/xhtml";
									svg = document.createElementNS(ns, "svg");
									svg.setAttribute("xmlns", ns);
									svg.style.position = "absolute";
									svg.style.width = "0";
									svg.style.height = "0";
									svg.style.overflow = "hidden";
									svg.style.display = "none";
									defs = document.createElementNS(ns, "defs");
									svg.appendChild(defs);
									for (i = 0; i < nodes.length; i++) defs.appendChild(nodes[i]);
									clone.appendChild(svg);
								}
								return [2, clone];
						}
					});
				});
			}
			function cloneNode(node, options, isRoot) {
				return __awaiter(this, void 0, void 0, function() {
					return __generator(this, function(_a) {
						if (!isRoot && options.filter && !options.filter(node)) return [2, null];
						return [2, Promise.resolve(node).then(function(clonedNode) {
							return cloneSingleNode(clonedNode, options);
						}).then(function(clonedNode) {
							return cloneChildren(node, clonedNode, options);
						}).then(function(clonedNode) {
							return decorate(node, clonedNode, options);
						}).then(function(clonedNode) {
							return ensureSVGSymbols(clonedNode, options);
						})];
					});
				});
			}
			exports.cloneNode = cloneNode;
		}));
		//#endregion
		//#region node_modules/html-to-image/lib/embed-resources.js
		var require_embed_resources = /* @__PURE__ */ __commonJSMin(((exports) => {
			var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
				function adopt(value) {
					return value instanceof P ? value : new P(function(resolve) {
						resolve(value);
					});
				}
				return new (P || (P = Promise))(function(resolve, reject) {
					function fulfilled(value) {
						try {
							step(generator.next(value));
						} catch (e) {
							reject(e);
						}
					}
					function rejected(value) {
						try {
							step(generator["throw"](value));
						} catch (e) {
							reject(e);
						}
					}
					function step(result) {
						result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
					}
					step((generator = generator.apply(thisArg, _arguments || [])).next());
				});
			};
			var __generator = exports && exports.__generator || function(thisArg, body) {
				var _ = {
					label: 0,
					sent: function() {
						if (t[0] & 1) throw t[1];
						return t[1];
					},
					trys: [],
					ops: []
				}, f, y, t, g;
				return g = {
					next: verb(0),
					"throw": verb(1),
					"return": verb(2)
				}, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
					return this;
				}), g;
				function verb(n) {
					return function(v) {
						return step([n, v]);
					};
				}
				function step(op) {
					if (f) throw new TypeError("Generator is already executing.");
					while (g && (g = 0, op[0] && (_ = 0)), _) try {
						if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
						if (y = 0, t) op = [op[0] & 2, t.value];
						switch (op[0]) {
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
								op = [0];
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
						op = [6, e];
						y = 0;
					} finally {
						f = t = 0;
					}
					if (op[0] & 5) throw op[1];
					return {
						value: op[0] ? op[1] : void 0,
						done: true
					};
				}
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.embedResources = exports.shouldEmbed = exports.embed = exports.parseURLs = void 0;
			var util_1 = require_util();
			var mimes_1 = require_mimes();
			var dataurl_1 = require_dataurl();
			var URL_REGEX = /url\((['"]?)([^'"]+?)\1\)/g;
			var URL_WITH_FORMAT_REGEX = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g;
			var FONT_SRC_REGEX = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
			function toRegex(url) {
				var escaped = url.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
				return new RegExp("(url\\(['\"]?)(".concat(escaped, ")(['\"]?\\))"), "g");
			}
			function parseURLs(cssText) {
				var urls = [];
				cssText.replace(URL_REGEX, function(raw, quotation, url) {
					urls.push(url);
					return raw;
				});
				return urls.filter(function(url) {
					return !(0, dataurl_1.isDataUrl)(url);
				});
			}
			exports.parseURLs = parseURLs;
			function embed(cssText, resourceURL, baseURL, options, getContentFromUrl) {
				return __awaiter(this, void 0, void 0, function() {
					var resolvedURL, contentType, dataURL, content;
					return __generator(this, function(_a) {
						switch (_a.label) {
							case 0:
								_a.trys.push([
									0,
									5,
									,
									6
								]);
								resolvedURL = baseURL ? (0, util_1.resolveUrl)(resourceURL, baseURL) : resourceURL;
								contentType = (0, mimes_1.getMimeType)(resourceURL);
								dataURL = void 0;
								if (!getContentFromUrl) return [3, 2];
								return [4, getContentFromUrl(resolvedURL)];
							case 1:
								content = _a.sent();
								dataURL = (0, dataurl_1.makeDataUrl)(content, contentType);
								return [3, 4];
							case 2: return [4, (0, dataurl_1.resourceToDataURL)(resolvedURL, contentType, options)];
							case 3:
								dataURL = _a.sent();
								_a.label = 4;
							case 4: return [2, cssText.replace(toRegex(resourceURL), "$1".concat(dataURL, "$3"))];
							case 5:
								_a.sent();
								return [3, 6];
							case 6: return [2, cssText];
						}
					});
				});
			}
			exports.embed = embed;
			function filterPreferredFontFormat(str, _a) {
				var preferredFontFormat = _a.preferredFontFormat;
				return !preferredFontFormat ? str : str.replace(FONT_SRC_REGEX, function(match) {
					while (true) {
						var _a = URL_WITH_FORMAT_REGEX.exec(match) || [], src = _a[0], format = _a[2];
						if (!format) return "";
						if (format === preferredFontFormat) return "src: ".concat(src, ";");
					}
				});
			}
			function shouldEmbed(url) {
				return url.search(URL_REGEX) !== -1;
			}
			exports.shouldEmbed = shouldEmbed;
			function embedResources(cssText, baseUrl, options) {
				return __awaiter(this, void 0, void 0, function() {
					var filteredCSSText, urls;
					return __generator(this, function(_a) {
						if (!shouldEmbed(cssText)) return [2, cssText];
						filteredCSSText = filterPreferredFontFormat(cssText, options);
						urls = parseURLs(filteredCSSText);
						return [2, urls.reduce(function(deferred, url) {
							return deferred.then(function(css) {
								return embed(css, url, baseUrl, options);
							});
						}, Promise.resolve(filteredCSSText))];
					});
				});
			}
			exports.embedResources = embedResources;
		}));
		//#endregion
		//#region node_modules/html-to-image/lib/embed-images.js
		var require_embed_images = /* @__PURE__ */ __commonJSMin(((exports) => {
			var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
				function adopt(value) {
					return value instanceof P ? value : new P(function(resolve) {
						resolve(value);
					});
				}
				return new (P || (P = Promise))(function(resolve, reject) {
					function fulfilled(value) {
						try {
							step(generator.next(value));
						} catch (e) {
							reject(e);
						}
					}
					function rejected(value) {
						try {
							step(generator["throw"](value));
						} catch (e) {
							reject(e);
						}
					}
					function step(result) {
						result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
					}
					step((generator = generator.apply(thisArg, _arguments || [])).next());
				});
			};
			var __generator = exports && exports.__generator || function(thisArg, body) {
				var _ = {
					label: 0,
					sent: function() {
						if (t[0] & 1) throw t[1];
						return t[1];
					},
					trys: [],
					ops: []
				}, f, y, t, g;
				return g = {
					next: verb(0),
					"throw": verb(1),
					"return": verb(2)
				}, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
					return this;
				}), g;
				function verb(n) {
					return function(v) {
						return step([n, v]);
					};
				}
				function step(op) {
					if (f) throw new TypeError("Generator is already executing.");
					while (g && (g = 0, op[0] && (_ = 0)), _) try {
						if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
						if (y = 0, t) op = [op[0] & 2, t.value];
						switch (op[0]) {
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
								op = [0];
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
						op = [6, e];
						y = 0;
					} finally {
						f = t = 0;
					}
					if (op[0] & 5) throw op[1];
					return {
						value: op[0] ? op[1] : void 0,
						done: true
					};
				}
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.embedImages = void 0;
			var embed_resources_1 = require_embed_resources();
			var util_1 = require_util();
			var dataurl_1 = require_dataurl();
			var mimes_1 = require_mimes();
			function embedProp(propName, node, options) {
				var _a;
				return __awaiter(this, void 0, void 0, function() {
					var propValue, cssString;
					return __generator(this, function(_b) {
						switch (_b.label) {
							case 0:
								propValue = (_a = node.style) === null || _a === void 0 ? void 0 : _a.getPropertyValue(propName);
								if (!propValue) return [3, 2];
								return [4, (0, embed_resources_1.embedResources)(propValue, null, options)];
							case 1:
								cssString = _b.sent();
								node.style.setProperty(propName, cssString, node.style.getPropertyPriority(propName));
								return [2, true];
							case 2: return [2, false];
						}
					});
				});
			}
			function embedBackground(clonedNode, options) {
				return __awaiter(this, void 0, void 0, function() {
					var _a, _b, _c, _d;
					return __generator(this, function(_e) {
						switch (_e.label) {
							case 0: return [4, embedProp("background", clonedNode, options)];
							case 1:
								_a = _e.sent();
								if (_a) return [3, 3];
								return [4, embedProp("background-image", clonedNode, options)];
							case 2:
								_a = _e.sent();
								_e.label = 3;
							case 3: return [4, embedProp("mask", clonedNode, options)];
							case 4:
								_d = _e.sent();
								if (_d) return [3, 6];
								return [4, embedProp("-webkit-mask", clonedNode, options)];
							case 5:
								_d = _e.sent();
								_e.label = 6;
							case 6:
								_c = _d;
								if (_c) return [3, 8];
								return [4, embedProp("mask-image", clonedNode, options)];
							case 7:
								_c = _e.sent();
								_e.label = 8;
							case 8:
								_b = _c;
								if (_b) return [3, 10];
								return [4, embedProp("-webkit-mask-image", clonedNode, options)];
							case 9:
								_b = _e.sent();
								_e.label = 10;
							case 10: return [2];
						}
					});
				});
			}
			function embedImageNode(clonedNode, options) {
				return __awaiter(this, void 0, void 0, function() {
					var isImageElement, url, dataURL;
					return __generator(this, function(_a) {
						switch (_a.label) {
							case 0:
								isImageElement = (0, util_1.isInstanceOfElement)(clonedNode, HTMLImageElement);
								if (!(isImageElement && !(0, dataurl_1.isDataUrl)(clonedNode.src)) && !((0, util_1.isInstanceOfElement)(clonedNode, SVGImageElement) && !(0, dataurl_1.isDataUrl)(clonedNode.href.baseVal))) return [2];
								url = isImageElement ? clonedNode.src : clonedNode.href.baseVal;
								return [4, (0, dataurl_1.resourceToDataURL)(url, (0, mimes_1.getMimeType)(url), options)];
							case 1:
								dataURL = _a.sent();
								return [4, new Promise(function(resolve, reject) {
									clonedNode.onload = resolve;
									clonedNode.onerror = options.onImageErrorHandler ? function() {
										var attributes = [];
										for (var _i = 0; _i < arguments.length; _i++) attributes[_i] = arguments[_i];
										try {
											resolve(options.onImageErrorHandler.apply(options, attributes));
										} catch (error) {
											reject(error);
										}
									} : reject;
									var image = clonedNode;
									if (image.decode) image.decode = resolve;
									if (image.loading === "lazy") image.loading = "eager";
									if (isImageElement) {
										clonedNode.srcset = "";
										clonedNode.src = dataURL;
									} else clonedNode.href.baseVal = dataURL;
								})];
							case 2:
								_a.sent();
								return [2];
						}
					});
				});
			}
			function embedChildren(clonedNode, options) {
				return __awaiter(this, void 0, void 0, function() {
					var children, deferreds;
					return __generator(this, function(_a) {
						switch (_a.label) {
							case 0:
								children = (0, util_1.toArray)(clonedNode.childNodes);
								deferreds = children.map(function(child) {
									return embedImages(child, options);
								});
								return [4, Promise.all(deferreds).then(function() {
									return clonedNode;
								})];
							case 1:
								_a.sent();
								return [2];
						}
					});
				});
			}
			function embedImages(clonedNode, options) {
				return __awaiter(this, void 0, void 0, function() {
					return __generator(this, function(_a) {
						switch (_a.label) {
							case 0:
								if (!(0, util_1.isInstanceOfElement)(clonedNode, Element)) return [3, 4];
								return [4, embedBackground(clonedNode, options)];
							case 1:
								_a.sent();
								return [4, embedImageNode(clonedNode, options)];
							case 2:
								_a.sent();
								return [4, embedChildren(clonedNode, options)];
							case 3:
								_a.sent();
								_a.label = 4;
							case 4: return [2];
						}
					});
				});
			}
			exports.embedImages = embedImages;
		}));
		//#endregion
		//#region node_modules/html-to-image/lib/apply-style.js
		var require_apply_style = /* @__PURE__ */ __commonJSMin(((exports) => {
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.applyStyle = void 0;
			function applyStyle(node, options) {
				var style = node.style;
				if (options.backgroundColor) style.backgroundColor = options.backgroundColor;
				if (options.width) style.width = "".concat(options.width, "px");
				if (options.height) style.height = "".concat(options.height, "px");
				var manual = options.style;
				if (manual != null) Object.keys(manual).forEach(function(key) {
					style[key] = manual[key];
				});
				return node;
			}
			exports.applyStyle = applyStyle;
		}));
		//#endregion
		//#region node_modules/html-to-image/lib/embed-webfonts.js
		var require_embed_webfonts = /* @__PURE__ */ __commonJSMin(((exports) => {
			var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
				function adopt(value) {
					return value instanceof P ? value : new P(function(resolve) {
						resolve(value);
					});
				}
				return new (P || (P = Promise))(function(resolve, reject) {
					function fulfilled(value) {
						try {
							step(generator.next(value));
						} catch (e) {
							reject(e);
						}
					}
					function rejected(value) {
						try {
							step(generator["throw"](value));
						} catch (e) {
							reject(e);
						}
					}
					function step(result) {
						result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
					}
					step((generator = generator.apply(thisArg, _arguments || [])).next());
				});
			};
			var __generator = exports && exports.__generator || function(thisArg, body) {
				var _ = {
					label: 0,
					sent: function() {
						if (t[0] & 1) throw t[1];
						return t[1];
					},
					trys: [],
					ops: []
				}, f, y, t, g;
				return g = {
					next: verb(0),
					"throw": verb(1),
					"return": verb(2)
				}, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
					return this;
				}), g;
				function verb(n) {
					return function(v) {
						return step([n, v]);
					};
				}
				function step(op) {
					if (f) throw new TypeError("Generator is already executing.");
					while (g && (g = 0, op[0] && (_ = 0)), _) try {
						if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
						if (y = 0, t) op = [op[0] & 2, t.value];
						switch (op[0]) {
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
								op = [0];
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
						op = [6, e];
						y = 0;
					} finally {
						f = t = 0;
					}
					if (op[0] & 5) throw op[1];
					return {
						value: op[0] ? op[1] : void 0,
						done: true
					};
				}
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.embedWebFonts = exports.getWebFontCSS = void 0;
			var util_1 = require_util();
			var dataurl_1 = require_dataurl();
			var embed_resources_1 = require_embed_resources();
			var cssFetchCache = {};
			function fetchCSS(url) {
				return __awaiter(this, void 0, void 0, function() {
					var cache, res, cssText;
					return __generator(this, function(_a) {
						switch (_a.label) {
							case 0:
								cache = cssFetchCache[url];
								if (cache != null) return [2, cache];
								return [4, fetch(url)];
							case 1:
								res = _a.sent();
								return [4, res.text()];
							case 2:
								cssText = _a.sent();
								cache = {
									url,
									cssText
								};
								cssFetchCache[url] = cache;
								return [2, cache];
						}
					});
				});
			}
			function embedFonts(data, options) {
				return __awaiter(this, void 0, void 0, function() {
					var cssText, regexUrl, fontLocs, loadFonts;
					var _this = this;
					return __generator(this, function(_a) {
						cssText = data.cssText;
						regexUrl = /url\(["']?([^"')]+)["']?\)/g;
						fontLocs = cssText.match(/url\([^)]+\)/g) || [];
						loadFonts = fontLocs.map(function(loc) {
							return __awaiter(_this, void 0, void 0, function() {
								var url;
								return __generator(this, function(_a) {
									url = loc.replace(regexUrl, "$1");
									if (!url.startsWith("https://")) url = new URL(url, data.url).href;
									return [2, (0, dataurl_1.fetchAsDataURL)(url, options.fetchRequestInit, function(_a) {
										var result = _a.result;
										cssText = cssText.replace(loc, "url(".concat(result, ")"));
										return [loc, result];
									})];
								});
							});
						});
						return [2, Promise.all(loadFonts).then(function() {
							return cssText;
						})];
					});
				});
			}
			function parseCSS(source) {
				if (source == null) return [];
				var result = [];
				var cssText = source.replace(/(\/\*[\s\S]*?\*\/)/gi, "");
				var keyframesRegex = /* @__PURE__ */ new RegExp("((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})", "gi");
				while (true) {
					var matches = keyframesRegex.exec(cssText);
					if (matches === null) break;
					result.push(matches[0]);
				}
				cssText = cssText.replace(keyframesRegex, "");
				var importRegex = /@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi;
				var unifiedRegex = /* @__PURE__ */ new RegExp("((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})", "gi");
				while (true) {
					var matches = importRegex.exec(cssText);
					if (matches === null) {
						matches = unifiedRegex.exec(cssText);
						if (matches === null) break;
						else importRegex.lastIndex = unifiedRegex.lastIndex;
					} else unifiedRegex.lastIndex = importRegex.lastIndex;
					result.push(matches[0]);
				}
				return result;
			}
			function getCSSRules(styleSheets, options) {
				return __awaiter(this, void 0, void 0, function() {
					var ret, deferreds;
					return __generator(this, function(_a) {
						ret = [];
						deferreds = [];
						styleSheets.forEach(function(sheet) {
							if ("cssRules" in sheet) try {
								(0, util_1.toArray)(sheet.cssRules || []).forEach(function(item, index) {
									if (item.type === CSSRule.IMPORT_RULE) {
										var importIndex_1 = index + 1;
										var url = item.href;
										var deferred = fetchCSS(url).then(function(metadata) {
											return embedFonts(metadata, options);
										}).then(function(cssText) {
											return parseCSS(cssText).forEach(function(rule) {
												try {
													sheet.insertRule(rule, rule.startsWith("@import") ? importIndex_1 += 1 : sheet.cssRules.length);
												} catch (error) {
													console.error("Error inserting rule from remote css", {
														rule,
														error
													});
												}
											});
										}).catch(function(e) {
											console.error("Error loading remote css", e.toString());
										});
										deferreds.push(deferred);
									}
								});
							} catch (e) {
								var inline_1 = styleSheets.find(function(a) {
									return a.href == null;
								}) || document.styleSheets[0];
								if (sheet.href != null) deferreds.push(fetchCSS(sheet.href).then(function(metadata) {
									return embedFonts(metadata, options);
								}).then(function(cssText) {
									return parseCSS(cssText).forEach(function(rule) {
										inline_1.insertRule(rule, inline_1.cssRules.length);
									});
								}).catch(function(err) {
									console.error("Error loading remote stylesheet", err);
								}));
								console.error("Error inlining remote css file", e);
							}
						});
						return [2, Promise.all(deferreds).then(function() {
							styleSheets.forEach(function(sheet) {
								if ("cssRules" in sheet) try {
									(0, util_1.toArray)(sheet.cssRules || []).forEach(function(item) {
										ret.push(item);
									});
								} catch (e) {
									console.error("Error while reading CSS rules from ".concat(sheet.href), e);
								}
							});
							return ret;
						})];
					});
				});
			}
			function getWebFontRules(cssRules) {
				return cssRules.filter(function(rule) {
					return rule.type === CSSRule.FONT_FACE_RULE;
				}).filter(function(rule) {
					return (0, embed_resources_1.shouldEmbed)(rule.style.getPropertyValue("src"));
				});
			}
			function parseWebFontRules(node, options) {
				return __awaiter(this, void 0, void 0, function() {
					var styleSheets, cssRules;
					return __generator(this, function(_a) {
						switch (_a.label) {
							case 0:
								if (node.ownerDocument == null) throw new Error("Provided element is not within a Document");
								styleSheets = (0, util_1.toArray)(node.ownerDocument.styleSheets);
								return [4, getCSSRules(styleSheets, options)];
							case 1:
								cssRules = _a.sent();
								return [2, getWebFontRules(cssRules)];
						}
					});
				});
			}
			function normalizeFontFamily(font) {
				return font.trim().replace(/["']/g, "");
			}
			function getUsedFonts(node) {
				var fonts = /* @__PURE__ */ new Set();
				function traverse(node) {
					(node.style.fontFamily || getComputedStyle(node).fontFamily).split(",").forEach(function(font) {
						fonts.add(normalizeFontFamily(font));
					});
					Array.from(node.children).forEach(function(child) {
						if (child instanceof HTMLElement) traverse(child);
					});
				}
				traverse(node);
				return fonts;
			}
			function getWebFontCSS(node, options) {
				return __awaiter(this, void 0, void 0, function() {
					var rules, usedFonts, cssTexts;
					return __generator(this, function(_a) {
						switch (_a.label) {
							case 0: return [4, parseWebFontRules(node, options)];
							case 1:
								rules = _a.sent();
								usedFonts = getUsedFonts(node);
								return [4, Promise.all(rules.filter(function(rule) {
									return usedFonts.has(normalizeFontFamily(rule.style.fontFamily));
								}).map(function(rule) {
									var baseUrl = rule.parentStyleSheet ? rule.parentStyleSheet.href : null;
									return (0, embed_resources_1.embedResources)(rule.cssText, baseUrl, options);
								}))];
							case 2:
								cssTexts = _a.sent();
								return [2, cssTexts.join("\n")];
						}
					});
				});
			}
			exports.getWebFontCSS = getWebFontCSS;
			function embedWebFonts(clonedNode, options) {
				return __awaiter(this, void 0, void 0, function() {
					var cssText, _a, _b, styleNode, sytleContent;
					return __generator(this, function(_c) {
						switch (_c.label) {
							case 0:
								if (!(options.fontEmbedCSS != null)) return [3, 1];
								_a = options.fontEmbedCSS;
								return [3, 5];
							case 1:
								if (!options.skipFonts) return [3, 2];
								_b = null;
								return [3, 4];
							case 2: return [4, getWebFontCSS(clonedNode, options)];
							case 3:
								_b = _c.sent();
								_c.label = 4;
							case 4:
								_a = _b;
								_c.label = 5;
							case 5:
								cssText = _a;
								if (cssText) {
									styleNode = document.createElement("style");
									sytleContent = document.createTextNode(cssText);
									styleNode.appendChild(sytleContent);
									if (clonedNode.firstChild) clonedNode.insertBefore(styleNode, clonedNode.firstChild);
									else clonedNode.appendChild(styleNode);
								}
								return [2];
						}
					});
				});
			}
			exports.embedWebFonts = embedWebFonts;
		}));
		//#endregion
		//#region src/client/settings.ts
		var import_lib = (/* @__PURE__ */ __commonJSMin(((exports) => {
			var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
				function adopt(value) {
					return value instanceof P ? value : new P(function(resolve) {
						resolve(value);
					});
				}
				return new (P || (P = Promise))(function(resolve, reject) {
					function fulfilled(value) {
						try {
							step(generator.next(value));
						} catch (e) {
							reject(e);
						}
					}
					function rejected(value) {
						try {
							step(generator["throw"](value));
						} catch (e) {
							reject(e);
						}
					}
					function step(result) {
						result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
					}
					step((generator = generator.apply(thisArg, _arguments || [])).next());
				});
			};
			var __generator = exports && exports.__generator || function(thisArg, body) {
				var _ = {
					label: 0,
					sent: function() {
						if (t[0] & 1) throw t[1];
						return t[1];
					},
					trys: [],
					ops: []
				}, f, y, t, g;
				return g = {
					next: verb(0),
					"throw": verb(1),
					"return": verb(2)
				}, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
					return this;
				}), g;
				function verb(n) {
					return function(v) {
						return step([n, v]);
					};
				}
				function step(op) {
					if (f) throw new TypeError("Generator is already executing.");
					while (g && (g = 0, op[0] && (_ = 0)), _) try {
						if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
						if (y = 0, t) op = [op[0] & 2, t.value];
						switch (op[0]) {
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
								op = [0];
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
						op = [6, e];
						y = 0;
					} finally {
						f = t = 0;
					}
					if (op[0] & 5) throw op[1];
					return {
						value: op[0] ? op[1] : void 0,
						done: true
					};
				}
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.getFontEmbedCSS = exports.toBlob = exports.toJpeg = exports.toPng = exports.toPixelData = exports.toCanvas = exports.toSvg = void 0;
			var clone_node_1 = require_clone_node();
			var embed_images_1 = require_embed_images();
			var apply_style_1 = require_apply_style();
			var embed_webfonts_1 = require_embed_webfonts();
			var util_1 = require_util();
			function toSvg(node, options) {
				if (options === void 0) options = {};
				return __awaiter(this, void 0, void 0, function() {
					var _a, width, height, clonedNode, datauri;
					return __generator(this, function(_b) {
						switch (_b.label) {
							case 0:
								_a = (0, util_1.getImageSize)(node, options), width = _a.width, height = _a.height;
								return [4, (0, clone_node_1.cloneNode)(node, options, true)];
							case 1:
								clonedNode = _b.sent();
								return [4, (0, embed_webfonts_1.embedWebFonts)(clonedNode, options)];
							case 2:
								_b.sent();
								return [4, (0, embed_images_1.embedImages)(clonedNode, options)];
							case 3:
								_b.sent();
								(0, apply_style_1.applyStyle)(clonedNode, options);
								return [4, (0, util_1.nodeToDataURL)(clonedNode, width, height)];
							case 4:
								datauri = _b.sent();
								return [2, datauri];
						}
					});
				});
			}
			exports.toSvg = toSvg;
			function toCanvas(node, options) {
				if (options === void 0) options = {};
				return __awaiter(this, void 0, void 0, function() {
					var _a, width, height, svg, img, canvas, context, ratio, canvasWidth, canvasHeight;
					return __generator(this, function(_b) {
						switch (_b.label) {
							case 0:
								_a = (0, util_1.getImageSize)(node, options), width = _a.width, height = _a.height;
								return [4, toSvg(node, options)];
							case 1:
								svg = _b.sent();
								return [4, (0, util_1.createImage)(svg)];
							case 2:
								img = _b.sent();
								canvas = document.createElement("canvas");
								context = canvas.getContext("2d");
								ratio = options.pixelRatio || (0, util_1.getPixelRatio)();
								canvasWidth = options.canvasWidth || width;
								canvasHeight = options.canvasHeight || height;
								canvas.width = canvasWidth * ratio;
								canvas.height = canvasHeight * ratio;
								if (!options.skipAutoScale) (0, util_1.checkCanvasDimensions)(canvas);
								canvas.style.width = "".concat(canvasWidth);
								canvas.style.height = "".concat(canvasHeight);
								if (options.backgroundColor) {
									context.fillStyle = options.backgroundColor;
									context.fillRect(0, 0, canvas.width, canvas.height);
								}
								context.drawImage(img, 0, 0, canvas.width, canvas.height);
								return [2, canvas];
						}
					});
				});
			}
			exports.toCanvas = toCanvas;
			function toPixelData(node, options) {
				if (options === void 0) options = {};
				return __awaiter(this, void 0, void 0, function() {
					var _a, width, height, canvas, ctx;
					return __generator(this, function(_b) {
						switch (_b.label) {
							case 0:
								_a = (0, util_1.getImageSize)(node, options), width = _a.width, height = _a.height;
								return [4, toCanvas(node, options)];
							case 1:
								canvas = _b.sent();
								ctx = canvas.getContext("2d");
								return [2, ctx.getImageData(0, 0, width, height).data];
						}
					});
				});
			}
			exports.toPixelData = toPixelData;
			function toPng(node, options) {
				if (options === void 0) options = {};
				return __awaiter(this, void 0, void 0, function() {
					var canvas;
					return __generator(this, function(_a) {
						switch (_a.label) {
							case 0: return [4, toCanvas(node, options)];
							case 1:
								canvas = _a.sent();
								return [2, canvas.toDataURL()];
						}
					});
				});
			}
			exports.toPng = toPng;
			function toJpeg(node, options) {
				if (options === void 0) options = {};
				return __awaiter(this, void 0, void 0, function() {
					var canvas;
					return __generator(this, function(_a) {
						switch (_a.label) {
							case 0: return [4, toCanvas(node, options)];
							case 1:
								canvas = _a.sent();
								return [2, canvas.toDataURL("image/jpeg", options.quality || 1)];
						}
					});
				});
			}
			exports.toJpeg = toJpeg;
			function toBlob(node, options) {
				if (options === void 0) options = {};
				return __awaiter(this, void 0, void 0, function() {
					var canvas, blob;
					return __generator(this, function(_a) {
						switch (_a.label) {
							case 0: return [4, toCanvas(node, options)];
							case 1:
								canvas = _a.sent();
								return [4, (0, util_1.canvasToBlob)(canvas)];
							case 2:
								blob = _a.sent();
								return [2, blob];
						}
					});
				});
			}
			exports.toBlob = toBlob;
			function getFontEmbedCSS(node, options) {
				if (options === void 0) options = {};
				return __awaiter(this, void 0, void 0, function() {
					return __generator(this, function(_a) {
						return [2, (0, embed_webfonts_1.getWebFontCSS)(node, options)];
					});
				});
			}
			exports.getFontEmbedCSS = getFontEmbedCSS;
		})))();
		const WIDTH_PRESETS = {
			phone: 375,
			tablet: 768,
			desktop: 1024
		};
		const FONT_SIZE_PRESETS = {
			normal: 16,
			large: 18,
			xlarge: 20
		};
		const DEFAULT_SHARE_SETTINGS = {
			width: "tablet",
			fontSize: "normal",
			hideProcess: false
		};
		const WIDTH_STORAGE_KEY = "dsh-share.width";
		const FONT_SIZE_STORAGE_KEY = "dsh-share.font-size";
		const HIDE_PROCESS_STORAGE_KEY = "dsh-share.hide-process";
		const WIDTH_VALUES = /* @__PURE__ */ new Set([
			"phone",
			"tablet",
			"desktop"
		]);
		const FONT_SIZE_VALUES = /* @__PURE__ */ new Set([
			"normal",
			"large",
			"xlarge"
		]);
		/** 读取失败时回到默认值，避免隐私模式下 localStorage 异常阻断分享功能。 */
		function loadShareSettings(storage) {
			if (!storage) return { ...DEFAULT_SHARE_SETTINGS };
			try {
				const width = storage.getItem(WIDTH_STORAGE_KEY);
				const fontSize = storage.getItem(FONT_SIZE_STORAGE_KEY);
				const hideProcess = storage.getItem(HIDE_PROCESS_STORAGE_KEY);
				return {
					width: width !== null && WIDTH_VALUES.has(width) ? width : DEFAULT_SHARE_SETTINGS.width,
					fontSize: fontSize !== null && FONT_SIZE_VALUES.has(fontSize) ? fontSize : DEFAULT_SHARE_SETTINGS.fontSize,
					hideProcess: hideProcess === "true"
				};
			} catch {
				return { ...DEFAULT_SHARE_SETTINGS };
			}
		}
		function saveShareSettings(storage, settings) {
			if (!storage) return;
			try {
				storage.setItem(WIDTH_STORAGE_KEY, settings.width);
				storage.setItem(FONT_SIZE_STORAGE_KEY, settings.fontSize);
				storage.setItem(HIDE_PROCESS_STORAGE_KEY, String(settings.hideProcess));
			} catch {}
		}
		//#endregion
		//#region src/client/card.ts
		function applyStyles(element, styles) {
			Object.assign(element.style, styles);
		}
		function normalizeText(text) {
			return text?.replace(/\s+/g, " ").trim() ?? "";
		}
		/** 把摘要行里的交互控件转为静态元素，同时保留当前运行时的 class 和图标。 */
		function makeToolSummaryStatic(row) {
			for (const button of row.querySelectorAll("button")) {
				const replacement = row.ownerDocument.createElement("span");
				for (const attribute of button.attributes) if (attribute.name === "class" || attribute.name === "style" || attribute.name.startsWith("data-")) replacement.setAttribute(attribute.name, attribute.value);
				replacement.append(...button.childNodes);
				button.replaceWith(replacement);
			}
			for (const control of row.querySelectorAll("input, textarea, select, [role=\"tooltip\"]")) control.remove();
			for (const element of [row, ...row.querySelectorAll("*")]) {
				element.removeAttribute("aria-expanded");
				element.removeAttribute("data-expandable");
				element.removeAttribute("role");
				element.removeAttribute("tabindex");
			}
		}
		/**
		* 工具卡片内部可能包含展开面板和终端输出；这里只克隆原生折叠摘要行。
		* 摘要的运行时 class、图标和内容结构会被保留，不依赖写死的 CSS Module 类名。
		*/
		function cloneToolCallSummary(source, locale) {
			const clone = source.ownerDocument.createElement("div");
			clone.dataset.dshShareMessage = "";
			clone.dataset.dshShareToolCall = "";
			const summaryRows = source.querySelectorAll("[data-disclosure-row], [data-sample=\"bash\"]");
			for (const summary of summaryRows) {
				if (!normalizeText(summary.textContent)) continue;
				const row = summary.cloneNode(true);
				row.dataset.dshShareToolSummary = "";
				makeToolSummaryStatic(row);
				clone.append(row);
			}
			if (clone.childElementCount === 0) {
				const fallback = source.ownerDocument.createElement("div");
				fallback.dataset.dshShareToolSummary = "";
				fallback.textContent = locale === "zh" ? "工具调用" : "Tool call";
				clone.append(fallback);
			}
			applyStyles(clone, {
				boxSizing: "border-box",
				margin: "0",
				maxWidth: "none",
				width: "100%"
			});
			return clone;
		}
		function cloneShareMessage(source, locale, hideReasoning = false) {
			if (source.dataset.chatFlowKind === "tool-call") return cloneToolCallSummary(source, locale);
			const clone = source.cloneNode(true);
			clone.dataset.dshShareMessage = "";
			if (hideReasoning) for (const reasoning of clone.querySelectorAll("[data-variant=\"think\"]")) reasoning.remove();
			for (const hoverRoot of clone.querySelectorAll("[data-time-hover-root]")) {
				const last = hoverRoot.lastElementChild;
				if (last?.querySelector("button")) last.remove();
			}
			for (const element of clone.querySelectorAll("button, input, textarea, select, [data-dsh-share-button], [role=\"tooltip\"]")) element.remove();
			clone.removeAttribute("data-chat-anchor-key");
			clone.removeAttribute("data-chat-flow-key");
			clone.removeAttribute("data-chat-flow-kind");
			applyStyles(clone, {
				boxSizing: "border-box",
				margin: "0",
				maxWidth: "none",
				width: "100%"
			});
			return clone;
		}
		/** 与图片和 Markdown 共用的回答过程过滤规则。 */
		function visibleAssistantElements(elements, hideProcess) {
			return hideProcess ? elements.filter((element) => element.dataset.chatFlowKind === "assistant-step").slice(-1) : [...elements];
		}
		function createBrandWordmark(document) {
			const container = document.createElement("div");
			container.dataset.dshShareWordmark = "";
			applyStyles(container, {
				alignItems: "center",
				color: "var(--dsw-alias-label-primary, #111827)",
				display: "inline-flex",
				height: "18px",
				justifyContent: "center"
			});
			const source = [...document.querySelectorAll("svg")].find((svg) => svg.getAttribute("viewBox") === "0 0 182 24");
			if (source) {
				const invertedColor = document.defaultView?.getComputedStyle(source).getPropertyValue("--dsw-alias-label-primary-inverted").trim();
				container.style.setProperty("--dsw-alias-label-primary-inverted", invertedColor || "#fff");
				const wordmark = source.cloneNode(true);
				wordmark.removeAttribute("class");
				wordmark.setAttribute("width", "137");
				wordmark.setAttribute("height", "18");
				wordmark.setAttribute("aria-hidden", "true");
				wordmark.style.display = "block";
				container.append(wordmark);
				return container;
			}
			container.innerHTML = `
    <svg aria-hidden="true" fill="none" height="13" viewBox="0 0 23.16 17.04" width="18">
      <path d="M22.9168 1.43018C22.6713 1.31018 22.5658 1.53918 22.4223 1.65519C22.3733 1.69269 22.3318 1.74169 22.2903 1.78669C21.9317 2.1697 21.5127 2.42121 20.9657 2.39121C20.1657 2.34621 19.4827 2.59771 18.8787 3.20973C18.7502 2.45521 18.3236 2.0047 17.6746 1.71569C17.3351 1.56568 16.9916 1.41518 16.7536 1.08867C16.5876 0.856163 16.5421 0.597155 16.4591 0.341647C16.4061 0.187643 16.3536 0.0301382 16.1761 0.00363739C15.9836 -0.0263635 15.9081 0.135141 15.8326 0.270145C15.5306 0.822162 15.4136 1.43018 15.4251 2.0462C15.4516 3.43174 16.0366 4.53527 17.1991 5.3203C17.3311 5.4103 17.3651 5.5003 17.3236 5.63181C17.2441 5.90231 17.1501 6.16482 17.0671 6.43533C17.0141 6.60784 16.9351 6.64584 16.7501 6.57033C16.1121 6.30383 15.5611 5.90931 15.074 5.4328C14.2475 4.63328 13.5 3.75075 12.568 3.05973C12.349 2.89822 12.13 2.74822 11.9034 2.60522C10.9524 1.68169 12.028 0.923165 12.277 0.833162C12.5375 0.739159 12.3675 0.41615 11.5259 0.42015C10.6844 0.42365 9.91439 0.705658 8.93286 1.08117C8.78935 1.13767 8.63835 1.17867 8.48384 1.21267C7.59332 1.04367 6.66829 1.00617 5.70226 1.11517C3.88321 1.31768 2.43016 2.1777 1.36213 3.64575C0.0790928 5.4103 -0.222916 7.41536 0.146595 9.50642C0.535106 11.7105 1.66014 13.535 3.38869 14.9616C5.18125 16.4406 7.24581 17.1657 9.60138 17.0266C11.0319 16.9441 12.6245 16.7526 14.421 15.2321C14.874 15.4576 15.3496 15.5476 16.1381 15.6151C16.7456 15.6716 17.3306 15.5851 17.7836 15.4911C18.4931 15.3411 18.4441 14.6841 18.1876 14.5636C16.1081 13.595 16.5646 13.9891 16.1496 13.67C17.2061 12.42 18.8202 10.1979 19.3182 7.17235C19.3672 6.83834 19.4297 6.36783 19.4222 6.09732C19.4182 5.93231 19.4562 5.86831 19.6447 5.84931C20.1657 5.78931 20.6712 5.64681 21.1357 5.3913C22.4833 4.65528 23.0268 3.44624 23.1548 1.9972C23.1738 1.77569 23.1508 1.54668 22.9168 1.43018ZM11.1749 14.4736C9.15936 12.889 8.18184 12.3675 7.77832 12.39C7.40081 12.4125 7.46881 12.8445 7.55182 13.126C7.63882 13.404 7.75182 13.5955 7.91033 13.8396C8.01983 14.0011 8.09533 14.2411 7.80083 14.4216C7.15181 14.8231 6.02327 14.2866 5.97027 14.2601C4.65673 13.4865 3.5587 12.4655 2.78467 11.069C2.03715 9.72493 1.60314 8.28289 1.53164 6.74384C1.51264 6.37233 1.62214 6.24082 1.99215 6.17332C2.47916 6.08332 2.98118 6.06432 3.46769 6.13582C5.52476 6.43633 7.27581 7.35586 8.74385 8.8129C9.58188 9.64243 10.2159 10.634 10.8689 11.6025C11.5634 12.631 12.3105 13.611 13.262 14.4146C13.598 14.6961 13.866 14.9101 14.1225 15.0681C13.349 15.1546 12.058 15.1731 11.1749 14.4746L11.1749 14.4736ZM12.141 8.25988C12.141 8.09488 12.273 7.96338 12.439 7.96338C12.4765 7.96338 12.5105 7.97088 12.541 7.98188C12.5825 7.99688 12.6205 8.01938 12.6505 8.05338C12.7035 8.10588 12.7335 8.18088 12.7335 8.25988C12.7335 8.42489 12.6015 8.55639 12.4355 8.55639C12.2695 8.55639 12.141 8.42489 12.141 8.25988ZM15.1415 9.79893C14.949 9.87793 14.7565 9.94544 14.5715 9.95294C14.2845 9.96794 13.9715 9.85143 13.8015 9.70893C13.5375 9.48742 13.3485 9.36342 13.2695 8.97691C13.2355 8.8119 13.2545 8.55639 13.2845 8.40989C13.3525 8.09438 13.277 7.89187 13.0545 7.70787C12.8735 7.55786 12.643 7.51636 12.39 7.51636C12.2955 7.51636 12.209 7.47486 12.1445 7.44136C12.039 7.38886 11.9519 7.25735 12.035 7.09585C12.0615 7.04335 12.19 6.91584 12.22 6.89334C12.5635 6.69784 12.9595 6.76184 13.326 6.90834C13.6655 7.04735 13.9225 7.30236 14.292 7.66287C14.6695 8.09838 14.7375 8.21838 14.9525 8.54539C15.1225 8.8009 15.277 9.06341 15.3831 9.36392C15.4471 9.55142 15.3641 9.70493 15.1415 9.79893Z" fill="currentColor"/>
    </svg>
    <span style="font-size:14px;font-weight:650;letter-spacing:-.02em">deepseek</span>
    <span style="background:currentColor;border-radius:2px;color:var(--dsw-alias-label-primary-inverted,#fff);font-size:8px;font-weight:700;letter-spacing:.08em;padding:1px 4px">HARNESS</span>`;
			applyStyles(container, { gap: "6px" });
			return container;
		}
		function createShareCard(document, messages, locale, settings = DEFAULT_SHARE_SETTINGS) {
			const host = document.createElement("div");
			host.dataset.dshShareCardHost = "";
			applyStyles(host, {
				left: "-100000px",
				position: "fixed",
				top: "0",
				zIndex: "-1"
			});
			const card = document.createElement("article");
			card.dataset.dshShareCard = "";
			card.style.setProperty("--dsh-share-font-size", `${FONT_SIZE_PRESETS[settings.fontSize]}px`);
			applyStyles(card, {
				background: "var(--dsw-alias-bg-base, #f7f8fa)",
				boxSizing: "border-box",
				color: "var(--dsw-alias-label-primary, #111827)",
				fontFamily: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", \"PingFang SC\", \"Microsoft YaHei\", sans-serif",
				overflowWrap: "anywhere",
				padding: "28px 24px 24px",
				width: `${WIDTH_PRESETS[settings.width]}px`,
				wordBreak: "break-word"
			});
			for (const [index, message] of messages.entries()) {
				if (message.omittedBefore > 0) {
					const omission = document.createElement("div");
					omission.dataset.dshShareOmission = "";
					omission.textContent = "···";
					applyStyles(omission, {
						color: "var(--dsw-alias-label-tertiary, #9ca3af)",
						fontSize: "18px",
						letterSpacing: "8px",
						margin: "30px 0",
						textAlign: "center"
					});
					card.append(omission);
				}
				const messageSection = document.createElement("section");
				messageSection.dataset.dshShareMessageGroup = message.role;
				messageSection.dataset.dshShareTurn = String(message.turn);
				if (index > 0 && message.omittedBefore === 0) {
					const previous = messages[index - 1];
					applyStyles(messageSection, {
						borderTop: previous?.turn === message.turn ? "0" : "1px solid var(--dsw-alias-line-border, rgba(127, 127, 127, 0.16))",
						marginTop: "30px",
						paddingTop: previous?.turn === message.turn ? "0" : "30px"
					});
				}
				const visible = message.role === "assistant" ? visibleAssistantElements(message.elements, settings.hideProcess) : message.elements;
				for (const element of visible) messageSection.append(cloneShareMessage(element, locale, message.role === "assistant" && settings.hideProcess));
				card.append(messageSection);
			}
			const footer = document.createElement("footer");
			footer.append(createBrandWordmark(document));
			applyStyles(footer, {
				alignItems: "center",
				borderTop: "1px solid var(--dsw-alias-line-border, rgba(127, 127, 127, 0.2))",
				display: "flex",
				justifyContent: "center",
				marginTop: "30px",
				paddingTop: "14px"
			});
			card.append(footer);
			host.append(card);
			document.body.append(host);
			return {
				element: card,
				dispose: () => host.remove()
			};
		}
		//#endregion
		//#region src/client/content.ts
		/** 始终按会话顺序输出；一轮问答拆成连续的用户与回答消息供渲染器使用。 */
		function selectedTurnsToShareMessages(selected) {
			const ordered = [...selected].sort((left, right) => left.turn - right.turn);
			return ordered.flatMap((item, index) => {
				const previous = ordered[index - 1];
				const messages = turnToShareMessages(item.content, item.turn);
				messages[0].omittedBefore = previous === void 0 ? 0 : Math.max(0, item.turn - previous.turn - 1);
				return messages;
			});
		}
		/** 一轮问答转成连续的“用户消息 + 回答消息”渲染模型。 */
		function turnToShareMessages(content, turn) {
			return [{
				elements: content.prompts,
				omittedBefore: 0,
				order: turn * 2,
				role: "user",
				turn
			}, {
				elements: content.answers,
				omittedBefore: 0,
				order: turn * 2 + 1,
				role: "assistant",
				turn
			}];
		}
		//#endregion
		//#region src/client/dom.ts
		const TURN_TAIL_SELECTOR = "[data-turn-tail]";
		const TURN_FLOW_SELECTOR = "[data-chat-flow-kind=\"turn-tail\"]";
		/** 立即克隆消息节点，后续滚动卸载原 DOM 也不会影响导出。 */
		function snapshotElements(elements) {
			return elements.map((element) => element.cloneNode(true));
		}
		/**
		* 在用户勾选一轮时立即保存消息节点，避免后续滚动加载或视图切换影响导出内容。
		* tail 保留原节点引用，只用于判断会话顺序；真正渲染的问答均使用脱离页面的副本。
		*/
		function snapshotTurnContent(content) {
			return {
				prompts: snapshotElements(content.prompts),
				answers: snapshotElements(content.answers),
				tail: content.tail
			};
		}
		/**
		* 这里集中保存当前 DSH 页面结构的假设，方便上游 DOM 调整后只改一个地方。
		* 从 turn-tail 向前回溯到本轮 user 节点，同时收集 assistant-step、tool-call 和中途 steering。
		*/
		function findTurnContent(tail) {
			const flowTail = tail.closest(TURN_FLOW_SELECTOR);
			if (!flowTail) return void 0;
			const prompts = [];
			const answers = [];
			let sibling = flowTail.previousElementSibling;
			let foundStart = false;
			while (sibling instanceof HTMLElement) {
				const kind = sibling.dataset.chatFlowKind;
				if (kind === "assistant-step" || kind === "tool-call") answers.unshift(sibling);
				else if (kind === "steering") prompts.unshift(sibling);
				else if (kind === "user") {
					prompts.unshift(sibling);
					foundStart = true;
					break;
				} else if (kind === "turn-tail") break;
				sibling = sibling.previousElementSibling;
			}
			if (!foundStart || prompts.length === 0 || answers.length === 0) return void 0;
			return {
				prompts,
				answers,
				tail
			};
		}
		/** 从官方 assistant-actions 插槽渲染的按钮定位并收集当前轮内容。 */
		function findTurnContentFromAction(action) {
			const tail = action.closest(TURN_TAIL_SELECTOR);
			return tail ? findTurnContent(tail) : void 0;
		}
		/** 收集当前会话页面中已经渲染并完成的轮次，按 DSH 原始 turn 排序。 */
		function findRenderedTurns(root) {
			return [...root.querySelectorAll(TURN_TAIL_SELECTOR)].map((tail) => {
				const turn = Number(tail.dataset.turnTail);
				if (!Number.isFinite(turn)) return void 0;
				const content = findTurnContent(tail);
				return content ? {
					content,
					turn
				} : void 0;
			}).filter((item) => item !== void 0).sort((left, right) => left.turn - right.turn);
		}
		//#endregion
		//#region node_modules/turndown/lib/turndown.cjs.js
		var require_turndown_cjs = /* @__PURE__ */ __commonJSMin(((exports, module) => {
			function extend(destination) {
				for (var i = 1; i < arguments.length; i++) {
					var source = arguments[i];
					for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) destination[key] = source[key];
				}
				return destination;
			}
			function repeat(character, count) {
				return Array(count + 1).join(character);
			}
			function trimLeadingNewlines(string) {
				return string.replace(/^\n*/, "");
			}
			function trimTrailingNewlines(string) {
				var indexEnd = string.length;
				while (indexEnd > 0 && string[indexEnd - 1] === "\n") indexEnd--;
				return string.substring(0, indexEnd);
			}
			function trimNewlines(string) {
				return trimTrailingNewlines(trimLeadingNewlines(string));
			}
			var blockElements = [
				"ADDRESS",
				"ARTICLE",
				"ASIDE",
				"AUDIO",
				"BLOCKQUOTE",
				"BODY",
				"CANVAS",
				"CENTER",
				"DD",
				"DIR",
				"DIV",
				"DL",
				"DT",
				"FIELDSET",
				"FIGCAPTION",
				"FIGURE",
				"FOOTER",
				"FORM",
				"FRAMESET",
				"H1",
				"H2",
				"H3",
				"H4",
				"H5",
				"H6",
				"HEADER",
				"HGROUP",
				"HR",
				"HTML",
				"ISINDEX",
				"LI",
				"MAIN",
				"MENU",
				"NAV",
				"NOFRAMES",
				"NOSCRIPT",
				"OL",
				"OUTPUT",
				"P",
				"PRE",
				"SECTION",
				"TABLE",
				"TBODY",
				"TD",
				"TFOOT",
				"TH",
				"THEAD",
				"TR",
				"UL"
			];
			function isBlock(node) {
				return is(node, blockElements);
			}
			var voidElements = [
				"AREA",
				"BASE",
				"BR",
				"COL",
				"COMMAND",
				"EMBED",
				"HR",
				"IMG",
				"INPUT",
				"KEYGEN",
				"LINK",
				"META",
				"PARAM",
				"SOURCE",
				"TRACK",
				"WBR"
			];
			function isVoid(node) {
				return is(node, voidElements);
			}
			function hasVoid(node) {
				return has(node, voidElements);
			}
			var meaningfulWhenBlankElements = [
				"A",
				"TABLE",
				"THEAD",
				"TBODY",
				"TFOOT",
				"TH",
				"TD",
				"IFRAME",
				"SCRIPT",
				"AUDIO",
				"VIDEO"
			];
			function isMeaningfulWhenBlank(node) {
				return is(node, meaningfulWhenBlankElements);
			}
			function hasMeaningfulWhenBlank(node) {
				return has(node, meaningfulWhenBlankElements);
			}
			function is(node, tagNames) {
				return tagNames.indexOf(node.nodeName) >= 0;
			}
			function has(node, tagNames) {
				return node.getElementsByTagName && tagNames.some(function(tagName) {
					return node.getElementsByTagName(tagName).length;
				});
			}
			var markdownEscapes = [
				[/\\/g, "\\\\"],
				[/\*/g, "\\*"],
				[/^-/g, "\\-"],
				[/^\+ /g, "\\+ "],
				[/^(=+)/g, "\\$1"],
				[/^(#{1,6}) /g, "\\$1 "],
				[/`/g, "\\`"],
				[/^~~~/g, "\\~~~"],
				[/\[/g, "\\["],
				[/\]/g, "\\]"],
				[/^>/g, "\\>"],
				[/_/g, "\\_"],
				[/^(\d+)\. /g, "$1\\. "]
			];
			function escapeMarkdown(string) {
				return markdownEscapes.reduce(function(accumulator, escape) {
					return accumulator.replace(escape[0], escape[1]);
				}, string);
			}
			var rules = {};
			rules.paragraph = {
				filter: "p",
				replacement: function(content) {
					return "\n\n" + content + "\n\n";
				}
			};
			rules.lineBreak = {
				filter: "br",
				replacement: function(content, node, options) {
					return options.br + "\n";
				}
			};
			rules.heading = {
				filter: [
					"h1",
					"h2",
					"h3",
					"h4",
					"h5",
					"h6"
				],
				replacement: function(content, node, options) {
					var hLevel = Number(node.nodeName.charAt(1));
					if (options.headingStyle === "setext" && hLevel < 3) {
						var underline = repeat(hLevel === 1 ? "=" : "-", content.length);
						return "\n\n" + content + "\n" + underline + "\n\n";
					} else return "\n\n" + repeat("#", hLevel) + " " + content + "\n\n";
				}
			};
			rules.blockquote = {
				filter: "blockquote",
				replacement: function(content) {
					content = trimNewlines(content).replace(/^/gm, "> ");
					return "\n\n" + content + "\n\n";
				}
			};
			rules.list = {
				filter: ["ul", "ol"],
				replacement: function(content, node) {
					var parent = node.parentNode;
					if (parent.nodeName === "LI" && parent.lastElementChild === node) return "\n" + content;
					else return "\n\n" + content + "\n\n";
				}
			};
			rules.listItem = {
				filter: "li",
				replacement: function(content, node, options) {
					var prefix = options.bulletListMarker + "   ";
					var parent = node.parentNode;
					if (parent.nodeName === "OL") {
						var start = parent.getAttribute("start");
						var index = Array.prototype.indexOf.call(parent.children, node);
						prefix = (start ? Number(start) + index : index + 1) + ".  ";
					}
					var isParagraph = /\n$/.test(content);
					content = trimNewlines(content) + (isParagraph ? "\n" : "");
					content = content.replace(/\n/gm, "\n" + " ".repeat(prefix.length));
					return prefix + content + (node.nextSibling ? "\n" : "");
				}
			};
			rules.indentedCodeBlock = {
				filter: function(node, options) {
					return options.codeBlockStyle === "indented" && node.nodeName === "PRE" && node.firstChild && node.firstChild.nodeName === "CODE";
				},
				replacement: function(content, node, options) {
					return "\n\n    " + node.firstChild.textContent.replace(/\n/g, "\n    ") + "\n\n";
				}
			};
			rules.fencedCodeBlock = {
				filter: function(node, options) {
					return options.codeBlockStyle === "fenced" && node.nodeName === "PRE" && node.firstChild && node.firstChild.nodeName === "CODE";
				},
				replacement: function(content, node, options) {
					var language = ((node.firstChild.getAttribute("class") || "").match(/language-(\S+)/) || [null, ""])[1];
					var code = node.firstChild.textContent;
					var fenceChar = options.fence.charAt(0);
					var fenceSize = 3;
					var fenceInCodeRegex = new RegExp("^" + fenceChar + "{3,}", "gm");
					var match;
					while (match = fenceInCodeRegex.exec(code)) if (match[0].length >= fenceSize) fenceSize = match[0].length + 1;
					var fence = repeat(fenceChar, fenceSize);
					return "\n\n" + fence + language + "\n" + code.replace(/\n$/, "") + "\n" + fence + "\n\n";
				}
			};
			rules.horizontalRule = {
				filter: "hr",
				replacement: function(content, node, options) {
					return "\n\n" + options.hr + "\n\n";
				}
			};
			rules.inlineLink = {
				filter: function(node, options) {
					return options.linkStyle === "inlined" && node.nodeName === "A" && node.getAttribute("href");
				},
				replacement: function(content, node) {
					var href = escapeLinkDestination(node.getAttribute("href"));
					var title = escapeLinkTitle(cleanAttribute(node.getAttribute("title")));
					var titlePart = title ? " \"" + title + "\"" : "";
					return "[" + content + "](" + href + titlePart + ")";
				}
			};
			rules.referenceLink = {
				filter: function(node, options) {
					return options.linkStyle === "referenced" && node.nodeName === "A" && node.getAttribute("href");
				},
				replacement: function(content, node, options) {
					var href = escapeLinkDestination(node.getAttribute("href"));
					var title = cleanAttribute(node.getAttribute("title"));
					if (title) title = " \"" + escapeLinkTitle(title) + "\"";
					var replacement;
					var reference;
					switch (options.linkReferenceStyle) {
						case "collapsed":
							replacement = "[" + content + "][]";
							reference = "[" + content + "]: " + href + title;
							break;
						case "shortcut":
							replacement = "[" + content + "]";
							reference = "[" + content + "]: " + href + title;
							break;
						default:
							var id = this.references.length + 1;
							replacement = "[" + content + "][" + id + "]";
							reference = "[" + id + "]: " + href + title;
					}
					this.references.push(reference);
					return replacement;
				},
				references: [],
				append: function(options) {
					var references = "";
					if (this.references.length) {
						references = "\n\n" + this.references.join("\n") + "\n\n";
						this.references = [];
					}
					return references;
				}
			};
			rules.emphasis = {
				filter: ["em", "i"],
				replacement: function(content, node, options) {
					if (!content.trim()) return "";
					return options.emDelimiter + content + options.emDelimiter;
				}
			};
			rules.strong = {
				filter: ["strong", "b"],
				replacement: function(content, node, options) {
					if (!content.trim()) return "";
					return options.strongDelimiter + content + options.strongDelimiter;
				}
			};
			rules.code = {
				filter: function(node) {
					var hasSiblings = node.previousSibling || node.nextSibling;
					var isCodeBlock = node.parentNode.nodeName === "PRE" && !hasSiblings;
					return node.nodeName === "CODE" && !isCodeBlock;
				},
				replacement: function(content) {
					if (!content) return "";
					content = content.replace(/\r?\n|\r/g, " ");
					var extraSpace = /^`|^ .*?[^ ].* $|`$/.test(content) ? " " : "";
					var delimiter = "`";
					var matches = content.match(/`+/gm) || [];
					while (matches.indexOf(delimiter) !== -1) delimiter = delimiter + "`";
					return delimiter + extraSpace + content + extraSpace + delimiter;
				}
			};
			rules.image = {
				filter: "img",
				replacement: function(content, node) {
					var alt = escapeMarkdown(cleanAttribute(node.getAttribute("alt")));
					var src = escapeLinkDestination(node.getAttribute("src") || "");
					var title = cleanAttribute(node.getAttribute("title"));
					var titlePart = title ? " \"" + escapeLinkTitle(title) + "\"" : "";
					return src ? "![" + alt + "](" + src + titlePart + ")" : "";
				}
			};
			function cleanAttribute(attribute) {
				return attribute ? attribute.replace(/(\n+\s*)+/g, "\n") : "";
			}
			function escapeLinkDestination(destination) {
				var escaped = destination.replace(/([<>()])/g, "\\$1");
				return escaped.indexOf(" ") >= 0 ? "<" + escaped + ">" : escaped;
			}
			function escapeLinkTitle(title) {
				return title.replace(/"/g, "\\\"");
			}
			/**
			* Manages a collection of rules used to convert HTML to Markdown
			*/
			function Rules(options) {
				this.options = options;
				this._keep = [];
				this._remove = [];
				this.blankRule = { replacement: options.blankReplacement };
				this.keepReplacement = options.keepReplacement;
				this.defaultRule = { replacement: options.defaultReplacement };
				this.array = [];
				for (var key in options.rules) this.array.push(options.rules[key]);
			}
			Rules.prototype = {
				add: function(key, rule) {
					this.array.unshift(rule);
				},
				keep: function(filter) {
					this._keep.unshift({
						filter,
						replacement: this.keepReplacement
					});
				},
				remove: function(filter) {
					this._remove.unshift({
						filter,
						replacement: function() {
							return "";
						}
					});
				},
				forNode: function(node) {
					if (node.isBlank) return this.blankRule;
					var rule;
					if (rule = findRule(this.array, node, this.options)) return rule;
					if (rule = findRule(this._keep, node, this.options)) return rule;
					if (rule = findRule(this._remove, node, this.options)) return rule;
					return this.defaultRule;
				},
				forEach: function(fn) {
					for (var i = 0; i < this.array.length; i++) fn(this.array[i], i);
				}
			};
			function findRule(rules, node, options) {
				for (var i = 0; i < rules.length; i++) {
					var rule = rules[i];
					if (filterValue(rule, node, options)) return rule;
				}
			}
			function filterValue(rule, node, options) {
				var filter = rule.filter;
				if (typeof filter === "string") {
					if (filter === node.nodeName.toLowerCase()) return true;
				} else if (Array.isArray(filter)) {
					if (filter.indexOf(node.nodeName.toLowerCase()) > -1) return true;
				} else if (typeof filter === "function") {
					if (filter.call(rule, node, options)) return true;
				} else throw new TypeError("`filter` needs to be a string, array, or function");
			}
			/**
			* The collapseWhitespace function is adapted from collapse-whitespace
			* by Luc Thevenard.
			*
			* The MIT License (MIT)
			*
			* Copyright (c) 2014 Luc Thevenard <lucthevenard@gmail.com>
			*
			* Permission is hereby granted, free of charge, to any person obtaining a copy
			* of this software and associated documentation files (the "Software"), to deal
			* in the Software without restriction, including without limitation the rights
			* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
			* copies of the Software, and to permit persons to whom the Software is
			* furnished to do so, subject to the following conditions:
			*
			* The above copyright notice and this permission notice shall be included in
			* all copies or substantial portions of the Software.
			*
			* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
			* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
			* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
			* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
			* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
			* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
			* THE SOFTWARE.
			*/
			/**
			* collapseWhitespace(options) removes extraneous whitespace from an the given element.
			*
			* @param {Object} options
			*/
			function collapseWhitespace(options) {
				var element = options.element;
				var isBlock = options.isBlock;
				var isVoid = options.isVoid;
				var isPre = options.isPre || function(node) {
					return node.nodeName === "PRE";
				};
				if (!element.firstChild || isPre(element)) return;
				var prevText = null;
				var keepLeadingWs = false;
				var prev = null;
				var node = next(prev, element, isPre);
				while (node !== element) {
					if (node.nodeType === 3 || node.nodeType === 4) {
						var text = node.data.replace(/[ \r\n\t]+/g, " ");
						if ((!prevText || / $/.test(prevText.data)) && !keepLeadingWs && text[0] === " ") text = text.substr(1);
						if (!text) {
							node = remove(node);
							continue;
						}
						node.data = text;
						prevText = node;
					} else if (node.nodeType === 1) {
						if (isBlock(node) || node.nodeName === "BR") {
							if (prevText) prevText.data = prevText.data.replace(/ $/, "");
							prevText = null;
							keepLeadingWs = false;
						} else if (isVoid(node) || isPre(node)) {
							prevText = null;
							keepLeadingWs = true;
						} else if (prevText) keepLeadingWs = false;
					} else {
						node = remove(node);
						continue;
					}
					var nextNode = next(prev, node, isPre);
					prev = node;
					node = nextNode;
				}
				if (prevText) {
					prevText.data = prevText.data.replace(/ $/, "");
					if (!prevText.data) remove(prevText);
				}
			}
			/**
			* remove(node) removes the given node from the DOM and returns the
			* next node in the sequence.
			*
			* @param {Node} node
			* @return {Node} node
			*/
			function remove(node) {
				var next = node.nextSibling || node.parentNode;
				node.parentNode.removeChild(node);
				return next;
			}
			/**
			* next(prev, current, isPre) returns the next node in the sequence, given the
			* current and previous nodes.
			*
			* @param {Node} prev
			* @param {Node} current
			* @param {Function} isPre
			* @return {Node}
			*/
			function next(prev, current, isPre) {
				if (prev && prev.parentNode === current || isPre(current)) return current.nextSibling || current.parentNode;
				return current.firstChild || current.nextSibling || current.parentNode;
			}
			var root = typeof window !== "undefined" ? window : {};
			function canParseHTMLNatively() {
				var Parser = root.DOMParser;
				var canParse = false;
				try {
					if (new Parser().parseFromString("", "text/html")) canParse = true;
				} catch (e) {}
				return canParse;
			}
			function createHTMLParser() {
				var Parser = function() {};
				var domino = require("@mixmark-io/domino");
				Parser.prototype.parseFromString = function(string) {
					return domino.createDocument(string);
				};
				return Parser;
			}
			var HTMLParser = canParseHTMLNatively() ? root.DOMParser : createHTMLParser();
			function RootNode(input, options) {
				var root;
				if (typeof input === "string") root = htmlParser().parseFromString("<x-turndown id=\"turndown-root\">" + input + "</x-turndown>", "text/html").getElementById("turndown-root");
				else root = input.cloneNode(true);
				collapseWhitespace({
					element: root,
					isBlock,
					isVoid,
					isPre: options.preformattedCode ? isPreOrCode : null
				});
				return root;
			}
			var _htmlParser;
			function htmlParser() {
				_htmlParser = _htmlParser || new HTMLParser();
				return _htmlParser;
			}
			function isPreOrCode(node) {
				return node.nodeName === "PRE" || node.nodeName === "CODE";
			}
			function Node(node, options) {
				node.isBlock = isBlock(node);
				node.isCode = node.nodeName === "CODE" || node.parentNode.isCode;
				node.isBlank = isBlank(node);
				node.flankingWhitespace = flankingWhitespace(node, options);
				return node;
			}
			function isBlank(node) {
				return !isVoid(node) && !isMeaningfulWhenBlank(node) && /^\s*$/i.test(node.textContent) && !hasVoid(node) && !hasMeaningfulWhenBlank(node);
			}
			function flankingWhitespace(node, options) {
				if (node.isBlock || options.preformattedCode && node.isCode) return {
					leading: "",
					trailing: ""
				};
				var edges = edgeWhitespace(node.textContent);
				if (edges.leadingAscii && isFlankedByWhitespace("left", node, options)) edges.leading = edges.leadingNonAscii;
				if (edges.trailingAscii && isFlankedByWhitespace("right", node, options)) edges.trailing = edges.trailingNonAscii;
				return {
					leading: edges.leading,
					trailing: edges.trailing
				};
			}
			function edgeWhitespace(string) {
				var m = string.match(/^(([ \t\r\n]*)(\s*))(?:(?=\S)[\s\S]*\S)?((\s*?)([ \t\r\n]*))$/);
				return {
					leading: m[1],
					leadingAscii: m[2],
					leadingNonAscii: m[3],
					trailing: m[4],
					trailingNonAscii: m[5],
					trailingAscii: m[6]
				};
			}
			function isFlankedByWhitespace(side, node, options) {
				var sibling;
				var regExp;
				var isFlanked;
				if (side === "left") {
					sibling = node.previousSibling;
					regExp = / $/;
				} else {
					sibling = node.nextSibling;
					regExp = /^ /;
				}
				if (sibling) {
					if (sibling.nodeType === 3) isFlanked = regExp.test(sibling.nodeValue);
					else if (options.preformattedCode && sibling.nodeName === "CODE") isFlanked = false;
					else if (sibling.nodeType === 1 && !isBlock(sibling)) isFlanked = regExp.test(sibling.textContent);
				}
				return isFlanked;
			}
			var reduce = Array.prototype.reduce;
			function TurndownService(options) {
				if (!(this instanceof TurndownService)) return new TurndownService(options);
				var defaults = {
					rules,
					headingStyle: "setext",
					hr: "* * *",
					bulletListMarker: "*",
					codeBlockStyle: "indented",
					fence: "```",
					emDelimiter: "_",
					strongDelimiter: "**",
					linkStyle: "inlined",
					linkReferenceStyle: "full",
					br: "  ",
					preformattedCode: false,
					blankReplacement: function(content, node) {
						return node.isBlock ? "\n\n" : "";
					},
					keepReplacement: function(content, node) {
						return node.isBlock ? "\n\n" + node.outerHTML + "\n\n" : node.outerHTML;
					},
					defaultReplacement: function(content, node) {
						return node.isBlock ? "\n\n" + content + "\n\n" : content;
					}
				};
				this.options = extend({}, defaults, options);
				this.rules = new Rules(this.options);
			}
			TurndownService.prototype = {
				/**
				* The entry point for converting a string or DOM node to Markdown
				* @public
				* @param {String|HTMLElement} input The string or DOM node to convert
				* @returns A Markdown representation of the input
				* @type String
				*/
				turndown: function(input) {
					if (!canConvert(input)) throw new TypeError(input + " is not a string, or an element/document/fragment node.");
					if (input === "") return "";
					var output = process.call(this, new RootNode(input, this.options));
					return postProcess.call(this, output);
				},
				/**
				* Add one or more plugins
				* @public
				* @param {Function|Array} plugin The plugin or array of plugins to add
				* @returns The Turndown instance for chaining
				* @type Object
				*/
				use: function(plugin) {
					if (Array.isArray(plugin)) for (var i = 0; i < plugin.length; i++) this.use(plugin[i]);
					else if (typeof plugin === "function") plugin(this);
					else throw new TypeError("plugin must be a Function or an Array of Functions");
					return this;
				},
				/**
				* Adds a rule
				* @public
				* @param {String} key The unique key of the rule
				* @param {Object} rule The rule
				* @returns The Turndown instance for chaining
				* @type Object
				*/
				addRule: function(key, rule) {
					this.rules.add(key, rule);
					return this;
				},
				/**
				* Keep a node (as HTML) that matches the filter
				* @public
				* @param {String|Array|Function} filter The unique key of the rule
				* @returns The Turndown instance for chaining
				* @type Object
				*/
				keep: function(filter) {
					this.rules.keep(filter);
					return this;
				},
				/**
				* Remove a node that matches the filter
				* @public
				* @param {String|Array|Function} filter The unique key of the rule
				* @returns The Turndown instance for chaining
				* @type Object
				*/
				remove: function(filter) {
					this.rules.remove(filter);
					return this;
				},
				/**
				* Escapes Markdown syntax
				* @public
				* @param {String} string The string to escape
				* @returns A string with Markdown syntax escaped
				* @type String
				*/
				escape: function(string) {
					return escapeMarkdown(string);
				}
			};
			/**
			* Reduces a DOM node down to its Markdown string equivalent
			* @private
			* @param {HTMLElement} parentNode The node to convert
			* @returns A Markdown representation of the node
			* @type String
			*/
			function process(parentNode) {
				var self = this;
				return reduce.call(parentNode.childNodes, function(output, node) {
					node = new Node(node, self.options);
					var replacement = "";
					if (node.nodeType === 3) replacement = node.isCode ? node.nodeValue : self.escape(node.nodeValue);
					else if (node.nodeType === 1) replacement = replacementForNode.call(self, node);
					return join(output, replacement);
				}, "");
			}
			/**
			* Appends strings as each rule requires and trims the output
			* @private
			* @param {String} output The conversion output
			* @returns A trimmed version of the ouput
			* @type String
			*/
			function postProcess(output) {
				var self = this;
				this.rules.forEach(function(rule) {
					if (typeof rule.append === "function") output = join(output, rule.append(self.options));
				});
				return output.replace(/^[\t\r\n]+/, "").replace(/[\t\r\n\s]+$/, "");
			}
			/**
			* Converts an element node to its Markdown equivalent
			* @private
			* @param {HTMLElement} node The node to convert
			* @returns A Markdown representation of the node
			* @type String
			*/
			function replacementForNode(node) {
				var rule = this.rules.forNode(node);
				var content = process.call(this, node);
				var whitespace = node.flankingWhitespace;
				if (whitespace.leading || whitespace.trailing) content = content.trim();
				return whitespace.leading + rule.replacement(content, node, this.options) + whitespace.trailing;
			}
			/**
			* Joins replacement to the current output with appropriate number of new lines
			* @private
			* @param {String} output The current conversion output
			* @param {String} replacement The string to append to the output
			* @returns Joined output
			* @type String
			*/
			function join(output, replacement) {
				var s1 = trimTrailingNewlines(output);
				var s2 = trimLeadingNewlines(replacement);
				var nls = Math.max(output.length - s1.length, replacement.length - s2.length);
				return s1 + "\n\n".substring(0, nls) + s2;
			}
			/**
			* Determines whether an input can be converted
			* @private
			* @param {String|HTMLElement} input Describe this parameter
			* @returns Describe what it returns
			* @type String|Object|Array|Boolean|Number
			*/
			function canConvert(input) {
				return input != null && (typeof input === "string" || input.nodeType && (input.nodeType === 1 || input.nodeType === 9 || input.nodeType === 11));
			}
			module.exports = TurndownService;
		}));
		//#endregion
		//#region node_modules/turndown-plugin-gfm/lib/turndown-plugin-gfm.cjs.js
		var require_turndown_plugin_gfm_cjs = /* @__PURE__ */ __commonJSMin(((exports) => {
			Object.defineProperty(exports, "__esModule", { value: true });
			var highlightRegExp = /highlight-(?:text|source)-([a-z0-9]+)/;
			function highlightedCodeBlock(turndownService) {
				turndownService.addRule("highlightedCodeBlock", {
					filter: function(node) {
						var firstChild = node.firstChild;
						return node.nodeName === "DIV" && highlightRegExp.test(node.className) && firstChild && firstChild.nodeName === "PRE";
					},
					replacement: function(content, node, options) {
						var language = ((node.className || "").match(highlightRegExp) || [null, ""])[1];
						return "\n\n" + options.fence + language + "\n" + node.firstChild.textContent + "\n" + options.fence + "\n\n";
					}
				});
			}
			function strikethrough(turndownService) {
				turndownService.addRule("strikethrough", {
					filter: [
						"del",
						"s",
						"strike"
					],
					replacement: function(content) {
						return "~" + content + "~";
					}
				});
			}
			var indexOf = Array.prototype.indexOf;
			var every = Array.prototype.every;
			var rules = {};
			rules.tableCell = {
				filter: ["th", "td"],
				replacement: function(content, node) {
					return cell(content, node);
				}
			};
			rules.tableRow = {
				filter: "tr",
				replacement: function(content, node) {
					var borderCells = "";
					var alignMap = {
						left: ":--",
						right: "--:",
						center: ":-:"
					};
					if (isHeadingRow(node)) for (var i = 0; i < node.childNodes.length; i++) {
						var border = "---";
						var align = (node.childNodes[i].getAttribute("align") || "").toLowerCase();
						if (align) border = alignMap[align] || border;
						borderCells += cell(border, node.childNodes[i]);
					}
					return "\n" + content + (borderCells ? "\n" + borderCells : "");
				}
			};
			rules.table = {
				filter: function(node) {
					return node.nodeName === "TABLE" && isHeadingRow(node.rows[0]);
				},
				replacement: function(content) {
					content = content.replace("\n\n", "\n");
					return "\n\n" + content + "\n\n";
				}
			};
			rules.tableSection = {
				filter: [
					"thead",
					"tbody",
					"tfoot"
				],
				replacement: function(content) {
					return content;
				}
			};
			function isHeadingRow(tr) {
				var parentNode = tr.parentNode;
				return parentNode.nodeName === "THEAD" || parentNode.firstChild === tr && (parentNode.nodeName === "TABLE" || isFirstTbody(parentNode)) && every.call(tr.childNodes, function(n) {
					return n.nodeName === "TH";
				});
			}
			function isFirstTbody(element) {
				var previousSibling = element.previousSibling;
				return element.nodeName === "TBODY" && (!previousSibling || previousSibling.nodeName === "THEAD" && /^\s*$/i.test(previousSibling.textContent));
			}
			function cell(content, node) {
				var index = indexOf.call(node.parentNode.childNodes, node);
				var prefix = " ";
				if (index === 0) prefix = "| ";
				return prefix + content + " |";
			}
			function tables(turndownService) {
				turndownService.keep(function(node) {
					return node.nodeName === "TABLE" && !isHeadingRow(node.rows[0]);
				});
				for (var key in rules) turndownService.addRule(key, rules[key]);
			}
			function taskListItems(turndownService) {
				turndownService.addRule("taskListItems", {
					filter: function(node) {
						return node.type === "checkbox" && node.parentNode.nodeName === "LI";
					},
					replacement: function(content, node) {
						return (node.checked ? "[x]" : "[ ]") + " ";
					}
				});
			}
			function gfm(turndownService) {
				turndownService.use([
					highlightedCodeBlock,
					strikethrough,
					tables,
					taskListItems
				]);
			}
			exports.gfm = gfm;
		}));
		//#endregion
		//#region src/client/markdown.ts
		var import_turndown_cjs = /* @__PURE__ */ __toESM(require_turndown_cjs(), 1);
		var import_turndown_plugin_gfm_cjs = require_turndown_plugin_gfm_cjs();
		function createConverter() {
			const converter = new import_turndown_cjs.default({
				bulletListMarker: "-",
				codeBlockStyle: "fenced",
				emDelimiter: "*",
				headingStyle: "atx",
				strongDelimiter: "**"
			});
			converter.use(import_turndown_plugin_gfm_cjs.gfm);
			converter.addRule("dsh-tool-summary", {
				filter: (node) => node.hasAttribute("data-dsh-share-tool-summary"),
				replacement: (_content, node) => {
					const parts = [...node.children].map((child) => child.textContent?.replace(/\s+/g, " ").trim() ?? "").filter(Boolean);
					const body = (parts.length > 0 ? parts.join(" · ") : node.textContent?.replace(/\s+/g, " ").trim() ?? "").replace(/^/gm, "> ");
					return body ? `\n\n${body}\n\n` : "";
				}
			});
			converter.addRule("dsh-reasoning", {
				filter: (node) => node.getAttribute("data-variant") === "think",
				replacement: (content) => {
					const body = content.trim().replace(/^/gm, "> ");
					return body ? `\n\n${body}\n\n` : "";
				}
			});
			return converter;
		}
		function convertMessages(converter, messages, locale, hideReasoning = false) {
			return messages.map((message) => converter.turndown(cloneShareMessage(message, locale, hideReasoning)).trim()).filter(Boolean).join("\n\n");
		}
		/** 将与 PNG 相同的可见内容导出为按原会话顺序排列的 GFM Markdown。 */
		function createShareMarkdown(messages, locale, settings) {
			const converter = createConverter();
			const parts = [locale === "zh" ? "# 对话分享" : "# Shared conversation"];
			for (const message of messages) {
				if (message.omittedBefore > 0) parts.push(locale === "zh" ? `> 中间省略 ${message.omittedBefore} 组对话` : `> ${message.omittedBefore} conversation ${message.omittedBefore === 1 ? "group was" : "groups were"} omitted`);
				const content = convertMessages(converter, message.role === "assistant" ? visibleAssistantElements(message.elements, settings.hideProcess) : message.elements, locale, message.role === "assistant" && settings.hideProcess);
				parts.push(`${message.role === "user" ? locale === "zh" ? "## 用户" : "## User" : "## DeepSeek"}\n\n${content}`);
				parts.push("---");
			}
			if (parts.at(-1) === "---") parts.pop();
			return `${parts.join("\n\n")}\n`;
		}
		//#endregion
		//#region src/client/index.ts
		const name = "dsh-share/client";
		const inject = ["slots"];
		const STYLE_ID = "dsh-share-style";
		const TRANSPARENT_IMAGE_PLACEHOLDER = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
		const STYLE_TEXT = `
[data-dsh-share-button] {
  align-items: center;
  appearance: none;
  background: transparent;
  border: 0;
  border-radius: 28px;
  color: var(--dsw-alias-label-tertiary, currentColor);
  cursor: pointer;
  display: inline-flex;
  height: 28px;
  justify-content: center;
  margin: 0;
  padding: 6px;
  width: 28px;
}
/* 官方 slot 固定在分支按钮前；只调整 flex 视觉顺序，不移动 React 管理的 DOM。 */
[data-dsh-share-button] { order: 1; }
[data-time-hover-root] > div:has([data-dsh-share-button]) > span:last-child { order: 2; }
[data-dsh-share-button]:hover {
  background: var(--dsw-alias-interactive-bg-hover, rgba(127, 127, 127, .12));
  color: var(--dsw-alias-label-secondary, currentColor);
  opacity: 1;
}
[data-dsh-share-button]:disabled { cursor: wait; opacity: .38; }
[data-dsh-share-conversation] {
  align-items: center;
  appearance: none;
  background: transparent;
  border: 0;
  border-radius: 999px;
  color: var(--dsw-alias-label-primary, currentColor);
  cursor: pointer;
  display: inline-flex;
  height: 34px;
  justify-content: center;
  padding: 0;
  width: 34px;
}
[data-dsh-share-conversation]:hover { background: var(--dsw-alias-interactive-bg-hover, rgba(127, 127, 127, .12)); }

/* DeepSeek 官网式选择模式：一轮问答作为一组，常规操作和输入区让位给底栏。 */
[data-conversation-scroll][data-dsh-share-selection] [data-composer-seat],
[data-conversation-scroll][data-dsh-share-selection] [data-chat-flow-kind="turn-tail"] {
  pointer-events: none !important;
  visibility: hidden !important;
}
[data-conversation-scroll][data-dsh-share-selection]
  [data-chat-flow-kind="user"] [data-time-hover-root] > :last-child:has(button),
[data-conversation-scroll][data-dsh-share-selection]
  [data-chat-flow-kind="steering"] [data-time-hover-root] > :last-child:has(button) {
  pointer-events: none !important;
  visibility: hidden !important;
}
[data-dsh-share-select-anchor],
[data-dsh-share-select-range-root] { position: relative !important; }
[data-conversation-scroll][data-dsh-share-selection] [data-dsh-share-select-content] {
  cursor: pointer !important;
}
[data-conversation-scroll][data-dsh-share-selection]
  [data-dsh-share-select-content] > :not([data-dsh-share-select-region]),
[data-conversation-scroll][data-dsh-share-selection]
  [data-dsh-share-select-content] > :not([data-dsh-share-select-region]) * {
  cursor: pointer !important;
  pointer-events: none !important;
}
[data-dsh-share-select-region="question"] {
  height: 44px;
  margin-bottom: -44px;
  pointer-events: none;
  position: sticky;
  top: 0;
  width: 0;
  z-index: 2;
}
[data-dsh-share-select-region="answer"] {
  left: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
  z-index: 2;
}
[data-dsh-share-select-sticky] {
  height: 44px;
  pointer-events: none;
  position: sticky;
  top: 0;
  width: 0;
}
[data-dsh-share-turn-select] {
  align-items: center;
  appearance: none;
  background: transparent;
  border: 0;
  cursor: pointer;
  display: inline-flex;
  height: 44px;
  justify-content: center;
  left: -42px;
  margin: 0;
  padding: 0;
  pointer-events: auto;
  position: absolute;
  top: 0;
  width: 18px;
  z-index: 2;
}
[data-dsh-share-turn-select-box],
[data-dsh-share-select-all-box] {
  align-items: center;
  border: 1.5px solid var(--dsw-alias-border-l1, rgba(127, 127, 127, .48));
  border-radius: 6px;
  box-sizing: border-box;
  display: inline-flex;
  height: 18px;
  justify-content: center;
  position: relative;
  width: 18px;
}
[data-dsh-share-turn-select][aria-checked="true"] [data-dsh-share-turn-select-box],
[data-dsh-share-select-all][aria-checked="true"] [data-dsh-share-select-all-box] {
  background: var(--dsw-static-deepseek-500, #4d6bfe);
  border-color: var(--dsw-static-deepseek-500, #4d6bfe);
}
[data-dsh-share-turn-select][aria-checked="true"] [data-dsh-share-turn-select-box]::after,
[data-dsh-share-select-all][aria-checked="true"] [data-dsh-share-select-all-box]::after {
  border-bottom: 1.8px solid #fff;
  border-right: 1.8px solid #fff;
  content: '';
  height: 8px;
  transform: rotate(45deg) translate(-1px, -1px);
  width: 4px;
}
[data-dsh-share-turn-select]:focus-visible [data-dsh-share-turn-select-box],
[data-dsh-share-select-all]:focus-visible [data-dsh-share-select-all-box] {
  outline: 2px solid var(--dsw-alias-button-info-fill, #4d6bfe);
  outline-offset: 2px;
}
[data-dsh-share-selection-footer] {
  align-items: center;
  background: var(--dsw-alias-bg-base, #fff);
  border-top: 1px solid var(--dsw-alias-border-l2, rgba(127, 127, 127, .18));
  bottom: 0;
  box-sizing: border-box;
  display: flex;
  flex: none;
  height: 66px;
  justify-content: center;
  margin-top: -66px;
  position: sticky;
  width: 100%;
  z-index: 9;
}
[data-dsh-share-selection-footer-inner] {
  align-items: center;
  display: flex;
  gap: 8px;
  max-width: 840px;
  width: min(840px, calc(100% - 64px));
}
[data-dsh-share-select-all] {
  align-items: center;
  appearance: none;
  background: transparent;
  border: 0;
  color: var(--dsw-alias-label-primary, currentColor);
  cursor: pointer;
  display: inline-flex;
  font: inherit;
  font-size: 13px;
  gap: 10px;
  height: 36px;
  padding: 0 2px;
}
[data-dsh-share-selection-divider] {
  background: var(--dsw-alias-border-l2, rgba(127, 127, 127, .24));
  height: 18px;
  margin: 0 8px 0 6px;
  width: 1px;
}
[data-dsh-share-selection-count] {
  color: var(--dsw-alias-label-primary, currentColor);
  flex: 1 1 auto;
  font-size: 14px;
  line-height: 22px;
}
[data-dsh-share-selection-cancel],
[data-dsh-share-selection-markdown],
[data-dsh-share-selection-create] {
  appearance: none;
  border-radius: 999px;
  cursor: pointer;
  font: inherit;
  font-size: 14px;
  height: 36px;
  line-height: 22px;
  padding: 6px 18px;
  white-space: nowrap;
}
[data-dsh-share-selection-cancel],
[data-dsh-share-selection-markdown] {
  background: transparent;
  border: 1px solid var(--dsw-alias-border-l1, rgba(127, 127, 127, .4));
  color: var(--dsw-alias-label-primary, currentColor);
}
[data-dsh-share-selection-cancel] {
  min-width: 72px;
}
[data-dsh-share-selection-create] {
  align-items: center;
  background: var(--dsw-static-deepseek-500, #4d6bfe);
  border: 1px solid var(--dsw-static-deepseek-500, #4d6bfe);
  color: #fff;
  display: inline-flex;
  justify-content: center;
  min-width: 132px;
}
[data-dsh-share-selection-cancel]:hover,
[data-dsh-share-selection-markdown]:hover:not(:disabled) { background: var(--dsw-alias-interactive-bg-hover, rgba(127, 127, 127, .12)); }
[data-dsh-share-selection-create]:hover:not(:disabled) { background: #405bea; border-color: #405bea; }
[data-dsh-share-selection-markdown]:disabled,
[data-dsh-share-selection-create]:disabled { cursor: not-allowed; opacity: .45; }
[data-dsh-share-label="compact"] { display: none; }
@media (max-width: 720px) {
  [data-dsh-share-selection-footer] {
    height: 108px;
    margin-top: -108px;
    padding: 10px 0;
  }
  [data-dsh-share-selection-footer-inner] {
    display: grid;
    gap: 8px;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-template-rows: repeat(2, 36px);
    width: calc(100% - 32px);
  }
  [data-dsh-share-select-all] {
    grid-column: 1;
    grid-row: 1;
    justify-self: start;
  }
  [data-dsh-share-selection-divider] { display: none; }
  [data-dsh-share-selection-count] {
    font-size: 13px;
    grid-column: 2 / 4;
    grid-row: 1;
    overflow: hidden;
    text-align: right;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  [data-dsh-share-selection-cancel],
  [data-dsh-share-selection-markdown],
  [data-dsh-share-selection-create] {
    font-size: 13px;
    grid-row: 2;
    min-width: 0;
    padding-inline: 6px;
    width: 100%;
  }
  [data-dsh-share-selection-cancel] { grid-column: 1; }
  [data-dsh-share-selection-markdown] { grid-column: 2; }
  [data-dsh-share-selection-create] { grid-column: 3; }
  [data-dsh-share-label="wide"] { display: none; }
  [data-dsh-share-label="compact"] { display: inline; }
}
[data-dsh-share-dialog] {
  background: var(--dsw-alias-bg-base, #fff);
  border: 1px solid var(--dsw-alias-line-border, rgba(127, 127, 127, .22));
  border-radius: 14px;
  box-shadow: 0 20px 64px rgba(0, 0, 0, .24);
  color: var(--dsw-alias-label-primary, #111827);
  max-height: min(86vh, 900px);
  max-width: calc(100vw - 32px);
  overflow: hidden;
  padding: 0;
  width: 960px;
}
[data-dsh-share-dialog][open] { display: flex; flex-direction: column; }
[data-dsh-share-dialog]::backdrop { background: rgba(0, 0, 0, .48); }
.dsh-share-dialog__header {
  align-items: center;
  border-bottom: 1px solid var(--dsw-alias-line-border, rgba(127, 127, 127, .18));
  display: flex;
  font-size: 16px;
  font-weight: 650;
  justify-content: space-between;
  padding: 16px 18px;
}
.dsh-share-dialog__close {
  background: transparent;
  border: 0;
  border-radius: 6px;
  color: inherit;
  cursor: pointer;
  font-size: 22px;
  height: 30px;
  line-height: 1;
  width: 30px;
}
.dsh-share-dialog__close:hover { background: rgba(127, 127, 127, .12); }
.dsh-share-dialog__controls {
  align-items: center;
  border-bottom: 1px solid var(--dsw-alias-line-border, rgba(127, 127, 127, .18));
  display: flex;
  flex-wrap: wrap;
  gap: 12px 20px;
  padding: 12px 18px;
}
.dsh-share-dialog__field {
  align-items: center;
  display: flex;
  gap: 8px;
}
.dsh-share-dialog__field-label {
  color: var(--dsw-alias-label-secondary, #6b7280);
  font-size: 13px;
  white-space: nowrap;
}
.dsh-share-dialog__toggle {
  align-items: center;
  color: var(--dsw-alias-label-secondary, #6b7280);
  cursor: pointer;
  display: inline-flex;
  font-size: 13px;
  gap: 7px;
  margin-left: auto;
  user-select: none;
  white-space: nowrap;
}
.dsh-share-dialog__toggle input {
  accent-color: #4d6bfe;
  cursor: pointer;
  height: 15px;
  margin: 0;
  width: 15px;
}
.dsh-share-dialog__segmented {
  border: 1px solid var(--dsw-alias-line-border, rgba(127, 127, 127, .24));
  border-radius: 8px;
  display: inline-flex;
  gap: 2px;
  padding: 3px;
}
.dsh-share-dialog__choice {
  background: transparent;
  border: 0;
  border-radius: 6px;
  color: var(--dsw-alias-label-secondary, #6b7280);
  cursor: pointer;
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  height: 28px;
  min-width: 38px;
  padding: 0 9px;
}
.dsh-share-dialog__choice:hover { background: rgba(127, 127, 127, .08); }
.dsh-share-dialog__choice[aria-pressed="true"] {
  background: var(--dsw-alias-interactive-bg-hover, rgba(127, 127, 127, .14));
  color: var(--dsw-alias-label-primary, #111827);
}
.dsh-share-dialog__body {
  align-items: start;
  display: grid;
  flex: 1 1 auto;
  justify-items: center;
  max-height: 62vh;
  min-height: 220px;
  min-width: 0;
  overflow: auto;
  padding: 18px;
}
.dsh-share-dialog__preview {
  border: 1px solid var(--dsw-alias-line-border, rgba(127, 127, 127, .18));
  box-sizing: border-box;
  display: block;
  height: auto;
  max-width: 100%;
}
.dsh-share-dialog__message {
  align-self: center;
  color: var(--dsw-alias-label-secondary, #6b7280);
  text-align: center;
}
.dsh-share-dialog__footer {
  align-items: center;
  border-top: 1px solid var(--dsw-alias-line-border, rgba(127, 127, 127, .18));
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  min-height: 68px;
  padding: 14px 18px;
}
.dsh-share-dialog__status { color: var(--dsw-alias-label-secondary, #6b7280); font-size: 13px; margin-right: auto; }
.dsh-share-dialog__action {
  background: transparent;
  border: 1px solid var(--dsw-alias-line-border, rgba(127, 127, 127, .28));
  border-radius: 8px;
  color: inherit;
  cursor: pointer;
  font: inherit;
  padding: 8px 14px;
}
.dsh-share-dialog__action:hover { background: rgba(127, 127, 127, .10); }
.dsh-share-dialog__action--primary { background: #4d6bfe; border-color: #4d6bfe; color: #fff; }
.dsh-share-dialog__action--primary:hover { background: #405bea; }
.dsh-share-dialog__action:disabled { cursor: not-allowed; opacity: .45; }
[data-dsh-share-card] [data-dsh-share-message],
[data-dsh-share-card] [data-dsh-share-message] :where(div, span, p, li, table, blockquote, td, th) {
  font-size: var(--dsh-share-font-size) !important;
  line-height: 1.75 !important;
}
[data-dsh-share-card] [data-dsh-share-tool-summary],
[data-dsh-share-card] [data-dsh-share-tool-summary] :where(div, span) {
  font-size: 14px !important;
  line-height: 24px !important;
}
[data-dsh-share-card] [data-dsh-share-message] :where(h1) {
  font-size: calc(var(--dsh-share-font-size) * 1.55) !important;
  line-height: 1.3 !important;
}
[data-dsh-share-card] [data-dsh-share-message] :where(h2) {
  font-size: calc(var(--dsh-share-font-size) * 1.28) !important;
  line-height: 1.35 !important;
}
[data-dsh-share-card] [data-dsh-share-message] :where(h3, h4, h5, h6) {
  font-size: calc(var(--dsh-share-font-size) * 1.12) !important;
  line-height: 1.4 !important;
}
[data-dsh-share-card] [data-dsh-share-message] :where(pre, code, code *) {
  font-size: calc(var(--dsh-share-font-size) * .875) !important;
}
[data-dsh-share-card] [data-dsh-share-message] :where(pre) {
  max-width: 100% !important;
  overflow: visible !important;
  white-space: pre-wrap !important;
  word-break: break-word !important;
}
[data-dsh-share-card] [data-dsh-share-message] :where(img, video, svg) { max-width: 100% !important; }
[data-dsh-share-card] [data-dsh-share-message] :where(table) {
  max-width: 100% !important;
  table-layout: fixed !important;
  width: 100% !important;
}
[data-dsh-share-card] [data-dsh-share-message] :where(th, td) {
  max-width: none !important;
  min-width: 0 !important;
  overflow-wrap: anywhere !important;
  padding: 8px 6px !important;
  word-break: break-word !important;
}
[data-dsh-share-card] [data-dsh-share-message] :where(div:has(> table)) {
  max-width: 100% !important;
  overflow: visible !important;
}
`;
		function getLocale(document) {
			return document.documentElement.lang.toLowerCase().startsWith("zh") ? "zh" : "en";
		}
		function t(document) {
			if (getLocale(document) === "zh") return {
				title: "分享当前问答",
				selectedTitle: () => "生成图片",
				share: "将当前问答分享为图片",
				shareTooltip: "分享",
				shareConversation: "分享对话",
				cancelSelection: "取消",
				createSelection: "生成分享图片",
				createSelectionCompact: "生成图片",
				selectAll: "全选",
				selectedCount: (count) => `已选择 ${count} 组对话`,
				selectTurn: "选择这组对话",
				unselectTurn: "取消选择这组对话",
				loading: "正在生成图片…",
				copy: "复制图片",
				download: "下载图片",
				downloadMarkdown: "下载 Markdown",
				downloadMarkdownCompact: "下载MD",
				copied: "图片已复制",
				copyUnsupported: "当前浏览器不支持复制图片，请下载 PNG。",
				copyFailed: "复制失败，请下载 PNG。",
				renderFailed: "图片生成失败，请稍后重试。",
				updating: "正在更新预览…",
				updateFailed: "更新失败，当前仍为上一张预览。",
				close: "关闭",
				width: "宽度",
				fontSize: "字号",
				hideProcess: "不展示过程",
				phone: "手机",
				tablet: "平板",
				desktop: "电脑",
				normal: "标准",
				large: "大",
				xlarge: "超大"
			};
			return {
				title: "Share this Q&A",
				selectedTitle: () => "Generate image",
				share: "Share this Q&A as an image",
				shareTooltip: "Share",
				shareConversation: "Share conversation",
				cancelSelection: "Cancel",
				createSelection: "Create image",
				createSelectionCompact: "Create image",
				selectAll: "Select all",
				selectedCount: (count) => `${count} conversation ${count === 1 ? "group" : "groups"} selected`,
				selectTurn: "Select this conversation group",
				unselectTurn: "Unselect this conversation group",
				loading: "Generating image…",
				copy: "Copy image",
				download: "Download image",
				downloadMarkdown: "Download Markdown",
				downloadMarkdownCompact: "Markdown",
				copied: "Image copied",
				copyUnsupported: "Image clipboard is unavailable. Please download the PNG.",
				copyFailed: "Could not copy the image. Please download the PNG.",
				renderFailed: "Could not generate the image. Please try again.",
				updating: "Updating preview…",
				updateFailed: "Update failed. The previous preview is still shown.",
				close: "Close",
				width: "Width",
				fontSize: "Size",
				hideProcess: "Hide process",
				phone: "Phone",
				tablet: "Tablet",
				desktop: "Desktop",
				normal: "Normal",
				large: "Large",
				xlarge: "Extra Large"
			};
		}
		async function renderShareImage(element) {
			const blob = await (0, import_lib.toBlob)(element, {
				backgroundColor: getComputedStyle(element).backgroundColor,
				imagePlaceholder: TRANSPARENT_IMAGE_PLACEHOLDER,
				pixelRatio: 2,
				skipFonts: true
			});
			if (!blob) throw new Error("html-to-image returned an empty blob");
			return blob;
		}
		function createFilename(extension, now = /* @__PURE__ */ new Date()) {
			const pad = (number) => String(number).padStart(2, "0");
			return `dsh-share-${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}.${extension}`;
		}
		function downloadMarkdownFile(document, markdown) {
			if (!markdown) return;
			const objectUrl = URL.createObjectURL(new Blob([markdown], { type: "text/markdown;charset=utf-8" }));
			const anchor = document.createElement("a");
			anchor.href = objectUrl;
			anchor.download = createFilename("md");
			anchor.click();
			document.defaultView?.setTimeout(() => URL.revokeObjectURL(objectUrl), 0);
		}
		var PreviewDialog = class {
			document;
			options;
			element;
			title;
			image;
			message;
			status;
			copyButton;
			downloadButton;
			hideProcessInput;
			choiceButtons;
			storage;
			currentSettings;
			blob;
			objectUrl;
			constructor(document, options) {
				this.document = document;
				this.options = options;
				const strings = t(document);
				let storage;
				try {
					storage = document.defaultView?.localStorage;
				} catch {
					storage = void 0;
				}
				this.storage = storage;
				this.currentSettings = loadShareSettings(storage);
				const dialog = document.createElement("dialog");
				dialog.dataset.dshShareDialog = "";
				dialog.innerHTML = `
      <div class="dsh-share-dialog__header">
        <span data-dsh-share-title></span>
        <button class="dsh-share-dialog__close" data-dsh-share-close type="button"></button>
      </div>
      <div class="dsh-share-dialog__controls">
        <div class="dsh-share-dialog__field">
          <span class="dsh-share-dialog__field-label" data-dsh-share-width-label></span>
          <div class="dsh-share-dialog__segmented" data-dsh-share-width role="group"></div>
        </div>
        <div class="dsh-share-dialog__field">
          <span class="dsh-share-dialog__field-label" data-dsh-share-font-size-label></span>
          <div class="dsh-share-dialog__segmented" data-dsh-share-font-size role="group"></div>
        </div>
        <label class="dsh-share-dialog__toggle">
          <input data-dsh-share-hide-process type="checkbox" />
          <span data-dsh-share-hide-process-label></span>
        </label>
      </div>
      <div class="dsh-share-dialog__body">
        <p class="dsh-share-dialog__message" data-dsh-share-message role="status"></p>
        <img class="dsh-share-dialog__preview" data-dsh-share-preview hidden alt="" />
      </div>
      <div class="dsh-share-dialog__footer">
        <span class="dsh-share-dialog__status" data-dsh-share-status role="status"></span>
        <button class="dsh-share-dialog__action" data-dsh-share-download type="button"></button>
        <button class="dsh-share-dialog__action dsh-share-dialog__action--primary" data-dsh-share-copy type="button"></button>
      </div>`;
				this.element = dialog;
				this.title = dialog.querySelector("[data-dsh-share-title]");
				this.image = dialog.querySelector("[data-dsh-share-preview]");
				this.message = dialog.querySelector("[data-dsh-share-message]");
				this.status = dialog.querySelector("[data-dsh-share-status]");
				this.copyButton = dialog.querySelector("[data-dsh-share-copy]");
				this.downloadButton = dialog.querySelector("[data-dsh-share-download]");
				this.hideProcessInput = dialog.querySelector("[data-dsh-share-hide-process]");
				const widthGroup = dialog.querySelector("[data-dsh-share-width]");
				const fontSizeGroup = dialog.querySelector("[data-dsh-share-font-size]");
				const widthChoices = [
					["phone", strings.phone],
					["tablet", strings.tablet],
					["desktop", strings.desktop]
				];
				const fontSizeChoices = [
					["normal", strings.normal],
					["large", strings.large],
					["xlarge", strings.xlarge]
				];
				for (const [value, label] of widthChoices) widthGroup.append(this.createChoice("width", value, label));
				for (const [value, label] of fontSizeChoices) fontSizeGroup.append(this.createChoice("font-size", value, label));
				this.choiceButtons = Array.from(dialog.querySelectorAll("[data-dsh-share-choice]"));
				const close = dialog.querySelector("[data-dsh-share-close]");
				const widthLabel = dialog.querySelector("[data-dsh-share-width-label]");
				const fontSizeLabel = dialog.querySelector("[data-dsh-share-font-size-label]");
				const hideProcessLabel = dialog.querySelector("[data-dsh-share-hide-process-label]");
				this.title.textContent = strings.title;
				widthLabel.textContent = strings.width;
				fontSizeLabel.textContent = strings.fontSize;
				hideProcessLabel.textContent = strings.hideProcess;
				widthGroup.ariaLabel = strings.width;
				fontSizeGroup.ariaLabel = strings.fontSize;
				close.textContent = "×";
				close.title = strings.close;
				close.ariaLabel = strings.close;
				this.copyButton.textContent = strings.copy;
				this.downloadButton.textContent = strings.download;
				close.addEventListener("click", () => this.close());
				dialog.addEventListener("click", (event) => {
					if (event.target === dialog) this.close();
				});
				dialog.addEventListener("close", () => {
					this.clearResult();
					this.options.onDismiss();
				});
				this.copyButton.addEventListener("click", () => void this.copy());
				this.downloadButton.addEventListener("click", () => this.download());
				this.hideProcessInput.addEventListener("change", () => {
					const next = {
						...this.currentSettings,
						hideProcess: this.hideProcessInput.checked
					};
					this.currentSettings = next;
					saveShareSettings(this.storage, next);
					this.updateControlState();
					this.options.onSettingsChange(this.settings);
				});
				this.updateControlState();
				document.body.append(dialog);
			}
			get settings() {
				return { ...this.currentSettings };
			}
			showLoading(turnCount, preservePreview = false, selectionExport = false) {
				const strings = t(this.document);
				const canPreserve = preservePreview && this.blob !== void 0 && this.objectUrl !== void 0;
				this.title.textContent = selectionExport ? strings.selectedTitle(turnCount) : strings.title;
				this.element.ariaBusy = "true";
				this.copyButton.disabled = true;
				this.downloadButton.disabled = true;
				if (canPreserve) {
					this.message.hidden = true;
					this.image.hidden = false;
					this.status.textContent = strings.updating;
					this.open();
					return;
				}
				this.clearImageResult();
				this.message.hidden = false;
				this.message.textContent = strings.loading;
				this.image.hidden = true;
				this.status.textContent = "";
				this.open();
			}
			/** 设置连续变化时先保留当前预览，只更新轻量状态；图片稍后统一重算。 */
			showPendingUpdate() {
				const strings = t(this.document);
				const canPreserve = this.blob !== void 0 && this.objectUrl !== void 0;
				this.element.ariaBusy = "true";
				this.copyButton.disabled = true;
				this.downloadButton.disabled = true;
				if (canPreserve) {
					this.message.hidden = true;
					this.image.hidden = false;
					this.status.textContent = strings.updating;
				} else {
					this.message.hidden = false;
					this.message.textContent = strings.loading;
					this.image.hidden = true;
					this.status.textContent = "";
				}
				this.open();
			}
			/** 先在独立 img 中完成解码，再原位替换当前预览，避免出现空白帧。 */
			async showResult(blob, isCurrent = () => true) {
				const nextObjectUrl = URL.createObjectURL(blob);
				try {
					const preloader = this.document.createElement("img");
					preloader.src = nextObjectUrl;
					if (typeof preloader.decode === "function") await preloader.decode();
					else await this.waitForImage(preloader);
					if (!isCurrent()) {
						URL.revokeObjectURL(nextObjectUrl);
						return false;
					}
				} catch (error) {
					URL.revokeObjectURL(nextObjectUrl);
					throw error;
				}
				const previousObjectUrl = this.objectUrl;
				this.blob = blob;
				this.objectUrl = nextObjectUrl;
				this.image.src = nextObjectUrl;
				this.image.style.width = `${WIDTH_PRESETS[this.currentSettings.width]}px`;
				this.image.hidden = false;
				this.message.hidden = true;
				this.status.textContent = "";
				this.element.ariaBusy = "false";
				this.copyButton.disabled = false;
				this.downloadButton.disabled = false;
				await this.nextFrame();
				if (previousObjectUrl) URL.revokeObjectURL(previousObjectUrl);
				return true;
			}
			showError(preservePreview = false) {
				const strings = t(this.document);
				const canPreserve = preservePreview && this.blob !== void 0 && this.objectUrl !== void 0;
				this.element.ariaBusy = "false";
				if (canPreserve) {
					this.message.hidden = true;
					this.image.hidden = false;
					this.status.textContent = strings.updateFailed;
					this.copyButton.disabled = false;
					this.downloadButton.disabled = false;
					this.open();
					return;
				}
				this.clearImageResult();
				this.message.hidden = false;
				this.message.textContent = strings.renderFailed;
				this.image.hidden = true;
				this.copyButton.disabled = true;
				this.downloadButton.disabled = true;
				this.open();
			}
			waitForImage(image) {
				return new Promise((resolve, reject) => {
					image.addEventListener("load", () => resolve(), { once: true });
					image.addEventListener("error", () => reject(/* @__PURE__ */ new Error("Failed to decode preview image")), { once: true });
				});
			}
			nextFrame() {
				const requestFrame = this.document.defaultView?.requestAnimationFrame;
				if (!requestFrame) return Promise.resolve();
				return new Promise((resolve) => requestFrame(() => resolve()));
			}
			destroy() {
				this.clearResult();
				this.element.remove();
			}
			open() {
				if (this.element.open) return;
				if (typeof this.element.showModal === "function") this.element.showModal();
				else this.element.setAttribute("open", "");
			}
			close() {
				if (typeof this.element.close === "function") this.element.close();
				else {
					this.element.removeAttribute("open");
					this.clearResult();
					this.options.onDismiss();
				}
			}
			createChoice(kind, value, label) {
				const button = this.document.createElement("button");
				button.type = "button";
				button.className = "dsh-share-dialog__choice";
				button.dataset.dshShareChoice = kind;
				button.dataset.value = value;
				button.textContent = label;
				button.addEventListener("click", () => {
					const next = kind === "width" ? {
						...this.currentSettings,
						width: value
					} : {
						...this.currentSettings,
						fontSize: value
					};
					if (next.width === this.currentSettings.width && next.fontSize === this.currentSettings.fontSize) return;
					this.currentSettings = next;
					saveShareSettings(this.storage, next);
					this.updateControlState();
					this.options.onSettingsChange(this.settings);
				});
				return button;
			}
			updateControlState() {
				for (const button of this.choiceButtons) {
					const selected = button.dataset.dshShareChoice === "width" ? button.dataset.value === this.currentSettings.width : button.dataset.value === this.currentSettings.fontSize;
					button.setAttribute("aria-pressed", String(selected));
				}
				this.hideProcessInput.checked = this.currentSettings.hideProcess;
			}
			clearResult() {
				this.clearImageResult();
			}
			clearImageResult() {
				this.blob = void 0;
				if (this.objectUrl) URL.revokeObjectURL(this.objectUrl);
				this.objectUrl = void 0;
				this.image.removeAttribute("src");
				this.status.textContent = "";
				this.element.ariaBusy = "false";
			}
			async copy() {
				if (!this.blob) return;
				const strings = t(this.document);
				const clipboard = this.document.defaultView?.navigator.clipboard;
				const ClipboardItemConstructor = this.document.defaultView?.ClipboardItem;
				if (!clipboard?.write || !ClipboardItemConstructor) {
					this.status.textContent = strings.copyUnsupported;
					return;
				}
				try {
					await clipboard.write([new ClipboardItemConstructor({ "image/png": this.blob })]);
					this.status.textContent = strings.copied;
				} catch (error) {
					console.warn("[dsh-share] Failed to copy image", error);
					this.status.textContent = strings.copyFailed;
				}
			}
			download() {
				if (!this.objectUrl) return;
				const anchor = this.document.createElement("a");
				anchor.href = this.objectUrl;
				anchor.download = createFilename("png");
				anchor.click();
			}
		};
		function selectableTurns(root) {
			const turns = [];
			for (const { content, turn } of findRenderedTurns(root)) {
				const questionAnchor = content.prompts[0];
				if (!questionAnchor || content.answers.length === 0) continue;
				turns.push({
					answerAnchors: content.answers,
					content,
					id: String(turn),
					questionAnchor,
					turn
				});
			}
			return turns.sort((left, right) => left.turn - right.turn);
		}
		const SELECTION_OWNED_SELECTOR = ["[data-dsh-share-selection-footer]", "[data-dsh-share-select-region]"].join(",");
		function isSelectionOwnedNode(node) {
			const element = node instanceof Element ? node : node.parentElement;
			return Boolean(element?.matches(SELECTION_OWNED_SELECTOR) || element?.closest(SELECTION_OWNED_SELECTOR));
		}
		/** 插件自己的 footer、勾选框和文案更新不应再次触发整轮扫描。 */
		function mutationNeedsSelectionRefresh(record) {
			if (isSelectionOwnedNode(record.target)) return false;
			const changedNodes = [...record.addedNodes, ...record.removedNodes];
			return changedNodes.length === 0 || changedNodes.some((node) => !isSelectionOwnedNode(node));
		}
		function makeButton(document, dataName) {
			const button = document.createElement("button");
			button.type = "button";
			button.dataset[dataName] = "";
			return button;
		}
		function appendResponsiveLabel(document, button, wide, compact) {
			const wideLabel = document.createElement("span");
			wideLabel.dataset.dshShareLabel = "wide";
			wideLabel.textContent = wide;
			const compactLabel = document.createElement("span");
			compactLabel.dataset.dshShareLabel = "compact";
			compactLabel.textContent = compact;
			button.ariaLabel = wide;
			button.append(wideLabel, compactLabel);
		}
		function createShareRuntime(document, options = {}) {
			const style = document.createElement("style");
			style.id = STYLE_ID;
			style.textContent = STYLE_TEXT;
			document.head.append(style);
			const renderImage = options.renderImage ?? renderShareImage;
			let activeContent;
			let activeGroupCount = 0;
			let renderEpoch = 0;
			let pendingRender;
			let renderRunning = false;
			let settingsRenderTimer;
			let dialog;
			const selections = /* @__PURE__ */ new Map();
			const preserveScrollPosition = (scroll, scrollTop) => {
				const previousOverflowAnchor = scroll.style.overflowAnchor;
				scroll.style.overflowAnchor = "none";
				scroll.scrollTop = scrollTop;
				const requestFrame = document.defaultView?.requestAnimationFrame;
				if (!requestFrame) {
					scroll.style.overflowAnchor = previousOverflowAnchor;
					return;
				}
				requestFrame(() => {
					scroll.scrollTop = scrollTop;
					requestFrame(() => {
						scroll.scrollTop = scrollTop;
						scroll.style.overflowAnchor = previousOverflowAnchor;
					});
				});
			};
			const selectionFor = (sessionId) => {
				const existing = selections.get(sessionId);
				if (existing) return existing;
				const listeners = /* @__PURE__ */ new Set();
				const controller = {
					available: /* @__PURE__ */ new Map(),
					refreshScheduled: false,
					selected: /* @__PURE__ */ new Map(),
					selectNewTurns: true,
					sessionId,
					snapshots: /* @__PURE__ */ new Map(),
					snapshot: {
						active: false,
						allSelected: false,
						count: 0,
						selectedIds: /* @__PURE__ */ new Set(),
						total: 0
					},
					listeners,
					getSnapshot: () => controller.snapshot,
					subscribe: (listener) => {
						listeners.add(listener);
						return () => listeners.delete(listener);
					}
				};
				selections.set(sessionId, controller);
				return controller;
			};
			const publishSelection = (controller, active) => {
				const total = controller.available.size;
				controller.snapshot = {
					active,
					allSelected: total > 0 && controller.selected.size === total,
					count: controller.selected.size,
					selectedIds: new Set(controller.selected.keys()),
					total
				};
				if (controller.scroll) for (const button of controller.scroll.querySelectorAll("[data-dsh-share-turn-select]")) {
					const id = button.dataset.turnId ?? "";
					const selected = controller.selected.has(id);
					button.setAttribute("aria-checked", String(selected));
					button.ariaLabel = selected ? t(document).unselectTurn : t(document).selectTurn;
				}
				if (controller.footer) {
					const strings = t(document);
					const all = controller.footer.querySelector("[data-dsh-share-select-all]");
					const count = controller.footer.querySelector("[data-dsh-share-selection-count]");
					const markdown = controller.footer.querySelector("[data-dsh-share-selection-markdown]");
					const create = controller.footer.querySelector("[data-dsh-share-selection-create]");
					all?.setAttribute("aria-checked", String(controller.snapshot.allSelected));
					const nextCount = strings.selectedCount(controller.selected.size);
					if (count && count.textContent !== nextCount) count.textContent = nextCount;
					if (markdown) markdown.disabled = controller.selected.size === 0;
					if (create) create.disabled = controller.selected.size === 0;
				}
				for (const listener of controller.listeners) listener();
			};
			const cleanupSelectionDom = (controller) => {
				const scroll = controller.scroll;
				const scrollTop = scroll?.scrollTop;
				controller.observer?.disconnect();
				controller.observer = void 0;
				controller.resizeObserver?.disconnect();
				controller.resizeObserver = void 0;
				controller.footer?.remove();
				controller.footer = void 0;
				if (scroll) {
					if (controller.contentClickHandler) scroll.removeEventListener("click", controller.contentClickHandler);
					controller.contentClickHandler = void 0;
					for (const region of scroll.querySelectorAll("[data-dsh-share-select-region]")) region.remove();
					for (const button of scroll.querySelectorAll("[data-dsh-share-turn-select]")) button.remove();
					for (const content of scroll.querySelectorAll("[data-dsh-share-select-content]")) {
						delete content.dataset.dshShareSelectContent;
						delete content.dataset.dshShareSelectTurnId;
					}
					for (const anchor of scroll.querySelectorAll("[data-dsh-share-select-anchor]")) delete anchor.dataset.dshShareSelectAnchor;
					for (const root of scroll.querySelectorAll("[data-dsh-share-select-range-root]")) delete root.dataset.dshShareSelectRangeRoot;
					delete scroll.dataset.dshShareSelection;
					if (scrollTop !== void 0) preserveScrollPosition(scroll, scrollTop);
				}
				controller.scroll = void 0;
				controller.refreshScheduled = false;
			};
			const resetSelection = (controller) => {
				cleanupSelectionDom(controller);
				controller.available.clear();
				controller.selected.clear();
				controller.selectNewTurns = true;
				controller.snapshots.clear();
				publishSelection(controller, false);
			};
			const snapshotTurn = (controller, turn) => {
				const existing = controller.snapshots.get(turn.id);
				if (existing) return existing;
				const snapshot = {
					content: snapshotTurnContent(turn.content),
					id: turn.id,
					turn: turn.turn
				};
				controller.snapshots.set(turn.id, snapshot);
				return snapshot;
			};
			const toggleSelection = (controller, turnId) => {
				if (!controller.snapshot.active) return;
				const turn = controller.available.get(turnId);
				if (!turn) return;
				controller.selectNewTurns = false;
				if (controller.selected.has(turnId)) controller.selected.delete(turnId);
				else controller.selected.set(turnId, snapshotTurn(controller, turn));
				publishSelection(controller, true);
			};
			const toggleAll = (controller) => {
				if (controller.snapshot.allSelected) {
					controller.selected.clear();
					controller.selectNewTurns = false;
				} else {
					controller.selected = new Map([...controller.available.values()].map((turn) => [turn.id, snapshotTurn(controller, turn)]));
					controller.selectNewTurns = true;
				}
				publishSelection(controller, true);
			};
			const createTurnSelectionButton = (controller, turn, kind) => {
				const button = makeButton(document, "dshShareTurnSelect");
				button.role = "checkbox";
				button.dataset.turnId = turn.id;
				button.dataset.dshShareTurnSelectKind = kind;
				const box = document.createElement("span");
				box.dataset.dshShareTurnSelectBox = "";
				button.append(box);
				button.addEventListener("click", (event) => {
					event.preventDefault();
					event.stopPropagation();
					toggleSelection(controller, button.dataset.turnId ?? "");
				});
				return button;
			};
			const attachSelectionContent = (turn, anchor, kind) => {
				anchor.dataset.dshShareSelectContent = kind;
				anchor.dataset.dshShareSelectTurnId = turn.id;
			};
			const attachQuestionSelectionButton = (controller, turn) => {
				const anchor = turn.questionAnchor;
				anchor.dataset.dshShareSelectAnchor = "";
				attachSelectionContent(turn, anchor, "question");
				let region = [...anchor.children].find((child) => child instanceof HTMLElement && child.dataset.dshShareSelectRegion === "question");
				if (!region) {
					region = document.createElement("div");
					region.dataset.dshShareSelectRegion = "question";
					region.append(createTurnSelectionButton(controller, turn, "question"));
					anchor.prepend(region);
				}
				const button = region.querySelector("[data-dsh-share-turn-select]");
				if (button) button.dataset.turnId = turn.id;
			};
			/**
			* DSH 把思考、工具调用和最终回答渲染为多个兄弟节点。
			* 因此在共同父容器上建立一个覆盖整段回答的绝对定位区间，
			* 内层 sticky 按钮才能像官网一样在长回答中吸顶，并在本轮回答末尾被推走。
			*/
			const attachAnswerSelectionButton = (controller, turn) => {
				const first = turn.answerAnchors[0];
				const last = turn.answerAnchors.at(-1);
				const root = first?.parentElement;
				if (!first || !last || !root || last.parentElement !== root) return;
				for (const anchor of turn.answerAnchors) attachSelectionContent(turn, anchor, "answer");
				root.dataset.dshShareSelectRangeRoot = "";
				controller.resizeObserver?.observe(root);
				let region = [...root.children].find((child) => child instanceof HTMLElement && child.dataset.dshShareSelectRegion === "answer" && child.dataset.turnId === turn.id);
				if (!region) {
					region = document.createElement("div");
					region.dataset.dshShareSelectRegion = "answer";
					region.dataset.turnId = turn.id;
					const sticky = document.createElement("div");
					sticky.dataset.dshShareSelectSticky = "";
					sticky.append(createTurnSelectionButton(controller, turn, "answer"));
					region.append(sticky);
					root.append(region);
				}
				const rootRect = root.getBoundingClientRect();
				const firstRect = first.getBoundingClientRect();
				const lastRect = last.getBoundingClientRect();
				region.style.top = `${Math.max(0, firstRect.top - rootRect.top)}px`;
				region.style.height = `${Math.max(44, lastRect.bottom - firstRect.top)}px`;
				const button = region.querySelector("[data-dsh-share-turn-select]");
				if (button) button.dataset.turnId = turn.id;
			};
			const attachSelectionButtons = (controller, turn) => {
				attachQuestionSelectionButton(controller, turn);
				attachAnswerSelectionButton(controller, turn);
			};
			const refreshSelection = (controller) => {
				const scroll = controller.scroll;
				if (!scroll || !controller.snapshot.active) return;
				for (const turn of selectableTurns(scroll)) {
					const isNew = !controller.available.has(turn.id);
					controller.available.set(turn.id, turn);
					if (isNew && controller.selectNewTurns) controller.selected.set(turn.id, snapshotTurn(controller, turn));
					attachSelectionButtons(controller, turn);
				}
				publishSelection(controller, true);
			};
			const scheduleRefresh = (controller) => {
				if (controller.refreshScheduled) return;
				controller.refreshScheduled = true;
				Promise.resolve().then(() => {
					controller.refreshScheduled = false;
					refreshSelection(controller);
				});
			};
			const createSelectionFooter = (controller) => {
				const strings = t(document);
				const footer = document.createElement("div");
				footer.dataset.dshShareSelectionFooter = "";
				const inner = document.createElement("div");
				inner.dataset.dshShareSelectionFooterInner = "";
				const selectAll = makeButton(document, "dshShareSelectAll");
				selectAll.role = "checkbox";
				selectAll.ariaLabel = strings.selectAll;
				const selectAllBox = document.createElement("span");
				selectAllBox.dataset.dshShareSelectAllBox = "";
				const selectAllLabel = document.createElement("span");
				selectAllLabel.textContent = strings.selectAll;
				selectAll.append(selectAllBox, selectAllLabel);
				selectAll.addEventListener("click", () => toggleAll(controller));
				const divider = document.createElement("span");
				divider.dataset.dshShareSelectionDivider = "";
				const count = document.createElement("span");
				count.dataset.dshShareSelectionCount = "";
				const cancel = makeButton(document, "dshShareSelectionCancel");
				cancel.textContent = strings.cancelSelection;
				cancel.addEventListener("click", () => resetSelection(controller));
				const markdown = makeButton(document, "dshShareSelectionMarkdown");
				appendResponsiveLabel(document, markdown, strings.downloadMarkdown, strings.downloadMarkdownCompact);
				markdown.addEventListener("click", () => {
					const messages = selectedTurnsToShareMessages(controller.selected.values());
					if (messages.length === 0) return;
					downloadMarkdownFile(document, createShareMarkdown(messages, getLocale(document), dialog.settings));
				});
				const create = makeButton(document, "dshShareSelectionCreate");
				appendResponsiveLabel(document, create, strings.createSelection, strings.createSelectionCompact);
				create.addEventListener("click", () => {
					const messages = selectedTurnsToShareMessages(controller.selected.values());
					if (messages.length === 0) return;
					activeContent = messages;
					activeGroupCount = controller.selected.size;
					renderContent(messages, activeGroupCount);
				});
				inner.append(selectAll, divider, count, cancel, markdown, create);
				footer.append(inner);
				return footer;
			};
			const clearSettingsRenderTimer = () => {
				if (settingsRenderTimer === void 0) return;
				document.defaultView?.clearTimeout(settingsRenderTimer);
				settingsRenderTimer = void 0;
			};
			const createRenderRequest = (content, groupCount, preservePreview = false, epoch = ++renderEpoch) => {
				const locale = getLocale(document);
				const settings = dialog.settings;
				dialog.showLoading(groupCount, preservePreview, true);
				return {
					content,
					epoch,
					locale,
					preservePreview,
					settings
				};
			};
			const executeRender = async (request) => {
				const card = createShareCard(document, request.content, request.locale, request.settings);
				try {
					const blob = await renderImage(card.element);
					if (request.epoch === renderEpoch) await dialog.showResult(blob, () => request.epoch === renderEpoch);
				} catch (error) {
					if (request.epoch === renderEpoch) {
						console.warn("[dsh-share] Failed to render conversation image", error);
						dialog.showError(request.preservePreview);
					}
				} finally {
					card.dispose();
				}
			};
			/** 图片生成不可取消，因此只允许一个画布任务运行；等待中的请求只保留最新一次。 */
			const drainRenderQueue = async () => {
				if (renderRunning) return;
				renderRunning = true;
				try {
					while (pendingRender) {
						const request = pendingRender;
						pendingRender = void 0;
						await executeRender(request);
					}
				} finally {
					renderRunning = false;
					if (pendingRender) drainRenderQueue();
				}
			};
			const renderContent = (content, groupCount, preservePreview = false) => {
				clearSettingsRenderTimer();
				pendingRender = createRenderRequest(content, groupCount, preservePreview);
				drainRenderQueue();
			};
			const scheduleSettingsRender = (content, groupCount) => {
				clearSettingsRenderTimer();
				pendingRender = void 0;
				const epoch = ++renderEpoch;
				dialog.showPendingUpdate();
				const window = document.defaultView;
				if (!window) {
					pendingRender = createRenderRequest(content, groupCount, true, epoch);
					drainRenderQueue();
					return;
				}
				settingsRenderTimer = window.setTimeout(() => {
					settingsRenderTimer = void 0;
					if (epoch !== renderEpoch) return;
					pendingRender = createRenderRequest(content, groupCount, true, epoch);
					drainRenderQueue();
				}, 80);
			};
			const invalidateRenderQueue = () => {
				clearSettingsRenderTimer();
				pendingRender = void 0;
				renderEpoch += 1;
			};
			dialog = new PreviewDialog(document, {
				onSettingsChange: () => {
					if (activeContent) scheduleSettingsRender(activeContent, activeGroupCount);
				},
				onDismiss: () => {
					activeContent = void 0;
					activeGroupCount = 0;
					invalidateRenderQueue();
				}
			});
			const enterSelection = (sessionId, source, initialTurn) => {
				for (const [id, other] of selections) if (id !== sessionId && other.snapshot.active) resetSelection(other);
				const controller = selectionFor(sessionId);
				if (controller.snapshot.active) return;
				resetSelection(controller);
				const scroll = (source?.closest("[data-phase]"))?.querySelector("[data-conversation-scroll]") ?? document.querySelector("[data-conversation-scroll]");
				if (!scroll) return;
				const scrollTop = scroll.scrollTop;
				controller.scroll = scroll;
				controller.selectNewTurns = initialTurn === void 0;
				scroll.dataset.dshShareSelection = "";
				controller.contentClickHandler = (event) => {
					const target = event.target;
					if (!(target instanceof Element)) return;
					if (target.closest("[data-dsh-share-turn-select]")) return;
					const content = target.closest("[data-dsh-share-select-content]");
					if (!content || !scroll.contains(content)) return;
					event.preventDefault();
					event.stopPropagation();
					toggleSelection(controller, content.dataset.dshShareSelectTurnId ?? "");
				};
				scroll.addEventListener("click", controller.contentClickHandler);
				const ResizeObserverConstructor = document.defaultView?.ResizeObserver;
				if (ResizeObserverConstructor) {
					controller.resizeObserver = new ResizeObserverConstructor(() => scheduleRefresh(controller));
					controller.resizeObserver.observe(scroll);
				}
				publishSelection(controller, true);
				refreshSelection(controller);
				if (initialTurn !== void 0) {
					const selected = controller.available.get(String(initialTurn));
					if (selected) controller.selected.set(selected.id, snapshotTurn(controller, selected));
				}
				controller.footer = createSelectionFooter(controller);
				scroll.append(controller.footer);
				publishSelection(controller, true);
				const MutationObserverConstructor = document.defaultView?.MutationObserver;
				if (MutationObserverConstructor) {
					controller.observer = new MutationObserverConstructor((records) => {
						if (records.some(mutationNeedsSelectionRefresh)) scheduleRefresh(controller);
					});
					controller.observer.observe(scroll, {
						childList: true,
						subtree: true
					});
				}
				preserveScrollPosition(scroll, scrollTop);
			};
			let disposed = false;
			return {
				document,
				selectionFor,
				enterSelection,
				cancelSelection: (sessionId) => {
					resetSelection(selectionFor(sessionId));
				},
				toggleSelection: (sessionId, turnId) => toggleSelection(selectionFor(sessionId), turnId),
				openSelected: (sessionId) => {
					const controller = selectionFor(sessionId);
					const messages = selectedTurnsToShareMessages(controller.selected.values());
					if (messages.length === 0) return;
					activeContent = messages;
					activeGroupCount = controller.selected.size;
					renderContent(messages, activeGroupCount);
				},
				dispose: () => {
					if (disposed) return;
					disposed = true;
					activeContent = void 0;
					activeGroupCount = 0;
					invalidateRenderQueue();
					for (const controller of selections.values()) {
						cleanupSelectionDom(controller);
						controller.listeners.clear();
						controller.available.clear();
						controller.selected.clear();
						controller.snapshots.clear();
					}
					selections.clear();
					style.remove();
					dialog.destroy();
				}
			};
		}
		/** 官方 assistant-actions 插槽中的分享入口。 */
		function ShareAction({ messageId, sessionId, shareRuntime, useSession, useShareSelection }) {
			const strings = t(shareRuntime.document);
			const selection = useShareSelection((snapshot) => snapshot);
			const turn = useSession((snapshot) => {
				for (const node of snapshot.chat.nodes.values()) {
					if (node.kind !== "turn-tail") continue;
					const data = node.data;
					if (data.closing?.finalNode.messageId === messageId) return data.turn;
				}
				return 0;
			});
			if (selection.active) return (0, react.createElement)(react.Fragment);
			const button = (0, react.createElement)("button", {
				type: "button",
				"data-dsh-share-button": "",
				"aria-label": strings.share,
				onClick: (event) => {
					shareRuntime.enterSelection(String(sessionId), event.currentTarget, turn);
				}
			}, (0, react.createElement)(_deepseek_ai_dsh_client_ui_primitives.IconShareOutline16, { size: 16 }));
			return (0, react.createElement)(_deepseek_ai_dsh_client_ui_primitives.Tooltip, {
				label: strings.shareTooltip,
				side: "bottom",
				children: button
			});
		}
		/** 官方 Session Header 右侧 utilities 插槽中的多轮分享入口。 */
		function ShareConversationAction({ sessionId, shareRuntime, useShareSelection }) {
			const strings = t(shareRuntime.document);
			if (useShareSelection((snapshot) => snapshot).active) return (0, react.createElement)(react.Fragment);
			const button = (0, react.createElement)("button", {
				type: "button",
				"data-dsh-share-conversation": "",
				"aria-label": strings.shareConversation,
				onClick: (event) => {
					shareRuntime.enterSelection(String(sessionId), event.currentTarget);
				}
			}, (0, react.createElement)(_deepseek_ai_dsh_client_ui_primitives.IconShareOutline16, { size: 16 }));
			return (0, react.createElement)(_deepseek_ai_dsh_client_ui_primitives.Tooltip, {
				label: strings.shareConversation,
				side: "bottom",
				children: button
			});
		}
		function apply(ctx) {
			let sharedRuntime;
			let registrations = 0;
			const runtimeForRegistration = () => {
				sharedRuntime ??= createShareRuntime(document);
				return sharedRuntime;
			};
			const injectFace = (sessionId) => {
				const runtime = runtimeForRegistration();
				return {
					hooks: { shareSelection: runtime.selectionFor(String(sessionId)) },
					shareRuntime: runtime
				};
			};
			const cleanup = (disposeRegistration) => {
				registrations += 1;
				return () => {
					disposeRegistration();
					registrations -= 1;
					if (registrations === 0) {
						sharedRuntime?.dispose();
						sharedRuntime = void 0;
					}
				};
			};
			ctx.slots.inject("conversation.chat.assistant-actions", () => {
				const disposeRegistration = ctx.slots.register({
					name: "conversation.chat.assistant-actions",
					id: "share",
					order: 20,
					inject: injectFace
				}, ShareAction);
				return cleanup(disposeRegistration);
			});
			ctx.slots.inject("conversation.session.header.utilities", () => {
				const disposeRegistration = ctx.slots.register({
					name: "conversation.session.header.utilities",
					id: "share-conversation",
					order: -10,
					inject: injectFace
				}, ShareConversationAction);
				return cleanup(disposeRegistration);
			});
		}
		//#endregion
		exports.DEFAULT_SHARE_SETTINGS = DEFAULT_SHARE_SETTINGS;
		exports.FONT_SIZE_PRESETS = FONT_SIZE_PRESETS;
		exports.ShareAction = ShareAction;
		exports.ShareConversationAction = ShareConversationAction;
		exports.WIDTH_PRESETS = WIDTH_PRESETS;
		exports.apply = apply;
		exports.createShareCard = createShareCard;
		exports.createShareMarkdown = createShareMarkdown;
		exports.createShareRuntime = createShareRuntime;
		exports.findTurnContent = findTurnContent;
		exports.findTurnContentFromAction = findTurnContentFromAction;
		exports.inject = inject;
		exports.loadShareSettings = loadShareSettings;
		exports.name = name;
		exports.renderShareImage = renderShareImage;
		exports.saveShareSettings = saveShareSettings;
		return module.exports;
	}
});
