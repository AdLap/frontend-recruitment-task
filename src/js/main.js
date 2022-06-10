const MEDIA = {
    xSmall: '(max-width: 479px)',
    small: '(max-width: 783px)',
    medium: '(max-width: 1001px)',
    large: '(max-width: 1233px)',
    xLarge: '(max-width: 1439px)',
    xxLarge: '(min-width: 1440px)'
}

const pictureSources = new Map([
    ['xSmall', './images/sean-o-KMn4VEeEPR8-unsplash_1_s6zmfh_ar_1_1,c_fill,g_auto__c_scale,w_450.jpg'],
    ['small', './images/sean-o-KMn4VEeEPR8-unsplash_1_s6zmfh_c_scale,w_480.jpg'],
    ['medium', './images/sean-o-KMn4VEeEPR8-unsplash_1_s6zmfh_c_scale,w_784.jpg'],
    ['large', './images/sean-o-KMn4VEeEPR8-unsplash_1_s6zmfh_c_scale,w_1002.jpg'],
    ['xLarge', './images/sean-o-KMn4VEeEPR8-unsplash_1_s6zmfh_c_scale,w_1234.jpg'],
    ['xxLarge', './images/sean-o-KMn4VEeEPR8-unsplash_1_s6zmfh_c_scale,w_1400.jpg'],
    ['default', './images/sean-o-KMn4VEeEPR8-unsplash_1_s6zmfh_ar_1_1,c_fill,g_auto__c_scale,w_450.jpg']

])

const app = document.querySelector('#app')

class Popup {
    constructor(
        parentElement,
        counter,
        resetButtonVisible,
        currentSection
    ) {
        this.parentElement = parentElement
        this.counter = counter
        this.resetButtonVisible = resetButtonVisible
        this.currentSection = currentSection
        this.popupWrapper = document.createElement('div')
        this.popupWindow = document.createElement('div')
        this.popupCloseButton = document.createElement('button')
        this.popupContent = document.createElement('p')
        this.resetButton = null

        this.createPopup()
    }

    createPopup() {
        this.popupWrapper.classList.add('popup')
        this.parentElement.prepend(this.popupWrapper)
        this.popupWrapper.addEventListener('click', event => this.onClosePopup(event))

        this.popupWindow.classList.add('popup__window')
        this.popupWrapper.append(this.popupWindow)

        const popupTitle = document.createElement('h1')
        popupTitle.classList.add('popup__window__title')
        popupTitle.innerText = 'Alert!'

        this.popupContent.classList.add('popup__window__content')
        this.createContentText(this.popupContent, this.counter)

        this.popupCloseButton.classList.add('popup__window__close')
        this.popupCloseButton.setAttribute('aria-label', 'Close pop-up')
        this.popupCloseButton.title = 'Close pop-up'
        this.popupWindow.append(popupTitle, this.popupContent, this.popupCloseButton)
        if (!this.resetButtonVisible) {
            this.popupCloseButton.focus()
        }

        const closeButtonLeftElement = document.createElement('span')
        closeButtonLeftElement.classList.add('popup__window__close__left')
        const closeButtonRightElement = document.createElement('span')
        closeButtonRightElement.classList.add('popup__window__close__right')
        this.popupCloseButton.append(closeButtonLeftElement, closeButtonRightElement)

        if (this.resetButtonVisible) {
            this.createResetButton()
        }

        new DataTable(this.popupWindow, 'https://jsonplaceholder.typicode.com/users')
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
        this.popupContent.textContent = 'The counter has beend reset.'
        this.currentSection.onCounterUpdate(0)
        this.resetButton.remove()
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
            this.onResetCounter()
        })
    }

    createContentText(parentElement, counter) {
        const popupContentCounter = document.createElement('strong')
        parentElement.append(popupContentCounter)
        const firstTextElement = document.createTextNode('You have clicked')
        const counterTextElement = document.createTextNode(` ${counter} times `)
        const lastTextElement = document.createTextNode('to related button.')
        parentElement.prepend(firstTextElement)
        popupContentCounter.append(counterTextElement)
        parentElement.append(lastTextElement)
    }
}

class Picture {
    constructor(
        parentElement,
        pictureSources,
        media,
        altText
    ) {
        this.parentElement = parentElement
        this.pictureSources = pictureSources
        this.media = media
        this.altText = altText
        this.imageWrapper = document.createElement('picture')

        this.createPicture()
    }

    createPicture() {
        this.imageWrapper.classList.add('container__image')
        this.parentElement.append(this.imageWrapper)

        this.createPictureSource(this.pictureSources, this.media)

        const picture = document.createElement('img')
        picture.classList.add('container__image__picture')
        picture.src = this.pictureSources.get('default')
        picture.alt = this.altText
        picture.title = this.altText
        this.imageWrapper.append(picture)
    }

