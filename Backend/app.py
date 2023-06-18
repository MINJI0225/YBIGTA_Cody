from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api/saveData', methods=['POST'])
def handle_post():
    data = request.get_json()
    # Now data is a dictionary with keys 'gender', 'sensitivity1', 'sensitivity2', 'style'
    # Do something with the data here...
    # Return a response
    print(data)
    return jsonify({'result': 'Success!'})
