package com.dbtraining.reconx.service;

import com.dbtraining.reconx.dto.ReconResult;
import com.dbtraining.reconx.model.EquityTrade;
import com.dbtraining.reconx.model.ReconciliationRule;
import com.dbtraining.reconx.model.Side;
import com.dbtraining.reconx.model.TradeRef;
import com.dbtraining.reconx.model.TradeType;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class ReconciliationEngineTest {

    private final ReconciliationEngine engine = new ReconciliationEngine();

    @Test
    void testReconcile_exactMatch_returnsMatched() {
        EquityTrade internal = equity("SAP-20260603-0001", "100.00", "10");
        EquityTrade external = equity("SAP-20260603-0001", "100.00", "10");

        List<ReconResult> result = engine.reconcile(
                List.of(internal),
                List.of(external),
                ReconciliationRule.EXACT
        );

        assertThat(result).hasSize(1);
        assertThat(result.get(0).status())
                .isEqualTo(ReconResult.Status.MATCHED);
    }

    @Test
    void testReconcile_priceTolerance_withinThreshold() {
        EquityTrade internal = equity("SAP-20260603-0001", "100.00", "10");
        EquityTrade external = equity("SAP-20260603-0001", "100.50", "10");

        List<ReconResult> result = engine.reconcile(
                List.of(internal),
                List.of(external),
                ReconciliationRule.PRICE_TOLERANCE_1PCT
        );

        assertThat(result).hasSize(1);
        assertThat(result.get(0).status())
                .isEqualTo(ReconResult.Status.MATCHED);
    }

    @Test
    void testReconcile_missingCounterpartyTrade_returnsBreak() {
        EquityTrade internal = equity("SAP-20260603-0001", "100.00", "10");

        List<ReconResult> result = engine.reconcile(
                List.of(internal),
                List.of(),
                ReconciliationRule.EXACT
        );

        assertThat(result).hasSize(1);
        assertThat(result.get(0).status())
                .isEqualTo(ReconResult.Status.BREAK);

        assertThat(result.get(0).discrepancyType())
                .isEqualTo("MISSING_EXTERNAL");
    }

    @Test
    void testReconcile_emptyInternal_returnsEmpty() {
        List<ReconResult> result = engine.reconcile(
                List.of(),
                List.of(),
                ReconciliationRule.EXACT
        );

        assertThat(result).isEmpty();
    }

    @Test
    void testReconcile_allMismatched_summaryShowsZeroMatched() {

        List<TradeType> internals = List.of(
                equity("SAP-20260603-0001", "100.00", "10"),
                equity("SAP-20260603-0002", "100.00", "10"),
                equity("SAP-20260603-0003", "100.00", "10")
        );

        List<TradeType> externals = List.of(
                equity("SAP-20260603-0001", "200.00", "10"),
                equity("SAP-20260603-0002", "200.00", "10"),
                equity("SAP-20260603-0003", "200.00", "10")
        );

        List<ReconResult> result = engine.reconcile(
                internals,
                externals,
                ReconciliationRule.EXACT
        );

        ReconSummary summary =
                result.stream().collect(new ReconSummaryCollector());

        assertThat(summary.total()).isEqualTo(3);
        assertThat(summary.matched()).isEqualTo(0);
        assertThat(summary.broken()).isEqualTo(3);

        assertThat(result)
                .allMatch(r -> r.status() == ReconResult.Status.BREAK);
    }

    private EquityTrade equity(String ref, String price, String qty) {
        return EquityTrade.builder()
                .tradeRef(TradeRef.of(ref))
                .instrumentSymbol("SAP.DE")
                .price(new BigDecimal(price))
                .quantity(new BigDecimal(qty))
                .currency("EUR")
                .side(Side.BUY)
                .tradeDate(LocalDate.of(2026, 6, 3))
                .counterpartyId(1L)
                .build();
    }
}