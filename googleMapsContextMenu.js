class googleMapsContextMenu {
    constructor(map, markers, layout, appendDefault, themeColor) {
        this._map = map;
        this._appendDefault = appendDefault || true;
        this.markers = markers;
        this.layout = layout || this.getDefaultLayout();
        this.currentInstance = [];
        this.eventCoordinate = {lat: null, lng: null};
    }

    get appendDefault() {
        return this._appendDefault;
    }

    get map() {
        return this._map;
    }

    init() {
        this.initEvents();
    }

    build(event) {
        let container = document.createElement('div');
        container.setAttribute(`id`, `googleMapsContextMenu-container`);
        container.style.position = `absolute`;
        container.style.padding = `5px`;

        container.style.width = `200px`;
        container.style.height = `${(this.layout.length * 45) + 15}px`;

        container.style.left = event.x;
        container.style.bottom = event.y;

        this.layout.forEach((division) => {
           let divisionReference = document.createElement('div');
           divisionReference.style.width = `100%`;
           divisionReference.style.padding = `5px`;
           divisionReference.innerHTML = `<span><img src="${division.icon}" alt="Context Menu Icon" height="25px"/>${division.label}</span>`;

           this.addEvent(divisionReference, division.event);

           container.appendChild(divisionReference);
        });

        this.currentInstance = container;

        document.body.appendChild(this.currentInstance);
    }

    add() {

    }

    remove() {

    }

    initEvents() {
        this.map.addListener(`rightclick`, () => {

        });
    }

    updateMarkers(markers) {

    }

    getDefaultLayout() {
        return [
            {label: 'Zoom In', icon: '',
                event: () => {
                    this.map.setZoom(parseInt(this.map.getZoom()) + 1);
                }
            },
            {label: 'Zoom Out', icon: '',
                event: () => {
                    this.map.setZoom(parseInt(this.map.getZoom()) - 1);
                }
            }
        ];
    }

    defaultUiEvents() {

    }

    destroy() {
        this.currentInstance.remove();
    }

    addEvent(element, event) {
        if (event) {
            let keyObj = Object.keys(event);
            for (let i = 0; i < keyObj.length; i++) {
                element.addEventListener(keyObj[i], event[keyObj[i]]);
            }
        }
    }
}