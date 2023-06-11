// boot/auth.js

import authMiddleware from '../middleware/auth'

export default async ({ app, router, store }) => {
  await authMiddleware({ router })
}