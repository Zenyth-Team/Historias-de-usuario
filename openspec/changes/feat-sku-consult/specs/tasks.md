# Implementation Tasks: Product SKU Consultation

## Phase 1: Preparation
- [ ] Create a new feature branch `feat/sku-consultation`.
- [ ] Verify the `productos` table schema in `db.js` has a `UNIQUE` constraint on `sku`.

## Phase 2: Implementation
- [ ] **T1: Route Definition**: Define `GET /api/v1/productos/sku/:sku` in `API2.js`.
- [ ] **T2: Input Validation**: Implement regex and length checks for the `sku` parameter.
- [ ] **T3: Database Query**: Implement the `SELECT` query using `better-sqlite3`.
- [ ] **T4: Response Logic**: Implement the logic to differentiate between 200 (Success/Inactive), 404 (Not Found), and 400 (Bad Request).
- [ ] **T5: Error Handling**: Implement `try-catch` for 500 (Internal Error).

## Phase 3: Documentation
- [ ] **T6: Swagger**: Update `@swagger` annotations in `API2.js` to match the new endpoint and criteria.

## Phase 4: Validation & DoD
- [ ] **T7: Unit Testing**: Create a test script (or use Thunder Client) to verify all 5 Acceptance Criteria.
- [ ] **T8: Performance Test**: Measure response time to ensure it is consistently below 0.5 ms.
- [ ] **T9: Documentation of Tests**: Record 10 successful test cases.
- [ ] **T10: PR & Merge**: Create Pull Request and merge to `main`.
