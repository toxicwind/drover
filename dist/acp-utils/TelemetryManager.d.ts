import { TelemetryReporter } from '@vscode/extension-telemetry';
/**
 * Initialise the telemetry reporter.  Must be called once during
 * `activate()`.  Returns the reporter so it can be pushed into
 * `context.subscriptions` for automatic disposal.
 */
export declare function initTelemetry(): TelemetryReporter;
/**
 * Send a named telemetry event with optional string properties and
 * numeric measurements.
 */
export declare function sendEvent(eventName: string, properties?: Record<string, string>, measurements?: Record<string, number>): void;
/**
 * Send an error event (non-exception).  Properties describe the error
 * context; the data is still sent through the normal event pipeline.
 */
export declare function sendError(eventName: string, properties?: Record<string, string>, measurements?: Record<string, number>): void;
/**
 * Report an exception / caught error as an error event.
 */
export declare function sendException(error: Error, properties?: Record<string, string>): void;
