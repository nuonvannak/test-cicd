# Test CI/CD React Application 🚀

An automated CI/CD pipeline test application connecting:
**GitHub ➔ Cloudflare Tunnel ➔ Jenkins ➔ Kubernetes (k3d/k3s)**.

---

## Architecture Flow

1. Developer pushes code to GitHub (`main` branch).
2. GitHub Webhook triggers Jenkins via Cloudflare Tunnel (`https://jk.onecontrol.store/github-webhook/`).
3. Jenkins runs `Jenkinsfile`:
   - Builds Docker image (`test-cicd-app:latest`).
   - Imports image into local `k3d-dev-server-0` containerd.
   - Deploys Deployment, Service, and Ingress to Kubernetes (`k8s/`).
   - Verifies rollout status.
4. App is live on `http://localhost:8000/`.
