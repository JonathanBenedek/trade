"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configurationService = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const confPath = '../conf/configurationIlan.json';
function getConfiguration() {
    let configurationData = fs_1.default.readFileSync(path_1.default.resolve(__dirname, confPath));
    let configuration = JSON.parse(configurationData.toString());
    return configuration;
}
exports.configurationService = { get: getConfiguration };
//# sourceMappingURL=configurationService.js.map