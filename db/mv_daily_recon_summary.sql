CREATE MATERIALIZED VIEW mv_daily_recon_summary AS
SELECT
    trade_date::date AS trade_date,
    region,
    asset_class,
    COUNT(id) AS total_trades,
    COUNT(CASE WHEN status = 'MATCHED' THEN 1 END) AS matched_trades,
    COUNT(CASE WHEN status = 'OPEN_BREAK' THEN 1 END) AS open_breaks,
    SUM(gross_notional) AS gross_notional,
    COALESCE(
        (COUNT(CASE WHEN status = 'MATCHED' THEN 1 END)::numeric / NULLIF(COUNT(id), 0))*100,
        0
    ) AS match_rate_pct
FROM trades 
GROUP BY trade_date::date, region, asset_class;

CREATE UNIQUE INDEX idx_mv_daily_recon_summary
ON mv_daily_recon_summary (trade_date, region, asset_class);