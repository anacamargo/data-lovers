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
      tags: champion.tags,
      attack: champion.info.attack,
      defense: champion.info.defense,
      magic: champion.info.magic,
      stats: [
        { css: 'icon-hp', name: 'HP', value: champion.stats.hp, perLevel: champion.stats.hpperlevel + '/lvl' },
        { css: 'icon-regen', name: 'HP Regeneration', value: champion.stats.hpregen, perLevel: champion.stats.hpregenperlevel + '/lvl' },
        { css: 'icon-dmg', name: 'Attack Damage', value: champion.stats.attackdamage, perLevel: champion.stats.attackdamageperlevel + '/lvl' },
        { css: 'icon-atk-spd', name: 'Attack Speed', value: champion.stats.attackspeedoffset, perLevel: champion.stats.attackspeedperlevel + '/lvl' },
        { css: 'icon-spd', name: 'Speed', value: champion.stats.movespeed, perLevel: champion.stats.mpperlevel + '/lvl' },
        { css: 'icon-armor', name: 'Armor', value: champion.stats.armor, perLevel: champion.stats.armorperlevel + '/lvl' },
        { css: 'icon-spell-res', name: 'Spell Resistance', value: champion.stats.spellblock, perLevel: champion.stats.spellblockperlevel + '/lvl' },
        { css: 'icon-mp', name: 'MP', value: champion.stats.mp, perLevel: champion.stats.mpperlevel + '/lvl' },
        { css: 'icon-mp-regen', name: 'MP Regeneration', value: champion.stats.mpregen, perLevel: champion.stats.mpregenperlevel + '/lvl' }
      ]
    };
  });

  document.querySelector('#sort').addEventListener('change', buttonClicked);
  document.querySelector('#operator').addEventListener('change', buttonClicked);

  let buttons = document.querySelectorAll('button');

  for (const button of buttons) {
    button.addEventListener('click', function(event) {
      event.target.classList.toggle('active');
      buttonClicked();
    });
  }

  function buttonClicked() {
    const select = document.querySelector('#operator');
    const selectedValue = select.options[select.selectedIndex].value;
    let filtered = data;
    const buttons = document.querySelectorAll('button.active');

    if (buttons.length > 0) {
      let types = [...buttons].map(button => button.dataset['filter']);
      let filterTags = function(desired, tags) {
        tags = tags.map(x => x.toLowerCase());
        desired = desired.map(x => x.toLowerCase());

        if (tags.length === 1) {
          return desired.indexOf(tags[0]) > -1;
        } else {
          if (selectedValue === 'AND') {
            return (desired.includes(tags[0]) && desired.includes(tags[1]));
          } else return (desired.includes(tags[0]) || desired.includes(tags[1]));
        }
      };
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

  function calculateMinStatistics(data) {
    const decideAccOrCurrentForStatus = (min, current, statusIndex) =>
      (min.value === null || min.value > current.stats[statusIndex].value) ?
        { name: current.name, value: current.stats[statusIndex].value } : min;

    let minHP = data.reduce((min, x) => decideAccOrCurrentForStatus(min, x, 0), { name: null, value: null });
    let minRegen = data.reduce((min, x) => decideAccOrCurrentForStatus(min, x, 1), { name: null, value: null });
    let minDmg = data.reduce((min, x) => decideAccOrCurrentForStatus(min, x, 2), { name: null, value: null });
    let minAtSp = data.reduce((min, x) => decideAccOrCurrentForStatus(min, x, 3), { name: null, value: null });
    let minSpeed = data.reduce((min, x) => decideAccOrCurrentForStatus(min, x, 4), { name: null, value: null });
    let minArmor = data.reduce((min, x) => decideAccOrCurrentForStatus(min, x, 5), { name: null, value: null });
    let minSpellRes = data.reduce((min, x) => decideAccOrCurrentForStatus(min, x, 6), { name: null, value: null });
    let minMP = data.reduce((min, x) => decideAccOrCurrentForStatus(min, x, 7), { name: null, value: null });
    let minMPRegen = data.reduce((min, x) => decideAccOrCurrentForStatus(min, x, 8), { name: null, value: null });

    const minChamp = {
      id: 'minimum',
      name: '',
      tags: [],
      attack: 0,
      defense: 0,
      magic: 0,
      stats: [
        { css: 'icon-hp', name: 'HP', value: minHP.value, perLevel: minHP.name },
        { css: 'icon-regen', name: 'HP Regeneration', value: minRegen.value, perLevel: minRegen.name },
        { css: 'icon-dmg', name: 'Attack Damage', value: minDmg.value, perLevel: minDmg.name },
        { css: 'icon-atk-spd', name: 'Attack Speed', value: minAtSp.value, perLevel: minAtSp.name },
        { css: 'icon-spd', name: 'Speed', value: minSpeed.value, perLevel: minSpeed.name },
        { css: 'icon-armor', name: 'Armor', value: minArmor.value, perLevel: minArmor.name },
        { css: 'icon-spell-res', name: 'Spell Resistance', value: minSpellRes.value, perLevel: minSpellRes.name },
        { css: 'icon-mp', name: 'MP', value: minMP.value, perLevel: minMP.name },
        { css: 'icon-mp-regen', name: 'MP Regeneration', value: minMPRegen.value, perLevel: minMPRegen.name }
      ]
    };

    return minChamp;
  }

  function calculateMaxStatistics(data) {
    const decideAccOrCurrentForStatus = (max, current, statusIndex) =>
      (max.value === null || max.value < current.stats[statusIndex].value) ?
        { name: current.name, value: current.stats[statusIndex].value } : max;

    let maxHP = data.reduce((max, x) => decideAccOrCurrentForStatus(max, x, 0), { name: null, value: null });
    let maxRegen = data.reduce((max, x) => decideAccOrCurrentForStatus(max, x, 1), { name: null, value: null });
    let maxDmg = data.reduce((max, x) => decideAccOrCurrentForStatus(max, x, 2), { name: null, value: null });
    let maxAtSp = data.reduce((max, x) => decideAccOrCurrentForStatus(max, x, 3), { name: null, value: null });
    let maxSpeed = data.reduce((max, x) => decideAccOrCurrentForStatus(max, x, 4), { name: null, value: null });
    let maxArmor = data.reduce((max, x) => decideAccOrCurrentForStatus(max, x, 5), { name: null, value: null });
    let maxSpellRes = data.reduce((max, x) => decideAccOrCurrentForStatus(max, x, 6), { name: null, value: null });
    let maxMP = data.reduce((max, x) => decideAccOrCurrentForStatus(max, x, 7), { name: null, value: null });
    let maxMPRegen = data.reduce((max, x) =>decideAccOrCurrentForStatus(max, x, 8), { name: null, value: null });

    const maxChamp = {
      id: 'maximum',
      name: '',
      tags: [],
      attack: 0,
      defense: 0,
      magic: 0,
      stats: [
        { css: 'icon-hp', name: 'HP', value: maxHP.value, perLevel: maxHP.name },
        { css: 'icon-regen', name: 'HP Regeneration', value: maxRegen.value, perLevel: maxRegen.name },
        { css: 'icon-dmg', name: 'Attack Damage', value: maxDmg.value, perLevel: maxDmg.name },
        { css: 'icon-atk-spd', name: 'Attack Speed', value: maxAtSp.value, perLevel: maxAtSp.name },
        { css: 'icon-spd', name: 'Speed', value: maxSpeed.value, perLevel: maxSpeed.name },
        { css: 'icon-armor', name: 'Armor', value: maxArmor.value, perLevel: maxArmor.name },
        { css: 'icon-spell-res', name: 'Spell Resistance', value: maxSpellRes.value, perLevel: maxSpellRes.name },
        { css: 'icon-mp', name: 'MP', value: maxMP.value, perLevel: maxMP.name },
        { css: 'icon-mp-regen', name: 'MP Regeneration', value: maxMPRegen.value, perLevel: maxMPRegen.name }
      ]
    };
    return maxChamp;
  }

  function show(data) {
    const minChamp = calculateMinStatistics(data);
    const maxChamp = calculateMaxStatistics(data);
    const champs = data.concat([minChamp, maxChamp]);

    let list = document.querySelector('#champion-list');
    return list.innerHTML = `${champs.map((champion) =>
      `<li class="flip-container" onclick="this.classList.toggle('hover');">
          <div class="flipper">
            <div class="front container-image" style="background-image:url(src/image/${champion.id}.png)">
              <h2 class="name" data-chart="${champion.name}">${champion.name}</h2>
              <div class="classes">
                ${champion.tags.map(x => '<span>' + x + '<span/>').join(' | ')}
              </div>
            </div>
            <div class="back" style="background-image:url(src/image/bg-back.png)">
              ${champion.stats.map(stat => `
                <span title="${stat.name}" class="stats ${stat.css}">
                  <span>${stat.value} (${stat.perLevel})</span>
                </span>`).join('\n')}
            </div>  
          </div>
        </li>`).join('')}`;
  }
  show(data);
}

init();