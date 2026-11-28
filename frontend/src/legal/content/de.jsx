// =============================================================================
// Deutscher Text der Richtlinien. Muss genau dasselbe sagen wie en.jsx.
// Übersetzung von einer Muttersprachlerin / einem Juristen prüfen lassen.
// =============================================================================

import { Link } from 'react-router'
import { BUSINESS as B, PLANS, POLICY as P, mailto } from '../business'

const planLabel = (plan, i) =>
  plan.maxPatients ? `Bis zu ${plan.maxPatients} Patienten` : `Mehr als ${PLANS[i - 1].maxPatients} Patienten`

export default {
  privacy: {
    title: 'Datenschutzerklärung',
    Body: () => (
      <>
        <p>
          Diese Erklärung beschreibt, welche personenbezogenen Daten {B.name} („wir“) mit Sitz im Libanon erhebt,
          warum, wer sie sehen kann und welche Wahlmöglichkeiten du hast. Für Fragen oder Anfragen zum Datenschutz
          schreib an {mailto(B.privacyEmail)}.
        </p>

        <h2>Was wir erheben</h2>
        <ul>
          <li><b>Dein Konto:</b> Name, E-Mail-Adresse, ob du Patient/in oder Physiotherapeut/in bist, und dein Passwort. Das Passwort speichern wir nur als Einweg-Hash, nie das Passwort selbst.</li>
          <li><b>Passwort zurücksetzen:</b> Wenn du „Passwort vergessen“ nutzt, schicken wir dir per E-Mail einen einmaligen Link. Wir speichern nur eine verschlüsselte (gehashte) Version seines Codes, und der Link läuft nach 30 Minuten ab.</li>
          <li><b>Physiotherapeuten:</b> eine öffentliche ID (wie PT-ABC234), die wir erstellen, damit Patienten dich finden können.</li>
          <li><b>Patienten:</b> mit welcher Physiotherapie du verbunden bist und welche Übungen sie dir zuweist: Übung, Seite, Winkel, sicherer Bereich, Anzahl der Wiederholungen, wann aufzuhören ist, und ihre Bestätigung, dass du für die Übung freigegeben bist.</li>
          <li><b>Übungsergebnisse:</b> für jede Einheit die Übung und Seite, der damalige Plan, der höchste erreichte Winkel jeder Wiederholung und ob er das Ziel erreichte, die Anzahl der Wiederholungen, ein optionaler Schmerzwert sowie Datum und Uhrzeit.</li>
          <li><b>Technische Daten:</b> Deine IP-Adresse wird kurz im Arbeitsspeicher des Servers gehalten, um zu begrenzen, wie viele Anfragen eine Verbindung stellen kann. Sie wird nicht in unserer Datenbank gespeichert. Unsere Hosting-Anbieter können eigene Server-Logs führen.</li>
          <li><b>Abrechnung (nur Physiotherapeuten und Einrichtungen):</b> die Angaben, die nötig sind, um dir Rechnungen zu stellen und deine Zahlungen zu erfassen. Zahlungen gehen direkt an uns, außerhalb der App; Kartennummern sehen oder speichern wir in der App nie.</li>
          <li><b>Verifizierung von Physiotherapeuten:</b> Fotos oder Scans, die du hochlädst, von Ausweis oder Reisepass (Vorder- und Rückseite), ein Live-Selfie mit deinem Ausweis, deine OPTL-Karte (Vorder- und Rückseite) und die aktuelle Beitragsquittung, dein Abschluss oder deine Anerkennung und ein Nachweis deines Arbeitsorts; optional Versicherung und Fortbildungszertifikate. Außerdem speichern wir deine Telefonnummer, Preisregion, den Praxisnamen, die Sprachen, in denen du behandelst, und die Prüfentscheidung.</li>
          <li><b>Finanzielle Hilfe (Physiotherapeuten, die sie beantragen):</b> die gewählten Hilfsprogramme und ihre Dokumente: Einkommenserklärung und -nachweise, Schreiben der Gemeinde oder des Mokhtar, Abschlussdaten, Nachweise zu Vertreibung, Schäden oder Verletzungen, Verpflichtungs- oder Sponsorenschreiben sowie die Entscheidung.</li>
          <li><b>Zahlungen:</b> der gewählte Tarif, die eingegebene Überweisungsreferenz von Whish Money oder OMT, der Betrag und bis wann du bezahlt hast.</li>
          <li><b>Schmerzen und Vorfälle:</b> Nach einer Einheit können Patienten ihren Schmerz von 0 bis 10 bewerten und ein Problem beschreiben. Deine Physiotherapie sieht dies zusammen mit der Einheit.</li>
        </ul>
        <p>Übungspläne und Ergebnisse sind <b>Gesundheitsdaten</b>. Wir nutzen sie nur, um den Dienst für dich und deine Physiotherapie zu erbringen.</p>

        <h2>Was wir nicht erheben</h2>
        <ul>
          <li><b>Keine Videos oder Fotos deiner Übungen.</b> Das Kamerabild wird auf deinem eigenen Gerät ausgewertet, um den Winkel deines Gelenks zu messen. Es wird nie hochgeladen oder gespeichert. Gesendet werden nur die oben genannten Zahlen.</li>
          <li><b>Kein Tracking.</b> {B.name} nutzt keine Analyse-, Werbe- oder Social-Media-Tracker und setzt keine Cookies. Siehe <Link to="/cookies">Cookies und Speicher</Link>.</li>
          <li>Wir verkaufen deine Daten nicht und nutzen sie nicht für Werbung.</li>
        </ul>

        <h2>Wer deine Daten sehen kann</h2>
        <ul>
          <li><b>Deine Physiotherapie</b>, sobald du dich mit ihr verbindest: dein Name, deine E-Mail-Adresse, die zugewiesenen Übungen, deine 50 neuesten Übungsergebnisse (auch solche von vor der Verbindung) und eine wöchentliche Übersicht „brauchen Aufmerksamkeit“, die darauf beruht. Wenn du deine Physiotherapie entfernst, kann sie keine deiner Daten in {B.name} mehr sehen, und deine zugewiesenen Übungen werden gelöscht.</li>
          <li><b>Patienten</b>, die die öffentliche ID einer Physiotherapie eingeben, sehen deren Namen und ID.</li>
          <li><b>Dienstleister</b>, die den Dienst für uns betreiben: Netlify (hostet die Website), Render (betreibt unseren Server), unsere private MongoDB-Datenbank und unser E-Mail-Anbieter (versendet E-Mails zum Zurücksetzen des Passworts). Sie dürfen die Daten nur nutzen, um uns ihren Dienst zu erbringen.</li>
          <li>Behörden, nur soweit das Gesetz uns zur Weitergabe verpflichtet.</li>
          <li><b>Unser Prüfteam</b> sieht die Verifizierungs- und Hilfedokumente der Physiotherapeuten, nur um darüber zu entscheiden. Mit deiner Einwilligung können wir sie bei der Physiotherapeutenkammer (OPTL) oder der ausstellenden Stelle prüfen und jedes Quartal etwa 10 % der bewilligten Hilfeanträge kontrollieren.</li>
          <li><b>Angemeldete Patienten</b> sehen Namen, Region, Praxis, Sprachen und Verifiziert-Abzeichen der Physiotherapeuten, die im Verzeichnis gelistet sein möchten.</li>
        </ul>

        <h2>Warum wir sie nutzen (Rechtsgrundlage)</h2>
        <ul>
          <li>Konto- und Abrechnungsdaten: um den Dienst zu erbringen, für den du dich angemeldet hast.</li>
          <li>Gesundheitsdaten (Übungspläne und Ergebnisse): mit deiner ausdrücklichen Einwilligung, die du beim Erstellen eines Patientenkontos gibst. Du kannst sie jederzeit widerrufen, indem du deine Physiotherapie entfernst oder uns bittest, dein Konto zu löschen. Der Widerruf berührt die Nutzung davor nicht.</li>
          <li>IP-Adresse zur Begrenzung von Anfragen: um den Dienst sicher und verfügbar zu halten.</li>
        </ul>
        <p>Wir halten uns an das libanesische Gesetz Nr. 81 von 2018 über elektronische Transaktionen und personenbezogene Daten sowie, für Nutzer in der Europäischen Union, an die Datenschutz-Grundverordnung (DSGVO).</p>

        <h2>Wo deine Daten gespeichert werden</h2>
        <p>Unsere Server und unsere Datenbank können sich außerhalb deines Landes befinden. Wo das Gesetz es verlangt, sichern wir diese Übermittlungen mit geeigneten Garantien ab.</p>

        <h2>Gesprochene Rückmeldungen</h2>
        <p>Der Übungscoach spricht kurze Sätze (etwa „Sehr gut“) mit der eingebauten Sprachausgabe deines Browsers. Manche Browser nutzen dafür einen Online-Sprachdienst des Browserherstellers. Die Sätze sind für alle gleich und enthalten keine personenbezogenen Daten.</p>

        <h2>Wie lange wir sie aufbewahren</h2>
        <p>Wir bewahren dein Konto und deine Ergebnisse auf, solange dein Konto besteht. Wenn du uns bittest, dein Konto zu löschen, löschen wir es samt Ergebnissen innerhalb von {P.deletionDays} Tagen, außer Unterlagen, die wir gesetzlich aufbewahren müssen (etwa Rechnungen).</p>
        <p>Verifizierungs- und Hilfedokumente bewahren wir auf, solange dein Konto besteht, damit wir sie jährlich neu prüfen und Hilfen kontrollieren können. Endet ein Hilfezeitraum, löschen wir seine Dokumente innerhalb von 12 Monaten, sofern keine Prüfung oder Streitigkeit sie erfordert.</p>

        <h2>Deine Rechte</h2>
        <p>Du kannst verlangen, die Daten zu sehen, die wir über dich haben, sie zu berichtigen, zu löschen, eine Kopie zu erhalten oder ihrer Nutzung zu widersprechen bzw. sie einzuschränken. Für eine Anfrage, auch zur Schließung deines Kontos, schreib an {mailto(B.privacyEmail)}. Wir antworten innerhalb von {P.deletionDays} Tagen. Wenn du nicht zufrieden bist, kannst du dich bei der Datenschutzbehörde deines Wohnorts beschweren.</p>

        <h2>Sicherheit</h2>
        <p>Passwörter werden nur als Hash gespeichert. In der App musst du angemeldet sein, um personenbezogene Daten zu sehen, und die Daten einer Patientin oder eines Patienten können nur von dieser Person und ihrer verbundenen Physiotherapie gesehen werden. Unser Team und unsere Dienstleister greifen nur auf Daten zu, wenn das für Betrieb oder Reparatur des Dienstes nötig ist. Kein System ist völlig sicher; wenn ein Datenleck dich betrifft, informieren wir dich wie gesetzlich vorgeschrieben.</p>

        <h2>Kinder</h2>
        <p>Patienten unter {P.adultAge} Jahren dürfen {B.name} nur unter Aufsicht eines Elternteils oder Vormunds nutzen, der das Konto erstellt und verwaltet und die Einwilligungen im Namen des Kindes erteilt.</p>

        <h2>Änderungen</h2>
        <p>Wir aktualisieren diese Seite, wenn sich ändert, was wir erheben, und passen das Datum oben an.</p>
      </>
    ),
  },

  terms: {
    title: 'Nutzungsbedingungen',
    Body: () => (
      <>
        <p>
          Diese Bedingungen gelten, wenn du {B.name} mit Sitz im Libanon nutzt. Mit dem Erstellen eines Kontos stimmst du
          ihnen zu, ebenso der <Link to="/privacy">Datenschutzerklärung</Link> und, für Physiotherapeuten und Einrichtungen,
          der <Link to="/pricing">Richtlinie zu Preisen, Kündigung und Erstattungen</Link>.
        </p>

        <h2>Was {B.name} ist</h2>
        <p>Ein Werkzeug, mit dem eine Physiotherapie Heimübungen zuweisen kann und die Patientin oder der Patient sie vor einer Kamera ausführt, mit Rückmeldungen auf dem Bildschirm und per Sprache zum Gelenkwinkel und zu den Wiederholungen.</p>

        <h2>Keine medizinische Beratung, nicht für Notfälle</h2>
        <ul>
          <li>{B.name} diagnostiziert oder behandelt keine Erkrankung und ersetzt nicht deine Physiotherapie oder deine Ärztin bzw. deinen Arzt.</li>
          <li>Von der Kamera gemessene Winkel sind Schätzungen. Sie können durch Licht, Kameraposition, Kleidung oder den sichtbaren Teil deines Körpers falsch sein.</li>
          <li>Folge den Anweisungen deiner Physiotherapie. Hör auf und hol dir Rat, wenn du Schmerzen oder neue Beschwerden hast oder wenn dein Plan sagt, dass du aufhören sollst.</li>
          <li>Im Notfall ruf die örtliche Notrufnummer an.</li>
        </ul>

        <h2>Dein Konto</h2>
        <ul>
          <li>Mach korrekte Angaben und halte dein Passwort geheim. Ein Konto ist für eine Person.</li>
          <li>Patienten unter {P.adultAge} Jahren dürfen {B.name} nur unter Aufsicht eines Elternteils oder Vormunds nutzen, der für das Konto verantwortlich ist.</li>
        </ul>

        <h2>Physiotherapeuten und Einrichtungen</h2>
        <ul>
          <li>Du musst qualifiziert und berechtigt sein, dort zu praktizieren, wo du Patienten behandelst.</li>
          <li>Du bist verantwortlich für die zugewiesenen Übungen, Winkel, sicheren Bereiche und Abbruchkriterien und dafür, zu bestätigen, dass jede Person dafür klinisch freigegeben ist.</li>
          <li>Nutze die Daten der Patienten nur zu ihrer Behandlung und halte dich an die für dich geltenden Gesundheitsdaten- und Berufsregeln.</li>
          <li>Abonnements, Kündigung und Erstattungen regelt die <Link to="/pricing">Richtlinie zu Preisen, Kündigung und Erstattungen</Link>.</li>
          <li><b>Verifizierung:</b> Patienten können dich erst finden und hinzufügen, wenn unser Team deine Dokumente verifiziert hat. Wir prüfen sie jedes Jahr erneut, mit einer Kulanzfrist von 30 Tagen. Wir können ein Konto sperren, dessen Dokumente gefälscht oder abgelaufen sind.</li>
          <li><b>Fernbetreuung:</b> {B.name} unterstützt Heimübungen, die du verordnest. Stell sicher, dass eine Nachbetreuung aus der Ferne nach den für dich geltenden Regeln erlaubt ist; World Physiotherapy führt Telehealth im Libanon als nicht erlaubt, hol dir daher eine schriftliche Beratung ein, bevor du Fernbehandlung anbietest.</li>
          <li><b>Finanzielle Hilfe</b> wird von unserem Team entschieden. Gefälschte Dokumente führen zum Entzug der Hilfe, und du kannst 12 Monate lang keinen neuen Antrag stellen.</li>
        </ul>

        <h2>Preis</h2>
        <p>{B.name} ist für Patienten kostenlos. Physiotherapeuten zahlen einen Monatstarif per Überweisung über Whish Money oder OMT, die wir bestätigen. Tarife, Rabatte, Hilfen und Erstattungen sind in der <Link to="/pricing">Richtlinie zu Preisen, Kündigung und Erstattungen</Link> erklärt.</p>

        <h2>Zulässige Nutzung</h2>
        <p>Missbrauche den Dienst nicht: kein Zugriff auf Konten oder Daten anderer, keine Versuche, ihn zu beschädigen oder zu überlasten, und nichts Rechtswidriges.</p>

        <h2>Verfügbarkeit und Änderungen</h2>
        <p>Wir bemühen uns, {B.name} am Laufen zu halten, können aber nicht versprechen, dass es immer verfügbar oder fehlerfrei ist. Wir können Funktionen ändern oder einstellen und passen diese Bedingungen dann an.</p>

        <h2>Haftung</h2>
        <p>Wir haften nicht für Schäden, die entstehen, weil Übungen oder Messungen entgegen dem Rat deiner Physiotherapie genutzt werden, oder durch Ereignisse außerhalb unserer Kontrolle. Nichts in diesen Bedingungen beschränkt eine Haftung, die gesetzlich nicht beschränkt werden kann, oder deine Rechte als Verbraucher/in.</p>

        <h2>Beendigung der Nutzung</h2>
        <p>Du kannst {B.name} jederzeit nicht mehr nutzen und uns bitten, dein Konto zu löschen ({mailto(B.privacyEmail)}). Wir können ein Konto sperren, das gegen diese Bedingungen verstößt.</p>

        <h2>Recht und Kontakt</h2>
        <p>Für diese Bedingungen gilt libanesisches Recht, und für Streitigkeiten sind die zuständigen Gerichte des Libanon zuständig, unbeschadet der Rechte, die dir die Gesetze deines Wohnsitzlandes geben. Fragen: {mailto(B.email)}.</p>
      </>
    ),
  },

  pricing: {
    title: 'Preise, Kündigung und Erstattungen',
    Body: () => (
      <>
        <p>{B.name} ist <b>für Patienten kostenlos</b>. Jede Physiotherapeutin und jeder Physiotherapeut zahlt einen Monatstarif, der sich nach der Zahl der aktiven Patienten richtet. Du zahlst per Überweisung über Whish Money oder OMT und gibst die Belegreferenz in der App ein; wir bestätigen sie innerhalb von 1 Werktag.</p>

        <h2>Preise</h2>
        <table className="data-table">
          <thead><tr><th>Gleichzeitig verbundene Patienten</th><th>Preis pro Physiotherapeut/in</th></tr></thead>
          <tbody>
            {PLANS.map((plan, i) => (
              <tr key={plan.price}><td>{planLabel(plan, i)}</td><td>{plan.price} $ pro Monat</td></tr>
            ))}
          </tbody>
        </table>
        <p>Die Preise sind in US-Dollar. Jede Seite trägt ihre eigenen Bank- oder Überweisungsgebühren. Fällt eine Steuer an, steht sie auf der Rechnung. Eine Einrichtung zahlt für jede ihrer Physiotherapeutinnen und jeden ihrer Physiotherapeuten denselben Preis, sofern nichts anderes schriftlich vereinbart ist.</p>

        <h2>Regionaler Rabatt</h2>
        <p>Der Ort deiner Praxis bestimmt einen Rabatt von 0 % (Beirut) bis 50 % (Akkar), basierend auf üblichen Praxispreisen und dem Bedarf in der Region: D = min(50 %, 0,5 × (1 − P / 35) + 0,3 × N), gerundet auf die nächsten 5 %, wobei P der übliche Preis einer Einheit in der Region in Dollar und N ein Bedarfswert von 0 bis 1 ist. Dein Arbeitsortnachweis bestätigt die Region.</p>

        <h2>Finanzielle Hilfe</h2>
        <ul>
          <li>Fünf Programme kommen zum regionalen Rabatt hinzu: Berufseinstieg (+30 %, einmalig), finanzielle Notlage (+10 bis +40 %), Krieg oder Vertreibung (+20 bis +30 %), Verpflichtung zur Gemeinschaftsversorgung (+20 %) und gesponserte Plätze (bis zu 100 %, bezahlt von einer NGO, dem Gesundheitsministerium, der OPTL oder einer Universität).</li>
          <li>Der Gesamtrabatt ist auf 75 % begrenzt, und der Preis fällt nie unter 6 $ im Monat, außer ein Sponsor zahlt deinen Platz.</li>
          <li>Wir entscheiden innerhalb von 5 Werktagen. Summen über 50 % brauchen eine zweite Prüfung. Die Hilfe gilt 6 Monate und wird mit neuen Nachweisen verlängert.</li>
        </ul>

        <h2>Jahreszahlung, Pilot und Empfehlungen</h2>
        <ul>
          <li>Zahl 12 Monate im Voraus zum Preis von 10.</li>
          <li>Pilot-Physiotherapeuten erhalten den ersten Monat kostenlos, danach 12 Monate zum halben Preis.</li>
          <li>Empfiehl eine andere Physiotherapie mit deiner öffentlichen ID: Ihr bekommt beide einen Gratismonat, sobald sie verifiziert ist.</li>
        </ul>

        <h2>Abrechnung</h2>
        <ul>
          <li>Die Abrechnung erfolgt monatlich im Voraus ab dem Tag, an dem dein Abonnement beginnt.</li>
          <li>Dein Tarif hängt davon ab, wie viele Patienten gleichzeitig mit dir verbunden sind. Überschreitest du die Grenze deines Tarifs, bitten wir dich, ab deinem nächsten Abrechnungsmonat in den nächsthöheren Tarif zu wechseln. Vergangene Monate berechnen wir nie nach.</li>
          <li>Der Wechsel in einen größeren Tarif gilt sofort; der neue Preis beginnt mit deinem nächsten Abrechnungsmonat. Der Wechsel in einen kleineren Tarif gilt ab deinem nächsten Abrechnungsmonat, sofern deine Patienten hineinpassen.</li>
          <li>Du kannst nicht mehr Patienten verbinden, als dein Tarif erlaubt; wähle zuerst unter Tarif und Abrechnung einen größeren Tarif.</li>
        </ul>

        <h2>Kündigung</h2>
        <ul>
          <li>Du kannst jederzeit per E-Mail an {mailto(B.email)} kündigen. Es gibt keine Mindestlaufzeit und keine Kündigungsgebühr.</li>
          <li>Die Kündigung wird zum Ende des bereits bezahlten Monats wirksam. Bis dahin behältst du vollen Zugang, und es wird nichts mehr berechnet.</li>
          <li>Danach können wir dein Konto so einschränken, dass du keine neuen Patienten verbinden und keine Übungen zuweisen kannst, bis du wieder abonnierst. Deine Patienten behalten ihre kostenlosen Konten und ihre eigenen Ergebnisse.</li>
        </ul>

        <h2>Erstattungen</h2>
        <ul>
          <li><b>Garantie für die erste Zahlung:</b> Wenn du neu bei {B.name} bist, erhältst du deine erste Zahlung vollständig zurück, wenn du innerhalb von {P.moneyBackDays} Tagen nach der Zahlung darum bittest.</li>
          <li><b>Immer erstattet:</b> doppelte Zahlungen, Abrechnungsfehler und jede Belastung nach Wirksamwerden deiner Kündigung.</li>
          <li><b>Lange Ausfälle:</b> Ist {B.name} wegen eines Problems auf unserer Seite mehr als {P.outageHours} Stunden am Stück nicht verfügbar, erstatten wir diese Tage anteilig oder schreiben sie gut, wenn du darum bittest.</li>
          <li><b>Wenn wir den Dienst einstellen</b> oder dein Konto schließen, ohne dass du gegen die <Link to="/terms">Bedingungen</Link> verstoßen hast, erstatten wir den ungenutzten Teil des bezahlten Monats.</li>
          <li>Ansonsten werden bereits begonnene Monate nicht erstattet, auch nicht bei Kündigung mitten im Monat.</li>
          <li>Konten, die wegen Verstößen gegen die Bedingungen geschlossen wurden, erhalten für den laufenden Monat keine Erstattung.</li>
        </ul>

        <h2>So beantragst du eine Erstattung</h2>
        <p>Schreib innerhalb von {P.refundRequestDays} Tagen nach der Zahlung an {mailto(B.email)}, mit deinem Namen und dem Zahlungsdatum. Wir antworten innerhalb von {P.refundReplyDays} Werktagen und zahlen bewilligte Erstattungen innerhalb von {P.refundPayDays} Tagen aus, wenn möglich auf demselben Weg, auf dem du bezahlt hast.</p>

        <h2>Zahlungsverzug</h2>
        <p>Wird eine Rechnung nicht innerhalb von {P.latePaymentDays} Tagen nach Fälligkeit bezahlt, können wir dein Konto bis zur Zahlung auf reine Ansicht beschränken. Wegen Zahlungsverzugs löschen wir nie Daten von Patienten.</p>

        <h2>Preisänderungen</h2>
        <p>Wir informieren dich mindestens {P.priceNoticeDays} Tage vor einer Preisänderung per E-Mail. Der neue Preis gilt ab deinem ersten Abrechnungsmonat nach der Mitteilung, und du kannst vorher kündigen.</p>

        <h2>Deine gesetzlichen Rechte</h2>
        <p>Nichts in dieser Richtlinie schränkt Rechte ein, die dir nach den für dich geltenden Verbraucherschutzgesetzen zustehen.</p>
      </>
    ),
  },

  cookies: {
    title: 'Cookies und Speicher',
    Body: () => (
      <>
        <p>{B.name} setzt <b>keine Cookies</b> und nutzt keine Analyse, Werbung oder Tracker von Dritten. Es speichert einige wenige Einträge im lokalen Speicher deines Browsers, nur damit die Funktionen, die du nutzt, funktionieren:</p>
        <table className="data-table">
          <thead><tr><th>Eintrag</th><th>Wofür er dient</th><th>Wann er entfernt wird</th></tr></thead>
          <tbody>
            <tr><td><code>authToken</code></td><td>Hält dich angemeldet</td><td>Wenn du dich abmeldest oder die Anmeldung abläuft</td></tr>
            <tr><td><code>pendingSessions</code></td><td>Offline gespeicherte Übungsergebnisse, damit sie später gesendet werden können</td><td>Sobald sie gesendet sind</td></tr>
            <tr><td><code>appLanguage</code></td><td>Die Sprache, die du für die App gewählt hast</td><td>Wenn du deine Browserdaten löschst</td></tr>
            <tr><td><code>coachLanguage</code></td><td>Die Sprache, die du für den Coach gewählt hast</td><td>Wenn du deine Browserdaten löschst</td></tr>
            <tr><td><code>storageNoticeSeen</code></td><td>Merkt sich, dass du den Speicherhinweis geschlossen hast</td><td>Wenn du deine Browserdaten löschst</td></tr>
          </tbody>
        </table>
        <p>Diese Einträge sind für den von dir gewünschten Dienst unbedingt erforderlich, deshalb fragen wir nicht nach einer Einwilligung. Sollten wir je optionale Cookies oder Analysen einführen, fragen wir zuerst nach deiner Einwilligung, und du kannst ablehnen.</p>
        <p>Du kannst diese Einträge jederzeit in den Browsereinstellungen löschen (für diese Website: Websitedaten löschen). Du wirst dann abgemeldet, und noch nicht gesendete Ergebnisse gehen verloren.</p>
      </>
    ),
  },

  accessibility: {
    title: 'Barrierefreiheit',
    Body: () => (
      <>
        <p>Wir möchten, dass alle Menschen {B.name} nutzen können, auch Menschen mit Schmerzen, ältere Menschen und Menschen mit Behinderungen. Unser Ziel ist die Konformität mit den Web Content Accessibility Guidelines (WCAG) 2.2 auf Stufe AA.</p>
        <h2>Was wir getan haben</h2>
        <ul>
          <li>Große Standardschrift (18 px), kontrastreiche Farben und Schaltflächen von mindestens 44 Pixel Höhe.</li>
          <li>Alles ist per Tastatur bedienbar, mit einem gut sichtbaren Fokusrahmen.</li>
          <li>Formularfelder haben sichtbare Beschriftungen, und Fehler werden in Worten erklärt, nicht nur durch Farbe.</li>
          <li>Der Übungscoach spricht seine Rückmeldungen, sodass du nicht auf den Bildschirm schauen musst.</li>
          <li>Animationen werden reduziert, wenn dein Gerät auf reduzierte Bewegung eingestellt ist.</li>
          <li>Die App, der Übungscoach und diese Richtlinien sind in acht Sprachen verfügbar: Arabisch (von rechts nach links), Westarmenisch, Englisch, Französisch, Spanisch, Deutsch, Italienisch und Türkisch.</li>
        </ul>
        <h2>Bekannte Einschränkungen</h2>
        <ul>
          <li>Der Übungscoach braucht eine Kamera und genug von deinem Körper im Bild, um Winkel zu messen.</li>
          <li>Einige seltene technische Meldungen des Servers, die nur erscheinen, wenn in der App selbst etwas schiefgeht, gibt es nur auf Englisch.</li>
          <li>Die Website wurde noch nicht von einer unabhängigen Expertin oder einem unabhängigen Experten für Barrierefreiheit geprüft.</li>
        </ul>
        <h2>Melde uns ein Problem</h2>
        <p>Wenn etwas schwer zu bedienen ist, schreib an {mailto(B.email)} und sag uns, welche Seite betroffen ist und was passiert ist. Wir antworten und arbeiten an einer Lösung.</p>
      </>
    ),
  },
}
