import requests
from bs4 import BeautifulSoup

def scrape_website(url):
    try:
        response = requests.get(url)
        html_content = 'not found'

        if response.status_code == 200:
            soup = BeautifulSoup(response.content, 'html.parser')
            directory_plain_list = soup.find(class_='directory-plain-list')
            
            if directory_plain_list:
                html_content = directory_plain_list.prettify()  # Get the nicely formatted HTML content
                print(html_content)
            else:
                print("Element with class 'directory-plain-list' not found on the webpage.")
        else:
            print("Failed to retrieve the webpage. Status code:", response.status_code)
        
        return html_content

    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")
        return None