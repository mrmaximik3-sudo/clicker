// ===== ИГРОВОЕ СОСТОЯНИЕ =====
let gameState = {
    bablo: 0,
    crystals: 0,
    level: 1,
    exp: 0,
    expToNext: 200,
    clickPower: 1,
    totalClicks: 0,
    currentSkin: 'default',
    ownedSkins: ['default'],
    upgrades: Array(15).fill(0),
    cases: 0,
    caseInventory: []
};

// ===== ИЗОБРАЖЕНИЯ КНОПКИ =====
const clickImages = [
    { max: 1000, url: 'img/1.png' },
    { max: 10000, url: 'img/2.png' },
    { max: 100000, url: 'img/3.png' },
    { max: 1000000, url: 'img/4.png' },
    { max: 10000000, url: 'img/5.png' },
    { max: 1000000000, url: 'img/6.png' },
    { max: Infinity, url: 'img/6.png' }
];

// ===== МАГАЗ =====
const upgradesData = [
    { id: 0, name: 'Начальный капитал', price: 3500, power: 2, icon: 'img/Усил.png' },
    { id: 1, name: 'Малая инвестиция', price: 6800, power: 8, icon: 'img/Усил.png' },
    { id: 2, name: 'Средний бизнес', price: 10500, power: 25, icon: 'img/Усил.png' },
    { id: 3, name: 'Крупное предприятие', price: 25000, power: 80, icon: 'img/Усил.png' },
    { id: 4, name: 'Холдинг', price: 50000, power: 250, icon: 'img/Усил.png' },
    { id: 5, name: 'Корпорация', price: 80000, power: 800, icon: 'img/Усил.png' },
    { id: 6, name: 'Монополия', price: 250000, power: 2500, icon: 'img/Усил.png' },
    { id: 7, name: 'Империя', price: 800000, power: 8000, icon: 'img/Усил.png' },
    { id: 8, name: 'Финансовый магнат', price: 2500000, power: 25000, icon: 'img/Усил.png' },
    { id: 9, name: 'Миллиардер', price: 8000000, power: 80000, icon: 'img/Усил.png' },
    { id: 10, name: 'Олигарх', price: 25000000, power: 250000, icon: 'img/Усил.png' },
    { id: 11, name: 'Казначей', price: 80000000, power: 800000, icon: 'img/Усил.png' },
    { id: 12, name: 'Хранитель золота', price: 250000000, power: 2500000, icon: 'img/Усил.png' },
    { id: 13, name: 'Властелин монет', price: 800000000, power: 8000000, icon: 'img/Усил.png' },
    { id: 14, name: 'Бабло-бог', price: 2500000000, power: 25000000, icon: 'img/Усил.png' },
    { id: 15, name: 'Хранитель денег', price: 25000000000, power: 250000000, icon: 'img/Усил.png' }
];

// ===== КЕЙСЫ =====
const casesData = [
    { 
        id: 0, 
        name: 'Простой кейс', 
        price: 10000, 
        icon: 'https://deti00ykh.ru/storage/cache/img/cases/default.png',
        rewards: [10, 20, 30, 50, 100, 200]
    },
    { 
        id: 1, 
        name: 'Серебряный кейс', 
        price: 250000, 
        icon: 'img/СеребКейс.png',
        rewards: [50, 100, 200, 500, 1000, 2000, 'skin1', 'skin2']
    },
    { 
        id: 2, 
        name: 'Золотой кейс', 
        price: 1000000000, 
        icon: 'img/ЗолотКейс.png',
        rewards: [200, 500, 1000, 2000, 5000, 10000, 'skin1', 'skin2', 'skin3']
    }
];

// ===== СКИНЫ =====
const skinsData = [
    { 
        id: 1, 
        name: 'Тигр', 
        price: 500000,
        icon: 'img/Тигр.png',
        class: 'skin-tiger',
        description: 'Оранжевые тигровые полосы'
    },
    { 
        id: 2, 
        name: 'Яркая ночь', 
        price: 750000,
        icon: 'img/ЯркНочь.png',
        class: 'skin-night',
        description: 'Звёзды и сияние'
    },
    { 
        id: 3, 
        name: 'Все радужное', 
        price: 1000000,
        icon: 'img/Радуга.png',
        class: 'skin-rainbow',
        description: 'Переливающиеся цвета'
    }
];

// ===== ФОРМАТИРОВАНИЕ =====
function formatNumber(num) {
    if (num < 1000) return num.toString();
    if (num < 1000000) return (num/1000).toFixed(1) + 'K';
    if (num < 1000000000) return (num/1000000).toFixed(1) + 'M';
    if (num < 1000000000000) return (num/1000000000).toFixed(1) + 'B';
    return (num/1000000000000).toFixed(1) + 'T';
}

// ===== УВЕДОМЛЕНИЕ =====
function showNotification(text) {
    const notif = document.getElementById('caseNotification');
    notif.textContent = text;
    notif.classList.add('show');
    setTimeout(() => notif.classList.remove('show'), 2000);
}

