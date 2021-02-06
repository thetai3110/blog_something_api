const fs = require('fs');
module.exports = {
    readAllFile: () => {
        const images = fs.readdirSync('public/uploads');
        var sorted = [];
        images.forEach(image => {
            if (image.split('.').pop() === "png"
                || image.split('.').pop() === "jpg"
                || image.split('.').pop() === "jpeg"
                || image.split('.').pop() === "svg") {
                var abc = {
                    'image': image,
                    'folder': '/public/uploads'
                }
                sorted.push(abc);
            }
        });
        return sorted;
    }
}