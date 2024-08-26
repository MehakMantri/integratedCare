from flask import Flask, request, jsonify
from queue_algorithm import Queue, Patient
from flask_cors import CORS 

app = Flask(__name__)
queue = Queue()
@app.route('/')
def home():
    return "Welcome to the IntegratedCare System!"

@app.route('/api/check-in', methods=['POST'])
def check_in():
    data = request.json
    patient = Patient(id=len(queue.patients) + 1, **data)
    queue.add_patient(patient)
    return jsonify({'message': 'Check-in successful'}), 201

@app.route('/api/queue', methods=['GET'])
def get_queue():
    return jsonify([vars(p) for p in queue.patients])

@app.route('/api/current-patient', methods=['GET'])
def get_current_patient():
    patient = queue.next_patient()
    return jsonify(vars(patient) if patient else None)

if __name__ == '__main__':
    app.run(debug=True)