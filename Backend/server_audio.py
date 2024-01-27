# app.py
from flask import Flask, render_template, request, jsonify
import speech_recognition as sr

app = Flask(__name__)

# Configure SpeechRecognition
recognizer = sr.Recognizer()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/audio')
def audio():
    return render_template('audio_test.html')

@app.route('/transcribe', methods=['POST'])
def transcribe():
    if 'audio' not in request.files:
        return jsonify({'error': 'No audio file provided'})

    
    audio_file = request.files['audio']
    #audio_data = audio_file.filename()
    print(audio_file)
    audio_file.save('uploads/' + audio_file.filename)
    # Convert the audio data to an AudioFile object
    with sr.AudioFile(audio_file) as source:
        audio = recognizer.record(source)

    try:
        # Perform speech recognition
        transcript = recognizer.recognize_google(audio, language='en-US')
        return jsonify({'transcript': transcript})
    except sr.UnknownValueError:
        return jsonify({'error': 'Could not understand audio'})
    except sr.RequestError as e:
        return jsonify({'error': f'Speech recognition request failed: {e}'})

if __name__ == '__main__':
    app.run(debug=True)
