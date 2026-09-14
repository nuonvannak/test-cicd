pipeline {
    agent any

    environment {
        IMAGE_NAME = "test-cicd-app:${BUILD_NUMBER}"
        CLUSTER_NODE = 'k3d-dev-server-0'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "Building Docker image: ${IMAGE_NAME}"
                sh "docker build -t ${IMAGE_NAME} -t test-cicd-app:latest ."
            }
        }

        stage('Import to K3s Cluster') {
            steps {
                echo "Importing image into cluster node: ${CLUSTER_NODE}..."
                sh "docker save ${IMAGE_NAME} | docker exec -i ${CLUSTER_NODE} ctr images import -"
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                echo 'Applying Kubernetes manifests and updating image...'
                sh 'kubectl apply -f k8s/'
                sh "kubectl set image deployment/test-cicd-app react-app=${IMAGE_NAME}"
            }
        }

        stage('Verify Rollout') {
            steps {
                echo 'Verifying rollout status...'
                sh 'kubectl rollout status deployment/test-cicd-app --timeout=60s'
                echo 'Deployment successfully rolled out to Kubernetes!'
            }
        }
    }

    post {
        success {
            echo "🎉 Build #${BUILD_NUMBER} successfully deployed! App is live on http://localhost:8000"
        }
        failure {
            echo "❌ Pipeline failed at Build #${BUILD_NUMBER}"
        }
    }
}
