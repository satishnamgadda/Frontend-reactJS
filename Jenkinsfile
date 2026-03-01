pipeline {
    agent any
    environment {
        DOCKER_IMAGE = "satish1990/frontend-reactjs"
    }
    stages {
        stage('vcs') {
            steps {
                git url: "https://github.com/satishnamgadda/Frontend-reactJS.git",
                    branch: "main"
            }
        }
        stage('sonarqube') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh """
                      ${tool 'SonarScanner'}/bin/sonar-scanner \
                      -Dsonar.projectKey=frontend-reactjs \
                      -Dsonar.projectName=Frontend-ReactJS \
                      -Dsonar.sources=.
                    """
                }
            }
        }
        stage('Quality Gate') {
            steps {
                timeout(time: 30, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
        stage('build') {
            steps {
                sh "docker build -t ${DOCKER_IMAGE}:${BUILD_NUMBER} ."
            }
        }
        stage('push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker_cred', 
                                 usernameVariable: 'USERNAME', 
                                 passwordVariable: 'PASSWORD')]) {
                    sh 'docker login -u $USERNAME -p $PASSWORD'
                    sh "docker push ${DOCKER_IMAGE}:${BUILD_NUMBER}"
                }
            }
        }
    }
}
