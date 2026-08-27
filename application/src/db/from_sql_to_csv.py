import os
import pandas as pd
from sqlalchemy import create_engine

# Database connection configuration
user = 'your_username'
password = 'your_password'
host = 'localhost'
database = 'your_database_name'

# Create SQLAlchemy engine
engine = create_engine(f'mysql+mysqlconnector://{user}:{password}@{host}/{database}')
# Create dataset folder if it does not exist
output_dir = "dataset"
os.makedirs(output_dir, exist_ok=True)

#---------------------------------------------#

query = "SELECT * FROM experimentMetaData"
df = pd.read_sql(query, engine)
csv_file_path = os.path.join(output_dir, 'experiment_metadata.csv')
df.to_csv(csv_file_path, index=False)

#---------------------------------------------#

query = "SELECT * FROM experimentReproTaskMethod1Quest1Answers"
df = pd.read_sql(query, engine)
csv_file_path = os.path.join(output_dir, 'experiment_reprotaskmethod1quest1_answers.csv')
df.to_csv(csv_file_path, index=False)

#---------------------------------------------#

query = "SELECT * FROM practiceReproTaskMethod1Quest1Answers"
df = pd.read_sql(query, engine)
csv_file_path = os.path.join(output_dir, 'practice_reprotaskmethod1quest1_answers.csv')
df.to_csv(csv_file_path, index=False)

#---------------------------------------------#

query = "SELECT * FROM blockEndQuestionnaireAnswers"
df = pd.read_sql(query, engine)
csv_file_path = os.path.join(output_dir, 'block_end_questionnaire_answers.csv')
df.to_csv(csv_file_path, index=False)

#---------------------------------------------#

query = "SELECT * FROM finalQuestionnaireAnswers"
df = pd.read_sql(query, engine)
csv_file_path = os.path.join(output_dir, 'final_questionnaire_answers.csv')
df.to_csv(csv_file_path, index=False)

#---------------------------------------------#

query = "SELECT * FROM instructionsCompletionTimes"
df = pd.read_sql(query, engine)
csv_file_path = os.path.join(output_dir, 'instructions_completion_times.csv')
df.to_csv(csv_file_path, index=False)

#---------------------------------------------#

query = "SELECT * FROM breaksData"
df = pd.read_sql(query, engine)
csv_file_path = os.path.join(output_dir, 'breaks_data.csv')
df.to_csv(csv_file_path, index=False)

#---------------------------------------------#

query = "SELECT * FROM fullScreenMessages"
df = pd.read_sql(query, engine)
csv_file_path = os.path.join(output_dir, 'full_screen_messages.csv')
df.to_csv(csv_file_path, index=False)

#---------------------------------------------#

