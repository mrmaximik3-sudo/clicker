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
    skinEnabled: true,
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
    gameState.currentSkin = skinId;
    
    // Меняем классы на body для фона
    const body = document.body;
    
    // Удаляем все классы фонов
    body.classList.remove('default-bg', 'skin-tiger-bg', 'skin-night-bg', 'skin-rainbow-bg');
    
    // Добавляем класс фона в зависимости от скина
    if (skinId === 1) {
        body.classList.add('skin-tiger-bg');
        console.log('Применён фон тигра');
    } else if (skinId === 2) {
        body.classList.add('skin-night-bg');
        console.log('Применён фон ночи');
    } else if (skinId === 3) {
        body.classList.add('skin-rainbow-bg');
        console.log('Применён фон радуги');
    } else {
        body.classList.add('default-bg');
        console.log('Обычный фон');
    }
    
    // Если скины включены, применяем и к контейнеру
    if (gameState.skinEnabled) {
        updateSkinDisplay();
    }
    saveGame();
}

// ===== ПОКУПКА УЛУЧШЕНИЯ =====
function buyUpgrade(id) {
    const upgrade = upgradesData[id];
    if (!upgrade) return;
    
    if (gameState.bablo >= upgrade.price) {
        gameState.bablo -= upgrade.price;
        gameState.clickPower += upgrade.power;
        gameState.upgrades[id] = (gameState.upgrades[id] || 0) + 1;

        // ===== НОВАЯ СТРОКА: повышаем цену на 50% =====
        upgradesData[id].price = Math.floor(upgrade.price * 1.5);

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
        // Просто надеваем (меняем текущий скин)
        gameState.currentSkin = id;
        if (gameState.skinEnabled) {
            updateSkinDisplay();
        }
    } else if (gameState.crystals >= skin.price) {
        // Покупаем новый скин
        gameState.crystals -= skin.price;
        gameState.ownedSkins.push(id);
        gameState.currentSkin = id;
        if (gameState.skinEnabled) {
            updateSkinDisplay();
        }
    }
    updateUI();
    saveGame();
}

