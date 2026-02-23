let images = [
 { 
    path: "https://static.vecteezy.com/system/resources/thumbnails/049/855/627/small/nature-background-high-resolution-wallpaper-for-a-serene-and-stunning-view-free-photo.jpg" 
  },
  { 
    path: "https://w0.peakpx.com/wallpaper/125/944/HD-wallpaper-lotus-flower-amazing-flower-lotus-lake.jpg" 
  },
  { 
    path: "https://png.pngtree.com/background/20250126/original/pngtree-colorful-flowers-in-a-field-wallpaper-picture-image_15591250.jpg" 
  },
  { 
    path: "https://www.pixelstalk.net/wp-content/uploads/images9/Summer-flowers-wallpaper-for-desktop.jpg" 
  },
  { 
    path: "https://img.freepik.com/premium-photo/blue-flower-with-word-wild-background_1236927-11149.jpg"
  }
];

let index = 0;
let img = document.getElementById("sliderImage");
let autoSlide;

function prevSlide() {
    if (index == 0) {
        index = images.length - 1;
    } else {
        index--;
    }
    displayImage(index);
}

function nextSlide() {
    if (index == images.length - 1) {
        index = 0;
    } else {
        index++;
    }
    displayImage(index);
}

function displayImage(i) {
    img.src = images[i].path;
}

function startAutoSlide() {
  autoSlide = setInterval(() => {
    nextSlide();
  }, 2000);
}

displayImage(0);
startAutoSlide();