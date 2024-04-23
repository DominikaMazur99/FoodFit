Figma: https://www.figma.com/file/2IBxxomJZLk6o8coSLUBCU/FoodFit?type=design&mode=design&t=n5WM1l6AgdhjTljm-1

# Ogólny opis:

Aplikacja FoodFit to wszechstronna aplikacja, która oferuje różnorodne funkcjonalności, umożliwiające użytkownikom kontrolowanie ilości spożywanych posiłków, a także monitorowanie codziennej aktywności fizycznej. Głównym celem aplikacji FoodFit jest ułatwienie codziennego życia poprzez świadomie podejmowanie decyzji dotyczących swojego żywienia i aktywności fizycznej, co prowadzi do poprawy ogólnego stanu zdrowia i samopoczucia.

# Szczegółowy opis techniczny:

Użyte technologie: Vue, JavaScript, HTML, CSS

### 1. Ekran Rejestracji:
Ekran ten umożliwia użytkownikowi rejestrację nowego konta. 
#### Elementy Interfejsu:
  - Pole tekstowe dla nazwy użytkownika.
  - Pole tekstowe dla hasła.
  - Pole tekstowe dla powtórzenia hasła.
  - Pole tekstowe dla adresu e-mail.
  - Przycisk "Zarejestruj się".
  - Przycisk “Posiadasz już konto? Zaloguj się”.
#### Funkcje:
  Rejestracja Nowego Konta:
  - Użytkownik wprowadza swoją nazwę użytkownika, hasło, powtórzone hasło i adres e-mail.
  - Po wypełnieniu wszystkich pól i kliknięciu przycisku "Zarejestruj się", dane są walidowane.
  - Jeśli dane są poprawne, nowe konto jest tworzone, a użytkownik zostaje przekierowany na ekran logowania.
  - W przypadku niepoprawnych danych, wyświetlany jest komunikat o błędzie, informujący użytkownika o konieczności poprawienia danych.
  - W przypadku, gdy użytkownik posiada już konto lub udało mu się zarejestrować konto, dzięki przyciskowi “Posiadasz już konto…” może przenieść się do widoku logowania.


### 2. Ekran Logowania:
Ekran ten umożliwia użytkownikowi zalogowanie się do konta. 
#### Elementy Interfejsu:
- Pole tekstowe dla nazwy użytkownika.
- Pole tekstowe dla hasła.
- Przycisk "Zaloguj".
- Przycisk “Nie posiadasz jeszcze konta? Zarejestruj się!”.
#### Funkcje:
Logowanie do Istniejącego Konta:
- Użytkownik wprowadza swoją nazwę użytkownika i hasło.
- Po wypełnieniu pól i kliknięciu przycisku "Zaloguj się", dane są sprawdzane w bazie danych.
- Jeśli dane są poprawne, użytkownik zostaje przekierowany do głównego ekranu aplikacji.
- W przypadku niepoprawnych danych, wyświetlany jest komunikat o błędzie, informujący użytkownika o konieczności sprawdzenia loginu i hasła.
- W przypadku, gdy użytkownik nie posiada jeszcze konta, dzięki przyciskowi “Nie posiadasz konta?...” może przenieść się do ekranu rejestracji.
### 3. Ekran Menu:
Ekran ten wyświetla się po zalogowaniu do aplikacji. Znajdują się na nim przyciski służące nawigacji po aplikacji.
#### Elementy Interfejsu:
- Przycisk “Zapotrzebowanie kaloryczne”
- Przycisk “Dziennik posiłków i aktywności”
- Przycisk “Wyloguj”
#### Funkcje:
- Przyciski znajdujące się na ekranie, pozwalają użytkownikowi przenieść się do innych widoków. 
- Użycie przycisku “Zapotrzebowanie kaloryczne” przenosi użytkownika do widoku z kalkulatorem kalorii, natomiast drugi przycisk przenosi użytkownika do widoku w którym można dodać posiłki oraz aktywności.
- Ostatni przycisk - “Wyloguj” przenosi użytkownika do ekranu logowania.
### 4. Ekran Kalkulator kalorii:
Ekran ten zawiera narzędzie do obliczenia całkowitej przemiany materii oraz dziennego zapotrzebowania kalorycznego użytkownika. Dane obliczane są według specjalistycznych wzorów. Na wynik wpływ mają następujące parametry: płeć, wiek, waga, wzrost, poziom aktywności w pracy oraz w wolnym czasie i cel diety.
#### Elementy Interfejsu:
- Pola wejściowe, na dane niezbędne do obliczenia zapotrzebowania kalorycznego:
- Przycisk “FoodFit”
- Dropdown lista “płeć” 
- Pola tekstowe do wprowadzenia wieku,  wagi i wzrostu 
- Dropdown lista “poziom aktywności w pracy”
  ###### opcje do wyboru:
  - bardzo lekka - np. praca przed komputerem, kierowca
  - lekka - np. lekka praca przemysłowa, sprzedaż
  - umiarkowana - np. sprzątanie, praca w kuchni
  - ciężka - np. przemysł, prace budowlane lub rolnictwo
  
