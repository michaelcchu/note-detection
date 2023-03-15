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

drawImage("image","img_rgb");

function convertToGreyScale(canvas_id) {
    const img_rgb = document.getElementById(canvas_id);
    const context = img_rgb.getContext("2d");
    const img_data = context.getImageData(0, 0, img_rgb.width, img_rgb.height);

}

convertToGreyScale("img_rgb");

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