import { useFetch } from "../../../hooks/useFetch";

import { useParams } from "react-router-dom";
import styles from "./repos.module.css";

type Data = {
  name: string | null;
  id: number;
  stargazers_count: number;
  language: string | null;
};

export function Repos() {
  const { login } = useParams();
  const { data, isLoading, error, status, refetch } = useFetch<Data[]>(
    login
      ? `https://api.github.com/users/${login}/repos?sort=stars&per_page=5`
      : null,
  );

  if (status === 404) return null;

  return (
    <>
      {error && status !== 404 && (
        <div className={styles.error}>
          <p className={styles.errorText}>Failed to load data: {error}</p>
          <button className={styles.button} onClick={refetch}>
            Try again
          </button>
        </div>
      )}
      {isLoading && <p className={styles.state}>Loading...</p>}
      {data && data.length !== 0 && (
        <>
          <h2 className={styles.sectionTitle}>Top repositories</h2>
          <ul className={styles.list}>
            {data.map((repo) => {
              return (
                <li className={styles.repo} key={repo.id}>
                  <h3 className={styles.name}>{repo.name}</h3>
                  <div className={styles.meta}>
                    <span className={styles.stars}>
                      {repo.stargazers_count}
                    </span>
                    {repo.language && (
                      <span className={styles.lang}>{repo.language}</span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </>
  );
}
