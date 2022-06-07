const app = document.querySelector('#app')
class Popup {
    constructor(
        parentElement,
        popupCounterInfo,
        resetButtonVisible,
        currentSection
    ) {
        this.parentElement = parentElement
        this.popupCounterInfo = popupCounterInfo
        this.resetButtonVisible = resetButtonVisible
        this.currentSection = currentSection
        this.popupWrapper = null
        this.popupWindow = null
        this.popupCloseButton = null

        this.createPopup()
    }

    createPopup() {
        this.popupWrapper = document.createElement('div')
        this.popupWrapper.classList.add('popup')
        this.parentElement.prepend(this.popupWrapper)
        this.popupWrapper.addEventListener('click', event => this.onClosePopup(event))

        this.popupWindow = document.createElement('div')
        this.popupWindow.classList.add('popup__window')
        this.popupWrapper.append(this.popupWindow)

        const popupTitle = document.createElement('h1')
        popupTitle.classList.add('popup__window__title')
        popupTitle.innerText = 'Alert!'

        const popupContent = document.createElement('p')
        popupContent.classList.add('popup__window__content')
        popupContent.innerText = this.popupCounterInfo

        this.popupCloseButton = document.createElement('div')
        this.popupCloseButton.classList.add('popup__window__close')
        this.popupWindow.append(popupTitle, popupContent, this.popupCloseButton)

        const closeButtonLeftElement = document.createElement('span')
        closeButtonLeftElement.classList.add('popup__window__close__left')
        const closeButtonRightElement = document.createElement('span')
        closeButtonRightElement.classList.add('popup__window__close__right')
        this.popupCloseButton.append(closeButtonLeftElement, closeButtonRightElement)

        if (this.resetButtonVisible) {
            this.createResetButton()
        }
    }

    onClosePopup(event) {
        if (event.target === this.popupWrapper || event.target === this.popupCloseButton) {
            this.popupWrapper.remove()
            app.parentElement.style.overflow = 'visible'
        }
    }

    onResetCounter() {
        this.currentSection.onCounterUpdate(0)
    }

    createResetButton() {
        const resetButton = document.createElement('button')
        resetButton.classList.add('reset')
        resetButton.innerText = 'Reset Counter'
        this.popupWindow.append(resetButton)

        resetButton.addEventListener('click', () => {
            this.popupCounterInfo = 'The counter has beend reset.'
            this.onResetCounter()
        })
    }
}
class Section {
    constructor(parentElement, name) {
        this.counter = localStorage.getItem(`Section-${name}`) ?? 0
        this.name = name
        this.parentElement = parentElement
        this.resetButtonVisible = false

        this.createSection()
    }

    createSection() {
        const section = document.createElement('section')
        section.classList.add('container')
        this.parentElement.append(section)

        const imageWrapper = document.createElement('div')
        imageWrapper.classList.add('container__image')
        section.append(imageWrapper)

        const picture = document.createElement('img')
        picture.classList.add('container__image__picture')
        picture.src = './images/sean-o-KMn4VEeEPR8-unsplash_1_s6zmfh_ar_16_9,c_fill,g_auto__c_scale,w_596.jpg'
        picture.alt = 'ocean'
        picture.title = 'Ocean'
        imageWrapper.append(picture)

        const content = document.createElement('article')
        content.classList.add('container__content')
        section.append(content)

        const sectionTitle = document.createElement('h1')
        sectionTitle.classList.add('container__content__title')
        sectionTitle.innerText = 'Lorem Ipsum'
        content.append(sectionTitle)

        const paragraph = document.createElement('p')
        paragraph.classList.add('container__content__paragraph')
        paragraph.innerText = 'Infinitely scalable, feature-rich and cloud-native data management and protection for modern and legacy infrastructures and SaaS platforms, managed via a single app with no hardware required.'
        content.append(paragraph)

        const button = document.createElement('button')
        button.classList.add('container__content__button')
        button.type = 'button'
        button.innerText = 'Button'
        button.setAttribute('aria-label', 'Click me')
        content.append(button)
        button.addEventListener('click', () => this.onOpenPopup())
    }

    onCounterUpdate(value) {
        this.counter = value
        value === 0
            ? localStorage.removeItem(`Section-${this.name}`)
            : localStorage.setItem(`Section-${this.name}`, value)
    }

    onOpenPopup() {
        ++this.counter
        localStorage.setItem(`Section-${this.name}`, this.counter)

        this.counter > 2
            ? this.resetButtonVisible = true
            : this.resetButtonVisible = false

        app.parentElement.style.overflow = 'hidden'
        return new Popup(
            this.parentElement,
            `You have clicked ${this.counter} times to related button.`,
            this.resetButtonVisible,
            this
        )
    }
}

const firstSection = new Section(app, 'first')
const secondSection = new Section(app, 'second')
