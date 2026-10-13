import type { CreateTerminalRequest, CreateTerminalResponse, TerminalOutputRequest, TerminalOutputResponse, WaitForTerminalExitRequest, WaitForTerminalExitResponse, KillTerminalRequest, KillTerminalResponse, ReleaseTerminalRequest, ReleaseTerminalResponse } from '@agentclientprotocol/sdk';
/**
 * Manages terminals that ACP agents request (terminal/create, terminal/output, etc.).
 * Uses real child processes for capturing output, with VS Code terminals for display.
 */
export declare class TerminalHandler {
    private terminals;
    private nextId;
    createTerminal(params: CreateTerminalRequest): Promise<CreateTerminalResponse>;
    terminalOutput(params: TerminalOutputRequest): Promise<TerminalOutputResponse>;
    waitForTerminalExit(params: WaitForTerminalExitRequest): Promise<WaitForTerminalExitResponse>;
    killTerminal(params: KillTerminalRequest): Promise<KillTerminalResponse>;
    releaseTerminal(params: ReleaseTerminalRequest): Promise<ReleaseTerminalResponse>;
    dispose(): void;
}
