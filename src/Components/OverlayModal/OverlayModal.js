import styles from "./OverlayModal.module.css";

function OverlayModal(props) {
  return (
    <div className={styles["modal-sec"]} id="overlay-modal">
      <div className={styles["modal"]}>{props?.children}</div>
    </div>
  );
}

export default OverlayModal;
