# app.py
import pybase64
from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
from ultralytics import YOLO

app = Flask(__name__)
CORS(app)  # handle CORS


@app.route("/api/process-image/", methods=["POST"])
def process_image():
    if request.method == "POST":
        try:
            # Get the binary image data from the request

            req = request.json
            if req.get("base64Data") is None:
                raise InvalidException("image is required.")

            # decode base64 string into np array
            nparr = np.frombuffer(
                pybase64.b64decode(req["base64Data"].encode("utf-8")),
                np.uint8,
            )

            # decoded image
            img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

            if img is None:
                raise InvalidException("Unable to parse the image.")

            # Initialize YOLO model
            model = YOLO("yolov8n.pt")

            # Perform object detection and extract bounding box coordinates
            results = model(img, stream=True)
            print("results=", results)
            bounding_boxes = []

            for r in results:
                boxes = r.boxes
                print("boxes=", boxes)
                for box in boxes:
                    x1, y1, x2, y2 = box.xyxy[0]
                    x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
                    w, h = x2 - x1, y2 - y1
                    bounding_boxes.append((x1, y1, w, h))

            # Return the bounding box coordinates as a JSON response
            return jsonify({"bounding_boxes": bounding_boxes})
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    else:
        return jsonify({"error": "Invalid request method. Use POST."}), 400


if __name__ == "__main__":
    app.run(debug=True)


## problems faced:i) first learnt how to take a local image and produce a ready-made image with bounding boxes using opencv
# ii)then learnt that we can extract array of coordinates of bounding boxes using opencv
# iii)all this while the code was running directly using simple .py files , now had to set up frontend and backend
# iv)decided to accept image from user using react frontend and then convert it to base64 and then send to flask
# v) btw chatgpt helped me a lot tho at times it was wrong , it atleast puts something forward and then google search
# is lot easier
# vi)then read some blogs to see the base64 acceptance in backend and decoding process but some error was occuring and
# somehow it wasnt showing up on terminal
# vii)after trying out  a lot of things , when i sent request through thunderclient for a fixed base64 in backend , then
# i could see error in thunderclient terminal which mentioned a package which i was using basically "base64" itsell was
# not imported
# viii) it was silly but when the error message does not show up its quite hard to point it out
# ix)later found that base64 is outdated and you have to use pybase64 , used it now it was geenrating coordinates
# x) now simply used coordinates to draw bounding boxes on image rednered on html canvas , again chatgpt helped a lot
