const http = require('http');
const { performance } = require('perf_hooks');

const BASE_URL = 'http://localhost:3000/api/v1';

function request(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, data });
        }
      });
    }).on('error', reject);
  });
}

async function runTests() {
  console.log('--- Starting Validation Tests (Native HTTP) ---\n');

  // Test Case 1: Success - Active Product
  try {
    const start = performance.now();
    const res = await request(`${BASE_URL}/productos/sku/TEST-SKU-01`);
    const end = performance.now();
    console.log(`CA1 (Success): Status ${res.status}, Time: ${(end - start).toFixed(4)}ms`);
    console.log('Data:', res.data);
  } catch (e) { console.error('CA1 Failed:', e.message); }

  // Test Case 2: Success - Inactive Product
  try {
    const res = await request(`${BASE_URL}/productos/sku/TEST-SKU-02`);
    console.log(`\nCA4 (Inactive): Status ${res.status}`);
    console.log('Data:', res.data);
  } catch (e) { console.error('CA4 Failed:', e.message); }

  // Test Case 3: Not Found
  try {
    const res = await request(`${BASE_URL}/productos/sku/NON-EXISTENT`);
    console.log(`\nCA2 (Not Found): Status ${res.status}`);
    console.log('Message:', res.data.mensaje);
  } catch (e) { console.error('CA2 Failed:', e.message); }

  // Test Case 4: Invalid Format (Short)
  try {
    const res = await request(`${BASE_URL}/productos/sku/A1`);
    console.log(`\nCA3 (Invalid - Short): Status ${res.status}`);
    console.log('Message:', res.data.mensaje);
  } catch (e) { console.error('CA3 Failed:', e.message); }

  // Test Case 5: Invalid Format (Characters)
  try {
    const res = await request(`${BASE_URL}/productos/sku/SKU_INVALID!`);
    console.log(`\nCA3 (Invalid - Chars): Status ${res.status}`);
    console.log('Message:', res.data.mensaje);
  } catch (e) { console.error('CA3 Failed:', e.message); }

  // Test Case 6: Internal Error
  try {
    const res = await request(`${BASE_URL}/productos/sku/INTERNAL-ERROR`);
    console.log(`\nCA5 (Internal Error): Status ${res.status}`);
    console.log('Error:', res.data.error);
  } catch (e) { console.error('CA5 Failed:', e.message); }

  console.log('\n--- Tests Completed ---');
}

runTests();
