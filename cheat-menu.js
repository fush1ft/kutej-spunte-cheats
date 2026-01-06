(function () {
    // --- JARVIS TERMINAL INITIALIZATION ---
    console.log("%c[!] JARVIS: Initializing Hack Module for 'Kutej Špunta'...", "color: #00ff00; font-weight: bold;");

    // Prevent multiple injections
    if (document.getElementById('jarvis-cheat-menu')) {
        document.getElementById('jarvis-cheat-menu').remove();
    }

    // --- STYLES ---
    const style = document.createElement('style');
    style.innerHTML = `
        #jarvis-cheat-menu {
            position: fixed;
            top: 20px;
            right: 20px;
            width: 300px;
            background: rgba(10, 10, 10, 0.85);
            backdrop-filter: blur(10px);
            border: 1px solid #00f2ff;
            border-radius: 8px;
            color: #00f2ff;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            z-index: 999999;
            box-shadow: 0 0 20px rgba(0, 242, 255, 0.3);
            padding: 15px;
            user-select: none;
        }
        #jarvis-cheat-menu h2 {
            margin: 0 0 10px 0;
            font-size: 18px;
            border-bottom: 1px solid #00f2ff;
            padding-bottom: 5px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        #jarvis-cheat-menu .close-btn {
            cursor: pointer;
            font-size: 14px;
            color: #ff4444;
        }
        #jarvis-cheat-menu .section {
            margin-bottom: 15px;
        }
        #jarvis-cheat-menu .label {
            font-size: 12px;
            text-transform: uppercase;
            margin-bottom: 5px;
            color: #aaa;
        }
        #jarvis-cheat-menu button {
            background: transparent;
            border: 1px solid #00f2ff;
            color: #00f2ff;
            padding: 5px 10px;
            cursor: pointer;
            width: 100%;
            margin-bottom: 5px;
            transition: all 0.3s;
            font-size: 13px;
        }
        #jarvis-cheat-menu button:hover {
            background: rgba(0, 242, 255, 0.2);
            box-shadow: 0 0 10px rgba(0, 242, 255, 0.5);
        }
        #jarvis-cheat-menu input {
            background: rgba(255,255,255,0.1);
            border: 1px solid #333;
            color: white;
            padding: 5px;
            width: calc(100% - 12px);
            margin-bottom: 5px;
        }
        #jarvis-status {
            font-size: 11px;
            color: #00ff00;
            margin-top: 5px;
            font-family: monospace;
        }
    `;
    document.head.appendChild(style);

    // --- UI STRUCTURE ---
    const menu = document.createElement('div');
    menu.id = 'jarvis-cheat-menu';
    menu.innerHTML = `
        <h2>
            <span>[ JARVIS HACK ]</span>
            <span class="close-btn" id="jarvis-close">✖</span>
        </h2>
        
        <div class="section">
            <div class="label">Currency & Resources</div>
            <input type="number" id="jarvis-money-input" placeholder="Set Money (e.g. 1000000)">
            <button id="jarvis-set-money">Apply Money</button>
            <button id="jarvis-max-energy">Infinite Energy</button>
        </div>

        <div class="section">
            <div class="label">Inventory Items</div>
            <button id="jarvis-max-items">99x TNT, Sonar, Energy</button>
        </div>

        <div class="section">
            <div class="label">Game Mechanics</div>
            <button id="jarvis-max-upgrades">Max All Upgrades</button>
        </div>

        <div id="jarvis-status">> System Ready...</div>
    `;
    document.body.appendChild(menu);

    // --- LOGIC ---
    const getHero = () => {
        try {
            return window.Engine.gameStateToSave.hero;
        } catch (e) {
            return null;
        }
    };

    const updateDisplay = (val) => {
        try {
            if (window.Display && window.Display.money) {
                window.Display.money.money = val;
                if (window.Display.money.text) {
                    window.Display.money.text.text = val.toString();
                }
            }
        } catch (e) { }
    };

    const setStatus = (msg) => {
        document.getElementById('jarvis-status').innerText = "> " + msg;
        setTimeout(() => {
            document.getElementById('jarvis-status').innerText = "> System Ready...";
        }, 2000);
    };

    // Events
    document.getElementById('jarvis-close').onclick = () => menu.remove();

    document.getElementById('jarvis-set-money').onclick = () => {
        const hero = getHero();
        const amount = parseInt(document.getElementById('jarvis-money-input').value) || 1000000;
        if (hero) {
            hero.money = amount;
            updateDisplay(amount);
            setStatus("Money set to " + amount);
        } else {
            setStatus("ERR: Game not started?");
        }
    };

    document.getElementById('jarvis-max-energy').onclick = () => {
        const hero = getHero();
        if (hero) {
            // High value to simulate infinity
            hero.energyUnits = 999999;
            setStatus("Energy Maxed");
        } else {
            setStatus("ERR: Game not started?");
        }
    };

    document.getElementById('jarvis-max-items').onclick = () => {
        const hero = getHero();
        if (hero) {
            hero.inventory.tnt = 99;
            hero.inventory.sonar = 99;
            hero.inventory.energy = 99;
            setStatus("Items Added (99x)");
        } else {
            setStatus("ERR: Game not started?");
        }
    };

    document.getElementById('jarvis-max-upgrades').onclick = () => {
        const hero = getHero();
        if (hero) {
            hero.upgrades.backpack = 5;
            hero.upgrades.drill = 5;
            hero.upgrades.energystorage = 5;
            hero.upgrades.flashlight = 5;
            setStatus("Upgrades Maxed");
        } else {
            setStatus("ERR: Game not started?");
        }
    };

    // Auto-update energy loop
    setInterval(() => {
        const hero = getHero();
        if (hero && hero.energyUnits > 10000) {
            hero.energyUnits = 999999; // Keep it high if maxed
        }
    }, 1000);

})();
