SELECT
    id,
    trade_date,
    instrument_id,
    price,
    quantity,
    gross_notional,
    SUM(price * quantity) OVER(
        PARTITION BY instrument_id, trade_date::date
    ) / NULLIF(SUM(quantity) OVER(
        PARTITION BY instrument_id, trade_date::date
    ), 0) AS vwap
FROM trades;