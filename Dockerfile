FROM node:20-bullseye

WORKDIR /app

COPY package*.json ./
# Add this before npm install to fix swc native binding issues
ENV npm_config_build_from_source=true
ENV npm_config_force=true
ENV NODE_ENV=development

RUN npm install --legacy-peer-deps --unsafe-perm

COPY . .

EXPOSE 9000

CMD ["npm", "run", "dev"]