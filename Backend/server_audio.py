# app.py
from flask import Flask, render_template, request, jsonify
import speech_recognition as sr
import azure.cognitiveservices.speech as speechsdk
from io import BytesIO
#import librosa
#import soundfile as sf
import subprocess


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



app = Flask(__name__)

# Configure SpeechRecognition
recognizer = sr.Recognizer()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/audio')
def audio():
    return render_template('audio_test.html')

@app.route('/a')
def a():
    return render_template('audio.html')

@app.route('/transcribe', methods=['POST'])
def transcribe():
    
    if 'audio' not in request.files:
        return jsonify({'error': 'No audio file provided'})

    
    audio_file = request.files['audio']
    #audio_data = audio_file.filename()
    print(audio_file)
    # audio_data = audio_file.read()  # Read the audio data directly


    #audio_file.save('uploads/' + audio_file.filename)
    print('uploads/' + audio_file.filename)
    #return speech_to_text('uploads/' + audio_file.filename)
    
    audio_file.save('uploads/' + audio_file.filename)
    # Replace 'input.webm' and 'output.wav' with your input and output file paths
    
    #convert_webm_to_wav('uploads/' + audio_file.filename, 'uploads/recording_new.wav')

    #convert_ogg_to_wav('uploads/' + audio_file.filename, 'uploads/' + audio_file.filename+'new')

    # Convert the audio data to an AudioFile object
    #with sr.AudioFile('uploads/' + audio_file.filename) as source:
    with sr.AudioFile('uploads/'  + audio_file.filename) as source:
        #pass
        audio = recognizer.listen(source)
    
    try:
        # Perform speech recognition
        transcript = recognizer.recognize_google(audio, language='en-US')
        return jsonify({'transcript': transcript})
    except sr.UnknownValueError:
        return jsonify({'error': 'Could not understand audio'})
    except sr.RequestError as e:
        return jsonify({'error': f'Speech recognition request failed: {e}'})
    

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

    audio_config = speechsdk.audio.AudioConfig(filename='uploads/recording.webm')
    speech_recognizer = speechsdk.SpeechRecognizer(speech_config=speech_config, audio_config=audio_config)
    result = speech_recognizer.recognize_once()
    print(result.text)
    

ap()
    
if __name__ == '__main__':
    app.run(debug=True)
