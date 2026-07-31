const mongoose = require('mongoose');

// Serverless-safe connection handling.
//
// On Vercel the module is re-evaluated per cold start and several requests can
// share one container, so the connection promise is cached on `global` and
// awaited per request instead of being fired once at module scope. Connecting
// at module scope is what made a failed handshake take the whole function down
// (process.exit -> FUNCTION_INVOCATION_FAILED, an error page with no CORS
// headers, which the browser surfaces only as "Failed to fetch").

const cached = global.__mongooseConn || (global.__mongooseConn = { conn: null, promise: null });

function connectDb() {
  if (cached.conn) return Promise.resolve(cached.conn);

  if (!cached.promise) {
    const uri = process.env.MONGODB_URI;
    if (!uri) return Promise.reject(new Error('MONGODB_URI is not set'));

    cached.promise = mongoose
      .connect(uri, {
        // Fail fast rather than burning the function's wall clock.
        serverSelectionTimeoutMS: 8000,
        // Without buffering, a query while disconnected rejects immediately,
        // so handlers can answer 503 instead of hanging.
        bufferCommands: false,
      })
      .then((m) => {
        cached.conn = m;
        console.log('MongoDB connected. Database:', mongoose.connection.name);
        return m;
      })
      .catch((err) => {
        // Clear the cache so the next request retries instead of being stuck
        // with a permanently rejected promise.
        cached.promise = null;
        throw err;
      });
  }

  return cached.promise;
}

module.exports = connectDb;
