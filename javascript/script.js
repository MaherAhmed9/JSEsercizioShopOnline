let prodotti = [
    {
        id: 1,
        nome: "Quaderno",
        prezzo: 4.5,
        disponibile: true,
        categoria: "cartoleria",
    },
    {
        id: 2,
        nome: "Penna",
        prezzo: 1.5,
        disponibile: true,
        categoria: "cartoleria",
    },
    {
        id: 3,
        nome: "Libro JavaScript",
        prezzo: 29.9,
        disponibile: true,
        categoria: "libri",
    },
    {
        id: 4,
        nome: "Cuffie",
        prezzo: 59.9,
        disponibile: false,
        categoria: "tech",
    },
    {
        id: 5,
        nome: "Zaino",
        prezzo: 39.9,
        disponibile: true,
        categoria: "accessori",
    },
    {
        id: 6,
        nome: "Tablet",
        prezzo: 199.9,
        disponibile: true,
        categoria: "tech",
    },
];
let carrello = [];

function formattaPrezzo(prezzo) {
    return `€${prezzo.toFixed(2)}`;
}

function cercaProdotto(idProdotto) {
    return prodotti.find((p) => p.id === idProdotto);
}

function dataOggiIT() {
    const data = new Date();
    let giorno = String(data.getDate()).padStart(2, "0");
    let mese = String(data.getMonth() + 1).padStart(2, "0");
    let anno = String(data.getFullYear());

    return `${giorno}/${mese}/${anno}`;
}

function prodottiDisponibili() {
    return prodotti.filter((p) => p.disponibile === true);
}

function prodottiNonDisponibili() {
    return prodotti.filter((p) => p.disponibile === false);
}

function prodottiPremiun() {
    return prodotti.filter((p) => p.prezzo > 50);
}

const nomiProdotti = prodotti.map((p) => p.nome);

function aggiungiAlCarrello(idProdotto) {
    let prodotto = cercaProdotto(idProdotto);

    if (prodotto.disponibile === true) {
        carrello.push(prodotto);
    }

    renderCarello();
}

function calcolaSubtotale() {
    let subtotale = 0;
    for (let prodotto of carrello) {
        subtotale += prodotto.prezzo;
    }

    return subtotale;
}

function calcolaSconto() {
    let subtotale = calcolaSubtotale();
    let sconto = 0;

    if (subtotale >= 100) {
        sconto = subtotale * 0.1;
    }

    return sconto;
}

function calcolaTotaleFinale() {
    let subtotale = calcolaSubtotale();
    let sconto = calcolaSconto();
    let totale = subtotale - sconto;

    return totale;
}

const catalogo = document.querySelector("#catalogo");
const carrelloLista = document.querySelector("#carrelloLista");
const subtotale = document.querySelector("#subtotale");
const sconto = document.querySelector("#sconto");
const totaleFinale = document.querySelector("#totaleFinale");
const btnAll = document.querySelector("#btnAll");
const btnAvilable = document.querySelector("#btnAvailable");
const btnPremium = document.querySelector("#btnPremium");
const checkoutForm = document.querySelector("#checkoutForm");
const nomeCliente = document.querySelector("#nomeCliente");
const emailCliente = document.querySelector("#emailCliente");
const etaCliente = document.querySelector("#etaCliente");
const msgErrore = document.querySelector("#msgErrore");
const riepilogo = document.querySelector("#riepilogo");

function renderCatalogo(listaProdotti) {
    catalogo.innerHTML = "";

    for (let prodotto of listaProdotti) {
        const div = document.createElement("div");
        const nomeProdotto = document.createElement("p");
        const prezzoProdotto = document.createElement("p");
        const isDisponibile = document.createElement("p");
        const btnCompra = document.createElement("button");

        nomeProdotto.textContent = prodotto.nome;
        prezzoProdotto.textContent = formattaPrezzo(prodotto.prezzo);
        isDisponibile.textContent =
            prodotto.disponibile === true ? "Disponibile" : "Esaurito";
        btnCompra.textContent = "Aggiungi al carrello";
        if (prodotto.disponibile !== true) {
            btnCompra.disabled = true;
        }
        btnCompra.setAttribute("onclick", `aggiungiAlCarrello(${prodotto.id})`);

        div.append(nomeProdotto);
        div.append(prezzoProdotto);
        div.append(isDisponibile);
        div.append(btnCompra);
        catalogo.append(div);
    }
}

renderCatalogo(prodotti);

function renderCarello() {
    subtotale.textContent = formattaPrezzo(calcolaSubtotale());
    sconto.textContent = formattaPrezzo(calcolaSconto());
    totaleFinale.textContent = formattaPrezzo(calcolaTotaleFinale());
}

btnAll.setAttribute("onclick", "renderCatalogo(prodotti)");
btnAvilable.setAttribute("onclick", "renderCatalogo(prodottiDisponibili())");
btnPremium.setAttribute("onclick", "renderCatalogo(prodottiPremiun())");

checkoutForm.setAttribute("onsubmit", "renderRiepilogo(); return false;");

function renderRiepilogo() {
    let nome = nomeCliente.value;
    let emailU = emailCliente.value;
    let eta = Number(etaCliente.value);

    if (nome.length <= 3) {
        msgErrore.classList.remove("hidden");
        msgErrore.textContent = "Nome deve avere almeno 3 caratteri";
    }

    if (!emailU.includes("@")) {
        msgErrore.classList.remove("hidden");
        msgErrore.textContent = "Email deve contenere il simbolo '@'";
    }

    if (eta < 18) {
        msgErrore.classList.remove("hidden");
        msgErrore.textContent = "Devi avere almeno 18 anni per ordinare";
    }

    if (nome.length >= 3 && emailU.includes("@") && eta >= 18) {
        riepilogo.innerHTML = "";

        const ordine = document.createElement("p");
        const cliente = document.createElement("p");
        const email = document.createElement("p");
        const prodotti = document.createElement("p");
        const totale = document.createElement("p");
        const data = document.createElement("p");

        ordine.textContent = "Ordine: Confermato";
        cliente.textContent = `Cliente: ${nome}`;
        email.textContent = `Email: ${emailU}`;
        prodotti.textContent = `Prodotti: ${carrello.length}`;
        totale.textContent = `Totale: ${formattaPrezzo(calcolaTotaleFinale())}`;
        data.textContent = `Data: ${dataOggiIT()}`;

        riepilogo.append(ordine);
        riepilogo.append(cliente);
        riepilogo.append(email);
        riepilogo.append(prodotti);
        riepilogo.append(totale);
        riepilogo.append(data);
    }
}
