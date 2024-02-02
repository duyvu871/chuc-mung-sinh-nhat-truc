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
        if (index < 0 || index > Slide.slideArea.children.length - 1) return;
        Slide.currentIndex = index < 0 ? 0 : index > Slide.slideArea.children.length - 1 ? Slide.slideArea.children.length - 1 : index;
        Slide.slideArea.style.transform = `translateX(-${index * 100}%)`;
    },
    slideItemContent: (image_urls = [''], content = loi_nhan[0]) => {
        return createVisualElement(`
            <div class="slide-item flex flex-col justify-center item-center gap-2 max-w-[500px] p-4 m-4 bg-white rounded-lg">
                <div class="slide-item_image-group grid grid-cols-2 gap-2">
                    ${image_urls.map((url, index) => {
                        return (`
                            <div class="flex justify-center items-center">
                                <img 
                                    src="${url}" 
                                    class="max-w-[180px] h-fit aspect-square object-contain cursor-pointer rounded-lg hover:shadow-lg transition duration-300 ease-in-out" 
                                    alt="anh-truc"
                                    onclick="Slide.slideImagePreviews('${url}')"    
                                >
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
                    <img src="${image_url}" class="max-w-[500px] h-fit aspect-square object-contain" alt="anh-truc">
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
    const div1 = createVisualElement('<div class="flex justify-center items-center text-[20px] text-white w-14 h-14 cursor-pointer bg-[#cd00cdbf] rounded-full hover: "></div>');
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
                        class="flex justify-center items-center text-[20px] text-white w-14 h-14 cursor-pointer bg-[#cd00cdbf] rounded-full hover: " 
                        slide-index="${index}"
                        onclick="Slide.slideTransform(${index})"
                        >
                        ${Component.arrowLeft.outerHTML}
                    </div>
                    <div 
                        class="flex justify-center items-center text-[20px] text-white w-14 h-14 cursor-pointer bg-[#cd00cdbf] rounded-full hover: " 
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




