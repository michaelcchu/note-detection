function showMe(id) {
    const layer = document.getElementById(id);
    layer.classList.toggle("hidden");
}

function drawImage(image_id, canvas_id) {
    const image = document.getElementById(image_id);
    const img_rgb = document.getElementById(canvas_id);
    img_rgb.width = image.width;
    img_rgb.height = image.height;
    const context = img_rgb.getContext("2d");
    context.drawImage(image, 0, 0);
}

function getIndex(width, i, j) { return j * width + i; }

function getPixel(img_data, w, i, j) {
    const index = getIndex(w, i, j);
    const red = img_data[4*index];
    const green = img_data[4*index + 1];
    const blue = img_data[4*index + 2];
    const alpha = img_data[4*index + 3];
    return {red: red, green: green, blue: blue, alpha: alpha};
}

function setPixel(img_context, i, j, pixel) {
    img_context.fillStyle = "rgba(" + pixel.red + "," + pixel.green + "," + 
        pixel.blue + "," + (pixel.alpha / 255) + ")";
    img_context.fillRect(i,j,1,1);
}

function convertToGreyScale(rgb_canvas_id, grey_canvas_id) {
    const rgb = document.getElementById(rgb_canvas_id);
    const grey = document.getElementById(grey_canvas_id);
    const w = rgb.width;
    const h = rgb.height;
    grey.width = w;
    grey.height = h;

    const rgb_context = rgb.getContext("2d");
    const rgb_data = rgb_context.getImageData(0, 0, w, h).data;

    const grey_context = grey.getContext("2d");

    for (let j = 0; j < h; j++) {
        for (let i = 0; i < w; i++) {
            const rgb_pixel = getPixel(rgb_data, w, i, j);
            const mean = (rgb_pixel.red + rgb_pixel.blue + rgb_pixel.green) / 3;

            const grey_pixel = {red: mean, blue: mean, green: mean, 
                alpha: rgb_pixel.alpha};

            setPixel(grey_context, i, j, grey_pixel);
        }
    }
}

function convertToBlackAndWhite(source_canvas_id, output_canvas_id) {
    const source = document.getElementById(source_canvas_id);
    const output = document.getElementById(output_canvas_id);
    const w = source.width;
    const h = source.height;
    output.width = w;
    output.height = h;

    const source_context = source.getContext("2d");
    const source_data = source_context.getImageData(0, 0, w, h).data;

    const output_context = output.getContext("2d");

    for (let j = 0; j < h; j++) {
        for (let i = 0; i < w; i++) {
            // i,j is the upper left corner
            const source_pixel = getPixel(source_data, w, i, j);
            const mean = (source_pixel.red + source_pixel.blue + 
                source_pixel.green) / 3;

            // check if greater than or less than 127
            let output_pixel;
            if (mean > 127) {
                output_pixel = {red: 255, blue: 255, green: 255, alpha: 
                    source_pixel.alpha};
            } else {
                output_pixel = {red: 0, blue: 0, green: 0, alpha: 
                    source_pixel.alpha}
            }

            setPixel(output_context, i, j, output_pixel);
        }
    }
}

function findNotes(source_canvas_id, output_canvas_id) {
    const source = document.getElementById(source_canvas_id);
    const output = document.getElementById(output_canvas_id);
    const w = source.width;
    const h = source.height;
    output.width = w;
    output.height = h;

    const source_context = source.getContext("2d");
    const source_data = source_context.getImageData(0, 0, w, h).data;

    const output_context = output.getContext("2d");

    for (let j = 0; j < h; j++) {
        for (let i = 0; i < w; i++) {
            // i,j is the upper left corner
            const source_pixel = getPixel(source_data, w, i, j);
            const mean = (rgb_pixel.red + rgb_pixel.blue + rgb_pixel.green) / 3;

            const grey_pixel = {red: mean, blue: mean, green: mean, 
                alpha: rgb_pixel.alpha};

            setPixel(grey_context, i, j, grey_pixel);
        }
    }
}

// morphological operation: keep everything that is a round circle shape.
// discard all else.

// select notes only

drawImage("image","img_rgb");
drawImage("image","img_grey");
//convertToGreyScale("img_rgb", "img_grey");
convertToBlackAndWhite("img_rgb","img_grey");


/*
const img_rgb = cv.imread('image');
const img_gray = new cv.Mat();
cv.cvtColor(img_rgb, img_gray, cv.COLOR_BGR2GRAY);
cv.imshow("img_gray", img_gray);

const temp_rgb = cv.imread('template');
const temp_gray = new cv.Mat();
cv.cvtColor(temp_rgb, temp_gray, cv.COLOR_BGR2GRAY);
cv.imshow("temp_gray", temp_gray);

const search = new cv.Mat();
const mask = new cv.Mat();
cv.matchTemplate(img_gray, temp_gray, search, cv.TM_CCOEFF_NORMED, 
    mask);

const matches = new cv.Mat();
cv.threshold(search, matches, 0.8, 1, cv.THRESH_BINARY)
//cv.imshow("matches", matches);

const notes = cv.Mat.zeros(img_gray.rows, img_gray.cols, 
    cv.CV_8UC4);

const color = new cv.Scalar(255, 0, 0, 255);

let index = 0;
const points = [];
for (let i = 0; i < search.rows; i++) {
    for (let j = 0; j < search.cols; j++) {
        let value = search.data32F[index];
        if (value >= 0.8) {
            const topLeft = new cv.Point(j,i);
            points.push(j,i);
            const bottomRight = new cv.Point(j + temp_gray.cols, 
                i + temp_gray.rows);

            cv.rectangle(notes, topLeft, bottomRight, color, 2, 
                cv.LINE_8, 0);
        }
        index++;
    }
}   

cv.imshow('notes', notes);
*/