- Dropdown lista “poziom aktywności w wolnym czasie”
  ###### opcje do wyboru:
  - bardzo lekka - brak aktywności w wolnym czasie
  - lekka - np. raz w tygodniu spaceruje, pracuję w ogródku
  - umiarkowana - regularnie ćwiczę min. raz w tygodniu 
  - duża - regularnie ćwiczę więcej niż raz w tygodniu
  - intensywna - ciężka aktywności fizyczna kilka razy w tygodniu
  
- Dropdown lista “cel diety”
  ###### opcje do wyboru:
  - chcę schudnąć
  - chcę utrzymać wagę
  - chcę przytyć
    
- Przycisk “Oblicz”
- Tekst z obliczoną liczną kalorii
#### Funkcje:
- Użytkownik ma możliwość powrotu do strony menu, używając przycisku “FoodFit”
- Wybór użytkownika z dropdown’u “płeć” posłuży jako wskaźnik, który wzór do obliczenia całkowitej przemiany materii powinien zostać użyty
- Użytkownik uzupełnia pola tekstowe “wiek”, “waga” oraz “wzrost” - dane te będą użyte we wzorze na całkowitą przemianę materii
- Użytkownik wybiera poziom aktywności w pracy oraz w czasie wolnym - dane te również będą użyte we wzorze na całkowitą przemianę materii
- Użytkownik wybiera cel diety. Dane te będą służyć obliczeniu dziennego zapotrzebowania kalorycznego:
  - chcę schudnąć - całkowitą przemianę materii - 15%
  - chcę utrzymać wagę - całkowitą przemianę materii
  - chcę przytyć - całkowitą przemianę materii + 15%
- Przycisk oblicz powoduje zaktualizowanie wartości zapotrzebowania kalorycznego, która znajduje się na samym dole widoku. Wartość ta, użyta będzie również w kolejnym widoku (Dziennik posiłków i aktywności)
### 5. Ekran Dziennik posiłków i aktywności:
Ekran umożliwia użytkownikowi wprowadzanie informacji dotyczących spożytych posiłków oraz wykonywanych aktywności. Na podstawie tych danych obliczane są zjedzone oraz spalone kalorie oraz wyświetlany jest dzienny cel kaloryczny.
#### Elementy Interfejsu:
W widoku wydzielone są dwie zakładki: “Posiłki” oraz “Aktywność”.
##### Zakładka “Posiłki”:
- Przyciski “P”, “W”, “Ś”, “C”, “P”, “S”, “N”
- Pola opcjonalne “Śniadanie”, “|| Śniadanie”, “Obiad”, “Podwieczorek”, “Kolacja”
- Pola dodane pod polami opcjonalnymi: nazwa produktu/potrawy oraz liczba kalorii
- Tekst “Cel kaloryczny: [liczba dostarczonych kcal - liczba spalonych kcal] / zapotrzebowanie kaloryczne użytkownika
##### Zakładka “Aktywności”:
- Przyciski “P”, “W”, “Ś”, “C”, “P”, “S”, “N”
- Pole opcjonalne “Trening”
- Pola dodane pod polem opcjonalnych “Trening”: nazwa aktywności fizycznej oraz liczba spalonych kalorii.
- Tekst “Liczba spalonych kalorii: liczba spalonych kcal]”
#### Funkcje:
- Użytkownik ma możliwość powrotu do strony menu, używając przycisku “FoodFit”
##### Zakładka “Posiłki”:
- Dzień tygodnia pobierany jest z czasu systemowego, następnie wybrany zostaje odpowiedni dzień tygodnia w aplikacji.
- Użytkownik Klikając na “+” znajdujący się przy danej kategorii posiłku dodaje nową pozycję. W polu tekstowym podaje nazwę produktu/potrawy oraz jej kaloryczność lub wybiera posiłek z gotowej bazy. Możliwe jest dodanie kilku produktów w jednej kategorii. Możliwe jest również usunięcie lub edycja nazwy i liczby kalorii pozycji.
- Z każdą nowo dodaną pozycją tekst “Cel kaloryczny” zostaje zaktualizowany.
##### Zakładka “Aktywności”:
- Dzień tygodnia pobierany jest z czasu systemowego, następnie wybrany zostaje odpowiedni dzień tygodnia w aplikacji.
- Użytkownik Klikając na “+” znajdujący się przy “Trening” dodaje nową pozycję. W polu tekstowym podaje nazwę aktywności oraz liczbę spalonych kalorii lub wybiera aktywność z gotowej bazy. Możliwe jest dodanie kilku aktywności. Możliwe jest również usunięcie lub edycja nazwy i liczby spalonych kalorii pozycji.
- Z każdą nowo dodaną pozycją wartość pola “Liczba spalonych kalorii” zostaje zaktualizowana.

