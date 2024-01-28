# from flask import jsonify
# from passlib.hash import pbkdf2_sha256
# from flask_pymongo import PyMongo


# class Student:
#     def __init__(self, user_name, password, class_name):
#         self.user_name = user_name
#         self.password = password
#         self.class_name = class_name

#     @staticmethod
#     def find_one(username, password, mongo):
#         student_collection = mongo.db.students
#         student_data = student_collection.find_one({"user_name": username})
#         if student_data:
#             return Student(
#                 user_name=student_data['user_name'],
#                 password=student_data['password'],
#                 class_name=student_data['class_name']
#             )
#         return None

#     def save_to_mongo(self, mongo):
#         student_data = {
#             "user_name": self.user_name,
#             "password": self.password,
#             "class_name": self.class_name
#         }
#         mongo.db.students.insert_one(student_data)
