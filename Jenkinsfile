pipeline {
   
    agent host01

    stages{
        stage('Build') {
            steps {
                sh "docker login 10.0.0.5:8888 -u admin -p admin123"
                sh "docker build -t 10.0.0.5:8888/eventmanager:$BUILD_NUMBER ."
                sn "docker push 10.0.0.5:8888/eventmanager:$BUILD_NUMBER"

            }
        }
    }
}