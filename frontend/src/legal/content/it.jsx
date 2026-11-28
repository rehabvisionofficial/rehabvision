// =============================================================================
// Testo italiano delle informative. Deve dire esattamente le stesse cose di en.jsx.
// Traduzione da far rileggere a un madrelingua o a un legale.
// =============================================================================

import { Link } from 'react-router'
import { BUSINESS as B, PLANS, POLICY as P, mailto } from '../business'

const planLabel = (plan, i) =>
  plan.maxPatients ? `Fino a ${plan.maxPatients} pazienti` : `Più di ${PLANS[i - 1].maxPatients} pazienti`

export default {
  privacy: {
    title: 'Informativa sulla privacy',
    Body: () => (
      <>
        <p>
          Questa informativa spiega quali dati personali raccoglie {B.name} («noi»), con sede in Libano, perché,
          chi può vederli e quali scelte hai. Per qualsiasi domanda o richiesta sulla privacy, scrivi
          a {mailto(B.privacyEmail)}.
        </p>

        <h2>Cosa raccogliamo</h2>
        <ul>
          <li><b>Il tuo account:</b> nome, indirizzo email, se sei paziente o fisioterapista, e la tua password. Conserviamo la password solo come hash irreversibile, mai la password stessa.</li>
          <li><b>Reimpostazione della password:</b> se usi «Password dimenticata», ti inviamo via email un link monouso. Conserviamo solo una versione cifrata (hash) del suo codice, e il link scade dopo 30 minuti.</li>
          <li><b>Fisioterapisti:</b> un ID pubblico (come PT-ABC234) che creiamo perché i pazienti possano trovarti.</li>
          <li><b>Pazienti:</b> a quale fisioterapista sei collegato e gli esercizi che ti assegna: esercizio, lato, angoli, intervallo sicuro, numero di ripetizioni, quando fermarsi e la sua conferma che sei idoneo all’esercizio.</li>
          <li><b>Risultati degli esercizi:</b> per ogni sessione, l’esercizio e il lato, il piano in quel momento, l’angolo massimo raggiunto in ogni ripetizione e se ha raggiunto l’obiettivo, il numero di ripetizioni, un punteggio facoltativo del dolore, la data e l’ora.</li>
          <li><b>Dati tecnici:</b> il tuo indirizzo IP viene tenuto brevemente nella memoria del server per limitare quante richieste può fare una connessione. Non viene salvato nel nostro database. I nostri fornitori di hosting possono conservare i propri log.</li>
          <li><b>Fatturazione (solo fisioterapisti e istituzioni):</b> i dati necessari per fatturarti e registrare i tuoi pagamenti. I pagamenti vengono fatti direttamente a noi, fuori dall’app; nell’app non vediamo né conserviamo mai numeri di carta.</li>
          <li><b>Verifica dei fisioterapisti:</b> le foto o scansioni che carichi del documento d’identità o del passaporto (fronte e retro), un selfie dal vivo con il documento, la tessera OPTL (fronte e retro) e la ricevuta della quota dell’anno, la laurea o l’equipollenza e la prova del luogo di lavoro; facoltativamente l’assicurazione e gli attestati di formazione. Conserviamo anche il numero di telefono, la regione di prezzo, il nome dello studio, le lingue in cui tratti i pazienti e l’esito della verifica.</li>
          <li><b>Aiuto economico (fisioterapisti che lo richiedono):</b> i percorsi scelti e i relativi documenti: dichiarazione e prove di reddito, lettera del comune o del mokhtar, date di laurea, prove di sfollamento, danni o lesioni, lettere di impegno o dello sponsor, e la decisione.</li>
          <li><b>Pagamenti:</b> il piano scelto, il riferimento del trasferimento Whish Money o OMT che inserisci, l’importo e fino a quando hai pagato.</li>
          <li><b>Dolore e incidenti:</b> dopo una sessione i pazienti possono valutare il dolore da 0 a 10 e descrivere un problema. Il tuo fisioterapista lo vede insieme alla sessione.</li>
        </ul>
        <p>I piani e i risultati degli esercizi sono <b>dati sanitari</b>. Li usiamo solo per fornire il servizio a te e al tuo fisioterapista.</p>

        <h2>Cosa non raccogliamo</h2>
        <ul>
          <li><b>Nessun video o foto dei tuoi esercizi.</b> L’immagine della fotocamera viene analizzata sul tuo dispositivo per misurare l’angolo dell’articolazione. Non viene mai caricata né salvata. Vengono inviati solo i numeri indicati sopra.</li>
          <li><b>Nessun tracciamento.</b> {B.name} non usa strumenti di analisi, pubblicità o social media e non imposta cookie. Vedi <Link to="/cookies">Cookie e archiviazione</Link>.</li>
          <li>Non vendiamo i tuoi dati né li usiamo per la pubblicità.</li>
        </ul>

        <h2>Chi può vedere i tuoi dati</h2>
        <ul>
          <li><b>Il tuo fisioterapista</b>, una volta collegato: nome, email, esercizi assegnati, i tuoi 50 risultati più recenti (compresi quelli precedenti al collegamento) e un riepilogo settimanale «richiedono attenzione» basato su di essi. Se rimuovi il tuo fisioterapista, non potrà più vedere nessuno dei tuoi dati in {B.name} e gli esercizi assegnati verranno cancellati.</li>
          <li><b>I pazienti</b> che inseriscono l’ID pubblico di un fisioterapista vedono il suo nome e il suo ID.</li>
          <li><b>I fornitori di servizi</b> che gestiscono il servizio per noi: Netlify (ospita il sito), Render (esegue il nostro server), il nostro database privato MongoDB e il nostro fornitore di email (invia le email di reimpostazione della password). Possono usare i dati solo per fornirci il loro servizio.</li>
          <li>Le autorità, solo quando la legge ci obbliga a condividerli.</li>
          <li><b>Il nostro team di revisione</b> vede i documenti di verifica e di aiuto dei fisioterapisti, solo per decidere su di essi. Con il tuo consenso possiamo verificarli presso l’Ordine dei fisioterapisti (OPTL) o chi li ha emessi, e controllare ogni trimestre circa il 10 % delle pratiche di aiuto approvate.</li>
          <li><b>I pazienti connessi</b> vedono nome, regione, studio, lingue e badge di verifica dei fisioterapisti che scelgono di comparire nell’elenco.</li>
        </ul>

        <h2>Perché li usiamo (base giuridica)</h2>
        <ul>
          <li>Dati dell’account e di fatturazione: per fornire il servizio a cui ti sei iscritto.</li>
          <li>Dati sanitari (piani e risultati degli esercizi): con il tuo consenso esplicito, dato quando crei un account paziente. Puoi revocarlo in qualsiasi momento rimuovendo il tuo fisioterapista o chiedendoci di cancellare l’account. La revoca non incide sull’uso precedente.</li>
          <li>Indirizzo IP per limitare le richieste: per mantenere il servizio sicuro e disponibile.</li>
        </ul>
        <p>Rispettiamo la Legge libanese n. 81 del 2018 sulle transazioni elettroniche e i dati personali e, per gli utenti nell’Unione europea, il Regolamento generale sulla protezione dei dati (GDPR).</p>

        <h2>Dove sono conservati i tuoi dati</h2>
        <p>I nostri server e il nostro database possono trovarsi fuori dal tuo paese. Dove la legge lo richiede, applichiamo garanzie adeguate a questi trasferimenti.</p>

        <h2>Indicazioni vocali</h2>
        <p>Il coach degli esercizi pronuncia frasi brevi (come «Molto bene») usando la sintesi vocale integrata del tuo browser. Alcuni browser usano per questo un servizio vocale online del produttore del browser. Le frasi sono uguali per tutti e non contengono dati personali.</p>

        <h2>Per quanto tempo li conserviamo</h2>
        <p>Conserviamo il tuo account e i tuoi risultati finché l’account è aperto. Quando ci chiedi di cancellarlo, lo cancelliamo insieme ai risultati entro {P.deletionDays} giorni, salvo i documenti che la legge ci impone di conservare (come le fatture).</p>
        <p>I documenti di verifica e di aiuto vengono conservati finché l’account è aperto, per poterli ricontrollare ogni anno e verificare gli aiuti. Quando un periodo di aiuto termina, cancelliamo i relativi documenti entro 12 mesi, salvo che servano per un controllo o una controversia.</p>

        <h2>I tuoi diritti</h2>
        <p>Puoi chiedere di vedere i dati che abbiamo su di te, correggerli, cancellarli, riceverne una copia, opporti al loro uso o limitarlo. Per fare una richiesta, compresa la chiusura dell’account, scrivi a {mailto(B.privacyEmail)}. Rispondiamo entro {P.deletionDays} giorni. Se non sei soddisfatto, puoi presentare reclamo all’autorità per la protezione dei dati del luogo in cui vivi.</p>

        <h2>Sicurezza</h2>
        <p>Le password sono conservate solo come hash. Nell’app devi accedere per vedere qualsiasi dato personale, e i dati di un paziente possono essere visti solo da quel paziente e dal fisioterapista collegato. Il nostro team e i nostri fornitori accedono ai dati solo quando serve per far funzionare o riparare il servizio. Nessun sistema è completamente sicuro; se una violazione ti riguarda, te lo comunicheremo come previsto dalla legge.</p>

        <h2>Minori</h2>
        <p>I pazienti con meno di {P.adultAge} anni possono usare {B.name} solo sotto la supervisione di un genitore o tutore, che crea e gestisce l’account e dà i consensi per conto del minore.</p>

        <h2>Modifiche</h2>
        <p>Aggiorneremo questa pagina quando cambia ciò che raccogliamo, e modificheremo la data in alto.</p>
      </>
    ),
  },

  terms: {
    title: 'Condizioni d’uso',
    Body: () => (
      <>
        <p>
          Queste condizioni si applicano quando usi {B.name}, con sede in Libano. Creando un account accetti queste
          condizioni, l’<Link to="/privacy">Informativa sulla privacy</Link> e, per fisioterapisti e istituzioni,
          la <Link to="/pricing">Politica su prezzi, disdetta e rimborsi</Link>.
        </p>

        <h2>Cos’è {B.name}</h2>
        <p>Uno strumento che permette a un fisioterapista di assegnare esercizi da fare a casa e al paziente di eseguirli davanti a una fotocamera, con indicazioni sullo schermo e vocali sull’angolo dell’articolazione e sulle ripetizioni.</p>

        <h2>Non è un parere medico e non è per le emergenze</h2>
        <ul>
          <li>{B.name} non diagnostica né cura alcuna condizione e non sostituisce il tuo fisioterapista o il tuo medico.</li>
          <li>Gli angoli misurati dalla fotocamera sono stime. Possono essere sbagliati a causa della luce, della posizione della fotocamera, dei vestiti o di quanto del corpo è visibile.</li>
          <li>Segui le istruzioni del tuo fisioterapista. Fermati e chiedi un parere se senti dolore o sintomi nuovi, o se qualcosa nel tuo piano dice di fermarti.</li>
          <li>In caso di emergenza, chiama il numero di emergenza locale.</li>
        </ul>

        <h2>Il tuo account</h2>
        <ul>
          <li>Fornisci dati corretti e tieni segreta la password. Un account è per una sola persona.</li>
          <li>I pazienti con meno di {P.adultAge} anni possono usare {B.name} solo sotto la supervisione di un genitore o tutore, che è responsabile dell’account.</li>
        </ul>

        <h2>Fisioterapisti e istituzioni</h2>
        <ul>
          <li>Devi essere qualificato e abilitato a esercitare dove tratti i pazienti.</li>
          <li>Sei responsabile degli esercizi, degli angoli, degli intervalli sicuri e dei criteri di arresto che assegni, e di confermare che ogni paziente sia clinicamente idoneo.</li>
          <li>Usa i dati dei pazienti solo per curarli e rispetta le regole sui dati sanitari e le norme professionali che ti riguardano.</li>
          <li>Abbonamenti, disdetta e rimborsi sono regolati dalla <Link to="/pricing">Politica su prezzi, disdetta e rimborsi</Link>.</li>
          <li><b>Verifica:</b> i pazienti possono trovarti e aggiungerti solo dopo che il nostro team ha verificato i tuoi documenti. Li ricontrolliamo ogni anno, con un periodo di tolleranza di 30 giorni. Possiamo sospendere un account i cui documenti siano falsi o scaduti.</li>
          <li><b>Assistenza a distanza:</b> {B.name} supporta gli esercizi a casa che prescrivi. Assicurati che ogni follow-up a distanza sia consentito dalle regole che ti si applicano; World Physiotherapy indica la telemedicina come non consentita in Libano, quindi chiedi un parere scritto prima di offrire trattamenti a distanza.</li>
          <li><b>L’aiuto economico</b> è deciso dal nostro team. Documenti falsi comportano la revoca dell’aiuto e l’impossibilità di fare domanda per 12 mesi.</li>
        </ul>

        <h2>Prezzo</h2>
        <p>{B.name} è gratuito per i pazienti. I fisioterapisti pagano un piano mensile, tramite trasferimento Whish Money o OMT, che confermiamo noi. Piani, sconti, aiuti e rimborsi sono spiegati nella <Link to="/pricing">Politica su prezzi, disdetta e rimborsi</Link>.</p>

        <h2>Uso consentito</h2>
        <p>Non fare un uso improprio del servizio: niente accessi ad account o dati altrui, nessun tentativo di danneggiarlo o sovraccaricarlo e niente di illecito.</p>

        <h2>Disponibilità e modifiche</h2>
        <p>Ci impegniamo a mantenere {B.name} funzionante, ma non possiamo garantire che sia sempre disponibile o privo di errori. Possiamo modificare o interrompere funzioni e aggiorneremo queste condizioni quando lo faremo.</p>

        <h2>Responsabilità</h2>
        <p>Non siamo responsabili delle perdite causate dall’uso di esercizi o misurazioni contro il parere del tuo fisioterapista, o da eventi fuori dal nostro controllo. Nulla in queste condizioni limita la responsabilità che la legge non consente di limitare, né i tuoi diritti di consumatore.</p>

        <h2>Fine dell’uso</h2>
        <p>Puoi smettere di usare {B.name} in qualsiasi momento e chiederci di cancellare il tuo account ({mailto(B.privacyEmail)}). Possiamo sospendere un account che viola queste condizioni.</p>

        <h2>Legge applicabile e contatti</h2>
        <p>Queste condizioni sono regolate dalle leggi del Libano e le controversie sono di competenza dei tribunali competenti del Libano, fatti salvi i diritti che ti riconoscono le leggi del paese in cui vivi. Domande: {mailto(B.email)}.</p>
      </>
    ),
  },

  pricing: {
    title: 'Prezzi, disdetta e rimborsi',
    Body: () => (
      <>
        <p>{B.name} è <b>gratuito per i pazienti</b>. Ogni fisioterapista paga un piano mensile in base a quanti pazienti attivi ha. Paghi tramite trasferimento Whish Money o OMT e inserisci nell’app il riferimento della ricevuta; lo confermiamo entro 1 giorno lavorativo.</p>

        <h2>Prezzi</h2>
        <table className="data-table">
          <thead><tr><th>Pazienti collegati contemporaneamente</th><th>Prezzo per fisioterapista</th></tr></thead>
          <tbody>
            {PLANS.map((plan, i) => (
              <tr key={plan.price}><td>{planLabel(plan, i)}</td><td>{plan.price} $ al mese</td></tr>
            ))}
          </tbody>
        </table>
        <p>I prezzi sono in dollari statunitensi. Ogni parte paga le proprie commissioni bancarie o di trasferimento. Se si applica un’imposta, è indicata in fattura. Un’istituzione paga lo stesso prezzo per ciascuno dei suoi fisioterapisti, salvo diverso accordo scritto.</p>

        <h2>Sconto regionale</h2>
        <p>Il luogo in cui eserciti determina uno sconto dallo 0 % (Beirut) al 50 % (Akkar), in base ai prezzi tipici degli studi e al bisogno della regione: D = min(50 %, 0,5 × (1 − P / 35) + 0,3 × N), arrotondato al 5 % più vicino, dove P è il prezzo tipico di una seduta nella regione in dollari e N un punteggio di bisogno da 0 a 1. La prova del luogo di lavoro conferma la regione.</p>

        <h2>Aiuto economico</h2>
        <ul>
          <li>Cinque percorsi si aggiungono allo sconto regionale: inizio carriera (+30 %, una volta), difficoltà economiche (da +10 a +40 %), guerra o sfollamento (da +20 a +30 %), impegno di assistenza alla comunità (+20 %) e posti sponsorizzati (fino al 100 %, pagati da una ONG, dal Ministero della Salute Pubblica, dall’OPTL o da un’università).</li>
          <li>Lo sconto totale è limitato al 75 % e il prezzo non scende mai sotto i 6 $ al mese, a meno che uno sponsor non paghi il tuo posto.</li>
          <li>Decidiamo entro 5 giorni lavorativi. I totali sopra il 50 % richiedono un secondo revisore. L’aiuto dura 6 mesi e si rinnova con nuove prove.</li>
        </ul>

        <h2>Pagamento annuale, pilota e inviti</h2>
        <ul>
          <li>Paga 12 mesi in anticipo al prezzo di 10.</li>
          <li>I fisioterapisti del pilota hanno il primo mese gratis, poi metà prezzo per 12 mesi.</li>
          <li>Invita un altro fisioterapista con il tuo ID pubblico: ricevete entrambi un mese gratis quando sarà verificato.</li>
        </ul>

        <h2>Fatturazione</h2>
        <ul>
          <li>La fatturazione è mensile, anticipata, dal giorno in cui inizia l’abbonamento.</li>
          <li>Il tuo piano dipende da quanti pazienti sono collegati a te contemporaneamente. Se superi il limite del tuo piano, ti chiederemo di passare al piano successivo dal prossimo mese di fatturazione. Non addebitiamo mai mesi passati.</li>
          <li>Il passaggio a un piano più grande ha effetto subito; il nuovo prezzo parte dal prossimo mese di fatturazione. Il passaggio a un piano più piccolo ha effetto dal prossimo mese di fatturazione, purché i tuoi pazienti rientrino nel limite.</li>
          <li>Non puoi collegare più pazienti di quanti ne consenta il tuo piano; scegli prima un piano più grande in Piano e fatturazione.</li>
        </ul>

        <h2>Disdetta</h2>
        <ul>
          <li>Puoi disdire in qualsiasi momento scrivendo a {mailto(B.email)}. Non c’è durata minima né penale di disdetta.</li>
          <li>La disdetta ha effetto alla fine del mese già pagato. Fino ad allora mantieni l’accesso completo e non ti viene addebitato altro.</li>
          <li>Dopo, possiamo limitare il tuo account in modo che tu non possa collegare nuovi pazienti o assegnare esercizi finché non ti abboni di nuovo. I tuoi pazienti mantengono i loro account gratuiti e i loro risultati.</li>
        </ul>

        <h2>Rimborsi</h2>
        <ul>
          <li><b>Garanzia sul primo pagamento:</b> se sei nuovo su {B.name}, puoi ottenere il rimborso completo del primo pagamento chiedendolo entro {P.moneyBackDays} giorni dal pagamento.</li>
          <li><b>Sempre rimborsati:</b> pagamenti doppi, errori di fatturazione e qualsiasi addebito effettuato dopo che la disdetta ha avuto effetto.</li>
          <li><b>Interruzioni lunghe:</b> se {B.name} non è disponibile per più di {P.outageHours} ore consecutive per un problema nostro, rimborsiamo o accreditiamo quei giorni, in proporzione, se lo chiedi.</li>
          <li><b>Se chiudiamo il servizio</b> o chiudiamo il tuo account senza che tu abbia violato le <Link to="/terms">Condizioni</Link>, rimborsiamo la parte non usata del mese pagato.</li>
          <li>Negli altri casi i mesi già iniziati non vengono rimborsati, anche se disdici a metà mese.</li>
          <li>Gli account chiusi per violazione delle Condizioni non vengono rimborsati per il mese in corso.</li>
        </ul>

        <h2>Come chiedere un rimborso</h2>
        <p>Scrivi a {mailto(B.email)} entro {P.refundRequestDays} giorni dal pagamento, indicando il tuo nome e la data del pagamento. Rispondiamo entro {P.refundReplyDays} giorni lavorativi e paghiamo i rimborsi approvati entro {P.refundPayDays} giorni, se possibile con lo stesso metodo usato per pagare.</p>

        <h2>Ritardo nei pagamenti</h2>
        <p>Se una fattura non viene pagata entro {P.latePaymentDays} giorni dalla scadenza, possiamo limitare il tuo account alla sola consultazione finché non viene saldata. Non cancelliamo mai i dati dei pazienti a causa di un ritardo nel pagamento.</p>

        <h2>Variazioni di prezzo</h2>
        <p>Ti avviseremo via email almeno {P.priceNoticeDays} giorni prima di una variazione di prezzo. Il nuovo prezzo si applica dal primo mese di fatturazione successivo all’avviso, e puoi disdire prima.</p>

        <h2>I tuoi diritti legali</h2>
        <p>Nulla in questa politica limita i diritti che ti riconoscono le leggi a tutela dei consumatori applicabili.</p>
      </>
    ),
  },

  cookies: {
    title: 'Cookie e archiviazione',
    Body: () => (
      <>
        <p>{B.name} <b>non imposta cookie</b> e non usa strumenti di analisi, pubblicità o tracciamento di terze parti. Salva pochi elementi nell’archiviazione locale del tuo browser, solo per far funzionare le funzioni che usi:</p>
        <table className="data-table">
          <thead><tr><th>Elemento</th><th>A cosa serve</th><th>Quando viene rimosso</th></tr></thead>
          <tbody>
            <tr><td><code>authToken</code></td><td>Ti mantiene connesso</td><td>Quando esci o quando l’accesso scade</td></tr>
            <tr><td><code>pendingSessions</code></td><td>Risultati degli esercizi salvati offline, da inviare più tardi</td><td>Appena vengono inviati</td></tr>
            <tr><td><code>appLanguage</code></td><td>La lingua che hai scelto per l’app</td><td>Quando cancelli i dati del browser</td></tr>
            <tr><td><code>coachLanguage</code></td><td>La lingua del coach che hai scelto</td><td>Quando cancelli i dati del browser</td></tr>
            <tr><td><code>storageNoticeSeen</code></td><td>Ricorda che hai chiuso l’avviso sull’archiviazione</td><td>Quando cancelli i dati del browser</td></tr>
          </tbody>
        </table>
        <p>Questi elementi sono strettamente necessari per il servizio che hai richiesto, quindi non chiediamo il consenso per usarli. Se mai aggiungeremo cookie o analisi facoltativi, ti chiederemo prima il consenso e potrai rifiutare.</p>
        <p>Puoi eliminare questi elementi in qualsiasi momento dalle impostazioni del browser (per questo sito: cancella i dati del sito). Verrai disconnesso e i risultati non ancora inviati andranno persi.</p>
      </>
    ),
  },

  accessibility: {
    title: 'Accessibilità',
    Body: () => (
      <>
        <p>Vogliamo che tutti, comprese le persone con dolore, le persone anziane e le persone con disabilità, possano usare {B.name}. Puntiamo a rispettare le Linee guida per l’accessibilità dei contenuti web (WCAG) 2.2 al livello AA.</p>
        <h2>Cosa abbiamo fatto</h2>
        <ul>
          <li>Testo grande predefinito (18 px), colori ad alto contrasto e pulsanti alti almeno 44 pixel.</li>
          <li>Tutto si può usare con la tastiera, con un indicatore di focus ben visibile.</li>
          <li>I campi dei moduli hanno etichette visibili e gli errori sono spiegati a parole, non solo con il colore.</li>
          <li>Il coach degli esercizi dà le indicazioni a voce, così non devi guardare lo schermo.</li>
          <li>Le animazioni sono ridotte se il tuo dispositivo è impostato per ridurre il movimento.</li>
          <li>L’app, il coach degli esercizi e queste informative sono disponibili in otto lingue: arabo (da destra a sinistra), armeno occidentale, inglese, francese, spagnolo, tedesco, italiano e turco.</li>
        </ul>
        <h2>Limiti noti</h2>
        <ul>
          <li>Il coach degli esercizi ha bisogno di una fotocamera e che una parte sufficiente del corpo sia inquadrata per misurare gli angoli.</li>
          <li>Alcuni rari messaggi tecnici del server, che compaiono solo se qualcosa va storto all’interno dell’app, sono solo in inglese.</li>
          <li>Il sito non è ancora stato verificato da un esperto indipendente di accessibilità.</li>
        </ul>
        <h2>Segnalaci un problema</h2>
        <p>Se qualcosa è difficile da usare, scrivi a {mailto(B.email)} indicando la pagina e cosa è successo. Ti risponderemo e lavoreremo a una soluzione.</p>
      </>
    ),
  },
}
