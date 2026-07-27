# ADR-003: Use GIN `jsonb_path_ops` Index for JSONB Metadata Queries

## Status
Accepted

## Context
ReconX is a trade reconciliation platform built on PostgreSQL 16, Spring Boot 3, and Kafka, processing approximately 50,000 trades/day with a 5-year retention requirement. Instrument metadata is stored in a `JSONB` column (`instruments.metadata`, per ADR-002), and analyst-facing search queries rely heavily on JSON path/containment operators (e.g., `@>`) to filter trades by nested metadata attributes.

As trade volume accumulates toward 90M+ rows over the retention window, these metadata searches must remain fast for the 10 concurrent recon analysts querying the system, without requiring excessive index maintenance overhead on a table receiving continuous high-volume inserts from Kafka consumers.

## Decision
We will index `instruments.metadata` using a GIN index with the `jsonb_path_ops` operator class, rather than a standard btree index or the default GIN `jsonb_ops` operator class.

Alternatives considered:
1. **Btree indexes** — efficient for equality/range queries on scalar columns, but cannot natively index arbitrary nested JSONB structures or support containment queries, making them unsuitable for path-based metadata search.
2. **No index** — avoids maintenance overhead entirely, but forces full sequential scans on every analyst metadata search, which is untenable at ReconX's scale and retention window.
3. **Many expression indexes** — one per commonly queried field, offering targeted performance but requiring ongoing maintenance and new indexes each time a new metadata field is queried, conflicting with the need to avoid excessive index sprawl.

`jsonb_path_ops` was selected because it produces smaller, faster indexes than default `jsonb_ops` for containment queries (`@>`), which dominate ReconX's analyst search patterns, at the cost of not supporting key-existence operators (`?`, `?|`, `?&`) — an acceptable tradeoff given current query patterns.

## Consequences
- Analyst metadata searches using containment queries execute significantly faster with lower index storage overhead.
- Insert throughput from Kafka consumers is preserved, since a single GIN index is cheaper to maintain than multiple expression indexes.
- Key-existence queries (`?`, `?|`, `?&`) are not supported by this index and would require a supplementary index if needed later.
- Index strategy should be revisited if analyst query patterns shift toward key-existence checks.