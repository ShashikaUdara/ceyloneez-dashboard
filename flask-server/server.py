# import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from keras.models import load_model
import cv2
import numpy as np
from werkzeug.utils import secure_filename
from signature_extraction import extract_signature

import certificateDetails, scraper
from googlesearch import search


app = Flask(__name__)
CORS(app)

# Load the trained model
model = load_model('signature_validation_model.h5')


# Define the API endpoint
@app.route('/dashboard/Register', methods=['POST']) 
def validate_signature():
    try:
    # Check if an image file was provided in the request
        if 'file' not in request.files:
            return jsonify({'result': 'No image file provided.'})
        file = request.files['file']

        if file.filename == '':
         return jsonify({'result': 'No selected file'})

        if file:
            filename=secure_filename(file.filename)
            file.save(filename)

            output_path = "signature.jpg"
            signatureResult=extract_signature(filename, output_path)
            print(signatureResult)
            if signatureResult:
             image = cv2.imread(output_path)
             image = cv2.resize(image, (128, 128))
             image = image.astype('float32') / 255.0
             image = np.expand_dims(image, axis=0)

    # Make predictions
             prediction = model.predict(image)[0][0]
             result = 'Forged' if prediction > 0.5 else 'Genuine'

    # Return the result to the user
             return jsonify({'result': result})
            else:
             return jsonify({'result': "No signature found in the image."})

    except Exception as e:
            # Handle exceptions here, if needed
            return jsonify({'error': 'Error processing the image: ' + str(e)})


@app.route('/api/info_handlar', methods=['POST'])
def info_handlar():
    try:
        data = request.get_json()  # Parse JSON data from the request
        print(data)

        query = data.get('query')  # Get the 'query' parameter from the JSON payload
        
        if query:
            search_results = search_google(query)
    
            if not search_results:
                print("No search results found.")
                return
            
            best_website = search_results[0]
            major_topic, paragraphs, image_urls = scraper.extract_content(best_website)

            print("\nExtracted Content:")
            print("Major Topic:", major_topic)
            print("Paragraph:", paragraphs)
            print("Image URL:", image_urls)

            page_data = {}

            page_data['major_topic'] = major_topic
            page_data['paragraphs'] = paragraphs
            page_data['image_urls'] = image_urls

            return jsonify({"data": page_data}), 200
        else:
            return jsonify({"error": "Invalid payload"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500


def search_google(query):
    search_results = list(search(query, num=5, stop=5, pause=10))
    return search_results

@app.route('/api/certificate_process', methods=['POST'])
def rubber_certificate_process():
    data = request.get_json()  # Parse JSON data from the request
    print(data)

    query = data.get('query')
    data6 = certificateDetails.scrape_website('https://stepbysteptrade.lk/Procedures?l=en&search=' + query)
    return jsonify(data6)


if __name__ == '__main__':
    # Change the port number as desired (default: 5000)
    port = 5000

    print(f'Server is running on port {port}')
    app.run(port=port)

