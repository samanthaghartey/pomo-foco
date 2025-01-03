import { TaskType } from "@/types/types";

export const openDatabase = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("MyDatabase", 1);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      if (!db.objectStoreNames.contains("Tasks")) {
        db.createObjectStore("Tasks", { keyPath: "id" });
      }
    };

    request.onsuccess = (e) => {
      const db = (e.target as IDBOpenDBRequest).result;

      resolve(db);
    };

    request.onerror = (e) => {
      console.error(
        "Error opening database:",
        (e.target as IDBOpenDBRequest).error
      );
      reject((e.target as IDBOpenDBRequest).error);
    };
  });
};

export const addData = (db: IDBDatabase, task: TaskType): Promise<void> => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("Tasks", "readwrite");
    const store = transaction.objectStore("Tasks");

    const request = store.put(task);

    request.onsuccess = () => {
      resolve();
    };
    request.onerror = (e) => {
      console.error("error add", (e.target as IDBOpenDBRequest).error);

      reject((e.target as IDBOpenDBRequest).error);
    };
  });
};

export const getData = (db: IDBDatabase): Promise<TaskType[]> => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("Tasks", "readonly");
    const store = transaction.objectStore("Tasks");

    const request = store.getAll();

    request.onsuccess = (e) => {
      resolve(request.result);
    };
    request.onerror = (e) => {
      console.error("error get", (e.target as IDBOpenDBRequest).error);

      reject((e.target as IDBOpenDBRequest).error);
    };
  });
};

export const deleteData = (
  db: IDBDatabase,
  id: string | number
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("Tasks", "readwrite");
    const store = transaction.objectStore("Tasks");

    const request = store.delete(id);

    request.onsuccess = () => {
      console.log("deleted");
      resolve();
    };
    request.onerror = (e) => {
      console.error("error db", (e.target as IDBOpenDBRequest).error);

      reject((e.target as IDBOpenDBRequest).error);
    };
  });
};
