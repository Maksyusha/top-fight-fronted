FROM node:18-alpine AS builder
WORKDIR /app
COPY . ./
RUN npm ci && npm run build

FROM nginx:alpine as production
WORKDIR /app
# COPY --from=builder /app/package*.json ./
# RUN rm -rf /usr/share/nginx/html/* \
# && rm -rf /etc/nginx/conf.d/*
COPY --from=builder /app/build /usr/share/nginx/html/
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/
CMD [ "nginx", "-g", "daemon off;" ]
