FROM node:20-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

RUN npx prisma generate
RUN npm install

# Bundle app source
COPY . .

# Copy the .env and .env.development files
COPY .env ./
COPY prisma ./prisma/

EXPOSE 5000

CMD ["npm", "run", "start:dev"]