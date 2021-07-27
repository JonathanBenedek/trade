'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Filter = void 0;
class Filter {
    constructor(conf, params) {
        this.params = params;
        this.conf = conf;
        if (!conf.condition) {
            throw new Error("filter without condition");
        }
        if (!conf.param1 || !params[this.conf.param1]) {
            console.log(`${this.conf.param1} not found in paramters`);
            throw new Error("filter without param1");
        }
        if (!conf.param2 || !params[this.conf.param2]) {
            console.log(`${this.conf.param2} not found in paramters`);
            throw new Error("filter without param2");
        }
    }
    _bigger(param1, param2) {
        return param1 > param2;
    }
    _equal(param1, param2) {
        return param1 === param2;
    }
    filter(params, symbol) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!params[this.conf.param1]) {
                console.log(`Filter class:  ${this.conf.param1} not found`);
            }
            if (!params[this.conf.param2]) {
                console.log(`Filter class:  ${this.conf.param2} not found`);
            }
            const param1 = yield ((params[this.conf.param1]).get(params, symbol));
            const param2 = yield ((params[this.conf.param2]).get(params, symbol));
            switch (this.conf.condition) {
                case ">":
                    return this._bigger(param1, param2);
                case "<":
                    return this._bigger(param2, param1);
                case "=":
                    return this._equal(param1, param2);
                case ">=":
                    return this._equal(param1, param2) || this._bigger(param1, param2);
                default:
                    throw new Error("unknown");
                    break;
            }
        });
    }
}
exports.Filter = Filter;
//# sourceMappingURL=filter.js.map