import type { ReadTextFileRequest, ReadTextFileResponse, WriteTextFileRequest, WriteTextFileResponse } from '@agentclientprotocol/sdk';
/**
 * Handles ACP file system requests using VS Code's workspace filesystem API.
 * This gives us access to unsaved editor buffers automatically.
 */
export declare class FileSystemHandler {
    /**
     * Read a text file. Uses VS Code API to include unsaved editor content.
     */
    readTextFile(params: ReadTextFileRequest): Promise<ReadTextFileResponse>;
    /**
     * Write a text file. Creates parent directories if needed.
     * Opens the file in the editor so the user can see changes.
     */
    writeTextFile(params: WriteTextFileRequest): Promise<WriteTextFileResponse>;
}
