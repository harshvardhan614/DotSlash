# app.py
from flask import Flask, render_template, request, jsonify
import speech_recognition as sr
from datetime import datetime
import random
import os

app = Flask(__name__)

# Configure SpeechRecognition
recognizer = sr.Recognizer()


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/audio")
def audio():
    return render_template("audio_test.html")


@app.route("/a")
def a():
    return render_template("audio.html")


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
@app.route("/video")
def video_main():
    return render_template("video_snap.html")

@app.route("/video_audio")
def video_audio_main():
    return render_template("audio_video.html")


@app.route('/snapshot', methods=['POST'])
def snapshot():
    snapshot_file = request.files['snapshot']

    # Save the snapshot to a file or process it as needed
    # For now, just print some information
    print('Received snapshot:', snapshot_file.filename)
    snapshot_file.save('uploads/images/received_snapshot.png')

    return jsonify({'message': 'Snapshot received successfully'})


if __name__ == "__main__":
    app.run(debug=True)
