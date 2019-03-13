async function init() {
    const fileContent = await fetch('src/data/lol/lol.json');
    const json = (await fileContent.json()).data;

    const champions = Object.keys(json).reduce((list, champion) => {
        return list.concat(json[champion]);
    }, []);

    const data = champions.map((champion) => {
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
            magic: champion.info.magic,
            stats: [
                { css: 'icon-hp', name: 'HP', value: champion.stats.hp, perLevel: champion.stats.hpperlevel },
                { css: 'icon-regen', name: 'HP Regeneration', value: champion.stats.hpregen, perLevel: champion.stats.hpregenperlevel },
                { css: 'icon-dmg', name: 'Attack Damage', value: champion.stats.attackdamage, perLevel: champion.stats.attackdamageperlevel },
                { css: 'icon-atk-spd', name: 'Attack Speed', value: champion.stats.attackspeedoffset, perLevel: champion.stats.attackspeedperlevel },
                { css: 'icon-spd', name: 'Speed', value: champion.stats.movespeed, perLevel: champion.stats.mpperlevel },
                { css: 'icon-armor', name: 'Armor', value: champion.stats.armor, perLevel: champion.stats.armorperlevel },
                { css: 'icon-spell-res', name: 'Spell Resistance', value: champion.stats.spellblock, perLevel: champion.stats.spellblockperlevel },
                { css: 'icon-mp', name: 'MP', value: champion.stats.mp, perLevel: champion.stats.mpperlevel },
                { css: 'icon-mp-regen', name: 'MP Regeneration', value: champion.stats.mpregen, perLevel: champion.stats.mpregenperlevel }
            ]
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
            `<li class="flip-container" onclick="this.classList.toggle('hover');">
                <div class="flipper">
                    <div class="front container-image" style="background-image:url(src/image/${champion.id}.jpg)">
                        <h2 class="name" data-chart="${champion.name}">${champion.name}</h2>
                        <div class="classes">
                            ${champion.tags.map(x => '<span>' + x + '<span/>').join(" | ")}
                        </div>
                    </div>
                    <div class="back" style="background-image:url(src/image/bg-back.png)">
                        ${champion.stats.map(stat =>
                `<span title="${stat.name}" class="stats ${stat.css}">
                                <span>${stat.value} (${stat.perLevel}/lvl)</span>
                            </span>`).join('\n')}
                    </div>  
                </div>
            </li>`).join("")}`
    }
    
    show(data);
}

init();