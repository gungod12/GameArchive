const sabitOyunlar = [
    { ad: "Granny", link: "https://granny1.io/granny", resim: "https://granny1.io/cache/data/image/game/granny-online-f480x270.webp", hikaye: "Granny'den kaçın!" },
    { ad: "Granny 2", link: "https://granny1.io/granny-2", resim: "https://granny1.io/cache/data/image/game/granny-2-online-f480x270.webp", hikaye: "Granny ve Grandpa evde!" }
];

function listele() {
    let kullaniciOyunlari = JSON.parse(localStorage.getItem("oyunListem")) || [];
    let tumOyunlar = sabitOyunlar.concat(kullaniciOyunlari);
    const aranan = document.getElementById("arama-cubugu").value.toLowerCase();
    const container = document.getElementById("oyun-listesi");
    container.innerHTML = "";

    tumOyunlar.forEach((oyun, index) => {
        if(oyun.ad.toLowerCase().includes(aranan)) {
            container.innerHTML += `
                <div class="oyun-kart">
                    <img src="${oyun.resim}">
                    <h3>${oyun.ad}</h3>
                    <button onclick="incele(${index})">İncele</button>
                    <a href="${oyun.link}" target="_blank" class="oyna-btn">Oyna</a>
                    ${index >= 2 ? `<button class="sil-btn" onclick="oyunSil(${index - 2})">Sil</button>` : ""}
                </div>
            `;
        }
    });
}

function oyunSil(index) {
    let oyunlar = JSON.parse(localStorage.getItem("oyunListem"));
    oyunlar.splice(index, 1);
    localStorage.setItem("oyunListem", JSON.stringify(oyunlar));
    listele();
}

function oyunKaydet() {
    let yeniOyun = {
        ad: document.getElementById("yeni-ad").value,
        link: document.getElementById("yeni-link").value,
        resim: document.getElementById("yeni-resim").value,
        hikaye: document.getElementById("yeni-hikaye").value
    };
    let oyunlar = JSON.parse(localStorage.getItem("oyunListem")) || [];
    oyunlar.push(yeniOyun);
    localStorage.setItem("oyunListem", JSON.stringify(oyunlar));
    panelKapat();
    listele();
}

function incele(index) {
    let kullaniciOyunlari = JSON.parse(localStorage.getItem("oyunListem")) || [];
    let tumOyunlar = sabitOyunlar.concat(kullaniciOyunlari);
    const oyun = tumOyunlar[index];
    document.getElementById("modal-baslik").innerText = oyun.ad;
    document.getElementById("modal-hikaye").innerText = oyun.hikaye;
    document.getElementById("modal-link").href = oyun.link;
    document.getElementById("detay-modal").style.display = "block";
}

function temaDegistir() { document.getElementById("govde").classList.toggle("light-mode"); }
function panelAc() { document.getElementById("ekle-panel").style.display = "block"; }
function panelKapat() { document.getElementById("ekle-panel").style.display = "none"; }
function modalKapat() { document.getElementById("detay-modal").style.display = "none"; }

listele();