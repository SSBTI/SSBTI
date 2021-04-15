# Jenkins Pipeline



Jenkins Pipeline을 사용해 자동 배포 사이클을 구축했다.

배포 사이클은 다음과 같다.

clone -> test -> build ->(staging -> release 는 생략) -> deploy



## SSH Credential 생성

deploy에서는 우분투 서버의 배포 스크립트를 실행시켜야 한다.

때문에 ssh 연결을 위한 Credential을 생성해야 한다.

![image-20210413112159589](C:\Users\multicampus\AppData\Roaming\Typora\typora-user-images\image-20210413112159589.png)



## Jenkins Pipeline 생성

1. 새로운 아이템 추가에서 Pipeline을 선택

   ![image-20210414001436051](C:\Users\multicampus\AppData\Roaming\Typora\typora-user-images\image-20210414001436051.png)

   

2. 빌드 트리거를 통해 언제 Pipeline을 실행시킬 지 설정한다

   ![image-20210414001735240](C:\Users\multicampus\AppData\Roaming\Typora\typora-user-images\image-20210414001735240.png)




## 스크립트 작성

Jenkins Pipeline을 작성하는 방법은 2가지가 있다.

1. 선언적 방식
2. 스크립트 방식

두 방법의 자세한 차이는 젠킨스 공식 문서를 참고하자.

다음은 스크립트 방식을 사용해 zuul 서비스를 우분투 서버에 배포하는 코드이다.

```groovy
node {
    //Step 1. checkout git
    stage('Clone') {
        git branch: 'master', changelog: false, credentialsId: 'gitlab', poll: false, url: 'https://lab.ssafy.com/s04-field/field-team3.git'
    }
    //Step 2. Build
    stage('Build Zuul') {
        sh """
            mkdir -p /var/jenkins_home/workspace/zuul/backend/zuul/src/main/resources
            cp /var/jenkins_home/common/zuul/application.yml /var/jenkins_home/workspace/zuul/backend/zuul/src/main/resources
            cd /var/jenkins_home/workspace/zuul/backend/zuul/
            chmod +x ./gradlew
            ./gradlew clean
            ./gradlew build
        """
    }
    //Step 3. Deploy
    stage("SSH deploy") {
        withCredentials([sshUserPrivateKey(credentialsId: 'ec2-ubuntu-server', keyFileVariable: 'identity', passphraseVariable: '', usernameVariable: 'userName')]) {
            def remote = [:]
            remote.name = "ubuntu"
            remote.host = "j4f003.p.ssafy.io"
            remote.allowAnyHosts = true
            remote.user = "ubuntu"
            remote.identityFile = identity
            sshCommand remote: remote, command: 'sh /home/ubuntu/CICD/deploy-zuul.sh'
        }
    }
}
```



이제 단계별로 살펴보자.

### Step 1

- 미리 설정한 Gitlab Credential을 통해 Gitlab에서 master 브랜치를 클론한다.

### Step 2

- 해당 서비스가 저장된 디렉토리로 이동 후 빌드한다.
- 이 때, 배포용 application.yml 을 복사해 resources 폴더 하위에 위치시킨다.
- gradle을 통해 빌드한다.

### Step 3

- ssh 연결을 통해 배포할 서버에 접속한다.
  - CredentialsId: 위 ssh credential에서 설정한 아이디
  - host: 배포할 서버의 주소
  - user: 배포할 서버의 사용자
- 배포할 서버에 저장된 스크립트를 실행한다



