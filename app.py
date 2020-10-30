from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import psycopg2
import psycopg2.extras

app = Flask(__name__, template_folder='./public')

ENV = 'dev'

if ENV == 'dev':
    app.debug = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://sammaus@localhost/calculator'
else:
    app.debug = False
    app.config['SQLALCHEMY_DATABASE_URI'] = ''

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Calculator(db.Model):
    __tablename__ = 'challenge_calculator'
    id = db.Column(db.Integer, primary_key = True)
    equation = db.Column(db.String(200))
    answer = db.Column(db.String(200))
    def __init__(self, equation, answer):
        self.equation = equation
        self.answer = answer

# switch function to determine what operation to run
def switchEquation(x, num1, num2):
    switcher = {
        '+':num1 + num2,
        '-':num1 - num2,
        'x':num1 * num2,
        '÷':num1 / num2
    }
    return switcher.get(x)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/equations', methods=['GET', 'POST'])
def equations():
    # POST route to add equation to db
    if request.method == 'POST':
        equation = request.json.get("equation")
        for i in range(len(equation)):
            if(equation[i] == '+') or (equation[i] == '-') or (equation[i] == 'x') or (equation[i] == '÷'):
                num1 = int(equation[0:i])
                num2 = int(equation[i+1:])
                answer = switchEquation(equation[i], num1, num2)
                print(num1, num2, answer)
        cur = conn.cursor()
        cur.execute("""INSERT INTO challenge_calculator (equation, answer)
        VALUES (%s, %s);""", [equation, answer])
        conn.commit()
        return "success", 201
    # GET route to get equations from db
    elif request.method == 'GET':
        cur = conn.cursor()
        cur.execute("SELECT * FROM challenge_calculator ORDER BY id DESC LIMIT 10")
        response = cur.fetchall()
        return jsonify(response)


if __name__ == '__main__':
    app.run()