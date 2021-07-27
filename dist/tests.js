"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queryService_1 = require("./src/queryService");
const dataMin = { "2021-06-18": {
        "SMA": "379.5202"
    },
    "2021-05-28": {
        "SMA": "367.8821"
    },
    "2021-04-30": {
        "SMA": "355.4351"
    },
    "2021-03-31": {
        "SMA": "342.5172"
    },
    "2021-02-26": {
        "SMA": "328.7525"
    },
    "2021-01-29": {
        "SMA": "324.4715"
    },
    "2020-12-31": {
        "SMA": "319.8195"
    },
    "2020-11-30": {
        "SMA": "309.8471"
    },
    "2020-10-30": {
        "SMA": "301.4169"
    },
    "2020-09-30": {
        "SMA": "300.8538"
    },
    "2020-08-31": {
        "SMA": "296.5500"
    },
    "2020-07-31": {
        "SMA": "283.8932"
    },
    "2020-06-30": {
        "SMA": "274.0584"
    },
    "2020-05-29": {
        "SMA": "269.1843"
    },
    "2020-04-30": {
        "SMA": "266.8236"
    },
    "2020-03-31": {
        "SMA": "263.9244"
    },
    "2020-02-28": {
        "SMA": "264.1901"
    },
    "2020-01-31": {
        "SMA": "256.6714"
    },
    "2019-12-31": {
        "SMA": "248.7724"
    } };
const avarageMock = {
    "2021-06-18": {
        "SMA": "1"
    },
    "2021-05-28": {
        "SMA": "2"
    },
    "2021-04-30": {
        "SMA": "3"
    },
    "2021-03-31": {
        "SMA": "4"
    },
    "2021-02-26": {
        "SMA": "5"
    },
    "2021-01-29": {
        "SMA": "324.4715"
    },
    "2020-12-31": {
        "SMA": "319.8195"
    }
};
const resMin = queryService_1._minOperation(dataMin, { key: "SMA", position: "1-5" });
console.log(`Min = ${resMin}`);
if (resMin != 328.7525) {
    console.log('TEST ERROR : _minOperation =' + resMin);
}
const resMax = queryService_1._maxOperation(dataMin, { key: "SMA", position: "1-5" });
console.log(`Max = ${resMax}`);
if (resMax != 379.5202) {
    console.log('TEST ERROR : _maxOperation =' + resMin);
}
const aveMax = queryService_1._averageOperation(avarageMock, { key: "SMA", position: "1-5" });
console.log(`avarge = ${aveMax}`);
if (aveMax != 3) {
    console.log('TEST ERROR : _averageOperation =' + aveMax);
}
const AveDiff = queryService_1._averageDiffrences(avarageMock, { key: "SMA", position: "1-5" });
console.log(`AveDiff = ${AveDiff}`);
if (AveDiff != 1) {
    console.log('TEST ERROR : _averageOperation =' + AveDiff);
}
//# sourceMappingURL=tests.js.map