import {execFile} from 'child_process'
import * as macosVersion from 'macos-version'

export function runJXACode<R>(jxaCode: string): Promise<R> {
    return executeInOsa(jxaCode, []);
}

export function run<R, U extends any[]>(jxaCodeFunction: (...args: U) => R, ...args: U): Promise<R> {
    const code = `
ObjC.import('stdlib');
var args = JSON.parse($.getenv('OSA_ARGS'));
var fn   = (${jxaCodeFunction.toString()});
var out  = fn.apply(null, args);
JSON.stringify({ result: out });
`;
    return executeInOsa(code, args);
}
// Same with execa
// https://github.com/sindresorhus/execa
const DEFAULT_MAX_BUFFER = 1000 * 1000 * 100;
/**
 * execute the `code` in `osascript`
 */
function executeInOsa<R>(code: string, args: any[]): Promise<R> {
    return new Promise<R>((resolve, reject) => {
        macosVersion.assertGreaterThanOrEqualTo("10.10")
        const child = execFile(
            "/usr/bin/osascript",
            ["-l", "JavaScript"],
            {
                env: {
                    OSA_ARGS: JSON.stringify(args)
                },
                maxBuffer: DEFAULT_MAX_BUFFER
            },
            (err, stdout, stderr) => {
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
                    const result = JSON.parse(stdout.toString().trim()).result;
                    resolve(result);
                } catch (errorOutput) {
                    // @ts-ignore
                    resolve(stdout.toString().trim());
                }
            }
        );
        child.stdin?.write(code);
        child.stdin?.end();
    });
}
