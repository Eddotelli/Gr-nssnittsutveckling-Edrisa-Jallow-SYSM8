Hur valde jag att strukturera upp mitt projekt

Jag ville först och främst göra det simpelt för mig själv genom att lägga upp en plan som jag utgår från start till slut. Det fanns även en tydlig mall i inlämningsuppgiften av våran lärare som man kunde följa och det gjorde jag i större del. Jag började med att skapa min design i Figma – där skapade jag en userflow mellan olika sidor och komponenter. Mitt mål var att gå för ett VG som då krävde att man skapade en mobilanpassad Figma-design.

Min plan var att skapa mobilversionen i Figma efter att jag slutfört desktopversionen. Där insåg jag snabbt att min ursprungliga plan inte höll – jag ville egentligen färdigställa hela Figma-designen innan jag började koda, men tidsbristen tvingade mig att byta strategi.

---

Struktur och tekniska val

Innan jag började koda så skapade jag de nödvändiga filerna och strukturera dem i olika mappar. Strukturen som gick för var utifrån tips från läraren och det var det mest logiska också. Med hjälp av den strukturen kunde jag enkelt återanvända kod genom komponenter.
Jag valde att köra med React – gillade att jobba i React då jag behärskade det lättast. Till kodningen så använde jag mig av en lokal db.json-fil tillsammans med JSON Server som backend-lösning. Applikationen hämtar data via fetch()-anrop till min olika endpoints (/menu, /favorites, /orders) beroende på användarens interaktion. Detta gav en tydlig överblick och snabb utvecklingsmiljö utan behov av extern databas.

---

Utmaningar och lösningar

De vanligaste tekniska hinder/buggar som jag stötte på var mest när något inte synkade mellan de olika sidorna. Oftast var det att jag hade missat att uppdatera en variabel eller en funktion som var en mellanhand. Sen även css-buggar där man ändrar en klass som leder till att någon annan klass ändras också. Hur jag gick tillväga för att lösa de problemen – mycket felsökning själv genom att läsa felmeddelanden som oftast berättar om vilken rad och fil som buggade.

Felsökte jag allt för länge eller kände att jag hade ont om tid så använde jag mig av AI. Jag har dock definitivt lärt mig att felsöka smartare genom att använda mig av konsoler som skrivs ut eller ej för att kontrollera något. Ett exempel är när jag skulle kontrollera om användare förblev inloggade när jag växlade mellan de olika sidorna, där en boolean visade att man var inloggad.

---

Reflektion kring design och lärdomar

Momentet som tog längre tid var Figma-delen – jag har accepterat att design och css är inte en av mina starka sidor. För mycket pill och vissa stunder där jag hade en sådan beslutsångest om vad jag ska ha och inte ha som påverkade min tålamod och motivation. Tacksam för att det finns olika sidor, videos och paket som man kan ta tips samt använda sig av.

Av detta projektet så lärde jag mig hur det är i det verkliga arbetslivet. Som min lärare nämnde, så här är det att jobba ut mot kunder. Hela processen från att skapa en design i Figma som man sedan implementerar i kod för att bygga applikationer. Fastän att jobba i Figma inte är en prioritering för mig så är jag ändå väldigt tacksam och nöjd över mig själv över att få testa på och bygga en applikationsdesign.

---

Framtidstankar

Detta projektet har fått mig att se var mina styrkor ligger främst och det är backend-kodning. Något jag hade gjort annorlunda hade varit att nyttja tjänster som hjälper en att bygga frontend-sidor mycket lättare och snabbare. I framtiden strävar jag efter att jobba med folk som älskar front-end, som jag kan lära mig ifrån.

Summan av kardemumman så har jag lärt mig att läsa av kod enklare och förstå syftet med det bättre. Jag har lärt mig hur man ska tänka kring UX/UI för att ge en användare den upplevelse de behöver samt kan få. Det är sånt jag kommer att lägga mer tid på kommande tid och bygga vidare på min applikation med funktioner som jag inte har hunnit implementera.
