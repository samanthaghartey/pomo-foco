/* import { log } from "console";
import { TaskType } from "../types/types";

// Opening the database
export const openDatabase = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("MyDatabase", 1);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains("Tasks")) {
        db.createObjectStore("Tasks", { keyPath: "id" });
      }
    };

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      resolve(db);
    };

    request.onerror = (event) => {
      reject((event.target as IDBOpenDBRequest).error);
    };
  });
};

const db = openDatabase().then(d =>  d);

// Adding data after opening the database
export const addData = (task: TaskType): Promise<void> => {
  return openDatabase().then((db) => {
    return new Promise((resolve, reject) => {
      if (!task.name) {
        reject("Task must have a valid 'name' property.");
        return;
      }

      const transaction = db.transaction("Tasks", "readwrite");
      const store = transaction.objectStore("Tasks");

      const request = store.put(task);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = (event) => {
        reject((event.target as IDBRequest).error);
      };
    });
  });
};

//* Read Data

export const getData = async (db: IDBDatabase): Promise<TaskType[]> => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("Tasks", "readonly");
    const store = transaction.objectStore("Tasks");

    const request = store.getAll();

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = (event) => {
      reject((event.target as IDBRequest).error);
    };
  });
};

//* update adat

export const updateData = (db: IDBDatabase) => {
  const transaction = db.transaction("Users", "readwrite");
  const store = transaction.objectStore("Users");

  const updatedUser = { id: 1, name: "Alice", age: 26 }; // Update age
  const request = store.put(updatedUser);

  request.onsuccess = () => {
    console.log("User updated successfully");
  };

  request.onerror = (event) => {
    console.error("Error updating user", (event.target as IDBRequest).error);
  };
};

// Call the function after opening the database
/* request.onsuccess = (event) => {
    const db = event.target.result;
    updateData(db);
}; */
/* 
//* DELETE DATA
export const deleteData =  async ( id: number | string) =>  {
 
    const transaction = await db.transaction("Tasks", "readwrite");
    const store = transaction.objectStore("Tasks");

    const request = store.delete(id); // Delete user with ID 1

    request.onsuccess = () => {
      console.log("Task deleted successfully");
    };

    request.onerror = (event) => {
      console.error("Error deleting Task", (event.target as IDBRequest).error);
    };
  
}; */

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
      console.log("Database opened successfully.");
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
      console.log("added");
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
