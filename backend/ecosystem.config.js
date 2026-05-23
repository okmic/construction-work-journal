module.exports = {
  apps: [{
    name: 'backend',
    script: './build/entrypoints/server.js',
    cwd: '/app/construction-work-journal/backend',
    instances: 1,
    exec_mode: 'fork',
    watch: false,
    autorestart: true,
    restart_delay: 3000,
    max_restarts: 10,
    min_uptime: '10s',
    env: {
      NODE_ENV: 'production',
      PORT: 9999
    }
  }]
};