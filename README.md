# Product Pagination Backend

## Project Summary

This project is a backend system built to efficiently handle and paginate a large dataset of approximately 200,000 products. The API supports fast and consistent pagination, filtering by category, and ensures users do not see duplicate or missing records while browsing.

## What I Chose and Why

I chose to build the backend using **Node.js, Express, PostgreSQL, and Prisma ORM**.

- **Node.js + Express**: Lightweight and fast for building REST APIs.
- **PostgreSQL**: Reliable relational database capable of handling large datasets efficiently.
- **Prisma ORM**: Simplifies database access and provides type-safe queries.
- **Keyset Pagination (cursor-based pagination)**: Chosen over offset pagination because it is significantly faster and more stable for large datasets.

Instead of using OFFSET-based pagination (which becomes slow and inconsistent at scale), I implemented cursor-based pagination using `createdAt` and `id` as a composite cursor to ensure correct ordering and no duplicates.

## Key Features

- Pagination over 200,000+ products
- Cursor-based (keyset) pagination for performance
- Category-based filtering
- Stable sorting using `createdAt DESC, id DESC`
- Batch seeding script for efficient database population
- Prevents duplicate and missing records during pagination

## What I Would Improve With More Time

If I had more time, I would improve the system in the following ways:

- **Snapshot-based pagination**
  - Lock results to a consistent dataset even when products are added or updated during browsing.
- **Caching layer (Redis)**
  - To reduce repeated database queries for popular pages.
- **API rate limiting & security improvements**
  - To protect against abuse in production scenarios.
- **Better test coverage**
  - Unit and integration tests for pagination correctness.
- **Frontend polish**
  - Add infinite scrolling and better loading UX instead of a button-based approach.

## How I Used AI (ChatGPT/Cursor)

I used AI as a **pair programming assistant** during development.

### What AI helped with:
- Designing the cursor-based pagination logic
- Writing and optimizing Prisma queries
- Generating the 200,000-product seed script efficiently (batch inserts)
- Debugging Prisma migration and schema issues
- Fixing frontend pagination bugs and cursor handling
- Suggesting improvements for performance and scalability

### What AI got wrong (and I corrected):
- Initially suggested unstable pagination logic using string-based IDs
- Some early implementations caused duplicate results due to incorrect cursor handling
- Suggested raw SQL approaches that were later replaced with Prisma-native queries for simplicity and safety

I reviewed and corrected these issues by testing API responses and validating pagination behavior step-by-step.

## Final Note

This project helped me understand how real-world large-scale pagination works, especially the importance of cursor-based pagination and database indexing for performance and correctness.

## Deployed link

Frontend - https://product-pagination-backend.vercel.app/
Backend - https://product-pagination-backend-op3t.onrender.com/