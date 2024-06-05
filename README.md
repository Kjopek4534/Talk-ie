# Talk'ie - Projekt na Pracownie Aplikacji Webowych

**Talk'ie** to minimalistyczny komunikator oparty na wiadomościach. Łączy on w sobie najlepsze elementy dostępnych na rynku aplikacji do komunikacji. W dalszej części zostaną przedstawione poszczególne aspekty projekty.


## Spis treści

* [Struktura Aplikacji](#Struktura-Aplikacji)
* [Design](#Design)
* [Instalacja](#Instalacja)
* [Testy](#Testy)
* [Technologie](#Technologie)
* [Autorzy](#Autorzy)
* [Podział Pracy](#Podział-Pracy)


## Struktura Aplikacji

* **Logowanie** ==> Każdy użytkownik Talk'ie posiada indywidualne konto na wyłączność.
* **Chaty** ==> Jak na komikator przystało, możesz wymieniać się wiadomościami tekstowymi z innymi użytkownikami Talk'ie.
* **Grupy** ==> Możesz Łączyć się z innymi użytkownikami, aby tworzyć własne mini-społeczniości.


## Design

[**Mobile**](https://github.com/Kjopek4534/Talk-ie/blob/main/design/Talki'e%20-%20Mobile%20Design.pdf)

[**Desktop**](https://github.com/Kjopek4534/Talk-ie/blob/main/design/Talk'ie%20-%20Desktop%20Design.pdf)

## Instalacja

**Krok 1:** Pobierz [Docker'a](https://docs.docker.com/get-docker/).

**Krok 2:** Sklonuj [repozytorium](https://github.com/Kjopek4534/Talk-ie.git) na swój komputer: https://github.com/Kjopek4534/Talk-ie.git .

**Krok 3:** Odpal termilnal i wpisz komendę *docker compose build* .

**Krok 4:** Wpisz kolejną komedę do terminala: *docker compose up* .

**Krok 5:** Odpal swoja przegladarkę i odpal [localhost'a na porcie 3000](http://localhost:3000/).
    
## Testy

Uruchamianie testów na front-end: *npm test* 

Uruchamianie testów na back-end: *npm run test*
## Technologie

**Client:** [Next.js](https://nextjs.org/), [CSS](https://www.w3.org/Style/CSS/)

**Server:** [Nest.js](https://nestjs.com/)

**Database:** [Prisma](https://www.prisma.io/), [PostgreSQL](https://www.postgresql.org/)

**Design:** [Figma](https://www.figma.com/)


## Autorzy

Uczniowie klasy 4E Zespołu Szkół Komunikacji im. Hipolita Cegielskiego w Poznaniu:
- [Konrad Jopek](https://github.com/Kjopek4534) 
- [Patryk Mendelewski](https://github.com/Illirock) 

## Podział Pracy

**Konrad:** Baza danych, Back-end, Szkielet strony

**Patryk:** Design, Front-end, Testy 

