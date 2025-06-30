pipeline {
  agent any

  environment {
    IMAGE_NAME = "jaspreet237/medusajsv2"
    IMAGE_TAG = "v${BUILD_NUMBER}"
  }

  stages {
    stage('Clone Repo') {
      steps {
        git branch: 'main', url: 'https://github.com/jaspreet237/MedusajsV2.git'
      }
    }

    stage('Build Docker Image') {
      steps {
        sh '''
          echo "🔧 Building Docker image: $IMAGE_NAME:$IMAGE_TAG"
          docker build -t $IMAGE_NAME:$IMAGE_TAG .
        '''
      }
    }

    stage('Push Docker Image') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh '''
            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
            docker push $IMAGE_NAME:$IMAGE_TAG
          '''
        }
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        sh '''
          echo "🚀 Updating image tag in deployment YAML"
          sed "s|IMAGE_TAG|$IMAGE_TAG|g" k8s/deployment-template.yaml > k8s/deployment.yaml
          kubectl apply -f k8s/deployment.yaml
        '''
      }
    }
  }

  post {
    success {
      echo "✅ Deployed $IMAGE_NAME:$IMAGE_TAG successfully!"
    }
    failure {
      echo "❌ Deployment failed. Check logs for details."
    }
  }
}
