# Quantum Game Web App  

This is a Django-based web application utilizing Qiskit for quantum game logic.  

## Setup Instructions  

### 1. Create a Virtual Environment  

#### macOS & Linux 

Run conda environment or Open a terminal and run:  

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

#### Ensure you're in the project directory and the virtual environment is activated. Then install the django packages by running:  

```sh  
pip install django
pip install djangorestframework
pip install django-cors-headers
pip install django-json-widget
pip install djangorestframework-simplejwt
```  

#### install requirement.txt 

```sh
pip install -r requirement.txt   
```

### 3. Create Local Database Entry

#### Go to /qgame/qgame/settings.py and in DATABASES, change 'NAME': BASE_DIR / 'db.sqlite3' to 'NAME': BASE_DIR / 'local_db.sqlite3'

```sh
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3' # <-- change this to 'local_db.sqlite3'
    }
}
```

#### then go to terminal and apply migrations to the database by running:

```sh
python manage.py migrate
```

#### create login info by running:
```sh
python manage.py createsuperuser
```
#### Then enter Username and Password for the login

### 4. Run the Development Server  

#### Go to qgame directory on terminal and run:

```sh  
python manage.py runserver  
```  

#### Apply migrations for the `game` app:  

```sh  
python manage.py makemigrations game  
python manage.py migrate game  
```  

#### Apply any other pending migrations:  

```sh  
python manage.py makemigrations  
python manage.py migrate  
```  

### 5. Populate the levels

#### Change directory to the project directory and run test.py in /qgame/game/tests.py: 
```sh
python qgame/game/tests.py
```
_This will populate the levels in the database so that you may play them._

### 6. Run the frontend React 

####  Change directory to 'quantum-checkers-ui' and Run the following command in the terminal to install all React packages

```sh  
npm i
```  
#### Then run the frontend

```sh
npm run start
```

### 7. Go to the following page to access the game:

```sh
http://127.0.0.1:8000/
```
