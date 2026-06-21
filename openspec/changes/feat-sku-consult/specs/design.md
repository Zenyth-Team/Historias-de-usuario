# Design: Product SKU Consultation

## Architecture
The feature follows the existing modular architecture of the project:
- **Router**: Express.js router in `API2.js` (or a dedicated file if preferred) to handle HTTP requests.
- **Controller/Logic**: Inline or extracted logic to validate inputs and coordinate database access.
- **Data Access**: `better-sqlite3` for synchronous, low-latency database queries.

## Data Flow
1. **Request**: `GET /api/v1/productos/sku/:sku`
2. **Validation**: 
   - SKU must be alphanumeric (allowing hyphens).
   - Length between 3 and 15 characters.
   - Case-insensitive matching (normalize to uppercase).
3. **Database Query**: 
   - `SELECT sku, nombre, precio, estado FROM productos WHERE sku = ?`
4. **Response Mapping**:
   - Found: `200 OK` + JSON body.
   - Not Found: `404 Not Found`.
   - Invalid Format: `400 Bad Request`.
   - Unexpected Error: `500 Internal Server Error`.

## Performance Optimization
To meet the **< 0.5 ms** requirement:
- **Indexing**: Ensure the `sku` column in the `productos` table has a `UNIQUE INDEX` (SQLite's `UNIQUE` constraint does this automatically).
- **Prepared Statements**: Use `db.prepare()` outside the request handler or ensure the execution path is hot.
- **Minimal Middleware**: Avoid heavy middleware on this specific route.

## Error Handling
- **CA3 (Validation)**: Regex `/^[A-Z0-9-]+$/i`.
- **CA5 (Global Catch)**: Wrap the logic in a try-catch block to return 500 on unexpected failures.
