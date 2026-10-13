import { ChildProcess } from 'node:child_process';
import { EventEmitter } from 'node:events';
import type { AgentConfigEntry } from '../config/AgentConfig';
export interface AgentInstance {
    id: string;
    name: string;
    process: ChildProcess;
    config: AgentConfigEntry;
}
/**
 * Manages spawning and killing ACP agent child processes.
 */
export declare class AgentManager extends EventEmitter {
    private agents;
    private nextId;
    /**
     * Spawn an agent as a child process with stdin/stdout piped.
     */
    spawnAgent(name: string, config: AgentConfigEntry, cwd?: string): AgentInstance;
    /**
     * Kill an agent process.
     */
    killAgent(agentId: string): boolean;
    /**
     * Get a running agent by ID.
     */
    getAgent(agentId: string): AgentInstance | undefined;
    /**
     * Get all running agents.
     */
    getRunningAgents(): AgentInstance[];
    /**
     * Kill all running agents. Called on extension deactivate.
     */
    killAll(): void;
    dispose(): void;
}
