/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/background.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/background.ts":
/*!***************************!*\
  !*** ./src/background.ts ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _migrations_migration1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./migrations/migration1 */ "./src/migrations/migration1.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
 // TODO: Convert this into dynamic import
chrome.runtime.onInstalled.addListener((details) => __awaiter(void 0, void 0, void 0, function* () {
    if (details && details.reason === 'update') {
        yield Object(_migrations_migration1__WEBPACK_IMPORTED_MODULE_0__["migration1"])();
    }
}));


/***/ }),

/***/ "./src/common/HelperFunctions.ts":
/*!***************************************!*\
  !*** ./src/common/HelperFunctions.ts ***!
  \***************************************/
/*! exports provided: getDataForPath, clearStorage, setDataToPath, serializeMap, deserializeToMap, deserializeData, getFormattedTime */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDataForPath", function() { return getDataForPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearStorage", function() { return clearStorage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDataToPath", function() { return setDataToPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "serializeMap", function() { return serializeMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deserializeToMap", function() { return deserializeToMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deserializeData", function() { return deserializeData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFormattedTime", function() { return getFormattedTime; });
function getDataForPath(path) {
    return new Promise((resolve, reject) => {
        try {
            chrome.storage.local.get(path, (data) => resolve(data));
        }
        catch (err) {
            reject(err);
        }
    });
}
function clearStorage() {
    return new Promise((resolve, reject) => {
        try {
            chrome.storage.local.clear(() => resolve());
        }
        catch (err) {
            reject(err);
        }
    });
}
function setDataToPath(path, data) {
    return new Promise((resolve, reject) => {
        try {
            chrome.storage.local.set({ [path]: data }, () => {
                if (chrome.runtime.lastError) {
                    reject('Error in setting data to chrome storage');
                }
                resolve();
            });
        }
        catch (err) {
            reject(err);
        }
    });
}
function serializeMap(map) {
    return JSON.stringify(Array.from(map.entries()));
}
function deserializeToMap(data) {
    return new Map(JSON.parse(data));
}
function deserializeData(data) {
    const dateMap = deserializeToMap(data);
    const finalMap = new Map();
    for (const [date, info] of dateMap.entries()) {
        const newValue = deserializeToMap(info);
        finalMap.set(date, newValue);
    }
    return { output: finalMap };
}
function getFormattedTime(timestamp) {
    const date = new Date(+timestamp * 1000);
    return `${date.getHours()}:${date.getMinutes()}`;
}


/***/ }),

/***/ "./src/migrations/migration1.ts":
/*!**************************************!*\
  !*** ./src/migrations/migration1.ts ***!
  \**************************************/
/*! exports provided: migration1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "migration1", function() { return migration1; });
/* harmony import */ var _common_HelperFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/HelperFunctions */ "./src/common/HelperFunctions.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

/**
 * Converts obj in each path (query, search and execute) to
 * new data structure into map
 */
