pipeline {
    agent any

    environment {
        IMAGE_NAME = "jaspreet237/medusajsv2"
        DOCKER_CREDENTIALS_ID = "dockerhub-creds" // Create in Jenkins > Credentials
    }

    stages {
        stage('Checkout Code') {
            steps {
                git url: 'https://github.com/jaspreet237/MedusajsV2.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${IMAGE_NAME}:latest", ".")
                }
            }
        }

        stage('Push Image to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', DOCKER_CREDENTIALS_ID) {
                        docker.image("${IMAGE_NAME}:latest").push()
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl apply -f k8s/deployment.yaml'
            }
        }
    }
}
