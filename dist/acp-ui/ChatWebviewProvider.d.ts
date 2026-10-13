import * as vscode from 'vscode';
import { SessionManager } from '../core/SessionManager';
import { SessionUpdateHandler } from '../handlers/SessionUpdateHandler';
/**
 * WebviewViewProvider for the ACP chat sidebar.
 * Renders chat messages, tool calls, plans, and handles user input.
 */
export declare class ChatWebviewProvider implements vscode.WebviewViewProvider {
    private readonly extensionUri;
    private readonly sessionManager;
    private readonly sessionUpdateHandler;
    static readonly viewType = "acp-chat";
    private view?;
    private updateListener;
    private _hasChatContent;
    constructor(extensionUri: vscode.Uri, sessionManager: SessionManager, sessionUpdateHandler: SessionUpdateHandler);
    /**
     * Render markdown text to HTML using marked.
     */
    private renderMarkdown;
    private escapeHtml;
    resolveWebviewView(webviewView: vscode.WebviewView, _context: vscode.WebviewViewResolveContext, _token: vscode.CancellationToken): void;
    /**
     * Forward session update to webview.
     */
    private handleSessionUpdate;
    /**
     * Handle a prompt sent from the webview.
     */
    private handleSendPrompt;
    /**
     * Handle cancel request from webview.
     */
    private handleCancelTurn;
    /**
     * Handle mode change from webview picker.
     */
    private handleSetMode;
    /**
     * Handle model change from webview picker.
     */
    private handleSetModel;
    /**
     * Handle generic config-option change from webview picker
     * (ACP "Session Config Options"). The agent returns the full
     * configOptions state which we re-broadcast so any cascading
     * changes are reflected in the UI.
     */
    private handleSetConfigOption;
    /**
     * Send current session state to the webview on load.
     */
    private sendCurrentState;
    /**
     * Post a message to the webview if it exists.
     */
    private postMessage;
    /**
     * Notify webview of a new active session.
     */
    notifyActiveSessionChanged(): void;
    /**
     * Notify webview of mode state changes.
     */
    notifyModesUpdate(modes: any): void;
    /**
     * Notify webview of model state changes.
     */
    notifyModelsUpdate(models: any): void;
    /**
     * Notify webview of session config-option state changes.
     */
    notifyConfigOptionsUpdate(configOptions: any): void;
    /**
     * Notify webview that a `session/load` replay is starting. The webview
     * wipes any previously-displayed history, disables input, and shows a
     * loading overlay until {@link notifyLoadSessionEnd} fires.
     */
    notifyLoadSessionStart(): void;
    /** Notify webview that the active replay finished (success or failure). */
    notifyLoadSessionEnd(ok: boolean): void;
    /** Notify webview that session title / metadata changed. */
    notifySessionInfoUpdate(title: string | undefined | null): void;
    /**
     * Clear the chat history and reset to welcome state.
     * Called when starting a new conversation.
     */
    clearChat(): void;
    /**
     * Whether the chat has any messages.
     */
    get hasChatContent(): boolean;
    /**
     * Generate the HTML content for the webview.
     */
    private getHtmlContent;
    /**
     * Attach a file URI — notify the webview to include it in the next prompt.
     */
    attachFile(uri: vscode.Uri): void;
    dispose(): void;
}
