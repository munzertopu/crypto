import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

interface ToastProps {
  variant: "info" | "warning" | "error" | "success";
  children: React.ReactNode;
  onClose: () => void;
}

const Toast = ({ variant, children, onClose }: ToastProps) => {
  const timeoutMap = {
    info: 5000,
    warning: 3000,
    error: 2000,
    success: 1500,
  };

  console.log(" variant", variant);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeout = timeoutMap[variant];

    const timer = setTimeout(() => {
      setShow(false);
    }, timeout);

    return () => clearTimeout(timer);
  }, [variant, onClose]);

  const handleClose = () => {
    setShow(false);
    onClose();
  };

  return (
    <div
      className={`toast toast-${variant}`}
      style={{ display: show ? "block" : "none" }}
    >
      <FontAwesomeIcon
        icon={
          variant === "success"
            ? faCheckmark
            : variant === "info"
            ? faInfoCircle
            : variant === "warning"
            ? faExclamationTriangle
            : faTimes
        }
        className="toast-icon"
        style={{ float: "left" }}
      />
      <span className="toast-message">{children}</span>
      <FontAwesomeIcon
        icon={faTimes}
        className="toast-close"
        onClick={handleClose}
        style={{ float: "right" }}
      />
    </div>
  );
};

export default Toast;
