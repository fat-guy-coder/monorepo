type Listener = (data: any) => void;

class SharedState {
  private state: Record<string, any> = {};
  private listeners: Record<string, Listener[]> = {};

  /**
   * Set a value in the shared state and notify listeners.
   * @param key - The key for the state.
   * @param value - The value to set.
   */
  setState(key: string, value: any) {
    this.state[key] = value;
    this.notify(key, value);
  }

  /**
   * Get a value from the shared state.
   * @param key - The key for the state.
   * @returns The value, or undefined if not set.
   */
  getState<T = any>(key: string): T | undefined {
    return this.state[key];
  }

  /**
   * Subscribe to changes in a specific state key.
   * @param key - The key to subscribe to.
   * @param listener - The callback function to execute on change.
   * @returns A function to unsubscribe.
   */
  subscribe(key: string, listener: Listener): () => void {
    if (!this.listeners[key]) {
      this.listeners[key] = [];
    }
    this.listeners[key].push(listener);

    // Return an unsubscribe function
    return () => {
      if (this.listeners[key]) {
        this.listeners[key] = this.listeners[key].filter(l => l !== listener);
      }
    };
  }

  /**
   * Publish a global event to all subscribers.
   * @param event - The name of the event.
   * @param data - The data to pass to the listeners.
   */
  publish(event: string, data: any) {
    this.notify(`event:${event}`, data);
  }

  /**
   * Subscribe to a global event.
   * @param event - The name of the event.
   * @param listener - The callback function to execute when the event is published.
   * @returns A function to unsubscribe.
   */
  on(event: string, listener: Listener): () => void {
    return this.subscribe(`event:${event}`, listener);
  }

  private notify(key: string, data: any) {
    if (this.listeners[key]) {
      this.listeners[key].forEach(listener => {
        try {
          listener(data);
        } catch (e) {
          console.error(`Error in listener for key ${key}:`, e);
        }
      });
    }
  }
}

// Export a singleton instance of the SharedState
export const sharedState = new SharedState();

