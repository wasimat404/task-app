<div align="center">

# 🚀 Full Stack DevOps — Production-Grade Platform

### Kubernetes · CI/CD · GitOps · Observability · Infrastructure as Code

[![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)](https://kubernetes.io)
[![Terraform](https://img.shields.io/badge/Terraform-7B42BC?style=for-the-badge&logo=terraform&logoColor=white)](https://terraform.io)
[![ArgoCD](https://img.shields.io/badge/ArgoCD-EF7B4D?style=for-the-badge&logo=argo&logoColor=white)](https://argo-cd.readthedocs.io)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://docker.com)
[![AWS](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)](https://aws.amazon.com)
[![Prometheus](https://img.shields.io/badge/Prometheus-E6522C?style=for-the-badge&logo=prometheus&logoColor=white)](https://prometheus.io)
[![Grafana](https://img.shields.io/badge/Grafana-F46800?style=for-the-badge&logo=grafana&logoColor=white)](https://grafana.com)
[![Helm](https://img.shields.io/badge/Helm-0F1689?style=for-the-badge&logo=helm&logoColor=white)](https://helm.sh)

> **A battle-hardened, end-to-end DevOps platform** — from source code to production, with automated delivery, real-time observability, GitOps-driven deployments, and infrastructure defined entirely as code.

</div>

---

## 📖 Table of Contents

- [🧭 Project Overview](#-project-overview)
- [🏗️ Architecture Diagram](#-architecture-diagram)
- [📦 Tech Stack](#-tech-stack)
- [⚙️ Prerequisites](#-prerequisites)
- [📥 Getting Started](#-getting-started)
- [🐳 Docker — Build & Push Images](#-docker--build--push-images)
- [🌍 Terraform — Provision EKS Cluster](#-terraform--provision-eks-cluster)
- [☸️ Kubernetes — Connect & Deploy](#-kubernetes--connect--deploy)
- [🔁 ArgoCD — GitOps Setup](#-argocd--gitops-setup)
- [📊 Monitoring — Prometheus & Grafana](#-monitoring--prometheus--grafana)
- [🔍 Network Debugging — Kubeshark](#-network-debugging--kubeshark)
- [⚠️ Common Issues & Fixes](#-common-issues--fixes)
- [🧹 Cleanup](#-cleanup)
- [📁 Project Structure](#-project-structure)
- [🤝 Contributing](#-contributing)

---

## 🧭 Project Overview

This project demonstrates a **production-grade, cloud-native application deployment pipeline** built entirely on open-source tooling and AWS. It covers every phase of the modern DevOps lifecycle:

| Phase | What Happens |
|-------|-------------|
| 🏗️ **Infrastructure** | EKS cluster provisioned via Terraform (IaC) |
| 🐳 **Containerization** | App packaged into Docker images, pushed to Docker Hub |
| ☸️ **Orchestration** | Kubernetes manages pods, services, and scaling |
| 🔁 **GitOps** | ArgoCD continuously syncs cluster state from Git |
| 📊 **Observability** | Prometheus scrapes metrics · Grafana visualizes them |
| 🔍 **Network Debug** | Kubeshark provides real-time packet-level visibility |

> **Why this stack?** It mirrors exactly what top-tier engineering teams run in production at scale — battle-tested, widely adopted, and cloud-agnostic enough to port anywhere.

---

## 🏗️ Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          DEVELOPER MACHINE                              │
│                                                                         │
│   ┌──────────┐    git push    ┌──────────────────────────────────────┐  │
│   │  Source  │ ─────────────▶ │            GitHub Repo               │  │
│   │   Code   │                │  (App Code + K8s Manifests + IaC)   │  │
│   └──────────┘                └────────────────┬─────────────────────┘  │
└────────────────────────────────────────────────│────────────────────────┘
                                                 │ watches
                              ┌──────────────────▼──────────────────────┐
                              │            ArgoCD (GitOps)              │
                              │  Detects drift → auto-syncs cluster     │
                              └──────────────────┬──────────────────────┘
                                                 │ applies manifests
                    ┌────────────────────────────▼──────────────────────────────┐
                    │                   AWS EKS Cluster                         │
                    │                                                            │
                    │  ┌─────────────────┐        ┌──────────────────────────┐  │
                    │  │   Frontend Pod  │        │      Backend Pod(s)       │  │
                    │  │  (React/Nginx)  │◀──────▶│  (API / App Server)      │  │
                    │  └────────┬────────┘        └────────────┬─────────────┘  │
                    │           │                              │                 │
                    │           ▼                              ▼                 │
                    │  ┌─────────────────────────────────────────────────────┐  │
                    │  │              PostgreSQL (StatefulSet)               │  │
                    │  └─────────────────────────────────────────────────────┘  │
                    │                                                            │
                    │  ┌───────────────────┐   ┌──────────────────────────────┐ │
                    │  │   Prometheus      │──▶│         Grafana              │ │
                    │  │  (Metrics Scrape) │   │  (Dashboards & Alerts)       │ │
                    │  └───────────────────┘   └──────────────────────────────┘ │
                    │                                                            │
                    │  ┌─────────────────────────────────────────────────────┐  │
                    │  │         Kubeshark (Network Traffic Analysis)        │  │
                    │  └─────────────────────────────────────────────────────┘  │
                    └────────────────────────────────────────────────────────────┘
                                        │
                            ┌───────────▼────────────┐
                            │  AWS Load Balancer (ELB)│
                            │   (Public Entrypoint)   │
                            └────────────────────────-┘
                                        │
                                        ▼
                                   🌐 Internet
                                   (End Users)
```

---

## 📦 Tech Stack

| Category | Tool | Purpose |
|----------|------|---------|
| ☁️ Cloud | AWS (EKS, EC2, ELB, IAM) | Cloud infrastructure provider |
| 🏗️ IaC | Terraform | Provision and manage AWS resources |
| 🐳 Containers | Docker | Build and package application images |
| ☸️ Orchestration | Kubernetes (EKS) | Run and manage containerized workloads |
| 🔁 GitOps | ArgoCD | Automated, Git-driven deployments |
| 📦 Package Manager | Helm | Deploy complex K8s apps via charts |
| 📊 Metrics | Prometheus | Collect and store time-series metrics |
| 📈 Dashboards | Grafana | Visualize metrics and set up alerts |
| 🔍 Network Debug | Kubeshark | Real-time API & packet traffic analysis |
| 🗄️ Database | PostgreSQL | Relational data store (StatefulSet) |

---

## ⚙️ Prerequisites

Before you begin, ensure you have **all of the following installed and configured** on your local machine:

### 🛠️ Required Tools

```bash
# Verify each tool is installed
docker --version        # Docker Engine 24+
kubectl version         # Kubernetes CLI
aws --version           # AWS CLI v2
terraform --version     # Terraform 1.5+
helm version            # Helm 3+
kubeshark version       # Kubeshark (optional, for debugging)
```

### 🔑 AWS Credentials

You need an AWS IAM user/role with the following permissions:
- `AmazonEKSClusterPolicy`
- `AmazonEC2FullAccess`
- `ElasticLoadBalancingFullAccess`
- `IAMFullAccess` *(for EKS node role creation)*

```bash
# Configure your AWS credentials
aws configure
# ➜ AWS Access Key ID: <your-key>
# ➜ AWS Secret Access Key: <your-secret>
# ➜ Default region name: ap-south-1    ← (or your preferred region)
# ➜ Default output format: json
```

### 🐳 Docker Hub Account
Make sure you're logged into Docker Hub:
```bash
docker login
```

---

## 📥 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd project
```

### 2. Review the Project Structure

```
project/
├── backend/               # Backend application source code
│   ├── Dockerfile
│   └── src/
├── frontend/              # Frontend application source code
│   ├── Dockerfile
│   └── src/
├── k8s/                   # Kubernetes manifests
│   ├── backend.yaml
│   ├── frontend.yaml
│   ├── postgres.yaml
│   └── ingress.yaml
├── terraform/             # Infrastructure as Code
│   ├── main.tf
│   ├── variables.tf
│   └── outputs.tf
└── README.md
```

---

## 🐳 Docker — Build & Push Images

This step packages your application into container images and pushes them to Docker Hub, making them accessible to your Kubernetes cluster.

```bash
# ----------------------------
# 🔨 Build the Docker images
# ----------------------------

# Build backend image
docker build -t <your-dockerhub-username>/backend:latest ./backend

# Build frontend image
docker build -t <your-dockerhub-username>/frontend:latest ./frontend

# ----------------------------
# ✅ Verify images locally
# ----------------------------
docker images | grep -E "backend|frontend"

# ----------------------------
# 📤 Push images to Docker Hub
# ----------------------------
docker push <your-dockerhub-username>/backend:latest
docker push <your-dockerhub-username>/frontend:latest
```

> 💡 **Tip:** Tag images with a version (e.g., `:v1.0.0`) instead of `:latest` for production deployments — it makes rollbacks much safer and gives you full auditability.

```bash
# Example: versioned tagging
docker build -t <your-dockerhub-username>/backend:v1.0.0 ./backend
docker push <your-dockerhub-username>/backend:v1.0.0
```

---

## 🌍 Terraform — Provision EKS Cluster

Terraform provisions the entire AWS infrastructure — VPC, subnets, EKS cluster, and node groups — in a fully reproducible, version-controlled way.

```bash
# Navigate to the Terraform directory
cd terraform/

# ----------------------------
# 🚀 Initialize Terraform
# Downloads required providers and modules
# ----------------------------
terraform init

# ----------------------------
# 🔍 Preview what will be created
# Always plan before applying in production!
# ----------------------------
terraform plan

# ----------------------------
# ✅ Apply the infrastructure
# This provisions your EKS cluster on AWS
# ⏳ Takes approximately 10–15 minutes
# ----------------------------
terraform apply -auto-approve
```

> ⚠️ **Cost Warning:** EKS clusters and EC2 nodes cost money. Always run `terraform destroy` when you're done to avoid unexpected AWS charges.

### What Terraform Creates:

| Resource | Description |
|----------|-------------|
| `aws_vpc` | Isolated network for the cluster |
| `aws_subnet` | Public + Private subnets across AZs |
| `aws_eks_cluster` | The managed Kubernetes control plane |
| `aws_eks_node_group` | EC2 worker nodes (e.g., t3.medium) |
| `aws_iam_role` | IAM roles for EKS and node groups |

---

## ☸️ Kubernetes — Connect & Deploy

### Connect kubectl to Your EKS Cluster

```bash
# Update your local kubeconfig to point at EKS
aws eks update-kubeconfig \
  --region <your-aws-region> \
  --name <your-cluster-name>

# Verify the connection — you should see your nodes listed
kubectl get nodes
```

**Expected output:**
```
NAME                          STATUS   ROLES    AGE   VERSION
ip-10-0-1-45.ec2.internal     Ready    <none>   2m    v1.29.0
ip-10-0-2-88.ec2.internal     Ready    <none>   2m    v1.29.0
```

### Deploy the Application

```bash
# Apply all Kubernetes manifests in the k8s/ directory
kubectl apply -f k8s/

# ----------------------------
# 🔍 Monitor deployment status
# ----------------------------

# Check that all pods are running
kubectl get pods -w

# View services (look for the EXTERNAL-IP of the LoadBalancer)
kubectl get svc

# Check deployments
kubectl get deployments

# Describe a pod for debugging info
kubectl describe pod <pod-name>

# View live logs from a pod
kubectl logs -f <pod-name>
```

**Expected pod output:**
```
NAME                         READY   STATUS    RESTARTS   AGE
backend-7d6f9c-xkp2t         1/1     Running   0          90s
frontend-5b8dc9-wqr7z        1/1     Running   0          90s
postgres-0                   1/1     Running   0          90s
```

---

## 🔁 ArgoCD — GitOps Setup

ArgoCD watches your Git repository and **automatically syncs** your Kubernetes cluster whenever you push changes. This eliminates manual `kubectl apply` steps — Git becomes the single source of truth.

### Install ArgoCD

```bash
# Create a dedicated namespace for ArgoCD
kubectl create namespace argocd

# Install ArgoCD using the official manifests
kubectl apply -n argocd \
  -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# Wait for all ArgoCD pods to be Running
kubectl get pods -n argocd -w
```

### Access the ArgoCD UI

```bash
# Forward the ArgoCD server port to your local machine
kubectl port-forward svc/argocd-server -n argocd 8080:443
```

Then open in your browser: **http://localhost:8080**

### Get the Admin Password

```bash
# Retrieve and decode the initial admin password
kubectl -n argocd get secret argocd-initial-admin-secret \
  -o jsonpath="{.data.password}" | base64 --decode
echo  # Add newline after the password
```

> **Login credentials:**
> - Username: `admin`
> - Password: *(output of the command above)*

### Create an ArgoCD Application

Once logged in, create an Application that points to your Git repo:

```yaml
# argocd-app.yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: my-app
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/<your-username>/<your-repo>
    targetRevision: HEAD
    path: k8s
  destination:
    server: https://kubernetes.default.svc
    namespace: default
  syncPolicy:
    automated:
      prune: true        # Remove resources deleted from Git
      selfHeal: true     # Auto-fix manual cluster changes
```

```bash
kubectl apply -f argocd-app.yaml
```

> 🔁 **Now every `git push` to your repo automatically deploys to your cluster!**

---

## 📊 Monitoring — Prometheus & Grafana

The `kube-prometheus-stack` Helm chart installs a full observability suite: Prometheus for metrics collection, Grafana for dashboards, and Alertmanager for alerts — all pre-configured to scrape your cluster.

### Install the Stack

```bash
# Add the Prometheus Helm chart repository
helm repo add prometheus-community \
  https://prometheus-community.github.io/helm-charts

# Update Helm repos
helm repo update

# Install the full monitoring stack into your cluster
helm install monitoring prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --create-namespace

# Check that all monitoring pods are running
kubectl get pods -n monitoring
```

### Access Grafana

```bash
# Forward Grafana to your local port 3000
kubectl port-forward svc/monitoring-grafana -n monitoring 3000:80
```

Open in browser: **http://localhost:3000**

| Field | Value |
|-------|-------|
| Username | `admin` |
| Password | `prom-operator` *(default)* |

### What You Get Out of the Box

| Dashboard | What It Shows |
|-----------|--------------|
| 📊 Cluster Overview | Node CPU, memory, disk usage |
| 🐳 Pod Metrics | Per-pod resource consumption |
| ☸️ Kubernetes API | API server latency and request rates |
| 🌐 Network I/O | Bytes in/out per namespace and pod |
| 🚨 Alerting | Pre-built alerts for common failure patterns |

> 💡 **Tip:** Prometheus also exposes its own UI at port `9090`. Forward it with:
> ```bash
> kubectl port-forward svc/monitoring-kube-prometheus-prometheus -n monitoring 9090:9090
> ```

---

## 🔍 Network Debugging — Kubeshark

Kubeshark is like **Wireshark for Kubernetes** — it gives you real-time, packet-level visibility into all traffic flowing inside your cluster, with a beautiful web UI.

### Install Kubeshark

```bash
# macOS
brew install kubeshark

# Linux
curl -Lo kubeshark https://github.com/kubeshark/kubeshark/releases/latest/download/kubeshark_linux_amd64
chmod +x kubeshark && sudo mv kubeshark /usr/local/bin/
```

### Start Capturing Traffic

```bash
# Tap all pods in the default namespace
kubeshark tap

# Tap a specific pod
kubeshark tap <pod-name>

# Tap all pods matching a label
kubeshark tap -l app=backend
```

Open in browser: **http://localhost:8899**

### Use Cases

| Scenario | How Kubeshark Helps |
|----------|---------------------|
| 🐛 Debugging API failures | See exact HTTP requests/responses between pods |
| 🔐 Security audits | Identify unexpected external connections |
| 📈 Performance analysis | Spot slow database queries or high-latency calls |
| 🔌 Service mesh-free visibility | No Istio/Linkerd needed for traffic insight |

---

## ⚠️ Common Issues & Fixes

### ❌ Database Authentication Error

**Symptom:** Backend pod crashes with `password authentication failed for user "postgres"`

**Root Cause:** Mismatch between the password set in the backend deployment and the PostgreSQL StatefulSet.

**Fix:** Ensure both values are identical:

```yaml
# In k8s/backend.yaml — your backend env var:
env:
  - name: DB_PASSWORD
    value: "password"    # ← must match exactly ↓

# In k8s/postgres.yaml — your PostgreSQL env var:
env:
  - name: POSTGRES_PASSWORD
    value: "password"    # ← must match exactly ↑
```

> 🔒 **Best Practice:** Never hardcode passwords in YAML. Use Kubernetes Secrets:
> ```bash
> kubectl create secret generic db-secret --from-literal=password=mysecretpass
> ```
> Then reference it in your deployment with `valueFrom.secretKeyRef`.

---

### ❌ Terraform Destroy Fails (Load Balancer Still Exists)

**Symptom:** `terraform destroy` hangs or errors on VPC deletion because an AWS Load Balancer created by Kubernetes still exists.

**Root Cause:** When you deploy a Kubernetes `Service` of type `LoadBalancer`, AWS creates an ELB. Terraform doesn't know about it, so it can't delete it before destroying the VPC.

**Fix — Manual Cleanup First:**

```bash
# Step 1: List all load balancers to find the one created by your cluster
aws elb describe-load-balancers \
  --query "LoadBalancerDescriptions[*].[LoadBalancerName,DNSName]" \
  --output table

# Step 2: Delete the load balancer
aws elb delete-load-balancer --load-balancer-name <name>

# (For ALBs / newer ELBv2 load balancers, use:)
aws elbv2 describe-load-balancers
aws elbv2 delete-load-balancer --load-balancer-arn <arn>

# Step 3: Now run Terraform destroy
terraform destroy -auto-approve
```

> 💡 **Pro Tip:** To avoid this in the future, delete your Kubernetes LoadBalancer services *before* running `terraform destroy`. This triggers AWS to delete the ELB automatically.
> ```bash
> kubectl delete svc <your-loadbalancer-service-name>
> # Wait ~1–2 minutes, then run terraform destroy
> ```

---

### ❌ ErrImageNeverPull / ImagePullBackOff

**Symptom:** Pods stuck in `ErrImageNeverPull` or `ImagePullBackOff` state.

**Fix:**
```bash
# Check what image is being pulled
kubectl describe pod <pod-name> | grep Image

# Ensure the image is pushed to Docker Hub (or your registry)
docker push <your-dockerhub-username>/backend:latest

# If using Minikube: load image directly into Minikube's Docker daemon
minikube image load <your-dockerhub-username>/backend:latest

# Then restart the deployment
kubectl rollout restart deployment/backend
```

---

### ❌ kubectl port-forward Connection Refused

**Symptom:** `curl localhost:8080` returns "connection refused" after port-forwarding.

**Fix:**
```bash
# Make sure the pod is Running first
kubectl get pods

# Check the correct service name
kubectl get svc -n <namespace>

# Re-run port-forward with correct namespace
kubectl port-forward svc/<service-name> -n <namespace> <local-port>:<service-port>

# Open a new terminal tab for the curl — port-forward blocks the terminal it's running in
```

---

## 🧹 Cleanup

When you're done, **always destroy your infrastructure** to avoid ongoing AWS costs.

```bash
# Step 1: Delete K8s LoadBalancer services first (to auto-delete ELBs)
kubectl delete svc <your-loadbalancer-service>
# Wait 1-2 minutes for AWS to delete the ELB

# Step 2: Destroy all Terraform-managed infrastructure
cd terraform/
terraform destroy -auto-approve

# Step 3: Verify nothing is left behind in AWS
aws eks list-clusters
aws ec2 describe-instances --query "Reservations[*].Instances[*].InstanceId"

# Step 4: Optionally remove local kubeconfig context
kubectl config delete-context <your-eks-context>
```

> ⚠️ **IMPORTANT:** Forgetting to destroy infrastructure is the #1 way to rack up unexpected AWS bills. Double-check your EC2 console after destroying.

---

## 📁 Project Structure

```
project/
│
├── 🐳 backend/
│   ├── Dockerfile              # Multi-stage Docker build
│   ├── requirements.txt        # Python dependencies (if Django/Flask)
│   └── src/                    # Application source code
│
├── 🌐 frontend/
│   ├── Dockerfile              # Nginx-based production image
│   ├── package.json
│   └── src/                    # React/Next.js source
│
├── ☸️ k8s/
│   ├── backend.yaml            # Deployment + Service for backend
│   ├── frontend.yaml           # Deployment + Service for frontend
│   ├── postgres.yaml           # StatefulSet + PVC for PostgreSQL
│   ├── ingress.yaml            # Ingress rules (if using Nginx Ingress)
│   └── secrets.yaml            # K8s Secrets (gitignored!)
│
├── 🌍 terraform/
│   ├── main.tf                 # Core EKS + VPC resources
│   ├── variables.tf            # Input variables
│   ├── outputs.tf              # Output values (cluster name, endpoint)
│   └── terraform.tfvars        # Variable values (gitignored!)
│
└── 📄 README.md
```

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

```bash
# Fork the repo, then:
git checkout -b feature/your-feature-name
git commit -m "feat: add your feature"
git push origin feature/your-feature-name
# Open a Pull Request on GitHub
```

---

<div align="center">

**Built with ☕ and a lot of `kubectl describe pod` sessions**

⭐ **Star this repo if it helped you!** ⭐

</div>
