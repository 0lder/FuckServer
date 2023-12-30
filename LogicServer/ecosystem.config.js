module.exports = {
    apps: [
                {
                    name: "MatserServer",
                    script: 'Index.js',
                    cwd:"./build/app/Servers/MasterServer/",
                    max_memory_restart:"300M",
                    instances:1
                },
                {
                    name: "DBServer",
                    script: 'Index.js',
                    cwd:"./build/app/Servers/DBServer/",
                    max_memory_restart:"300M",
                    instances:1
                    
                },
                {
                    name: "Web3Server",
                    script: 'Index.js',
                    cwd:"./build/app/Servers/Web3Server/",
                    max_memory_restart:"300M",
                    instances:1
                    
                },
                {
                    name: "LogicServer",
                    script: 'Index.js',
                    cwd:"./build/app/Servers/LogicServer/",
                    max_memory_restart:"300M",
                    instances:2
                    
                },
                {
                    name: "ConnectorServer",
                    script: 'Index.js',
                    cwd:"./build/app/Servers/ConnectorServer/",
                    max_memory_restart:"300M",
                    instances:2
                    
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