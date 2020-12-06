# Strong At Every Size Server

### This is the back-end server for Strong At Every Size.

## Technology Stack - BACKEND 
### Built using Node.js, Express, and PostgreSQL, Knex.js, JSON Web Token, bcryptjs.

### The server is deployed to Heroku.

## STEPS

1. 'npm run migrate' to create the tables
2. 'npm run dev' to run the server

#### Live Server: https://whispering-castle-58125.herokuapp.com/

#### Live Application: https://strong-at-every-size-frontend-1ao54pi9v.vercel.app/home

## Summary

The main feature of this app is the admin user ability to add things promotions, news, testimonies, items to the store, and view users in the database. The normal users will be able to view and add reviews to items, and view and edit their individual profiles. 

![image](https://user-images.githubusercontent.com/55715053/100108382-b71b5480-2e38-11eb-8399-ce31521cf1a5.png)

## API Documentation

### GET /api/items

Returns an array of items from the store.

#### Example Response

```
[
    {
        "item_id": 1,
        "photo": "https://images.ctfassets.net/40akseett7bn/7fX3T1gxhBgrnuRTSX42YC/3f406a3eeecf3a8388e77f38a02fc017/classic_t_shirt_womens.jpg",
        "title": "SAES Tee ",
        "price": "$30",
        "category": "Apparel",
        "description": "A Comfortable Tee.",
        "date_created": "2020-11-21T16:05:43.157Z"
    }
]
```

- user_id - number - uuid of an item
- photo - string - image of an item
- title - string - name of an item
- price - string - price of an item
- category - string - category of an item
- description - string - description of an item
- date_created - string - date when an item was created

### POST /api/items

A submission of an item to the store. Requires the photo, title, price, description, and category.
Only the admin can POST new items.

```
[
    {
        "photo": "https://images.ctfassets.net/40akseett7bn/7fX3T1gxhBgrnuRTSX42YC/3f406a3eeecf3a8388e77f38a02fc017/classic_t_shirt_womens.jpg",
        "title": "SAES Tee ",
        "price": "$30",
        "category": "Apparel",
        "description": "A Comfortable Tee."
    }
]
```

### PATCH /api/items/:item_id

A request to update an item in the store.

### DELETE /api/items/:item_id

A request to delete an item in the store.
