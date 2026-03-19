testDir: 'src/tests'
use: {
  actionTimeout: 0,
  navigationTimeout: 0,
  baseURL: 'http://localhost:3000'
},
reporter: 'dot',
webServer: {
  command: 'npm run start',
  port: 3000,
  timeout: 120 * 1000,
  reuseExistingServer: !process.env.CI
}