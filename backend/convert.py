import os
from PIL import Image

def convert_to_jpg(input_dir, output_dir):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    for filename in os.listdir(input_dir):
        if filename.lower().endswith(('.png', '.jpeg', '.jpg', 'jfif', '.gif', '.bmp', '.tiff', '.ppm', '.webp')):
            input_path = os.path.join(input_dir, filename)
            output_path = os.path.join(output_dir, os.path.splitext(filename)[0] + '.jpg')
            try:
                img = Image.open(input_path)
                if img.format == 'WEBP':
                    # Convert WebP to PNG (or any supported format)
                    temp_output_path = os.path.join(output_dir, os.path.splitext(filename)[0] + '.png')
                    img.save(temp_output_path)
                    
                    # Convert PNG (or any supported format) to JPEG
                    temp_img = Image.open(temp_output_path)
                    temp_img.convert('RGB').save(output_path, 'JPEG')
                    os.remove(temp_output_path)  # Remove temporary PNG file
                else:
                    img.convert('RGB').save(output_path, 'JPEG')
                
                print(f'Converted {filename} to JPEG format.')
            except Exception as e:
                print(f'Failed to convert {filename}: {str(e)}')
        else:
            print(f"{filename} is not compatible")

if __name__ == "__main__":
    # input_directory = input("Enter the path to the directory containing images: ")
    # output_directory = input("Enter the path to the output directory: ")

    convert_to_jpg("./images", "./jpgs")