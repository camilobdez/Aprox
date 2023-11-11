from flask import Flask, request, jsonify
from flask_cors import CORS
from methods.bisection import my_bisection
from methods.false_position import my_false_position
from methods.fixed_point import my_fixed_point

app = Flask(__name__)
CORS(app)  # Enable CORS

@app.route('/bisection', methods=['POST'])
def bisection():
    data = request.get_json()
    f = data['funct']
    a = float(data['a'])
    b = float(data['b'])
    tol = float(data['tolerance'])
    max_it = float(data['maxIterations'])
    result = my_bisection(f, a, b, tol, max_it)
    return jsonify({'result': result})

@app.route('/falseposition', methods=['POST'])
def falseposition():
    data = request.get_json()
    f = data['funct']
    a = float(data['a'])
    b = float(data['b'])
    tol = float(data['tolerance'])
    max_it = float(data['maxIterations'])
    result = my_false_position(f, a, b, tol, max_it)
    return jsonify({'result': result})

@app.route('/fixedpoint', methods=['POST'])
def fixedpoint():
    data = request.get_json()
    f = data['funct']
    g = data['gunct']
    x0 = float(data['x0'])
    tol = float(data['tolerance'])
    max_it = float(data['maxIterations'])
    result = my_fixed_point(f, g, x0, tol, max_it)
    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True)
