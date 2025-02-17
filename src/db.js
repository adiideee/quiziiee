// src/db.js
import { openDB } from "idb";

const dbPromise = openDB("quizDB", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("attempts")) {
      db.createObjectStore("attempts", { keyPath: "id", autoIncrement: true });
    }
  },
});

export const saveAttempt = async (attempt) => {
  const db = await dbPromise;
  const tx = db.transaction("attempts", "readwrite");
  tx.objectStore("attempts").add(attempt);
  await tx.done;
};

export const getAttempts = async () => {
  const db = await dbPromise;
  return db.transaction("attempts").objectStore("attempts").getAll();
};

// Add this function to clear history
export const clearHistory = async () => {
  const db = await dbPromise;
  const tx = db.transaction("attempts", "readwrite");
  tx.objectStore("attempts").clear();
  await tx.done;
};