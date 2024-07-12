pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from the repository
                git 'https://github.com/BS-PMC-2024/BS-PMC-2024-Team5.git'
            }
        }

        stage('Build Docker Images') {
            parallel {
                stage('Build Frontend Image') {
                    steps {
                        script {
                            dir('client') {
                                // Build the frontend Docker image
                                sh 'docker build -t altereitay/react-app .'
                            }
                        }
                    }
                }
                stage('Build Backend Image') {
                    steps {
                        script {
                            dir('backend') {
                                // Build the backend Docker image
                                sh 'docker build -t altereitay/flask-server .'
                            }
                        }
                    }
                }
            }
        }

        stage('Run Tests') {
            parallel {
                stage('Run Frontend Tests') {
                    steps {
                        script {
                            dir('client') {
                                // Run tests for the frontend
                                sh 'docker run --rm altereitay/react-app npm test'
                            }
                        }
                    }
                }
                stage('Run Backend Tests') {
                    steps {
                        script {
                            dir('backend') {
                                // Run tests for the backend
                                sh 'docker run --rm altereitay/flask-server pytest'
                            }
                        }
                    }
                }
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                script {
                    // Start the services using Docker Compose
                    sh 'docker-compose up -d'
                }
            }
        }
    }

    post {
        always {
            script {
                // Clean up workspace and Docker containers
                sh 'docker-compose down'
                cleanWs()
            }
        }
    }
}