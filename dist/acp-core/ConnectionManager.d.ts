import { ClientSideConnection } from '@agentclientprotocol/sdk';
import type { InitializeResponse } from '@agentclientprotocol/sdk';
import { ChildProcess } from 'node:child_process';
import { AcpClientImpl } from './AcpClientImpl';
import { SessionUpdateHandler } from '../handlers/SessionUpdateHandler';
export interface ConnectionInfo {
    connection: ClientSideConnection;
    client: AcpClientImpl;
    initResponse: InitializeResponse;
}
/**
 * Manages ACP connections to agent processes.
 * Creates ClientSideConnection instances from spawned child processes.
 */
export declare class ConnectionManager {
    private readonly sessionUpdateHandler;
    private connections;
    constructor(sessionUpdateHandler: SessionUpdateHandler);
    /**
     * Create an ACP connection from a child process.
     * Sets up streams, creates connection, and performs initialization handshake.
     */
    connect(agentId: string, process: ChildProcess): Promise<ConnectionInfo>;
    getConnection(agentId: string): ConnectionInfo | undefined;
    removeConnection(agentId: string): void;
    dispose(): void;
    /**
     * Wrap a Stream to intercept and log all messages in both directions.
     */
    private tapStream;
}
