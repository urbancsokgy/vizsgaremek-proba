
## **1. Az alkalmazás**
Az alkalmazás egy webshop adminisztrációs felülete. A megjelenített felület képes az autentikációra, a megfelelő jogokkal biztosítja a webshop adatainak lekérdezését és módosításást. 

 - Az API a **backend**, a fejlesztés során használt Angular a **frontend** mappában található. Ez a szerkezet a tanult minta alpján készült. 
- Az adatbázist a MongoDB Atlas webszolgátatása tárolja (https://cloud.mongodb.com/.....)
- Az alkalmazás Docker containerben fut a node:latest image felhsználásával.
- Az alkalmazás **backend** könyvtára tartalmazza a **public** könyvtárba másolt "buildelt" Angular alkalmazást


## **2. Az alkalmazás telepítése**

- A célgépre le kell klónozni az adott GitHub repository tartalmát.
- Telepíteni kell az alkalmazás függőségeit az `npm i` paranccsal a **backend** könyvtárban. 
- Ha további fejlesztések szükségesek, akkor telepíteni kell az Angular keretrendszert az `npm i -g @angular/cli` paranccsal, majd a **frontend** könyvtárban futtatni az 'npm i' parancsot.

## **3. Az alkalmazás konfigurálása**
- Mindkét könyvtár tartalmazza a package.json fájlban a futtatási scripteket.
- A .env fájl mintája megtalálható a .env.example fájlban.
- Az alapértelmezett port a 3000, de szüksége esetén megadható más a .env PORT = értékeként
Szükséges lehet:
-MongoDB Compass (connection string, username, pw), Postman, Belépési adatok (név, jelszó)

## **4. Az alkalmazás indítása**

A megadott Docker container indítása és inicializálása:

 - > npm run docker-compose:up

## **5. A végpontok dokumentációja**

[Swagger](http://localhost:3000/api-docs/)  (localhost:3000/api-docs)
szükséges a Postman programban megkapott Bearer token: http://localhost:3000/login

---
---



> Written with [StackEdit](https://stackedit.io/).
