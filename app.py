from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import desc
from flask_cors import CORS

app = Flask(__name__, template_folder='./public')

CORS(app)

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
    def serialize(self):
        return {"id": self.id,
                "equation": self.equation,
                "answer": self.answer}

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
        data = Calculator(equation, answer)
        db.session.add(data)
        db.session.commit()
        return "success", 201
    # GET route to get equations from db
    elif request.method == 'GET':
        response = Calculator.query.order_by(Calculator.id.desc()).limit(10)
        output = []
        for item in response:
            currItem = {}
            currItem['id'] = item.id
            currItem['equation'] = item.equation
            currItem['answer'] = item.answer
            output.append(currItem)
        return jsonify(output)
        

if __name__ == '__main__':
    app.run()


#query.(Model).filter(something).limit(5).all() dets.from_self().order_by(db.B.date_lts.desc()).limit(300).all()