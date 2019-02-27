async function init() { // Criei essa função assíncrona para usar o await e acessar o json.
    const fileContent = await fetch('data/lol/lol.json'); 
    const json = (await fileContent.json()).data; // na const json eu já tenho os dados.

    const champions = Object.keys(json).reduce((list, champion) => { //retorna um array dos champions
        return list.concat(json[champion]);
    }, []);

    const data = champions.map((champion) => { //retorna um array de obj dos itens que defini. 
        return {
            name: champion.name,
            title: champion.title,
            img: champion.img,
            splash: champion.splash,
            blurb: champion.blurb,
            tags: champion.tags
        }
    });

    let list = document.querySelector("#champion-list"); // seleciona o ul

    list.innerHTML = `${data.map((champion) => //incrementa o li para cada champion
        `<li data-item="item">
            <h2 data-name="name">${champion.name}</h2>
            <img data-img="img" src="${champion.img}" />
        </li>`).join("")}`
}
    init();