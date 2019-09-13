#!/usr/bin/groovy

library identifier: "pipeline-library@master",
retriever: modernSCM(
  [
    $class: "GitSCMSource",
    remote: "https://github.com/redhat-cop/pipeline-library.git"
  ]
)
library identifier: "gsos-pipeline-library@v1.2.2",
retriever: modernSCM(
  [
    $class: "GitSCMSource",
    remote: "ssh://git@gitlab.agilesof.com/gsos-dev/pipeline-library.git",
    credentialsId: 'calendar-ci-cd-gitlab-secret'
  ]
)

openshift.withCluster() {

  env.NAMESPACE = openshift.project()
  env.APP_NAME = "calendar-fe"
  env.APP_VERSION = "1.0.0"
  env.BUILD = "${env.NAMESPACE}"
  env.DEV = env.BUILD.replace('ci-cd', 'dev')
  env.BUILD_OUTPUT_DIR = "dist/" 
  env.BASE_IMAGE = "apache-ubi:latest" 

  echo "Starting Pipeline for ${APP_NAME}..."

}

pipeline {
  agent {
    label 'jenkins-slave-npm'
  }

  stages {
    stage('Build'){
      steps{
        sh 'npm config set "@fortawesome:registry" https://npm.fontawesome.com/'
        sh 'npm config set "//npm.fontawesome.com/:_authToken" 540769AC-7BF3-4890-B35D-DBBA2CA9F2BC'
        sh "npm install @vue/cli"
        sh "npm install && npm run build"
        sh "cp -R httpd-cfg ${BUILD_OUTPUT_DIR}"
      }
    }

    //stage('Unit Test') {
    //  steps {
    //    sh "npm run test:unit"
    //  }
    //}

    stage('build runtime'){
      steps {
        binaryBuild(projectName: env.DEV, buildConfigName: env.APP_NAME, artifactsDirectoryName: "${env.BUILD_OUTPUT_DIR}");
      }
    }


    stage ('Tag recently built image as Latest') {
      steps {
        tagImage(sourceImageName: env.APP_NAME , sourceImagePath: env.DEV, toImagePath: env.DEV)
      }
    }

    stage ('Verify Deployment to Dev') {
      steps {
        verifyDeployment(projectName: env.DEV, targetApp: env.APP_NAME)
      }
    }
  }
}
