pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                echo 'Cloning source code from GitHub...'
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                sh 'docker build -t portfolio-website .'
            }
        }

        stage('Stop Old Container') {
            steps {
                echo 'Stopping old container if exists...'
                sh '''
                docker stop portfolio-container || true
                docker rm portfolio-container || true
                '''
            }
        }

        stage('Deploy New Container') {
            steps {
                echo 'Deploying website container...'
                sh 'docker run -d -p 8081:3000 --name portfolio-container portfolio-website'
            }
        }

        stage('Verify Deployment') {
            steps {
                echo 'Checking running containers...'
                sh 'docker ps'
                echo 'Deployment completed successfully!'
            }
        }
    }
}