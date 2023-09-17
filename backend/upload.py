import weaviate, os
from io import BytesIO
from PIL import Image
import base64
from rembg import remove

client = weaviate.Client("http://localhost:8080")

def image_to_base64(image):
    try:
        # Convert the image to bytes
        image_buffer = BytesIO()
        image.convert('RGB').save(image_buffer, format="JPEG")
        # Encode the image bytes to Base64
        base64_data = base64.b64encode(image_buffer.getvalue()).decode('utf-8')
        return base64_data
    except Exception as e:
        print("An error occurred:", str(e))
        return None
    
def number_index(s):
    for i in range(len(s) - 1, -1, -1):
        if s[i].isdigit():
            return i
    return len(s)

client.batch.configure(batch_size=100)  # Configure batch
with client.batch as batch:
    for image_file in os.listdir("./animals"):
        print(image_file)
        name = image_file[:number_index(image_file)]
        image = Image.open("./animals/"+image_file)
        base64_data = image_to_base64(image)
        foreground = remove(image)
        jpeg_buffer = BytesIO()
        foreground.convert('RGB').save(jpeg_buffer, format='JPEG')
        # Retrieve the JPEG image as bytes
        # jpeg_bytes = jpeg_buffer.getvalue()
        foreground = Image.open(jpeg_buffer)
        # foreground.show()
        base64_foreground = image_to_base64(foreground)

        # The properties from our schema
        data_properties = {
            "name": name,
            "base64": base64_data,
            "category": "Animal",
            "image": base64_foreground
        }

        batch.add_data_object(data_properties, "Picture")