export const useShowNotification = () => {
  Notification.requestPermission().then((result) => {
    if (result === "granted") {
      const n = new Notification("Hello", { body: "well what " });
      setTimeout(() => {
        n.close();
      }, 1000);
    }
  });
};
