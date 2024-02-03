console.log('main.js');

//@helper
const $_V = document.querySelector.bind(document);
const $$_V = document.querySelectorAll.bind(document);
const createVisualElement = domString => new DOMParser().parseFromString(domString, 'text/html').body.firstChild;
createVisualElement.bind(document);
const setLocalStorageItems = (key,items) => {
    let value = JSON.stringify(items)
    localStorage.setItem(key,value)
}
const deleteLocalStorageItems = (key) => {
    localStorage.removeItem(key)
}
function chunkArray(arr, chunkSize) {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        result.push(chunk);
    }
    return result;
}

//@loading effect
const $count = $('[data-count-to]'),
    to = parseFloat($count.attr('data-count-to'));
const root = window.getComputedStyle(document.documentElement),
    duration = root.getPropertyValue('--progress-duration'),
    easing = root.getPropertyValue('--progress-easing');
$({countNum: 0}).animate({countNum: to}, {
    duration: duration / 2,
    easing: 'swing',
    step: function() {
        const process = Math.ceil(this.countNum);
        $count.text(process);
        if (process === 100) {
            setTimeout(() => {
                $('body').addClass('completed');
            }, 0);
        }
    },
    complete: completed()
});
function completed() {
    console.log('completed');
}

//@statics-element
const slideArea = document.querySelector('.slide-area');
const ModalElement = document.querySelector('.image-modal');

//@component
const Component = {
    arrowLeft: createVisualElement('<i class="fas fa-arrow-left"></i>'),
    arrowRight: createVisualElement('<i class="fas fa-arrow-right"></i>'),
}
//@render
const Slide = {
    currentIndex: 0,
    slideArea: slideArea,
    slideItemImage: anh,
    content: loi_nhan,
    currentDetailImage: '',
    slideTransform: (index = 0) => {
        Slide.slideArea.children[Slide.currentIndex].classList.remove('active');
        if (index < 0 || index > Slide.slideArea.children.length - 1) return;
        Slide.currentIndex = index < 0 ? 0 : index > Slide.slideArea.children.length - 1 ? Slide.slideArea.children.length - 1 : index;
        Slide.slideArea.style.transform = `translateX(-${index * 100}%)`;
        Slide.slideArea.children[Slide.currentIndex].classList.add('active');
        console.log("slide index: ", Slide.currentIndex);
    },
    slideItemContent: (image_urls = [''], content = loi_nhan[0]) => {
        return createVisualElement(`
            <div class="slide-item flex flex-col justify-center item-center gap-2 max-w-[500px] p-4 m-4 bg-white rounded-lg">
                <div class="slide-item_image-group grid grid-cols-2 gap-2">
                    ${image_urls.map((url, index) => {
                        return (`
                            <div class="flex justify-center items-center">
                                <div class="flex justify-center items-center w-fit">
                                    <img 
                                        src="${url}" 
                                        class="anh-truc max-w-[180px] max-h-[180px] h-fit object-contain cursor-pointer rounded-lg hover:shadow-lg hover:scale-[1.23] transition duration-300 ease-in-out" 
                                        alt="anh-truc"
                                        onclick="Slide.slideImagePreviews('${url}')"    
                                    >
                                </div>  
                            </div>
                        `);
                    }).join('')}
                </div>
                <p class="text-gray-800 p-4">${content}</p>
            </div>
        `);
    },
    slideImagePreviews: (image_url = '') => {
        ModalElement.style.display = 'flex';
        ModalElement.classList.remove('fade-out');
        setTimeout(() => {
            ModalElement.append(createVisualElement(`
                <div class="slide-item">
                    <img src="${image_url}" class="max-w-[500px] h-fit aspect-square object-contain rounded-full" alt="anh-truc">
                </div>
            `));
            ModalElement.classList.add('fade-in');
        }, 100);
    }
}

const renderElement = {
    render_card_append: (targetElement = document.body) => {
        return (imageUrl = './public/anh', content = '') => {
            targetElement.appendChild(createVisualElement(`
                <div class="card">
                    <img src="${imageUrl}" alt="">
                    <p>${content}</p>
                </div>
            `))
        }
    },
    render_element: (targetElement = document.body) => {
        return (element) => {targetElement.appendChild(element);}
    },
}

