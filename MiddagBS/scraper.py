import requests
from bs4 import BeautifulSoup

class Scraper:


    def __init__(self):
        self.page = None
        self.soup = self.soup()


    def request(self):
        self.page = requests.get("https://foreningenbs.no/intern/matmeny/plain")

    def soup(self):
        self.request()
        return BeautifulSoup(self.page.content, "html.parser")

    def printscraper(self):
        print(self.soup.prettify())


def get_dinner(scraper):
    soup = scraper.soup
    
    tds = soup.find_all("td")

    return find_dinner(tds)


def find_dinner(tds):
    green = "#00FF00"

    for element in tds:
        if green in str(element.encode("utf-8")):
            return element
    return None


def show_dinner(dinner):
    print("Dinner:", dinner.get_text())


def main():
    p = False

    scraper = Scraper()
    
    if p:
        scraper.printscraper()

    dinner = get_dinner(scraper)

    if p:
        print("Dinner:\n", dinner)    

    show_dinner(dinner)


if __name__ == "__main__":
    main()


    