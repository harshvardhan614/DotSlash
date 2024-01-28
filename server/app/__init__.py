from flask import Flask, jsonify, request, session, redirect, url_for, render_template
from flask_cors import CORS
from flask_pymongo import PyMongo
from pymongo import MongoClient
from pymongo.server_api import ServerApi
# from .models import Teacher, Student, Class_, Subject
from bson import ObjectId
from openai import OpenAI
import os
import speech_recognition as sr
import azure.cognitiveservices.speech as speechsdk
from io import BytesIO
import subprocess
from datetime import datetime


app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*", "supports_credentials": True, "expose_headers": "Set-Cookie"}})

# Your MongoDB connection setup
uri = "mongodb+srv://ui20cs61:Sachet123@cluster0.pl1zog4.mongodb.net/db?retryWrites=true&w=majority"
app.config["MONGO_URI"] = uri
app.config["SECRET_KEY"] = "93f9b1c66ebed8edb26c18a4af41f65c1f7131df0878a497460e39dbca2c69c7"
app.config['SESSION_COOKIE_SECURE'] = True
app.config['SESSION_DEBUG'] = True
app.config['UPLOAD_FOLDER'] = 'static/uploads'



mongo = PyMongo(app)
print(mongo)

client = MongoClient(uri, server_api=ServerApi('1'))


try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)




from .routes import *


