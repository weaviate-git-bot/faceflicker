import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import quote_plus

def get_image_urls(query, num_images=5):
    query_encoded = quote_plus(query)
    url = f"https://www.google.com/search?q={query_encoded}&source=lnms&tbm=isch"
    
    # Send an HTTP GET request
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    
    image_urls = []
    for img in soup.find_all("img"):
        img_url = img.get("src")
        if img_url and img_url.startswith("http"):
            image_urls.append(img_url)
            if len(image_urls) >= num_images:
                break
    
    return image_urls

def download_images(image_urls, folder_name, term):
    os.makedirs(folder_name, exist_ok=True)
    
    for i, img_url in enumerate(image_urls):
        try:
            response = requests.get(img_url)
            with open(os.path.join(folder_name, f'{term}{i+1}.jpg'), 'wb') as f:
                f.write(response.content)
            print(f'Downloaded {i+1}/{len(image_urls)} images for this search')
        except Exception as e:
            print(f'Error downloading image {i+1}: {str(e)}')

if __name__ == "__main__":
    search_terms = ["Bob the Builder", "Big Bird", "SpongeBob"]
    num_images_per_term = 5
    output_directory = "images"

    for term in search_terms:
        image_urls = get_image_urls(term, num_images=num_images_per_term)
        download_images(image_urls, output_directory, term)
