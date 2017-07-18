# Wordio (name pending) Szabályok 

## Játékok

_Játéknak_ nevezek egy szókereső feladványt.
Egy játéknak 5 jellemzője lehet, 3 kötelező és 2 opcionális.

|Név|Leírás|Követelmények|
|:-|:-|:-|
| _Név_ | A játék neve, mely publikusan látszódik majd. | Kötelező kitölteni. |
| _Játékmester_ | A _felhasználó_ aki a játékot létrehozta. Csak a publikusan látható neve fog látszódni. Regisztrációra van szükség hozzá. Ennek az az oka, hogy neki később elérhetővé kell tennünk a megoldásokat, anélkül, hogy publikusan elérhetővé tennénk őket. | Kötelező kitölteni. |
| _Tábla_ | Maga a szókereső feladvány, n×m-es mátrix formájában. |  Kötelező kitölteni. Nem lehet üres. |
| _Érvényesség kezdete_ | Az az időpont amitől kezdve elfogadunk megoldásokat. | Nem kötelező, de ha ki van töltve ez is és az _Érvényesség vége_ is, akkor nem lehet nagyobb az _Érvényesség végénél_. |
| _Érvényesség vége_ | Az az időpont amitől kezdve nem fogadunk el több megoldást. | Nem kötelező, de ha ki van töltve ez is és az _Érvényesség kezdete_ is, akkor nem lehet kisebb az _Érvényesség kezdeténél_.|

## Megoldások

_Megoldásnak_ nevezünk egy egy megoldást amit a feladványra leadhatnak a felhasználók.

|Név|Leírás|Követelmények|
|:-|:-|:-|
| _Becenév_ | Az az azonosító, melyet a _Játékmester_ a megoldás mellett fog látni. Nem regisztrációhoz kötött. | Kitöltése kötelező |
| _Tábla_ | A bejelölt mezők a táblán. Ebből a kliens rekonstruálni tudja majd a megoldást a _Játékmester_ oldalán. | Kitöltése kötelező, lehet üres |

## Tábla

A _Tábla_ maga a szókereső játék. _Mezőkből_ áll.
A méretei a _Játékmester_ által állíthatók.
Új játék létrehozásakor Minden mező kitöltése kötelező.

## Mező

A _mező_ a játék legkisebb egysége.

|Név|Leírás|Követelmények|
|:-|:-|:-|
| _Érték_| Az _érték_ maga a szöveg, vagy karakter ami a játékok számára megjelenik a mezőben. | Kitöltése kötelező.|
| _Megoldás?_| A megoldásként megjelölt mezők eltalálása a játékosok feladata.| Kitöltése nem kötelező. |
