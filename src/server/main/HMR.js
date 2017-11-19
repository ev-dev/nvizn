import express from 'express'
import { spawn } from 'child_process'
import API from '../api'


Promise.resolve(
  express()
    .use(API)
).then(() => {
  spawn('npx', ['webpack-dev-server', ...process.argv.slice(2)], {
    env: {
      NODE_ENV: 'development',
      FORCE_COLOR: 3,
      ...process.env
    }
  })
})
