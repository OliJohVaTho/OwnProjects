import requests
from bs4 import BeautifulSoup
import pandas as pd



#This entire code is based on the guide from the page: "https://www.dataquest.io/blog/web-scraping-tutorial-python/"
def print_test():
    p = False
    print("Printer for function 'print_test' is set to:", p)

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
    p = False
    print("Printer set for the function called 'scraping_classes_and_ids' is set to:", p, "\n")

    #Setting up the page to be parsed
    page = requests.get("http://dataquestio.github.io/web-scraping-pages/ids_and_classes.html")
    soup = BeautifulSoup(page.content, "html.parser")


    #Parsing the document using soup for the class called 'outer text'
    tag = soup.find_all('p', class_="outer-text")
    if p:
        print(tag)
        print("\nSearching for tags using just the id:") 

        print(soup.find_all(id="first")[0].get_text(), "\n")


    #Parsing through the document using CSS-selector:
    if p:
        ret = soup.select("div p")
        print("Printing p tags inside of div tags:\n", ret)


def scraping_main_page():
    p = False
    print("Printing for the main page is:", p)

    page = requests.get("https://forecast.weather.gov/MapClick.php?lat=37.7772&lon=-122.4168")
    if page.status_code != 200:
        print("Please check the connection.. ")
        exit()
    

    soup = BeautifulSoup(page.content, "html.parser")
    seven_day = soup.find(id="seven-day-forecast")
    
    if p:
        print("Seven day:\n", seven_day)
    
    forecast_items = seven_day.find_all(class_="tombstone-container")
    today = forecast_items[0]
    if p:
        print("\n\nForecast container:\n", forecast_items)
        print("\n\nPrinting the first forecast_item:", today.prettify())
    

    period_tags = seven_day.select(".tombstone-container .period-name")
    periods = [i.get_text() for i in period_tags]
    descs = [i["title"] for i in seven_day.select(".tombstone-container img")]
    temps = [i.get_text() for i in seven_day.select(".tombstone-container .temp")]

    
    
    
    weather = pd.DataFrame({
        "Period:": periods,
        "Description:": descs,
        "Temperature:": temps,
    })
    
    print("\n",weather)

    
    



def main():
    test_pages = False
    main_page = True

    if test_pages:
        print_test()
        scraping_classes_and_ids()
    

    if main_page:
        scraping_main_page()


if __name__ == "__main__":
    main()