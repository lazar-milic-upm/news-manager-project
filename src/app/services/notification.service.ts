import { Injectable } from '@angular/core';

declare const window: any;

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  notify(title: string, body: string, action: string | null = null) {
    if (window.electronAPI) {
      window.electronAPI.notify(title, body, action);
    }
  }

  onNotificationClick(callback: (action: string) => void) {
    if (window.electronAPI) {
      window.electronAPI.onNotificationClick(callback);
    }
  }
}
