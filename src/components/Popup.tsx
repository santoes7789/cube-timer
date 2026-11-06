import type { Dispatch, ReactNode, SetStateAction } from "react";
import styles from "./Popup.module.css"

function Popup({ show, setShow, children }: { show: boolean, setShow: Dispatch<SetStateAction<boolean>>, children: ReactNode }) {

  if (!show) return;

  return (
    <div className={styles.popupOverlay} onClick={() => setShow(false)}>
      <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )

}

export default Popup;
