# 동작 확인
### docker image 생성
$ docker build -t musinsa-test .

### minikube가 local docker iamge를 가져올 수 있도록 변경(터미널 세션당 1회성)
$ eval $(minikube -p minikube docker-env)

### .env.secret 파일 생성후 aws access 정보 입력
$ touch .env.secret
```
AWS_ACCESS_KEY=
AWS_SECRET_ACCESS_KEY=
```
### k8s secret 추가
$ kubectl apply -k .
$ kubectl apply -f k8s-manifest.yaml

### deployment, service 구성
### 생성된 aws-secret-{val} 값을 k8s-deployment.yaml 에 수정
```
spec:
      containers:
      - image: musinsa-test:latest
        name: musinsa-test
        envFrom:
        - secretRef:
            name: aws-secret-{val}
```
$ kubectl apply -f k8s-deployment.yaml

$ kubectl apply -f k8s-service.yaml

### 서비스 확인
$ kubectl port-forward service/musinsa-test 3000:8080


----

참고 자료
aws-sdk에서 iam만 사용
생성일 기준 users 조회
https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/iam/
https://medium.com/@NickHystax/3-easy-steps-to-find-all-inactive-users-in-your-aws-account-for-access-management-and-security-5490f012d294

Dockerfile
https://kawther-asma.medium.com/optimizing-dockerfiles-made-easy-for-nestjs-applications-01bf2f2565c2

minikube 로컬 이미지 사용
https://baeji77.github.io/dev/infra/kubernetes/use-local-docker-image-in-kubernetes/
https://kubernetes.io/docs/concepts/containers/images/#updating-images

k8s 구성
https://waspro.tistory.com/520
https://kubernetes.io/docs/tasks/configmap-secret/managing-secret-using-kustomize/