class Migration1 {
    constructor() {
        this.statesKey = 'extension_states';
    }
    shouldUpgrade() {
        return __awaiter(this, void 0, void 0, function* () {
            this.allData = yield Object(_common_HelperFunctions__WEBPACK_IMPORTED_MODULE_0__["getDataForPath"])(null); // 'null' gets all the data for all paths
            if (this.allData.hasOwnProperty(this.statesKey)) {
                this.extensionState = this.allData[this.statesKey];
                delete this.allData[this.statesKey]; // no need to migrate extension_states
            }
            let doUpgrade = false;
            const allKeys = Object.keys(this.allData);
            if (allKeys.length > 0) {
                for (let i = 0; i < allKeys.length; i++) {
                    if (this.allData[allKeys[i]].constructor === Object) {
                        doUpgrade = true;
                        break;
                    }
                }
            }
            return doUpgrade;
        });
    }
    upgrade() {
        return __awaiter(this, void 0, void 0, function* () {
            yield Object(_common_HelperFunctions__WEBPACK_IMPORTED_MODULE_0__["clearStorage"])();
            for (const [path, data] of Object.entries(this.allData)) {
                const dateMap = new Map();
                const sortedDates = Object.keys(data).sort((a, b) => new Date(b).valueOf() - new Date(a).valueOf());
                for (const currentDate of sortedDates) {
                    const timeQueryMap = new Map();
                    // Set timestamp as key and query as value in timeQueryMap
                    data[currentDate].map(info => timeQueryMap.set(info[0], info[1]));
                    dateMap.set(currentDate, Object(_common_HelperFunctions__WEBPACK_IMPORTED_MODULE_0__["serializeMap"])(timeQueryMap));
                }
                yield Object(_common_HelperFunctions__WEBPACK_IMPORTED_MODULE_0__["setDataToPath"])(path, Object(_common_HelperFunctions__WEBPACK_IMPORTED_MODULE_0__["serializeMap"])(dateMap));
                if (Object.keys(this.extensionState).length) {
                    yield Object(_common_HelperFunctions__WEBPACK_IMPORTED_MODULE_0__["setDataToPath"])(this.statesKey, this.extensionState);
                }
            }
        });
    }
}
function migration1() {
    return __awaiter(this, void 0, void 0, function* () {
        const migration1 = new Migration1();
        if (yield migration1.shouldUpgrade()) {
            yield migration1.upgrade();
        }
    });
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tncm91bmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9IZWxwZXJGdW5jdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21pZ3JhdGlvbnMvbWlncmF0aW9uMS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRnFELENBQUMseUNBQXlDO0FBRS9GLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFO0lBQ3ZELElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssUUFBUSxFQUFFO1FBQzFDLE1BQU0seUVBQVUsRUFBRSxDQUFDO0tBQ3BCO0FBQ0gsQ0FBQyxFQUFDLENBQUM7Ozs7Ozs7Ozs7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ImZpbGUiOiJiYWNrZ3JvdW5kLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvYmFja2dyb3VuZC50c1wiKTtcbiIsImltcG9ydCB7IG1pZ3JhdGlvbjEgfSBmcm9tICcuL21pZ3JhdGlvbnMvbWlncmF0aW9uMSc7IC8vIFRPRE86IENvbnZlcnQgdGhpcyBpbnRvIGR5bmFtaWMgaW1wb3J0XG5cbmNocm9tZS5ydW50aW1lLm9uSW5zdGFsbGVkLmFkZExpc3RlbmVyKGFzeW5jIChkZXRhaWxzKSA9PiB7XG4gIGlmIChkZXRhaWxzICYmIGRldGFpbHMucmVhc29uID09PSAndXBkYXRlJykge1xuICAgIGF3YWl0IG1pZ3JhdGlvbjEoKTtcbiAgfVxufSk7XG4iLCJleHBvcnQgZnVuY3Rpb24gZ2V0RGF0YUZvclBhdGgocGF0aDogc3RyaW5nKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldChwYXRoLCAoZGF0YSkgPT4gcmVzb2x2ZShkYXRhKSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZWplY3QoZXJyKTtcbiAgICB9XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJTdG9yYWdlKCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5jbGVhcigoKSA9PiByZXNvbHZlKCkpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmVqZWN0KGVycik7XG4gICAgfVxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldERhdGFUb1BhdGgocGF0aDogc3RyaW5nLCBkYXRhOiBzdHJpbmcgfCBPYmplY3QpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB0cnkge1xuICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHsgW3BhdGhdOiBkYXRhIH0sICgpID0+IHtcbiAgICAgICAgaWYgKGNocm9tZS5ydW50aW1lLmxhc3RFcnJvcikge1xuICAgICAgICAgIHJlamVjdCgnRXJyb3IgaW4gc2V0dGluZyBkYXRhIHRvIGNocm9tZSBzdG9yYWdlJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZWplY3QoZXJyKTtcbiAgICB9XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2VyaWFsaXplTWFwKG1hcCkge1xuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoQXJyYXkuZnJvbShtYXAuZW50cmllcygpKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXNlcmlhbGl6ZVRvTWFwKGRhdGE6IGFueSkge1xuICByZXR1cm4gbmV3IE1hcChKU09OLnBhcnNlKGRhdGEpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlc2VyaWFsaXplRGF0YShkYXRhOiBzdHJpbmcpIHtcbiAgY29uc3QgZGF0ZU1hcCA9IGRlc2VyaWFsaXplVG9NYXAoZGF0YSk7XG4gIGNvbnN0IGZpbmFsTWFwID0gbmV3IE1hcCgpO1xuICBmb3IgKGNvbnN0IFtkYXRlLCBpbmZvXSBvZiBkYXRlTWFwLmVudHJpZXMoKSkge1xuICAgIGNvbnN0IG5ld1ZhbHVlID0gZGVzZXJpYWxpemVUb01hcChpbmZvKTtcbiAgICBmaW5hbE1hcC5zZXQoZGF0ZSwgbmV3VmFsdWUpO1xuICB9XG4gIHJldHVybiB7IG91dHB1dDogZmluYWxNYXAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEZvcm1hdHRlZFRpbWUodGltZXN0YW1wOiBzdHJpbmcpOiBzdHJpbmcge1xuICBjb25zdCBkYXRlID0gbmV3IERhdGUoK3RpbWVzdGFtcCAqIDEwMDApO1xuICByZXR1cm4gYCR7ZGF0ZS5nZXRIb3VycygpfToke2RhdGUuZ2V0TWludXRlcygpfWA7XG59XG4iLCJpbXBvcnQgeyBNaWdyYXRpb24gfSBmcm9tICcuL2ludGVyZmFjZSc7XG5pbXBvcnQgeyBnZXREYXRhRm9yUGF0aCwgY2xlYXJTdG9yYWdlLCBzZXREYXRhVG9QYXRoLCBzZXJpYWxpemVNYXAgfSBmcm9tICcuLi9jb21tb24vSGVscGVyRnVuY3Rpb25zJztcbi8qKlxuICogQ29udmVydHMgb2JqIGluIGVhY2ggcGF0aCAocXVlcnksIHNlYXJjaCBhbmQgZXhlY3V0ZSkgdG9cbiAqIG5ldyBkYXRhIHN0cnVjdHVyZSBpbnRvIG1hcFxuICovXG5jbGFzcyBNaWdyYXRpb24xIGltcGxlbWVudHMgTWlncmF0aW9uIHtcbiAgcHJpdmF0ZSBhbGxEYXRhOiBPYmplY3Q7XG4gIHByaXZhdGUgZXh0ZW5zaW9uU3RhdGU6IE9iamVjdDtcbiAgcHJpdmF0ZSBzdGF0ZXNLZXkgPSAnZXh0ZW5zaW9uX3N0YXRlcyc7XG5cbiAgYXN5bmMgc2hvdWxkVXBncmFkZSgpIHtcbiAgICB0aGlzLmFsbERhdGEgPSBhd2FpdCBnZXREYXRhRm9yUGF0aChudWxsKTsgLy8gJ251bGwnIGdldHMgYWxsIHRoZSBkYXRhIGZvciBhbGwgcGF0aHNcbiAgICBpZiAodGhpcy5hbGxEYXRhLmhhc093blByb3BlcnR5KHRoaXMuc3RhdGVzS2V5KSkge1xuICAgICAgdGhpcy5leHRlbnNpb25TdGF0ZSA9IHRoaXMuYWxsRGF0YVt0aGlzLnN0YXRlc0tleV07XG4gICAgICBkZWxldGUgdGhpcy5hbGxEYXRhW3RoaXMuc3RhdGVzS2V5XTsgLy8gbm8gbmVlZCB0byBtaWdyYXRlIGV4dGVuc2lvbl9zdGF0ZXNcbiAgICB9XG4gICAgbGV0IGRvVXBncmFkZSA9IGZhbHNlO1xuICAgIGNvbnN0IGFsbEtleXMgPSBPYmplY3Qua2V5cyh0aGlzLmFsbERhdGEpO1xuICAgIGlmIChhbGxLZXlzLmxlbmd0aCA+IDApIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsS2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodGhpcy5hbGxEYXRhW2FsbEtleXNbaV1dLmNvbnN0cnVjdG9yID09PSBPYmplY3QpIHtcbiAgICAgICAgICBkb1VwZ3JhZGUgPSB0cnVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBkb1VwZ3JhZGU7XG4gIH1cblxuICBhc3luYyB1cGdyYWRlKCkge1xuICAgIGF3YWl0IGNsZWFyU3RvcmFnZSgpO1xuICAgIGZvciAoY29uc3QgW3BhdGgsIGRhdGFdIG9mIE9iamVjdC5lbnRyaWVzKHRoaXMuYWxsRGF0YSkpIHtcbiAgICAgIGNvbnN0IGRhdGVNYXAgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xuICAgICAgY29uc3Qgc29ydGVkRGF0ZXMgPSBPYmplY3Qua2V5cyhkYXRhKS5zb3J0KChhLCBiKSA9PiBuZXcgRGF0ZShiKS52YWx1ZU9mKCkgLSBuZXcgRGF0ZShhKS52YWx1ZU9mKCkpO1xuICAgICAgZm9yIChjb25zdCBjdXJyZW50RGF0ZSBvZiBzb3J0ZWREYXRlcykge1xuICAgICAgICBjb25zdCB0aW1lUXVlcnlNYXAgPSBuZXcgTWFwPG51bWJlciwgc3RyaW5nPigpO1xuICAgICAgICAvLyBTZXQgdGltZXN0YW1wIGFzIGtleSBhbmQgcXVlcnkgYXMgdmFsdWUgaW4gdGltZVF1ZXJ5TWFwXG4gICAgICAgIGRhdGFbY3VycmVudERhdGVdLm1hcChpbmZvID0+IHRpbWVRdWVyeU1hcC5zZXQoaW5mb1swXSwgaW5mb1sxXSkpO1xuICAgICAgICBkYXRlTWFwLnNldChjdXJyZW50RGF0ZSwgc2VyaWFsaXplTWFwKHRpbWVRdWVyeU1hcCkpO1xuICAgICAgfVxuICAgICAgYXdhaXQgc2V0RGF0YVRvUGF0aChwYXRoLCBzZXJpYWxpemVNYXAoZGF0ZU1hcCkpO1xuICAgICAgaWYgKE9iamVjdC5rZXlzKHRoaXMuZXh0ZW5zaW9uU3RhdGUpLmxlbmd0aCkge1xuICAgICAgICBhd2FpdCBzZXREYXRhVG9QYXRoKHRoaXMuc3RhdGVzS2V5LCB0aGlzLmV4dGVuc2lvblN0YXRlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG1pZ3JhdGlvbjEoKSB7XG4gIGNvbnN0IG1pZ3JhdGlvbjEgPSBuZXcgTWlncmF0aW9uMSgpO1xuICBpZiAoYXdhaXQgbWlncmF0aW9uMS5zaG91bGRVcGdyYWRlKCkpIHtcbiAgICBhd2FpdCBtaWdyYXRpb24xLnVwZ3JhZGUoKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==