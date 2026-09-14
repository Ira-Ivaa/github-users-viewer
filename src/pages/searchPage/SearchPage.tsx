import { useDebounce } from "../../hooks/useDebounce";
import { useFetch } from "../../hooks/useFetch";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./SearchPage.module.css";

type User = {
  id: number;
  login: string;
  avatar_url: string;
};

type Data = {
  items: User[];
};

export function SearchPage() {
  const [query, setQuery] = useState("");

  const debouncedQuery = useDebounce(query, 600);

  const { data, isLoading, error, refetch } = useFetch<Data>(
    debouncedQuery.trim()
      ? `https://api.github.com/search/users?q=${debouncedQuery}&per_page=10`
      : null,
  );

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>GitHub users</h1>
      <input
        className={styles.input}
        value={query}
        onChange={(e) => setQuery(e.currentTarget.value)}
        placeholder="Search users..."
      />
      {error && (
        <div className={styles.error}>
          <p className={styles.errorText}>Failed to load data: {error}</p>
          <button className={styles.button} onClick={refetch}>
            Try again
          </button>
        </div>
      )}
      {query !== debouncedQuery && <p className={styles.state}>Writing...</p>}
      {isLoading && <p className={styles.state}>Search...</p>}
      {data && data.items.length === 0 && (
        <p className={styles.state}>Nothing was found</p>
      )}
      {data && data.items.length !== 0 && (
        <ul className={styles.results}>
          {data.items.map((user) => (
            <li className={styles.result} key={user.id}>
              <img
                className={styles.avatar}
                src={user.avatar_url}
                width={40}
                height={40}
                alt={user.login}
              />
              <Link className={styles.login} to={`/users/${user.login}`}>
                {user.login}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
