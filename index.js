// const fs = require('fs');
// const path = require('path');


// function getIcon(iconName) {
//   const iconPath = path.join(__dirname, 'icons', `${iconName}.svg`);
//   if (fs.existsSync(iconPath)) {
//     return fs.readFileSync(iconPath, 'utf8');
//   } else {
//     throw new Error(`Icon ${iconName} does not exist`);
//   }
// }

// module.exports = { getIcon };
const { default: axios } = require('axios');
const fs = require('fs');

async function fetchAndSaveIcons() {
    try {
        const jsonData = fs.readFileSync('./public/api.json', 'utf-8');
        const icons = JSON.parse(jsonData);
        console.log(icons);

        icons.forEach(async icon => {
            const { name, icon: iconUrl } = icon;
            const imageResponse = await axios.get(iconUrl, { responseType: 'arraybuffer' });
            fs.writeFileSync(`icons/${name}.png`, imageResponse.data);
        });

        console.log('Icons fetched and saved successfully.');
    } catch (error) {
        console.error('Error fetching icons:', error);
    }
}

fetchAndSaveIcons();

