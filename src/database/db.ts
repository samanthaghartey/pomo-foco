import { TaskType } from "../types/types"


//* opening database
export const  openDatabase = () : Promise<IDBDatabase>  =>
     {
        return new Promise((resolve, reject) =>{
            const request = indexedDB.open("MyDatabse", 1)

            request.onupgradeneeded = (event) =>{
                const db = (event.target as IDBOpenDBRequest).result
                if(!db.objectStoreNames.contains("Tasks")){
                    db.createObjectStore("Tasks", {keyPath :"id"})
                }
            }

            request.onsuccess = (event) =>{
                const db = (event.target as IDBOpenDBRequest).result
                resolve(db)
              
            }

            request.onerror = (event) =>{
                reject((event.target as IDBOpenDBRequest).error)
                
            }
        })
     }

//* adding Data
export  const addData = (db : IDBDatabase, task :TaskType) : Promise<void> => {
   return new Promise((resolve, reject) => {
    const transaction = db.transaction("Tasks", "readwrite")
    const store = transaction.objectStore("Tasks")

    const request = store.add(task)

    request.onsuccess = () => {
        resolve();
        console.log("added");
        
        
    }

    request.onerror = (event) => {
       reject((event.target as IDBRequest).error)
        
    }
   })
}


//* Read Data

export const  getData = async (db : IDBDatabase) : Promise<TaskType[]> => {
   return new Promise((resolve, reject) => {
    const transaction = db.transaction("Tasks", "readonly")
    const store = transaction.objectStore("Tasks")

    const request = store.getAll()

    request.onsuccess = () => {
       
        resolve(request.result)
        
    }

    request.onerror = (event) => {
        reject( (event.target as IDBRequest).error)
       
        
    }
   })
}

//* update adat

export const updateData = (db : IDBDatabase) => {
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

//* DELETE DATA
export const deleteData = (db : IDBDatabase) => {
    const transaction = db.transaction("Users", "readwrite");
    const store = transaction.objectStore("Users");

    const request = store.delete(1); // Delete user with ID 1

    request.onsuccess = () => {
        console.log("User deleted successfully");
    };

    request.onerror = (event) => {
        console.error("Error deleting user", (event.target as IDBRequest).error);
    };
};

// Call the function after opening the database
/* request.onsuccess = (event : Event) => {
    const db = (event.target as IDBRequest).result;
    deleteData(db);
}; */
