Write an ADR in Michael Nygard format.

System: ReconX, a near-prod trade reconciliation platform.

Stack:
PostgreSQL 16, Spring Boot 3, Kafka, React.

Scale:
50,000 trades/day, 5-year retention, 10 concurrent recon analysts.

Decision:
Partition the trades table by trade_date using PostgreSQL RANGE partitioning.

Alternatives considered:
1. Keep a single unpartitioned trades table.
2. Partition by trade_id hash.
3. Partition by transaction status.

Constraints:
- Most queries filter by trade date.
- Need efficient archival after 5 years.
- Database must support high insert volume.

Requirements:
- Markdown format.
- Michael Nygard ADR format.
- Include Title, Status, Context, Decision, Consequences.
- Status must be Accepted.
- Mention ReconX-specific numbers.
- Keep under 300 words.