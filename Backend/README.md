# Running Flask Server

## Setup (Using Docker container)

1. **Setup the Backend**:
    ```sh
    cd Backend
    pip install -r requirements.txt
    ```

2. **Install Libraries**:
    ```sh
    apt-get install -y libgl1-mesa-glx libglib2.0-0
    ```

3. **Prepare Files**:
    ```sh
    cd ..
    ./download.sh
    cd Backend
    ```

4. **Run Flask**:
    - Locally:
        ```sh
        flask run
        ```
    - Deployment:
        ```sh
        flask run --host=0.0.0.0
        ```



## Backend Server Setup: Ngrok Tunneling on Linux

### 1. SSH Connection

- **Connect to Linux Server**:
    ```sh
    ssh sw@0.tcp.jp.ngrok.io -p 20782
    ```

- **VSCode SSH Config (Optional)**:
    1. Install the `Remote - SSH` extension in VSCode.
    2. Open SSH config with `Command + Shift + p` > `Remote-SSH: Open SSH Configuration File`.
    3. Input:
        ```
        Host YBIGTA
          HostName 0.tcp.jp.ngrok.io
          User sw
          Port 20782
        ```
    4. Connect via `Command + Shift + p` > `Remote-SSH: Connect to Host`.
    5. Bypass password: [Guide](https://doheejin.github.io/vscode/2021/02/25/vscode-server.html).

### 2. Ngrok Tunneling

> If tunneling is active, skip these steps.

1. **Locate Ngrok Config**:
    ```sh
    ngrok config check
    ```

2. **Update YML File**:
    ```yaml
    version: "2"
    authtoken: YOUR_AUTH_TOKEN
    tunnels:
      tcp_tunnel:
        proto: tcp
        addr: 22
        remote_addr: YOUR_REMOTE_ADDR
      http_tunnel:
        proto: http
        addr: 5000
    ```

3. **Start Ngrok**:
    ```sh
    ngrok start --all
    ```

4. **View Tunnel Info (Optional)**:
    ```sh
    curl http://localhost:4040/api/tunnels
    ```

5. Use the provided HTTP `public_url` for external localhost access.

## 3. Running a Web Server Inside a Docker Container
### 1. Starting the Docker Container

Run the following command to initiate the Docker container:
```sh
docker run --gpus all -it --ipc=host --net=host -v [HOST_PATH]:[CONTAINER_PATH] -v /etc/localtime:/etc/localtime:ro --name=[CONTAINER_NAME] pytorch/pytorch:latest
```

Example:
```sh
docker run --gpus all -it --ipc=host --net=host -v /home/sw/sw:/workspace/sw -v /etc/localtime:/etc/localtime:ro --name=cody pytorch/pytorch:latest
```

### 2. Attaching to an Existing Container
To reattach to the container at a later time, use:
```sh
docker exec -it [CONTAINER_NAME] bash
```

### 3. Run Flask Server Inside the Container
Refer to the [Setup (Using Docker container)](#setup-using-docker-container) section