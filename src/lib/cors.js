export function addCorsHeaders(response) {
  // Header CORS
  response.headers.set("Access-Control-Allow-Origin", "*"); // Ganti '*' dengan domain yang diizinkan
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");

  // Header Keamanan
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains; preload",
  );
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; img-src 'self'; script-src 'self'",
  );

  // Header Kontrol Cache
  response.headers.set("Cache-Control", "no-store");

  return response;
}
