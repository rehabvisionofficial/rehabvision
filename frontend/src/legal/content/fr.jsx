// =============================================================================
// Texte français des politiques. Doit dire exactement la même chose que en.jsx.
// Traduction à faire relire par un locuteur natif ou un juriste.
// =============================================================================

import { Link } from 'react-router'
import { BUSINESS as B, PLANS, POLICY as P, mailto } from '../business'

const planLabel = (plan, i) =>
  plan.maxPatients ? `Jusqu’à ${plan.maxPatients} patients` : `Plus de ${PLANS[i - 1].maxPatients} patients`

export default {
  privacy: {
    title: 'Politique de confidentialité',
    Body: () => (
      <>
        <p>
          Cette politique explique quelles données personnelles {B.name} (« nous »), basé au Liban, collecte,
          pourquoi, qui peut les voir et quels sont vos choix. Pour toute question ou demande, écrivez
          à {mailto(B.privacyEmail)}.
        </p>

        <h2>Ce que nous collectons</h2>
        <ul>
          <li><b>Votre compte :</b> nom, adresse e-mail, si vous êtes patient ou physiothérapeute, et votre mot de passe. Nous ne conservons le mot de passe que sous forme de hachage irréversible, jamais le mot de passe lui-même.</li>
          <li><b>Réinitialisation du mot de passe :</b> si vous utilisez « Mot de passe oublié », nous vous envoyons par e-mail un lien à usage unique. Nous ne conservons qu’une version brouillée (hachée) de son code, et le lien expire après 30 minutes.</li>
          <li><b>Kinésithérapeutes :</b> un identifiant public (comme PT-ABC234) que nous créons pour que les patients puissent vous trouver.</li>
          <li><b>Patients :</b> le physiothérapeute auquel vous êtes lié, et les exercices qu’il vous attribue : exercice, côté, angles, amplitude sûre, nombre de répétitions, quand s’arrêter, et sa confirmation que vous êtes apte à faire l’exercice.</li>
          <li><b>Résultats des exercices :</b> pour chaque séance, l’exercice et le côté, le programme à ce moment-là, l’angle maximal atteint à chaque répétition et si l’objectif a été atteint, le nombre de répétitions, un score de douleur facultatif, ainsi que la date et l’heure.</li>
          <li><b>Données techniques :</b> votre adresse IP est gardée brièvement dans la mémoire du serveur pour limiter le nombre de requêtes par connexion. Elle n’est pas enregistrée dans notre base de données. Nos hébergeurs peuvent conserver leurs propres journaux.</li>
          <li><b>Facturation (physiothérapeutes et établissements uniquement) :</b> les informations nécessaires pour vous facturer et enregistrer vos paiements. Les paiements nous sont faits directement, en dehors de l’application ; nous ne voyons ni ne stockons jamais de numéro de carte dans l’application.</li>
          <li><b>Vérification des kinésithérapeutes :</b> les photos ou scans que vous envoyez de votre pièce d’identité ou passeport (recto et verso), un selfie en direct avec votre pièce d’identité, votre carte OPTL (recto et verso) et le reçu de cotisation de l’année, votre diplôme ou équivalence, et un justificatif de lieu de travail ; en option, assurance et certificats de formation. Nous conservons aussi votre téléphone, votre région tarifaire, le nom du cabinet, les langues dans lesquelles vous soignez, et la décision d’examen.</li>
          <li><b>Aide financière (kinésithérapeutes qui la demandent) :</b> les volets choisis et leurs justificatifs : déclaration et justificatifs de revenus, lettre de la municipalité ou du moukhtar, dates de diplôme, preuves de déplacement, de dégâts ou de blessure, lettres d’engagement ou de parrainage, et la décision.</li>
          <li><b>Paiements :</b> la formule choisie, la référence du transfert Whish Money ou OMT que vous saisissez, le montant et la date jusqu’à laquelle vous avez payé.</li>
          <li><b>Douleur et incidents :</b> après une séance, le patient peut noter sa douleur de 0 à 10 et décrire un problème. Votre kinésithérapeute le voit avec la séance.</li>
        </ul>
        <p>Les programmes d’exercices et les résultats sont des <b>données de santé</b>. Nous les utilisons uniquement pour faire fonctionner le service pour vous et votre physiothérapeute.</p>

        <h2>Ce que nous ne collectons pas</h2>
        <ul>
          <li><b>Aucune vidéo ni photo de vos exercices.</b> L’image de la caméra est analysée sur votre propre appareil pour mesurer l’angle de votre articulation. Elle n’est jamais envoyée ni enregistrée. Seuls les chiffres ci-dessus sont envoyés.</li>
          <li><b>Aucun pistage.</b> {B.name} n’utilise aucun outil d’analyse, de publicité ou de réseaux sociaux, et ne dépose aucun cookie. Voir <Link to="/cookies">Cookies et stockage</Link>.</li>
          <li>Nous ne vendons pas vos données et ne les utilisons pas à des fins publicitaires.</li>
        </ul>

        <h2>Qui peut voir vos données</h2>
        <ul>
          <li><b>Votre physiothérapeute</b>, une fois que vous êtes lié à lui : votre nom, votre adresse e-mail, les exercices attribués, vos 50 résultats les plus récents (y compris ceux antérieurs à votre lien avec lui), et un résumé hebdomadaire « à surveiller » basé sur ces résultats. Si vous retirez votre physiothérapeute, il ne peut plus voir aucune de vos données dans {B.name}, et vos exercices attribués sont supprimés.</li>
          <li><b>Les patients</b> qui saisissent l’identifiant public d’un physiothérapeute voient son nom et son identifiant.</li>
          <li><b>Les prestataires</b> qui font fonctionner le service pour nous : Netlify (héberge le site), Render (fait fonctionner notre serveur), notre base de données MongoDB privée et notre fournisseur d’e-mail (envoie les e-mails de réinitialisation du mot de passe). Ils ne peuvent utiliser les données que pour nous fournir leur service.</li>
          <li>Les autorités, uniquement lorsque la loi nous y oblige.</li>
          <li><b>Notre équipe d’examen</b> voit les documents de vérification et d’aide des kinésithérapeutes, uniquement pour décider. Avec votre accord, nous pouvons les vérifier auprès de l’Ordre des physiothérapeutes (OPTL) ou de l’émetteur, et auditer environ 10 % des dossiers d’aide acceptés chaque trimestre.</li>
          <li><b>Les patients connectés</b> voient le nom, la région, le cabinet, les langues et le badge vérifié des kinésithérapeutes qui choisissent d’apparaître dans l’annuaire.</li>
        </ul>

        <h2>Pourquoi nous les utilisons (base légale)</h2>
        <ul>
          <li>Compte et facturation : pour fournir le service auquel vous vous êtes inscrit.</li>
          <li>Données de santé (programmes et résultats) : avec votre consentement explicite, donné lors de la création d’un compte patient. Vous pouvez le retirer à tout moment en retirant votre physiothérapeute ou en nous demandant de supprimer votre compte. Le retrait ne remet pas en cause l’utilisation antérieure.</li>
          <li>Adresse IP pour la limitation des requêtes : pour garder le service sûr et disponible.</li>
        </ul>
        <p>Nous respectons la loi libanaise n° 81 de 2018 relative aux transactions électroniques et aux données personnelles et, pour les utilisateurs dans l’Union européenne, le Règlement général sur la protection des données (RGPD).</p>

        <h2>Où vos données sont stockées</h2>
        <p>Nos serveurs et notre base de données peuvent se trouver hors de votre pays. Lorsque la loi l’exige, nous mettons en place des garanties appropriées pour ces transferts.</p>

        <h2>Retour vocal</h2>
        <p>Le coach prononce de courtes phrases (comme « Bien ») grâce à la synthèse vocale intégrée à votre navigateur. Certains navigateurs utilisent pour cela un service vocal en ligne de leur éditeur. Ces phrases sont les mêmes pour tous et ne contiennent aucune donnée personnelle.</p>

        <h2>Durée de conservation</h2>
        <p>Nous conservons votre compte et vos résultats tant que votre compte est ouvert. Lorsque vous nous demandez de supprimer votre compte, nous le supprimons avec ses résultats dans un délai de {P.deletionDays} jours, sauf les documents que la loi nous oblige à garder (comme les factures).</p>
        <p>Les documents de vérification et d’aide sont conservés tant que votre compte est ouvert, pour la revérification annuelle et l’audit de l’aide. À la fin d’une période d’aide, nous supprimons ses documents dans les 12 mois, sauf si un audit ou un litige l’exige.</p>

        <h2>Vos droits</h2>
        <p>Vous pouvez demander à consulter les données que nous détenons sur vous, à les corriger, à les supprimer, à en recevoir une copie, ou à vous opposer à leur utilisation ou à la limiter. Pour toute demande, y compris la fermeture de votre compte, écrivez à {mailto(B.privacyEmail)}. Nous répondons dans un délai de {P.deletionDays} jours. Si vous n’êtes pas satisfait, vous pouvez saisir l’autorité de protection des données de votre lieu de résidence.</p>

        <h2>Sécurité</h2>
        <p>Les mots de passe ne sont conservés que sous forme de hachage. Dans l’application, il faut se connecter pour voir des données personnelles, et les données d’un patient ne sont visibles que par ce patient et son physiothérapeute lié. Notre équipe et nos prestataires n’accèdent aux données que lorsque c’est nécessaire pour faire fonctionner ou réparer le service. Aucun système n’est totalement sûr ; si une violation vous concerne, nous vous en informerons comme la loi l’exige.</p>

        <h2>Enfants</h2>
        <p>Les patients de moins de {P.adultAge} ans ne peuvent utiliser {B.name} que sous la surveillance d’un parent ou tuteur, qui crée et gère le compte et donne les consentements au nom de l’enfant.</p>

        <h2>Modifications</h2>
        <p>Nous mettrons cette page à jour lorsque les données collectées changeront, et modifierons la date en haut de page.</p>
      </>
    ),
  },

  terms: {
    title: 'Conditions d’utilisation',
    Body: () => (
      <>
        <p>
          Ces conditions s’appliquent à l’utilisation de {B.name}, basé au Liban. En créant un compte, vous les acceptez,
          ainsi que la <Link to="/privacy">Politique de confidentialité</Link> et, pour les physiothérapeutes et
          établissements, la <Link to="/pricing">Politique de tarifs, résiliation et remboursement</Link>.
        </p>

        <h2>Ce qu’est {B.name}</h2>
        <p>Un outil qui permet à un physiothérapeute d’attribuer des exercices à domicile et au patient de les faire devant une caméra, avec un retour visuel et vocal sur l’angle de l’articulation et les répétitions.</p>

        <h2>Pas un avis médical, pas pour les urgences</h2>
        <ul>
          <li>{B.name} ne pose aucun diagnostic, ne traite aucune affection et ne remplace pas votre physiothérapeute ou votre médecin.</li>
          <li>Les angles mesurés par la caméra sont des estimations. Ils peuvent être faux à cause de l’éclairage, de la position de la caméra, des vêtements ou de la partie du corps visible.</li>
          <li>Suivez les instructions de votre physiothérapeute. Arrêtez et demandez conseil si vous ressentez une douleur ou de nouveaux symptômes, ou si votre programme indique de vous arrêter.</li>
          <li>En cas d’urgence, appelez le numéro d’urgence local.</li>
        </ul>

        <h2>Votre compte</h2>
        <ul>
          <li>Donnez des informations exactes et gardez votre mot de passe secret. Un compte est destiné à une seule personne.</li>
          <li>Les patients de moins de {P.adultAge} ans ne peuvent utiliser {B.name} que sous la surveillance d’un parent ou tuteur, responsable du compte.</li>
        </ul>

        <h2>Kinésithérapeutes et établissements</h2>
        <ul>
          <li>Vous devez être qualifié et autorisé à exercer là où vous soignez vos patients.</li>
          <li>Vous êtes responsable des exercices, angles, amplitudes sûres et critères d’arrêt que vous attribuez, et de confirmer que chaque patient est apte à les faire.</li>
          <li>Utilisez les données des patients uniquement pour les soigner, en respectant les règles professionnelles et de protection des données de santé qui vous concernent.</li>
          <li>Les abonnements, la résiliation et les remboursements sont régis par la <Link to="/pricing">Politique de tarifs, résiliation et remboursement</Link>.</li>
          <li><b>Vérification :</b> les patients ne peuvent vous trouver et vous ajouter qu’une fois vos documents vérifiés par notre équipe. Nous les revérifions chaque année, avec un délai de grâce de 30 jours. Nous pouvons suspendre un compte dont les documents sont faux ou expirés.</li>
          <li><b>Soins à distance :</b> {B.name} accompagne les exercices à domicile que vous prescrivez. Assurez-vous que tout suivi à distance est permis par les règles qui s’appliquent à vous ; World Physiotherapy indique que la télésanté n’est pas autorisée au Liban, demandez donc un avis écrit avant de proposer un traitement à distance.</li>
          <li><b>L’aide financière</b> est décidée par notre équipe. De faux documents entraînent le retrait de l’aide et l’impossibilité de la redemander pendant 12 mois.</li>
        </ul>

        <h2>Prix</h2>
        <p>{B.name} est gratuit pour les patients. Les kinésithérapeutes paient une formule mensuelle, par transfert Whish Money ou OMT, que nous confirmons. Formules, remises, aide et remboursements sont expliqués dans la <Link to="/pricing">politique de tarifs, résiliation et remboursement</Link>.</p>

        <h2>Utilisation acceptable</h2>
        <p>N’utilisez pas le service de manière abusive : pas d’accès aux comptes ou données d’autrui, pas de tentative de le casser ou de le surcharger, rien d’illégal.</p>

        <h2>Disponibilité et modifications</h2>
        <p>Nous faisons en sorte que {B.name} fonctionne, mais ne pouvons pas garantir qu’il sera toujours disponible ou sans erreur. Nous pouvons modifier ou arrêter des fonctionnalités, et mettrons ces conditions à jour en conséquence.</p>

        <h2>Responsabilité</h2>
        <p>Nous ne sommes pas responsables des pertes causées par l’utilisation d’exercices ou de mesures contre l’avis de votre physiothérapeute, ou par des événements hors de notre contrôle. Rien dans ces conditions ne limite une responsabilité que la loi ne permet pas de limiter, ni vos droits de consommateur.</p>

        <h2>Fin de l’utilisation</h2>
        <p>Vous pouvez cesser d’utiliser {B.name} à tout moment et nous demander de supprimer votre compte ({mailto(B.privacyEmail)}). Nous pouvons suspendre un compte qui enfreint ces conditions.</p>

        <h2>Droit applicable et contact</h2>
        <p>Ces conditions sont régies par le droit libanais, et les litiges relèvent des tribunaux libanais compétents, sans préjudice des droits que vous tenez de la loi de votre pays de résidence. Questions : {mailto(B.email)}.</p>
      </>
    ),
  },

  pricing: {
    title: 'Tarifs, résiliation et remboursements',
    Body: () => (
      <>
        <p>{B.name} est <b>gratuit pour les patients</b>. Chaque kinésithérapeute paie une formule mensuelle selon son nombre de patients actifs. Vous payez par transfert Whish Money ou OMT et saisissez la référence du reçu dans l’application ; nous la confirmons sous 1 jour ouvré.</p>

        <h2>Tarifs</h2>
        <table className="data-table">
          <thead><tr><th>Patients liés en même temps</th><th>Prix par physiothérapeute</th></tr></thead>
          <tbody>
            {PLANS.map((plan, i) => (
              <tr key={plan.price}><td>{planLabel(plan, i)}</td><td>{plan.price} $ par mois</td></tr>
            ))}
          </tbody>
        </table>
        <p>Les prix sont en dollars américains. Chaque partie paie ses propres frais bancaires ou de transfert. Si une taxe s’applique, elle figure sur la facture. Un établissement paie le même prix pour chacun de ses physiothérapeutes, sauf accord écrit contraire.</p>

        <h2>Remise régionale</h2>
        <p>Votre lieu d’exercice donne une remise de 0 % (Beyrouth) à 50 % (Akkar), selon les prix habituels des séances et les besoins de la région : D = min(50 %, 0,5 × (1 − P / 35) + 0,3 × N), arrondi aux 5 % les plus proches, où P est le prix habituel d’une séance dans la région en dollars et N un indice de besoin de 0 à 1. Votre justificatif de lieu de travail confirme la région.</p>

        <h2>Aide financière</h2>
        <ul>
          <li>Cinq volets s’ajoutent à la remise régionale : début de carrière (+30 %, une fois), difficultés de revenus (+10 à +40 %), guerre ou déplacement (+20 à +30 %), engagement de soins solidaires (+20 %) et places parrainées (jusqu’à 100 %, payées par une ONG, le ministère de la Santé publique, l’OPTL ou une université).</li>
          <li>La remise totale est plafonnée à 75 %, et le prix ne descend jamais sous 6 $ par mois, sauf si un parrain paie votre place.</li>
          <li>Nous décidons sous 5 jours ouvrés. Au-delà de 50 % au total, un second examinateur est nécessaire. L’aide dure 6 mois et se renouvelle avec de nouveaux justificatifs.</li>
        </ul>

        <h2>Paiement annuel, pilote et parrainage</h2>
        <ul>
          <li>Payez 12 mois d’avance pour le prix de 10.</li>
          <li>Les kinésithérapeutes du pilote ont le premier mois offert, puis la moitié du prix pendant 12 mois.</li>
          <li>Recommandez un autre kinésithérapeute avec votre identifiant public : vous recevez chacun un mois offert une fois son compte vérifié.</li>
        </ul>

        <h2>Facturation</h2>
        <ul>
          <li>Vous êtes facturé chaque mois, d’avance, à partir du jour où votre abonnement commence.</li>
          <li>Votre formule dépend du nombre de patients liés à vous en même temps. Si vous dépassez la limite de votre formule, nous vous demanderons de passer à la formule suivante à partir du mois de facturation suivant. Nous ne facturons jamais les mois passés.</li>
          <li>Le passage à une formule supérieure prend effet immédiatement ; le nouveau prix s’applique à partir du mois de facturation suivant. Le passage à une formule inférieure prend effet au mois de facturation suivant, à condition que vos patients y tiennent.</li>
          <li>Vous ne pouvez pas lier plus de patients que votre formule ne le permet ; choisissez d’abord une formule plus grande dans Formule et paiement.</li>
        </ul>

        <h2>Résiliation</h2>
        <ul>
          <li>Vous pouvez résilier à tout moment en écrivant à {mailto(B.email)}. Il n’y a ni durée minimale ni frais de résiliation.</li>
          <li>La résiliation prend effet à la fin du mois déjà payé. Vous gardez un accès complet jusque-là et n’êtes plus facturé.</li>
          <li>Ensuite, nous pouvons limiter votre compte : vous ne pourrez plus lier de nouveaux patients ni attribuer d’exercices jusqu’à un nouvel abonnement. Vos patients gardent leur compte gratuit et leurs propres résultats.</li>
        </ul>

        <h2>Remboursements</h2>
        <ul>
          <li><b>Garantie du premier paiement :</b> si vous êtes nouveau sur {B.name}, vous pouvez obtenir le remboursement intégral de votre premier paiement en le demandant dans les {P.moneyBackDays} jours suivant ce paiement.</li>
          <li><b>Toujours remboursés :</b> les paiements en double, les erreurs de facturation et tout prélèvement fait après la prise d’effet de votre résiliation.</li>
          <li><b>Longues interruptions :</b> si {B.name} est indisponible plus de {P.outageHours} heures d’affilée à cause d’un problème de notre côté, nous remboursons ou créditons ces jours au prorata, sur demande.</li>
          <li><b>Si nous arrêtons le service</b> ou fermons votre compte sans que vous ayez enfreint les <Link to="/terms">Conditions</Link>, nous remboursons la partie non utilisée du mois payé.</li>
          <li>Sinon, les mois commencés ne sont pas remboursés, y compris en cas de résiliation en cours de mois.</li>
          <li>Les comptes fermés pour non-respect des Conditions ne sont pas remboursés pour le mois en cours.</li>
        </ul>

        <h2>Demander un remboursement</h2>
        <p>Écrivez à {mailto(B.email)} dans les {P.refundRequestDays} jours suivant le paiement, en indiquant votre nom et la date du paiement. Nous répondons sous {P.refundReplyDays} jours ouvrables et versons les remboursements acceptés sous {P.refundPayDays} jours, si possible par le même moyen de paiement.</p>

        <h2>Retard de paiement</h2>
        <p>Si une facture n’est pas payée dans les {P.latePaymentDays} jours suivant son échéance, nous pouvons limiter votre compte à la consultation jusqu’au paiement. Nous ne supprimons jamais les données des patients à cause d’un retard de paiement.</p>

        <h2>Changements de prix</h2>
        <p>Nous vous écrirons au moins {P.priceNoticeDays} jours avant tout changement de prix. Le nouveau prix s’applique à partir du premier mois de facturation suivant l’avis, et vous pouvez résilier avant.</p>

        <h2>Vos droits</h2>
        <p>Rien dans cette politique ne limite les droits que vous tenez des lois de protection des consommateurs qui vous sont applicables.</p>
      </>
    ),
  },

  cookies: {
    title: 'Cookies et stockage',
    Body: () => (
      <>
        <p>{B.name} ne dépose <b>aucun cookie</b> et n’utilise aucun outil d’analyse, de publicité ou de pistage tiers. Il enregistre quelques éléments dans le stockage local de votre navigateur, uniquement pour que les fonctions que vous utilisez marchent :</p>
        <table className="data-table">
          <thead><tr><th>Élément</th><th>À quoi il sert</th><th>Quand il est supprimé</th></tr></thead>
          <tbody>
            <tr><td><code>authToken</code></td><td>Vous garde connecté</td><td>À la déconnexion, ou quand la connexion expire</td></tr>
            <tr><td><code>pendingSessions</code></td><td>Résultats enregistrés hors ligne, pour les envoyer plus tard</td><td>Dès qu’ils sont envoyés</td></tr>
            <tr><td><code>appLanguage</code></td><td>La langue choisie pour l’application</td><td>Quand vous effacez les données du navigateur</td></tr>
            <tr><td><code>coachLanguage</code></td><td>La langue du coach que vous avez choisie</td><td>Quand vous effacez les données du navigateur</td></tr>
            <tr><td><code>storageNoticeSeen</code></td><td>Retient que vous avez fermé l’avis sur le stockage</td><td>Quand vous effacez les données du navigateur</td></tr>
          </tbody>
        </table>
        <p>Ces éléments sont strictement nécessaires au service que vous avez demandé ; nous ne demandons donc pas votre consentement. Si nous ajoutons un jour des cookies facultatifs ou un outil d’analyse, nous vous demanderons d’abord votre consentement et vous pourrez refuser.</p>
        <p>Vous pouvez supprimer ces éléments à tout moment dans les réglages de votre navigateur (pour ce site : effacer les données du site). Vous serez alors déconnecté, et les résultats non encore envoyés seront perdus.</p>
      </>
    ),
  },

  accessibility: {
    title: 'Accessibilité',
    Body: () => (
      <>
        <p>Nous voulons que tout le monde, y compris les personnes qui ont mal, les personnes âgées et les personnes en situation de handicap, puisse utiliser {B.name}. Nous visons le niveau AA des Règles pour l’accessibilité des contenus Web (WCAG) 2.2.</p>
        <h2>Ce que nous avons fait</h2>
        <ul>
          <li>Texte de grande taille par défaut (18 px), couleurs très contrastées et boutons d’au moins 44 pixels de haut.</li>
          <li>Tout est utilisable au clavier, avec un contour de focus bien visible.</li>
          <li>Les champs ont des libellés visibles, et les erreurs sont expliquées par des mots, pas seulement par la couleur.</li>
          <li>Le coach énonce ses retours à voix haute : pas besoin de regarder l’écran.</li>
          <li>Les animations sont réduites si votre appareil est réglé pour limiter les mouvements.</li>
          <li>L’application, le coach d’exercices et ces politiques sont disponibles en huit langues : arabe (de droite à gauche), arménien occidental, anglais, français, espagnol, allemand, italien et turc.</li>
        </ul>
        <h2>Limites connues</h2>
        <ul>
          <li>Le coach a besoin d’une caméra et qu’une partie suffisante de votre corps soit visible pour mesurer les angles.</li>
          <li>Quelques rares messages techniques du serveur, qui n’apparaissent que si un problème survient dans l’application, sont uniquement en anglais.</li>
          <li>Le site n’a pas encore été audité par un expert indépendant en accessibilité.</li>
        </ul>
        <h2>Signaler un problème</h2>
        <p>Si quelque chose est difficile à utiliser, écrivez à {mailto(B.email)} en précisant la page et ce qui s’est passé. Nous vous répondrons et travaillerons à une correction.</p>
      </>
    ),
  },
}
