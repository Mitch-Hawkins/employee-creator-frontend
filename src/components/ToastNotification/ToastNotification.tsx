import { useContext, useEffect, useState } from "react";
import styles from "./ToastNotification.module.scss";
import { ToastContext, ToastVariant } from "../../context/toastNotification";
import close from "../../assets/icons/icons8-close-50.png";

const ToastNotification = () => {
  const toastCtx = useContext(ToastContext);
  const [classToAdd, setClassToAdd] = useState<string>("");

  useEffect(() => {
    if (toastCtx.toastData?.variant === ToastVariant.Success) {
      setClassToAdd(styles.successContainer);
    } else if (toastCtx.toastData?.variant == ToastVariant.Error) {
      setClassToAdd(styles.errorContainer);
    }
  }, [toastCtx]);

  return (
    <>
      {toastCtx.toastData && (
        <div className={styles.backdropWrapper}>
          <div className={`${styles.toastContainer} ${classToAdd}`}>
            <div className={styles.contentWrapper}>
              <button onClick={toastCtx.closeToast}>
                <img src={close} />
              </button>
              <p>{toastCtx.toastData?.message}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ToastNotification;
