# QuickNotes Architecture Design

## Functional Requirements

The QuickNotes system must allow users to:

- Create notes
- View notes
- Update notes
- Delete notes
- Search notes
- Add tags to notes
- View notes by tag
- Access notes from multiple devices

---

## Non-Functional Requirements

The system should be:

- Fast and responsive
- Highly available
- Scalable to millions of users
- Reliable and fault tolerant
- Secure
- Easy to maintain

---

# Load Estimates

## Assumptions

- 1,000,000 registered users
- 10% active daily
- 100,000 daily active users
- Each active user reads 50 notes per day
- Each active user creates 5 notes per day
- Average note size = 2 KB
- One day ≈ 100,000 seconds
- Peak traffic = 5× average traffic

---

## Reads Per Day

100,000 users × 50 reads

= 5,000,000 reads per day

Reads per second:

5,000,000 ÷ 100,000

≈ 50 reads/second

Peak:

50 × 5

≈ 250 reads/second

---

## Writes Per Day

100,000 users × 5 writes

= 500,000 writes per day

Writes per second:

500,000 ÷ 100,000

≈ 5 writes/second

Peak:

5 × 5

≈ 25 writes/second

---

## Storage Per Year

500,000 notes/day × 2 KB

= 1 GB/day

1 GB × 365

≈ 365 GB/year

Additional storage will be required for indexes, backups, logs, and metadata.

---

# Architecture Diagram

```text
                     Users / Browsers
                              |
                              v

                        +-----------+
                        |    DNS    |
                        +-----+-----+
                              |
                              v

                        +-----------+
                        |    CDN    |
                        +-----+-----+
                              |
                              v

                   +-------------------+
                   |   Load Balancer   |
                   +---------+---------+
                             |
         +-------------------+-------------------+
         |                   |                   |
         v                   v                   v

  +-------------+    +-------------+    +-------------+
  | App Server  |    | App Server  |    | App Server  |
  |     #1      |    |     #2      |    |     #3      |
  +------+------+    +------+------+    +------+------+
         |                   |                   |
         +-------------------+-------------------+
                             |
                             v

                     +---------------+
                     | Cache (Redis) |
                