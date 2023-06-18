# CodifyMe

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

\```sh
git clone https://github.com/username/repo.git
\```

2. Navigate to the `Backend` directory and start the Flask server:

\```sh
cd Backend
flask run
\```

3. Open a new terminal window, navigate to the `MyApp` directory, and install Node.js dependencies:

\```sh
cd ../MyApp
npm install
\```

4. Start the application with CLI:

\```sh
expo start
\```


## Project Structure

\```
.
├── Backend
│   ├── __pycache__
│   └── app.py
├── Crawling
│   ├── README.md
│   ├── crawling.py
│   ├── requirements.txt
│   └── utils.py
└── MyApp
    ├── App.js
    ├── app.json
    ├── assets
    ├── babel.config.js
    ├── components
    ├── node_modules
    ├── package-lock.json
    ├── package.json
    └── screens
\```
