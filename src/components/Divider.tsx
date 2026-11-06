import styles from './Divider.module.css';

function Divider({ orientation="horizontal" }: { orientation?: "horizontal" | "vertical" }) {
  return orientation == "horizontal" ? (
    <div className={styles.dividerHorizontal}></div>
  ) : (
    <div className={styles.dividerVertical}></div>
  );
}

export default Divider;
