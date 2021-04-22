

# CI/CD 구성



## 젠킨스 서버 설정

- 배포용 설정 파일들의 경로
  - 배포 서버: /home/jenkins/commons
  - 젠킨스 서버: /var/jenkins_home/commons
- jenkins commons 폴더내 모든 파일을 위 경로에 복사한다.
- jenkins pipeline을 구축하는 과정은  Jenkins Pipeline.md를 참고하자.
- 각 서비스의 설정은 서비스 디렉토리(ex. commons/zuul)의 application.yml을 따른다.


## 우분투 서버의 배포 스크립트

- deploy 폴더 하위에 있는 모든 스크립트 파일들을 /home/ubuntu/CICD 디렉토리 내부에 복사한다.





