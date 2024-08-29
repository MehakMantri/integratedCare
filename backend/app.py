import os
from flask import Flask, render_template, redirect, url_for, flash, request,abort,jsonify
from flask_wtf import CSRFProtect
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)
app.config['SECRET_KEY'] = 'mysecretkey'
csrf = CSRFProtect(app)
base_dir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(base_dir, 'data.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Models        
class Medicine(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    dosage = db.Column(db.String(50), nullable=False)
    frequency = db.Column(db.String(50), nullable=False)
    duration = db.Column(db.String(50), nullable=False)
    remarks = db.Column(db.String(200))
    patient_id = db.Column(db.Integer, db.ForeignKey('patient_profile.id'), nullable=False)

    def __init__(self, name, dosage, frequency, duration, remarks, patient_id):
        self.name = name
        self.dosage = dosage
        self.frequency = frequency
        self.duration = duration
        self.remarks = remarks
        self.patient_id = patient_id
        

class Patient_profile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text)
    gender = db.Column(db.Text)
    state = db.Column(db.Text)
    phn_no = db.Column(db.Integer)
    weight = db.Column(db.Integer)
    age = db.Column(db.Integer)
    blood_group = db.Column(db.Text)
    fathers_name = db.Column(db.Text)
    patient = db.relationship('Beddb', backref='patient_profile', lazy=True)
    medicines = db.relationship('Medicine', backref='patient_profile', lazy=True)  # Add this line

    def __init__(self, name, gender, state, phn_no, weight, age, blood_group, fathers_name):
        self.name = name
        self.gender = gender
        self.state = state
        self.phn_no = phn_no
        self.weight = weight
        self.age = age
        self.blood_group = blood_group
        self.fathers_name = fathers_name
        
class Patient_details(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text)
    gender = db.Column(db.Text)
    state = db.Column(db.Text)
    phn_no = db.Column(db.Integer)
    weight = db.Column(db.Integer)
    age = db.Column(db.Integer)
    blood_group = db.Column(db.Text)
    fathers_name = db.Column(db.Text)
    can_view_records = db.Column(db.Boolean, default=True, nullable=False, server_default='1')

    def __init__(self, name, gender, state, phn_no, weight, age, blood_group, fathers_name):
        self.name = name
        self.gender = gender
        self.state = state
        self.phn_no = phn_no
        self.weight = weight
        self.age = age
        self.blood_group = blood_group
        self.fathers_name = fathers_name


class Floordb(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    floor_count = db.Column(db.Integer, unique=True, nullable=False)
    beds = db.relationship('Beddb', backref='floordb')

    def __init__(self, floor_count):
        self.floor_count = floor_count

class Beddb(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    bed_number = db.Column(db.Integer, nullable=False)
    is_allotted = db.Column(db.Boolean, default=False, nullable=False, server_default='0')
    floor_id = db.Column(db.Integer, db.ForeignKey('floordb.id'), nullable=False)  # Ensure foreign key relationship is correct
    patient_id = db.Column(db.Integer, db.ForeignKey('patient_profile.id'))
    allotted_by = db.Column(db.String(100))

    def __init__(self, bed_number, floor_id, patient_id=None, allotted_by=None):
        self.bed_number = bed_number
        self.floor_id = floor_id
        self.patient_id = patient_id
        self.allotted_by = allotted_by


# Routes
@app.route('/')
def home():
    return render_template('home.html')

@app.route('/addpatient', methods=['GET', 'POST'])
def addpatient():
    if request.method == "POST":
        name = request.form.get('name')
        gender = request.form.get('gender')
        state = request.form.get('state')
        phn_no = request.form.get('phn_no')
        weight = request.form.get('weight')
        age = request.form.get('age')
        blood = request.form.get('blood')
        f_name = request.form.get('f_name')
        new_patient = Patient_details(name=name, gender=gender, state=state, phn_no=phn_no, weight=weight, age=age, blood_group=blood, fathers_name=f_name)
        db.session.add(new_patient)
        db.session.commit()
        patient_profile = Patient_profile(name=name, gender=gender, state=state, phn_no=phn_no, weight=weight, age=age, blood_group=blood, fathers_name=f_name)
        db.session.add(patient_profile)
        db.session.commit()
        flash(f"{name} added successfully!")
        return redirect(url_for('addpatient'))
    return render_template('addpatient.html')

@app.route('/queue')
def queue():
    all_patients = Patient_details.query.filter_by(can_view_records=True).all()
    total_patients = len(all_patients)
    return render_template('queue.html', all_patients=all_patients, total_patients=total_patients)

@app.route('/delete_patient/<int:id>', methods=['POST'])
def delete_patient(id):
    patient = Patient_details.query.get_or_404(id)
    db.session.delete(patient)
    db.session.commit()
    flash(f"Patient {patient.name} deleted.")
    return redirect(url_for('queue'))

@app.route('/reschedule_patient/<int:id>', methods=['POST'])
def reschedule_patient(id):
    patient_to_reschedule = Patient_details.query.get_or_404(id)
    db.session.delete(patient_to_reschedule)
    db.session.commit()
    new_patient = Patient_details(
        name=patient_to_reschedule.name,
        gender=patient_to_reschedule.gender,
        state=patient_to_reschedule.state,
        phn_no=patient_to_reschedule.phn_no,
        weight=patient_to_reschedule.weight,
        age=patient_to_reschedule.age,
        blood_group=patient_to_reschedule.blood_group,
        fathers_name=patient_to_reschedule.fathers_name
    )
    db.session.add(new_patient)
    db.session.commit()
    flash(f"Patient {new_patient.name} has been rescheduled to the end of the queue.")
    return redirect(url_for('queue'))

@app.route('/mark_done/<int:id>', methods=['POST'])
def mark_done(id):
    patient = Patient_details.query.get_or_404(id)
    patient.can_view_records = False
    db.session.commit()
    flash(f"Patient {patient.name} marked as done.")
    return redirect(url_for('queue'))

@app.route('/bedinfo')
def bedinfo():
    # Get all floors
    floors = Floordb.query.all()
    # Fetch the floor_count parameter from the request, default to None if not provided
    floor_count_param = request.args.get('floor_count', type=int)  # To avoid confusion, renamed it to floor_count_param
    
    # Create a list to store information about each floor
    floor_data = []

    for floor in floors:
        # Get the total number of beds for each floor
        total_beds = Beddb.query.filter_by(floor_id=floor.id).count()
        # Get the number of allotted beds for each floor
        allotted_beds = Beddb.query.filter_by(floor_id=floor.id, is_allotted=True).count()
        # Get the number of non-allotted beds for each floor
        non_allotted_beds = total_beds - allotted_beds
        
        # Append data to floor_data list
        floor_data.append({
            'floor_count': floor.floor_count,  # Using floor_count attribute correctly
            'total_beds': total_beds,
            'allotted_beds': allotted_beds,
            'non_allotted_beds': non_allotted_beds
        })
    
    # Fetch non-allotted beds across all floors if needed for further processing
    non_allotted_beds_all_floors = Beddb.query.filter_by(is_allotted=False).all()

    # Render the template with the collected data
    return render_template(
        'beds.html', 
        floor_count=floor_count_param, 
        floors=floor_data, 
        floor_data=floor_data,  # Pass the calculated data for each floor
        non_allotted_beds=non_allotted_beds_all_floors
    )


@app.route('/floorinfo', methods=['GET', 'POST'])

def floorinfo():
    # Check if floors already exist in the database
    existing_floors = Floordb.query.count()

    if existing_floors > 0:
        # Redirect to bed information page if floors already exist
        return redirect(url_for('bedinfo', floor_count=existing_floors))

    if request.method == "POST":
        floor_input = request.form.get('floor')
        # Ensure the input is a valid numeric string
        if floor_input and floor_input.isnumeric():
            floor_input = int(floor_input)
            # Add floors to the database
            for data in range(1, floor_input + 1):
                # Check if floor already exists to avoid duplicates
                if not Floordb.query.filter_by(floor_count=data).first():
                    floor_data = Floordb(floor_count=data)
                    db.session.add(floor_data)
            db.session.commit()
            # Redirect to bed information page after adding floors
            return redirect(url_for('bedinfo', floor_count=floor_input))
        else:
            flash("Please enter a valid number of floors.", 'error')

    return render_template('floorinfo.html')


@app.route('/floor/<int:floor_number>', methods=['GET', 'POST'])
def floordata(floor_number):
    floor = Floordb.query.get_or_404(floor_number)
    bedcount = None
    if request.method == 'POST':
        bedcount = request.form.get('bedcount')
        if bedcount.isdigit():
            bedcount = int(bedcount)
            for i in range(1, bedcount + 1):
                bed_instance = Beddb(bed_number=i, floor_id=floor.id)
                db.session.add(bed_instance)
            db.session.commit()
            flash(f"{bedcount} beds added to floor {floor_number}.")
        else:
            flash("Invalid bed count. Please enter a number.")

    beds = Beddb.query.filter_by(floor_id=floor.id).all()
    return render_template('floordata.html', floor_number=floor_number, bedcount=bedcount, beds=beds)

@app.route('/manage_floors', methods=['GET', 'POST'])
def manage_floors():
    floors = Floordb.query.all()

    # If there are no floors yet, handle the addition of the first floor
    if not floors:
        if request.method == 'POST':
            floor_input = request.form.get('floor')
            if floor_input and floor_input.isdigit():
                floor_data = Floordb(floor_count=int(floor_input))
                db.session.add(floor_data)
                db.session.commit()
                flash(f"Floor {floor_input} added successfully!")
                return redirect(url_for('manage_floors'))
            else:
                flash("Please enter a valid floor number.")
        return render_template('add_first_floor.html')

    if request.method == 'POST':
        if 'add_floor' in request.form:
            floor_input = request.form.get('floor')
            if floor_input and floor_input.isdigit():
                floor_data = Floordb(floor_count=int(floor_input))
                db.session.add(floor_data)
                db.session.commit()
                flash(f"Floor {floor_input} added successfully!")
                return redirect(url_for('manage_floors'))
            else:
                flash("Please enter a valid floor number.")
        
        elif 'delete_floor' in request.form:
            floor_id = request.form.get('floor_id')
            if floor_id and floor_id.isdigit():
                floor_to_delete = Floordb.query.get(int(floor_id))
                if floor_to_delete:
                    # Unassign all beds associated with this floor
                    beds_to_unassign = Beddb.query.filter_by(floor_id=int(floor_id)).all()
                    for bed in beds_to_unassign:
                        bed.is_allotted = False
                        bed.patient_id = None
                        bed.allotted_by = None

                    db.session.delete(floor_to_delete)
                    db.session.commit()
                    flash(f"Floor {floor_to_delete.floor_count} deleted successfully!")
                    return redirect(url_for('manage_floors'))
                else:
                    flash("Floor not found.")
            else:
                flash("Please select a valid floor ID.")

    return render_template('manage_floors.html', floors=floors)


from flask import request, render_template
from math import ceil

@app.route('/view_all', methods=['GET', 'POST'])
def view_all():
    page = request.args.get('page', 1, type=int)
    per_page = 10  # Number of patients to display per page
    
    if request.method == 'POST':
        search_query = request.form.get('search_query')
        search_by = request.form.get('search_by')

        if search_by == 'id':
            query = Patient_profile.query.filter(Patient_profile.id == search_query)
        elif search_by == 'name':
            query = Patient_profile.query.filter(Patient_profile.name.ilike(f'%{search_query}%'))
        elif search_by == 'mobile':
            query = Patient_profile.query.filter(Patient_profile.mobile.ilike(f'%{search_query}%'))
        else:
            query = Patient_profile.query.order_by(Patient_profile.id.desc())
    else:
        query = Patient_profile.query.order_by(Patient_profile.id.desc())
    
    # Apply pagination to the query
    total = query.count()
    all_db = query.paginate(page=page, per_page=per_page, error_out=False)
    
    return render_template('all_users.html', all_db=all_db.items, page=page, total_pages=ceil(total / per_page))



@app.route('/profilepage/<int:id>', methods=['GET', 'POST'])
def profilepage(id):
    # Validate patient ID
    if id <= 0:
        abort(400, description="Invalid Patient ID")
    
    # Fetch the patient by ID
    patient = Patient_profile.query.get(id)
    
    # Handle case where patient is not found
    if patient is None:
        abort(404, description="No patient found with the given ID")

    # Render profile page with patient details
    return render_template('profilepage.html', patient=patient)

@app.route('/delete_patient_permanently/<int:id>', methods=['POST'])
def delete_patient_permanently(id):
    # Retrieve the patient profile or return a 404 if not found
    patient = Patient_profile.query.get_or_404(id)
    
    # Delete associated medicines
    Medicine.query.filter_by(patient_id=id).delete()
    
    # Free up the bed associated with the patient, if any
    bed = Beddb.query.filter_by(allotted_by=id).first()
    if bed:
        # Update the bed's status
        bed.is_allotted = False
        bed.patient_id = None
        bed.allotted_by = None
        db.session.add(bed)  # Ensure the bed update is added to the session

    # Delete the patient
    db.session.delete(patient)
    
    # Commit all changes to the database
    db.session.commit()
    
    flash(f"Patient {patient.name} and related records deleted successfully.", 'success')
    return redirect(url_for('view_all'))



@app.route('/make_appointment/<int:id>', methods=['POST'])
def make_appointment(id):
    patient_profile = Patient_profile.query.get_or_404(id)
    new_appointment = Patient_details(
        name=patient_profile.name,
        gender=patient_profile.gender,
        state=patient_profile.state,
        phn_no=patient_profile.phn_no,
        weight=patient_profile.weight,
        age=patient_profile.age,
        blood_group=patient_profile.blood_group,
        fathers_name=patient_profile.fathers_name
    )
    db.session.add(new_appointment)
    db.session.commit()
    flash(f"Appointment created for {patient_profile.name}.")
    return redirect(url_for('view_all'))

@app.route('/non_allotted_beds')
def non_allotted_beds():
    non_allotted_beds = Beddb.query.filter_by(is_allotted=False).all()
    return render_template('non_allotted_beds.html', beds=non_allotted_beds)

@app.route('/allot_bed/<int:bed_id>', methods=['POST'])
def allot_bed(bed_id):
    allotted_by_id = request.form.get('allotted_by')
    
    # Use db.session.get() for SQLAlchemy 2.0
    bed = db.session.get(Beddb, bed_id)
    
    if bed:
        if allotted_by_id:
            # Validate that allotted_by_id is a digit
            if allotted_by_id.isdigit():
                allotted_by_id = int(allotted_by_id)
                patient = db.session.get(Patient_profile, allotted_by_id)
                if patient:
                    existing_allotment = db.session.query(Beddb).filter_by(patient_id=allotted_by_id, is_allotted=True).first()
                    if existing_allotment:
                        flash('Patient ID is already allotted to another bed.', 'danger')
                    else:
                        bed.is_allotted = True
                        bed.patient_id = allotted_by_id
                        bed.allotted_by = patient.name
                        db.session.commit()
                        flash('Bed successfully allotted.', 'success')
                else:
                    flash('Patient ID does not exist.', 'danger')
            else:
                flash('Invalid patient ID. It must be an integer.', 'danger')
        else:
            flash('No patient ID provided.', 'danger')
    else:
        flash('Bed not found.', 'danger')
    
    return redirect(url_for('floordata', floor_number=bed.floor_id)) if bed else redirect(url_for('floordata', floor_number=0))


@app.route('/unallot_bed/<int:bed_id>', methods=['POST'])
def unallot_bed(bed_id):
    bed = db.session.get(Beddb, bed_id)
    
    if bed:
        if bed.is_allotted:
            bed.is_allotted = False
            bed.patient_id = None
            bed.allotted_by = None
            db.session.commit()
            flash('Bed successfully unallotted.', 'success')
        else:
            flash('Bed is not currently allotted.', 'warning')
    else:
        flash('Bed not found.', 'danger')
    
    return redirect(url_for('floordata', floor_number=bed.floor_id)) if bed else redirect(url_for('floordata', floor_number=0))

@app.route('/medicine_history/<int:id>', methods=['GET', 'POST'])
def medicine_history(id):
    # Fetch patient by ID
    patient = Patient_profile.query.get_or_404(id)
    
    # Fetch all medicines associated with the patient
    medicines = Medicine.query.filter_by(patient_id=id).all()
    
    return render_template('medicine_history.html', patient_id=id, patient=patient, medicines=medicines)


@app.route('/add_medicine_to_patient/<int:id>', methods=['POST'])
def add_medicine_to_patient(id):
    # Retrieve form data
    med_name = request.form.get('med_name')
    dosage = request.form.get('dosage')
    freq = request.form.get('freq')
    duration = request.form.get('duration')
    remarks = request.form.get('remarks')
    
    # Find the patient
    patient = Patient_profile.query.get(id)
    if not patient:
        flash('Patient not found', 'error')
        return redirect(url_for('view_all'))

    # Create a new medicine record
    medicine = Medicine(
        patient_id=id,
        name=med_name,
        dosage=dosage,
        frequency=freq,
        duration=duration,
        remarks=remarks
    )
    
    try:
        # Add and commit the new record to the database
        db.session.add(medicine)
        db.session.commit()
        flash('Medicine added successfully', 'success')
    except Exception as e:
        db.session.rollback()
        flash(f'Error: {str(e)}', 'error')
    
    
    # Redirect back to the patient's profile page
    return redirect(url_for('profilepage', id=id))

@app.route('/save_all_medicines/<int:id>', methods=['POST'])
def save_all_medicines(id):
    medicines = request.json
    # Find the patient
    patient = Patient_profile.query.get(id)
    if not patient:
        return jsonify({'success': False, 'message': 'Patient not found'}), 404

    try:
        # Create and add new medicine records
        for med in medicines:
            medicine = Medicine(
                patient_id=id,
                name=med['med_name'],
                dosage=med['dosage'],
                frequency=med['freq'],
                duration=med['duration'],
                remarks=med['remarks']
            )
            db.session.add(medicine)
        db.session.commit()
        return jsonify({'success': True}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'message': str(e)}), 500




@app.route('/add_medicine', methods=['GET', 'POST'])
def add_medicine():
    return render_template('add_medicine.html')  


if __name__ == "__main__":
    app.run(debug=True)
