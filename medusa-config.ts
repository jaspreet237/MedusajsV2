import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    database_url: process.env.DATABASE_URL,
    database_extra: {
      ssl: false,
    },
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
  },
  modules: {
    // Tax module intentionally excluded to prevent DB errors
    // Add other modules here if needed
    tax: false, // 👈 disable the Tax module
    payment: false,
    fulfillment: false,
    notification: false,
  },
})

