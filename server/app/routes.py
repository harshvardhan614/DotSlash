import random
from flask import jsonify, request, session, render_template
from app import app, mongo
# from app.models import Teacher, Student, Class_, Subject
import speech_recognition as sr
import azure.cognitiveservices.speech as speechsdk
from io import BytesIO
#import librosa
#import soundfile as sf
import subprocess
from datetime import datetime
from openai import OpenAI
import os

client = OpenAI()

print(client)
completion = client.chat.completions.create(
  model="gpt-3.5-turbo",
  messages=[
    {"role": "system", "content": "You are an Interviewer's assistant, suggest the Interviewer 20 Technical Questions along with their deficulty level from Easy, Medium and Hard in JSON format based on the topic he gives you"},
    {"role": "user", "content": "Data Structures"}
  ]
)

print(completion.choices[0].message.content)

recognizer = sr.Recognizer()


def convert_webm_to_wav(input_file, output_file):
    clip = moviepy.VideoFileClip(input_file,)
    clip.audio.write_audiofile(output_file,ffmpeg_params=[
  
    '-vcodec', 'libvpx',
    '-keyint_min', '60',
    '-g', '60',
    '-vb', '4000k',
    '-f', 'webm',
    '-cluster_size_limit', '10M',
    '-cluster_time_limit', '2100',
    # 'out.wav'
])




@app.route("/transcribe", methods=["POST"])
def transcribe():
    if "audio" not in request.files:
        return jsonify({"error": "No audio file provided"})

    audio_file = request.files["audio"]
    # audio_data = audio_file.filename()
    print(audio_file)

    audio_filename = str(random.randint(1000, 999999))+ audio_file.filename

    # audio_file.save('uploads/' + audio_file.filename)
    print("uploads/" + audio_filename)
    # return speech_to_text('uploads/' + audio_file.filename)

    audio_file.save("uploads/" + audio_filename)

    # Convert the audio data to an AudioFile object
    # with sr.AudioFile('uploads/' + audio_file.filename) as source:
    with sr.AudioFile("uploads/" + audio_filename) as source:
        # pass
        audio = recognizer.listen(source)
    try:
        print("Microsoft Azure Speech thinks you said ")

        text_recognition = recognizer.recognize_azure(
            audio, key="ba8f1c341b5b45c58ac0253ee5be5342", location="eastus"
        )
        os.remove('uploads/' + audio_filename)
        return jsonify(
            {"transcript": text_recognition[0], "confidence": text_recognition[1]}
        )

    except sr.UnknownValueError:
        return jsonify({"error": "Microsoft Azure Speech could not understand audio"})
    except sr.RequestError as e:
        return jsonify(
            {
                "error": "Could not request results from Microsoft Azure Speech service; {0}".format(
                    e
                )
            }
        )
    
    
    """
    try:
        # Perform speech recognition
        transcript = recognizer.recognize_google(audio, language='en-US')
        return jsonify({'transcript': transcript})
    except sr.UnknownValueError:
        return jsonify({'error': 'Could not understand audio'})
    except sr.RequestError as e:
        return jsonify({'error': f'Speech recognition request failed: {e}'})
    """



def speech_to_text(filename):
    # Set up the Speech configuration
    speech_config = speechsdk.SpeechConfig(subscription="bd6062c60f3c4b30bb5ec451a5439d1a", region="eastus")

    # Create a speech recognizer
    speech_recognizer = speechsdk.SpeechRecognizer(speech_config=speech_config)

    # Specify the audio file for recognition
    audio_input = speechsdk.AudioConfig(filename=filename)

    # Perform speech recognition
    result = speech_recognizer.recognize_once(audio_config=audio_input)
    
        
        
    # Check the result
    if result.reason == speechsdk.ResultReason.RecognizedSpeech:
        print("Recognized: {}".format(result.text))
    elif result.reason == speechsdk.ResultReason.NoMatch:
        print("No speech could be recognized")
    elif result.reason == speechsdk.ResultReason.Canceled:
        cancellation_details = result.cancellation_details
        print("Speech Recognition canceled: {}".format(cancellation_details.reason))
        if cancellation_details.reason == speechsdk.CancellationReason.Error:
            print("Error details: {}".format(cancellation_details.error_details))

def ap():
    speech_key, service_region = "bd6062c60f3c4b30bb5ec451a5439d1a", "eastus"
    speech_config = speechsdk.SpeechConfig(subscription=speech_key, region=service_region)

    audio_config = speechsdk.audio.AudioConfig(filename='uploads/recording.wav')
    speech_recognizer = speechsdk.SpeechRecognizer(speech_config=speech_config, audio_config=audio_config)
    result = speech_recognizer.recognize_once()
    print(result.text)



@app.route('/api/get_questions', methods=['POST'])
def get_questions():
    try:
        data = request.get_json()
        print(f"Data is {data}")
        #Data Operation
        
        completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are an Interviewer's assistant, suggest the Interviewer 20 Technical Questions along with their deficulty level from Easy, Medium and Hard in JSON format based on the topic he gives you"},
            {"role": "user", "content": "Data Structures"}
        ]
        )
        

        print(completion.choices[0].message.content.questions)
        return jsonify({'questions': completion.choices[0].message.content.questions})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/submit_interview', methods=['POST'])
def submit_interview():
    try:
        data = request.get_json()
        print('Data for submit interview is {data}')
        
        #Save data to backend
        
        completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are an Interviewer's assistant, suggest the Interviewer 20 Technical Questions along with their deficulty level from Easy, Medium and Hard in JSON format based on the topic he gives you"},
            {"role": "user", "content": "Data Structures"}
        ]
        )
        
        #Operation on Messeges
        data________________ = 1
        print(completion.choices[0].message)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# @app.route('/api/user/student/login', methods=['POST'])
# def login_check_student():
#     try:
#         data = request.get_json()
#         student = Student.find_one(data['user_name'], data['password'], mongo)

#         if student:
#             return jsonify({'message': 'Student Login successfully', 'class_name': student.class_name})
#         else:
#             return jsonify({'message': 'Student not found or invalid credentials'}), 404

#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

# # Route to get class data
# @app.route('/api/class_data', methods=['GET'])
# def get_class_data():
#     try:
#         class_names = Class_.find_all(mongo)
#         return jsonify([cls.__dict__ for cls in class_names])

#     except Exception as e:
#         return jsonify({'error': str(e)}), 500
