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
  const [search, setSearch] = useState<string>("");
  const [refreshCount, setRefreshCount] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRefreshCount((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const filteredUsers = USERS.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleReset = () => {
    setSearch("");
    setRefreshCount(0);
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
            search && !hasResults
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
        {hasResults ? (
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
