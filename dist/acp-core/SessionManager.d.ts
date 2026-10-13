import { EventEmitter } from 'node:events';
import type { PromptResponse, InitializeResponse, SessionModeState, SessionModelState, AvailableCommand, SessionConfigOption, SessionInfo as ProtocolSessionInfo } from '@agentclientprotocol/sdk';
import { AgentManager } from './AgentManager';
import { ConnectionManager, ConnectionInfo } from './ConnectionManager';
import { SessionUpdateHandler } from '../handlers/SessionUpdateHandler';
import { SessionHistoryStore } from './SessionHistoryStore';
export interface SessionInfo {
    sessionId: string;
    agentId: string;
    agentName: string;
    agentDisplayName: string;
    cwd: string;
    createdAt: string;
    initResponse: InitializeResponse;
    modes: SessionModeState | null;
    models: SessionModelState | null;
    /**
     * Generic session config options (ACP "Session Config Options" — supersedes
     * `modes` / `models`). `null` means the agent did not provide this field.
     * Per spec, when both `configOptions` and `modes` are present, clients
     * should use `configOptions` exclusively.
     */
    configOptions: SessionConfigOption[] | null;
    availableCommands: AvailableCommand[];
    /** Latest title supplied via `session_info_update`, if any. */
    title?: string;
}
/**
 * Discovery flags for an agent, derived from `initialize.agentCapabilities`.
 * Populated lazily when {@link SessionManager.ensureConnected} runs.
 */
export interface AgentCapabilitySummary {
    list: boolean;
    load: boolean;
    resume: boolean;
}
/**
 * Why an agent expansion failed (used to surface a useful tree placeholder).
 */
export type AgentConnectionError = {
    kind: 'auth-cancelled';
} | {
    kind: 'connect-failed';
    message: string;
};
/**
 * Manages the lifecycle of ACP agent connections.
 *
 * The "session" concept is hidden from the user — they just see agents.
 * Internally we still use ACP sessions for protocol compliance, but the
 * user-facing model is: pick an agent → chat.
 */
