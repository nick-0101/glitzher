# Glitzher #
![glitzher_example](https://user-images.githubusercontent.com/54145857/129775335-4edcda73-dfc0-4082-ac40-d4fbbd6c5e0d.jpg)

This was my first real production app. Glitzher was created to help cosmetic consumers find the best price's on cosmetic products from different brands.  The goal was to allow a user to search for a product once and see the retailer that was offering the lowest price.  

Glitzher can be found here: https://glitzher.com & the blog can be found at https://glitzher.com/blog (If not found the site has been taken offline).

# How it works #
Cosmetic products from all the major Canadian retailers were scraped into Redis and Algolia. Redis was used as the database for this project as well as the caching layer. It served the content for the main page and the popular products page. Algolia was used for product instant search. The web scrapers were hosted on the digital ocean server and would scrape the data right before the redis cache expired. This ensured that all product prices were kept up to date. 

# Things I would do different #
I would not use graphql for the api as it was unneeded. However, I'm glad I did as I used it on other projects.

# Tech/framework used #
Built with

  * [Reactjs](https://reactjs.org) (Frontend)
  * [Expressjs](https://expressjs.com) (Backend)
  * [Graphql](https://graphql.org/) (API)
  * [Redis](https://redislabs.com/) (Cache & database for products)
  * [TailwindCSS](https://tailwindcss.com/) (Used for styling the website)
  * [Algolia](https://www.algolia.com/) (Used for instant search)
  * [Digital Ocean](https://digitalocean.com) (Hosting for website, blog and API)
  
- - - -  
    
# Installation / 1
  1. `git clone https://github.com/phoenixbeats01/glitzher`
  2. `cd glitzher`
  3. `npm install` - Install's Express dependencies
  4. `cd client` 
  5. `npm install` - Install's Reactjs dependencies
  

# Contribute #
To contribute please open a pull request. Make sure the description clearly describes the problem and solution.
 
# License #
MIT © phoenixbeats01
