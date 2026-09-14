import { Repos } from "./components/repos";
import { User } from "./components/user";
import { Link } from "react-router-dom";
import styles from "./UserPage.module.css";

export function UserPage() {
  return (
    <div className={styles.page}>
      <User></User>
      <Repos></Repos>
      <Link className={styles.backLink} to="/search">
        ← Back to search
      </Link>
    </div>
  );
}
