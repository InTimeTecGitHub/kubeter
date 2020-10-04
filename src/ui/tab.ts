const active = (el: Element) => el.querySelector('.active');
const remover = (cl: string) => (el: Element) => el.classList.remove(cl);
const adder = (cl: string) => (el: Element) => el.classList.add(cl);

const addActive = adder('active');
const removeActive = remover('active');

export class Tab {
    private static id = 1;
    private static tabHeader = document.querySelector('#tabHeader');
    private static tabContent = document.querySelector('#tabContent');
    private tabId = '';
    private tab = document.createElement('div');
    private tabContent = document.createElement('div');

    active() {
        const activeTab = active(Tab.tabHeader);
        const activeContent = active(Tab.tabContent);
        if (activeTab) removeActive(activeTab);
        if (activeContent) removeActive(activeContent);
        addActive(this.tab);
        addActive(this.tabContent);
        return this;
    }

    get Id() {
        return this.tabId;
    }

    constructor() {
        this.tabId = `k8scanvas_${Tab.id}`;
        this.tab.setAttribute('href', '#' + this.tabId);
        this.tab.setAttribute('class', 'tab-item');
        this.tab.innerHTML = 'untitled <a href="" class="close"><i class="fa fa-times"></i></a>';
        this.tabContent.setAttribute('id', this.tabId);
        this.tabContent.setAttribute('class', 'tab');
        this.tab.addEventListener('click', e => {
            e.preventDefault();
            this.active();
        });
        this.tab.querySelector('a.close')
            .addEventListener('click', e => {
                e.preventDefault();
                // remove tab code here.
            });
        this.tab
        Tab.tabHeader.appendChild(this.tab);
        Tab.tabContent.appendChild(this.tabContent);
        Tab.id += 1;
    }
}
