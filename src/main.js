async function init() { // Criei essa função assíncrona para usar o await e acessar o json.
    const fileContent = await fetch('data/lol/lol.json');
    const json = (await fileContent.json()).data; // na const json eu já tenho os dados.

    const champions = Object.keys(json).reduce((list, champion) => { //retorna um array dos champions
        return list.concat(json[champion]);
    }, []);

    const data = champions.map((champion) => { //retorna um array de obj dos itens que defini. 
        return {
            id: champion.id,
            name: champion.name,
            title: champion.title,
            img: champion.img,
            splash: champion.splash,
            blurb: champion.blurb,
            tags: champion.tags
        }
    });

    document.querySelector('#sort').addEventListener('change', buttonClicked); 
    document.querySelector('#operator').addEventListener('change', buttonClicked);

    let buttons = document.querySelectorAll('button');

    for (const button of buttons) {
        button.addEventListener('click', function (event) {
            event.target.classList.toggle('active');
            buttonClicked();
        })
    }

    function buttonClicked() {
        const select = document.querySelector('#operator');
        const selectedValue = select.options[select.selectedIndex].value;
        const buttons = document.querySelectorAll('button.active');
        let filtered = data;
        if (buttons.length > 0) {
            let types = [...buttons].map(button => button.dataset['filter']);

            let filterTags = function (desired, tags) {
                tags = tags.map(x => x.toLowerCase());
                desired = desired.map(x => x.toLowerCase());
                if (tags.length == 1) {
                    return desired.indexOf(tags[0]) > -1;
                }
                else {
                    if (selectedValue == "AND") {
                        return (desired.indexOf(tags[0]) > -1 && desired.indexOf(tags[1]) > -1);
                    }
                    else return (desired.indexOf(tags[0]) > -1 || desired.indexOf(tags[1]) > -1);
                }
            }

            filtered = data.filter(champion => filterTags(types, champion.tags));
        }
        sort(filtered);
    }

    function sort(filtered) {
        const select = document.getElementById('sort');
        const selectedValue = select.options[select.selectedIndex].value;
        if (selectedValue === 'ZA') show(filtered.slice().reverse()); // slice matém o array original
        else show(filtered);
    }

    function show(data) {
        let list = document.querySelector('#champion-list'); // seleciona o ul
        return list.innerHTML = `${data.map((champion) => //incrementa o li para cada champion
            `<li class="item">
                <figure class="container-image">
                    <img class="image" src="image/${champion.id}.jpg" alt="${champion.name}"/>
                </figure>
                <h2 class="name">${champion.name}</h2>
                ${champion.tags.map(x => '<span class="tag">' + x + '<span/>').join("\n")}
            </li>`).join("")}`
    }

    show(data);


}
init();