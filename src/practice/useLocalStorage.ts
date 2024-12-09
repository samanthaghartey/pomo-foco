import { useState } from "react";

export default function useLocalStorage(init: string) {
  const [value, setValue] = useState(init);

  return [value, setValue];
}
