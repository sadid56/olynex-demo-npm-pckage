const { default: axios } = require('axios');
const fs = require('fs');
const path = require('path');

async function fetchAndSaveIcons() {
    try {
        const jsonData = fs.readFileSync('./public/api.json', 'utf-8');
        const icons = JSON.parse(jsonData);
        console.log(icons);

        // Create the icons directory if it doesn't exist
        const iconsDir = path.join(__dirname, 'public');
        if (!fs.existsSync(iconsDir)) {
            fs.mkdirSync(iconsDir);
        }

        icons.forEach(async icon => {
            const { name, icon: iconUrl } = icon;
            const imageResponse = await axios.get(iconUrl, { responseType: 'arraybuffer' });
            fs.writeFileSync(path.join(iconsDir, `${name}.png`), imageResponse.data);
        });

        console.log('Icons fetched and saved successfully.');
    } catch (error) {
        console.error('Error fetching icons:', error);
    }
}

fetchAndSaveIcons();
