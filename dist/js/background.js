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
/*! exports provided: getDataForPath, clearStorage, setDataToPath, serializeMap, deserializeToMap, deserializeDataForPath */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDataForPath", function() { return getDataForPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearStorage", function() { return clearStorage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDataToPath", function() { return setDataToPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "serializeMap", function() { return serializeMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deserializeToMap", function() { return deserializeToMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deserializeDataForPath", function() { return deserializeDataForPath; });
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
function deserializeDataForPath(data) {
    const dateMap = deserializeToMap(data);
    const outputMap = new Map();
    for (const [date, info] of dateMap.entries()) {
        const newValue = deserializeToMap(info);
        outputMap.set(date, newValue);
    }
    return outputMap;
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
            const insertedData = yield Object(_common_HelperFunctions__WEBPACK_IMPORTED_MODULE_0__["getDataForPath"])('query');
            console.log(new Map(JSON.parse((insertedData.query))));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tncm91bmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9IZWxwZXJGdW5jdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21pZ3JhdGlvbnMvbWlncmF0aW9uMS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRnFELENBQUMseUNBQXlDO0FBRS9GLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFO0lBQ3ZELElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssUUFBUSxFQUFFO1FBQzFDLE1BQU0seUVBQVUsRUFBRSxDQUFDO0tBQ3BCO0FBQ0gsQ0FBQyxFQUFDLENBQUM7Ozs7Ozs7Ozs7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QUcsQ0FBQyxXQUFXLEVBQUUsNEVBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO2lCQUN0RDtnQkFDRCxNQUFNLDZFQUFhLENBQUMsSUFBSSxFQUFFLDRFQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzthQUNsRDtZQUNELE1BQU0sWUFBWSxHQUFRLE1BQU0sOEVBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN4RCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekQsQ0FBQztLQUFBO0NBQ0Y7QUFFTSxTQUFlLFVBQVU7O1FBQzlCLE1BQU0sVUFBVSxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7UUFDcEMsSUFBSSxNQUFNLFVBQVUsQ0FBQyxhQUFhLEVBQUUsRUFBRTtZQUNwQyxNQUFNLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUM1QjtJQUNILENBQUM7Q0FBQSIsImZpbGUiOiJiYWNrZ3JvdW5kLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvYmFja2dyb3VuZC50c1wiKTtcbiIsImltcG9ydCB7IG1pZ3JhdGlvbjEgfSBmcm9tICcuL21pZ3JhdGlvbnMvbWlncmF0aW9uMSc7IC8vIFRPRE86IENvbnZlcnQgdGhpcyBpbnRvIGR5bmFtaWMgaW1wb3J0XG5cbmNocm9tZS5ydW50aW1lLm9uSW5zdGFsbGVkLmFkZExpc3RlbmVyKGFzeW5jIChkZXRhaWxzKSA9PiB7XG4gIGlmIChkZXRhaWxzICYmIGRldGFpbHMucmVhc29uID09PSAndXBkYXRlJykge1xuICAgIGF3YWl0IG1pZ3JhdGlvbjEoKTtcbiAgfVxufSk7XG4iLCJleHBvcnQgZnVuY3Rpb24gZ2V0RGF0YUZvclBhdGgocGF0aDogc3RyaW5nKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldChwYXRoLCAoZGF0YSkgPT4gcmVzb2x2ZShkYXRhKSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZWplY3QoZXJyKTtcbiAgICB9XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJTdG9yYWdlKCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5jbGVhcigoKSA9PiByZXNvbHZlKCkpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmVqZWN0KGVycik7XG4gICAgfVxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldERhdGFUb1BhdGgocGF0aDogc3RyaW5nLCBkYXRhOiBzdHJpbmcpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB0cnkge1xuICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHsgW3BhdGhdOiBkYXRhIH0sICgpID0+IHtcbiAgICAgICAgaWYgKGNocm9tZS5ydW50aW1lLmxhc3RFcnJvcikge1xuICAgICAgICAgIHJlamVjdCgnRXJyb3IgaW4gc2V0dGluZyBkYXRhIHRvIGNocm9tZSBzdG9yYWdlJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZWplY3QoZXJyKTtcbiAgICB9XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2VyaWFsaXplTWFwKG1hcCkge1xuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoQXJyYXkuZnJvbShtYXAuZW50cmllcygpKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXNlcmlhbGl6ZVRvTWFwKGRhdGE6IGFueSkge1xuICByZXR1cm4gbmV3IE1hcChKU09OLnBhcnNlKGRhdGEpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlc2VyaWFsaXplRGF0YUZvclBhdGgoZGF0YTogc3RyaW5nKSB7XG4gIGNvbnN0IGRhdGVNYXAgPSBkZXNlcmlhbGl6ZVRvTWFwKGRhdGEpO1xuICBjb25zdCBvdXRwdXRNYXAgPSBuZXcgTWFwKCk7XG4gIGZvciAoY29uc3QgW2RhdGUsIGluZm9dIG9mIGRhdGVNYXAuZW50cmllcygpKSB7XG4gICAgY29uc3QgbmV3VmFsdWUgPSBkZXNlcmlhbGl6ZVRvTWFwKGluZm8pO1xuICAgIG91dHB1dE1hcC5zZXQoZGF0ZSwgbmV3VmFsdWUpO1xuICB9XG4gIHJldHVybiBvdXRwdXRNYXA7XG59XG4iLCJpbXBvcnQgeyBNaWdyYXRpb24gfSBmcm9tICcuL2ludGVyZmFjZSc7XG5pbXBvcnQgeyBnZXREYXRhRm9yUGF0aCwgY2xlYXJTdG9yYWdlLCBzZXREYXRhVG9QYXRoLCBzZXJpYWxpemVNYXAgfSBmcm9tICcuLi9jb21tb24vSGVscGVyRnVuY3Rpb25zJztcbi8qKlxuICogQ29udmVydHMgb2JqIGluIGVhY2ggcGF0aCAocXVlcnksIHNlYXJjaCBhbmQgZXhlY3V0ZSkgdG9cbiAqIG5ldyBkYXRhIHN0cnVjdHVyZSBpbnRvIG1hcFxuICovXG5jbGFzcyBNaWdyYXRpb24xIGltcGxlbWVudHMgTWlncmF0aW9uIHtcbiAgcHJpdmF0ZSBhbGxEYXRhOiBPYmplY3Q7XG5cbiAgYXN5bmMgc2hvdWxkVXBncmFkZSgpIHtcbiAgICB0aGlzLmFsbERhdGEgPSBhd2FpdCBnZXREYXRhRm9yUGF0aChudWxsKTsgLy8gJ251bGwnIGdldHMgYWxsIHRoZSBkYXRhIGZvciBhbGwgcGF0aHNcbiAgICBsZXQgZG9VcGdyYWRlID0gZmFsc2U7XG4gICAgY29uc3QgYWxsS2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuYWxsRGF0YSk7XG4gICAgaWYgKGFsbEtleXMubGVuZ3RoID4gMCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbGxLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0aGlzLmFsbERhdGFbYWxsS2V5c1tpXV0uY29uc3RydWN0b3IgPT09IE9iamVjdCkge1xuICAgICAgICAgIGRvVXBncmFkZSA9IHRydWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGRvVXBncmFkZTtcbiAgfVxuXG4gIGFzeW5jIHVwZ3JhZGUoKSB7XG4gICAgYXdhaXQgY2xlYXJTdG9yYWdlKCk7XG4gICAgZm9yIChjb25zdCBbcGF0aCwgZGF0YV0gb2YgT2JqZWN0LmVudHJpZXModGhpcy5hbGxEYXRhKSkge1xuICAgICAgY29uc3QgZGF0ZU1hcCA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KCk7XG4gICAgICBjb25zdCBzb3J0ZWREYXRlcyA9IE9iamVjdC5rZXlzKGRhdGEpLnNvcnQoKGEsIGIpID0+IG5ldyBEYXRlKGIpLnZhbHVlT2YoKSAtIG5ldyBEYXRlKGEpLnZhbHVlT2YoKSk7XG4gICAgICBmb3IgKGNvbnN0IGN1cnJlbnREYXRlIG9mIHNvcnRlZERhdGVzKSB7XG4gICAgICAgIGNvbnN0IHRpbWVRdWVyeU1hcCA9IG5ldyBNYXA8bnVtYmVyLCBzdHJpbmc+KCk7XG4gICAgICAgIC8vIFNldCB0aW1lc3RhbXAgYXMga2V5IGFuZCBxdWVyeSBhcyB2YWx1ZSBpbiB0aW1lUXVlcnlNYXBcbiAgICAgICAgZGF0YVtjdXJyZW50RGF0ZV0ubWFwKGluZm8gPT4gdGltZVF1ZXJ5TWFwLnNldChpbmZvWzBdLCBpbmZvWzFdKSk7XG4gICAgICAgIGRhdGVNYXAuc2V0KGN1cnJlbnREYXRlLCBzZXJpYWxpemVNYXAodGltZVF1ZXJ5TWFwKSk7XG4gICAgICB9XG4gICAgICBhd2FpdCBzZXREYXRhVG9QYXRoKHBhdGgsIHNlcmlhbGl6ZU1hcChkYXRlTWFwKSk7XG4gICAgfVxuICAgIGNvbnN0IGluc2VydGVkRGF0YTogYW55ID0gYXdhaXQgZ2V0RGF0YUZvclBhdGgoJ3F1ZXJ5Jyk7XG4gICAgY29uc29sZS5sb2cobmV3IE1hcChKU09OLnBhcnNlKChpbnNlcnRlZERhdGEucXVlcnkpKSkpO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBtaWdyYXRpb24xKCkge1xuICBjb25zdCBtaWdyYXRpb24xID0gbmV3IE1pZ3JhdGlvbjEoKTtcbiAgaWYgKGF3YWl0IG1pZ3JhdGlvbjEuc2hvdWxkVXBncmFkZSgpKSB7XG4gICAgYXdhaXQgbWlncmF0aW9uMS51cGdyYWRlKCk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=