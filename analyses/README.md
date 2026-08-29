# Scripts to perform behavioural analysis

### Content
- ```eda.ipynb``` – Jupyter notebook to generate plots and perform an exploratory data analysis
- ```outlier_detection.ipynb``` – Jupyter notebook to find outlier trials. It generates a file called ```processed_experiment_data.ipynb``` without outlier trials which is used for the behavioural analysis
- ```influential_observations.R``` – R script with helper functions used to identify influential observations and participants in the mixed-effects models. 
- ```decision_making_analysis.R``` – R script with mixed-effects models to analyse if the gamble's attributes are correlated with choice reaction times. The script also contains log-odds ratio analyses and mixed-effects model diagnostics 
- ```central_tendency_analysis.R``` – R script with mixed-effects models to analyse the central-tendency bias and whether it differs by experiment condition
- ```time_perception_analysis.R``` – R script with mixed-effects models to analyse whether the participants' subjective time was modulated or not. The script also contains mixed-effects model dignostics

### Set-up

To run the notebook analyses, create a virtual environment and install the required Python packages:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install -r .\analyses\requirements.txt
```


> **Note:** Before running the ```eda.ipynb``` notebook, you will need to run the script ```time_perception_analysis.R``` inside this directory. To run the R scripts inside this directory, you will need to install [R (version 4.4.2)](https://cran.r-project.org/bin/windows/base/old/)
