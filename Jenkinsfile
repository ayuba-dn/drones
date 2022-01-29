pipeline {
  agent any
    
    stages {      
        stage('Build Typescript to js') {
            steps { 
                    sh 'pwd'      
                    sh 'npm build'
            }
        }
        
         
        stage('Build docker Image') {
           steps {
               script {         
                    def customImage = docker.build('computer14/drones', ".")
                    withDockerRegistry([ credentialsId: "docker-hub-credentials", url: "" ])
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
                         customImage.push("${env.BUILD_NUMBER}")
                    }                     
               }
        }
	  }
   
}