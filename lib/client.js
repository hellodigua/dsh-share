window.__ModuleLoader__.load({
	id: "@dsh-external/dsh-share",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		//#region \0rolldown/runtime.js
		var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
		//#endregion
		//#region node_modules/.pnpm/html-to-image@1.11.13/node_modules/html-to-image/lib/util.js
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
		//#region node_modules/.pnpm/html-to-image@1.11.13/node_modules/html-to-image/lib/clone-pseudos.js
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
		//#region node_modules/.pnpm/html-to-image@1.11.13/node_modules/html-to-image/lib/mimes.js
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
		//#region node_modules/.pnpm/html-to-image@1.11.13/node_modules/html-to-image/lib/dataurl.js
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
		//#region node_modules/.pnpm/html-to-image@1.11.13/node_modules/html-to-image/lib/clone-node.js
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
		//#region node_modules/.pnpm/html-to-image@1.11.13/node_modules/html-to-image/lib/embed-resources.js
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
		//#region node_modules/.pnpm/html-to-image@1.11.13/node_modules/html-to-image/lib/embed-images.js
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
		//#region node_modules/.pnpm/html-to-image@1.11.13/node_modules/html-to-image/lib/apply-style.js
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
		//#region node_modules/.pnpm/html-to-image@1.11.13/node_modules/html-to-image/lib/embed-webfonts.js
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
			fontSize: "normal"
		};
		const WIDTH_STORAGE_KEY = "dsh-share.width";
		const FONT_SIZE_STORAGE_KEY = "dsh-share.font-size";
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
				return {
					width: width !== null && WIDTH_VALUES.has(width) ? width : DEFAULT_SHARE_SETTINGS.width,
					fontSize: fontSize !== null && FONT_SIZE_VALUES.has(fontSize) ? fontSize : DEFAULT_SHARE_SETTINGS.fontSize
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
		/**
		* 工具卡片内部包含展开面板、终端和交互控件，直接克隆既容易过长，也可能影响图片生成。
		* 这里只提取当前 DSH 稳定暴露的摘要行，再用插件自己的轻量结构绘制。
		*/
		function cloneToolCallSummary(source, locale) {
			const clone = source.ownerDocument.createElement("div");
			clone.dataset.dshShareMessage = "";
			clone.dataset.dshShareToolCall = "";
			const summaryRows = source.querySelectorAll("[data-disclosure-row], [data-sample=\"bash\"]");
			for (const summary of summaryRows) {
				const parts = [...summary.children].map((child) => normalizeText(child.textContent)).filter(Boolean);
				const text = parts.length > 0 ? parts.join(" · ") : normalizeText(summary.textContent);
				if (!text) continue;
				const row = source.ownerDocument.createElement("div");
				row.dataset.dshShareToolSummary = "";
				row.textContent = text;
				applyStyles(row, {
					background: "var(--dsw-alias-bg-elevated, rgba(127, 127, 127, 0.08))",
					border: "1px solid var(--dsw-alias-line-border, rgba(127, 127, 127, 0.18))",
					borderRadius: "8px",
					color: "var(--dsw-alias-label-secondary, #4b5563)",
					margin: "8px 0",
					padding: "9px 12px"
				});
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
		function cloneMessage(source, locale) {
			if (source.dataset.chatFlowKind === "tool-call") return cloneToolCallSummary(source, locale);
			const clone = source.cloneNode(true);
			clone.dataset.dshShareMessage = "";
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
		function createShareCard(document, content, locale, settings = DEFAULT_SHARE_SETTINGS) {
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
			const promptSection = document.createElement("section");
			for (const prompt of content.prompts) promptSection.append(cloneMessage(prompt, locale));
			applyStyles(promptSection, { marginBottom: "30px" });
			card.append(promptSection);
			const answerSection = document.createElement("section");
			for (const answer of content.answers) answerSection.append(cloneMessage(answer, locale));
			card.append(answerSection);
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
		//#region src/client/dom.ts
		const TURN_TAIL_SELECTOR = "[data-turn-tail]";
		const TURN_FLOW_SELECTOR = "[data-chat-flow-kind=\"turn-tail\"]";
		const SHARE_BUTTON_SELECTOR = "[data-dsh-share-button]";
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
		/** 找到复制、分支和时间所在的按钮行。 */
		function findActionRow(tail) {
			const candidate = tail.lastElementChild;
			if (!(candidate instanceof HTMLElement)) return void 0;
			if (!candidate.querySelector("button")) return void 0;
			return candidate;
		}
		//#endregion
		//#region src/client/index.ts
		const name = "@dsh-external/dsh-share/client";
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
  opacity: .72;
  padding: 6px;
  width: 28px;
}
[data-dsh-share-button]:hover {
  background: var(--dsw-alias-interactive-bg-hover, rgba(127, 127, 127, .12));
  color: var(--dsw-alias-label-secondary, currentColor);
  opacity: 1;
}
[data-dsh-share-button]:disabled { cursor: wait; opacity: .38; }
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
		const SHARE_ICON = `
<svg aria-hidden="true" fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
  <circle cx="4" cy="8" r="1.75" stroke="currentColor" stroke-width="1.4"/>
  <circle cx="12" cy="4" r="1.75" stroke="currentColor" stroke-width="1.4"/>
  <circle cx="12" cy="12" r="1.75" stroke="currentColor" stroke-width="1.4"/>
  <path d="m5.55 7.23 4.9-2.45M5.55 8.77l4.9 2.45" stroke="currentColor" stroke-linecap="round" stroke-width="1.4"/>
</svg>`;
		function getLocale(document) {
			return document.documentElement.lang.toLowerCase().startsWith("zh") ? "zh" : "en";
		}
		function t(document) {
			if (getLocale(document) === "zh") return {
				title: "分享当前问答",
				share: "将当前问答分享为图片",
				loading: "正在生成图片…",
				copy: "复制图片",
				download: "下载 PNG",
				copied: "图片已复制",
				copyUnsupported: "当前浏览器不支持复制图片，请下载 PNG。",
				copyFailed: "复制失败，请下载 PNG。",
				renderFailed: "图片生成失败，请稍后重试。",
				updating: "正在更新预览…",
				updateFailed: "更新失败，当前仍为上一张预览。",
				close: "关闭",
				width: "宽度",
				fontSize: "字号",
				phone: "手机",
				tablet: "平板",
				desktop: "电脑",
				normal: "标准",
				large: "大",
				xlarge: "超大"
			};
			return {
				title: "Share this Q&A",
				share: "Share this Q&A as an image",
				loading: "Generating image…",
				copy: "Copy image",
				download: "Download PNG",
				copied: "Image copied",
				copyUnsupported: "Image clipboard is unavailable. Please download the PNG.",
				copyFailed: "Could not copy the image. Please download the PNG.",
				renderFailed: "Could not generate the image. Please try again.",
				updating: "Updating preview…",
				updateFailed: "Update failed. The previous preview is still shown.",
				close: "Close",
				width: "Width",
				fontSize: "Size",
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
		function createFilename(now = /* @__PURE__ */ new Date()) {
			const pad = (number) => String(number).padStart(2, "0");
			return `dsh-share-${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}.png`;
		}
		var PreviewDialog = class {
			document;
			options;
			element;
			image;
			message;
			status;
			copyButton;
			downloadButton;
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
				this.image = dialog.querySelector("[data-dsh-share-preview]");
				this.message = dialog.querySelector("[data-dsh-share-message]");
				this.status = dialog.querySelector("[data-dsh-share-status]");
				this.copyButton = dialog.querySelector("[data-dsh-share-copy]");
				this.downloadButton = dialog.querySelector("[data-dsh-share-download]");
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
				const title = dialog.querySelector("[data-dsh-share-title]");
				const close = dialog.querySelector("[data-dsh-share-close]");
				const widthLabel = dialog.querySelector("[data-dsh-share-width-label]");
				const fontSizeLabel = dialog.querySelector("[data-dsh-share-font-size-label]");
				title.textContent = strings.title;
				widthLabel.textContent = strings.width;
				fontSizeLabel.textContent = strings.fontSize;
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
				this.updateChoiceState();
				document.body.append(dialog);
			}
			get settings() {
				return { ...this.currentSettings };
			}
			showLoading(preservePreview = false) {
				const strings = t(this.document);
				const canPreserve = preservePreview && this.blob !== void 0 && this.objectUrl !== void 0;
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
				this.clearResult();
				this.message.hidden = false;
				this.message.textContent = strings.loading;
				this.image.hidden = true;
				this.status.textContent = "";
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
				this.clearResult();
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
					this.updateChoiceState();
					this.options.onSettingsChange(this.settings);
				});
				return button;
			}
			updateChoiceState() {
				for (const button of this.choiceButtons) {
					const selected = button.dataset.dshShareChoice === "width" ? button.dataset.value === this.currentSettings.width : button.dataset.value === this.currentSettings.fontSize;
					button.setAttribute("aria-pressed", String(selected));
				}
			}
			clearResult() {
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
				anchor.download = createFilename();
				anchor.click();
			}
		};
		const installations = /* @__PURE__ */ new WeakMap();
		function installShareButton(document, options = {}) {
			const current = installations.get(document);
			if (current) {
				current.owners += 1;
				return createRelease(document, current);
			}
			const style = document.createElement("style");
			style.id = STYLE_ID;
			style.textContent = STYLE_TEXT;
			document.head.append(style);
			const renderImage = options.renderImage ?? renderShareImage;
			let activeContent;
			let renderEpoch = 0;
			let dialog;
			const renderContent = async (content, sourceButton, preservePreview = false) => {
				const epoch = ++renderEpoch;
				if (sourceButton) sourceButton.disabled = true;
				dialog.showLoading(preservePreview);
				const card = createShareCard(document, content, getLocale(document), dialog.settings);
				try {
					const blob = await renderImage(card.element);
					if (epoch === renderEpoch) await dialog.showResult(blob, () => epoch === renderEpoch);
				} catch (error) {
					if (epoch === renderEpoch) {
						console.warn("[dsh-share] Failed to render conversation image", error);
						dialog.showError(preservePreview);
					}
				} finally {
					card.dispose();
					if (sourceButton) sourceButton.disabled = false;
				}
			};
			dialog = new PreviewDialog(document, {
				onSettingsChange: () => {
					if (activeContent) renderContent(activeContent, void 0, true);
				},
				onDismiss: () => {
					activeContent = void 0;
					renderEpoch += 1;
				}
			});
			const attach = (tail) => {
				const row = findActionRow(tail);
				if (!row) return;
				const existing = tail.querySelector(SHARE_BUTTON_SELECTOR);
				if (existing) {
					existing.title = t(document).share;
					existing.ariaLabel = t(document).share;
					return;
				}
				const button = document.createElement("button");
				button.type = "button";
				button.dataset.dshShareButton = "";
				button.innerHTML = SHARE_ICON;
				button.title = t(document).share;
				button.ariaLabel = t(document).share;
				button.addEventListener("click", () => {
					const content = findTurnContent(tail);
					if (!content) {
						dialog.showError();
						return;
					}
					activeContent = content;
					renderContent(content, button);
				});
				Array.from(row.querySelectorAll("button")).at(-1)?.insertAdjacentElement("afterend", button);
			};
			const scan = (root) => {
				if (root instanceof HTMLElement && root.matches("[data-turn-tail]")) attach(root);
				for (const tail of root.querySelectorAll(TURN_TAIL_SELECTOR)) attach(tail);
			};
			const MutationObserverConstructor = document.defaultView?.MutationObserver;
			if (!MutationObserverConstructor) throw new Error("MutationObserver is unavailable");
			const observer = new MutationObserverConstructor((mutations) => {
				for (const mutation of mutations) {
					if (mutation.type === "attributes") {
						scan(document);
						continue;
					}
					if (mutation.target instanceof HTMLElement) scan(mutation.target);
					for (const node of mutation.addedNodes) if (node instanceof HTMLElement) scan(node);
				}
			});
			observer.observe(document.documentElement, {
				attributeFilter: ["lang"],
				attributes: true,
				childList: true,
				subtree: true
			});
			scan(document);
			const runtime = {
				owners: 1,
				dispose: () => {
					activeContent = void 0;
					renderEpoch += 1;
					observer.disconnect();
					for (const button of document.querySelectorAll(SHARE_BUTTON_SELECTOR)) button.remove();
					document.getElementById(STYLE_ID)?.remove();
					dialog.destroy();
				}
			};
			installations.set(document, runtime);
			return createRelease(document, runtime);
		}
		function createRelease(document, runtime) {
			let released = false;
			return () => {
				if (released) return;
				released = true;
				release(document, runtime);
			};
		}
		function release(document, runtime) {
			runtime.owners -= 1;
			if (runtime.owners > 0) return;
			runtime.dispose();
			installations.delete(document);
		}
		function apply(ctx) {
			ctx.effect(() => installShareButton(document), "dsh-share: web UI");
		}
		//#endregion
		exports.DEFAULT_SHARE_SETTINGS = DEFAULT_SHARE_SETTINGS;
		exports.FONT_SIZE_PRESETS = FONT_SIZE_PRESETS;
		exports.WIDTH_PRESETS = WIDTH_PRESETS;
		exports.apply = apply;
		exports.createShareCard = createShareCard;
		exports.findActionRow = findActionRow;
		exports.findTurnContent = findTurnContent;
		exports.installShareButton = installShareButton;
		exports.loadShareSettings = loadShareSettings;
		exports.name = name;
		exports.renderShareImage = renderShareImage;
		exports.saveShareSettings = saveShareSettings;
		return module.exports;
	}
});