// ===== ПРИМЕНЕНИЕ СКИНА =====
function applySkin(skinId) {
    const container = document.getElementById('gameContainer');
    container.className = 'game-container';
    
    if (skinId !== 'default') {
        const skin = skinsData.find(s => s.id === skinId);
        if (skin) {
            container.classList.add(skin.class);
        }
    }
}

// ===== ПОКУПКА УЛУЧШЕНИЯ =====
function buyUpgrade(id) {
    const upgrade = upgradesData[id];
    if (!upgrade) return;
    
    if (gameState.bablo >= upgrade.price) {
        gameState.bablo -= upgrade.price;
        gameState.clickPower += upgrade.power;
        gameState.upgrades[id] = (gameState.upgrades[id] || 0) + 1;
        gameState.exp += upgrade.power;
        
        while (gameState.exp >= gameState.expToNext) {
            gameState.level++;
            gameState.exp -= gameState.expToNext;
            gameState.expToNext = Math.floor(gameState.expToNext * 1.8);
            gameState.crystals += 5;
        }
        
        updateUI();
        saveGame();
    }
}

// ===== ПОКУПКА КЕЙСА =====
function buyCase(id) {
    const caseItem = casesData[id];
    if (!caseItem) return;
    
    if (gameState.bablo >= caseItem.price) {
        gameState.bablo -= caseItem.price;
        gameState.cases++;
        gameState.caseInventory.push({
            id: id,
            name: caseItem.name
        });
        showNotification(`+1 ${caseItem.name}`);
        updateUI();
        saveGame();
    }
}

// ===== ОТКРЫТИЕ КЕЙСА =====
function openCaseFromInventory(index) {
    if (gameState.caseInventory.length === 0) return;
    
    const caseItem = gameState.caseInventory[index];
    const caseData = casesData[caseItem.id];
    
    const wheel = document.getElementById('wheel');
    const wheelContainer = document.getElementById('wheelContainer');
    wheelContainer.style.display = 'block';
    
    const spins = 5 + Math.floor(Math.random() * 5);
    const randomDegree = spins * 360 + Math.floor(Math.random() * 360);
    wheel.style.transform = `rotate(${randomDegree}deg)`;
    
    setTimeout(() => {
        const segmentAngle = 45;
        const normalized = randomDegree % 360;
        const segmentIndex = Math.floor(normalized / segmentAngle);
        
        let reward;
        if (segmentIndex < caseData.rewards.length) {
            reward = caseData.rewards[segmentIndex];
        } else {
            reward = caseData.rewards[0];
        }
        
        let resultText = '';
        
        if (typeof reward === 'number') {
            gameState.clickPower += reward;
            resultText = `+${reward} к силе клика`;
        } else if (reward === 'skin1' && !gameState.ownedSkins.includes(1)) {
            gameState.ownedSkins.push(1);
            resultText = 'Выпал скин: Тигр!';
        } else if (reward === 'skin2' && !gameState.ownedSkins.includes(2)) {
            gameState.ownedSkins.push(2);
            resultText = 'Выпал скин: Яркая ночь!';
        } else if (reward === 'skin3' && !gameState.ownedSkins.includes(3)) {
            gameState.ownedSkins.push(3);
            resultText = 'Выпал скин: Все радужное!';
        } else {
            gameState.crystals += 50;
            resultText = '+50 кристаллов';
        }
        
        document.getElementById('caseResult').textContent = `${resultText}`;
        
        gameState.caseInventory.splice(index, 1);
        gameState.cases--;
        gameState.exp += 10;
        
        setTimeout(() => {
            wheelContainer.style.display = 'none';
            updateUI();
            saveGame();
        }, 500);
    }, 3000);
}

// ===== ПОКУПКА СКИНА =====
function buySkin(id) {
    const skin = skinsData.find(s => s.id === id);
    if (!skin) return;
    
    if (gameState.ownedSkins.includes(id)) {
        gameState.currentSkin = id;
        applySkin(id);
    } else if (gameState.crystals >= skin.price) {
        gameState.crystals -= skin.price;
        gameState.ownedSkins.push(id);
        gameState.currentSkin = id;
        applySkin(id);
    }
    updateUI();
    saveGame();
}

// ===== ОЧИСТКА =====
function resetGame() {
    if (confirm('ВСЁ будет удалено без возможности восстановления!!!')) {
        gameState = {
            bablo: 0,
            crystals: 0,
            level: 1,
            exp: 0,
            expToNext: 200,
            clickPower: 1,
            totalClicks: 0,
            currentSkin: 'default',
            ownedSkins: ['default'],
            upgrades: Array(15).fill(0),
            cases: 0,
            caseInventory: []
        };
        applySkin('default');
        updateUI();
        saveGame();
        document.getElementById('caseResult').textContent = '';
    }
}

