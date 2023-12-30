module.exports = {
  apps: [
    {
      name:"master",
      script: 'MasterServer/build/index.js',
      watch: '.', //
      autorestart:false, // 是否自动重启应用,
      error_file: "./logs/master_error.log",
      out_file:"./logs/master_out.log",
      merge_logs:true, // 是否合并日志
      min_uptime:"60s",
      max_restarts:10, // 最大重启次数
      instances:1, // 应用实例数量
      env:{
        NODE_ENV:"production",
        REMOTE_ADDR:"http://ww.dzm.com/"
      },
      args:"3000",
    },
    {
      name:"logic_1",
      script: 'LogicServer/build/index.js',
      watch: '.', //
      autorestart:false, // 是否自动重启应用,
      error_file: "./logs/master_error.log",
      out_file:"./logs/master_out.log",
      merge_logs:true, // 是否合并日志
      min_uptime:"60s",
      max_restarts:10, // 最大重启次数
      instances:1, // 应用实例数量
      env:{
        NODE_ENV:"production",
        REMOTE_ADDR:"http://ww.dzm.com/"
      },
      args:"3001",
    }

  ],

  deploy: {
    production: {
      user: 'SSH_USERNAME',
      host: 'SSH_HOSTMACHINE',
      ref: 'origin/master',
      repo: 'GIT_REPOSITORY',
      path: 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
