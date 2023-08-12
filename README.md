# CodifyMe

## Last Update (August 12, 2023)
> Expo run modified (Refer to the [How to run](#how-to-run) section)

> Included [README.md](./Backend/README.md) for running Backend server
### TODO
1. Dockerize the Flask server
2. Run Flask server on independent host machine (using ngrok)
## Getting Started
### Prerequisites
아래의 dependency를 모두 설치해야 합니다. (아래 링크 참고)

추가되는 내용 있으면 업데이트 바랍니다

https://velog.io/@jisoolee11/%EC%95%B1-%EA%B0%9C%EB%B0%9C-%EC%A4%80%EB%B9%84-React-native-Expo-%EC%84%A4%EC%B9%98%ED%95%98%EA%B8%B0

- Node.js
- Python 3.6 or higher
- pip
- Flask
- Expo

### How to run
1. Clone the repository:

```sh
git clone https://github.com/username/repo.git
```

2. Download model checkpoint

```sh
./download.sh
```

3. Navigate to the `Backend` directory and start the Flask server:

```sh
cd Backend
flask run
```

4. Open a new terminal window, navigate to the `MyApp` directory, and install Node.js dependencies:

```sh
cd ../MyApp
npm install --force
```

5. Start the application with CLI:

```sh
./run.sh dev # When using localhost
```
or
```sh
./run.sh prod # When using remote ngrok server
```


## Project Structure

```
.
├── Backend
│   ├── __pycache__
│   ├── app.py
│   ├── files
│   ├── instance
│   ├── clo.csv
│   ├── codimap_list.json
│   ├── config.py
│   ├── model_wrapper.py
│   ├── model.py
│   └── utils.py
├── Crawling
│   ├── README.md
│   ├── crawling.py
│   ├── requirements.txt
│   ├── utils.py
│   └── run.sh
├── Modeling
│   ├── FashionModel
│   └── clo.json
├── MyApp
│   ├── App.js
│   ├── app.json
│   ├── assets
│   ├── babel.config.js
│   ├── components
│   ├── node_modules
│   ├── package-lock.json
│   ├── package.json
│   └── screens
├── API.md
├── .gitignore
├── download.sh
└── README.md

```

