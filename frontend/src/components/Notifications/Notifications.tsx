import { useNotificationStore } from '@/stores/notifications';

import { Notification } from './Notification';

export const Notifications = () => {
  const { notifications, dismissNotification } = useNotificationStore();

  return (
    <div
      aria-live="assertive"
      className="flex fixed inset-0 z-50 flex-col items-end sm:items-start sm:p-6 py-6 px-4 space-y-4 pointer-events-none"
    >
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          notification={notification}
          onDismiss={dismissNotification}
        />
      ))}
    </div>
  );
};
