import requests
from bs4 import BeautifulSoup

from os.path import basename
from urllib.parse import urlparse

def extract_content(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    major_topic = extract_topic(soup)

    major_paragraphs = extract_paragraphs(soup)
    
    image_urls = extract_image_urls(soup)

        
    return major_topic, major_paragraphs, image_urls

def extract_topic(soup):
    try:
        major_topic = soup.find('h1').text.strip()
    except (AttributeError, TypeError):
        major_topic = ""
        print("Error occurred while extracting major topic.")

    return major_topic

def extract_paragraphs(soup):
    paragraphs = soup.find_all('p')
    first_three_paragraphs = []

    for paragraph in paragraphs:
        if len(paragraph.text.strip()) > 100:
            first_three_paragraphs.append(paragraph.text.strip())
            if len(first_three_paragraphs) == 3:
                break

    return first_three_paragraphs

def extract_image_urls(soup):
    image_urls = []
    img_tag = soup.find('img')
    count = 0
    while count <= 10 and img_tag:
        try:
            has_src = img_tag.has_attr('src')
        except Exception as e:
            has_src = False
            print("Error occurred while checking 'src' attribute:", str(e))

        if has_src and img_tag['src'][:4] == 'http':
            image_urls.append(download_image(img_tag['src']))
            count += 1
        try:
            img_tag = img_tag.find_next('img')
        except AttributeError:
            img_tag = None
            print("Next 'img' tag not found.")

    return image_urls

def has_image_extension(url, extensions=['.jpg', '.jpeg', '.png', '.gif', '.bmp']):
    lower_url = url.lower()
    return any(lower_url.endswith(ext) for ext in extensions)

def download_image(url, save_path="../frontend/src/components/Products/images"):
    try:
        response = requests.get(url, stream=True)
        response.raise_for_status()

        parsed_url = urlparse(url)
        file_name = basename(parsed_url.path)
        
        if save_path:
            file_path = save_path + "/" + file_name
        else:
            file_path = file_name

        with open(file_path, 'wb') as file:
            for chunk in response.iter_content(chunk_size=8192):
                file.write(chunk)
        
        print(f"Image downloaded successfully. Saved as: {file_path}")
        return "./images/" + file_name
    except requests.exceptions.HTTPError as errh:
        print(f"HTTP Error: {errh}")
    except requests.exceptions.ConnectionError as errc:
        print(f"Error Connecting: {errc}")
    except requests.exceptions.Timeout as errt:
        print(f"Timeout Error: {errt}")
    except requests.exceptions.RequestException as err:
        print(f"Request Exception: {err}")