# Stage 1: Builder
FROM oven/bun:1 AS builder
WORKDIR /usr/src/app

# Copy application files
COPY . .

# Install dependencies and build the application
RUN bun install --frozen-lockfile
RUN bun run build

# Stage 2: Production
FROM node:18-alpine
WORKDIR /usr/src/app

# Copy the built application from the builder stage
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/main"] 