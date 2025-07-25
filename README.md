
# MedusaJS V2 Ecommerce Backend on AKS (Azure Kubernetes Service)

This project demonstrates a production-like deployment of a **MedusaJS v2 ecommerce backend** using **Docker**, **Jenkins CI/CD**, **Azure Kubernetes Service (AKS)**, and **PostgreSQL**. The backend exposes REST APIs and an admin panel for managing ecommerce operations.

---

## 🔧 Tech Stack

- **Backend**: MedusaJS v2
- **Database**: PostgreSQL (containerized)
- **CI/CD**: Jenkins (Pipeline-based deployment)
- **Containerization**: Docker & Docker Compose
- **Orchestration**: Kubernetes (AKS)
- **Cloud**: Microsoft Azure
- **Others**: Helm (optional), kubectl, Azure CLI

---

## 📁 Project Structure

```
MedusajsV2/
│
├── k8s/                    # Kubernetes YAML files
│   ├── deployment.yaml
│   ├── service.yaml
│   └── postgres.yaml
│
├── jenkins/
│   └── Jenkinsfile         # Jenkins CI/CD pipeline script
│
├── Dockerfile              # Docker image for MedusaJS backend
├── docker-compose.yml      # Local development setup
└── README.md               # This file
```

---

## 🚀 Features

- CI/CD pipeline triggered via Jenkins
- Deployment on AKS using kubectl
- External LoadBalancer to access Medusa Admin UI
- Logs and service monitoring with `kubectl`
- Secure PostgreSQL with volume persistence
- Easily scalable & production-ready

---

## 🛠️ Setup & Deployment

### 1. Clone the Repo

```bash
git clone https://github.com/jaspreet237/MedusajsV2.git
cd MedusajsV2
```

### 2. Build Docker Images

```bash
docker build -t medusa-app .
docker-compose up -d
```

### 3. Push to Docker Hub

```bash
docker tag medusa-app <your-dockerhub-username>/medusa-app
docker push <your-dockerhub-username>/medusa-app
```

### 4. Create AKS Cluster (Optional: if not already created)

```bash
az aks create --resource-group rg-aks-dev --name my-aks-cluster --node-count 1 --generate-ssh-keys
az aks get-credentials --resource-group rg-aks-dev --name my-aks-cluster
```

### 5. Apply Kubernetes Manifests

```bash
kubectl apply -f k8s/postgres.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

### 6. Access Application

Check external IP:

```bash
kubectl get svc medusa-service
```

Visit:

```
http://<EXTERNAL-IP>:9000/app/login
```

---

## 🧪 Create Admin User (Inside Pod)

```bash
kubectl exec -it <medusa-pod-name> -- yarn medusa user -e admin@mail.com -p password
```

---

## 🧰 Jenkins CI/CD Setup

- Pipeline includes steps to:
  - Clone repo
  - Build Docker image
  - Push to Docker Hub
  - Apply Kubernetes manifests

Example Jenkinsfile is included under `jenkins/`.

---

## 📌 Future Enhancements

- Implement Ingress Controller (Nginx or Traefik)
- Enable TLS with Let's Encrypt
- Add Redis for caching & job queue
- Configure Horizontal Pod Autoscaler
- Enable Role-Based Access Control (RBAC)
- Integrate monitoring (Prometheus + Grafana)

---

## 🧠 What You Can Learn From This Project

- Real-world AKS deployment
- End-to-end DevOps pipeline using Jenkins
- Secure and scalable Kubernetes practices
- Practical MedusaJS backend usage

---

## 🤝 Contributing

Pull requests and stars are welcome! For major changes, please open an issue first.

---

## 📄 License

This project is licensed under [MIT](LICENSE).

---

## 🔗 Author

- **Jaspreet Singh**
- GitHub: [jaspreet237](https://github.com/jaspreet237)
