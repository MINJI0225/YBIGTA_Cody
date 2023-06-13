from flask import Flask

app = Flask(__name__)

@app.route('/save')
def hello():
    print("Savebutton pressed!!!")
    return 'Hello, My First Flask!'
