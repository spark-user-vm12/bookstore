pipeline {
   
    agent host01

    stages{
        stage('Build') {
            steps {
                sh Docker login 10.0.0.5:8888 -u admin -p admin123
                sh Docker build .
                sn Docker Push

            }
        }
    }
}