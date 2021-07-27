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
exports.Paramter = void 0;
const queryService_1 = require("./queryService");
class Paramter {
    constructor(conf) {
        this.conf = conf;
        if (Number.isInteger(conf)) {
            this.method = "value";
            this.value = conf;
        }
        else if (typeof conf === 'object') {
            if (conf.query && conf.value && conf.operation) {
                this.method = "query";
            }
            else if (conf.param1 && conf.param2 && conf.operation) {
                this.method = "complex";
            }
            else {
                console.error("paramter not valid");
                throw new Error("paramter not valid" + conf);
            }
        }
    }
    _calculateComplex(params, symbol) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`start calculate complext with param1=  ${params[this.conf.param1]}  param2=  ${params[this.conf.param2]}`);
            return this._doOperation(yield params[this.conf.param1].get(params, symbol), yield params[this.conf.param2].get(params, symbol), this.conf.operation);
        });
    }
    _doOperation(valueParam1, valueParam2, operation) {
        let value = 0;
        switch (operation) {
            case "sum":
                value = valueParam1 + valueParam2;
                break;
            case "sub":
                value = valueParam1 - valueParam2;
                break;
            case "multiply":
                value = valueParam1 * valueParam2;
                break;
            case "divide":
                value = valueParam1 / valueParam2;
                break;
        }
        return value;
    }
    _calculateQuery(symbol) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield queryService_1.getQuery(this.conf, symbol);
        });
    }
    get(params, symbol) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("paramter class : get start");
            if (this.value) {
                return this.value;
            }
            switch (this.method) {
                case "complex":
                    console.log("paramter class : complex");
                    this.value = yield this._calculateComplex(params, symbol);
                    break;
                case "query":
                    console.log("paramter class : query");
                    this.value = yield this._calculateQuery(symbol);
                    break;
                default:
                    console.error("Paramters class : no get method");
                    break;
            }
            return (this.value);
        });
    }
}
exports.Paramter = Paramter;
//# sourceMappingURL=parameter.js.map