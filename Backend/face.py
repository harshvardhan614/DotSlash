# Import necessary libraries
from deepface import DeepFace


# Load the image using OpenCV
img_path = "images.jpg"

# Use DeepFace for emotion recognition
result = DeepFace.analyze(img_path, actions=['emotion'])


emotion = result['emotion']['dominant']
print(emotion)
#cv2.putText(img, f"Emotion: {emotion}", (10, 30), font, font_scale, (0, 255, 0), font_thickness, cv2.LINE_AA)

# Display the image with OpenCV
#cv2.imshow('Facial Emotion Recognition', img)
#cv2.waitKey(0)
#cv2.destroyAllWindows()
