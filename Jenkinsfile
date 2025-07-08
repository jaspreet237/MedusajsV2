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
          docker tag $IMAGE_NAME:$IMAGE_TAG $IMAGE_NAME:latest
        '''
      }
    }

    stage('Push Docker Image') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh '''
            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
            docker push $IMAGE_NAME:$IMAGE_TAG
            docker push $IMAGE_NAME:latest
          '''
        }
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        withCredentials([file(credentialsId: 'minikube-kubeconfig', variable: 'KUBECONFIG')]) {
          sh '''
            echo "🚀 Updating image tag in deployment YAML"
            sed "s|IMAGE_TAG|$IMAGE_TAG|g" k8s/full-deployment.yaml > k8s/deployment.yaml
            kubectl apply -f k8s/deployment.yaml
          '''
        }
      }
    }
  }

  post {
    success {
      echo "✅ CI/CD pipeline completed successfully!"
    }
    failure {
      echo "❌ CI/CD pipeline failed. Please check the logs."
    }
  }
}