//@action-setter
const BoxAnimation = document.querySelector('.box-animation');
const BoxAnimationDirector = BoxAnimation.querySelector('.director');
const BoxAnimationDirectElements = [Component.arrowRight].map(item => {
    const div1 = createVisualElement('<div class="flex justify-center items-center text-[20px] text-white w-14 h-14 cursor-pointer bg-[#cd00cdbf] rounded-full hover:scale-[1.23] transition duration-300 ease-in-out hover:"></div>');
    div1.appendChild(item);
    renderElement.render_element(BoxAnimationDirector)(
        div1
    );
    return div1;
});
BoxAnimationDirectElements[0].addEventListener('click', (e) => {
    document.querySelector(".present").classList.remove('open');
    Slide.currentIndex++;
    Slide.slideTransform(Slide.currentIndex);
});

const slideData = chunkArray(anh, 4);

slideData.forEach((item, index) => {
    const slideItem = Slide.slideItemContent(item, loi_nhan[index]);
    Slide.slideArea.appendChild(
        createVisualElement(`
            <div class="slide w-[100vw] h-[100vh] bg-pink-100">
                ${slideItem.outerHTML}
                <div class="director">
                    <div 
                        class="flex justify-center items-center text-[20px] text-white w-14 h-14 cursor-pointer bg-[#cd00cdbf] rounded-full hover:scale-[1.23] transition duration-300 ease-in-out hover: " 
                        slide-index="${index}"
                        onclick="Slide.slideTransform(${index})"
                        >
                        ${Component.arrowLeft.outerHTML}
                    </div>
                    <div 
                        class="flex justify-center items-center text-[20px] text-white w-14 h-14 cursor-pointer bg-[#cd00cdbf] rounded-full hover:scale-[1.23] transition duration-300 ease-in-out hover:" 
                        slide-data="${index + 2}"
                        onclick="Slide.slideTransform(${index + 2})"
                        >
                        ${Component.arrowRight.outerHTML}
                    </div>
                </div>
            </div>
        `)
    );
});

ModalElement.addEventListener('click', (e) => {
    ModalElement.classList.remove('fade-in');
    ModalElement.classList.add('fade-out');
    setTimeout(() => {
        ModalElement.style.display = 'none';
        ModalElement.innerHTML = '';
    }, 300);
});

//@BoxAnimation
const present = document.querySelector('.present');
present.onclick = () => {
    present.classList.toggle('open');
    access_clicked_box = true;
}

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let width, height, lastNow;
let snowflakes;
let maxSnowflakes = 100;

function init() {
    snowflakes = [];
    resize();
    render(lastNow = performance.now());
}

function render(now) {
    requestAnimationFrame(render);

    const elapsed = now - lastNow;
    lastNow = now;

    ctx.clearRect(0, 0, width, height);
    if (snowflakes.length < maxSnowflakes)
        snowflakes.push(new Snowflake());

    ctx.fillStyle = ctx.strokeStyle = 'rgba(255, 255, 255, .5)';

    snowflakes.forEach(snowflake => snowflake.update(elapsed, now));
}

function pause() {
    cancelAnimationFrame(render);
}
function resume() {
    lastNow = performance.now();
    requestAnimationFrame(render);
}


class Snowflake {
    constructor() {
        this.spawn();
    }

    spawn(anyY = false) {
        this.x = rand(0, width);
        this.y = anyY === true ?
            rand(-50, height + 50) :
            rand(-50, -10);
        this.xVel = rand(-.05, .05);
        this.yVel = rand(.02, .1);
        this.angle = rand(0, Math.PI * 2);
        this.angleVel = rand(-.001, .001);
        this.size = rand(7, 12);
        this.sizeOsc = rand(.01, .5);
    }

    update(elapsed, now) {
        const xForce = rand(-.001, .001);

        if (Math.abs(this.xVel + xForce) < .075) {
            this.xVel += xForce;
        }

        this.x += this.xVel * elapsed;
        this.y += this.yVel * elapsed;
        this.angle += this.xVel * 0.05 * elapsed; //this.angleVel * elapsed

        if (
            this.y - this.size > height ||
            this.x + this.size < 0 ||
            this.x - this.size > width) {
            this.spawn();
        }

        this.render();
    }

    render() {
        ctx.save();
        const { x, y, angle, size } = this;
        ctx.beginPath();
        ctx.arc(x, y, size * 0.2, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.restore();
    }
}


// Utils
const rand = (min, max) => min + Math.random() * (max - min);

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    maxSnowflakes = Math.max(width / 10, 100);
}

window.addEventListener('resize', resize);
window.addEventListener('blur', () => {
    pause();
    console.log("blur");
});
window.addEventListener('focus', resume);
init();


