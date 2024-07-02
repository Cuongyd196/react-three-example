pipeline {
    agent any
    stages {
        stage('Init') {
            steps {
                echo 'Testing..'
            }
        }
        stage ('Deployments') {
            steps {
                echo 'Deploying to Production environment...'
                echo 'Copy project over SSH...'
                sshPublisher(publishers: [
                    sshPublisherDesc(
                        configName: 'CuongServer',
                        transfers:
                            [sshTransfer(
                                cleanRemote: false,
                                excludes: '',
                                execCommand: "docker build -t demoweb3d ./CuongDev/demoweb3dCI/ \
                                    && docker service rm demoweb3d_web  || true \
                                    && docker stack deploy -c ./CuongDev/demoweb3dCI/docker-compose.yml demoweb3d \
                                    && rm -rf ./CuongDev/demoweb3dCIB \
                                    && mv ./CuongDev/demoweb3dCI/ ./CuongDev/demoweb3dCIB",
                                execTimeout: 1200000,
                                flatten: false,
                                makeEmptyDirs: false,
                                noDefaultExcludes: false,
                                patternSeparator: '[, ]+',
                                remoteDirectory: './CuongDev/demoweb3dCI',
                                remoteDirectorySDF: false,
                                removePrefix: '',
                                sourceFiles: '*, src/, public/'
                            )],
                        usePromotionTimestamp: false,
                        useWorkspaceInPromotion: false,
                        verbose: true
                    )
                ])
            }
        }
    }
}
