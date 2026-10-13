# NVIDIA Models for VS Code

"NVIDIA Models for VS Code" is an AI chat that works directly on your project. It connects NVIDIA NIM (Nemotron), OpenRouter, DeepSeek, local Ollama and LongCat models to read and write files, run commands in CMD/PowerShell, use Git, download files and search the web.

## Features

- **Files**: list, read, write, edit and delete files in the workspace.
- **Commands**: CMD or PowerShell (5.1 and 7+), with approval.
- **Git**: read-only operations run automatically; mutating ones ask for approval.
- **Downloads**: from any http/https URL.
- **Curated web search** (DuckDuckGo + Wikipedia).
- **Per-tool permissions**.
- **Ollama** (local): connect to a local Ollama server, no API key needed.
- **LongCat**: connect to LongCat models (e.g. `LongCat-2.0`).
- **Favorite models**: star your preferred models so they appear at the top of the list.

## Configuration

- `nvidia.apiKey` / `nvidia.apiKeys`: NVIDIA keys, stored securely (multi-key rotation).
- `nvidia.openrouterApiKey` / `nvidia.openrouterApiKeys`: OpenRouter keys (multi-key rotation).
- `nvidia.deepseekApiKey` / `nvidia.deepseekApiKeys`: DeepSeek keys (optional, multi-key rotation).
- `nvidia.longcatApiKey` / `nvidia.longcatApiKeys`: LongCat keys (multi-key rotation).
- `nvidia.ollamaUrl`: Ollama server URL (default `http://localhost:11434/v1`).
- `nvidia.outputDirectory`: folder where the model creates/writes files.
- `nvidia.systemPrompt`: custom system prompt.
- `nvidia.debugLevel`: debug logging level (off/error/warn/info/debug).

## Usage

Open the NVIDIA Chat panel, pick a provider and a model, set your API key and start typing. You can star your favorite models so they stay at the top of the list.

## License

MIT.
