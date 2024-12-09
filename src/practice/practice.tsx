import React, { useState } from "react";

const Practice = () => {
  const [name, setName] = useState<string>("");
  const handle = () => {
    let promise = Notification.requestPermission();
    const notification = new Notification("Notidier", { body: "tis is nody" });
    setTimeout(() => {
      notification.close();
    }, 1000);

    // wait for permission
  };

  return (
    <div>
      <button onClick={() => handle()} className="btn">
        Notify
      </button>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
};

export default Practice;
