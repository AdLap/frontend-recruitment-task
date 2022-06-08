const app = document.querySelector('#app')
const MEDIA = {
    xsmall: '(max-width: 479px)',
    small: '(max-width: 783px)',
    medium: '(max-width: 1001px)',
    large: '(max-width: 1233px)',
    xLarge: '(max-width: 1439px)',
    xxLarge: '(min-width: 1440px)'
}
const pictureSources = {
    xSmall: './images/sean-o-KMn4VEeEPR8-unsplash_1_s6zmfh_ar_1_1,c_fill,g_auto__c_scale,w_450.jpg',
    small: './images/sean-o-KMn4VEeEPR8-unsplash_1_s6zmfh_c_scale,w_480.jpg',
    medium: './images/sean-o-KMn4VEeEPR8-unsplash_1_s6zmfh_c_scale,w_784.jpg',
    large: './images/sean-o-KMn4VEeEPR8-unsplash_1_s6zmfh_c_scale,w_1002.jpg',
    xLarge: './images/sean-o-KMn4VEeEPR8-unsplash_1_s6zmfh_c_scale,w_1234.jpg',
    xxLarge: './images/sean-o-KMn4VEeEPR8-unsplash_1_s6zmfh_c_scale,w_1400.jpg',
    default: './images/sean-o-KMn4VEeEPR8-unsplash_1_s6zmfh_ar_1_1,c_fill,g_auto__c_scale,w_450.jpg'
}
class Popup {
    constructor(
        parentElement,
        popupCounterInfo,
        resetButtonVisible,
        currentSection
    ) {
        this.parentElement = parentElement
        this.resetButtonVisible = resetButtonVisible
        this.currentSection = currentSection
        this.popupWrapper = null
        this.popupWindow = null
        this.popupCloseButton = null
        this.popupContentText = document.createTextNode(popupCounterInfo) ?? 'No data'
        this.resetButton = null

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
        popupContent.append(this.popupContentText)

        this.popupCloseButton = document.createElement('button')
        this.popupCloseButton.classList.add('popup__window__close')
        this.popupCloseButton.setAttribute('aria-label', 'Close pop-up')
        this.popupCloseButton.title = 'Close pop-up'
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
        if (
            event.target === this.popupWrapper
            || event.target === this.popupCloseButton
            || event.target === this.popupCloseButton.childNodes[0]
            || event.target === this.popupCloseButton.childNodes[1]
        ) {
            this.popupWrapper.remove()
            this.currentSection.onButtonsDisabled(false)
            app.parentElement.style.overflow = 'visible'
        }
    }

    onResetCounter() {
        this.currentSection.onCounterUpdate(0)
    }

    createResetButton() {
        this.resetButton = document.createElement('button')
        this.resetButton.classList.add('popup__window__reset')
        this.resetButton.innerText = 'Reset Counter'
        this.resetButton.setAttribute('aria-label', 'Reset counter')
        this.resetButton.title = 'Reset counter'
        this.popupWindow.append(this.resetButton)
        this.resetButton.focus()

        this.resetButton.addEventListener('click', () => {
            this.popupContentText.textContent = 'The counter has beend reset.'
            this.onResetCounter()
            this.resetButton.remove()
        })
    }
}

class Picture {
    constructor(parentElement, pictureSources) {
        this.parentElement = parentElement
        this.pictureSources = pictureSources

        this.createPicture()
    }

    createPicture() {
        const imageWrapper = document.createElement('picture')
        imageWrapper.classList.add('container__image')
        this.parentElement.append(imageWrapper)

        const xSmallWidth = document.createElement('source')
        xSmallWidth.media = MEDIA.small
        xSmallWidth.srcset = this.pictureSources.small
        const smallWidth = document.createElement('source')
        smallWidth.media = MEDIA.small
        smallWidth.srcset = this.pictureSources.small
        const mediumWidth = document.createElement('source')
        mediumWidth.media = MEDIA.medium
        mediumWidth.srcset = this.pictureSources.medium
        const largeWidth = document.createElement('source')
        largeWidth.media = MEDIA.large
        largeWidth.srcset = this.pictureSources.large
        const xLargeWidth = document.createElement('source')
        xLargeWidth.media = MEDIA.xLarge
        xLargeWidth.srcset = this.pictureSources.xLarge
        const xxLargeWidth = document.createElement('source')
        xxLargeWidth.media = MEDIA.xxLarge
        xxLargeWidth.srcset = this.pictureSources.xxLarge

        imageWrapper.append(smallWidth, mediumWidth, largeWidth, xLargeWidth, xxLargeWidth)

        const picture = document.createElement('img')
        picture.classList.add('container__image__picture')
        picture.src = `${this.pictureSources.default}`
        picture.alt = 'ocean'
        picture.title = 'Ocean'
        imageWrapper.append(picture)
    }
}
class Section {
    constructor(parentElement, name) {
        this.counter = localStorage.getItem(`Section-${name}`) ?? 0
        this.name = name
        this.parentElement = parentElement
        this.resetButtonVisible = false
        this.button = null

        this.createSection()
    }

    createSection() {
        const section = document.createElement('section')
        section.classList.add('container')
        this.parentElement.append(section)

        new Picture(section, pictureSources)
       
        const content = document.createElement('article')
        content.classList.add('container__content')
        section.append(content)

        const sectionTitle = document.createElement('h1')
        sectionTitle.classList.add('container__content__title')
        sectionTitle.innerText = 'Lorem Ipsum'

        const paragraph = document.createElement('p')
        paragraph.classList.add('container__content__paragraph')
        paragraph.innerText = 'Infinitely scalable, feature-rich and cloud-native data management and protection for modern and legacy infrastructures and SaaS platforms, managed via a single app with no hardware required.'

        this.button = document.createElement('button')
        this.button.classList.add('container__content__button')
        this.button.type = 'button'
        this.button.innerText = 'Button'
        this.button.title = 'Open pop-up and increase counter'
        this.button.setAttribute('aria-label', 'Click me to increase counter')
        content.append(sectionTitle, paragraph, this.button)

        this.button.addEventListener('click', () => this.onOpenPopup())
    }

    onCounterUpdate(value) {
        this.counter = value

        if (value !== 0) {
            return localStorage.setItem(`Section-${this.name}`, value)
        }
        localStorage.removeItem(`Section-${this.name}`)
    }

    onButtonsDisabled(value) {
        const buttons = document.querySelectorAll('.container button')
        buttons.forEach(button => button.disabled = value)

    }

    onOpenPopup() {
        ++this.counter
        localStorage.setItem(`Section-${this.name}`, this.counter)
        this.resetButtonVisible = Boolean(this.counter > 5)
        app.parentElement.style.overflow = 'hidden'
        this.onButtonsDisabled(true)

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
