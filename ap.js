const form = document.querySelector('#searchForm');
const res = document.querySelector('#tableResult');
let upd;

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (upd) clearTimeout(upd);

    const ctype = form.elements.coinType.value;
    fetchPrice(ctype);
});

const fetchPrice = async (ctype) => {
    try {
        const r = await axios.get(`https://api.coinstats.app/public/v1/coins/${ctype}?currency=USD`);
        const { price, volume, priceChange1d, name } = r.data.coin;
        const target = 'USD';

        res.innerHTML = `
            <tr>
                <td>${name}</td>
                <td>${price} ${target}</td>
            </tr>
            <tr>
                <td>Volume</td>
                <td>${volume}</td>
            </tr>
            <tr>
                <td>Change</td>
                <td>${priceChange1d}</td>
            </tr>
        `;

        upd = setTimeout(() => fetchPrice(ctype), 10000);
    } catch (err) {
        res.innerHTML = `<tr><td colspan="2" style="color:red">Error: Invalid coin or API issue</td></tr>`;
        console.error(err);
    }
};

