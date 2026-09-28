(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/client/portal/index.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Portal", {
    enumerable: true,
    get: function() {
        return Portal;
    }
});
const _react = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/react/index.js [client] (ecmascript)");
const _reactdom = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/react-dom/index.js [client] (ecmascript)");
const Portal = ({ children, type })=>{
    const [portalNode, setPortalNode] = (0, _react.useState)(null);
    (0, _react.useEffect)(()=>{
        const element = document.createElement(type);
        document.body.appendChild(element);
        setPortalNode(element);
        return ()=>{
            document.body.removeChild(element);
        };
    }, [
        type
    ]);
    return portalNode ? /*#__PURE__*/ (0, _reactdom.createPortal)(children, portalNode) : null;
};
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=index.js.map
}),
"[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/client/set-attributes-from-props.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "setAttributesFromProps", {
    enumerable: true,
    get: function() {
        return setAttributesFromProps;
    }
});
const DOMAttributeNames = {
    acceptCharset: 'accept-charset',
    className: 'class',
    htmlFor: 'for',
    httpEquiv: 'http-equiv',
    noModule: 'noModule'
};
const ignoreProps = [
    'onLoad',
    'onReady',
    'dangerouslySetInnerHTML',
    'children',
    'onError',
    'strategy',
    'stylesheets'
];
function isBooleanScriptAttribute(attr) {
    return [
        'async',
        'defer',
        'noModule'
    ].includes(attr);
}
function setAttributesFromProps(el, props) {
    for (const [p, value] of Object.entries(props)){
        if (!props.hasOwnProperty(p)) continue;
        if (ignoreProps.includes(p)) continue;
        // we don't render undefined props to the DOM
        if (value === undefined) {
            continue;
        }
        const attr = DOMAttributeNames[p] || p.toLowerCase();
        if (el.tagName === 'SCRIPT' && isBooleanScriptAttribute(attr)) {
            // Correctly assign boolean script attributes
            // https://github.com/vercel/next.js/pull/20748
            ;
            el[attr] = !!value;
        } else {
            el.setAttribute(attr, String(value));
        }
        // Remove falsy non-zero boolean attributes so they are correctly interpreted
        // (e.g. if we set them to false, this coerces to the string "false", which the browser interprets as true)
        if (value === false || el.tagName === 'SCRIPT' && isBooleanScriptAttribute(attr) && (!value || value === 'false')) {
            // Call setAttribute before, as we need to set and unset the attribute to override force async:
            // https://html.spec.whatwg.org/multipage/scripting.html#script-force-async
            el.setAttribute(attr, '');
            el.removeAttribute(attr);
        }
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=set-attributes-from-props.js.map
}),
"[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/client/head-manager.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    default: null,
    isEqualNode: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    default: function() {
        return initHeadManager;
    },
    isEqualNode: function() {
        return isEqualNode;
    }
});
const _setattributesfromprops = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/client/set-attributes-from-props.js [client] (ecmascript)");
function reactElementToDOM({ type, props }) {
    const el = document.createElement(type);
    (0, _setattributesfromprops.setAttributesFromProps)(el, props);
    const { children, dangerouslySetInnerHTML } = props;
    if (dangerouslySetInnerHTML) {
        el.innerHTML = dangerouslySetInnerHTML.__html || '';
    } else if (children) {
        el.textContent = typeof children === 'string' ? children : Array.isArray(children) ? children.join('') : '';
    }
    return el;
}
function isEqualNode(oldTag, newTag) {
    if (oldTag instanceof HTMLElement && newTag instanceof HTMLElement) {
        const nonce = newTag.getAttribute('nonce');
        // Only strip the nonce if `oldTag` has had it stripped. An element's nonce attribute will not
        // be stripped if there is no content security policy response header that includes a nonce.
        if (nonce && !oldTag.getAttribute('nonce')) {
            const cloneTag = newTag.cloneNode(true);
            cloneTag.setAttribute('nonce', '');
            cloneTag.nonce = nonce;
            return nonce === oldTag.nonce && oldTag.isEqualNode(cloneTag);
        }
    }
    return oldTag.isEqualNode(newTag);
}
function updateElements(type, components) {
    const headEl = document.querySelector('head');
    if (!headEl) return;
    const oldTags = new Set(headEl.querySelectorAll(`${type}[data-next-head]`));
    if (type === 'meta') {
        const metaCharset = headEl.querySelector('meta[charset]');
        if (metaCharset !== null) {
            oldTags.add(metaCharset);
        }
    }
    const newTags = [];
    for(let i = 0; i < components.length; i++){
        const component = components[i];
        const newTag = reactElementToDOM(component);
        newTag.setAttribute('data-next-head', '');
        let isNew = true;
        for (const oldTag of oldTags){
            if (isEqualNode(oldTag, newTag)) {
                oldTags.delete(oldTag);
                isNew = false;
                break;
            }
        }
        if (isNew) {
            newTags.push(newTag);
        }
    }
    for (const oldTag of oldTags){
        oldTag.parentNode?.removeChild(oldTag);
    }
    for (const newTag of newTags){
        // meta[charset] must be first element so special case
        if (newTag.tagName.toLowerCase() === 'meta' && newTag.getAttribute('charset') !== null) {
            headEl.prepend(newTag);
        }
        headEl.appendChild(newTag);
    }
}
function initHeadManager() {
    return {
        mountedInstances: new Set(),
        updateHead: (head)=>{
            const tags = {};
            head.forEach((h)=>{
                if (// it won't be inlined. In this case revert to the original behavior
                h.type === 'link' && h.props['data-optimized-fonts']) {
                    if (document.querySelector(`style[data-href="${h.props['data-href']}"]`)) {
                        return;
                    } else {
                        h.props.href = h.props['data-href'];
                        h.props['data-href'] = undefined;
                    }
                }
                const components = tags[h.type] || [];
                components.push(h);
                tags[h.type] = components;
            });
            const titleComponent = tags.title ? tags.title[0] : null;
            let title = '';
            if (titleComponent) {
                const { children } = titleComponent.props;
                title = typeof children === 'string' ? children : Array.isArray(children) ? children.join('') : '';
            }
            if (title !== document.title) document.title = title;
            [
                'meta',
                'base',
                'link',
                'style',
                'script'
            ].forEach((type)=>{
                updateElements(type, tags[type] || []);
            });
        }
    };
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=head-manager.js.map
}),
"[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/client/normalize-trailing-slash.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$ChatGPT$2f$believe$2d$konde$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "normalizePathTrailingSlash", {
    enumerable: true,
    get: function() {
        return normalizePathTrailingSlash;
    }
});
const _removetrailingslash = (()=>{
    const e = new Error("Cannot find module '../shared/lib/router/utils/remove-trailing-slash'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
const _parsepath = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/shared/lib/router/utils/parse-path.js [client] (ecmascript)");
const normalizePathTrailingSlash = (path)=>{
    // 47 is the char code for '/'
    if (path.charCodeAt(0) !== 47 || ("TURBOPACK compile-time value", void 0)) {
        return path;
    }
    const { pathname, query, hash } = (0, _parsepath.parsePath)(path);
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return `${(0, _removetrailingslash.removeTrailingSlash)(pathname)}${query}${hash}`;
};
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=normalize-trailing-slash.js.map
}),
"[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/client/add-base-path.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$ChatGPT$2f$believe$2d$konde$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "addBasePath", {
    enumerable: true,
    get: function() {
        return addBasePath;
    }
});
const _addpathprefix = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/shared/lib/router/utils/add-path-prefix.js [client] (ecmascript)");
const _normalizetrailingslash = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/client/normalize-trailing-slash.js [client] (ecmascript)");
const basePath = ("TURBOPACK compile-time value", "") || '';
function addBasePath(path, required) {
    return (0, _normalizetrailingslash.normalizePathTrailingSlash)(("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : (0, _addpathprefix.addPathPrefix)(path, basePath));
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=add-base-path.js.map
}),
"[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/client/add-locale.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$ChatGPT$2f$believe$2d$konde$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "addLocale", {
    enumerable: true,
    get: function() {
        return addLocale;
    }
});
const _normalizetrailingslash = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/client/normalize-trailing-slash.js [client] (ecmascript)");
const addLocale = (path, ...args)=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return path;
};
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=add-locale.js.map
}),
"[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/client/lib/promise.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$ChatGPT$2f$believe$2d$konde$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "resolvePromiseWithTimeout", {
    enumerable: true,
    get: function() {
        return resolvePromiseWithTimeout;
    }
});
const _requestidlecallback = (()=>{
    const e = new Error("Cannot find module '../request-idle-callback'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
// 3.8s was arbitrarily chosen as it's what https://web.dev/interactive
// considers as "Good" time-to-interactive. We must assume something went
// wrong beyond this point, and then fall-back to a full page transition to
// show the user something of value.
const MS_MAX_IDLE_DELAY = 3800;
function resolvePromiseWithTimeout(p, err, devPromise) {
    return new Promise((resolve, reject)=>{
        let cancelled = false;
        p.then((r)=>{
            // Resolved, cancel the timeout
            cancelled = true;
            resolve(r);
        }).catch(reject);
        // We wrap these checks separately for better dead-code elimination in
        // production bundles.
        if ("TURBOPACK compile-time truthy", 1) {
            ;
            (devPromise || Promise.resolve()).then(()=>{
                (0, _requestidlecallback.requestIdleCallback)(()=>setTimeout(()=>{
                        if (!cancelled) {
                            reject(err);
                        }
                    }, MS_MAX_IDLE_DELAY));
            });
        }
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    });
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=promise.js.map
}),
"[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/client/page-loader.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$ChatGPT$2f$believe$2d$konde$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return PageLoader;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [client] (ecmascript)");
const _addbasepath = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/client/add-base-path.js [client] (ecmascript)");
const _interpolateas = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/shared/lib/router/utils/interpolate-as.js [client] (ecmascript)");
const _getassetpathfromroute = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/shared/lib/router/utils/get-asset-path-from-route.js [client] (ecmascript)"));
const _addlocale = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/client/add-locale.js [client] (ecmascript)");
const _isdynamic = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/shared/lib/router/utils/is-dynamic.js [client] (ecmascript)");
const _parserelativeurl = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/shared/lib/router/utils/parse-relative-url.js [client] (ecmascript)");
const _removetrailingslash = (()=>{
    const e = new Error("Cannot find module '../shared/lib/router/utils/remove-trailing-slash'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
const _routeloader = (()=>{
    const e = new Error("Cannot find module './route-loader'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
const _constants = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/shared/lib/constants.js [client] (ecmascript)");
const _promise = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/client/lib/promise.js [client] (ecmascript)");
class PageLoader {
    constructor(buildId, assetPrefix){
        this.routeLoader = (0, _routeloader.createRouteLoader)(assetPrefix);
        this.buildId = buildId;
        this.assetPrefix = assetPrefix;
        this.promisedSsgManifest = new Promise((resolve)=>{
            if (window.__SSG_MANIFEST) {
                resolve(window.__SSG_MANIFEST);
            } else {
                window.__SSG_MANIFEST_CB = ()=>{
                    resolve(window.__SSG_MANIFEST);
                };
            }
        });
    }
    getPageList() {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        else {
            if (window.__DEV_PAGES_MANIFEST) {
                return window.__DEV_PAGES_MANIFEST.pages;
            } else {
                this.promisedDevPagesManifest ||= fetch(`${this.assetPrefix}/_next/static/development/${_constants.DEV_CLIENT_PAGES_MANIFEST}`, {
                    credentials: 'same-origin'
                }).then((res)=>res.json()).then((manifest)=>{
                    window.__DEV_PAGES_MANIFEST = manifest;
                    return manifest.pages;
                }).catch((err)=>{
                    console.log(`Failed to fetch devPagesManifest:`, err);
                    throw Object.defineProperty(new Error(`Failed to fetch _devPagesManifest.json. Is something blocking that network request?\n` + 'Read more: https://nextjs.org/docs/messages/failed-to-fetch-devpagesmanifest'), "__NEXT_ERROR_CODE", {
                        value: "E423",
                        enumerable: false,
                        configurable: true
                    });
                });
                return this.promisedDevPagesManifest;
            }
        }
    }
    getMiddleware() {
        // Webpack production
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        else if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        else {
            if (window.__DEV_MIDDLEWARE_MATCHERS) {
                return window.__DEV_MIDDLEWARE_MATCHERS;
            } else {
                if (!this.promisedMiddlewareMatchers) {
                    // TODO: Decide what should happen when fetching fails instead of asserting
                    // @ts-ignore
                    this.promisedMiddlewareMatchers = fetch(`${this.assetPrefix}/_next/static/${this.buildId}/${_constants.DEV_CLIENT_MIDDLEWARE_MANIFEST}`, {
                        credentials: 'same-origin'
                    }).then((res)=>res.json()).then((matchers)=>{
                        window.__DEV_MIDDLEWARE_MATCHERS = matchers;
                        return matchers;
                    }).catch((err)=>{
                        console.log(`Failed to fetch _devMiddlewareManifest`, err);
                    });
                }
                // TODO Remove this assertion as this could be undefined
                return this.promisedMiddlewareMatchers;
            }
        }
    }
    getDataHref(params) {
        const { asPath, href, locale } = params;
        const { pathname: hrefPathname, query, search } = (0, _parserelativeurl.parseRelativeUrl)(href);
        const { pathname: asPathname } = (0, _parserelativeurl.parseRelativeUrl)(asPath);
        const route = (0, _removetrailingslash.removeTrailingSlash)(hrefPathname);
        if (route[0] !== '/') {
            throw Object.defineProperty(new Error(`Route name should start with a "/", got "${route}"`), "__NEXT_ERROR_CODE", {
                value: "E303",
                enumerable: false,
                configurable: true
            });
        }
        const getHrefForSlug = (path)=>{
            const dataRoute = (0, _getassetpathfromroute.default)((0, _removetrailingslash.removeTrailingSlash)((0, _addlocale.addLocale)(path, locale)), '.json');
            return (0, _addbasepath.addBasePath)(`/_next/data/${this.buildId}${dataRoute}${search}`, true);
        };
        return getHrefForSlug(params.skipInterpolation ? asPathname : (0, _isdynamic.isDynamicRoute)(route) ? (0, _interpolateas.interpolateAs)(hrefPathname, asPathname, query).result : route);
    }
    _isSsg(/** the route (file-system path) */ route) {
        return this.promisedSsgManifest.then((manifest)=>manifest.has(route));
    }
    loadPage(route) {
        return this.routeLoader.loadRoute(route).then((res)=>{
            if ('component' in res) {
                return {
                    page: res.component,
                    mod: res.exports,
                    styleSheets: res.styles.map((o)=>({
                            href: o.href,
                            text: o.content
                        }))
                };
            }
            throw res.error;
        });
    }
    prefetch(route) {
        return this.routeLoader.prefetch(route);
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=page-loader.js.map
}),
"[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/client/has-base-path.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$ChatGPT$2f$believe$2d$konde$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "hasBasePath", {
    enumerable: true,
    get: function() {
        return hasBasePath;
    }
});
const _pathhasprefix = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/shared/lib/router/utils/path-has-prefix.js [client] (ecmascript)");
const basePath = ("TURBOPACK compile-time value", "") || '';
function hasBasePath(path) {
    return (0, _pathhasprefix.pathHasPrefix)(path, basePath);
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=has-base-path.js.map
}),
"[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/client/react-client-callbacks/on-recoverable-error.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$ChatGPT$2f$believe$2d$konde$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
// This module can be shared between both pages router and app router
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    isRecoverableError: null,
    onRecoverableError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    isRecoverableError: function() {
        return isRecoverableError;
    },
    onRecoverableError: function() {
        return onRecoverableError;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [client] (ecmascript)");
const _bailouttocsr = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/shared/lib/lazy-dynamic/bailout-to-csr.js [client] (ecmascript)");
const _iserror = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/lib/is-error.js [client] (ecmascript)"));
const _reportglobalerror = (()=>{
    const e = new Error("Cannot find module './report-global-error'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
const recoverableErrors = new WeakSet();
const isInstantTest = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$ChatGPT$2f$believe$2d$konde$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].env.__NEXT_EXPOSE_TESTING_API && typeof self !== 'undefined' && !!self.__next_instant_test;
function isRecoverableError(error) {
    return recoverableErrors.has(error);
}
const onRecoverableError = (error)=>{
    // x-ref: https://github.com/facebook/react/pull/28736
    let cause = (0, _iserror.default)(error) && 'cause' in error ? error.cause : error;
    // Skip certain custom errors which are not expected to be reported on client
    if ((0, _bailouttocsr.isBailoutToCSRError)(cause)) return;
    // Instant Navigation Testing API: suppress "server could not finish this
    // Suspense boundary" errors (React error #419) during instant test mode.
    // The static shell intentionally has incomplete Suspense boundaries — React
    // correctly falls back to client rendering, which is expected.
    if (isInstantTest) {
        if ((0, _iserror.default)(cause)) {
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            else {
                if (cause.message.includes('could not finish this Suspense boundary')) return;
            }
        }
    }
    if ("TURBOPACK compile-time truthy", 1) {
        const { decorateDevError } = (()=>{
            const e = new Error("Cannot find module '../../next-devtools/userspace/app/errors/stitched-error'");
            e.code = 'MODULE_NOT_FOUND';
            throw e;
        })();
        const causeError = decorateDevError(cause);
        recoverableErrors.add(causeError);
        cause = causeError;
    }
    (0, _reportglobalerror.reportGlobalError)(cause);
};
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=on-recoverable-error.js.map
}),
"[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/client/tracing/tracer.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [client] (ecmascript)");
const _mitt = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/shared/lib/mitt.js [client] (ecmascript)"));
class Span {
    constructor(name, options, onSpanEnd){
        this.name = name;
        this.attributes = options.attributes ?? {};
        this.startTime = options.startTime ?? Date.now();
        this.onSpanEnd = onSpanEnd;
        this.state = {
            state: 'inprogress'
        };
    }
    end(endTime) {
        if (this.state.state === 'ended') {
            throw Object.defineProperty(new Error('Span has already ended'), "__NEXT_ERROR_CODE", {
                value: "E17",
                enumerable: false,
                configurable: true
            });
        }
        this.state = {
            state: 'ended',
            endTime: endTime ?? Date.now()
        };
        this.onSpanEnd(this);
    }
}
class Tracer {
    startSpan(name, options) {
        return new Span(name, options, this.handleSpanEnd);
    }
    onSpanEnd(cb) {
        this._emitter.on('spanend', cb);
        return ()=>{
            this._emitter.off('spanend', cb);
        };
    }
    constructor(){
        this._emitter = (0, _mitt.default)();
        this.handleSpanEnd = (span)=>{
            this._emitter.emit('spanend', span);
        };
    }
}
const _default = new Tracer();
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=tracer.js.map
}),
"[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/client/components/http-access-fallback/http-access-fallback.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    HTTPAccessErrorStatus: null,
    HTTP_ERROR_FALLBACK_ERROR_CODE: null,
    getAccessFallbackErrorTypeByStatus: null,
    getAccessFallbackHTTPStatus: null,
    isHTTPAccessFallbackError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    HTTPAccessErrorStatus: function() {
        return HTTPAccessErrorStatus;
    },
    HTTP_ERROR_FALLBACK_ERROR_CODE: function() {
        return HTTP_ERROR_FALLBACK_ERROR_CODE;
    },
    getAccessFallbackErrorTypeByStatus: function() {
        return getAccessFallbackErrorTypeByStatus;
    },
    getAccessFallbackHTTPStatus: function() {
        return getAccessFallbackHTTPStatus;
    },
    isHTTPAccessFallbackError: function() {
        return isHTTPAccessFallbackError;
    }
});
const HTTPAccessErrorStatus = {
    NOT_FOUND: 404,
    FORBIDDEN: 403,
    UNAUTHORIZED: 401
};
const ALLOWED_CODES = new Set(Object.values(HTTPAccessErrorStatus));
const HTTP_ERROR_FALLBACK_ERROR_CODE = 'NEXT_HTTP_ERROR_FALLBACK';
function isHTTPAccessFallbackError(error) {
    if (typeof error !== 'object' || error === null || !('digest' in error) || typeof error.digest !== 'string') {
        return false;
    }
    const [prefix, httpStatus] = error.digest.split(';');
    return prefix === HTTP_ERROR_FALLBACK_ERROR_CODE && ALLOWED_CODES.has(Number(httpStatus));
}
function getAccessFallbackHTTPStatus(error) {
    const httpStatus = error.digest.split(';')[1];
    return Number(httpStatus);
}
function getAccessFallbackErrorTypeByStatus(status) {
    switch(status){
        case 401:
            return 'unauthorized';
        case 403:
            return 'forbidden';
        case 404:
            return 'not-found';
        default:
            return;
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=http-access-fallback.js.map
}),
"[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/client/components/is-next-router-error.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isNextRouterError", {
    enumerable: true,
    get: function() {
        return isNextRouterError;
    }
});
const _httpaccessfallback = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/client/components/http-access-fallback/http-access-fallback.js [client] (ecmascript)");
const _redirecterror = (()=>{
    const e = new Error("Cannot find module './redirect-error'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
function isNextRouterError(error) {
    return (0, _redirecterror.isRedirectError)(error) || (0, _httpaccessfallback.isHTTPAccessFallbackError)(error);
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=is-next-router-error.js.map
}),
"[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/client/dev/hot-reloader/pages/hot-reloader-pages.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$ChatGPT$2f$believe$2d$konde$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
// TODO: Remove use of `any` type.
/**
 * MIT License
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */ /// <reference types="webpack/module.d.ts" />
// This file is a modified version of the Create React App HMR dev client that
// can be found here:
// https://github.com/facebook/create-react-app/blob/v3.4.1/packages/react-dev-utils/webpackHotDevClient.js
/// <reference types="webpack/module.d.ts" />
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    default: null,
    handleStaticIndicator: null,
    performFullReload: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    default: function() {
        return connect;
    },
    handleStaticIndicator: function() {
        return handleStaticIndicator;
    },
    performFullReload: function() {
        return performFullReload;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [client] (ecmascript)");
const _nextdevtools = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/compiled/next-devtools/index.js (raw)");
const _pagesdevoverlaysetup = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/next-devtools/userspace/pages/pages-dev-overlay-setup.js [client] (ecmascript)");
const _stripansi = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/compiled/strip-ansi/index.js [client] (ecmascript)"));
const _websocket = (()=>{
    const e = new Error("Cannot find module './websocket'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
const _formatwebpackmessages = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/shared/lib/format-webpack-messages.js [client] (ecmascript)"));
const _hotreloadertypes = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/server/dev/hot-reloader-types.js [client] (ecmascript)");
const _shared = (()=>{
    const e = new Error("Cannot find module '../shared'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
const _runtimeerrorhandler = (()=>{
    const e = new Error("Cannot find module '../../runtime-error-handler'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
const _reporthmrlatency = /*#__PURE__*/ _interop_require_default._((()=>{
    const e = new Error("Cannot find module '../../report-hmr-latency'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})());
const _turbopackhotreloadercommon = (()=>{
    const e = new Error("Cannot find module '../turbopack-hot-reloader-common'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
window.__nextDevClientId = Math.round(Math.random() * 100 + Date.now());
let customHmrEventHandler;
let turbopackMessageListeners = [];
function connect() {
    (0, _pagesdevoverlaysetup.register)();
    (0, _websocket.addMessageListener)((message)=>{
        try {
            processMessage(message);
        } catch (err) {
            (0, _shared.reportInvalidHmrMessage)(message, err);
        }
    });
    return {
        subscribeToHmrEvent (handler) {
            customHmrEventHandler = handler;
        },
        onUnrecoverableError () {
            _runtimeerrorhandler.RuntimeErrorHandler.hadRuntimeError = true;
        },
        addTurbopackMessageListener (cb) {
            turbopackMessageListeners.push(cb);
        },
        sendTurbopackMessage (msg) {
            (0, _websocket.sendMessage)(msg);
        },
        handleUpdateError (err) {
            performFullReload(err);
        }
    };
}
// Remember some state related to hot module replacement.
var isFirstCompilation = true;
var mostRecentCompilationHash = null;
var hasCompileErrors = false;
function clearOutdatedErrors() {
    // Clean up outdated compile errors, if any.
    if (typeof console !== 'undefined' && typeof console.clear === 'function') {
        if (hasCompileErrors) {
            console.clear();
        }
    }
}
// Successful compilation.
function handleSuccess() {
    clearOutdatedErrors();
    hasCompileErrors = false;
    if ("TURBOPACK compile-time truthy", 1) {
        const hmrUpdate = turbopackHmr.onBuilt();
        if (hmrUpdate != null) {
            (0, _reporthmrlatency.default)(_websocket.sendMessage, [
                ...hmrUpdate.updatedModules
            ], hmrUpdate.startMsSinceEpoch, hmrUpdate.endMsSinceEpoch, hmrUpdate.hasUpdates);
        }
        _nextdevtools.dispatcher.onBuildOk();
    } else //TURBOPACK unreachable
    ;
    isFirstCompilation = false;
}
// Compilation with warnings (e.g. ESLint).
function handleWarnings(warnings) {
    clearOutdatedErrors();
    const isHotUpdate = !isFirstCompilation;
    isFirstCompilation = false;
    hasCompileErrors = false;
    function printWarnings() {
        // Print warnings to the console.
        const formatted = (0, _formatwebpackmessages.default)({
            warnings: warnings,
            errors: []
        });
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
            for(let i = 0; i < formatted.warnings?.length; i++){
                if (i === 5) {
                    console.warn('There were more warnings in other files.\n' + 'You can find a complete log in the terminal.');
                    break;
                }
                console.warn((0, _stripansi.default)(formatted.warnings[i]));
            }
        }
    }
    printWarnings();
    // Attempt to apply hot updates or reload.
    if (isHotUpdate) {
        tryApplyUpdatesWebpack();
    }
}
// Compilation with errors (e.g. syntax error or missing modules).
function handleErrors(errors) {
    clearOutdatedErrors();
    isFirstCompilation = false;
    hasCompileErrors = true;
    // "Massage" webpack messages.
    var formatted = (0, _formatwebpackmessages.default)({
        errors: errors,
        warnings: []
    });
    // Only show the first error.
    _nextdevtools.dispatcher.onBuildError(formatted.errors[0]);
    // Also log them to the console.
    if (typeof console !== 'undefined' && typeof console.error === 'function') {
        for(var i = 0; i < formatted.errors.length; i++){
            console.error((0, _stripansi.default)(formatted.errors[i]));
        }
    }
    // Do not attempt to reload now.
    // We will reload on next success instead.
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
}
let webpackStartMsSinceEpoch = null;
const turbopackHmr = ("TURBOPACK compile-time truthy", 1) ? new _turbopackhotreloadercommon.TurbopackHmr() : "TURBOPACK unreachable";
let isrManifest = {};
// There is a newer version of the code available.
function handleAvailableHash(hash) {
    // Update last known compilation hash.
    mostRecentCompilationHash = hash;
}
function handleStaticIndicator() {
    if ("TURBOPACK compile-time truthy", 1) {
        const routeInfo = window.next.router.components[window.next.router.pathname];
        const pageComponent = routeInfo?.Component;
        const appComponent = window.next.router.components['/_app']?.Component;
        const isDynamicPage = Boolean(pageComponent?.getInitialProps) || Boolean(routeInfo?.__N_SSP);
        const hasAppGetInitialProps = Boolean(appComponent?.getInitialProps) && appComponent?.getInitialProps !== appComponent?.origGetInitialProps;
        const isPageStatic = isrManifest[window.location.pathname] || !isDynamicPage && !hasAppGetInitialProps;
        _nextdevtools.dispatcher.onStaticIndicator(isPageStatic ? 'static' : 'dynamic');
    }
}
/** Handles messages from the server for the Pages Router. */ function processMessage(message) {
    switch(message.type){
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.ISR_MANIFEST:
            {
                isrManifest = message.data;
                handleStaticIndicator();
                break;
            }
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.BUILDING:
            {
                _nextdevtools.dispatcher.buildingIndicatorShow();
                if ("TURBOPACK compile-time truthy", 1) {
                    turbopackHmr.onBuilding();
                } else //TURBOPACK unreachable
                ;
                break;
            }
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.BUILT:
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.SYNC:
            {
                _nextdevtools.dispatcher.buildingIndicatorHide();
                if (message.hash) handleAvailableHash(message.hash);
                const { errors, warnings } = message;
                // Is undefined when it's a 'built' event
                if ('versionInfo' in message) _nextdevtools.dispatcher.onVersionInfo(message.versionInfo);
                if ('devIndicator' in message) _nextdevtools.dispatcher.onDevIndicator(message.devIndicator);
                if ('devToolsConfig' in message) _nextdevtools.dispatcher.onDevToolsConfig(message.devToolsConfig);
                const hasErrors = Boolean(errors && errors.length);
                if (hasErrors) {
                    (0, _websocket.sendMessage)(JSON.stringify({
                        event: 'client-error',
                        errorCount: errors.length,
                        clientId: window.__nextDevClientId
                    }));
                    return handleErrors(errors);
                }
                // NOTE: Turbopack does not currently send warnings
                const hasWarnings = Boolean(warnings && warnings.length);
                if (hasWarnings) {
                    (0, _websocket.sendMessage)(JSON.stringify({
                        event: 'client-warning',
                        warningCount: warnings.length,
                        clientId: window.__nextDevClientId
                    }));
                    return handleWarnings(warnings);
                }
                (0, _websocket.sendMessage)(JSON.stringify({
                    event: 'client-success',
                    clientId: window.__nextDevClientId
                }));
                return handleSuccess();
            }
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.SERVER_COMPONENT_CHANGES:
            {
                turbopackHmr?.onServerComponentChanges();
                if (hasCompileErrors || _runtimeerrorhandler.RuntimeErrorHandler.hadRuntimeError) {
                    window.location.reload();
                }
                return;
            }
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.STATIC_PARAMS_CHANGED:
            {
                // Only relevant to the App Router; ignored in the Pages Router client.
                return;
            }
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.SERVER_ERROR:
            {
                const { errorJSON } = message;
                if (errorJSON) {
                    const errorObject = JSON.parse(errorJSON);
                    const error = Object.defineProperty(new Error(errorObject.message), "__NEXT_ERROR_CODE", {
                        value: "E394",
                        enumerable: false,
                        configurable: true
                    });
                    error.stack = errorObject.stack;
                    handleErrors([
                        error
                    ]);
                }
                return;
            }
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.TURBOPACK_CONNECTED:
            {
                for (const listener of turbopackMessageListeners){
                    listener({
                        type: _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.TURBOPACK_CONNECTED,
                        data: message.data
                    });
                }
                break;
            }
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.TURBOPACK_MESSAGE:
            {
                turbopackHmr.onTurbopackMessage(message);
                _nextdevtools.dispatcher.onBeforeRefresh();
                for (const listener of turbopackMessageListeners){
                    listener({
                        type: _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.TURBOPACK_MESSAGE,
                        data: message.data
                    });
                }
                if (_runtimeerrorhandler.RuntimeErrorHandler.hadRuntimeError) {
                    console.warn(_shared.REACT_REFRESH_FULL_RELOAD_FROM_ERROR);
                    performFullReload(null);
                }
                _nextdevtools.dispatcher.onRefresh();
                break;
            }
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.ADDED_PAGE:
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.REMOVED_PAGE:
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.RELOAD_PAGE:
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.DEV_PAGES_MANIFEST_UPDATE:
            if (customHmrEventHandler) {
                customHmrEventHandler(message);
            }
            break;
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.DEVTOOLS_CONFIG:
            _nextdevtools.dispatcher.onDevToolsConfig(message.data);
            break;
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.CACHE_INDICATOR:
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.REQUEST_INSIGHTS_UPDATE:
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.REACT_DEBUG_CHUNK:
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.ERRORS_TO_SHOW_IN_BROWSER:
            break;
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.MIDDLEWARE_CHANGES:
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.CLIENT_CHANGES:
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.SERVER_ONLY_CHANGES:
            break;
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.REQUEST_CURRENT_ERROR_STATE:
            {
                const errorState = (0, _nextdevtools.getSerializedOverlayState)();
                const response = {
                    event: _hotreloadertypes.HMR_MESSAGE_SENT_TO_SERVER.MCP_ERROR_STATE_RESPONSE,
                    requestId: message.requestId,
                    errorState,
                    url: window.location.href
                };
                (0, _websocket.sendMessage)(JSON.stringify(response));
                break;
            }
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.REQUEST_PAGE_METADATA:
            {
                const segmentTrieData = (0, _nextdevtools.getSegmentTrieData)();
                const response = {
                    event: _hotreloadertypes.HMR_MESSAGE_SENT_TO_SERVER.MCP_PAGE_METADATA_RESPONSE,
                    requestId: message.requestId,
                    segmentTrieData,
                    url: window.location.href
                };
                (0, _websocket.sendMessage)(JSON.stringify(response));
                return;
            }
        default:
            message;
    }
}
// Is there a newer version of this code available?
function isUpdateAvailable() {
    /* globals __webpack_hash__ */ // __webpack_hash__ is the hash of the current compilation.
    // It's a global variable injected by Webpack.
    return mostRecentCompilationHash !== __webpack_hash__;
}
// Webpack disallows updates in other states.
function canApplyUpdates() {
    return module.hot.status() === 'idle';
}
function afterApplyUpdates(fn) {
    if (canApplyUpdates()) {
        fn();
    } else {
        function handler(status) {
            if (status === 'idle') {
                module.hot.removeStatusHandler(handler);
                fn();
            }
        }
        module.hot.addStatusHandler(handler);
    }
}
// Attempt to update code on the fly, fall back to a hard reload.
function tryApplyUpdatesWebpack() {
    if (!module.hot) {
        // HotModuleReplacementPlugin is not in Webpack configuration.
        console.error('HotModuleReplacementPlugin is not in Webpack configuration.');
        // window.location.reload();
        return;
    }
    if (!isUpdateAvailable() || !canApplyUpdates()) {
        _nextdevtools.dispatcher.onBuildOk();
        return;
    }
    function handleApplyUpdates(err, updatedModules) {
        if (err || _runtimeerrorhandler.RuntimeErrorHandler.hadRuntimeError || updatedModules == null) {
            if (err) {
                console.warn(_shared.REACT_REFRESH_FULL_RELOAD);
            } else if (_runtimeerrorhandler.RuntimeErrorHandler.hadRuntimeError) {
                console.warn(_shared.REACT_REFRESH_FULL_RELOAD_FROM_ERROR);
            }
            performFullReload(err);
            return;
        }
        _nextdevtools.dispatcher.onBuildOk();
        if (isUpdateAvailable()) {
            // While we were updating, there was a new update! Do it again.
            tryApplyUpdatesWebpack();
            return;
        }
        _nextdevtools.dispatcher.onRefresh();
        (0, _reporthmrlatency.default)(_websocket.sendMessage, updatedModules, webpackStartMsSinceEpoch, Date.now());
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }
    // https://webpack.js.org/api/hot-module-replacement/#check
    module.hot.check(/* autoApply */ false).then((updatedModules)=>{
        if (updatedModules == null) {
            return null;
        }
        // We should always handle an update, even if updatedModules is empty (but
        // non-null) for any reason. That's what webpack would normally do:
        // https://github.com/webpack/webpack/blob/3aa6b6bc3a64/lib/hmr/HotModuleReplacement.runtime.js#L296-L298
        _nextdevtools.dispatcher.onBeforeRefresh();
        // https://webpack.js.org/api/hot-module-replacement/#apply
        return module.hot.apply();
    }).then((updatedModules)=>{
        handleApplyUpdates(null, updatedModules);
    }, (err)=>{
        handleApplyUpdates(err, null);
    });
}
function performFullReload(err) {
    const stackTrace = err && (err.stack && err.stack.split('\n').slice(0, 5).join('\n') || err.message || err + '');
    (0, _websocket.sendMessage)(JSON.stringify({
        event: 'client-full-reload',
        stackTrace,
        hadRuntimeError: !!_runtimeerrorhandler.RuntimeErrorHandler.hadRuntimeError,
        dependencyChain: err ? err.dependencyChain : undefined
    }));
    window.location.reload();
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=hot-reloader-pages.js.map
}),
"[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/client/index.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$ChatGPT$2f$believe$2d$konde$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
/* global location */ // imports polyfill from `@next/polyfill-module` after build.
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    emitter: null,
    hydrate: null,
    initialize: null,
    router: null,
    version: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    emitter: function() {
        return emitter;
    },
    hydrate: function() {
        return hydrate;
    },
    initialize: function() {
        return initialize;
    },
    router: function() {
        return router;
    },
    version: function() {
        return version;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [client] (ecmascript)");
const _jsxruntime = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/react/jsx-runtime.js [client] (ecmascript)");
__turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/build/polyfills/polyfill-module.js [client] (ecmascript)");
const _react = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/react/index.js [client] (ecmascript)"));
const _client = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/react-dom/client.js [client] (ecmascript)"));
const _headmanagercontextsharedruntime = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/shared/lib/head-manager-context.shared-runtime.js [client] (ecmascript)");
const _mitt = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/shared/lib/mitt.js [client] (ecmascript)"));
const _routercontextsharedruntime = (()=>{
    const e = new Error("Cannot find module '../shared/lib/router-context.shared-runtime'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
const _disablesmoothscroll = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/shared/lib/router/utils/disable-smooth-scroll.js [client] (ecmascript)");
const _isdynamic = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/shared/lib/router/utils/is-dynamic.js [client] (ecmascript)");
const _querystring = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/shared/lib/router/utils/querystring.js [client] (ecmascript)");
const _utils = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/shared/lib/utils.js [client] (ecmascript)");
const _portal = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/client/portal/index.js [client] (ecmascript)");
const _headmanager = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/client/head-manager.js [client] (ecmascript)"));
const _pageloader = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/client/page-loader.js [client] (ecmascript)"));
const _routeannouncer = (()=>{
    const e = new Error("Cannot find module './route-announcer'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
const _router = (()=>{
    const e = new Error("Cannot find module './router'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
const _iserror = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/lib/is-error.js [client] (ecmascript)");
const _imageconfigcontextsharedruntime = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/shared/lib/image-config-context.shared-runtime.js [client] (ecmascript)");
const _removebasepath = (()=>{
    const e = new Error("Cannot find module './remove-base-path'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
const _hasbasepath = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/client/has-base-path.js [client] (ecmascript)");
const _approutercontextsharedruntime = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/shared/lib/app-router-context.shared-runtime.js [client] (ecmascript)");
const _adapters = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/shared/lib/router/adapters.js [client] (ecmascript)");
const _hooksclientcontextsharedruntime = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/shared/lib/hooks-client-context.shared-runtime.js [client] (ecmascript)");
const _onrecoverableerror = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/client/react-client-callbacks/on-recoverable-error.js [client] (ecmascript)");
const _tracer = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/client/tracing/tracer.js [client] (ecmascript)"));
const _isnextroutererror = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/client/components/is-next-router-error.js [client] (ecmascript)");
const version = "16.3.6";
let router;
const emitter = (0, _mitt.default)();
const looseToArray = (input)=>[].slice.call(input);
let initialData;
let defaultLocale = undefined;
let asPath;
let pageLoader;
let appElement;
let headManager;
let initialMatchesMiddleware = false;
let lastAppProps;
let lastRenderReject;
let devClient;
let CachedApp, onPerfEntry;
let CachedComponent;
class Container extends _react.default.Component {
    componentDidCatch(componentErr, info) {
        this.props.fn(componentErr, info);
    }
    componentDidMount() {
        this.scrollToHash();
        // We need to replace the router state if:
        // - the page was (auto) exported and has a query string or search (hash)
        // - it was auto exported and is a dynamic route (to provide params)
        // - if it is a client-side skeleton (fallback render)
        // - if middleware matches the current page (may have rewrite params)
        // - if rewrites in next.config.js match (may have rewrite params)
        if (router.isSsr && (initialData.isFallback || initialData.nextExport && ((0, _isdynamic.isDynamicRoute)(router.pathname) || location.search || ("TURBOPACK compile-time value", false) || initialMatchesMiddleware) || initialData.props && initialData.props.__N_SSG && (location.search || ("TURBOPACK compile-time value", false) || initialMatchesMiddleware))) {
            // update query on mount for exported pages
            router.replace(router.pathname + '?' + String((0, _querystring.assign)((0, _querystring.urlQueryToSearchParams)(router.query), new URLSearchParams(location.search))), asPath, {
                // @ts-ignore
                // WARNING: `_h` is an internal option for handing Next.js
                // client-side hydration. Your app should _never_ use this property.
                // It may change at any time without notice.
                _h: 1,
                // Fallback pages must trigger the data fetch, so the transition is
                // not shallow.
                // Other pages (strictly updating query) happens shallowly, as data
                // requirements would already be present.
                shallow: !initialData.isFallback && !initialMatchesMiddleware
            }).catch((err)=>{
                if (!err.cancelled) throw err;
            });
        }
    }
    componentDidUpdate() {
        this.scrollToHash();
    }
    scrollToHash() {
        let { hash } = location;
        hash = hash && hash.substring(1);
        if (!hash) return;
        const el = document.getElementById(hash);
        if (!el) return;
        // If we call scrollIntoView() in here without a setTimeout
        // it won't scroll properly.
        setTimeout(()=>el.scrollIntoView(), 0);
    }
    render() {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        else {
            const { PagesDevOverlayBridge } = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/next-devtools/userspace/pages/pages-dev-overlay-setup.js [client] (ecmascript)");
            return /*#__PURE__*/ (0, _jsxruntime.jsx)(PagesDevOverlayBridge, {
                children: this.props.children
            });
        }
    }
}
async function initialize(opts = {}) {
    // This makes sure this specific lines are removed in production
    if ("TURBOPACK compile-time truthy", 1) {
        _tracer.default.onSpanEnd((()=>{
            const e = new Error("Cannot find module './tracing/report-to-socket'");
            e.code = 'MODULE_NOT_FOUND';
            throw e;
        })().default);
        devClient = opts.devClient;
    }
    initialData = JSON.parse(document.getElementById('__NEXT_DATA__').textContent);
    window.__NEXT_DATA__ = initialData;
    defaultLocale = initialData.defaultLocale;
    const prefix = initialData.assetPrefix || '';
    self.__next_set_public_path__(`${prefix}/_next/`);
    asPath = (0, _utils.getURL)();
    // make sure not to attempt stripping basePath for 404s
    if ((0, _hasbasepath.hasBasePath)(asPath)) {
        asPath = (0, _removebasepath.removeBasePath)(asPath);
    }
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    if (initialData.scriptLoader) {
        const { initScriptLoader } = (()=>{
            const e = new Error("Cannot find module './script'");
            e.code = 'MODULE_NOT_FOUND';
            throw e;
        })();
        initScriptLoader(initialData.scriptLoader);
    }
    pageLoader = new _pageloader.default(initialData.buildId, prefix);
    const register = ([r, f])=>pageLoader.routeLoader.onEntrypoint(r, f);
    if (window.__NEXT_P) {
        // Defer page registration for another tick. This will increase the overall
        // latency in hydrating the page, but reduce the total blocking time.
        window.__NEXT_P.map((p)=>setTimeout(()=>register(p), 0));
    }
    window.__NEXT_P = [];
    window.__NEXT_P.push = register;
    headManager = (0, _headmanager.default)();
    headManager.getIsSsr = ()=>{
        return router.isSsr;
    };
    appElement = document.getElementById('__next');
    return {
        assetPrefix: prefix
    };
}
function renderApp(App, appProps) {
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(App, {
        ...appProps
    });
}
function AppContainer({ children }) {
    // Create a memoized value for next/navigation router context.
    const adaptedForAppRouter = _react.default.useMemo({
        "AppContainer.useMemo[adaptedForAppRouter]": ()=>{
            return (0, _adapters.adaptForAppRouterInstance)(router);
        }
    }["AppContainer.useMemo[adaptedForAppRouter]"], []);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(Container, {
        fn: (error)=>renderError({
                App: CachedApp,
                err: error
            }).catch((err)=>console.error('Error rendering page: ', err)),
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_approutercontextsharedruntime.AppRouterContext.Provider, {
            value: adaptedForAppRouter,
            children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_hooksclientcontextsharedruntime.SearchParamsContext.Provider, {
                value: (0, _adapters.adaptForSearchParams)(router),
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_adapters.PathnameContextProviderAdapter, {
                    router: router,
                    isAutoExport: self.__NEXT_DATA__.autoExport ?? false,
                    children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_hooksclientcontextsharedruntime.PathParamsContext.Provider, {
                        value: (0, _adapters.adaptForPathParams)(router),
                        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_routercontextsharedruntime.RouterContext.Provider, {
                            value: (0, _router.makePublicRouterInstance)(router),
                            children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_headmanagercontextsharedruntime.HeadManagerContext.Provider, {
                                value: headManager,
                                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_imageconfigcontextsharedruntime.ImageConfigContext.Provider, {
                                    value: ("TURBOPACK compile-time value", {
                                        "deviceSizes": ("TURBOPACK compile-time value", [
                                            ("TURBOPACK compile-time value", 640),
                                            ("TURBOPACK compile-time value", 750),
                                            ("TURBOPACK compile-time value", 828),
                                            ("TURBOPACK compile-time value", 1080),
                                            ("TURBOPACK compile-time value", 1200),
                                            ("TURBOPACK compile-time value", 1920),
                                            ("TURBOPACK compile-time value", 2048),
                                            ("TURBOPACK compile-time value", 3840)
                                        ]),
                                        "imageSizes": ("TURBOPACK compile-time value", [
                                            ("TURBOPACK compile-time value", 32),
                                            ("TURBOPACK compile-time value", 48),
                                            ("TURBOPACK compile-time value", 64),
                                            ("TURBOPACK compile-time value", 96),
                                            ("TURBOPACK compile-time value", 128),
                                            ("TURBOPACK compile-time value", 256),
                                            ("TURBOPACK compile-time value", 384)
                                        ]),
                                        "qualities": ("TURBOPACK compile-time value", [
                                            ("TURBOPACK compile-time value", 75)
                                        ]),
                                        "path": ("TURBOPACK compile-time value", "/_next/image"),
                                        "loader": ("TURBOPACK compile-time value", "default"),
                                        "dangerouslyAllowSVG": ("TURBOPACK compile-time value", false),
                                        "unoptimized": ("TURBOPACK compile-time value", false),
                                        "domains": ("TURBOPACK compile-time value", []),
                                        "remotePatterns": ("TURBOPACK compile-time value", []),
                                        "localPatterns": ("TURBOPACK compile-time value", [
                                            ("TURBOPACK compile-time value", {
                                                "pathname": ("TURBOPACK compile-time value", "**"),
                                                "search": ("TURBOPACK compile-time value", "")
                                            })
                                        ])
                                    }),
                                    children: children
                                })
                            })
                        })
                    })
                })
            })
        })
    });
}
const wrapApp = (App)=>(wrappedAppProps)=>{
        const appProps = {
            ...wrappedAppProps,
            Component: CachedComponent,
            err: initialData.err,
            router
        };
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(AppContainer, {
            children: renderApp(App, appProps)
        });
    };
// This method handles all runtime and debug errors.
// 404 and 500 errors are special kind of errors
// and they are still handle via the main render method.
function renderError(renderErrorProps) {
    let { App, err } = renderErrorProps;
    // In development runtime errors are caught by our overlay
    // In production we catch runtime errors using componentDidCatch which will trigger renderError
    if ("TURBOPACK compile-time truthy", 1) {
        // A Next.js rendering runtime error is always unrecoverable
        // FIXME: let's make this recoverable (error in GIP client-transition)
        devClient.onUnrecoverableError();
        // We need to render an empty <App> so that the `<ReactDevOverlay>` can
        // render itself.
        return doRender({
            App: ()=>null,
            props: {},
            Component: ()=>null,
            styleSheets: []
        });
    }
    //TURBOPACK unreachable
    ;
}
// Dummy component that we render as a child of Root so that we can
// toggle the correct styles before the page is rendered.
function Head({ callback }) {
    // We use `useLayoutEffect` to guarantee the callback is executed
    // as soon as React flushes the update.
    _react.default.useLayoutEffect({
        "Head.useLayoutEffect": ()=>callback()
    }["Head.useLayoutEffect"], [
        callback
    ]);
    return null;
}
const performanceMarks = {
    navigationStart: 'navigationStart',
    beforeRender: 'beforeRender',
    afterRender: 'afterRender',
    afterHydrate: 'afterHydrate',
    routeChange: 'routeChange'
};
const performanceMeasures = {
    hydration: 'Next.js-hydration',
    beforeHydration: 'Next.js-before-hydration',
    routeChangeToRender: 'Next.js-route-change-to-render',
    render: 'Next.js-render'
};
let reactRoot = null;
// On initial render a hydrate should always happen
let shouldHydrate = true;
function clearMarks() {
    ;
    [
        performanceMarks.beforeRender,
        performanceMarks.afterHydrate,
        performanceMarks.afterRender,
        performanceMarks.routeChange
    ].forEach((mark)=>performance.clearMarks(mark));
}
function markHydrateComplete() {
    if (!_utils.ST) return;
    performance.mark(performanceMarks.afterHydrate) // mark end of hydration
    ;
    const hasBeforeRenderMark = performance.getEntriesByName(performanceMarks.beforeRender, 'mark').length;
    if (hasBeforeRenderMark) {
        const beforeHydrationMeasure = performance.measure(performanceMeasures.beforeHydration, performanceMarks.navigationStart, performanceMarks.beforeRender);
        const hydrationMeasure = performance.measure(performanceMeasures.hydration, performanceMarks.beforeRender, performanceMarks.afterHydrate);
        if (("TURBOPACK compile-time value", "development") === 'development' && // Old versions of Safari don't return `PerformanceMeasure`s from `performance.measure()`
        beforeHydrationMeasure && hydrationMeasure) {
            _tracer.default.startSpan('navigation-to-hydration', {
                startTime: performance.timeOrigin + beforeHydrationMeasure.startTime,
                attributes: {
                    pathname: location.pathname,
                    query: location.search
                }
            }).end(performance.timeOrigin + hydrationMeasure.startTime + hydrationMeasure.duration);
        }
    }
    if (onPerfEntry) {
        performance.getEntriesByName(performanceMeasures.hydration).forEach(onPerfEntry);
    }
    clearMarks();
}
function markRenderComplete() {
    if (!_utils.ST) return;
    performance.mark(performanceMarks.afterRender) // mark end of render
    ;
    const navStartEntries = performance.getEntriesByName(performanceMarks.routeChange, 'mark');
    if (!navStartEntries.length) return;
    const hasBeforeRenderMark = performance.getEntriesByName(performanceMarks.beforeRender, 'mark').length;
    if (hasBeforeRenderMark) {
        performance.measure(performanceMeasures.routeChangeToRender, navStartEntries[0].name, performanceMarks.beforeRender);
        performance.measure(performanceMeasures.render, performanceMarks.beforeRender, performanceMarks.afterRender);
        if (onPerfEntry) {
            performance.getEntriesByName(performanceMeasures.render).forEach(onPerfEntry);
            performance.getEntriesByName(performanceMeasures.routeChangeToRender).forEach(onPerfEntry);
        }
    }
    clearMarks();
    [
        performanceMeasures.routeChangeToRender,
        performanceMeasures.render
    ].forEach((measure)=>performance.clearMeasures(measure));
}
function renderReactElement(domEl, fn) {
    // mark start of hydrate/render
    if (_utils.ST) {
        performance.mark(performanceMarks.beforeRender);
    }
    const reactEl = fn(shouldHydrate ? markHydrateComplete : markRenderComplete);
    if (!reactRoot) {
        // Unlike with createRoot, you don't need a separate root.render() call here
        reactRoot = _client.default.hydrateRoot(domEl, reactEl, {
            onRecoverableError: _onrecoverableerror.onRecoverableError
        });
        // TODO: Remove shouldHydrate variable when React 18 is stable as it can depend on `reactRoot` existing
        shouldHydrate = false;
    } else {
        const startTransition = _react.default.startTransition;
        startTransition(()=>{
            reactRoot.render(reactEl);
        });
    }
}
function Root({ callbacks, children }) {
    // We use `useLayoutEffect` to guarantee the callbacks are executed
    // as soon as React flushes the update
    _react.default.useLayoutEffect({
        "Root.useLayoutEffect": ()=>callbacks.forEach({
                "Root.useLayoutEffect": (callback)=>callback()
            }["Root.useLayoutEffect"])
    }["Root.useLayoutEffect"], [
        callbacks
    ]);
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return children;
}
function doRender(input) {
    let { App, Component, props, err } = input;
    let styleSheets = 'initial' in input ? undefined : input.styleSheets;
    Component = Component || lastAppProps.Component;
    props = props || lastAppProps.props;
    const appProps = {
        ...props,
        Component,
        err,
        router
    };
    // lastAppProps has to be set before ReactDom.render to account for ReactDom throwing an error.
    lastAppProps = appProps;
    let canceled = false;
    let resolvePromise;
    const renderPromise = new Promise((resolve, reject)=>{
        if (lastRenderReject) {
            lastRenderReject();
        }
        resolvePromise = ()=>{
            lastRenderReject = null;
            resolve();
        };
        lastRenderReject = ()=>{
            canceled = true;
            lastRenderReject = null;
            const error = Object.defineProperty(new Error('Cancel rendering route'), "__NEXT_ERROR_CODE", {
                value: "E503",
                enumerable: false,
                configurable: true
            });
            error.cancelled = true;
            reject(error);
        };
    });
    // This function has a return type to ensure it doesn't start returning a
    // Promise. It should remain synchronous.
    function onStart() {
        if ("TURBOPACK compile-time truthy", 1) {
            return false;
        }
        //TURBOPACK unreachable
        ;
        const currentStyleTags = undefined;
        const currentHrefs = undefined;
        const noscript = undefined;
        const nonce = undefined;
    }
    function onHeadCommit() {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        if (input.scroll) {
            const { x, y } = input.scroll;
            (0, _disablesmoothscroll.disableSmoothScrollDuringRouteTransition)(()=>{
                window.scrollTo(x, y);
            });
        }
    }
    function onRootCommit() {
        resolvePromise();
    }
    onStart();
    const elem = /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(Head, {
                callback: onHeadCommit
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsxs)(AppContainer, {
                children: [
                    renderApp(App, appProps),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_portal.Portal, {
                        type: "next-route-announcer",
                        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_routeannouncer.RouteAnnouncer, {})
                    })
                ]
            })
        ]
    });
    // We catch runtime errors using componentDidCatch which will trigger renderError
    renderReactElement(appElement, (callback)=>/*#__PURE__*/ (0, _jsxruntime.jsx)(Root, {
            callbacks: [
                callback,
                onRootCommit
            ],
            children: ("TURBOPACK compile-time falsy", 0) ? /*#__PURE__*/ "TURBOPACK unreachable" : elem
        }));
    return renderPromise;
}
async function render(renderingProps) {
    // if an error occurs in a server-side page (e.g. in getInitialProps),
    // skip re-rendering the error page client-side as data-fetching operations
    // will already have been done on the server and NEXT_DATA contains the correct
    // data for straight-forward hydration of the error page
    if (renderingProps.err && // renderingProps.Component might be undefined if there is a top/module-level error
    (typeof renderingProps.Component === 'undefined' || !renderingProps.isHydratePass)) {
        await renderError(renderingProps);
        return;
    }
    try {
        await doRender(renderingProps);
    } catch (err) {
        const renderErr = (0, _iserror.getProperError)(err);
        // bubble up cancelation errors
        if (renderErr.cancelled) {
            throw renderErr;
        }
        if ("TURBOPACK compile-time truthy", 1) {
            // Ensure this error is displayed in the overlay in development
            setTimeout(()=>{
                throw renderErr;
            });
        }
        await renderError({
            ...renderingProps,
            err: renderErr
        });
    }
}
async function hydrate(opts) {
    let initialErr = initialData.err;
    try {
        const appEntrypoint = await pageLoader.routeLoader.whenEntrypoint('/_app');
        if ('error' in appEntrypoint) {
            throw appEntrypoint.error;
        }
        const { component: app, exports: mod } = appEntrypoint;
        CachedApp = app;
        if (mod && mod.reportWebVitals) {
            onPerfEntry = ({ id, name, startTime, value, duration, entryType, entries, attribution })=>{
                // Combines timestamp with random number for unique ID
                const uniqueID = `${Date.now()}-${Math.floor(Math.random() * (9e12 - 1)) + 1e12}`;
                let perfStartEntry;
                if (entries && entries.length) {
                    perfStartEntry = entries[0].startTime;
                }
                const webVitals = {
                    id: id || uniqueID,
                    name,
                    startTime: startTime || perfStartEntry,
                    value: value == null ? duration : value,
                    label: entryType === 'mark' || entryType === 'measure' ? 'custom' : 'web-vital'
                };
                if (attribution) {
                    webVitals.attribution = attribution;
                }
                mod.reportWebVitals(webVitals);
            };
        }
        const pageEntrypoint = // error, so we need to skip waiting for the entrypoint.
        ("TURBOPACK compile-time value", "development") === 'development' && initialData.err ? {
            error: initialData.err
        } : await pageLoader.routeLoader.whenEntrypoint(initialData.page);
        if ('error' in pageEntrypoint) {
            throw pageEntrypoint.error;
        }
        CachedComponent = pageEntrypoint.component;
        if ("TURBOPACK compile-time truthy", 1) {
            const { isValidElementType } = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/compiled/react-is/index.js [client] (ecmascript)");
            if (!isValidElementType(CachedComponent)) {
                throw Object.defineProperty(new Error(`The default export is not a React Component in page: "${initialData.page}"`), "__NEXT_ERROR_CODE", {
                    value: "E286",
                    enumerable: false,
                    configurable: true
                });
            }
        }
    } catch (error) {
        // This catches errors like throwing in the top level of a module
        initialErr = (0, _iserror.getProperError)(error);
    }
    if ("TURBOPACK compile-time truthy", 1) {
        const getServerError = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/server/dev/node-stack-frames.js [client] (ecmascript)").getServerError;
        // Server-side runtime errors need to be re-thrown on the client-side so
        // that the overlay is rendered.
        if (initialErr) {
            if (initialErr === initialData.err) {
                setTimeout(()=>{
                    let error;
                    try {
                        // Generate a new error object. We `throw` it because some browsers
                        // will set the `stack` when thrown, and we want to ensure ours is
                        // not overridden when we re-throw it below.
                        throw Object.defineProperty(new Error(initialErr.message), "__NEXT_ERROR_CODE", {
                            value: "E394",
                            enumerable: false,
                            configurable: true
                        });
                    } catch (e) {
                        error = e;
                    }
                    error.name = initialErr.name;
                    error.stack = initialErr.stack;
                    // If present, restore the error code from the original server error.
                    if (typeof initialErr.__NEXT_ERROR_CODE === 'string') {
                        Object.defineProperty(error, '__NEXT_ERROR_CODE', {
                            value: initialErr.__NEXT_ERROR_CODE,
                            enumerable: false,
                            configurable: true
                        });
                    }
                    const errSource = initialErr.source;
                    // In development, error the navigation API usage in runtime,
                    // since it's not allowed to be used in pages router as it doesn't contain error boundary like app router.
                    if ((0, _isnextroutererror.isNextRouterError)(initialErr)) {
                        error.message = 'Next.js navigation API is not allowed to be used in Pages Router.';
                    }
                    throw getServerError(error, errSource);
                });
            } else {
                setTimeout(()=>{
                    throw initialErr;
                });
            }
        }
    }
    if (window.__NEXT_PRELOADREADY) {
        await window.__NEXT_PRELOADREADY(initialData.dynamicIds);
    }
    router = (0, _router.createRouter)(initialData.page, initialData.query, asPath, {
        initialProps: initialData.props,
        pageLoader,
        App: CachedApp,
        Component: CachedComponent,
        wrapApp,
        err: initialErr,
        isFallback: Boolean(initialData.isFallback),
        subscription: (info, App, scroll)=>render(Object.assign({}, info, {
                App,
                scroll
            })),
        locale: initialData.locale,
        locales: initialData.locales,
        defaultLocale,
        domainLocales: initialData.domainLocales,
        isPreview: initialData.isPreview
    });
    initialMatchesMiddleware = await router._initialMatchesMiddlewarePromise;
    const renderCtx = {
        App: CachedApp,
        initial: true,
        Component: CachedComponent,
        props: initialData.props,
        err: initialErr,
        isHydratePass: true
    };
    if (opts?.beforeRender) {
        await opts.beforeRender();
    }
    render(renderCtx);
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=index.js.map
}),
"[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/client/dev/hot-middleware-client.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [client] (ecmascript)");
const _hotreloadertypes = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/server/dev/hot-reloader-types.js [client] (ecmascript)");
const _hotreloaderpages = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/client/dev/hot-reloader/pages/hot-reloader-pages.js [client] (ecmascript)"));
const _websocket = (()=>{
    const e = new Error("Cannot find module './hot-reloader/pages/websocket'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
let reloading = false;
const _default = ()=>{
    const devClient = (0, _hotreloaderpages.default)();
    devClient.subscribeToHmrEvent((message)=>{
        if (reloading) return;
        // Retrieve the router if it's available
        const router = window.next?.router;
        // Determine if we're on an error page or the router is not initialized
        const isOnErrorPage = !router || router.pathname === '/404' || router.pathname === '/_error';
        switch(message.type){
            case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.RELOAD_PAGE:
                {
                    (0, _websocket.sendMessage)(JSON.stringify({
                        event: 'client-reload-page',
                        clientId: window.__nextDevClientId
                    }));
                    reloading = true;
                    return window.location.reload();
                }
            case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.REMOVED_PAGE:
                {
                    const [page] = message.data;
                    // Check if the removed page is the current page
                    const isCurrentPage = page === router?.pathname;
                    // We enter here if the removed page is currently being viewed
                    // or if we happen to be on an error page.
                    if (isCurrentPage || isOnErrorPage) {
                        (0, _websocket.sendMessage)(JSON.stringify({
                            event: 'client-removed-page',
                            clientId: window.__nextDevClientId,
                            page
                        }));
                        return window.location.reload();
                    }
                    return;
                }
            case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.ADDED_PAGE:
                {
                    const [page] = message.data;
                    // Check if the added page is the current page
                    const isCurrentPage = page === router?.pathname;
                    // Check if the page component is not yet loaded
                    const isPageNotLoaded = page !== null && typeof router?.components?.[page] === 'undefined';
                    // We enter this block if the newly added page is the one currently being viewed
                    // but hasn't been loaded yet, or if we're on an error page.
                    if (isCurrentPage && isPageNotLoaded || isOnErrorPage) {
                        (0, _websocket.sendMessage)(JSON.stringify({
                            event: 'client-added-page',
                            clientId: window.__nextDevClientId,
                            page
                        }));
                        return window.location.reload();
                    }
                    return;
                }
            case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.DEV_PAGES_MANIFEST_UPDATE:
                {
                    return;
                }
            default:
                {
                    message;
                }
        }
    });
    return devClient;
};
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=hot-middleware-client.js.map
}),
"[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/client/dev/on-demand-entries-client.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$ChatGPT$2f$believe$2d$konde$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [client] (ecmascript)");
const _router = /*#__PURE__*/ _interop_require_default._((()=>{
    const e = new Error("Cannot find module '../router'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})());
const _websocket = (()=>{
    const e = new Error("Cannot find module './hot-reloader/pages/websocket'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
const _default = async ()=>{
    // Never send pings when using Turbopack as it's not used.
    // Pings were originally used to keep track of active routes in on-demand-entries with webpack.
    if ("TURBOPACK compile-time truthy", 1) {
        return;
    }
    //TURBOPACK unreachable
    ;
};
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=on-demand-entries-client.js.map
}),
"[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/client/dev/fouc.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This wrapper function is used to safely select the best available function
// to schedule removal of the no-FOUC styles workaround. requestAnimationFrame
// is the ideal choice, but when used in iframes, there are no guarantees that
// the callback will actually be called, which could stall the promise returned
// from displayContent.
//
// See: https://www.vector-logic.com/blog/posts/on-request-animation-frame-and-embedded-iframes
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "displayContent", {
    enumerable: true,
    get: function() {
        return displayContent;
    }
});
const safeCallbackQueue = (callback)=>{
    if (window.requestAnimationFrame && window.self === window.top) {
        window.requestAnimationFrame(callback);
    } else {
        window.setTimeout(callback);
    }
};
function displayContent() {
    return new Promise((resolve)=>{
        safeCallbackQueue(function() {
            for(var x = document.querySelectorAll('[data-next-hide-fouc]'), i = x.length; i--;){
                x[i].parentNode.removeChild(x[i]);
            }
            resolve();
        });
    });
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=fouc.js.map
}),
"[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/client/page-bootstrap.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "pageBootstrap", {
    enumerable: true,
    get: function() {
        return pageBootstrap;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '../lib/require-instrumentation-client'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
const _ = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/client/index.js [client] (ecmascript)");
const _ondemandentriesclient = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/client/dev/on-demand-entries-client.js [client] (ecmascript)"));
const _fouc = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/client/dev/fouc.js [client] (ecmascript)");
const _websocket = (()=>{
    const e = new Error("Cannot find module './dev/hot-reloader/pages/websocket'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
const _querystring = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/shared/lib/router/utils/querystring.js [client] (ecmascript)");
const _hotreloadertypes = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/server/dev/hot-reloader-types.js [client] (ecmascript)");
const _runtimeerrorhandler = (()=>{
    const e = new Error("Cannot find module './dev/runtime-error-handler'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
const _shared = (()=>{
    const e = new Error("Cannot find module './dev/hot-reloader/shared'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
const _hotreloaderpages = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/client/dev/hot-reloader/pages/hot-reloader-pages.js [client] (ecmascript)");
const _nextdevtools = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/compiled/next-devtools/index.js (raw)");
function pageBootstrap(assetPrefix) {
    (0, _websocket.connectHMR)({
        assetPrefix,
        path: '/_next/hmr'
    });
    return (0, _.hydrate)({
        beforeRender: _fouc.displayContent
    }).then(()=>{
        (0, _ondemandentriesclient.default)();
        let reloading = false;
        (0, _websocket.addMessageListener)((message)=>{
            if (reloading) return;
            switch(message.type){
                case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.SERVER_ERROR:
                    {
                        const errorObject = JSON.parse(message.errorJSON);
                        const error = Object.defineProperty(new Error(errorObject.message), "__NEXT_ERROR_CODE", {
                            value: "E394",
                            enumerable: false,
                            configurable: true
                        });
                        error.stack = errorObject.stack;
                        throw error;
                    }
                case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.RELOAD_PAGE:
                    {
                        reloading = true;
                        window.location.reload();
                        break;
                    }
                case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.DEV_PAGES_MANIFEST_UPDATE:
                    {
                        fetch(`${assetPrefix}/_next/static/development/_devPagesManifest.json`).then((res)=>res.json()).then((manifest)=>{
                            window.__DEV_PAGES_MANIFEST = manifest;
                        }).catch((err)=>{
                            console.log(`Failed to fetch devPagesManifest`, err);
                        });
                        break;
                    }
                case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.MIDDLEWARE_CHANGES:
                    {
                        return window.location.reload();
                    }
                case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.CLIENT_CHANGES:
                    {
                        // This is used in `../server/dev/turbopack-utils.ts`.
                        const isOnErrorPage = window.next.router.pathname === '/_error';
                        // On the error page we want to reload the page when a page was changed
                        if (isOnErrorPage) {
                            if (_runtimeerrorhandler.RuntimeErrorHandler.hadRuntimeError) {
                                console.warn(_shared.REACT_REFRESH_FULL_RELOAD_FROM_ERROR);
                            }
                            reloading = true;
                            (0, _hotreloaderpages.performFullReload)(null);
                        }
                        break;
                    }
                case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.SERVER_ONLY_CHANGES:
                    {
                        if (_runtimeerrorhandler.RuntimeErrorHandler.hadRuntimeError) {
                            console.warn(_shared.REACT_REFRESH_FULL_RELOAD_FROM_ERROR);
                            (0, _hotreloaderpages.performFullReload)(null);
                        }
                        const { pages } = message;
                        // Make sure to reload when the dev-overlay is showing for an
                        // API route
                        // TODO: Fix `__NEXT_PAGE` type
                        if (pages.includes(_.router.query.__NEXT_PAGE)) {
                            return window.location.reload();
                        }
                        if (!_.router.clc && pages.includes(_.router.pathname)) {
                            console.log('Refreshing page data due to server-side change');
                            _nextdevtools.dispatcher.buildingIndicatorShow();
                            const clearIndicator = _nextdevtools.dispatcher.buildingIndicatorHide;
                            _.router.replace(_.router.pathname + '?' + String((0, _querystring.assign)((0, _querystring.urlQueryToSearchParams)(_.router.query), new URLSearchParams(location.search))), _.router.asPath, {
                                scroll: false
                            }).catch(()=>{
                                // trigger hard reload when failing to refresh data
                                // to show error overlay properly
                                location.reload();
                            }).finally(clearIndicator);
                        }
                        break;
                    }
                case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.ADDED_PAGE:
                case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.REMOVED_PAGE:
                case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.SERVER_COMPONENT_CHANGES:
                case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.STATIC_PARAMS_CHANGED:
                case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.SYNC:
                case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.BUILT:
                case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.BUILDING:
                case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.TURBOPACK_MESSAGE:
                case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.TURBOPACK_CONNECTED:
                case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.ISR_MANIFEST:
                case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.DEVTOOLS_CONFIG:
                case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.REACT_DEBUG_CHUNK:
                case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.REQUEST_CURRENT_ERROR_STATE:
                case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.REQUEST_PAGE_METADATA:
                case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.CACHE_INDICATOR:
                case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.REQUEST_INSIGHTS_UPDATE:
                case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.ERRORS_TO_SHOW_IN_BROWSER:
                    break;
                default:
                    message;
            }
        });
    });
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=page-bootstrap.js.map
}),
"[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/client/next-dev-turbopack.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// TODO: Remove use of `any` type.
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _interop_require_default = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module './register-deployment-id-global'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
const _ = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/client/index.js [client] (ecmascript)");
const _hotmiddlewareclient = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/client/dev/hot-middleware-client.js [client] (ecmascript)"));
const _pagebootstrap = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/client/page-bootstrap.js [client] (ecmascript)");
const _hmrclientts = __turbopack_context__.r("[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)");
window.next = {
    version: _.version,
    turbopack: true,
    // router is initialized later so it has to be live-binded
    get router () {
        return _.router;
    },
    emitter: _.emitter
};
self.__next_set_public_path__ = ()=>{};
self.__webpack_hash__ = '';
const devClient = (0, _hotmiddlewareclient.default)();
(0, _.initialize)({
    devClient
}).then(({ assetPrefix })=>{
    // for the page loader
    ;
    self.__turbopack_load_page_chunks__ = (page, chunksData)=>{
        const chunkPromises = chunksData.map((c)=>/*TURBOPACK member replacement*/ __turbopack_context__.l(c));
        Promise.all(chunkPromises).catch((err)=>console.error('failed to load chunks for page ' + page, err));
    };
    (0, _hmrclientts.connect)({
        addMessageListener (cb) {
            devClient.addTurbopackMessageListener(cb);
        },
        sendMessage: devClient.sendTurbopackMessage,
        onUpdateError: devClient.handleUpdateError
    });
    return (0, _pagebootstrap.pageBootstrap)(assetPrefix);
}).catch((err)=>{
    console.error('Error was not caught', err);
});
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=next-dev-turbopack.js.map
}),
"[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/client/components/navigation-untracked.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useUntrackedPathname", {
    enumerable: true,
    get: function() {
        return useUntrackedPathname;
    }
});
const _react = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/react/index.js [client] (ecmascript)");
const _hooksclientcontextsharedruntime = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/shared/lib/hooks-client-context.shared-runtime.js [client] (ecmascript)");
const _serverasyncstorage = (()=>{
    const e = new Error("Cannot find module './server-async-storage'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
/**
 * This checks to see if the current render has any unknown route parameters that
 * would cause the pathname to be dynamic. It's used to trigger a different
 * render path in the error boundary.
 *
 * @returns true if there are any unknown route parameters, false otherwise
 */ function hasFallbackRouteParams() {
    // The AsyncLocalStorage module is kept out of the client bundle via the
    // `./server-async-storage` browser alias; the guard ensures the stub is never
    // dereferenced in the browser.
    if (typeof window === 'undefined') {
        const workUnitStore = _serverasyncstorage.workUnitAsyncStorage.getStore();
        if (!workUnitStore) return false;
        switch(workUnitStore.type){
            case 'prerender':
            case 'prerender-client':
            case 'prerender-ppr':
            case 'validation-client':
                const fallbackParams = workUnitStore.fallbackRouteParams;
                return fallbackParams ? fallbackParams.size > 0 : false;
            case 'prerender-legacy':
            case 'request':
            case 'prerender-runtime':
            case 'cache':
            case 'private-cache':
            case 'unstable-cache':
            case 'generate-static-params':
                break;
            default:
                workUnitStore;
        }
        return false;
    }
    return false;
}
function useUntrackedPathname() {
    // If there are any unknown route parameters we would typically throw
    // an error, but this internal method allows us to return a null value instead
    // for components that do not propagate the pathname to the static shell (like
    // the error boundary).
    if (hasFallbackRouteParams()) {
        return null;
    }
    // This shouldn't cause any issues related to conditional rendering because
    // the environment will be consistent for the render.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return (0, _react.useContext)(_hooksclientcontextsharedruntime.PathnameContext);
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=navigation-untracked.js.map
}),
"[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/client/components/router-reducer/create-href-from-url.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createHrefFromUrl", {
    enumerable: true,
    get: function() {
        return createHrefFromUrl;
    }
});
function createHrefFromUrl(url, includeHash = true) {
    return url.pathname + url.search + (includeHash ? url.hash : '');
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=create-href-from-url.js.map
}),
"[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/client/components/nav-failure-handler.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$ChatGPT$2f$believe$2d$konde$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    handleHardNavError: null,
    useNavFailureHandler: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    handleHardNavError: function() {
        return handleHardNavError;
    },
    useNavFailureHandler: function() {
        return useNavFailureHandler;
    }
});
const _react = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/react/index.js [client] (ecmascript)");
const _createhreffromurl = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/client/components/router-reducer/create-href-from-url.js [client] (ecmascript)");
function handleHardNavError(error) {
    if (typeof window !== 'undefined' && window.next.__pendingUrl && (0, _createhreffromurl.createHrefFromUrl)(new URL(window.location.href)) !== (0, _createhreffromurl.createHrefFromUrl)(window.next.__pendingUrl)) {
        console.error(`Error occurred during navigation, falling back to hard navigation`, error);
        window.location.href = window.next.__pendingUrl.toString();
        return true;
    }
    return false;
}
function useNavFailureHandler() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=nav-failure-handler.js.map
}),
"[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/client/components/handle-isr-error.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "handleISRError", {
    enumerable: true,
    get: function() {
        return handleISRError;
    }
});
const _serverasyncstorage = (()=>{
    const e = new Error("Cannot find module './server-async-storage'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
function handleISRError({ error }) {
    if (_serverasyncstorage.workAsyncStorage) {
        const store = _serverasyncstorage.workAsyncStorage.getStore();
        if (store?.isStaticGeneration) {
            if (error) {
                console.error(error);
            }
            throw error;
        }
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=handle-isr-error.js.map
}),
"[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/client/components/catch-error.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$ChatGPT$2f$believe$2d$konde$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
'use client';
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "catchError", {
    enumerable: true,
    get: function() {
        return catchError;
    }
});
const _interop_require_wildcard = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [client] (ecmascript)");
const _jsxruntime = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/react/jsx-runtime.js [client] (ecmascript)");
const _react = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/react/index.js [client] (ecmascript)"));
const _navigationuntracked = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/client/components/navigation-untracked.js [client] (ecmascript)");
const _isnextroutererror = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/client/components/is-next-router-error.js [client] (ecmascript)");
const _navfailurehandler = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/client/components/nav-failure-handler.js [client] (ecmascript)");
const _handleisrerror = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/client/components/handle-isr-error.js [client] (ecmascript)");
const _isbot = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/shared/lib/router/utils/is-bot.js [client] (ecmascript)");
const _approutercontextsharedruntime = __turbopack_context__.r("[project]/Documents/ChatGPT/believe-konde/node_modules/next/dist/shared/lib/app-router-context.shared-runtime.js [client] (ecmascript)");
const _routercontextsharedruntime = (()=>{
    const e = new Error("Cannot find module '../../shared/lib/router-context.shared-runtime'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
const isBotUserAgent = typeof window !== 'undefined' && (0, _isbot.isBot)(window.navigator.userAgent);
// This is forked from error-boundary.
// TODO: Extend it instead of forking to easily sync the behavior?
class CatchError extends _react.default.Component {
    static{
        this.contextType = _approutercontextsharedruntime.AppRouterContext;
    }
    static{
        // `catchError()` is parsed as an HOC-style name and displays as
        // a label (<name> [catchError]) in DevTools.
        this.displayName = 'catchError(Next.CatchError)';
    }
    constructor(props){
        super(props), this.reset = ()=>{
            this.setState({
                error: null
            });
        }, this.retry = ()=>{
            if (this.props.isPagesRouter) {
                throw Object.defineProperty(new Error('`retry()` can only be used in the App Router. Use `reset()` in the Pages Router.'), "__NEXT_ERROR_CODE", {
                    value: "E1360",
                    enumerable: false,
                    configurable: true
                });
            }
            (0, _react.startTransition)(()=>{
                this.context?.refresh();
                this.reset();
            });
        };
        this.state = {
            error: null,
            previousPathname: this.props.pathname
        };
    }
    static getDerivedStateFromError(thrownValue) {
        if ((0, _isnextroutererror.isNextRouterError)(thrownValue)) {
            // Re-throw if an expected internal Next.js router error occurs
            // this means it should be handled by a different boundary (such as a NotFound boundary in a parent segment)
            throw thrownValue;
        }
        return {
            error: {
                thrownValue
            }
        };
    }
    static getDerivedStateFromProps(props, state) {
        const { error } = state;
        // if we encounter an error while
        // a navigation is pending we shouldn't render
        // the error boundary and instead should fallback
        // to a hard navigation to attempt recovering
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        /**
     * Handles reset of the error boundary when a navigation happens.
     * Ensures the error boundary does not stay enabled when navigating to a new page.
     * Approach of setState in render is safe as it checks the previous pathname and then overrides
     * it as outlined in https://react.dev/reference/react/useState#storing-information-from-previous-renders
     */ if (props.pathname !== state.previousPathname && state.error) {
            return {
                error: null,
                previousPathname: props.pathname
            };
        }
        return {
            error: state.error,
            previousPathname: props.pathname
        };
    }
    // Explicit type is needed to avoid the generated `.d.ts` having a wide return type that could be specific to the `@types/react` version.
    render() {
        //When it's bot request, segment level error boundary will keep rendering the children,
        // the final error will be caught by the root error boundary and determine wether need to apply graceful degrade.
        if (this.state.error && !isBotUserAgent) {
            const thrownValue = this.state.error.thrownValue;
            (0, _handleisrerror.handleISRError)({
                error: thrownValue
            });
            return /*#__PURE__*/ (0, _jsxruntime.jsx)(this.props.fallback, {
                props: this.props.props,
                errorInfo: {
                    // TODO(NAR-804): Docs say this is an Error object, but we don't guarantee that
                    error: thrownValue,
                    reset: this.reset,
                    retry: this.retry
                }
            });
        }
        return this.props.children;
    }
}
function catchError(fallback) {
    // Create Fallback component from the closure of `catchError`.
    const Fallback = ({ props, errorInfo })=>fallback(props, errorInfo);
    // Rename to match the user component name for DevTools.
    Fallback.displayName = fallback.name || 'CatchErrorFallback';
    return ({ children, ...props })=>{
        // When we're rendering the missing params shell, this will return null. This
        // is because we won't be rendering any not found boundaries or error
        // boundaries for the missing params shell. When this runs on the client
        // (where these errors can occur), we will get the correct pathname.
        const pathname = (0, _navigationuntracked.useUntrackedPathname)();
        const isPagesRouter = (0, _react.useContext)(_routercontextsharedruntime.RouterContext) !== null;
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(CatchError, {
            pathname: pathname,
            isPagesRouter: isPagesRouter,
            fallback: Fallback,
            props: props,
            children: children
        });
    };
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=catch-error.js.map
}),
]);

//# sourceMappingURL=49116_next_dist_client_77e83021._.js.map