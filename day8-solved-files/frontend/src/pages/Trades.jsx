<<<<<<< HEAD
<<<<<<< HEAD
// Compound DataTable + useDebouncedSearch driving a paginated trades list.
import React, { useEffect, useState } from 'react';
=======
// TICKET-ADV114 — Compound DataTable.
// TICKET-ADV117 — useDebouncedSearch.
import React, { useState } from 'react';
>>>>>>> c2757038 (daywise-files)
=======
// Compound DataTable + useDebouncedSearch driving a paginated trades list.
import React, { useEffect, useState } from 'react';
>>>>>>> a48c151f (checkpoint: staged reverts + solved-file writes + WHERE-TO-PASTE updates before build verification)
import { withAuth } from '@components/withAuth.jsx';
import DataTable from '@components/DataTable.jsx';
import { useDebouncedSearch } from '@hooks/useDebouncedSearch.js';
import { api } from '@services/apiService.js';

function Trades() {
  const [search, setSearch] = useState('');
  const debounced = useDebouncedSearch(search, 300);
  const [page, setPage] = useState(0);
  const [data, setData] = useState({ items: [], totalPages: 0 });

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> a48c151f (checkpoint: staged reverts + solved-file writes + WHERE-TO-PASTE updates before build verification)
  useEffect(() => {
    let cancelled = false;
    const params = new URLSearchParams();
    params.set('page', String(page));
    if (debounced) params.set('status', debounced);

    api.listTrades(params.toString())
      .then((res) => {
        if (cancelled) return;
        if (res && Array.isArray(res.items)) {
          setData({ items: res.items, totalPages: res.totalPages ?? 0 });
        } else if (Array.isArray(res)) {
          setData({ items: res, totalPages: 1 });
        } else {
          setData({ items: [], totalPages: 0 });
        }
      })
      .catch(() => {
        if (!cancelled) setData({ items: [], totalPages: 0 });
      });

    return () => { cancelled = true; };
  }, [page, debounced]);
<<<<<<< HEAD
=======
  // TODO(TICKET-ADV114 + ADV117): useEffect that:
  //   - builds a query string from `page` and `debounced` (status filter)
  //   - calls api.listTrades(params) and stores the response in `data`
  //   - re-runs whenever `page` or `debounced` changes
  //   - degrades gracefully on error (set empty page).
>>>>>>> c2757038 (daywise-files)
=======
>>>>>>> a48c151f (checkpoint: staged reverts + solved-file writes + WHERE-TO-PASTE updates before build verification)

  return (
    <section>
      <h2>Trades</h2>
      <input
        aria-label="Filter by status"
        placeholder="status filter (PENDING/MATCHED/…)"
        value={search}
        onChange={(e) => setSearch(e.target.value.toUpperCase())}
      />
      <DataTable>
        <DataTable.Header columns={[
          { key: 'tradeRef', label: 'Ref' },
          { key: 'symbol',   label: 'Symbol' },
          { key: 'qty',      label: 'Qty' },
          { key: 'price',    label: 'Price' },
          { key: 'status',   label: 'Status' },
        ]} />
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> a48c151f (checkpoint: staged reverts + solved-file writes + WHERE-TO-PASTE updates before build verification)
        <DataTable.Body
          rows={data.items}
          render={(t) => (
            <>
              <span>{t.tradeRef}</span>
              <span>{t.symbol ?? t.instrument}</span>
              <span>{t.qty ?? t.quantity}</span>
              <span>{t.price}</span>
              <span>{t.status}</span>
            </>
          )}
        />
<<<<<<< HEAD
=======
        {/* TODO(TICKET-ADV114): render a DataTable.Body with `rows={data.items}`
            and a `render` prop that returns one <span> per column. */}
>>>>>>> c2757038 (daywise-files)
=======
>>>>>>> a48c151f (checkpoint: staged reverts + solved-file writes + WHERE-TO-PASTE updates before build verification)
        <DataTable.Pagination
          page={page}
          totalPages={Math.max(1, data.totalPages)}
          onChange={setPage}
        />
      </DataTable>
    </section>
  );
}

export default withAuth(Trades);
