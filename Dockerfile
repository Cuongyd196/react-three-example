FROM node:20.10.0-alpine3.19 as build-step
RUN apk add --update --no-cache autoconf libtool automake nasm gcc make g++ zlib-dev tzdata libpng-dev
WORKDIR /app
COPY package*.json .
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

FROM nginx:1.18.0-alpine
RUN apk update && apk add tzdata
ENV TZ=Asia/Ho_Chi_Minh
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-step /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 80
