pipeline {
    agent any
    environment {
        DOCKER_IMAGE = "satish1990/frontend-reactjs"
    }
    stages {
        stage('vcs') {
            steps   {
            git url:"https://github.com/satishnamgadda/Frontend-reactJS.git",
                branch: "main"
            }
        }   
        stage('build') {
            steps {
                sh 'docker build -t ${DOCKER_IMAGE}:${BUILD_NUMBER} .'
            }
        }
        stage('push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker_cred', 
                                 usernameVariable: 'USERNAME', 
                                 passwordVariable: 'PASSWORD')]) {
                sh 'docker login -u $USERNAME -p $PASSWORD'
                sh 'docker push ${DOCKER_IMAGE}:${BUILD_NUMBER}'
                }
            }    
        }
    }   
}