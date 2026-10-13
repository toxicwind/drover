import type { SessionNotification } from '@agentclientprotocol/sdk';
export type SessionUpdateListener = (update: SessionNotification) => void;
/**
 * Routes session/update notifications to registered listeners.
 * The ChatWebviewProvider registers as a listener to forward updates to the webview.
 */
export declare class SessionUpdateHandler {
    private listeners;
    addListener(listener: SessionUpdateListener): void;
    removeListener(listener: SessionUpdateListener): void;
    handleUpdate(update: SessionNotification): void;
    dispose(): void;
}
