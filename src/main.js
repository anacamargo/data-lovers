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
            tags: champion.tags,
            attack: champion.info.attack,
            defense: champion.info.defense,
            magic: champion.info.magic
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
        switch (selectedValue) {
            case 'AZ':
                show(filtered);
                break;
            case 'ZA':
                show(filtered.slice().reverse());
                break;
            case 'Attack':
                show(filtered.slice().sort(
                    (a, b) => {
                        if (a.attack > b.attack) return 1;
                        else if (a.attack < b.attack) return -1;
                        else return 0;
                    }
                ).reverse());
                break;
            case 'Defense':
                show(filtered.slice().sort(
                    (a, b) => {
                        if (a.defense > b.defense) return 1;
                        else if (a.defense < b.defense) return -1;
                        else return 0;
                    }
                ).reverse());
                break;
            case 'Magic':
                show(filtered.slice().sort(
                    (a, b) => {
                        if (a.magic > b.magic) return 1;
                        else if (a.magic < b.magic) return -1;
                        else return 0;
                    }
                ).reverse());
                break;
        }


    }

    function show(data) {
        let list = document.querySelector('#champion-list');
        return list.innerHTML = `${data.map((champion) =>
            `<li class="item">
                <div class="container-image" style="background-image:url(image/${champion.id}.jpg)">
                    <h2 class="name">${champion.name}</h2>
                    <div class="classes">
                        ${champion.tags.map(x => '<span class="tag">' + x + '<span/>').join(" | ")}
                    </div>
                </div>
            </li>`).join("")}`
    }

    show(data);
}
init();