cd /home/ubuntu/field-team3/frontend
sudo echo $dockerhubID $dockerhubPW
sudo docker build -t jhw2621/ssbti:latest .
sudo docker login -u $dockerhubID -p $dockerhubPW
sudo docker push jhw2621/ssbti:latest

kubectl apply -f ssbti.yml
                          