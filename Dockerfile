FROM node:lts
# Set the working directory
WORKDIR /app

# COPY package.json .
# COPY yarn.lock .
COPY . .
RUN npm install
RUN echo "file copying completed..."

EXPOSE 8001


RUN npm run build

RUN echo "build completed..."

CMD ["npm","run","start"]