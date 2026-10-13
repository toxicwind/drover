import { SessionManager } from '../core/SessionManager';
/**
 * Manages the status bar item showing ACP connection status.
 */
export declare class StatusBarManager {
    private readonly sessionManager;
    private statusBarItem;
    constructor(sessionManager: SessionManager);
    private updateStatus;
    private showError;
    dispose(): void;
}
