const { v4: uuidv4 } = require('uuid');

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const healthData = {
      status: 'ok',
      service: 'Content Repurposer IA API',
      version: '2.0.0',
      timestamp: new Date().toISOString(),
      environment: 'netlify',
      functions: ['health', 'transcribe'],
      uptime: process.uptime(),
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(healthData),
    };
  } catch (error) {
    console.error('Health check error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        status: 'error', 
        message: 'Health check failed',
        error: error.message 
      }),
    };
  }
};