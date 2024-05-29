const fs = require('fs');

function readIconsFromJson() {
    try {
        // Read JSON data from the public directory
        const jsonData = fs.readFileSync('./public/api.json', 'utf-8');
        const icons = JSON.parse(jsonData);
        return icons;
    } catch (error) {
        console.error('Error reading icons from JSON:', error);
        return [];
    }
}

module.exports = { readIconsFromJson };
