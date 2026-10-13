import type { RequestPermissionRequest, RequestPermissionResponse } from '@agentclientprotocol/sdk';
/**
 * Handles ACP permission requests from agents.
 * Shows VS Code QuickPick for user to select from agent-provided options.
 */
export declare class PermissionHandler {
    requestPermission(params: RequestPermissionRequest): Promise<RequestPermissionResponse>;
}
