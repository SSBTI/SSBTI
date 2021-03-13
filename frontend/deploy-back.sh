docker build -t jhw2621/ssbti:latest .
docker login -u ${dockerhubID} -p ${dockerhubPW}
docker push jhw2621/ssbti:latest

kubectl apply -f ssbti.yaml