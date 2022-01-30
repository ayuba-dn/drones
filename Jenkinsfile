pipeline {
  agent any
    
    stages {
        //  stage('Deploy mongodb ') {
        //     steps {    
        //                   sh 'pwd'
        //                   sh 'cp -R helm-deployment/* .'
		    //               sh 'ls -ltr'
        //                   sh 'pwd'
        //                   sh '/usr/local/bin/helm upgrade --install mongodb ./mongodb'
        //     }           
        // }

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
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
                         customImage.push()
                    }                     
               }
            }
	    }


      stage('Push to k8 ') {
            steps {    
                       script{
                          docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
                          sh 'pwd'
                          sh 'cp -R helm-deployment/* .'
		                  sh 'ls -ltr'
                          sh 'pwd'
                          sh "/usr/local/bin/helm upgrade --install drones-app .  --set image.repository=registry.hub.docker.com/computer14/drones"
                        }          
                       }   
                       
            }           
        }
   
}
}