# Student Data Analysis Dashboard

## Project Overview

This project presents a comprehensive dashboard for analyzing student performance data. The dashboard is designed to help educators, administrators, and researchers gain actionable insights into student grades, performance trends, and potential areas for intervention. The project includes detailed reports in both English and Arabic, as well as interactive web pages for data exploration.

## Objectives

- Analyze student grading data to uncover patterns and trends.
- Apply statistical and machine learning techniques to predict and classify student performance.
- Identify anomalies and clusters within the dataset for targeted interventions.
- Provide an interactive dashboard for visualizing and exploring the results.

## Dataset

- **Source:** `data/Students_Grading_Dataset.csv`
- **Description:** The dataset contains anonymized records of student grades and related attributes. It includes features such as student IDs, demographic information, grades across multiple subjects, and other relevant academic indicators.

## Methodology

The analysis follows a structured data science workflow:

1. **Data Preprocessing:** Cleaning, normalization, and handling of missing values.
2. **Exploratory Data Analysis (EDA):** Visualization and statistical summaries to understand data distributions and relationships.
3. **Regression Analysis:** Predicting student grades using linear and non-linear regression models.
4. **Classification:** Categorizing students based on performance using algorithms such as decision trees and logistic regression.
5. **Clustering:** Grouping students with similar performance profiles using clustering techniques (e.g., K-means).
6. **Anomaly Detection:** Identifying students with unusual performance patterns for further investigation.

## Dashboard Features

- **Performance Dashboard (`pages/performance.html`):**
  - Visualizes overall student performance, grade distributions, and trends.
  - Interactive charts and filters for in-depth analysis.
- **Student Profiles (`pages/students.html`):**
  - Detailed view of individual student records and performance metrics.
- **Reports:**
  - English Report: `pages/report/index_en.html`
  - Arabic Report: `pages/report/index.html`

## Project Structure

- `data/` – Contains the dataset and the main project report (PDF).
- `pages/` – HTML pages for the dashboard, student profiles, and reports.
- `README.md` – Project documentation (this file).

## Credits

- **Authorship:** This project was developed by [Your Name/Team].
- **Supervision:** [Supervisor/Instructor Name, if applicable].
- **Acknowledgments:** Thanks to all contributors and data providers.

For more details, please refer to the full project report in `data/Project - DATA ANALYSIS .pdf` and the interactive reports in the `pages/report/` directory.
