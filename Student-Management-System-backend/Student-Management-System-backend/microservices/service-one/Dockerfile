FROM node:20

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
COPY prisma ./prisma
RUN npx prisma generate
RUN npm install 

# Install TypeScript globally
RUN npm install -g typescript

# Set NODE_ENV argument
ARG NODE_ENV

# Install project dependencies based on NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; then \
        npm install; \
    else \
        npm install --only=production; \
    fi

# Copy the rest of the application code
COPY . ./

# Build TypeScript code for production
RUN if [ "$NODE_ENV" != "development" ]; then \
        npm run build; \
        npm uninstall -g typescript; \
    fi

# Expose the necessary port
EXPOSE 8001

# Command to run the application
CMD ["node", "dist/src/server.js"]