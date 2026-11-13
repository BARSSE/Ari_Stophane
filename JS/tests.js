/* Tests de personnalité : données + moteur */
(() => {
  'use strict';
  const el = (t, c, x) => { const e = document.createElement(t); if (c) e.className = c; if (x != null) e.textContent = x; return e; };
  const mel = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const Q = (q, m, r) => ({ q, m, r: r.map((s) => { const [t, l] = s.split('|'); return { t, l }; }) });
  const bouton = (txt, f, cls = 'bouton bouton-encre') => { const b = el('button', cls, txt); b.type = 'button'; b.addEventListener('click', f); return b; };

  const TESTS = {
    perso: {
      titre: 'Quel personnage de mes pièces et histoires êtes-vous ?', note: 'Les résultats viennent du Secret, des Ombres du commandement et de La Société secrète des chiens.',
      res: {
        a: { n: 'Floriane Durand', s: 'Le Secret', t: 'L’enquêtrice têtue', e: 'Vous sentez tout de suite quand on vous cache quelque chose, et vous ne lâchez rien tant que vous n’avez pas la vérité. Un brin d’ironie, un peu de colère, beaucoup de détermination : « Cela prendra le temps qu’il faut, mais je trouverai. »' },
        b: { n: 'Marie-Éloïse Dupuis', s: 'Le Secret', t: 'La philosophe', e: 'Vous prenez du recul, doutez de tout et posez la question qui fait réfléchir : « Tu es sûre que tu vas en trouver ? » Votre regard calme éclaire les autres.' },
        c: { n: 'Pauline Dubois', s: 'Le Secret', t: 'La boute-en-train', e: 'Vous désamorcez tout avec un bon mot. Mais derrière l’humour se cache un grand cœur, fidèle jusque dans les secrets les plus lourds à porter.' },
        d: { n: 'Amirale Judith Bourgeois', s: 'Les Ombres du commandement', t: 'L’enquêtrice du quatrième mur', e: 'Méthodique et directe, vous recoupez les indices, ne perdez pas de temps et n’avez pas peur de briser le quatrième mur pour obtenir de l’aide.' },
        e: { n: 'Amirale Martine De la Croix', s: 'Les Ombres du commandement', t: 'La commandante', e: 'Vous gardez le calme, tenez la barre et sentez avant les autres qu’un détail cloche. Quand vous parlez, on écoute.' },
        f: { n: 'Seconde Maîtresse Florence Blanchard', s: 'Les Ombres du commandement', t: 'Le médecin discret', e: 'Vous observez beaucoup, parlez peu et gardez certaines informations pour vous. Votre humour pince-sans-rire surprend toujours.' },
        g: { n: 'Première Maîtresse Violette Hémery', s: 'Les Ombres du commandement', t: 'L’archiviste', e: 'Rigoureux ou rigoureuse, vous faites confiance aux documents et aux faits. « Je n’ai rien à cacher » : votre droiture est votre meilleure défense.' },
        h: { n: 'Jacques Dupont', s: 'La Société secrète des chiens', t: 'Le gardien du secret', e: 'Loyal et patient, vous savez jauger les gens d’un seul regard et ne confiez vos secrets qu’à ceux qui jurent de les protéger.' }
      },
      qs: [
        Q('Un mystère éclate près de vous : quel est votre premier réflexe ?', 0, ['Interroger chacun et guetter la moindre hésitation|ad', 'Prendre du recul et me demander ce que cela signifie|b', 'Détendre l’atmosphère avec une blague|c', 'Prendre le commandement et distribuer les rôles|e', 'Fouiller discrètement les archives|g', 'Surveiller en silence, comme un gardien|h']),
        Q('Quelqu’un vous ment. Comment le savez-vous ?', 0, ['À sa voix, soudain moins assurée|a', 'À la contradiction entre ses dires et les faits|d', 'Je n’en sais rien, mais je fais semblant de croire|f', 'À son regard : je lis les gens comme un livre|h', 'À ses documents : les papiers ne mentent pas|g']),
        Q('Quelles qualités vos proches vous reconnaissent-ils ?', 1, ['Une curiosité insatiable|ad', 'Un humour qui désamorce tout|cf', 'Un grand sang-froid|ed', 'Une mémoire d’archiviste|g', 'Un esprit philosophe|b', 'Une grande discrétion|fgh']),
        Q('Quel objet vous suit partout ?', 0, ['Un carnet d’indices|a', 'Un livre qui fait réfléchir|b', 'Un sac à blagues|c', 'Une longue-vue de commandement|de', 'Une trousse de soins|f', 'Une vieille clé|h']),
        Q('Face à un secret de famille, vous…', 1, ['Cherchez la vérité à tout prix|ad', 'Respectez le silence de chacun|fh', 'Réunissez tout le monde au salon|ae', 'En parlez entre amis|bc', 'Consultez les vieux documents|g']),
        Q('Dans une dispute, vous êtes plutôt…', 0, ['Du genre à hausser le ton|a', 'Ironique, avec un petit air savant|ab', 'Calme et ferme|e', 'Silencieux jusqu’à ce que ça passe|fh', 'Rapide à trouver une blague|c']),
        Q('Quel est votre endroit préféré ?', 0, ['Le salon entre amies|c', 'La bibliothèque ou les archives|bg', 'La passerelle d’un navire|de', 'Une infirmerie tranquille|f', 'Un souterrain plein de mystères|h', 'Le terrain, là où l’enquête se joue|ad']),
        Q('Qu’est-ce qui vous agace le plus ?', 1, ['Qu’on me cache la vérité|ab', 'Qu’on perde du temps|de', 'Le désordre dans les dossiers|g', 'Les gens qui se prennent trop au sérieux|c', 'Qu’on trahisse ma confiance|eh']),
        Q('Un inconnu vous demande de l’aide devant tout le monde. Vous…', 0, ['Prenez la parole sans trembler|d', 'Acceptez, mais avec des réserves|f', 'Posez dix questions avant de dire oui|a', 'Plaisantez pour gagner du temps|c', 'Restez dans votre coin|g']),
        Q('Dans un groupe, votre rôle est…', 0, ['Meneur ou meneuse|e', 'Détective|ad', 'Philosophe|b', 'Boute-en-train|c', 'Soignant ou soignante|f', 'Gardien ou gardienne du secret|h']),
        Q('Quelles phrases vous ressemblent ?', 1, ['« Alors ne perdons pas de temps. »|d', '« Je n’ai rien à cacher. »|g', '« Je trouverai, quoi qu’il en coûte. »|a', '« Encore faudrait-il pouvoir le prouver… »|b', '« Je ne voulais pas être forcée de tout raconter. »|f', '« Jurez de ne jamais révéler ce secret. »|h']),
        Q('Un grand choix s’impose. Comment décidez-vous ?', 0, ['Je recoupe les preuves|d', 'Je suis mon intuition|ac', 'Je pèse longuement le pour et le contre|b', 'Je tranche : c’est mon rôle|e', 'Je consulte ceux en qui j’ai confiance|fh']),
        Q('Au fond d’un souterrain obscur, vous…', 1, ['Prenez la tête avec la torche|ae', 'Restez calme et observez|f', 'Racontez une blague pour rassurer|c', 'Cherchez un mécanisme caché|ag', 'Gardez la porte|h']),
        Q('Comment aimeriez-vous que l’histoire se termine ?', 0, ['Le coupable démasqué : tout est bien qui finit bien|d', 'Un secret enfin révélé en famille|ac', 'Chacun à sa place, l’ordre rétabli|eg', 'Un mystère bien gardé|h', 'Une grande question laissée ouverte|b', 'Tout le monde sain et sauf|f'])
      ]
    },
    masque: {
      titre: 'Comédie ou tragédie : quel masque êtes-vous ?', note: 'Deux masques, deux caractères : et si vous étiez un peu des deux ?', egal: 1,
      res: {
        a: { n: 'Le masque de la comédie', s: 'Rire, légèreté, quiproquos', t: 'Un esprit vif et lumineux', e: 'Vous voyez le côté cocasse de tout, désamorcez les drames par le rire et pensez que les travers humains se corrigent mieux avec le sourire. Votre énergie rend la salle plus légère.', m: 'comedie' },
        b: { n: 'Le masque de la tragédie', s: 'Destin, passions, grandeur', t: 'Une âme profonde et intense', e: 'Vous ressentez tout pleinement. Les grands dilemmes, les passions et le poids du destin vous touchent. Votre gravité donne de la hauteur à chaque instant.', m: 'tragedie' },
        c: { n: 'Les deux masques : le drame', s: 'Rire et larmes mêlés', t: 'Un équilibre rare', e: 'Vous passez du rire aux larmes avec une même sincérité, comme le drame romantique qui mêle les registres. Vous êtes tantôt joyeux, tantôt grave, et toujours vrai.', m: 'drame' }
      },
      qs: [
        Q('Quelle est votre soirée idéale ?', 0, ['Une soirée de jeux et de fous rires|a', 'Un film bouleversant, mouchoirs en main|b', 'Une longue discussion sur le sens de la vie|b', 'Un dîner animé, avec des imitations|a']),
        Q('Quand tout va de travers, vous…', 0, ['En riez : sinon on pleure|a', 'Ressentez le poids du destin|b', 'Cherchez le côté cocasse|a', 'Vous isolez pour ressentir pleinement|b', 'Passez à l’action, sans état d’âme|ab']),
        Q('Dans une pièce, qu’aimez-vous ?', 1, ['Les quiproquos|a', 'Les grands dilemmes|b', 'Les répliques qui font mouche|a', 'Les passions interdites|b', 'Les fins heureuses|a', 'Les fins inéluctables|b']),
        Q('Un secret est révélé devant vous. Votre réaction ?', 0, ['Éclater de rire|a', 'Me taire, bouleversé ou bouleversée|b', 'Réagir avec ironie|a']),
        Q('Quelle couleur vous attire ?', 0, ['Rose bonbon|a', 'Rouge sombre|b', 'Doré|a', 'Violet profond|b']),
        Q('Quels personnages vous touchent ?', 1, ['Le valet malin|a', 'Le roi déchu|b', 'L’avare ridicule|a', 'L’héroïne tiraillée|b', 'Le héros qui hésite|b', 'Le fourbe démasqué|a']),
        Q('Votre rapport au temps ?', 0, ['Je vis l’instant présent|a', 'Je pense à ce qui est inévitable|b']),
        Q('Face à une injustice, vous…', 0, ['Dénoncez en plaisantant|a', 'Vous indignez gravement|b', 'Cherchez un arrangement|a']),
        Q('Qu’avez-vous déjà fait ?', 1, ['Fait rire un salon entier|a', 'Pleuré devant une scène|b', 'Joué la comédie pour cacher un chagrin|ab', 'Gardé un grand secret|b', 'Détendu l’atmosphère avec une anecdote|a']),
        Q('Quelle musique vous ressemble ?', 0, ['Entraînante et joyeuse|a', 'Grave et orchestrale|b', 'Un peu des deux|ab']),
        Q('Choisissez un adjectif.', 0, ['Léger|a', 'Intense|b', 'Vif|a', 'Profond|b', 'Fidèle|ab']),
        Q('Dans un grand tournant de votre vie, vous…', 1, ['Prenez de la hauteur|b', 'Cherchez le rire pour tenir|a', 'Écrivez ou parlez de ce que vous ressentez|b', 'Entourez-vous d’amis|a']),
        Q('Pour vous, le théâtre sert à…', 0, ['Corriger les travers en riant|a', 'Faire ressentir la grandeur des destins|b', 'Mêler le rire et les larmes|ab']),
        Q('Quel dernier mot choisiriez-vous ?', 0, ['Tout finira bien|a', 'Tout doit être vécu jusqu’au bout|b'])
      ]
    },
    metier: {
      titre: 'Quel métier du théâtre vous correspond ?', note: 'Sur scène, en coulisses ou derrière la plume : chaque métier a son rôle.',
      res: {
        a: { n: 'Comédien ou comédienne', s: 'Sur scène', t: 'Une présence qui illumine le plateau', e: 'Vous aimez être regardé, émouvoir, faire rire ou frissonner. Votre énergie et votre expressivité prennent vie devant un public.' },
        b: { n: 'Metteur ou metteuse en scène', s: 'Le chef d’orchestre', t: 'Une vision d’ensemble', e: 'Vous imaginez la scène avant qu’elle existe, dirigez les autres avec idées et exigence, et voyez le moindre détail du décor à l’éclairage.' },
        c: { n: 'Souffleur ou souffleuse', s: 'Dans l’ombre, dans sa coquille', t: 'Le filet de sécurité de la troupe', e: 'Discret ou discrète, attentif ou attentive, vous connaissez le texte par cœur et sauvez tout le monde d’un trou de mémoire sans que le public s’en aperçoive.' },
        d: { n: 'Costumier ou costumière', s: 'L’art du vêtement', t: 'Un œil pour le détail', e: 'Vous aimez les étoffes, les couleurs et ce que les vêtements racontent d’un personnage. Votre sens esthétique donne du relief à chaque rôle.' },
        e: { n: 'Régisseur ou régisseuse', s: 'La technique, les lumières, le son', t: 'Le maître des coulisses', e: 'Organisé ou organisée et calme sous la pression, vous faites tourner la machine : lumières, sons, changements de décor, tout arrive au bon moment.' },
        f: { n: 'Auteur ou autrice, dramaturge', s: 'À l’origine de tout', t: 'La plume qui donne vie', e: 'Vous aimez inventer des personnages, des répliques et des histoires. Tout théâtre commence par quelqu’un qui a envie d’écrire.' }
      },
      qs: [
        Q('Avant un grand spectacle, vous êtes plutôt…', 0, ['Fébrile, mais prêt ou prête à entrer|a', 'En train de vérifier chaque détail|b', 'Calme, texte sous les yeux|c', 'En train d’ajuster un costume|d', 'Sur la console, tout est prêt|e', 'Dans un coin, à retoucher une scène|f']),
        Q('Vous êtes à l’aise quand…', 1, ['Tous les regards sont braqués sur vous|a', 'Vous dirigez les autres|b', 'Vous restez dans l’ombre|c', 'Vous créez de vos mains|d', 'Tout est organisé|e', 'Vous écrivez seul ou seule|f']),
        Q('Quel est votre atout principal ?', 0, ['L’expressivité|a', 'Le sens de la vision|b', 'La mémoire|c', 'Le goût du beau|d', 'La précision technique|e', 'L’imagination|f']),
        Q('Dans un groupe, vous…', 0, ['Animez la bande|a', 'Menez et coordonnez|b', 'Restez attentif ou attentive|c', 'Aidez à soigner les apparences|d', 'Réglez les problèmes pratiques|e', 'Proposez des idées|f']),
        Q('Quel mot vous correspond le mieux ?', 0, ['Passion|a', 'Exigence|b', 'Fiabilité|c', 'Élégance|d', 'Méthode|e', 'Créativité|f']),
        Q('Qu’aimez-vous manipuler ?', 1, ['Des émotions|a', 'Des idées d’ensemble|b', 'Un texte par cœur|c', 'Des étoffes et des couleurs|d', 'Des câbles et des projecteurs|e', 'Des mots|f']),
        Q('Quel imprévu vous met le plus à l’aise ?', 0, ['Un trou de mémoire d’un partenaire : j’improvise|a', 'Un changement de dernière minute|b', 'Un oubli de texte : je souffle la réplique|c', 'Un costume déchiré : je répare|d', 'Une panne de lumière : je règle|e', 'Une scène à réécrire|f']),
        Q('Votre lieu préféré au théâtre ?', 0, ['Le plateau|a', 'Le fauteuil du milieu de la salle|b', 'La coquille du souffleur|c', 'L’atelier de couture|d', 'La régie|e', 'Le bureau, plume en main|f']),
        Q('Quels défauts vous reconnaît-on ?', 1, ['Un petit côté cabotin|a', 'Un goût du contrôle|b', 'Une grande timidité|c', 'Un perfectionnisme|d', 'Un tempérament strict|e', 'Une tête dans les nuages|f']),
        Q('Quelle tâche choisiriez-vous ?', 0, ['Jouer le premier rôle|a', 'Choisir qui joue quoi|b', 'Suivre le texte à voix basse|c', 'Dessiner les costumes|d', 'Régler les lumières|e', 'Écrire la scène finale|f']),
        Q('À la fin du spectacle, vous attendez…', 0, ['Les applaudissements|a', 'Que le public soit ému|b', 'Que tout se soit bien passé|c', 'Qu’on remarque les costumes|d', 'Que chaque effet ait fonctionné|e', 'Que le texte ait touché|f']),
        Q('Dans votre sac, il y a…', 1, ['Un miroir de loge|a', 'Un carnet de mise en scène|b', 'Un texte annoté|c', 'Une aiguille et du fil|d', 'Une lampe et du ruban adhésif|e', 'Un stylo et un cahier|f']),
        Q('Quelle phrase vous ressemble ?', 0, ['« Tout le monde me regarde, et j’adore ça. »|a', '« Encore une fois, avec plus d’énergie ! »|b', '« Je suis là, juste derrière vous. »|c', '« Ce rouge irait mieux. »|d', '« Lumière, dans trois, deux, un. »|e', '« Et si le roi n’était pas mort ? »|f']),
        Q('Votre rêve ultime ?', 0, ['Être acclamé ou acclamée|a', 'Monter une grande pièce|b', 'Sauver une représentation|c', 'Habiller toute une troupe|d', 'Faire fonctionner un spectacle sans accroc|e', 'Voir ma pièce jouée|f'])
      ]
    },
    chiens: {
      titre: 'Quel membre de la Société secrète des chiens êtes-vous ?', note: 'Françoise, Sophie, Jean, Clarisse ou Valentine : quel membre de l’équipe de Villeroy êtes-vous ?',
      res: {
        a: { n: 'Françoise', s: 'La rassembleuse', t: 'Celle qui invite, organise et observe', e: 'Vous aimez réunir vos amis, proposer le programme et raconter l’aventure. Curieux ou curieuse de ce qui vous entoure, vous gardez toujours un œil attentif sur l’équipe.' },
        b: { n: 'Sophie', s: 'La voix posée', t: 'Celle qui reste constante et réfléchie', e: 'Douce en apparence, vous êtes pourtant celle qui garde la tête froide. Vous posez les bonnes questions et trouvez la prochaine étape : « Descendons cet escalier et voyons où il nous mènera. »' },
        c: { n: 'Jean', s: 'L’énergique', t: 'Celui qui apporte force et bonne humeur', e: 'Athlétique et vif, vous avez une énergie naturelle. Vous voyez tout de suite le côté pratique d’un plan, et vous êtes le premier à penser à la sortie.' },
        d: { n: 'Clarisse', s: 'La savante', t: 'Celle qui sait tout sur tout', e: 'Observatrice, curieuse, dotée d’une excellente mémoire, vous vous documentez avant de partir. Vous captez le moindre détail et le transformez en savoir.' },
        e: { n: 'Valentine', s: 'L’aventurière', t: 'Celle qui bondit la première', e: 'Souple, nerveuse et déterminée, vous ne tenez pas en place. Une dalle étrange, une porte secrète : vous y allez la première en demandant « Qui est avec moi ? »' }
      },
      qs: [
        Q('Un beau soleil après des jours de pluie. Vous…', 0, ['Invitez toute la bande pour une balade|a', 'Proposez un itinéraire calme|b', 'Courez déjà dans le parc|c', 'Révisez l’histoire du lieu|d', 'Rêvez d’aventure|e']),
        Q('Vous découvrez un obstacle étrange sur le chemin. Votre réaction ?', 0, ['Observer attentivement|ad', 'Demander ce que les autres en pensent|ab', 'Foncer voir de plus près|e', 'Tester sa solidité avec la force|c']),
        Q('Dans une équipe, vous êtes…', 0, ['Le liant|a', 'La voix de la raison|b', 'Les bras|c', 'Le cerveau|d', 'L’étincelle|e']),
        Q('Quelles qualités vous reconnaît-on ?', 1, ['Une grande curiosité|ad', 'Un calme constant|b', 'Une énergie naturelle|c', 'Une mémoire de fer|d', 'Un courage fou|e', 'Un sens de l’accueil|a']),
        Q('Vous êtes enfermé ou enfermée dans un souterrain. Vous…', 0, ['Cherchez une autre issue|c', 'Gardez votre sang-froid|b', 'Descendez malgré tout|e', 'Réfléchissez à l’histoire du lieu|d', 'Rassurez les autres|a']),
        Q('Vous aimez raconter…', 1, ['Des anecdotes historiques|d', 'Des histoires drôles|ac', 'Vos aventures|ae', 'Ce qu’on pourrait découvrir ensuite|b']),
        Q('Votre posture naturelle ?', 0, ['Souple, toujours prêt ou prête à bondir|e', 'Posée, constante|b', 'Athlétique, vive|c', 'Altière, attentive|d', 'Accueillante|a']),
        Q('Face à un secret, vous…', 0, ['Jurez de le garder|ab', 'Cherchez à en savoir plus|d', 'Ouvrez la porte pour voir|e', 'Vous demandez comment sortir ensuite|c']),
        Q('Votre arme préférée en aventure ?', 0, ['Une torche|e', 'Un livre|d', 'Mes muscles|c', 'Mon calme|b', 'Mon sens de l’équipe|a']),
        Q('Vous êtes surpris ou surprise : vous…', 1, ['Posez mille questions|bd', 'Vous inquiétez pour la suite|c', 'Rassemblez le groupe|a', 'Bondissez sur la piste|e']),
        Q('Quel mot vous correspond ?', 0, ['Loyauté|ab', 'Intelligence|d', 'Énergie|c', 'Courage|e']),
        Q('Dans un parc, vous remarquez…', 1, ['Les arbres et les rues alentour|a', 'Chaque détail du paysage|d', 'Les chemins pour courir|c', 'Les endroits pour se cacher|e', 'L’ambiance paisible|b']),
        Q('Vous menez l’expédition. Votre phrase fétiche ?', 0, ['« Est-ce que cela vous va ? »|ab', '« Je me documente. »|d', '« Qui est avec moi ? »|e', '« Voyons comment sortir. »|c']),
        Q('Après l’aventure, vous…', 0, ['Remerciez tout le monde|a', 'Retenez la leçon calmement|b', 'Vous reposez enfin|c', 'Notez les faits pour plus tard|d', 'Pensez déjà à la suivante|e'])
      ]
    },
    unites: {
      titre: 'Temps, Inspiration ou Envie : quelle est votre dominante ?', note: 'Ma règle des trois unités : Temps, Inspiration et Envie. Laquelle domine chez vous ?',
      res: {
        a: { n: 'Le Temps', s: 'Ma première unité', t: 'L’espace nécessaire pour laisser mûrir vos idées', e: 'Vous avez besoin de patience pour créer. Vos idées se développent au fil du temps, et vous savez qu’une belle œuvre ne se bâcle pas.' },
        b: { n: 'L’Inspiration', s: 'Ma deuxième unité', t: 'L’étincelle qui donne vie à l’histoire', e: 'Vos meilleures idées arrivent d’un coup, comme un éclair. Une image, un mot, une rencontre, et tout commence.' },
        c: { n: 'L’Envie', s: 'Ma troisième unité', t: 'Le moteur indispensable pour prendre la plume', e: 'Quand l’envie est là, rien ne vous arrête. C’est elle qui vous met en mouvement et fait passer l’idée à l’action.' }
      },
      qs: [
        Q('Une nouvelle idée vous vient. Que faites-vous ?', 0, ['La laisser mûrir quelques jours|a', 'La noter tout de suite, avant qu’elle s’envole|b', 'Me mettre à écrire immédiatement|c']),
        Q('Qu’est-ce qui vous aide le plus à créer ?', 0, ['Du calme et du temps libre|a', 'Une rencontre ou une image qui me frappe|b', 'Une grande motivation|c', 'Un défi à relever|c']),
        Q('Quand une idée vous échappe…', 0, ['Je lui laisse le temps de revenir|a', 'J’attends qu’une nouvelle étincelle surgisse|b', 'Je me force à continuer|c']),
        Q('Vous préférez créer…', 1, ['Sans date limite|a', 'Sous le coup d’un éclair|b', 'Dès que l’envie est là|c', 'Après une longue réflexion|a']),
        Q('Un projet s’éternise. Vous…', 0, ['Y revenez avec patience|a', 'Cherchez une nouvelle idée pour le relancer|b', 'Foncer pour le finir|c']),
        Q('Quel moment de la journée vous inspire ?', 0, ['Un moment tranquille que je choisis|a', 'N’importe quand, par surprise|b', 'Quand je me sens motivé ou motivée|c']),
        Q('Qu’est-ce qui vous bloque le plus ?', 0, ['Le manque de temps|a', 'Le manque d’idées|b', 'Le manque de motivation|c']),
        Q('Votre cahier d’idées est…', 0, ['Rempli de brouillons relus longtemps|a', 'Rempli de notes jetées dans l’instant|b', 'Rempli de débuts d’histoires|c']),
        Q('Qu’est-ce qui rend une idée irrésistible ?', 1, ['Elle a mûri longtemps|a', 'Elle m’est tombée dessus d’un coup|b', 'Elle me donne envie de me lancer|c']),
        Q('Un ami vous propose d’écrire ensemble. Vous…', 0, ['Demandez du temps pour réfléchir|a', 'Cherchez d’abord une étincelle commune|b', 'Dites oui tout de suite|c']),
        Q('Votre rapport à la procrastination ?', 0, ['Je laisse mûrir, ce n’est pas de la paresse|a', 'J’attends le bon moment|b', 'Quand je m’y mets, je fonce|c']),
        Q('Après une pause, vous reprenez…', 0, ['Doucement, en relisant tout|a', 'Avec une nouvelle idée|b', 'Avec une envie renouvelée|c']),
        Q('Dans un voyage, vous vous inspirez…', 1, ['Du temps passé à observer|a', 'Des paysages et des rencontres|b', 'De l’envie d’écrire ce qu’on vit|c']),
        Q('Votre devise ?', 0, ['« Tout vient à point à qui sait attendre. »|a', '« Une idée, et tout commence. »|b', '« Vouloir, c’est déjà écrire. »|c'])
      ]
    },
    commedia: {
      titre: 'Quel personnage de la Commedia dell’arte êtes-vous ?', note: 'Seize masques, vingt-quatre questions : découvrez qui vous seriez sur les tréteaux de la Commedia dell’arte.', melange: true,
      res: {
        a: { n: "Arlequin", s: 'Commedia dell’arte', t: "Le valet espiègle", e: "Vous êtes joyeux, agile et plein de vie. Votre naïveté apparente cache une vraie débrouillardise, et votre rire est contagieux. Vous avez parfois du mal à vous tenir tranquille et vous agissez avant de réfléchir, mais vous savez rebondir après chaque faux pas. Ce que cela dit de vous : vous croyez que la vie est faite pour être goûtée.", u: "https://fr.wikipedia.org/wiki/Arlequin" },
        b: { n: "Colombine", s: 'Commedia dell’arte', t: "La servante lucide", e: "Vous avez l’esprit vif, le regard clair et le goût de la liberté. Vous voyez ce que les autres préfèrent ignorer et vous savez, sans bruit, démêler les situations. Ce que cela dit de vous : votre intelligence est avant tout pratique, et votre indépendance est votre plus grande force.", u: "https://fr.wikipedia.org/wiki/Colombine_(commedia_dell%27arte)" },
        c: { n: "Pantalon", s: 'Commedia dell’arte', t: "Le vieux marchand prudent", e: "Vous aimez la sécurité, l’ordre et les choses bien comptées. Prudent, parfois méfiant, vous protégez ce que vous avez construit. Ce que cela dit de vous : vous rassurez par votre sérieux, mais prenez garde à ne pas laisser la crainte de perdre vous priver de la joie de donner.", u: "https://fr.wikipedia.org/wiki/Pantalon_(commedia_dell%27arte)" },
        d: { n: "Le Docteur", s: 'Commedia dell’arte', t: "Le savant bavard", e: "Vous aimez comprendre, expliquer et transmettre. Votre érudition impressionne, et vous avez toujours une référence en poche. Ce que cela dit de vous : vous avez besoin que votre savoir soit reconnu. Méfiez-vous du plaisir d’avoir toujours raison : écouter vaut parfois mieux que démontrer.", u: "https://fr.wikipedia.org/wiki/Docteur_(commedia_dell%27arte)" },
        e: { n: "Cassandre", s: 'Commedia dell’arte', t: "Le gardien des convenances", e: "Vous tenez à l’honneur, à la règle et à la tradition. Soucieux et responsable, vous voulez protéger ceux qui comptent pour vous. Ce que cela dit de vous : vous cherchez la stabilité et le respect. Attention à la rigidité et à la crédulité, qui vous exposent aux malices des autres.", u: "https://fr.wikipedia.org/wiki/Cassandre_(commedia_dell%27arte)" },
        f: { n: "Isabella", s: 'Commedia dell’arte', t: "La passionnée éloquente", e: "Vous vivez avec intensité, parlez avec éclat et défendez ce qui compte pour vous avec dignité. Artiste dans l’âme, vous avez besoin d’exprimer vos émotions. Ce que cela dit de vous : votre fierté est un moteur, votre liberté une exigence, et votre cœur ne fait jamais les choses à moitié.", u: "https://fr.wikipedia.org/wiki/Isabella_Andreini" },
        g: { n: "Pierrot", s: 'Commedia dell’arte', t: "Le rêveur sensible", e: "Vous êtes tendre, lunaire et profondément sensible. Vous voyez de la poésie là où d’autres passent sans s’arrêter. Ce que cela dit de vous : vous avez un monde intérieur riche, mais vous gardez souvent vos émotions pour vous. Osez les montrer : elles touchent plus que vous ne le croyez.", u: "https://fr.wikipedia.org/wiki/Pierrot_(commedia_dell%27arte)" },
        h: { n: "Lélio", s: 'Commedia dell’arte', t: "Le jeune premier romantique", e: "Vous aimez les belles paroles, l’élégance et les grands sentiments. Séducteur et sincère à la fois, vous mettez de la grâce dans tout ce que vous faites. Ce que cela dit de vous : vous avez besoin d’être regardé et admiré. Attention à la vanité, qui peut vous éloigner de ce qui est vraiment essentiel.", u: "https://fr.wikipedia.org/wiki/L%C3%A9lio" },
        i: { n: "Scaramouche", s: 'Commedia dell’arte', t: "Le bretteur flamboyant", e: "Vous avez de l’audace, du panache et un sens inné du spectacle. Vif d’esprit et toujours prêt au défi, vous aimez que les choses bougent. Ce que cela dit de vous : vous cherchez l’éclat et le mouvement. Attention aux colères et aux fanfaronnades quand votre orgueil est piqué.", u: "https://fr.wikipedia.org/wiki/Scaramouche_(commedia_dell%27arte)" },
        j: { n: "Brighella", s: 'Commedia dell’arte', t: "Le valet intrigant", e: "Vous avez l’esprit d’un stratège : vous lisez les gens et les situations, et vous savez tirer parti du moindre détail. Efficace et souvent discret, vous préférez agir dans l’ombre. Ce que cela dit de vous : vous aimez avoir une longueur d’avance. Méfiez-vous du cynisme, qui peut vous isoler.", u: "https://fr.wikipedia.org/wiki/Brighella" },
        k: { n: "Trivelin", s: 'Commedia dell’arte', t: "Le valet débrouillard", e: "Vous êtes souple, adaptable et plein de ressources. Vous retombez toujours sur vos pattes et vous trouvez des solutions là où d’autres s’arrêtent. Ce que cela dit de vous : vous valorisez la liberté et la sécurité matérielle. Veillez toutefois à ce que votre loyauté ne dépende pas seulement de ce que l’on vous offre.", u: "https://fr.wikipedia.org/wiki/Trivelin" },
        l: { n: "Mezzetin / Mezzetino", s: 'Commedia dell’arte', t: "Le galant musicien", e: "Vous êtes charmeur, léger et plein de grâce. Vous mettez les autres à l’aise et vous aimez que la vie soit une fête, avec un peu de musique et de poésie. Ce que cela dit de vous : vous cherchez le plaisir et l’harmonie. Prenez garde à ne pas fuir les sujets trop sérieux.", u: "https://fr.wikipedia.org/wiki/Mezzetin" },
        m: { n: "Coviello", s: 'Commedia dell’arte', t: "Le valet stratège", e: "Vous êtes fidèle, ingénieux et toujours un plan en poche. Vous aimez rendre service, arranger les choses et faire en sorte que chacun s’y retrouve. Ce que cela dit de vous : vous êtes un allié précieux, qui préfère l’action discrète aux grands discours. N’oubliez pas de penser aussi à vos propres envies.", u: "https://fr.wikipedia.org/wiki/Covielle" },
        n: { n: "Tartaglia", s: 'Commedia dell’arte', t: "Le maladroit attachant", e: "Vous êtes sincère et sensible. L’émotion vous fait parfois perdre vos mots, et vous craignez d’être jugé. Ce que cela dit de vous : votre honnêteté touche ceux qui vous entourent, bien plus que vous ne l’imaginez. Faites-vous confiance : vos maladresses font aussi votre charme.", u: "https://fr.wikipedia.org/wiki/Tartaglia_(commedia_dell%27arte)" },
        o: { n: "Il Capitano", s: 'Commedia dell’arte', t: "Le fanfaron grandiloquent", e: "Vous avez un grand besoin de grandeur et de reconnaissance, et une imagination débordante. Vous aimez raconter, exagérer, frapper les esprits. Ce que cela dit de vous : vous voulez qu’on vous prenne au sérieux. Attention à l’écart entre les mots et les actes : la sincérité vous rendra plus fort.", u: "https://fr.wikipedia.org/wiki/Capitan_(commedia_dell%27arte)" },
        p: { n: "Polichinelle", s: 'Commedia dell’arte', t: "Le trublion impertinent", e: "Vous avez l’esprit libre, rebelle et grinçant. Votre humour dérange autant qu’il libère, et vous dites tout haut ce que d’autres taisent. Ce que cela dit de vous : vous détestez les faux-semblants et l’autorité sans raison. Veillez seulement à ne pas blesser ceux que vous aimez avec vos traits.", u: "https://fr.wikipedia.org/wiki/Polichinelle_(commedia_dell%27arte)" }
      },
      qs: [
        Q("Comment décririez-vous votre tempérament ?", 0, ["Espiègle et affamé de vie : je ris d’abord, je réfléchis ensuite.|a","Vif et lucide : rien ne m’échappe, et je le fais savoir.|b","Prudent et méfiant : je pèse chaque risque avant de bouger.|c","Solennel et bavard : j’aime expliquer et être écouté.|d","Craintif et rigoureux : j’aime l’ordre et les convenances.|e","Passionné et éloquent : je vis tout avec intensité.|f","Rêveur et mélancolique : je vis souvent dans la lune.|g","Romantique et élégant : j’aime plaire avec grâce.|h"]),
        Q("Face à un conflit, vous…", 0, ["Défendez vos convictions avec éloquence, sans baisser les yeux.|f","Fuyez la dispute et vous effacez en silence.|g","Cherchez à tout régler par de beaux discours.|h","Dégainez d’abord, discutez après, avec panache.|i","Laissez les autres s’affronter et profitez du désordre.|j","Négociez avec tout le monde et changez de camp si besoin.|k","Désamorcez la tension par une chanson ou un trait d’esprit.|l","Préparez un plan malin pour que chacun y trouve son compte.|m"]),
        Q("Quelle est votre plus grande ambition ?", 0, ["Gagner assez pour ne plus dépendre d’un seul maître.|k","Profiter de la vie, de la musique et des belles rencontres.|l","Devenir indispensable à ceux qui comptent.|m","Qu’on m’écoute enfin sans se moquer de moi.|n","Entrer dans la légende comme le plus grand des héros.|o","Que personne ne me dicte jamais ce que je dois faire.|p","Manger à ma faim et rire encore demain.|a","Être libre, respectée et mener ma vie comme je l’entends.|b"]),
        Q("Quelle place occupez-vous dans un groupe ?", 1, ["Le trublion qui dit tout haut ce que les autres pensent tout bas.|p","Le boute-en-train qui met de l’ambiance et fait des bêtises.|a","Celle qui voit tout, arrange tout et tire discrètement les ficelles.|b","Le gardien du budget, que l’on consulte avant de dépenser.|c","Celui qui explique, tranche et cite ses sources.|d","Le garant des règles, qui rappelle ce qui se fait ou non.|e","Celle qui porte la parole et inspire les autres.|f","Le rêveur sensible qui écoute et console.|g"]),
        Q("Quel est votre rapport à l’amour ?", 0, ["Un engagement sérieux, honorable, et bien accepté de tous.|e","Un feu intérieur : j’aime avec passion et avec liberté.|f","Un idéal tendre et douloureux que j’adore en silence.|g","Un jeu de séduction, de lettres et de déclarations enflammées.|h","Une aventure fougueuse, racontée avec panache.|i","Un moyen comme un autre d’obtenir ce que je veux.|j","Un plaisir passager, tant que l’on me nourrit et me paie.|k","Une sérénade sous la fenêtre et des baisers volés.|l"]),
        Q("Quel est votre plus grand défaut ?", 0, ["Je manque de scrupules quand mes intérêts sont en jeu.|j","Je suis prêt à servir celui qui paie le mieux.|k","Je suis volage et je ne tiens pas toujours mes promesses.|l","Je manigance trop et je m’emmêle dans mes propres plans.|m","Je panique, je bégaie et je finis par tout gâcher.|n","Je me vante sans cesse de ce que je n’ai jamais fait.|o","Je suis insolent et je blesse parfois sans le vouloir.|p","Je suis gourmand, étourdi et incapable de rester tranquille.|a"]),
        Q("Quel est votre rapport à l’autorité ?", 0, ["J’obéis aux grands noms, mais je m’invente moi-même général.|o","L’autorité me fait rire : j’aime la tourner en dérision.|p","Je fais semblant d’obéir, puis je fais à ma façon.|a","Je respecte ceux qui le méritent et je ruse avec les autres.|b","C’est moi qui commande, et personne ne me contredit.|c","Je reconnais l’autorité du savoir : on ne discute pas la science.|d","Je me range volontiers du côté de la loi et des convenances.|e","Je n’accepte que l’autorité que je juge juste.|f"]),
        Q("Comment s’exprime votre imagination ?", 1, ["J’invente des théories et des mots savants pour tout justifier.|d","Je m’imagine les pires scénarios, avec grand luxe de détails.|e","J’écris, je déclame, je transforme mes émotions en poèmes et en rôles.|f","Je rêve éveillé et je compose en secret des histoires de lune.|g","J’improvise des déclarations et des lettres d’amour pleines d’éclat.|h","J’invente des postures, des grimaces et des cabrioles.|i","J’invente des intrigues dont personne ne voit les fils.|j","J’improvise sans cesse des stratagèmes pour me sortir d’affaire.|k"]),
        Q("Comment vous y prenez-vous avec les autres ?", 0, ["Je comprends vite qui veut m’admirer, et je lui offre un spectacle.|i","Je repère les faiblesses de chacun et je m’en sers.|j","Je m’adapte à chacun pour rester utile à tout le monde.|k","Je charme n’importe qui avec une mélodie ou un compliment.|l","Je lis les situations et je glisse le bon conseil à l’oreille.|m","J’ai du mal à lire les autres, mais je cherche à bien faire.|n","Je crois que tout le monde m’admire, même quand ce n’est pas vrai.|o","Je déchiffre tout le monde, et je ne les ménage pas.|p"]),
        Q("Quand un imprévu surgit, vous…", 0, ["Perdez vos moyens et courez dans tous les sens.|n","Prenez la pose du héros, puis cherchez la sortie.|o","Vous en amusez et mettez encore plus de désordre.|p","Improvisez, tombez, vous relevez et recommencez.|a","Gardez la tête froide et trouvez une issue.|b","Détestez ça : un imprévu coûte toujours de l’argent.|c","Cherchez une explication savante à ce qui arrive.|d","Vous inquiétez longuement avant de réagir.|e"]),
        Q("Quel est votre rapport à la vérité ?", 0, ["Je la garde pour moi quand elle peut coûter de l’argent.|c","Je la proclame avec érudition, quitte à ennuyer tout le monde.|d","Je la dis volontiers, tant qu’elle respecte les convenances.|e","Je la dis franchement, avec noblesse.|f","Je la dis sans détour, par naïveté, et j’en souffre.|g","Je l’habille de belles phrases pour qu’elle plaise.|h","Je l’exagère avec panache pour qu’elle soit plus drôle.|i","Je la manipule : elle n’est qu’un outil parmi d’autres.|j"]),
        Q("De quoi êtes-vous le plus fier ou fière ?", 0, ["De mon allure et de mes belles paroles.|h","De mon audace et de mes exploits.|i","De ne jamais être pris la main dans le sac.|j","D’avoir toujours su me débrouiller.|k","De mon charme et de mon art de plaire.|l","D’être celui sur qui l’on peut compter.|m","D’essayer malgré tout, même quand on se moque de moi.|n","De tout : je suis un grand homme !|o"]),
        Q("À quoi ressemble votre monde intérieur ?", 1, ["Un esprit vif, toujours en train de calculer le meilleur plan.|m","Un monde d’inquiétudes et de mots qui restent coincés.|n","Un théâtre où je suis le héros de toutes les batailles.|o","Un monde moqueur, qui se méfie des grands discours.|p","Un monde simple : manger, rire, aimer, recommencer.|a","Un monde lucide, où je garde toujours une longueur d’avance.|b","Un coffre-fort : tout y est compté, rangé et verrouillé.|c","Une bibliothèque : tout y est classé et commenté.|d"]),
        Q("Quel est votre rapport à l’argent et au confort ?", 0, ["J’aime le confort, mais jamais au prix de ma liberté.|b","L’argent est ma sécurité : je le compte et je le protège.|c","Je veux le confort d’une bonne table et d’une bonne réputation.|d","J’aime la sécurité d’un patrimoine bien gardé.|e","L’argent m’importe peu, pourvu que je puisse créer et vivre mes passions.|f","Je me contente de peu, pourvu qu’on me laisse rêver.|g","J’aime le luxe, les beaux habits et les belles manières.|h","Je dépense avec panache et je m’inquiète du lendemain plus tard.|i"]),
        Q("Que faites-vous face au danger ?", 0, ["Je tremble en silence, mais j’avance pour ceux que j’aime.|g","Je le brave quand on me regarde, pour l’honneur et pour l’amour.|h","Je le défie en riant, quitte à faire semblant d’être brave.|i","Je le calcule : je ne m’expose jamais pour rien.|j","Je m’esquive avec agilité dès que ça tourne mal.|k","Je le prends à la légère, une chanson aux lèvres.|l","Je l’évite grâce à un plan préparé d’avance.|m","Je panique dès que je le sens venir.|n"]),
        Q("Quelle est votre plus grande qualité ?", 0, ["Mon charme et mon art de mettre les autres à l’aise.|l","Ma loyauté et mon sens de l’organisation.|m","Ma sincérité, même quand elle est maladroite.|n","Mon courage apparent, qui impressionne… avant d’être démasqué.|o","Mon franc-parler : je dis ce que d’autres n’osent pas dire.|p","Ma joie de vivre, qui contamine tout le monde.|a","Mon intelligence pratique et mon indépendance.|b","Mon sens de l’économie et de la prudence.|c"]),
        Q("Comment réagissez-vous face à une injustice ?", 0, ["Je cherche une ruse pour renverser la situation en m’amusant.|a","Je défends discrètement les opprimés et je mène l’enquête.|b","Je proteste surtout quand elle me coûte de l’argent.|c","Je cite les lois, les règles et les principes.|d","Je m’indigne, mais j’attends que l’autorité règle cela.|e","Je m’exprime avec force et dignité pour que la vérité éclate.|f","J’en pleure en silence et je ne sais pas comment réagir.|g","Je plaide pour la justice avec un beau discours enflammé.|h"]),
        Q("Quel est votre rapport à la jalousie ?", 0, ["Je suis exigeante en amour, mais je n’aime pas le contrôle.|f","Je souffre en silence quand l’autre rit avec quelqu’un d’autre.|g","Je suis jaloux de ceux qui brillent plus que moi.|h","Je suis jaloux des rivaux qui m’éclipsent… et je les défie.|i","Je note tout mentalement et je me venge plus tard.|j","Je suis jaloux de ceux qui sont mieux payés que moi.|k","Je plaisante pour ne rien laisser paraître.|l","Je m’efforce de ne pas être jaloux de ceux que j’aide.|m"]),
        Q("Que représente la gloire pour vous ?", 0, ["Je veux surtout la gloire qui rapporte.|k","J’aime les applaudissements, surtout quand je chante.|l","Je préfère la gloire discrète de celui qui rend service.|m","Je rêve d’être pris au sérieux au moins une fois.|n","Je rêve d’un monument à mon nom !|o","La gloire m’amuse : je m’en moque tout en la voulant un peu.|p","Je veux être célèbre pour mes bêtises et mes pirouettes.|a","La vraie gloire, c’est être libre et avoir mené mon jeu.|b"]),
        Q("Que faites-vous des secrets ?", 0, ["Je révèle tout au plus mauvais moment, pour le plaisir.|p","Je ne sais pas garder un secret très longtemps.|a","Je sais garder un secret et m’en servir au bon moment.|b","Je garde jalousement mes secrets de comptes.|c","Je raconte en public ce que d’autres cachent, en citant mes sources.|d","Je protège les secrets de famille comme un trésor.|e","Je garde mes secrets pour mes poèmes et mes rôles.|f","Je confie mes secrets à la lune.|g"]),
        Q("Quel est votre côté sombre ?", 1, ["Une rigidité qui me fait condamner trop vite.|e","Un orgueil blessé qui peut devenir violent.|f","Une tristesse profonde qui m’éloigne des autres.|g","Une vanité qui me fait mépriser ceux qui m’ennuient.|h","Une violence qui éclate quand on m’humilie.|i","Une froideur calculatrice et un goût de la vengeance.|j","Une avidité qui me fait trahir sans état d’âme.|k","Une légèreté qui peut faire souffrir ceux qui m’aiment.|l"]),
        Q("Comment accueillez-vous le changement ?", 0, ["Je l’exploite : le changement est une occasion de monter.|j","Je m’adapte vite, du moment que je garde mon emploi.|k","Je l’accueille comme une nouvelle chanson.|l","Je le prépare à l’avance pour ne pas être pris au dépourvu.|m","Je le redoute et je m’accroche malgré moi à ce que je connais.|n","Je change de discours selon les circonstances, sans jamais l’avouer.|o","Je le provoque : l’ordre établi est fait pour être bousculé.|p","Je le suis les yeux fermés : chaque jour est une nouvelle farce.|a"]),
        Q("Qu’est-ce qui vous définit le plus profondément ?", 0, ["Un besoin de grandeur, quitte à l’inventer.|o","Un esprit de rébellion joyeux et grinçant.|p","La faim, la joie et un cœur d’enfant.|a","L’intelligence du cœur et le goût de la liberté.|b","Le sens des biens et de l’autorité.|c","Le goût du savoir et de la parole.|d","Le respect de l’honneur et des devoirs.|e","La passion, l’éloquence et la dignité.|f"]),
        Q("Quelle serait votre devise ?", 0, ["« La parole est une arme : autant savoir la manier. »|d","« Il faut sauver l’honneur et les apparences. »|e","« Vivre pleinement, aimer sans peur. »|f","« Même la nuit finit par rêver de lune. »|g","« L’amour mérite la plus belle des éloquences. »|h","« Audace et panache : que le spectacle commence ! »|i","« Tout s’arrange pour qui sait bien manœuvrer. »|j","« Un bon valet n’est jamais sans emploi. »|k"])
      ]
    }
  };

  /* ---------- Moteur ---------- */
  const base = () => location.href.split('#')[0];
  const MASQ = { comedie: ['comedie'], tragedie: ['tragedie'], drame: ['comedie', 'tragedie'] };
  const carte = (rac) => { rac.textContent = ''; const c = el('div', 'quiz-carte jeu-carte test-etape'); rac.append(c); return c; };
  const vers = (c) => { if (c.getBoundingClientRect().top < 0) c.scrollIntoView({ behavior: 'smooth', block: 'start' }); };

  const intro = (rac, id, T) => {
    const c = carte(rac); c.append(el('p', 'quiz-categorie', 'Règles du test'));
    const ul = el('ul', 'test-regles');
    [`Ce test comporte ${T.qs.length} questions.`, 'Chaque question précise si une seule réponse est possible ou si plusieurs réponses sont possibles.', 'Répondez spontanément : il n’y a ni bonne ni mauvaise réponse.', 'Après la dernière question, votre résultat s’affiche et vous pouvez le partager.', T.note].forEach((t) => ul.append(el('li', '', t)));
    const b = bouton('Commencer le test', () => question(rac, id, T, 0, {}), 'bouton avis-neuf-bouton'); c.append(ul, b);
  };

  const question = (rac, id, T, i, score) => {
    const Qn = T.qs[i], N = T.qs.length, c = carte(rac), choisis = new Set();
    const pg = el('div', 'test-progres'); const barre = el('span'); barre.style.width = (i / N * 100) + '%'; pg.append(barre); pg.setAttribute('aria-hidden', 'true');
    const ent = el('div', 'quiz-entete'); ent.append(el('span', 'quiz-categorie', `Question ${i + 1} / ${N}`));
    c.append(ent, pg, el('h3', 'quiz-question', Qn.q), el('p', 'test-consigne', Qn.m ? 'Choisissez une ou plusieurs réponses.' : 'Choisissez une seule réponse.'));
    requestAnimationFrame(() => { barre.style.width = ((i + 1) / N * 100) + '%'; });
    const g = el('div', 'quiz-reponses'); g.setAttribute('role', 'group');
    const suite = () => { if (i + 1 < N) { question(rac, id, T, i + 1, score); vers(rac); } else resultat(rac, id, T, score); };
    const ajoute = (r) => [...r.l].forEach((l) => { score[l] = (score[l] || 0) + 1; });
    let valider;
    const rs = T.melange ? mel(Qn.r) : Qn.r;
    rs.forEach((r, k) => {
      const b = el('button', 'quiz-rep'); b.type = 'button'; const lt = el('span', 'quiz-lettre', 'ABCDEFGH'[k]); lt.setAttribute('aria-hidden', 'true'); b.append(lt, el('span', '', r.t));
      if (Qn.m) {
        b.setAttribute('aria-pressed', 'false');
        b.addEventListener('click', () => { const on = !choisis.has(k); on ? choisis.add(k) : choisis.delete(k); b.classList.toggle('coche', on); b.setAttribute('aria-pressed', String(on)); valider.disabled = !choisis.size; });
      } else {
        b.addEventListener('click', () => { if (g.dataset.fini) return; g.dataset.fini = 1; b.classList.add('coche'); ajoute(r); setTimeout(suite, 380); });
      }
      g.append(b);
    });
    c.append(g);
    if (Qn.m) { valider = bouton('Valider', () => { choisis.forEach((k) => ajoute(rs[k])); suite(); }); valider.disabled = true; c.append(valider); }
  };

  const resultat = (rac, id, T, score) => {
    const cles = Object.keys(T.res).filter((k) => score[k] != null || T.res[k].m !== 'drame');
    /* Pour le test des personnages : on compare des proportions, car chaque personnage n’apparaît pas le même nombre de fois */
    const app = {}; if (T.melange) T.qs.forEach((q) => q.r.forEach((r) => [...r.l].forEach((l) => { app[l] = (app[l] || 0) + 1; })));
    const tri = cles.map((k) => ({ k, s: (score[k] || 0) / (T.melange ? (app[k] || 1) : 1) })).sort((a, b) => b.s - a.s || (T.melange ? Math.random() - .5 : 0));
    let top = tri[0].k, second = tri[1] && tri[1].s ? tri[1].k : null;
    if (T.egal != null && tri[1] && tri[0].s - tri[1].s <= T.egal) { top = 'c'; second = null; }
    const r = T.res[top];
    rac.textContent = '';
    const sc = el('div', 'res-scene'); sc.setAttribute('role', 'status');
    const fx = el('div', 'avis-neuf-faisceaux'); fx.setAttribute('aria-hidden', 'true'); fx.append(el('span'), el('span'));
    const pg = el('div', 'res-pan res-pan-g'), pd = el('div', 'res-pan res-pan-d'); pg.setAttribute('aria-hidden', 'true'); pd.setAttribute('aria-hidden', 'true');
    const c = el('div', 'quiz-carte jeu-carte res-carte');
    const badge = el('div', 'res-badge'); badge.setAttribute('aria-hidden', 'true');
    if (r.m) badge.innerHTML = MASQ[r.m].map((m) => `<svg viewBox="0 0 100 120"><use href="#m-${m}"/></svg>`).join('');
    else badge.textContent = r.n.replace(/^(Le |La |L’|Les |Amirale |Première Maîtresse |Seconde Maîtresse )/, '').charAt(0).toUpperCase();
    c.append(badge, el('p', 'quiz-categorie', 'Votre résultat'), el('h3', 'res-nom', r.n), el('p', 'res-accroche', r.t), el('p', 'quiz-texte', r.e), el('p', 'res-source', r.s));
    if (second) c.append(el('p', 'res-second', 'Vous êtes aussi proche de : ' + T.res[second].n + '.'));
    const txt = `Mon résultat au test « ${T.titre} » : ${r.n} (${r.t}).`;
    const url = base() + '#test-' + id;
    const pan = el('div', 'test-partage'); pan.hidden = true;
    const lien = (t, h) => { const a = el('a', 'bouton bouton-contour-encre', t); a.href = h; a.target = '_blank'; a.rel = 'noopener noreferrer'; return a; };
    const corps = encodeURIComponent(txt + ' ' + url);
    const copier = bouton('Copier le texte', () => { const fin = () => { copier.textContent = 'Copié !'; }; if (navigator.clipboard) navigator.clipboard.writeText(txt + ' ' + url).then(fin, fin); else fin(); }, 'bouton bouton-contour-encre');
    pan.append(lien('E-mail', `mailto:?subject=${encodeURIComponent('Mon résultat : ' + r.n)}&body=${corps}`), lien('SMS', `sms:?&body=${corps}`), lien('WhatsApp', `https://wa.me/?text=${corps}`), copier);
    const part = bouton('Partager mon résultat', async () => {
      if (navigator.share) { try { await navigator.share({ title: 'Mon résultat : ' + r.n, text: txt, url }); return; } catch (e) { if (e && e.name === 'AbortError') return; } }
      pan.hidden = !pan.hidden;
    }, 'bouton avis-neuf-bouton');
    const refaire = bouton('Refaire le test', () => { intro(rac, id, T); vers(rac); }, 'bouton bouton-contour-encre');
    const act = el('div', 'res-actions');
    if (r.u) { const sv = el('a', 'bouton bouton-contour-encre', 'Pour en savoir plus'); sv.href = r.u; sv.target = '_blank'; sv.rel = 'noopener noreferrer'; const so = el('span', 'sr-only', ' (s’ouvre dans un nouvel onglet)'); sv.append(so); act.append(sv); }
    act.append(part, refaire);
    c.append(act, pan);
    sc.append(fx, c);
    for (let k = 0; k < 14; k++) { const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); s.setAttribute('class', 'res-etoile'); s.setAttribute('aria-hidden', 'true'); s.style.setProperty('--a', (k * 360 / 14) + 'deg'); s.innerHTML = '<use href="#etoile"/>'; sc.append(s); }
    sc.append(pg, pd); rac.append(sc); vers(rac);
  };

  document.querySelectorAll('.test[data-test]').forEach((rac) => { const T = TESTS[rac.dataset.test]; if (T) intro(rac, rac.dataset.test, T); });
})();
