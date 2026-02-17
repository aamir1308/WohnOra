FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost:5173 || exit 1
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
