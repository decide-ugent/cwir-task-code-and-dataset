## CWIR task experiment appplication code
This directory contains the Flask application used to run the CWIR task experiment.

These instructions run the app using Flask’s development server. If you plan to deploy this as a behavioural experiment for participants, run it behind a [production WSGI server](https://flask.palletsprojects.com/en/stable/deploying/) instead and configure your database and hosting appropriately.

### Requirements
1) Create a virtual environment for python >=3.10 using your favourite tool.
2) In this directory (`./application`), install packages and requirements running the following command:
   
   `pip install -r requirements_cwir_app.txt`

   > **Note:** The codes to reproduce the analyses use a separate Python environment with different dependencies. You can find the analysis scripts and instructions for reproducing the results in `./analyses`.

4) Activate the environment

### Run the application locally
1) In this directory (`./application`), run the following command:

   `python src/__init__.py`

2) Then open your browser (Firefox or Chrome) and copy paste the following link: 

   `http://127.0.0.1:5000`

