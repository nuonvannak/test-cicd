pipeline {
    agent any

    environment {
        IMAGE_NAME = 'test-cicd-app:latest'
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
                sh "docker build -t ${IMAGE_NAME} ."
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
                echo 'Applying Kubernetes manifests...'
                sh 'kubectl apply -f k8s/'
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
            echo '🎉 Pipeline finished successfully! App is live on http://localhost:8000'
        }
        failure {
            echo '❌ Pipeline failed!'
        }
    }
}
