document.getElementById('imageInput').addEventListener('change', handleImageUpload);

function handleImageUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
            const canvas = document.getElementById('imageCanvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            document.getElementById('imageCanvas').style.display = 'block';
        };
        img.src = e.target.result;
    };

    reader.readAsDataURL(file);
}

document.getElementById('imageCanvas').addEventListener('mousemove', function (event) {
    const canvas = document.getElementById('imageCanvas');
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (x >= 0 && x < canvas.width && y >= 0 && y < canvas.height) {
        const ctx = canvas.getContext('2d');
        const pixelData = ctx.getImageData(x, y, 1, 1).data;
        const color = rgbToHex(pixelData[0], pixelData[1], pixelData[2]);
        updateColorPreview(color);
    }
});

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function updateColorPreview(color) {
    const colorPreview = document.getElementById('colorPreview');
    colorPreview.textContent = "Hex: " + color;
    colorPreview.style.color = color;
}
