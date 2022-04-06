"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.runJXACode = void 0;
var child_process_1 = require("child_process");
var macosVersion = __importStar(require("macos-version"));
function runJXACode(jxaCode) {
    return executeInOsa(jxaCode, []);
}
exports.runJXACode = runJXACode;
function run(jxaCodeFunction) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var code = "\nObjC.import('stdlib');\nvar args = JSON.parse($.getenv('OSA_ARGS'));\nvar fn   = (".concat(jxaCodeFunction.toString(), ");\nvar out  = fn.apply(null, args);\nJSON.stringify({ result: out });\n");
    return executeInOsa(code, args);
}
exports.run = run;
// Same with execa
// https://github.com/sindresorhus/execa
var DEFAULT_MAX_BUFFER = 1000 * 1000 * 100;
/**
 * execute the `code` in `osascript`
 */
function executeInOsa(code, args) {
    return new Promise(function (resolve, reject) {
        var _a, _b;
        macosVersion.assertGreaterThanOrEqualTo("10.10");
        var child = (0, child_process_1.execFile)("/usr/bin/osascript", ["-l", "JavaScript"], {
            env: {
                OSA_ARGS: JSON.stringify(args)
            },
            maxBuffer: DEFAULT_MAX_BUFFER
        }, function (err, stdout, stderr) {
            if (err) {
                return reject(err);
            }
            if (stderr) {
                console.error(stderr);
            }
            if (!stdout) {
                // @ts-ignore
                resolve(undefined);
            }
            try {
                var result = JSON.parse(stdout.toString().trim()).result;
                resolve(result);
            }
            catch (errorOutput) {
                // @ts-ignore
                resolve(stdout.toString().trim());
            }
        });
        (_a = child.stdin) === null || _a === void 0 ? void 0 : _a.write(code);
        (_b = child.stdin) === null || _b === void 0 ? void 0 : _b.end();
    });
}
