# Challege Calculator -- Back End: Python

## Description
This is the server-side/back-end repository for the Challenge Calculator (see the client-side/front-end repo here: https://github.com/samueldmaus/challenge_calculator_frontend_react). The database is created with SQLAlchemy by using a db model. Database is PostgreSQL.

## Prerequisites
1. [Python](https://www.python.org/)
2. [PostgreSQL](https://www.postgresql.org/)

## Installation
1. Fork repository
2. Clone repository machine using terminal and 'git clone'
3. Run 'pip install -r requirements.txt' command to install requirements
4. Run 'export FLASK_APP=app.py' command to set app.py as the FLASK_APP
5. 'flask run' command to start the server

## Create Table from Database Model
1. Enter python by typing 'python' in terminal
2. Import db model from app using 'from app import db' command
3. Create db via 'db.create_all()' command
4. Table titled 'challenge_calculator' should be in db now

## Support
If you have issues or suggestions, please email me at samueldmaus@gmail.com