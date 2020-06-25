import requests as req
from bs4 import BeautifulSoup

def get_page():
    return req.get("https://www.yr.no/sted/Norge/Oslo/Oslo/Oslo/")

def get_soup(page):
    return BeautifulSoup(page.content, "html.parser")

def main():
    p = False
    inspect = False
    page = get_page()
    soup = get_soup(page)

    print("Printing is set to:", p, "\n\n")

    if inspect:
        print("Page:", soup.prettify())
    
    table = soup.find(class_="yr-table-overview2")
    
    if p:
        print("Tables:", table)

    day = table.find("caption").get_text()
    tds = table.find_all("td")
    
    print(tds)    
    
    
    time_of_day = tds[0]
    print(time_of_day)
    weather = tds[1].get_text()
    #time_of_day = time_of_day.rstrip("\n")
    #weather = weather.rstrip("\n")
    
    print(time_of_day.get_text(), weather)







if __name__ == "__main__":
    main()