// ===== ОБНОВЛЕНИЕ ИНТЕРФЕЙСА =====
function updateUI() {
    document.getElementById('babloAmount').textContent = formatNumber(gameState.bablo);
    document.getElementById('crystalsAmount').textContent = formatNumber(gameState.crystals);
    document.getElementById('levelDisplay').textContent = gameState.level;
    document.getElementById('clickPowerDisplay').textContent = `+${gameState.clickPower}`;
    
    const progress = (gameState.exp / gameState.expToNext) * 100;
    document.getElementById('levelProgress').style.width = progress + '%';
    document.getElementById('levelProgressText').textContent = `${gameState.exp}/${gameState.expToNext}`;
    
    // Картинка кликера
    const img = document.getElementById('clickerImage');
    for (let i = 0; i < clickImages.length; i++) {
        if (gameState.bablo < clickImages[i].max) {
            img.src = clickImages[i].url;
            break;
        }
    }
    
    // Магазин
    let shopHtml = '';
    upgradesData.forEach((up, index) => {
        shopHtml += `
            <div class="item-card" onclick="buyUpgrade(${index})">
                <img src="${up.icon}" class="item-icon">
                <div class="item-name">${up.name}</div>
                <div class="item-price">
                    <img src="img/Бабло.png" style="width:16px;height:16px;">
                    ${formatNumber(up.price)}
                </div>
                <div style="font-size:0.7rem; color:#9aaec3;">ур.${gameState.upgrades[index] || 0}</div>
            </div>
        `;
    });
    document.getElementById('shopContainer').innerHTML = shopHtml;
    
    // Кейсы в магазине
    let casesHtml = '';
    casesData.forEach((c, index) => {
        casesHtml += `
            <div class="item-card" onclick="buyCase(${index})">
                <img src="${c.icon}" class="item-icon">
                <div class="item-name">${c.name}</div>
                <div class="item-price">
                    <img src="img/Бабло.png" style="width:16px;height:16px;">
                    ${formatNumber(c.price)}
                </div>
            </div>
        `;
    });
    document.getElementById('casesContainer').innerHTML = casesHtml;
    
    // Счётчик кейсов
    document.getElementById('caseInventoryCount').textContent = gameState.cases;
    
    // Инвентарь кейсов
    let inventoryHtml = '';
    if (gameState.caseInventory.length === 0) {
        inventoryHtml = '<div class="empty-inventory">Нет кейсов в инвентаре</div>';
    } else {
        gameState.caseInventory.forEach((caseItem, index) => {
            const caseData = casesData[caseItem.id];
            inventoryHtml += `
                <div class="inventory-case-item" onclick="openCaseFromInventory(${index})">
                    <img src="${caseData.icon}" class="inventory-case-icon">
                    <div class="inventory-case-info">
                        <div class="inventory-case-name">${caseData.name}</div>
                        <div class="inventory-case-type">Нажмите чтобы открыть</div>
                    </div>
                    <div class="inventory-case-open">ОТКРЫТЬ</div>
                </div>
            `;
        });
    }
    document.getElementById('inventoryCasesList').innerHTML = inventoryHtml;
    
    // Скины
    let skinsHtml = '';
    skinsData.forEach(skin => {
        const owned = gameState.ownedSkins.includes(skin.id);
        skinsHtml += `
            <div class="item-card" onclick="buySkin(${skin.id})">
                <img src="${skin.icon}" class="item-icon">
                <div class="item-name">${skin.name}</div>
                <div class="item-price">
                    <img src="img/Алмазы.png" style="width:16px;height:16px;">
                    ${owned ? 'Куплен' : formatNumber(skin.price)}
                </div>
                <div style="font-size:0.7rem; color:#9aaec3;">${skin.description}</div>
            </div>
        `;
    });
    document.getElementById('skinsContainer').innerHTML = skinsHtml;
}

// ===== СОХРАНЕНИЕ =====
function saveGame() {
    localStorage.setItem('babloLiquidSkins', JSON.stringify(gameState));
}

function loadGame() {
    const saved = localStorage.getItem('babloLiquidSkins');
    if (saved) {
        try {
            const loaded = JSON.parse(saved);
            gameState = {...gameState, ...loaded};
        } catch (e) {}
    }
}

// ===== ИНИЦИАЛИЗАЦИЯ =====
document.addEventListener('DOMContentLoaded', () => {
    loadGame();
    updateUI();
    applySkin(gameState.currentSkin);
    
    document.getElementById('clickBtn').addEventListener('click', () => {
        gameState.bablo += gameState.clickPower;
        gameState.totalClicks++;
        gameState.exp += 1;
        
        if (Math.random() < 0.002) {
            gameState.cases++;
            gameState.caseInventory.push({
                id: 0,
                name: 'Обычный кейс'
            });
            showNotification('Вам выпал кейс!');
        }
        
        while (gameState.exp >= gameState.expToNext) {
            gameState.level++;
            gameState.exp -= gameState.expToNext;
            gameState.expToNext = Math.floor(gameState.expToNext * 1.8);
            gameState.crystals += 5;
        }
        
        updateUI();
        saveGame();
    });
    
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
            
            item.classList.add('active');
            const tab = item.dataset.tab;
            document.getElementById(tab + 'Tab').classList.add('active');
        });
    });
    
    document.getElementById('resetBtn').addEventListener('click', resetGame);
    
    setInterval(saveGame, 10000);
    
    window.buyUpgrade = buyUpgrade;
    window.buyCase = buyCase;
    window.openCaseFromInventory = openCaseFromInventory;
    window.buySkin = buySkin;

});
