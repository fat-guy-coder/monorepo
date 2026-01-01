import { Sandbox } from './proxy-sandbox';

/**
 * Snapshot Sandbox
 */
export class SnapshotSandbox implements Sandbox {
  private windowSnapshot: Record<string, any> = {};
  private modifyProps: Record<string, any> = {};

  active() {
    // Save a snapshot of the current window state
    this.windowSnapshot = {};
    for (const prop in window) {
      if (Object.prototype.hasOwnProperty.call(window, prop)) {
        this.windowSnapshot[prop] = (window as any)[prop];
      }
    }

    // Restore previously modified properties
    Object.keys(this.modifyProps).forEach(prop => {
      (window as any)[prop] = this.modifyProps[prop];
    });
  }

  inactive() {
    this.modifyProps = {};
    for (const prop in window) {
      if (Object.prototype.hasOwnProperty.call(window, prop)) {
        if ((window as any)[prop] !== this.windowSnapshot[prop]) {
          // Record modified properties
          this.modifyProps[prop] = (window as any)[prop];
          // Restore window state
          (window as any)[prop] = this.windowSnapshot[prop];
        }
      }
    }
  }
}

