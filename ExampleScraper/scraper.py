import requests
from bs4 import BeautifulSoup


def print_test():
    p = False
    print("Printer is set to:", p)

    page = requests.get("http://dataquestio.github.io/web-scraping-pages/simple.html")
    if p:
        print("Status code:", page.status_code)
        #Printing out content:
        print("Content:", page.content)

    soup = BeautifulSoup(page.content, "html.parser")
    if p:
        print("Prettify: \n")
        print(soup.prettify())
        print("\n\n")
        print(list(soup.children), "\n")
        print([type(item) for item in list(soup.children)], "\n\n")
    
    html = list(soup.children)[2]
    if p:
        print("Printing out html:", list(html), "\n")
        print("Printing out html's children:", list(html.children)[3])

    body = list(html.children)[3]
    if p:
        print("\nListing the children of HTML's body:\n",list(body.children))
    
    p_tag = list(body.children)[1]

    if p:
        print("\nPrinting out p's text:", p_tag.text)

    #The way described above can also be done by finding all instances of a certain tag this way:
    soup = BeautifulSoup(page.content, "html.parser")
    tags = soup.findAll('p')

    if p:
        print("\nPrinting out p using the 'findAll('p')' method:", tags[0].get_text())


def scraping_classes_and_ids():
    p = True





def main():
    print_test()
    scraping_classes_and_ids()

main()