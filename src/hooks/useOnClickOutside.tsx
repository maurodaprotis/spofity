import { useEffect } from "react";

/* I tooked this hook from an old project I made.
 * Running out of time here, so I'll use any for the types.
 * TODO: Replace types with the correct ones.
 */
export const useOnClickOutside = (ref: any, handler: (event: any) => void) => {
  useEffect(() => {
    const listener = (event: any) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};
