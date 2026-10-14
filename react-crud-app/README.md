# React CRUD App (Student Management System)

Frontend-only React (Vite) app with Add / Edit / Delete / Search. No CSS file (inline styles).

## Project structure
```
react-crud-app/
├── src/
│   ├── config.js    <-- EDIT THIS for any other system (title, fields, seed data)
│   ├── App.jsx      <-- generic CRUD + search logic (no change needed)
│   └── main.jsx
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── Dockerfile
├── .dockerignore
├── Jenkinsfile
└── README.md
```

## Run locally
```bash
npm ci
npm run dev          # http://localhost:5173
npm run build        # outputs dist/
```

## Change to another system (e.g. Library, Employee, Product)
Open `src/config.js` and change only `title`, `itemName`, `fields`, `seed`.
Field types: `text`, `number`, `email`, `date`, `select` (with `options: [...]`).

---

## Dockerfile
```dockerfile
FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

ENV APP_ENV=dev
EXPOSE 5173

CMD ["npm", "run", "preview"]
```

## Jenkins pipeline (Jenkinsfile)
```groovy
pipeline {
    agent any
    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/24104106-sketch/Devops-React-application.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                bat 'call npm ci'
            }
        }
        stage('Build React App') {
            steps {
                bat 'npm run build'
            }
        }
        stage('Archive dist') {
            steps {
                archiveArtifacts artifacts: 'dist/**'
            }
        }
    }
    post {
        success {
            echo 'React app built successfully'
        }
        failure {
            echo 'Failed to build react app!!'
        }
    }
}
```
Use `sh` instead of `bat` if the Jenkins agent is Linux.

---

## Docker commands
```bash
# 1. Navigate to project directory
cd path/to/react-todo-app

# 2. Build Docker image
docker build -t react-app .

# 3. List images
docker images

# 4. Run container with port mapping
docker run -d --name react-application -p 5173:5173 react-app

# 5. Verify running container
docker ps

# 6. Verify application
# Open http://localhost:5173

# 7. Check container logs
docker logs react-application

# 8. Configure environment variable
docker rm -f react-application
docker run -d --name react-application -p 5173:5173 -e APP_ENV=lab react-app

# 9. Verify environment variable
docker exec react-application printenv APP_ENV

# 10. Stop and remove container
docker stop react-application
docker rm react-application

# 11. Login to Docker Hub
docker login

# 12. Tag image (replace YOUR_DOCKERHUB_USERNAME)
docker tag react-app YOUR_DOCKERHUB_USERNAME/react-app:v1

# 13. Push image to Docker Hub
docker push YOUR_DOCKERHUB_USERNAME/react-app:v1

# 14. Pull image from Docker Hub
docker pull YOUR_DOCKERHUB_USERNAME/react-app:v1

# 15. Run the pulled image
docker run -d --name react-from-hub -p 5173:5173 YOUR_DOCKERHUB_USERNAME/react-app:v1

# 16. Verify
docker ps

# 17. Stop and remove final container
docker rm -f react-from-hub
```
