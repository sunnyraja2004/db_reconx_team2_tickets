<<<<<<< HEAD
// useDebouncedSearch(query, delay) — returns a debounced copy of `query`.
import { useEffect, useState } from 'react';

export function useDebouncedSearch(query, delay = 300) {
  const [debounced, setDebounced] = useState(query);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(query), delay);
    return () => clearTimeout(id);
  }, [query, delay]);

=======
// TICKET-ADV117 — useDebouncedSearch(query, delay).
import { useState } from 'react';

export function useDebouncedSearch(query, delay = 300) {
  // TODO(TICKET-ADV117): hold a debounced copy of `query` in useState, then
  //                     useEffect with setTimeout(setDebounced, delay).
  //                     Remember to clearTimeout in the cleanup function.
  const [debounced /*, setDebounced */] = useState(query);
>>>>>>> c2757038 (daywise-files)
  return debounced;
}
