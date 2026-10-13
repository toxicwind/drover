# Changelog

Todos los cambios notables de esta extensión se documentan en este archivo.

El formato sigue [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y el versionado sigue [SemVer](https://semver.org/lang/es/).

## [1.0.10] - 2026-08-27

### Añadido
- Proveedor **LongCat** (modelo `LongCat-2.0`) con gestión de múltiples API keys y rotación automática.
- Selector de idioma y textos traducidos para toda la interfaz (Auto / Español / English).
- Pantalla de bienvenida/estado vacío y visor de errores del panel.
- Favoritos de modelos con estrella clickeable junto a cada modelo de la lista.

### Corregido
- El webview no cargaba por un error de sintaxis en el script (código duplicado y secuencias `\n` dentro del template literal).
- Los modelos de LongCat no se cargaban: ahora `getLongCatModels()` envía la API key y usa los IDs reales de la API.
- Configuración `nvidia.longcatApiKey` / `nvidia.longcatApiKeys` registradas en `package.json`.
- Sincronización de chats entre carpetas (`globalState`) y merge robusto de `getChats()`.

## [1.0.7] - 2026-08-22

### Añadido
- **Favoritos de modelos**: cada modelo en la lista tiene su estrella clickeable para marcarlo/desmarcarlo como favorito directamente. Los favoritos se agrupan arriba con ★ y persisten entre sesiones.
- La lista de modelos se reordena al instante al togglear un favorito, sin recargar.

### Mejorado
- El selector de modelos pasa de un `<select>` nativo a una lista desplegable propia con resaltado del modelo activo.

## [1.0.6] - 2026-08-21

### Añadido
- Proveedor **Ollama** local (endpoint OpenAI-compatible, ajuste `nvidia.ollamaUrl`).
- **Selector de idioma** en el panel (Auto / Español / English) con textos traducidos para toda la interfaz.
- Sincronización de chats entre carpetas mediante `globalState` para que las conversaciones no se pierdan al cambiar de workspace.

### Corregido
- Merge de chats en `getChats()`: ahora gana la copia más nueva (`globalState`) en vez de la del workspace, evitando perder conversaciones al sincronizar entre carpetas.
- Protección contra datos corruptos o no-array en el storage de chats.

## [1.0.5] - 2026-08-20

### Añadido
- Botón de **reenviar** debajo de cada mensaje del usuario para reintentar la consulta si se cuelga o falla.
- Fondo animado de "estática/ruido" en el panel del chat (imagen de ruido embebida localmente).

## [1.0.4] - 2026-08-20

### Añadido
- Gestor de **API Keys** en el panel (botón de llave): agregá, editá o quitá varias claves por proveedor para rotación automática, sin tocar la configuración de VS Code.
- Herramienta `delete_file` para borrar archivos del workspace.
- Documentación de desarrollo en `docs/`.

### Mejorado
- Reconocimiento y limpieza de llamadas a herramientas en formato Anthropic (`<function_calls>`, `<invoke>`, `<parameter>`) en respuestas de DeepSeek V4.
- Prompt de sistema más claro: carpeta de trabajo, capacidades y permisos explícitos (crear/editar/borrar).
- Descripción de `write_file` aclara que sirve para crear o editar archivos.
- Nuevo icono de la extensión.
- Timeout por petición para no quedar colgado si el proveedor no responde.

### Corregido
- La interfaz del panel no cargaba (iconos y handlers sin ejecutar) por secuencias de escape en el HTML del webview.
- Icono faltante en el punto de extensión `views` (obligatorio en VS Code 1.134).
- Botón de detener que no interrumpía la consulta.

## [1.0.2] - 2026-08-18

### Añadido
- Proveedor DeepSeek (`deepseek-chat` y `deepseek-reasoner`) con múltiples API keys y rotación automática.
- Sección de donaciones con PayPal y Buy Me a Coffee, y animación de donación.
- Ocultado del razonamiento `<think>...</think>` de los modelos de razonamiento (DeepSeek-R1 y similares).
- Listado de la estructura del proyecto en el prompt de sistema.

### Mejorado
- Filtrado de modelos para mostrar solo los que soportan *function calling* (asistente de código real).
- Manejo de errores de rate limit (429) y de contexto demasiado largo, con mensajes claros.
- Tablas responsive con scroll horizontal y envoltorio propio.

### Eliminado
- Proveedor Cloudflare Workers AI (soporte de *function calling* inconsistente).

## [1.0.1] - 2026-08-17

### Añadido
- Botón de copiar en cada bloque de código.
- Icono de la Activity Bar en SVG monocolor (24x24, temático).
- IDs en todos los elementos de la interfaz web para controlarlos individualmente.
- Soporte de múltiples API keys de NVIDIA (`nvidia.apiKeys`) con rotación automática.
- Consola de depuración (`nvidia.debugLevel`) y botón en el panel.
- Indicador de versión en el encabezado.

### Mejorado
- Bloques de código con fondo Dracula y borde degradado (azul → celeste → violeta).
- Renderizado Markdown: espaciado compacto de párrafos, listas y encabezados.
- Tablas responsivas con scroll horizontal.
- Manejo de una sola petición a la vez (abort de la petición anterior).

### Corregido
- Etiquetas sueltas (`<tool_call>`, `<function>`, `<parameter>`) en respuestas de modelos que emiten herramientas como texto.

## [0.2.0] - 2026-08-16

### Añadido
- Soporte de múltiples API keys de NVIDIA (`nvidia.apiKeys`) con rotación automática cuando una falla o se queda sin tokens.
- Consola de depuración (`NVIDIA: Abrir consola de depuración`) con niveles de log configurables (`nvidia.debugLevel`).
- Botón de consola de depuración en el panel.
- Indicador de versión en el encabezado del panel.

### Corregido
- Evitar que se muestren etiquetas sueltas (`<tool_call>`, `<function>`, `<parameter>`) en las respuestas de modelos que emiten herramientas como texto.
- Manejo de tool calls en el chat nativo de VS Code.
- Estilos del panel (bordes más finos, mejor uso del ancho).

## [0.1.0] - 2026-08-16

### Añadido
- Chat con modelos NVIDIA NIM (Nemotron) y OpenRouter (modelos gratuitos).
- Herramientas de archivos: `list_files`, `read_file`, `write_file`, `search_text`.
- Ejecución de comandos `run_command` con selector de shell (`cmd`, `powershell`, `pwsh`).
- Herramienta `git` con aprobación para operaciones que modifican el repositorio.
- Herramienta `download_file` para descargar archivos desde internet.
- Búsqueda web curada (`web_search`) vía DuckDuckGo y Wikipedia.
- Permisos individuales por herramienta desde el panel (auto aprobar, web, comandos, descargas, git).
- Carpeta de salida configurable (`nvidia.outputDirectory`).
- Prompt de sistema reemplazable (`nvidia.systemPrompt`).
- Panel lateral con historial de chats, selección de proveedor/modelo y exportación de chats.
