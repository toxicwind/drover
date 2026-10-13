import type { Client, Agent, RequestPermissionRequest, RequestPermissionResponse, SessionNotification, WriteTextFileRequest, WriteTextFileResponse, ReadTextFileRequest, ReadTextFileResponse, CreateTerminalRequest, CreateTerminalResponse, TerminalOutputRequest, TerminalOutputResponse, WaitForTerminalExitRequest, WaitForTerminalExitResponse, KillTerminalRequest, KillTerminalResponse, ReleaseTerminalRequest, ReleaseTerminalResponse } from '@agentclientprotocol/sdk';
import { FileSystemHandler } from '../handlers/FileSystemHandler';
import { TerminalHandler } from '../handlers/TerminalHandler';
import { PermissionHandler } from '../handlers/PermissionHandler';
import { SessionUpdateHandler } from '../handlers/SessionUpdateHandler';
/**
 * ACP Client implementation for VS Code.
 * Delegates to individual handlers for each capability.
 *
 * Passed as a factory to ClientSideConnection:
 *   new ClientSideConnection((agent) => new AcpClientImpl(...), stream)
 */
export declare class AcpClientImpl implements Client {
    private readonly fsHandler;
    private readonly terminalHandler;
    private readonly permissionHandler;
    private readonly sessionUpdateHandler;
    private agent;
    constructor(fsHandler: FileSystemHandler, terminalHandler: TerminalHandler, permissionHandler: PermissionHandler, sessionUpdateHandler: SessionUpdateHandler);
    setAgent(agent: Agent): void;
    getAgent(): Agent | null;
    requestPermission(params: RequestPermissionRequest): Promise<RequestPermissionResponse>;
    sessionUpdate(params: SessionNotification): Promise<void>;
    writeTextFile(params: WriteTextFileRequest): Promise<WriteTextFileResponse>;
    readTextFile(params: ReadTextFileRequest): Promise<ReadTextFileResponse>;
    createTerminal(params: CreateTerminalRequest): Promise<CreateTerminalResponse>;
    terminalOutput(params: TerminalOutputRequest): Promise<TerminalOutputResponse>;
    waitForTerminalExit(params: WaitForTerminalExitRequest): Promise<WaitForTerminalExitResponse>;
    killTerminal(params: KillTerminalRequest): Promise<KillTerminalResponse>;
    releaseTerminal(params: ReleaseTerminalRequest): Promise<ReleaseTerminalResponse>;
}
