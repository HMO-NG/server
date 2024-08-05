# Start DB Only
```bash
docker compose -f docker/docker-compose.yaml up db -d
```

# Start Application
```bash
docker compose -f docker/docker-compose.yaml up -d
```

# Stop Application
```bash
docker compose -f docker/docker-compose.yaml down
```

# Test
```bash
curl localhost:8080/health
```

## Add Docker and git to usergroup
> NB after this command start a new terminal session (:
```bash
sudo groupadd docker
sudo usermod -aG docker SUSER
newgrp docker
sudo groupadd git
sudo usermod -aG git SUSER
newgrp git
```
   
### Configure ssl for local or vps 
```bash
vi /etc/hosts
```
Add this line
```console
127.0.0.1 hmo.web
```
NB if you want to change this local dns, edit the docker compose ssl-generator and change the CN at the last end
```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/nginx/certs/selfsigned.key -out /etc/nginx/certs/selfsigned.crt -subj '/CN=your local DNS'"

```

## Application Schema
> I've resolve the migration, do not need to manually trigger them, please follow the styling
to avoid the previous issues... ):

![schema](./img/hmo_app_schema.png)

