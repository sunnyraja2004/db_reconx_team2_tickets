#!/usr/bin/env bash

# ============================================================================
# TICKET-ADV153 — Compose Smoke Test
# Run from repository root:
# bash scripts/smoke-test.sh
# ============================================================================

set -euo pipefail

echo "▶ [1/7] Bringing stack up..."

docker compose down -v >/dev/null 2>&1 || true
docker compose up -d

echo "Waiting for backend to become healthy..."

status="starting"

for i in {1..18}; do
    status=$(docker inspect --format='{{.State.Health.Status}}' reconx-backend 2>/dev/null || echo starting)

    if [[ "$status" == "healthy" ]]; then
        break
    fi

    sleep 5
done

[[ "$status" == "healthy" ]] || {
    echo "[STEP 1] FAILED - Backend not healthy"
    exit 1
}

echo "✓ Backend healthy"

###############################################################################

echo "▶ [2/7] Logging in..."

TOKEN=$(
curl -fsS \
-X POST http://localhost:8080/api/auth/login \
-H "Content-Type: application/json" \
-d '{
      "email":"trader@db.com",
      "password":"trader123"
    }' \
| jq -r '.accessToken'
)

[[ -n "$TOKEN" && "$TOKEN" != "null" ]] || {
    echo "[STEP 2] FAILED - Login failed"
    exit 1
}

echo "✓ Login successful"

###############################################################################

echo "▶ [3/7] Creating trade..."

TRADE_RESPONSE=$(
curl -fsS \
-X POST http://localhost:8080/api/v1/trades \
-H "Authorization: Bearer $TOKEN" \
-H "Content-Type: application/json" \
-d '{
      "tradeRef":"SMOKE-001",
      "instrumentSymbol":"SAP.DE",
      "counterpartyLei":"5493001ABCDE12345001",
      "quantity":100,
      "price":245.50,
      "tradeDate":"2026-06-02"
    }'
)

echo "✓ Trade created: $(echo "$TRADE_RESPONSE" | jq -r '.id')"

###############################################################################

echo "▶ [4/7] Checking Kafka..."

sleep 3

docker exec reconx-kafka \
kafka-console-consumer \
--bootstrap-server kafka:29092 \
--topic trade-events \
--from-beginning \
--max-messages 1 \
--timeout-ms 10000 \
| grep -q "SMOKE-001" \
|| {
    echo "[STEP 4] FAILED - Kafka event missing"
    exit 1
}

echo "✓ Kafka event received"

###############################################################################

echo "▶ [5/7] Checking Postgres audit table..."

docker exec reconx-postgres \
psql \
-U reconx_user \
-d reconx \
-tAc \
"SELECT COUNT(*) FROM audit_log WHERE table_name='trades';" \
| grep -qv '^0$' \
|| {
    echo "[STEP 5] FAILED - Audit row missing"
    exit 1
}

echo "✓ Audit row found"

###############################################################################

echo "▶ [6/7] Checking Prometheus..."

curl -fsS \
"http://localhost:9090/api/v1/query?query=up{job=\"spring-boot\"}" \
| jq -e '.data.result[0].value[1]=="1"' >/dev/null \
|| {
    echo "[STEP 6] FAILED - Prometheus target DOWN"
    exit 1
}

echo "✓ Prometheus scraping backend"

###############################################################################

echo "▶ [7/7] Checking Grafana..."

curl -fsS \
-u admin:admin \
http://localhost:3000/api/datasources/uid/reconx-prometheus \
| jq -e '.uid=="reconx-prometheus"' >/dev/null \
|| {
    echo "[STEP 7] FAILED - Grafana datasource missing"
    exit 1
}

echo
echo "=============================================="
echo "✅ ALL 7 SMOKE TESTS PASSED"
echo "Stack is demo ready."
echo "=============================================="