// ===== ОЧИСТКА =====
function resetGame() {
    if (confirm('ВСЁ будет удалено без возможности восстановления!')) {
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
            skinEnabled: true,
            upgrades: Array(15).fill(0),
            cases: 0,
            caseInventory: []
        };
        
        // Убираем фон с body
        document.body.classList.remove('skin-tiger-bg', 'skin-night-bg', 'skin-rainbow-bg');
        
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
    // Проверяем, хватает ли денег
    const canBuy = gameState.bablo >= up.price;
    
    shopHtml += `
        <div class="item-card ${canBuy ? '' : 'disabled'}" onclick="buyUpgrade(${index})">
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

        // 👆 ЗДЕСЬ ЗАКАНЧИВАЕТСЯ ОТРИСОВКА СКИНОВ 👆
    
    // ===== НОВЫЙ КОД: ОБНОВЛЕНИЕ ТЕКСТА КНОПКИ СКИНА =====
    // Находим кнопку переключения скинов
    const toggleBtn = document.getElementById('toggleSkinBtn');
    
    // Если кнопка найдена на странице
    if (toggleBtn) {
        // Проверяем: если скины отключены ИЛИ выбран обычный скин
        if (!gameState.skinEnabled || gameState.currentSkin === 'default') {
            toggleBtn.textContent = 'ВКЛЮЧИТЬ СКИН';  // Текст для выключенного состояния
        } else {
            toggleBtn.textContent = 'ОТКЛЮЧИТЬ СКИН';  // Текст для включенного состояния
        }
    }
    // ===== КОНЕЦ НОВОГО КОДА =====
    
    // ДРУГОЙ КОД, ЕСЛИ ЕСТЬ...
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
            // Проверяем, есть ли переменная skinEnabled (для старых сохранений)
            if (gameState.skinEnabled === undefined) {
                gameState.skinEnabled = true;
            }
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

// ===== ПЕРЕКЛЮЧЕНИЕ СКИНА (ВКЛ/ВЫКЛ) =====
function toggleSkin() {
    gameState.skinEnabled = !gameState.skinEnabled;
    updateSkinDisplay();
    saveGame();
}

// ===== ОБНОВЛЕНИЕ ОТОБРАЖЕНИЯ СКИНА =====
function updateSkinDisplay() {
    const container = document.getElementById('gameContainer');
    const toggleBtn = document.getElementById('toggleSkinBtn');
    const body = document.body;
    
    // Удаляем все классы фонов
    body.classList.remove('default-bg', 'skin-tiger-bg', 'skin-night-bg', 'skin-rainbow-bg');
    
    if (!gameState.skinEnabled || gameState.currentSkin === 'default') {
        // Если скины выключены - обычный фон
        container.className = 'game-container';
        body.classList.add('default-bg');
        if (toggleBtn) toggleBtn.textContent = 'ВКЛЮЧИТЬ СКИН';
    } else {
        // Применяем текущий скин
        const skin = skinsData.find(s => s.id === gameState.currentSkin);
        if (skin) {
            container.className = 'game-container ' + skin.class;
            
            // Добавляем фон на body
            if (gameState.currentSkin === 1) {
                body.classList.add('skin-tiger-bg');
            } else if (gameState.currentSkin === 2) {
                body.classList.add('skin-night-bg');
            } else if (gameState.currentSkin === 3) {
                body.classList.add('skin-rainbow-bg');
            }
        }
        if (toggleBtn) toggleBtn.textContent = 'ОТКЛЮЧИТЬ СКИН';
    }
}
// Кнопка переключения скина
const toggleBtn = document.getElementById('toggleSkinBtn');
if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleSkin);
}

// ===== РУЛЕТКА =====
let rouletteAngle = 0;
let currentBet = 100;
let selectedColor = 'red';
let spinAnimation = null;

// Сектора рулетки (европейская)
const rouletteNumbers = [
    { number: 0, color: 'green' },
    { number: 32, color: 'red' }, { number: 15, color: 'black' }, { number: 19, color: 'red' },
    { number: 4, color: 'black' }, { number: 21, color: 'red' }, { number: 2, color: 'black' },
    { number: 25, color: 'red' }, { number: 17, color: 'black' }, { number: 34, color: 'red' },
    { number: 6, color: 'black' }, { number: 27, color: 'red' }, { number: 13, color: 'black' },
    { number: 36, color: 'red' }, { number: 11, color: 'black' }, { number: 30, color: 'red' },
    { number: 8, color: 'black' }, { number: 23, color: 'red' }, { number: 10, color: 'black' },
    { number: 5, color: 'red' }, { number: 24, color: 'black' }, { number: 16, color: 'red' },
    { number: 33, color: 'black' }, { number: 1, color: 'red' }, { number: 20, color: 'black' },
    { number: 14, color: 'red' }, { number: 31, color: 'black' }, { number: 9, color: 'red' },
    { number: 22, color: 'black' }, { number: 18, color: 'red' }, { number: 29, color: 'black' },
    { number: 7, color: 'red' }, { number: 28, color: 'black' }, { number: 12, color: 'red' },
    { number: 35, color: 'black' }, { number: 3, color: 'red' }, { number: 26, color: 'black' }
];

// Отрисовка колеса
function drawRouletteWheel(angle) {
    const canvas = document.getElementById('rouletteWheel');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = 300;
    const height = 300;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 140;
    
    ctx.clearRect(0, 0, width, height);
    
    const sectorCount = rouletteNumbers.length;
    const sectorAngle = (Math.PI * 2) / sectorCount;
    
    for (let i = 0; i < sectorCount; i++) {
        const startAngle = i * sectorAngle + angle;
        const endAngle = (i + 1) * sectorAngle + angle;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        
        // Цвет сектора
        if (rouletteNumbers[i].color === 'red') {
            ctx.fillStyle = '#d32f2f';
        } else if (rouletteNumbers[i].color === 'black') {
            ctx.fillStyle = '#212121';
        } else {
            ctx.fillStyle = '#2e7d32';
        }
        
        ctx.fill();
        ctx.strokeStyle = '#ffd966';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Номер сектора
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(startAngle + sectorAngle / 2);
        ctx.textAlign = 'center';
        ctx.fillStyle = 'white';
        ctx.font = 'bold 12px Arial';
        ctx.shadowColor = '#000';
        ctx.shadowBlur = 4;
        ctx.fillText(rouletteNumbers[i].number, radius * 0.7, 0);
        ctx.restore();
    }
    
    // Центральный круг
    ctx.beginPath();
    ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
    ctx.fillStyle = '#1a1e24';
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.strokeStyle = '#ffd966';
    ctx.lineWidth = 3;
    ctx.stroke();
}

// Инициализация рулетки
function initRoulette() {
    drawRouletteWheel(rouletteAngle);
    
    // Поле ввода ставки
const betInput = document.getElementById('betInput');
if (betInput) {
    betInput.addEventListener('input', () => {
        let value = parseInt(betInput.value);
        if (isNaN(value) || value < 1) value = 1;
        currentBet = value;
        
        // Убираем активный класс с быстрых кнопок
        document.querySelectorAll('.bet-quick').forEach(b => b.classList.remove('active'));
    });
}

// Кнопка МАКС
document.getElementById('betMaxBtn').addEventListener('click', () => {
    const maxBet = gameState.bablo;
    betInput.value = maxBet;
    currentBet = maxBet;
    document.querySelectorAll('.bet-quick').forEach(b => b.classList.remove('active'));
});

// Быстрые кнопки
document.querySelectorAll('.bet-quick').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.bet-quick').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        let value = parseInt(btn.dataset.bet);
        // Преобразуем K в тысячи
        if (btn.textContent.includes('K')) {
            value = parseInt(btn.dataset.bet) * 1000;
        }
        
        betInput.value = value;
        currentBet = value;
    });
});
    
    // Кнопки цветов
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedColor = btn.dataset.color;
        });
    });
    
    // Кнопка кручения
    const spinBtn = document.getElementById('spinRouletteBtn');
    if (spinBtn) {
        spinBtn.addEventListener('click', spinRoulette);
    }
}

// Кручение рулетки
function spinRoulette() {
    const spinBtn = document.getElementById('spinRouletteBtn');
    if (spinBtn.disabled) return;
    
    // Проверка баланса
    if (gameState.bablo < currentBet) {
        document.getElementById('rouletteResult').textContent = 'Недостаточно бабла!';
        return;
    }
    
    // Списываем ставку
    gameState.bablo -= currentBet;
    spinBtn.disabled = true;
    
    // Параметры анимации
    const spins = 8 + Math.random() * 5;
    const targetAngle = rouletteAngle + spins * Math.PI * 2 + Math.random() * Math.PI * 2;
    const startAngle = rouletteAngle;
    const startTime = Date.now();
    const duration = 3000;
    
    function animate() {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Замедление в конце
        const easeOut = 1 - Math.pow(1 - progress, 3);
        rouletteAngle = startAngle + (targetAngle - startAngle) * easeOut;
        
        drawRouletteWheel(rouletteAngle);
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            spinBtn.disabled = false;
            
            // Определяем результат
            const normalized = (rouletteAngle % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
            const sectorSize = (Math.PI * 2) / rouletteNumbers.length;
            const sectorIndex = Math.floor(normalized / sectorSize);
            const result = rouletteNumbers[sectorIndex];
            
            let winAmount = 0;
            if (result.color === selectedColor) {
                if (selectedColor === 'green') {
                    winAmount = currentBet * 35;
                } else {
                    winAmount = currentBet * 2;
                }
                gameState.bablo += winAmount;
                document.getElementById('rouletteResult').textContent = `ДЖЕКПОТ: ${formatNumber(winAmount)}! Выпало ${result.number}`;
            } else {
                document.getElementById('rouletteResult').textContent = `Проигрыш... Выпало ${result.number}`;
            }
            
            // Добавляем в историю
            addToHistory(result.color);
            
            // Обновляем UI
            updateUI();
            saveGame();
        }
    }
    
    requestAnimationFrame(animate);
}

// Добавление в историю
function addToHistory(color) {
    const history = document.getElementById('rouletteHistory');
    const item = document.createElement('div');
    item.className = `history-item ${color}`;
    
    if (color === 'red') item.textContent = '🔴';
    else if (color === 'black') item.textContent = '⚫';
    else item.textContent = '🟢';
    
    history.prepend(item);
    
    if (history.children.length > 10) {
        history.removeChild(history.lastChild);
    }
}

// Запускаем рулетку
initRoulette();
