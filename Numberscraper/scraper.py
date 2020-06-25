import requests
from bs4 import BeautifulSoup



class Scraper:

    def __init__(self, url):
        """
        Generates a page containing the http request.
        """

        self.url = url
        self.page = self.request(url)

        # --Handle the potential error here--

        self.soup = self.make_soup()



    def request(self, url):
        """
        Makes a http-request to 1881.

        Arguments:
            url (String): The address to make a request from.

        Returns:
            Page (Request-object): Object contains status code and content.

        """
        #Right now this is hard coded.
        #https://www.1881.no/?query=1453&type=person
        return requests.get("https://www.gulesider.no/anders+ytre-arne+v%C3%A5gane/79885106/person?page=1&query=arne")


    def make_soup(self):
        """
        Creates an HTML-parser from page.

        Returns:
            Soup (Beautiful Soup object): An object containing the HTML-parser.
        """

        return BeautifulSoup(self.page.content, "html.parser")

    def print_scraper(self):
        """
        Prints out the content from the page if there is anything.
        """
        print("Content:\n")
        print(self.soup.prettify())

def main():
    """
    Main is used for testing.
    
    Returns:
        Void
    """
    
    scraper = Scraper("random string")
    scraper.print_scraper()
    


if __name__ == "__main__":
    main()
