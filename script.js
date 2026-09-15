let dersler = JSON.parse(localStorage.getItem('dersler')) || [];
document.addEventListener('DOMContentLoaded', ekraniGuncelle);

document.getElementById('dersFormu').addEventListener('submit', function(e) {
    e.preventDefault();

    const dersAdi = document.getElementById('dersAdi').value;
    const vize = parseFloat(document.getElementById('vize').value);
    const final = parseFloat(document.getElementById('final').value);

    // AÖF hesaplama mantığı (%30 Vize, %70 Final)
    const ortalama = (vize * 0.3) + (final * 0.7);

    let harfNotu = 'FF';
    if (ortalama >= 84) harfNotu = 'AA';
    else if (ortalama >= 71) harfNotu = 'BA';
    else if (ortalama >= 63) harfNotu = 'BB';
    else if (ortalama >= 55) harfNotu = 'CB';
    else if (ortalama >= 50) harfNotu = 'CC';
    else if (ortalama >= 35) harfNotu = 'DD';

    dersler.push({ id: Date.now(), dersAdi, ortalama, harfNotu });
    localStorage.setItem('dersler', JSON.stringify(dersler));
    ekraniGuncelle();
    document.getElementById('dersFormu').reset();
});

function dersSil(id) {
    dersler = dersler.filter(d => d.id !== id);
    localStorage.setItem('dersler', JSON.stringify(dersler));
    ekraniGuncelle();
}

function ekraniGuncelle() {
    const tablo = document.getElementById('dersListesi');
    tablo.innerHTML = '';
    let toplam = 0, basarili = 0;

    dersler.forEach(d => {
        toplam += d.ortalama;
        if (d.harfNotu !== 'FF') basarili++;
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${d.dersAdi}</td>
            <td>${d.ortalama.toFixed(1)}</td>
            <td>${d.harfNotu}</td>
            <td><button class="btn-sil" onclick="dersSil(${d.id})">Sil</button></td>
        `;
        tablo.appendChild(tr);
    });

    document.getElementById('gnoGosterge').innerText = dersler.length ? (toplam / dersler.length).toFixed(2) : '0.00';
    document.getElementById('toplamDersGosterge').innerText = dersler.length;
    document.getElementById('basariliDersGosterge').innerText = basarili;
}

ekraniGuncelle();
