export {};

declare global {
    interface Window {
        electronAPI: {
            saveToken: (token: string) => void;
            getToken: () => Promise<string | null>;
            notify: (title: string, body: string, action?: string) => void;
            onNotificationClick: (callback: (action: string) => void) => void;
        };
    }
}