export declare class SessionManager extends EventEmitter {
    private readonly agentManager;
    private readonly connectionManager;
    private readonly sessionUpdateHandler;
    private sessions;
    private activeSessionId;
    /** Maps agentName → activeSessionId for the one-session-per-agent model. */
    private agentSessions;
    /**
     * Buffers session/update payloads that arrive before the corresponding
     * session is registered in `this.sessions`. Drained by createAcpSession
     * once the session is set up. This closes a microtask race between the
     * resolution of `newSession` and the SDK's async notification dispatch.
     */
    private pendingAvailableCommands;
    private pendingConfigOptions;
    private pendingTitles;
    /**
     * Cache of `initialize.agentCapabilities` per agent so the tree can render
     * without paying the connect cost on every render.
     */
    private capabilities;
    /** Set of session IDs that are currently being replayed via `session/load`. */
    private loadingSessionIds;
    /** Client-side session history (optional — only used for tier-2 tree). */
    private historyStore;
    constructor(agentManager: AgentManager, connectionManager: ConnectionManager, sessionUpdateHandler: SessionUpdateHandler);
    /** Wire in the persistent session-history store (called once at startup). */
    setHistoryStore(store: SessionHistoryStore): void;
    /** Public accessor for downstream UI. */
    getHistoryStore(): SessionHistoryStore | null;
    /**
     * Read cached capabilities for an agent. Returns `undefined` if the agent
     * has never been initialized — callers can call {@link ensureConnected}
     * first to populate.
     */
    getCachedCapabilities(agentName: string): AgentCapabilitySummary | undefined;
    private getWorkspaceCwd;
    private summarizeCapabilities;
    /**
     * Connect to an agent and start chatting.
     * Only one agent can be connected at a time — automatically disconnects
     * any previously connected agent.
     * Internally creates a session via ACP protocol.
     */
    connectToAgent(agentName: string): Promise<SessionInfo>;
    /**
     * Start a new conversation with the currently connected agent.
     * Disconnects current session, reconnects, and signals chat to clear.
     */
    newConversation(): Promise<SessionInfo | null>;
    /**
     * Disconnect from an agent: kill process and clean up.
     */
    disconnectAgent(agentName: string): Promise<void>;
    /**
     * Internal: create the ACP session with auth handling.
     */
    private createAcpSession;
    /** Returns true if a thrown error denotes ACP "auth required" (-32000). */
    private isAuthRequiredError;
    /**
     * Run the interactive auth flow against an already-initialized connection.
     * Throws if the user cancels or auth fails — caller is expected to clean
     * up the agent process.
     */
    private runAuthFlow;
    /**
     * Drain any buffered state captured before the session was registered.
     * Used by all session-registration paths (new / load / resume).
     */
    private drainPending;
    /**
     * Send a prompt to the active session.
     */
    sendPrompt(sessionId: string, text: string): Promise<PromptResponse>;
    /**
     * Cancel an active prompt turn.
     */
    cancelTurn(sessionId: string): Promise<void>;
    /**
     * Set the session mode (e.g., plan mode, code mode).
     *
     * If the active session uses `configOptions`, this is transparently
     * routed to `setConfigOption` against the first option whose category is
     * `mode` — this keeps user keybindings working across agents that have
     * migrated to the new API.
     */
    setMode(sessionId: string, modeId: string): Promise<void>;
    /**
     * Set the session model (experimental).
     *
     * If the active session uses `configOptions`, this is transparently
     * routed to `setConfigOption` against the first option whose category is
     * `model`.
     */
    setModel(sessionId: string, modelId: string): Promise<void>;
    /**
     * Set a generic session config option (ACP "Session Config Options").
     * The agent's response contains the full configOptions array — we
     * replace our local copy so that cascading changes (e.g. changing the
     * model adjusts thought-level options) are reflected.
     */
    setConfigOption(sessionId: string, configId: string, value: string): Promise<SessionConfigOption[] | null>;
    /**
     * Replace a session's configOptions in place and notify listeners.
     * Used by both the setter response and the `config_option_update`
     * push-notification handler.
     */
    applyConfigOptions(sessionId: string, options: SessionConfigOption[] | null): void;
    /**
     * Replace a session's availableCommands and notify listeners. Buffers
     * the value if the session isn't registered yet (race during creation).
     */
    applyAvailableCommands(sessionId: string, commands: AvailableCommand[]): void;
    /**
     * Apply a `session_info_update` notification: patches title / updatedAt on
     * the in-memory session and on the persistent history store.
     */
    applySessionInfoUpdate(sessionId: string, update: {
        title?: string | null;
        updatedAt?: string | null;
    }): void;
    /**
     * Record the first user prompt of a session so the history-store tree can
     * use it as a label fallback when no title arrives.
     */
    recordFirstPrompt(sessionId: string, prompt: string): void;
    /** Bump a session's `lastActiveAt` in the history store. */
    touchHistory(sessionId: string): void;
    /**
     * Spawn + initialize + (optionally authenticate) an agent without creating
     * a session. Caches the capability summary. Idempotent.
     *
     * NOTE: this never disconnects the currently-active agent — it is safe to
     * call from the tree view to probe capabilities or list sessions while
     * the user is chatting with a different agent. Callers that want to
     * switch the active session (e.g. loadSession) handle the active-agent
     * teardown themselves.
     */
    ensureConnected(agentName: string): Promise<ConnectionInfo>;
    /**
     * List sessions known to an agent (ACP `session/list`).
     * Throws if the agent doesn't advertise the capability.
     */
    listSessions(agentName: string, opts?: {
        cwd?: string;
        cursor?: string;
    }): Promise<{
        sessions: ProtocolSessionInfo[];
        nextCursor?: string;
    }>;
    /**
     * Load an existing session, replaying the entire conversation history via
     * `session/update` notifications. Heavyweight. Active session is switched
     * to the loaded session on success.
     */
    loadSession(agentName: string, sessionId: string): Promise<SessionInfo>;
    /**
     * Resume an existing session without replaying history (light path).
     */
    resumeSession(agentName: string, sessionId: string): Promise<SessionInfo>;
    /** Return true if a session is currently mid-replay via `session/load`. */
    isLoading(sessionId: string): boolean;
    /** Helper: reverse-lookup agentId for a known ConnectionInfo. */
    private findAgentIdForConnection;
    getSession(sessionId: string): SessionInfo | undefined;
    getActiveSession(): SessionInfo | undefined;
    getActiveSessionId(): string | null;
    /** Get the agent name for the current active session. */
    getActiveAgentName(): string | null;
    /** Check if a specific agent is currently connected. */
    isAgentConnected(agentName: string): boolean;
    /** Get all connected agent names. */
    getConnectedAgentNames(): string[];
    getConnectionForSession(sessionId: string): ConnectionInfo | undefined;
    dispose(): void;
}
