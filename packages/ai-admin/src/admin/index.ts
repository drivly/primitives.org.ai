/**
 * Initializes the admin interface with the provided configuration
 * @param config - Configuration for the admin interface
 */
export function initializeAdmin(config = {}) {
  return {
    ready: true,
    config,
  }
}
