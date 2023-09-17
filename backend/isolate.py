# Importing Required Modules
from rembg import remove
from PIL import Image

# Store path of the image in the variable input_path
input_path = './images/Will Smith3.jpg'

# Store path of the output image in the variable output_path
output_path = './outputs/WillSmith.jpg'

# Processing the image
input = Image.open(input_path)

# Removing the background from the given Image
output = remove(input)

output.convert('RGB').save(output_path, 'JPEG')

# #Saving the image in the given path
# output.save(output_path)
