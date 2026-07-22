```mermaid
C4Context
title ReconX Content Diagram

Person(trader, "Trader", "Submits trades")
Person(operations, "Operations", "Monitors Reconcilation")
Person(support, "Support Engineer", "Resolves Issues")
Person(admin, "Administrator", "Manages configuration")

System(reconx, "ReconX", "Trade reconcilation system")

System_Ext(oms, "OMS", "Order Management System")
System_Ext(sftp, "SFTP", "File Transfer")
System_Ext(bloomberg, "Bloomberg", "Market Data")
System_Ext(email, "Email", "Notification Service")
System_Ext(sso, "SSO", "Authentication")
System_Ext(grafana, "Grafana", "Monitoring")

Rel(trader, reconx, "Submits Trades", "HTTPS")
Rel(operations, recons, "View reconcilation", "HTTPS")
Rel(support, reconx, "Investigates issues", "HTTPS")
Rel(admin, reconx, "Configures system", "HTTPS")

Rel(reconx, oms, "Receives orders", "HTTPS")
Rel(reconx, sftp, "Import files", "SFTP")
Rel(reconx, bloomberg, "Retrieves Market Data", "API")
Rel(reconx, email, "Sends notifications", "SMTP")
Rel(reconx, sso, "Authenticates Users", "OIDC")
Rel(reconx, grafana, "Export Metrics", "Prometheus")
```

