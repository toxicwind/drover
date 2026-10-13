import * as vscode from 'vscode';
export declare function getOutputChannel(): vscode.OutputChannel;
export declare function getTrafficChannel(): vscode.OutputChannel;
export declare function log(message: string, ...args: unknown[]): void;
export declare function logError(message: string, error?: unknown): void;
export declare function logTraffic(direction: 'send' | 'recv', data: unknown): void;
export declare function disposeChannels(): void;
