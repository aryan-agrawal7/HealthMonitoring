# app.py
from flask import Flask, render_template, jsonify
import pandas as pd
import os

app = Flask(__name__)

# Function to read and process the CSV file
def get_floor_data():
    # Read the CSV file
    df = pd.read_csv('floordetails.csv')
    
    # Group by floor
    floors_data = {}
    for floor in df['floor'].unique():
        floor_df = df[df['floor'] == floor]
        
        rooms = []
        for _, row in floor_df.iterrows():
            room = {
                'roomno': row['roomno'],
                'occupied': bool(row['occupied']),
                'patientNo': row['PatientNo'] if row['occupied'] else None
            }
            rooms.append(room)
        
        # Calculate statistics
        occupied_count = floor_df['occupied'].sum()
        total_rooms = len(floor_df)
        available_count = total_rooms - occupied_count
        
        floors_data[str(floor)] = {
            'rooms': rooms,
            'stats': {
                'occupied': int(occupied_count),
                'available': int(available_count),
                'total': total_rooms
            }
        }
    
    return floors_data

@app.route('/')
def home():
    return render_template('/html/homepage.html')

@app.route('/api/floors', methods=['GET'])
def get_floors():
    try:
        floors_data = get_floor_data()
        return jsonify(floors_data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)