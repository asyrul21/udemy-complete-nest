# NestJS Complete Developer's Guide

This respository stores all the code exercises for Udemy Course [NestJS the Complete Developer's Guide](https://www.udemy.com/course/nestjs-the-complete-developers-guide/)

Covers all NestJS Lectures, except that I did not deploy to Heroku.

Some notes

## Global Install of Nest CLI

```bash
npm install -g @nestjs/cli
```

## Dependency Installation

Core dependencies:

```bash
npm install @nestjs/common@7.6.17 @nestjs/core@7.6.17 @nestjs/platform-express@7.6.17 reflect-metadata@0.1.13 typescript@4.3.2
```

Additional Validation Libraries:

```bash
npm install class-validator class-transformer
```

Type ORM and Sqlite:

```bash
npm install @nestjs/typeorm typeorm sqlite3
```

Cookie Sessions:

```bash
npm install cookie-session @types/cookie-session
```

NestJS Config

```bash
npm install @nestjs/config
```

Cross Env

```bash
npm install cross-env
```

## Running Skeleton App

```bash
# navigate to project dir
cd ./01-scratch

# run
npx ts-node-dev src/main.ts
```

PostGres Driver for Production

```
npm install pg
```

## Running Nest Projects

Please see project's `package.json`

```bash
npm run start:dev
```

## Nest CLI Notes

```bash
# Global install
npm install -g @nestjs/cli

# create project
nest new [name]
# nest new messages

# create module file
nest generate module [name]
# or
# nest g module computer
# nest generate module messages

nest generate service [name]
# nest g service [name]

# create controller file
nest generate controller messages/messages --flat

```

## Request Flow

Request -> Middlewares -> Guards -> Interceptor -> Request Handler (Controller) -> Interceptor -> Response

# Typescript

## Setup and Installation

Global install

```bash
npm install -g typescript ts-node
```

Check

```bash
tsc --help
```

## Commands

Compile TS file to JS

```bash
tsc index.ts # compiled to index.js
```

Running the File

```bash
node index.js
```

Combining tsc and node in one command:

```bash
ts-node index.ts # but will not create any js files
```

Parcel

```bash
npx parcel index.html
```

## Project Dependency

Faker

```bash
npm install @faker-js/faker
```
