package com.dbreconx.reconx.model;

import java.util.Objects;

public final class EquityTrade {

    private final String tradeRef;
    private final String counterparty;
    private final Side side;

    public enum Side {
        BUY, SELL
    }

    private EquityTrade(Builder builder) {
        this.tradeRef = builder.tradeRef;
        this. counterparty = builder.counterparty;
        this.side = builder.side;
    }

    public String getTradeRef() { return tradeRef; }
    public String getCounterparty() {return counterparty; }
    public Side getSide() { return side; }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private String tradeRef;
        private String counterparty;
        private Side side;

        public Builder tradeRef(String tradeRef) {
            this.tradeRef = tradeRef;
            return this;
        }

        public Builder counterparty(String counterparty) {
            this.counterparty = counterparty;
            return this;
        }

        public Builder side(Side side) {
            this.side = side;
            return this;
        }
 
        public EquityTrade build() {
            Objects.requireNonNull(this.tradeRef, "tradeRef");
            return new EquityTrade(this);
        }
    }
}