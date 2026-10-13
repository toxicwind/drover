import type { ChildProcess } from 'node:child_process';
/**
 * ACP Stream interface — a bidirectional message stream.
 * We re-export the type from the SDK for convenience.
 */
export interface AcpStream {
    readable: ReadableStream<Uint8Array>;
    writable: WritableStream<Uint8Array>;
}
/**
 * Adapts a Node.js child process's stdin/stdout to the Web Streams API
 * required by the ACP SDK's `ndJsonStream()`.
 */
export declare function childProcessToWebStreams(process: ChildProcess): AcpStream;
