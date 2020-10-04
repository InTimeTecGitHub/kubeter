const fetchLink = (link: string) => fetch(link).then(r => r.text());

const highlighted = (el: Element) => el.querySelector('.highlight');
const remover = (cl: string) => (el: Element) => el.classList.remove(cl);
const adder = (cl: string) => (el: Element) => el.classList.add(cl);
const removeHighlight = remover('highlight');
const addHighlight = adder('highlight');

const createElement = (str: string): Element => new DOMParser()
    .parseFromString(str, 'text/html').body.firstElementChild;

export class ExpandBar {
    private content: Element;
    private button: Element;
    private contentPath: string;
    private buttonPath: string;
    private selected = false;
    private static lastChild: Element;
    private static expandBar = document.querySelector('.settings-expand-bar');
    private static settingsBar = document.querySelector('aside.settings-bar');

    select() {
        this.selected = !this.selected;
        return this;
    }

    async render() {
        await Promise.all([
            fetchLink(this.contentPath).then(c => { this.content = createElement(c); }),
            fetchLink(this.buttonPath).then(b => { this.button = createElement(b); })
        ]);

        this.button.addEventListener('click', () => {
            removeHighlight(highlighted(ExpandBar.settingsBar));
            this.selected = true;
            addHighlight(this.button);
            ExpandBar.lastChild &&
                ExpandBar.expandBar.removeChild(ExpandBar.lastChild);
            ExpandBar.lastChild = this.content;
            ExpandBar.expandBar.appendChild(ExpandBar.lastChild);
        });
        if (this.selected) {
            addHighlight(this.button);
            ExpandBar.expandBar.appendChild(this.content);
            ExpandBar.lastChild = this.content;
        }
        ExpandBar.settingsBar.appendChild(this.button);
    }

    constructor({ content, button }: { content: string, button: string }) {
        this.contentPath = content;
        this.buttonPath = button;
    }
}
