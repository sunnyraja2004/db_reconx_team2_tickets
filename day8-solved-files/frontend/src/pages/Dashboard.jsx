<<<<<<< HEAD
// useMemo for portfolio-value calc + useTradeStream live feed.
import React, { useMemo } from 'react';
=======
// TICKET-ADV120 — useMemo for portfolio-value calc.
// TICKET-ADV116 — useTradeStream live feed.
import React from 'react';
>>>>>>> c2757038 (daywise-files)
import { withAuth } from '@components/withAuth.jsx';
import { useTradeStream } from '@hooks/useTradeStream.js';

function StatCard({ label, value }) {
  return (
    <article className="stat-card">
      <h3>{label}</h3>
      <p>{value}</p>
    </article>
  );
}

<<<<<<< HEAD
function Dashboard({ trades: tradesProp }) {
  const stream = useTradeStream();
  // Prefer explicit prop (used by RTL tests) over the live SSE feed.
  const trades = tradesProp ?? stream.trades;
  const isConnected = tradesProp ? true : stream.isConnected;

  const portfolioValue = useMemo(
    () => trades.reduce((sum, t) => sum + (Number(t.quantity) * Number(t.price) || 0), 0),
    [trades]
  );

  const { matched, unmatched, breaks } = useMemo(() => {
    let m = 0;
    let u = 0;
    let b = 0;
    for (const t of trades) {
      if (t.status === 'MATCHED') m++;
      else if (t.status === 'UNMATCHED') { u++; b++; }
      else if (t.status === 'DISPUTED') b++;
    }
    return { matched: m, unmatched: u, breaks: b };
  }, [trades]);
=======
function Dashboard() {
  const { trades, isConnected } = useTradeStream();

  // TODO(TICKET-ADV120): use useMemo to compute `portfolioValue` =
  //                     sum(trades[i].quantity * trades[i].price).
  //                     Memoise on `trades` so it doesn't recompute every render.

  // TODO(TICKET-ADV120): derive `matched` (status === 'MATCHED') and
  //                     `breaks` (status in ['UNMATCHED','DISPUTED']) counts.
>>>>>>> c2757038 (daywise-files)

  return (
    <section>
      <h2>Dashboard</h2>
      <div className="stat-grid">
<<<<<<< HEAD
        <StatCard label="Portfolio value (USD)" value={portfolioValue.toLocaleString()} />
        <StatCard label="Trades streamed" value={trades.length} />
        <StatCard label="Matched trades" value={matched} />
        <StatCard label="Unmatched trades" value={unmatched} />
        <StatCard label="Open breaks" value={breaks} />
=======
        {/* TODO(TICKET-ADV120): render four <StatCard>s — Portfolio value,
            Trades streamed, Matched, Open breaks. */}
>>>>>>> c2757038 (daywise-files)
      </div>
      <div role="status" aria-live="polite">
        SSE: {isConnected ? 'connected' : 'disconnected'}
      </div>
    </section>
  );
}

export default withAuth(Dashboard);
