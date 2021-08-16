 User story - Adminisztrátori szerepkör
---
---
## _**1. Főoldal**_
---
**1. agilis felhasználói történet:**
> _A főoldal egy összegző képernyő a Bookstore webshop ismertetőjével, navigációs lehetőségekkel és néhány összegző adattal. Tartalmazza a belépési és navigációs lehetőségeket.

**Elfogadási kritérium:**  

Egy mobiloptimalizált felületen, leírja a webshop profilját, regisztrációs és belépési lehetőséget biztosít. Felhasználói belépés után néhány listázó funció érhető el,  az adminisztrátor eléri a feladatkörből adódó funkciókat.
---
## _**2. Könyvesbolt adminsztrátori felület**_
---
**1. agilis felhasználói történet:**
>Egy helyről indulva áttekinthetők a webshop termékei, a termékek adatai. Lehetőséget ad a CRUD műveletek elvégzéséhez szükséges oldalak elérésére, a **megfelelő authentikáció** után.

**Elfogadási kritérium:**  

A főoldalról elérhető a könyvek és a hozzájuk kapcsolt adatbázis részek adata, (továbbfejlesztés után szűrhető, rendezhető formában). 
Elérhető a felhasználók listája. A felhasználók regisztráció után kerülnek az adatbázisba felhasználói szerepkörrel. Adminisztátor biztonsági okokból adabázis szinten hozható létre, az API gondoskodik róla, hogy a "role" regisztáció esetén csak felhasználó lehessen.
Listázott adatok:
A könyve kaktegóriái, a szerzők, könyvek, felhasználók.
A könyvek legfontosabb jellemzői: cím, szerző, kategória, ár,  a raktárkészlet. A leírás mező, ahol változó mennyiségű kiegészítő információ helyezhető el, a létrehozás ablakában elérhető.

---


**2. agilis felhasználói történet:**

> _Új könyv adatai vehetők fel._

**Elfogadási kritérium:**  
- A kötelező adatok megadásával egy új könyv adatait lehet felvinni. A kapcsolódó adadtok lenyíló menüből választhatóak ki.  A módosítás megjelenik a listázó oldalon, létrejön a termék adatlapja.
- A létrehozás az összes könyvet listázó oldalra navigál vissza.
---

**3. agilis felhasználói történet:**

> _A termék, a kategóriák és a szerzők adatai szerkeszthetők._

**Elfogadási kritérium:**  
Az adatok a listázó oldalakon látható sorok végén található gombok segítségével módosíthatók, vagy törölhetők. **Ezeket a funkciókat csak az adminisztrátor érheti el, más szerepkörrel a gombok nem jelennek meg.** A szerkesztés után a listázó oldalakra navigálunk vissza. A módosítások megjelennek a listában.

---

**4. agilis felhasználói történet:**

> _A termék, a kategóriák és a szerzők adatai törölhetők._

**Elfogadási kritérium:**  
- Az adatsor végén látható gomb segítségével az adat törölhető. A törlés szándéka megerősítést igényel. A felugró ablak segítségével megakadályozható a véletlen kattintásból adódó adatvesztés.
- A törlést követően a listázó oldalon látható a változás, az adatbázisból törlődik az adat.

---

---
## _**3. Felhasználói adatbázis (Users)**_
---
**1. agilis felhasználói történet:**
>Egy helyről indulva áttekinthetők a felhasználók adatai. A létrehozás a regisztrációval történik.  Módosítási lehetőségek az adat jellegéből adódóan nincsenek. Admin felhasználó adatbázis szinten hozható létre.
**Elfogadási kritérium:**  

Az oldalra navigálva megjelenik az összes felhasználó adata egy helyen.  
Ezek az adatok a felhasználó legfontosabb jellemzői, a regisztrációs, kapcsolattartási, számlázási adatok, valamint a felhasználó szerepköre.
Adatok: firstname, lastname, email, password (nincs listázva, titkosított), role (nincs listázva), address (beágyazott objektum): country, city, street, building, zip.

---
---
## _**4. Szerző adatbázis (authors)**_
---
**1. agilis felhasználói történet:**
>Egy helyről indulva áttekinthetők a szerzők adatai. Lehetőséget ad a szerkesztési, törlési műveletek elvégzésére.

**Elfogadási kritérium:**  

Az oldalra navigálva megjelenik az összes szerző adata.  
Adatok: fistname, lastname, born.
> A listázó oldal a nevet Name mezőben egyben mutatja (pipe segítségével), de a szerkesztésnél az adatok külön input mezőben szerepelnek.
---
---

## _**5. kategóriák adatbázisa**_
---
**1. agilis felhasználói történet:**
>Lehetőséget ad a szerkesztési, törlési műveletek elvégzésére a lista oldal gombjai segítségéve. 

**Elfogadási kritérium:**  

Az oldalra navigálva megjelenik az összes kategória adata egy helyen.
Adata: name

---
---
## _**6. Könyvek adatbázisa (books)**_
---
**1. agilis felhasználói történet:**
>Egy helyről indulva áttekinthetők a könyvek fő adatai. Lehetőséget ad a CRUD műveletek elvégzéséhez szükséges oldalak elérésére.

**Elfogadási kritérium:**  

Az oldalra navigálva megjelenik az összes könyv főbb adata egy helyen. 
Adatok: title, author, catgory, price, quantity, description. Az author és catgory a kapcsolódó adatbázis ObjectId-ját tartalmazza. Ezen kapcsolódó adatok a backend populate segítségécel jelennek meg. 
A create és editor oldalak a teljes adatot tartalmazzák. A kapcsolt adatok legördülő mezőből (select) választhatók ki.

---
---
## _***Kiegészítő megjegyzések!!!***_
---

A webshop adminisztrációs felülete nem teljes. A továbbfejlesztés néhány lehetősége pl. a szűrés, rendezés, a CRUD műveletek megvalósítása minden adatbázis elemre, ami a webshop jellegéből szükséges. Az API modelben meghatározott order kidolgozása, a számlázás biztosítása. 
Minden CRUD műveletre van megvalósított elem. A weblap tartalmazza a JWT authentikáción alapuló belépést és kilépést, más szerepkörrel más funkciók érhetőek el.
A SWAGGER dokumentikáció a bearer token megadása után 

> Written with [StackEdit](https://stackedit.io/).
