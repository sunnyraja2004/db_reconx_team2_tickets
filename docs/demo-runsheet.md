# ReconX Demo Runsheet (20 Minutes)

## Demo Timeline

| Time | Owner | Activity | Backup / Fallback |
|------|-------|----------|-------------------|
| 00:00–01:00 | Lead | Title slide + Team introduction | Keep title slide open |
| 01:00–03:00 | Lead | Problem statement + Architecture overview | Use architecture slide if questions arise |
| 03:00–04:00 | Lead | Tech stack grouped by layer | Keep explanation concise |
| 04:00–05:00 | Engineer 1 | Switch to application and login | Screenshot if login fails |
| 05:00–06:30 | Engineer 1 | Create a new trade | Use prepared trade if needed |
| 06:30–08:00 | Engineer 2 | Show Kafka (Kafdrop) event | Screenshot if Kafka is unavailable |
| 08:00–09:30 | Engineer 2 | Show Grafana dashboard metrics | Monitoring screenshots as backup |
| 09:30–11:00 | Engineer 2 | Backend logs + reconciliation status | Explain expected output if delayed |
| 11:00–12:00 | Engineer 2 | Audit table / database entry | Use SQL screenshot if DB unavailable |
| 12:00–17:00 | Team | Code walkthrough (Controller → Service → Kafka → UI) | Keep IDE ready |
| 17:00–20:00 | Team | Learnings + Q&A | Repository open for navigation |

---

## Screen Switch Order

1. Login page
2. Trade creation
3. Kafdrop (Kafka events)
4. Grafana dashboard
5. Backend logs
6. Audit table / Database
7. IDE for code walkthrough
8. Slides (Learnings)
9. Q&A

---

# Rehearsal 1 (Chaos Test)

**Target:** Complete before **15:30**

Chaos injection:
- Close one browser tab OR
- Interrupt a terminal command with Ctrl+C OR
- Disconnect/reconnect the network briefly

Objective:
- Recover calmly.
- Continue using screenshots if required.
- Stay within the 20-minute limit.

---

# Rehearsal 2 (Trainer Q&A)

**Target:** Complete before **16:15**

Practice:
- Finish the demo within 20 minutes.
- Answer at least 3 technical questions.
- Each team member answers questions related to their module.

---

## Common Backup Plan

- Login fails → use screenshots.
- Kafka unavailable → show saved event screenshot.
- Grafana unavailable → use monitoring screenshots.
- Backend slow → explain expected flow using logs.
- Database unavailable → show saved audit table screenshot.

