# Quantum Game Web App  

This is a Django-based web application utilizing Qiskit for quantum game logic.  

## Setup Instructions  

### 1. Create a Virtual Environment  

#### macOS & Linux  
Open a terminal and run:  

```sh  
python3 -m venv env  
source env/bin/activate  
```  

#### Windows  
Open a command prompt (CMD or PowerShell) and run:  

```sh  
python -m venv env  
env\Scripts\activate  
```  

### 2. Install Required Packages  

Ensure you're in the project directory and the virtual environment is activated. Then run:  

```sh  
pip install -r requirements.txt  
```  

### 3. Run Database Migrations  

Apply migrations for the `game` app:  

```sh  
python manage.py makemigrations game  
python manage.py migrate game  
```  

Apply any other pending migrations:  

```sh  
python manage.py makemigrations  
python manage.py migrate  
```  

### 4. Run the Development Server  

```sh  
python manage.py runserver  
```  

### 5. Populate the database
#### Go follow this path and run the file: </br> 
/qgame/game/tests.py </br> 
_This will populate the levels in the database so that you may play them._

### 6. Change directory to 'quantum-checkers-ui', the frontend React directory

### 7. Run the following command to install all React packages

```sh  
npm i
```  

### 8. Go to the following page to access the game:
```sh
http://localhost:3000/test
```