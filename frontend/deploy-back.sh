sudo docker build -t jhw2621/ssbti:latest .
sudo docker login -u ${dockerhubID} -p ${dockerhubPW}
sudo docker push jhw2621/ssbti:latest

sudo kubectl apply -f ssbti.yaml