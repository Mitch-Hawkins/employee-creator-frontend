import React, { createContext, useState } from "react";

export enum ToastVariant {
  Error,
  Success,
}

export interface ToastData {
  message: string;
  variant: ToastVariant;
  timeout: number;
}

export interface ToastNotification {
  toastData: ToastData | null;
  dispatchToast: (toastData: ToastData) => unknown;
  closeToast: () => unknown;
}

export const ToastContext = createContext<ToastNotification>({
  toastData: {
    message: "",
    variant: ToastVariant.Success,
    timeout: 3000,
  },
  dispatchToast: () => {},
  closeToast: () => {},
});

const ToastNotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toastNofitication, setToastNotification] = useState<ToastData | null>(
    null
  );

  const closeToast = () => {
    setToastNotification(null);
  };

  const dispatchToast = (toastData: ToastData) => {
    setToastNotification({
      message: toastData.message,
      variant: toastData.variant,
      timeout: toastData.timeout,
    });
  };

  const toastNotification: ToastNotification = {
    toastData: toastNofitication,
    dispatchToast,
    closeToast,
  };

  if (toastNofitication) {
    setTimeout(() => {
      setToastNotification(null);
    }, toastNofitication?.timeout || 3000);
  }

  return (
    <ToastContext.Provider value={toastNotification}>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastNotificationProvider;
