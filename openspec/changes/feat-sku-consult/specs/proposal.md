# Proposal: Product SKU Consultation

## Why
Customers need a fast and reliable way to check product prices and availability by scanning a barcode or entering a SKU. This improves the shopping experience by providing instant information without needing staff assistance.

## What Changes
- Implement a new REST endpoint `GET /api/v1/productos/sku/{sku}`.
- Add robust validation for SKU formats (alphanumeric, length constraints).
- Ensure the system handles both active and inactive products correctly.
- Optimize the query path to meet strict performance requirements (< 0.5 ms).

## Capabilities
- **New Capability**: `product-sku-lookup` - High-performance SKU-based product information retrieval.

## Impact
- **API**: Modification/Creation of routes in `API2.js`.
- **Database**: Efficient querying of the `productos` table in `datos.db`.
- **Performance**: High-speed response requirement impacts code structure and database indexing.
- **Documentation**: Swagger/OpenAPI documentation updates.
