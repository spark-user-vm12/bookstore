pipeline {
   
    agent {
        label "master"
    }

    stages{
        stage('Build') {
            steps {
                sh "docker login 10.0.0.5:8888 -u admin -p admin123"
                sh "docker build -t localhost:8888/eventmanager:$BUILD_NUMBER ."
                sh "docker push 10.0.0.5:8888/eventmanager:$BUILD_NUMBER"

            }
        }
    }
}