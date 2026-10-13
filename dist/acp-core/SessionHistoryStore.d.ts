import * as vscode from 'vscode';
/**
 * Persistent client-side cache of past sessions per agent. Used to render the
 * tree-tier-2 (sessions under an agent) for agents that support
 * `session/load` or `session/resume` but do NOT advertise the experimental
 * `session/list` capability.
 *
 * When the agent supports `session/list`, that is the source of truth and
 * this store is NOT consulted (to avoid divergence).
 */
export interface PersistedSessionEntry {
    /** Agent name (as configured by the user). */
    agentName: string;
    /** Working directory the session was created in. */
    cwd: string;
    /** Session ID issued by the agent. */
    sessionId: string;
    /** Title supplied via `session_info_update`, if any. */
    title?: string;
    /** First user prompt of the session, used as a label fallback (truncated). */
    firstPrompt?: string;
    /** ISO timestamp when the session was first observed. */
    createdAt: string;
    /** ISO timestamp of the most recent activity (prompt end / update). */
    lastActiveAt: string;
}
/**
 * Wraps `workspaceState` storage of {@link PersistedSessionEntry}. Entries are
 * scoped to the current workspace because we filter `session/list` (and our
 * own cache) by the workspace `cwd` — sessions from other workspaces aren't
 * relevant in this view.
 */
export declare class SessionHistoryStore {
    private readonly workspaceState;
    private readonly capPerAgent;
    private entries;
    private readonly _onDidChange;
    /** Fires whenever the cache mutates. Tree view subscribes for refresh. */
    readonly onDidChange: vscode.Event<void>;
    constructor(workspaceState: vscode.Memento, capPerAgent?: number);
    /**
     * Get entries for a given agent + (optional) workspace cwd, sorted by
     * `lastActiveAt` descending. When `cwd` is omitted all workspace entries
     * for the agent are returned.
     */
    list(agentName: string, cwd?: string): PersistedSessionEntry[];
    /** Look up a specific entry by agent + session id. */
    get(agentName: string, sessionId: string): PersistedSessionEntry | undefined;
    /**
     * Insert (or no-op if present) a new session entry. Called when the client
     * successfully creates a session via `session/new`.
     */
    upsertNew(agentName: string, cwd: string, sessionId: string): void;
    /** Update title from a `session_info_update` notification. */
    setTitle(agentName: string, sessionId: string, title: string | null | undefined): void;
    /** Record the first user prompt of a session for label fallback. */
    setFirstPromptIfMissing(agentName: string, sessionId: string, prompt: string): void;
    /** Bump `lastActiveAt` to now. Called on prompt end / session update. */
    touch(agentName: string, sessionId: string): void;
    /** Remove a single entry (e.g. after a failed `session/load`). */
    forget(agentName: string, sessionId: string): boolean;
    /** Remove every entry for an agent. */
    forgetAgent(agentName: string): number;
    /**
     * Reconcile against an agent-provided list (called only when the agent
     * supports `session/list`). Keeps the local store consistent with the
     * agent for future use, but the tree itself uses the agent's list directly.
     */
    reconcileFromAgent(agentName: string, knownSessionIds: Set<string>): void;
    private enforceCap;
    private persist;
    dispose(): void;
}
