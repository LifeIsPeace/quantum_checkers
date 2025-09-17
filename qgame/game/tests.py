import os
import sys
import json
import django
from django.core.exceptions import ValidationError


# NOTE:
# - MySQL database implementation must be done


# Add the project directory to the Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'qgame.settings')
django.setup()

# Import models
from game.models import *


def wipe_database_levels():
   """Deletes all existing levels from the database."""
   print("\n", "Wiping all levels from the database...")
   GameLevel.objects.all().delete()
   print("All levels have been deleted.", "\n")


def load_levels_from_json(directory="qgame/game/models/levels"):
   """Reads JSON level files and creates GameLevel objects."""
   print("Starting to populate levels from JSON files...")
   
   # Ensure the directory exists
   if not os.path.exists(directory):
      print(f"Directory '{directory}' not found.")
      return
   
   # Iterate through all JSON files in the directory
   for filename in sorted(os.listdir(directory)):
      if filename.endswith(".json"):
         filepath = os.path.join(directory, filename)
         try:
               with open(filepath, "r", encoding="utf-8") as file:
                  level_data = json.load(file)
               
               # Create GameLevel object
               GameLevel.objects.create(
                  level=level_data["level"],
                  circle11=level_data.get("circle11"),
                  circle12=level_data.get("circle12"),
                  circle21=level_data.get("circle21"),
                  circle22=level_data.get("circle22"),
                  circle23=level_data.get("circle23"),
                  circle31=level_data.get("circle31"),
                  circle32=level_data.get("circle32"),
                  circle33=level_data.get("circle33"),
                  gate_z=level_data.get("gate_z", False),
                  gate_h=level_data.get("gate_h", False),
                  gate_x=level_data.get("gate_x", False),
                  gate_cz=level_data.get("gate_cz", False),
                  gate_cx=level_data.get("gate_cx", False),
                  win_conditions=level_data.get("win_conditions", []),
                  perfectscore=level_data.get("perfectscore", 1),
               )
               
               print(f"Successfully added level {level_data['level']}")
         
         except (json.JSONDecodeError, KeyError, ValidationError) as e:
               print(f"❌ Error processing {filename}: {e}")
   
   print("All levels have been populated.")


if __name__ == "__main__":
   wipe_database_levels()
   load_levels_from_json()
