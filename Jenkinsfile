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
        // }https://ayuba-dn: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@github.com/ayuba-dn/drones.git
     
      // stage('Build Typescript to js') {
      //       steps { 
      //               sh 'pwd'   
      //               sh 'npm install'   
      //               sh 'npm run build'
      //       }
      // }
        
         
      stage('Build docker Image') {
           steps {
               script {         
                    def customImage = docker.build('computer14/drones', ".")
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
                         customImage.push("${env.BUILD_NUMBER}")
                    }  
                    sh 'docker images'
                    sh "docker tag computer14/drones drones"
                   
               }
            }
	    }

      // stage('Run Tests') {
      //       steps { 
      //               echo 'Running Tests.....'
      //               sh 'docker run drones npm run test'     
      //               echo 'Tests Completed!' 
      //       }
      // }


      stage('Push to k8 ') {
            steps {    
                       script{
                          docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
                          sh 'pwd'
                          sh 'cp -R helm-deployment/* .'
		                  sh 'ls -ltr'
                          sh 'pwd'
                          sh "/usr/local/bin/helm upgrade --install drones-app .  --set image.repository=registry.hub.docker.com/computer14/drones --set image.tag=2.1"
                        }          
                       }   
                       
            }           
        }
   
}
}