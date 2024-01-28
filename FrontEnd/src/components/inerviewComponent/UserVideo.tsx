"use client";

import { useEffect, useRef, useState } from 'react';

const InterviewRecorder: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [recording, setRecording] = useState(false);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [recorder, setRecorder] = useState<AudioNode | null>(null);

  const leftChannel = useRef<Float32Array[]>([]);
  const rightChannel = useRef<Float32Array[]>([]);
  const recordingLength = useRef<number>(0);
  const sampleRate = useRef<number>(44100);
  const context = useRef<AudioContext | null>(null);
  const blob = useRef<Blob | null>(null);

  useEffect(() => {
    // Cleanup function
    return () => {
      if (recorder) {
        recorder.disconnect(context.current?.destination);
        mediaStream?.disconnect(recorder);
      }
      stopVideoSnapshotsInterval();
    };
  }, [recorder, mediaStream]);

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        setMediaStream(stream);
        context.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        const audioNode = context.current.createMediaStreamSource(stream);
        setRecorder(createRecorder(audioNode));
        setRecording(true);
      })
      .catch((error) => {
        console.error('Error accessing microphone:', error);
      });
  };

  const stopRecording = () => {
    if (recorder && context.current) {
      recorder.disconnect(context.current.destination);
      mediaStream?.disconnect(recorder);

      const leftBuffer = flattenArray(leftChannel.current, recordingLength.current);
      const rightBuffer = flattenArray(rightChannel.current, recordingLength.current);
      const interleaved = interleave(leftBuffer, rightBuffer);

      const buffer = createWavBuffer(interleaved);

      blob.current = new Blob([buffer], { type: 'audio/wav' });

      sendAudioForTranscription(blob.current);
    }

    setRecording(false);
  };

  const sendAudioForTranscription = (audioBlob: Blob) => {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.wav');

    fetch('/transcribe', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      console.log('Audio uploaded successfully:', data);
      // Handle the response as needed
    })
    .catch(error => {
      console.error('Error uploading audio:', error);
    });
  };

  const createRecorder = (audioNode: AudioNode): ScriptProcessorNode | null => {
    const bufferSize = 2048;
    const numberOfInputChannels = 2;
    const numberOfOutputChannels = 2;

    const scriptProcessorNode = context.current?.createScriptProcessor(bufferSize, numberOfInputChannels, numberOfOutputChannels);

    if (scriptProcessorNode) {
      scriptProcessorNode.onaudioprocess = (e) => {
        leftChannel.current.push(new Float32Array(e.inputBuffer.getChannelData(0)));
        rightChannel.current.push(new Float32Array(e.inputBuffer.getChannelData(1)));
        recordingLength.current += bufferSize;
      };

      audioNode.connect(scriptProcessorNode);
      scriptProcessorNode.connect(context.current?.destination);
    }

    return scriptProcessorNode;
  };

  const flattenArray = (channelBuffer: Float32Array[], length: number): Float32Array => {
    const result = new Float32Array(length);
    let offset = 0;
    for (let i = 0; i < channelBuffer.length; i++) {
      const buffer = channelBuffer[i];
      result.set(buffer, offset);
      offset += buffer.length;
    }
    return result;
  };

  const interleave = (leftChannel: Float32Array, rightChannel: Float32Array): Float32Array => {
    const length = leftChannel.length + rightChannel.length;
    const result = new Float32Array(length);

    let inputIndex = 0;

    for (let index = 0; index < length;) {
      result[index++] = leftChannel[inputIndex];
      result[index++] = rightChannel[inputIndex];
      inputIndex++;
    }
    return result;
  };

  const createWavBuffer = (interleaved: Float32Array): ArrayBuffer => {
    const buffer = new ArrayBuffer(44 + interleaved.length * 2);
    const view = new DataView(buffer);

    writeUTFBytes(view, 0, 'RIFF');
    view.setUint32(4, 44 + interleaved.length * 2, true);
    writeUTFBytes(view, 8, 'WAVE');
    writeUTFBytes(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 2, true);
    view.setUint32(24, sampleRate.current, true);
    view.setUint32(28, sampleRate.current * 4, true);
    view.setUint16(32, 4, true);
    view.setUint16(34, 16, true);
    writeUTFBytes(view, 36, 'data');
    view.setUint32(40, interleaved.length * 2, true);

    let index = 44;
    const volume = 1;

    for (let i = 0; i < interleaved.length; i++) {
      view.setInt16(index, interleaved[i] * (0x7FFF * volume), true);
      index += 2;
    }

    return buffer;
  };

  const writeUTFBytes = (view: DataView, offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  // Video part
  const snapshot = () => {
    const canvas = document.createElement('canvas');
    if (videoRef.current) {
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        canvas.toBlob((blob) => {
          if (blob) {
            const formData = new FormData();
            formData.append('snapshot', blob, 'snapshot.png');

            // Send snapshot to backend using FormData
            fetch('/snapshot', {
              method: 'POST',
              body: formData,
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error sending snapshot:', error));
          }
        }, 'image/png');
      }
    }
  };

  // Set interval to call the function every 5 seconds
  const videoInterval = setInterval(snapshot, 5000);

  // Function to terminate the interval after 15 seconds
  const stopVideoSnapshotsInterval = () => {
    clearInterval(videoInterval);
  };

  return (
    <div>
      <h1>Audio</h1>
      {/* <button onClick={start */}
       {recording ? (
        <button onClick={stopRecording}>Stop recording</button>
      ) : (
        <button onClick={startRecording}>Start recording</button>
      )}

      <div id="video-container">
        <video ref={videoRef} playsInline autoPlay></video>
        <button onClick={snapshot}>Take Snapshot</button>
      </div>
    </div>
  );
};

export default InterviewRecorder;
