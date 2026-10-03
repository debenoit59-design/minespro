// ==============================
// CONNEXION SUPABASE
// ==============================

const SUPABASE_URL =
    "https://sodewninwjavmohlfbux.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_sIna3jnTX_GVHs7fxAWyPw_KJjHfucb";

const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );

console.log("Supabase connecté");


// ==============================
// VARIABLES DU DEMO
// ==============================

let demoRound = 0;
let demoClicks = 0;


// ==============================
// CONNEXION PSEUDO
// ==============================

function loginUser() {

    const username =
        document
        .getElementById("username")
        .value
        .trim();

    const message =
        document.getElementById("loginMessage");

    const dashboard =
        document.getElementById("dashboard");

    const welcome =
        document.getElementById("welcomeUser");


    if (username === "") {

        message.textContent =
            "Veuillez entrer votre pseudo.";

        return;
    }


    message.textContent = "";

    welcome.textContent =
        "Bienvenue " + username + " !";

    dashboard.style.display =
        "block";

    dashboard.scrollIntoView({
        behavior: "smooth"
    });
}


// ==============================
// COMMENCER
// ==============================

function startGame() {

    const connexion =
        document.getElementById("connexion");

    if (connexion) {

        connexion.scrollIntoView({
            behavior: "smooth"
        });

    }
}


// ==============================
// AFFICHER LES JEUX
// ==============================

function showGames() {

    const games =
        document.getElementById("games");

    if (!games) {
        return;
    }

    games.style.display =
        "block";

    games.scrollIntoView({
        behavior: "smooth"
    });
}


// ==============================
// OUVRIR MINES
// ==============================

function openMines() {

    const minesGame =
        document.getElementById("minesGame");

    if (!minesGame) {
        return;
    }

    minesGame.style.display =
        "block";

    minesGame.scrollIntoView({
        behavior: "smooth"
    });

    resetMines();
}


// ==============================
// CLIQUER SUR UNE CASE
// ==============================

function mineClick(button) {

    if (!button || button.disabled) {
        return;
    }

    button.textContent = "✓";

    button.disabled = true;

    demoClicks++;

    updateDemoStats();
}


// ==============================
// NOUVELLE PARTIE
// ==============================

function startDemoGame() {

    demoRound++;

    demoClicks = 0;

    resetMines();

    updateDemoStats();
}


// ==============================
// RECOMMENCER
// ==============================

function resetMines() {

    const buttons =
        document.querySelectorAll(
            "#minesGrid button"
        );

    buttons.forEach(function(button) {

        button.textContent = "?";

        button.disabled = false;

    });

    updateDemoStats();
}


// ==============================
// STATISTIQUES
// ==============================

function updateDemoStats() {

    const roundElement =
        document.getElementById("demoRound");

    const clicksElement =
        document.getElementById("demoClicks");


    if (roundElement) {

        roundElement.textContent =
            demoRound;
    }


    if (clicksElement) {

        clicksElement.textContent =
            demoClicks;
    }
}


// ==============================
// RETOUR TABLEAU DE BORD
// ==============================

function backToDashboard() {

    const minesGame =
        document.getElementById("minesGame");

    if (minesGame) {

        minesGame.style.display =
            "none";
    }


    const dashboard =
        document.getElementById("dashboard");

    if (dashboard) {

        dashboard.scrollIntoView({
            behavior: "smooth"
        });
    }
}


// ==============================
// PREMIUM
// ==============================

function premiumAccess() {

    alert(
        "L'espace Premium est actuellement en démonstration."
    );
}


// ==============================
// CONTACT
// ==============================

function contactSupport() {

    alert(
        "Le support sera bientôt disponible."
    );
}


// ==============================
// AFFICHER LE COMPTE CONNECTÉ
// ==============================

async function afficherUtilisateur() {

    const userWelcome =
        document.getElementById("userWelcome");

    if (!userWelcome) {
        return;
    }


    userWelcome.textContent =
        "Vérification du compte...";


    try {

        const { data, error } =
            await supabaseClient.auth.getUser();


        if (error) {

            console.log(
                "Erreur Supabase :",
                error
            );

            userWelcome.textContent =
                "⚠️ Impossible de vérifier le compte.";

            return;
        }


        if (data.user) {

            userWelcome.innerHTML =
                "👤 Compte connecté<br>" +
                "<strong>" +
                data.user.email +
                "</strong>";

            console.log(
                "Compte connecté :",
                data.user.email
            );

        } else {

            userWelcome.innerHTML =
                "👤 Aucun compte connecté";
        }


    } catch (error) {

        console.log(
            "Erreur :",
            error
        );

        userWelcome.textContent =
            "⚠️ Erreur de connexion.";
    }
}


// ==============================
// LANCER L'AFFICHAGE DU COMPTE
// ==============================

afficherUtilisateur();


console.log("SCRIPT OK");
// ==============================
// DÉCONNEXION
// ==============================

async function deconnecterUtilisateur() {

    const { error } =
        await supabaseClient.auth.signOut();

    if (error) {

        alert(
            "Erreur lors de la déconnexion."
        );

        console.log(error);

        return;
    }

    window.location.href =
        "connexion.html";
}