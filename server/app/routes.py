from flask import jsonify, request, session
from app import app, mongo
from app.models import Teacher, Student, Class_, Subject

@app.route('/api/user/student/login', methods=['POST'])
def login_check_student():
    try:
        data = request.get_json()
        student = Student.find_one(data['user_name'], data['password'], mongo)

        if student:
            return jsonify({'message': 'Student Login successfully', 'class_name': student.class_name})
        else:
            return jsonify({'message': 'Student not found or invalid credentials'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Route to get class data
@app.route('/api/class_data', methods=['GET'])
def get_class_data():
    try:
        class_names = Class_.find_all(mongo)
        return jsonify([cls.__dict__ for cls in class_names])

    except Exception as e:
        return jsonify({'error': str(e)}), 500
