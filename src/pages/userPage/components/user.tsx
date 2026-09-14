import { useFetch } from "../../../hooks/useFetch";

import { useParams } from "react-router-dom";
import styles from "./user.module.css";

type Data = {
  name: string;
  login: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
};

export function User() {
  const { login } = useParams();
  const { data, isLoading, error, status, refetch } = useFetch<Data>(
    login ? `https://api.github.com/users/${login}` : null,
  );

  return (
    <>
      {status === 404 && (
        <p className={styles.state}>User «{login}» not found</p>
      )}
      {error && status !== 404 && (
        <div className={styles.error}>
          <p className={styles.errorText}>Failed to load data: {error}</p>
          <button className={styles.button} onClick={refetch}>
            Try again
          </button>
        </div>
      )}
      {isLoading && <p className={styles.state}>Loading...</p>}
      {data && (
        <div className={styles.profile}>
          <img
            className={styles.avatar}
            src={data.avatar_url}
            width={80}
            height={80}
            alt={data.login}
          />
          <div className={styles.info}>
            {data.name && <h1 className={styles.name}>{data.name}</h1>}
            <p className={styles.login}>{data.login}</p>
            <div className={styles.stats}>
              <span className={styles.stat}>
                <strong>{data.public_repos}</strong> public repos
              </span>
              <span className={styles.stat}>
                <strong>{data.followers}</strong> followers
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
