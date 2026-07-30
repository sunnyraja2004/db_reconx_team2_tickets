package com.dbtraining.reconx.model;

import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Currency;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class EquityTradeTest {

    @Test
    void builder_buildsWhenAllRequiredPresent() {

        EquityTrade trade = sampleEquity("SAP-20260603-0001");

        assertThat(trade.tradeRef())
                .isEqualTo(TradeRef.of("SAP-20260603-0001"));

        assertThat(trade.notional())
                .isEqualTo(new Money(
                        new BigDecimal("10000"),
                        Currency.getInstance("EUR")));

        assertThat(trade.assetClass())
                .isEqualTo(TradeType.AssetClass.EQUITY);
    }

    @Test
    void builder_missingPrice_throws() {

        assertThatThrownBy(() ->
                EquityTrade.builder()
                        .tradeRef(TradeRef.of("SAP-20260603-0001"))
                        .instrumentSymbol("SAP.DE")
                        .quantity(new BigDecimal("100"))
                        // price intentionally omitted
                        .currency("EUR")
                        .side(Side.BUY)
                        .tradeDate(LocalDate.of(2026, 6, 3))
                        .counterpartyId(1L)
                        .build()
        )
                .isInstanceOf(NullPointerException.class)
                .hasMessageContaining("price");
    }

    @Test
    void equality_byTradeRef() {

        EquityTrade t1 = sampleEquity("SAP-20260603-0001");
        EquityTrade t2 = sampleEquity("SAP-20260603-0001");
        EquityTrade t3 = sampleEquity("SAP-20260603-0002");

        assertThat(t1).isEqualTo(t2);
        assertThat(t1.hashCode()).isEqualTo(t2.hashCode());

        assertThat(t1).isNotEqualTo(t3);
    }

    private EquityTrade sampleEquity(String ref) {
        return EquityTrade.builder()
                .tradeRef(TradeRef.of(ref))
                .instrumentSymbol("SAP.DE")
                .quantity(new BigDecimal("100"))
                .price(new BigDecimal("100"))
                .currency("EUR")
                .side(Side.BUY)
                .tradeDate(LocalDate.of(2026, 6, 3))
                .counterpartyId(1L)
                .build();
    }
}