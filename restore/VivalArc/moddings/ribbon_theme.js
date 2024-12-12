(function ribbon_theme() {
    "use strict";

    const FETCH_BACKGROUND_IMAGE = true;
    const CENTER_TABS = false;

    class RibbonTheme {
        #backgroundImageFetcher = null;
        #tabsCentering = null;

        constructor() {
            if (FETCH_BACKGROUND_IMAGE) {
                this.#backgroundImageFetcher = new BackgroundImageFetcher();
            }
            if (CENTER_TABS) {
                this.#tabsCentering = new TabsCentering();
            }
        }
    };

    class BackgroundImageFetcher {
        constructor() {
            this.#fetchBackgroundImage();
        }

        // actions

        #fetchBackgroundImage() {
            this.#ribbonBackgroundImage = this.#backgroundImage;
        }

        // getters

        get #browser() {
            return document.querySelector('#browser');
        }

        get #backgroundImage() {
            return this.#browser.style.backgroundImage;
        }

        get #ribbonBackgroundImage() {
            return this.#browser.style.getPropertyValue('--ribbonBackgroundImage');
        }

        // setters

        set #ribbonBackgroundImage(image) {
            this.#browser.style.setProperty('--ribbonBackgroundImage', image);
        }
    };

    class TabsCentering {
        constructor() {
            this.#centerTabs();
        }

        // actions

        #centerTabs() {
            this.#app.classList.add('RibbonCenterTabs');
        }

        // getters

        get #app() {
            return document.querySelector('#app');
        }
    };

    var interval = setInterval(() => {
        if (document.querySelector('#browser')) {
            window.ribbonTheme = new RibbonTheme();
            clearInterval(interval);
        }
    }, 100);
})();
