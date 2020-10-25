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
/*! exports provided: getDataForPath, clearStorage, setDataToPath, serializeMap, deserializeToMap, deserializeData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDataForPath", function() { return getDataForPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearStorage", function() { return clearStorage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDataToPath", function() { return setDataToPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "serializeMap", function() { return serializeMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deserializeToMap", function() { return deserializeToMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deserializeData", function() { return deserializeData; });
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
    shouldUpgrade() {
        return __awaiter(this, void 0, void 0, function* () {
            this.allData = yield Object(_common_HelperFunctions__WEBPACK_IMPORTED_MODULE_0__["getDataForPath"])(null); // 'null' gets all the data for all paths
            if (this.allData.hasOwnProperty('extension_states')) {
                delete this.allData['extension_states']; // no need to migrate extension_states
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tncm91bmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9IZWxwZXJGdW5jdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21pZ3JhdGlvbnMvbWlncmF0aW9uMS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRnFELENBQUMseUNBQXlDO0FBRS9GLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFO0lBQ3ZELElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssUUFBUSxFQUFFO1FBQzFDLE1BQU0seUVBQVUsRUFBRSxDQUFDO0tBQ3BCO0FBQ0gsQ0FBQyxFQUFDLENBQUM7Ozs7Ozs7Ozs7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QVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2xFLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLDRFQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztpQkFDdEQ7Z0JBQ0QsTUFBTSw2RUFBYSxDQUFDLElBQUksRUFBRSw0RUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7YUFDbEQ7UUFDSCxDQUFDO0tBQUE7Q0FDRjtBQUVNLFNBQWUsVUFBVTs7UUFDOUIsTUFBTSxVQUFVLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztRQUNwQyxJQUFJLE1BQU0sVUFBVSxDQUFDLGFBQWEsRUFBRSxFQUFFO1lBQ3BDLE1BQU0sVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQzVCO0lBQ0gsQ0FBQztDQUFBIiwiZmlsZSI6ImJhY2tncm91bmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9iYWNrZ3JvdW5kLnRzXCIpO1xuIiwiaW1wb3J0IHsgbWlncmF0aW9uMSB9IGZyb20gJy4vbWlncmF0aW9ucy9taWdyYXRpb24xJzsgLy8gVE9ETzogQ29udmVydCB0aGlzIGludG8gZHluYW1pYyBpbXBvcnRcblxuY2hyb21lLnJ1bnRpbWUub25JbnN0YWxsZWQuYWRkTGlzdGVuZXIoYXN5bmMgKGRldGFpbHMpID0+IHtcbiAgaWYgKGRldGFpbHMgJiYgZGV0YWlscy5yZWFzb24gPT09ICd1cGRhdGUnKSB7XG4gICAgYXdhaXQgbWlncmF0aW9uMSgpO1xuICB9XG59KTtcbiIsImV4cG9ydCBmdW5jdGlvbiBnZXREYXRhRm9yUGF0aChwYXRoOiBzdHJpbmcpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB0cnkge1xuICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KHBhdGgsIChkYXRhKSA9PiByZXNvbHZlKGRhdGEpKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJlamVjdChlcnIpO1xuICAgIH1cbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhclN0b3JhZ2UoKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLmNsZWFyKCgpID0+IHJlc29sdmUoKSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZWplY3QoZXJyKTtcbiAgICB9XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0RGF0YVRvUGF0aChwYXRoOiBzdHJpbmcsIGRhdGE6IHN0cmluZykge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoeyBbcGF0aF06IGRhdGEgfSwgKCkgPT4ge1xuICAgICAgICBpZiAoY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yKSB7XG4gICAgICAgICAgcmVqZWN0KCdFcnJvciBpbiBzZXR0aW5nIGRhdGEgdG8gY2hyb21lIHN0b3JhZ2UnKTtcbiAgICAgICAgfVxuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJlamVjdChlcnIpO1xuICAgIH1cbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXJpYWxpemVNYXAobWFwKSB7XG4gIHJldHVybiBKU09OLnN0cmluZ2lmeShBcnJheS5mcm9tKG1hcC5lbnRyaWVzKCkpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlc2VyaWFsaXplVG9NYXAoZGF0YTogYW55KSB7XG4gIHJldHVybiBuZXcgTWFwKEpTT04ucGFyc2UoZGF0YSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVzZXJpYWxpemVEYXRhKGRhdGE6IHN0cmluZykge1xuICBjb25zdCBkYXRlTWFwID0gZGVzZXJpYWxpemVUb01hcChkYXRhKTtcbiAgY29uc3QgZmluYWxNYXAgPSBuZXcgTWFwKCk7XG4gIGZvciAoY29uc3QgW2RhdGUsIGluZm9dIG9mIGRhdGVNYXAuZW50cmllcygpKSB7XG4gICAgY29uc3QgbmV3VmFsdWUgPSBkZXNlcmlhbGl6ZVRvTWFwKGluZm8pO1xuICAgIGZpbmFsTWFwLnNldChkYXRlLCBuZXdWYWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHsgb3V0cHV0OiBmaW5hbE1hcCB9O1xufVxuIiwiaW1wb3J0IHsgTWlncmF0aW9uIH0gZnJvbSAnLi9pbnRlcmZhY2UnO1xuaW1wb3J0IHsgZ2V0RGF0YUZvclBhdGgsIGNsZWFyU3RvcmFnZSwgc2V0RGF0YVRvUGF0aCwgc2VyaWFsaXplTWFwIH0gZnJvbSAnLi4vY29tbW9uL0hlbHBlckZ1bmN0aW9ucyc7XG4vKipcbiAqIENvbnZlcnRzIG9iaiBpbiBlYWNoIHBhdGggKHF1ZXJ5LCBzZWFyY2ggYW5kIGV4ZWN1dGUpIHRvXG4gKiBuZXcgZGF0YSBzdHJ1Y3R1cmUgaW50byBtYXBcbiAqL1xuY2xhc3MgTWlncmF0aW9uMSBpbXBsZW1lbnRzIE1pZ3JhdGlvbiB7XG4gIHByaXZhdGUgYWxsRGF0YTogT2JqZWN0O1xuXG4gIGFzeW5jIHNob3VsZFVwZ3JhZGUoKSB7XG4gICAgdGhpcy5hbGxEYXRhID0gYXdhaXQgZ2V0RGF0YUZvclBhdGgobnVsbCk7IC8vICdudWxsJyBnZXRzIGFsbCB0aGUgZGF0YSBmb3IgYWxsIHBhdGhzXG4gICAgaWYgKHRoaXMuYWxsRGF0YS5oYXNPd25Qcm9wZXJ0eSgnZXh0ZW5zaW9uX3N0YXRlcycpKSB7XG4gICAgICBkZWxldGUgdGhpcy5hbGxEYXRhWydleHRlbnNpb25fc3RhdGVzJ107IC8vIG5vIG5lZWQgdG8gbWlncmF0ZSBleHRlbnNpb25fc3RhdGVzXG4gICAgfVxuICAgIGxldCBkb1VwZ3JhZGUgPSBmYWxzZTtcbiAgICBjb25zdCBhbGxLZXlzID0gT2JqZWN0LmtleXModGhpcy5hbGxEYXRhKTtcbiAgICBpZiAoYWxsS2V5cy5sZW5ndGggPiAwKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbEtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHRoaXMuYWxsRGF0YVthbGxLZXlzW2ldXS5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0KSB7XG4gICAgICAgICAgZG9VcGdyYWRlID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZG9VcGdyYWRlO1xuICB9XG5cbiAgYXN5bmMgdXBncmFkZSgpIHtcbiAgICBhd2FpdCBjbGVhclN0b3JhZ2UoKTtcbiAgICBmb3IgKGNvbnN0IFtwYXRoLCBkYXRhXSBvZiBPYmplY3QuZW50cmllcyh0aGlzLmFsbERhdGEpKSB7XG4gICAgICBjb25zdCBkYXRlTWFwID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oKTtcbiAgICAgIGNvbnN0IHNvcnRlZERhdGVzID0gT2JqZWN0LmtleXMoZGF0YSkuc29ydCgoYSwgYikgPT4gbmV3IERhdGUoYikudmFsdWVPZigpIC0gbmV3IERhdGUoYSkudmFsdWVPZigpKTtcbiAgICAgIGZvciAoY29uc3QgY3VycmVudERhdGUgb2Ygc29ydGVkRGF0ZXMpIHtcbiAgICAgICAgY29uc3QgdGltZVF1ZXJ5TWFwID0gbmV3IE1hcDxudW1iZXIsIHN0cmluZz4oKTtcbiAgICAgICAgLy8gU2V0IHRpbWVzdGFtcCBhcyBrZXkgYW5kIHF1ZXJ5IGFzIHZhbHVlIGluIHRpbWVRdWVyeU1hcFxuICAgICAgICBkYXRhW2N1cnJlbnREYXRlXS5tYXAoaW5mbyA9PiB0aW1lUXVlcnlNYXAuc2V0KGluZm9bMF0sIGluZm9bMV0pKTtcbiAgICAgICAgZGF0ZU1hcC5zZXQoY3VycmVudERhdGUsIHNlcmlhbGl6ZU1hcCh0aW1lUXVlcnlNYXApKTtcbiAgICAgIH1cbiAgICAgIGF3YWl0IHNldERhdGFUb1BhdGgocGF0aCwgc2VyaWFsaXplTWFwKGRhdGVNYXApKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG1pZ3JhdGlvbjEoKSB7XG4gIGNvbnN0IG1pZ3JhdGlvbjEgPSBuZXcgTWlncmF0aW9uMSgpO1xuICBpZiAoYXdhaXQgbWlncmF0aW9uMS5zaG91bGRVcGdyYWRlKCkpIHtcbiAgICBhd2FpdCBtaWdyYXRpb24xLnVwZ3JhZGUoKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==