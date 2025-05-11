# build stage
FROM node:18-alpine AS build
WORKDIR /app

# copy and install deps
COPY package*.json ./
RUN npm ci

# build the production bundle
COPY . .
RUN npm run build -- --configuration production

# runtime stage
FROM nginx:alpine
# remove default site
RUN rm -rf /usr/share/nginx/html/*
# copy built files
COPY --from=build /app/dist/frontend-ng/browser/ /usr/share/nginx/html/

# (optional) copy a custom nginx.conf if you need history‐mode routing:
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