    createPictureSource(source, media) {
        if (!source.size) {
            return
        }

        for (const [widthName, pictureSrc] of source.entries()) {
            const element = document.createElement('source')
            element.media = media[widthName]
            element.srcset = pictureSrc
            this.imageWrapper.append(element)
        }
    }
}

class Section {
    constructor(parentElement, name) {
        this.counter = localStorage.getItem(`Section-${name}`) ?? 0
        this.name = name
        this.parentElement = parentElement
        this.resetButtonVisible = false
        this.section = document.createElement('section')
        this.button = document.createElement('button')

        this.createSection()
    }

    createSection() {
        this.section.classList.add('container')
        this.parentElement.append(this.section)

        new Picture(this.section, pictureSources, MEDIA, 'Ocean')

        const content = document.createElement('article')
        content.classList.add('container__content')
        this.section.append(content)

        const sectionTitle = document.createElement('h1')
        sectionTitle.classList.add('container__content__title')
        sectionTitle.innerText = 'Lorem Ipsum'

        const paragraph = document.createElement('p')
        paragraph.classList.add('container__content__paragraph')
        paragraph.innerText = 'Infinitely scalable, feature-rich and cloud-native data management and protection for modern and legacy infrastructures and SaaS platforms, managed via a single app with no hardware required.'

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
            localStorage.setItem(`Section-${this.name}`, value)
            return
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
        this.resetButtonVisible = this.counter > 5
        app.parentElement.style.overflow = 'hidden'
        this.onButtonsDisabled(true)

        new Popup(
            this.parentElement,
            this.counter,
            this.resetButtonVisible,
            this
        )
    }
}

new Section(app, 'first')
new Section(app, 'second')


// Additional Task

async function fetchData(url) {
    const controller = new AbortController()
    const abortTime = () => setTimeout(() => controller.abort(), 5000)
    abortTime()

    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            signal: controller.signal
        })
        if (!response.ok) {
            throw new Error(response.statusText)
        }
        const data = await response.json()
        return data

    } catch (error) {
        if (error.name === 'AbortError') {
            return new Error(error.message)
        }
        return error

    } finally {
        clearTimeout(abortTime)
    }
}

class DataTable {
    constructor(parentElement, url) {
        this.parentElement = parentElement
        this.table = document.createElement('table')
        this.loader = document.createElement('div')
        this.url = url
        this.data = []
        this.isLoading = false

        this.createTable()
    }

    createTable() {
        this.table.classList.add('table')
        this.parentElement.append(this.table)
        this.setData()

        if (this.isLoading) {
            this.loader.classList.add('table__loader')
            this.table.append(this.loader)
        }
        if (!this.isLoading) {
            this.loader.remove()
        }
    }

    drawTableBody(data) {
        const tableHead = document.createElement('thead')
        const headRow = document.createElement('tr')
        tableHead.append(headRow)
        const headName = document.createElement('th')
        headName.innerText = 'Name'
        const headEmail = document.createElement('th')
        headEmail.innerText = 'Email'
        const headAddress = document.createElement('th')
        headAddress.innerText = 'Address'
        const headPhone = document.createElement('th')
        headPhone.innerText = 'Phone'
        const headCompany = document.createElement('th')
        headCompany.innerText = 'Company'
        headRow.append(headName, headEmail, headAddress, headPhone, headCompany)
        const tableBody = document.createElement('tbody')

        data.forEach(data => {
            const row = document.createElement('tr')
            const name = document.createElement('td')
            name.innerText = data.name
            const email = document.createElement('td')
            email.innerText = data.email
            const address = document.createElement('td')
            const city = document.createElement('span')
            city.innerText = data.address.city
            const street = document.createElement('span')
            street.innerText = data.address.street
            const suite = document.createElement('span')
            suite.innerText = data.address.suite
            address.append(city, street, suite)
            const phone = document.createElement('td')
            phone.innerText = data.phone
            const company = document.createElement('td')
            company.innerText = data.company.name

            tableBody.append(row)
            row.append(name, email, address, phone, company)
        })

        this.table.append(tableHead, tableBody)
    }

    async setData() {
        this.isLoading = true
        const result = await fetchData(this.url)

        if (result instanceof Error) {
            this.isLoading = false
            this.loader.remove()
            return this.showErrorInfo(result)
        }

        this.drawTableBody(result)
        this.isLoading = false
        this.loader.remove()
    }

    showErrorInfo(result) {
        const errorWrapper = document.createElement('div')
        errorWrapper.classList.add('error')
        this.table.append(errorWrapper)

        const errorName = document.createElement('h2')
        errorName.classList.add('error__title')
        errorName.innerText = result.name

        const errorMessage = document.createElement('p')
        errorMessage.classList.add('error__message')
        errorMessage.innerText = result.message

        errorWrapper.append(errorName, errorMessage)
    }
}
