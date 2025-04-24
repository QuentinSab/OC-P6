# OC-P6

This project is a web-based user interface for viewing a ranking of interesting films from a local API.

## Requirements

- A recent web browser that supports :
    - HTML5
    - CSS3
    - JavaScript (ES8+)

## Setup

### 1. Clone the project repository

Open your terminal and clone the project repository using the following command:

    git clone https://github.com/QuentinSab/OC-P6.git

### 2. Clone the API repository

Use the following command to clone the API repository:

    git clone https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR.git

Change directory with:

    cd OCMovies-API-EN-FR

### 3. Create a virtual environment

To create a virtual environment for the API, use:

On Windows:

    python -m venv env

On macOS/Linux:

    python3 -m venv env

### 4. Activate the virtual environment

To activate the virtual environment, use:

On Windows:

    env\Scripts\activate

On macOS/Linux:

    source env/bin/activate

### 5. Install dependencies

With the virtual environment activated, install the required packages listed in requirements.txt using the following command:

    pip install -r requirements.txt

### 6. Create the database

Create and populate the database with:

    python manage.py create_db

## Usage

### 1. Activate the virtual environment

If the virtual environment is not already activated, use in the "OCMovies-API-EN-FR" directory this command:

On Windows:

    env\Scripts\activate

On macOS/Linux:

    source env/bin/activate

### 2. Start the server

To launch the server use:

    python manage.py runserver

### 3. Open the web interface

Open the file "index.html" in the directory "OC-P6"
