"use client";

import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
};

const USERS: User[] = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
  { id: 4, name: "Alex" },
  { id: 5, name: "Alicia" },
  { id: 6, name: "Albert" },
  { id: 7, name: "Brandon" },
  { id: 8, name: "Bella" },
  { id: 9, name: "Catherine" },
  { id: 10, name: "Chris" },
  { id: 11, name: "Daniel" },
  { id: 12, name: "Daisy" },
  { id: 13, name: "Ethan" },
  { id: 14, name: "Eva" },
  { id: 15, name: "Frank" },
];

export const Interview1 = () => {
  const [search, setSearch] = useState("");
  const [refreshCount, setRefreshCount] = useState(0);

  const [loading, setLoading] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(USERS);

  /* 🔹 Effect 1: auto refresh */
  useEffect(() => {
    const intervalId = setInterval(() => {
      setRefreshCount((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  /* 🔹 Effect 2: simulate search request */
  useEffect(() => {
    setLoading(true);

    const timeoutId = setTimeout(() => {
      const results = USERS.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      );

      setFilteredUsers(results);
      setLoading(false);
    }, 400);

    // 🔥 Important: cleanup to avoid race conditions
    return () => clearTimeout(timeoutId);
  }, [search]);

  const handleReset = () => {
    setSearch("");
    setRefreshCount(0);
    setFilteredUsers(USERS);
    setLoading(false);
  };

  // 🔹 Derived UI states
  const hasResults = filteredUsers.length > 0;
  const refreshLevel =
    refreshCount >= 6 ? "high" : refreshCount >= 3 ? "medium" : "low";

  return (
    <div className="page-container">
      <h2>User Search</h2>

      <div className="search-row">
        <input
          type="text"
          placeholder="Search user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`search-input ${
            search && !hasResults && !loading
              ? "input-error"
              : search && hasResults
              ? "input-success"
              : ""
          }`}
        />

        <button onClick={handleReset}>Reset</button>
      </div>

      <p className={`refresh refresh-${refreshLevel}`}>
        Refreshed <strong>{refreshCount}</strong> times
      </p>

      <ul className="user-list">
        {loading ? (
          <li className="loading-state">Loading...</li>
        ) : hasResults ? (
          filteredUsers.map((user) => {
            const startsWithSearch =
              search &&
              user.name.toLowerCase().startsWith(search.toLowerCase());

            return (
              <li
                key={user.id}
                className={`user-item ${startsWithSearch ? "highlight" : ""} ${
                  refreshCount >= 5 ? "dimmed" : ""
                }`}
              >
                {user.name}
              </li>
            );
          })
        ) : (
          <li className="empty-state">No users found</li>
        )}
      </ul>
    </div>
  );
};
