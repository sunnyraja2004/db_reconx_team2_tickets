// TICKET-ADV106 / ADV107 — EventSource live feed with prepend + slide-in animation.
(function () {
  const feed = document.getElementById('trade-feed');
  if (!feed) return;

  // Hardcoded demo events for the static dashboard (no backend required).
  // Replace with: const sse = new EventSource('/api/v1/trades/stream');
  const demoEvents = [
    { tradeRef: 'EQU-20260603-0001', symbol: 'SAP.DE',  qty: 1000, price: 125.50, status: 'MATCHED' },
    { tradeRef: 'FX-20260603-0001',  symbol: 'EUR/USD', qty: 1_000_000, price: 1.0852, status: 'PENDING' },
    { tradeRef: 'EQU-20260603-0002', symbol: 'AAPL',    qty: 500,  price: 178.20, status: 'BREAK' },
  ];

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  const formatQty = new Intl.NumberFormat('en-US');

  const formatPrice = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4
  });

  function prepend(trade) {

    let statusModifier = '';

    if (trade.status === 'MATCHED') {
      statusModifier = 'trade-card--matched';
    } else if (trade.status === 'UNMATCHED' || trade.status === 'BREAK') {
      statusModifier = 'trade-card--break';
    }

    const el = document.createElement('article');

    el.className = 'trade-card ' + statusModifier + ' trade-card--new';

    el.innerHTML = `
      <header class="trade-card__header">
        <strong>${escapeHtml(trade.tradeRef)}</strong>
        <span>${escapeHtml(trade.status)}</span>
      </header>

      <div class="trade-card__body">
        <span>${escapeHtml(trade.symbol)}</span>
        <span>qty=${formatQty.format(trade.qty)}</span>
        <span>price=${formatPrice.format(trade.price)}</span>
      </div>
    `;

    feed.prepend(el);

    setTimeout(() => {
      el.classList.remove('trade-card--new');
    }, 500);

    while (feed.children.length > 50) {
      feed.lastElementChild.remove();
    }
  }

  demoEvents.forEach((e, i) => setTimeout(() => prepend(e), 500 * i));
})();