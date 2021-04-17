FROM nginx:1.19-alpine

RUN apk --no-cache add curl

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY dist/genshin-wishes /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
