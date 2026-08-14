# 🚀 Three-Tier To-Do Application on Kubernetes

A full-stack Three-Tier To-Do application deployed on an AWS EC2 instance using Docker and K3s Kubernetes.

## 📌 Project Overview

This project demonstrates the deployment of a complete three-tier application consisting of:

- React frontend
- Node.js + Express backend
- MongoDB database
- Nginx reverse proxy
- Docker containerization
- Kubernetes orchestration using K3s
- Persistent storage using PV/PVC
- Kubernetes Secrets
- AWS EC2

---

## 🏗️ Architecture

```text
                         👤 USER
                            |
                            v
                   🌐 AWS EC2 Public IP
                            |
                            | HTTP :80
                            v
                 +----------------------+
                 |   React Frontend     |
                 |       Nginx          |
                 |      Port 80         |
                 +----------+-----------+
                            |
                            | /api/*
                            v
                 +----------------------+
                 |   Node.js Backend     |
                 |      Express         |
                 |      Port 3500       |
                 +----------+-----------+
                            |
                            | MongoDB
                            | Port 27017
                            v
                 +----------------------+
                 |       MongoDB        |
                 |                      |
                 |      PV / PVC        |
                 +----------------------+

                         ☸️ K3s
                    Kubernetes Cluster
                         AWS EC2
