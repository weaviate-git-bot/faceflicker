from flask import Flask, request, jsonify
from flask_cors import CORS
import weaviate, openai, os, json
# from dotenv import load_dotenv
from io import BytesIO
from PIL import Image
import base64
from rembg import remove


app = Flask(__name__)
CORS(app)

client = weaviate.Client("http://localhost:8080")

def image_to_base64(image):
    try:
        # Convert the image to bytes
        image_buffer = BytesIO()
        image.save(image_buffer, format="JPEG")
        # Encode the image bytes to Base64
        base64_data = base64.b64encode(image_buffer.getvalue()).decode('utf-8')
        return base64_data
    except Exception as e:
        print("An error occurred:", str(e))
        return None
    
def base64_to_image(base64_data):
    try:
        # Decode the Base64 data
        binary_data = base64.b64decode(base64_data)
        # Create an image from binary data
        image = Image.open(BytesIO(binary_data))
        return image
    
    except Exception as e:
        print("An error occurred:", str(e))
        return None
    
def set_up_batch():
    """
    Prepare batching configuration to speed up deleting and importing data.
    """
    client.batch.configure(
        batch_size=100, 
        dynamic=True,
        timeout_retries=3,
        callback=None,
    )

@app.route('/ping')
def ping():
    return "pong"

@app.route('/upload', methods=['POST'])
def upload():
    try:
        # Check if the request contains an image
        if 'image' not in request.files:
            return jsonify({'error': 'No image provided'}), 400
        # Get the image file from the request
        image_file = request.files['image']
        # Convert the image to PIL Image
        image = Image.open(image_file)
        # Convert the PIL Image to Base64
        base64_data = image_to_base64(image)

        if base64_data:
            # return jsonify({'base64_image': base64_data}), 200
            # print("base64!!")
            pass
        else:
            return jsonify({'error': 'Failed to convert image to Base64'}), 500

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    set_up_batch()
    with client.batch as batch:
        data_properties = {
                "name": request.form['name'],
                "image": base64_data,
                "category": request.form['category']
            }

        batch.add_data_object(data_properties, "Picture")
    return "success"

@app.route('/search', methods=['POST'])
def search():
    base64_data = request.form.get("base64FrameData")
    input = base64_to_image(base64_data)
    output = remove(input)
    jpeg_buffer = BytesIO()
    output.convert('RGB').save(jpeg_buffer, format='JPEG')
    foreground = Image.open(jpeg_buffer)
    # foreground.show()
    base64_foreground = image_to_base64(foreground)

    # sourceImage = {"image": base64_foreground, "distance": 0.3}
    sourceImage = {"image": base64_foreground}

    category = request.form.get("category")

    results = (
        client.query
        .get("Picture", ["image", "name", "base64"])
        .with_near_image(sourceImage, encode=False)
        .with_where({
            "path": ["category"],
            "operator": "Equal",
            "valueText": category
        })
        .with_additional(["distance"])
        .with_limit(1)
        .do()
    )
    print(results)

    # print(len(results["data"]["Get"]["Picture"]))
    if not results["data"]["Get"]["Picture"]:
        return {"text": "noooooooooooooooo", "status": "fail"}
    similar = results["data"]["Get"]["Picture"][0]["base64"]
    # decoded_image = base64_to_image(original)
    # if decoded_image:
    #     # decoded_image.show()
    #     pass
    # else:
    #     print("noooooooooooooOoO0oOo")
    text= results["data"]["Get"]["Picture"][0]["name"]
    distance = results["data"]["Get"]["Picture"][0]["_additional"]["distance"]
    texts = [obj["name"] for obj in results["data"]["Get"]["Picture"]]
    distances = [obj["_additional"]["distance"] for obj in results["data"]["Get"]["Picture"]]
    print({"texts": texts, "distances": distances})
    return jsonify({"similar": similar, "original": base64_data, "text": text, "distance": distance, "status": "success"})


if __name__ == '__main__':
    app.run(port=5000, host='0.0.0.0', debug=True)