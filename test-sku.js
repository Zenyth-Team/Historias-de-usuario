const axios = require('axios');
const { performance } = require('perf_hooks');

const BASE_URL = 'http://localhost:3000/api/v1';

async function runTests() {
  console.log('--- Starting Validation Tests ---\n');

  // Test Case 1: Success - Active Product
  try {
    const start = performance.now();
    const res = await axios.get(`${BASE_URL}/productos/sku/TEST-SKU-01`);
    const end = performance.now();
    console.log(`CA1 (Success): Status ${res.status}, Time: ${(end - start).toFixed(4)}ms`);
    console.log('Data:', res.data);
  } catch (e) {
    console.error('CA1 Failed:', e.response ? e.response.data : e.message);
  }

  // Test Case 2: Success - Inactive Product
  try {
    const res = await axios.get(`${BASE_URL}/productos/sku/TEST-SKU-02`);
    console.log(`\nCA4 (Inactive): Status ${res.status}`);
    console.log('Data:', res.data);
  } catch (e) {
    console.error('CA4 Failed:', e.response ? e.response.data : e.message);
  }

  // Test Case 3: Not Found
  try {
    await axios.get(`${BASE_URL}/productos/sku/NON-EXISTENT`);
  } catch (e) {
    console.log(`\nCA2 (Not Found): Status ${e.response.status}`);
    console.log('Message:', e.response.data.mensaje);
  }

  // Test Case 4: Invalid Format (Short)
  try {
    await axios.get(`${BASE_URL}/productos/sku/A1`);
  } catch (e) {
    console.log(`\nCA3 (Invalid - Short): Status ${e.response.status}`);
    console.log('Message:', e.response.data.mensaje);
  }

  // Test Case 5: Invalid Format (Characters)
  try {
    await axios.get(`${BASE_URL}/productos/sku/SKU_INVALID!`);
  } catch (e) {
    console.log(`\nCA3 (Invalid - Chars): Status ${e.response.status}`);
    console.log('Message:', e.response.data.mensaje);
  }

  // Test Case 6: Internal Error
  try {
    await axios.get(`${BASE_URL}/productos/sku/INTERNAL-ERROR`);
  } catch (e) {
    console.log(`\nCA5 (Internal Error): Status ${e.response.status}`);
    console.log('Error:', e.response.data.error);
  }

  console.log('\n--- Tests Completed ---');
}

runTests();
