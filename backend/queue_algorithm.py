class Patient:
    def __init__(self, id, name, priority, appointment_time=None):
        self.id = id
        self.name = name
        self.priority = priority
        self.appointment_time = appointment_time
        self.check_in_time = None

class Queue:
    def __init__(self):
        self.patients = []

    def add_patient(self, patient):
        patient.check_in_time = datetime.now()
        self.patients.append(patient)
        self.patients.sort(key=lambda x: (x.priority, x.appointment_time or x.check_in_time))

    def next_patient(self):
        if self.patients:
            return self.patients.pop(0)
        return None

    def update_queue(self):
        current_time = datetime.now()
        self.patients = [p for p in self.patients if (p.appointment_time and p.appointment_time > current_time) or not p.appointment_time]
        self.patients.sort(key=lambda x: (x.priority, x.appointment_time or x.check_in_time))