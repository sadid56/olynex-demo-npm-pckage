const express = require('express');
const app = express();
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Route to fetch and save icons
app.get('/fetch-icons', async (req, res) => {
    try {
        const jsonData = fs.readFileSync('./public/api.json', 'utf-8');
        const icons = JSON.parse(jsonData);

        // Create the icons directory if it doesn't exist
        const iconsDir = path.join(__dirname, 'icons');
        if (!fs.existsSync(iconsDir)) {
            fs.mkdirSync(iconsDir);
        }

        for (const icon of icons) {
            const { name, icon: iconUrl } = icon;
            const imageResponse = await axios.get(iconUrl, { responseType: 'arraybuffer' });
            fs.writeFileSync(path.join(iconsDir, `${name}.png`), imageResponse.data);
        }

        res.send('Icons fetched and saved successfully.');
    } catch (error) {
        console.error('Error fetching icons:', error);
        res.status(500).send('Error fetching icons.');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
