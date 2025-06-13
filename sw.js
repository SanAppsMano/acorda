self.addEventListener('push', event => {
  const data = event.data?.json() || { title: 'Alerta', body: 'Você tem uma notificação.' };
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon || '/icon.png'
    })
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(clients.openWindow('/monitor.html'));
});
