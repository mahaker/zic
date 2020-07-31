FROM node:12 AS build-env
ADD ./app /app
WORKDIR /app

RUN rm -rf ./node_modules \
    && npm ci \
    && npm run build

FROM gcr.io/distroless/nodejs:12
COPY --from=build-env /app/dist /app
WORKDIR /app
CMD ["index.js"]
