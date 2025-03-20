from flask import Flask, render_template, jsonify
import random

app = Flask(__name__)

# Simulated patient data
def generate_patient_data():
    return [
        {
            "id": i,
            "name": f"Patient {i}",
            "heart_rate": random.randint(60, 120),
            "spo2": random.randint(85, 100),
            "temperature": round(random.uniform(36.0, 39.0), 1),
            "medication": {
                "name": "Paracetamol",
                "taken": random.randint(0, 3),
                "total": 3
            },
            "alert": random.choice([True, False])
        } for i in range(1, 11)
    ]

data = generate_patient_data()

@app.route('/')
def index():
    return render_template('html/dashboard.html')

@app.route('/api/patients')
def get_patients():
    return jsonify(data)

@app.route('/api/patient/<int:patient_id>')
def get_patient(patient_id):
    patient = next((p for p in data if p['id'] == patient_id), None)
    return jsonify(patient) if patient else (jsonify({"error": "Not found"}), 404)

if __name__ == '__main__':
    app.run(debug=True)
from flask import Flask, render_template, jsonify
import random

app = Flask(__name__)

# Simulated patient data
def generate_patient_data():
    return [
        {
            "id": i,
            "name": f"Patient {i}",
            "heart_rate": random.randint(60, 120),
            "spo2": random.randint(85, 100),
            "temperature": round(random.uniform(36.0, 39.0), 1),
            "medication": {
                "name": "Paracetamol",
                "taken": random.randint(0, 3),
                "total": 3
            },
            "alert": random.choice([True, False])
        } for i in range(1, 11)
    ]

data = generate_patient_data()

@app.route('/')
def index():
    return render_template('dashboard.html')

@app.route('/api/patients')
def get_patients():
    return jsonify(data)

@app.route('/api/patient/<int:patient_id>')
def get_patient(patient_id):
    patient = next((p for p in data if p['id'] == patient_id), None)
    return jsonify(patient) if patient else (jsonify({"error": "Not found"}), 404)

if __name__ == '__main__':
    app.run(debug=True)