import * as vscode from 'vscode';
import { SessionManager } from '../core/SessionManager';
import { SessionHistoryStore } from '../core/SessionHistoryStore';
/**
 * Tier-1 — a configured agent. Collapsible only when we believe the agent
 * has any way to expose past sessions (either supports session/list, or has
 * locally-cached entries via {@link SessionHistoryStore}).
 */
export declare class AgentTreeItem extends vscode.TreeItem {
    readonly agentName: string;
    readonly connected: boolean;
    constructor(agentName: string, connected: boolean, collapsibleState: vscode.TreeItemCollapsibleState);
}
/**
 * Tier-2 — a session belonging to an agent. Clicking it routes to
 * `acp.openSession` which calls `session/load` or `session/resume`.
 */
export declare class SessionTreeItem extends vscode.TreeItem {
    readonly agentName: string;
    readonly sessionId: string;
    readonly isActive: boolean;
    readonly source: 'agent' | 'local';
    constructor(agentName: string, sessionId: string, label: string, isActive: boolean, description: string | undefined, tooltip: string, source: 'agent' | 'local');
}
/**
 * A leaf node used to surface status / errors / fallbacks under an agent.
 */
export declare class InfoTreeItem extends vscode.TreeItem {
    readonly kind: 'loading' | 'empty' | 'unsupported' | 'error' | 'auth-required' | 'load-more';
    readonly agentName: string;
    constructor(kind: 'loading' | 'empty' | 'unsupported' | 'error' | 'auth-required' | 'load-more', agentName: string, label: string, tooltip?: string, command?: vscode.Command);
}
type AgentNode = AgentTreeItem;
type ChildNode = SessionTreeItem | InfoTreeItem;
/**
 * Tree provider for the ACP Agents view. Tier 1 = agents, tier 2 = sessions.
 *
 * Tier 2 source-of-truth selection per agent:
 *   - If the agent advertises `session/list`: use that (the agent owns the
 *     truth). Local history-store entries for that agent are reconciled
 *     against the server on each list call.
 *   - Else if the agent advertises `session/load` or `session/resume`: use
 *     the local history store as the source.
 *   - Else: a single "not supported" info leaf.
 */
export declare class SessionTreeProvider implements vscode.TreeDataProvider<AgentNode | ChildNode> {
    private readonly sessionManager;
    private readonly historyStore;
    private readonly workspaceCwd;
    private _onDidChangeTreeData;
    readonly onDidChangeTreeData: vscode.Event<void | AgentTreeItem | ChildNode | null | undefined>;
    private listStates;
    constructor(sessionManager: SessionManager, historyStore: SessionHistoryStore | null, workspaceCwd: () => string | undefined);
    refresh(node?: AgentNode | ChildNode): void;
    /**
     * Drop cached state for an agent (or all agents) so the next expansion
     * re-runs `session/list` and re-probes capabilities.
     */
    invalidate(agentName?: string): void;
    getTreeItem(element: AgentNode | ChildNode): vscode.TreeItem;
    getChildren(element?: AgentNode | ChildNode): Promise<(AgentNode | ChildNode)[]>;
    private getAgentNodes;
    private computeCollapsibleState;
    private getAgentChildren;
    private getAgentSourcedChildren;
    private buildAgentSessionItem;
    private fetchSessionList;
    /** Fetch and append the next page (only meaningful for agent-sourced lists). */
    loadMore(agentName: string): Promise<void>;
    private getLocalSourcedChildren;
    private buildLocalSessionItem;
    private probeCapabilities;
    private loadingLeaf;
    private authRequiredLeaf;
    private errorLeaf;
    dispose(): void;
}
export {};
